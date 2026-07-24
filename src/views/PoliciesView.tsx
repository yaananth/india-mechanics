import {
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Filter,
  Globe2,
  Route,
  Scale,
  ScrollText,
  Search,
  Target,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Jurisdiction, Overview, Policy } from '../types.ts'
import { formatDate, sentenceCase } from '../utils.ts'
import {
  ConfidenceMark,
  EditorialLabel,
  SourceLinks,
} from '../components/common.tsx'
import { BillRegisterPanel } from '../components/BillRegisterPanel.tsx'

const stanceMeta = {
  achievement: { label: 'Benefits and strengths', icon: CheckCircle2 },
  concern: { label: 'Costs and risks', icon: CircleAlert },
  context: { label: 'Context and evidence gaps', icon: CircleHelp },
  mixed: { label: 'Mixed evidence', icon: Scale },
}

const taxPolicyIds = [
  'income-tax-act-1961',
  'modvat-1986',
  'tax-rationalisation-1991',
  'service-tax-1994',
  'state-vat-2005',
  'gst-2017',
  'corporate-tax-cut-2019',
  'personal-tax-regime-2020',
  'faceless-tax-administration-2020',
  'income-tax-act-2025',
  'gst-rate-reset-2025',
] as const

const taxScope: Record<(typeof taxPolicyIds)[number], string> = {
  'income-tax-act-1961': 'Direct-tax foundation',
  'modvat-1986': 'Manufacturing input credits',
  'tax-rationalisation-1991': 'Lower rates and broader bases',
  'service-tax-1994': 'Services enter the tax base',
  'state-vat-2005': 'State sales-tax replacement',
  'gst-2017': 'Union-state common market',
  'corporate-tax-cut-2019': 'Lower company-tax options',
  'personal-tax-regime-2020': 'Lower slabs, fewer deductions',
  'faceless-tax-administration-2020': 'Digital assessment and appeals',
  'income-tax-act-2025': 'Replacement direct-tax code',
  'gst-rate-reset-2025': 'Fewer principal GST slabs',
}

const taxMilestoneYear: Record<(typeof taxPolicyIds)[number], string> = {
  'income-tax-act-1961': '1961',
  'modvat-1986': '1986',
  'tax-rationalisation-1991': '1991',
  'service-tax-1994': '1994',
  'state-vat-2005': '2005',
  'gst-2017': '2017',
  'corporate-tax-cut-2019': '2019',
  'personal-tax-regime-2020': '2020',
  'faceless-tax-administration-2020': '2020',
  'income-tax-act-2025': '2025/26',
  'gst-rate-reset-2025': '2025',
}

const roadPolicyIds = [
  'national-highway-expansion-2014',
  'bharatmala-phase-1-2017',
  'pmgsy-iii-2019',
  'ap-rural-road-connectivity-2016',
] as const

export function PoliciesView({
  policies,
  selectedPolicyId,
  onSelectPolicy,
  mode,
  onModeChange,
  selectedBillId,
  onSelectBill,
  knowledge,
  jurisdiction,
  allowBillRegister,
}: {
  policies: Policy[]
  selectedPolicyId: string | null
  onSelectPolicy: (policyId: string) => void
  mode: 'reviews' | 'register'
  onModeChange: (mode: 'reviews' | 'register') => void
  selectedBillId: string | null
  onSelectBill: (billId: string | null) => void
  knowledge: Overview['knowledge']
  jurisdiction: Jurisdiction
  allowBillRegister: boolean
}) {
  const officeLabel =
    jurisdiction.level === 'country' ? 'Prime Minister' : 'Chief Minister'
  const effectiveMode = allowBillRegister ? mode : 'reviews'
  const [leader, setLeader] = useState('all')
  const [policyType, setPolicyType] = useState('all')
  const [status, setStatus] = useState('all')
  const [query, setQuery] = useState('')
  useEffect(() => {
    setLeader('all')
    setPolicyType('all')
    setStatus('all')
    setQuery('')
  }, [jurisdiction.id])
  const leaderOptions = useMemo(
    () => Array.from(new Set(policies.map((policy) => policy.leader.name))).sort(),
    [policies],
  )
  const typeOptions = useMemo(
    () => Array.from(new Set(policies.map((policy) => policy.policyType))).sort(),
    [policies],
  )
  const filtered = policies.filter((policy) => {
    const haystack =
      `${policy.title} ${policy.shortTitle} ${policy.summary} ${policy.intendedGoal}`.toLowerCase()
    return (
      (leader === 'all' || policy.leader.name === leader) &&
      (policyType === 'all' || policy.policyType === policyType) &&
      (status === 'all' || policy.status === status) &&
      haystack.includes(query.trim().toLowerCase())
    )
  })
  const selected =
    policies.find((policy) => policy.id === selectedPolicyId) ??
    policies.find((policy) => policy.id === 'economic-reforms-1991') ??
    policies.at(-1)
  const taxFamily = taxPolicyIds.flatMap((policyId) => {
    const policy = policies.find((candidate) => candidate.id === policyId)
    return policy ? [policy] : []
  })
  const roadFamily = roadPolicyIds.flatMap((policyId) => {
    const policy = policies.find((candidate) => candidate.id === policyId)
    return policy ? [policy] : []
  })
  const tradeFamily = policies.filter(
    (policy) => policy.policyType === 'trade-agreement',
  )

  return (
    <div className="view policies-view">
      <header className="view-header">
        <div>
          <span className="freshness-line">
            Policy assessments reviewed {knowledge.editorialReviewedThrough}
            {allowBillRegister
              ? ` · official bill register refreshed ${knowledge.billRegisterAsOfDate}`
              : ''}
          </span>
          <h1>Policies, judged on design and outcomes</h1>
          <p>
            Every score separates the problem a policy targeted, evidence that it
            worked, implementation quality, rights and inclusion, and long-run
            side effects.
          </p>
        </div>
        <div className="view-header__stat">
          <strong>{policies.length}</strong>
          <span>rated policy assessments</span>
        </div>
      </header>

      <section className="policy-coverage-note">
        <ScrollText size={18} aria-hidden="true" />
        <span>
          <strong>Coverage is expanding.</strong>
          Ratings cover high-impact policies.
          {allowBillRegister
            ? ' The official register preserves discovered government Bills separately; unreviewed does not mean good or bad.'
            : ' State legislation is added only after a source-backed design and outcome review.'}
        </span>
      </section>

      {allowBillRegister && (
        <div className="policy-mode-switch" role="tablist" aria-label="Policy data view">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'reviews'}
          className={mode === 'reviews' ? 'is-active' : undefined}
          onClick={() => onModeChange('reviews')}
        >
          Reviewed ratings
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'register'}
          className={mode === 'register' ? 'is-active' : undefined}
          onClick={() => onModeChange('register')}
        >
          Official bill register
        </button>
        </div>
      )}

      {effectiveMode === 'register' ? (
        <BillRegisterPanel
          selectedBillId={selectedBillId}
          onSelectBill={onSelectBill}
          onOpenPolicy={(policyId) => {
            onSelectPolicy(policyId)
            onModeChange('reviews')
          }}
        />
      ) : (
        <>
      {roadFamily.length > 0 && (
        <section className="development-policy-family" aria-label="Road infrastructure policies">
        <div className="section-heading">
          <div>
            <span className="section-label">Roads and connectivity</span>
            <h2>What expanded, and what it cost</h2>
            <p>
              Network growth, corridor delivery, and rural access are separated
              from declarations, inherited work, debt, maintenance, and safety.
            </p>
          </div>
          <Route size={22} aria-hidden="true" />
        </div>
        <div className="development-policy-family__grid">
          {roadFamily.map((policy) => (
            <button
              type="button"
              key={policy.id}
              className={selected?.id === policy.id ? 'is-active' : undefined}
              onClick={() => onSelectPolicy(policy.id)}
            >
              <span>
                <small>{policy.introducedDate?.slice(0, 4)}</small>
                <strong>{policy.shortTitle}</strong>
                <em>{policy.ratingSummary}</em>
              </span>
              <b>{policy.ratingScore}/10</b>
            </button>
          ))}
        </div>
        </section>
      )}

      {tradeFamily.length > 0 && (
        <section className="trade-agreement-family" aria-label="Trade agreements">
          <div className="section-heading">
            <div>
              <span className="section-label">Trade agreement strategy</span>
              <h2>Signed, operating, or still only designed</h2>
              <p>
                Agreements in force receive outcome review where evidence exists.
                Newly effective and unsigned texts keep effectiveness unscored.
              </p>
            </div>
            <Globe2 size={22} aria-hidden="true" />
          </div>
          <div className="trade-agreement-family__grid">
            {tradeFamily.map((policy) => (
              <button
                type="button"
                key={policy.id}
                className={selected?.id === policy.id ? 'is-active' : undefined}
                onClick={() => onSelectPolicy(policy.id)}
              >
                <span className={`policy-status policy-status--${policy.status}`}>
                  {sentenceCase(policy.status)}
                </span>
                <strong>{policy.shortTitle}</strong>
                <small>
                  {policy.effectiveDate
                    ? `In force ${formatDate(policy.effectiveDate)}`
                    : `Reviewed ${formatDate(policy.assessmentAsOf)}`}
                </small>
                <b>{policy.ratingScore}/10</b>
                <em>
                  {policy.ratingBasis === 'design'
                    ? 'Design only'
                    : sentenceCase(policy.ratingConfidence)}
                </em>
              </button>
            ))}
          </div>
        </section>
      )}

      {taxFamily.length > 0 && (
        <section className="tax-evolution" aria-label="Tax reform evolution">
        <div className="section-heading">
          <div>
            <span className="section-label">Tax reform evolution</span>
            <h2>How India’s tax system changed</h2>
            <p>
              Eleven structural milestones show what changed, who governed when it
              changed, and how the evidence-based rating evolved. Annual slab and
              rate updates remain in the Budget record.
            </p>
          </div>
        </div>

        <div className="tax-current-state" aria-label="Current tax framework">
          <div>
            <small>Direct-tax code</small>
            <strong>2025 Act</strong>
            <span>In force since 1 Apr 2026</span>
          </div>
          <div>
            <small>Personal income tax</small>
            <strong>New regime is default</strong>
            <span>Eligible taxpayers may opt for the old regime</span>
          </div>
          <div>
            <small>Broad indirect tax</small>
            <strong>GST with 2025 rate reset</strong>
            <span>Most revised rates apply since 22 Sep 2025</span>
          </div>
        </div>

        <div className="tax-evolution__track">
          {taxFamily.map((policy) => (
            <button
              type="button"
              key={policy.id}
              className={selected?.id === policy.id ? 'is-active' : undefined}
              onClick={() => onSelectPolicy(policy.id)}
            >
              <span className="tax-policy-year">
                {taxMilestoneYear[policy.id as (typeof taxPolicyIds)[number]]}
              </span>
              <span className="tax-policy-identity">
                <strong>{policy.shortTitle}</strong>
                <small>
                  {taxScope[policy.id as (typeof taxPolicyIds)[number]]}
                  {' · '}
                  {policy.leader.name}
                </small>
              </span>
              <span className="tax-policy-score">
                <b>{policy.ratingScore}/10</b>
                <small>
                  {policy.ratingBasis === 'design'
                    ? 'Design only'
                    : sentenceCase(policy.ratingConfidence)}
                </small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="tax-evolution__note">
          Ratings judge each reform against its own objective. They are not a
          claim that the {officeLabel} alone caused every observed tax outcome.
        </p>
        </section>
      )}

      <section className="filter-bar policy-filter-bar" aria-label="Policy filters">
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
          <span>Policy type</span>
          <select
            value={policyType}
            onChange={(event) => setPolicyType(event.target.value)}
          >
            <option value="all">All types</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {sentenceCase(type)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="enacted">Enacted</option>
            <option value="pending">Pending</option>
            <option value="repealed">Repealed</option>
            <option value="executive-action">Executive action</option>
          </select>
        </label>
        <label className="policy-search-field">
          <Search size={15} aria-hidden="true" />
          <span className="sr-only">Search policies</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search policies"
            aria-label="Search policies"
          />
        </label>
        <span className="filter-bar__result">{filtered.length} shown</span>
      </section>

      <section className="policy-workspace">
        <div className="policy-list" role="list" aria-label="Reviewed policies">
          <div className="policy-list__header" aria-hidden="true">
            <span>Policy</span>
            <span>PM</span>
            <span>Status</span>
            <span>Estimate</span>
            <span />
          </div>
          {[...filtered].reverse().map((policy) => (
            <button
              type="button"
              role="listitem"
              key={policy.id}
              className={`policy-row ${selected?.id === policy.id ? 'is-selected' : ''}`}
              onClick={() => onSelectPolicy(policy.id)}
            >
              <span className="policy-row__identity">
                <strong>{policy.shortTitle}</strong>
                <small>
                  {(policy.introducedDate ?? policy.enactedDate)?.slice(0, 4)} ·{' '}
                  {sentenceCase(policy.policyType)}
                </small>
              </span>
              <span>{policy.leader.name}</span>
              <span className={`policy-status policy-status--${policy.status}`}>
                {sentenceCase(policy.status)}
              </span>
              <span className="policy-row__score">
                <strong>{policy.ratingScore}</strong>
                <small>/10</small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>

        {selected && (
          <article className="policy-detail" id="policy-detail">
            <header className="policy-detail__header">
              <div>
                <span className={`policy-status policy-status--${selected.status}`}>
                  {sentenceCase(selected.status)}
                </span>
                <h2>{selected.title}</h2>
                <p>
                  {selected.leader.name}
                  {selected.introducedDate
                    ? ` · introduced ${formatDate(selected.introducedDate)}`
                    : ''}
                  {selected.enactedDate
                    ? ` · enacted ${formatDate(selected.enactedDate)}`
                    : ''}
                </p>
                <small className="policy-rating-basis">
                  {selected.ratingBasis === 'design'
                    ? 'Provisional design rating; outcomes are not yet observable'
                    : 'Retrospective rating using available outcome evidence'}
                  {' · '}
                  assessed {formatDate(selected.assessmentAsOf)}
                </small>
              </div>
              <div className="policy-detail__rating">
                <EditorialLabel />
                <strong>{selected.ratingScore}</strong>
                <span>/10</span>
                <ConfidenceMark confidence={selected.ratingConfidence} />
              </div>
            </header>

            <p className="policy-detail__summary">{selected.ratingSummary}</p>
            <dl className="policy-purpose">
              <div>
                <dt>
                  <Target size={15} aria-hidden="true" />
                  Intended goal
                </dt>
                <dd>{selected.intendedGoal}</dd>
              </div>
              <div>
                <dt>
                  <ScrollText size={15} aria-hidden="true" />
                  What it does
                </dt>
                <dd>{selected.summary}</dd>
              </div>
            </dl>

            <section className="policy-components">
              <h3>
                <Scale size={17} aria-hidden="true" />
                Component rating
              </h3>
              {selected.componentScores.map((component) => (
                <div key={component.id} className="component-score">
                  <div className="component-score__heading">
                    <strong>{component.name}</strong>
                    <span>{Math.round(component.weight * 100)}% weight</span>
                    <b>
                      {component.score === null ? 'Not observed' : `${component.score}/10`}
                    </b>
                  </div>
                  <div className="component-score__track" aria-hidden="true">
                    <span
                      style={{
                        width:
                          component.score === null ? '0%' : `${component.score * 10}%`,
                      }}
                    />
                  </div>
                  <p>{component.rationale}</p>
                </div>
              ))}
            </section>

            <section className="policy-evidence">
              <h3>Evidence for and against</h3>
              {(Object.keys(stanceMeta) as Array<keyof typeof stanceMeta>).map(
                (stance) => {
                  const matching = selected.claims.filter(
                    (claim) => claim.stance === stance,
                  )
                  if (matching.length === 0) return null
                  const meta = stanceMeta[stance]
                  const Icon = meta.icon
                  return (
                    <div
                      key={stance}
                      className={`policy-evidence-group policy-evidence-group--${stance}`}
                    >
                      <h4>
                        <Icon size={16} aria-hidden="true" />
                        {meta.label}
                      </h4>
                      {matching.map((claim) => (
                        <article
                          key={claim.id}
                          className={
                            claim.category === 'evidence-gap'
                              ? 'is-evidence-gap'
                              : undefined
                          }
                        >
                          <strong>{claim.title}</strong>
                          <p>{claim.body}</p>
                          <SourceLinks sources={claim.sources} limit={3} />
                        </article>
                      ))}
                    </div>
                  )
                },
              )}
            </section>

            <footer className="policy-detail__sources">
              <h3>Policy record sources</h3>
              <SourceLinks sources={selected.sources} />
            </footer>
          </article>
        )}
      </section>
        </>
      )}
    </div>
  )
}
