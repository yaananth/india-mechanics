type JsonRecord = Record<string, unknown>

export type LeaderLlmDocumentOptions = {
  maxClaims?: number
  maxSources?: number
  includeEditorial?: boolean
}

const DEFAULT_MAX_CLAIMS = 36
const DEFAULT_MAX_SOURCES = 18
const MAX_TEXT = 1_200
const claimOrder = ['achievement', 'concern', 'mixed', 'context']

function record(value: unknown): JsonRecord {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as JsonRecord)
    : {}
}

function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

function text(value: unknown, limit = MAX_TEXT): string {
  if (typeof value !== 'string') return ''
  const normalized = value.replace(/\s+/g, ' ').trim()
  return normalized.length <= limit
    ? normalized
    : `${normalized.slice(0, Math.max(0, limit - 1)).trimEnd()}…`
}

function numberOrNull(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeMarkdown(value: unknown): string {
  return String(value ?? '').replace(/([\\`*_[\]<>])/g, '\\$1')
}

function safeUrl(value: unknown): string {
  const candidate = text(value, 2_000)
  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' || url.protocol === 'http:'
      ? url.toString()
      : ''
  } catch {
    return ''
  }
}

function clampLimit(value: number | undefined, fallback: number, maximum: number) {
  if (!Number.isInteger(value)) return fallback
  return Math.max(0, Math.min(value as number, maximum))
}

function normalizeSource(value: unknown, includeEditorial: boolean) {
  const source = record(value)
  const id = text(source.id, 160)
  const url = safeUrl(source.url)
  if (!id && !url) return null
  return {
    id: id || url,
    title: text(source.title, 300),
    publisher: text(source.publisher, 160),
    url,
    sourceType: text(source.sourceType, 100),
    reliability: includeEditorial ? numberOrNull(source.reliability) : null,
    publishedDate: text(source.publishedDate, 30) || null,
    accessedDate: text(source.accessedDate, 30) || null,
    bestFor: text(source.bestFor, 500),
    ratingReason: includeEditorial ? text(source.ratingReason, 500) : '',
    limitations: text(source.limitations, 700),
  }
}

function collectSourceCandidates(term: JsonRecord) {
  const values = [...list(term.sources)]
  for (const claimValue of list(term.claims)) {
    const claim = record(claimValue)
    values.push(...list(claim.sources))
    for (const sourceRefValue of list(claim.sourceRefs)) {
      values.push(record(sourceRefValue).source)
    }
  }
  const scorecard = record(term.scorecard)
  for (const categoryValue of list(scorecard.categories)) {
    for (const diveValue of list(record(categoryValue).deepDives)) {
      values.push(...list(record(diveValue).sources))
    }
  }
  for (const diveValue of list(term.specialistAssessments)) {
    values.push(...list(record(diveValue).sources))
  }
  return values
}

function normalizeSpecialist(value: unknown) {
  const specialist = record(value)
  return {
    id: text(specialist.id, 160),
    topicId: text(specialist.topicId, 160),
    topicName: text(specialist.topicName, 240),
    summary: text(specialist.summary),
    confidence: text(specialist.confidence, 30) || null,
    status: text(specialist.status, 40),
    assessmentAsOf: text(specialist.assessmentAsOf, 30) || null,
    operational: {
      label: text(specialist.operationalLabel, 160),
      score: numberOrNull(specialist.operationalScore),
    },
    adjusted: {
      label: text(specialist.adjustedLabel, 160),
      score: numberOrNull(specialist.adjustedScore),
    },
    methodology: text(specialist.methodology, 700),
  }
}

export function buildCompactLeaderDocument(
  input: unknown,
  options: LeaderLlmDocumentOptions = {},
) {
  const term = record(input)
  const person = record(term.person)
  const office = record(term.office)
  const party = record(term.party)
  const jurisdiction = record(term.jurisdiction)
  const publication = record(term.publication)
  const scorecard = record(term.scorecard)
  const includeEditorial = options.includeEditorial === true
  const maxClaims = clampLimit(options.maxClaims, DEFAULT_MAX_CLAIMS, 100)
  const maxSources = clampLimit(options.maxSources, DEFAULT_MAX_SOURCES, 120)

  const allClaims = list(term.claims)
    .map((value) => {
      const claim = record(value)
      const claimSources = list(claim.sources)
        .map((source) => normalizeSource(source, includeEditorial))
        .filter(
          (
            source,
          ): source is NonNullable<ReturnType<typeof normalizeSource>> =>
            source !== null,
        )
      const claimSourceById = new Map(
        claimSources.map((source) => [source.id, source]),
      )
      const rawSourceRefs =
        list(claim.sourceRefs).length > 0
          ? list(claim.sourceRefs)
          : list(claim.sourceIds).map((sourceId) => ({
              sourceId,
              evidenceRole: 'unspecified',
            }))
      const sourceRefs = rawSourceRefs.map((value) => {
        const sourceRef = record(value)
        const sourceId = text(sourceRef.sourceId, 160)
        const nestedSource = normalizeSource(
          sourceRef.source,
          includeEditorial,
        )
        return {
          sourceId,
          evidenceRole:
            text(sourceRef.evidenceRole, 40) || 'unspecified',
          locator: text(sourceRef.locator, 500) || null,
          claimSpecificLimitation:
            text(sourceRef.claimSpecificLimitation, 700) || null,
          extractionMethod:
            text(sourceRef.extractionMethod, 100) || null,
          reportedValue: numberOrNull(sourceRef.reportedValue),
          reportedUnit: text(sourceRef.reportedUnit, 80) || null,
          reportedAt: text(sourceRef.reportedAt, 30) || null,
          source:
            nestedSource ??
            claimSourceById.get(sourceId) ??
            null,
        }
      })
      return {
        id: text(claim.id, 160),
        title: text(claim.title, 300),
        body: text(claim.body),
        stance: text(claim.stance, 40) || 'context',
        category: text(claim.category, 120) || 'uncategorized',
        claimLayer: text(claim.claimLayer, 40) || 'mixed',
        confidence: text(claim.confidence, 30) || null,
        asOfDate: text(claim.asOfDate, 30) || null,
        reviewStatus: text(claim.reviewStatus, 40) || null,
        sensitivity: text(claim.sensitivity, 40) || null,
        reviewedAt: text(claim.reviewedAt, 30) || null,
        knowledgeCutoff: text(claim.knowledgeCutoff, 30) || null,
        supersedesClaimId:
          text(claim.supersedesClaimId, 160) || null,
        correctionNote: text(claim.correctionNote, 700) || null,
        usedInEditorialAnswer: Boolean(claim.usedInEditorialAnswer),
        sourceIds: sourceRefs.map((sourceRef) => sourceRef.sourceId),
        sourceRefs,
      }
    })
    .filter((claim) => claim.id || claim.title || claim.body)
  const editorialClaimIdsOmitted = includeEditorial
    ? []
    : allClaims
        .filter((claim) => claim.claimLayer === 'editorial')
        .map((claim) => claim.id)
  const eligibleClaims = includeEditorial
    ? allClaims
    : allClaims.filter((claim) => claim.claimLayer !== 'editorial')
  const stanceBuckets = new Map<string, typeof allClaims>()
  for (const claim of eligibleClaims) {
    const bucket = stanceBuckets.get(claim.stance) ?? []
    bucket.push(claim)
    stanceBuckets.set(claim.stance, bucket)
  }
  const orderedStances = [
    ...claimOrder.filter((stance) => stanceBuckets.has(stance)),
    ...[...stanceBuckets.keys()].filter(
      (stance) => !claimOrder.includes(stance),
    ),
  ]
  const claims: typeof allClaims = []
  const retainedClaimSourceIds = new Set<string>()
  const maxDepth = Math.max(
    0,
    ...orderedStances.map(
      (stance) => stanceBuckets.get(stance)?.length ?? 0,
    ),
  )
  for (
    let index = 0;
    index < maxDepth && claims.length < maxClaims;
    index += 1
  ) {
    let added = false
    for (const stance of orderedStances) {
      const claim = stanceBuckets.get(stance)?.[index]
      if (!claim) continue
      const complete = claim.sourceRefs.every(
        (sourceRef) => sourceRef.source !== null,
      )
      const newSourceIds = claim.sourceRefs
        .map((sourceRef) => sourceRef.sourceId)
        .filter((sourceId) => !retainedClaimSourceIds.has(sourceId))
      if (
        !complete ||
        retainedClaimSourceIds.size + newSourceIds.length > maxSources
      ) {
        continue
      }
      claims.push(claim)
      for (const sourceId of newSourceIds) {
        retainedClaimSourceIds.add(sourceId)
      }
      added = true
      if (claims.length === maxClaims) break
    }
    if (!added && index + 1 >= maxDepth) break
  }
  const omittedClaimIds = allClaims
    .filter((claim) => !claims.includes(claim))
    .map((claim) => claim.id)
  const publicClaims = claims.map((claim) => ({
    ...claim,
    recordType: 'sourced-claim' as const,
    factStatus:
      claim.claimLayer === 'factual'
        ? ('factual-claim' as const)
        : ('mixed-claim-not-a-measured-fact' as const),
    stance: includeEditorial ? claim.stance : null,
    category: includeEditorial ? claim.category : null,
    confidence: includeEditorial ? claim.confidence : null,
    sensitivity: includeEditorial ? claim.sensitivity : null,
    usedInEditorialAnswer: includeEditorial
      ? claim.usedInEditorialAnswer
      : null,
    sourceRefs: claim.sourceRefs.map(
      ({ source: _source, ...sourceRef }) => sourceRef,
    ),
  }))
  const claimsByStance = includeEditorial
    ? (Object.fromEntries(
        claimOrder
          .map((stance) => [
            stance,
            publicClaims.filter((claim) => claim.stance === stance),
          ])
          .filter(([, values]) => (values as unknown[]).length > 0),
      ) as Record<string, typeof publicClaims>)
    : { evidence: publicClaims }

  const sourceMap = new Map<string, NonNullable<ReturnType<typeof normalizeSource>>>()
  for (const claim of claims) {
    for (const sourceRef of claim.sourceRefs) {
      if (sourceRef.source && !sourceMap.has(sourceRef.sourceId)) {
        sourceMap.set(sourceRef.sourceId, sourceRef.source)
      }
    }
  }
  for (const value of collectSourceCandidates(term)) {
    if (sourceMap.size >= maxSources) break
    const source = normalizeSource(value, includeEditorial)
    if (!source) continue
    const key = source.id || source.url
    if (!sourceMap.has(key)) sourceMap.set(key, source)
  }
  const allCandidateSources = collectSourceCandidates(term)
    .map((source) => normalizeSource(source, includeEditorial))
    .filter(
      (
        source,
      ): source is NonNullable<ReturnType<typeof normalizeSource>> =>
        source !== null,
    )
  const allSourceIds = [
    ...new Set(allCandidateSources.map((source) => source.id)),
  ]
  const sources = [...sourceMap.values()]
  const omittedSourceIds = allSourceIds.filter(
    (sourceId) => !sourceMap.has(sourceId),
  )
  const scorecardCategories = list(scorecard.categories).slice(0, 6)
  const editorialDisplayBlocked =
    includeEditorial &&
    numberOrNull(scorecard.overallScore ?? term.ratingScore) !== null &&
    scorecardCategories.length !== 6
  const citationReady =
    omittedClaimIds.length === 0 && omittedSourceIds.length === 0

  const categories = includeEditorial && !editorialDisplayBlocked
    ? scorecardCategories
        .map((value) => {
          const category = record(value)
          return {
            id: text(category.id, 100),
            name: text(category.name, 200),
            score: numberOrNull(category.score),
            rationale: text(category.rationale),
            confidence: text(category.confidence, 30) || null,
            status: text(category.status, 40),
            assessmentAsOf: text(category.assessmentAsOf, 30) || null,
            deepDives: list(category.deepDives)
              .slice(0, 6)
              .map(normalizeSpecialist),
          }
        })
    : []

  return {
    documentType: includeEditorial
      ? 'leader-term-editorial-assessment'
      : 'leader-term-evidence',
    documentLayer: includeEditorial
      ? 'editorial-analysis'
      : 'facts-and-sources',
    identity: {
      termId: text(term.id, 160),
      leaderId: text(person.id, 160),
      leaderName: text(person.name, 240),
      officeId: text(office.id, 160),
      officeName: text(office.name, 240),
      party: term.party
        ? {
            id: text(party.id, 160),
            name: text(party.name, 240),
            shortName: text(party.shortName, 80),
          }
        : null,
      jurisdiction: {
        id: text(jurisdiction.id, 160),
        name: text(jurisdiction.name, 240),
        level: text(jurisdiction.level, 80),
      },
    },
    term: {
      startDate: text(term.startDate, 30),
      endDate: text(term.endDate, 30) || null,
      isActing: Boolean(term.isActing),
      mandateLabel: text(term.mandateLabel, 240) || null,
    },
    assessment: {
      included: includeEditorial,
      displayBlocked: editorialDisplayBlocked,
      citationReady,
      available:
        numberOrNull(scorecard.overallScore ?? term.ratingScore) !== null,
      status: text(scorecard.assessmentStatus, 40) || null,
      overallScore: includeEditorial && !editorialDisplayBlocked
        ? numberOrNull(scorecard.overallScore ?? term.ratingScore)
        : null,
      confidence: includeEditorial && !editorialDisplayBlocked
        ? text(term.ratingConfidence, 30) || null
        : null,
      asOfDate: text(term.assessmentAsOf, 30) || null,
      summary:
        includeEditorial && !editorialDisplayBlocked
          ? text(term.ratingSummary)
          : '',
      formula:
        includeEditorial && !editorialDisplayBlocked
          ? text(scorecard.formula, 700)
          : '',
      aggregation: includeEditorial && !editorialDisplayBlocked
        ? text(scorecard.aggregation, 80)
        : '',
      disclaimer:
        editorialDisplayBlocked
          ? 'Editorial score display is blocked because the complete six-category scorecard is unavailable.'
          : includeEditorial
          ? citationReady
            ? 'This is a sourced editorial assessment of one office term, not a measured fact. Category weights are normative. Observed change during a term does not by itself prove leader causation.'
            : 'This is a sourced editorial assessment, not a measured fact. The point score is visible, but this compact claim/source bundle is incomplete and is not citation-ready; open the full record before quoting or comparing it.'
          : 'Editorial scores and verdicts are intentionally omitted. Request layer=editorial only when the user explicitly wants the published judgment methodology.',
      termStatus:
        text(scorecard.termStatus, 40) ||
        (text(term.endDate, 30) ? 'completed' : 'ongoing'),
      assessmentWindow: {
        startDate:
          text(record(scorecard.assessmentWindow).startDate, 30) ||
          text(term.startDate, 30),
        endDate:
          text(record(scorecard.assessmentWindow).endDate, 30) ||
          text(term.endDate, 30) ||
          text(term.assessmentAsOf, 30) ||
          null,
        dataThrough:
          text(record(scorecard.assessmentWindow).dataThrough, 30) ||
          text(term.assessmentAsOf, 30) ||
          null,
        fixedWindowComparisonPublished: Boolean(
          record(scorecard.assessmentWindow).fixedWindowComparisonPublished,
        ),
        subperiodScoresPublished: Boolean(
          record(scorecard.assessmentWindow).subperiodScoresPublished,
        ),
      },
      weightsAreNormative: Boolean(scorecard.weightsAreNormative),
      normativeWeightNote: text(scorecard.normativeWeightNote, 700),
      normativeSensitivity: {
        minimum: numberOrNull(
          record(scorecard.normativeSensitivity).minimum,
        ),
        maximum: numberOrNull(
          record(scorecard.normativeSensitivity).maximum,
        ),
        note: text(record(scorecard.normativeSensitivity).note, 700),
      },
      comparisonLimit: text(scorecard.comparisonLimit, 900),
      falsifiersPublished: Boolean(scorecard.falsifiersPublished),
      falsifierNote: text(scorecard.falsifierNote, 900),
      categories,
    },
    publication: {
      canonicalUrl: safeUrl(publication.canonicalUrl),
      compactApiUrl: safeUrl(publication.compactApiUrl),
      fullRecordUrl: safeUrl(publication.fullRecordUrl),
      methodologyUrl: safeUrl(publication.methodologyUrl),
      llmsGuideUrl: safeUrl(publication.llmsGuideUrl),
      knowledgeCutoff: text(publication.knowledgeCutoff, 30) || null,
      editorialReviewedThrough:
        text(publication.editorialReviewedThrough, 30) || null,
      methodologyVersion: text(publication.methodologyVersion, 500) || null,
    },
    claimsByStance,
    sources,
    bounds: {
      claimsIncluded: claims.length,
      claimsOmitted: Math.max(0, allClaims.length - claims.length),
      omittedClaimIds,
      editorialClaimIdsOmitted,
      sourcesIncluded: sources.length,
      sourcesOmitted: omittedSourceIds.length,
      omittedSourceIds,
    },
  }
}

export type LeaderDocument = ReturnType<typeof buildCompactLeaderDocument>

export function renderLeaderMarkdown(data: LeaderDocument) {
  const title = `${data.identity.leaderName} — ${data.identity.officeName}`
  const markdown: string[] = [
    `# ${escapeMarkdown(title)}`,
    '',
    `- Display layer: ${escapeMarkdown(data.documentLayer)}`,
    `- Term: ${escapeMarkdown(data.term.startDate)} to ${escapeMarkdown(data.term.endDate ?? 'present')}`,
    `- Party: ${escapeMarkdown(data.identity.party?.name ?? 'None recorded')}`,
    `- Knowledge cutoff: ${escapeMarkdown(data.publication.knowledgeCutoff ?? 'Not recorded')}`,
    `- Full editorial review through: ${escapeMarkdown(data.publication.editorialReviewedThrough ?? 'Not recorded')}`,
    `- Methodology version: ${escapeMarkdown(data.publication.methodologyVersion ?? 'Not recorded')}`,
    '',
    `> ${data.assessment.disclaimer}`,
  ]
  if (data.assessment.included && !data.assessment.displayBlocked) {
    markdown.push(
      '',
      `- Editorial overall: ${data.assessment.overallScore ?? 'Not rated'}/10`,
      `- Editorial confidence: ${escapeMarkdown(data.assessment.confidence ?? 'Not assessed')}`,
      `- Assessment as of: ${escapeMarkdown(data.assessment.asOfDate ?? 'Not recorded')}`,
      `- Assessment status: ${escapeMarkdown(data.assessment.status ?? 'Not recorded')}`,
      `- Term status: ${escapeMarkdown(data.assessment.termStatus)}`,
      `- Assessment window: ${escapeMarkdown(data.assessment.assessmentWindow.startDate)} to ${escapeMarkdown(data.assessment.assessmentWindow.endDate ?? 'not recorded')}; data through ${escapeMarkdown(data.assessment.assessmentWindow.dataThrough ?? 'not recorded')}`,
      `- Citation ready: ${data.assessment.citationReady ? 'yes' : 'no — use the full record'}`,
      '',
      data.assessment.summary,
      '',
      '## Editorial scorecard',
      '',
      data.assessment.formula,
      '',
      data.assessment.normativeWeightNote,
      '',
      data.assessment.normativeSensitivity.minimum !== null &&
      data.assessment.normativeSensitivity.maximum !== null
        ? `Priority sensitivity: ${data.assessment.normativeSensitivity.minimum}–${data.assessment.normativeSensitivity.maximum}/10. ${data.assessment.normativeSensitivity.note}`
        : data.assessment.normativeSensitivity.note,
      '',
      data.assessment.comparisonLimit,
      '',
      data.assessment.falsifierNote,
    )
    for (const category of data.assessment.categories) {
      markdown.push(
        '',
        `### ${escapeMarkdown(category.name)}: ${category.score ?? 'N/A'}/10`,
        '',
        category.rationale || 'Not assessed.',
      )
      for (const dive of category.deepDives) {
        markdown.push(
          '',
          `#### ${escapeMarkdown(dive.topicName)}`,
          '',
          `${escapeMarkdown(dive.operational.label)}: ${dive.operational.score ?? 'N/A'}/10; ${escapeMarkdown(dive.adjusted.label)}: ${dive.adjusted.score ?? 'N/A'}/10.`,
          '',
          dive.summary,
        )
      }
    }
  }
  markdown.push('', '## Evidence records')
  const sourceById = new Map(
    data.sources.map((source) => [source.id, source]),
  )
  for (const [stance, groupedClaims] of Object.entries(data.claimsByStance)) {
    markdown.push('', `### ${escapeMarkdown(stance)}`)
    for (const claim of groupedClaims) {
      const claimMeta =
        data.documentLayer === 'facts-and-sources'
          ? `${claim.claimLayer} sourced claim; ${claim.factStatus}; ${claim.asOfDate ?? 'undated'}`
          : `${claim.confidence ?? 'unknown'}, ${claim.asOfDate ?? 'undated'}`
      markdown.push(
        '',
        `- **${escapeMarkdown(claim.title)}** (${escapeMarkdown(claimMeta)}): ${escapeMarkdown(claim.body)}`,
        `  - Claim review: ${escapeMarkdown(claim.reviewStatus ?? 'not recorded')}; evidence cutoff ${escapeMarkdown(claim.knowledgeCutoff ?? 'not recorded')}${claim.reviewedAt ? `; reviewed ${escapeMarkdown(claim.reviewedAt)}` : ''}${claim.supersedesClaimId ? `; supersedes ${escapeMarkdown(claim.supersedesClaimId)}` : ''}`,
      )
      if (claim.correctionNote) {
        markdown.push(
          `  - Correction: ${escapeMarkdown(claim.correctionNote)}`,
        )
      }
      for (const sourceRef of claim.sourceRefs) {
        const source = sourceById.get(sourceRef.sourceId)
        const sourceLabel = source?.url
          ? `[${escapeMarkdown(source.title || source.id)}](${source.url})`
          : escapeMarkdown(source?.title || sourceRef.sourceId)
        markdown.push(
          `  - Source (${escapeMarkdown(sourceRef.evidenceRole)}): ${sourceLabel}${sourceRef.locator ? `; locator: ${escapeMarkdown(sourceRef.locator)}` : ''}${sourceRef.claimSpecificLimitation ? `; claim-specific limitation: ${escapeMarkdown(sourceRef.claimSpecificLimitation)}` : ''}`,
        )
      }
    }
  }
  markdown.push('', '## Sources')
  for (const source of data.sources) {
    const link = source.url
      ? `[${escapeMarkdown(source.title || source.id)}](${source.url})`
      : escapeMarkdown(source.title || source.id)
    markdown.push(
      '',
      `- ${link} — ${escapeMarkdown(source.publisher)}; ${escapeMarkdown(source.sourceType || 'source type not recorded')}. Best used for: ${escapeMarkdown(source.bestFor || 'Not recorded.')}. Limitation: ${escapeMarkdown(source.limitations || 'Not recorded.')}${data.assessment.included ? `. Editorial source-fitness: ${source.reliability ?? 'N/A'}/5; rationale: ${escapeMarkdown(source.ratingReason || 'Not recorded.')}` : ''}`,
    )
  }
  markdown.push(
    '',
    '## Completeness',
    '',
    `- Claims included: ${data.bounds.claimsIncluded}`,
    `- Claims omitted: ${data.bounds.claimsOmitted}`,
    `- Editorial-only claim IDs omitted in facts mode: ${data.bounds.editorialClaimIdsOmitted.length > 0 ? data.bounds.editorialClaimIdsOmitted.map(escapeMarkdown).join(', ') : 'none'}`,
    `- Omitted claim IDs: ${data.bounds.omittedClaimIds.length > 0 ? data.bounds.omittedClaimIds.map(escapeMarkdown).join(', ') : 'none'}`,
    `- Sources included: ${data.bounds.sourcesIncluded}`,
    `- Sources omitted: ${data.bounds.sourcesOmitted}`,
    `- Omitted source IDs: ${data.bounds.omittedSourceIds.length > 0 ? data.bounds.omittedSourceIds.map(escapeMarkdown).join(', ') : 'none'}`,
    `- Editorial citation ready: ${data.assessment.citationReady ? 'yes' : 'no'}`,
  )
  if (data.bounds.claimsOmitted > 0 || data.bounds.sourcesOmitted > 0) {
    markdown.push(
      '',
      '> This compact document is incomplete. Do not quote a score or conclusion without checking the full record.',
    )
  }
  if (data.publication.canonicalUrl) {
    markdown.push(
      '',
      `Canonical page: ${data.publication.canonicalUrl}`,
    )
  }
  if (data.publication.methodologyUrl) {
    markdown.push(
      `Methodology: ${data.publication.methodologyUrl}`,
    )
  }
  if (data.publication.fullRecordUrl) {
    markdown.push(`Full record: ${data.publication.fullRecordUrl}`)
  }

  return markdown.join('\n')
}

export type LeaderHtmlOptions = {
  includeDocumentType?: boolean
}

export function renderLeaderHtml(
  data: LeaderDocument,
  options: LeaderHtmlOptions = {},
) {
  const title = `${data.identity.leaderName} — ${data.identity.officeName}`
  const categoryHtml = data.assessment.categories
    .map(
      (category) => `<section data-category="${escapeHtml(category.id)}">
<h3>${escapeHtml(category.name)}: ${escapeHtml(category.score ?? 'N/A')}/10</h3>
<p>${escapeHtml(category.rationale || 'Not assessed.')}</p>
${category.deepDives
  .map(
    (dive) => `<details><summary>${escapeHtml(dive.topicName)}</summary>
<p>${escapeHtml(dive.summary)}</p>
<dl><dt>${escapeHtml(dive.operational.label)}</dt><dd>${escapeHtml(dive.operational.score ?? 'N/A')}/10</dd><dt>${escapeHtml(dive.adjusted.label)}</dt><dd>${escapeHtml(dive.adjusted.score ?? 'N/A')}/10</dd></dl>
</details>`,
  )
  .join('')}
</section>`,
    )
    .join('')
  const claimsHtml = Object.entries(data.claimsByStance)
    .map(
      ([stance, groupedClaims]) => `<section data-stance="${escapeHtml(stance)}"><h3>${escapeHtml(stance)}</h3><ul>${groupedClaims
        .map(
          (claim) => {
            const refs = claim.sourceRefs
              .map((sourceRef) => {
                const source = data.sources.find(
                  (candidate) => candidate.id === sourceRef.sourceId,
                )
                const label = source?.url
                  ? `<a href="${escapeHtml(source.url)}" rel="noopener noreferrer">${escapeHtml(source.title || source.id)}</a>`
                  : escapeHtml(source?.title || sourceRef.sourceId)
                return `<li data-evidence-role="${escapeHtml(sourceRef.evidenceRole)}">${label}${sourceRef.locator ? ` <span>Locator: ${escapeHtml(sourceRef.locator)}</span>` : ''}${sourceRef.claimSpecificLimitation ? ` <span>Claim-specific limitation: ${escapeHtml(sourceRef.claimSpecificLimitation)}</span>` : ''}</li>`
              })
              .join('')
            const claimMeta =
              data.documentLayer === 'facts-and-sources'
                ? `${claim.claimLayer} sourced claim; ${claim.factStatus}; ${claim.asOfDate ?? 'undated'}`
                : `${claim.confidence ?? 'unknown'}, ${claim.asOfDate ?? 'undated'}`
            return `<li data-record-type="${escapeHtml(claim.recordType)}" data-claim-layer="${escapeHtml(claim.claimLayer)}"><strong>${escapeHtml(claim.title)}</strong> <span>(${escapeHtml(claimMeta)})</span><p>${escapeHtml(claim.body)}</p><p><small>Claim review: ${escapeHtml(claim.reviewStatus ?? 'not recorded')}; evidence cutoff ${escapeHtml(claim.knowledgeCutoff ?? 'not recorded')}${claim.reviewedAt ? `; reviewed ${escapeHtml(claim.reviewedAt)}` : ''}${claim.supersedesClaimId ? `; supersedes ${escapeHtml(claim.supersedesClaimId)}` : ''}</small></p>${claim.correctionNote ? `<p><strong>Correction:</strong> ${escapeHtml(claim.correctionNote)}</p>` : ''}<ul aria-label="Claim sources">${refs}</ul></li>`
          },
        )
        .join('')}</ul></section>`,
    )
    .join('')
  const sourcesHtml = data.sources
    .map(
      (source) => `<li id="source-${escapeHtml(source.id)}">${
        source.url
          ? `<a href="${escapeHtml(source.url)}" rel="noopener noreferrer">${escapeHtml(source.title || source.id)}</a>`
          : escapeHtml(source.title || source.id)
      } <span>${escapeHtml(source.publisher)} · ${escapeHtml(source.sourceType || 'source type not recorded')}</span><dl><dt>Best used for</dt><dd>${escapeHtml(source.bestFor || 'Not recorded.')}</dd><dt>Limitations</dt><dd>${escapeHtml(source.limitations || 'Not recorded.')}</dd>${data.assessment.included ? `<dt>Editorial source fitness</dt><dd>${escapeHtml(source.reliability ?? 'N/A')}/5</dd><dt>Fitness rationale</dt><dd>${escapeHtml(source.ratingReason || 'Not recorded.')}</dd>` : ''}</dl></li>`,
    )
    .join('')
  const documentTypeAttribute =
    options.includeDocumentType === false
      ? ''
      : ` data-document-type="${escapeHtml(data.documentType)}"`
  const editorialHtml =
    data.assessment.included && !data.assessment.displayBlocked
    ? `<p>${escapeHtml(data.assessment.summary)}</p><p><strong>Editorial assessment:</strong> ${escapeHtml(data.assessment.disclaimer)}</p><dl><dt>Editorial overall</dt><dd>${escapeHtml(data.assessment.overallScore ?? 'Not rated')}/10</dd><dt>Editorial confidence</dt><dd>${escapeHtml(data.assessment.confidence ?? 'Not assessed')}</dd><dt>Assessment status</dt><dd>${escapeHtml(data.assessment.status ?? 'Not recorded')}</dd><dt>Term status</dt><dd>${escapeHtml(data.assessment.termStatus)}</dd><dt>Assessment as of</dt><dd>${escapeHtml(data.assessment.asOfDate ?? 'Not recorded')}</dd><dt>Assessment window</dt><dd>${escapeHtml(data.assessment.assessmentWindow.startDate)} to ${escapeHtml(data.assessment.assessmentWindow.endDate ?? 'not recorded')}; data through ${escapeHtml(data.assessment.assessmentWindow.dataThrough ?? 'not recorded')}</dd><dt>Citation ready</dt><dd>${data.assessment.citationReady ? 'Yes' : 'No — use the full record'}</dd></dl><p>${escapeHtml(data.assessment.normativeWeightNote)}</p>${data.assessment.normativeSensitivity.minimum !== null && data.assessment.normativeSensitivity.maximum !== null ? `<p><strong>Priority sensitivity:</strong> ${escapeHtml(data.assessment.normativeSensitivity.minimum)}–${escapeHtml(data.assessment.normativeSensitivity.maximum)}/10. ${escapeHtml(data.assessment.normativeSensitivity.note)}</p>` : ''}<p>${escapeHtml(data.assessment.comparisonLimit)}</p><p>${escapeHtml(data.assessment.falsifierNote)}</p>`
    : `<p><strong>${data.assessment.displayBlocked ? 'Editorial display blocked' : 'Facts and sources'}:</strong> ${escapeHtml(data.assessment.disclaimer)}</p>`
  const scorecardHtml =
    data.assessment.included && !data.assessment.displayBlocked
    ? `<section aria-labelledby="scorecard-heading"><h2 id="scorecard-heading">Editorial scorecard</h2><p>${escapeHtml(data.assessment.formula)}</p>${categoryHtml}</section>`
    : ''
  const incomplete =
    data.bounds.claimsOmitted > 0 || data.bounds.sourcesOmitted > 0
  return `<main${documentTypeAttribute} data-term-id="${escapeHtml(data.identity.termId)}">
<article><header><h1>${escapeHtml(title)}</h1>${editorialHtml}<dl><dt>Display layer</dt><dd>${escapeHtml(data.documentLayer)}</dd><dt>Jurisdiction</dt><dd>${escapeHtml(data.identity.jurisdiction.name || data.identity.jurisdiction.id)}</dd><dt>Term</dt><dd><time>${escapeHtml(data.term.startDate)}</time> to <time>${escapeHtml(data.term.endDate ?? 'present')}</time></dd><dt>Party</dt><dd>${escapeHtml(data.identity.party?.name ?? 'None recorded')}</dd><dt>Knowledge cutoff</dt><dd>${escapeHtml(data.publication.knowledgeCutoff ?? 'Not recorded')}</dd><dt>Full editorial review through</dt><dd>${escapeHtml(data.publication.editorialReviewedThrough ?? 'Not recorded')}</dd><dt>Methodology version</dt><dd>${escapeHtml(data.publication.methodologyVersion ?? 'Not recorded')}</dd></dl></header>
${scorecardHtml}<section aria-labelledby="claims-heading"><h2 id="claims-heading">${data.documentLayer === 'facts-and-sources' ? 'Sourced claims, not measurements' : 'Evidence records'}</h2>${claimsHtml}</section><section aria-labelledby="sources-heading"><h2 id="sources-heading">Sources</h2><ol>${sourcesHtml}</ol></section><section aria-labelledby="completeness-heading"><h2 id="completeness-heading">Completeness</h2><dl><dt>Claims included</dt><dd>${data.bounds.claimsIncluded}</dd><dt>Claims omitted</dt><dd>${data.bounds.claimsOmitted}</dd><dt>Editorial-only claim IDs omitted in facts mode</dt><dd>${escapeHtml(data.bounds.editorialClaimIdsOmitted.join(', ') || 'none')}</dd><dt>Omitted claim IDs</dt><dd>${escapeHtml(data.bounds.omittedClaimIds.join(', ') || 'none')}</dd><dt>Sources included</dt><dd>${data.bounds.sourcesIncluded}</dd><dt>Sources omitted</dt><dd>${data.bounds.sourcesOmitted}</dd><dt>Omitted source IDs</dt><dd>${escapeHtml(data.bounds.omittedSourceIds.join(', ') || 'none')}</dd><dt>Editorial citation ready</dt><dd>${data.assessment.citationReady ? 'Yes' : 'No'}</dd></dl>${incomplete ? '<p><strong>This compact document is incomplete. Check the full record before quoting a score or conclusion.</strong></p>' : ''}</section>
${data.publication.canonicalUrl || data.publication.methodologyUrl || data.publication.fullRecordUrl ? `<footer>${data.publication.canonicalUrl ? `<a href="${escapeHtml(data.publication.canonicalUrl)}">Canonical page</a>` : ''}${data.publication.methodologyUrl ? ` <a href="${escapeHtml(data.publication.methodologyUrl)}">Methodology</a>` : ''}${data.publication.fullRecordUrl ? ` <a href="${escapeHtml(data.publication.fullRecordUrl)}">Full record</a>` : ''}</footer>` : ''}
</article></main>`
}

function utf8ByteLength(value: string) {
  return new TextEncoder().encode(value).byteLength
}

export function formatLeaderLlmDocument(
  input: unknown,
  options: LeaderLlmDocumentOptions = {},
) {
  const data = buildCompactLeaderDocument(input, options)
  const markdown = renderLeaderMarkdown(data)
  const html = renderLeaderHtml(data)
  return {
    data,
    markdown,
    html,
    byteLength: {
      data: utf8ByteLength(JSON.stringify(data)),
      markdown: utf8ByteLength(markdown),
      html: utf8ByteLength(html),
    },
  }
}
