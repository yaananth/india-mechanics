import { describe, expect, it } from 'vitest'
import {
  buildAiDiscussionPrompt,
  type AiDiscussionContext,
} from '../src/ai-discussion.ts'

const context: AiDiscussionContext = {
  pageUrl:
    'https://india-mechanics.artfiesco.chatgpt.site/?view=policies&policy=swachh-bharat-gramin-2014&layer=editorial',
  jurisdictionName: 'Republic of India',
  topicLabel: 'Swachh Bharat Mission (Gramin)',
  knowledgeCutoff: '2026-08-04',
  editorialReviewedThrough: '2026-07-26',
  methodologyVersion: 'leader-scorecard-v1',
  displayLayer: 'editorial-analysis',
  evidenceLinks: [
    {
      label: 'Policy record',
      url: 'https://india-mechanics.artfiesco.chatgpt.site/api/policies/swachh-bharat-gramin-2014?jurisdiction=india',
    },
    {
      label: 'Source ledger',
      url: 'https://india-mechanics.artfiesco.chatgpt.site/api/sources?jurisdiction=india',
    },
  ],
  defaultQuestion:
    'What does the evidence show about Swachh Bharat Mission (Gramin)?',
}

describe('AI discussion prompt', () => {
  it('carries page evidence, freshness, and source-discipline rules', () => {
    const prompt = buildAiDiscussionPrompt(
      context,
      'Did rural sanitation improve, and what remains uncertain?',
    )

    expect(prompt).toContain(context.pageUrl)
    expect(prompt).toContain('/llms.txt')
    expect(prompt).toContain('/api/meta')
    expect(prompt).toContain('/api/methodology')
    expect(prompt).toContain('/api/policies/swachh-bharat-gramin-2014')
    expect(prompt).toContain('Published knowledge cutoff: 2026-08-04')
    expect(prompt).toContain(
      'Ratings and evidence (editorial analysis enabled)',
    )
    expect(prompt).toContain(
      'Did rural sanitation improve, and what remains uncertain?',
    )
    expect(prompt).toContain('Do not infer a source')
    expect(prompt).toContain('official or corporate claims explicitly')
    expect(prompt).toContain('not objective facts')
    expect(prompt).toContain('Answer, Evidence, and Limits')
  })

  it('uses a useful default when the question is blank', () => {
    expect(buildAiDiscussionPrompt(context, '   ')).toContain(
      'What does the published evidence show about Swachh Bharat Mission (Gramin)?',
    )
  })

  it('preserves the explicit facts-only contract', () => {
    const prompt = buildAiDiscussionPrompt(
      {
        ...context,
        pageUrl:
          'https://india-mechanics.artfiesco.chatgpt.site/?view=policies&policy=swachh-bharat-gramin-2014&layer=facts',
        displayLayer: 'facts-and-sources',
      },
      'Summarize the records without a verdict.',
    )
    expect(prompt).toContain('Facts only (editorial scores hidden)')
    expect(prompt).toContain('do not introduce hidden scores or verdicts')
  })
})
