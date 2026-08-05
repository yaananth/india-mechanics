import { describe, expect, it } from 'vitest'
import {
  defaultNavigation,
  navigationHref,
  parseNavigation,
  type NavigationState,
} from '../src/navigation.ts'

describe('shareable navigation URLs', () => {
  it('makes the default ratings layer explicit in the overview URL', () => {
    expect(
      navigationHref(defaultNavigation, 'https://example.test/'),
    ).toBe('/?layer=editorial')
    expect(parseNavigation('https://example.test/')).toEqual(defaultNavigation)
  })

  it('serializes every primary view with its selected record', () => {
    const cases: Array<[Partial<NavigationState>, string]> = [
      [
        { answerId: 'india-heading' },
        '/?answer=india-heading&layer=editorial',
      ],
      [
        { view: 'timeline', eventId: 'manipur-violence-2023' },
        '/?view=timeline&event=manipur-violence-2023&layer=editorial',
      ],
      [
        { view: 'leaders', termId: 'manmohan-2004' },
        '/?view=leaders&term=manmohan-2004&layer=editorial',
      ],
      [
        { view: 'policies', policyId: 'income-tax-act-2025' },
        '/?view=policies&policy=income-tax-act-2025&layer=editorial',
      ],
      [
        {
          view: 'policies',
          policyMode: 'register',
          billId: 'sansad-bill-2025',
        },
        '/?view=policies&mode=register&bill=sansad-bill-2025&layer=editorial',
      ],
      [
        { view: 'budgets', budgetId: 'budget-1997-98-dream' },
        '/?view=budgets&budget=budget-1997-98-dream&layer=editorial',
      ],
      [
        { view: 'indicators', indicatorId: 'official-exchange-rate' },
        '/?view=indicators&indicator=official-exchange-rate&layer=editorial',
      ],
      [{ view: 'safety' }, '/?view=safety&layer=editorial'],
      [{ view: 'sources' }, '/?view=sources&layer=editorial'],
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
    ).toBe('/india/?view=leaders&term=rao-1991&layer=editorial')
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
      '/?jurisdiction=andhra-pradesh&view=leaders&term=ap-naidu-2024&layer=editorial',
    )
    expect(parseNavigation(href)).toEqual(state)

    const tamilNaduState: NavigationState = {
      ...defaultNavigation,
      jurisdictionId: 'tamil-nadu',
      view: 'leaders',
      termId: 'tn-vijay-2026',
    }
    const tamilNaduHref = navigationHref(
      tamilNaduState,
      'https://example.test/',
    )
    expect(tamilNaduHref).toBe(
      '/?jurisdiction=tamil-nadu&view=leaders&term=tn-vijay-2026&layer=editorial',
    )
    expect(parseNavigation(tamilNaduHref)).toEqual(tamilNaduState)

    const telanganaState: NavigationState = {
      ...defaultNavigation,
      jurisdictionId: 'telangana',
      view: 'leaders',
      termId: 'ts-revanth-2023',
    }
    const telanganaHref = navigationHref(
      telanganaState,
      'https://example.test/',
    )
    expect(telanganaHref).toBe(
      '/?jurisdiction=telangana&view=leaders&term=ts-revanth-2023&layer=editorial',
    )
    expect(parseNavigation(telanganaHref)).toEqual(telanganaState)
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

  it('serializes and parses the explicit facts-only layer', () => {
    const state: NavigationState = {
      ...defaultNavigation,
      showEditorial: false,
      view: 'budgets',
      budgetId: 'budget-1997-98-dream',
    }
    const href = navigationHref(state, 'https://example.test/')
    expect(href).toBe(
      '/?view=budgets&budget=budget-1997-98-dream&layer=facts',
    )
    expect(parseNavigation(href)).toEqual(state)
  })
})
