import type { DatabaseSync } from 'node:sqlite'
import {
  aggregateProgress,
  confidenceForCoverage,
  normalizeIndicator,
  type ProgressDimension,
  type ScoredIndicator,
} from './scoring.ts'

type DimensionRow = {
  id: string
  name: string
  weight: number
  description: string
  color: string
}

type IndicatorRow = {
  id: string
  name: string
  short_name: string
  unit: string
  format: string
  dimension_weight: number
  direction: 'higher' | 'lower'
  transform: 'linear' | 'log'
  goalpost_low: number
  goalpost_high: number
  frequency: 'annual' | 'survey'
}

type ObservationRow = {
  period: number
  value: number
  status: string
  source_id: string
}

const maxAgeByFrequency = {
  annual: 5,
  survey: 12,
} as const

export function calculateProgress(
  db: DatabaseSync,
  jurisdictionId: string,
  targetYear: number,
) {
  const dimensions = db
    .prepare(
      `SELECT id, name, weight, description, color
       FROM progress_dimensions
       ORDER BY rowid`,
    )
    .all() as unknown as DimensionRow[]
  const indicatorStatement = db.prepare(
    `SELECT id, name, short_name, unit, format, dimension_weight, direction,
            transform, goalpost_low, goalpost_high, frequency
     FROM indicator_definitions
     WHERE dimension_id = ? AND score_role = 'scored'
       AND EXISTS (
         SELECT 1
         FROM indicator_observations observation
         WHERE observation.jurisdiction_id = ?
           AND observation.indicator_id = indicator_definitions.id
       )
     ORDER BY rowid`,
  )
  const observationStatement = db.prepare(
    `SELECT period, value, status, source_id
     FROM indicator_observations
     WHERE jurisdiction_id = ? AND indicator_id = ? AND period <= ?
     ORDER BY period DESC
     LIMIT 1`,
  )

  const scoredDimensions: ProgressDimension[] = dimensions.map((dimension) => {
    const definitions = indicatorStatement.all(
      dimension.id,
      jurisdictionId,
    ) as unknown as IndicatorRow[]
    const totalWeight = definitions.reduce(
      (sum, definition) => sum + definition.dimension_weight,
      0,
    )
    const indicators = definitions
      .map((definition): ScoredIndicator | null => {
        const observation = observationStatement.get(
          jurisdictionId,
          definition.id,
          targetYear,
        ) as unknown as ObservationRow | undefined
        if (
          !observation ||
          targetYear - observation.period > maxAgeByFrequency[definition.frequency]
        ) {
          return null
        }
        return {
          id: definition.id,
          name: definition.name,
          shortName: definition.short_name,
          unit: definition.unit,
          format: definition.format,
          value: observation.value,
          period: observation.period,
          status: observation.status,
          normalized: normalizeIndicator({
            value: observation.value,
            direction: definition.direction,
            transform: definition.transform,
            goalpostLow: definition.goalpost_low,
            goalpostHigh: definition.goalpost_high,
          }),
          weight: definition.dimension_weight,
          sourceId: observation.source_id,
        }
      })
      .filter((indicator): indicator is ScoredIndicator => indicator !== null)

    const availableWeight = indicators.reduce(
      (sum, indicator) => sum + indicator.weight,
      0,
    )
    const coverage = totalWeight === 0 ? 0 : availableWeight / totalWeight
    const score =
      availableWeight === 0
        ? null
        : indicators.reduce(
            (sum, indicator) => sum + indicator.normalized * indicator.weight,
            0,
          ) / availableWeight
    const latestPeriod =
      indicators.length === 0
        ? null
        : Math.min(...indicators.map((indicator) => indicator.period))

    let confidence = confidenceForCoverage(coverage, latestPeriod, targetYear)
    if (
      confidence === 'high' &&
      indicators.some(
        (indicator) =>
          indicator.status === 'estimated' || indicator.status === 'modelled',
      )
    ) {
      confidence = 'medium'
    }

    return {
      id: dimension.id,
      name: dimension.name,
      description: dimension.description,
      weight: dimension.weight,
      color: dimension.color,
      score: score === null ? null : Math.round(score * 10) / 10,
      coverage: Math.round(coverage * 1000) / 1000,
      confidence,
      latestPeriod,
      indicators,
    }
  })

  return {
    targetYear,
    dimensions: scoredDimensions,
    overall: aggregateProgress(scoredDimensions, targetYear),
  }
}

export function calculateProgressHistory(
  db: DatabaseSync,
  jurisdictionId: string,
  years = [1960, 1970, 1980, 1990, 2000, 2010, 2015, 2020, 2024],
) {
  return years.map((year) => {
    const result = calculateProgress(db, jurisdictionId, year)
    return {
      year,
      score: result.overall.score,
      lowerBound: result.overall.lowerBound,
      upperBound: result.overall.upperBound,
      coverage: result.overall.coverage,
      confidence: result.overall.confidence,
    }
  })
}
