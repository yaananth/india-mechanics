import type {
  CuratedAnswer,
  Budget,
  BillRecord,
  BillRegisterResponse,
  IndicatorDefinition,
  IndicatorSeries,
  LeaderTerm,
  Methodology,
  Overview,
  Policy,
  SearchResponse,
  Source,
  TimelineEvent,
} from './types.ts'

async function apiFetch<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(path, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${path}`)
  }
  return response.json() as Promise<T>
}

export const api = {
  overview: (signal?: AbortSignal) =>
    apiFetch<Overview>('/api/overview?jurisdiction=india', signal),
  leaders: (signal?: AbortSignal) =>
    apiFetch<LeaderTerm[]>('/api/leaders?jurisdiction=india', signal),
  policies: (signal?: AbortSignal) =>
    apiFetch<Policy[]>('/api/policies?jurisdiction=india', signal),
  budgets: (signal?: AbortSignal) =>
    apiFetch<Budget[]>('/api/budgets?jurisdiction=india', signal),
  bills: (
    filters: {
      query?: string
      status?: string
      ministry?: string
      leaderTermId?: string
      reviewStatus?: string
      page?: number
      pageSize?: number
    } = {},
    signal?: AbortSignal,
  ) => {
    const params = new URLSearchParams({ jurisdiction: 'india' })
    if (filters.query) params.set('q', filters.query)
    if (filters.status) params.set('status', filters.status)
    if (filters.ministry) params.set('ministry', filters.ministry)
    if (filters.leaderTermId) {
      params.set('leaderTerm', filters.leaderTermId)
    }
    if (filters.reviewStatus) {
      params.set('reviewStatus', filters.reviewStatus)
    }
    if (filters.page) params.set('page', String(filters.page))
    if (filters.pageSize) params.set('pageSize', String(filters.pageSize))
    return apiFetch<BillRegisterResponse>(`/api/bills?${params}`, signal)
  },
  bill: (billId: string, signal?: AbortSignal) =>
    apiFetch<BillRecord & { source: Source }>(
      `/api/bills/${encodeURIComponent(billId)}?jurisdiction=india`,
      signal,
    ),
  events: (signal?: AbortSignal) =>
    apiFetch<TimelineEvent[]>('/api/events?jurisdiction=india', signal),
  indicators: (signal?: AbortSignal) =>
    apiFetch<IndicatorDefinition[]>(
      '/api/indicators?jurisdiction=india',
      signal,
    ),
  indicatorSeries: (indicatorId: string, signal?: AbortSignal) =>
    apiFetch<IndicatorSeries>(
      `/api/indicators/${encodeURIComponent(indicatorId)}/series?jurisdiction=india`,
      signal,
    ),
  sources: (signal?: AbortSignal) =>
    apiFetch<Source[]>('/api/sources', signal),
  methodology: (signal?: AbortSignal) =>
    apiFetch<Methodology>('/api/methodology', signal),
  answer: (answerId: string, signal?: AbortSignal) =>
    apiFetch<CuratedAnswer>(
      `/api/questions/${encodeURIComponent(answerId)}`,
      signal,
    ),
  search: (query: string, signal?: AbortSignal) =>
    apiFetch<SearchResponse>(
      `/api/search?jurisdiction=india&q=${encodeURIComponent(query)}`,
      signal,
    ),
}
