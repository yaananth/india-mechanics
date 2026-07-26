import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { parse } from 'csv-parse/sync'
import { indicatorDefinitions } from '../server/seed-data/catalog.ts'
import type { IndicatorObservationSeed } from '../server/types.ts'

const asOfArgument = process.argv.find((argument) => argument.startsWith('--as-of='))
const asOfDate =
  asOfArgument?.slice('--as-of='.length) ??
  process.env.RESEARCH_AS_OF_DATE ??
  new Date().toISOString().slice(0, 10)
const asOfYear = Number(asOfDate.slice(0, 4))
const WORLD_BANK_CUTOFF = asOfYear
const VDEM_CUTOFF = asOfYear

const outputUrl = new URL(
  '../server/seed-data/generated-indicators.json',
  import.meta.url,
)

type WorldBankRow = {
  date: string
  value: number | null
}

type WorldBankResponse = [
  { lastupdated?: string },
  WorldBankRow[],
]

const vdemSeries = {
  'electoral-democracy': 'electoral-democracy-index',
  'liberal-democracy': 'liberal-democracy-index',
  'participatory-democracy': 'participatory-democracy-index',
} as const

const modelledWorldBankIndicators = new Set([
  'basic-sanitation',
  'rural-basic-sanitation',
  'rural-open-defecation',
])

const sleep = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

async function mapWithConcurrency<T, Result>(
  values: T[],
  concurrency: number,
  worker: (value: T) => Promise<Result>,
) {
  const results = new Array<Result>(values.length)
  let nextIndex = 0

  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, async () => {
      while (nextIndex < values.length) {
        const index = nextIndex
        nextIndex += 1
        results[index] = await worker(values[index])
      }
    }),
  )

  return results
}

async function fetchWorldBank(
  indicatorId: string,
  sourceCode: string,
): Promise<IndicatorObservationSeed[]> {
  const url =
    `https://api.worldbank.org/v2/country/IND/indicator/${sourceCode}` +
    '?format=json&per_page=100'
  let response: Response | null = null

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    response = await fetch(url)
    if (response.ok) break
    if (attempt < 4) await sleep(attempt * 750)
  }

  if (!response?.ok) {
    throw new Error(
      `World Bank request failed for ${sourceCode} after retries: ${response?.status ?? 'network error'}`,
    )
  }
  const payload = (await response.json()) as WorldBankResponse
  if (!Array.isArray(payload) || !Array.isArray(payload[1])) {
    throw new Error(`Unexpected World Bank payload for ${sourceCode}`)
  }

  return payload[1]
    .filter(
      (row) =>
        row.value !== null &&
        Number(row.date) >= 1945 &&
        Number(row.date) <= WORLD_BANK_CUTOFF,
    )
    .map((row) => ({
      indicatorId,
      jurisdictionId: 'india',
      period: Number(row.date),
      value: Number(row.value),
      status: modelledWorldBankIndicators.has(indicatorId)
        ? 'modelled'
        : 'observed',
      sourceId: 'world-bank-api',
      note: modelledWorldBankIndicators.has(indicatorId)
        ? 'WHO/UNICEF Joint Monitoring Programme modelled estimate delivered through the World Bank API.'
        : undefined,
    }))
}

async function fetchVdem(
  indicatorId: keyof typeof vdemSeries,
): Promise<IndicatorObservationSeed[]> {
  const slug = vdemSeries[indicatorId]
  const response = await fetch(`https://ourworldindata.org/grapher/${slug}.csv`)
  if (!response.ok) {
    throw new Error(`V-Dem mirror request failed for ${slug}: ${response.status}`)
  }
  const rows = parse(await response.text(), {
    columns: true,
    skip_empty_lines: true,
  }) as Array<Record<string, string>>

  return rows
    .filter(
      (row) =>
        row.Code === 'IND' &&
        Number(row.Year) >= 1945 &&
        Number(row.Year) <= VDEM_CUTOFF,
    )
    .map((row) => {
      const valueKey = Object.keys(row).find(
        (key) => !['Entity', 'Code', 'Year', 'World region'].includes(key),
      )
      if (!valueKey || Number.isNaN(Number(row[valueKey]))) {
        throw new Error(`No numeric V-Dem value found for ${slug} in ${row.Year}`)
      }
      return {
        indicatorId,
        jurisdictionId: 'india',
        period: Number(row.Year),
        value: Number(row[valueKey]),
        status: 'modelled',
        sourceId: 'owid-vdem',
        note: 'V-Dem point estimate retrieved through the Our World in Data mirror.',
      } satisfies IndicatorObservationSeed
    })
}

async function main() {
  const worldBankDefinitions = indicatorDefinitions.filter(
    (definition) =>
      definition.sourceCode &&
      definition.sourceId === 'world-bank-api',
  )

  const worldBankResults = await mapWithConcurrency(
    worldBankDefinitions,
    4,
    (definition) =>
      fetchWorldBank(definition.id, definition.sourceCode as string),
  )
  const vdemResults = await Promise.all(
    (Object.keys(vdemSeries) as Array<keyof typeof vdemSeries>).map(fetchVdem),
  )
  const observations = [...worldBankResults.flat(), ...vdemResults.flat()].sort(
    (left, right) =>
      left.indicatorId.localeCompare(right.indicatorId) ||
      left.period - right.period,
  )
  const worldBankPeriods = worldBankResults.flat().map((row) => row.period)
  const vdemPeriods = vdemResults.flat().map((row) => row.period)
  const latestWorldBankPeriod = Math.max(...worldBankPeriods)
  const latestVdemPeriod = Math.max(...vdemPeriods)
  const recommendedProgressYear = Math.min(
    asOfYear - 1,
    Math.max(latestWorldBankPeriod, latestVdemPeriod),
  )

  await mkdir(fileURLToPath(new URL('../server/seed-data/', import.meta.url)), {
    recursive: true,
  })
  await writeFile(
    fileURLToPath(outputUrl),
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        asOfDate,
        recommendedProgressYear,
        cutoffs: {
          worldBank: latestWorldBankPeriod,
          vdem: latestVdemPeriod,
        },
        observations,
      },
      null,
      2,
    )}\n`,
    'utf8',
  )

  console.log(
    `Wrote ${observations.length} observations to ${fileURLToPath(outputUrl)}`,
  )
}

await main()
