import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Filter,
  IndianRupee,
  Landmark,
  Scale,
  Search,
  Target,
  WalletCards,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type {
  Budget,
  BudgetPoint,
  Jurisdiction,
  Overview,
} from '../types.ts'
import { sentenceCase } from '../utils.ts'
import {
  ConfidenceMark,
  EditorialLabel,
  SourceLinks,
} from '../components/common.tsx'

const pointMeta: Record<
  BudgetPoint['pointType'],
  { label: string; icon: typeof Target }
> = {
  priority: { label: 'What the government prioritised', icon: Target },
  strength: { label: 'Strengths', icon: CheckCircle2 },
  risk: { label: 'Tradeoffs and risks', icon: CircleAlert },
  context: { label: 'Context and limits', icon: CircleHelp },
}

function formatCrore(value: number | null) {
  if (value === null) return 'Not standardised'
  if (value >= 100000) {
    return `Rs ${(value / 100000).toFixed(value >= 1000000 ? 2 : 1)} lakh cr`
  }
  if (value >= 1000) {
    return `Rs ${(value / 1000).toFixed(value >= 10000 ? 1 : 2)}K cr`
  }
  return `Rs ${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })} cr`
}

export function BudgetsView({
  budgets,
  selectedBudgetId,
  onSelectBudget,
  knowledge,
  jurisdiction,
}: {
  budgets: Budget[]
  selectedBudgetId: string | null
  onSelectBudget: (budgetId: string) => void
  knowledge: Overview['knowledge']
  jurisdiction: Jurisdiction
}) {
  const officeLabel =
    jurisdiction.level === 'country' ? 'Prime Minister' : 'Chief Minister'
  const budgetLabel =
    jurisdiction.level === 'country' ? 'Union Budget' : 'State Budget'
  const [leader, setLeader] = useState('all')
  const [kind, setKind] = useState('all')
  const [decade, setDecade] = useState('all')
  const [query, setQuery] = useState('')
  useEffect(() => {
    setLeader('all')
    setKind('all')
    setDecade('all')
    setQuery('')
  }, [jurisdiction.id])

  const leaderOptions = useMemo(
    () => Array.from(new Set(budgets.map((budget) => budget.leader.name))).sort(),
    [budgets],
  )
  const decadeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          budgets.map((budget) => {
            const year = Number(budget.fiscalYear.slice(0, 4))
            return `${Math.floor(year / 10) * 10}s`
          }),
        ),
      ).sort(),
    [budgets],
  )
  const filtered = budgets
    .filter((budget) => {
      const year = Number(budget.fiscalYear.slice(0, 4))
      const budgetDecade = `${Math.floor(year / 10) * 10}s`
      const haystack =
        `${budget.title} ${budget.shortTitle} ${budget.financeMinister} ${budget.leader.name} ${budget.summary} ${budget.plainLanguage}`.toLowerCase()
      return (
        (leader === 'all' || budget.leader.name === leader) &&
        (kind === 'all' || budget.budgetKind === kind) &&
        (decade === 'all' || budgetDecade === decade) &&
        haystack.includes(query.trim().toLowerCase())
      )
    })
    .sort((left, right) => right.fiscalYear.localeCompare(left.fiscalYear))
  const selected =
    budgets.find((budget) => budget.id === selectedBudgetId) ??
    budgets.find((budget) => budget.status === 'current') ??
    budgets.at(-1)

  const metricRows = selected
    ? [
        {
          label: 'Total expenditure',
          value: formatCrore(selected.totalExpenditureCrore),
          note: selected.totalExpenditureCrore
            ? `${budgetLabel} estimate`
            : 'Historical total not comparable',
        },
        {
          label: 'Capital expenditure',
          value: formatCrore(selected.capitalExpenditureCrore),
          note: 'Assets and investment',
        },
        {
          label: 'Fiscal deficit',
          value:
            selected.fiscalDeficitPctGdp !== null
              ? `${selected.fiscalDeficitPctGdp}% of GDP`
              : formatCrore(selected.fiscalDeficitCrore),
          note:
            selected.fiscalDeficitCrore !== null
              ? formatCrore(selected.fiscalDeficitCrore)
              : 'Not reported in modern form',
        },
      ]
    : []

  return (
    <div className="view budgets-view">
      <header className="view-header">
        <div>
          <span className="freshness-line">
            Budget assessments reviewed {knowledge.editorialReviewedThrough} ·
            current fiscal plan checked {knowledge.politicalStatusChecked}
          </span>
          <h1>What each government chose to fund</h1>
          <p>
            Compare the plan, headline allocations, deficit, tradeoffs, and
            evidence behind landmark {budgetLabel}s in the reviewed period.
          </p>
        </div>
        <div className="view-header__stat">
          <strong>{budgets.length}</strong>
          <span>reviewed budgets</span>
        </div>
      </header>

      <section className="budget-coverage-note">
        <WalletCards size={18} aria-hidden="true" />
        <span>
          <strong>Landmark-budget coverage.</strong>
          Short-lived governments did not always present a full budget. Historical
          Plan and non-Plan categories are preserved instead of being forced into
          modern accounting labels.
        </span>
      </section>

      <section className="budget-current-strip" aria-label={`Current ${budgetLabel}`}>
        {budgets
          .filter((budget) => budget.status === 'current')
          .map((budget) => (
            <button
              type="button"
              key={budget.id}
              onClick={() => onSelectBudget(budget.id)}
              className={selected?.id === budget.id ? 'is-active' : undefined}
            >
              <span className="budget-current-strip__year">
                <CalendarDays size={17} aria-hidden="true" />
                {budget.fiscalYear}
              </span>
              <span>
                <strong>{budget.shortTitle}</strong>
                <small>{budget.plainLanguage}</small>
              </span>
              <span className="budget-current-strip__rating">
                <EditorialLabel />
                <b>{budget.ratingScore}/10</b>
                <ConfidenceMark confidence={budget.ratingConfidence} compact />
              </span>
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          ))}
      </section>

      <section className="filter-bar budget-filter-bar" aria-label="Budget filters">
        <label>
          <Filter size={15} aria-hidden="true" />
          <span>{officeLabel}</span>
          <select value={leader} onChange={(event) => setLeader(event.target.value)}>
            <option value="all">All {officeLabel}s</option>
            {leaderOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Budget type</span>
          <select value={kind} onChange={(event) => setKind(event.target.value)}>
            <option value="all">Full and interim</option>
            <option value="full">Full budgets</option>
            <option value="interim">Interim budgets</option>
          </select>
        </label>
        <label>
          <span>Decade</span>
          <select value={decade} onChange={(event) => setDecade(event.target.value)}>
            <option value="all">All decades</option>
            {decadeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="budget-search-field">
          <Search size={15} aria-hidden="true" />
          <span className="sr-only">Search budgets</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search budgets"
            aria-label="Search budgets"
          />
        </label>
        <span className="filter-bar__result">{filtered.length} shown</span>
      </section>

      <div className="budget-mobile-select">
        <label>
          <span>Budget</span>
          <select
            value={selected?.id}
            onChange={(event) => onSelectBudget(event.target.value)}
          >
            {filtered.map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.fiscalYear} · {budget.shortTitle}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="budget-workspace">
        <div className="budget-list" role="list" aria-label={`Reviewed ${budgetLabel}s`}>
          <div className="budget-list__header" aria-hidden="true">
            <span>Fiscal year</span>
            <span>Budget</span>
            <span>{officeLabel}</span>
            <span>Estimate</span>
            <span />
          </div>
          {filtered.map((budget) => (
            <button
              type="button"
              role="listitem"
              key={budget.id}
              className={`budget-row ${selected?.id === budget.id ? 'is-selected' : ''}`}
              onClick={() => onSelectBudget(budget.id)}
            >
              <span className="budget-row__year">{budget.fiscalYear}</span>
              <span className="budget-row__identity">
                <strong>{budget.shortTitle}</strong>
                <small>
                  {sentenceCase(budget.budgetKind)} · {budget.financeMinister}
                </small>
              </span>
              <span>{budget.leader.name}</span>
              <span className="budget-row__score">
                <strong>{budget.ratingScore}</strong>
                <small>/10</small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>

        {selected && (
          <article className="budget-detail" id="budget-detail">
            <header className="budget-detail__header">
              <div>
                <span className={`budget-status budget-status--${selected.status}`}>
                  {selected.status === 'current'
                    ? 'Current fiscal plan'
                    : sentenceCase(selected.budgetKind)}
                </span>
                <h2>{selected.title}</h2>
                <p>
                  {selected.fiscalYear} · {officeLabel} {selected.leader.name} ·
                  Finance Minister {selected.financeMinister}
                </p>
              </div>
              <div className="budget-detail__rating">
                <EditorialLabel />
                <strong>{selected.ratingScore}</strong>
                <span>/10</span>
                <ConfidenceMark confidence={selected.ratingConfidence} />
              </div>
            </header>

            <p className="budget-detail__summary">{selected.ratingSummary}</p>

            <section className="budget-plain-language">
              <div>
                <CircleHelp size={18} aria-hidden="true" />
                <span>
                  <strong>What was the plan?</strong>
                  <p>{selected.plainLanguage}</p>
                </span>
              </div>
              <small>
                Amounts are nominal crore rupees for that fiscal year. Raw totals
                across decades are not adjusted for inflation or accounting changes.
              </small>
            </section>

            <section className="budget-metrics" aria-label="Budget headline figures">
              {metricRows.map((metric) => (
                <div key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.note}</small>
                </div>
              ))}
            </section>

            <section className="budget-allocations">
              <header>
                <div>
                  <h3>
                    <IndianRupee size={17} aria-hidden="true" />
                    Major allocations
                  </h3>
                  <p>
                    Selected headline allocations, not a claim that these categories
                    add up to total expenditure.
                  </p>
                </div>
              </header>
              <div className="budget-allocation-list">
                {selected.allocations.map((allocation) => (
                  <article key={allocation.id}>
                    <div>
                      <span>{sentenceCase(allocation.category)}</span>
                      <strong>{allocation.label}</strong>
                      <p>{allocation.note}</p>
                    </div>
                    <div className="budget-allocation-list__amount">
                      <strong>{formatCrore(allocation.amountCrore)}</strong>
                      {allocation.changePercent !== null && (
                        <small>
                          {allocation.changePercent > 0 ? '+' : ''}
                          {allocation.changePercent}% vs revised estimate
                        </small>
                      )}
                    </div>
                    <span className="budget-allocation-list__track" aria-hidden="true">
                      <i
                        style={{
                          width: `${Math.max(
                            4,
                            (allocation.amountCrore /
                              Math.max(
                                ...selected.allocations.map(
                                  (item) => item.amountCrore,
                                ),
                              )) *
                              100,
                          )}%`,
                        }}
                      />
                    </span>
                    <SourceLinks sources={[allocation.source]} limit={1} />
                  </article>
                ))}
              </div>
            </section>

            <section className="policy-components budget-components">
              <h3>
                <Scale size={17} aria-hidden="true" />
                Component rating
              </h3>
              {selected.componentScores.map((component) => (
                <div key={component.id} className="component-score">
                  <div className="component-score__heading">
                    <strong>{component.name}</strong>
                    <span>{Math.round(component.weight * 100)}% weight</span>
                    <b>{component.score}/10</b>
                  </div>
                  <div className="component-score__track" aria-hidden="true">
                    <span style={{ width: `${component.score * 10}%` }} />
                  </div>
                  <p>{component.rationale}</p>
                </div>
              ))}
            </section>

            <section className="budget-evidence">
              {(Object.keys(pointMeta) as BudgetPoint['pointType'][]).map(
                (pointType) => {
                  const points = selected.points.filter(
                    (point) => point.pointType === pointType,
                  )
                  if (points.length === 0) return null
                  const meta = pointMeta[pointType]
                  const Icon = meta.icon
                  return (
                    <div
                      key={pointType}
                      className={`budget-evidence-group budget-evidence-group--${pointType}`}
                    >
                      <h3>
                        <Icon size={17} aria-hidden="true" />
                        {meta.label}
                      </h3>
                      {points.map((point) => (
                        <article key={point.id}>
                          <strong>{point.title}</strong>
                          <p>{point.body}</p>
                          <SourceLinks sources={[point.source]} limit={1} />
                        </article>
                      ))}
                    </div>
                  )
                },
              )}
            </section>

            <footer className="budget-detail__sources">
              <h3>
                <Landmark size={17} aria-hidden="true" />
                Budget record sources
              </h3>
              <SourceLinks sources={selected.sources} />
            </footer>
          </article>
        )}
      </section>
    </div>
  )
}
