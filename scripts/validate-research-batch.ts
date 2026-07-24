import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

type RatingInputs = {
  controllingRecord: boolean
  primaryDirect: boolean
  namedEvidence: boolean
  transparentMethod: boolean
  independent: boolean
  stableArchive: boolean
  anonymous: boolean
  partisan: boolean
  brokenProvenance: boolean
}

type Candidate = {
  id: string
  url: string
  sourceRegistryId: string | null
  sourceClass: string
  independenceGroup: string
  ratingInputs: RatingInputs
  rating: number
  reviewStatus: 'accepted' | 'rejected'
  rejectionReason?: string
}

type Batch = {
  batchId: string
  rosterVersion: string
  lane: string
  throughDate: string
  reviewer: string
  candidates: Candidate[]
}

function deterministicRating(inputs: RatingInputs) {
  let score = 1
  if (inputs.controllingRecord) score += 2
  if (inputs.primaryDirect) score += 1
  if (inputs.namedEvidence) score += 0.5
  if (inputs.transparentMethod) score += 0.5
  if (inputs.independent) score += 0.5
  if (inputs.stableArchive) score += 0.5
  if (inputs.anonymous) score -= 1
  if (inputs.partisan) score -= 0.5
  if (inputs.brokenProvenance) score -= 2
  return Math.max(1, Math.min(5, Math.round(score)))
}

const batchPath = resolve(
  process.argv[2] ?? 'research/fcra-2026-batch.example.json',
)
const roster = JSON.parse(
  await readFile(resolve('research/source-roster.json'), 'utf8'),
) as { version: string; sources: Array<{ id: string; ratingCeiling: number }> }
const batch = JSON.parse(await readFile(batchPath, 'utf8')) as Batch
const errors: string[] = []
const rosterIds = new Set<string>()

for (const source of roster.sources) {
  if (rosterIds.has(source.id)) {
    errors.push(`Duplicate source registry ID: ${source.id}`)
  }
  rosterIds.add(source.id)
}

if (batch.rosterVersion !== roster.version) {
  errors.push(
    `Batch roster ${batch.rosterVersion} does not match ${roster.version}.`,
  )
}
if (!batch.reviewer) errors.push('A reviewer is required.')
if (!/^\d{4}-\d{2}-\d{2}$/.test(batch.throughDate)) {
  errors.push('throughDate must be an ISO date.')
}

const urls = new Set<string>()
for (const candidate of batch.candidates) {
  if (urls.has(candidate.url)) errors.push(`Duplicate URL: ${candidate.url}`)
  urls.add(candidate.url)
  const computed = deterministicRating(candidate.ratingInputs)
  if (candidate.rating !== computed) {
    errors.push(
      `${candidate.id}: rating ${candidate.rating} does not match deterministic ${computed}.`,
    )
  }
  const registry = roster.sources.find(
    (source) => source.id === candidate.sourceRegistryId,
  )
  if (registry && candidate.rating > registry.ratingCeiling) {
    errors.push(
      `${candidate.id}: rating exceeds ${registry.id} ceiling ${registry.ratingCeiling}.`,
    )
  }
  if (candidate.reviewStatus === 'rejected' && !candidate.rejectionReason) {
    errors.push(`${candidate.id}: rejected candidates need a reason.`)
  }
  if (candidate.reviewStatus === 'accepted' && candidate.rating < 3) {
    errors.push(`${candidate.id}: weak evidence cannot be accepted for publication.`)
  }
}

const accepted = batch.candidates.filter(
  (candidate) => candidate.reviewStatus === 'accepted',
)
if (batch.lane === 'breaking-news') {
  const classes = new Set(accepted.map((candidate) => candidate.sourceClass))
  if (!classes.has('official') || !classes.has('independent-national')) {
    errors.push(
      'Breaking news requires official/direct and independent-national evidence.',
    )
  }
}
if (batch.lane === 'sensitive-event') {
  const classes = new Set(accepted.map((candidate) => candidate.sourceClass))
  for (const required of ['official', 'independent-national', 'local-field']) {
    if (!classes.has(required)) {
      errors.push(`Sensitive events require ${required} evidence.`)
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(
    `Valid research batch ${batch.batchId}: ${accepted.length} accepted, ${
      batch.candidates.length - accepted.length
    } rejected.`,
  )
}
