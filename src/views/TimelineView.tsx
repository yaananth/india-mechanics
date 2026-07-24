import {
  CalendarRange,
  CheckCircle2,
  ChartNoAxesColumnIncreasing,
  ChevronDown,
  Filter,
  Info,
  Landmark,
  Lightbulb,
  MapPin,
  RotateCcw,
  Scale,
  ScrollText,
  UsersRound,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Jurisdiction, Overview, TimelineEvent } from '../types.ts'
import { formatDate, sentenceCase } from '../utils.ts'
import {
  ConfidenceMark,
  EditorialLabel,
  SourceLinks,
} from '../components/common.tsx'

const responsibilityLevelLabel = (level: number) =>
  level >= 5
    ? 'Primary'
    : level === 4
      ? 'Major'
      : level === 3
        ? 'Material'
        : level === 2
          ? 'Limited'
          : 'Contextual'

export function TimelineView({
  events,
  selectedEventId,
  onSelectEvent,
  onOpenPolicy,
  onOpenIndicator,
  knowledge,
  jurisdiction,
}: {
  events: TimelineEvent[]
  selectedEventId: string | null
  onSelectEvent: (eventId: string | null) => void
  onOpenPolicy: (policyId: string) => void
  onOpenIndicator: (indicatorId: string) => void
  knowledge: Overview['knowledge']
  jurisdiction: Jurisdiction
}) {
  const cutoffYear = Number(knowledge.cutoff.slice(0, 4))
  const startYear = Number(knowledge.timelineStarts.slice(0, 4))
  const categories = useMemo(
    () => Array.from(new Set(events.map((event) => event.category))).sort(),
    [events],
  )
  const [category, setCategory] = useState('all')
  const [fromYear, setFromYear] = useState(startYear)
  const [toYear, setToYear] = useState(cutoffYear)
  const [expanded, setExpanded] = useState<string | null>(selectedEventId)

  useEffect(() => {
    setCategory('all')
    setFromYear(startYear)
    setToYear(cutoffYear)
    setExpanded(null)
  }, [cutoffYear, jurisdiction.id, startYear])

  useEffect(() => {
    setExpanded(selectedEventId)
    if (!selectedEventId) return
    window.setTimeout(() => {
      document
        .getElementById(`event-${selectedEventId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }, [selectedEventId])

  const filtered = events.filter((event) => {
    const year = Number(event.date.slice(0, 4))
    return (
      (category === 'all' || event.category === category) &&
      year >= fromYear &&
      year <= toYear
    )
  })

  const reset = () => {
    setCategory('all')
    setFromYear(startYear)
    setToYear(cutoffYear)
  }

  return (
    <div className="view timeline-view">
      <header className="view-header">
        <div>
          <span className="freshness-line">
            Curated {jurisdiction.level === 'country' ? 'national' : 'state'} timeline ·{' '}
            {startYear}–{cutoffYear} · reviewed{' '}
            {knowledge.editorialReviewedThrough}
          </span>
          <h1>What changed, and when?</h1>
          <p>
            Political decisions, crises, reforms, institutions, infrastructure,
            and public systems in one inspectable chronology.
          </p>
        </div>
        <div className="view-header__stat">
          <strong>{filtered.length}</strong>
          <span>events in view</span>
        </div>
      </header>

      <section className="filter-bar" aria-label="Timeline filters">
        <label>
          <Filter size={15} aria-hidden="true" />
          <span>Theme</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All themes</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {sentenceCase(item)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <CalendarRange size={15} aria-hidden="true" />
          <span>From</span>
          <input
            type="number"
            min={1945}
            max={toYear}
            value={fromYear}
            onChange={(event) =>
              setFromYear(Math.max(1945, Math.min(Number(event.target.value), toYear)))
            }
          />
        </label>
        <label>
          <span>To</span>
          <input
            type="number"
            min={fromYear}
            max={cutoffYear}
            value={toYear}
            onChange={(event) =>
              setToYear(
                Math.min(cutoffYear, Math.max(Number(event.target.value), fromYear)),
              )
            }
          />
        </label>
        <button type="button" className="icon-button" onClick={reset} title="Reset filters">
          <RotateCcw size={17} aria-hidden="true" />
          <span className="sr-only">Reset timeline filters</span>
        </button>
      </section>

      <section className="timeline-list">
        <div className="timeline-list__axis" aria-hidden="true" />
        {filtered.map((event) => {
          const isExpanded = expanded === event.id
          return (
            <article
              id={`event-${event.id}`}
              key={event.id}
              className={`timeline-event ${isExpanded ? 'is-expanded' : ''}`}
            >
              <button
                type="button"
                className="timeline-event__summary"
                onClick={() => {
                  const nextEventId = isExpanded ? null : event.id
                  setExpanded(nextEventId)
                  onSelectEvent(nextEventId)
                }}
                aria-expanded={isExpanded}
              >
                <span className="timeline-event__year">{event.date.slice(0, 4)}</span>
                <span className="timeline-event__node" aria-hidden="true" />
                <span className="timeline-event__content">
                  <span className="timeline-event__meta">
                    <span>{sentenceCase(event.category)}</span>
                    <ConfidenceMark confidence={event.confidence} />
                  </span>
                  <strong>{event.title}</strong>
                  <span>{event.summary}</span>
                </span>
                <ChevronDown size={18} aria-hidden="true" />
              </button>
              {isExpanded && (
                <div className="timeline-event__detail">
                  <dl className="timeline-event__facts">
                    <div>
                      <dt>Date</dt>
                      <dd>
                        {formatDate(event.date)}
                        {event.endDate ? ` – ${formatDate(event.endDate)}` : ''}
                      </dd>
                    </div>
                    <div>
                      <dt>Why it matters</dt>
                      <dd>{event.significance}</dd>
                    </div>
                  </dl>

                  {event.accountability && (
                    <section className="event-accountability">
                      <header className="event-accountability__header">
                        <div>
                          <span className="section-label">
                            Accountability assessment
                          </span>
                          <h3>Who bears responsibility?</h3>
                        </div>
                        <div>
                          <EditorialLabel />
                          <ConfidenceMark
                            confidence={event.accountability.confidence}
                          />
                        </div>
                      </header>

                      <div
                        className={`choice-assessment choice-assessment--${event.accountability.choiceAssessment}`}
                      >
                        <div>
                          <Scale size={17} aria-hidden="true" />
                          <span>
                            <small>Was the decision or response defensible?</small>
                            <strong>
                              {sentenceCase(
                                event.accountability.choiceAssessment,
                              )}
                              {event.accountability.choiceScore !== null
                                ? ` · ${event.accountability.choiceScore}/10`
                                : ''}
                            </strong>
                          </span>
                        </div>
                        <p>{event.accountability.choiceReason}</p>
                      </div>

                      <div className="government-role-grid">
                        <article>
                          <h4>
                            <Landmark size={16} aria-hidden="true" />
                            {jurisdiction.level === 'country'
                              ? 'Union / PM role'
                              : 'State / CM role'}
                          </h4>
                          <p>{event.accountability.unionRole}</p>
                        </article>
                        <article>
                          <h4>
                            <MapPin size={16} aria-hidden="true" />
                            {jurisdiction.level === 'country'
                              ? 'State / local role'
                              : 'Union / local role'}
                          </h4>
                          <p>{event.accountability.stateLocalRole}</p>
                        </article>
                      </div>

                      <div className="responsibility-list">
                        <h4>
                          <UsersRound size={16} aria-hidden="true" />
                          Responsible actors
                        </h4>
                        {event.accountability.responsibilities.map(
                          (responsibility) => (
                            <article
                              key={`${responsibility.actorName}-${responsibility.responsibilityKind}`}
                            >
                              <span className="responsibility-level">
                                <b>{responsibility.level}/5</b>
                                <small>
                                  {responsibilityLevelLabel(
                                    responsibility.level,
                                  )}
                                </small>
                              </span>
                              <span className="responsibility-copy">
                                <strong>{responsibility.actorName}</strong>
                                <small>
                                  {sentenceCase(
                                    responsibility.responsibilityKind,
                                  )}{' '}
                                  · {sentenceCase(responsibility.actorType)}
                                </small>
                                <p>{responsibility.assessment}</p>
                              </span>
                              <ConfidenceMark
                                confidence={responsibility.confidence}
                                compact
                              />
                            </article>
                          ),
                        )}
                      </div>

                      <div className="event-outcomes-grid">
                        <article>
                          <h4>
                            <CheckCircle2 size={16} aria-hidden="true" />
                            Positives or corrective outcomes
                          </h4>
                          <p>{event.accountability.positiveOutcomes}</p>
                        </article>
                        <article>
                          <h4>
                            <Lightbulb size={16} aria-hidden="true" />
                            Lesson
                          </h4>
                          <p>{event.accountability.lessons}</p>
                        </article>
                      </div>

                      <footer className="accountability-caveat">
                        <Info size={14} aria-hidden="true" />
                        <span>
                          This is a political and administrative accountability
                          assessment, not a criminal or judicial verdict. Shared
                          and contested responsibility is kept visible.
                        </span>
                      </footer>
                    </section>
                  )}
                  {event.relatedPolicies.length > 0 && (
                    <section className="event-related-policies">
                      <h4>
                        <ScrollText size={16} aria-hidden="true" />
                        Related policy assessment
                      </h4>
                      <div>
                        {event.relatedPolicies.map((policy) => (
                          <button
                            type="button"
                            key={policy.id}
                            onClick={() => onOpenPolicy(policy.id)}
                          >
                            <span>
                              <strong>{policy.shortTitle}</strong>
                              <small>{policy.title}</small>
                            </span>
                            <b>{policy.ratingScore}/10</b>
                          </button>
                        ))}
                      </div>
                    </section>
                  )}
                  {event.relatedIndicators.length > 0 && (
                    <section className="event-related-indicators">
                      <h4>
                        <ChartNoAxesColumnIncreasing
                          size={16}
                          aria-hidden="true"
                        />
                        Related data series
                      </h4>
                      <div>
                        {event.relatedIndicators.map((indicator) => (
                          <button
                            type="button"
                            key={indicator.id}
                            onClick={() => onOpenIndicator(indicator.id)}
                          >
                            <span>
                              <strong>{indicator.shortName}</strong>
                              <small>{indicator.name}</small>
                            </span>
                            <b>View data</b>
                          </button>
                        ))}
                      </div>
                    </section>
                  )}
                  <SourceLinks sources={event.sources} />
                </div>
              )}
            </article>
          )
        })}
      </section>

      {filtered.length === 0 && (
        <div className="empty-state">
          <strong>No events match this range.</strong>
          <button type="button" onClick={reset}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  )
}
