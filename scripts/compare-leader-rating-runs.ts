import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const replicationWeights = {
  outcomes: 0.25,
  reforms: 0.2,
  inclusion: 0.15,
  crisis: 0.15,
  institutions: 0.15,
  integrity: 0.1,
} as const

const legacyBalancedProfileWeights = {
  outcomes: 0.3,
  reforms: 0.2,
  inclusion: 0.15,
  crisis: 0.1,
  institutions: 0.15,
  integrity: 0.1,
} as const

type ComponentId = keyof typeof replicationWeights

type RatingRun = {
  id: string
  genericRating: number
  standardizedRating: number
  componentScores: Record<ComponentId, number>
  confidence: 'low' | 'medium' | 'high'
  sourceUrls: string[]
}

type AuditInput = {
  subject: string
  asOfDate: string
  promptHash: string
  previousWebsite?: {
    rating: number
    componentScores: Record<ComponentId, number>
  }
  website: {
    rating: number
    componentScores: Record<ComponentId, number>
    sourceUrls: string[]
  }
  thresholds?: {
    maximumStandardDeviation?: number
    maximumRange?: number
    maximumWebsiteMeanDelta?: number
  }
  runs: RatingRun[]
}

function assertScore(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0 || value > 10) {
    throw new Error(`${label} must be between 0 and 10.`)
  }
}

function weightedScore(
  scores: Record<ComponentId, number>,
  weights: Record<ComponentId, number>,
) {
  return Object.entries(weights).reduce(
    (total, [component, weight]) =>
      total + scores[component as ComponentId] * weight,
    0,
  )
}

function arithmeticMean(scores: Record<ComponentId, number>) {
  const values = Object.keys(replicationWeights).map(
    (component) => scores[component as ComponentId],
  )
  return values.reduce((total, value) => total + value, 0) / values.length
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

function summarize(values: number[]) {
  const mean = values.reduce((total, value) => total + value, 0) / values.length
  const sorted = [...values].sort((left, right) => left - right)
  const median = sorted[Math.floor(sorted.length / 2)]
  const variance =
    values.reduce((total, value) => total + (value - mean) ** 2, 0) /
    values.length

  return {
    mean: round(mean),
    median: round(median),
    standardDeviation: round(Math.sqrt(variance)),
    minimum: round(sorted[0]),
    maximum: round(sorted.at(-1) ?? sorted[0]),
    range: round((sorted.at(-1) ?? sorted[0]) - sorted[0]),
  }
}

function sourceDomain(url: string) {
  const parsed = new URL(url)
  const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '')
  for (const family of [
    'worldbank.org',
    'sci.gov.in',
    'pib.gov.in',
    'rbi.org.in',
  ]) {
    if (hostname === family || hostname.endsWith(`.${family}`)) return family
  }
  return hostname
}

const inputPath = resolve(
  process.argv[2] ?? 'research/modi-rating-replications-2026-07-23.json',
)
const expectedCurrentHeadlineRating = Number(process.argv[3])
const input = JSON.parse(await readFile(inputPath, 'utf8')) as AuditInput

if (!Number.isFinite(expectedCurrentHeadlineRating)) {
  throw new Error(
    'Expected the current six-category headline rating as the second argument.',
  )
}

if (input.runs.length !== 5) {
  throw new Error(`Expected exactly five runs, received ${input.runs.length}.`)
}

const runIds = new Set<string>()
for (const run of input.runs) {
  if (!run.id || runIds.has(run.id)) {
    throw new Error(`Run IDs must be present and unique: ${run.id || '<empty>'}.`)
  }
  runIds.add(run.id)
  assertScore(run.genericRating, `${run.id} generic rating`)
  assertScore(run.standardizedRating, `${run.id} standardized rating`)

  for (const component of Object.keys(replicationWeights) as ComponentId[]) {
    assertScore(run.componentScores[component], `${run.id} ${component}`)
  }

  const computed = round(
    weightedScore(run.componentScores, replicationWeights),
    1,
  )
  if (Math.abs(computed - run.standardizedRating) > 0.05) {
    throw new Error(
      `${run.id} standardized rating ${run.standardizedRating} does not match weighted score ${computed}.`,
    )
  }
}

const generic = summarize(input.runs.map((run) => run.genericRating))
const standardized = summarize(
  input.runs.map((run) => run.standardizedRating),
)
const componentSummary = Object.fromEntries(
  (Object.keys(replicationWeights) as ComponentId[]).map((component) => {
    const summary = summarize(
      input.runs.map((run) => run.componentScores[component]),
    )
    return [
      component,
      {
        ...summary,
        websiteScore: input.website.componentScores[component],
        websiteMeanDelta: round(
          input.website.componentScores[component] - summary.mean,
        ),
      },
    ]
  }),
)

const domainCounts = new Map<string, number>()
for (const run of input.runs) {
  const domains = new Set(run.sourceUrls.map(sourceDomain))
  for (const domain of domains) {
    domainCounts.set(domain, (domainCounts.get(domain) ?? 0) + 1)
  }
}

const consensusDomains = [...domainCounts.entries()]
  .filter(([, count]) => count >= 3)
  .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
  .map(([domain, count]) => ({ domain, runs: count }))
const websiteDomains = new Set(input.website.sourceUrls.map(sourceDomain))
const consensusDomainSet = new Set(consensusDomains.map((item) => item.domain))

const thresholds = {
  maximumStandardDeviation: 0.35,
  maximumRange: 1,
  maximumWebsiteMeanDelta: 0.5,
  ...input.thresholds,
}
const websiteMeanDelta = round(input.website.rating - standardized.mean)
const computedLegacyBalancedProfileScore = round(
  weightedScore(input.website.componentScores, legacyBalancedProfileWeights),
  1,
)
const currentArithmeticMean = round(
  arithmeticMean(input.website.componentScores),
  1,
)
const checks = {
  standardDeviation:
    standardized.standardDeviation <= thresholds.maximumStandardDeviation,
  range: standardized.range <= thresholds.maximumRange,
  websiteMeanDelta:
    Math.abs(websiteMeanDelta) <= thresholds.maximumWebsiteMeanDelta,
  legacyBalancedProfile:
    Math.abs(input.website.rating - computedLegacyBalancedProfileScore) <= 0.05,
  currentArithmeticMean:
    Math.abs(currentArithmeticMean - expectedCurrentHeadlineRating) <= 0.05,
}

const report = {
  subject: input.subject,
  asOfDate: input.asOfDate,
  promptHash: input.promptHash,
  runCount: input.runs.length,
  historicalReplicationArtifact: {
    asOfDate: input.asOfDate,
    legacyBalancedProfileScore: input.website.rating,
    previousLegacyBalancedProfileScore:
      input.previousWebsite?.rating ?? null,
  },
  currentPublishedScorecard: {
    aggregation: 'arithmetic-mean',
    categoryCount: Object.keys(replicationWeights).length,
    score: currentArithmeticMean,
    expectedScore: expectedCurrentHeadlineRating,
  },
  generic,
  standardized: {
    ...standardized,
    legacyBalancedProfileMeanDelta: websiteMeanDelta,
  },
  componentSummary,
  sourceConsensus: {
    consensusDomains,
    consensusMissingFromWebsite: consensusDomains.filter(
      ({ domain }) => !websiteDomains.has(domain),
    ),
    websiteOnlyDomains: [...websiteDomains]
      .filter((domain) => !consensusDomainSet.has(domain))
      .sort(),
  },
  thresholds,
  checks,
  status: Object.values(checks).every(Boolean) ? 'stable' : 'review-required',
}

console.log(JSON.stringify(report, null, 2))
if (report.status !== 'stable') process.exitCode = 1
