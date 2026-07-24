import {
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Scale,
  UsersRound,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { LeaderTerm, Overview } from '../types.ts'
import { formatDate, formatYear } from '../utils.ts'
import {
  ConfidenceMark,
  EditorialLabel,
  SourceLinks,
} from '../components/common.tsx'

const comparisonColors = ['#2368a2', '#c66a12', '#287a57', '#9b4f67']

export function LeadersView({
  leaders,
  selectedTermId,
  onSelectTerm,
  knowledge,
}: {
  leaders: LeaderTerm[]
  selectedTermId: string | null
  onSelectTerm: (termId: string) => void
  knowledge: Overview['knowledge']
}) {
  const rated = leaders.filter((leader) => leader.ratingScore !== null)
  const [compareIds, setCompareIds] = useState<string[]>([
    'modi-2014',
    'manmohan-2004',
    'vajpayee-1998',
  ])
  const selected =
    leaders.find((leader) => leader.id === selectedTermId) ??
    leaders.find((leader) => leader.id === 'modi-2014') ??
    leaders.at(-1)

  useEffect(() => {
    if (selectedTermId) {
      document
        .getElementById('leader-detail')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selectedTermId])

  const comparisonData = useMemo(() => {
    const selectedLeaders = compareIds
      .map((id) => leaders.find((leader) => leader.id === id))
      .filter((leader): leader is LeaderTerm => Boolean(leader))
    const dimensionNames = Array.from(
      new Set(selectedLeaders.flatMap((leader) => leader.componentScores.map((score) => score.name))),
    )
    return dimensionNames.map((dimensionName) => {
      const row: Record<string, string | number> = { dimension: dimensionName }
      selectedLeaders.forEach((leader) => {
        row[leader.person.name] =
          leader.componentScores.find((score) => score.name === dimensionName)?.score ?? 0
      })
      return row
    })
  }, [compareIds, leaders])

  const comparedLeaders = compareIds
    .map((id) => leaders.find((leader) => leader.id === id))
    .filter((leader): leader is LeaderTerm => Boolean(leader))

  const toggleCompare = (leaderId: string) => {
    setCompareIds((current) => {
      if (current.includes(leaderId)) {
        return current.length === 1
          ? current
          : current.filter((id) => id !== leaderId)
      }
      if (current.length >= 4) return [...current.slice(1), leaderId]
      return [...current, leaderId]
    })
  }

  return (
    <div className="view leaders-view">
      <header className="view-header">
        <div>
          <span className="freshness-line">
            All Prime Minister terms · evaluations checked{' '}
            {knowledge.editorialReviewedThrough}
          </span>
          <h1>Prime Ministers, compared carefully</h1>
          <p>
            Scores are disclosed editorial judgments. They summarise evidence;
            they do not replace the evidence or prove causality.
          </p>
        </div>
        <div className="view-header__stat">
          <strong>{rated.length}</strong>
          <span>rated terms</span>
        </div>
      </header>

      <section className="leader-comparison">
        <div className="section-heading">
          <div>
            <span className="section-label">Component comparison</span>
            <h2>Same six-part rubric for every rated term</h2>
          </div>
          <span className="comparison-limit">
            <UsersRound size={15} aria-hidden="true" />
            Select up to four
          </span>
        </div>
        <div className="comparison-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 12, right: 10, left: -20, bottom: 16 }}
            >
              <CartesianGrid stroke="#e3e5e1" vertical={false} />
              <XAxis
                dataKey="dimension"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#65665f', fontSize: 11 }}
                interval={0}
                angle={-12}
                textAnchor="end"
                height={64}
              />
              <YAxis
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#65665f', fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 4,
                  border: '1px solid #d7dad4',
                  boxShadow: '0 8px 24px rgba(24, 28, 24, .08)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {comparedLeaders.map((leader, index) => (
                <Bar
                  key={leader.id}
                  dataKey={leader.person.name}
                  fill={comparisonColors[index]}
                  radius={[2, 2, 0, 0]}
                  maxBarSize={22}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="leader-workspace">
        <div className="leader-table" role="list" aria-label="Prime Minister terms">
          <div className="leader-table__header" aria-hidden="true">
            <span>Compare</span>
            <span>Prime Minister and term</span>
            <span>Party</span>
            <span>Estimate</span>
            <span />
          </div>
          {[...leaders].reverse().map((leader) => {
            const isSelected = selected?.id === leader.id
            const isCompared = compareIds.includes(leader.id)
            return (
              <button
                type="button"
                role="listitem"
                key={leader.id}
                className={`leader-row ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectTerm(leader.id)}
              >
                <span
                  className={`comparison-checkbox ${isCompared ? 'is-checked' : ''}`}
                  role="checkbox"
                  aria-checked={isCompared}
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation()
                    if (leader.ratingScore !== null) toggleCompare(leader.id)
                  }}
                  onKeyDown={(event) => {
                    if (
                      leader.ratingScore !== null &&
                      (event.key === 'Enter' || event.key === ' ')
                    ) {
                      event.preventDefault()
                      event.stopPropagation()
                      toggleCompare(leader.id)
                    }
                  }}
                  aria-label={`Compare ${leader.person.name}`}
                >
                  {leader.ratingScore !== null && isCompared && (
                    <Check size={13} aria-hidden="true" />
                  )}
                </span>
                <span className="leader-row__identity">
                  <strong>{leader.person.name}</strong>
                  <span>
                    {formatYear(leader.startDate)}–{formatYear(leader.endDate)}
                    {leader.isActing ? ' · acting' : ''}
                  </span>
                </span>
                <span className="leader-row__party">
                  <i
                    style={{ backgroundColor: leader.party?.color ?? '#9a9a94' }}
                    aria-hidden="true"
                  />
                  {leader.party?.shortName ?? '—'}
                </span>
                <span className="leader-row__score">
                  {leader.ratingScore !== null ? (
                    <>
                      <strong>{leader.ratingScore}</strong>
                      <span>/10</span>
                    </>
                  ) : (
                    <span title={leader.ratingSummary}>Not rated</span>
                  )}
                </span>
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            )
          })}
        </div>

        {selected && (
          <article id="leader-detail" className="leader-detail">
            <header className="leader-detail__header">
              <div>
                <span className="section-label">
                  {selected.mandateLabel ?? selected.office.shortName}
                </span>
                <h2>{selected.person.name}</h2>
                <p>
                  {formatDate(selected.startDate)} – {formatDate(selected.endDate)}
                  {selected.party ? ` · ${selected.party.name}` : ''}
                </p>
              </div>
              <div className="leader-detail__rating">
                <EditorialLabel />
                <strong>
                  {selected.ratingScore !== null ? selected.ratingScore : 'NR'}
                </strong>
                <span>{selected.ratingScore !== null ? '/10' : 'short term'}</span>
                {selected.ratingConfidence && (
                  <ConfidenceMark confidence={selected.ratingConfidence} />
                )}
              </div>
            </header>
            <p className="leader-detail__summary">{selected.ratingSummary}</p>

            {selected.ratingAudit && (
              <section className="leader-rating-audit">
                <header>
                  <div>
                    <span className="section-label">Five-run replication check</span>
                    <h3>Independent searches converged tightly</h3>
                  </div>
                  <span className="leader-rating-audit__status">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    {selected.ratingAudit.status}
                  </span>
                </header>
                <div className="leader-rating-audit__metrics">
                  <span>
                    <small>Runs</small>
                    <strong>{selected.ratingAudit.runCount}</strong>
                  </span>
                  <span>
                    <small>Standardized mean</small>
                    <strong>{selected.ratingAudit.standardizedMean}</strong>
                  </span>
                  <span>
                    <small>Range</small>
                    <strong>
                      {selected.ratingAudit.minimum}–
                      {selected.ratingAudit.maximum}
                    </strong>
                  </span>
                  <span>
                    <small>Standard deviation</small>
                    <strong>{selected.ratingAudit.standardDeviation}</strong>
                  </span>
                  <span>
                    <small>Published revision</small>
                    <strong>
                      {selected.ratingAudit.previousRating} →{' '}
                      {selected.ratingAudit.revisedRating}
                    </strong>
                  </span>
                </div>
                <p>{selected.ratingAudit.notes}</p>
                <small>
                  Consensus source families:{' '}
                  {selected.ratingAudit.consensusSources.join(', ')}
                </small>
              </section>
            )}

            {selected.componentScores.length > 0 ? (
              <section className="component-scores">
                <h3>
                  <Scale size={17} aria-hidden="true" />
                  Component judgments
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
            ) : (
              <div className="not-rated-note">
                <CircleHelp size={18} aria-hidden="true" />
                <span>
                  Ultra-short and acting terms are listed for chronology but not
                  forced into a misleading number.
                </span>
              </div>
            )}

            {selected.claims.length > 0 && (
              <section className="leader-claims">
                <h3>Evidence used in the assessment</h3>
                {(['achievement', 'concern', 'context'] as const).map((stance) => {
                  const matching = selected.claims.filter(
                    (claim) => claim.stance === stance,
                  )
                  if (matching.length === 0) return null
                  return (
                    <div key={stance} className={`leader-claim-group leader-claim-group--${stance}`}>
                      <h4>{stance === 'achievement' ? 'Achievements' : stance === 'concern' ? 'Concerns' : 'Context'}</h4>
                      {matching.map((claim) => (
                        <article key={claim.id}>
                          <strong>{claim.title}</strong>
                          <p>{claim.body}</p>
                          <SourceLinks sources={claim.sources} limit={3} />
                        </article>
                      ))}
                    </div>
                  )
                })}
              </section>
            )}

            <footer className="leader-detail__sources">
              <h3>Term record sources</h3>
              <SourceLinks sources={selected.sources} />
            </footer>
          </article>
        )}
      </section>
    </div>
  )
}
