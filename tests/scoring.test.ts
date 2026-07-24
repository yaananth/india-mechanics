import { describe, expect, it } from 'vitest'
import {
  aggregateProgress,
  confidenceForCoverage,
  normalizeIndicator,
  type ProgressDimension,
} from '../server/scoring.ts'

describe('progress scoring', () => {
  it('normalizes higher-is-better indicators to fixed goalposts', () => {
    expect(
      normalizeIndicator({
        value: 60,
        direction: 'higher',
        transform: 'linear',
        goalpostLow: 20,
        goalpostHigh: 100,
      }),
    ).toBe(50)
  })

  it('reverses lower-is-better indicators', () => {
    expect(
      normalizeIndicator({
        value: 30,
        direction: 'lower',
        transform: 'linear',
        goalpostLow: 10,
        goalpostHigh: 50,
      }),
    ).toBe(50)
  })

  it('clamps observations outside the declared goalposts', () => {
    expect(
      normalizeIndicator({
        value: 120,
        direction: 'higher',
        transform: 'linear',
        goalpostLow: 0,
        goalpostHigh: 100,
      }),
    ).toBe(100)
    expect(
      normalizeIndicator({
        value: -10,
        direction: 'higher',
        transform: 'linear',
        goalpostLow: 0,
        goalpostHigh: 100,
      }),
    ).toBe(0)
  })

  it('reduces confidence when coverage or freshness is weak', () => {
    expect(confidenceForCoverage(0.9, 2024, 2025)).toBe('high')
    expect(confidenceForCoverage(0.7, 2021, 2025)).toBe('medium')
    expect(confidenceForCoverage(0.4, 2024, 2025)).toBe('low')
  })

  it('does not let a low-coverage dimension enter the overall score', () => {
    const dimensions: ProgressDimension[] = [
      {
        id: 'strong',
        name: 'Strong',
        description: '',
        weight: 0.7,
        color: '#000',
        score: 80,
        coverage: 1,
        confidence: 'high',
        latestPeriod: 2024,
        indicators: [],
      },
      {
        id: 'thin',
        name: 'Thin',
        description: '',
        weight: 0.3,
        color: '#000',
        score: 10,
        coverage: 0.3,
        confidence: 'low',
        latestPeriod: 2024,
        indicators: [],
      },
    ]
    expect(aggregateProgress(dimensions, 2025).score).toBe(80)
  })
})
