import {
  ArrowRight,
  ChartNoAxesCombined,
  FileCheck2,
  History,
  Landmark,
  ScrollText,
  Search,
  Sparkles,
  WalletCards,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { api } from '../api.ts'
import type { CuratedAnswer, SearchResponse } from '../types.ts'
import { ConfidenceMark, SourceLinks } from './common.tsx'

const resultIcons = {
  leader: Landmark,
  event: History,
  policy: ScrollText,
  bill: ScrollText,
  budget: WalletCards,
  indicator: ChartNoAxesCombined,
  claim: FileCheck2,
}

export function SearchDialog({
  open,
  jurisdictionId,
  jurisdictionName,
  sampleQuestions,
  onClose,
  onSelectAnswer,
  onSelectResult,
}: {
  open: boolean
  jurisdictionId: string
  jurisdictionName: string
  sampleQuestions: string[]
  onClose: () => void
  onSelectAnswer: (answer: CuratedAnswer) => void
  onSelectResult: (item: SearchResponse['results'][number]) => void
}) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 20)
    return () => window.clearTimeout(timeout)
  }, [open])

  useEffect(() => {
    if (!open || query.trim().length < 2) {
      setResult(null)
      setLoading(false)
      return
    }
    const controller = new AbortController()
    const timeout = window.setTimeout(async () => {
      setLoading(true)
      try {
        setResult(await api.search(query, jurisdictionId, controller.signal))
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setResult({ query, answer: null, results: [] })
        }
      } finally {
        setLoading(false)
      }
    }, 180)
    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [jurisdictionId, open, query])

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  const chooseQuestion = (question: string) => {
    setQuery(question)
    inputRef.current?.focus()
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Search ${jurisdictionName}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="search-dialog__input">
          <Search size={20} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Ask or search ${jurisdictionName}...`}
            aria-label="Search query"
          />
          {loading && <span className="search-spinner" aria-label="Searching" />}
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="search-dialog__body">
          {!result && (
            <div className="search-prompts">
              <div className="search-prompts__heading">
                <Sparkles size={17} aria-hidden="true" />
                <span>Questions with reviewed answers</span>
              </div>
              {sampleQuestions.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => chooseQuestion(question)}
                >
                  <span>{question}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}

          {result?.answer && (
            <article className="search-answer">
              <div className="search-answer__heading">
                <div>
                  <span className="answer-type">Reviewed answer</span>
                  <h2>{result.answer.question}</h2>
                </div>
                <ConfidenceMark confidence={result.answer.confidence} />
              </div>
              <p>{result.answer.shortAnswer}</p>
              <div className="search-answer__claims">
                {result.answer.claims.slice(0, 3).map((claim) => (
                  <div key={claim.id}>
                    <span className={`claim-dot claim-dot--${claim.section}`} />
                    <span>{claim.title}</span>
                  </div>
                ))}
              </div>
              <SourceLinks
                sources={Array.from(
                  new Map(
                    result.answer.claims
                      .flatMap((claim) => claim.sources)
                      .map((source) => [source.id, source]),
                  ).values(),
                )}
                limit={3}
              />
              <button
                type="button"
                className="text-command"
                onClick={() => {
                  onSelectAnswer(result.answer as CuratedAnswer)
                  onClose()
                }}
              >
                Open full answer
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </article>
          )}

          {result && (
            <div className="search-results">
              <div className="search-results__count">
                {result.results.length === 0
                  ? 'No matching records'
                  : `${result.results.length} matching records`}
              </div>
              {result.results.map((item) => {
                const Icon = resultIcons[item.type]
                return (
                  <button
                    type="button"
                    key={`${item.type}-${item.id}`}
                    onClick={() => {
                      onSelectResult(item)
                      onClose()
                    }}
                  >
                    <span className="search-result__icon">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span className="search-result__copy">
                      <strong>{item.title}</strong>
                      <span>{item.subtitle}</span>
                    </span>
                    <span className="search-result__date">{item.date.slice(0, 4)}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
