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
import { formatYear } from '../utils.ts'
import { AnswerPanel } from '../components/AnswerPanel.tsx'
import {
  ConfidenceMark,
  EditorialLabel,
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
  const ratedLeaders = ['modi-2014', 'manmohan-2004', 'vajpayee-1998', 'rao-1991']
    .map((id) => leaders.find((leader) => leader.id === id))
    .filter((leader): leader is LeaderTerm => Boolean(leader))
  const score = overview.progress.overall

  return (
    <div className="view overview-view">
      <section className="overview-intro">
        <div className="overview-intro__copy">
          <span className="freshness-line">
            World Bank through {overview.knowledge.latestWorldBankPeriod} · V-Dem
            through {overview.knowledge.latestVdemPeriod} · political record
            checked {overview.knowledge.politicalStatusChecked}
          </span>
          <h1>How is India doing?</h1>
          <p>
            India is more capable, connected, and materially secure than at
            independence. Progress is real but unbalanced: jobs, inclusion,
            institutional restraints, and environmental health trail the
            strongest gains.
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
            <span className="section-label">Country Progress Index</span>
            <h2>Progress is broad, not evenly distributed</h2>
          </div>
          <button type="button" className="text-command" onClick={onMethodologyOpen}>
            See the maths
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>

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
      </section>

      <section className="question-section">
        <div className="section-heading section-heading--questions">
          <div>
            <span className="section-label">Questions people ask</span>
            <h2>Answers that keep both sides visible</h2>
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
            <span className="section-label">Prime Minister evaluations</span>
            <h2>Recent governments, one disclosed rubric</h2>
          </div>
          <button
            type="button"
            className="text-command"
            onClick={() => onViewChange('leaders')}
          >
            Compare all Prime Ministers
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="leader-strip__rows">
          {ratedLeaders.map((leader) => (
            <button
              type="button"
              key={leader.id}
              className="leader-strip__row"
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
              <span className="leader-strip__summary">{leader.ratingSummary}</span>
              <span className="leader-strip__rating">
                <EditorialLabel />
                <strong>{leader.ratingScore}/10</strong>
                {leader.ratingConfidence && (
                  <ConfidenceMark confidence={leader.ratingConfidence} compact />
                )}
              </span>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section className="recent-timeline">
        <div className="section-heading">
          <div>
            <span className="section-label">Recent timeline</span>
            <h2>Events that changed the direction</h2>
          </div>
          <button
            type="button"
            className="text-command"
            onClick={() => onViewChange('timeline')}
          >
            Explore 1945–2026
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
              <p>{event.significance}</p>
              <SourceLinks sources={event.sources} limit={1} />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
