import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  ChevronRight,
  Gauge,
  Scale,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type {
  CuratedAnswer,
  LeaderTerm,
  Overview,
  ViewId,
} from '../types.ts'
import { useEditorialLayer } from '../editorial-layer-context.ts'
import { formatYear } from '../utils.ts'
import { AnswerPanel } from '../components/AnswerPanel.tsx'
import {
  ConfidenceMark,
  SourceLinks,
} from '../components/common.tsx'

function ProgressTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ payload: Record<string, number | string | null> }>
  label?: string | number
}) {
  if (!active || !payload?.[0]) return null
  const point = payload[0].payload
  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      <span>Score: {point.score ?? 'Not scorable'}</span>
      <span>Coverage: {Math.round(Number(point.coverage) * 100)}%</span>
      {point.lowerBound !== null && (
        <span>
          Range: {point.lowerBound}–{point.upperBound}
        </span>
      )}
    </div>
  )
}

export function OverviewView({
  overview,
  leaders,
  answer,
  onAnswerSelect,
  onViewChange,
  onLeaderSelect,
  onMethodologyOpen,
}: {
  overview: Overview
  leaders: LeaderTerm[]
  answer: CuratedAnswer
  onAnswerSelect: (answerId: string) => void
  onViewChange: (view: ViewId) => void
  onLeaderSelect: (leaderId: string) => void
  onMethodologyOpen: () => void
}) {
  const { showEditorial } = useEditorialLayer()
  const recentLeaders = leaders
    .filter((leader) => !showEditorial || leader.ratingScore !== null)
    .slice(-4)
    .reverse()
  const score = overview.progress.overall
  const isCountry = overview.jurisdiction.level === 'country'
  const officeLabel = isCountry ? 'Prime Minister' : 'Chief Minister'
  const officePlural = isCountry ? 'Prime Ministers' : 'Chief Ministers'
  const startYear = overview.knowledge.timelineStarts.slice(0, 4)
  const stateStartDate = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${overview.jurisdiction.validFrom}T00:00:00Z`))
  const stateIntroduction =
    overview.jurisdiction.id === 'andhra-pradesh'
      ? `This state record begins on ${stateStartDate}, the appointed day for post-split Andhra Pradesh. It does not merge observations from the undivided state or present-day Telangana.`
      : overview.jurisdiction.id === 'tamil-nadu'
        ? `This state record begins on ${stateStartDate}, when the name Tamil Nadu formally took effect. Earlier Madras State records remain related history rather than being silently relabelled.`
        : overview.jurisdiction.id === 'telangana'
          ? `This state record begins on ${stateStartDate}, Telangana's appointed day under the Andhra Pradesh Reorganisation Act. It does not assign undivided-Andhra observations to Telangana or silently merge present-day Andhra Pradesh data.`
        : `This state record begins on ${stateStartDate}, its documented validity boundary. Earlier or differently bounded records are not silently merged into current-state comparisons.`

  return (
    <div className="view overview-view">
      <section className="overview-intro">
        <div className="overview-intro__copy">
          <span className="freshness-line">
            World Bank through {overview.knowledge.latestWorldBankPeriod} · V-Dem
            through {overview.knowledge.latestVdemPeriod} · political record
            checked {overview.knowledge.politicalStatusChecked}
          </span>
          <h1>
            {showEditorial
              ? isCountry
                ? 'How is India doing?'
                : `How is ${overview.jurisdiction.shortName} doing since ${stateStartDate}?`
              : isCountry
                ? 'India’s measurable record since 1945'
                : `${overview.jurisdiction.shortName} records since ${stateStartDate}`}
          </h1>
          <p>
            {showEditorial
              ? isCountry
                ? 'India is more capable, connected, and materially secure than at independence. Progress is real but unbalanced: jobs, inclusion, institutional restraints, and environmental health trail the strongest gains.'
                : `${stateIntroduction} Growth, services, welfare, fiscal pressure, infrastructure, safety, and institutional continuity are assessed inside that boundary.`
              : isCountry
                ? 'Measured indicators, political records, public decisions, and their sources are presented separately from optional editorial judgments.'
                : `${stateIntroduction} Measured indicators and public records are shown separately from optional editorial judgments.`}
          </p>
        </div>
        <div className="overview-intro__actions">
          <button type="button" onClick={onMethodologyOpen}>
            <BookOpenCheck size={17} aria-hidden="true" />
            Methodology
          </button>
        </div>
      </section>

      <section className="progress-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              {showEditorial
                ? isCountry
                  ? 'Country Progress Index'
                  : 'State Progress Index'
                : 'Measured record'}
            </span>
            <h2>
              {showEditorial
                ? 'Progress is broad, not evenly distributed'
                : 'Areas covered by the public evidence'}
            </h2>
          </div>
          {showEditorial && (
            <button type="button" className="text-command" onClick={onMethodologyOpen}>
              See the maths
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          )}
        </div>

        {showEditorial ? (
          <>
            <span className="editorial-label">
              Composite model, not a measured statistic
            </span>
            <div className="progress-layout">
              <div className="progress-score">
                <div className="progress-score__dial" aria-label={`${score.score} out of 100`}>
                  <Gauge size={22} aria-hidden="true" />
                  <strong>{score.score}</strong>
                  <span>/100</span>
                </div>
                <div className="progress-score__copy">
                  <span>{overview.targetYear} central estimate</span>
                  <strong>
                    {score.lowerBound}–{score.upperBound}
                  </strong>
                  <small>uncertainty range</small>
                  <ConfidenceMark confidence={score.confidence} />
                </div>
              </div>

              <div className="dimension-list">
                {overview.progress.dimensions.map((dimension) => (
                  <div className="dimension-row" key={dimension.id}>
                    <div className="dimension-row__heading">
                      <span
                        className="dimension-row__swatch"
                        style={{ backgroundColor: dimension.color }}
                      />
                      <strong>{dimension.name}</strong>
                      <span>{Math.round(dimension.weight * 100)}% weight</span>
                      <ConfidenceMark confidence={dimension.confidence} compact />
                      <b>{dimension.score ?? '—'}</b>
                    </div>
                    <div className="dimension-row__track" aria-hidden="true">
                      <span
                        style={{
                          width: `${dimension.score ?? 0}%`,
                          backgroundColor: dimension.color,
                        }}
                      />
                    </div>
                    <p>{dimension.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="progress-history">
              <div className="chart-heading">
                <div>
                  <h3>Comparable progress snapshots</h3>
                  <p>
                    Fixed goalposts; missing dimensions lower coverage instead of
                    being silently invented.
                  </p>
                </div>
                <span>
                  <Scale size={15} aria-hidden="true" />
                  central estimate and range
                </span>
              </div>
              <div className="chart-frame">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={overview.progressHistory}
                    margin={{ top: 12, right: 16, bottom: 0, left: -14 }}
                  >
                    <CartesianGrid stroke="#e3e5e1" vertical={false} />
                    <XAxis
                      dataKey="year"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#65665f', fontSize: 12 }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#65665f', fontSize: 12 }}
                    />
                    <Tooltip content={<ProgressTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="upperBound"
                      stroke="none"
                      fill="#dbe7e2"
                      fillOpacity={0.75}
                      connectNulls
                    />
                    <Area
                      type="monotone"
                      dataKey="lowerBound"
                      stroke="none"
                      fill="#ffffff"
                      fillOpacity={1}
                      connectNulls
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#1f5f46"
                      strokeWidth={2.5}
                      fill="none"
                      connectNulls
                      dot={{ r: 3, fill: '#1f5f46', strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: '#1f5f46' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          <div className="dimension-list">
            {overview.progress.dimensions.map((dimension) => (
              <div className="dimension-row" key={dimension.id}>
                <div
                  className="dimension-row__heading"
                  style={{ gridTemplateColumns: 'auto minmax(0, 1fr)' }}
                >
                  <span
                    className="dimension-row__swatch"
                    style={{ backgroundColor: dimension.color }}
                  />
                  <strong>{dimension.name}</strong>
                </div>
                <p>{dimension.description}</p>
              </div>
            ))}
            <p className="not-rated-note">
              Editorial analysis available. Composite scores and modelled
              comparisons are hidden in facts-first mode.
            </p>
          </div>
        )}
      </section>

      <section className="question-section">
        <div className="section-heading section-heading--questions">
          <div>
            <span className="section-label">Questions people ask</span>
            <h2>
              {showEditorial
                ? 'Answers that keep both sides visible'
                : 'Questions that require interpretation'}
            </h2>
          </div>
          <div className="question-switcher" role="tablist" aria-label="Reviewed questions">
            {overview.questions.map((question) => (
              <button
                type="button"
                role="tab"
                aria-selected={answer.id === question.id}
                className={answer.id === question.id ? 'is-active' : undefined}
                key={question.id}
                onClick={() => onAnswerSelect(question.id)}
              >
                {question.question}
              </button>
            ))}
          </div>
        </div>
        <AnswerPanel answer={answer} />
      </section>

      <section className="leader-strip">
        <div className="section-heading">
          <div>
            <span className="section-label">
              {showEditorial ? `${officeLabel} evaluations` : `${officeLabel} terms`}
            </span>
            <h2>
              {showEditorial
                ? `Recent ${officePlural.toLowerCase()}, one disclosed rubric`
                : `Recent ${officePlural.toLowerCase()} and parties`}
            </h2>
          </div>
          <button
            type="button"
            className="text-command"
            onClick={() => onViewChange('leaders')}
          >
            {showEditorial ? `Compare all ${officePlural}` : `View all ${officePlural}`}
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="leader-strip__rows">
          {recentLeaders.map((leader) => (
            <button
              type="button"
              key={leader.id}
              className="leader-strip__row"
              style={
                showEditorial
                  ? undefined
                  : { gridTemplateColumns: '3px minmax(0, 1fr) auto' }
              }
              onClick={() => onLeaderSelect(leader.id)}
            >
              <span
                className="party-line"
                style={{ backgroundColor: leader.party?.color }}
                aria-hidden="true"
              />
              <span className="leader-strip__identity">
                <strong>{leader.person.name}</strong>
                <span>
                  {formatYear(leader.startDate)}–{formatYear(leader.endDate)}
                  {leader.party ? ` · ${leader.party.shortName}` : ''}
                </span>
              </span>
              {showEditorial && (
                <>
                  <span className="leader-strip__summary">{leader.ratingSummary}</span>
                  <span className="leader-strip__rating">
                    <span className="editorial-label">
                      Sourced editorial judgment
                    </span>
                    <strong>{leader.ratingScore?.toFixed(1)}/10</strong>
                    {leader.ratingConfidence && (
                      <ConfidenceMark confidence={leader.ratingConfidence} compact />
                    )}
                  </span>
                </>
              )}
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section className="recent-timeline">
        <div className="section-heading">
          <div>
            <span className="section-label">Recent timeline</span>
            <h2>
              {showEditorial
                ? 'Events that changed the direction'
                : 'Recent events in the public record'}
            </h2>
          </div>
          <button
            type="button"
            className="text-command"
            onClick={() => onViewChange('timeline')}
          >
            Explore {startYear}–2026
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="recent-timeline__grid">
          {overview.recentEvents.map((event) => (
            <article key={event.id}>
              <span className="recent-timeline__date">
                <CalendarDays size={14} aria-hidden="true" />
                {event.date.slice(0, 4)}
              </span>
              <h3>{event.title}</h3>
              <p>{showEditorial ? event.significance : event.summary}</p>
              <SourceLinks sources={event.sources} limit={1} />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
