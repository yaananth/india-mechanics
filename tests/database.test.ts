import { DatabaseSync } from 'node:sqlite'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { applySchema } from '../server/schema.ts'
import { ensureDatabase } from '../server/seed.ts'

let db: DatabaseSync

beforeAll(() => {
  db = new DatabaseSync(ensureDatabase(), { readOnly: true })
})

afterAll(() => {
  db.close()
})

describe('research database integrity', () => {
  it('publishes a timeline from 1945 with conflict and protest coverage', () => {
    const summary = db
      .prepare(
        `SELECT COUNT(*) AS count, MIN(event_date) AS first_date
         FROM events`,
      )
      .get() as { count: number; first_date: string }
    expect(summary.count).toBeGreaterThanOrEqual(100)
    expect(summary.first_date).toBe('1945-11-05')

    const categories = db
      .prepare(
        `SELECT category, COUNT(*) AS count
         FROM events
         WHERE category IN ('protest', 'communal-violence', 'disaster', 'insurgency')
         GROUP BY category`,
      )
      .all() as unknown as Array<{ category: string; count: number }>
    expect(categories.find((row) => row.category === 'protest')?.count).toBeGreaterThan(4)
    expect(
      categories.find((row) => row.category === 'communal-violence')?.count,
    ).toBeGreaterThan(5)
  })

  it('provides accountability and responsible actors for every event', () => {
    const missingAssessments = db
      .prepare(
        `SELECT e.id
         FROM events e
         LEFT JOIN event_assessments a ON a.event_id = e.id
         WHERE a.event_id IS NULL`,
      )
      .all()
    const eventsWithoutActors = db
      .prepare(
        `SELECT e.id
         FROM events e
         LEFT JOIN event_responsibilities r ON r.event_id = e.id
         GROUP BY e.id
         HAVING COUNT(r.id) = 0`,
      )
      .all()
    const counts = db
      .prepare(
        `SELECT
           (SELECT COUNT(*) FROM events) AS events,
           (SELECT COUNT(*) FROM event_assessments) AS assessments,
           (SELECT COUNT(*) FROM event_responsibilities) AS responsibilities`,
      )
      .get() as {
      events: number
      assessments: number
      responsibilities: number
    }
    expect(missingAssessments).toEqual([])
    expect(eventsWithoutActors).toEqual([])
    expect(counts.assessments).toBe(counts.events)
    expect(counts.responsibilities).toBeGreaterThanOrEqual(175)
  })

  it('orders the refreshed timeline newest first and includes both NEET crises', () => {
    const rows = db
      .prepare(
        `SELECT id, event_date
         FROM events
         ORDER BY event_date DESC, id`,
      )
      .all() as unknown as Array<{ id: string; event_date: string }>
    expect(rows[0]).toMatchObject({
      id: 'ap-current-road-delivery-2026',
      event_date: '2026-07-21',
    })
    expect(rows.at(-1)).toMatchObject({
      id: 'ina-trials-1945',
      event_date: '1945-11-05',
    })
    expect(rows.map((row) => row.id)).toEqual(
      expect.arrayContaining([
        'neet-ug-2024-controversy',
        'neet-ug-2026-crisis',
      ]),
    )
  })

  it('distinguishes PM, state, non-state, foreign, and corporate responsibility', () => {
    const emergency = db
      .prepare(
        `SELECT choice_assessment, choice_score, union_role
         FROM event_assessments WHERE event_id = 'emergency-1975'`,
      )
      .get() as {
      choice_assessment: string
      choice_score: number
      union_role: string
    }
    const kargilActors = db
      .prepare(
        `SELECT actor_type, responsibility_kind
         FROM event_responsibilities WHERE event_id = 'kargil-1999'`,
      )
      .all() as unknown as Array<{
      actor_type: string
      responsibility_kind: string
    }>
    const bhopalPrimary = db
      .prepare(
        `SELECT actor_type, responsibility_level
         FROM event_responsibilities
         WHERE event_id = 'bhopal-1984'
         ORDER BY responsibility_level DESC, id
         LIMIT 1`,
      )
      .get() as {
      actor_type: string
      responsibility_level: number
    }
    expect(emergency.choice_assessment).toBe('wrong')
    expect(emergency.choice_score).toBe(1)
    expect(emergency.union_role).toContain('Prime Minister Indira Gandhi')
    expect(kargilActors).toContainEqual({
      actor_type: 'foreign-state',
      responsibility_kind: 'direct-action',
    })
    expect(kargilActors).toContainEqual({
      actor_type: 'union-government',
      responsibility_kind: 'positive-leadership',
    })
    expect(bhopalPrimary).toEqual({
      actor_type: 'corporate',
      responsibility_level: 5,
    })
  })

  it('requires at least one source for every event and claim', () => {
    const unsourcedEvents = db
      .prepare(
        `SELECT e.id
         FROM events e
         LEFT JOIN event_sources es ON es.event_id = e.id
         GROUP BY e.id
         HAVING COUNT(es.source_id) = 0`,
      )
      .all()
    const unsourcedClaims = db
      .prepare(
        `SELECT c.id
         FROM claims c
         LEFT JOIN claim_sources cs ON cs.claim_id = c.id
         GROUP BY c.id
         HAVING COUNT(cs.source_id) = 0`,
      )
      .all()
    expect(unsourcedEvents).toEqual([])
    expect(unsourcedClaims).toEqual([])
  })

  it('preserves legacy links as unspecified while retaining authored claim provenance', () => {
    const roles = db
      .prepare(
        `SELECT evidence_role, COUNT(*) AS count
         FROM claim_sources
         GROUP BY evidence_role`,
      )
      .all()
    const populated = db
      .prepare(
        `SELECT
           SUM(locator IS NOT NULL) AS locators,
           SUM(claim_specific_limitation IS NOT NULL) AS specific_limitations,
           SUM(extraction_method IS NOT NULL) AS extraction_methods,
           SUM(reported_value IS NOT NULL) AS reported_values,
           SUM(reported_unit IS NOT NULL) AS reported_units,
           SUM(reported_at IS NOT NULL) AS reported_dates
         FROM claim_sources`,
      )
      .get()

    expect(roles).toEqual([
      {
        evidence_role: 'controls',
        count: 1,
      },
      expect.objectContaining({
        evidence_role: 'unspecified',
      }),
    ])
    expect(populated).toEqual({
      locators: 1,
      specific_limitations: 1,
      extraction_methods: 1,
      reported_values: 1,
      reported_units: 1,
      reported_dates: 1,
    })
    expect(
      db
        .prepare(
          `SELECT evidence_role, locator, claim_specific_limitation,
                  extraction_method, reported_value, reported_unit, reported_at
           FROM claim_sources
           WHERE claim_id = 'bharatmala-corridor-delivery'`,
        )
        .get(),
    ).toEqual({
      evidence_role: 'controls',
      locator:
        'Bharatmala Pariyojana progress status reported through November 2025.',
      claim_specific_limitation:
        'The official completion figure does not by itself establish net-new road length, quality, safety, cost control, or utilization.',
      extraction_method: 'manual-reviewed-summary',
      reported_value: 21597,
      reported_unit: 'km completed',
      reported_at: '2025-11-30',
    })
  })

  it('keeps published leader estimates aligned with the six-category arithmetic mean', () => {
    const rows = db
      .prepare(
        `SELECT t.id, t.rating_score,
                AVG(s.score) AS arithmetic_mean,
                COUNT(*) AS category_count
         FROM leader_terms t
         JOIN leader_term_scores s ON s.term_id = t.id
         WHERE t.rating_score IS NOT NULL
         GROUP BY t.id`,
      )
      .all() as unknown as Array<{
      id: string
      rating_score: number
      arithmetic_mean: number
      category_count: number
    }>
    expect(rows.length).toBeGreaterThan(10)
    for (const row of rows) {
      expect(
        row.category_count,
        `${row.id} must have all six categories`,
      ).toBe(6)
      expect(
        Math.abs(row.rating_score - row.arithmetic_mean),
        `${row.id} rating differs from component formula`,
      ).toBeLessThanOrEqual(0.051)
    }
  })

  it('records the Modi methodology review and published revision', () => {
    const term = db
      .prepare(
        `SELECT rating_score, rating_confidence
         FROM leader_terms WHERE id = 'modi-2014'`,
      )
      .get()
    const audit = db
      .prepare(
        `SELECT run_count, standardized_mean, standard_deviation,
                minimum, maximum, previous_rating, revised_rating, status
         FROM leader_rating_audits
         WHERE term_id = 'modi-2014'`,
      )
      .get()
    expect(term).toEqual({
      rating_score: 6.5,
      rating_confidence: 'medium',
    })
    expect(audit).toEqual({
      run_count: 5,
      standardized_mean: 6.66,
      standard_deviation: 0.05,
      minimum: 6.6,
      maximum: 6.7,
      previous_rating: 6.7,
      revised_rating: 6.7,
      status: 'stable',
    })
  })

  it('publishes semiconductor history and current policy without counting plans as output', () => {
    const policies = db
      .prepare(
        `SELECT id, rating_score, rating_basis, rating_confidence, status
         FROM policies
         WHERE id IN (
           'scl-semiconductor-programme-1976',
           'semiconductor-incentive-policy-2007',
           'semicon-india-programme-2021',
           'semicon-india-2-2026'
         )
         ORDER BY introduced_date`,
      )
      .all()
    expect(policies).toEqual([
      {
        id: 'scl-semiconductor-programme-1976',
        rating_score: 6.1,
        rating_basis: 'retrospective',
        rating_confidence: 'medium',
        status: 'executive-action',
      },
      {
        id: 'semiconductor-incentive-policy-2007',
        rating_score: 5.1,
        rating_basis: 'retrospective',
        rating_confidence: 'medium',
        status: 'infructuous',
      },
      {
        id: 'semicon-india-programme-2021',
        rating_score: 7.5,
        rating_basis: 'retrospective',
        rating_confidence: 'medium',
        status: 'executive-action',
      },
      {
        id: 'semicon-india-2-2026',
        rating_score: 7.2,
        rating_basis: 'design',
        rating_confidence: 'low',
        status: 'executive-action',
      },
    ])

    expect(
      db
        .prepare(
          `SELECT score
           FROM policy_scores
           WHERE policy_id = 'semicon-india-2-2026'
             AND dimension_id = 'effectiveness'`,
        )
        .get(),
    ).toEqual({ score: null })
    expect(
      db
        .prepare(
          `SELECT COUNT(*) AS count
           FROM claims
           WHERE policy_id = 'semicon-india-programme-2021'`,
        )
        .get(),
    ).toEqual({ count: 7 })
    expect(
      db
        .prepare(
          `SELECT question, as_of_date
           FROM curated_answers
           WHERE id = 'india-semiconductor-credit'`,
        )
        .get(),
    ).toEqual({
      question: 'Does Modi deserve more credit for India semiconductor push?',
      as_of_date: '2026-07-29',
    })
  })

  it('publishes formula-derived operational and rights-adjusted security scores', () => {
    const rows = db
      .prepare(
        `SELECT a.term_id,
                ROUND(
                  SUM(s.score * d.operational_weight) /
                  SUM(d.operational_weight),
                  1
                ) AS operational_score,
                ROUND(
                  SUM(s.score * d.adjusted_weight) /
                  SUM(d.adjusted_weight),
                  1
                ) AS adjusted_score,
                COUNT(*) AS component_count
         FROM leader_specialist_assessments a
         JOIN leader_specialist_scores s ON s.assessment_id = a.id
         JOIN leader_specialist_dimensions d ON d.id = s.dimension_id
         WHERE a.topic_id = 'national-security'
         GROUP BY a.term_id
         ORDER BY a.term_id`,
      )
      .all()
    expect(rows).toHaveLength(15)
    expect(rows).toContainEqual({
      term_id: 'manmohan-2004',
      operational_score: 6.1,
      adjusted_score: 6.2,
      component_count: 5,
    })
    expect(rows).toContainEqual({
      term_id: 'modi-2014',
      operational_score: 7,
      adjusted_score: 6.5,
      component_count: 5,
    })

    const missing = db
      .prepare(
        `SELECT t.id
         FROM leader_terms t
         JOIN offices office ON office.id = t.office_id
         LEFT JOIN leader_specialist_assessments a
           ON a.term_id = t.id AND a.topic_id = 'national-security'
         WHERE t.rating_score IS NOT NULL
           AND office.id = 'india-prime-minister'
           AND a.id IS NULL`,
      )
      .all()
    expect(missing).toEqual([])
  })

  it('publishes one infrastructure rubric for comparable modern PM terms', () => {
    const rows = db
      .prepare(
        `SELECT a.term_id,
                ROUND(
                  SUM(s.score * d.operational_weight) /
                  SUM(d.operational_weight),
                  1
                ) AS buildout_score,
                ROUND(
                  SUM(s.score * d.adjusted_weight) /
                  SUM(d.adjusted_weight),
                  1
                ) AS adjusted_score,
                COUNT(*) AS component_count
         FROM leader_specialist_assessments a
         JOIN leader_specialist_scores s ON s.assessment_id = a.id
         JOIN leader_specialist_dimensions d ON d.id = s.dimension_id
         WHERE a.topic_id = 'infrastructure-capacity'
         GROUP BY a.term_id
         ORDER BY buildout_score DESC`,
      )
      .all()

    expect(rows).toEqual([
      {
        term_id: 'modi-2014',
        buildout_score: 8.1,
        adjusted_score: 7.8,
        component_count: 5,
      },
      {
        term_id: 'manmohan-2004',
        buildout_score: 7.5,
        adjusted_score: 7.3,
        component_count: 5,
      },
      {
        term_id: 'vajpayee-1998',
        buildout_score: 7.3,
        adjusted_score: 7.1,
        component_count: 5,
      },
    ])
    expect(
      db
        .prepare(
          `SELECT question, verdict, as_of_date
           FROM curated_answers
           WHERE id = 'modi-infrastructure-development'`,
        )
        .get(),
    ).toMatchObject({
      question: 'Is Modi better at development and infrastructure?',
      as_of_date: '2026-08-04',
    })
  })

  it('reproduces the disclosed BJP and Congress term-rating comparison', () => {
    const summary = db
      .prepare(
        `SELECT pa.short_name AS party,
                COUNT(*) AS terms,
                ROUND(AVG(lt.rating_score), 2) AS simple_average,
                ROUND(
                  SUM(
                    lt.rating_score *
                    (julianday(COALESCE(lt.end_date, '2026-08-05')) -
                     julianday(lt.start_date))
                  ) /
                  SUM(
                    julianday(COALESCE(lt.end_date, '2026-08-05')) -
                    julianday(lt.start_date)
                  ),
                  2
                ) AS day_weighted_average,
                ROUND(
                  SUM(
                    julianday(COALESCE(lt.end_date, '2026-08-05')) -
                    julianday(lt.start_date)
                  ) / 365.2425,
                  1
                ) AS rated_years
         FROM leader_terms lt
         JOIN parties pa ON pa.id = lt.party_id
         JOIN offices office ON office.id = lt.office_id
         JOIN jurisdictions jurisdiction
           ON jurisdiction.id = office.jurisdiction_id
         WHERE lt.rating_score IS NOT NULL
           AND jurisdiction.level = 'country'
           AND pa.short_name IN ('BJP', 'INC')
         GROUP BY pa.short_name
         ORDER BY pa.short_name`,
      )
      .all()
    expect(summary).toEqual([
      {
        party: 'BJP',
        terms: 2,
        simple_average: 6.7,
        day_weighted_average: 6.63,
        rated_years: 18.4,
      },
      {
        party: 'INC',
        terms: 7,
        simple_average: 6.56,
        day_weighted_average: 6.65,
        rated_years: 54.3,
      },
    ])

    const removedAnswers = db
      .prepare(
        `SELECT id
         FROM curated_answers
         WHERE id IN ('modi-doing-good', 'bjp-vs-congress')`,
      )
      .all()
    expect(removedAnswers).toEqual([])

    const sections = db
      .prepare(
        `SELECT section, COUNT(*) AS count
         FROM answer_claims
         WHERE answer_id = 'regime-change-now'
         GROUP BY section
         ORDER BY section`,
      )
      .all()
    expect(sections).toEqual([
      { section: 'achievement', count: 1 },
      { section: 'concern', count: 1 },
      { section: 'context', count: 3 },
    ])
  })

  it('keeps policy estimates aligned with the disclosed five-part formula', () => {
    const rows = db
      .prepare(
        `SELECT p.id, p.rating_score,
                SUM(s.score * d.weight) /
                  SUM(CASE WHEN s.score IS NULL THEN 0 ELSE d.weight END)
                  AS weighted_score
         FROM policies p
         JOIN policy_scores s ON s.policy_id = p.id
         JOIN policy_evaluation_dimensions d ON d.id = s.dimension_id
         GROUP BY p.id`,
      )
      .all() as unknown as Array<{
      id: string
      rating_score: number
      weighted_score: number
    }>
    expect(rows.length).toBeGreaterThanOrEqual(30)
    for (const row of rows) {
      expect(
        Math.abs(row.rating_score - row.weighted_score),
        `${row.id} policy rating differs from component formula`,
      ).toBeLessThanOrEqual(0.051)
    }
  })

  it('gives every rated PM term claims and at least one concrete evidence record', () => {
    const undercovered = db
      .prepare(
        `SELECT lt.id,
                COUNT(DISTINCT c.id) AS claims,
                COUNT(DISTINCT et.event_id) AS events,
                COUNT(DISTINCT p.id) AS policies,
                COUNT(DISTINCT b.id) AS budgets
         FROM leader_terms lt
         LEFT JOIN claims c ON c.leader_term_id = lt.id
         LEFT JOIN event_terms et ON et.term_id = lt.id
         LEFT JOIN policies p ON p.leader_term_id = lt.id
         LEFT JOIN budgets b ON b.leader_term_id = lt.id
         WHERE lt.rating_score IS NOT NULL
         GROUP BY lt.id
         HAVING COUNT(DISTINCT c.id) = 0
            OR (
              COUNT(DISTINCT et.event_id) = 0
              AND COUNT(DISTINCT p.id) = 0
              AND COUNT(DISTINCT b.id) = 0
            )`,
      )
      .all()
    expect(undercovered).toEqual([])
  })

  it('publishes balanced landmark policies for previously thin PM terms', () => {
    const policyIds = [
      'food-corporations-1964',
      'constitution-44th-1978',
      'trai-act-1997',
      'pmgsy-2000',
    ]
    const placeholders = policyIds.map(() => '?').join(', ')
    const incomplete = db
      .prepare(
        `SELECT p.id
         FROM policies p
         LEFT JOIN claims benefit
           ON benefit.policy_id = p.id AND benefit.stance = 'achievement'
         LEFT JOIN claims concern
           ON concern.policy_id = p.id AND concern.stance = 'concern'
         LEFT JOIN policy_sources source ON source.policy_id = p.id
         LEFT JOIN policy_scores score ON score.policy_id = p.id
         WHERE p.id IN (${placeholders})
         GROUP BY p.id
         HAVING COUNT(DISTINCT benefit.id) = 0
            OR COUNT(DISTINCT concern.id) = 0
            OR COUNT(DISTINCT source.source_id) < 2
            OR COUNT(DISTINCT score.dimension_id) != 5`,
      )
      .all(...policyIds)
    expect(incomplete).toEqual([])
  })

  it('fact-checks and rates the 2010 Pakistan flood-relief decision without inflating the PM score', () => {
    const policy = db
      .prepare(
        `SELECT rating_score, rating_confidence, status
         FROM policies
         WHERE id = 'pakistan-flood-relief-2010'`,
      )
      .get()
    const factCheck = db
      .prepare(
        `SELECT stance, confidence, event_id, policy_id, leader_term_id
         FROM claims
         WHERE id = 'pakistan-flood-aid-fact-check'`,
      )
      .get()
    const leader = db
      .prepare(
        `SELECT t.rating_score, s.score, s.rationale
         FROM leader_terms t
         JOIN leader_term_scores s ON s.term_id = t.id
         WHERE t.id = 'manmohan-2004' AND s.dimension_id = 'crisis'`,
      )
      .get() as { rating_score: number; score: number; rationale: string }

    expect(policy).toEqual({
      rating_score: 5.8,
      rating_confidence: 'medium',
      status: 'executive-action',
    })
    expect(factCheck).toEqual({
      stance: 'mixed',
      confidence: 'high',
      event_id: 'pakistan-flood-aid-2010',
      policy_id: 'pakistan-flood-relief-2010',
      leader_term_id: 'manmohan-2004',
    })
    expect(leader.rating_score).toBe(7)
    expect(leader.score).toBe(6.2)
    expect(leader.rationale).toContain('post-26/11 institutions')
  })

  it('publishes sourced budgets with allocations and balanced assessments', () => {
    const summary = db
      .prepare(
        `SELECT COUNT(*) AS count, MIN(fiscal_year) AS first_year,
                MAX(fiscal_year) AS latest_year,
                COUNT(DISTINCT leader_term_id) AS term_count
         FROM budgets`,
      )
      .get() as {
      count: number
      first_year: string
      latest_year: string
      term_count: number
    }
    const incomplete = db
      .prepare(
        `SELECT b.id
         FROM budgets b
         LEFT JOIN budget_sources src ON src.budget_id = b.id
         LEFT JOIN budget_allocations allocation ON allocation.budget_id = b.id
         LEFT JOIN budget_points strength
           ON strength.budget_id = b.id AND strength.point_type = 'strength'
         LEFT JOIN budget_points risk
           ON risk.budget_id = b.id AND risk.point_type = 'risk'
         GROUP BY b.id
         HAVING COUNT(DISTINCT src.source_id) = 0
            OR COUNT(DISTINCT allocation.id) = 0
            OR COUNT(DISTINCT strength.id) = 0
            OR COUNT(DISTINCT risk.id) = 0`,
      )
      .all()
    expect(summary).toMatchObject({
      first_year: '1947-48',
      latest_year: '2026-27',
    })
    expect(summary.count).toBeGreaterThanOrEqual(23)
    expect(summary.term_count).toBeGreaterThanOrEqual(18)
    expect(incomplete).toEqual([])
  })

  it('keeps budget estimates aligned with the disclosed five-part formula', () => {
    const rows = db
      .prepare(
        `SELECT b.id, b.rating_score,
                SUM(s.score * d.weight) AS weighted_score,
                COUNT(s.dimension_id) AS component_count
         FROM budgets b
         JOIN budget_scores s ON s.budget_id = b.id
         JOIN budget_evaluation_dimensions d ON d.id = s.dimension_id
         GROUP BY b.id`,
      )
      .all() as unknown as Array<{
      id: string
      rating_score: number
      weighted_score: number
      component_count: number
    }>
    expect(rows.length).toBeGreaterThanOrEqual(23)
    for (const row of rows) {
      expect(row.component_count).toBe(5)
      expect(
        Math.abs(row.rating_score - row.weighted_score),
        `${row.id} budget rating differs from component formula`,
      ).toBeLessThanOrEqual(0.051)
    }
  })

  it('marks the current budget as a provisional proposal assessment', () => {
    const current = db
      .prepare(
        `SELECT fiscal_year, status, rating_basis, rating_confidence,
                total_expenditure_crore, capital_expenditure_crore,
                fiscal_deficit_pct_gdp
         FROM budgets WHERE id = 'budget-2026-27-capex-consolidation'`,
      )
      .get()
    expect(current).toEqual({
      fiscal_year: '2026-27',
      status: 'current',
      rating_basis: 'proposal',
      rating_confidence: 'low',
      total_expenditure_crore: 5347315,
      capital_expenditure_crore: 1221821,
      fiscal_deficit_pct_gdp: 4.3,
    })
  })

  it('publishes FCRA 2026 as a pending low-confidence design assessment', () => {
    const policy = db
      .prepare(
        `SELECT status, rating_score, rating_confidence
         FROM policies WHERE id = 'fcra-amendment-bill-2026'`,
      )
      .get() as {
      status: string
      rating_score: number
      rating_confidence: string
    }
    expect(policy).toEqual({
      status: 'pending',
      rating_score: 4.6,
      rating_confidence: 'low',
    })
    const effectiveness = db
      .prepare(
        `SELECT score
         FROM policy_scores
         WHERE policy_id = 'fcra-amendment-bill-2026'
           AND dimension_id = 'effectiveness'`,
      )
      .get()
    expect(effectiveness).toEqual({ score: null })
  })

  it('keeps the 2026 FCRA Rules separate from the pending Bill', () => {
    const rules = db
      .prepare(
        `SELECT status, rating_basis, effective_date, rating_score
         FROM policies
         WHERE id = 'fcra-amendment-rules-2026'`,
      )
      .get()
    const spendingClaim = db
      .prepare(
        `SELECT policy_id
         FROM claims
         WHERE id = 'fcra-2026-spending-threshold'`,
      )
      .get()
    expect(rules).toEqual({
      status: 'enacted',
      rating_basis: 'design',
      effective_date: '2026-06-22',
      rating_score: 5,
    })
    expect(spendingClaim).toEqual({
      policy_id: 'fcra-amendment-rules-2026',
    })
  })

  it('publishes the structural tax-reform family with balanced evidence', () => {
    const taxPolicyIds = [
      'income-tax-act-1961',
      'modvat-1986',
      'tax-rationalisation-1991',
      'service-tax-1994',
      'state-vat-2005',
      'gst-2017',
      'corporate-tax-cut-2019',
      'personal-tax-regime-2020',
      'faceless-tax-administration-2020',
      'income-tax-act-2025',
      'gst-rate-reset-2025',
    ]
    const placeholders = taxPolicyIds.map(() => '?').join(', ')
    const policies = db
      .prepare(
        `SELECT id, rating_score
         FROM policies
         WHERE id IN (${placeholders})`,
      )
      .all(...taxPolicyIds) as unknown as Array<{
      id: string
      rating_score: number
    }>
    const incomplete = db
      .prepare(
        `SELECT p.id
         FROM policies p
         LEFT JOIN claims benefit
           ON benefit.policy_id = p.id AND benefit.stance = 'achievement'
         LEFT JOIN claims cost
           ON cost.policy_id = p.id AND cost.stance = 'concern'
         LEFT JOIN policy_scores score ON score.policy_id = p.id
         WHERE p.id IN (${placeholders})
         GROUP BY p.id
         HAVING COUNT(DISTINCT benefit.id) = 0
            OR COUNT(DISTINCT cost.id) = 0
            OR COUNT(DISTINCT score.dimension_id) != 5`,
      )
      .all(...taxPolicyIds)
    expect(policies).toHaveLength(11)
    expect(incomplete).toEqual([])
  })

  it('keeps roads, poverty outcomes, and trade agreements methodologically separate', () => {
    const tradeCount = db
      .prepare(
        `SELECT COUNT(*) AS count
         FROM policies WHERE policy_type = 'trade-agreement'`,
      )
      .get() as { count: number }
    const prematureEffectiveness = db
      .prepare(
        `SELECT p.id
         FROM policies p
         JOIN policy_scores s ON s.policy_id = p.id
         WHERE p.id IN (
           'india-uk-ceta-2025',
           'india-oman-cepa-2025',
           'india-new-zealand-fta-2026',
           'india-eu-fta-2026'
         )
           AND s.dimension_id = 'effectiveness'
           AND s.score IS NOT NULL`,
      )
      .all()
    const contextualIndicators = db
      .prepare(
        `SELECT id, score_role, dimension_weight
         FROM indicator_definitions
         WHERE id IN (
           'national-highway-length',
           'extreme-poverty-3-2021-ppp',
           'lmic-poverty-4-20-2021-ppp'
         )
         ORDER BY id`,
      )
      .all()
    const eventLinks = db
      .prepare(
        `SELECT event_id, indicator_id
         FROM event_indicators
         WHERE event_id IN (
           'national-highway-milestone-2026',
           'world-bank-poverty-update-2026'
         )
         ORDER BY event_id, indicator_id`,
      )
      .all()

    expect(tradeCount.count).toBe(7)
    expect(prematureEffectiveness).toEqual([])
    expect(contextualIndicators).toEqual([
      {
        id: 'extreme-poverty-3-2021-ppp',
        score_role: 'context',
        dimension_weight: 0,
      },
      {
        id: 'lmic-poverty-4-20-2021-ppp',
        score_role: 'context',
        dimension_weight: 0,
      },
      {
        id: 'national-highway-length',
        score_role: 'context',
        dimension_weight: 0,
      },
    ])
    expect(eventLinks).toEqual(
      expect.arrayContaining([
        {
          event_id: 'national-highway-milestone-2026',
          indicator_id: 'national-highway-length',
        },
        {
          event_id: 'world-bank-poverty-update-2026',
          indicator_id: 'extreme-poverty-3-2021-ppp',
        },
        {
          event_id: 'world-bank-poverty-update-2026',
          indicator_id: 'lmic-poverty-4-20-2021-ppp',
        },
      ]),
    )
  })

  it('keeps the Income-tax Act 2025 as a current design-only assessment', () => {
    const policy = db
      .prepare(
        `SELECT status, rating_basis, introduced_date, enacted_date,
                effective_date, rating_confidence
         FROM policies
         WHERE id = 'income-tax-act-2025'`,
      )
      .get()
    const effectiveness = db
      .prepare(
        `SELECT score
         FROM policy_scores
         WHERE policy_id = 'income-tax-act-2025'
           AND dimension_id = 'effectiveness'`,
      )
      .get()
    expect(policy).toEqual({
      status: 'enacted',
      rating_basis: 'design',
      introduced_date: '2025-08-11',
      enacted_date: '2025-08-21',
      effective_date: '2026-04-01',
      rating_confidence: 'low',
    })
    expect(effectiveness).toEqual({ score: null })
  })

  it('keeps the 2025 GST rate reset provisional until outcomes mature', () => {
    const policy = db
      .prepare(
        `SELECT status, rating_basis, effective_date, rating_confidence
         FROM policies
         WHERE id = 'gst-rate-reset-2025'`,
      )
      .get()
    const effectiveness = db
      .prepare(
        `SELECT score
         FROM policy_scores
         WHERE policy_id = 'gst-rate-reset-2025'
           AND dimension_id = 'effectiveness'`,
      )
      .get()
    expect(policy).toEqual({
      status: 'executive-action',
      rating_basis: 'design',
      effective_date: '2025-09-22',
      rating_confidence: 'low',
    })
    expect(effectiveness).toEqual({ score: null })
  })

  it('uses verified tax chronology and independent evidence', () => {
    const chronology = db
      .prepare(
        `SELECT id, introduced_date, enacted_date, effective_date
         FROM policies
         WHERE id IN ('modvat-1986', 'state-vat-2005')
         ORDER BY id`,
      )
      .all()
    const independentLinks = db
      .prepare(
        `SELECT DISTINCT source_id
         FROM claim_sources
         WHERE claim_id IN (
           'gst-small-firm-complexity',
           'corporate-tax-2019-uneven-uptake'
         )
         ORDER BY source_id`,
      )
      .all()
    const retiredSource = db
      .prepare(`SELECT id FROM sources WHERE id = 'dea-tax-history'`)
      .get()

    expect(chronology).toEqual([
      {
        id: 'modvat-1986',
        introduced_date: '1986-02-28',
        enacted_date: '1986-05-13',
        effective_date: '1986-03-01',
      },
      {
        id: 'state-vat-2005',
        introduced_date: '2005-01-17',
        enacted_date: null,
        effective_date: '2005-04-01',
      },
    ])
    expect(independentLinks).toEqual(
      expect.arrayContaining([
        { source_id: 'cag-gst-audit-2024' },
        { source_id: 'nipfp-corporate-tax-2023' },
        { source_id: 'world-bank-gst-implementation' },
      ]),
    )
    expect(retiredSource).toBeUndefined()
  })

  it('publishes the official government-bill register with PM-term mapping', () => {
    const summary = db
      .prepare(
        `SELECT COUNT(*) AS count, MIN(introduced_date) AS first_date,
                MAX(introduced_date) AS latest_date,
                SUM(CASE WHEN review_status = 'reviewed' THEN 1 ELSE 0 END)
                  AS reviewed
         FROM policy_register`,
      )
      .get()
    const incomplete = db
      .prepare(
        `SELECT id
         FROM policy_register
         WHERE leader_term_id IS NULL
            OR source_id != 'sansad-government-bills-api'
            OR introduced_date < '1947-08-15'`,
      )
      .all()
    expect(summary).toEqual({
      count: 4408,
      first_date: '1952-05-16',
      latest_date: '2026-07-24',
      reviewed: 36,
    })
    expect(incomplete).toEqual([])
  })

  it('explains every registered bill without rating unreviewed records', () => {
    const coverage = db
      .prepare(
        `SELECT COUNT(*) AS total,
                SUM(CASE WHEN evidence_basis = 'official-text' THEN 1 ELSE 0 END)
                  AS official_text,
                SUM(CASE WHEN evidence_basis = 'independent-review' THEN 1 ELSE 0 END)
                  AS independent_review,
                SUM(CASE WHEN evidence_basis = 'title-only' THEN 1 ELSE 0 END)
                  AS title_only
         FROM bill_explanations`,
      )
      .get()
    const invalidVerdicts = db
      .prepare(
        `SELECT explanation.bill_id
         FROM bill_explanations explanation
         JOIN policy_register register ON register.id = explanation.bill_id
         WHERE explanation.verdict = 'reviewed-policy'
           AND register.linked_policy_id IS NULL`,
      )
      .all()
    const missingText = db
      .prepare(
        `SELECT bill_id
         FROM bill_explanations
         WHERE TRIM(proposal_summary) = ''
            OR TRIM(potential_benefits) = ''
            OR TRIM(potential_risks) = ''
            OR JSON_ARRAY_LENGTH(affected_groups_json) = 0`,
      )
      .all()

    expect(coverage).toMatchObject({
      total: 4408,
      independent_review: 36,
    })
    expect((coverage as { official_text: number }).official_text).toBeGreaterThan(
      2300,
    )
    expect((coverage as { title_only: number }).title_only).toBeGreaterThan(0)
    expect(invalidVerdicts).toEqual([])
    expect(missingText).toEqual([])
  })

  it('publishes a bill-specific Delimitation review and corrected status', () => {
    const bill = db
      .prepare(
        `SELECT register.status, register.source_status,
                register.linked_policy_id, register.linked_policy_scope,
                explanation.evidence_basis, explanation.specificity,
                policy.rating_score, policy.rating_basis, policy.status AS policy_status
         FROM policy_register register
         JOIN bill_explanations explanation ON explanation.bill_id = register.id
         JOIN policies policy ON policy.id = register.linked_policy_id
         WHERE register.id = 'sansad-bill-2026-04-16-c5048cfc8d852cca'`,
      )
      .get()
    expect(bill).toEqual({
      status: 'Infructuous',
      source_status: 'Pending',
      linked_policy_id: 'delimitation-bill-2026',
      linked_policy_scope: 'bill-specific',
      evidence_basis: 'independent-review',
      specificity: 'explicit',
      rating_score: 5.4,
      rating_basis: 'design',
      policy_status: 'infructuous',
    })
  })

  it('links reviewed parliamentary records without scoring discovered bills', () => {
    const fcraBill = db
      .prepare(
        `SELECT linked_policy_id, review_status
         FROM policy_register
         WHERE title = 'THE FOREIGN CONTRIBUTION (REGULATION) AMENDMENT BILL, 2026'`,
      )
      .get()
    const latest = db
      .prepare(
        `SELECT linked_policy_id, review_status
         FROM policy_register
         ORDER BY introduced_date DESC, title
         LIMIT 1`,
      )
      .get()
    expect(fcraBill).toEqual({
      linked_policy_id: 'fcra-amendment-bill-2026',
      review_status: 'reviewed',
    })
    expect(latest).toEqual({
      linked_policy_id: 'national-honour-amendment-bill-2026',
      review_status: 'reviewed',
    })
  })

  it('keeps the CAA law, timeline event, and policy register connected', () => {
    const bridge = db
      .prepare(
        `SELECT c.event_id, c.policy_id, r.review_status
         FROM claims c
         JOIN policy_register r ON r.linked_policy_id = c.policy_id
         WHERE c.event_id = 'caa-protests-delhi-2019'
           AND c.policy_id = 'citizenship-amendment-act-2019'
         LIMIT 1`,
      )
      .get()
    expect(bridge).toEqual({
      event_id: 'caa-protests-delhi-2019',
      policy_id: 'citizenship-amendment-act-2019',
      review_status: 'reviewed',
    })
  })

  it('records explicit, current knowledge cutoffs', () => {
    const metadata = Object.fromEntries(
      (
        db.prepare(`SELECT key, value FROM metadata`).all() as unknown as Array<{
          key: string
          value: string
        }>
      ).map((row) => [row.key, row.value]),
    )
    expect(metadata.knowledge_cutoff).toBe('2026-08-04')
    expect(metadata.editorial_reviewed_through).toBe('2026-07-26')
    expect(metadata.source_roster_version).toBe('source-roster-v0.15')
    expect(metadata.source_rubric_version).toBe('source-v0.2')
    expect(Number(metadata.latest_world_bank_period)).toBeGreaterThanOrEqual(2024)
    expect(Number(metadata.latest_vdem_period)).toBeGreaterThanOrEqual(2024)
  })

  it('uses valid HTTPS source URLs and bounded reliability ratings', () => {
    const invalid = db
      .prepare(
        `SELECT id, url, reliability
         FROM sources
         WHERE url NOT LIKE 'https://%' OR reliability < 1 OR reliability > 5`,
      )
      .all()
    expect(invalid).toEqual([])
  })

  it('gives every indicator a plain-language meaning and concrete example', () => {
    const incomplete = db
      .prepare(
        `SELECT id FROM indicator_definitions
         WHERE TRIM(plain_language) = '' OR TRIM(example) = ''`,
      )
      .all()
    const count = db
      .prepare(`SELECT COUNT(*) AS count FROM indicator_definitions`)
      .get() as { count: number }
    expect(count.count).toBeGreaterThanOrEqual(88)
    expect(incomplete).toEqual([])
  })

  it('keeps the exchange rate contextual and outside the progress score', () => {
    const exchange = db
      .prepare(
        `SELECT direction, score_role, dimension_weight
         FROM indicator_definitions
         WHERE id = 'official-exchange-rate'`,
      )
      .get()
    const scoredEconomicIndicators = db
      .prepare(
        `SELECT COUNT(*) AS count
         FROM indicator_definitions definition
         WHERE definition.dimension_id = 'economic-opportunity'
           AND definition.score_role = 'scored'
           AND EXISTS (
             SELECT 1
             FROM indicator_observations observation
             WHERE observation.jurisdiction_id = 'india'
               AND observation.indicator_id = definition.id
           )`,
      )
      .get() as { count: number }
    expect(exchange).toEqual({
      direction: 'neutral',
      score_role: 'context',
      dimension_weight: 0,
    })
    expect(scoredEconomicIndicators.count).toBe(2)
  })

  it('records review governance and the ingestion batch that published the corpus', () => {
    const unpublishedClaims = db
      .prepare(
        `SELECT id FROM claims
         WHERE review_status != 'published'
            OR reviewer IS NULL
            OR reviewed_at IS NULL
            OR knowledge_cutoff IS NULL`,
      )
      .all()
    const batches = db
      .prepare(
        `SELECT source_roster_version, review_status
         FROM ingestion_batches`,
      )
      .all() as unknown as Array<{
      source_roster_version: string
      review_status: string
    }>
    expect(unpublishedClaims).toEqual([])
    expect(batches).toContainEqual({
      source_roster_version: 'source-roster-v0.15',
      review_status: 'published',
    })
    expect(
      db
        .prepare(
          `SELECT review_status
           FROM ingestion_batches
           WHERE id = 'india-structural-tax-reforms-review-2026-07-23'`,
        )
        .get(),
    ).toEqual({ review_status: 'published' })
    expect(
      db
        .prepare(
          `SELECT candidates_found, review_status
           FROM ingestion_batches
           WHERE id = 'undercovered-prime-minister-terms-2026-07-23'`,
        )
        .get(),
    ).toEqual({
      candidates_found: 14,
      review_status: 'published',
    })
    expect(
      db
        .prepare(
          `SELECT candidates_found, review_status
           FROM ingestion_batches
           WHERE id = 'bjp-congress-comparison-2026-07-23'`,
        )
        .get(),
    ).toEqual({
      candidates_found: 8,
      review_status: 'published',
    })
    expect(
      db
        .prepare(
          `SELECT candidates_found, review_status
           FROM ingestion_batches
           WHERE id = 'caa-policy-review-2026-07-24'`,
        )
        .get(),
    ).toEqual({
      candidates_found: 11,
      review_status: 'published',
    })
    expect(
      db
        .prepare(
          `SELECT candidates_found, review_status
           FROM ingestion_batches
           WHERE id = 'pakistan-flood-aid-claim-review-2026-07-24'`,
        )
        .get(),
    ).toEqual({
      candidates_found: 5,
      review_status: 'published',
    })
    for (const [id, candidates] of [
      ['modi-roads-review-2026-07-24', 5],
      ['modi-poverty-review-2026-07-24', 5],
      ['modi-trade-agreements-review-2026-07-24', 8],
    ] as const) {
      expect(
        db
          .prepare(
            `SELECT candidates_found, review_status
             FROM ingestion_batches WHERE id = ?`,
          )
          .get(id),
      ).toEqual({
        candidates_found: candidates,
        review_status: 'published',
      })
    }
    expect(
      db
        .prepare(
          `SELECT candidates_found, rejected_records, review_status
           FROM ingestion_batches
           WHERE id = 'full-refresh-2026-07-26'`,
        )
        .get(),
    ).toEqual({
      candidates_found: 29,
      rejected_records: 6,
      review_status: 'published',
    })
    expect(
      db
        .prepare(
          `SELECT candidates_found, rejected_records, review_status
           FROM ingestion_batches
           WHERE id = 'india-semiconductor-history-and-rating-2026-07-29'`,
        )
        .get(),
    ).toEqual({
      candidates_found: 24,
      rejected_records: 3,
      review_status: 'published',
    })
    expect(
      db
        .prepare(
          `SELECT candidates_found, rejected_records, review_status
           FROM ingestion_batches
           WHERE id = 'modi-infrastructure-buildout-2026-08-04'`,
        )
        .get(),
    ).toEqual({
      candidates_found: 26,
      rejected_records: 2,
      review_status: 'published',
    })
  })
})

describe('state and Chief Minister extensibility', () => {
  it('publishes only post-bifurcation Andhra Pradesh records', () => {
    const jurisdiction = db
      .prepare(
        `SELECT level, parent_id, iso_code, valid_from, status
         FROM jurisdictions
         WHERE id = 'andhra-pradesh'`,
      )
      .get()
    expect(jurisdiction).toEqual({
      level: 'state',
      parent_id: 'india',
      iso_code: 'IN-AP',
      valid_from: '2014-06-02',
      status: 'published',
    })

    const terms = db
      .prepare(
        `SELECT t.id, t.start_date, t.end_date, t.rating_score,
                person.name, office.short_name
         FROM leader_terms t
         JOIN offices office ON office.id = t.office_id
         JOIN people person ON person.id = t.person_id
         WHERE office.jurisdiction_id = 'andhra-pradesh'
         ORDER BY t.start_date`,
      )
      .all()
    expect(terms).toEqual([
      {
        id: 'ap-naidu-2014',
        start_date: '2014-06-08',
        end_date: '2019-05-29',
        rating_score: 6.8,
        name: 'N. Chandrababu Naidu',
        short_name: 'Chief Minister',
      },
      {
        id: 'ap-jagan-2019',
        start_date: '2019-05-30',
        end_date: '2024-06-11',
        rating_score: 6.1,
        name: 'Y. S. Jagan Mohan Reddy',
        short_name: 'Chief Minister',
      },
      {
        id: 'ap-naidu-2024',
        start_date: '2024-06-12',
        end_date: null,
        rating_score: 6.5,
        name: 'N. Chandrababu Naidu',
        short_name: 'Chief Minister',
      },
    ])

    const preSplit = db
      .prepare(
        `SELECT indicator_id, period
         FROM indicator_observations
         WHERE jurisdiction_id = 'andhra-pradesh' AND period < 2014`,
      )
      .all()
    expect(preSplit).toEqual([])

    const counts = db
      .prepare(
        `SELECT
           (SELECT COUNT(*) FROM events
            WHERE jurisdiction_id = 'andhra-pradesh') AS events,
           (SELECT COUNT(*) FROM policies
            WHERE jurisdiction_id = 'andhra-pradesh') AS policies,
           (SELECT COUNT(*) FROM budgets
            WHERE jurisdiction_id = 'andhra-pradesh') AS budgets,
           (SELECT COUNT(*) FROM indicator_observations
            WHERE jurisdiction_id = 'andhra-pradesh') AS observations,
           (SELECT COUNT(*) FROM curated_answers
            WHERE jurisdiction_id = 'andhra-pradesh') AS answers`,
      )
      .get()
    expect(counts).toEqual({
      events: 10,
      policies: 8,
      budgets: 3,
      observations: 88,
      answers: 3,
    })

    const roadPolicy = db
      .prepare(
        `SELECT rating_score, rating_confidence
         FROM policies WHERE id = 'ap-rural-road-connectivity-2016'`,
      )
      .get()
    expect(roadPolicy).toEqual({
      rating_score: 7.3,
      rating_confidence: 'medium',
    })

    const externalValidation = db
      .prepare(
        `SELECT COUNT(*) AS count
         FROM events
         WHERE id = 'ap-panchayat-awards-2025'
           AND jurisdiction_id = 'andhra-pradesh'`,
      )
      .get()
    expect(externalValidation).toEqual({ count: 1 })

    const stateRoleLabels = db
      .prepare(
        `SELECT union_role, state_local_role
         FROM event_assessments
         WHERE event_id = 'ap-current-road-delivery-2026'`,
      )
      .get()
    expect(stateRoleLabels).toMatchObject({
      union_role: expect.stringContaining('Andhra Pradesh government'),
      state_local_role: expect.stringContaining('Union'),
    })

    const publicSafetyAssessments = db
      .prepare(
        `SELECT a.term_id,
                ROUND(
                  SUM(s.score * d.operational_weight) /
                  SUM(d.operational_weight),
                  1
                ) AS outcome_score,
                ROUND(
                  SUM(s.score * d.adjusted_weight) /
                  SUM(d.adjusted_weight),
                  1
                ) AS adjusted_score
         FROM leader_specialist_assessments a
         JOIN leader_specialist_scores s ON s.assessment_id = a.id
         JOIN leader_specialist_dimensions d ON d.id = s.dimension_id
         WHERE a.topic_id = 'public-safety'
         GROUP BY a.term_id
         ORDER BY a.term_id`,
      )
      .all()
    expect(publicSafetyAssessments).toEqual(
      expect.arrayContaining([
        { term_id: 'ap-jagan-2019', outcome_score: 5.7, adjusted_score: 5.8 },
        { term_id: 'ap-naidu-2014', outcome_score: 5.9, adjusted_score: 6.1 },
        { term_id: 'modi-2014', outcome_score: 5.9, adjusted_score: 5.9 },
        { term_id: 'tn-stalin-2021', outcome_score: 5.8, adjusted_score: 5.9 },
      ]),
    )

    const currentSafetyAssessment = db
      .prepare(
        `SELECT id FROM leader_specialist_assessments
         WHERE term_id = 'ap-naidu-2024' AND topic_id = 'public-safety'`,
      )
      .get()
    expect(currentSafetyAssessment).toBeUndefined()
  })

  it('publishes modern Tamil Nadu with complete CM chronology and an unscored current government', () => {
    const jurisdiction = db
      .prepare(
        `SELECT level, parent_id, iso_code, valid_from, status
         FROM jurisdictions
         WHERE id = 'tamil-nadu'`,
      )
      .get()
    expect(jurisdiction).toEqual({
      level: 'state',
      parent_id: 'india',
      iso_code: 'IN-TN',
      valid_from: '1969-01-14',
      status: 'published',
    })

    const metadata = Object.fromEntries(
      (
        db
          .prepare(
            `SELECT key, value
             FROM jurisdiction_metadata
             WHERE jurisdiction_id = 'tamil-nadu'`,
          )
          .all() as unknown as Array<{ key: string; value: string }>
      ).map((row) => [row.key, row.value]),
    )
    expect(metadata).toMatchObject({
      knowledge_cutoff: '2026-07-26',
      political_status_checked: '2026-07-26',
      timeline_starts: '1969-01-14',
    })

    const termSummary = db
      .prepare(
        `SELECT COUNT(*) AS terms,
                SUM(rating_score IS NOT NULL) AS rated
         FROM leader_terms
         WHERE office_id = 'tamil-nadu-chief-minister'`,
      )
      .get()
    expect(termSummary).toEqual({ terms: 24, rated: 9 })

    const current = db
      .prepare(
        `SELECT t.id, t.start_date, t.end_date, t.rating_score,
                t.rating_summary, person.name, party.short_name AS party
         FROM leader_terms t
         JOIN people person ON person.id = t.person_id
         JOIN parties party ON party.id = t.party_id
         WHERE t.office_id = 'tamil-nadu-chief-minister'
           AND t.end_date IS NULL`,
      )
      .get()
    expect(current).toMatchObject({
      id: 'tn-vijay-2026',
      start_date: '2026-05-10',
      end_date: null,
      rating_score: null,
      name: 'C. Joseph Vijay',
      party: 'TVK',
      rating_summary: expect.stringContaining('Not rated'),
    })

    const counts = db
      .prepare(
        `SELECT
           (SELECT COUNT(*) FROM events
            WHERE jurisdiction_id = 'tamil-nadu') AS events,
           (SELECT COUNT(*) FROM policies
            WHERE jurisdiction_id = 'tamil-nadu') AS policies,
           (SELECT COUNT(*) FROM budgets
            WHERE jurisdiction_id = 'tamil-nadu') AS budgets,
           (SELECT COUNT(*) FROM indicator_observations
            WHERE jurisdiction_id = 'tamil-nadu') AS observations,
           (SELECT COUNT(*) FROM curated_answers
            WHERE jurisdiction_id = 'tamil-nadu') AS answers`,
      )
      .get()
    expect(counts).toEqual({
      events: 14,
      policies: 15,
      budgets: 3,
      observations: 73,
      answers: 3,
    })

    const missingAccountability = db
      .prepare(
        `SELECT event.id
         FROM events event
         LEFT JOIN event_assessments assessment
           ON assessment.event_id = event.id
         LEFT JOIN event_responsibilities responsibility
           ON responsibility.event_id = event.id
         WHERE event.jurisdiction_id = 'tamil-nadu'
         GROUP BY event.id
         HAVING assessment.event_id IS NULL OR COUNT(responsibility.id) = 0`,
      )
      .all()
    expect(missingAccountability).toEqual([])

    const safety = db
      .prepare(
        `SELECT a.term_id,
                ROUND(
                  SUM(s.score * d.operational_weight) /
                  SUM(d.operational_weight),
                  1
                ) AS outcome_score,
                ROUND(
                  SUM(s.score * d.adjusted_weight) /
                  SUM(d.adjusted_weight),
                  1
                ) AS adjusted_score
         FROM leader_specialist_assessments a
         JOIN leader_specialist_scores s ON s.assessment_id = a.id
         JOIN leader_specialist_dimensions d ON d.id = s.dimension_id
         WHERE a.term_id = 'tn-stalin-2021'
           AND a.topic_id = 'public-safety'
         GROUP BY a.term_id`,
      )
      .get()
    expect(safety).toEqual({
      term_id: 'tn-stalin-2021',
      outcome_score: 5.8,
      adjusted_score: 5.9,
    })

    const currentBudget = db
      .prepare(
        `SELECT id FROM budgets
         WHERE jurisdiction_id = 'tamil-nadu'
           AND leader_term_id = 'tn-vijay-2026'`,
      )
      .get()
    expect(currentBudget).toBeUndefined()

    expect(
      db
        .prepare(
          `SELECT candidates_found, review_status
           FROM ingestion_batches
           WHERE id = 'tamil-nadu-modern-state-2026-07-24'`,
        )
        .get(),
    ).toEqual({
      candidates_found: 18,
      review_status: 'published',
    })
  })

  it('publishes post-formation Telangana with isolated CM, policy, budget, and indicator records', () => {
    expect(
      db
        .prepare(
          `SELECT level, parent_id, iso_code, valid_from, status
           FROM jurisdictions
           WHERE id = 'telangana'`,
        )
        .get(),
    ).toEqual({
      level: 'state',
      parent_id: 'india',
      iso_code: 'IN-TG',
      valid_from: '2014-06-02',
      status: 'published',
    })

    const metadata = Object.fromEntries(
      (
        db
          .prepare(
            `SELECT key, value
             FROM jurisdiction_metadata
             WHERE jurisdiction_id = 'telangana'`,
          )
          .all() as unknown as Array<{ key: string; value: string }>
      ).map((row) => [row.key, row.value]),
    )
    expect(metadata).toMatchObject({
      knowledge_cutoff: '2026-08-04',
      editorial_reviewed_through: '2026-08-04',
      political_status_checked: '2026-08-04',
      indicator_as_of_date: '2026-08-04',
      timeline_starts: '2014-06-02',
    })

    expect(
      db
        .prepare(
          `SELECT t.id, t.start_date, t.end_date, t.rating_score,
                  t.rating_confidence, person.name, party.short_name AS party
           FROM leader_terms t
           JOIN people person ON person.id = t.person_id
           JOIN parties party ON party.id = t.party_id
           WHERE t.office_id = 'telangana-chief-minister'
           ORDER BY t.start_date`,
        )
        .all(),
    ).toEqual([
      {
        id: 'ts-kcr-2014',
        start_date: '2014-06-02',
        end_date: '2018-12-12',
        rating_score: 6.1,
        rating_confidence: 'medium',
        name: 'K. Chandrashekar Rao',
        party: 'TRS/BRS',
      },
      {
        id: 'ts-kcr-2018',
        start_date: '2018-12-13',
        end_date: '2023-12-06',
        rating_score: 6.1,
        rating_confidence: 'medium',
        name: 'K. Chandrashekar Rao',
        party: 'TRS/BRS',
      },
      {
        id: 'ts-revanth-2023',
        start_date: '2023-12-07',
        end_date: null,
        rating_score: 6.3,
        rating_confidence: 'low',
        name: 'A. Revanth Reddy',
        party: 'INC',
      },
    ])

    expect(
      db
        .prepare(
          `SELECT
             (SELECT COUNT(*) FROM events
              WHERE jurisdiction_id = 'telangana') AS events,
             (SELECT COUNT(*) FROM policies
              WHERE jurisdiction_id = 'telangana') AS policies,
             (SELECT COUNT(*) FROM budgets
              WHERE jurisdiction_id = 'telangana') AS budgets,
             (SELECT COUNT(*) FROM indicator_observations
              WHERE jurisdiction_id = 'telangana') AS observations,
             (SELECT COUNT(*) FROM curated_answers
              WHERE jurisdiction_id = 'telangana') AS answers`,
        )
        .get(),
    ).toEqual({
      events: 9,
      policies: 6,
      budgets: 4,
      observations: 35,
      answers: 3,
    })

    expect(
      db
        .prepare(
          `SELECT indicator_id, period
           FROM indicator_observations
           WHERE jurisdiction_id = 'telangana' AND period < 2014`,
        )
        .all(),
    ).toEqual([])

    expect(
      db
        .prepare(
          `SELECT event.id
           FROM events event
           LEFT JOIN event_assessments assessment
             ON assessment.event_id = event.id
           LEFT JOIN event_responsibilities responsibility
             ON responsibility.event_id = event.id
           WHERE event.jurisdiction_id = 'telangana'
           GROUP BY event.id
           HAVING assessment.event_id IS NULL OR COUNT(responsibility.id) = 0`,
        )
        .all(),
    ).toEqual([])

    expect(
      db
        .prepare(
          `SELECT period, value
           FROM indicator_observations
           WHERE jurisdiction_id = 'telangana'
             AND indicator_id = 'ts-crime-cyber-registered-count'
           ORDER BY period`,
        )
        .all(),
    ).toEqual([
      { period: 2020, value: 5024 },
      { period: 2021, value: 10303 },
      { period: 2022, value: 15297 },
      { period: 2023, value: 18236 },
      { period: 2024, value: 27230 },
    ])

    expect(
      db
        .prepare(
          `SELECT rating_score, rating_confidence
           FROM policies
           WHERE id = 'ts-kaleshwaram-policy'`,
        )
        .get(),
    ).toEqual({
      rating_score: 3.7,
      rating_confidence: 'high',
    })

    expect(
      db
        .prepare(
          `SELECT status, rating_basis, rating_score, rating_confidence
           FROM budgets
           WHERE id = 'budget-ts-2026-27'`,
        )
        .get(),
    ).toEqual({
      status: 'current',
      rating_basis: 'proposal',
      rating_score: 5.9,
      rating_confidence: 'low',
    })

    expect(
      db
        .prepare(
          `SELECT id
           FROM leader_specialist_assessments
           WHERE term_id = 'ts-revanth-2023'`,
        )
        .get(),
    ).toBeUndefined()

    expect(
      db
        .prepare(
          `SELECT candidates_found, rejected_records, review_status
           FROM ingestion_batches
           WHERE id = 'telangana-post-formation-2026-08-04'`,
        )
        .get(),
    ).toEqual({
      candidates_found: 24,
      rejected_records: 0,
      review_status: 'published',
    })
  })

  it('accepts a state jurisdiction and head-of-government office without schema changes', () => {
    const stateDb = new DatabaseSync(':memory:')
    applySchema(stateDb)
    stateDb
      .prepare(
        `INSERT INTO jurisdictions
          (id, name, short_name, level, parent_id, iso_code, valid_from, status)
         VALUES
          ('india', 'Republic of India', 'India', 'country', NULL, 'IND', '1947-08-15', 'published'),
          ('karnataka', 'State of Karnataka', 'Karnataka', 'state', 'india', 'IN-KA', '1956-11-01', 'researching')`,
      )
      .run()
    stateDb
      .prepare(
        `INSERT INTO offices (id, jurisdiction_id, name, short_name, role)
         VALUES ('karnataka-chief-minister', 'karnataka', 'Chief Minister of Karnataka', 'Chief Minister', 'head-of-government')`,
      )
      .run()
    stateDb
      .prepare(
        `INSERT INTO people (id, name, sort_name)
         VALUES ('example-cm', 'Example Chief Minister', 'Chief Minister, Example')`,
      )
      .run()
    stateDb
      .prepare(
        `INSERT INTO leader_terms
          (id, office_id, person_id, start_date, rating_summary, assessment_as_of)
         VALUES
          ('example-cm-term', 'karnataka-chief-minister', 'example-cm', '2025-01-01',
           'Fixture proving the jurisdiction-neutral model.', '2026-07-23')`,
      )
      .run()
    const row = stateDb
      .prepare(
        `SELECT j.level, o.short_name
         FROM leader_terms t
         JOIN offices o ON o.id = t.office_id
         JOIN jurisdictions j ON j.id = o.jurisdiction_id
         WHERE t.id = 'example-cm-term'`,
      )
      .get() as { level: string; short_name: string }
    expect(row).toEqual({ level: 'state', short_name: 'Chief Minister' })
    stateDb.close()
  })
})
