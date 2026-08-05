import {
  AlertTriangle,
  ArrowRight,
  CircleHelp,
  Gavel,
  Landmark,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { api } from '../api.ts'
import type {
  IndicatorDefinition,
  IndicatorSeries,
  Jurisdiction,
  LeaderTerm,
  Overview,
  TimelineEvent,
} from '../types.ts'
import { formatValue, formatYear } from '../utils.ts'
import {
  ConfidenceMark,
  LoadingState,
  SourceLinks,
} from '../components/common.tsx'
import { useEditorialLayer } from '../editorial-layer-context.ts'

type SafetyGroupId = 'harm' | 'reporting' | 'cyber' | 'justice'

const safetyGroups: Array<{
  id: SafetyGroupId
  label: string
  description: string
  suffixes: string[]
}> = [
  {
    id: 'harm',
    label: 'Serious harm',
    description:
      'Murder and violent crime are the strongest available police-data harm signals.',
    suffixes: ['murder-rate', 'violent-rate'],
  },
  {
    id: 'reporting',
    label: 'Reported safety',
    description:
      'Total, women, and child case rates move with victimization and reporting or registration access.',
    suffixes: [
      'ipc-rate',
      'women-registered-rate',
      'children-registered-rate',
    ],
  },
  {
    id: 'cyber',
    label: 'Cybercrime',
    description:
      'Digital exposure, reporting portals, police classification, investigation, and offending all affect this series.',
    suffixes: [
      'cyber-registered-rate',
      'cyber-registered-count',
      'cyber-conviction-rate',
    ],
  },
  {
    id: 'justice',
    label: 'Investigation & justice',
    description:
      'Charge-sheeting, conviction, and pendency answer different questions and must not be collapsed into one success rate.',
    suffixes: [
      'ipc-chargesheet-rate',
      'ipc-conviction-rate',
      'women-conviction-rate',
      'children-conviction-rate',
    ],
  },
]

function safetyId(jurisdiction: Jurisdiction, suffix: string) {
  const statePrefixes: Record<string, string> = {
    'andhra-pradesh': 'ap-',
    'tamil-nadu': 'tn-',
    telangana: 'ts-',
  }
  const prefix =
    jurisdiction.level === 'country'
      ? ''
      : (statePrefixes[jurisdiction.id] ?? `${jurisdiction.id}-`)
  return `${prefix}crime-${suffix}`
}

function latestValue(
  indicators: IndicatorDefinition[],
  jurisdiction: Jurisdiction,
  suffix: string,
) {
  return indicators.find((item) => item.id === safetyId(jurisdiction, suffix))
    ?.latest
}

export function SafetyView({
  indicators,
  leaders,
  events,
  knowledge,
  jurisdiction,
  onOpenIndicator,
  onOpenLeader,
  onOpenEvent,
}: {
  indicators: IndicatorDefinition[]
  leaders: LeaderTerm[]
  events: TimelineEvent[]
  knowledge: Overview['knowledge']
  jurisdiction: Jurisdiction
  onOpenIndicator: (indicatorId: string) => void
  onOpenLeader: (termId: string) => void
  onOpenEvent: (eventId: string) => void
}) {
  const { showEditorial } = useEditorialLayer()
  const [groupId, setGroupId] = useState<SafetyGroupId>('harm')
  const availableGroupIds = useMemo(
    () =>
      new Set(
        safetyGroups
          .filter((candidate) =>
            candidate.suffixes.some((suffix) =>
              indicators.some(
                (item) =>
                  item.id === safetyId(jurisdiction, suffix) && item.latest,
              ),
            ),
          )
          .map((candidate) => candidate.id),
      ),
    [indicators, jurisdiction],
  )
  const group =
    safetyGroups.find(
      (candidate) =>
        candidate.id === groupId && availableGroupIds.has(candidate.id),
    ) ??
    safetyGroups.find((candidate) => availableGroupIds.has(candidate.id)) ??
    safetyGroups[0]
  const groupIndicators = useMemo(
    () =>
      group.suffixes
        .map((suffix) =>
          indicators.find((item) => item.id === safetyId(jurisdiction, suffix)),
        )
        .filter(
          (item): item is IndicatorDefinition => Boolean(item?.latest),
        ),
    [group.suffixes, indicators, jurisdiction],
  )
  const [selectedId, setSelectedId] = useState('')
  const [series, setSeries] = useState<IndicatorSeries | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const next = groupIndicators[0]?.id
    if (!next) {
      setSelectedId('')
      return
    }
    if (!groupIndicators.some((item) => item.id === selectedId)) {
      setSelectedId(next)
    }
  }, [groupIndicators, selectedId])

  useEffect(() => {
    if (!selectedId) {
      setSeries(null)
      setError(null)
      setLoading(false)
      return
    }
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    api
      .indicatorSeries(selectedId, jurisdiction.id, controller.signal)
      .then(setSeries)
      .catch((reason: Error) => {
        if (reason.name !== 'AbortError') setError(reason.message)
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [jurisdiction.id, selectedId])

  const safetyAssessments = leaders.flatMap((leader) =>
    leader.specialistAssessments
      .filter((assessment) => assessment.topicId === 'public-safety')
      .map((assessment) => ({ leader, assessment })),
  )
  const currentTerm = leaders.find((leader) => !leader.endDate) ?? null
  const currentAssessment = currentTerm
    ? safetyAssessments.find(({ leader }) => leader.id === currentTerm.id)
    : null
  const recentSignals = events
    .filter((event) =>
      ['public-safety', 'cybercrime', 'justice-reform'].includes(event.category),
    )
    .slice(0, 4)
  const latest = series?.observations.at(-1)
  const murder = latestValue(indicators, jurisdiction, 'murder-rate')
  const violent = latestValue(indicators, jurisdiction, 'violent-rate')
  const latestSafetyPeriod = Math.max(
    0,
    ...indicators
      .filter((indicator) => indicator.id.includes('crime-'))
      .map((indicator) => indicator.latest?.period ?? 0),
  )
  const officeLabel =
    jurisdiction.level === 'country' ? 'Prime Minister' : 'Chief Minister'

  return (
    <div className="view safety-view">
      <header className="view-header">
        <div>
          <span className="freshness-line">
            Reviewed public-safety data through{' '}
            {latestSafetyPeriod || 'the latest available period'} · reviewed{' '}
            {knowledge.editorialReviewedThrough}
          </span>
          <h1>Crime and safety, without hiding reporting effects</h1>
          <p>
            Serious harm, registered complaints, police investigation, court
            outcomes, and current news signals are shown separately so one number
            cannot disguise the rest.
          </p>
        </div>
        <div className="view-header__stat">
          <strong>{latestSafetyPeriod || '—'}</strong>
          <span>latest published safety observation</span>
        </div>
      </header>

      <section className="safety-overview">
        <div className="safety-overview__headline">
          <span className="section-label">Latest comparable record</span>
          <h2>
            {showEditorial
              ? jurisdiction.level === 'country'
                ? 'National direction is mixed'
                : `${jurisdiction.shortName} harm and justice signals need separate reading`
              : `${jurisdiction.shortName} recorded harm and justice measures`}
          </h2>
          <p>
            {showEditorial
              ? jurisdiction.level === 'country'
                ? 'Editorial assessment: the registered murder rate improved, violent crime rose and then levelled, and reporting-sensitive categories increased while cyber and justice outcomes remained uneven.'
                : `Editorial assessment: recorded harm, reporting-sensitive categories, investigation, convictions, cybercrime, and road safety are shown separately for ${jurisdiction.shortName}. A low FIR rate or high charge-sheeting rate is not treated as proof that people are safer.`
              : `Murder, violent crime, reporting-sensitive registrations, investigation, convictions, cybercrime, and road safety are presented as separate measurements for ${jurisdiction.shortName}.`}
          </p>
        </div>
        <div className="safety-overview__stats">
          <div>
            <span>Murder rate</span>
            <strong>
              {murder
                ? formatValue(murder.value, 'number', 'per lakh')
                : '—'}
            </strong>
            <small>registered cases per lakh · {murder?.period ?? '—'}</small>
          </div>
          <div>
            <span>Violent-crime rate</span>
            <strong>
              {violent
                ? formatValue(violent.value, 'number', 'per lakh')
                : '—'}
            </strong>
            <small>registered cases per lakh · {violent?.period ?? '—'}</small>
          </div>
        </div>
        <div className="safety-responsibility">
          <ShieldCheck size={20} aria-hidden="true" />
          <span>
            <strong>
              {jurisdiction.level === 'country'
                ? 'Union responsibility is real but bounded'
                : 'The state carries primary policing responsibility'}
            </strong>
            <p>
              {jurisdiction.level === 'country'
                ? 'States own police and public order. The Union owns national criminal law, CCTNS and ICJS, I4C, interstate coordination, central agencies, and national standards.'
                : 'The CM government and state police own prevention, FIR registration, investigation, prosecution coordination, and police administration; courts, Union law and platforms, local bodies, and social conditions share the result.'}
            </p>
          </span>
        </div>
      </section>

      <section className="safety-caution">
        <AlertTriangle size={20} aria-hidden="true" />
        <div>
          <strong>More registered crime does not automatically mean less safety</strong>
          <p>
            NCRB warns that e-FIRs, women help desks, awareness, access to police,
            legal change, and recording practice can increase reported cases. Murder
            and violent crime are generally less sensitive to reporting access;
            reporting-sensitive categories require separate interpretation.
          </p>
        </div>
        <span>
          {latestSafetyPeriod >= 2024
            ? `Latest reviewed safety observation: ${latestSafetyPeriod}`
            : '2024 page checked: no downloadable comparable records'}
        </span>
      </section>

      <section className="safety-data-section">
        <div
          className="safety-tabs"
          role="tablist"
          aria-label="Safety evidence groups"
        >
          {safetyGroups.map((item) => (
            <button
              type="button"
              role="tab"
              aria-selected={item.id === group.id}
              className={item.id === group.id ? 'is-active' : undefined}
              key={item.id}
              disabled={!availableGroupIds.has(item.id)}
              onClick={() => setGroupId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="safety-group-intro">
          <strong>{group.label}</strong>
          <p>{group.description}</p>
        </div>
        <div
          className="safety-metric-picker"
          aria-label={`${group.label} metrics`}
        >
          {groupIndicators.map((indicator) => (
            <button
              type="button"
              key={indicator.id}
              className={indicator.id === selectedId ? 'is-active' : undefined}
              onClick={() => setSelectedId(indicator.id)}
            >
              <span>{indicator.shortName}</span>
              <strong>
                {indicator.latest
                  ? formatValue(
                      indicator.latest.value,
                      indicator.format,
                      indicator.unit,
                    )
                  : '—'}
              </strong>
            </button>
          ))}
        </div>

        {loading && <LoadingState label="Loading safety series" />}
        {error && (
          <div className="error-state">
            <strong>Could not load this safety series.</strong>
            <span>{error}</span>
          </div>
        )}
        {series && !loading && (
          <div className="safety-series-layout">
            <div className="safety-chart-panel">
              <header>
                <div>
                  <span className="section-label">
                    {series.definition.dimensionName}
                  </span>
                  <h2>{series.definition.name}</h2>
                </div>
                {latest && (
                  <span className="safety-chart-panel__latest">
                    <strong>
                      {formatValue(
                        latest.value,
                        series.definition.format,
                        series.definition.unit,
                      )}
                    </strong>
                    <small>{latest.period}</small>
                  </span>
                )}
              </header>
              <div className="safety-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={series.observations}
                    margin={{ top: 12, right: 16, left: 4, bottom: 4 }}
                  >
                    <CartesianGrid stroke="#e5e2dc" vertical={false} />
                    <XAxis
                      dataKey="period"
                      tick={{ fontSize: 10, fill: '#6d6a65' }}
                      axisLine={{ stroke: '#d5d0c8' }}
                      tickLine={false}
                    />
                    <YAxis
                      width={52}
                      tick={{ fontSize: 10, fill: '#6d6a65' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value) =>
                        formatValue(
                          Number(value),
                          series.definition.format,
                          series.definition.unit,
                        )
                      }
                      labelFormatter={(value) => `Year ${value}`}
                    />
                    <Line
                      dataKey="value"
                      type="monotone"
                      stroke="#b94f2d"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#b94f2d' }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <footer>
                {showEditorial && (
                  <span>
                    Editorial direction:{' '}
                    {series.definition.direction === 'neutral'
                      ? 'no automatic good or bad direction'
                      : `${series.definition.direction === 'lower' ? 'lower' : 'higher'} is generally better, with reporting caveats`}
                  </span>
                )}
                <button
                  type="button"
                  className="text-command"
                  onClick={() => onOpenIndicator(series.definition.id)}
                >
                  Open full indicator
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </footer>
            </div>
            <aside className="safety-explainer">
              <CircleHelp size={20} aria-hidden="true" />
              <span>
                <strong>What does this mean?</strong>
                <p>{series.definition.plainLanguage}</p>
              </span>
              <div>
                <small>Clear example</small>
                <p>{series.definition.example}</p>
              </div>
              <div>
                <small>Attribution</small>
                <p>{series.attributionCaveat}</p>
              </div>
              <SourceLinks sources={[series.source]} />
            </aside>
          </div>
        )}
      </section>

      {showEditorial && <section className="safety-assessment-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              Editorial {officeLabel} specialist rating effect
            </span>
            <h2>Same public-safety rubric, bounded constitutional attribution</h2>
            <p>
              These specialist scores inform the shared crisis and execution
              rationales. They are not added as a second full rating.
            </p>
          </div>
          <Scale size={22} aria-hidden="true" />
        </div>
        <div className="safety-assessment-grid">
          {safetyAssessments.map(({ leader, assessment }) => (
            <article key={assessment.id} className="safety-assessment-card">
              <header>
                <span>
                  <strong>{leader.person.name}</strong>
                  <small>
                    {formatYear(leader.startDate)}–{formatYear(leader.endDate)}
                  </small>
                </span>
                <ConfidenceMark confidence={assessment.confidence} compact />
              </header>
              <div className="safety-assessment-card__scores">
                <span>
                  <small>{assessment.operationalLabel}</small>
                  <b>{assessment.operationalScore.toFixed(1)}</b>
                </span>
                <span>
                  <small>{assessment.adjustedLabel}</small>
                  <b>{assessment.adjustedScore.toFixed(1)}</b>
                </span>
              </div>
              <p>{assessment.summary}</p>
              <div className="safety-component-list">
                {assessment.componentScores.map((component) => (
                  <div key={component.id}>
                    <span>{component.name}</span>
                    <i aria-hidden="true">
                      <b style={{ width: `${component.score * 10}%` }} />
                    </i>
                    <strong>{component.score.toFixed(1)}</strong>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="text-command"
                onClick={() => onOpenLeader(leader.id)}
              >
                Open full {officeLabel} assessment
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </article>
          ))}
          {currentTerm && !currentAssessment && (
            <article className="safety-assessment-card safety-assessment-card--gap">
              <header>
                <span>
                  <strong>{currentTerm.person.name}</strong>
                  <small>
                    {formatYear(currentTerm.startDate)}–Present
                  </small>
                </span>
                <Landmark size={18} aria-hidden="true" />
              </header>
              <Gavel size={26} aria-hidden="true" />
              <h3>Not yet rateable</h3>
              <p>
                The available comparable public-safety series is not complete
                enough to support a numerical specialist score for this term.
                Current police and news signals remain visible below.
              </p>
            </article>
          )}
        </div>
      </section>}

      <section className="safety-recent-signals">
        <div className="section-heading">
          <div>
            <span className="section-label">Web-search and news layer</span>
            <h2>Recent signals, separated from comparable rates</h2>
            <p>
              Official releases, police reviews, court developments, and
              independently corroborated reporting can update the present without
              being mistaken for an annual crime rate.
            </p>
          </div>
        </div>
        <div className="safety-signal-grid">
          {recentSignals.map((event) => (
            <button
              type="button"
              key={event.id}
              onClick={() => onOpenEvent(event.id)}
            >
              <span>
                {formatYear(event.date)} · {event.category.replace(/-/g, ' ')}
              </span>
              <strong>{event.title}</strong>
              <p>{event.summary}</p>
              <small>
                {event.confidence} confidence ·{' '}
                {showEditorial ? 'open editorial accountability' : 'open event record'}
              </small>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
