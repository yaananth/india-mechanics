import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { applySchema } from './schema.ts'
import {
  claims,
  curatedAnswers,
  evaluationDimensions,
  eventAssessments,
  events,
  indicatorDefinitions,
  jurisdictions,
  leaderScores,
  leaderRatingAudits,
  leaderTerms,
  manualIndicatorObservations,
  offices,
  parties,
  people,
  policies,
  policyEvaluationDimensions,
  policyScores,
  progressDimensions,
  sources,
} from './seed-data/catalog.ts'
import {
  budgetAllocations,
  budgetEvaluationDimensions,
  budgetPoints,
  budgetScores,
  budgetSources,
  budgets,
} from './seed-data/budgets.ts'
import {
  developmentClaims,
  developmentEventAssessments,
  developmentEvents,
  developmentIndicatorDefinitions,
  developmentIndicatorObservations,
  developmentPolicies,
  developmentPolicyScores,
  developmentSources,
} from './seed-data/development-trade.ts'
import { researchMetadata } from './seed-data/research-metadata.ts'
import type { IndicatorObservationSeed, PolicyRegisterSeed } from './types.ts'

export const seedVersion = '2026-07-24.3'
const sourceRosterVersion = 'source-roster-v0.11'
const allSources = [...sources, ...developmentSources]
const allPolicies = [...policies, ...developmentPolicies]
const allPolicyScores = [...policyScores, ...developmentPolicyScores]
const allEvents = [...events, ...developmentEvents]
const allEventAssessments = [
  ...eventAssessments,
  ...developmentEventAssessments,
]
const allClaims = [...claims, ...developmentClaims]
const allIndicatorDefinitions = [
  ...indicatorDefinitions,
  ...developmentIndicatorDefinitions,
]
const defaultDatabasePath = fileURLToPath(
  new URL('../data/india-mechanics.sqlite', import.meta.url),
)

type GeneratedIndicators = {
  generatedAt: string
  asOfDate: string
  recommendedProgressYear: number
  cutoffs: Record<string, number>
  observations: IndicatorObservationSeed[]
}

type GeneratedBills = {
  generatedAt: string
  asOfDate: string
  sourceUrl: string
  sourceTotal: number
  total: number
  reviewed: number
  bills: PolicyRegisterSeed[]
}

function resolveDatabasePath() {
  return process.env.DATABASE_PATH
    ? resolve(process.env.DATABASE_PATH)
    : defaultDatabasePath
}

function readGeneratedIndicators(): GeneratedIndicators {
  const path = fileURLToPath(
    new URL('./seed-data/generated-indicators.json', import.meta.url),
  )
  if (!existsSync(path)) {
    throw new Error(
      'Generated indicator data is missing. Run `npm run data:refresh` first.',
    )
  }
  return JSON.parse(readFileSync(path, 'utf8')) as GeneratedIndicators
}

function readGeneratedBills(): GeneratedBills {
  const path = fileURLToPath(
    new URL('./seed-data/generated-bills.json', import.meta.url),
  )
  if (!existsSync(path)) {
    throw new Error(
      'Generated bill-register data is missing. Run `npm run bills:refresh` first.',
    )
  }
  return JSON.parse(readFileSync(path, 'utf8')) as GeneratedBills
}

function insertRows(
  db: DatabaseSync,
  generated: GeneratedIndicators,
  generatedBills: GeneratedBills,
) {
  const jurisdictionInsert = db.prepare(
    `INSERT INTO jurisdictions
      (id, name, short_name, level, parent_id, iso_code, valid_from, valid_to, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of jurisdictions) {
    jurisdictionInsert.run(
      row.id,
      row.name,
      row.shortName,
      row.level,
      row.parentId ?? null,
      row.isoCode ?? null,
      row.validFrom,
      row.validTo ?? null,
      row.status,
    )
  }

  const officeInsert = db.prepare(
    `INSERT INTO offices (id, jurisdiction_id, name, short_name, role)
     VALUES (?, ?, ?, ?, ?)`,
  )
  for (const row of offices) {
    officeInsert.run(
      row.id,
      row.jurisdictionId,
      row.name,
      row.shortName,
      row.role,
    )
  }

  const personInsert = db.prepare(
    `INSERT INTO people (id, name, sort_name, birth_date, death_date)
     VALUES (?, ?, ?, ?, ?)`,
  )
  for (const row of people) {
    personInsert.run(
      row.id,
      row.name,
      row.sortName,
      row.birthDate ?? null,
      row.deathDate ?? null,
    )
  }

  const partyInsert = db.prepare(
    `INSERT INTO parties (id, name, short_name, color) VALUES (?, ?, ?, ?)`,
  )
  for (const row of parties) {
    partyInsert.run(row.id, row.name, row.shortName, row.color)
  }

  const sourceInsert = db.prepare(
    `INSERT INTO sources
      (id, title, publisher, url, canonical_url, archive_url, author,
       jurisdiction_id, language, license_status, paywall_status, content_hash,
       source_type, reliability, rubric_version, link_status, rating_reason,
       best_for, limitations, published_date, accessed_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of [...allSources, ...budgetSources]) {
    sourceInsert.run(
      row.id,
      row.title,
      row.publisher,
      row.url,
      row.canonicalUrl ?? row.url,
      row.archiveUrl ?? null,
      row.author ?? null,
      row.jurisdictionId ?? null,
      row.language ?? 'en',
      row.licenseStatus ?? 'link-only',
      row.paywallStatus ?? 'unknown',
      row.contentHash ?? null,
      row.sourceType,
      row.reliability,
      row.rubricVersion ?? 'source-v0.2',
      row.linkStatus ?? 'checked-2026-07-23',
      row.ratingReason,
      row.bestFor,
      row.limitations,
      row.publishedDate ?? null,
      row.accessedDate,
    )
  }

  const dimensionInsert = db.prepare(
    `INSERT INTO evaluation_dimensions (id, name, weight, description)
     VALUES (?, ?, ?, ?)`,
  )
  for (const row of evaluationDimensions) {
    dimensionInsert.run(row.id, row.name, row.weight, row.description)
  }
  const policyDimensionInsert = db.prepare(
    `INSERT INTO policy_evaluation_dimensions (id, name, weight, description)
     VALUES (?, ?, ?, ?)`,
  )
  for (const row of policyEvaluationDimensions) {
    policyDimensionInsert.run(row.id, row.name, row.weight, row.description)
  }
  const budgetDimensionInsert = db.prepare(
    `INSERT INTO budget_evaluation_dimensions (id, name, weight, description)
     VALUES (?, ?, ?, ?)`,
  )
  for (const row of budgetEvaluationDimensions) {
    budgetDimensionInsert.run(row.id, row.name, row.weight, row.description)
  }

  const termInsert = db.prepare(
    `INSERT INTO leader_terms
      (id, office_id, person_id, party_id, start_date, end_date, is_acting,
       government_name, mandate_label, rating_score, rating_confidence,
       rating_summary, assessment_as_of)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  const termSourceInsert = db.prepare(
    `INSERT INTO term_sources (term_id, source_id) VALUES (?, ?)`,
  )
  for (const row of leaderTerms) {
    termInsert.run(
      row.id,
      row.officeId,
      row.personId,
      row.partyId ?? null,
      row.startDate,
      row.endDate ?? null,
      row.isActing ? 1 : 0,
      row.governmentName ?? null,
      row.mandateLabel ?? null,
      row.ratingScore ?? null,
      row.ratingConfidence ?? null,
      row.ratingSummary,
      row.assessmentAsOf,
    )
    for (const sourceId of row.sourceIds) {
      termSourceInsert.run(row.id, sourceId)
    }
  }

  const scoreInsert = db.prepare(
    `INSERT INTO leader_term_scores (term_id, dimension_id, score, rationale)
     VALUES (?, ?, ?, ?)`,
  )
  for (const row of leaderScores) {
    scoreInsert.run(row.termId, row.dimensionId, row.score, row.rationale)
  }

  const leaderAuditInsert = db.prepare(
    `INSERT INTO leader_rating_audits
      (id, term_id, run_count, generic_mean, standardized_mean,
       standard_deviation, minimum, maximum, previous_rating, revised_rating,
       prompt_hash, status, reviewed_at, consensus_sources_json, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of leaderRatingAudits) {
    leaderAuditInsert.run(
      row.id,
      row.termId,
      row.runCount,
      row.genericMean,
      row.standardizedMean,
      row.standardDeviation,
      row.minimum,
      row.maximum,
      row.previousRating,
      row.revisedRating,
      row.promptHash,
      row.status,
      row.reviewedAt,
      JSON.stringify(row.consensusSources),
      row.notes,
    )
  }

  const policyInsert = db.prepare(
    `INSERT INTO policies
      (id, jurisdiction_id, leader_term_id, title, short_title, policy_type,
       introduced_date, enacted_date, effective_date, status, coverage_status,
       rating_basis, summary, intended_goal, rating_score, rating_confidence,
       rating_summary, assessment_as_of)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  const policySourceInsert = db.prepare(
    `INSERT INTO policy_sources
      (policy_id, source_id, evidence_role, locator)
     VALUES (?, ?, ?, ?)`,
  )
  for (const row of allPolicies) {
    policyInsert.run(
      row.id,
      row.jurisdictionId,
      row.leaderTermId,
      row.title,
      row.shortTitle,
      row.policyType,
      row.introducedDate ?? null,
      row.enactedDate ?? null,
      row.effectiveDate ?? null,
      row.status,
      row.coverageStatus,
      row.ratingBasis ?? 'retrospective',
      row.summary,
      row.intendedGoal,
      row.ratingScore,
      row.ratingConfidence,
      row.ratingSummary,
      row.assessmentAsOf,
    )
    for (const sourceId of row.sourceIds) {
      policySourceInsert.run(row.id, sourceId, 'supports', null)
    }
  }

  const policyScoreInsert = db.prepare(
    `INSERT INTO policy_scores
      (policy_id, dimension_id, score, rationale)
     VALUES (?, ?, ?, ?)`,
  )
  for (const row of allPolicyScores) {
    policyScoreInsert.run(
      row.policyId,
      row.dimensionId,
      row.score,
      row.rationale,
    )
  }

  const policyRegisterInsert = db.prepare(
    `INSERT INTO policy_register
      (id, jurisdiction_id, leader_term_id, linked_policy_id, bill_number,
       title, ministry, introduced_by, introduced_date, introduced_house,
       bill_type, category, status, passed_lok_sabha_date,
       passed_rajya_sabha_date, referred_committee_date,
       report_presented_date, assent_date, act_number, act_year,
       introduced_file, passed_lok_sabha_file, passed_rajya_sabha_file,
       passed_both_houses_file, committee_report_file, gazette_file,
       synopsis_file, source_id, review_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of generatedBills.bills) {
    policyRegisterInsert.run(
      row.id,
      row.jurisdictionId,
      row.leaderTermId ?? null,
      row.linkedPolicyId ?? null,
      row.billNumber ?? null,
      row.title,
      row.ministry ?? null,
      row.introducedBy ?? null,
      row.introducedDate,
      row.introducedHouse ?? null,
      row.billType,
      row.category ?? null,
      row.status,
      row.passedLokSabhaDate ?? null,
      row.passedRajyaSabhaDate ?? null,
      row.referredCommitteeDate ?? null,
      row.reportPresentedDate ?? null,
      row.assentDate ?? null,
      row.actNumber ?? null,
      row.actYear ?? null,
      row.introducedFile ?? null,
      row.passedLokSabhaFile ?? null,
      row.passedRajyaSabhaFile ?? null,
      row.passedBothHousesFile ?? null,
      row.committeeReportFile ?? null,
      row.gazetteFile ?? null,
      row.synopsisFile ?? null,
      row.sourceId,
      row.reviewStatus,
    )
  }

  const budgetInsert = db.prepare(
    `INSERT INTO budgets
      (id, jurisdiction_id, leader_term_id, title, short_title, fiscal_year,
       presented_date, finance_minister, budget_kind, status, coverage_status,
       rating_basis, summary, plain_language, total_expenditure_crore,
       revenue_expenditure_crore, capital_expenditure_crore,
       fiscal_deficit_crore, fiscal_deficit_pct_gdp, rating_score,
       rating_confidence, rating_summary, assessment_as_of)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  const budgetSourceInsert = db.prepare(
    `INSERT INTO budget_sources
      (budget_id, source_id, evidence_role, locator)
     VALUES (?, ?, ?, ?)`,
  )
  for (const row of budgets) {
    budgetInsert.run(
      row.id,
      row.jurisdictionId,
      row.leaderTermId,
      row.title,
      row.shortTitle,
      row.fiscalYear,
      row.presentedDate ?? null,
      row.financeMinister,
      row.budgetKind,
      row.status,
      row.coverageStatus,
      row.ratingBasis,
      row.summary,
      row.plainLanguage,
      row.totalExpenditureCrore ?? null,
      row.revenueExpenditureCrore ?? null,
      row.capitalExpenditureCrore ?? null,
      row.fiscalDeficitCrore ?? null,
      row.fiscalDeficitPctGdp ?? null,
      row.ratingScore,
      row.ratingConfidence,
      row.ratingSummary,
      row.assessmentAsOf,
    )
    for (const sourceId of row.sourceIds) {
      budgetSourceInsert.run(row.id, sourceId, 'supports', null)
    }
  }

  const budgetScoreInsert = db.prepare(
    `INSERT INTO budget_scores
      (budget_id, dimension_id, score, rationale)
     VALUES (?, ?, ?, ?)`,
  )
  for (const row of budgetScores) {
    budgetScoreInsert.run(
      row.budgetId,
      row.dimensionId,
      row.score,
      row.rationale,
    )
  }

  const budgetAllocationInsert = db.prepare(
    `INSERT INTO budget_allocations
      (id, budget_id, category, label, amount_crore, previous_amount_crore,
       change_percent, note, source_id, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of budgetAllocations) {
    budgetAllocationInsert.run(
      row.id,
      row.budgetId,
      row.category,
      row.label,
      row.amountCrore,
      row.previousAmountCrore ?? null,
      row.changePercent ?? null,
      row.note,
      row.sourceId,
      row.sortOrder,
    )
  }

  const budgetPointInsert = db.prepare(
    `INSERT INTO budget_points
      (id, budget_id, point_type, title, body, source_id, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of budgetPoints) {
    budgetPointInsert.run(
      row.id,
      row.budgetId,
      row.pointType,
      row.title,
      row.body,
      row.sourceId,
      row.sortOrder,
    )
  }

  const eventInsert = db.prepare(
    `INSERT INTO events
      (id, jurisdiction_id, event_date, end_date, title, summary, significance,
       category, confidence)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  const eventSourceInsert = db.prepare(
    `INSERT INTO event_sources
      (event_id, source_id, evidence_role, locator)
     VALUES (?, ?, ?, ?)`,
  )
  const eventTermInsert = db.prepare(
    `INSERT INTO event_terms (event_id, term_id) VALUES (?, ?)`,
  )
  for (const row of allEvents) {
    eventInsert.run(
      row.id,
      row.jurisdictionId,
      row.date,
      row.endDate ?? null,
      row.title,
      row.summary,
      row.significance,
      row.category,
      row.confidence,
    )
    for (const sourceId of row.sourceIds) {
      eventSourceInsert.run(row.id, sourceId, 'supports', null)
    }
    for (const termId of row.leaderTermIds ?? []) {
      eventTermInsert.run(row.id, termId)
    }
  }

  const eventAssessmentInsert = db.prepare(
    `INSERT INTO event_assessments
      (event_id, choice_assessment, choice_score, choice_reason, union_role,
       state_local_role, positive_outcomes, lessons, confidence,
       assessment_as_of)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  const eventResponsibilityInsert = db.prepare(
    `INSERT INTO event_responsibilities
      (event_id, actor_type, actor_name, responsibility_kind,
       responsibility_level, assessment, confidence)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of allEventAssessments) {
    eventAssessmentInsert.run(
      row.eventId,
      row.choiceAssessment,
      row.choiceScore ?? null,
      row.choiceReason,
      row.unionRole,
      row.stateLocalRole,
      row.positiveOutcomes,
      row.lessons,
      row.confidence,
      row.assessmentAsOf,
    )
    for (const responsibility of row.responsibilities) {
      eventResponsibilityInsert.run(
        row.eventId,
        responsibility.actorType,
        responsibility.actorName,
        responsibility.responsibilityKind,
        responsibility.level,
        responsibility.assessment,
        responsibility.confidence ?? row.confidence,
      )
    }
  }

  const claimInsert = db.prepare(
    `INSERT INTO claims
      (id, jurisdiction_id, leader_term_id, event_id, policy_id, title, body, stance,
       category, confidence, as_of_date, review_status, sensitivity, reviewer,
       reviewed_at, knowledge_cutoff, supersedes_claim_id, correction_note)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  const claimSourceInsert = db.prepare(
    `INSERT INTO claim_sources
      (claim_id, source_id, evidence_role, locator, extraction_method,
       reported_value, reported_unit, reported_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of allClaims) {
    claimInsert.run(
      row.id,
      row.jurisdictionId,
      row.leaderTermId ?? null,
      row.eventId ?? null,
      row.policyId ?? null,
      row.title,
      row.body,
      row.stance,
      row.category,
      row.confidence,
      row.asOfDate,
      'published',
      row.category === 'institutions' || row.category === 'society'
        ? 'sensitive'
        : 'standard',
      'India Mechanics editorial pass',
      row.asOfDate,
      row.asOfDate,
      null,
      null,
    )
    for (const sourceId of row.sourceIds) {
      claimSourceInsert.run(
        row.id,
        sourceId,
        'supports',
        null,
        'reviewed-summary',
        null,
        null,
        row.asOfDate,
      )
    }
  }

  const progressDimensionInsert = db.prepare(
    `INSERT INTO progress_dimensions
      (id, name, weight, description, color)
     VALUES (?, ?, ?, ?, ?)`,
  )
  for (const row of progressDimensions) {
    progressDimensionInsert.run(
      row.id,
      row.name,
      row.weight,
      row.description,
      row.color,
    )
  }

  const indicatorInsert = db.prepare(
    `INSERT INTO indicator_definitions
      (id, source_code, name, short_name, description, plain_language, example,
       unit, format, dimension_id, dimension_weight, direction, transform,
       score_role, goalpost_low, goalpost_high, source_id, frequency, state_ready)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of allIndicatorDefinitions) {
    indicatorInsert.run(
      row.id,
      row.sourceCode ?? null,
      row.name,
      row.shortName,
      row.description,
      row.plainLanguage,
      row.example,
      row.unit,
      row.format,
      row.dimensionId,
      row.dimensionWeight,
      row.direction,
      row.transform,
      row.scoreRole ?? 'scored',
      row.goalpostLow,
      row.goalpostHigh,
      row.sourceId,
      row.frequency,
      row.stateReady ? 1 : 0,
    )
  }
  const eventIndicatorInsert = db.prepare(
    `INSERT INTO event_indicators (event_id, indicator_id) VALUES (?, ?)`,
  )
  for (const event of allEvents) {
    for (const indicatorId of event.indicatorIds ?? []) {
      eventIndicatorInsert.run(event.id, indicatorId)
    }
  }

  const observationInsert = db.prepare(
    `INSERT INTO indicator_observations
      (indicator_id, jurisdiction_id, period, value, status, source_id, note)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const row of [
    ...generated.observations,
    ...manualIndicatorObservations,
    ...developmentIndicatorObservations,
  ]) {
    observationInsert.run(
      row.indicatorId,
      row.jurisdictionId,
      row.period,
      row.value,
      row.status,
      row.sourceId,
      row.note ?? null,
    )
  }

  const answerInsert = db.prepare(
    `INSERT INTO curated_answers
      (id, jurisdiction_id, question, aliases_json, short_answer, verdict,
       confidence, as_of_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  const answerClaimInsert = db.prepare(
    `INSERT INTO answer_claims
      (answer_id, claim_id, section, sort_order)
     VALUES (?, ?, ?, ?)`,
  )
  for (const row of curatedAnswers) {
    answerInsert.run(
      row.id,
      row.jurisdictionId,
      row.question,
      JSON.stringify(row.aliases),
      row.shortAnswer,
      row.verdict,
      row.confidence,
      row.asOfDate,
    )
    for (const claim of row.claimSections) {
      answerClaimInsert.run(
        row.id,
        claim.claimId,
        claim.section,
        claim.sortOrder,
      )
    }
  }

  const metadataInsert = db.prepare(
    `INSERT INTO metadata (key, value) VALUES (?, ?)`,
  )
  const metadata = {
    seed_version: seedVersion,
    generated_at: new Date().toISOString(),
    indicator_generated_at: generated.generatedAt,
    world_bank_cutoff: String(generated.cutoffs.worldBank),
    vdem_cutoff: String(generated.cutoffs.vdem),
    indicator_as_of_date: generated.asOfDate,
    recommended_progress_year: String(generated.recommendedProgressYear),
    latest_world_bank_period: String(generated.cutoffs.worldBank),
    latest_vdem_period: String(generated.cutoffs.vdem),
    bill_register_generated_at: generatedBills.generatedAt,
    bill_register_as_of_date: generatedBills.asOfDate,
    bill_register_total: String(generatedBills.total),
    bill_register_reviewed: String(generatedBills.reviewed),
    bill_register_source_total: String(generatedBills.sourceTotal),
    political_status_checked: researchMetadata.politicalStatusChecked,
    editorial_reviewed_through: researchMetadata.editorialReviewedThrough,
    knowledge_cutoff: researchMetadata.knowledgeCutoff,
    timeline_starts: researchMetadata.timelineStarts,
    methodology_version: researchMetadata.methodologyVersion,
    source_roster_version: sourceRosterVersion,
    source_rubric_version: 'source-v0.2',
  }
  for (const [key, value] of Object.entries(metadata)) {
    metadataInsert.run(key, value)
  }

  db.prepare(
    `INSERT INTO ingestion_batches
      (id, source_roster_version, query_scope, run_at, agent_model,
       candidates_found, rejected_records, reviewer, review_status,
       published_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    'initial-national-corpus-2026-07-23',
    sourceRosterVersion,
    'India national corpus, 1945 through knowledge cutoff',
    metadata.generated_at,
    'Codex',
    allEvents.length +
      allPolicies.length +
      budgets.length +
      generatedBills.bills.length +
      allClaims.length +
      generated.observations.length,
    0,
    'India Mechanics editorial pass',
    'published',
    metadata.generated_at,
    'Initial reviewed corpus and machine-indicator snapshot.',
  )
  db.prepare(
    `INSERT INTO ingestion_batches
      (id, source_roster_version, query_scope, run_at, agent_model,
       candidates_found, rejected_records, reviewer, review_status,
       published_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    'india-structural-tax-reforms-review-2026-07-23',
    sourceRosterVersion,
    'Structural direct and indirect tax reforms, 1961 through July 23, 2026',
    metadata.generated_at,
    'Codex with independent source-audit sub-agent',
    25,
    0,
    'India Mechanics editorial pass',
    'published',
    metadata.generated_at,
    'Reviewed legal status, PM-term attribution, design, implementation, outcomes, and evidence limits for the tax-policy family.',
  )
  db.prepare(
    `INSERT INTO ingestion_batches
      (id, source_roster_version, query_scope, run_at, agent_model,
       candidates_found, rejected_records, reviewer, review_status,
       published_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    'undercovered-prime-minister-terms-2026-07-23',
    sourceRosterVersion,
    'Landmark actions for rated Prime Minister terms with thin event or policy coverage',
    metadata.generated_at,
    'Codex with independent source-audit sub-agent',
    14,
    0,
    'India Mechanics editorial pass',
    'published',
    metadata.generated_at,
    'Added reviewed institutional, constitutional, telecom, rural-road, coalition, and foreign-policy evidence for underrepresented terms.',
  )
  db.prepare(
    `INSERT INTO ingestion_batches
      (id, source_roster_version, query_scope, run_at, agent_model,
       candidates_found, rejected_records, reviewer, review_status,
       published_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    'bjp-congress-comparison-2026-07-23',
    sourceRosterVersion,
    'BJP-led and Congress-led Union-government comparison using published PM-term ratings and reviewed claims',
    metadata.generated_at,
    'Codex',
    8,
    0,
    'India Mechanics editorial pass',
    'published',
    metadata.generated_at,
    'Computed simple and day-weighted PM-term averages; published strengths, counterevidence, and era/sample-size limits without creating a causal party score.',
  )
  db.prepare(
    `INSERT INTO ingestion_batches
      (id, source_roster_version, query_scope, run_at, agent_model,
       candidates_found, rejected_records, reviewer, review_status,
       published_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    'caa-policy-review-2026-07-24',
    sourceRosterVersion,
    'Citizenship Amendment Act 2019, implementation Rules, outcomes, and legal status through July 24, 2026',
    metadata.generated_at,
    'Codex with independent research sub-agent',
    11,
    0,
    'India Mechanics editorial pass',
    'published',
    metadata.generated_at,
    'Published separate Act and Rules assessments, current May 2026 passport procedure, pending-litigation status, directly documented grants, and national outcome-data limits.',
  )
  db.prepare(
    `INSERT INTO ingestion_batches
      (id, source_roster_version, query_scope, run_at, agent_model,
       candidates_found, rejected_records, reviewer, review_status,
       published_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    'pakistan-flood-aid-claim-review-2026-07-24',
    sourceRosterVersion,
    'Fact-check of the claim that Congress gave Pakistan US$25 million after 26/11',
    metadata.generated_at,
    'Codex heard-claim research lane',
    5,
    0,
    'India Mechanics editorial fact-check',
    'published',
    metadata.generated_at,
    'Verified amount and chronology, restored flood-relief and UN-routing context, linked the result to Timeline and Policies, and recorded rationale-only treatment for the Manmohan Singh rating.',
  )
  db.prepare(
    `INSERT INTO ingestion_batches
      (id, source_roster_version, query_scope, run_at, agent_model,
       candidates_found, rejected_records, reviewer, review_status,
       published_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    'modi-roads-review-2026-07-24',
    sourceRosterVersion,
    'Modi-era national highways, Bharatmala, rural roads, outcomes, cost, maintenance, and safety',
    metadata.generated_at,
    'Codex with independent roads research sub-agent',
    5,
    0,
    'India Mechanics editorial pass',
    'published',
    metadata.generated_at,
    'Published separate highway, Bharatmala, and PMGSY-III assessments plus a contextual highway indicator.',
  )
  db.prepare(
    `INSERT INTO ingestion_batches
      (id, source_roster_version, query_scope, run_at, agent_model,
       candidates_found, rejected_records, reviewer, review_status,
       published_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    'modi-poverty-review-2026-07-24',
    sourceRosterVersion,
    'Monetary poverty, national MPI, survey methods, basic services, pandemic, and attribution',
    metadata.generated_at,
    'Codex with independent poverty research sub-agent',
    5,
    0,
    'India Mechanics editorial pass',
    'published',
    metadata.generated_at,
    'Added separate monetary-poverty series and outcome events while preserving survey, PPP, pandemic, and shared-attribution caveats.',
  )
  db.prepare(
    `INSERT INTO ingestion_batches
      (id, source_roster_version, query_scope, run_at, agent_model,
       candidates_found, rejected_records, reviewer, review_status,
       published_at, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    'modi-trade-agreements-review-2026-07-24',
    sourceRosterVersion,
    'UAE, Australia, EFTA, UK, Oman, New Zealand, and EU trade-agreement status, design, and outcomes',
    metadata.generated_at,
    'Codex with independent trade research sub-agent',
    8,
    0,
    'India Mechanics editorial pass',
    'published',
    metadata.generated_at,
    'Published separate treaty records and kept newly effective, signed, and unsigned agreements design-only where outcomes cannot yet exist.',
  )
}

export function buildDatabase(path = resolveDatabasePath()) {
  mkdirSync(dirname(path), { recursive: true })
  for (const suffix of ['', '-wal', '-shm']) {
    rmSync(`${path}${suffix}`, { force: true })
  }
  const db = new DatabaseSync(path)
  try {
    applySchema(db)
    const generated = readGeneratedIndicators()
    const generatedBills = readGeneratedBills()
    db.exec('BEGIN IMMEDIATE')
    try {
      insertRows(db, generated, generatedBills)
      db.exec('COMMIT')
    } catch (error) {
      db.exec('ROLLBACK')
      throw error
    }
  } finally {
    db.close()
  }
  return path
}

export function ensureDatabase(path = resolveDatabasePath()) {
  if (!existsSync(path)) return buildDatabase(path)

  const db = new DatabaseSync(path, { readOnly: true })
  try {
    const row = db
      .prepare(`SELECT value FROM metadata WHERE key = 'seed_version'`)
      .get() as { value?: string } | undefined
    if (row?.value === seedVersion) return path
  } catch {
    // Rebuild below when the file is not a compatible India Mechanics database.
  } finally {
    db.close()
  }
  return buildDatabase(path)
}

const isDirectRun =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href

if (isDirectRun) {
  const path = buildDatabase()
  console.log(`Seeded India Mechanics database at ${path}`)
}
