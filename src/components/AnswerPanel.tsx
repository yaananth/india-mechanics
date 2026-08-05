import { CheckCircle2, CircleAlert, CircleDotDashed } from 'lucide-react'
import { useEditorialLayer } from '../editorial-layer-context.ts'
import type { CuratedAnswer } from '../types.ts'
import { ClaimSources, ConfidenceMark } from './common.tsx'

const sectionMeta = {
  achievement: {
    editorialLabel: 'Evidence for',
    factsLabel: 'Supporting evidence',
    icon: CheckCircle2,
  },
  concern: {
    editorialLabel: 'Evidence against',
    factsLabel: 'Contrary evidence',
    icon: CircleAlert,
  },
  context: {
    editorialLabel: 'Attribution limits',
    factsLabel: 'Context and attribution limits',
    icon: CircleDotDashed,
  },
}

export function AnswerPanel({ answer }: { answer: CuratedAnswer }) {
  const { showEditorial } = useEditorialLayer()
  const groups = Object.entries(sectionMeta).map(([section, meta]) => ({
    section: section as keyof typeof sectionMeta,
    ...meta,
    claims: answer.claims.filter(
      (claim) =>
        claim.section === section &&
        (showEditorial || claim.claimLayer !== 'editorial'),
    ),
  }))

  return (
    <article className="answer-panel">
      <header className="answer-panel__header">
        <div>
          <span className="section-label">
            {showEditorial ? 'Reviewed answer' : 'Reviewed sourced claims'}
          </span>
          <h2>{answer.question}</h2>
        </div>
        <div className="answer-panel__meta">
          {showEditorial && <ConfidenceMark confidence={answer.confidence} />}
          <span>Checked {answer.asOfDate}</span>
        </div>
      </header>
      {showEditorial ? (
        <>
          <span className="editorial-label">Sourced editorial judgment</span>
          <p className="answer-panel__summary">{answer.shortAnswer}</p>
        </>
      ) : (
        <p className="answer-panel__summary">
          The verdict and confidence are withheld. The factual and mixed sourced
          claims below are not measurements or proof of leader causation.
        </p>
      )}

      <div className="answer-columns">
        {groups
          .filter((group) => group.claims.length > 0)
          .map((group) => {
            const Icon = group.icon
            return (
              <section
                key={group.section}
                className={`answer-column answer-column--${group.section}`}
              >
                <h3>
                  <Icon size={17} aria-hidden="true" />
                  {showEditorial ? group.editorialLabel : group.factsLabel}
                </h3>
                {group.claims.map((claim) => (
                  <article key={claim.id} className="answer-claim">
                    <h4>{claim.title}</h4>
                    <p>{claim.body}</p>
                    <ClaimSources claim={claim} />
                  </article>
                ))}
              </section>
            )
          })}
      </div>

      {showEditorial && (
        <footer className="answer-panel__verdict">
          <strong>Bottom line</strong>
          <span>{answer.verdict}</span>
        </footer>
      )}
    </article>
  )
}
