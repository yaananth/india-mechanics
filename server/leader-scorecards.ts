export const leaderScorecardVersion = 'leader-scorecard-v1'

export const leaderScorecardCategories = [
  {
    id: 'outcomes',
    name: 'Development and economy',
    description:
      'Economic direction, poverty, jobs, services, material living standards, and observed national or state outcomes.',
  },
  {
    id: 'reforms',
    name: 'Reform and state capacity',
    description:
      'Durable policy, institutional, administrative, digital, regulatory, and delivery-system improvements.',
  },
  {
    id: 'inclusion',
    name: 'Human development and inclusion',
    description:
      'Health, education, access, opportunity, distribution, gender, region, caste, community, and the social floor.',
  },
  {
    id: 'crisis',
    name: 'Security and crisis response',
    description:
      'War, terrorism, public safety, disasters, public health, internal conflict, prevention, and emergency response.',
  },
  {
    id: 'institutions',
    name: 'Institutions and rights',
    description:
      'Elections, legislatures, courts, media, federalism, civil liberties, opposition space, due process, and safeguards.',
  },
  {
    id: 'integrity',
    name: 'Integrity and execution',
    description:
      'Administrative competence, transparency, corruption exposure, project control, accountability, and follow-through.',
  },
] as const

export type LeaderScorecardCategoryId =
  (typeof leaderScorecardCategories)[number]['id']

const specialistParentCategory: Record<string, LeaderScorecardCategoryId> = {
  'national-security': 'crisis',
  'public-safety': 'crisis',
  'infrastructure-capacity': 'outcomes',
}

export type ScorecardComponent = {
  id: string
  name: string
  description: string
  score: number
  rationale: string
}

export type ScorecardSpecialist = {
  topicId: string
  topicName: string
  topicDescription: string
  methodology: string
  operationalLabel: string
  operationalScore: number
  adjustedLabel: string
  adjustedScore: number
  confidence: string
  status: string
  summary: string
  assessmentAsOf: string
  componentScores: unknown[]
  sources: unknown[]
}

export type LeaderScorecardEvidenceDensity = {
  claimCount: number
  claimSourceLinkCount: number
  classifiedClaimSourceLinkCount: number
  uniqueSourceCount: number
  termSourceCount: number
  sourceTypeCounts: Record<string, number>
  latestSourceAccessDate: string | null
}

export function arithmeticMean(values: number[]) {
  if (values.length === 0) return null
  return (
    Math.round(
      (values.reduce((total, value) => total + value, 0) / values.length) *
        10,
    ) / 10
  )
}

export function leaderScorecardOverall(
  scores: Record<string, number> | undefined,
) {
  if (!scores) return null
  const values = leaderScorecardCategories
    .map((category) => scores[category.id])
    .filter((value): value is number => Number.isFinite(value))
  if (values.length !== leaderScorecardCategories.length) return null
  return arithmeticMean(values)
}

export function buildLeaderScorecard({
  componentScores,
  specialistAssessments,
  confidence,
  assessmentAsOf,
  startDate,
  endDate,
  ratingProfiles,
  evidenceDensity,
}: {
  componentScores: ScorecardComponent[]
  specialistAssessments: ScorecardSpecialist[]
  confidence: string | null
  assessmentAsOf: string
  startDate: string
  endDate: string | null
  ratingProfiles: Array<{
    id: string
    name: string
    score: number
  }>
  evidenceDensity: LeaderScorecardEvidenceDensity
}) {
  const componentById = new Map(
    componentScores.map((component) => [component.id, component]),
  )
  const categories = leaderScorecardCategories.map((definition) => {
    const component = componentById.get(definition.id)
    const deepDives = specialistAssessments.filter(
      (assessment) =>
        specialistParentCategory[assessment.topicId] === definition.id,
    )
    return {
      id: definition.id,
      name: definition.name,
      description: definition.description,
      score: component?.score ?? null,
      rationale: component?.rationale ?? null,
      confidence: component ? confidence : null,
      status: component ? 'reviewed' : 'not-assessed',
      assessmentAsOf: component ? assessmentAsOf : null,
      methodology:
        'One of six equally weighted universal category judgments. The overall score is their arithmetic mean.',
      deepDives,
    }
  })
  const scored = categories
    .map((category) => category.score)
    .filter((score): score is number => score !== null)
  const profileScores = ratingProfiles
    .map((profile) => profile.score)
    .filter(Number.isFinite)
  const assessmentStatus = endDate ? 'retrospective' : 'provisional'

  return {
    version: leaderScorecardVersion,
    recordType: 'sourced-editorial-assessment' as const,
    assessmentStatus,
    termStatus: endDate ? ('completed' as const) : ('ongoing' as const),
    assessmentWindow: {
      startDate,
      endDate: endDate ?? assessmentAsOf,
      dataThrough: assessmentAsOf,
      fixedWindowComparisonPublished: false,
      subperiodScoresPublished: false,
    },
    aggregation: 'arithmetic-mean' as const,
    formula:
      'Overall = arithmetic mean of the six universal category scores. Each category contributes one-sixth.',
    weightsAreNormative: true,
    normativeWeightNote:
      'Equal category weights are a disclosed editorial value choice, not an empirical law.',
    normativeSensitivity: {
      minimum: profileScores.length > 0 ? Math.min(...profileScores) : null,
      maximum: profileScores.length > 0 ? Math.max(...profileScores) : null,
      profiles: ratingProfiles,
      note:
        'This range shows how the same category judgments move under alternative published priorities. It is not a confidence interval or measurement error.',
    },
    missingCategoryRule:
      'A rated term requires all six categories. Missing specialist deep dives remain visible but do not change the overall.',
    specialistRule:
      'Specialist assessments expand the relevant category and are not added again, preventing double-counting and research-coverage bias.',
    attributionRule:
      'This score summarizes an editorial assessment of the period under the government. Observed change during the term does not prove leader causation; inherited policy, states, institutions, private actors, and external conditions can share credit or responsibility.',
    comparisonLimit:
      assessmentStatus === 'provisional'
        ? 'This is an ongoing-term estimate with incomplete outcomes. No fixed-window or subperiod comparison is yet published, so it is not fully symmetric with completed terms.'
        : 'This completed-term estimate benefits from more hindsight. No fixed-window or subperiod comparison is yet published, so long terms can compress distinct phases.',
    falsifiersPublished: false,
    falsifierNote:
      'Category-specific raise/lower thresholds are not yet published. Until they are, the score is transparent editorial synthesis rather than a formally falsifiable measurement.',
    evidenceDensity,
    overallScore:
      scored.length === leaderScorecardCategories.length
        ? arithmeticMean(scored)
        : null,
    scoredCategoryCount: scored.length,
    totalCategoryCount: leaderScorecardCategories.length,
    categories,
  }
}
