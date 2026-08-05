import {
  Braces,
  Database,
  ExternalLink,
  FileJson,
  Filter,
  Scale,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Jurisdiction, Overview, Source } from '../types.ts'
import { formatDate, sentenceCase } from '../utils.ts'
import { SourceRating } from '../components/common.tsx'

export function SourcesView({
  sources,
  onMethodologyOpen,
  knowledge,
  jurisdiction,
}: {
  sources: Source[]
  onMethodologyOpen: () => void
  knowledge: Overview['knowledge']
  jurisdiction: Jurisdiction
}) {
  const leaderLabel = jurisdiction.level === 'country' ? 'PMs' : 'CMs'
  const [minimumRating, setMinimumRating] = useState(1)
  const [sourceType, setSourceType] = useState('all')
  const sourceTypes = useMemo(
    () => Array.from(new Set(sources.map((source) => source.sourceType))).sort(),
    [sources],
  )
  const filtered = sources.filter(
    (source) =>
      source.reliability >= minimumRating &&
      (sourceType === 'all' || source.sourceType === sourceType),
  )
  const distribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: sources.filter((source) => source.reliability === rating).length,
  }))

  return (
    <div className="view sources-view">
      <header className="view-header">
        <div>
          <span className="freshness-line">
            Source ledger · reviewed {knowledge.editorialReviewedThrough} ·
            knowledge cutoff {knowledge.cutoff}
          </span>
          <h1>Trust is scoped, not assumed</h1>
          <p>
            Each source has a reliability marker for its stated use, plus
            provenance, best use, and limitations. Reliability is not the
            source’s role, political agreement, or a universal truth score.
          </p>
        </div>
        <div className="view-header__stat">
          <strong>{sources.length}</strong>
          <span>reviewed sources</span>
        </div>
      </header>

      <section className="source-rubric">
        <div>
          <span className="section-label">Reliability rubric</span>
          <h2>Green means strongest fit for the stated use</h2>
          <p>
            The emphasized dot moves from red to green as reliability improves.
            Source type explains whether the record is official, independent,
            academic, corporate, or another evidence class. A strong official
            record can establish an action or number without proving impact.
          </p>
          <button type="button" className="text-command" onClick={onMethodologyOpen}>
            Open full rubric
            <ExternalLink size={14} aria-hidden="true" />
          </button>
        </div>
        <div className="source-distribution" aria-label="Sources by reliability">
          {distribution.map((item) => (
            <div key={item.rating}>
              <SourceRating rating={item.rating} />
              <span className="source-distribution__bar" aria-hidden="true">
                <i
                  style={{
                    width: `${(item.count / Math.max(...distribution.map((row) => row.count), 1)) * 100}%`,
                  }}
                />
              </span>
              <strong>{item.count}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="machine-access">
        <div>
          <span className="section-label">Machine-readable evidence</span>
          <h2>Use the same records as the interface</h2>
          <p>
            Read-only JSON exposes the reviewed corpus, current cutoffs,
            methodology, and API contract without changing the underlying
            research.
          </p>
        </div>
        <nav className="machine-access__links" aria-label="Research API links">
          <a
            href={`/api/export?jurisdiction=${jurisdiction.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Database size={17} aria-hidden="true" />
            <span>
              <strong>Dataset export</strong>
              <small>
                Events, {leaderLabel}, policies, budgets, indicators, and sources
              </small>
            </span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <a href="/api/meta" target="_blank" rel="noreferrer">
            <FileJson size={17} aria-hidden="true" />
            <span>
              <strong>Current metadata</strong>
              <small>Knowledge cutoffs, versions, and corpus counts</small>
            </span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <a href="/api/methodology" target="_blank" rel="noreferrer">
            <Scale size={17} aria-hidden="true" />
            <span>
              <strong>Methodology JSON</strong>
              <small>Weights, formulas, uncertainty, and evidence rules</small>
            </span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <a href="/api/openapi.json" target="_blank" rel="noreferrer">
            <Braces size={17} aria-hidden="true" />
            <span>
              <strong>OpenAPI contract</strong>
              <small>Documented read endpoints for agents and researchers</small>
            </span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </nav>
      </section>

      <section className="filter-bar" aria-label="Source filters">
        <label>
          <Filter size={15} aria-hidden="true" />
          <span>Minimum reliability</span>
          <select
            value={minimumRating}
            onChange={(event) => setMinimumRating(Number(event.target.value))}
          >
            <option value={1}>Any reviewed source</option>
            <option value={2}>Limited or stronger</option>
            <option value={3}>Context or stronger</option>
            <option value={4}>Strong or authoritative</option>
            <option value={5}>Authoritative for stated use</option>
          </select>
        </label>
        <label>
          <span>Source type</span>
          <select value={sourceType} onChange={(event) => setSourceType(event.target.value)}>
            <option value="all">All types</option>
            {sourceTypes.map((type) => (
              <option key={type} value={type}>
                {sentenceCase(type)}
              </option>
            ))}
          </select>
        </label>
        <span className="filter-bar__result">{filtered.length} shown</span>
      </section>

      <section className="source-table" aria-label="Source ledger">
        <div className="source-table__header" aria-hidden="true">
          <span>Reliability for use</span>
          <span>Source and provenance</span>
          <span>Best used for</span>
          <span>Limitation</span>
          <span />
        </div>
        {filtered.map((source) => (
          <article key={source.id}>
            <SourceRating rating={source.reliability} />
            <div className="source-table__identity">
              <strong>{source.title}</strong>
              <span>
                {source.publisher} · {sentenceCase(source.sourceType)}
              </span>
              {source.author && <span>By {source.author}</span>}
              <span className="source-table__dates">
                {source.publishedDate
                  ? `Published ${formatDate(source.publishedDate)}`
                  : 'Publication date not listed'}
                {' · '}Accessed {formatDate(source.accessedDate)}
              </span>
              <small>{source.ratingReason}</small>
            </div>
            <p>{source.bestFor}</p>
            <p>{source.limitations}</p>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label={`Open ${source.title}`}
              title={`Open ${source.title}`}
            >
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </article>
        ))}
      </section>
    </div>
  )
}
