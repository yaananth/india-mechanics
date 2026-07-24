import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { DatabaseSync } from 'node:sqlite'
import request from 'supertest'
import { createApp } from '../server/app.ts'
import { ensureDatabase } from '../server/seed.ts'

const databasePath = ensureDatabase()
const db = new DatabaseSync(databasePath, { readOnly: true })
const app = createApp(db)

async function getJson<T>(path: string) {
  const response = await request(app).get(path)
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Snapshot request failed (${response.status}): ${path}`)
  }
  return response.body as T
}

try {
  const [
    exportData,
    overview,
    methodology,
    meta,
    openapi,
    billSummary,
  ] = await Promise.all([
    getJson<Record<string, unknown>>('/api/export?jurisdiction=india'),
    getJson<Record<string, unknown>>('/api/overview?jurisdiction=india'),
    getJson<Record<string, unknown>>('/api/methodology'),
    getJson<Record<string, unknown>>('/api/meta'),
    getJson<Record<string, unknown>>('/api/openapi.json'),
    getJson<Record<string, unknown>>(
      '/api/bills?jurisdiction=india&page=1&pageSize=1',
    ),
  ])

  const leaders = exportData.leaders as Array<Record<string, unknown>>
  const policies = exportData.policies as Array<Record<string, unknown>>
  const budgets = exportData.budgets as Array<Record<string, unknown>>
  const events = exportData.events as Array<Record<string, unknown>>
  const indicators = exportData.indicators as Array<Record<string, unknown>>
  const sources = exportData.sources as Array<Record<string, unknown>>
  const bills = exportData.bills as Array<Record<string, unknown>>
  const overviewQuestions = overview.questions as Array<{ id: string }>

  const [answerEntries, indicatorEntries] = await Promise.all([
    Promise.all(
      overviewQuestions.map(async ({ id }) => [
        id,
        await getJson<Record<string, unknown>>(
          `/api/questions/${encodeURIComponent(id)}`,
        ),
      ]),
    ),
    Promise.all(
      indicators.map(async (indicator) => {
        const id = String(indicator.id)
        return [
          id,
          await getJson<Record<string, unknown>>(
            `/api/indicators/${encodeURIComponent(id)}/series?jurisdiction=india`,
          ),
        ]
      }),
    ),
  ])

  const claims = db
    .prepare(
      `SELECT id, title, body, stance, category, confidence, as_of_date,
              leader_term_id, event_id, policy_id
       FROM claims
       WHERE jurisdiction_id = 'india' AND review_status = 'published'
       ORDER BY rowid DESC`,
    )
    .all()

  const snapshot = {
    schemaVersion: 'india-mechanics-sites-v1',
    generatedAt: new Date().toISOString(),
    exportMeta: {
      schemaVersion: exportData.schemaVersion,
      generatedAt: exportData.generatedAt,
      jurisdiction: exportData.jurisdiction,
      progress: exportData.progress,
      questions: exportData.questions,
    },
    overview,
    leaders,
    policies,
    budgets,
    events,
    indicators,
    indicatorSeries: Object.fromEntries(indicatorEntries),
    sources,
    methodology,
    answers: Object.fromEntries(answerEntries),
    claims,
    bills: {
      records: bills,
      facets: billSummary.facets,
      source: billSummary.source,
    },
    meta,
    openapi,
  }

  await mkdir('dist/.openai', { recursive: true })
  await writeFile(
    'dist/api-snapshot.json',
    `${JSON.stringify(snapshot)}\n`,
    'utf8',
  )
  await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json')
  console.log(
    `Wrote Sites API snapshot with ${bills.length} bills to dist/api-snapshot.json`,
  )
} finally {
  db.close()
}
