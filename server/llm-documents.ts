type JsonRecord = Record<string, unknown>

export type LeaderLlmDocumentOptions = {
  maxClaims?: number
  maxSources?: number
}

const DEFAULT_MAX_CLAIMS = 36
const DEFAULT_MAX_SOURCES = 30
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

function normalizeSource(value: unknown) {
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
    reliability: numberOrNull(source.reliability),
    publishedDate: text(source.publishedDate, 30) || null,
    accessedDate: text(source.accessedDate, 30) || null,
    bestFor: text(source.bestFor, 500),
    ratingReason: text(source.ratingReason, 500),
    limitations: text(source.limitations, 700),
  }
}

function collectSourceCandidates(term: JsonRecord) {
  const values = [...list(term.sources)]
  for (const claimValue of list(term.claims)) {
    values.push(...list(record(claimValue).sources))
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
  const maxClaims = clampLimit(options.maxClaims, DEFAULT_MAX_CLAIMS, 100)
  const maxSources = clampLimit(options.maxSources, DEFAULT_MAX_SOURCES, 120)

  const allClaims = list(term.claims)
    .map((value) => {
      const claim = record(value)
      return {
        id: text(claim.id, 160),
        title: text(claim.title, 300),
        body: text(claim.body),
        stance: text(claim.stance, 40) || 'context',
        category: text(claim.category, 120) || 'uncategorized',
        confidence: text(claim.confidence, 30) || null,
        asOfDate: text(claim.asOfDate, 30) || null,
        sourceIds: list(claim.sourceIds)
          .map((id) => text(id, 160))
          .filter(Boolean)
          .slice(0, 12),
      }
    })
    .filter((claim) => claim.id || claim.title || claim.body)
  const stanceBuckets = new Map<string, typeof allClaims>()
  for (const claim of allClaims) {
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
  for (let index = 0; claims.length < maxClaims; index += 1) {
    let added = false
    for (const stance of orderedStances) {
      const claim = stanceBuckets.get(stance)?.[index]
      if (!claim) continue
      claims.push(claim)
      added = true
      if (claims.length === maxClaims) break
    }
    if (!added) break
  }
  const claimsByStance = Object.fromEntries(
    claimOrder
      .map((stance) => [
        stance,
        claims.filter((claim) => claim.stance === stance),
      ])
      .filter(([, values]) => (values as unknown[]).length > 0),
  ) as Record<string, typeof allClaims>

  const sourceMap = new Map<string, NonNullable<ReturnType<typeof normalizeSource>>>()
  for (const value of collectSourceCandidates(term)) {
    const source = normalizeSource(value)
    if (!source) continue
    const key = source.id || source.url
    if (!sourceMap.has(key)) sourceMap.set(key, source)
  }
  const allSources = [...sourceMap.values()]
  const sources = allSources.slice(0, maxSources)

  const categories = list(scorecard.categories).slice(0, 6).map((value) => {
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

  return {
    documentType: 'leader-term-scorecard',
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
      overallScore: numberOrNull(scorecard.overallScore ?? term.ratingScore),
      confidence: text(term.ratingConfidence, 30) || null,
      asOfDate: text(term.assessmentAsOf, 30) || null,
      summary: text(term.ratingSummary),
      formula: text(scorecard.formula, 700),
      aggregation: text(scorecard.aggregation, 80),
      disclaimer:
        'This is a sourced editorial assessment of one office term, not a measured fact. Observed change during a term does not by itself prove leader causation.',
      categories,
    },
    publication: {
      canonicalUrl: safeUrl(publication.canonicalUrl),
      compactApiUrl: safeUrl(publication.compactApiUrl),
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
      sourcesIncluded: sources.length,
      sourcesOmitted: Math.max(0, allSources.length - sources.length),
    },
  }
}

export type LeaderDocument = ReturnType<typeof buildCompactLeaderDocument>

export function renderLeaderMarkdown(data: LeaderDocument) {
  const title = `${data.identity.leaderName} — ${data.identity.officeName}`
  const markdown: string[] = [
    `# ${escapeMarkdown(title)}`,
    '',
    `- Term: ${escapeMarkdown(data.term.startDate)} to ${escapeMarkdown(data.term.endDate ?? 'present')}`,
    `- Party: ${escapeMarkdown(data.identity.party?.name ?? 'None recorded')}`,
    `- Overall: ${data.assessment.overallScore ?? 'Not rated'}/10`,
    `- Confidence: ${escapeMarkdown(data.assessment.confidence ?? 'Not assessed')}`,
    `- Assessment as of: ${escapeMarkdown(data.assessment.asOfDate ?? 'Not recorded')}`,
    `- Knowledge cutoff: ${escapeMarkdown(data.publication.knowledgeCutoff ?? 'Not recorded')}`,
    `- Full editorial review through: ${escapeMarkdown(data.publication.editorialReviewedThrough ?? 'Not recorded')}`,
    `- Methodology version: ${escapeMarkdown(data.publication.methodologyVersion ?? 'Not recorded')}`,
    '',
    data.assessment.summary,
    '',
    `> ${data.assessment.disclaimer}`,
    '',
    '## Scorecard',
    '',
    data.assessment.formula,
  ]
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
  markdown.push('', '## Claims')
  for (const [stance, groupedClaims] of Object.entries(data.claimsByStance)) {
    markdown.push('', `### ${escapeMarkdown(stance)}`)
    for (const claim of groupedClaims) {
      markdown.push(
        '',
        `- **${escapeMarkdown(claim.title)}** (${escapeMarkdown(claim.confidence ?? 'unknown')}, ${escapeMarkdown(claim.asOfDate ?? 'undated')}): ${escapeMarkdown(claim.body)}`,
      )
    }
  }
  markdown.push('', '## Sources')
  for (const source of data.sources) {
    const link = source.url
      ? `[${escapeMarkdown(source.title || source.id)}](${source.url})`
      : escapeMarkdown(source.title || source.id)
    markdown.push(
      '',
      `- ${link} — ${escapeMarkdown(source.publisher)}; reliability ${source.reliability ?? 'N/A'}/5. Why rated: ${escapeMarkdown(source.ratingReason || 'Not recorded.')}. Limitation: ${escapeMarkdown(source.limitations || 'Not recorded.')}`,
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
          (claim) =>
            `<li><strong>${escapeHtml(claim.title)}</strong> <span>(${escapeHtml(claim.confidence ?? 'unknown')}, ${escapeHtml(claim.asOfDate ?? 'undated')})</span><p>${escapeHtml(claim.body)}</p></li>`,
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
      } <span>${escapeHtml(source.publisher)}</span><dl><dt>Reliability</dt><dd>${escapeHtml(source.reliability ?? 'N/A')}/5</dd><dt>Why rated</dt><dd>${escapeHtml(source.ratingReason || 'Not recorded.')}</dd><dt>Limitations</dt><dd>${escapeHtml(source.limitations || 'Not recorded.')}</dd></dl></li>`,
    )
    .join('')
  const documentTypeAttribute =
    options.includeDocumentType === false
      ? ''
      : ' data-document-type="leader-term-scorecard"'
  return `<main${documentTypeAttribute} data-term-id="${escapeHtml(data.identity.termId)}">
<article><header><h1>${escapeHtml(title)}</h1><p>${escapeHtml(data.assessment.summary)}</p><p><strong>Editorial assessment:</strong> ${escapeHtml(data.assessment.disclaimer)}</p><dl><dt>Jurisdiction</dt><dd>${escapeHtml(data.identity.jurisdiction.name || data.identity.jurisdiction.id)}</dd><dt>Term</dt><dd><time>${escapeHtml(data.term.startDate)}</time> to <time>${escapeHtml(data.term.endDate ?? 'present')}</time></dd><dt>Party</dt><dd>${escapeHtml(data.identity.party?.name ?? 'None recorded')}</dd><dt>Overall</dt><dd>${escapeHtml(data.assessment.overallScore ?? 'Not rated')}/10</dd><dt>Confidence</dt><dd>${escapeHtml(data.assessment.confidence ?? 'Not assessed')}</dd><dt>Assessment as of</dt><dd>${escapeHtml(data.assessment.asOfDate ?? 'Not recorded')}</dd><dt>Knowledge cutoff</dt><dd>${escapeHtml(data.publication.knowledgeCutoff ?? 'Not recorded')}</dd><dt>Full editorial review through</dt><dd>${escapeHtml(data.publication.editorialReviewedThrough ?? 'Not recorded')}</dd><dt>Methodology version</dt><dd>${escapeHtml(data.publication.methodologyVersion ?? 'Not recorded')}</dd></dl></header>
<section aria-labelledby="scorecard-heading"><h2 id="scorecard-heading">Scorecard</h2><p>${escapeHtml(data.assessment.formula)}</p>${categoryHtml}</section><section aria-labelledby="claims-heading"><h2 id="claims-heading">Claims</h2>${claimsHtml}</section><section aria-labelledby="sources-heading"><h2 id="sources-heading">Sources</h2><ol>${sourcesHtml}</ol></section>
${data.publication.canonicalUrl || data.publication.methodologyUrl ? `<footer>${data.publication.canonicalUrl ? `<a href="${escapeHtml(data.publication.canonicalUrl)}">Canonical page</a>` : ''}${data.publication.methodologyUrl ? ` <a href="${escapeHtml(data.publication.methodologyUrl)}">Methodology</a>` : ''}</footer>` : ''}
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
