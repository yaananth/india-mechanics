import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { leaderTerms } from '../server/seed-data/catalog.ts'
import { linkedPolicyMatch } from '../server/seed-data/policy-register-links.ts'
import { applyPolicyRegisterOverride } from '../server/seed-data/policy-register-overrides.ts'
import type { PolicyRegisterSeed } from '../server/types.ts'

const asOfArgument = process.argv.find((argument) => argument.startsWith('--as-of='))
const asOfDate =
  asOfArgument?.slice('--as-of='.length) ??
  process.env.RESEARCH_AS_OF_DATE ??
  new Date().toISOString().slice(0, 10)
const pageSize = 1000
const endpoint = 'https://sansad.in/api_rs/legislation/getBills'
const outputUrl = new URL(
  '../server/seed-data/generated-bills.json',
  import.meta.url,
)

type SansadBill = {
  billNumber?: string | null
  billName?: string | null
  billType?: string | null
  billCategory?: string | null
  ministryName?: string | null
  billIntroducedInHouse?: string | null
  billIntroducedBy?: string | null
  billIntroducedDate?: string | null
  billIntroducedFile?: string | null
  billPassedInLSDate?: string | null
  billPassedInLSFile?: string | null
  billPassedInRSDate?: string | null
  billPassedInRSFile?: string | null
  billPassedInBothHousesFile?: string | null
  referredToCommitteeDate?: string | null
  reportPresentedDate?: string | null
  reportFile?: string | null
  actNo?: string | null
  actYear?: number | null
  billAssentedDate?: string | null
  billGazettedFile?: string | null
  billSynopsisFile?: string | null
  status?: string | null
}

type SansadResponse = {
  records: SansadBill[]
  _metadata: {
    currentPageNumber: number
    perPageSize: number
    totalElements: number
    totalPages: number
  }
}

function requestUrl(page: number) {
  const url = new URL(endpoint)
  url.searchParams.set('billType', 'Government')
  url.searchParams.set('page', String(page))
  url.searchParams.set('size', String(pageSize))
  url.searchParams.set('locale', 'en')
  url.searchParams.set('sortOn', 'billIntroducedDate')
  url.searchParams.set('sortBy', 'desc')
  return url
}

async function fetchPage(page: number) {
  const response = await fetch(requestUrl(page), {
    headers: { 'user-agent': 'India-Mechanics-Bill-Register/0.1' },
  })
  if (!response.ok) {
    throw new Error(`Sansad bills request failed for page ${page}: ${response.status}`)
  }
  return (await response.json()) as SansadResponse
}

function normalizedDate(value?: string | null) {
  if (!value) return undefined
  const trimmed = value.trim()
  const isoMatch = /^(\d{4}-\d{2}-\d{2})/.exec(trimmed)
  if (isoMatch) return isoMatch[1]
  const indianMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed)
  if (indianMatch) {
    return `${indianMatch[3]}-${indianMatch[2].padStart(2, '0')}-${indianMatch[1].padStart(2, '0')}`
  }
  return undefined
}

function clean(value?: string | null) {
  const result = value?.replace(/\s+/g, ' ').trim()
  return result || undefined
}

function httpsUrl(value?: string | null) {
  const result = clean(value)
  return result?.startsWith('https://') ? result : undefined
}

function termForDate(date: string) {
  return [...leaderTerms]
    .filter(
      (term) =>
        term.startDate <= date &&
        (!term.endDate || date <= term.endDate),
    )
    .sort((left, right) => right.startDate.localeCompare(left.startDate))[0]
}

function recordId(bill: SansadBill, date: string, title: string) {
  const identity = [
    clean(bill.billNumber) ?? '',
    title,
    date,
    clean(bill.billIntroducedInHouse) ?? '',
  ].join('|')
  const digest = createHash('sha256').update(identity).digest('hex').slice(0, 16)
  return `sansad-bill-${date}-${digest}`
}

function toRegisterRecord(bill: SansadBill): PolicyRegisterSeed | null {
  const title = clean(bill.billName)
  const introducedDate = normalizedDate(bill.billIntroducedDate)
  if (
    !title ||
    !introducedDate ||
    introducedDate < '1947-08-15' ||
    introducedDate > asOfDate
  ) {
    return null
  }
  const term = termForDate(introducedDate)
  const linkedPolicy = linkedPolicyMatch(title, introducedDate)
  const sourceStatus = clean(bill.status) ?? 'Unknown'
  return applyPolicyRegisterOverride({
    id: recordId(bill, introducedDate, title),
    jurisdictionId: 'india',
    leaderTermId: term?.id,
    linkedPolicyId: linkedPolicy?.policyId,
    linkedPolicyScope: linkedPolicy?.assessmentScope,
    billNumber: clean(bill.billNumber),
    title,
    ministry: clean(bill.ministryName),
    introducedBy: clean(bill.billIntroducedBy),
    introducedDate,
    introducedHouse: clean(bill.billIntroducedInHouse),
    billType: clean(bill.billType) ?? 'Government',
    category: clean(bill.billCategory),
    status: sourceStatus,
    passedLokSabhaDate: normalizedDate(bill.billPassedInLSDate),
    passedRajyaSabhaDate: normalizedDate(bill.billPassedInRSDate),
    referredCommitteeDate: normalizedDate(bill.referredToCommitteeDate),
    reportPresentedDate: normalizedDate(bill.reportPresentedDate),
    assentDate: normalizedDate(bill.billAssentedDate),
    actNumber: clean(bill.actNo),
    actYear: bill.actYear ?? undefined,
    introducedFile: httpsUrl(bill.billIntroducedFile),
    passedLokSabhaFile: httpsUrl(bill.billPassedInLSFile),
    passedRajyaSabhaFile: httpsUrl(bill.billPassedInRSFile),
    passedBothHousesFile: httpsUrl(bill.billPassedInBothHousesFile),
    committeeReportFile: httpsUrl(bill.reportFile),
    gazetteFile: httpsUrl(bill.billGazettedFile),
    synopsisFile: httpsUrl(bill.billSynopsisFile),
    sourceId: 'sansad-government-bills-api',
    reviewStatus: linkedPolicy ? 'reviewed' : 'discovered',
  })
}

async function main() {
  const firstPage = await fetchPage(1)
  const remainingPages = await Promise.all(
    Array.from(
      { length: Math.max(0, firstPage._metadata.totalPages - 1) },
      (_, index) => fetchPage(index + 2),
    ),
  )
  const records = [firstPage, ...remainingPages]
    .flatMap((page) => page.records)
    .map(toRegisterRecord)
    .filter((record): record is PolicyRegisterSeed => record !== null)

  const unique = new Map(records.map((record) => [record.id, record]))
  const bills = [...unique.values()].sort(
    (left, right) =>
      right.introducedDate.localeCompare(left.introducedDate) ||
      left.title.localeCompare(right.title),
  )
  const reviewed = bills.filter((bill) => bill.reviewStatus === 'reviewed').length

  await mkdir(fileURLToPath(new URL('../server/seed-data/', import.meta.url)), {
    recursive: true,
  })
  await writeFile(
    fileURLToPath(outputUrl),
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        asOfDate,
        sourceUrl: requestUrl(1).toString(),
        sourceTotal: firstPage._metadata.totalElements,
        total: bills.length,
        reviewed,
        bills,
      },
      null,
      2,
    )}\n`,
    'utf8',
  )
  console.log(
    `Wrote ${bills.length} government bills (${reviewed} linked to reviewed policies) to ${fileURLToPath(outputUrl)}`,
  )
}

await main()
