import type {
  CuratedAnswer,
  Budget,
  BillRecord,
  BillRegisterResponse,
  IndicatorDefinition,
  IndicatorSeries,
  Jurisdiction,
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
  jurisdictions: (signal?: AbortSignal) =>
    apiFetch<Jurisdiction[]>('/api/jurisdictions', signal),
  overview: (jurisdictionId: string, signal?: AbortSignal) =>
    apiFetch<Overview>(
      `/api/overview?jurisdiction=${encodeURIComponent(jurisdictionId)}`,
      signal,
    ),
  leaders: (jurisdictionId: string, signal?: AbortSignal) =>
    apiFetch<LeaderTerm[]>(
      `/api/leaders?jurisdiction=${encodeURIComponent(jurisdictionId)}`,
      signal,
    ),
  policies: (jurisdictionId: string, signal?: AbortSignal) =>
    apiFetch<Policy[]>(
      `/api/policies?jurisdiction=${encodeURIComponent(jurisdictionId)}`,
      signal,
    ),
  budgets: (jurisdictionId: string, signal?: AbortSignal) =>
    apiFetch<Budget[]>(
      `/api/budgets?jurisdiction=${encodeURIComponent(jurisdictionId)}`,
      signal,
    ),
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
    jurisdictionId = 'india',
    signal?: AbortSignal,
  ) => {
    const params = new URLSearchParams({ jurisdiction: jurisdictionId })
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
  bill: (
    billId: string,
    jurisdictionId = 'india',
    signal?: AbortSignal,
  ) =>
    apiFetch<BillRecord & { source: Source }>(
      `/api/bills/${encodeURIComponent(billId)}?jurisdiction=${encodeURIComponent(jurisdictionId)}`,
      signal,
    ),
  events: (jurisdictionId: string, signal?: AbortSignal) =>
    apiFetch<TimelineEvent[]>(
      `/api/events?jurisdiction=${encodeURIComponent(jurisdictionId)}`,
      signal,
    ),
  indicators: (jurisdictionId: string, signal?: AbortSignal) =>
    apiFetch<IndicatorDefinition[]>(
      `/api/indicators?jurisdiction=${encodeURIComponent(jurisdictionId)}`,
      signal,
    ),
  indicatorSeries: (
    indicatorId: string,
    jurisdictionId: string,
    signal?: AbortSignal,
  ) =>
    apiFetch<IndicatorSeries>(
      `/api/indicators/${encodeURIComponent(indicatorId)}/series?jurisdiction=${encodeURIComponent(jurisdictionId)}`,
      signal,
    ),
  sources: (jurisdictionId: string, signal?: AbortSignal) =>
    apiFetch<Source[]>(
      `/api/sources?jurisdiction=${encodeURIComponent(jurisdictionId)}`,
      signal,
    ),
  methodology: (signal?: AbortSignal) =>
    apiFetch<Methodology>('/api/methodology', signal),
  answer: (answerId: string, signal?: AbortSignal) =>
    apiFetch<CuratedAnswer>(
      `/api/questions/${encodeURIComponent(answerId)}`,
      signal,
    ),
  search: (
    query: string,
    jurisdictionId: string,
    signal?: AbortSignal,
  ) =>
    apiFetch<SearchResponse>(
      `/api/search?jurisdiction=${encodeURIComponent(jurisdictionId)}&q=${encodeURIComponent(query)}`,
      signal,
    ),
}
