export type PolicyRegisterMatcher = {
  policyId: string
  matches: (title: string, date: string) => boolean
}

function normalizedTitle(title: string) {
  return title
    .toUpperCase()
    .replace(/[’']/g, '')
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim()
}

export const reviewedPolicyRegisterMatchers: PolicyRegisterMatcher[] = [
  {
    policyId: 'idra-1951',
    matches: (title) =>
      title.includes('INDUSTRIES DEVELOPMENT AND REGULATION BILL'),
  },
  {
    policyId: 'income-tax-act-1961',
    matches: (title, date) =>
      date.startsWith('1961') && title.includes('INCOME TAX BILL 1961'),
  },
  {
    policyId: 'food-corporations-1964',
    matches: (title, date) =>
      date.startsWith('1964') && title.includes('FOOD CORPORATIONS BILL 1964'),
  },
  {
    policyId: 'bank-nationalisation-1969',
    matches: (title, date) =>
      date.startsWith('1969') &&
      title.includes('BANKING COMPANIES ACQUISITION AND TRANSFER'),
  },
  {
    policyId: 'constitution-42nd-1976',
    matches: (title) =>
      title.includes('CONSTITUTION FORTY SECOND AMENDMENT BILL'),
  },
  {
    policyId: 'constitution-44th-1978',
    matches: (title, date) =>
      date === '1978-05-15' &&
      title.includes('CONSTITUTION FORTY FIFTH AMENDMENT BILL 1978'),
  },
  {
    policyId: 'modvat-1986',
    matches: (title, date) =>
      date === '1986-02-28' && title === 'THE FINANCE BILL 1986',
  },
  {
    policyId: 'tax-rationalisation-1991',
    matches: (title, date) =>
      date === '1991-07-24' && title === 'THE FINANCE NO 2 BILL 1991',
  },
  {
    policyId: 'service-tax-1994',
    matches: (title, date) =>
      date === '1994-02-28' && title === 'THE FINANCE BILL 1994',
  },
  {
    policyId: 'trai-act-1997',
    matches: (title, date) =>
      (date === '1996-07-23' || date === '1997-03-15') &&
      title.includes('TELECOM REGULATORY AUTHORITY OF INDIA BILL'),
  },
  {
    policyId: 'rti-2005',
    matches: (title) => title.includes('RIGHT TO INFORMATION BILL'),
  },
  {
    policyId: 'mgnrega-2005',
    matches: (title) =>
      title.includes('NATIONAL RURAL EMPLOYMENT GUARANTEE BILL'),
  },
  {
    policyId: 'fcra-2010',
    matches: (title, date) =>
      date.startsWith('2006') &&
      title.includes('FOREIGN CONTRIBUTION REGULATION BILL'),
  },
  {
    policyId: 'aadhaar-2016',
    matches: (title) =>
      title.includes('AADHAAR TARGETED DELIVERY OF FINANCIAL'),
  },
  {
    policyId: 'ibc-2016',
    matches: (title) => title.includes('INSOLVENCY AND BANKRUPTCY CODE'),
  },
  {
    policyId: 'gst-2017',
    matches: (title) =>
      title.includes(
        'CONSTITUTION ONE HUNDRED AND TWENTY SECOND AMENDMENT BILL',
      ),
  },
  {
    policyId: 'corporate-tax-cut-2019',
    matches: (title, date) =>
      date.startsWith('2019') &&
      title.includes('TAXATION LAWS AMENDMENT BILL 2019'),
  },
  {
    policyId: 'citizenship-amendment-act-2019',
    matches: (title, date) =>
      date === '2019-12-09' &&
      title.includes('CITIZENSHIP AMENDMENT BILL 2019'),
  },
  {
    policyId: 'personal-tax-regime-2020',
    matches: (title, date) =>
      date === '2020-02-01' && title === 'THE FINANCE BILL 2020',
  },
  {
    policyId: 'farm-laws-2020',
    matches: (title, date) =>
      date.startsWith('2020') &&
      (title.includes('FARMERS PRODUCE TRADE AND COMMERCE') ||
        title.includes('FARMERS EMPOWERMENT AND PROTECTION') ||
        title.includes('ESSENTIAL COMMODITIES AMENDMENT BILL')),
  },
  {
    policyId: 'fcra-amendment-2020',
    matches: (title, date) =>
      date.startsWith('2020') &&
      title.includes('FOREIGN CONTRIBUTION REGULATION AMENDMENT BILL'),
  },
  {
    policyId: 'income-tax-act-2025',
    matches: (title, date) =>
      date.startsWith('2025') && title.includes('INCOME TAX BILL 2025'),
  },
  {
    policyId: 'fcra-amendment-bill-2026',
    matches: (title, date) =>
      date.startsWith('2026') &&
      title.includes('FOREIGN CONTRIBUTION REGULATION AMENDMENT BILL'),
  },
]

export function linkedPolicyId(title: string, date: string) {
  const normalized = normalizedTitle(title)
  return reviewedPolicyRegisterMatchers.find((matcher) =>
    matcher.matches(normalized, date),
  )?.policyId
}
