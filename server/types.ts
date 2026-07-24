export type Confidence = 'low' | 'medium' | 'high'

export type SourceSeed = {
  id: string
  title: string
  publisher: string
  url: string
  sourceType: string
  reliability: number
  ratingReason: string
  bestFor: string
  limitations: string
  publishedDate?: string
  accessedDate: string
  author?: string
  canonicalUrl?: string
  archiveUrl?: string
  jurisdictionId?: string
  language?: string
  licenseStatus?: string
  paywallStatus?: string
  contentHash?: string
  rubricVersion?: string
  linkStatus?: string
}

export type JurisdictionSeed = {
  id: string
  name: string
  shortName: string
  level: 'country' | 'state' | 'union-territory'
  parentId?: string
  isoCode?: string
  validFrom: string
  validTo?: string
  status: 'published' | 'researching' | 'planned'
}

export type OfficeSeed = {
  id: string
  jurisdictionId: string
  name: string
  shortName: string
  role: 'head-of-government'
}

export type PersonSeed = {
  id: string
  name: string
  sortName: string
  birthDate?: string
  deathDate?: string
}

export type PartySeed = {
  id: string
  name: string
  shortName: string
  color: string
}

export type LeaderTermSeed = {
  id: string
  officeId: string
  personId: string
  partyId?: string
  startDate: string
  endDate?: string
  isActing?: boolean
  governmentName?: string
  mandateLabel?: string
  ratingScore?: number
  ratingConfidence?: Confidence
  ratingSummary: string
  assessmentAsOf: string
  sourceIds: string[]
}

export type LeaderScoreSeed = {
  termId: string
  dimensionId: string
  score: number
  rationale: string
}

export type LeaderRatingAuditSeed = {
  id: string
  termId: string
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
}

export type EventSeed = {
  id: string
  jurisdictionId: string
  date: string
  endDate?: string
  title: string
  summary: string
  significance: string
  category: string
  confidence: Confidence
  sourceIds: string[]
  leaderTermIds?: string[]
  indicatorIds?: string[]
}

export type EventAssessmentSeed = {
  eventId: string
  choiceAssessment:
    | 'right'
    | 'mostly-right'
    | 'mixed'
    | 'mostly-wrong'
    | 'wrong'
    | 'contested'
    | 'not-a-policy-choice'
  choiceScore?: number
  choiceReason: string
  unionRole: string
  stateLocalRole: string
  positiveOutcomes: string
  lessons: string
  confidence: Confidence
  assessmentAsOf: string
  responsibilities: Array<{
    actorType:
      | 'union-government'
      | 'state-government'
      | 'local-administration'
      | 'non-state-group'
      | 'foreign-state'
      | 'corporate'
      | 'colonial-government'
      | 'institution'
      | 'public-electorate'
      | 'structural'
    actorName: string
    responsibilityKind:
      | 'direct-action'
      | 'policy-decision'
      | 'failure-to-prevent'
      | 'failure-to-respond'
      | 'implementation'
      | 'shared-context'
      | 'positive-leadership'
    level: 1 | 2 | 3 | 4 | 5
    assessment: string
    confidence?: Confidence
  }>
}

export type ClaimSeed = {
  id: string
  jurisdictionId: string
  leaderTermId?: string
  eventId?: string
  policyId?: string
  title: string
  body: string
  stance: 'achievement' | 'concern' | 'context' | 'mixed'
  category: string
  confidence: Confidence
  asOfDate: string
  sourceIds: string[]
}

export type PolicySeed = {
  id: string
  jurisdictionId: string
  leaderTermId: string
  title: string
  shortTitle: string
  policyType: string
  introducedDate?: string
  enactedDate?: string
  effectiveDate?: string
  status: 'enacted' | 'pending' | 'repealed' | 'executive-action'
  coverageStatus: 'reviewed' | 'partial' | 'placeholder'
  ratingBasis?: 'retrospective' | 'design'
  summary: string
  intendedGoal: string
  ratingScore: number
  ratingConfidence: Confidence
  ratingSummary: string
  assessmentAsOf: string
  sourceIds: string[]
}

export type PolicyScoreSeed = {
  policyId: string
  dimensionId: string
  score: number | null
  rationale: string
}

export type PolicyRegisterSeed = {
  id: string
  jurisdictionId: string
  leaderTermId?: string
  linkedPolicyId?: string
  billNumber?: string
  title: string
  ministry?: string
  introducedBy?: string
  introducedDate: string
  introducedHouse?: string
  billType: string
  category?: string
  status: string
  passedLokSabhaDate?: string
  passedRajyaSabhaDate?: string
  referredCommitteeDate?: string
  reportPresentedDate?: string
  assentDate?: string
  actNumber?: string
  actYear?: number
  introducedFile?: string
  passedLokSabhaFile?: string
  passedRajyaSabhaFile?: string
  passedBothHousesFile?: string
  committeeReportFile?: string
  gazetteFile?: string
  synopsisFile?: string
  sourceId: string
  reviewStatus: 'discovered' | 'reviewing' | 'reviewed'
}

export type BudgetSeed = {
  id: string
  jurisdictionId: string
  leaderTermId: string
  title: string
  shortTitle: string
  fiscalYear: string
  presentedDate?: string
  financeMinister: string
  budgetKind: 'full' | 'interim'
  status: 'completed' | 'current'
  coverageStatus: 'reviewed' | 'partial'
  ratingBasis: 'retrospective' | 'proposal'
  summary: string
  plainLanguage: string
  totalExpenditureCrore?: number
  revenueExpenditureCrore?: number
  capitalExpenditureCrore?: number
  fiscalDeficitCrore?: number
  fiscalDeficitPctGdp?: number
  ratingScore: number
  ratingConfidence: Confidence
  ratingSummary: string
  assessmentAsOf: string
  sourceIds: string[]
}

export type BudgetScoreSeed = {
  budgetId: string
  dimensionId: string
  score: number
  rationale: string
}

export type BudgetAllocationSeed = {
  id: string
  budgetId: string
  category: string
  label: string
  amountCrore: number
  previousAmountCrore?: number
  changePercent?: number
  note: string
  sourceId: string
  sortOrder: number
}

export type BudgetPointSeed = {
  id: string
  budgetId: string
  pointType: 'priority' | 'strength' | 'risk' | 'context'
  title: string
  body: string
  sourceId: string
  sortOrder: number
}

export type CuratedAnswerSeed = {
  id: string
  jurisdictionId: string
  question: string
  aliases: string[]
  shortAnswer: string
  verdict: string
  confidence: Confidence
  asOfDate: string
  claimSections: Array<{
    claimId: string
    section: 'achievement' | 'concern' | 'context'
    sortOrder: number
  }>
}

export type IndicatorDefinitionSeed = {
  id: string
  sourceCode?: string
  name: string
  shortName: string
  description: string
  plainLanguage: string
  example: string
  unit: string
  format: 'number' | 'percent' | 'currency' | 'index'
  dimensionId: string
  dimensionWeight: number
  direction: 'higher' | 'lower' | 'neutral'
  scoreRole?: 'scored' | 'context'
  transform: 'linear' | 'log'
  goalpostLow: number
  goalpostHigh: number
  sourceId: string
  frequency: 'annual' | 'survey'
  stateReady: boolean
}

export type IndicatorObservationSeed = {
  indicatorId: string
  jurisdictionId: string
  period: number
  value: number
  status: 'observed' | 'estimated' | 'modelled'
  sourceId: string
  note?: string
}
