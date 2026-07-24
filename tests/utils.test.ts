import { describe, expect, it } from 'vitest'
import { formatValue } from '../src/utils.ts'

describe('display formatting', () => {
  it('distinguishes rupee and dollar indicator currencies', () => {
    expect(
      formatValue(198000, 'currency', 'constant 2011-12 Rs'),
    ).toBe('Rs 1,98,000')
    expect(
      formatValue(198000, 'currency', 'constant 2011-12 Rs', true),
    ).toBe('Rs 2L')
    expect(
      formatValue(2500, 'currency', 'constant 2015 US$'),
    ).toBe('$2,500')
    expect(
      formatValue(-7330, 'currency', 'constant 2011-12 Rs'),
    ).toBe('-Rs 7,330')
  })
})
