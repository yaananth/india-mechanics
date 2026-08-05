import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { api } from './api.ts'
import type { AiDiscussionContext } from './ai-discussion.ts'
import { AiDiscussionDialog } from './components/AiDiscussionDialog.tsx'
import { AppShell } from './components/AppShell.tsx'
import { ErrorState, LoadingState } from './components/common.tsx'
import { MethodologyDialog } from './components/MethodologyDialog.tsx'
import { SearchDialog } from './components/SearchDialog.tsx'
import {
  defaultNavigation,
  navigationHref,
  parseNavigation,
  type NavigationState,
  type PolicyViewMode,
} from './navigation.ts'
import type {
  Budget,
  CuratedAnswer,
  IndicatorDefinition,
  Jurisdiction,
  LeaderTerm,
  Methodology,
  Overview,
  Policy,
  SearchResponse,
  Source,
  TimelineEvent,
  ViewId,
} from './types.ts'
import { IndicatorsView } from './views/IndicatorsView.tsx'
import { LeadersView } from './views/LeadersView.tsx'
import { OverviewView } from './views/OverviewView.tsx'
import { PoliciesView } from './views/PoliciesView.tsx'
import { BudgetsView } from './views/BudgetsView.tsx'
import { SafetyView } from './views/SafetyView.tsx'
import { SourcesView } from './views/SourcesView.tsx'
import { TimelineView } from './views/TimelineView.tsx'
import { EditorialLayerProvider } from './editorial-layer.tsx'

type AppData = {
  jurisdictions: Jurisdiction[]
  overview: Overview
  leaders: LeaderTerm[]
  policies: Policy[]
  budgets: Budget[]
  events: TimelineEvent[]
  indicators: IndicatorDefinition[]
  sources: Source[]
  methodology: Methodology
}

function aiDiscussionContext(
  data: AppData,
  navigation: NavigationState,
  selectedAnswer: CuratedAnswer,
): AiDiscussionContext {
  const jurisdiction = data.overview.jurisdiction
  const apiUrl = (path: string) =>
    new URL(path, window.location.origin).toString()
  const pageUrl = new URL(
    navigationHref(navigation, window.location.href),
    window.location.origin,
  ).toString()
  let topicLabel = `${jurisdiction.shortName} overview`
  let evidenceLinks: AiDiscussionContext['evidenceLinks'] = []

  if (navigation.view === 'overview') {
    topicLabel = selectedAnswer.question
    evidenceLinks = [
      {
        label: 'Selected question and claims',
        url: apiUrl(
          `/api/questions/${encodeURIComponent(selectedAnswer.id)}`,
        ),
      },
      {
        label: 'Jurisdiction overview',
        url: apiUrl(
          `/api/overview?jurisdiction=${encodeURIComponent(jurisdiction.id)}`,
        ),
      },
    ]
  } else if (navigation.view === 'timeline') {
    const event = data.events.find(
      (candidate) => candidate.id === navigation.eventId,
    )
    topicLabel = event?.title ?? `${jurisdiction.shortName} timeline`
    evidenceLinks = [
      {
        label: 'Timeline records',
        url: apiUrl(
          `/api/events?jurisdiction=${encodeURIComponent(jurisdiction.id)}`,
        ),
      },
    ]
  } else if (navigation.view === 'leaders') {
    const leader = data.leaders.find(
      (candidate) => candidate.id === navigation.termId,
    )
    topicLabel = leader
      ? `${leader.person.name}, ${leader.office.shortName} term`
      : `${jurisdiction.shortName} leader terms`
    evidenceLinks = [
      {
        label: 'Compact leader scorecard',
        url: apiUrl(
          `/api/llm/leaders/${encodeURIComponent(navigation.termId)}${
            navigation.showEditorial ? '?layer=editorial' : ''
          }`,
        ),
      },
    ]
  } else if (navigation.view === 'policies') {
    if (navigation.policyMode === 'register' && navigation.billId) {
      topicLabel = `Parliamentary bill ${navigation.billId}`
      evidenceLinks = [
        {
          label: 'Bill record and explanation',
          url: apiUrl(
            `/api/bills/${encodeURIComponent(navigation.billId)}?jurisdiction=${encodeURIComponent(jurisdiction.id)}`,
          ),
        },
      ]
    } else {
      const policy = data.policies.find(
        (candidate) => candidate.id === navigation.policyId,
      )
      topicLabel = policy?.title ?? `${jurisdiction.shortName} policies`
      evidenceLinks = [
        {
          label: 'Policy evidence record',
          url: apiUrl(
            `/api/policies/${encodeURIComponent(navigation.policyId)}?jurisdiction=${encodeURIComponent(jurisdiction.id)}`,
          ),
        },
      ]
    }
  } else if (navigation.view === 'budgets') {
    const budget = data.budgets.find(
      (candidate) => candidate.id === navigation.budgetId,
    )
    topicLabel = budget?.title ?? `${jurisdiction.shortName} budgets`
    evidenceLinks = [
      {
        label: 'Budget evidence record',
        url: apiUrl(
          `/api/budgets/${encodeURIComponent(navigation.budgetId)}?jurisdiction=${encodeURIComponent(jurisdiction.id)}`,
        ),
      },
    ]
  } else if (navigation.view === 'safety') {
    topicLabel = `${jurisdiction.shortName} crime, public safety, and justice`
    evidenceLinks = [
      {
        label: 'Safety indicator definitions',
        url: apiUrl(
          `/api/indicators?jurisdiction=${encodeURIComponent(jurisdiction.id)}`,
        ),
      },
      {
        label: 'Current and historical safety events',
        url: apiUrl(
          `/api/events?jurisdiction=${encodeURIComponent(jurisdiction.id)}`,
        ),
      },
    ]
  } else if (navigation.view === 'indicators') {
    const indicator = data.indicators.find(
      (candidate) => candidate.id === navigation.indicatorId,
    )
    topicLabel = indicator?.name ?? `${jurisdiction.shortName} indicator`
    evidenceLinks = [
      {
        label: 'Indicator series and term comparisons',
        url: apiUrl(
          `/api/indicators/${encodeURIComponent(navigation.indicatorId)}/series?jurisdiction=${encodeURIComponent(jurisdiction.id)}`,
        ),
      },
    ]
  } else if (navigation.view === 'sources') {
    topicLabel = `${jurisdiction.shortName} source quality and evidence`
  }

  evidenceLinks.push({
    label: 'Jurisdiction source ledger',
    url: apiUrl(
      `/api/sources?jurisdiction=${encodeURIComponent(jurisdiction.id)}`,
    ),
  })
  evidenceLinks = evidenceLinks.filter(
    (link, index, all) =>
      all.findIndex((candidate) => candidate.url === link.url) === index,
  )

  return {
    pageUrl,
    jurisdictionName: jurisdiction.name,
    topicLabel,
    knowledgeCutoff: data.overview.knowledge.cutoff,
    editorialReviewedThrough:
      data.overview.knowledge.editorialReviewedThrough,
    methodologyVersion: data.methodology.version,
    displayLayer: navigation.showEditorial
      ? 'editorial-analysis'
      : 'facts-and-sources',
    evidenceLinks,
    defaultQuestion: navigation.showEditorial
      ? `What does the published evidence show about ${topicLabel}? Explain achievements, concerns, attribution, uncertainty, and what evidence would change the conclusion.`
      : `Summarize the verified records about ${topicLabel}. Separate measured facts from mixed sourced claims, identify source disagreements and limitations, and explain attribution and evidence gaps without adding a verdict.`,
  }
}

function App() {
  const [data, setData] = useState<AppData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [navigation, setNavigation] = useState<NavigationState>(() =>
    parseNavigation(window.location.href),
  )
  const [searchOpen, setSearchOpen] = useState(false)
  const [methodologyOpen, setMethodologyOpen] = useState(false)
  const [aiDiscussionOpen, setAiDiscussionOpen] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<CuratedAnswer | null>(null)

  const updateNavigation = useCallback(
    (
      patch: Partial<NavigationState>,
      options: { replace?: boolean } = {},
    ) => {
      setNavigation((current) => {
        const next = { ...current, ...patch }
        const href = navigationHref(next, window.location.href)
        const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`
        if (href !== currentHref) {
          window.history[options.replace ? 'replaceState' : 'pushState'](
            null,
            '',
            href,
          )
        }
        return next
      })
    },
    [],
  )

  const load = useCallback(async () => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    try {
      const [
        jurisdictions,
        overview,
        leaders,
        policies,
        budgets,
        events,
        indicators,
        sources,
        methodology,
      ] =
        await Promise.all([
          api.jurisdictions(controller.signal),
          api.overview(navigation.jurisdictionId, controller.signal),
          api.leaders(navigation.jurisdictionId, controller.signal),
          api.policies(navigation.jurisdictionId, controller.signal),
          api.budgets(navigation.jurisdictionId, controller.signal),
          api.events(navigation.jurisdictionId, controller.signal),
          api.indicators(navigation.jurisdictionId, controller.signal),
          api.sources(navigation.jurisdictionId, controller.signal),
          api.methodology(controller.signal),
        ])
      setData({
        jurisdictions,
        overview,
        leaders,
        policies,
        budgets,
        events,
        indicators,
        sources,
        methodology,
      })
      setSelectedAnswer(overview.featuredAnswer)
    } catch (reason) {
      if ((reason as Error).name !== 'AbortError') {
        setError((reason as Error).message)
      }
    } finally {
      setLoading(false)
    }
    return () => controller.abort()
  }, [navigation.jurisdictionId])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    const handlePopState = () => {
      setNavigation(parseNavigation(window.location.href))
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (!data) return
    const patch: Partial<NavigationState> = {}
    if (
      navigation.answerId &&
      !data.overview.questions.some(
        (question) => question.id === navigation.answerId,
      )
    ) {
      patch.answerId = null
    }
    if (!data.leaders.some((leader) => leader.id === navigation.termId)) {
      patch.termId = data.overview.currentTerm.id
    }
    if (
      navigation.eventId &&
      !data.events.some((event) => event.id === navigation.eventId)
    ) {
      patch.eventId = null
    }
    if (!data.policies.some((policy) => policy.id === navigation.policyId)) {
      patch.policyId =
        data.policies.find(
          (policy) => policy.id === defaultNavigation.policyId,
        )?.id ??
        data.overview.featuredPolicy.id
    }
    if (!data.budgets.some((budget) => budget.id === navigation.budgetId)) {
      patch.budgetId =
        data.budgets.find((budget) => budget.status === 'current')?.id ??
        data.budgets.at(-1)?.id ??
        defaultNavigation.budgetId
    }
    if (
      !data.indicators.some(
        (indicator) => indicator.id === navigation.indicatorId,
      )
    ) {
      patch.indicatorId =
        data.indicators.find(
          (indicator) => indicator.id === defaultNavigation.indicatorId,
        )?.id ??
        data.indicators[0]?.id ??
        defaultNavigation.indicatorId
    }
    if (Object.keys(patch).length > 0) {
      updateNavigation(patch, { replace: true })
    }
  }, [data, navigation, updateNavigation])

  useEffect(() => {
    if (!data) return
    if (!navigation.answerId) {
      setSelectedAnswer(data.overview.featuredAnswer)
      return
    }
    if (selectedAnswer?.id === navigation.answerId) return

    const controller = new AbortController()
    api
      .answer(navigation.answerId, controller.signal)
      .then(setSelectedAnswer)
      .catch((reason: Error) => {
        if (reason.name !== 'AbortError') {
          setSelectedAnswer(data.overview.featuredAnswer)
        }
      })
    return () => controller.abort()
  }, [data, navigation.answerId, selectedAnswer?.id])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      if (event.key === '/' && !isTyping) {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const selectLeader = (termId: string) => {
    updateNavigation({ view: 'leaders', termId })
  }

  const handleSearchResult = (item: SearchResponse['results'][number]) => {
    if (item.type === 'leader') {
      selectLeader(item.id)
      return
    }
    if (item.type === 'event') {
      updateNavigation({ view: 'timeline', eventId: item.id })
      return
    }
    if (item.type === 'policy') {
      updateNavigation({
        view: 'policies',
        policyId: item.id,
        policyMode: 'reviews',
      })
      return
    }
    if (item.type === 'bill') {
      updateNavigation({
        view: 'policies',
        billId: item.id,
        policyMode: 'register',
      })
      return
    }
    if (item.type === 'budget') {
      updateNavigation({ view: 'budgets', budgetId: item.id })
      return
    }
    if (item.type === 'indicator') {
      updateNavigation({ view: 'indicators', indicatorId: item.id })
      return
    }
    if (item.policyId) {
      updateNavigation({
        view: 'policies',
        policyId: item.policyId,
        policyMode: 'reviews',
      })
      return
    }
    if (item.leaderTermId) {
      selectLeader(item.leaderTermId)
      return
    }
    if (item.eventId) {
      updateNavigation({ view: 'timeline', eventId: item.eventId })
      return
    }
    updateNavigation({ view: 'sources' })
  }

  const handleViewChange = (view: ViewId) => {
    updateNavigation({ view })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleJurisdictionChange = (jurisdictionId: string) => {
    if (jurisdictionId === navigation.jurisdictionId) return
    setData(null)
    setSelectedAnswer(null)
    updateNavigation({
      jurisdictionId,
      answerId: null,
      termId: '',
      eventId: null,
      policyId: '',
      billId: null,
      policyMode: 'reviews',
      budgetId: '',
      indicatorId: '',
    })
  }

  const handlePolicyModeChange = (policyMode: PolicyViewMode) => {
    updateNavigation({ policyMode })
  }

  const handleBillSelect = useCallback(
    (billId: string | null, options?: { replace?: boolean }) => {
      updateNavigation(
        { billId, policyMode: 'register' },
        { replace: options?.replace },
      )
    },
    [updateNavigation],
  )

  if (loading && !data) {
    return (
      <div className="boot-state">
        <span className="brand__mark" aria-hidden="true">
          IM
        </span>
        <LoadingState label="Loading India Mechanics" />
      </div>
    )
  }

  if (error || !data || !selectedAnswer) {
    return (
      <div className="boot-state">
        <ErrorState
          message={error ?? 'The evidence could not be loaded completely.'}
          retry={() => void load()}
        />
      </div>
    )
  }

  const discussionContext = aiDiscussionContext(
    data,
    navigation,
    selectedAnswer,
  )

  return (
    <EditorialLayerProvider showEditorial={navigation.showEditorial}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <AppShell
        activeView={navigation.view}
        onViewChange={handleViewChange}
        jurisdictions={data.jurisdictions}
        jurisdiction={data.overview.jurisdiction}
        onJurisdictionChange={handleJurisdictionChange}
        onSearchOpen={() => setSearchOpen(true)}
        onMethodologyOpen={() => setMethodologyOpen(true)}
        onAiDiscussionOpen={() => setAiDiscussionOpen(true)}
        showEditorial={navigation.showEditorial}
        onEditorialChange={(showEditorial) =>
          updateNavigation({ showEditorial })
        }
        knowledge={data.overview.knowledge}
      >
        {navigation.view === 'overview' && (
          <OverviewView
            key={data.overview.jurisdiction.id}
            overview={data.overview}
            leaders={data.leaders}
            answer={selectedAnswer}
            onAnswerSelect={(answerId) =>
              updateNavigation({ answerId })
            }
            onViewChange={handleViewChange}
            onLeaderSelect={selectLeader}
            onMethodologyOpen={() => setMethodologyOpen(true)}
          />
        )}
        {navigation.view === 'timeline' && (
          <TimelineView
            key={data.overview.jurisdiction.id}
            events={data.events}
            selectedEventId={navigation.eventId}
            onSelectEvent={(eventId) => updateNavigation({ eventId })}
            onOpenPolicy={(policyId) =>
              updateNavigation({
                view: 'policies',
                policyId,
                policyMode: 'reviews',
              })
            }
            onOpenIndicator={(indicatorId) =>
              updateNavigation({ view: 'indicators', indicatorId })
            }
            knowledge={data.overview.knowledge}
            jurisdiction={data.overview.jurisdiction}
          />
        )}
        {navigation.view === 'leaders' && (
          <LeadersView
            key={data.overview.jurisdiction.id}
            leaders={data.leaders}
            selectedTermId={navigation.termId}
            onSelectTerm={(termId) => updateNavigation({ termId })}
            knowledge={data.overview.knowledge}
          />
        )}
        {navigation.view === 'policies' && (
          <PoliciesView
            key={data.overview.jurisdiction.id}
            policies={data.policies}
            selectedPolicyId={navigation.policyId}
            onSelectPolicy={(policyId) =>
              updateNavigation({ policyId, policyMode: 'reviews' })
            }
            mode={navigation.policyMode}
            onModeChange={handlePolicyModeChange}
            selectedBillId={navigation.billId}
            onSelectBill={handleBillSelect}
            knowledge={data.overview.knowledge}
            jurisdiction={data.overview.jurisdiction}
            allowBillRegister={data.overview.jurisdiction.level === 'country'}
          />
        )}
        {navigation.view === 'budgets' && (
          <BudgetsView
            key={data.overview.jurisdiction.id}
            budgets={data.budgets}
            selectedBudgetId={navigation.budgetId}
            onSelectBudget={(budgetId) => updateNavigation({ budgetId })}
            knowledge={data.overview.knowledge}
            jurisdiction={data.overview.jurisdiction}
          />
        )}
        {navigation.view === 'safety' && (
          <SafetyView
            key={data.overview.jurisdiction.id}
            indicators={data.indicators}
            leaders={data.leaders}
            events={data.events}
            knowledge={data.overview.knowledge}
            jurisdiction={data.overview.jurisdiction}
            onOpenIndicator={(indicatorId) =>
              updateNavigation({ view: 'indicators', indicatorId })
            }
            onOpenLeader={selectLeader}
            onOpenEvent={(eventId) =>
              updateNavigation({ view: 'timeline', eventId })
            }
          />
        )}
        {navigation.view === 'indicators' && (
          <IndicatorsView
            key={data.overview.jurisdiction.id}
            indicators={data.indicators}
            selectedIndicatorId={navigation.indicatorId}
            onSelectIndicator={(indicatorId) =>
              updateNavigation({ indicatorId })
            }
            onSelectLeaderTerm={selectLeader}
            knowledge={data.overview.knowledge}
            jurisdiction={data.overview.jurisdiction}
          />
        )}
        {navigation.view === 'sources' && (
          <SourcesView
            key={data.overview.jurisdiction.id}
            sources={data.sources}
            onMethodologyOpen={() => setMethodologyOpen(true)}
            knowledge={data.overview.knowledge}
            jurisdiction={data.overview.jurisdiction}
          />
        )}
      </AppShell>
      <SearchDialog
        open={searchOpen}
        jurisdictionId={navigation.jurisdictionId}
        jurisdictionName={data.overview.jurisdiction.shortName}
        sampleQuestions={data.overview.questions.map(
          (question) => question.question,
        )}
        onClose={() => setSearchOpen(false)}
        onSelectAnswer={(answer) => {
          setSelectedAnswer(answer)
          updateNavigation({ view: 'overview', answerId: answer.id })
        }}
        onSelectResult={handleSearchResult}
      />
      <MethodologyDialog
        open={methodologyOpen}
        methodology={data.methodology}
        onClose={() => setMethodologyOpen(false)}
      />
      <AiDiscussionDialog
        open={aiDiscussionOpen}
        context={discussionContext}
        onClose={() => setAiDiscussionOpen(false)}
      />
    </EditorialLayerProvider>
  )
}

export default App
