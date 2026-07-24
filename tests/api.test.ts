import { DatabaseSync } from 'node:sqlite'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createApp } from '../server/app.ts'
import { ensureDatabase } from '../server/seed.ts'

let db: DatabaseSync
let app: ReturnType<typeof createApp>

beforeAll(() => {
  db = new DatabaseSync(ensureDatabase(), { readOnly: true })
  app = createApp(db)
})

afterAll(() => {
  db.close()
})

describe('read API', () => {
  it('returns an overview with source cutoffs and a current PM', async () => {
    const response = await request(app).get('/api/overview')
    expect(response.status).toBe(200)
    expect(response.body.knowledge.cutoff).toBe('2026-07-23')
    expect(response.body.knowledge.billRegisterAsOfDate).toBe('2026-07-24')
    expect(response.body.currentTerm.person.name).toBe('Narendra Modi')
    expect(response.body.progress.overall.score).toBeGreaterThan(0)
    expect(response.body.progress.overall.score).toBeLessThan(100)
  })

  it('answers the example Modi question with both achievements and concerns', async () => {
    const response = await request(app).get('/api/search').query({
      jurisdiction: 'india',
      q: 'is modi doing good',
    })
    expect(response.status).toBe(200)
    expect(response.body.answer.id).toBe('modi-doing-good')
    const sections = new Set(
      response.body.answer.claims.map((claim: { section: string }) => claim.section),
    )
    expect(sections.has('achievement')).toBe(true)
    expect(sections.has('concern')).toBe(true)
    expect(sections.has('context')).toBe(true)
    expect(response.body.answer.verdict).toContain('6.3/10')
    expect(
      response.body.answer.claims.some(
        (claim: { id: string }) => claim.id === 'modi-electoral-bonds',
      ),
    ).toBe(true)
  })

  it('answers whether BJP is better than Congress with balanced party math', async () => {
    const response = await request(app).get('/api/search').query({
      jurisdiction: 'india',
      q: 'is BJP better than Congress',
    })
    expect(response.status).toBe(200)
    expect(response.body.answer).toMatchObject({
      id: 'bjp-vs-congress',
      confidence: 'medium',
    })
    expect(response.body.answer.shortAnswer).toContain(
      'no defensible categorical winner',
    )
    expect(response.body.answer.verdict).toContain('no decisive winner')
    const sections = new Set(
      response.body.answer.claims.map((claim: { section: string }) => claim.section),
    )
    expect(sections).toEqual(
      new Set(['achievement', 'concern', 'context']),
    )
    expect(
      response.body.answer.claims.some(
        (claim: { id: string }) =>
          claim.id === 'party-comparison-rating-math',
      ),
    ).toBe(true)
  })

  it('answers natural rupee-dollar questions and links the contextual indicator', async () => {
    const response = await request(app).get('/api/search').query({
      jurisdiction: 'india',
      q: 'rupee dollar',
    })
    expect(response.status).toBe(200)
    expect(response.body.answer).toMatchObject({
      id: 'rupee-dollar-real-gdp',
      confidence: 'high',
    })
    expect(response.body.results[0]).toMatchObject({
      type: 'indicator',
      id: 'official-exchange-rate',
      title: 'Official exchange rate: rupees per US dollar',
    })
  })

  it('returns the Modi replication audit with the revised component score', async () => {
    const response = await request(app).get('/api/leaders/modi-2014')
    expect(response.status).toBe(200)
    expect(response.body.ratingScore).toBe(6.3)
    expect(response.body.ratingAudit).toMatchObject({
      runCount: 5,
      standardizedMean: 6.22,
      standardDeviation: 0.07,
      minimum: 6.1,
      maximum: 6.3,
      previousRating: 6.2,
      revisedRating: 6.3,
      status: 'stable',
    })
    expect(response.body.sources.length).toBeGreaterThanOrEqual(12)
  })

  it('finds protests and major failures through cross-entity search', async () => {
    const [protest, riot] = await Promise.all([
      request(app).get('/api/search').query({ q: 'railway strike' }),
      request(app).get('/api/search').query({ q: 'anti-sikh' }),
    ])
    expect(protest.body.results.some((row: { type: string }) => row.type === 'event')).toBe(
      true,
    )
    expect(riot.body.results.some((row: { type: string }) => row.type === 'event')).toBe(
      true,
    )
  })

  it('returns a sourced accountability brief for every timeline event', async () => {
    const response = await request(app).get('/api/events')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(67)
    expect(response.body[0].id).toBe('sikkim-tunnel-disaster-2026')
    expect(
      response.body.every(
        (event: {
          accountability: {
            unionRole: string
            stateLocalRole: string
            positiveOutcomes: string
            responsibilities: unknown[]
          } | null
        }) =>
          event.accountability &&
          event.accountability.unionRole &&
          event.accountability.stateLocalRole &&
          event.accountability.positiveOutcomes &&
          event.accountability.responsibilities.length > 0,
      ),
    ).toBe(true)

    const manipur = response.body.find(
      (event: { id: string }) => event.id === 'manipur-violence-2023',
    )
    expect(manipur.accountability.choiceAssessment).toBe('wrong')
    expect(manipur.accountability.unionRole).toContain('Modi government')
    expect(manipur.accountability.stateLocalRole).toContain('Manipur government')
  })

  it('publishes complete agent-facing methodology and export endpoints', async () => {
    const [methodology, exportResponse, openapi] = await Promise.all([
      request(app).get('/api/methodology'),
      request(app).get('/api/export'),
      request(app).get('/api/openapi.json'),
    ])
    expect(methodology.status).toBe(200)
    expect(methodology.body.biasControls.length).toBeGreaterThanOrEqual(4)
    expect(methodology.body.corroborationRules.communalViolence).toContain(
      'independent national reporting',
    )
    expect(methodology.body.budgetEvaluation.dimensions).toHaveLength(5)
    expect(exportResponse.status).toBe(200)
    expect(exportResponse.body.events.length).toBeGreaterThanOrEqual(44)
    expect(exportResponse.body.policies.length).toBeGreaterThanOrEqual(30)
    expect(exportResponse.body.budgets).toHaveLength(17)
    expect(exportResponse.body.bills).toHaveLength(4407)
    expect(exportResponse.body.sources.length).toBeGreaterThan(20)
    expect(openapi.body.openapi).toBe('3.1.0')
  })

  it('returns historical and current budgets with allocations and ratings', async () => {
    const response = await request(app).get('/api/budgets')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(17)

    const current = response.body.find(
      (budget: { id: string }) =>
        budget.id === 'budget-2026-27-capex-consolidation',
    )
    expect(current.status).toBe('current')
    expect(current.ratingBasis).toBe('proposal')
    expect(current.ratingConfidence).toBe('low')
    expect(current.allocations.length).toBeGreaterThanOrEqual(7)
    expect(
      current.points.some(
        (point: { pointType: string }) => point.pointType === 'risk',
      ),
    ).toBe(true)

    const reform = response.body.find(
      (budget: { id: string }) => budget.id === 'budget-1991-92-reform',
    )
    expect(reform.leader.name).toBe('P. V. Narasimha Rao')
    expect(reform.financeMinister).toBe('Manmohan Singh')
    expect(reform.componentScores).toHaveLength(5)
  })

  it('surfaces landmark evidence for previously thin PM terms', async () => {
    const [foodPolicy, roadsPolicy, search, events] = await Promise.all([
      request(app).get('/api/policies/food-corporations-1964'),
      request(app).get('/api/policies/pmgsy-2000'),
      request(app).get('/api/search').query({ q: '44th Amendment' }),
      request(app).get('/api/events'),
    ])
    expect(foodPolicy.status).toBe(200)
    expect(foodPolicy.body.leader.name).toBe('Lal Bahadur Shastri')
    const foodStances = new Set(
      foodPolicy.body.claims.map((claim: { stance: string }) => claim.stance),
    )
    expect(foodStances.has('achievement')).toBe(true)
    expect(foodStances.has('concern')).toBe(true)

    expect(roadsPolicy.status).toBe(200)
    expect(roadsPolicy.body.leader.name).toBe('Atal Bihari Vajpayee')
    expect(
      search.body.results.some(
        (result: { id: string }) => result.id === 'constitution-44th-1978',
      ),
    ).toBe(true)
    expect(
      events.body.some(
        (event: { id: string }) =>
          event.id === 'charan-singh-government-collapse-1979',
      ),
    ).toBe(true)
    expect(
      events.body.some(
        (event: { id: string }) =>
          event.id === 'gujral-doctrine-premiership-1997',
      ),
    ).toBe(true)
    expect(
      events.body.some(
        (event: { id: string }) => event.id === 'gold-mobilisation-1991',
      ),
    ).toBe(true)
  })

  it('surfaces Modi-era roads, poverty data, and trade agreements explicitly', async () => {
    const [roads, policies, events, poverty] = await Promise.all([
      request(app).get('/api/policies/national-highway-expansion-2014'),
      request(app).get('/api/policies'),
      request(app).get('/api/events'),
      request(app).get(
        '/api/indicators/extreme-poverty-3-2021-ppp/series',
      ),
    ])

    expect(roads.status).toBe(200)
    expect(roads.body).toMatchObject({
      ratingScore: 6.9,
      leader: { name: 'Narendra Modi' },
    })
    expect(
      policies.body.filter(
        (policy: { policyType: string }) =>
          policy.policyType === 'trade-agreement',
      ),
    ).toHaveLength(7)

    const povertyEvent = events.body.find(
      (event: { id: string }) =>
        event.id === 'world-bank-poverty-update-2026',
    )
    expect(povertyEvent.relatedIndicators.map(
      (indicator: { id: string }) => indicator.id,
    )).toEqual(
      expect.arrayContaining([
        'extreme-poverty-3-2021-ppp',
        'lmic-poverty-4-20-2021-ppp',
      ]),
    )
    expect(poverty.body.termChanges[0]).toMatchObject({
      termId: 'modi-2014',
      directionAssessment: 'improved',
      endpoint: { period: 2023, value: 2.6 },
    })
  })

  it('fact-checks the US$25 million Pakistan aid claim with full context', async () => {
    const [policy, search, events, leader] = await Promise.all([
      request(app).get('/api/policies/pakistan-flood-relief-2010'),
      request(app).get('/api/search').query({
        q: 'Congress gave Pakistan 25 million after 26/11',
      }),
      request(app).get('/api/events'),
      request(app).get('/api/leaders/manmohan-2004'),
    ])

    expect(policy.status).toBe(200)
    expect(policy.body).toMatchObject({
      ratingScore: 7.2,
      status: 'executive-action',
      leader: { name: 'Manmohan Singh' },
    })
    expect(
      policy.body.claims.some(
        (claim: { id: string; stance: string }) =>
          claim.id === 'pakistan-flood-aid-fact-check' &&
          claim.stance === 'mixed',
      ),
    ).toBe(true)
    expect(
      search.body.results.some(
        (result: { id: string }) =>
          result.id === 'pakistan-flood-aid-fact-check',
      ),
    ).toBe(true)

    const event = events.body.find(
      (candidate: { id: string }) =>
        candidate.id === 'pakistan-flood-aid-2010',
    )
    expect(event.relatedPolicies).toContainEqual(
      expect.objectContaining({
        id: 'pakistan-flood-relief-2010',
      }),
    )

    expect(leader.body.ratingScore).toBe(7.3)
    expect(
      leader.body.componentScores.find(
        (component: { id: string }) => component.id === 'crisis',
      ).rationale,
    ).toContain('UN-routed Pakistan flood relief')
  })

  it('searches budgets by familiar names and fiscal years', async () => {
    const response = await request(app).get('/api/search').query({
      q: 'Dream Budget 1997',
    })
    expect(response.status).toBe(200)
    expect(response.body.results[0]).toMatchObject({
      type: 'budget',
      id: 'budget-1997-98-dream',
    })
  })

  it('returns a paginated official bill register with facets', async () => {
    const response = await request(app).get('/api/bills').query({
      page: 1,
      pageSize: 5,
    })
    expect(response.status).toBe(200)
    expect(response.body.total).toBe(4407)
    expect(response.body.records).toHaveLength(5)
    expect(response.body.records[0]).toMatchObject({
      introducedDate: '2026-07-20',
      leader: { name: 'Narendra Modi' },
      reviewStatus: 'discovered',
    })
    expect(response.body.facets.statuses.length).toBeGreaterThan(5)
    expect(response.body.facets.leaders.length).toBeGreaterThan(10)
    expect(response.body.source.id).toBe('sansad-government-bills-api')
  })

  it('finds the official FCRA Bill record and links its reviewed assessment', async () => {
    const response = await request(app).get('/api/bills').query({
      q: 'Foreign Contribution Regulation Amendment Bill 2026',
      pageSize: 10,
    })
    expect(response.status).toBe(200)
    const bill = response.body.records.find(
      (record: { linkedPolicyId: string | null }) =>
        record.linkedPolicyId === 'fcra-amendment-bill-2026',
    )
    expect(bill).toMatchObject({
      status: 'Pending',
      reviewStatus: 'reviewed',
      leader: { name: 'Narendra Modi' },
    })
  })

  it('links the CAA timeline, official bill, and reviewed policy assessment', async () => {
    const [policy, bills, events] = await Promise.all([
      request(app).get('/api/policies/citizenship-amendment-act-2019'),
      request(app).get('/api/bills').query({
        q: 'Citizenship Amendment Bill 2019',
        pageSize: 10,
      }),
      request(app).get('/api/events'),
    ])

    expect(policy.status).toBe(200)
    expect(policy.body).toMatchObject({
      status: 'enacted',
      leader: { name: 'Narendra Modi' },
    })
    const stances = new Set(
      policy.body.claims.map((claim: { stance: string }) => claim.stance),
    )
    expect(stances.size).toBeGreaterThanOrEqual(3)
    expect(stances.has('achievement')).toBe(true)
    expect(stances.has('concern')).toBe(true)
    expect(stances.has('context')).toBe(true)

    const bill = bills.body.records.find(
      (record: { linkedPolicyId: string | null }) =>
        record.linkedPolicyId === 'citizenship-amendment-act-2019',
    )
    expect(bill).toMatchObject({
      status: 'Passed',
      reviewStatus: 'reviewed',
      assentDate: '2019-12-12',
    })

    const event = events.body.find(
      (record: { id: string }) =>
        record.id === 'caa-protests-delhi-2019',
    )
    expect(event.relatedPolicies).toContainEqual(
      expect.objectContaining({
        id: 'citizenship-amendment-act-2019',
      }),
    )
  })

  it('includes government bills in cross-entity search', async () => {
    const response = await request(app).get('/api/search').query({
      q: 'Supreme Court number of judges 2026',
    })
    expect(response.status).toBe(200)
    expect(response.body.results[0]).toMatchObject({
      type: 'bill',
      title: 'THE SUPREME COURT (NUMBER OF JUDGES) AMENDMENT BILL, 2026',
    })
  })

  it('returns the researched 2026 FCRA bill with balanced evidence', async () => {
    const response = await request(app).get(
      '/api/policies/fcra-amendment-bill-2026',
    )
    expect(response.status).toBe(200)
    expect(response.body.status).toBe('pending')
    expect(response.body.ratingScore).toBe(4.6)
    expect(response.body.ratingBasis).toBe('design')
    expect(
      response.body.componentScores.find(
        (component: { id: string }) => component.id === 'effectiveness',
      ).score,
    ).toBeNull()
    const stances = new Set(
      response.body.claims.map((claim: { stance: string }) => claim.stance),
    )
    expect(stances.has('achievement')).toBe(true)
    expect(stances.has('concern')).toBe(true)
  })

  it('publishes the in-force 2026 FCRA Rules separately from the pending Bill', async () => {
    const response = await request(app).get(
      '/api/policies/fcra-amendment-rules-2026',
    )
    expect(response.status).toBe(200)
    expect(response.body.status).toBe('enacted')
    expect(response.body.ratingBasis).toBe('design')
    expect(response.body.ratingScore).toBe(5)
    expect(
      response.body.claims.some(
        (claim: { id: string }) => claim.id === 'fcra-2026-spending-threshold',
      ),
    ).toBe(true)
  })

  it('returns the current Income-tax Act with design-only evidence limits', async () => {
    const response = await request(app).get('/api/policies/income-tax-act-2025')
    expect(response.status).toBe(200)
    expect(response.body.status).toBe('enacted')
    expect(response.body.effectiveDate).toBe('2026-04-01')
    expect(response.body.ratingBasis).toBe('design')
    expect(response.body.ratingConfidence).toBe('low')
    expect(
      response.body.componentScores.find(
        (component: { id: string }) => component.id === 'effectiveness',
      ).score,
    ).toBeNull()
    expect(
      response.body.claims.some(
        (claim: { id: string }) => claim.id === 'income-tax-2025-too-new',
      ),
    ).toBe(true)
  })

  it('returns eleven structural tax milestones across five PM terms', async () => {
    const response = await request(app).get('/api/policies')
    expect(response.status).toBe(200)
    const ids = new Set(
      response.body.map((policy: { id: string }) => policy.id),
    )
    for (const id of [
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
    ]) {
      expect(ids.has(id), `${id} is missing`).toBe(true)
    }
  })

  it('searches policies and surfaces both 2026 FCRA decisions before claims', async () => {
    const response = await request(app).get('/api/search').query({ q: 'FCRA 2026' })
    expect(response.status).toBe(200)
    const firstTwo = response.body.results.slice(0, 2)
    expect(firstTwo.every((result: { type: string }) => result.type === 'policy')).toBe(
      true,
    )
    expect(firstTwo.map((result: { id: string }) => result.id)).toEqual(
      expect.arrayContaining([
        'fcra-amendment-bill-2026',
        'fcra-amendment-rules-2026',
      ]),
    )
  })

  it('handles punctuation-only search without constructing an invalid query', async () => {
    const response = await request(app).get('/api/search').query({ q: '??' })
    expect(response.status).toBe(200)
    expect(response.body.results).toEqual([])
  })

  it('explains indicators and compares current and previous PM data windows', async () => {
    const response = await request(app).get(
      '/api/indicators/life-expectancy/series',
    )
    expect(response.status).toBe(200)
    expect(response.body.definition.plainLanguage).toContain('newborn')
    expect(response.body.definition.example).toContain('72 years')
    expect(response.body.attributionCaveat).toContain('do not prove')

    const current = response.body.termChanges.find(
      (change: { isCurrent: boolean }) => change.isCurrent,
    )
    const previous = response.body.termChanges.find(
      (change: { isCurrent: boolean }) => !change.isCurrent,
    )
    expect(current.leader.name).toBe('Narendra Modi')
    expect(current.baseline.period).toBe(2014)
    expect(current.endpoint.period).toBe(2024)
    expect(current.absoluteChange).toBeCloseTo(3.303, 3)
    expect(current.directionAssessment).toBe('improved')
    expect(previous.leader.name).toBe('Manmohan Singh')
    expect(previous.absoluteChange).toBeCloseTo(4.448, 3)
    expect(
      response.body.termChanges.some(
        (change: { termId: string }) =>
          change.termId === 'nanda-1964' || change.termId === 'nanda-1966',
      ),
    ).toBe(false)
  })

  it('treats a falling lower-is-better indicator as improvement', async () => {
    const response = await request(app).get(
      '/api/indicators/infant-mortality/series',
    )
    const current = response.body.termChanges.find(
      (change: { isCurrent: boolean }) => change.isCurrent,
    )
    expect(current.absoluteChange).toBeLessThan(0)
    expect(current.directionAssessment).toBe('improved')
  })

  it('explains how rupee depreciation can coexist with real GDP growth', async () => {
    const response = await request(app).get(
      '/api/indicators/official-exchange-rate/series',
    )
    expect(response.status).toBe(200)
    expect(response.body.definition.direction).toBe('neutral')
    expect(response.body.definition.scoreRole).toBe('context')
    expect(response.body.definition.dimensionWeight).toBe(0)

    const current = response.body.termChanges.find(
      (change: { isCurrent: boolean }) => change.isCurrent,
    )
    expect(current.baseline.period).toBe(2014)
    expect(current.endpoint.period).toBe(2025)
    expect(current.directionAssessment).toBe('context')

    expect(response.body.comparison.exchangeRate.start).toBeCloseTo(61.03, 2)
    expect(response.body.comparison.exchangeRate.end).toBeCloseTo(87.16, 2)
    expect(response.body.comparison.exchangeRate.rateIncreasePercent).toBe(42.8)
    expect(
      response.body.comparison.exchangeRate.rupeeDollarValueChangePercent,
    ).toBe(-30)
    expect(response.body.comparison.realGdpPerCapita.changePercent).toBe(70)
    expect(response.body.comparison.conclusion).toContain(
      'exchange rate alone cannot grade a Prime Minister',
    )
  })
})
