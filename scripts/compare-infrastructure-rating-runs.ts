import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const dimensions = [
  'transport',
  'energy',
  'humanCapacity',
  'industrial',
  'quality',
] as const

type DimensionId = (typeof dimensions)[number]
type Scores = Record<DimensionId, number>
type TermResult = {
  scores: Scores
  buildout: number
  adjusted: number
}
type Run = {
  id: string
  terms: Record<string, TermResult>
}
type Input = {
  subject: string
  asOfDate: string
  weights: {
    buildout: Scores
    adjusted: Scores
  }
  website: Record<string, TermResult>
  runs: Run[]
}

const round = (value: number, digits = 2) => {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

function assertScore(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0 || value > 10) {
    throw new Error(`${label} must be between 0 and 10.`)
  }
}

function weighted(scores: Scores, weights: Scores) {
  return round(
    dimensions.reduce(
      (total, dimension) => total + scores[dimension] * weights[dimension],
      0,
    ),
    1,
  )
}

function summarize(values: number[]) {
  const mean = values.reduce((total, value) => total + value, 0) / values.length
  const variance =
    values.reduce((total, value) => total + (value - mean) ** 2, 0) /
    values.length
  return {
    mean: round(mean),
    standardDeviation: round(Math.sqrt(variance)),
    minimum: Math.min(...values),
    maximum: Math.max(...values),
  }
}

const inputPath = resolve(
  process.argv[2] ??
    'research/infrastructure-rating-replications-2026-08-04.json',
)
const input = JSON.parse(await readFile(inputPath, 'utf8')) as Input

if (input.runs.length !== 3) {
  throw new Error(`Expected three replications, received ${input.runs.length}.`)
}

for (const profile of ['buildout', 'adjusted'] as const) {
  const total = dimensions.reduce(
    (sum, dimension) => sum + input.weights[profile][dimension],
    0,
  )
  if (Math.abs(total - 1) > 0.0001) {
    throw new Error(`${profile} weights sum to ${total}, not 1.`)
  }
}

const termIds = Object.keys(input.website)
for (const run of input.runs) {
  for (const termId of termIds) {
    const result = run.terms[termId]
    if (!result) throw new Error(`${run.id} is missing ${termId}.`)
    for (const dimension of dimensions) {
      assertScore(result.scores[dimension], `${run.id} ${termId} ${dimension}`)
    }
    if (weighted(result.scores, input.weights.buildout) !== result.buildout) {
      throw new Error(`${run.id} ${termId} buildout arithmetic mismatch.`)
    }
    if (weighted(result.scores, input.weights.adjusted) !== result.adjusted) {
      throw new Error(`${run.id} ${termId} adjusted arithmetic mismatch.`)
    }
  }
}

const terms = Object.fromEntries(
  termIds.map((termId) => {
    const buildout = summarize(
      input.runs.map((run) => run.terms[termId].buildout),
    )
    const adjusted = summarize(
      input.runs.map((run) => run.terms[termId].adjusted),
    )
    const website = input.website[termId]
    const componentMeans = Object.fromEntries(
      dimensions.map((dimension) => [
        dimension,
        round(
          input.runs.reduce(
            (total, run) => total + run.terms[termId].scores[dimension],
            0,
          ) / input.runs.length,
        ),
      ]),
    )
    return [
      termId,
      {
        buildout: {
          ...buildout,
          website: website.buildout,
          websiteMeanDelta: round(website.buildout - buildout.mean),
        },
        adjusted: {
          ...adjusted,
          website: website.adjusted,
          websiteMeanDelta: round(website.adjusted - adjusted.mean),
        },
        componentMeans,
      },
    ]
  }),
)

const stable = Object.values(terms).every(
  (term) =>
    Math.abs(term.buildout.websiteMeanDelta) <= 0.25 &&
    Math.abs(term.adjusted.websiteMeanDelta) <= 0.25 &&
    term.buildout.standardDeviation <= 0.25 &&
    term.adjusted.standardDeviation <= 0.25,
)

console.log(
  JSON.stringify(
    {
      subject: input.subject,
      asOfDate: input.asOfDate,
      runCount: input.runs.length,
      terms,
      status: stable ? 'stable' : 'review-required',
    },
    null,
    2,
  ),
)

if (!stable) process.exitCode = 1
