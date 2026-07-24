import type { Confidence } from './types.ts'

export type ScoredIndicator = {
  id: string
  name: string
  shortName: string
  unit: string
  format: string
  value: number
  period: number
  status: string
  normalized: number
  weight: number
  sourceId: string
}

export type ProgressDimension = {
  id: string
  name: string
  description: string
  weight: number
  color: string
  score: number | null
  coverage: number
  confidence: Confidence
  latestPeriod: number | null
  indicators: ScoredIndicator[]
}

type NormalizeInput = {
  value: number
  direction: 'higher' | 'lower'
  transform: 'linear' | 'log'
  goalpostLow: number
  goalpostHigh: number
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

export function normalizeIndicator({
  value,
  direction,
  transform,
  goalpostLow,
  goalpostHigh,
}: NormalizeInput) {
  const applyTransform = (input: number) =>
    transform === 'log' ? Math.log(Math.max(input, Number.EPSILON)) : input

  const transformedValue = applyTransform(value)
  const transformedLow = applyTransform(goalpostLow)
  const transformedHigh = applyTransform(goalpostHigh)
  const ascending =
    (transformedValue - transformedLow) / (transformedHigh - transformedLow)
  const normalized = direction === 'higher' ? ascending : 1 - ascending

  return Math.round(clamp(normalized) * 1000) / 10
}

export function confidenceForCoverage(
  coverage: number,
  latestPeriod: number | null,
  targetYear: number,
): Confidence {
  const age = latestPeriod === null ? Number.POSITIVE_INFINITY : targetYear - latestPeriod
  if (coverage >= 0.85 && age <= 2) return 'high'
  if (coverage >= 0.55 && age <= 5) return 'medium'
  return 'low'
}

export function aggregateProgress(
  dimensions: ProgressDimension[],
  targetYear: number,
) {
  const scorable = dimensions.filter(
    (dimension) => dimension.score !== null && dimension.coverage >= 0.5,
  )
  const availableWeight = scorable.reduce(
    (sum, dimension) => sum + dimension.weight,
    0,
  )
  const score =
    availableWeight === 0
      ? null
      : scorable.reduce(
          (sum, dimension) =>
            sum + (dimension.score ?? 0) * dimension.weight,
          0,
        ) / availableWeight
  const coverage = dimensions.reduce(
    (sum, dimension) => sum + dimension.coverage * dimension.weight,
    0,
  )
  const latestPeriod =
    scorable.length === 0
      ? null
      : Math.min(...scorable.map((dimension) => dimension.latestPeriod ?? 0))
  const confidence = confidenceForCoverage(coverage, latestPeriod, targetYear)
  const uncertainty = Math.max(2.5, (1 - coverage) * 18)

  return {
    score: score === null ? null : Math.round(score * 10) / 10,
    coverage: Math.round(coverage * 1000) / 1000,
    confidence,
    lowerBound:
      score === null ? null : Math.round(Math.max(0, score - uncertainty) * 10) / 10,
    upperBound:
      score === null
        ? null
        : Math.round(Math.min(100, score + uncertainty) * 10) / 10,
    latestCommonPeriod: latestPeriod,
  }
}
