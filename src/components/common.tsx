import {
  ExternalLink,
  Info,
  ShieldCheck,
  ShieldQuestion,
  ShieldX,
} from 'lucide-react'
import type { Confidence, Source } from '../types.ts'

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
}: {
  rating: number
  compact?: boolean
}) {
  const level = Math.max(1, Math.min(5, Math.round(rating)))
  const labels = ['Weak', 'Limited', 'Context', 'Strong', 'Direct']
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
  const visible = typeof limit === 'number' ? sources.slice(0, limit) : sources
  return (
    <div className="source-links" aria-label="Sources">
      {visible.map((source) => (
        <a
          key={source.id}
          href={source.url}
          target="_blank"
          rel="noreferrer"
          title={`${source.ratingReason} Limitation: ${source.limitations}`}
        >
          <SourceRating rating={source.reliability} compact />
          <span>{source.publisher}</span>
          <ExternalLink size={12} aria-hidden="true" />
        </a>
      ))}
      {limit && sources.length > limit && (
        <span className="source-links__more">+{sources.length - limit} more</span>
      )}
    </div>
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
