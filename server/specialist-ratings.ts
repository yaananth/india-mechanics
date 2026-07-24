export type SpecialistWeightField =
  | 'operationalWeight'
  | 'adjustedWeight'

export type SpecialistDimension = {
  id: string
  operationalWeight: number
  adjustedWeight: number
}

export function specialistScore(
  scores: Record<string, number>,
  dimensions: SpecialistDimension[],
  weightField: SpecialistWeightField,
) {
  let weightedTotal = 0
  let availableWeight = 0

  for (const dimension of dimensions) {
    const score = scores[dimension.id]
    const weight = dimension[weightField]
    if (score === undefined || weight <= 0) continue
    weightedTotal += score * weight
    availableWeight += weight
  }

  if (availableWeight === 0) return null
  return Math.round((weightedTotal / availableWeight) * 10) / 10
}
