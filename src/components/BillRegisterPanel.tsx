import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Clock3,
  ExternalLink,
  FileSearch,
  FileText,
  Filter,
  Landmark,
  Scale,
  Search,
  UsersRound,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../api.ts'
import type { BillRecord, BillRegisterResponse } from '../types.ts'
import { formatDate } from '../utils.ts'
import { LoadingState, SourceLinks } from './common.tsx'

function readableBillTitle(title: string) {
  if (title !== title.toUpperCase()) return title.replace(/\.$/, '')
  const smallWords = new Set([
    'a',
    'an',
    'and',
    'as',
    'at',
    'by',
    'for',
    'in',
    'of',
    'on',
    'or',
    'the',
    'to',
  ])
  return title
    .toLowerCase()
    .replace(/\.$/, '')
    .split(' ')
    .map((word, index) =>
      index > 0 && smallWords.has(word)
        ? word
        : `${word.charAt(0).toUpperCase()}${word.slice(1)}`,
    )
    .join(' ')
}

function billDocuments(bill: BillRecord) {
  return [
    ['As introduced', bill.introducedFile],
    ['Passed by Lok Sabha', bill.passedLokSabhaFile],
    ['Passed by Rajya Sabha', bill.passedRajyaSabhaFile],
    ['Passed by both Houses', bill.passedBothHousesFile],
    ['Committee report', bill.committeeReportFile],
    ['Gazette', bill.gazetteFile],
    ['Synopsis', bill.synopsisFile],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]))
}

function evidenceLabel(bill: BillRecord) {
  if (bill.explanation.evidenceBasis === 'independent-review') {
    return 'Independently assessed'
  }
  if (bill.explanation.evidenceBasis === 'official-text') {
    return 'Official text read'
  }
  return 'Register-derived'
}

function reviewLabel(bill: BillRecord) {
  if (bill.assessment) return 'Rated'
  if (bill.explanation.evidenceBasis === 'official-text') return 'Text read'
  return 'Explained'
}

export function BillRegisterPanel({
  selectedBillId,
  onSelectBill,
  onOpenPolicy,
}: {
  selectedBillId: string | null
  onSelectBill: (
    billId: string | null,
    options?: { replace?: boolean },
  ) => void
  onOpenPolicy: (policyId: string) => void
}) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [ministry, setMinistry] = useState('all')
  const [leaderTermId, setLeaderTermId] = useState('all')
  const [reviewStatus, setReviewStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [response, setResponse] = useState<BillRegisterResponse | null>(null)
  const [selected, setSelected] = useState<BillRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mobileScrollBillId = useRef<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => {
      setLoading(true)
      setError(null)
      api
        .bills(
          {
            query: query.trim() || undefined,
            status: status === 'all' ? undefined : status,
            ministry: ministry === 'all' ? undefined : ministry,
            leaderTermId:
              leaderTermId === 'all' ? undefined : leaderTermId,
            reviewStatus:
              reviewStatus === 'all' ? undefined : reviewStatus,
            page,
            pageSize: 40,
          },
          'india',
          controller.signal,
        )
        .then(setResponse)
        .catch((reason: Error) => {
          if (reason.name !== 'AbortError') setError(reason.message)
        })
        .finally(() => setLoading(false))
    }, 180)
    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [leaderTermId, ministry, page, query, reviewStatus, status])

  useEffect(() => {
    if (!response) return
    if (!selectedBillId) {
      const first = response.records[0] ?? null
      setSelected(first)
      if (first) onSelectBill(first.id, { replace: true })
      return
    }
    const local = response.records.find((bill) => bill.id === selectedBillId)
    if (local) {
      setSelected(local)
      return
    }
    const controller = new AbortController()
    api
      .bill(selectedBillId, 'india', controller.signal)
      .then(setSelected)
      .catch((reason: Error) => {
        if (reason.name !== 'AbortError') {
          setSelected(null)
          onSelectBill(null, { replace: true })
        }
      })
    return () => controller.abort()
  }, [onSelectBill, response, selectedBillId])

  useEffect(() => {
    if (
      !selected ||
      selected.id !== selectedBillId ||
      mobileScrollBillId.current === selected.id ||
      !window.matchMedia('(max-width: 720px)').matches
    ) {
      return
    }
    mobileScrollBillId.current = selected.id
    window.requestAnimationFrame(() => {
      document.getElementById('bill-detail')?.scrollIntoView({
        block: 'start',
      })
    })
  }, [selected, selectedBillId])

  const documents = useMemo(
    () => (selected ? billDocuments(selected) : []),
    [selected],
  )
  const updateFilter = (update: () => void) => {
    update()
    setPage(1)
    setResponse(null)
    setSelected(null)
    onSelectBill(null)
  }
  const updatePage = (nextPage: number) => {
    setPage(nextPage)
    setResponse(null)
    setSelected(null)
    onSelectBill(null)
  }

  return (
    <section className="bill-register" aria-label="Official government bill register">
      <header className="bill-register__summary">
        <div>
          <span className="section-label">Official parliamentary register</span>
          <h2>
            {response ? response.total.toLocaleString('en-IN') : '—'} matching
            government bills
          </h2>
          <p>
            Every record explains the proposal, who may be affected, and the
            main upside and downside to examine. Numerical ratings remain
            separate and require an evidence review.
          </p>
        </div>
        {response && (
          <div className="bill-register__coverage">
            <div>
              <strong>{response.explained.toLocaleString('en-IN')}</strong>
              <span>plain-language explanations</span>
            </div>
            <div>
              <strong>{response.reviewed}</strong>
              <span>linked ratings</span>
            </div>
          </div>
        )}
      </header>

      <div className="filter-bar bill-filter-bar" aria-label="Bill register filters">
        <label className="bill-search-field">
          <Search size={15} aria-hidden="true" />
          <span className="sr-only">Search government bills</span>
          <input
            type="search"
            value={query}
            onChange={(event) =>
              updateFilter(() => setQuery(event.target.value))
            }
            placeholder="Search title, ministry, Bill or Act number"
            aria-label="Search government bills"
          />
        </label>
        <label>
          <Landmark size={15} aria-hidden="true" />
          <span>Prime Minister</span>
          <select
            value={leaderTermId}
            onChange={(event) =>
              updateFilter(() => setLeaderTermId(event.target.value))
            }
          >
            <option value="all">All terms</option>
            {response?.facets.leaders.map((leader) => (
              <option key={leader.id} value={leader.id}>
                {leader.name} ({leader.count})
              </option>
            ))}
          </select>
        </label>
        <label>
          <Filter size={15} aria-hidden="true" />
          <span>Status</span>
          <select
            value={status}
            onChange={(event) =>
              updateFilter(() => setStatus(event.target.value))
            }
          >
            <option value="all">All statuses</option>
            {response?.facets.statuses.map((item) => (
              <option key={item.status} value={item.status}>
                {item.status} ({item.count})
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Review</span>
          <select
            value={reviewStatus}
            onChange={(event) =>
              updateFilter(() => setReviewStatus(event.target.value))
            }
          >
            <option value="all">Discovered and reviewed</option>
            <option value="reviewed">Linked to a rating</option>
            <option value="discovered">Not yet reviewed</option>
          </select>
        </label>
        <label>
          <span>Ministry</span>
          <select
            value={ministry}
            onChange={(event) =>
              updateFilter(() => setMinistry(event.target.value))
            }
          >
            <option value="all">All ministries</option>
            {response?.facets.ministries.map((item) => (
              <option key={item.ministry} value={item.ministry}>
                {item.ministry} ({item.count})
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && (
        <div className="error-state">
          <strong>Could not load the bill register.</strong>
          <span>{error}</span>
        </div>
      )}
      {loading && !response && <LoadingState label="Loading official bills" />}

      {response && (
        <>
          <div className="bill-register__workspace">
            <div className="bill-register__list" role="list" aria-label="Government bills">
              {response.records.map((bill) => (
                <button
                  type="button"
                  role="listitem"
                  key={bill.id}
                  className={selected?.id === bill.id ? 'is-selected' : undefined}
                  onClick={() => {
                    setSelected(bill)
                    onSelectBill(bill.id)
                  }}
                >
                  <span className="bill-register__date">
                    {formatDate(bill.introducedDate, {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="bill-register__identity">
                    <strong>{readableBillTitle(bill.title)}</strong>
                    <small>
                      {bill.explanation.proposalSummary}
                    </small>
                  </span>
                  <span className={`bill-status bill-status--${bill.status.toLowerCase()}`}>
                    {bill.status}
                  </span>
                  <span
                    className={`bill-review-state bill-review-state--${bill.reviewStatus}`}
                  >
                    {reviewLabel(bill)}
                  </span>
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              ))}
              {response.records.length === 0 && (
                <div className="empty-state">No bills match these filters.</div>
              )}
            </div>

            {selected && (
              <article className="bill-detail" id="bill-detail">
                <header>
                  <div>
                    <span className={`bill-status bill-status--${selected.status.toLowerCase()}`}>
                      {selected.status}
                    </span>
                    <h2>{readableBillTitle(selected.title)}</h2>
                    <p>
                      Introduced {formatDate(selected.introducedDate)}
                      {selected.introducedHouse
                        ? ` in ${selected.introducedHouse}`
                        : ''}
                    </p>
                  </div>
                  <span
                    className={`bill-review-state bill-review-state--${selected.reviewStatus}`}
                  >
                    {evidenceLabel(selected)}
                  </span>
                </header>

                {selected.statusNote && (
                  <section className="bill-detail__status-note">
                    <CircleAlert size={17} aria-hidden="true" />
                    <span>
                      <strong>
                        Status checked{' '}
                        {selected.statusAsOf
                          ? formatDate(selected.statusAsOf)
                          : 'recently'}
                      </strong>
                      <p>{selected.statusNote}</p>
                      {selected.sourceStatus !== selected.status && (
                        <small>
                          Sansad feed still reports: {selected.sourceStatus}
                        </small>
                      )}
                    </span>
                  </section>
                )}

                <dl className="bill-detail__facts">
                  <div>
                    <dt>Prime Minister</dt>
                    <dd>{selected.leader?.name ?? 'Not mapped'}</dd>
                  </div>
                  <div>
                    <dt>Ministry</dt>
                    <dd>{selected.ministry ?? 'Not recorded'}</dd>
                  </div>
                  <div>
                    <dt>Category</dt>
                    <dd>{selected.category ?? selected.billType}</dd>
                  </div>
                  <div>
                    <dt>Bill number</dt>
                    <dd>{selected.billNumber ?? 'Not recorded'}</dd>
                  </div>
                  <div>
                    <dt>Lok Sabha passage</dt>
                    <dd>
                      {selected.passedLokSabhaDate
                        ? formatDate(selected.passedLokSabhaDate)
                        : 'Not recorded'}
                    </dd>
                  </div>
                  <div>
                    <dt>Rajya Sabha passage</dt>
                    <dd>
                      {selected.passedRajyaSabhaDate
                        ? formatDate(selected.passedRajyaSabhaDate)
                        : 'Not recorded'}
                    </dd>
                  </div>
                  <div>
                    <dt>Assent / Act</dt>
                    <dd>
                      {selected.assentDate
                        ? `${formatDate(selected.assentDate)}${
                            selected.actNumber
                              ? ` · Act ${selected.actNumber}${
                                  selected.actYear ? ` of ${selected.actYear}` : ''
                                }`
                              : ''
                          }`
                        : 'Not recorded'}
                    </dd>
                  </div>
                  <div>
                    <dt>Committee</dt>
                    <dd>
                      {selected.referredCommitteeDate
                        ? `Referred ${formatDate(selected.referredCommitteeDate)}`
                        : 'Not available in this feed'}
                    </dd>
                  </div>
                </dl>

                <section className="bill-detail__explanation">
                  <div className="bill-detail__section-heading">
                    <FileSearch size={18} aria-hidden="true" />
                    <div>
                      <span>What it proposes</span>
                      <small>
                        {evidenceLabel(selected)} ·{' '}
                        {selected.explanation.specificity.replace('-', ' ')}
                      </small>
                    </div>
                  </div>
                  <p>{selected.explanation.proposalSummary}</p>
                  {selected.explanation.governmentRationale && (
                    <div className="bill-detail__rationale">
                      <strong>Government's stated reason</strong>
                      <p>{selected.explanation.governmentRationale}</p>
                    </div>
                  )}
                </section>

                <section className="bill-detail__affected">
                  <div className="bill-detail__section-heading">
                    <UsersRound size={18} aria-hidden="true" />
                    <span>Who may be affected</span>
                  </div>
                  <ul>
                    {selected.explanation.affectedGroups.map((group) => (
                      <li key={group}>{group}</li>
                    ))}
                  </ul>
                </section>

                <section className="bill-detail__tradeoffs">
                  <div>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    <span>
                      <strong>Potential benefit</strong>
                      <p>{selected.explanation.potentialBenefits}</p>
                    </span>
                  </div>
                  <div>
                    <CircleAlert size={17} aria-hidden="true" />
                    <span>
                      <strong>Potential risk</strong>
                      <p>{selected.explanation.potentialRisks}</p>
                    </span>
                  </div>
                </section>

                <section
                  id="bill-verdict"
                  className={`bill-detail__verdict ${
                    selected.assessment ? 'is-rated' : 'is-unrated'
                  }`}
                >
                  <div className="bill-detail__section-heading">
                    {selected.assessment ? (
                      <Scale size={18} aria-hidden="true" />
                    ) : (
                      <CircleHelp size={18} aria-hidden="true" />
                    )}
                    <span>Is it good or bad?</span>
                  </div>
                  {selected.assessment ? (
                    <div className="bill-detail__rating">
                      <div>
                        <strong>{selected.assessment.ratingScore}</strong>
                        <span>/10</span>
                        <small>
                          {selected.assessment.ratingBasis === 'design'
                            ? 'Provisional design rating'
                            : 'Retrospective rating'}
                        </small>
                      </div>
                      <p>{selected.assessment.ratingSummary}</p>
                      <small>
                        {selected.assessment.scope === 'policy-family'
                          ? 'This is a broader policy-family assessment; it may cover only part of this bill.'
                          : 'This assessment is specific to this bill.'}
                      </small>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenPolicy(selected.assessment?.policyId as string)
                        }
                      >
                        Open full assessment
                        <ChevronRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <div className="bill-detail__not-rated">
                      <Clock3 size={17} aria-hidden="true" />
                      <span>
                        <strong>Not rated yet</strong>
                        <p>{selected.explanation.verdictRationale}</p>
                      </span>
                    </div>
                  )}
                </section>

                {documents.length > 0 && (
                  <section className="bill-detail__documents">
                    <h3>
                      <FileText size={17} aria-hidden="true" />
                      Parliamentary documents
                    </h3>
                    <div>
                      {documents.map(([label, url]) => (
                        <a key={label} href={url} target="_blank" rel="noreferrer">
                          {label}
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                <footer>
                  <SourceLinks sources={selected.sources ?? [response.source]} />
                </footer>
              </article>
            )}
          </div>

          <nav className="bill-pagination" aria-label="Bill register pagination">
            <button
              type="button"
              disabled={response.page <= 1}
              onClick={() => updatePage(Math.max(1, response.page - 1))}
              aria-label="Previous bill page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <span>
              Page {response.page.toLocaleString('en-IN')} of{' '}
              {response.totalPages.toLocaleString('en-IN')}
            </span>
            <button
              type="button"
              disabled={response.page >= response.totalPages}
              onClick={() =>
                updatePage(Math.min(response.totalPages, response.page + 1))
              }
              aria-label="Next bill page"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </>
      )}
    </section>
  )
}
