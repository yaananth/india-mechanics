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
    const [jsonResponse, markdownResponse, htmlResponse] = await Promise.all([
      request(app).get('/api/llm/leaders/modi-2014'),
      request(app).get('/api/llm/leaders/modi-2014?format=markdown'),
      request(app).get('/api/llm/leaders/modi-2014?format=html'),
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
    expect(data.assessment).toMatchObject({
      overallScore: 6.5,
      confidence: 'medium',
      aggregation: 'arithmetic-mean',
    })
    expect(data.publication).toMatchObject({
      knowledgeCutoff: '2026-08-04',
      editorialReviewedThrough: '2026-07-26',
    })
    expect(data.assessment.categories).toHaveLength(6)
    expect(
      data.assessment.categories.find(
        (category) => category.id === 'crisis',
      )?.deepDives.map((deepDive) => deepDive.topicId),
    ).toEqual(['national-security', 'public-safety'])
    expect(Object.keys(data.claimsByStance)).toContain('achievement')
    expect(new Set(data.sources.map((source) => source.id)).size).toBe(
      data.sources.length,
    )
    expect(markdownResponse.text).toContain('# Narendra Modi')
    expect(markdownResponse.text).toContain('## Scorecard')
    expect(markdownResponse.text).toContain('Knowledge cutoff: 2026-08-04')
    expect(htmlResponse.text).toContain('<article')
    expect(htmlResponse.text).toContain('<main')
    expect(htmlResponse.text).toContain('<details>')
    expect(Buffer.byteLength(JSON.stringify(data))).toBeLessThan(50_000)
    expect(Buffer.byteLength(markdownResponse.text)).toBeLessThan(50_000)
    expect(Buffer.byteLength(htmlResponse.text)).toBeLessThan(50_000)
  })

  it('resolves state term IDs without requiring a jurisdiction query', async () => {
    const response = await request(app).get(
      '/api/llm/leaders/ap-naidu-2014',
    )
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
        overallScore: 6.8,
      },
      publication: {
        knowledgeCutoff: '2026-07-26',
      },
    })
    expect(
      await request(app).get('/api/llm/leaders/not-a-real-term'),
    ).toMatchObject({ status: 404 })
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
      { maxClaims: 5, maxSources: 1 },
    )

    expect(document.data.bounds).toEqual({
      claimsIncluded: 5,
      claimsOmitted: 15,
      sourcesIncluded: 1,
      sourcesOmitted: 0,
    })
    expect(document.data.sources).toHaveLength(1)
    expect(Object.keys(document.data.claimsByStance)).toEqual([
      'achievement',
      'concern',
    ])
    expect(JSON.stringify(document.data).length).toBeLessThan(20_000)
    expect(document.html).not.toContain('<script>')
    expect(document.html).toContain('&lt;script&gt;')
    expect(document.html).toContain('Publisher &amp; Co')
  })
})
