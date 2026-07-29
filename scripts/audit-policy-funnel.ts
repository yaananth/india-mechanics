import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import {
  claims,
  events,
  policies,
  sources,
} from '../server/seed-data/catalog.ts'
import {
  semiconductorClaims,
  semiconductorEvents,
  semiconductorPolicies,
  semiconductorSources,
} from '../server/seed-data/semiconductors.ts'
import { reviewedPolicyRegisterMatchers } from '../server/seed-data/policy-register-links.ts'
import { researchMetadata } from '../server/seed-data/research-metadata.ts'

type FunnelRecord = {
  eventId: string
  disposition: 'linked-policy' | 'timeline-only' | 'candidate'
  policyId?: string
  reason: string
}

type Funnel = {
  version: string
  reviewedThrough: string
  queryTemplateVersion: string
  records: FunnelRecord[]
}

type GeneratedBills = {
  bills: Array<{
    id: string
    linkedPolicyId?: string
    reviewStatus: 'discovered' | 'reviewing' | 'reviewed'
  }>
}

type QueryTemplates = {
  version: string
}

const [funnel, generatedBills, queryTemplates] = await Promise.all([
  readFile(resolve('research/policy-funnel.json'), 'utf8').then(
    (contents) => JSON.parse(contents) as Funnel,
  ),
  readFile(resolve('server/seed-data/generated-bills.json'), 'utf8').then(
    (contents) => JSON.parse(contents) as GeneratedBills,
  ),
  readFile(resolve('research/query-templates.json'), 'utf8').then(
    (contents) => JSON.parse(contents) as QueryTemplates,
  ),
])

const errors: string[] = []
const allPolicies = [...policies, ...semiconductorPolicies]
const allEvents = [...events, ...semiconductorEvents]
const allClaims = [...claims, ...semiconductorClaims]
const allSources = [...sources, ...semiconductorSources]
const policyIds = new Set(allPolicies.map((policy) => policy.id))
const eventIds = new Set(allEvents.map((event) => event.id))
const lawSourceIds = new Set(
  allSources
    .filter((source) =>
      ['law', 'official-parliamentary-register'].includes(source.sourceType),
    )
    .map((source) => source.id),
)
const lawBackedEventIds = new Set(
  allEvents
    .filter((event) =>
      event.sourceIds.some((sourceId) => lawSourceIds.has(sourceId)),
    )
    .map((event) => event.id),
)
const funnelByEvent = new Map<string, FunnelRecord>()

if (funnel.reviewedThrough !== researchMetadata.editorialReviewedThrough) {
  errors.push(
    `Policy funnel review ${funnel.reviewedThrough} does not match editorial review ${researchMetadata.editorialReviewedThrough}.`,
  )
}
if (funnel.queryTemplateVersion !== queryTemplates.version) {
  errors.push(
    `Policy funnel query template ${funnel.queryTemplateVersion} does not match ${queryTemplates.version}.`,
  )
}

for (const record of funnel.records) {
  if (funnelByEvent.has(record.eventId)) {
    errors.push(`Duplicate policy-funnel event: ${record.eventId}`)
  }
  funnelByEvent.set(record.eventId, record)
  if (!eventIds.has(record.eventId)) {
    errors.push(`Policy funnel references unknown event: ${record.eventId}`)
  }
  if (!record.reason.trim()) {
    errors.push(`Policy funnel record needs a reason: ${record.eventId}`)
  }
}

for (const eventId of lawBackedEventIds) {
  if (!funnelByEvent.has(eventId)) {
    errors.push(`Law-backed event lacks a policy-funnel review: ${eventId}`)
  }
}

for (const record of funnel.records) {
  if (record.disposition !== 'linked-policy') continue
  if (!record.policyId || !policyIds.has(record.policyId)) {
    errors.push(
      `Linked funnel event ${record.eventId} has an unknown policy: ${record.policyId ?? 'missing'}`,
    )
    continue
  }
  const claimBridge = allClaims.some(
    (claim) =>
      claim.eventId === record.eventId && claim.policyId === record.policyId,
  )
  if (!claimBridge) {
    errors.push(
      `Linked funnel event ${record.eventId} lacks a reviewed event-policy claim bridge to ${record.policyId}.`,
    )
  }
  const billBridge = generatedBills.bills.some(
    (bill) =>
      bill.linkedPolicyId === record.policyId &&
      bill.reviewStatus === 'reviewed',
  )
  if (!billBridge) {
    errors.push(
      `Linked funnel policy ${record.policyId} lacks a reviewed parliamentary-register record.`,
    )
  }
}

for (const matcher of reviewedPolicyRegisterMatchers) {
  if (!policyIds.has(matcher.policyId)) {
    errors.push(
      `Policy-register matcher references unpublished policy: ${matcher.policyId}`,
    )
  }
}

for (const bill of generatedBills.bills) {
  if (bill.linkedPolicyId && !policyIds.has(bill.linkedPolicyId)) {
    errors.push(
      `Bill ${bill.id} links to unpublished policy ${bill.linkedPolicyId}.`,
    )
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  const linked = funnel.records.filter(
    (record) => record.disposition === 'linked-policy',
  ).length
  const candidates = funnel.records.filter(
    (record) => record.disposition === 'candidate',
  ).length
  console.log(
    `Valid ${funnel.version}: ${lawBackedEventIds.size} law-backed events reviewed, ${linked} linked policies, ${candidates} queued candidates.`,
  )
}
