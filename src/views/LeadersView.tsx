import {
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Factory,
  HeartPulse,
  Landmark,
  Scale,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type {
  LeaderScorecardCategory,
  LeaderTerm,
  Overview,
  SpecialistAssessment,
} from '../types.ts'
import { formatDate, formatYear } from '../utils.ts'
import {
  ConfidenceMark,
  EditorialLabel,
  SourceLinks,
  SourceRating,
} from '../components/common.tsx'

const categoryIcons = {
  outcomes: Landmark,
  reforms: CheckCircle2,
  inclusion: HeartPulse,
  crisis: ShieldCheck,
  institutions: Scale,
  integrity: BookOpenCheck,
} as const

function componentSignal(score: number) {
  if (score >= 7) return { label: 'Strength', tone: 'strength' }
  if (score >= 6) return { label: 'Positive', tone: 'positive' }
  if (score >= 5) return { label: 'Mixed', tone: 'mixed' }
  return { label: 'Concern', tone: 'concern' }
}

function claimSection(stance: string) {
  if (stance === 'achievement') return 'Achievements'
  if (stance === 'concern') return 'Concerns'
  return 'Context and limits'
}

function deepDiveIcon(topicId: string) {
  return topicId === 'infrastructure-capacity' ? Factory : ShieldCheck
}

function SpecialistDeepDive({
  assessment,
}: {
  assessment: SpecialistAssessment
}) {
  const Icon = deepDiveIcon(assessment.topicId)
  return (
    <details className="scorecard-deep-dive">
      <summary>
        <span>
          <Icon size={15} aria-hidden="true" />
          <strong>{assessment.topicName}</strong>
        </span>
        <span>
          {assessment.adjustedScore.toFixed(1)}
          <ChevronDown size={14} aria-hidden="true" />
        </span>
      </summary>
      <div className="scorecard-deep-dive__body">
        <p>{assessment.summary}</p>
        <div className="scorecard-deep-dive__headline">
          <span>
            <small>{assessment.operationalLabel}</small>
            <strong>{assessment.operationalScore.toFixed(1)}/10</strong>
          </span>
          <span>
            <small>{assessment.adjustedLabel}</small>
            <strong>{assessment.adjustedScore.toFixed(1)}/10</strong>
          </span>
        </div>
        <div className="scorecard-deep-dive__components">
          {assessment.componentScores.map((component) => (
            <div key={component.id}>
              <header>
                <strong>{component.name}</strong>
                <b>{component.score.toFixed(1)}</b>
              </header>
              <div
                className="scorecard-score-track"
                role="img"
                aria-label={`${component.name}: ${component.score.toFixed(1)} out of 10`}
              >
                <span style={{ width: `${component.score * 10}%` }} />
              </div>
              <p>{component.rationale}</p>
            </div>
          ))}
        </div>
        <p className="scorecard-method-note">{assessment.methodology}</p>
        <footer>
          <ConfidenceMark confidence={assessment.confidence} />
          <span>Reviewed through {assessment.assessmentAsOf}</span>
          <SourceLinks sources={assessment.sources} limit={6} />
        </footer>
      </div>
    </details>
  )
}

function CategorySection({
  category,
}: {
  category: LeaderScorecardCategory
}) {
  const Icon =
    categoryIcons[category.id as keyof typeof categoryIcons] ?? CheckCircle2
  const score = category.score
  const signal = score === null ? null : componentSignal(score)
  return (
    <section className="scorecard-category">
      <header>
        <span>
          <Icon size={16} aria-hidden="true" />
          <strong>{category.name}</strong>
        </span>
        <b>{score === null ? 'N/A' : score.toFixed(1)}</b>
      </header>
      {score !== null && (
        <>
          <div
            className="scorecard-score-track"
            role="img"
            aria-label={`${category.name}: ${score.toFixed(1)} out of 10`}
          >
            <span style={{ width: `${score * 10}%` }} />
          </div>
          <small
            className={`component-score__signal component-score__signal--${signal?.tone}`}
          >
            {signal?.label}
          </small>
        </>
      )}
      <p>{category.rationale ?? category.description}</p>
      {category.deepDives.map((assessment) => (
        <SpecialistDeepDive
          key={assessment.id}
          assessment={assessment}
        />
      ))}
    </section>
  )
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
  const rated = useMemo(
    () =>
      leaders.filter(
        (leader) => leader.scorecard.overallScore !== null,
      ),
    [leaders],
  )
  const defaultLeader =
    leaders.find((leader) => leader.id === selectedTermId) ??
    leaders.find((leader) => !leader.endDate) ??
    leaders.at(-1)
  const [openIds, setOpenIds] = useState<string[]>(
    defaultLeader ? [defaultLeader.id] : [],
  )
  const [compareIds, setCompareIds] = useState<string[]>([])
  const officeLabel =
    defaultLeader?.office.shortName ??
    leaders[0]?.office.shortName ??
    'Leader'
  const officePlural =
    officeLabel === 'Prime Minister'
      ? 'Prime Ministers'
      : officeLabel === 'Chief Minister'
        ? 'Chief Ministers'
        : `${officeLabel}s`

  useEffect(() => {
    if (!selectedTermId) return
    setOpenIds((current) =>
      current.includes(selectedTermId)
        ? current
        : [...current, selectedTermId],
    )
    document
      .getElementById(`leader-${selectedTermId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedTermId])

  useEffect(() => {
    setCompareIds((current) =>
      current.filter((id) =>
        rated.some((leader) => leader.id === id),
      ),
    )
  }, [rated])

  const comparedLeaders = useMemo(
    () =>
      compareIds
        .map((id) => leaders.find((leader) => leader.id === id))
        .filter((leader): leader is LeaderTerm => Boolean(leader)),
    [compareIds, leaders],
  )
  const comparisonCategories =
    comparedLeaders[0]?.scorecard.categories ?? []

  const toggleCompare = (leaderId: string) => {
    setCompareIds((current) => {
      if (current.includes(leaderId)) {
        return current.filter((id) => id !== leaderId)
      }
      if (current.length >= 4) return [...current.slice(1), leaderId]
      return [...current, leaderId]
    })
  }

  const toggleOpen = (leaderId: string) => {
    setOpenIds((current) =>
      current.includes(leaderId)
        ? current.filter((id) => id !== leaderId)
        : [...current, leaderId],
    )
    onSelectTerm(leaderId)
  }

  return (
    <div className="view leaders-view">
      <header className="view-header">
        <div>
          <span className="freshness-line">
            All {officeLabel} terms · evidence checked{' '}
            {knowledge.cutoff}
          </span>
          <h1>{officePlural}, one scorecard each</h1>
          <p>
            Every overall is the simple average of the same six categories.
            Open any term for evidence, deep dives, sources and methodology.
          </p>
        </div>
        <div className="view-header__stat">
          <strong>{rated.length}</strong>
          <span>rated terms</span>
        </div>
      </header>

      {comparedLeaders.length >= 2 && (
        <section className="leader-scorecard-comparison">
          <div className="section-heading">
            <div>
              <span className="section-label">Selected comparison</span>
              <h2>Same six categories, side by side</h2>
            </div>
            <span className="comparison-limit">
              <UsersRound size={15} aria-hidden="true" />
              Up to four
            </span>
          </div>
          <div className="leader-scorecard-comparison__scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  {comparedLeaders.map((leader) => (
                    <th scope="col" key={leader.id}>
                      {leader.person.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="is-overall">
                  <th scope="row">Overall</th>
                  {comparedLeaders.map((leader) => (
                    <td key={leader.id}>
                      {leader.scorecard.overallScore?.toFixed(1) ?? 'N/A'}
                    </td>
                  ))}
                </tr>
                {comparisonCategories.map((category, index) => (
                  <tr key={category.id}>
                    <th scope="row">{category.name}</th>
                    {comparedLeaders.map((leader) => (
                      <td key={leader.id}>
                        {leader.scorecard.categories[index]?.score?.toFixed(
                          1,
                        ) ?? 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <div
        className="leader-compare-status"
        aria-live="polite"
      >
        {compareIds.length === 0
          ? 'Select two terms to compare'
          : compareIds.length === 1
            ? 'Select one more term to compare'
            : `${compareIds.length} selected for comparison`}
      </div>

      <section className="leader-scorecards" aria-label={`${officeLabel} terms`}>
        {[...leaders].reverse().map((leader) => {
          const isOpen = openIds.includes(leader.id)
          const isCompared = compareIds.includes(leader.id)
          const overall = leader.scorecard.overallScore
          const evidenceGroups = ['Achievements', 'Concerns', 'Context and limits']
            .map((section) => ({
              section,
              claims: leader.claims.filter(
                (claim) => claimSection(claim.stance) === section,
              ),
            }))
            .filter((group) => group.claims.length > 0)
          const regionId = `leader-scorecard-body-${leader.id}`

          return (
            <article
              id={`leader-${leader.id}`}
              key={leader.id}
              className={`leader-scorecard ${isOpen ? 'is-open' : ''}`}
            >
              <div className="leader-scorecard__summary">
                <label className="leader-scorecard__compare">
                  <input
                    type="checkbox"
                    checked={isCompared}
                    disabled={overall === null}
                    aria-label={`Compare ${leader.person.name}`}
                    onChange={() => toggleCompare(leader.id)}
                  />
                  <span>Compare</span>
                </label>
                <div className="leader-scorecard__identity">
                  <strong>{leader.person.name}</strong>
                  <span>
                    {formatYear(leader.startDate)}–{formatYear(leader.endDate)}
                    {leader.party ? ` · ${leader.party.shortName}` : ''}
                    {leader.isActing ? ' · acting' : ''}
                  </span>
                </div>
                <div className="leader-scorecard__overall">
                  <small>Overall</small>
                  <strong>{overall === null ? 'NR' : overall.toFixed(1)}</strong>
                  <span>{overall === null ? 'not rated' : '/10'}</span>
                </div>
                <button
                  type="button"
                  className="leader-scorecard__toggle"
                  aria-expanded={isOpen}
                  aria-controls={regionId}
                  onClick={() => toggleOpen(leader.id)}
                >
                  <ChevronDown size={18} aria-hidden="true" />
                  <span className="sr-only">
                    {isOpen ? 'Collapse' : 'Expand'} {leader.person.name}
                  </span>
                </button>
              </div>

              {isOpen && (
                <div id={regionId} className="leader-scorecard__body">
                  <header>
                    <div>
                      <span className="section-label">
                        {leader.mandateLabel ?? leader.office.shortName}
                      </span>
                      <h2>{leader.person.name}</h2>
                      <p>
                        {formatDate(leader.startDate)} –{' '}
                        {formatDate(leader.endDate)}
                      </p>
                    </div>
                    <div className="leader-scorecard__rating">
                      <EditorialLabel />
                      <strong>{overall?.toFixed(1) ?? 'NR'}</strong>
                      <span>{overall === null ? 'not rated' : '/10'}</span>
                      {leader.ratingConfidence && (
                        <ConfidenceMark
                          confidence={leader.ratingConfidence}
                        />
                      )}
                    </div>
                  </header>

                  <p className="leader-scorecard__description">
                    {leader.ratingSummary}
                  </p>

                  {overall !== null ? (
                    <div className="leader-scorecard__categories">
                      {leader.scorecard.categories.map((category) => (
                        <CategorySection
                          key={category.id}
                          category={category}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="not-rated-note">
                      This term remains unrated because its duration or
                      evidence window is too limited for all six categories.
                    </p>
                  )}

                  {evidenceGroups.length > 0 && (
                    <section className="leader-scorecard__evidence">
                      <h3>Evidence and judgments</h3>
                      <div>
                        {evidenceGroups.map((group) => (
                          <section key={group.section}>
                            <h4>{group.section}</h4>
                            {group.claims.map((claim) => (
                              <article key={claim.id}>
                                <strong>{claim.title}</strong>
                                <p>{claim.body}</p>
                                <SourceLinks
                                  sources={claim.sources}
                                  limit={4}
                                />
                              </article>
                            ))}
                          </section>
                        ))}
                      </div>
                    </section>
                  )}

                  <details className="leader-scorecard__disclosure">
                    <summary>How this score was calculated</summary>
                    <div>
                      <p>{leader.scorecard.formula}</p>
                      {overall !== null && (
                        <p>
                          For this term: (
                          {leader.scorecard.categories
                            .map((category) =>
                              category.score?.toFixed(1),
                            )
                            .join(' + ')}
                          ) ÷ {leader.scorecard.totalCategoryCount} ={' '}
                          <strong>{overall.toFixed(1)}/10</strong>.
                        </p>
                      )}
                      <p>{leader.scorecard.specialistRule}</p>
                      <small>
                        Methodology {leader.scorecard.version} · assessed{' '}
                        {leader.assessmentAsOf}
                      </small>
                      {leader.legacyWeightedScore !== null && (
                        <p>
                          Legacy weighted score:{' '}
                          <strong>
                            {leader.legacyWeightedScore.toFixed(1)}/10
                          </strong>
                          . It is retained for historical transparency and no
                          longer controls the overall.
                        </p>
                      )}
                      {leader.ratingAudit && (
                        <details>
                          <summary>Historical methodology audit</summary>
                          <p>{leader.ratingAudit.notes}</p>
                        </details>
                      )}
                    </div>
                  </details>

                  <details className="leader-scorecard__disclosure">
                    <summary>Sources and limitations</summary>
                    <div className="leader-scorecard__sources">
                      {leader.sources.map((source) => (
                        <article key={source.id}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {source.title}
                          </a>
                          <div className="leader-scorecard__source-meta">
                            <small>{source.publisher}</small>
                            <SourceRating
                              rating={source.reliability}
                              compact
                            />
                          </div>
                          <p>{source.ratingReason}</p>
                          <p className="leader-scorecard__source-limit">
                            <strong>Limit:</strong> {source.limitations}
                          </p>
                        </article>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </article>
          )
        })}
      </section>
    </div>
  )
}
