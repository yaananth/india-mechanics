import {
  BarChart3,
  BookOpenCheck,
  ChartNoAxesCombined,
  Clock3,
  Database,
  Landmark,
  MapPin,
  Menu,
  ScrollText,
  Search,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { Jurisdiction, ViewId } from '../types.ts'

const baseNavigation: Array<{
  id: ViewId
  label: string
  shortLabel: string
  icon: typeof BarChart3
}> = [
  { id: 'overview', label: 'Overview', shortLabel: 'Overview', icon: BarChart3 },
  { id: 'timeline', label: 'Timeline', shortLabel: 'Timeline', icon: Clock3 },
  {
    id: 'leaders',
    label: 'Leaders',
    shortLabel: 'Leaders',
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
    id: 'safety',
    label: 'Crime & Safety',
    shortLabel: 'Safety',
    icon: ShieldCheck,
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
  jurisdictions,
  jurisdiction,
  onJurisdictionChange,
  onSearchOpen,
  onMethodologyOpen,
  children,
}: {
  activeView: ViewId
  onViewChange: (view: ViewId) => void
  jurisdictions: Jurisdiction[]
  jurisdiction: Jurisdiction
  onJurisdictionChange: (jurisdictionId: string) => void
  onSearchOpen: () => void
  onMethodologyOpen: () => void
  children: ReactNode
}) {
  const navigation = baseNavigation.map((item) =>
    item.id === 'leaders'
      ? {
          ...item,
          label:
            jurisdiction.level === 'country'
              ? 'Prime Ministers'
              : 'Chief Ministers',
          shortLabel: jurisdiction.level === 'country' ? 'PMs' : 'CMs',
        }
      : item,
  )
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <button
            type="button"
            className="brand"
            onClick={() => onViewChange('overview')}
            aria-label={`${jurisdiction.shortName} overview`}
          >
            <span className="brand__mark" aria-hidden="true">
              IM
            </span>
            <span className="brand__name">India Mechanics</span>
          </button>

          <label className="jurisdiction-switcher">
            <MapPin size={15} aria-hidden="true" />
            <span className="sr-only">Jurisdiction</span>
            <select
              value={jurisdiction.id}
              onChange={(event) => onJurisdictionChange(event.target.value)}
              aria-label="Select jurisdiction"
            >
              {jurisdictions
                .filter((item) => item.status === 'published')
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.shortName}
                  </option>
                ))}
            </select>
          </label>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <button
                type="button"
                key={item.id}
                className={activeView === item.id ? 'is-active' : undefined}
                onClick={() => onViewChange(item.id)}
              >
                <span className="nav-label nav-label--long">{item.label}</span>
                <span className="nav-label nav-label--short">
                  {item.shortLabel}
                </span>
              </button>
            ))}
          </nav>

          <label className="compact-view-switcher">
            <Menu size={15} aria-hidden="true" />
            <span className="sr-only">View</span>
            <select
              value={activeView}
              onChange={(event) => onViewChange(event.target.value as ViewId)}
              aria-label="Select view"
            >
              {navigation.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="global-search"
            onClick={onSearchOpen}
            aria-label={`Search ${jurisdiction.shortName}`}
          >
            <Search size={17} aria-hidden="true" />
            <span>Ask or search {jurisdiction.shortName}...</span>
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
