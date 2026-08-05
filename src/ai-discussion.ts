export type AiEvidenceLink = {
  label: string
  url: string
}

export type AiDiscussionContext = {
  pageUrl: string
  jurisdictionName: string
  topicLabel: string
  knowledgeCutoff: string
  editorialReviewedThrough: string
  methodologyVersion: string
  displayLayer: 'facts-and-sources' | 'editorial-analysis'
  evidenceLinks: AiEvidenceLink[]
  defaultQuestion: string
}

export function buildAiDiscussionPrompt(
  context: AiDiscussionContext,
  question: string,
) {
  const evidenceLines = context.evidenceLinks
    .map((link, index) => `${index + 4}. ${link.label}: ${link.url}`)
    .join('\n')
  const resolvedQuestion =
    question.trim() ||
    `What does the published evidence show about ${context.topicLabel}?`

  return `Discuss this India Mechanics page using its published evidence, not general memory.

Page: ${context.pageUrl}
Jurisdiction: ${context.jurisdictionName}
Topic: ${context.topicLabel}
Published knowledge cutoff: ${context.knowledgeCutoff}
Full editorial review through: ${context.editorialReviewedThrough}
Methodology version: ${context.methodologyVersion}
  Current display layer: ${
    context.displayLayer === 'editorial-analysis'
      ? 'Ratings and evidence (editorial analysis enabled)'
      : 'Facts only (editorial scores hidden)'
  }

First read:
1. LLM guide: ${new URL('/llms.txt', context.pageUrl)}
2. Current metadata: ${new URL('/api/meta', context.pageUrl)}
3. Methodology: ${new URL('/api/methodology', context.pageUrl)}
${evidenceLines}

Question: ${resolvedQuestion}

Source and reasoning requirements:
- Cite the underlying source title, publisher, direct URL, and publication date next to the claim it supports. Do not cite only the India Mechanics page or API when an underlying source is available.
- Use only sources attached to the relevant claim or record. A term-level or policy-level source list is background and does not automatically support every statement.
- Do not infer a source's role from its reliability marker. Read sourceType, bestFor, ratingReason, and limitations.
- Official, court, commission, regulator, and statistical records control the act, legal text, result, status, or number they directly record. Attribute official or corporate claims explicitly.
- An announcement proves intent, approval, allocation, or reported status. It does not by itself prove implementation quality, net outcomes, causal impact, value for money, utilization, or the government's interpretation.
- Use suitable independent reporting, academic analysis, or multilateral evaluation for contested impact, causality, execution quality, institutional effects, and government-performance conclusions.
- Separate verified facts, sourced claims or allegations, and India Mechanics editorial judgments or scores.
- Preserve material qualifiers, disagreements, confidence labels, assessment dates, evidence gaps, and cutoffs. Do not imply the record is current beyond those dates.
- Present important achievements and important concerns without advocating for a party, leader, or predetermined conclusion.
- Do not infer that a leader caused a change merely because it occurred during that office term. Consider inherited policy, other levels of government, institutions, courts, external conditions, and shared responsibility.
- Treat ratings as transparent editorial assessments, not objective facts, official rankings, or judicial findings. Specialist deep dives are not added again to the overall score.
- If the display layer is Facts only, do not introduce hidden scores or verdicts unless the user explicitly asks to compare the published editorial methodology.
- If a compact record reports omitted claims or sources, disclose that it is truncated. If evidence is insufficient or conflicting, say what additional record would resolve the gap.

Use concise sections: Answer, Evidence, and Limits.`
}
