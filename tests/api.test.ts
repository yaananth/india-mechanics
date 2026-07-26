import { DatabaseSync } from 'node:sqlite'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createApp } from '../server/app.ts'
import { ensureDatabase } from '../server/seed.ts'
import type { TimelineEvent } from '../src/types.ts'

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
    expect(response.body.knowledge.cutoff).toBe('2026-07-26')
    expect(response.body.knowledge.billRegisterAsOfDate).toBe('2026-07-26')
    expect(response.body.knowledge.timelineStarts).toBe('1945-01-01')
    expect(response.body.currentTerm.person.name).toBe('Narendra Modi')
    expect(response.body.progress.overall.score).toBeGreaterThan(0)
    expect(response.body.progress.overall.score).toBeLessThan(100)
  })

  it('publishes post-split Andhra Pradesh as an isolated state jurisdiction', async () => {
    const [
      jurisdictions,
      overview,
      leaders,
      policies,
      budgets,
      events,
      indicators,
      sources,
      answer,
    ] = await Promise.all([
      request(app).get('/api/jurisdictions'),
      request(app)
        .get('/api/overview')
        .query({ jurisdiction: 'andhra-pradesh' }),
      request(app)
        .get('/api/leaders')
        .query({ jurisdiction: 'andhra-pradesh' }),
      request(app)
        .get('/api/policies')
        .query({ jurisdiction: 'andhra-pradesh' }),
      request(app)
        .get('/api/budgets')
        .query({ jurisdiction: 'andhra-pradesh' }),
      request(app)
        .get('/api/events')
        .query({ jurisdiction: 'andhra-pradesh' }),
      request(app)
        .get('/api/indicators')
        .query({ jurisdiction: 'andhra-pradesh' }),
      request(app)
        .get('/api/sources')
        .query({ jurisdiction: 'andhra-pradesh' }),
      request(app).get('/api/search').query({
        jurisdiction: 'andhra-pradesh',
        q: 'how is andhra doing',
      }),
    ])

    expect(jurisdictions.body).toContainEqual(
      expect.objectContaining({
        id: 'andhra-pradesh',
        level: 'state',
        parentId: 'india',
        validFrom: '2014-06-02',
      }),
    )
    expect(overview.status).toBe(200)
    expect(overview.body).toMatchObject({
      jurisdictionId: 'andhra-pradesh',
      jurisdiction: {
        id: 'andhra-pradesh',
        level: 'state',
        validFrom: '2014-06-02',
      },
      currentTerm: {
        id: 'ap-naidu-2024',
        person: { name: 'N. Chandrababu Naidu' },
        office: { shortName: 'Chief Minister' },
      },
      featuredAnswer: { id: 'ap-post-split-progress' },
    })
    expect(overview.body.knowledge.timelineStarts).toBe('2014-06-02')
    expect(overview.body.progress.overall.score).toBeGreaterThan(0)
    expect(leaders.body).toHaveLength(3)
    expect(
      leaders.body.find((leader: { id: string }) => leader.id === 'ap-naidu-2014')
        .specialistAssessments,
    ).toContainEqual(
      expect.objectContaining({
        topicId: 'public-safety',
        operationalScore: 5.9,
        adjustedScore: 6.1,
      }),
    )
    expect(
      leaders.body.find((leader: { id: string }) => leader.id === 'ap-jagan-2019')
        .specialistAssessments,
    ).toContainEqual(
      expect.objectContaining({
        topicId: 'public-safety',
        operationalScore: 5.7,
        adjustedScore: 5.8,
      }),
    )
    expect(
      leaders.body.find((leader: { id: string }) => leader.id === 'ap-naidu-2024')
        .specialistAssessments,
    ).toEqual([])
    expect(policies.body).toHaveLength(8)
    expect(budgets.body).toHaveLength(3)
    expect(events.body).toHaveLength(10)
    expect(
      events.body.every(
        (event: {
          date: string
          accountability: { responsibilities: unknown[] } | null
        }) =>
          event.date >= '2014-06-02' &&
          event.accountability &&
          event.accountability.responsibilities.length > 0,
      ),
    ).toBe(true)
    expect(indicators.body).toHaveLength(29)
    expect(
      indicators.body.every((indicator: { id: string }) =>
        indicator.id.startsWith('ap-'),
      ),
    ).toBe(true)
    expect(sources.body.length).toBeGreaterThanOrEqual(15)
    expect(answer.body.answer.id).toBe('ap-post-split-progress')
    expect(
      policies.body.some(
        (policy: { id: string }) =>
          policy.id === 'ap-rural-road-connectivity-2016',
      ),
    ).toBe(true)
    expect(
      policies.body.some(
        (policy: { id: string }) =>
          policy.id === 'ap-population-management-2026',
      ),
    ).toBe(true)
    expect(
      events.body.some(
        (event: { id: string }) => event.id === 'ap-panchayat-awards-2025',
      ),
    ).toBe(true)
  })

  it('compares AP indicators only across post-split CM terms', async () => {
    const response = await request(app)
      .get('/api/indicators/ap-real-nsdp-per-capita/series')
      .query({ jurisdiction: 'andhra-pradesh' })
    expect(response.status).toBe(200)
    expect(response.body.observations[0]).toMatchObject({
      period: 2014,
      value: 79174,
    })
    expect(response.body.termChanges).toContainEqual(
      expect.objectContaining({
        termId: 'ap-naidu-2014',
        baseline: expect.objectContaining({ period: 2014, value: 79174 }),
        endpoint: expect.objectContaining({ period: 2019, value: 110587 }),
        directionAssessment: 'improved',
      }),
    )
    expect(
      response.body.observations.every(
        (observation: { period: number }) => observation.period >= 2014,
      ),
    ).toBe(true)
    expect(response.body.attributionCaveat).toContain('Chief Minister')
  })

  it('publishes Andhra Pradesh population management as provisional design', async () => {
    const response = await request(app)
      .get('/api/policies/ap-population-management-2026')
      .query({ jurisdiction: 'andhra-pradesh' })

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      leader: { name: 'N. Chandrababu Naidu' },
      ratingBasis: 'design',
      ratingConfidence: 'low',
      ratingScore: 6.2,
    })
    expect(
      response.body.componentScores.find(
        (component: { id: string }) => component.id === 'effectiveness',
      ).score,
    ).toBeNull()
    expect(
      response.body.claims.map((claim: { id: string }) => claim.id),
    ).toEqual(
      expect.arrayContaining([
        'ap-population-policy-lifecycle-design',
        'ap-population-policy-rights-fiscal-risk',
        'ap-population-policy-too-early',
      ]),
    )
  })

  it('publishes modern Tamil Nadu as an isolated state jurisdiction', async () => {
    const [
      jurisdictions,
      overview,
      leaders,
      policies,
      budgets,
      events,
      indicators,
      sources,
      answer,
    ] = await Promise.all([
      request(app).get('/api/jurisdictions'),
      request(app).get('/api/overview').query({ jurisdiction: 'tamil-nadu' }),
      request(app).get('/api/leaders').query({ jurisdiction: 'tamil-nadu' }),
      request(app).get('/api/policies').query({ jurisdiction: 'tamil-nadu' }),
      request(app).get('/api/budgets').query({ jurisdiction: 'tamil-nadu' }),
      request(app).get('/api/events').query({ jurisdiction: 'tamil-nadu' }),
      request(app).get('/api/indicators').query({ jurisdiction: 'tamil-nadu' }),
      request(app).get('/api/sources').query({ jurisdiction: 'tamil-nadu' }),
      request(app).get('/api/search').query({
        jurisdiction: 'tamil-nadu',
        q: 'how is tamil nadu doing',
      }),
    ])

    expect(jurisdictions.body).toContainEqual(
      expect.objectContaining({
        id: 'tamil-nadu',
        level: 'state',
        parentId: 'india',
        validFrom: '1969-01-14',
      }),
    )
    expect(overview.status).toBe(200)
    expect(overview.body).toMatchObject({
      jurisdictionId: 'tamil-nadu',
      jurisdiction: {
        id: 'tamil-nadu',
        level: 'state',
        validFrom: '1969-01-14',
      },
      currentTerm: {
        id: 'tn-vijay-2026',
        ratingScore: null,
        person: { name: 'C. Joseph Vijay' },
        party: { id: 'tvk', shortName: 'TVK' },
        office: { shortName: 'Chief Minister' },
      },
      featuredAnswer: { id: 'tn-modern-progress' },
    })
    expect(overview.body.knowledge).toMatchObject({
      cutoff: '2026-07-26',
      politicalStatusChecked: '2026-07-26',
      timelineStarts: '1969-01-14',
    })
    expect(overview.body.progress.overall.score).toBeGreaterThan(0)
    expect(leaders.body).toHaveLength(24)
    expect(
      leaders.body.find((leader: { id: string }) => leader.id === 'tn-stalin-2021')
        .specialistAssessments,
    ).toContainEqual(
      expect.objectContaining({
        topicId: 'public-safety',
        operationalScore: 5.8,
        adjustedScore: 5.9,
      }),
    )
    expect(
      leaders.body.find((leader: { id: string }) => leader.id === 'tn-vijay-2026')
        .specialistAssessments,
    ).toEqual([])
    expect(policies.body).toHaveLength(15)
    expect(budgets.body).toHaveLength(3)
    expect(
      budgets.body.every(
        (budget: { leaderTermId: string }) =>
          budget.leaderTermId !== 'tn-vijay-2026',
      ),
    ).toBe(true)
    expect(events.body).toHaveLength(14)
    expect(
      events.body.every(
        (event: {
          date: string
          accountability: { responsibilities: unknown[] } | null
        }) =>
          event.date >= '1969-01-14' &&
          event.accountability &&
          event.accountability.responsibilities.length > 0,
      ),
    ).toBe(true)
    expect(indicators.body).toHaveLength(27)
    expect(
      indicators.body.every((indicator: { id: string }) =>
        indicator.id.startsWith('tn-'),
      ),
    ).toBe(true)
    expect(sources.body.length).toBeGreaterThanOrEqual(30)
    expect(answer.body.answer.id).toBe('tn-modern-progress')
    expect(
      policies.body.some(
        (policy: { id: string }) => policy.id === 'tn-road-renewal-2021',
      ),
    ).toBe(true)
    expect(
      events.body.some(
        (event: { id: string }) =>
          event.id === 'tn-road-delivery-and-safety-2025',
      ),
    ).toBe(true)
    expect(
      events.body.some(
        (event: { id: string }) => event.id === 'tn-fiscal-white-paper-2026',
      ),
    ).toBe(true)
  })

  it('compares Tamil Nadu indicators by the closest observed CM data years', async () => {
    const response = await request(app)
      .get('/api/indicators/tn-real-nsdp-per-capita/series')
      .query({ jurisdiction: 'tamil-nadu' })
    expect(response.status).toBe(200)
    expect(response.body.observations[0]).toMatchObject({
      period: 2011,
      value: 93112.41,
    })
    expect(response.body.termChanges).toContainEqual(
      expect.objectContaining({
        termId: 'tn-stalin-2021',
        baseline: expect.objectContaining({
          period: 2021,
          value: 154557.2,
        }),
        endpoint: expect.objectContaining({
          period: 2024,
          value: 198000,
          status: 'estimated',
        }),
        directionAssessment: 'improved',
      }),
    )
    expect(response.body.termChanges).toContainEqual(
      expect.objectContaining({
        termId: 'tn-palaniswami-2017',
        directionAssessment: 'improved',
      }),
    )
    expect(response.body.attributionCaveat).toContain('Chief Minister')
  })

  it('publishes Tamil Nadu crime evidence without rating the new government', async () => {
    const [violence, answer, current] = await Promise.all([
      request(app)
        .get('/api/indicators/tn-crime-violent-rate/series')
        .query({ jurisdiction: 'tamil-nadu' }),
      request(app).get('/api/search').query({
        jurisdiction: 'tamil-nadu',
        q: 'crime in tamil nadu',
      }),
      request(app)
        .get('/api/leaders/tn-vijay-2026')
        .query({ jurisdiction: 'tamil-nadu' }),
    ])
    expect(violence.status).toBe(200)
    expect(violence.body.observations).toEqual([
      expect.objectContaining({ period: 2023, value: 14.7 }),
    ])
    expect(violence.body.termChanges).toEqual([])
    expect(answer.body.answer).toMatchObject({
      id: 'tn-crime-safety',
      confidence: 'medium',
    })
    expect(current.body).toMatchObject({
      id: 'tn-vijay-2026',
      ratingScore: null,
      ratingProfiles: [],
      specialistAssessments: [],
    })
  })

  it('shows the Vijay fiscal white paper without treating it as a budget outcome', async () => {
    const [events, current] = await Promise.all([
      request(app).get('/api/events').query({ jurisdiction: 'tamil-nadu' }),
      request(app)
        .get('/api/leaders/tn-vijay-2026')
        .query({ jurisdiction: 'tamil-nadu' }),
    ])

    const whitePaper = events.body.find(
      (event: { id: string }) => event.id === 'tn-fiscal-white-paper-2026',
    )
    expect(whitePaper).toMatchObject({
      governments: [
        expect.objectContaining({
          termId: 'tn-vijay-2026',
          party: expect.objectContaining({ id: 'tvk' }),
        }),
      ],
      accountability: expect.objectContaining({
        choiceAssessment: 'mostly-right',
      }),
    })
    expect(
      current.body.claims.map((claim: { id: string }) => claim.id),
    ).toEqual(
      expect.arrayContaining([
        'tn-vijay-fiscal-disclosure',
        'tn-white-paper-attribution-limit',
        'tn-vijay-budget-outcomes-pending',
      ]),
    )
    expect(current.body.ratingScore).toBeNull()
  })

  it('publishes crime and public-safety trends without treating FIR counts as direct harm', async () => {
    const [indiaAnswer, indiaMurder, apViolence, apAnswer] = await Promise.all([
      request(app).get('/api/search').query({
        jurisdiction: 'india',
        q: 'is crime getting better in india',
      }),
      request(app)
        .get('/api/indicators/crime-murder-rate/series')
        .query({ jurisdiction: 'india' }),
      request(app)
        .get('/api/indicators/ap-crime-violent-rate/series')
        .query({ jurisdiction: 'andhra-pradesh' }),
      request(app).get('/api/search').query({
        jurisdiction: 'andhra-pradesh',
        q: 'crime in andhra pradesh',
      }),
    ])

    expect(indiaAnswer.body.answer).toMatchObject({
      id: 'india-crime-safety',
      confidence: 'medium',
    })
    expect(indiaAnswer.body.answer.verdict).toContain('bounded')
    expect(indiaAnswer.body.answer.shortAnswer).toContain('released 2024')
    expect(indiaMurder.body.observations).toEqual([
      expect.objectContaining({ period: 2015, value: 2.6 }),
      expect.objectContaining({ period: 2019, value: 2.2 }),
      expect.objectContaining({ period: 2023, value: 2 }),
    ])
    expect(indiaMurder.body.termChanges).toContainEqual(
      expect.objectContaining({
        termId: 'modi-2014',
        directionAssessment: 'improved',
      }),
    )
    expect(apViolence.body.observations).toEqual([
      expect.objectContaining({ period: 2015, value: 13.5 }),
      expect.objectContaining({ period: 2019, value: 14.7 }),
      expect.objectContaining({ period: 2023, value: 12.1 }),
    ])
    expect(apAnswer.body.answer.id).toBe('ap-crime-safety')
    expect(apAnswer.body.answer.verdict).toContain('not yet scoreable')
  })

  it('answers the constitutional regime-change question with both cases', async () => {
    const response = await request(app).get('/api/search').query({
      jurisdiction: 'india',
      q: 'as of now do we need regime change',
    })
    expect(response.status).toBe(200)
    expect(response.body.answer.id).toBe('regime-change-now')
    const sections = new Set(
      response.body.answer.claims.map((claim: { section: string }) => claim.section),
    )
    expect(sections.has('achievement')).toBe(true)
    expect(sections.has('concern')).toBe(true)
    expect(sections.has('context')).toBe(true)
    expect(response.body.answer.verdict).toContain('conditional case')
    expect(
      response.body.answer.claims.some(
        (claim: { id: string }) =>
          claim.id === 'regime-change-previous-term-comparison',
      ),
    ).toBe(true)
  })

  it('removes the old partisan-style curated questions', async () => {
    const [modiQuestion, partyQuestion] = await Promise.all([
      request(app).get('/api/search').query({
        jurisdiction: 'india',
        q: 'is modi doing good',
      }),
      request(app).get('/api/search').query({
        jurisdiction: 'india',
        q: 'is BJP better than Congress',
      }),
    ])
    expect(modiQuestion.status).toBe(200)
    expect(partyQuestion.status).toBe(200)
    expect(modiQuestion.body.answer).toBeNull()
    expect(partyQuestion.body.answer).toBeNull()
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

  it('fact-checks the viral sanitation comparison and exposes Swachh Bharat', async () => {
    const [searchResponse, policyResponse] = await Promise.all([
      request(app).get('/api/search').query({
        jurisdiction: 'india',
        q: '38.7 to 95.6 toilet coverage',
      }),
      request(app).get('/api/policies/swachh-bharat-gramin-2014'),
    ])

    expect(searchResponse.status).toBe(200)
    expect(searchResponse.body.answer).toMatchObject({
      id: 'swachh-bharat-rural-sanitation',
      confidence: 'high',
    })
    expect(searchResponse.body.answer.shortAnswer).toContain('not one comparable')

    expect(policyResponse.status).toBe(200)
    expect(policyResponse.body.ratingScore).toBe(7.8)
    expect(policyResponse.body.leader).toMatchObject({
      name: 'Narendra Modi',
    })
    expect(
      policyResponse.body.claims.map((claim: { id: string }) => claim.id),
    ).toEqual(
      expect.arrayContaining([
        'modi-swachh-bharat-sanitation-gain',
        'swachh-bharat-infographic-comparison',
        'swachh-bharat-unfinished-sanitation',
      ]),
    )
  })

  it('returns the transparent Modi scorecard and methodology review', async () => {
    const response = await request(app).get('/api/leaders/modi-2014')
    expect(response.status).toBe(200)
    expect(response.body.ratingScore).toBe(6.7)
    expect(
      response.body.ratingProfiles.map(
        (profile: { id: string; score: number }) => ({
          id: profile.id,
          score: profile.score,
        }),
      ),
    ).toEqual([
      { id: 'balanced', score: 6.7 },
      { id: 'development', score: 7.1 },
      { id: 'human-capability', score: 6.7 },
      { id: 'governance', score: 6 },
    ])
    for (const profile of response.body.ratingProfiles) {
      expect(
        Object.values(profile.weights as Record<string, number>).reduce(
          (sum: number, weight) => sum + weight,
          0,
        ),
      ).toBeCloseTo(1)
    }
    expect(response.body.ratingAudit).toMatchObject({
      runCount: 5,
      genericMean: 6.28,
      standardizedMean: 6.22,
      standardDeviation: 0.07,
      minimum: 6.1,
      maximum: 6.3,
      previousRating: 6.7,
      revisedRating: 6.7,
      status: 'stable',
    })
    expect(response.body.ratingAudit.notes).toContain('double-count')
    expect(response.body.specialistAssessments).toHaveLength(2)
    expect(response.body.specialistAssessments).toContainEqual(
      expect.objectContaining({
        topicId: 'national-security',
        operationalScore: 7,
        adjustedScore: 6.5,
        status: 'reviewed',
      }),
    )
    expect(response.body.specialistAssessments).toContainEqual(
      expect.objectContaining({
        topicId: 'public-safety',
        operationalScore: 5.9,
        adjustedScore: 5.9,
        status: 'reviewed',
      }),
    )
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
    expect(response.body).toHaveLength(77)
    expect(response.body[0].id).toBe('national-cybercrime-complaints-2025')
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
    expect(manipur.governments).toContainEqual(
      expect.objectContaining({
        termId: 'modi-2014',
        leader: expect.objectContaining({ name: 'Narendra Modi' }),
        office: expect.objectContaining({ shortName: 'Prime Minister' }),
        party: expect.objectContaining({ id: 'bjp', shortName: 'BJP' }),
      }),
    )
  })

  it('filters timeline events by PM or CM term and party', async () => {
    const [modi, bjp, prePm, andhra, tamilNadu] = await Promise.all([
      request(app).get('/api/events').query({ leaderTerm: 'modi-2014' }),
      request(app).get('/api/events').query({ party: 'bjp' }),
      request(app).get('/api/events').query({ leaderTerm: 'unmapped' }),
      request(app).get('/api/events').query({
        jurisdiction: 'andhra-pradesh',
        leaderTerm: 'ap-naidu-2024',
        party: 'tdp',
      }),
      request(app).get('/api/events').query({
        jurisdiction: 'tamil-nadu',
        leaderTerm: 'tn-stalin-2021',
        party: 'dmk',
      }),
    ])

    expect(modi.status).toBe(200)
    expect(modi.body.length).toBeGreaterThan(10)
    expect(
      modi.body.every((event: TimelineEvent) =>
        event.governments.some(
          (government) => government.termId === 'modi-2014',
        ),
      ),
    ).toBe(true)

    expect(bjp.status).toBe(200)
    expect(
      bjp.body.every((event: TimelineEvent) =>
        event.governments.some(
          (government) => government.party?.id === 'bjp',
        ),
      ),
    ).toBe(true)

    expect(prePm.status).toBe(200)
    expect(prePm.body).toHaveLength(3)
    expect(
      prePm.body.every(
        (event: TimelineEvent) => event.governments.length === 0,
      ),
    ).toBe(true)

    expect(andhra.status).toBe(200)
    expect(andhra.body.length).toBeGreaterThanOrEqual(4)
    expect(andhra.body[0].governments[0]).toMatchObject({
      termId: 'ap-naidu-2024',
      leader: { name: 'N. Chandrababu Naidu' },
      office: { shortName: 'Chief Minister' },
      party: { id: 'tdp', shortName: 'TDP' },
    })

    expect(tamilNadu.status).toBe(200)
    expect(tamilNadu.body.length).toBeGreaterThanOrEqual(3)
    expect(
      tamilNadu.body.every((event: TimelineEvent) =>
        event.governments.some(
          (government) =>
            government.termId === 'tn-stalin-2021' &&
            government.party?.id === 'dmk',
        ),
      ),
    ).toBe(true)
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
    expect(methodology.body.leaderEvaluation.profiles).toHaveLength(4)
    expect(methodology.body.specialistEvaluations).toHaveLength(2)
    expect(methodology.body.specialistEvaluations).toContainEqual(
      expect.objectContaining({
        id: 'national-security',
        operationalLabel: 'Operational security',
        adjustedLabel: 'Rights-adjusted security',
      }),
    )
    expect(methodology.body.specialistEvaluations).toContainEqual(
      expect.objectContaining({
        id: 'public-safety',
        operationalLabel: 'Recorded safety outcomes',
        adjustedLabel: 'Reporting-and-justice adjusted',
        dimensions: expect.arrayContaining([
          expect.objectContaining({ id: 'safety-justice-delivery' }),
        ]),
      }),
    )
    expect(methodology.body.leaderEvaluation.profiles[0]).toMatchObject({
      id: 'balanced',
      isCanonical: true,
      weights: {
        outcomes: 0.3,
        reforms: 0.2,
        inclusion: 0.15,
        crisis: 0.1,
        institutions: 0.15,
        integrity: 0.1,
      },
    })
    expect(exportResponse.status).toBe(200)
    expect(exportResponse.body.events.length).toBeGreaterThanOrEqual(44)
    expect(exportResponse.body.policies.length).toBeGreaterThanOrEqual(30)
    expect(exportResponse.body.budgets).toHaveLength(17)
    expect(exportResponse.body.bills).toHaveLength(4408)
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
      ratingScore: 5.8,
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
    ).toContain('post-26/11 institutions')
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
    expect(response.body.total).toBe(4408)
    expect(response.body.explained).toBe(4408)
    expect(response.body.officialOrReviewed).toBeGreaterThan(2300)
    expect(response.body.reviewed).toBe(36)
    expect(response.body.records).toHaveLength(5)
    expect(response.body.records[0]).toMatchObject({
      introducedDate: '2026-07-24',
      leader: { name: 'Narendra Modi' },
      reviewStatus: 'reviewed',
      linkedPolicyId: 'national-honour-amendment-bill-2026',
      explanation: {
        verdict: 'reviewed-policy',
      },
    })
    expect(response.body.facets.statuses.length).toBeGreaterThan(5)
    expect(response.body.facets.leaders.length).toBeGreaterThan(10)
    expect(response.body.source.id).toBe('sansad-government-bills-api')
  })

  it('explains and rates the 2026 Delimitation proposal with corrected status', async () => {
    const response = await request(app).get(
      '/api/bills/sansad-bill-2026-04-16-c5048cfc8d852cca',
    )
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      status: 'Infructuous',
      sourceStatus: 'Pending',
      statusAsOf: '2026-04-17',
      reviewStatus: 'reviewed',
      linkedPolicyId: 'delimitation-bill-2026',
      linkedPolicyScope: 'bill-specific',
      explanation: {
        evidenceBasis: 'independent-review',
        specificity: 'explicit',
        verdictKind: 'provisional-design',
      },
      assessment: {
        policyId: 'delimitation-bill-2026',
        ratingScore: 5.4,
        ratingBasis: 'design',
        status: 'infructuous',
        scope: 'bill-specific',
      },
    })
    expect(response.body.explanation.proposalSummary).toContain(
      'Delimitation Commission',
    )
    expect(response.body.explanation.potentialBenefits).toContain(
      'women reservation',
    )
    expect(response.body.explanation.potentialRisks).toContain(
      'political power',
    )
    expect(response.body.sources.map((source: { id: string }) => source.id)).toEqual(
      expect.arrayContaining([
        'sansad-government-bills-api',
        'prs-delimitation-bill-2026',
      ]),
    )
  })

  it('searches bill explanations, not only register titles', async () => {
    const [explanationSearch, linkedAssessmentSearch] = await Promise.all([
      request(app).get('/api/bills').query({
        q: 'redistribute political power',
        pageSize: 5,
      }),
      request(app).get('/api/bills').query({
        q: 'foreign contribution asset',
        pageSize: 5,
      }),
    ])
    expect(explanationSearch.status).toBe(200)
    expect(explanationSearch.body.records[0]).toMatchObject({
      id: 'sansad-bill-2026-04-16-c5048cfc8d852cca',
    })
    expect(linkedAssessmentSearch.status).toBe(200)
    expect(linkedAssessmentSearch.body.records).toContainEqual(
      expect.objectContaining({
        linkedPolicyId: 'fcra-amendment-bill-2026',
      }),
    )
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

  it('reviews the pending National Song protection bill without inventing outcomes', async () => {
    const [policy, bill] = await Promise.all([
      request(app).get('/api/policies/national-honour-amendment-bill-2026'),
      request(app).get(
        '/api/bills/sansad-bill-2026-07-24-08ecdadde507d8cb',
      ),
    ])

    expect(policy.status).toBe(200)
    expect(policy.body).toMatchObject({
      status: 'pending',
      ratingBasis: 'design',
      ratingScore: 5.6,
      leader: { name: 'Narendra Modi' },
    })
    expect(
      policy.body.componentScores.find(
        (component: { id: string }) => component.id === 'effectiveness',
      ).score,
    ).toBeNull()
    expect(
      policy.body.claims.map((claim: { id: string }) => claim.id),
    ).toEqual(
      expect.arrayContaining([
        'national-honour-bill-symbolic-purpose',
        'national-honour-bill-rights-risk',
        'national-honour-bill-too-early',
      ]),
    )

    expect(bill.status).toBe(200)
    expect(bill.body).toMatchObject({
      status: 'Pending',
      reviewStatus: 'reviewed',
      linkedPolicyId: 'national-honour-amendment-bill-2026',
      linkedPolicyScope: 'bill-specific',
    })
  })

  it('keeps both 2026 BHAVYA industrial schemes design-only', async () => {
    const [parks, chemical] = await Promise.all([
      request(app).get('/api/policies/bhavya-industrial-parks-2026'),
      request(app).get('/api/policies/bhavya-rasayan-2026'),
    ])

    expect(parks.status).toBe(200)
    expect(parks.body).toMatchObject({
      ratingBasis: 'design',
      ratingScore: 6.8,
      ratingConfidence: 'low',
    })
    expect(chemical.status).toBe(200)
    expect(chemical.body).toMatchObject({
      ratingBasis: 'design',
      ratingScore: 6.6,
      ratingConfidence: 'low',
    })
    for (const response of [parks, chemical]) {
      expect(
        response.body.componentScores.find(
          (component: { id: string }) => component.id === 'effectiveness',
        ).score,
      ).toBeNull()
    }
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

  it('shows comparable rural sanitation gains without scoring dashboard coverage', async () => {
    const [sanitation, openDefecation] = await Promise.all([
      request(app).get('/api/indicators/rural-basic-sanitation/series'),
      request(app).get('/api/indicators/rural-open-defecation/series'),
    ])

    expect(sanitation.status).toBe(200)
    expect(sanitation.body.definition.scoreRole).toBe('context')
    expect(sanitation.body.definition.dimensionWeight).toBe(0)
    const sanitationCurrent = sanitation.body.termChanges.find(
      (change: { isCurrent: boolean }) => change.isCurrent,
    )
    expect(sanitationCurrent.baseline).toMatchObject({
      period: 2014,
      status: 'modelled',
    })
    expect(sanitationCurrent.endpoint).toMatchObject({
      period: 2024,
      status: 'modelled',
    })
    expect(sanitationCurrent.baseline.value).toBeCloseTo(46.732, 3)
    expect(sanitationCurrent.endpoint.value).toBeCloseTo(81.045, 3)
    expect(sanitationCurrent.directionAssessment).toBe('improved')

    expect(openDefecation.status).toBe(200)
    const openDefecationCurrent = openDefecation.body.termChanges.find(
      (change: { isCurrent: boolean }) => change.isCurrent,
    )
    expect(openDefecationCurrent.baseline.value).toBeCloseTo(44.405, 3)
    expect(openDefecationCurrent.endpoint.value).toBeCloseTo(10.665, 3)
    expect(openDefecationCurrent.directionAssessment).toBe('improved')
  })
})
