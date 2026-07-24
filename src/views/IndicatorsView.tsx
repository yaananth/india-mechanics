import {
  ArrowDownRight,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpRight,
  CircleHelp,
  Database,
  Info,
  Landmark,
  Minus,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { api } from '../api.ts'
import type {
  IndicatorDefinition,
  IndicatorSeries,
  IndicatorTermChange,
  Overview,
} from '../types.ts'
import { formatValue, formatYear, sentenceCase } from '../utils.ts'
import {
  LoadingState,
  SourceLinks,
  SourceRating,
} from '../components/common.tsx'

function formatTermChange(
  change: IndicatorTermChange,
  definition: IndicatorDefinition,
  annualized = false,
) {
  const value = annualized ? change.annualizedChange : change.absoluteChange
  const sign = value > 0 ? '+' : ''
  if (definition.format === 'percent') {
    return `${sign}${value.toFixed(1)} pp${annualized ? '/yr' : ''}`
  }
  if (definition.format === 'currency') {
    return `${sign}${formatValue(value, definition.format, definition.unit)}${
      annualized ? '/yr' : ''
    }`
  }
  const decimals = Math.abs(value) < 1 ? 2 : 1
  return `${sign}${value.toFixed(decimals)}${annualized ? '/yr' : ''}`
}

function baselineLabel(change: IndicatorTermChange) {
  if (change.baselineKind === 'first-within-term') {
    return `first available in term: ${change.baseline.period}`
  }
  if (change.baselineKind === 'before-term-start') {
    return `nearest pre-term data: ${change.baseline.period}`
  }
  return `term-start year: ${change.baseline.period}`
}

function ChevronChange() {
  return (
    <span className="tenure-arrow" aria-hidden="true">
      <ArrowRight size={16} />
    </span>
  )
}

export function IndicatorsView({
  indicators,
  selectedIndicatorId,
  onSelectIndicator,
  onSelectLeaderTerm,
  knowledge,
}: {
  indicators: IndicatorDefinition[]
  selectedIndicatorId: string | null
  onSelectIndicator: (indicatorId: string) => void
  onSelectLeaderTerm: (termId: string) => void
  knowledge: Overview['knowledge']
}) {
  const selectedId =
    selectedIndicatorId ?? indicators.find((item) => item.id === 'life-expectancy')?.id
  const [series, setSeries] = useState<IndicatorSeries | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedId) return
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    api
      .indicatorSeries(selectedId, controller.signal)
      .then(setSeries)
      .catch((reason: Error) => {
        if (reason.name !== 'AbortError') setError(reason.message)
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [selectedId])

  const grouped = useMemo(
    () =>
      indicators.reduce<Record<string, IndicatorDefinition[]>>((result, indicator) => {
        result[indicator.dimensionName] ??= []
        result[indicator.dimensionName].push(indicator)
        return result
      }, {}),
    [indicators],
  )

  const latest = series?.observations.at(-1)
  const currentTermChange = series?.termChanges.find((change) => change.isCurrent)
  const previousTermChange = series?.termChanges.find(
    (change) => !change.isCurrent,
  )

  return (
    <div className="view indicators-view">
      <header className="view-header">
        <div>
          <span className="freshness-line">
            Indicator data checked {knowledge.indicatorAsOfDate} · World Bank through{' '}
            {knowledge.latestWorldBankPeriod} · V-Dem through{' '}
            {knowledge.latestVdemPeriod}
          </span>
          <h1>India in measurable trends</h1>
          <p>
            Inspect the observations, units, revisions, normalization goalposts,
            and source limitations behind every graph.
          </p>
        </div>
        <div className="view-header__stat">
          <strong>{indicators.length}</strong>
          <span>tracked indicators</span>
        </div>
      </header>

      <div className="indicator-mobile-select">
        <label>
          <span>Indicator</span>
          <select
            value={selectedId}
            onChange={(event) => onSelectIndicator(event.target.value)}
          >
            {Object.entries(grouped).map(([dimension, items]) => (
              <optgroup key={dimension} label={dimension}>
                {items.map((indicator) => (
                  <option key={indicator.id} value={indicator.id}>
                    {indicator.shortName}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      <section className="indicator-workspace">
        <aside className="indicator-sidebar" aria-label="Indicator list">
          {Object.entries(grouped).map(([dimension, items]) => (
            <section key={dimension}>
              <h2>{dimension}</h2>
              {items.map((indicator) => (
                <button
                  type="button"
                  key={indicator.id}
                  className={indicator.id === selectedId ? 'is-active' : undefined}
                  onClick={() => onSelectIndicator(indicator.id)}
                >
                  <span
                    className="indicator-sidebar__swatch"
                    style={{ backgroundColor: indicator.dimensionColor }}
                  />
                  <span>
                    <strong>{indicator.shortName}</strong>
                    <small>
                      {indicator.latest
                        ? `${formatValue(
                            indicator.latest.value,
                            indicator.format,
                            indicator.unit,
                            true,
                          )} · ${indicator.latest.period}`
                        : 'No current observation'}
                    </small>
                  </span>
                </button>
              ))}
            </section>
          ))}
        </aside>

        <div className="indicator-detail">
          {loading && <LoadingState label="Loading indicator series" />}
          {error && (
            <div className="error-state">
              <strong>Could not load the series.</strong>
              <span>{error}</span>
            </div>
          )}
          {series && !loading && (
            <>
              <header className="indicator-detail__header">
                <div>
                  <span className="section-label">{series.definition.dimensionName}</span>
                  <h2>{series.definition.name}</h2>
                  <p>{series.definition.description}</p>
                </div>
                {latest && (
                  <div className="indicator-latest">
                    <strong>
                      {formatValue(
                        latest.value,
                        series.definition.format,
                        series.definition.unit,
                      )}
                    </strong>
                    <span>
                      {series.definition.unit} · {latest.period}
                    </span>
                    {currentTermChange && (
                      <small
                        className={
                          currentTermChange.directionAssessment === 'improved'
                            ? 'is-positive'
                            : currentTermChange.directionAssessment === 'worsened'
                              ? 'is-negative'
                              : undefined
                        }
                      >
                        {currentTermChange.absoluteChange > 0 ? (
                          series.definition.direction === 'neutral' ? (
                            <ArrowRightLeft size={14} aria-hidden="true" />
                          ) : (
                            <ArrowUpRight size={14} aria-hidden="true" />
                          )
                        ) : currentTermChange.absoluteChange < 0 ? (
                          series.definition.direction === 'neutral' ? (
                            <ArrowRightLeft size={14} aria-hidden="true" />
                          ) : (
                            <ArrowDownRight size={14} aria-hidden="true" />
                          )
                        ) : (
                          <Minus size={14} aria-hidden="true" />
                        )}
                        {formatTermChange(
                          currentTermChange,
                          series.definition,
                        )}{' '}
                        {currentTermChange.baselineKind === 'before-term-start'
                          ? `from nearest pre-term data (${currentTermChange.baseline.period}); observed through ${currentTermChange.leader.name}'s term`
                          : `since ${currentTermChange.baseline.period} under ${currentTermChange.leader.name}`}
                      </small>
                    )}
                  </div>
                )}
              </header>

              <section className="indicator-explainer">
                <div>
                  <h3>
                    <CircleHelp size={17} aria-hidden="true" />
                    What does this mean?
                  </h3>
                  <p>{series.definition.plainLanguage}</p>
                </div>
                <div className="indicator-example">
                  <strong>Clear example</strong>
                  <p>{series.definition.example}</p>
                </div>
              </section>

              {series.comparison && (
                <section className="currency-growth-explainer">
                  <header>
                    <div>
                      <span className="section-label">Currency versus output</span>
                      <h3>{series.comparison.title}</h3>
                    </div>
                    <span>
                      {series.comparison.periodStart}–
                      {series.comparison.periodEnd}
                    </span>
                  </header>

                  <div className="currency-growth-comparison">
                    <article>
                      <span>Nominal exchange rate</span>
                      <div>
                        <strong>
                          Rs {series.comparison.exchangeRate.start.toFixed(1)}
                        </strong>
                        <ArrowRight size={17} aria-hidden="true" />
                        <strong>
                          Rs {series.comparison.exchangeRate.end.toFixed(1)}
                        </strong>
                      </div>
                      <b>
                        +{series.comparison.exchangeRate.rateIncreasePercent}% INR
                        per US$
                      </b>
                      <p>
                        One rupee&apos;s dollar value fell{' '}
                        {Math.abs(
                          series.comparison.exchangeRate
                            .rupeeDollarValueChangePercent,
                        )}
                        %.
                      </p>
                    </article>
                    <article>
                      <span>Real GDP per person</span>
                      <div>
                        <strong>
                          {formatValue(
                            series.comparison.realGdpPerCapita.start,
                            'currency',
                            'constant 2015 US$',
                          )}
                        </strong>
                        <ArrowRight size={17} aria-hidden="true" />
                        <strong>
                          {formatValue(
                            series.comparison.realGdpPerCapita.end,
                            'currency',
                            'constant 2015 US$',
                          )}
                        </strong>
                      </div>
                      <b>
                        +{series.comparison.realGdpPerCapita.changePercent}% real
                        output per person
                      </b>
                      <p>Inflation and the current exchange rate are held out.</p>
                    </article>
                  </div>

                  <ol>
                    {series.comparison.explanation.map((explanation) => (
                      <li key={explanation}>{explanation}</li>
                    ))}
                  </ol>
                  <p className="currency-growth-conclusion">
                    {series.comparison.conclusion}
                  </p>
                  <SourceLinks sources={series.comparison.sources} limit={3} />
                </section>
              )}

              <div className="indicator-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={series.observations}
                    margin={{ top: 16, right: 18, bottom: 4, left: -6 }}
                  >
                    <CartesianGrid stroke="#e3e5e1" vertical={false} />
                    <XAxis
                      dataKey="period"
                      tickLine={false}
                      axisLine={false}
                      minTickGap={28}
                      tick={{ fill: '#65665f', fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={54}
                      tick={{ fill: '#65665f', fontSize: 12 }}
                      tickFormatter={(value) =>
                        formatValue(
                          Number(value),
                          series.definition.format,
                          series.definition.unit,
                          true,
                        )
                      }
                    />
                    <Tooltip
                      labelFormatter={(label) => `Year ${label}`}
                      formatter={(value) => [
                        formatValue(
                          Number(value),
                          series.definition.format,
                          series.definition.unit,
                        ),
                        series.definition.shortName,
                      ]}
                      contentStyle={{
                        borderRadius: 4,
                        border: '1px solid #d7dad4',
                        boxShadow: '0 8px 24px rgba(24, 28, 24, .08)',
                      }}
                    />
                    {series.definition.direction !== 'neutral' && (
                      <ReferenceLine
                        y={
                          series.definition.direction === 'higher'
                            ? series.definition.goalpostHigh
                            : series.definition.goalpostLow
                        }
                        stroke="#a7aaa3"
                        strokeDasharray="4 4"
                      />
                    )}
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={series.definition.dimensionColor}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{
                        r: 4,
                        fill: series.definition.dimensionColor,
                        strokeWidth: 0,
                      }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <section className="indicator-tenure">
                <header className="indicator-tenure__header">
                  <div>
                    <h3>
                      <Landmark size={17} aria-hidden="true" />
                      Change during each Prime Minister&apos;s tenure
                    </h3>
                    <p>
                      Start and end values use the closest available observation
                      years. Annualized change helps compare terms of different
                      lengths.
                    </p>
                  </div>
                </header>

                <div className="tenure-highlight">
                  {currentTermChange ? (
                    <article
                      className={`tenure-card tenure-card--${currentTermChange.directionAssessment}`}
                    >
                      <span className="section-label">Current Prime Minister</span>
                      <h4>{currentTermChange.leader.name}</h4>
                      <div className="tenure-card__values">
                        <span>
                          <small>{currentTermChange.baseline.period}</small>
                          <strong>
                            {formatValue(
                              currentTermChange.baseline.value,
                              series.definition.format,
                              series.definition.unit,
                            )}
                          </strong>
                        </span>
                        <ChevronChange />
                        <span>
                          <small>{currentTermChange.endpoint.period}</small>
                          <strong>
                            {formatValue(
                              currentTermChange.endpoint.value,
                              series.definition.format,
                              series.definition.unit,
                            )}
                          </strong>
                        </span>
                      </div>
                      <div className="tenure-card__change">
                        <strong>
                          {formatTermChange(
                            currentTermChange,
                            series.definition,
                          )}
                        </strong>
                        <span>
                          {sentenceCase(
                            currentTermChange.directionAssessment,
                          )}{' '}
                          ·{' '}
                          {formatTermChange(
                            currentTermChange,
                            series.definition,
                            true,
                          )}
                        </span>
                      </div>
                      <small>{baselineLabel(currentTermChange)}</small>
                    </article>
                  ) : (
                    <article className="tenure-card tenure-card--empty">
                      <span className="section-label">Current Prime Minister</span>
                      <h4>No comparable term data</h4>
                      <p>
                        This series does not contain two usable observations
                        during the current term.
                      </p>
                    </article>
                  )}

                  {previousTermChange ? (
                    <article
                      className={`tenure-card tenure-card--${previousTermChange.directionAssessment}`}
                    >
                      <span className="section-label">Previous Prime Minister</span>
                      <h4>{previousTermChange.leader.name}</h4>
                      <div className="tenure-card__values">
                        <span>
                          <small>{previousTermChange.baseline.period}</small>
                          <strong>
                            {formatValue(
                              previousTermChange.baseline.value,
                              series.definition.format,
                              series.definition.unit,
                            )}
                          </strong>
                        </span>
                        <ChevronChange />
                        <span>
                          <small>{previousTermChange.endpoint.period}</small>
                          <strong>
                            {formatValue(
                              previousTermChange.endpoint.value,
                              series.definition.format,
                              series.definition.unit,
                            )}
                          </strong>
                        </span>
                      </div>
                      <div className="tenure-card__change">
                        <strong>
                          {formatTermChange(
                            previousTermChange,
                            series.definition,
                          )}
                        </strong>
                        <span>
                          {sentenceCase(
                            previousTermChange.directionAssessment,
                          )}{' '}
                          ·{' '}
                          {formatTermChange(
                            previousTermChange,
                            series.definition,
                            true,
                          )}
                        </span>
                      </div>
                      <small>{baselineLabel(previousTermChange)}</small>
                    </article>
                  ) : (
                    <article className="tenure-card tenure-card--empty">
                      <span className="section-label">Previous Prime Minister</span>
                      <h4>No comparable predecessor data</h4>
                      <p>
                        The series begins too late or is too sparse for a
                        predecessor comparison.
                      </p>
                    </article>
                  )}
                </div>

                <div className="tenure-table" role="table" aria-label="Indicator change by Prime Minister">
                  <div className="tenure-table__header" role="row">
                    <span>Prime Minister</span>
                    <span>Data window</span>
                    <span>Start → end</span>
                    <span>Total change</span>
                    <span>Per year</span>
                    <span>Direction</span>
                  </div>
                  {series.termChanges.map((termChange) => (
                    <div className="tenure-table__row" role="row" key={termChange.termId}>
                      <button
                        type="button"
                        className="tenure-table__leader"
                        onClick={() => onSelectLeaderTerm(termChange.termId)}
                        title={`Open ${termChange.leader.name} assessment`}
                      >
                        <i
                          style={{
                            backgroundColor:
                              termChange.party?.color ?? '#8c9188',
                          }}
                          aria-hidden="true"
                        />
                        <span>
                          <strong>{termChange.leader.name}</strong>
                          <small>
                            {formatYear(termChange.startDate)}–
                            {formatYear(termChange.endDate)}
                            {termChange.party
                              ? ` · ${termChange.party.shortName}`
                              : ''}
                          </small>
                        </span>
                      </button>
                      <span>
                        {termChange.baseline.period}–
                        {termChange.endpoint.period}
                      </span>
                      <span>
                        {formatValue(
                          termChange.baseline.value,
                          series.definition.format,
                          series.definition.unit,
                          true,
                        )}{' '}
                        →{' '}
                        {formatValue(
                          termChange.endpoint.value,
                          series.definition.format,
                          series.definition.unit,
                          true,
                        )}
                      </span>
                      <strong>
                        {formatTermChange(termChange, series.definition)}
                      </strong>
                      <span>
                        {formatTermChange(
                          termChange,
                          series.definition,
                          true,
                        )}
                      </span>
                      <span
                        className={`term-direction term-direction--${termChange.directionAssessment}`}
                      >
                        {sentenceCase(termChange.directionAssessment)}
                      </span>
                    </div>
                  ))}
                </div>

                <footer className="attribution-caveat">
                  <Info size={15} aria-hidden="true" />
                  <span>{series.attributionCaveat}</span>
                </footer>
              </section>

              <section className="indicator-audit">
                <div>
                  <h3>
                    {series.definition.scoreRole === 'context'
                      ? 'How to use this indicator'
                      : 'How it enters the progress score'}
                  </h3>
                  {series.definition.scoreRole === 'context' ? (
                    <dl>
                      <div>
                        <dt>Direction</dt>
                        <dd>No automatic good or bad direction</dd>
                      </div>
                      <div>
                        <dt>Progress score</dt>
                        <dd>Excluded</dd>
                      </div>
                      <div>
                        <dt>Read alongside</dt>
                        <dd>Real output, inflation, jobs, wages, and reserves</dd>
                      </div>
                    </dl>
                  ) : (
                    <dl>
                      <div>
                        <dt>Direction</dt>
                        <dd>
                          {sentenceCase(series.definition.direction)} is better
                        </dd>
                      </div>
                      <div>
                        <dt>Normalization</dt>
                        <dd>{sentenceCase(series.definition.transform)} scale</dd>
                      </div>
                      <div>
                        <dt>Goalposts</dt>
                        <dd>
                          {series.definition.goalpostLow} to{' '}
                          {series.definition.goalpostHigh}
                        </dd>
                      </div>
                      <div>
                        <dt>Dimension weight</dt>
                        <dd>
                          {Math.round(series.definition.dimensionWeight * 100)}%
                        </dd>
                      </div>
                    </dl>
                  )}
                </div>
                <div className="indicator-source">
                  <h3>
                    <Database size={16} aria-hidden="true" />
                    Controlling source
                  </h3>
                  <a href={series.source.url} target="_blank" rel="noreferrer">
                    <SourceRating rating={series.source.reliability} />
                    <strong>{series.source.title}</strong>
                    <span>{series.source.publisher}</span>
                  </a>
                  <p>{series.source.ratingReason}</p>
                  <p className="source-limitation">
                    <Info size={14} aria-hidden="true" />
                    {series.source.limitations}
                  </p>
                  <SourceLinks sources={[series.source]} />
                </div>
              </section>

            </>
          )}
        </div>
      </section>
    </div>
  )
}
