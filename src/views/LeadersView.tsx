import {
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Scale,
  ShieldCheck,
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
const dimensionShortNames: Record<string, string> = {
  outcomes: 'outcomes',
  reforms: 'reforms',
  inclusion: 'inclusion',
  crisis: 'crisis',
  institutions: 'institutions',
  integrity: 'integrity',
}

function profileFormula(weights: Record<string, number>) {
  return Object.entries(weights)
    .filter(([, weight]) => weight > 0)
    .map(
      ([dimension, weight]) =>
        `${Math.round(weight * 100)}% ${
          dimensionShortNames[dimension] ?? dimension
        }`,
    )
    .join(' + ')
}

function componentSignal(score: number) {
  if (score >= 7) return { label: 'Strength', tone: 'strength' }
  if (score >= 6) return { label: 'Positive', tone: 'positive' }
  if (score >= 5) return { label: 'Mixed', tone: 'mixed' }
  return { label: 'Concern', tone: 'concern' }
}

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
  const [compareIds, setCompareIds] = useState<string[]>(() =>
    rated.slice(-3).map((leader) => leader.id),
  )
  const selected =
    leaders.find((leader) => leader.id === selectedTermId) ??
    leaders.find((leader) => leader.id === 'modi-2014') ??
    leaders.at(-1)
  const officeLabel =
    selected?.office.shortName ?? leaders[0]?.office.shortName ?? 'Leader'
  const officePlural =
    officeLabel === 'Prime Minister'
      ? 'Prime Ministers'
      : officeLabel === 'Chief Minister'
        ? 'Chief Ministers'
        : `${officeLabel}s`

  useEffect(() => {
    if (selectedTermId) {
      document
        .getElementById('leader-detail')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selectedTermId])

  useEffect(() => {
    setCompareIds((current) => {
      const valid = current.filter((id) =>
        leaders.some(
          (leader) => leader.id === id && leader.ratingScore !== null,
        ),
      )
      if (valid.length > 0 && valid.length === current.length) return current
      return valid.length > 0
        ? valid
        : leaders
            .filter((leader) => leader.ratingScore !== null)
            .slice(-3)
            .map((leader) => leader.id)
    })
  }, [leaders])

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
            All {officeLabel} terms · evaluations checked{' '}
            {knowledge.editorialReviewedThrough}
          </span>
          <h1>{officePlural}, compared carefully</h1>
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
        <div className="leader-table" role="list" aria-label={`${officeLabel} terms`}>
          <div className="leader-table__header" aria-hidden="true">
            <span>Compare</span>
            <span>{officeLabel} and term</span>
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
                      <strong>{leader.ratingScore.toFixed(1)}</strong>
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
                  {selected.ratingScore !== null
                    ? selected.ratingScore.toFixed(1)
                    : 'NR'}
                </strong>
                <span>{selected.ratingScore !== null ? '/10' : 'short term'}</span>
                {selected.ratingConfidence && (
                  <ConfidenceMark confidence={selected.ratingConfidence} />
                )}
              </div>
            </header>
            <p className="leader-detail__summary">{selected.ratingSummary}</p>

            {selected.ratingProfiles.length > 0 && (
              <section className="leader-weight-sensitivity">
                <header>
                  <div>
                    <span className="section-label">{officeLabel} scorecard</span>
                    <h3>Four published answers, one evidence record</h3>
                  </div>
                  <span>
                    {Math.min(
                      ...selected.ratingProfiles.map((profile) => profile.score),
                    ).toFixed(1)}
                    –
                    {Math.max(
                      ...selected.ratingProfiles.map((profile) => profile.score),
                    ).toFixed(1)}
                    <small>lens range</small>
                  </span>
                </header>
                <p>
                  The headline uses the balanced profile. Each alternative
                  recalculates the same six component judgments using a different
                  stated idea of progress. This range is not a confidence
                  interval.
                </p>
                <div className="leader-weight-sensitivity__grid">
                  {selected.ratingProfiles.map((profile) => (
                    <article
                      key={profile.id}
                      className={profile.isCanonical ? 'is-canonical' : undefined}
                    >
                      <small>
                        {profile.isCanonical ? 'Published' : 'Alternative'}
                      </small>
                      <strong>{profile.score.toFixed(1)}/10</strong>
                      <b>{profile.name}</b>
                      <p>{profile.description}</p>
                      <span className="leader-weight-sensitivity__formula">
                        {profileFormula(profile.weights)}
                      </span>
                    </article>
                  ))}
                </div>
                <p className="leader-weight-sensitivity__note">
                  Policy ratings inform the component rationales; they are not
                  mechanically added to or subtracted from the {officeLabel} total. This
                  prevents one dramatic policy from being counted several times.
                </p>
              </section>
            )}

            {selected.specialistAssessments.map((assessment) => (
              <section
                key={assessment.id}
                className="leader-specialist-assessment"
              >
                <header>
                  <div>
                    <span className="section-label">Specialist assessment</span>
                    <h3>
                      <ShieldCheck size={17} aria-hidden="true" />
                      {assessment.topicName}
                    </h3>
                  </div>
                  <span className="leader-specialist-assessment__status">
                    {assessment.status}
                  </span>
                </header>
                <p>{assessment.summary}</p>
                <div className="leader-specialist-assessment__scores">
                  <div>
                    <small>{assessment.operationalLabel}</small>
                    <strong>{assessment.operationalScore.toFixed(1)}/10</strong>
                    <span>
                      {assessment.topicId === 'public-safety'
                        ? 'Serious harm, reporting-sensitive safety, investigation, justice, and cyber resilience.'
                        : 'Capability, prevention, borders, internal conflict, and strategic autonomy.'}
                    </span>
                  </div>
                  <div>
                    <small>{assessment.adjustedLabel}</small>
                    <strong>{assessment.adjustedScore.toFixed(1)}/10</strong>
                    <span>
                      {assessment.topicId === 'public-safety'
                        ? 'The same record with reporting access, charge-sheeting, conviction, pendency, and federal responsibility emphasized.'
                        : 'The same record with civilian protection, due process, proportionality, and remedies included.'}
                    </span>
                  </div>
                </div>
                <p className="leader-specialist-assessment__method">
                  {assessment.methodology}
                </p>
                <div className="leader-specialist-assessment__components">
                  {assessment.componentScores.map((component) => (
                    <article key={component.id}>
                      <header>
                        <strong>{component.name}</strong>
                        <b>{component.score.toFixed(1)}/10</b>
                      </header>
                      <div aria-hidden="true">
                        <span style={{ width: `${component.score * 10}%` }} />
                      </div>
                      <small>
                        {assessment.topicId === 'public-safety'
                          ? 'Recorded outcomes'
                          : 'Operational'}{' '}
                        {Math.round(component.operationalWeight * 100)}% ·
                        {assessment.topicId === 'public-safety'
                          ? 'system-adjusted'
                          : 'rights-adjusted'}{' '}
                        {Math.round(component.adjustedWeight * 100)}%
                      </small>
                      <p>{component.rationale}</p>
                    </article>
                  ))}
                </div>
                <footer>
                  <ConfidenceMark confidence={assessment.confidence} />
                  <span>Reviewed through {assessment.assessmentAsOf}</span>
                  <SourceLinks sources={assessment.sources} limit={5} />
                </footer>
              </section>
            ))}

            {selected.ratingAudit && (
              <section className="leader-rating-audit">
                <header>
                  <div>
                    <span className="section-label">
                      Independent methodology review
                    </span>
                    <h3>Development credit and governance costs recalibrated</h3>
                  </div>
                  <span className="leader-rating-audit__status">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    {selected.ratingAudit.status}
                  </span>
                </header>
                <div className="leader-rating-audit__metrics">
                  <span>
                    <small>Reviews</small>
                    <strong>{selected.ratingAudit.runCount}</strong>
                  </span>
                  <span>
                    <small>Mean recommendation</small>
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
                    <small>Review dispersion</small>
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
                      <strong>
                        {component.name}
                        <small
                          className={`component-score__signal component-score__signal--${
                            componentSignal(component.score).tone
                          }`}
                        >
                          {componentSignal(component.score).label}
                        </small>
                      </strong>
                      <span>
                        {component.score.toFixed(1)} ×{' '}
                        {Math.round(component.weight * 100)}%
                        {' = '}
                        {(component.score * component.weight).toFixed(2)} points
                      </span>
                      <b>{component.score.toFixed(1)}/10</b>
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
