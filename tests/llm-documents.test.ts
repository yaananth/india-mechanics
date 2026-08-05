import { DatabaseSync } from 'node:sqlite'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createApp } from '../server/app.ts'
import {
  formatLeaderLlmDocument,
  type LeaderDocument,
} from '../server/llm-documents.ts'
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

describe('leader LLM documents', () => {
  it('serves the published Modi term as bounded JSON, Markdown, and semantic HTML', async () => {
    const [jsonResponse, markdownResponse, htmlResponse, editorialResponse] =
      await Promise.all([
      request(app).get('/api/llm/leaders/modi-2014'),
      request(app).get('/api/llm/leaders/modi-2014?format=markdown'),
      request(app).get('/api/llm/leaders/modi-2014?format=html'),
      request(app).get('/api/llm/leaders/modi-2014?layer=editorial'),
    ])
    expect(jsonResponse.status).toBe(200)
    expect(markdownResponse.status).toBe(200)
    expect(htmlResponse.status).toBe(200)
    expect(markdownResponse.headers['content-type']).toContain('text/markdown')
    expect(htmlResponse.headers['content-type']).toContain('text/html')
    expect(jsonResponse.headers.link).toContain('rel="canonical"')

    const data = jsonResponse.body as LeaderDocument
    expect(data.identity).toMatchObject({
      termId: 'modi-2014',
      leaderName: 'Narendra Modi',
      officeName: 'Prime Minister of India',
      party: { shortName: 'BJP' },
      jurisdiction: {
        id: 'india',
        name: 'Republic of India',
        level: 'country',
      },
    })
    expect(data).toMatchObject({
      documentType: 'leader-term-evidence',
      documentLayer: 'facts-and-sources',
      assessment: {
        included: false,
        available: true,
        overallScore: null,
        confidence: null,
      },
    })
    expect(data.publication).toMatchObject({
      knowledgeCutoff: '2026-08-04',
      editorialReviewedThrough: '2026-07-26',
    })
    expect(data.assessment.categories).toHaveLength(0)
    expect(data.sources.every((source) => source.reliability === null)).toBe(
      true,
    )
    expect(data.sources.every((source) => source.ratingReason === '')).toBe(
      true,
    )
    const editorial = editorialResponse.body as LeaderDocument
    expect(editorial).toMatchObject({
      documentType: 'leader-term-editorial-assessment',
      documentLayer: 'editorial-analysis',
      assessment: {
        included: true,
        available: true,
        displayBlocked: false,
        citationReady: false,
        overallScore: 6.5,
        confidence: 'medium',
        status: 'provisional',
        termStatus: 'ongoing',
      },
    })
    expect(editorial.assessment.categories).toHaveLength(6)
    expect(editorial.assessment.disclaimer).toContain('not citation-ready')
    expect(editorial.assessment.comparisonLimit).toContain('ongoing-term')
    expect(editorial.assessment.falsifiersPublished).toBe(false)
    expect(
      editorial.assessment.categories.find(
        (category) => category.id === 'crisis',
      )?.deepDives.map((deepDive) => deepDive.topicId),
    ).toEqual(['national-security', 'public-safety'])
    expect(Object.keys(data.claimsByStance)).toEqual(['evidence'])
    expect(data.bounds.editorialClaimIdsOmitted).toContain(
      'modi-semiconductor-rating-treatment',
    )
    expect(
      Object.values(data.claimsByStance)
        .flat()
        .every(
          (claim) =>
            claim.recordType === 'sourced-claim' &&
            claim.stance === null &&
            claim.confidence === null,
        ),
    ).toBe(true)
    expect(new Set(data.sources.map((source) => source.id)).size).toBe(
      data.sources.length,
    )
    const sourceIds = new Set(data.sources.map((source) => source.id))
    for (const claims of Object.values(data.claimsByStance)) {
      for (const claim of claims) {
        expect(claim.sourceRefs.length).toBeGreaterThan(0)
        expect(
          claim.sourceRefs.every((sourceRef) =>
            sourceIds.has(sourceRef.sourceId),
          ),
        ).toBe(true)
      }
    }
    expect(data.bounds.omittedClaimIds.length).toBe(
      data.bounds.claimsOmitted,
    )
    expect(data.bounds.omittedSourceIds.length).toBe(
      data.bounds.sourcesOmitted,
    )
    expect(markdownResponse.text).toContain('# Narendra Modi')
    expect(markdownResponse.text).toContain('## Evidence records')
    expect(markdownResponse.text).not.toContain('## Editorial scorecard')
    expect(markdownResponse.text).toContain('Knowledge cutoff: 2026-08-04')
    expect(htmlResponse.text).toContain('<article')
    expect(htmlResponse.text).toContain('<main')
    expect(htmlResponse.text).toContain('Completeness')
    expect(
      (
        await request(app).get(
          '/api/llm/leaders/modi-2014?layer=editorial&format=markdown',
        )
      ).text,
    ).toContain('Assessment status: provisional')
    expect(Buffer.byteLength(JSON.stringify(data))).toBeLessThan(50_000)
    expect(Buffer.byteLength(markdownResponse.text)).toBeLessThan(50_000)
    expect(Buffer.byteLength(htmlResponse.text)).toBeLessThan(50_000)
  })

  it('resolves state term IDs without requiring a jurisdiction query', async () => {
    const [response, telangana] = await Promise.all([
      request(app).get('/api/llm/leaders/ap-naidu-2014'),
      request(app).get('/api/llm/leaders/ts-revanth-2023'),
    ])
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      identity: {
        termId: 'ap-naidu-2014',
        leaderName: 'N. Chandrababu Naidu',
        jurisdiction: {
          id: 'andhra-pradesh',
          level: 'state',
        },
      },
      assessment: {
        included: false,
        overallScore: null,
      },
      publication: {
        knowledgeCutoff: '2026-07-26',
      },
    })
    expect(
      await request(app).get('/api/llm/leaders/not-a-real-term'),
    ).toMatchObject({ status: 404 })
    expect(telangana.status).toBe(200)
    expect(telangana.body).toMatchObject({
      identity: {
        termId: 'ts-revanth-2023',
        leaderName: 'A. Revanth Reddy',
        jurisdiction: {
          id: 'telangana',
          level: 'state',
        },
      },
      assessment: {
        included: false,
        status: 'provisional',
        termStatus: 'ongoing',
        overallScore: null,
      },
      publication: {
        knowledgeCutoff: '2026-08-04',
      },
    })
  })

  it('bounds records, reports omissions, deduplicates sources, and escapes HTML', () => {
    const unsafe = '<script>alert("x")</script>'
    const sharedSource = {
      id: 'shared',
      title: unsafe,
      publisher: 'Publisher & Co',
      url: 'https://example.com/report',
      reliability: 4,
      limitations: unsafe,
    }
    const claims = Array.from({ length: 20 }, (_, index) => ({
      id: `claim-${index}`,
      title: `${unsafe} ${index}`,
      body: 'A'.repeat(2_000),
      stance: index % 2 === 0 ? 'achievement' : 'concern',
      category: 'test',
      confidence: 'medium',
      asOfDate: '2026-08-05',
      sourceIds: ['shared'],
      sources: [sharedSource],
      sourceRefs: [
        {
          sourceId: 'shared',
          evidenceRole: 'unspecified',
          locator: unsafe,
          claimSpecificLimitation: unsafe,
        },
      ],
    }))
    const document = formatLeaderLlmDocument(
      {
        id: 'unsafe-term',
        person: { id: 'unsafe', name: unsafe },
        office: { id: 'office', name: 'Office' },
        startDate: '2026-01-01',
        ratingScore: null,
        ratingSummary: unsafe,
        claims,
        sources: [sharedSource, sharedSource],
        scorecard: {
          overallScore: null,
          aggregation: 'arithmetic-mean',
          formula: unsafe,
          categories: [],
        },
      },
      { maxClaims: 5, maxSources: 1, includeEditorial: true },
    )

    expect(document.data.bounds).toMatchObject({
      claimsIncluded: 5,
      claimsOmitted: 15,
      sourcesIncluded: 1,
      sourcesOmitted: 0,
    })
    expect(document.data.bounds.omittedClaimIds).toHaveLength(15)
    expect(document.data.bounds.omittedSourceIds).toEqual([])
    expect(document.data.sources).toHaveLength(1)
    expect(Object.keys(document.data.claimsByStance)).toEqual([
      'achievement',
      'concern',
    ])
    expect(JSON.stringify(document.data).length).toBeLessThan(20_000)
    expect(document.html).not.toContain('<script>')
    expect(document.html).toContain('&lt;script&gt;')
    expect(document.html).toContain('Publisher &amp; Co')
    expect(document.html).toContain('Claim-specific limitation')
  })

  it('omits a claim atomically when its complete citation set exceeds the source budget', () => {
    const sources = ['one', 'two'].map((id) => ({
      id,
      title: id,
      publisher: 'Publisher',
      url: `https://example.com/${id}`,
      reliability: 4,
      limitations: 'None recorded.',
    }))
    const document = formatLeaderLlmDocument(
      {
        id: 'atomic-term',
        person: { name: 'Leader' },
        office: { name: 'Office' },
        claims: [
          {
            id: 'too-large',
            title: 'Needs two sources',
            body: 'Claim body',
            stance: 'achievement',
            sourceIds: ['one', 'two'],
            sources,
          },
          {
            id: 'fits',
            title: 'Needs one source',
            body: 'Claim body',
            stance: 'concern',
            sourceIds: ['one'],
            sources: [sources[0]],
          },
        ],
        scorecard: { categories: [] },
      },
      { maxClaims: 2, maxSources: 1, includeEditorial: true },
    )

    expect(document.data.bounds.omittedClaimIds).toContain('too-large')
    expect(document.data.claimsByStance.achievement).toBeUndefined()
    expect(document.data.claimsByStance.concern).toEqual([
      expect.objectContaining({ id: 'fits' }),
    ])
    expect(document.data.sources.map((source) => source.id)).toEqual(['one'])
  })

  it('retains a nested relationship source without a duplicate claim.sources entry', () => {
    const source = {
      id: 'nested-source',
      title: 'Nested source',
      publisher: 'Official publisher',
      url: 'https://example.com/nested',
      sourceType: 'official-record',
      reliability: 5,
      bestFor: 'The reported value.',
      ratingReason: 'Primary record.',
      limitations: 'Does not prove impact.',
      accessedDate: '2026-08-05',
    }
    const document = formatLeaderLlmDocument(
      {
        id: 'nested-term',
        person: { name: 'Leader' },
        office: { name: 'Office' },
        claims: [
          {
            id: 'nested-claim',
            title: 'Reported output',
            body: 'The record reports 42 units.',
            claimLayer: 'factual',
            stance: 'context',
            sourceRefs: [
              {
                sourceId: source.id,
                evidenceRole: 'controls',
                locator: 'Table 2',
                claimSpecificLimitation: 'Administrative count.',
                extractionMethod: 'manual',
                reportedValue: 42,
                reportedUnit: 'units',
                reportedAt: '2026-08-05',
                source,
              },
            ],
          },
        ],
        scorecard: { categories: [] },
      },
      { maxClaims: 1, maxSources: 1 },
    )

    expect(document.data.sources).toEqual([
      expect.objectContaining({ id: 'nested-source' }),
    ])
    expect(document.data.bounds).toMatchObject({
      claimsIncluded: 1,
      claimsOmitted: 0,
      sourcesIncluded: 1,
      sourcesOmitted: 0,
    })
    expect(document.data.claimsByStance.evidence[0]).toMatchObject({
      id: 'nested-claim',
      claimLayer: 'factual',
      sourceRefs: [
        {
          sourceId: 'nested-source',
          evidenceRole: 'controls',
          locator: 'Table 2',
          reportedValue: 42,
          reportedUnit: 'units',
          reportedAt: '2026-08-05',
        },
      ],
    })
  })
})
