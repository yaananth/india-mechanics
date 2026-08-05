import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

type SitesWorker = {
  fetch(request: Request): Promise<Response>
}

const canonicalOrigin = 'https://india-mechanics.artfiesco.chatgpt.site'
const workerUrl = pathToFileURL(resolve('dist/server/index.js'))
workerUrl.searchParams.set('verify', String(Date.now()))
const worker = (
  (await import(workerUrl.href)) as { default: SitesWorker }
).default

async function fetchText(path: string, init?: RequestInit) {
  const response = await worker.fetch(
    new Request(new URL(path, canonicalOrigin), init),
  )
  return {
    response,
    body: await response.text(),
  }
}

const leaderPath = '/?view=leaders&term=modi-2014'
const leaderHtml = await fetchText(leaderPath, {
  headers: { accept: 'text/html' },
})
assert.equal(leaderHtml.response.status, 200)
assert.match(
  leaderHtml.response.headers.get('content-type') ?? '',
  /^text\/html/,
)
assert.match(leaderHtml.body, /<h1>Narendra Modi/)
assert.match(leaderHtml.body, /Development and economy/)
assert.match(leaderHtml.body, /Sources/)
assert.match(leaderHtml.body, /application\/ld\+json/)
assert.match(leaderHtml.body, /rel="canonical"/)
assert.match(leaderHtml.body, /api\/llm\/leaders\/modi-2014/)
assert.ok(Buffer.byteLength(leaderHtml.body) > 5_000)
assert.ok(Buffer.byteLength(leaderHtml.body) < 100_000)

const compact = await fetchText('/api/llm/leaders/modi-2014')
assert.equal(compact.response.status, 200)
assert.match(
  compact.response.headers.get('content-type') ?? '',
  /^application\/json/,
)
assert.ok(Buffer.byteLength(compact.body) < 50_000)
const compactData = JSON.parse(compact.body) as {
  documentType: string
  assessment: { categories: unknown[] }
  publication: { knowledgeCutoff: string | null }
  sources: Array<{ url: string }>
}
assert.equal(compactData.documentType, 'leader-term-scorecard')
assert.equal(compactData.assessment.categories.length, 6)
assert.ok(compactData.publication.knowledgeCutoff)
assert.ok(compactData.sources.some((source) => source.url.startsWith('https://')))

const markdown = await fetchText(
  '/api/llm/leaders/modi-2014?format=markdown',
)
assert.equal(markdown.response.status, 200)
assert.match(
  markdown.response.headers.get('content-type') ?? '',
  /^text\/markdown/,
)
assert.match(markdown.body, /^# Narendra Modi/m)
assert.match(markdown.body, /^## Scorecard/m)
assert.match(markdown.body, /^## Sources/m)

const missing = await fetchText('/?view=leaders&term=not-a-real-term', {
  headers: { accept: 'text/html' },
})
assert.equal(missing.response.status, 404)
assert.equal(missing.response.headers.get('x-robots-tag'), 'noindex')

const robots = await fetchText('/robots.txt')
assert.equal(robots.response.status, 200)
assert.match(robots.body, /^User-agent: \*/m)
assert.match(robots.body, new RegExp(`${canonicalOrigin}/sitemap\\.xml`))
assert.doesNotMatch(
  robots.response.headers.get('cache-control') ?? '',
  /immutable/,
)

const sitemap = await fetchText('/sitemap.xml')
assert.equal(sitemap.response.status, 200)
assert.match(
  sitemap.response.headers.get('content-type') ?? '',
  /application\/xml/,
)
const snapshot = JSON.parse(
  await readFile('dist/api-snapshot.json', 'utf8'),
) as {
  jurisdictionData: Record<
    string,
    { leaders: Array<{ id: string }> }
  >
}
const leaderIds = Object.values(snapshot.jurisdictionData).flatMap(
  (jurisdiction) => jurisdiction.leaders.map((leader) => leader.id),
)
for (const termId of leaderIds) {
  assert.match(sitemap.body, new RegExp(`term=${termId}(?:&amp;|<)`))
}

console.log(
  `Verified crawler HTML, compact JSON/Markdown, robots, and sitemap for ${leaderIds.length} leader terms.`,
)
