import type { ViewId } from './types.ts'

export type PolicyViewMode = 'reviews' | 'register'

export type NavigationState = {
  jurisdictionId: string
  view: ViewId
  answerId: string | null
  termId: string
  eventId: string | null
  policyId: string
  billId: string | null
  policyMode: PolicyViewMode
  budgetId: string
  indicatorId: string
  showEditorial: boolean
}

export const defaultNavigation: NavigationState = {
  jurisdictionId: 'india',
  view: 'overview',
  answerId: null,
  termId: 'modi-2014',
  eventId: null,
  policyId: 'economic-reforms-1991',
  billId: null,
  policyMode: 'reviews',
  budgetId: 'budget-2026-27-capex-consolidation',
  indicatorId: 'life-expectancy',
  showEditorial: false,
}

const viewIds = new Set<ViewId>([
  'overview',
  'timeline',
  'leaders',
  'policies',
  'budgets',
  'safety',
  'indicators',
  'sources',
])

function optionalParam(params: URLSearchParams, key: string) {
  const value = params.get(key)?.trim()
  return value || null
}

function inferredView(params: URLSearchParams): ViewId {
  const explicit = optionalParam(params, 'view')
  if (explicit && viewIds.has(explicit as ViewId)) return explicit as ViewId
  if (params.has('event')) return 'timeline'
  if (params.has('term')) return 'leaders'
  if (params.has('policy') || params.has('bill') || params.has('mode')) {
    return 'policies'
  }
  if (params.has('budget')) return 'budgets'
  if (params.has('indicator')) return 'indicators'
  return 'overview'
}

export function parseNavigation(input: string | URL): NavigationState {
  const url = typeof input === 'string' ? new URL(input, 'http://localhost') : input
  const params = url.searchParams
  const billId = optionalParam(params, 'bill')
  const requestedMode = optionalParam(params, 'mode')

  return {
    jurisdictionId:
      optionalParam(params, 'jurisdiction') ??
      defaultNavigation.jurisdictionId,
    view: inferredView(params),
    answerId: optionalParam(params, 'answer'),
    termId: optionalParam(params, 'term') ?? defaultNavigation.termId,
    eventId: optionalParam(params, 'event'),
    policyId: optionalParam(params, 'policy') ?? defaultNavigation.policyId,
    billId,
    policyMode:
      requestedMode === 'register' || billId ? 'register' : 'reviews',
    budgetId: optionalParam(params, 'budget') ?? defaultNavigation.budgetId,
    indicatorId:
      optionalParam(params, 'indicator') ?? defaultNavigation.indicatorId,
    showEditorial: optionalParam(params, 'layer') === 'editorial',
  }
}

export function navigationHref(
  state: NavigationState,
  currentLocation: string | URL,
) {
  const current =
    typeof currentLocation === 'string'
      ? new URL(currentLocation, 'http://localhost')
      : currentLocation
  const params = new URLSearchParams()

  if (state.jurisdictionId !== defaultNavigation.jurisdictionId) {
    params.set('jurisdiction', state.jurisdictionId)
  }
  if (state.view !== 'overview') params.set('view', state.view)

  if (state.view === 'overview' && state.answerId) {
    params.set('answer', state.answerId)
  }
  if (state.view === 'timeline' && state.eventId) {
    params.set('event', state.eventId)
  }
  if (state.view === 'leaders' && state.termId) {
    params.set('term', state.termId)
  }
  if (state.view === 'policies') {
    if (state.policyMode === 'register') {
      params.set('mode', 'register')
      if (state.billId) params.set('bill', state.billId)
    } else {
      if (state.policyId) params.set('policy', state.policyId)
    }
  }
  if (state.view === 'budgets') {
    if (state.budgetId) params.set('budget', state.budgetId)
  }
  if (state.view === 'indicators') {
    if (state.indicatorId) params.set('indicator', state.indicatorId)
  }
  if (state.showEditorial) params.set('layer', 'editorial')

  const search = params.toString()
  return `${current.pathname}${search ? `?${search}` : ''}`
}
