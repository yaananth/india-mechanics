import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'
import type {
  BillDocumentExtractSeed,
  PolicyRegisterSeed,
} from '../server/types.ts'

const execFileAsync = promisify(execFile)
const inputPath = resolve('server/seed-data/generated-bills.json')
const outputPath = resolve('server/seed-data/generated-bill-documents.json')
const extractionVersion = 'bill-document-extract-v0.1'
const concurrency = Math.max(
  1,
  Number(
    process.argv
      .find((argument) => argument.startsWith('--concurrency='))
      ?.slice('--concurrency='.length) ??
      process.env.BILL_EXTRACT_CONCURRENCY ??
      12,
  ),
)
const limit = Number(
  process.argv
    .find((argument) => argument.startsWith('--limit='))
    ?.slice('--limit='.length) ?? 0,
)
const retryFailures = process.argv.includes('--retry-failures')

type GeneratedBills = {
  asOfDate: string
  bills: PolicyRegisterSeed[]
}

type GeneratedDocuments = {
  generatedAt: string
  asOfDate: string
  extractionVersion: string
  totalBills: number
  attempted: number
  officialText: number
  unreadable: number
  failed: number
  documents: BillDocumentExtractSeed[]
}

type DocumentSource = {
  url: string
  kind: BillDocumentExtractSeed['sourceKind']
}

function sourceFor(record: PolicyRegisterSeed): DocumentSource | null {
  const candidates: Array<
    [BillDocumentExtractSeed['sourceKind'], string | undefined]
  > = [
    ['introduced', record.introducedFile],
    ['passed-both-houses', record.passedBothHousesFile],
    ['passed-lok-sabha', record.passedLokSabhaFile],
    ['passed-rajya-sabha', record.passedRajyaSabhaFile],
    ['synopsis', record.synopsisFile],
    ['gazette', record.gazetteFile],
  ]
  const candidate = candidates.find(([, url]) => Boolean(url))
  return candidate?.[1] ? { kind: candidate[0], url: candidate[1] } : null
}

function normalizedText(value: string) {
  return value
    .replace(/\f/g, '\n')
    .split('\n')
    .map((line) =>
      line
        .replace(/^\s*\d{1,3}\s+(?=[A-Za-z(])/, '')
        .replace(/\s+\d{1,3}\s*$/, '')
        .trim(),
    )
    .filter(
      (line) =>
        line &&
        !/^AS (?:INTRODUCED|PASSED)/i.test(line) &&
        !/^Bill No\./i.test(line) &&
        !/^\d+$/.test(line),
    )
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function bounded(value: string | undefined, maximum: number) {
  if (!value) return undefined
  const cleaned = value.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= maximum) return cleaned
  const shortened = cleaned.slice(0, maximum)
  const sentenceEnd = Math.max(
    shortened.lastIndexOf('. '),
    shortened.lastIndexOf('; '),
  )
  return `${shortened.slice(0, sentenceEnd > maximum * 0.6 ? sentenceEnd + 1 : maximum).trim()}...`
}

function extractOfficialPurpose(text: string) {
  const match =
    /\bA\s+BILL\b([\s\S]{0,4500}?)(?:\bBE\s+it\s+enacted\b|\bB\s*E\s+it\s+enacted\b)/i.exec(
      text,
    )
  if (!match) return undefined
  const purpose = normalizedText(match[1])
    .replace(/^(?:to|further to)\s+/i, (prefix) => prefix.toLowerCase())
    .replace(/\s+Short title and commencement\.?$/i, '')
  return bounded(purpose, 1800)
}

function extractGovernmentRationale(text: string) {
  const match =
    /STATEMENT OF OBJECTS AND REASONS([\s\S]{0,22000}?)(?:FINANCIAL MEMORANDUM|MEMORANDUM REGARDING|NOTES ON CLAUSES|ANNEXURE|RAJYA SABHA|LOK SABHA)/i.exec(
      text,
    )
  if (!match) return undefined
  const statement = normalizedText(match[1])
    .replace(/\bNEW DELHI;?[\s\S]*$/i, '')
    .trim()
  if (!statement) return undefined

  const sentences = statement
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
  const purposeSentences = sentences.filter((sentence) =>
    /\b(the bill seeks|purpose of the bill|proposed bill|it is proposed|bill is therefore|bill seeks to achieve)\b/i.test(
      sentence,
    ),
  )
  return bounded(
    (purposeSentences.length > 0
      ? purposeSentences.slice(-3)
      : sentences.slice(0, 4)
    ).join(' '),
    1200,
  )
}

async function hasPdfToText() {
  try {
    await execFileAsync('pdftotext', ['-v'])
    return true
  } catch (error) {
    return (error as { stderr?: string }).stderr?.includes('pdftotext') ?? false
  }
}

async function extractRecord(
  record: PolicyRegisterSeed,
  source: DocumentSource,
): Promise<BillDocumentExtractSeed> {
  const extractedAt = new Date().toISOString()
  const tempDirectory = await mkdtemp(join(tmpdir(), 'india-mechanics-bill-'))
  const pdfPath = join(tempDirectory, 'bill.pdf')
  try {
    const response = await fetch(source.url, {
      headers: { 'user-agent': 'India-Mechanics-Bill-Explainer/0.1' },
      signal: AbortSignal.timeout(20_000),
    })
    if (!response.ok) {
      throw new Error(`download ${response.status}`)
    }
    const bytes = Buffer.from(await response.arrayBuffer())
    if (bytes.length > 25 * 1024 * 1024) {
      throw new Error(`document too large (${bytes.length} bytes)`)
    }
    await writeFile(pdfPath, bytes)
    const { stdout } = await execFileAsync(
      'pdftotext',
      ['-layout', pdfPath, '-'],
      { maxBuffer: 20 * 1024 * 1024 },
    )
    const officialPurpose = extractOfficialPurpose(stdout)
    const governmentRationale = extractGovernmentRationale(stdout)
    if (!officialPurpose && !governmentRationale) {
      return {
        billId: record.id,
        sourceUrl: source.url,
        sourceKind: source.kind,
        extractionStatus: 'unreadable',
        contentHash: createHash('sha256').update(bytes).digest('hex'),
        extractedAt,
      }
    }
    return {
      billId: record.id,
      sourceUrl: source.url,
      sourceKind: source.kind,
      extractionStatus: 'official-text',
      officialPurpose,
      governmentRationale,
      contentHash: createHash('sha256').update(bytes).digest('hex'),
      extractedAt,
    }
  } catch (error) {
    return {
      billId: record.id,
      sourceUrl: source.url,
      sourceKind: source.kind,
      extractionStatus: 'failed',
      governmentRationale:
        error instanceof Error ? error.message.slice(0, 240) : 'Unknown error',
      extractedAt,
    }
  } finally {
    await rm(tempDirectory, { recursive: true, force: true })
  }
}

async function readExisting() {
  if (!existsSync(outputPath)) return null
  return JSON.parse(await readFile(outputPath, 'utf8')) as GeneratedDocuments
}

async function main() {
  if (!(await hasPdfToText())) {
    console.warn(
      'pdftotext is unavailable; preserving the checked-in official-text cache and using title-derived explanations for new records.',
    )
    return
  }

  const generated = JSON.parse(
    await readFile(inputPath, 'utf8'),
  ) as GeneratedBills
  const existing = await readExisting()
  const existingById = new Map(
    (existing?.documents ?? []).map((document) => [document.billId, document]),
  )
  const candidates = generated.bills.flatMap((record) => {
    const source = sourceFor(record)
    if (!source) return []
    const cached = existingById.get(record.id)
    if (
      cached?.sourceUrl === source.url &&
      (cached.extractionStatus === 'official-text' ||
        cached.extractionStatus === 'unreadable' ||
        (!retryFailures && cached.extractionStatus === 'failed'))
    ) {
      return []
    }
    return [{ record, source }]
  })
  const selected = limit > 0 ? candidates.slice(0, limit) : candidates
  let nextIndex = 0
  let completed = 0
  const results: BillDocumentExtractSeed[] = []

  async function worker() {
    while (nextIndex < selected.length) {
      const index = nextIndex
      nextIndex += 1
      const candidate = selected[index]
      results.push(await extractRecord(candidate.record, candidate.source))
      completed += 1
      if (completed % 100 === 0 || completed === selected.length) {
        console.log(
          `Extracted ${completed.toLocaleString('en-IN')} of ${selected.length.toLocaleString('en-IN')} queued bill documents`,
        )
      }
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(concurrency, Math.max(selected.length, 1)) },
      () => worker(),
    ),
  )

  const currentIds = new Set(generated.bills.map((bill) => bill.id))
  const merged = new Map(
    (existing?.documents ?? [])
      .filter((document) => currentIds.has(document.billId))
      .map((document) => [document.billId, document]),
  )
  for (const result of results) merged.set(result.billId, result)
  const documents = generated.bills.flatMap((bill) => {
    const document = merged.get(bill.id)
    return document ? [document] : []
  })
  const payload: GeneratedDocuments = {
    generatedAt: new Date().toISOString(),
    asOfDate: generated.asOfDate,
    extractionVersion,
    totalBills: generated.bills.length,
    attempted: documents.length,
    officialText: documents.filter(
      (document) => document.extractionStatus === 'official-text',
    ).length,
    unreadable: documents.filter(
      (document) => document.extractionStatus === 'unreadable',
    ).length,
    failed: documents.filter(
      (document) => document.extractionStatus === 'failed',
    ).length,
    documents,
  }
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(
    `Wrote ${payload.officialText.toLocaleString('en-IN')} official-text extracts, ${payload.unreadable.toLocaleString('en-IN')} unreadable records, and ${payload.failed.toLocaleString('en-IN')} failures to ${outputPath}`,
  )
}

await main()
