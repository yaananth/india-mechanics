import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import {
  claims,
  events,
  leaderTerms,
  policies,
  sources,
} from '../server/seed-data/catalog.ts'
import {
  semiconductorClaims,
  semiconductorEvents,
  semiconductorPolicies,
  semiconductorSources,
} from '../server/seed-data/semiconductors.ts'

type HeardClaim = {
  id: string
  submittedClaim: string
  verdict:
    | 'true'
    | 'substantially-true-missing-context'
    | 'mixed'
    | 'false'
    | 'unsubstantiated'
  factCheck: string
  missingContext: string[]
  eventId: string
  policyId: string
  leaderTermId: string
  claimId: string
  ratingTreatment: 'score-change' | 'rationale-only' | 'no-rating-impact'
  ratingReason: string
  sourceIds: string[]
}

type HeardClaimsFile = {
  version: string
  reviewedThrough: string
  queryTemplateVersion: string
  records: HeardClaim[]
}

type QueryTemplates = {
  version: string
}

const [heardClaims, queryTemplates] = await Promise.all([
  readFile(resolve('research/heard-claims.json'), 'utf8').then(
    (contents) => JSON.parse(contents) as HeardClaimsFile,
  ),
  readFile(resolve('research/query-templates.json'), 'utf8').then(
    (contents) => JSON.parse(contents) as QueryTemplates,
  ),
])

const errors: string[] = []
const allSources = [...sources, ...semiconductorSources]
const allEvents = [...events, ...semiconductorEvents]
const allPolicies = [...policies, ...semiconductorPolicies]
const allClaims = [...claims, ...semiconductorClaims]
const sourceById = new Map(allSources.map((source) => [source.id, source]))
const eventIds = new Set(allEvents.map((event) => event.id))
const policyIds = new Set(allPolicies.map((policy) => policy.id))
const leaderTermIds = new Set(leaderTerms.map((term) => term.id))
const claimById = new Map(allClaims.map((claim) => [claim.id, claim]))
const recordIds = new Set<string>()

if (heardClaims.queryTemplateVersion !== queryTemplates.version) {
  errors.push(
    `Heard-claim query template ${heardClaims.queryTemplateVersion} does not match ${queryTemplates.version}.`,
  )
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(heardClaims.reviewedThrough)) {
  errors.push('Heard-claim reviewedThrough must be an ISO date.')
}

for (const record of heardClaims.records) {
  if (recordIds.has(record.id)) {
    errors.push(`Duplicate heard-claim ID: ${record.id}`)
  }
  recordIds.add(record.id)
  if (!record.submittedClaim.trim() || !record.factCheck.trim()) {
    errors.push(`${record.id}: claim and fact-check text are required.`)
  }
  if (record.missingContext.length === 0) {
    errors.push(`${record.id}: at least one missing-context item is required.`)
  }
  if (!eventIds.has(record.eventId)) {
    errors.push(`${record.id}: unknown event ${record.eventId}.`)
  }
  if (!policyIds.has(record.policyId)) {
    errors.push(`${record.id}: unknown policy ${record.policyId}.`)
  }
  if (!leaderTermIds.has(record.leaderTermId)) {
    errors.push(`${record.id}: unknown leader term ${record.leaderTermId}.`)
  }
  const publishedClaim = claimById.get(record.claimId)
  if (
    !publishedClaim ||
    publishedClaim.eventId !== record.eventId ||
    publishedClaim.policyId !== record.policyId ||
    publishedClaim.leaderTermId !== record.leaderTermId
  ) {
    errors.push(`${record.id}: published claim bridge is missing or mismatched.`)
  }
  if (!record.ratingReason.trim()) {
    errors.push(`${record.id}: rating treatment requires a reason.`)
  }

  const evidence = record.sourceIds.map((sourceId) => sourceById.get(sourceId))
  if (evidence.some((source) => !source)) {
    errors.push(`${record.id}: one or more source IDs are unknown.`)
    continue
  }
  if (!evidence.some((source) => source && source.reliability === 5)) {
    errors.push(`${record.id}: requires at least one direct 5/5 source item.`)
  }
  if (
    !evidence.some(
      (source) =>
        source &&
        (source.sourceType.includes('independent') ||
          source.sourceType.includes('multilateral')),
    )
  ) {
    errors.push(`${record.id}: requires independent corroboration.`)
  }
  for (const source of evidence) {
    if (
      source &&
      ['facebook.com', 'instagram.com', 'x.com', 'twitter.com'].some((host) =>
        source.url.includes(host),
      )
    ) {
      errors.push(`${record.id}: social media cannot be published as proof.`)
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(
    `Valid ${heardClaims.version}: ${heardClaims.records.length} fact-checked heard claim published.`,
  )
}
