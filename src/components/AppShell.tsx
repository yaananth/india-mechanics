import {
  BarChart3,
  BookOpenCheck,
  ChartNoAxesCombined,
  Clock3,
  Database,
  Landmark,
  ScrollText,
  Search,
  WalletCards,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { ViewId } from '../types.ts'

const navigation: Array<{
  id: ViewId
  label: string
  shortLabel: string
  icon: typeof BarChart3
}> = [
  { id: 'overview', label: 'Overview', shortLabel: 'Overview', icon: BarChart3 },
  { id: 'timeline', label: 'Timeline', shortLabel: 'Timeline', icon: Clock3 },
  {
    id: 'leaders',
    label: 'Prime Ministers',
    shortLabel: 'PMs',
    icon: Landmark,
  },
  {
    id: 'policies',
    label: 'Policies',
    shortLabel: 'Policies',
    icon: ScrollText,
  },
  {
    id: 'budgets',
    label: 'Budgets',
    shortLabel: 'Budget',
    icon: WalletCards,
  },
  {
    id: 'indicators',
    label: 'Indicators',
    shortLabel: 'Data',
    icon: ChartNoAxesCombined,
  },
  { id: 'sources', label: 'Sources', shortLabel: 'Sources', icon: Database },
]

export function AppShell({
  activeView,
  onViewChange,
  onSearchOpen,
  onMethodologyOpen,
  children,
}: {
  activeView: ViewId
  onViewChange: (view: ViewId) => void
  onSearchOpen: () => void
  onMethodologyOpen: () => void
  children: ReactNode
}) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <button
            type="button"
            className="brand"
            onClick={() => onViewChange('overview')}
            aria-label="India Mechanics overview"
          >
            <span className="brand__mark" aria-hidden="true">
              IM
            </span>
            <span className="brand__name">India Mechanics</span>
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <button
                type="button"
                key={item.id}
                className={activeView === item.id ? 'is-active' : undefined}
                onClick={() => onViewChange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="global-search"
            onClick={onSearchOpen}
            aria-label="Search India Mechanics"
          >
            <Search size={17} aria-hidden="true" />
            <span>Ask or search India&apos;s history...</span>
            <kbd>/</kbd>
          </button>

          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              onClick={onMethodologyOpen}
              title="Methodology"
              aria-label="Open methodology"
            >
              <BookOpenCheck size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="app-main">
        {children}
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <button
              type="button"
              key={item.id}
              className={activeView === item.id ? 'is-active' : undefined}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={19} aria-hidden="true" />
              <span>{item.shortLabel}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
