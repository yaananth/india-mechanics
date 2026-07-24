import { CheckCircle2, CircleAlert, CircleDotDashed } from 'lucide-react'
import type { CuratedAnswer } from '../types.ts'
import { ConfidenceMark, SourceLinks } from './common.tsx'

const sectionMeta = {
  achievement: {
    label: 'Evidence for',
    icon: CheckCircle2,
  },
  concern: {
    label: 'Evidence against',
    icon: CircleAlert,
  },
  context: {
    label: 'Attribution limits',
    icon: CircleDotDashed,
  },
}

export function AnswerPanel({ answer }: { answer: CuratedAnswer }) {
  const groups = Object.entries(sectionMeta).map(([section, meta]) => ({
    section: section as keyof typeof sectionMeta,
    ...meta,
    claims: answer.claims.filter((claim) => claim.section === section),
  }))

  return (
    <article className="answer-panel">
      <header className="answer-panel__header">
        <div>
          <span className="section-label">Reviewed answer</span>
          <h2>{answer.question}</h2>
        </div>
        <div className="answer-panel__meta">
          <ConfidenceMark confidence={answer.confidence} />
          <span>Checked {answer.asOfDate}</span>
        </div>
      </header>
      <p className="answer-panel__summary">{answer.shortAnswer}</p>

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
                  {group.label}
                </h3>
                {group.claims.map((claim) => (
                  <article key={claim.id} className="answer-claim">
                    <h4>{claim.title}</h4>
                    <p>{claim.body}</p>
                    <SourceLinks sources={claim.sources} limit={2} />
                  </article>
                ))}
              </section>
            )
          })}
      </div>

      <footer className="answer-panel__verdict">
        <strong>Bottom line</strong>
        <span>{answer.verdict}</span>
      </footer>
    </article>
  )
}
