import { describe, expect, it } from 'vitest'
import {
  defaultNavigation,
  navigationHref,
  parseNavigation,
  type NavigationState,
} from '../src/navigation.ts'

describe('shareable navigation URLs', () => {
  it('uses the clean root URL for the default overview', () => {
    expect(
      navigationHref(defaultNavigation, 'https://example.test/'),
    ).toBe('/')
    expect(parseNavigation('https://example.test/')).toEqual(defaultNavigation)
  })

  it('serializes every primary view with its selected record', () => {
    const cases: Array<[Partial<NavigationState>, string]> = [
      [{ answerId: 'india-heading' }, '/?answer=india-heading'],
      [
        { view: 'timeline', eventId: 'manipur-violence-2023' },
        '/?view=timeline&event=manipur-violence-2023',
      ],
      [
        { view: 'leaders', termId: 'manmohan-2004' },
        '/?view=leaders&term=manmohan-2004',
      ],
      [
        { view: 'policies', policyId: 'income-tax-act-2025' },
        '/?view=policies&policy=income-tax-act-2025',
      ],
      [
        {
          view: 'policies',
          policyMode: 'register',
          billId: 'sansad-bill-2025',
        },
        '/?view=policies&mode=register&bill=sansad-bill-2025',
      ],
      [
        { view: 'budgets', budgetId: 'budget-1997-98-dream' },
        '/?view=budgets&budget=budget-1997-98-dream',
      ],
      [
        { view: 'indicators', indicatorId: 'official-exchange-rate' },
        '/?view=indicators&indicator=official-exchange-rate',
      ],
      [{ view: 'safety' }, '/?view=safety'],
      [{ view: 'sources' }, '/?view=sources'],
    ]

    for (const [patch, expected] of cases) {
      expect(
        navigationHref(
          { ...defaultNavigation, ...patch },
          'https://example.test/',
        ),
      ).toBe(expected)
    }
  })

  it('preserves a deployed base path while replacing stale query state', () => {
    expect(
      navigationHref(
        {
          ...defaultNavigation,
          view: 'leaders',
          termId: 'rao-1991',
        },
        'https://example.test/india/?old=value#section',
      ),
    ).toBe('/india/?view=leaders&term=rao-1991')
  })

  it('keeps the selected jurisdiction in every shareable state URL', () => {
    const state: NavigationState = {
      ...defaultNavigation,
      jurisdictionId: 'andhra-pradesh',
      view: 'leaders',
      termId: 'ap-naidu-2024',
    }
    const href = navigationHref(state, 'https://example.test/')
    expect(href).toBe(
      '/?jurisdiction=andhra-pradesh&view=leaders&term=ap-naidu-2024',
    )
    expect(parseNavigation(href)).toEqual(state)
  })

  it('infers a view when a share URL omits the view parameter', () => {
    expect(parseNavigation('https://example.test/?event=neet-2026')).toMatchObject({
      view: 'timeline',
      eventId: 'neet-2026',
    })
    expect(
      parseNavigation('https://example.test/?bill=sansad-bill-2025'),
    ).toMatchObject({
      view: 'policies',
      policyMode: 'register',
      billId: 'sansad-bill-2025',
    })
  })

  it('falls back safely for unknown views and modes', () => {
    expect(
      parseNavigation(
        'https://example.test/?view=unknown&mode=unknown&policy=gst-2017',
      ),
    ).toMatchObject({
      view: 'policies',
      policyMode: 'reviews',
      policyId: 'gst-2017',
    })
  })

  it('round-trips canonical view state', () => {
    const state: NavigationState = {
      ...defaultNavigation,
      view: 'policies',
      policyMode: 'register',
      billId: 'sansad-bill-2025-08-11',
    }
    const href = navigationHref(state, 'https://example.test/')
    expect(parseNavigation(href)).toEqual(state)
  })
})
