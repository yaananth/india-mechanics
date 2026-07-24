import type { LeaderTerm } from '../types.ts'

function termYears(startDate?: string, endDate?: string | null) {
  if (!startDate) return null
  const start = startDate.slice(0, 4)
  const end = endDate ? endDate.slice(0, 4) : 'present'
  return start === end ? start : `${start}–${end}`
}

export function GovernmentIdentity({
  leaderName,
  party,
  officeLabel,
  startDate,
  endDate,
  compact = false,
}: {
  leaderName: string
  party: LeaderTerm['party']
  officeLabel?: string
  startDate?: string
  endDate?: string | null
  compact?: boolean
}) {
  const term = termYears(startDate, endDate)
  return (
    <span
      className={`government-identity ${compact ? 'is-compact' : ''}`}
    >
      <span className="government-identity__leader">
        {party && (
          <i
            aria-hidden="true"
            style={{ backgroundColor: party.color }}
          />
        )}
        <strong>{leaderName}</strong>
        {party && <em>{party.shortName}</em>}
      </span>
      {(officeLabel || term) && (
        <small>
          {[officeLabel, term].filter(Boolean).join(' · ')}
        </small>
      )}
    </span>
  )
}
