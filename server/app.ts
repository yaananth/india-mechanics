import express from 'express'
import type { DatabaseSync } from 'node:sqlite'
import { calculateProgress, calculateProgressHistory } from './progress.ts'
import { leaderRatingProfiles, profileScore } from './rating-profiles.ts'
import { specialistScore } from './specialist-ratings.ts'

const DEFAULT_JURISDICTION = 'india'

function metadataMap(db: DatabaseSync) {
  return Object.fromEntries(
    (
      db.prepare(`SELECT key, value FROM metadata ORDER BY key`).all() as unknown as
        Array<{ key: string; value: string }>
    ).map((row) => [row.key, row.value]),
  )
}

function metadataForJurisdiction(db: DatabaseSync, jurisdictionId: string) {
  const scoped = Object.fromEntries(
    (
      db
        .prepare(
          `SELECT key, value
           FROM jurisdiction_metadata
           WHERE jurisdiction_id = ?
           ORDER BY key`,
        )
        .all(jurisdictionId) as unknown as Array<{
        key: string
        value: string
      }>
    ).map((row) => [row.key, row.value]),
  )
  return { ...metadataMap(db), ...scoped }
}

function progressYear(db: DatabaseSync) {
  return Number(metadataMap(db).recommended_progress_year ?? 2024)
}

type SourceRow = {
  id: string
  title: string
  publisher: string
  url: string
  canonical_url: string
  archive_url: string | null
  author: string | null
  jurisdiction_id: string | null
  language: string
  license_status: string
  paywall_status: string
  content_hash: string | null
  source_type: string
  reliability: number
  rubric_version: string
  link_status: string
  rating_reason: string
  best_for: string
  limitations: string
  published_date: string | null
  accessed_date: string
}

function sourceShape(row: SourceRow) {
  return {
    id: row.id,
    title: row.title,
    publisher: row.publisher,
    url: row.url,
    canonicalUrl: row.canonical_url,
    archiveUrl: row.archive_url,
    author: row.author,
    jurisdictionId: row.jurisdiction_id,
    language: row.language,
    licenseStatus: row.license_status,
    paywallStatus: row.paywall_status,
    contentHash: row.content_hash,
    sourceType: row.source_type,
    reliability: row.reliability,
    rubricVersion: row.rubric_version,
    linkStatus: row.link_status,
    ratingReason: row.rating_reason,
    bestFor: row.best_for,
    limitations: row.limitations,
    publishedDate: row.published_date,
    accessedDate: row.accessed_date,
  }
}

function getSourcesByIds(db: DatabaseSync, sourceIds: string[]) {
  if (sourceIds.length === 0) return []
  const placeholders = sourceIds.map(() => '?').join(',')
  return (
    db
      .prepare(`SELECT * FROM sources WHERE id IN (${placeholders})`)
      .all(...sourceIds) as unknown as SourceRow[]
  )
    .map(sourceShape)
    .sort(
      (left, right) =>
        right.reliability - left.reliability ||
        left.publisher.localeCompare(right.publisher),
    )
}

function getClaim(db: DatabaseSync, claimId: string) {
  const claim = db
    .prepare(
      `SELECT id, title, body, stance, category, confidence, as_of_date
       FROM claims WHERE id = ?`,
    )
    .get(claimId) as
    | {
        id: string
        title: string
        body: string
        stance: string
        category: string
        confidence: string
        as_of_date: string
      }
    | undefined
  if (!claim) return null
  const sourceRows = db
    .prepare(`SELECT source_id FROM claim_sources WHERE claim_id = ?`)
    .all(claimId) as unknown as Array<{ source_id: string }>
  const sourceIds = sourceRows.map((row) => row.source_id)
  return {
    id: claim.id,
    title: claim.title,
    body: claim.body,
    stance: claim.stance,
    category: claim.category,
    confidence: claim.confidence,
    asOfDate: claim.as_of_date,
    sourceIds,
    sources: getSourcesByIds(db, sourceIds),
  }
}

function getAnswer(db: DatabaseSync, answerId: string) {
  const answer = db
    .prepare(
      `SELECT id, question, aliases_json, short_answer, verdict, confidence,
              as_of_date
       FROM curated_answers WHERE id = ?`,
    )
    .get(answerId) as
    | {
        id: string
        question: string
        aliases_json: string
        short_answer: string
        verdict: string
        confidence: string
        as_of_date: string
      }
    | undefined
  if (!answer) return null
  const claimRows = db
    .prepare(
      `SELECT claim_id, section, sort_order
       FROM answer_claims
       WHERE answer_id = ?
       ORDER BY section, sort_order`,
    )
    .all(answerId) as unknown as Array<{
    claim_id: string
    section: string
    sort_order: number
  }>

  return {
    id: answer.id,
    question: answer.question,
    aliases: JSON.parse(answer.aliases_json) as string[],
    shortAnswer: answer.short_answer,
    verdict: answer.verdict,
    confidence: answer.confidence,
    asOfDate: answer.as_of_date,
    claims: claimRows
      .map((row) => ({
        ...getClaim(db, row.claim_id),
        section: row.section,
        sortOrder: row.sort_order,
      }))
      .filter((claim) => claim.id),
  }
}

function getLeaderTerms(db: DatabaseSync, jurisdictionId: string) {
  const rows = db
    .prepare(
      `SELECT
         t.id, t.start_date, t.end_date, t.is_acting, t.mandate_label,
         t.rating_score, t.rating_confidence, t.rating_summary,
         t.assessment_as_of,
         p.id AS person_id, p.name AS person_name,
         o.id AS office_id, o.name AS office_name, o.short_name AS office_short_name,
         pa.id AS party_id, pa.name AS party_name, pa.short_name AS party_short_name,
         pa.color AS party_color
       FROM leader_terms t
       JOIN offices o ON o.id = t.office_id
       JOIN people p ON p.id = t.person_id
       LEFT JOIN parties pa ON pa.id = t.party_id
       WHERE o.jurisdiction_id = ?
       ORDER BY t.start_date`,
    )
    .all(jurisdictionId) as unknown as Array<Record<string, unknown>>

  const scoreStatement = db.prepare(
    `SELECT d.id, d.name, d.weight, d.description, s.score, s.rationale
     FROM leader_term_scores s
     JOIN evaluation_dimensions d ON d.id = s.dimension_id
     WHERE s.term_id = ?
     ORDER BY d.rowid`,
  )
  const claimStatement = db.prepare(
    `SELECT id FROM claims WHERE leader_term_id = ? ORDER BY stance, rowid`,
  )
  const sourceStatement = db.prepare(
    `SELECT source_id FROM term_sources WHERE term_id = ?`,
  )
  const auditStatement = db.prepare(
    `SELECT id, run_count, generic_mean, standardized_mean,
            standard_deviation, minimum, maximum, previous_rating,
            revised_rating, prompt_hash, status, reviewed_at,
            consensus_sources_json, notes
     FROM leader_rating_audits
     WHERE term_id = ?`,
  )
  const specialistAssessmentStatement = db.prepare(
    `SELECT a.id, a.topic_id, a.confidence, a.status, a.summary,
            a.assessment_as_of, topic.name AS topic_name,
            topic.description AS topic_description,
            topic.operational_label, topic.adjusted_label,
            topic.methodology
     FROM leader_specialist_assessments a
     JOIN leader_specialist_topics topic ON topic.id = a.topic_id
     WHERE a.term_id = ?
     ORDER BY a.rowid`,
  )
  const specialistScoreStatement = db.prepare(
    `SELECT dimension.id, dimension.name, dimension.operational_weight,
            dimension.adjusted_weight, dimension.description,
            score.score, score.rationale
     FROM leader_specialist_scores score
     JOIN leader_specialist_dimensions dimension
       ON dimension.id = score.dimension_id
     WHERE score.assessment_id = ?
     ORDER BY dimension.rowid`,
  )
  const specialistSourceStatement = db.prepare(
    `SELECT source_id
     FROM leader_specialist_sources
     WHERE assessment_id = ?
     ORDER BY rowid`,
  )

  return rows.map((row) => {
    const termId = String(row.id)
    const componentScores = scoreStatement.all(termId) as Array<{
      id: string
      name: string
      weight: number
      description: string
      score: number
      rationale: string
    }>
    const scoreByDimension = Object.fromEntries(
      componentScores.map((component) => [component.id, component.score]),
    )
    const sourceIds = (
      sourceStatement.all(termId) as unknown as Array<{ source_id: string }>
    ).map((source) => source.source_id)
    const audit = auditStatement.get(termId) as
      | {
          id: string
          run_count: number
          generic_mean: number
          standardized_mean: number
          standard_deviation: number
          minimum: number
          maximum: number
          previous_rating: number
          revised_rating: number
          prompt_hash: string
          status: string
          reviewed_at: string
          consensus_sources_json: string
          notes: string
        }
      | undefined
    const specialistAssessments = (
      specialistAssessmentStatement.all(termId) as unknown as Array<{
        id: string
        topic_id: string
        confidence: string
        status: string
        summary: string
        assessment_as_of: string
        topic_name: string
        topic_description: string
        operational_label: string
        adjusted_label: string
        methodology: string
      }>
    ).map((assessment) => {
      const specialistComponents = specialistScoreStatement.all(
        assessment.id,
      ) as unknown as Array<{
        id: string
        name: string
        operational_weight: number
        adjusted_weight: number
        description: string
        score: number
        rationale: string
      }>
      const specialistScores = Object.fromEntries(
        specialistComponents.map((component) => [
          component.id,
          component.score,
        ]),
      )
      const scoreDimensions = specialistComponents.map((component) => ({
        id: component.id,
        operationalWeight: component.operational_weight,
        adjustedWeight: component.adjusted_weight,
      }))
      const specialistSourceIds = (
        specialistSourceStatement.all(assessment.id) as unknown as Array<{
          source_id: string
        }>
      ).map((source) => source.source_id)
      return {
        id: assessment.id,
        topicId: assessment.topic_id,
        topicName: assessment.topic_name,
        topicDescription: assessment.topic_description,
        methodology: assessment.methodology,
        operationalLabel: assessment.operational_label,
        operationalScore:
          specialistScore(
            specialistScores,
            scoreDimensions,
            'operationalWeight',
          ) ?? 0,
        adjustedLabel: assessment.adjusted_label,
        adjustedScore:
          specialistScore(
            specialistScores,
            scoreDimensions,
            'adjustedWeight',
          ) ?? 0,
        confidence: assessment.confidence,
        status: assessment.status,
        summary: assessment.summary,
        assessmentAsOf: assessment.assessment_as_of,
        componentScores: specialistComponents.map((component) => ({
          id: component.id,
          name: component.name,
          operationalWeight: component.operational_weight,
          adjustedWeight: component.adjusted_weight,
          description: component.description,
          score: component.score,
          rationale: component.rationale,
        })),
        sources: getSourcesByIds(db, specialistSourceIds),
      }
    })
    return {
      id: termId,
      startDate: row.start_date,
      endDate: row.end_date,
      isActing: Boolean(row.is_acting),
      mandateLabel: row.mandate_label,
      ratingScore: row.rating_score,
      ratingConfidence: row.rating_confidence,
      ratingSummary: row.rating_summary,
      assessmentAsOf: row.assessment_as_of,
      person: {
        id: row.person_id,
        name: row.person_name,
      },
      office: {
        id: row.office_id,
        name: row.office_name,
        shortName: row.office_short_name,
      },
      party: row.party_id
        ? {
            id: row.party_id,
            name: row.party_name,
            shortName: row.party_short_name,
            color: row.party_color,
          }
        : null,
      componentScores,
      ratingProfiles:
        componentScores.length > 0
          ? leaderRatingProfiles.map((profile) => ({
              id: profile.id,
              name: profile.name,
              description: profile.description,
              score: profileScore(scoreByDimension, profile),
              weights: profile.weights,
              isCanonical: profile.id === 'balanced',
            }))
          : [],
      specialistAssessments,
      claims: (
        claimStatement.all(termId) as unknown as Array<{ id: string }>
      )
        .map((claim) => getClaim(db, claim.id))
        .filter(Boolean),
      sourceIds,
      sources: getSourcesByIds(db, sourceIds),
      ratingAudit: audit
        ? {
            id: audit.id,
            runCount: audit.run_count,
            genericMean: audit.generic_mean,
            standardizedMean: audit.standardized_mean,
            standardDeviation: audit.standard_deviation,
            minimum: audit.minimum,
            maximum: audit.maximum,
            previousRating: audit.previous_rating,
            revisedRating: audit.revised_rating,
            promptHash: audit.prompt_hash,
            status: audit.status,
            reviewedAt: audit.reviewed_at,
            consensusSources: JSON.parse(
              audit.consensus_sources_json,
            ) as string[],
            notes: audit.notes,
          }
        : null,
    }
  })
}

function getPolicies(db: DatabaseSync, jurisdictionId: string) {
  const rows = db
    .prepare(
      `SELECT
         pol.id, pol.title, pol.short_title, pol.policy_type,
         pol.introduced_date, pol.enacted_date, pol.effective_date,
         pol.status, pol.coverage_status, pol.rating_basis, pol.summary, pol.intended_goal,
         pol.rating_score, pol.rating_confidence, pol.rating_summary,
         pol.assessment_as_of, pol.leader_term_id,
         person.id AS person_id, person.name AS person_name,
         term.start_date AS term_start_date, term.end_date AS term_end_date,
         party.id AS party_id, party.name AS party_name,
         party.short_name AS party_short_name, party.color AS party_color
       FROM policies pol
       JOIN leader_terms term ON term.id = pol.leader_term_id
       JOIN people person ON person.id = term.person_id
       JOIN offices office ON office.id = term.office_id
       LEFT JOIN parties party ON party.id = term.party_id
       WHERE pol.jurisdiction_id = ? AND office.jurisdiction_id = ?
       ORDER BY COALESCE(pol.introduced_date, pol.enacted_date), pol.title`,
    )
    .all(jurisdictionId, jurisdictionId) as unknown as Array<Record<string, unknown>>
  const scoreStatement = db.prepare(
    `SELECT d.id, d.name, d.weight, d.description, s.score, s.rationale
     FROM policy_scores s
     JOIN policy_evaluation_dimensions d ON d.id = s.dimension_id
     WHERE s.policy_id = ?
     ORDER BY d.rowid`,
  )
  const claimStatement = db.prepare(
    `SELECT id FROM claims WHERE policy_id = ? ORDER BY stance, rowid`,
  )
  const sourceStatement = db.prepare(
    `SELECT source_id FROM policy_sources WHERE policy_id = ?`,
  )

  return rows.map((row) => {
    const policyId = String(row.id)
    const sourceIds = (
      sourceStatement.all(policyId) as unknown as Array<{ source_id: string }>
    ).map((source) => source.source_id)
    return {
      id: policyId,
      title: row.title,
      shortTitle: row.short_title,
      policyType: row.policy_type,
      introducedDate: row.introduced_date,
      enactedDate: row.enacted_date,
      effectiveDate: row.effective_date,
      status: row.status,
      coverageStatus: row.coverage_status,
      ratingBasis: row.rating_basis,
      summary: row.summary,
      intendedGoal: row.intended_goal,
      ratingScore: row.rating_score,
      ratingConfidence: row.rating_confidence,
      ratingSummary: row.rating_summary,
      assessmentAsOf: row.assessment_as_of,
      leaderTermId: row.leader_term_id,
      leader: {
        id: row.person_id,
        name: row.person_name,
        termStartDate: row.term_start_date,
        termEndDate: row.term_end_date,
      },
      party: row.party_id
        ? {
            id: row.party_id,
            name: row.party_name,
            shortName: row.party_short_name,
            color: row.party_color,
          }
        : null,
      componentScores: scoreStatement.all(policyId),
      claims: (
        claimStatement.all(policyId) as unknown as Array<{ id: string }>
      )
        .map((claim) => getClaim(db, claim.id))
        .filter(Boolean),
      sourceIds,
      sources: getSourcesByIds(db, sourceIds),
    }
  })
}

function getBudgets(db: DatabaseSync, jurisdictionId: string) {
  const rows = db
    .prepare(
      `SELECT
         b.id, b.title, b.short_title, b.fiscal_year, b.presented_date,
         b.finance_minister, b.budget_kind, b.status, b.coverage_status,
         b.rating_basis, b.summary, b.plain_language,
         b.total_expenditure_crore, b.revenue_expenditure_crore,
         b.capital_expenditure_crore, b.fiscal_deficit_crore,
         b.fiscal_deficit_pct_gdp, b.rating_score, b.rating_confidence,
         b.rating_summary, b.assessment_as_of, b.leader_term_id,
         person.id AS person_id, person.name AS person_name,
         term.start_date AS term_start_date, term.end_date AS term_end_date,
         party.id AS party_id, party.name AS party_name,
         party.short_name AS party_short_name, party.color AS party_color
       FROM budgets b
       JOIN leader_terms term ON term.id = b.leader_term_id
       JOIN people person ON person.id = term.person_id
       JOIN offices office ON office.id = term.office_id
       LEFT JOIN parties party ON party.id = term.party_id
       WHERE b.jurisdiction_id = ? AND office.jurisdiction_id = ?
       ORDER BY b.fiscal_year, b.budget_kind`,
    )
    .all(jurisdictionId, jurisdictionId) as unknown as Array<Record<string, unknown>>

  const scoreStatement = db.prepare(
    `SELECT d.id, d.name, d.weight, d.description, s.score, s.rationale
     FROM budget_scores s
     JOIN budget_evaluation_dimensions d ON d.id = s.dimension_id
     WHERE s.budget_id = ?
     ORDER BY d.rowid`,
  )
  const sourceStatement = db.prepare(
    `SELECT source_id FROM budget_sources WHERE budget_id = ?`,
  )
  const allocationStatement = db.prepare(
    `SELECT id, category, label, amount_crore, previous_amount_crore,
            change_percent, note, source_id, sort_order
     FROM budget_allocations
     WHERE budget_id = ?
     ORDER BY sort_order, amount_crore DESC`,
  )
  const pointStatement = db.prepare(
    `SELECT id, point_type, title, body, source_id, sort_order
     FROM budget_points
     WHERE budget_id = ?
     ORDER BY point_type, sort_order`,
  )

  return rows.map((row) => {
    const budgetId = String(row.id)
    const sourceIds = (
      sourceStatement.all(budgetId) as unknown as Array<{ source_id: string }>
    ).map((source) => source.source_id)
    const allocations = allocationStatement.all(budgetId) as unknown as Array<{
      id: string
      category: string
      label: string
      amount_crore: number
      previous_amount_crore: number | null
      change_percent: number | null
      note: string
      source_id: string
      sort_order: number
    }>
    const points = pointStatement.all(budgetId) as unknown as Array<{
      id: string
      point_type: string
      title: string
      body: string
      source_id: string
      sort_order: number
    }>
    const totalExpenditure = row.total_expenditure_crore as number | null

    return {
      id: budgetId,
      title: row.title,
      shortTitle: row.short_title,
      fiscalYear: row.fiscal_year,
      presentedDate: row.presented_date,
      financeMinister: row.finance_minister,
      budgetKind: row.budget_kind,
      status: row.status,
      coverageStatus: row.coverage_status,
      ratingBasis: row.rating_basis,
      summary: row.summary,
      plainLanguage: row.plain_language,
      totalExpenditureCrore: totalExpenditure,
      revenueExpenditureCrore: row.revenue_expenditure_crore,
      capitalExpenditureCrore: row.capital_expenditure_crore,
      fiscalDeficitCrore: row.fiscal_deficit_crore,
      fiscalDeficitPctGdp: row.fiscal_deficit_pct_gdp,
      ratingScore: row.rating_score,
      ratingConfidence: row.rating_confidence,
      ratingSummary: row.rating_summary,
      assessmentAsOf: row.assessment_as_of,
      leaderTermId: row.leader_term_id,
      leader: {
        id: row.person_id,
        name: row.person_name,
        termStartDate: row.term_start_date,
        termEndDate: row.term_end_date,
      },
      party: row.party_id
        ? {
            id: row.party_id,
            name: row.party_name,
            shortName: row.party_short_name,
            color: row.party_color,
          }
        : null,
      componentScores: scoreStatement.all(budgetId),
      allocations: allocations.map((allocation) => ({
        id: allocation.id,
        category: allocation.category,
        label: allocation.label,
        amountCrore: allocation.amount_crore,
        previousAmountCrore: allocation.previous_amount_crore,
        changePercent: allocation.change_percent,
        note: allocation.note,
        sortOrder: allocation.sort_order,
        shareOfTotal:
          totalExpenditure && totalExpenditure > 0
            ? (allocation.amount_crore / totalExpenditure) * 100
            : null,
        source: getSourcesByIds(db, [allocation.source_id])[0],
      })),
      points: points.map((point) => ({
        id: point.id,
        pointType: point.point_type,
        title: point.title,
        body: point.body,
        sortOrder: point.sort_order,
        source: getSourcesByIds(db, [point.source_id])[0],
      })),
      sourceIds,
      sources: getSourcesByIds(db, sourceIds),
    }
  })
}

function billRegisterWhere(
  jurisdictionId: string,
  filters: {
    query?: string
    status?: string
    ministry?: string
    leaderTermId?: string
    from?: string
    to?: string
    reviewStatus?: string
  },
) {
  const clauses = ['register.jurisdiction_id = ?']
  const params: string[] = [jurisdictionId]
  if (filters.query) {
    const tokens = Array.from(
      new Set(
        filters.query
          .toLowerCase()
          .split(/[^\p{L}\p{N}]+/u)
          .filter((token) => token.length > 1),
      ),
    )
    for (const token of tokens) {
      clauses.push(
        `(LOWER(register.title) LIKE ?
          OR LOWER(COALESCE(register.ministry, '')) LIKE ?
          OR LOWER(COALESCE(register.bill_number, '')) LIKE ?
          OR LOWER(COALESCE(register.act_number, '')) LIKE ?
          OR EXISTS (
            SELECT 1
            FROM bill_explanations explanation_search
            WHERE explanation_search.bill_id = register.id
              AND (
                LOWER(explanation_search.proposal_summary) LIKE ?
                OR LOWER(COALESCE(explanation_search.official_purpose, '')) LIKE ?
                OR LOWER(explanation_search.affected_groups_json) LIKE ?
                OR LOWER(explanation_search.potential_benefits) LIKE ?
                OR LOWER(explanation_search.potential_risks) LIKE ?
              )
          )
          OR EXISTS (
            SELECT 1
            FROM policies policy_search
            WHERE policy_search.id = register.linked_policy_id
              AND (
                LOWER(policy_search.title) LIKE ?
                OR LOWER(policy_search.summary) LIKE ?
                OR LOWER(policy_search.intended_goal) LIKE ?
                OR LOWER(policy_search.rating_summary) LIKE ?
              )
          )
          OR EXISTS (
            SELECT 1
            FROM claims claim_search
            WHERE claim_search.policy_id = register.linked_policy_id
              AND (
                LOWER(claim_search.title) LIKE ?
                OR LOWER(claim_search.body) LIKE ?
              )
          ))`,
      )
      const query = `%${token}%`
      params.push(
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        query,
      )
    }
  }
  if (filters.status) {
    clauses.push('register.status = ?')
    params.push(filters.status)
  }
  if (filters.ministry) {
    clauses.push('register.ministry = ?')
    params.push(filters.ministry)
  }
  if (filters.leaderTermId) {
    clauses.push('register.leader_term_id = ?')
    params.push(filters.leaderTermId)
  }
  if (filters.from) {
    clauses.push('register.introduced_date >= ?')
    params.push(filters.from)
  }
  if (filters.to) {
    clauses.push('register.introduced_date <= ?')
    params.push(filters.to)
  }
  if (filters.reviewStatus) {
    clauses.push('register.review_status = ?')
    params.push(filters.reviewStatus)
  }
  return { clauses, params }
}

function billRegisterShape(row: Record<string, unknown>) {
  return {
    id: row.id,
    billNumber: row.bill_number,
    title: row.title,
    ministry: row.ministry,
    introducedBy: row.introduced_by,
    introducedDate: row.introduced_date,
    introducedHouse: row.introduced_house,
    billType: row.bill_type,
    category: row.category,
    status: row.status,
    sourceStatus: row.source_status,
    statusAsOf: row.status_as_of,
    statusNote: row.status_note,
    statusSourceId: row.status_source_id,
    passedLokSabhaDate: row.passed_lok_sabha_date,
    passedRajyaSabhaDate: row.passed_rajya_sabha_date,
    referredCommitteeDate: row.referred_committee_date,
    reportPresentedDate: row.report_presented_date,
    assentDate: row.assent_date,
    actNumber: row.act_number,
    actYear: row.act_year,
    introducedFile: row.introduced_file,
    passedLokSabhaFile: row.passed_lok_sabha_file,
    passedRajyaSabhaFile: row.passed_rajya_sabha_file,
    passedBothHousesFile: row.passed_both_houses_file,
    committeeReportFile: row.committee_report_file,
    gazetteFile: row.gazette_file,
    synopsisFile: row.synopsis_file,
    reviewStatus: row.review_status,
    linkedPolicyId: row.linked_policy_id,
    linkedPolicyScope: row.linked_policy_scope,
    leaderTermId: row.leader_term_id,
    explanation: {
      proposalSummary: row.proposal_summary,
      officialPurpose: row.official_purpose,
      governmentRationale: row.government_rationale,
      affectedGroups: JSON.parse(
        String(row.affected_groups_json ?? '[]'),
      ) as string[],
      potentialBenefits: row.potential_benefits,
      potentialRisks: row.potential_risks,
      evidenceBasis: row.evidence_basis,
      specificity: row.specificity,
      assessmentScope: row.assessment_scope,
      verdict: row.verdict,
      verdictKind: row.verdict_kind,
      verdictRationale: row.verdict_rationale,
      confidence: row.explanation_confidence,
      assessmentAsOf: row.explanation_assessment_as_of,
      methodologyVersion: row.explanation_methodology_version,
      documentUrl: row.explanation_document_url,
      documentHash: row.explanation_document_hash,
    },
    assessment: row.assessment_policy_id
      ? {
          policyId: row.assessment_policy_id,
          title: row.assessment_title,
          summary: row.assessment_summary,
          intendedGoal: row.assessment_intended_goal,
          ratingScore: row.assessment_rating_score,
          ratingConfidence: row.assessment_rating_confidence,
          ratingSummary: row.assessment_rating_summary,
          ratingBasis: row.assessment_rating_basis,
          status: row.assessment_status,
          assessmentAsOf: row.assessment_as_of,
          scope: row.linked_policy_scope ?? 'bill-specific',
        }
      : null,
    leader: row.person_id
      ? {
          id: row.person_id,
          name: row.person_name,
          startDate: row.term_start_date,
          endDate: row.term_end_date,
        }
      : null,
    party: row.party_id
      ? {
          id: row.party_id,
          shortName: row.party_short_name,
          color: row.party_color,
        }
      : null,
  }
}

function billRegisterRecord(
  db: DatabaseSync,
  row: Record<string, unknown>,
) {
  const statusSourceId = row.status_source_id
    ? String(row.status_source_id)
    : null
  return {
    ...billRegisterShape(row),
    sources: getSourcesByIds(
      db,
      Array.from(
        new Set(
          ['sansad-government-bills-api', statusSourceId].filter(
            (sourceId): sourceId is string => Boolean(sourceId),
          ),
        ),
      ),
    ),
  }
}

function getBillRegister(
  db: DatabaseSync,
  jurisdictionId: string,
  filters: {
    query?: string
    status?: string
    ministry?: string
    leaderTermId?: string
    from?: string
    to?: string
    reviewStatus?: string
    page?: number
    pageSize?: number
  } = {},
) {
  const page = Math.max(1, filters.page ?? 1)
  const pageSize = Math.max(1, Math.min(100, filters.pageSize ?? 40))
  const { clauses, params } = billRegisterWhere(jurisdictionId, filters)
  const total = (
    db
      .prepare(
        `SELECT COUNT(*) AS count
         FROM policy_register register
         WHERE ${clauses.join(' AND ')}`,
      )
      .get(...params) as { count: number }
  ).count
  const rows = db
    .prepare(
      `SELECT register.*,
              explanation.proposal_summary,
              explanation.official_purpose,
              explanation.government_rationale,
              explanation.affected_groups_json,
              explanation.potential_benefits,
              explanation.potential_risks,
              explanation.evidence_basis,
              explanation.specificity,
              explanation.assessment_scope,
              explanation.verdict,
              explanation.verdict_kind,
              explanation.verdict_rationale,
              explanation.confidence AS explanation_confidence,
              explanation.assessment_as_of AS explanation_assessment_as_of,
              explanation.methodology_version AS explanation_methodology_version,
              explanation.document_url AS explanation_document_url,
              explanation.document_hash AS explanation_document_hash,
              assessment.id AS assessment_policy_id,
              assessment.title AS assessment_title,
              assessment.summary AS assessment_summary,
              assessment.intended_goal AS assessment_intended_goal,
              assessment.rating_score AS assessment_rating_score,
              assessment.rating_confidence AS assessment_rating_confidence,
              assessment.rating_summary AS assessment_rating_summary,
              assessment.rating_basis AS assessment_rating_basis,
              assessment.status AS assessment_status,
              assessment.assessment_as_of AS assessment_as_of,
              term.start_date AS term_start_date,
              term.end_date AS term_end_date,
              person.id AS person_id,
              person.name AS person_name,
              party.id AS party_id,
              party.short_name AS party_short_name,
              party.color AS party_color
       FROM policy_register register
       JOIN bill_explanations explanation ON explanation.bill_id = register.id
       LEFT JOIN policies assessment ON assessment.id = register.linked_policy_id
       LEFT JOIN leader_terms term ON term.id = register.leader_term_id
       LEFT JOIN people person ON person.id = term.person_id
       LEFT JOIN parties party ON party.id = term.party_id
       WHERE ${clauses.join(' AND ')}
       ORDER BY register.introduced_date DESC, register.title
       LIMIT ? OFFSET ?`,
    )
    .all(...params, pageSize, (page - 1) * pageSize) as unknown as Array<
    Record<string, unknown>
  >

  const statuses = db
    .prepare(
      `SELECT status, COUNT(*) AS count
       FROM policy_register
       WHERE jurisdiction_id = ?
       GROUP BY status
       ORDER BY count DESC, status`,
    )
    .all(jurisdictionId)
  const ministries = db
    .prepare(
      `SELECT ministry, COUNT(*) AS count
       FROM policy_register
       WHERE jurisdiction_id = ? AND ministry IS NOT NULL
       GROUP BY ministry
       ORDER BY ministry`,
    )
    .all(jurisdictionId)
  const leaders = db
    .prepare(
      `SELECT term.id, person.name, COUNT(*) AS count
       FROM policy_register register
       JOIN leader_terms term ON term.id = register.leader_term_id
       JOIN people person ON person.id = term.person_id
       WHERE register.jurisdiction_id = ?
       GROUP BY term.id
       ORDER BY term.start_date DESC`,
    )
    .all(jurisdictionId)
  const reviewed = (
    db
      .prepare(
        `SELECT COUNT(*) AS count
         FROM policy_register
         WHERE jurisdiction_id = ? AND review_status = 'reviewed'`,
      )
      .get(jurisdictionId) as { count: number }
  ).count
  const explanationCoverage = db
    .prepare(
      `SELECT COUNT(*) AS explained,
              SUM(CASE WHEN explanation.evidence_basis != 'title-only'
                       THEN 1 ELSE 0 END) AS official_or_reviewed
       FROM bill_explanations explanation
       JOIN policy_register register ON register.id = explanation.bill_id
       WHERE register.jurisdiction_id = ?`,
    )
    .get(jurisdictionId) as {
    explained: number
    official_or_reviewed: number
  }

  return {
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    reviewed,
    explained: explanationCoverage.explained,
    officialOrReviewed: explanationCoverage.official_or_reviewed,
    records: rows.map((row) => billRegisterRecord(db, row)),
    facets: { statuses, ministries, leaders },
    source: getSourcesByIds(db, ['sansad-government-bills-api'])[0],
  }
}

function getBillRecord(
  db: DatabaseSync,
  jurisdictionId: string,
  billId: string,
) {
  const row = db
    .prepare(
      `SELECT register.*,
              explanation.proposal_summary,
              explanation.official_purpose,
              explanation.government_rationale,
              explanation.affected_groups_json,
              explanation.potential_benefits,
              explanation.potential_risks,
              explanation.evidence_basis,
              explanation.specificity,
              explanation.assessment_scope,
              explanation.verdict,
              explanation.verdict_kind,
              explanation.verdict_rationale,
              explanation.confidence AS explanation_confidence,
              explanation.assessment_as_of AS explanation_assessment_as_of,
              explanation.methodology_version AS explanation_methodology_version,
              explanation.document_url AS explanation_document_url,
              explanation.document_hash AS explanation_document_hash,
              assessment.id AS assessment_policy_id,
              assessment.title AS assessment_title,
              assessment.summary AS assessment_summary,
              assessment.intended_goal AS assessment_intended_goal,
              assessment.rating_score AS assessment_rating_score,
              assessment.rating_confidence AS assessment_rating_confidence,
              assessment.rating_summary AS assessment_rating_summary,
              assessment.rating_basis AS assessment_rating_basis,
              assessment.status AS assessment_status,
              assessment.assessment_as_of AS assessment_as_of,
              term.start_date AS term_start_date,
              term.end_date AS term_end_date,
              person.id AS person_id,
              person.name AS person_name,
              party.id AS party_id,
              party.short_name AS party_short_name,
              party.color AS party_color
       FROM policy_register register
       JOIN bill_explanations explanation ON explanation.bill_id = register.id
       LEFT JOIN policies assessment ON assessment.id = register.linked_policy_id
       LEFT JOIN leader_terms term ON term.id = register.leader_term_id
       LEFT JOIN people person ON person.id = term.person_id
       LEFT JOIN parties party ON party.id = term.party_id
       WHERE register.jurisdiction_id = ? AND register.id = ?`,
    )
    .get(jurisdictionId, billId) as Record<string, unknown> | undefined
  return row ? billRegisterRecord(db, row) : null
}

function getAllBillRecords(db: DatabaseSync, jurisdictionId: string) {
  return (
    db
      .prepare(
        `SELECT register.*,
                explanation.proposal_summary,
                explanation.official_purpose,
                explanation.government_rationale,
                explanation.affected_groups_json,
                explanation.potential_benefits,
                explanation.potential_risks,
                explanation.evidence_basis,
                explanation.specificity,
                explanation.assessment_scope,
                explanation.verdict,
                explanation.verdict_kind,
                explanation.verdict_rationale,
                explanation.confidence AS explanation_confidence,
                explanation.assessment_as_of AS explanation_assessment_as_of,
                explanation.methodology_version AS explanation_methodology_version,
                explanation.document_url AS explanation_document_url,
                explanation.document_hash AS explanation_document_hash,
                assessment.id AS assessment_policy_id,
                assessment.title AS assessment_title,
                assessment.summary AS assessment_summary,
                assessment.intended_goal AS assessment_intended_goal,
                assessment.rating_score AS assessment_rating_score,
                assessment.rating_confidence AS assessment_rating_confidence,
                assessment.rating_summary AS assessment_rating_summary,
                assessment.rating_basis AS assessment_rating_basis,
                assessment.status AS assessment_status,
                assessment.assessment_as_of AS assessment_as_of,
                term.start_date AS term_start_date,
                term.end_date AS term_end_date,
                person.id AS person_id,
                person.name AS person_name,
                party.id AS party_id,
                party.short_name AS party_short_name,
                party.color AS party_color
         FROM policy_register register
         JOIN bill_explanations explanation ON explanation.bill_id = register.id
         LEFT JOIN policies assessment ON assessment.id = register.linked_policy_id
         LEFT JOIN leader_terms term ON term.id = register.leader_term_id
         LEFT JOIN people person ON person.id = term.person_id
         LEFT JOIN parties party ON party.id = term.party_id
         WHERE register.jurisdiction_id = ?
         ORDER BY register.introduced_date DESC, register.title`,
      )
      .all(jurisdictionId) as unknown as Array<Record<string, unknown>>
  ).map((row) => billRegisterRecord(db, row))
}

function getEvents(
  db: DatabaseSync,
  jurisdictionId: string,
  filters: {
    category?: string
    from?: string
    to?: string
    leaderTermId?: string
    partyId?: string
  } = {},
) {
  const clauses = ['e.jurisdiction_id = ?']
  const params: Array<string> = [jurisdictionId]
  if (filters.category) {
    clauses.push('e.category = ?')
    params.push(filters.category)
  }
  if (filters.from) {
    clauses.push('e.event_date >= ?')
    params.push(filters.from)
  }
  if (filters.to) {
    clauses.push('e.event_date <= ?')
    params.push(filters.to)
  }
  if (filters.leaderTermId === 'unmapped') {
    clauses.push(
      `NOT EXISTS (
        SELECT 1 FROM event_terms term_filter
        WHERE term_filter.event_id = e.id
      )`,
    )
  } else if (filters.leaderTermId) {
    clauses.push(
      `EXISTS (
        SELECT 1 FROM event_terms term_filter
        WHERE term_filter.event_id = e.id AND term_filter.term_id = ?
      )`,
    )
    params.push(filters.leaderTermId)
  }
  if (filters.partyId) {
    clauses.push(
      `EXISTS (
        SELECT 1
        FROM event_terms event_term_filter
        JOIN leader_terms leader_term_filter
          ON leader_term_filter.id = event_term_filter.term_id
        WHERE event_term_filter.event_id = e.id
          AND leader_term_filter.party_id = ?
      )`,
    )
    params.push(filters.partyId)
  }

  const rows = db
    .prepare(
      `SELECT e.id, e.event_date, e.end_date, e.title, e.summary,
              e.significance, e.category, e.confidence
       FROM events e
       WHERE ${clauses.join(' AND ')}
       ORDER BY e.event_date DESC`,
    )
    .all(...params) as unknown as Array<{
    id: string
    event_date: string
    end_date: string | null
    title: string
    summary: string
    significance: string
    category: string
    confidence: string
  }>
  const sourceStatement = db.prepare(
    `SELECT source_id FROM event_sources WHERE event_id = ?`,
  )
  const termStatement = db.prepare(
    `SELECT term.id AS term_id, term.start_date, term.end_date,
            person.id AS person_id, person.name AS person_name,
            office.id AS office_id, office.name AS office_name,
            office.short_name AS office_short_name,
            party.id AS party_id, party.name AS party_name,
            party.short_name AS party_short_name, party.color AS party_color
     FROM event_terms event_term
     JOIN leader_terms term ON term.id = event_term.term_id
     JOIN people person ON person.id = term.person_id
     JOIN offices office ON office.id = term.office_id
     LEFT JOIN parties party ON party.id = term.party_id
     WHERE event_term.event_id = ?
     ORDER BY term.start_date, term.id`,
  )
  const assessmentStatement = db.prepare(
    `SELECT choice_assessment, choice_score, choice_reason, union_role,
            state_local_role, positive_outcomes, lessons, confidence,
            assessment_as_of
     FROM event_assessments
     WHERE event_id = ?`,
  )
  const responsibilityStatement = db.prepare(
    `SELECT actor_type, actor_name, responsibility_kind,
            responsibility_level, assessment, confidence
     FROM event_responsibilities
     WHERE event_id = ?
     ORDER BY responsibility_level DESC, id`,
  )
  const relatedPolicyStatement = db.prepare(
    `SELECT DISTINCT pol.id, pol.title, pol.short_title,
            pol.rating_score, pol.rating_confidence
     FROM claims claim
     JOIN policies pol ON pol.id = claim.policy_id
     WHERE claim.event_id = ?
       AND claim.policy_id IS NOT NULL
       AND claim.review_status = 'published'
     ORDER BY COALESCE(pol.introduced_date, pol.enacted_date), pol.title`,
  )
  const relatedIndicatorStatement = db.prepare(
    `SELECT definition.id, definition.name, definition.short_name,
            definition.unit, definition.format
     FROM event_indicators link
     JOIN indicator_definitions definition
       ON definition.id = link.indicator_id
     WHERE link.event_id = ?
     ORDER BY definition.name`,
  )

  return rows.map((row) => {
    const sourceIds = (
      sourceStatement.all(row.id) as unknown as Array<{ source_id: string }>
    ).map((source) => source.source_id)
    const assessment = assessmentStatement.get(row.id) as unknown as
      | {
          choice_assessment: string
          choice_score: number | null
          choice_reason: string
          union_role: string
          state_local_role: string
          positive_outcomes: string
          lessons: string
          confidence: string
          assessment_as_of: string
        }
      | undefined
    const governments = (
      termStatement.all(row.id) as unknown as Array<{
        term_id: string
        start_date: string
        end_date: string | null
        person_id: string
        person_name: string
        office_id: string
        office_name: string
        office_short_name: string
        party_id: string | null
        party_name: string | null
        party_short_name: string | null
        party_color: string | null
      }>
    ).map((term) => ({
      termId: term.term_id,
      startDate: term.start_date,
      endDate: term.end_date,
      leader: {
        id: term.person_id,
        name: term.person_name,
      },
      office: {
        id: term.office_id,
        name: term.office_name,
        shortName: term.office_short_name,
      },
      party: term.party_id
        ? {
            id: term.party_id,
            name: term.party_name,
            shortName: term.party_short_name,
            color: term.party_color,
          }
        : null,
    }))
    return {
      id: row.id,
      date: row.event_date,
      endDate: row.end_date,
      title: row.title,
      summary: row.summary,
      significance: row.significance,
      category: row.category,
      confidence: row.confidence,
      sourceIds,
      sources: getSourcesByIds(db, sourceIds),
      leaderTermIds: governments.map((term) => term.termId),
      governments,
      relatedPolicies: (
        relatedPolicyStatement.all(row.id) as unknown as Array<{
          id: string
          title: string
          short_title: string
          rating_score: number
          rating_confidence: string
        }>
      ).map((policy) => ({
        id: policy.id,
        title: policy.title,
        shortTitle: policy.short_title,
        ratingScore: policy.rating_score,
        ratingConfidence: policy.rating_confidence,
      })),
      relatedIndicators: (
        relatedIndicatorStatement.all(row.id) as unknown as Array<{
          id: string
          name: string
          short_name: string
          unit: string
          format: string
        }>
      ).map((indicator) => ({
        id: indicator.id,
        name: indicator.name,
        shortName: indicator.short_name,
        unit: indicator.unit,
        format: indicator.format,
      })),
      accountability: assessment
        ? {
            choiceAssessment: assessment.choice_assessment,
            choiceScore: assessment.choice_score,
            choiceReason: assessment.choice_reason,
            unionRole: assessment.union_role,
            stateLocalRole: assessment.state_local_role,
            positiveOutcomes: assessment.positive_outcomes,
            lessons: assessment.lessons,
            confidence: assessment.confidence,
            assessmentAsOf: assessment.assessment_as_of,
            responsibilities: (
              responsibilityStatement.all(row.id) as unknown as Array<{
                actor_type: string
                actor_name: string
                responsibility_kind: string
                responsibility_level: number
                assessment: string
                confidence: string
              }>
            ).map((responsibility) => ({
              actorType: responsibility.actor_type,
              actorName: responsibility.actor_name,
              responsibilityKind: responsibility.responsibility_kind,
              level: responsibility.responsibility_level,
              assessment: responsibility.assessment,
              confidence: responsibility.confidence,
            })),
          }
        : null,
    }
  })
}

function getIndicators(
  db: DatabaseSync,
  jurisdictionId: string,
  targetYear: number,
) {
  const rows = db
    .prepare(
      `SELECT d.id, d.source_code, d.name, d.short_name, d.description,
              d.plain_language, d.example, d.unit, d.format,
              d.dimension_id, d.dimension_weight, d.direction,
              d.transform, d.score_role, d.goalpost_low, d.goalpost_high, d.frequency,
              d.state_ready, d.source_id,
              p.name AS dimension_name, p.color AS dimension_color
       FROM indicator_definitions d
       JOIN progress_dimensions p ON p.id = d.dimension_id
       WHERE EXISTS (
         SELECT 1
         FROM indicator_observations observation
         WHERE observation.jurisdiction_id = ?
           AND observation.indicator_id = d.id
       )
       ORDER BY p.rowid, d.rowid`,
    )
    .all(jurisdictionId) as unknown as Array<Record<string, unknown>>
  const latestStatement = db.prepare(
    `SELECT period, value, status, source_id, note
     FROM indicator_observations
     WHERE jurisdiction_id = ? AND indicator_id = ? AND period <= ?
     ORDER BY period DESC LIMIT 1`,
  )

  return rows.map((row) => ({
    id: row.id,
    sourceCode: row.source_code,
    name: row.name,
    shortName: row.short_name,
    description: row.description,
    plainLanguage: row.plain_language,
    example: row.example,
    unit: row.unit,
    format: row.format,
    dimensionId: row.dimension_id,
    dimensionName: row.dimension_name,
    dimensionColor: row.dimension_color,
    dimensionWeight: row.dimension_weight,
    direction: row.direction,
    scoreRole: row.score_role,
    transform: row.transform,
    goalpostLow: row.goalpost_low,
    goalpostHigh: row.goalpost_high,
    frequency: row.frequency,
    stateReady: Boolean(row.state_ready),
    sourceId: row.source_id,
    latest:
      latestStatement.get(jurisdictionId, String(row.id), targetYear) ?? null,
  }))
}

type IndicatorObservationRow = {
  period: number
  value: number
  status: string
  source_id: string
  note: string | null
}

function getIndicatorTermChanges(
  db: DatabaseSync,
  jurisdictionId: string,
  observations: IndicatorObservationRow[],
  direction: 'higher' | 'lower' | 'neutral',
) {
  if (observations.length === 0) return []
  const sorted = [...observations].sort((left, right) => left.period - right.period)
  const latestPeriod = sorted.at(-1)?.period ?? 0
  const terms = db
    .prepare(
      `SELECT t.id, t.start_date, t.end_date, t.is_acting,
              person.id AS person_id, person.name AS person_name,
              party.short_name AS party_short_name, party.color AS party_color
       FROM leader_terms t
       JOIN offices office ON office.id = t.office_id
       JOIN people person ON person.id = t.person_id
       LEFT JOIN parties party ON party.id = t.party_id
       WHERE office.jurisdiction_id = ?
       ORDER BY t.start_date`,
    )
    .all(jurisdictionId) as unknown as Array<{
    id: string
    start_date: string
    end_date: string | null
    is_acting: number
    person_id: string
    person_name: string
    party_short_name: string | null
    party_color: string | null
  }>

  return terms
    .map((term) => {
      const startYear = Number(term.start_date.slice(0, 4))
      const endYear = term.end_date
        ? Number(term.end_date.slice(0, 4))
        : latestPeriod
      const effectiveEndDate =
        term.end_date ?? `${Math.max(latestPeriod, startYear)}-12-31`
      const durationDays =
        (new Date(`${effectiveEndDate}T00:00:00Z`).getTime() -
          new Date(`${term.start_date}T00:00:00Z`).getTime()) /
        86_400_000
      if (term.is_acting || durationDays < 300 || endYear < startYear) return null

      const atOrBeforeStart = sorted
        .filter((observation) => observation.period <= startYear)
        .at(-1)
      const firstWithinTerm = sorted.find(
        (observation) =>
          observation.period >= startYear && observation.period <= endYear,
      )
      const baseline = atOrBeforeStart ?? firstWithinTerm
      const endpoint = sorted
        .filter((observation) => observation.period <= endYear)
        .at(-1)
      if (!baseline || !endpoint || endpoint.period <= baseline.period) return null

      const absoluteChange = endpoint.value - baseline.value
      const percentChange =
        baseline.value === 0
          ? null
          : (absoluteChange / Math.abs(baseline.value)) * 100
      const elapsedDataYears = endpoint.period - baseline.period
      const improved =
        direction === 'neutral' || Math.abs(absoluteChange) < 1e-10
          ? null
          : direction === 'higher'
            ? absoluteChange > 0
            : absoluteChange < 0

      return {
        termId: term.id,
        leader: {
          id: term.person_id,
          name: term.person_name,
        },
        party: term.party_short_name
          ? {
              shortName: term.party_short_name,
              color: term.party_color,
            }
          : null,
        startDate: term.start_date,
        endDate: term.end_date,
        isCurrent: term.end_date === null,
        baseline: {
          period: baseline.period,
          value: baseline.value,
          status: baseline.status,
        },
        endpoint: {
          period: endpoint.period,
          value: endpoint.value,
          status: endpoint.status,
        },
        baselineKind:
          baseline.period < startYear
            ? 'before-term-start'
            : baseline.period === startYear
              ? 'term-start-year'
              : 'first-within-term',
        absoluteChange,
        percentChange,
        annualizedChange: absoluteChange / elapsedDataYears,
        elapsedDataYears,
        directionAssessment:
          direction === 'neutral'
            ? 'context'
            : improved === null
              ? 'flat'
              : improved
                ? 'improved'
                : 'worsened',
      }
    })
    .filter((change) => change !== null)
    .sort((left, right) => right.startDate.localeCompare(left.startDate))
}

function getCurrencyGrowthComparison(
  db: DatabaseSync,
  jurisdictionId: string,
  exchangeObservations: IndicatorObservationRow[],
) {
  const gdpObservations = db
    .prepare(
      `SELECT period, value, status, source_id, note
       FROM indicator_observations
       WHERE jurisdiction_id = ? AND indicator_id = 'real-gdp-per-capita'
       ORDER BY period`,
    )
    .all(jurisdictionId) as unknown as IndicatorObservationRow[]
  const currentTerm = db
    .prepare(
      `SELECT t.start_date
       FROM leader_terms t
       JOIN offices office ON office.id = t.office_id
       WHERE office.jurisdiction_id = ? AND t.end_date IS NULL
       ORDER BY t.start_date DESC
       LIMIT 1`,
    )
    .get(jurisdictionId) as { start_date: string } | undefined
  if (
    exchangeObservations.length === 0 ||
    gdpObservations.length === 0 ||
    !currentTerm
  ) {
    return null
  }

  const startYear = Number(currentTerm.start_date.slice(0, 4))
  const exchangeByPeriod = new Map(
    exchangeObservations.map((observation) => [observation.period, observation]),
  )
  const gdpByPeriod = new Map(
    gdpObservations.map((observation) => [observation.period, observation]),
  )
  const sharedPeriods = [...exchangeByPeriod.keys()]
    .filter((period) => gdpByPeriod.has(period))
    .sort((left, right) => left - right)
  const baselinePeriod =
    sharedPeriods.filter((period) => period <= startYear).at(-1) ??
    sharedPeriods.find((period) => period >= startYear)
  const endpointPeriod = sharedPeriods.at(-1)
  if (baselinePeriod === undefined || endpointPeriod === undefined) return null

  const exchangeStart = exchangeByPeriod.get(baselinePeriod)?.value
  const exchangeEnd = exchangeByPeriod.get(endpointPeriod)?.value
  const gdpStart = gdpByPeriod.get(baselinePeriod)?.value
  const gdpEnd = gdpByPeriod.get(endpointPeriod)?.value
  if (
    exchangeStart === undefined ||
    exchangeEnd === undefined ||
    gdpStart === undefined ||
    gdpEnd === undefined
  ) {
    return null
  }

  const round = (value: number, digits = 1) => {
    const factor = 10 ** digits
    return Math.round(value * factor) / factor
  }
  const rateIncreasePercent = (exchangeEnd / exchangeStart - 1) * 100
  const rupeeDollarValueChangePercent =
    ((1 / exchangeEnd) / (1 / exchangeStart) - 1) * 100
  const realGdpChangePercent = (gdpEnd / gdpStart - 1) * 100

  return {
    title: 'How can the rupee weaken while real GDP rises?',
    periodStart: baselinePeriod,
    periodEnd: endpointPeriod,
    exchangeRate: {
      start: exchangeStart,
      end: exchangeEnd,
      rateIncreasePercent: round(rateIncreasePercent),
      rupeeDollarValueChangePercent: round(rupeeDollarValueChangePercent),
    },
    realGdpPerCapita: {
      start: gdpStart,
      end: gdpEnd,
      changePercent: round(realGdpChangePercent),
    },
    explanation: [
      'The exchange rate is the current relative price of two currencies. It moves with inflation differences, interest rates, capital flows, oil and trade demand, global dollar strength, and central-bank policy.',
      'Real GDP per person in constant 2015 US dollars holds the price and conversion basis fixed to measure changes in production volume. It is not today’s rupee GDP converted at today’s exchange rate.',
      'India can therefore produce substantially more goods and services per person while each rupee buys fewer current US dollars.',
    ],
    conclusion:
      'Rupee depreciation can make imported fuel, machinery, education, and foreign debt more expensive, but the exchange rate alone cannot grade a Prime Minister. Read it with real output, inflation, jobs, wages, reserves, and the current account.',
    sources: getSourcesByIds(db, [
      'world-bank-exchange-rate',
      'world-bank-constant-prices',
      'world-bank-api',
    ]),
  }
}

export function createApp(db: DatabaseSync) {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json())
  app.use((_request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('X-Content-Type-Options', 'nosniff')
    next()
  })

  app.get('/api/health', (_request, response) => {
    const metadata = metadataMap(db)
    response.json({
      ok: true,
      knowledgeCutoff: metadata.knowledge_cutoff,
      seedVersion: metadata.seed_version,
    })
  })

  app.get('/api/meta', (_request, response) => {
    const metadata = metadataMap(db)
    const jurisdictionMetadata = Object.fromEntries(
      (
        db
          .prepare(
            `SELECT jurisdiction_id, key, value
             FROM jurisdiction_metadata
             ORDER BY jurisdiction_id, key`,
          )
          .all() as unknown as Array<{
          jurisdiction_id: string
          key: string
          value: string
        }>
      ).reduce<Array<[string, Record<string, string>]>>((groups, row) => {
        let entry = groups.find(([id]) => id === row.jurisdiction_id)
        if (!entry) {
          entry = [row.jurisdiction_id, {}]
          groups.push(entry)
        }
        entry[1][row.key] = row.value
        return groups
      }, []),
    )
    const counts = Object.fromEntries(
      [
        'jurisdictions',
        'leader_terms',
        'events',
        'claims',
        'policies',
        'policy_register',
        'budgets',
        'indicator_definitions',
        'indicator_observations',
        'sources',
      ].map((table) => [
        table,
        (
          db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get() as {
            count: number
          }
        ).count,
      ]),
    )
    response.json({
      project: 'India Mechanics',
      scope: 'India, 1945 to present',
      metadata,
      jurisdictionMetadata,
      counts,
      editorialPolicy:
        'Measured observations, sourced claims, and editorial evaluations are separate record types.',
    })
  })

  app.get('/api/jurisdictions', (_request, response) => {
    const rows = db
      .prepare(
        `SELECT id, name, short_name, level, parent_id, iso_code, valid_from,
                valid_to, status
         FROM jurisdictions
         ORDER BY level, name`,
      )
      .all() as unknown as Array<Record<string, unknown>>
    response.json(
      rows.map((row) => ({
        id: row.id,
        name: row.name,
        shortName: row.short_name,
        level: row.level,
        parentId: row.parent_id,
        isoCode: row.iso_code,
        validFrom: row.valid_from,
        validTo: row.valid_to,
        status: row.status,
      })),
    )
  })

  app.get('/api/overview', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    const targetYear = Number(request.query.year ?? progressYear(db))
    const metadata = metadataForJurisdiction(db, jurisdictionId)
    const jurisdiction = db
      .prepare(
        `SELECT id, name, short_name, level, parent_id, iso_code, valid_from,
                valid_to, status
         FROM jurisdictions
         WHERE id = ?`,
      )
      .get(jurisdictionId) as Record<string, unknown> | undefined
    if (!jurisdiction) {
      response.status(404).json({ error: 'Jurisdiction not found' })
      return
    }
    const terms = getLeaderTerms(db, jurisdictionId)
    const currentTerm = terms.find((term) => !term.endDate)
    const policies = getPolicies(db, jurisdictionId)
    const answers = (
      db
        .prepare(
          `SELECT id, question, short_answer, confidence, as_of_date
           FROM curated_answers
           WHERE jurisdiction_id = ?
           ORDER BY rowid`,
        )
        .all(jurisdictionId) as unknown as Array<Record<string, unknown>>
    ).map((row) => ({
      id: row.id,
      question: row.question,
      shortAnswer: row.short_answer,
      confidence: row.confidence,
      asOfDate: row.as_of_date,
    }))
    const validFromYear = Number(String(jurisdiction.valid_from).slice(0, 4))
    const historyYears = [
      1960,
      1970,
      1980,
      1990,
      2000,
      2010,
      2015,
      2018,
      2020,
      2022,
      2024,
      targetYear,
    ].filter((year) => year >= validFromYear)
    const featuredPolicy =
      policies.find((policy) => policy.id === 'economic-reforms-1991') ??
      policies[0] ??
      null
    const featuredAnswerId =
      jurisdictionId === 'india'
        ? 'regime-change-now'
        : String(answers[0]?.id ?? '')
    const featuredAnswer = featuredAnswerId
      ? getAnswer(db, featuredAnswerId)
      : null
    response.json({
      jurisdictionId,
      jurisdiction: {
        id: jurisdiction.id,
        name: jurisdiction.name,
        shortName: jurisdiction.short_name,
        level: jurisdiction.level,
        parentId: jurisdiction.parent_id,
        isoCode: jurisdiction.iso_code,
        validFrom: jurisdiction.valid_from,
        validTo: jurisdiction.valid_to,
        status: jurisdiction.status,
      },
      targetYear,
      knowledge: {
        cutoff: metadata.knowledge_cutoff,
        editorialReviewedThrough: metadata.editorial_reviewed_through,
        politicalStatusChecked: metadata.political_status_checked,
        billRegisterAsOfDate: metadata.bill_register_as_of_date,
        indicatorAsOfDate: metadata.indicator_as_of_date,
        latestWorldBankPeriod: Number(metadata.latest_world_bank_period),
        latestVdemPeriod: Number(metadata.latest_vdem_period),
        timelineStarts:
          metadata.timeline_starts ?? jurisdiction.valid_from,
      },
      progress: calculateProgress(db, jurisdictionId, targetYear),
      progressHistory: calculateProgressHistory(
        db,
        jurisdictionId,
        Array.from(new Set(historyYears)),
      ),
      currentTerm,
      featuredPolicy,
      featuredAnswer,
      questions: answers,
      recentEvents: getEvents(db, jurisdictionId).slice(0, 5),
    })
  })

  app.get('/api/leaders', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    response.json(getLeaderTerms(db, jurisdictionId))
  })

  app.get('/api/leaders/:termId', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    const term = getLeaderTerms(db, jurisdictionId).find(
      (candidate) => candidate.id === request.params.termId,
    )
    if (!term) {
      response.status(404).json({ error: 'Leader term not found' })
      return
    }
    response.json(term)
  })

  app.get('/api/policies', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    response.json(getPolicies(db, jurisdictionId))
  })

  app.get('/api/policies/:policyId', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    const policy = getPolicies(db, jurisdictionId).find(
      (candidate) => candidate.id === request.params.policyId,
    )
    if (!policy) {
      response.status(404).json({ error: 'Policy not found' })
      return
    }
    response.json(policy)
  })

  app.get('/api/budgets', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    response.json(getBudgets(db, jurisdictionId))
  })

  app.get('/api/budgets/:budgetId', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    const budget = getBudgets(db, jurisdictionId).find(
      (candidate) => candidate.id === request.params.budgetId,
    )
    if (!budget) {
      response.status(404).json({ error: 'Budget not found' })
      return
    }
    response.json(budget)
  })

  app.get('/api/bills', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    response.json(
      getBillRegister(db, jurisdictionId, {
        query: request.query.q ? String(request.query.q) : undefined,
        status: request.query.status ? String(request.query.status) : undefined,
        ministry: request.query.ministry
          ? String(request.query.ministry)
          : undefined,
        leaderTermId: request.query.leaderTerm
          ? String(request.query.leaderTerm)
          : undefined,
        from: request.query.from ? String(request.query.from) : undefined,
        to: request.query.to ? String(request.query.to) : undefined,
        reviewStatus: request.query.reviewStatus
          ? String(request.query.reviewStatus)
          : undefined,
        page: request.query.page ? Number(request.query.page) : undefined,
        pageSize: request.query.pageSize
          ? Number(request.query.pageSize)
          : undefined,
      }),
    )
  })

  app.get('/api/bills/:billId', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    const bill = getBillRecord(db, jurisdictionId, request.params.billId)
    if (!bill) {
      response.status(404).json({ error: 'Bill not found' })
      return
    }
    response.json({
      ...bill,
      source: getSourcesByIds(db, ['sansad-government-bills-api'])[0],
    })
  })

  app.get('/api/events', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    response.json(
      getEvents(db, jurisdictionId, {
        category: request.query.category
          ? String(request.query.category)
          : undefined,
        from: request.query.from ? String(request.query.from) : undefined,
        to: request.query.to ? String(request.query.to) : undefined,
        leaderTermId: request.query.leaderTerm
          ? String(request.query.leaderTerm)
          : undefined,
        partyId: request.query.party
          ? String(request.query.party)
          : undefined,
      }),
    )
  })

  app.get('/api/indicators', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    const targetYear = Number(request.query.year ?? progressYear(db))
    response.json(getIndicators(db, jurisdictionId, targetYear))
  })

  app.get('/api/indicators/:indicatorId/series', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    const definition = getIndicators(db, jurisdictionId, progressYear(db)).find(
      (candidate) => candidate.id === request.params.indicatorId,
    )
    if (!definition) {
      response.status(404).json({ error: 'Indicator not found' })
      return
    }
    const observations = db
      .prepare(
        `SELECT period, value, status, source_id, note
         FROM indicator_observations
         WHERE jurisdiction_id = ? AND indicator_id = ?
         ORDER BY period`,
      )
      .all(
        jurisdictionId,
        request.params.indicatorId,
      ) as unknown as IndicatorObservationRow[]
    const termChanges = getIndicatorTermChanges(
      db,
      jurisdictionId,
      observations,
      definition.direction as 'higher' | 'lower' | 'neutral',
    )
    const comparison =
      jurisdictionId === 'india' &&
      request.params.indicatorId === 'official-exchange-rate'
        ? getCurrencyGrowthComparison(db, jurisdictionId, observations)
        : null
    const jurisdiction = db
      .prepare(`SELECT level FROM jurisdictions WHERE id = ?`)
      .get(jurisdictionId) as { level: string } | undefined
    const officeLabel =
      jurisdiction?.level === 'country' ? 'Prime Minister' : 'Chief Minister'
    response.json({
      definition,
      observations: observations.map((row) => ({
        period: row.period,
        value: row.value,
        status: row.status,
        sourceId: row.source_id,
        note: row.note,
      })),
      termChanges,
      attributionCaveat:
        definition.direction === 'neutral'
          ? `This is a contextual indicator, not a higher-is-better score, and it is not mechanically assigned to the ${officeLabel} in office.`
          : `These are observed changes while a ${officeLabel} was in office. They do not prove that the ${officeLabel} caused the change; prior policy, other levels of government, global conditions, demographics, and data timing also matter.`,
      source: getSourcesByIds(db, [String(definition.sourceId)])[0],
      comparison,
    })
  })

  app.get('/api/sources', (request, response) => {
    const minimum = Number(request.query.minRating ?? 1)
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    const rows = db
      .prepare(
        `SELECT * FROM sources
         WHERE reliability >= ?
           AND id IN (
             SELECT term_source.source_id
             FROM term_sources term_source
             JOIN leader_terms term ON term.id = term_source.term_id
             JOIN offices office ON office.id = term.office_id
             WHERE office.jurisdiction_id = ?
             UNION
             SELECT event_source.source_id
             FROM event_sources event_source
             JOIN events event ON event.id = event_source.event_id
             WHERE event.jurisdiction_id = ?
             UNION
             SELECT claim_source.source_id
             FROM claim_sources claim_source
             JOIN claims claim ON claim.id = claim_source.claim_id
             WHERE claim.jurisdiction_id = ?
             UNION
             SELECT policy_source.source_id
             FROM policy_sources policy_source
             JOIN policies policy ON policy.id = policy_source.policy_id
             WHERE policy.jurisdiction_id = ?
             UNION
             SELECT budget_source.source_id
             FROM budget_sources budget_source
             JOIN budgets budget ON budget.id = budget_source.budget_id
             WHERE budget.jurisdiction_id = ?
             UNION
             SELECT source_id
             FROM indicator_observations
             WHERE jurisdiction_id = ?
           )
         ORDER BY reliability DESC, publisher, title`,
      )
      .all(
        minimum,
        jurisdictionId,
        jurisdictionId,
        jurisdictionId,
        jurisdictionId,
        jurisdictionId,
        jurisdictionId,
      ) as unknown as SourceRow[]
    response.json(rows.map(sourceShape))
  })

  app.get('/api/questions/:answerId', (request, response) => {
    const answer = getAnswer(db, request.params.answerId)
    if (!answer) {
      response.status(404).json({ error: 'Curated answer not found' })
      return
    }
    response.json(answer)
  })

  app.get('/api/search', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    const query = String(request.query.q ?? '').trim().toLowerCase()
    if (query.length < 2) {
      response.json({ query, answer: null, results: [] })
      return
    }
    const tokens = Array.from(
      new Set(
        query
          .split(/[^\p{L}\p{N}]+/u)
          .map((token) => token.trim())
          .filter((token) => token.length >= 2),
      ),
    )
    if (tokens.length === 0) {
      response.json({ query, answer: null, results: [] })
      return
    }
    const searchClause = (columns: string[]) =>
      tokens
        .map(
          () =>
            `(${columns.map((column) => `LOWER(${column}) LIKE ?`).join(' OR ')})`,
        )
        .join(' AND ')
    const searchParams = (columns: string[]) =>
      tokens.flatMap((token) => columns.map(() => `%${token}%`))
    const answers = db
      .prepare(
        `SELECT id, question, aliases_json, short_answer
         FROM curated_answers
         WHERE jurisdiction_id = ?`,
      )
      .all(jurisdictionId) as unknown as Array<{
      id: string
      question: string
      aliases_json: string
      short_answer: string
    }>
    const answerMatch = answers.find((answer) => {
      const haystack = [
        answer.question,
        answer.short_answer,
        ...(JSON.parse(answer.aliases_json) as string[]),
      ]
        .join(' ')
        .toLowerCase()
      return (
        haystack.includes(query) ||
        query
          .split(/\s+/)
          .filter((token) => token.length > 2)
          .every((token) => haystack.includes(token))
      )
    })

    const eventResults = (
      db
        .prepare(
          `SELECT id, title, summary, event_date
           FROM events
           WHERE jurisdiction_id = ?
             AND ${searchClause([
               'title',
               'summary',
               'significance',
               'category',
               'event_date',
             ])}
           ORDER BY event_date DESC
           LIMIT 12`,
        )
        .all(
          jurisdictionId,
          ...searchParams([
            'title',
            'summary',
            'significance',
            'category',
            'event_date',
          ]),
        ) as unknown as Array<
        Record<string, unknown>
      >
    ).map((row) => ({
      type: 'event',
      id: row.id,
      title: row.title,
      subtitle: row.summary,
      date: row.event_date,
    }))

    const leaderResults = (
      db
        .prepare(
          `SELECT t.id, p.name, t.rating_summary, t.start_date
           FROM leader_terms t
           JOIN people p ON p.id = t.person_id
           JOIN offices o ON o.id = t.office_id
           WHERE o.jurisdiction_id = ?
             AND ${searchClause(['p.name', 't.rating_summary', 't.mandate_label'])}
           ORDER BY t.start_date DESC
           LIMIT 12`,
        )
        .all(
          jurisdictionId,
          ...searchParams(['p.name', 't.rating_summary', 't.mandate_label']),
        ) as unknown as Array<
        Record<string, unknown>
      >
    ).map((row) => ({
      type: 'leader',
      id: row.id,
      title: row.name,
      subtitle: row.rating_summary,
      date: row.start_date,
    }))

    const claimResults = (
      db
        .prepare(
          `SELECT id, title, body, as_of_date, leader_term_id, event_id, policy_id
           FROM claims
           WHERE jurisdiction_id = ?
             AND ${searchClause(['title', 'body', 'category', 'stance'])}
           ORDER BY rowid DESC
           LIMIT 12`,
        )
        .all(
          jurisdictionId,
          ...searchParams(['title', 'body', 'category', 'stance']),
        ) as unknown as Array<
        Record<string, unknown>
      >
    ).map((row) => ({
      type: 'claim',
      id: row.id,
      title: row.title,
      subtitle: row.body,
      date: row.as_of_date,
      leaderTermId: row.leader_term_id,
      eventId: row.event_id,
      policyId: row.policy_id,
    }))

    const policyResults = (
      db
        .prepare(
          `SELECT id, title, summary,
                  COALESCE(introduced_date, enacted_date) AS policy_date
           FROM policies
           WHERE jurisdiction_id = ?
             AND ${searchClause([
               'title',
               'short_title',
               'summary',
               'intended_goal',
               'policy_type',
               'rating_summary',
             ])}
           ORDER BY COALESCE(introduced_date, enacted_date) DESC
           LIMIT 12`,
        )
        .all(
          jurisdictionId,
          ...searchParams([
            'title',
            'short_title',
            'summary',
            'intended_goal',
            'policy_type',
            'rating_summary',
          ]),
        ) as unknown as Array<Record<string, unknown>>
    ).map((row) => ({
      type: 'policy',
      id: row.id,
      title: row.title,
      subtitle: row.summary,
      date: row.policy_date,
    }))

    const budgetResults = (
      db
        .prepare(
          `SELECT id, title, fiscal_year, summary
           FROM budgets
           WHERE jurisdiction_id = ?
             AND ${searchClause([
               'title',
               'short_title',
               'fiscal_year',
               'finance_minister',
               'summary',
               'plain_language',
               'rating_summary',
             ])}
           ORDER BY fiscal_year DESC
           LIMIT 12`,
        )
        .all(
          jurisdictionId,
          ...searchParams([
            'title',
            'short_title',
            'fiscal_year',
            'finance_minister',
            'summary',
            'plain_language',
            'rating_summary',
          ]),
        ) as unknown as Array<Record<string, unknown>>
    ).map((row) => ({
      type: 'budget',
      id: row.id,
      title: row.title,
      subtitle: row.summary,
      date: `${String(row.fiscal_year).slice(0, 4)}-01-01`,
    }))

    const indicatorResults = (
      db
        .prepare(
          `SELECT d.id, d.name, d.plain_language, MAX(o.period) AS latest_period
           FROM indicator_definitions d
           LEFT JOIN indicator_observations o ON o.indicator_id = d.id
             AND o.jurisdiction_id = ?
           WHERE ${searchClause([
             'd.name',
             'd.short_name',
             'd.description',
             'd.plain_language',
             'd.example',
             'd.unit',
             'd.source_code',
           ])}
           GROUP BY d.id, d.name, d.plain_language
           ORDER BY latest_period DESC, d.name
           LIMIT 12`,
        )
        .all(
          jurisdictionId,
          ...searchParams([
            'd.name',
            'd.short_name',
            'd.description',
            'd.plain_language',
            'd.example',
            'd.unit',
            'd.source_code',
          ]),
        ) as unknown as Array<Record<string, unknown>>
    ).map((row) => ({
      type: 'indicator',
      id: row.id,
      title: row.name,
      subtitle: row.plain_language,
      date: `${row.latest_period}-01-01`,
    }))

    const billResults = (
      db
        .prepare(
          `SELECT register.id, register.title, register.ministry,
                  register.status, register.introduced_date,
                  register.linked_policy_id, explanation.proposal_summary
           FROM policy_register register
           JOIN bill_explanations explanation ON explanation.bill_id = register.id
           WHERE register.jurisdiction_id = ?
             AND ${searchClause([
               'register.title',
               "COALESCE(register.bill_number, '')",
               "COALESCE(register.ministry, '')",
               'register.status',
               "COALESCE(register.act_number, '')",
               'explanation.proposal_summary',
               "COALESCE(explanation.official_purpose, '')",
               'explanation.affected_groups_json',
               'explanation.potential_benefits',
               'explanation.potential_risks',
             ])}
           ORDER BY register.introduced_date DESC
           LIMIT 12`,
        )
        .all(
          jurisdictionId,
          ...searchParams([
            'register.title',
            "COALESCE(register.bill_number, '')",
            "COALESCE(register.ministry, '')",
            'register.status',
            "COALESCE(register.act_number, '')",
            'explanation.proposal_summary',
            "COALESCE(explanation.official_purpose, '')",
            'explanation.affected_groups_json',
            'explanation.potential_benefits',
            'explanation.potential_risks',
          ]),
        ) as unknown as Array<Record<string, unknown>>
    ).map((row) => ({
      type: 'bill',
      id: row.id,
      title: row.title,
      subtitle: row.proposal_summary,
      date: row.introduced_date,
      policyId: row.linked_policy_id,
    }))

    response.json({
      query,
      answer: answerMatch ? getAnswer(db, answerMatch.id) : null,
      results: [
        ...indicatorResults,
        ...policyResults,
        ...billResults,
        ...budgetResults,
        ...leaderResults,
        ...eventResults,
        ...claimResults,
      ].slice(0, 24),
    })
  })

  app.get('/api/methodology', (_request, response) => {
    const dimensions = db
      .prepare(
        `SELECT id, name, weight, description, color
         FROM progress_dimensions ORDER BY rowid`,
      )
      .all()
    const leaderDimensions = db
      .prepare(
        `SELECT id, name, weight, description
         FROM evaluation_dimensions ORDER BY rowid`,
      )
      .all()
    const policyDimensions = db
      .prepare(
        `SELECT id, name, weight, description
         FROM policy_evaluation_dimensions ORDER BY rowid`,
      )
      .all()
    const budgetDimensions = db
      .prepare(
        `SELECT id, name, weight, description
         FROM budget_evaluation_dimensions ORDER BY rowid`,
      )
      .all()
    const specialistTopics = (
      db
        .prepare(
          `SELECT id, name, description, operational_label, adjusted_label,
                  methodology
           FROM leader_specialist_topics
           ORDER BY rowid`,
        )
        .all() as unknown as Array<{
        id: string
        name: string
        description: string
        operational_label: string
        adjusted_label: string
        methodology: string
      }>
    ).map((topic) => ({
      id: topic.id,
      name: topic.name,
      description: topic.description,
      operationalLabel: topic.operational_label,
      adjustedLabel: topic.adjusted_label,
      methodology: topic.methodology,
      dimensions: (
        db
          .prepare(
            `SELECT id, name, operational_weight, adjusted_weight, description
             FROM leader_specialist_dimensions
             WHERE topic_id = ?
             ORDER BY rowid`,
          )
          .all(topic.id) as unknown as Array<{
          id: string
          name: string
          operational_weight: number
          adjusted_weight: number
          description: string
        }>
      ).map((dimension) => ({
        id: dimension.id,
        name: dimension.name,
        operationalWeight: dimension.operational_weight,
        adjustedWeight: dimension.adjusted_weight,
        description: dimension.description,
      })),
    }))
    response.json({
      version:
        'progress-v0.1|leader-v0.2|security-v0.1|public-safety-v0.1|infrastructure-v0.1|bill-v0.1',
      progress: {
        purpose:
          'A transparent diagnostic lens, not an official statistic or causal ranking.',
        formula:
          'Normalize each indicator to fixed goalposts, average within each dimension using published weights, then average scorable dimensions using dimension weights.',
        dimensions,
        uncertainty:
          'Coverage, observation age, modeled values, and sparse surveys lower confidence and widen the displayed range.',
        attribution:
          'Country outcomes are not assigned mechanically to the Prime Minister in office.',
      },
      leaderEvaluation: {
        purpose:
          'An evidence-led editorial estimate that forces achievements, concerns, starting conditions, and institutional costs into the same frame.',
        formula:
          'Balanced profile: 30% observed outcomes, 20% durable reforms, 15% inclusion, 10% crisis and security, 15% institutions and liberties, and 10% integrity and execution. The weighted sum is rounded to one decimal. Acting and ultra-short terms are not rated.',
        dimensions: leaderDimensions,
        profiles: leaderRatingProfiles.map((profile) => ({
          id: profile.id,
          name: profile.name,
          description: profile.description,
          weights: profile.weights,
          isCanonical: profile.id === 'balanced',
        })),
      },
      specialistEvaluations: specialistTopics,
      policyEvaluation: {
        purpose:
          'A disclosed editorial assessment of policy design, observed outcomes, execution, rights, and side effects.',
        formula:
          'Weighted average of available 0–10 components. Pending bills and newly issued rules receive a provisional design rating: unobservable effectiveness is marked unavailable and excluded rather than assigned a neutral score.',
        dimensions: policyDimensions,
      },
      billExplanations: {
        purpose:
          'Make every parliamentary register record understandable without presenting discovery metadata as an evaluation.',
        evidenceBases: {
          'title-only':
            'Register-derived legal-operation and subject summary with conditional upside and downside questions; no score.',
          'official-text':
            'Official long title and stated rationale extracted from a parliamentary document; exact impact still requires independent review.',
          'independent-review':
            'Official text plus source-backed policy analysis; may support a provisional design or retrospective rating.',
        },
        specificity: {
          explicit: 'The available text identifies the operative proposal.',
          'domain-only':
            'The title identifies the legal domain but not exact clauses.',
          opaque:
            'An annual, numbered, omnibus, or similarly broad title cannot reveal the operative proposal.',
        },
        scope:
          'A bill-specific rating reviews this proposal. A policy-family link may cover only one measure within an omnibus or Finance Bill.',
        status:
          'The upstream register status is preserved as sourceStatus when a dated, sourced procedural correction is published.',
      },
      budgetEvaluation: {
        purpose:
          'A disclosed editorial assessment of a budget plan, its fiscal frame, allocation choices, inclusion, and implementation evidence.',
        formula:
          'Equal-weight average of five 0-10 components. Current budgets receive a provisional proposal rating because actual execution and outcomes are incomplete.',
        dimensions: budgetDimensions,
      },
      sourceRatings: {
        5: 'Primary law, official result, or direct statistical record with clear provenance.',
        4: 'High-quality multilateral, academic, or independent analysis with transparent method.',
        3: 'Reputable secondary synthesis useful for context and corroboration.',
        2: 'Material methodology, independence, or sourcing limitations.',
        1: 'Unverified or unsuitable as standalone evidence.',
        rule: 'Rate the individual source item for the stated use, not the publisher as a whole and not agreement with its conclusion.',
      },
      corroborationRules: {
        breaking:
          'Use a direct or official record plus Reuters, PTI, or another independently reporting reputable outlet. Mark unresolved stories as developing.',
        communalViolence:
          'Require official, court, or commission evidence; independent national reporting; and credible local or field evidence.',
        casualties:
          'Store each reported count with source, time, category, and attribution. Display ranges and disagreement.',
        allegations:
          'Require the originating allegation, the accused party’s response or documented non-response, and independent reporting.',
        achievements:
          'Announcements establish intent or spending. Outcome claims need a baseline, denominator, time range, method, and independent evidence.',
      },
      biasControls: [
        'Positive and negative claims are stored separately.',
        'Every displayed claim links to source records and an as-of date.',
        'Official sources control official acts and numbers, not evaluation of their success.',
        'Independent sources are used for institutional and contested outcome claims.',
        'Missing data remains visible rather than being silently imputed.',
      ],
    })
  })

  app.get('/api/export', (request, response) => {
    const jurisdictionId = String(
      request.query.jurisdiction ?? DEFAULT_JURISDICTION,
    )
    response.json({
      schemaVersion: '0.1',
      generatedAt: new Date().toISOString(),
      jurisdiction: (
        db
          .prepare(`SELECT * FROM jurisdictions WHERE id = ?`)
          .get(jurisdictionId) ?? null
      ),
      methodology: {
        url: '/api/methodology',
        editorialScoresAreFacts: false,
      },
      leaders: getLeaderTerms(db, jurisdictionId),
      policies: getPolicies(db, jurisdictionId),
      budgets: getBudgets(db, jurisdictionId),
      bills: getAllBillRecords(db, jurisdictionId),
      events: getEvents(db, jurisdictionId),
      indicators: getIndicators(db, jurisdictionId, progressYear(db)),
      progress: calculateProgress(
        db,
        jurisdictionId,
        progressYear(db),
      ),
      sources: (
        db.prepare(`SELECT * FROM sources ORDER BY id`).all() as unknown as SourceRow[]
      ).map(sourceShape),
      questions: (
        db
          .prepare(
            `SELECT id FROM curated_answers WHERE jurisdiction_id = ? ORDER BY id`,
          )
          .all(jurisdictionId) as unknown as Array<{ id: string }>
      ).map((row) => getAnswer(db, row.id)),
    })
  })

  app.get('/api/openapi.json', (_request, response) => {
    response.json({
      openapi: '3.1.0',
      info: {
        title: 'India Mechanics Read API',
        version: '0.1.0',
        description:
          'Read-only, source-backed historical data and editorial assessments. Use /api/methodology before interpreting scores.',
      },
      servers: [{ url: '/' }],
      paths: {
        '/api/meta': { get: { summary: 'Dataset metadata and row counts' } },
        '/api/overview': { get: { summary: 'Progress, current term, and featured answer' } },
        '/api/leaders': { get: { summary: 'Leader terms, component scores, claims, and sources' } },
        '/api/policies': { get: { summary: 'Policies, bills, evaluations, claims, and sources' } },
        '/api/budgets': { get: { summary: 'Union budgets, allocations, evaluations, and sources' } },
        '/api/bills': { get: { summary: 'Paginated official government-bill register' } },
        '/api/bills/{billId}': { get: { summary: 'One official government-bill record' } },
        '/api/events': { get: { summary: 'Historical timeline events' } },
        '/api/indicators': { get: { summary: 'Indicator definitions and latest values' } },
        '/api/indicators/{indicatorId}/series': { get: { summary: 'One indicator time series with PM-tenure changes' } },
        '/api/sources': { get: { summary: 'Source reliability ledger' } },
        '/api/search': { get: { summary: 'Cross-entity search and curated question matching' } },
        '/api/methodology': { get: { summary: 'Scoring, uncertainty, and bias-control rules' } },
        '/api/export': { get: { summary: 'Complete jurisdiction research export' } },
      },
    })
  })

  return app
}
