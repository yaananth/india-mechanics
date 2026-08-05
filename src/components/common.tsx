import {
  ChevronDown,
  ExternalLink,
  Info,
  ShieldCheck,
  ShieldQuestion,
  ShieldX,
} from 'lucide-react'
import type { Claim, Confidence, Source } from '../types.ts'
import { formatDate, sentenceCase } from '../utils.ts'
import { useEditorialLayer } from '../editorial-layer-context.ts'

export function ConfidenceMark({
  confidence,
  compact = false,
}: {
  confidence: Confidence
  compact?: boolean
}) {
  const Icon =
    confidence === 'high'
      ? ShieldCheck
      : confidence === 'medium'
        ? ShieldQuestion
        : ShieldX
  return (
    <span className={`confidence confidence--${confidence}`} title={`${confidence} confidence`}>
      <Icon size={14} aria-hidden="true" />
      {!compact && <span>{confidence}</span>}
    </span>
  )
}

export function SourceRating({
  rating,
  compact = false,
  force = false,
}: {
  rating: number
  compact?: boolean
  force?: boolean
}) {
  const { showEditorial } = useEditorialLayer()
  if (!showEditorial && !force) return null
  const level = Math.max(1, Math.min(5, Math.round(rating)))
  const labels = ['Weak', 'Limited', 'Context', 'Strong', 'Authoritative']
  const label = labels[level - 1]

  return (
    <span
      className={`source-rating ${compact ? 'is-compact' : ''}`}
      aria-label={`Source reliability: ${label}`}
      title={`Source reliability: ${label}`}
    >
      <span className="source-rating__scale" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <i
            key={index}
            className={index + 1 === level ? 'is-current' : undefined}
          />
        ))}
      </span>
      {!compact && <span className="source-rating__label">{label}</span>}
    </span>
  )
}

export function SourceLinks({
  sources,
  limit,
}: {
  sources: Source[]
  limit?: number
}) {
  const { showEditorial } = useEditorialLayer()
  const visible = typeof limit === 'number' ? sources.slice(0, limit) : sources
  return (
    <div className="source-links" aria-label="Sources">
      {visible.map((source) => (
        <a
          key={source.id}
          href={source.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open source: ${source.title} (${source.publisher})`}
          title={`${source.publisher} · ${sentenceCase(source.sourceType)}. Best used for: ${source.bestFor}.${showEditorial ? ` Editorial source-fitness rationale: ${source.ratingReason}.` : ''} Limitation: ${source.limitations}`}
        >
          <SourceRating rating={source.reliability} compact />
          <span>{source.title}</span>
          <ExternalLink size={12} aria-hidden="true" />
        </a>
      ))}
      {limit && sources.length > limit && (
        <span className="source-links__more">+{sources.length - limit} more</span>
      )}
    </div>
  )
}

function evidenceRoleLabel(role: Claim['sourceRefs'][number]['evidenceRole']) {
  if (role === 'controls') return 'Controlling record'
  if (role === 'supports') return 'Supporting evidence'
  if (role === 'disputes') return 'Contrary evidence'
  if (role === 'context') return 'Context'
  return 'Role not yet classified'
}

export function ClaimSources({ claim }: { claim: Claim }) {
  const sourceRefs =
    claim.sourceRefs.length > 0
      ? claim.sourceRefs
      : claim.sources.map((source) => ({
          sourceId: source.id,
          evidenceRole: 'unspecified' as const,
          locator: null,
          claimSpecificLimitation: null,
          extractionMethod: null,
          reportedValue: null,
          reportedUnit: null,
          reportedAt: null,
          source,
        }))

  return (
    <details className="claim-sources" data-claim-id={claim.id}>
      <summary>
        <span>
          {sentenceCase(claim.claimLayer ?? 'mixed')} sourced claim ·{' '}
          {sourceRefs.length}{' '}
          cited {sourceRefs.length === 1 ? 'source' : 'sources'} · claim {claim.id}
        </span>
        <ChevronDown size={14} aria-hidden="true" />
      </summary>
      <div className="claim-sources__list">
        <p className="claim-sources__review">
          Claim status: {sentenceCase(claim.reviewStatus)} · layer:{' '}
          {claim.claimLayer} · evidence cutoff {claim.knowledgeCutoff}
          {claim.reviewedAt
            ? ` · reviewed ${formatDate(claim.reviewedAt)}`
            : ''}
          {claim.supersedesClaimId
            ? ` · supersedes ${claim.supersedesClaimId}`
            : ''}
        </p>
        {claim.correctionNote && (
          <p className="claim-sources__correction">
            <strong>Correction:</strong> {claim.correctionNote}
          </p>
        )}
        {sourceRefs.map((sourceRef) => {
          const source =
            sourceRef.source ??
            claim.sources.find(
              (candidate) => candidate.id === sourceRef.sourceId,
            ) ??
            null
          return (
            <article
              key={`${claim.id}-${sourceRef.sourceId}`}
              className="claim-source"
            >
              <header>
                <span className="claim-source__role">
                  {evidenceRoleLabel(sourceRef.evidenceRole)}
                </span>
                {source ? (
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                ) : (
                  <strong>{sourceRef.sourceId}</strong>
                )}
              </header>
              {source && (
                <>
                  <p className="claim-source__meta">
                    {source.publisher} · {sentenceCase(source.sourceType)}
                    {source.publishedDate
                      ? ` · published ${formatDate(source.publishedDate)}`
                      : ''}
                  </p>
                  <dl>
                    <div>
                      <dt>Best used for</dt>
                      <dd>{source.bestFor}</dd>
                    </div>
                    <div>
                      <dt>Limitation</dt>
                      <dd>{source.limitations}</dd>
                    </div>
                    {sourceRef.locator && (
                      <div>
                        <dt>Claim locator</dt>
                        <dd>{sourceRef.locator}</dd>
                      </div>
                    )}
                    {sourceRef.claimSpecificLimitation && (
                      <div>
                        <dt>Claim-specific limit</dt>
                        <dd>{sourceRef.claimSpecificLimitation}</dd>
                      </div>
                    )}
                  </dl>
                </>
              )}
            </article>
          )
        })}
      </div>
    </details>
  )
}

export function EditorialLabel() {
  return (
    <span
      className="editorial-label"
      title="A sourced editorial judgment, not a measured fact"
    >
      <Info size={13} aria-hidden="true" />
      editorial estimate
    </span>
  )
}

export function LoadingState({ label = 'Loading evidence' }: { label?: string }) {
  return (
    <div className="loading-state" role="status">
      <span className="loading-state__bar" />
      <span>{label}</span>
    </div>
  )
}

export function ErrorState({
  message,
  retry,
}: {
  message: string
  retry?: () => void
}) {
  return (
    <div className="error-state" role="alert">
      <strong>Could not load this evidence.</strong>
      <span>{message}</span>
      {retry && (
        <button type="button" onClick={retry}>
          Retry
        </button>
      )}
    </div>
  )
}
