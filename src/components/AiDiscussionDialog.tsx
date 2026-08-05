import {
  Check,
  Copy,
  ExternalLink,
  MessageSquareText,
  X,
} from 'lucide-react'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import {
  buildAiDiscussionPrompt,
  type AiDiscussionContext,
} from '../ai-discussion.ts'

async function copyText(value: string, fallback: HTMLTextAreaElement | null) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }
  if (!fallback) throw new Error('Clipboard unavailable')
  fallback.focus()
  fallback.select()
  if (!document.execCommand('copy')) {
    throw new Error('Copy command failed')
  }
}

export function AiDiscussionDialog({
  open,
  context,
  onClose,
}: {
  open: boolean
  context: AiDiscussionContext
  onClose: () => void
}) {
  const [question, setQuestion] = useState(context.defaultQuestion)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  )
  const dialogRef = useRef<HTMLElement>(null)
  const questionRef = useRef<HTMLTextAreaElement>(null)
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const prompt = useMemo(
    () => buildAiDiscussionPrompt(context, question),
    [context, question],
  )

  useEffect(() => {
    if (!open) return
    setQuestion(context.defaultQuestion)
    setCopyState('idle')
    previousFocusRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() =>
      questionRef.current?.focus(),
    )
    return () => {
      window.cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [context.defaultQuestion, context.pageUrl, open])

  if (!open) return null

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab' || !dialogRef.current) return
    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), textarea:not([disabled]), a[href]',
      ),
    ).filter((element) => !element.hasAttribute('hidden'))
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  const handleCopy = async () => {
    try {
      await copyText(prompt, promptRef.current)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 2200)
    } catch {
      setCopyState('error')
    }
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className="ai-discussion-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-discussion-title"
        aria-describedby="ai-discussion-description"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <header className="ai-discussion-dialog__header">
          <div>
            <span className="section-label">Source-aware discussion</span>
            <h2 id="ai-discussion-title">Discuss this evidence with AI</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close AI discussion prompt"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </header>

        <div className="ai-discussion-dialog__body">
          <p id="ai-discussion-description">
            The prompt carries this page, its evidence endpoints, cutoffs, and
            source rules into any AI conversation. Nothing is sent until you
            paste it somewhere.
          </p>

          <label className="ai-discussion-question">
            <span>Your question</span>
            <textarea
              ref={questionRef}
              rows={3}
              value={question}
              onChange={(event) => {
                setQuestion(event.target.value)
                setCopyState('idle')
              }}
            />
          </label>

          <label className="ai-discussion-prompt">
            <span>Prompt preview</span>
            <textarea ref={promptRef} rows={16} value={prompt} readOnly />
          </label>

          <div className="ai-discussion-source-note">
            <MessageSquareText size={18} aria-hidden="true" />
            <p>
              {context.displayLayer === 'editorial-analysis'
                ? 'A high source-fitness marker means strong fitness for the stated use. It is not a political endorsement, a universal truth score, or proof that a policy worked.'
                : 'Use source type, publication date, best use, and limitations to judge each record. Source-fitness ratings and political verdicts are omitted from this layer.'}
            </p>
          </div>

          <nav
            className="ai-discussion-evidence-links"
            aria-label="Evidence links included in prompt"
          >
            {context.evidenceLinks.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                <span>{link.label}</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <footer className="ai-discussion-dialog__footer">
          <span aria-live="polite">
            {copyState === 'copied'
              ? 'Prompt copied'
              : copyState === 'error'
                ? 'Copy failed. Select the prompt manually.'
                : ''}
          </span>
          <button type="button" className="text-command" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="ai-discussion-copy"
            onClick={() => void handleCopy()}
          >
            {copyState === 'copied' ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Copy size={16} aria-hidden="true" />
            )}
            {copyState === 'copied'
              ? 'Copied'
              : 'Copy source-aware prompt'}
          </button>
        </footer>
      </section>
    </div>
  )
}
