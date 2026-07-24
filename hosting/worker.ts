import {
  assets as embeddedAssets,
  snapshot as embeddedSnapshot,
} from 'virtual:sites-assets'

type JsonRecord = Record<string, unknown>

type JurisdictionSnapshot = {
  exportMeta: JsonRecord
  overview: JsonRecord
  leaders: JsonRecord[]
  policies: JsonRecord[]
  budgets: JsonRecord[]
  events: JsonRecord[]
  indicators: JsonRecord[]
  indicatorSeries: Record<string, JsonRecord>
  sources: JsonRecord[]
  answers: Record<string, JsonRecord>
  claims: JsonRecord[]
  bills: {
    records: JsonRecord[]
    facets: JsonRecord
    source: JsonRecord
  }
}

type SitesSnapshot = {
  schemaVersion: string
  generatedAt: string
  jurisdictions: JsonRecord[]
  jurisdictionData: Record<string, JurisdictionSnapshot>
  methodology: JsonRecord
  meta: JsonRecord
  openapi: JsonRecord
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60',
      'x-content-type-options': 'nosniff',
      'access-control-allow-origin': '*',
    },
  })
}

function text(value: unknown) {
  return String(value ?? '')
}

function tokens(query: string) {
  return Array.from(
    new Set(
      query
        .toLowerCase()
        .split(/[^\p{L}\p{N}]+/u)
        .map((token) => token.trim())
        .filter((token) => token.length >= 2),
    ),
  )
}

function matchesTokens(values: unknown[], queryTokens: string[]) {
  const haystack = values.map(text).join(' ').toLowerCase()
  return queryTokens.every((token) => haystack.includes(token))
}

function descendingDate(left: JsonRecord, right: JsonRecord) {
  return text(right.date).localeCompare(text(left.date))
}

function search(snapshot: JurisdictionSnapshot, rawQuery: string) {
  const query = rawQuery.trim().toLowerCase()
  const queryTokens = tokens(query)
  if (queryTokens.length === 0) {
    return { query, answer: null, results: [] }
  }

  const answer = Object.values(snapshot.answers).find((candidate) => {
    const aliases = Array.isArray(candidate.aliases) ? candidate.aliases : []
    const haystack = [
      candidate.question,
      candidate.shortAnswer,
      ...aliases,
    ]
      .map(text)
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

  const indicators = snapshot.indicators
    .filter((indicator) =>
      matchesTokens(
        [
          indicator.name,
          indicator.shortName,
          indicator.description,
          indicator.plainLanguage,
          indicator.example,
          indicator.unit,
          indicator.sourceCode,
        ],
        queryTokens,
      ),
    )
    .map((indicator) => ({
      type: 'indicator',
      id: indicator.id,
      title: indicator.name,
      subtitle: indicator.plainLanguage,
      date: `${text(
        (indicator.latest as JsonRecord | null)?.period,
      )}-01-01`,
    }))
    .sort(descendingDate)
    .slice(0, 12)

  const policies = snapshot.policies
    .filter((policy) =>
      matchesTokens(
        [
          policy.title,
          policy.shortTitle,
          policy.summary,
          policy.intendedGoal,
          policy.policyType,
          policy.ratingSummary,
        ],
        queryTokens,
      ),
    )
    .map((policy) => ({
      type: 'policy',
      id: policy.id,
      title: policy.title,
      subtitle: policy.summary,
      date: policy.introducedDate ?? policy.enactedDate ?? '',
    }))
    .sort(descendingDate)
    .slice(0, 12)

  const bills = snapshot.bills.records
    .filter((bill) =>
      matchesTokens(
        [
          bill.title,
          bill.billNumber,
          bill.ministry,
          bill.status,
          bill.actNumber,
          (bill.explanation as JsonRecord | undefined)?.proposalSummary,
          (bill.explanation as JsonRecord | undefined)?.officialPurpose,
          (bill.explanation as JsonRecord | undefined)?.affectedGroups,
          (bill.explanation as JsonRecord | undefined)?.potentialBenefits,
          (bill.explanation as JsonRecord | undefined)?.potentialRisks,
          (bill.assessment as JsonRecord | undefined)?.title,
          (bill.assessment as JsonRecord | undefined)?.summary,
          (bill.assessment as JsonRecord | undefined)?.intendedGoal,
          (bill.assessment as JsonRecord | undefined)?.ratingSummary,
        ],
        queryTokens,
      ),
    )
    .map((bill) => ({
      type: 'bill',
      id: bill.id,
      title: bill.title,
      subtitle: text(
        (bill.explanation as JsonRecord | undefined)?.proposalSummary ??
          `${text(bill.status)}${
            bill.ministry ? ` · ${text(bill.ministry)}` : ''
          }`,
      ),
      date: bill.introducedDate,
      policyId: bill.linkedPolicyId ?? null,
    }))
    .sort(descendingDate)
    .slice(0, 12)

  const budgets = snapshot.budgets
    .filter((budget) =>
      matchesTokens(
        [
          budget.title,
          budget.shortTitle,
          budget.fiscalYear,
          budget.financeMinister,
          budget.summary,
          budget.plainLanguage,
          budget.ratingSummary,
        ],
        queryTokens,
      ),
    )
    .map((budget) => ({
      type: 'budget',
      id: budget.id,
      title: budget.title,
      subtitle: budget.summary,
      date: `${text(budget.fiscalYear).slice(0, 4)}-01-01`,
      budgetId: budget.id,
    }))
    .sort(descendingDate)
    .slice(0, 12)

  const leaders = snapshot.leaders
    .filter((leader) => {
      const person = leader.person as JsonRecord
      return matchesTokens(
        [person.name, leader.ratingSummary, leader.mandateLabel],
        queryTokens,
      )
    })
    .map((leader) => ({
      type: 'leader',
      id: leader.id,
      title: (leader.person as JsonRecord).name,
      subtitle: leader.ratingSummary,
      date: leader.startDate,
    }))
    .sort(descendingDate)
    .slice(0, 12)

  const events = snapshot.events
    .filter((event) =>
      matchesTokens(
        [
          event.title,
          event.summary,
          event.significance,
          event.category,
          event.date,
        ],
        queryTokens,
      ),
    )
    .map((event) => ({
      type: 'event',
      id: event.id,
      title: event.title,
      subtitle: event.summary,
      date: event.date,
    }))
    .sort(descendingDate)
    .slice(0, 12)

  const claims = snapshot.claims
    .filter((claim) =>
      matchesTokens(
        [claim.title, claim.body, claim.category, claim.stance],
        queryTokens,
      ),
    )
    .map((claim) => ({
      type: 'claim',
      id: claim.id,
      title: claim.title,
      subtitle: claim.body,
      date: claim.as_of_date,
      leaderTermId: claim.leader_term_id ?? null,
      eventId: claim.event_id ?? null,
      policyId: claim.policy_id ?? null,
    }))
    .slice(0, 12)

  return {
    query,
    answer: answer ?? null,
    results: [
      ...indicators,
      ...policies,
      ...bills,
      ...budgets,
      ...leaders,
      ...events,
      ...claims,
    ].slice(0, 24),
  }
}

function filteredBills(snapshot: JurisdictionSnapshot, url: URL) {
  const queryTokens = tokens(url.searchParams.get('q') ?? '')
  const status = url.searchParams.get('status')
  const ministry = url.searchParams.get('ministry')
  const leaderTerm = url.searchParams.get('leaderTerm')
  const reviewStatus = url.searchParams.get('reviewStatus')
  const page = Math.max(1, Number(url.searchParams.get('page') ?? 1))
  const pageSize = Math.min(
    100,
    Math.max(1, Number(url.searchParams.get('pageSize') ?? 20)),
  )

  const records = snapshot.bills.records.filter(
    (bill) =>
      (queryTokens.length === 0 ||
        matchesTokens(
          [
            bill.title,
            bill.billNumber,
            bill.ministry,
            bill.status,
            bill.actNumber,
            (bill.explanation as JsonRecord | undefined)?.proposalSummary,
            (bill.explanation as JsonRecord | undefined)?.officialPurpose,
            (bill.explanation as JsonRecord | undefined)?.affectedGroups,
            (bill.explanation as JsonRecord | undefined)?.potentialBenefits,
            (bill.explanation as JsonRecord | undefined)?.potentialRisks,
            (bill.assessment as JsonRecord | undefined)?.title,
            (bill.assessment as JsonRecord | undefined)?.summary,
            (bill.assessment as JsonRecord | undefined)?.intendedGoal,
            (bill.assessment as JsonRecord | undefined)?.ratingSummary,
          ],
          queryTokens,
        )) &&
      (!status || bill.status === status) &&
      (!ministry || bill.ministry === ministry) &&
      (!leaderTerm || bill.leaderTermId === leaderTerm) &&
      (!reviewStatus || bill.reviewStatus === reviewStatus),
  )

  const start = (page - 1) * pageSize
  return {
    page,
    pageSize,
    total: records.length,
    totalPages: Math.max(1, Math.ceil(records.length / pageSize)),
    reviewed: records.filter((bill) => bill.reviewStatus === 'reviewed').length,
    explained: records.length,
    officialOrReviewed: records.filter(
      (bill) =>
        (bill.explanation as JsonRecord | undefined)?.evidenceBasis !==
        'title-only',
    ).length,
    records: records.slice(start, start + pageSize),
    facets: snapshot.bills.facets,
    source: snapshot.bills.source,
  }
}

async function apiResponse(
  request: Request,
): Promise<Response | null> {
  const url = new URL(request.url)
  const path = url.pathname
  if (!path.startsWith('/api/')) return null

  const snapshot = embeddedSnapshot as SitesSnapshot

  if (path === '/api/health') {
    const metadata = snapshot.meta.metadata as JsonRecord
    return json({
      ok: true,
      knowledgeCutoff: metadata.knowledge_cutoff,
      seedVersion: metadata.seed_version,
    })
  }
  if (path === '/api/meta') return json(snapshot.meta)
  if (path === '/api/openapi.json') return json(snapshot.openapi)
  if (path === '/api/jurisdictions') return json(snapshot.jurisdictions)
  if (path === '/api/methodology') return json(snapshot.methodology)

  const jurisdictionId = url.searchParams.get('jurisdiction') ?? 'india'
  const jurisdiction = snapshot.jurisdictionData[jurisdictionId]
  if (!jurisdiction) {
    return json({ error: 'Jurisdiction not found' }, 404)
  }

  if (path === '/api/overview') return json(jurisdiction.overview)
  if (path === '/api/leaders') return json(jurisdiction.leaders)
  if (path.startsWith('/api/leaders/')) {
    const id = decodeURIComponent(path.slice('/api/leaders/'.length))
    const leader = jurisdiction.leaders.find((candidate) => candidate.id === id)
    return leader ? json(leader) : json({ error: 'Leader not found' }, 404)
  }
  if (path === '/api/policies') return json(jurisdiction.policies)
  if (path.startsWith('/api/policies/')) {
    const id = decodeURIComponent(path.slice('/api/policies/'.length))
    const policy = jurisdiction.policies.find((candidate) => candidate.id === id)
    return policy ? json(policy) : json({ error: 'Policy not found' }, 404)
  }
  if (path === '/api/budgets') return json(jurisdiction.budgets)
  if (path === '/api/events') {
    const category = url.searchParams.get('category')
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')
    const leaderTerm = url.searchParams.get('leaderTerm')
    const party = url.searchParams.get('party')
    return json(
      jurisdiction.events.filter((event) => {
        const governments = Array.isArray(event.governments)
          ? (event.governments as JsonRecord[])
          : []
        return (
          (!category || event.category === category) &&
          (!from || text(event.date) >= from) &&
          (!to || text(event.date) <= to) &&
          (!leaderTerm ||
            (leaderTerm === 'unmapped'
              ? governments.length === 0
              : governments.some(
                  (government) => text(government.termId) === leaderTerm,
                ))) &&
          (!party ||
            governments.some(
              (government) =>
                text((government.party as JsonRecord | null)?.id) === party,
            ))
        )
      }),
    )
  }
  if (path === '/api/indicators') return json(jurisdiction.indicators)
  if (
    path.startsWith('/api/indicators/') &&
    path.endsWith('/series')
  ) {
    const id = decodeURIComponent(
      path.slice('/api/indicators/'.length, -'/series'.length),
    )
    const series = jurisdiction.indicatorSeries[id]
    return series ? json(series) : json({ error: 'Indicator not found' }, 404)
  }
  if (path === '/api/sources') return json(jurisdiction.sources)
  if (path.startsWith('/api/questions/')) {
    const id = decodeURIComponent(path.slice('/api/questions/'.length))
    const answer =
      jurisdiction.answers[id] ??
      Object.values(snapshot.jurisdictionData)
        .map((candidate) => candidate.answers[id])
        .find(Boolean)
    return answer ? json(answer) : json({ error: 'Answer not found' }, 404)
  }
  if (path === '/api/search') {
    return json(search(jurisdiction, url.searchParams.get('q') ?? ''))
  }
  if (path === '/api/bills') {
    return json(filteredBills(jurisdiction, url))
  }
  if (path.startsWith('/api/bills/')) {
    const id = decodeURIComponent(path.slice('/api/bills/'.length))
    const bill = jurisdiction.bills.records.find((candidate) => candidate.id === id)
    return bill
      ? json({ ...bill, source: jurisdiction.bills.source })
      : json({ error: 'Bill not found' }, 404)
  }
  if (path === '/api/export') {
    return json({
      ...jurisdiction.exportMeta,
      leaders: jurisdiction.leaders,
      policies: jurisdiction.policies,
      budgets: jurisdiction.budgets,
      events: jurisdiction.events,
      indicators: jurisdiction.indicators,
      bills: jurisdiction.bills.records,
      sources: jurisdiction.sources,
      methodology: snapshot.methodology,
    })
  }

  return json({ error: 'API route not found' }, 404)
}

const worker = {
  async fetch(request: Request): Promise<Response> {
    try {
      const api = await apiResponse(request)
      if (api) return api

      const url = new URL(request.url)
      const directPath = url.pathname === '/' ? '/index.html' : url.pathname
      const directAsset = embeddedAssets[directPath]
      if (directAsset) {
        return new Response(directAsset.body, {
          status: 200,
          headers: {
            'content-type': directAsset.contentType,
            'cache-control':
              directPath === '/index.html'
                ? 'public, max-age=60'
                : 'public, max-age=31536000, immutable',
          },
        })
      }
      if (request.method !== 'GET') {
        return new Response('Not found', { status: 404 })
      }

      const accept = request.headers.get('accept') ?? ''
      if (!accept.includes('text/html')) {
        return new Response('Not found', { status: 404 })
      }

      const index = embeddedAssets['/index.html']
      return new Response(index.body, {
        status: 200,
        headers: {
          'content-type': index.contentType,
          'cache-control': 'public, max-age=60',
        },
      })
    } catch (error) {
      return json(
        {
          error: 'Sites runtime error',
          detail: error instanceof Error ? error.message : String(error),
        },
        500,
      )
    }
  },
}

export default worker
