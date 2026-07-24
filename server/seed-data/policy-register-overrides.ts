import type { PolicyRegisterSeed } from '../types.ts'

type PolicyRegisterOverride = {
  matches: (record: PolicyRegisterSeed) => boolean
  status: string
  statusAsOf: string
  statusNote: string
  statusSourceId: string
}

const overrides: PolicyRegisterOverride[] = [
  {
    matches: (record) =>
      record.introducedDate === '2026-04-16' &&
      record.title.toUpperCase().replace(/\.$/, '') ===
        'THE DELIMITATION BILL, 2026',
    status: 'Infructuous',
    statusAsOf: '2026-04-17',
    statusNote:
      'The bill was not proceeded with after the linked Constitution (One Hundred and Thirty-First Amendment) Bill, 2026 was negatived. PRS records the Delimitation Bill as infructuous.',
    statusSourceId: 'prs-delimitation-bill-2026',
  },
]

export function applyPolicyRegisterOverride(
  record: PolicyRegisterSeed,
): PolicyRegisterSeed {
  const override = overrides.find((candidate) => candidate.matches(record))
  if (!override) return record
  return {
    ...record,
    sourceStatus: record.sourceStatus ?? record.status,
    status: override.status,
    statusAsOf: override.statusAsOf,
    statusNote: override.statusNote,
    statusSourceId: override.statusSourceId,
  }
}
