export type ViewId =
  | 'overview'
  | 'timeline'
  | 'leaders'
  | 'policies'
  | 'budgets'
  | 'safety'
  | 'indicators'
  | 'sources'

export type Confidence = 'low' | 'medium' | 'high'

export type Jurisdiction = {
  id: string
  name: string
  shortName: string
  level: 'country' | 'state' | 'union-territory'
  parentId: string | null
  isoCode: string | null
  validFrom: string
  validTo: string | null
  status: 'published' | 'researching' | 'planned'
}

export type Source = {
  id: string
  title: string
  publisher: string
  url: string
  canonicalUrl: string
  archiveUrl: string | null
  author: string | null
  jurisdictionId: string | null
  language: string
  licenseStatus: string
  paywallStatus: string
  contentHash: string | null
  sourceType: string
  reliability: number
  rubricVersion: string
  linkStatus: string
  ratingReason: string
  bestFor: string
  limitations: string
  publishedDate: string | null
  accessedDate: string
}

export type Claim = {
  id: string
  title: string
  body: string
  stance: 'achievement' | 'concern' | 'context' | 'mixed'
  category: string
  confidence: Confidence
  asOfDate: string
  sourceIds: string[]
  sources: Source[]
}

export type AnswerClaim = Claim & {
  section: 'achievement' | 'concern' | 'context'
  sortOrder: number
}

export type CuratedAnswer = {
  id: string
  question: string
  aliases: string[]
  shortAnswer: string
  verdict: string
  confidence: Confidence
  asOfDate: string
  claims: AnswerClaim[]
}

export type ComponentScore = {
  id: string
  name: string
  weight: number
  description: string
  score: number
  rationale: string
}

export type SpecialistAssessment = {
  id: string
  topicId: string
  topicName: string
  topicDescription: string
  methodology: string
  operationalLabel: string
  operationalScore: number
  adjustedLabel: string
  adjustedScore: number
  confidence: Confidence
  status: 'reviewed' | 'provisional'
  summary: string
  assessmentAsOf: string
  componentScores: Array<{
    id: string
    name: string
    operationalWeight: number
    adjustedWeight: number
    description: string
    score: number
    rationale: string
  }>
  sources: Source[]
}

export type LeaderScorecardCategory = {
  id: string
  name: string
  description: string
  score: number | null
  rationale: string | null
  confidence: Confidence | null
  status: 'reviewed' | 'not-assessed'
  assessmentAsOf: string | null
  methodology: string
  deepDives: SpecialistAssessment[]
}

export type LeaderScorecard = {
  version: string
  aggregation: 'arithmetic-mean'
  formula: string
  missingCategoryRule: string
  specialistRule: string
  overallScore: number | null
  scoredCategoryCount: number
  totalCategoryCount: number
  categories: LeaderScorecardCategory[]
}

export type LeaderTerm = {
  id: string
  startDate: string
  endDate: string | null
  isActing: boolean
  mandateLabel: string | null
  ratingScore: number | null
  legacyWeightedScore: number | null
  ratingConfidence: Confidence | null
  ratingSummary: string
  assessmentAsOf: string
  person: {
    id: string
    name: string
  }
  office: {
    id: string
    name: string
    shortName: string
  }
  party: {
    id: string
    name: string
    shortName: string
    color: string
  } | null
  componentScores: ComponentScore[]
  ratingProfiles: Array<{
    id: string
    name: string
    description: string
    score: number
    weights: Record<string, number>
    isCanonical: boolean
  }>
  specialistAssessments: SpecialistAssessment[]
  scorecard: LeaderScorecard
  claims: Claim[]
  sourceIds: string[]
  sources: Source[]
  ratingAudit: {
    id: string
    runCount: number
    genericMean: number
    standardizedMean: number
    standardDeviation: number
    minimum: number
    maximum: number
    previousRating: number
    revisedRating: number
    promptHash: string
    status: 'stable' | 'review-required'
    reviewedAt: string
    consensusSources: string[]
    notes: string
  } | null
}

export type Policy = {
  id: string
  title: string
  shortTitle: string
  policyType: string
  introducedDate: string | null
  enactedDate: string | null
  effectiveDate: string | null
  status:
    | 'enacted'
    | 'pending'
    | 'repealed'
    | 'executive-action'
    | 'infructuous'
  coverageStatus: 'reviewed' | 'partial' | 'placeholder'
  ratingBasis: 'retrospective' | 'design'
  summary: string
  intendedGoal: string
  ratingScore: number
  ratingConfidence: Confidence
  ratingSummary: string
  assessmentAsOf: string
  leaderTermId: string
  leader: {
    id: string
    name: string
    termStartDate: string
    termEndDate: string | null
  }
  party: LeaderTerm['party']
  componentScores: Array<Omit<ComponentScore, 'score'> & { score: number | null }>
  claims: Claim[]
  sourceIds: string[]
  sources: Source[]
}

export type BillRecord = {
  id: string
  billNumber: string | null
  title: string
  ministry: string | null
  introducedBy: string | null
  introducedDate: string
  introducedHouse: string | null
  billType: string
  category: string | null
  status: string
  sourceStatus: string
  statusAsOf: string | null
  statusNote: string | null
  statusSourceId: string | null
  passedLokSabhaDate: string | null
  passedRajyaSabhaDate: string | null
  referredCommitteeDate: string | null
  reportPresentedDate: string | null
  assentDate: string | null
  actNumber: string | null
  actYear: number | null
  introducedFile: string | null
  passedLokSabhaFile: string | null
  passedRajyaSabhaFile: string | null
  passedBothHousesFile: string | null
  committeeReportFile: string | null
  gazetteFile: string | null
  synopsisFile: string | null
  reviewStatus: 'discovered' | 'reviewing' | 'reviewed'
  linkedPolicyId: string | null
  linkedPolicyScope: 'bill-specific' | 'policy-family' | null
  leaderTermId: string | null
  explanation: {
    proposalSummary: string
    officialPurpose: string | null
    governmentRationale: string | null
    affectedGroups: string[]
    potentialBenefits: string
    potentialRisks: string
    evidenceBasis: 'title-only' | 'official-text' | 'independent-review'
    specificity: 'explicit' | 'domain-only' | 'opaque'
    assessmentScope: 'none' | 'bill-specific' | 'policy-family'
    verdict: 'not-assessed' | 'reviewed-policy'
    verdictKind: 'none' | 'provisional-design' | 'retrospective'
    verdictRationale: string
    confidence: Confidence
    assessmentAsOf: string
    methodologyVersion: string
    documentUrl: string | null
    documentHash: string | null
  }
  assessment: {
    policyId: string
    title: string
    summary: string
    intendedGoal: string
    ratingScore: number
    ratingConfidence: Confidence
    ratingSummary: string
    ratingBasis: 'design' | 'retrospective'
    status: Policy['status']
    assessmentAsOf: string
    scope: 'bill-specific' | 'policy-family'
  } | null
  leader: {
    id: string
    name: string
    startDate: string
    endDate: string | null
  } | null
  party: {
    id: string
    shortName: string
    color: string
  } | null
  sources: Source[]
}

export type BillRegisterResponse = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  reviewed: number
  explained: number
  officialOrReviewed: number
  records: BillRecord[]
  facets: {
    statuses: Array<{ status: string; count: number }>
    ministries: Array<{ ministry: string; count: number }>
    leaders: Array<{ id: string; name: string; count: number }>
  }
  source: Source
}

export type BudgetAllocation = {
  id: string
  category: string
  label: string
  amountCrore: number
  previousAmountCrore: number | null
  changePercent: number | null
  note: string
  sortOrder: number
  shareOfTotal: number | null
  source: Source
}

export type BudgetPoint = {
  id: string
  pointType: 'priority' | 'strength' | 'risk' | 'context'
  title: string
  body: string
  sortOrder: number
  source: Source
}

export type Budget = {
  id: string
  title: string
  shortTitle: string
  fiscalYear: string
  presentedDate: string | null
  financeMinister: string
  budgetKind: 'full' | 'interim'
  status: 'completed' | 'current'
  coverageStatus: 'reviewed' | 'partial'
  ratingBasis: 'retrospective' | 'proposal'
  summary: string
  plainLanguage: string
  totalExpenditureCrore: number | null
  revenueExpenditureCrore: number | null
  capitalExpenditureCrore: number | null
  fiscalDeficitCrore: number | null
  fiscalDeficitPctGdp: number | null
  ratingScore: number
  ratingConfidence: Confidence
  ratingSummary: string
  assessmentAsOf: string
  leaderTermId: string
  leader: {
    id: string
    name: string
    termStartDate: string
    termEndDate: string | null
  }
  party: LeaderTerm['party']
  componentScores: ComponentScore[]
  allocations: BudgetAllocation[]
  points: BudgetPoint[]
  sourceIds: string[]
  sources: Source[]
}

export type TimelineEvent = {
  id: string
  date: string
  endDate: string | null
  title: string
  summary: string
  significance: string
  category: string
  confidence: Confidence
  sourceIds: string[]
  sources: Source[]
  leaderTermIds: string[]
  governments: Array<{
    termId: string
    startDate: string
    endDate: string | null
    leader: {
      id: string
      name: string
    }
    office: {
      id: string
      name: string
      shortName: string
    }
    party: LeaderTerm['party']
  }>
  relatedPolicies: Array<{
    id: string
    title: string
    shortTitle: string
    ratingScore: number
    ratingConfidence: Confidence
  }>
  relatedIndicators: Array<{
    id: string
    name: string
    shortName: string
    unit: string
    format: string
  }>
  accountability: {
    choiceAssessment:
      | 'right'
      | 'mostly-right'
      | 'mixed'
      | 'mostly-wrong'
      | 'wrong'
      | 'contested'
      | 'not-a-policy-choice'
    choiceScore: number | null
    choiceReason: string
    unionRole: string
    stateLocalRole: string
    positiveOutcomes: string
    lessons: string
    confidence: Confidence
    assessmentAsOf: string
    responsibilities: Array<{
      actorType: string
      actorName: string
      responsibilityKind: string
      level: number
      assessment: string
      confidence: Confidence
    }>
  } | null
}

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

export type Progress = {
  targetYear: number
  dimensions: ProgressDimension[]
  overall: {
    score: number | null
    coverage: number
    confidence: Confidence
    lowerBound: number | null
    upperBound: number | null
    latestCommonPeriod: number | null
  }
}

export type ProgressHistoryPoint = {
  year: number
  score: number | null
  lowerBound: number | null
  upperBound: number | null
  coverage: number
  confidence: Confidence
}

export type Overview = {
  jurisdictionId: string
  jurisdiction: Jurisdiction
  targetYear: number
  knowledge: {
    cutoff: string
    editorialReviewedThrough: string
    politicalStatusChecked: string
    billRegisterAsOfDate: string
    indicatorAsOfDate: string
    latestWorldBankPeriod: number
    latestVdemPeriod: number
    timelineStarts: string
  }
  progress: Progress
  progressHistory: ProgressHistoryPoint[]
  currentTerm: LeaderTerm
  featuredPolicy: Policy
  featuredAnswer: CuratedAnswer
  questions: Array<{
    id: string
    question: string
    shortAnswer: string
    confidence: Confidence
    asOfDate: string
  }>
  recentEvents: TimelineEvent[]
}

export type IndicatorDefinition = {
  id: string
  sourceCode: string | null
  name: string
  shortName: string
  description: string
  plainLanguage: string
  example: string
  unit: string
  format: 'number' | 'percent' | 'currency' | 'index'
  dimensionId: string
  dimensionName: string
  dimensionColor: string
  dimensionWeight: number
  direction: 'higher' | 'lower' | 'neutral'
  scoreRole: 'scored' | 'context'
  transform: 'linear' | 'log'
  goalpostLow: number
  goalpostHigh: number
  frequency: 'annual' | 'survey'
  stateReady: boolean
  sourceId: string
  latest: {
    period: number
    value: number
    status: string
    source_id: string
    note: string | null
  } | null
}

export type IndicatorTermChange = {
  termId: string
  leader: {
    id: string
    name: string
  }
  party: {
    shortName: string
    color: string | null
  } | null
  startDate: string
  endDate: string | null
  isCurrent: boolean
  baseline: {
    period: number
    value: number
    status: string
  }
  endpoint: {
    period: number
    value: number
    status: string
  }
  baselineKind:
    | 'before-term-start'
    | 'term-start-year'
    | 'first-within-term'
  absoluteChange: number
  percentChange: number | null
  annualizedChange: number
  elapsedDataYears: number
  directionAssessment: 'improved' | 'worsened' | 'flat' | 'context'
}

export type IndicatorSeries = {
  definition: IndicatorDefinition
  observations: Array<{
    period: number
    value: number
    status: string
    sourceId: string
    note: string | null
  }>
  termChanges: IndicatorTermChange[]
  attributionCaveat: string
  source: Source
  comparison: {
    title: string
    periodStart: number
    periodEnd: number
    exchangeRate: {
      start: number
      end: number
      rateIncreasePercent: number
      rupeeDollarValueChangePercent: number
    }
    realGdpPerCapita: {
      start: number
      end: number
      changePercent: number
    }
    explanation: string[]
    conclusion: string
    sources: Source[]
  } | null
}

export type Methodology = {
  version: string
  progress: {
    purpose: string
    formula: string
    dimensions: Array<{
      id: string
      name: string
      weight: number
      description: string
      color: string
    }>
    uncertainty: string
    attribution: string
  }
  leaderEvaluation: {
    purpose: string
    formula: string
    dimensions: Array<{
      id: string
      name: string
      weight: number
      description: string
    }>
    profiles: Array<{
      id: string
      name: string
      description: string
      weights: Record<string, number>
      isCanonical: boolean
    }>
  }
  leaderScorecard: {
    version: string
    aggregation: 'arithmetic-mean'
    formula: string
    missingCategoryRule: string
    specialistRule: string
    categories: Array<{
      id: string
      name: string
      description: string
    }>
  }
  specialistEvaluations: Array<{
    id: string
    name: string
    description: string
    operationalLabel: string
    adjustedLabel: string
    methodology: string
    dimensions: Array<{
      id: string
      name: string
      operationalWeight: number
      adjustedWeight: number
      description: string
    }>
  }>
  policyEvaluation: {
    purpose: string
    formula: string
    dimensions: Array<{
      id: string
      name: string
      weight: number
      description: string
    }>
  }
  budgetEvaluation: {
    purpose: string
    formula: string
    dimensions: Array<{
      id: string
      name: string
      weight: number
      description: string
    }>
  }
  sourceRatings: Record<string, string>
  corroborationRules: Record<string, string>
  biasControls: string[]
}

export type SearchResponse = {
  query: string
  answer: CuratedAnswer | null
  results: Array<{
    type:
      | 'leader'
      | 'event'
      | 'policy'
      | 'bill'
      | 'budget'
      | 'indicator'
      | 'claim'
    id: string
    title: string
    subtitle: string
    date: string
    leaderTermId?: string | null
    eventId?: string | null
    policyId?: string | null
    budgetId?: string | null
  }>
}
