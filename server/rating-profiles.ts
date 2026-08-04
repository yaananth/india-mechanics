export const leaderRatingProfiles = [
  {
    id: 'balanced',
    name: 'Balanced',
    description:
      'Published score balancing development, inclusion, crisis performance, institutions, and execution.',
    weights: {
      outcomes: 0.3,
      reforms: 0.2,
      inclusion: 0.15,
      crisis: 0.1,
      institutions: 0.15,
      integrity: 0.1,
    },
  },
  {
    id: 'development',
    name: 'Broad development',
    description:
      'Prioritises material outcomes, durable reforms, inclusion, productivity, poverty reduction, and crisis resilience. Physical construction has a separate specialist score.',
    weights: {
      outcomes: 0.4,
      reforms: 0.25,
      inclusion: 0.15,
      crisis: 0.1,
      institutions: 0.05,
      integrity: 0.05,
    },
  },
  {
    id: 'human-capability',
    name: 'Human capability first',
    description:
      'Prioritises poverty, health, education, broad access, and distribution alongside economic outcomes.',
    weights: {
      outcomes: 0.3,
      reforms: 0.1,
      inclusion: 0.35,
      crisis: 0.1,
      institutions: 0.1,
      integrity: 0.05,
    },
  },
  {
    id: 'governance',
    name: 'Governance first',
    description:
      'Prioritises institutions, liberties, integrity, accountability, and crisis restraint.',
    weights: {
      outcomes: 0.1,
      reforms: 0.15,
      inclusion: 0.1,
      crisis: 0.15,
      institutions: 0.3,
      integrity: 0.2,
    },
  },
] as const

export type LeaderRatingProfile = (typeof leaderRatingProfiles)[number]

export function profileScore(
  scores: Record<string, number>,
  profile: LeaderRatingProfile,
) {
  const weighted = Object.entries(profile.weights).reduce(
    (sum, [dimensionId, weight]) =>
      sum + (scores[dimensionId] ?? 0) * weight,
    0,
  )
  return Math.round(weighted * 10) / 10
}
