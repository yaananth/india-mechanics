import { Scale, X } from 'lucide-react'
import type { Methodology } from '../types.ts'
import { SourceRating } from './common.tsx'

const leaderDimensionNames: Record<string, string> = {
  outcomes: 'outcomes',
  reforms: 'reforms',
  inclusion: 'inclusion',
  crisis: 'crisis',
  institutions: 'institutions',
  integrity: 'integrity',
}

export function MethodologyDialog({
  open,
  methodology,
  onClose,
}: {
  open: boolean
  methodology: Methodology | null
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="methodology-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="methodology-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="methodology-dialog__header">
          <div>
            <span className="section-label">Methodology</span>
            <h2 id="methodology-title">How the judgments are made</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close methodology"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </header>

        {methodology && (
          <div className="methodology-dialog__body">
            <section>
              <h3>Country Progress Index</h3>
              <p>{methodology.progress.purpose}</p>
              <p>{methodology.progress.formula}</p>
              <div className="weight-list">
                {methodology.progress.dimensions.map((dimension) => (
                  <div key={dimension.id}>
                    <span
                      className="weight-list__swatch"
                      style={{ backgroundColor: dimension.color }}
                    />
                    <span>
                      <strong>{dimension.name}</strong>
                      <small>{dimension.description}</small>
                    </span>
                    <b>{Math.round(dimension.weight * 100)}%</b>
                  </div>
                ))}
              </div>
              <div className="method-note">
                <Scale size={17} aria-hidden="true" />
                <span>
                  {methodology.progress.uncertainty}{' '}
                  {methodology.progress.attribution}
                </span>
              </div>
            </section>

            <section>
              <h3>Leader-term evaluations</h3>
              <p>{methodology.leaderEvaluation.purpose}</p>
              <p>{methodology.leaderEvaluation.formula}</p>
              <div className="weight-list weight-list--compact">
                {methodology.leaderEvaluation.dimensions.map((dimension) => (
                  <div key={dimension.id}>
                    <span>
                      <strong>{dimension.name}</strong>
                      <small>{dimension.description}</small>
                    </span>
                    <b>{Math.round(dimension.weight * 100)}%</b>
                  </div>
                ))}
              </div>
              <h4 className="subsection-heading">Published scorecard lenses</h4>
              <div className="leader-profile-methods">
                {methodology.leaderEvaluation.profiles.map((profile) => (
                  <article
                    key={profile.id}
                    className={profile.isCanonical ? 'is-canonical' : undefined}
                  >
                    <header>
                      <strong>{profile.name}</strong>
                      <small>
                        {profile.isCanonical ? 'Headline score' : 'Alternative lens'}
                      </small>
                    </header>
                    <p>{profile.description}</p>
                    <span>
                      {Object.entries(profile.weights)
                        .filter(([, weight]) => weight > 0)
                        .map(
                          ([dimension, weight]) =>
                            `${Math.round(weight * 100)}% ${
                              leaderDimensionNames[dimension] ?? dimension
                            }`,
                        )
                        .join(' + ')}
                    </span>
                  </article>
                ))}
              </div>
              <div className="method-note">
                <Scale size={17} aria-hidden="true" />
                <span>
                  All four lenses use the same evidence scores. Each weighted sum
                  is rounded to one decimal. The lens range shows sensitivity to
                  priorities, not statistical uncertainty, and policy scores are
                  not line-item additions to a PM score.
                </span>
              </div>
            </section>

            {methodology.specialistEvaluations.map((topic) => (
              <section key={topic.id}>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <p>{topic.methodology}</p>
                <div className="weight-list weight-list--specialist">
                  {topic.dimensions.map((dimension) => (
                    <div key={dimension.id}>
                      <span>
                        <strong>{dimension.name}</strong>
                        <small>{dimension.description}</small>
                      </span>
                      <span>
                        <b>
                          {Math.round(dimension.operationalWeight * 100)}%
                        </b>
                        <small>{topic.operationalLabel}</small>
                      </span>
                      <span>
                        <b>{Math.round(dimension.adjustedWeight * 100)}%</b>
                        <small>{topic.adjustedLabel}</small>
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h3>Policy and bill evaluations</h3>
              <p>{methodology.policyEvaluation.purpose}</p>
              <p>{methodology.policyEvaluation.formula}</p>
              <div className="weight-list weight-list--compact">
                {methodology.policyEvaluation.dimensions.map((dimension) => (
                  <div key={dimension.id}>
                    <span>
                      <strong>{dimension.name}</strong>
                      <small>{dimension.description}</small>
                    </span>
                    <b>{Math.round(dimension.weight * 100)}%</b>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3>Budget evaluations</h3>
              <p>{methodology.budgetEvaluation.purpose}</p>
              <p>{methodology.budgetEvaluation.formula}</p>
              <div className="weight-list weight-list--compact">
                {methodology.budgetEvaluation.dimensions.map((dimension) => (
                  <div key={dimension.id}>
                    <span>
                      <strong>{dimension.name}</strong>
                      <small>{dimension.description}</small>
                    </span>
                    <b>{Math.round(dimension.weight * 100)}%</b>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3>Source reliability</h3>
              <div className="rating-rubric">
                {Object.entries(methodology.sourceRatings)
                  .filter(([key]) => /^\d$/.test(key))
                  .sort(([left], [right]) => Number(right) - Number(left))
                  .map(([rating, description]) => (
                    <div key={rating}>
                      <SourceRating rating={Number(rating)} />
                      <span>{description}</span>
                    </div>
                  ))}
              </div>
              <p className="rubric-rule">{methodology.sourceRatings.rule}</p>
              <h4 className="subsection-heading">Sensitive-claim corroboration</h4>
              <ul className="plain-list">
                {Object.values(methodology.corroborationRules).map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Bias controls</h3>
              <p>
                Bias cannot be honestly promised away. The system makes the
                judgment trail inspectable and contestable.
              </p>
              <ul className="plain-list">
                {methodology.biasControls.map((control) => (
                  <li key={control}>{control}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </section>
    </div>
  )
}
