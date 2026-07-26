import type {
  BudgetAllocationSeed,
  BudgetPointSeed,
  BudgetScoreSeed,
  BudgetSeed,
  SourceSeed,
} from '../types.ts'

const accessedDate = '2026-07-23'
const assessmentAsOf = '2026-07-23'
const refreshReviewedAt = '2026-07-26'

export const budgetSources: SourceSeed[] = [
  {
    id: 'budget-speech-1947-48',
    title: 'Budget Speech 1947-48',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs194748.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'The first official Union Budget speech of independent India.',
    bestFor: 'Original estimates, stated priorities, and accounting context.',
    limitations:
      'Historical categories differ from modern budget classifications and do not establish later outcomes.',
    publishedDate: '1947-11-26',
    accessedDate,
  },
  {
    id: 'budget-speech-1956-57',
    title: 'Budget Speech 1956-57',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs195657.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official budget speech at the start of the Second Five-Year Plan.',
    bestFor: 'Revenue, capital, development, education, and industrial outlays.',
    limitations:
      'Plan-era categories are not directly comparable with present-day ministry totals.',
    accessedDate,
  },
  {
    id: 'budget-speech-1965-66',
    title: 'Budget Speech 1965-66',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs196566.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official budget speech during Lal Bahadur Shastri\'s premiership.',
    bestFor: 'Plan allocation, fiscal-restraint intent, and wartime economic context.',
    limitations:
      'The speech predates the full effects of war, drought, and later revisions.',
    accessedDate,
  },
  {
    id: 'budget-speech-1969-70',
    title: 'Budget Speech 1969-70',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs196970.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official budget speech for the first year of the Fourth Plan.',
    bestFor: 'Plan provision, state assistance, resource constraints, and deficit intent.',
    limitations:
      'It records the February plan before later political and banking decisions in 1969.',
    accessedDate,
  },
  {
    id: 'budget-speech-1978-79',
    title: 'Budget Speech 1978-79',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs197879.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official Janata government budget speech with detailed sector outlays.',
    bestFor: 'Rural industry, irrigation, power, science, defence, and overall estimates.',
    limitations:
      'Proposed allocations do not prove implementation or durable results.',
    accessedDate,
  },
  {
    id: 'budget-speech-1982-83',
    title: 'Budget Speech 1982-83',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs198283.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official budget speech with detailed Sixth Plan and social outlays.',
    bestFor: 'Energy, irrigation, agriculture, rural employment, welfare, and total estimates.',
    limitations:
      'The budget speech states plans and expected outputs, not independently measured outcomes.',
    accessedDate,
  },
  {
    id: 'budget-speech-1986-87',
    title: 'Budget Speech 1986-87',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs198687.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official budget speech implementing the Long Term Fiscal Policy and MODVAT.',
    bestFor: 'Plan, rural development, power, subsidy, defence, and tax-reform proposals.',
    limitations:
      'The speech does not independently establish efficiency gains or distributional effects.',
    accessedDate,
  },
  {
    id: 'budget-speech-1990-91',
    title: 'Budget Speech 1990-91',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs199091.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official National Front government budget speech.',
    bestFor: 'Rural priorities, debt relief, sector plan outlays, and deficit estimates.',
    limitations:
      'The government was short-lived and the fiscal position deteriorated after presentation.',
    accessedDate,
  },
  {
    id: 'budget-speech-1991-92-interim',
    title: 'Interim Budget Speech 1991-92',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs199192%28I%29.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official vote-on-account presented during the 1991 macroeconomic crisis.',
    bestFor: 'Interim estimates, subsidy restraint, defence, state plans, and crisis context.',
    limitations:
      'It was explicitly temporary and was replaced by the July 1991 full budget.',
    publishedDate: '1991-03-04',
    accessedDate,
  },
  {
    id: 'budget-speech-1991-92',
    title: 'Budget Speech 1991-92',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs199192.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official July 1991 reform budget speech.',
    bestFor: 'Fiscal correction, liberalisation, disinvestment, plan, and expenditure estimates.',
    limitations:
      'The speech states government diagnosis and intent; later outcomes require separate evidence.',
    publishedDate: '1991-07-24',
    accessedDate,
  },
  {
    id: 'budget-speech-1997-98',
    title: 'Budget Speech 1997-98',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs199798.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official United Front budget widely known as the Dream Budget.',
    bestFor: 'Tax reform, fiscal deficit, rural, social, subsidy, and defence outlays.',
    limitations:
      'The Asian financial crisis and government turnover altered the later environment.',
    publishedDate: '1997-02-28',
    accessedDate,
  },
  {
    id: 'budget-speech-1998-99-interim',
    title: 'Interim Budget Speech 1998-99',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs199899%28I%29.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official interim budget of the first Vajpayee government in 1998.',
    bestFor: 'Interim expenditure, state transfers, deficit diagnosis, and reform intent.',
    limitations:
      'It was superseded by the regular budget and should not be read as a full-year programme.',
    publishedDate: '1998-03-25',
    accessedDate,
  },
  {
    id: 'budget-speech-2001-02',
    title: 'Budget Speech 2001-02',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs200102.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official budget speech focused on second-generation reform and human development.',
    bestFor: 'Plan, health, education, fiscal, tax, and rural-credit proposals.',
    limitations:
      'Targets and announcements require later implementation and outcome evidence.',
    publishedDate: '2001-02-28',
    accessedDate,
  },
  {
    id: 'budget-speech-2004-05',
    title: 'Budget Speech 2004-05',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/bspeech/bs200405.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official first full UPA budget speech.',
    bestFor: 'Employment, education, health, agriculture, defence, plan, and deficit proposals.',
    limitations:
      'Several later rights-based programmes were enacted after this budget.',
    publishedDate: '2004-07-08',
    accessedDate,
  },
  {
    id: 'budget-documents-2017-18',
    title: 'Union Budget 2017-18 Documents',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/budget2017-2018/bspeech.asp',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official budget-document index and speech for 2017-18.',
    bestFor: 'Merged railway budget, expenditure totals, fiscal target, and announced priorities.',
    limitations:
      'The budget was presented before GST implementation and soon after demonetisation.',
    publishedDate: '2017-02-01',
    accessedDate,
  },
  {
    id: 'budget-at-glance-2024-25',
    title: 'Budget at a Glance 2024-25',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/budget2024-25/doc/Budget_at_Glance/budget_at_a_glance.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official budget totals, capital expenditure, receipts, and deficit statement.',
    bestFor: 'Headline 2024-25 estimates and comparable fiscal aggregates.',
    limitations:
      'Budget estimates are plans and can differ from revised or actual expenditure.',
    publishedDate: '2024-07-23',
    accessedDate,
  },
  {
    id: 'prs-budget-analysis-2024-25',
    title: 'Union Budget Analysis 2024-25',
    publisher: 'PRS Legislative Research',
    url: 'https://prsindia.org/files/budget/budget_parliament/2024/Union_Budget_Analysis_2024-25.pdf',
    sourceType: 'independent-budget-analysis',
    reliability: 4,
    ratingReason: 'Transparent independent synthesis of official budget documents.',
    bestFor: 'Comparisons, allocation changes, and fiscal-context checks.',
    limitations:
      'It is a secondary analysis and cannot establish later programme outcomes.',
    publishedDate: '2024-07-23',
    accessedDate,
  },
  {
    id: 'budget-at-glance-2026-27',
    title: 'Budget at a Glance 2026-27',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/budget_at_glance/bag1.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official 2026-27 expenditure, capital, transfer, and deficit estimates.',
    bestFor: 'Current-year fiscal aggregates and headline allocations.',
    limitations:
      'The fiscal year is still in progress, so actual execution and outcomes are unavailable.',
    publishedDate: '2026-02-01',
    accessedDate,
  },
  {
    id: 'budget-speech-2026-27',
    title: 'Budget Speech 2026-27',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/doc/budget_speech.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason: 'Official statement of the current budget plan and tax proposals.',
    bestFor: 'Stated priorities, programme announcements, capex, and fiscal path.',
    limitations:
      'Government-authored benefit claims are intentions rather than independent outcome evidence.',
    publishedDate: '2026-02-01',
    accessedDate: refreshReviewedAt,
  },
  {
    id: 'prs-budget-analysis-2026-27',
    title: 'Union Budget Analysis 2026-27',
    publisher: 'PRS Legislative Research',
    url: 'https://prsindia.org/files/budget/budget_parliament/2026/Union_Budget_Analysis-2026-27.pdf',
    sourceType: 'independent-budget-analysis',
    reliability: 4,
    ratingReason: 'Independent line-by-line analysis derived from official budget documents.',
    bestFor: 'Allocation changes, underspending, interest burden, and fiscal comparison.',
    limitations:
      'It evaluates the proposal and revised estimates before final 2026-27 outcomes exist.',
    publishedDate: '2026-02-01',
    accessedDate: refreshReviewedAt,
  },
]

export const budgetEvaluationDimensions = [
  {
    id: 'strategy',
    name: 'Strategy and problem fit',
    weight: 0.2,
    description:
      'Whether the budget identified the central economic and social constraints of its time.',
  },
  {
    id: 'fiscal',
    name: 'Fiscal credibility',
    weight: 0.2,
    description:
      'Realism of receipts, deficit, debt, subsidy, and expenditure assumptions.',
  },
  {
    id: 'capacity',
    name: 'Productive capacity',
    weight: 0.2,
    description:
      'Investment in infrastructure, human capital, technology, and durable state capacity.',
  },
  {
    id: 'inclusion',
    name: 'Inclusion and public services',
    weight: 0.2,
    description:
      'Reach across poorer households, workers, farmers, regions, states, health, and education.',
  },
  {
    id: 'delivery',
    name: 'Delivery and long-run risks',
    weight: 0.2,
    description:
      'Implementation evidence or readiness, transparency, durability, and major side effects.',
  },
] as const

const budgetAssessments: Record<
  string,
  { scores: number[]; rationales: string[] }
> = {
  'budget-1947-48-first': {
    scores: [7.5, 5.5, 5.0, 4.5, 5.0],
    rationales: [
      'It confronted partition, refugee rehabilitation, food, foreign exchange, and the creation of a new state.',
      'Receipts and refugee costs were unusually uncertain, while defence consumed nearly half the estimate.',
      'Some nation-building and state-development support was protected despite emergency pressures.',
      'Relief needs were acknowledged, but the budget had limited room for broad social investment.',
      'Administrative continuity was valuable, though the first budget could not resolve structural scarcity.',
    ],
  },
  'budget-1956-57-second-plan': {
    scores: [8.5, 6.0, 9.0, 6.5, 6.5],
    rationales: [
      'The budget clearly matched the Second Plan strategy of industrial and scientific capacity-building.',
      'Large revenue and capital demands created material financing and inflation risks.',
      'Steel plants, railways, research, power, and development services received major investment.',
      'Education, health, community development, and backward-class welfare increased, but industrial priorities dominated.',
      'The capacity built was durable, while planning inefficiency and foreign-exchange pressure reduced performance.',
    ],
  },
  'budget-1965-66-stability': {
    scores: [6.0, 6.5, 6.0, 5.5, 5.5],
    rationales: [
      'It sought growth with financial stability under food, price, and security pressure.',
      'Expenditure restraint and a revenue surplus were credible goals before war and drought intensified.',
      'Plan investment continued, but resource constraints limited the scale of new capacity.',
      'The plan protected development, yet immediate food and rural vulnerability remained severe.',
      'Later shocks made the original plan difficult to execute and reduce retrospective confidence.',
    ],
  },
  'budget-1969-70-fourth-plan': {
    scores: [6.0, 5.5, 6.2, 5.8, 5.5],
    rationales: [
      'The budget recognised severe resource limits at the start of the Fourth Plan.',
      'The planned deficit was restrained, but revenue pressure and aid dependence weakened credibility.',
      'Steel, ports, fertiliser, metals, and state plan support retained productive emphasis.',
      'Higher state assistance broadened reach, though the social allocation story remained thin.',
      'The political split and later policy changes made the February programme only a partial guide to the year.',
    ],
  },
  'budget-1978-79-rural-infra': {
    scores: [7.5, 5.5, 8.0, 7.5, 6.0],
    rationales: [
      'It directly targeted rural employment, irrigation, power shortages, science, and decentralised industry.',
      'A large budgetary gap and optimistic execution assumptions weakened the fiscal frame.',
      'Power, irrigation, oil, rural electrification, and technology received substantial increases.',
      'Scheduled-caste, tribal, rural-industry, and employment outlays improved distributional balance.',
      'The investment mix was strong, but government instability limited durable follow-through.',
    ],
  },
  'budget-1982-83-sixth-plan': {
    scores: [7.5, 5.5, 8.0, 7.0, 5.8],
    rationales: [
      'It linked energy security, anti-poverty programmes, infrastructure, and Sixth Plan goals.',
      'The budget sought inflation restraint but relied on borrowing and a sizeable uncovered gap.',
      'Energy, irrigation, transport, steel, science, and rural infrastructure were strongly funded.',
      'Rural employment, health, women, children, scheduled groups, and adult education all gained.',
      'The breadth of programmes raised delivery risk and later fiscal stress remained substantial.',
    ],
  },
  'budget-1986-87-modvat': {
    scores: [8.0, 5.8, 8.0, 6.5, 6.5],
    rationales: [
      'It paired a long-term fiscal framework with tax modernisation, technology, and anti-poverty goals.',
      'Receipts and expenditure left a material gap, while subsidies and interest remained heavy.',
      'MODVAT, power, technology, and a large annual plan improved productive incentives.',
      'Rural development and the 20-Point Programme expanded, though benefits depended on implementation.',
      'Tax reform endured, but fiscal consolidation and public-sector efficiency lagged the plan.',
    ],
  },
  'budget-1990-91-rural-debt': {
    scores: [6.5, 4.0, 6.0, 7.0, 4.5],
    rationales: [
      'It addressed rural development, debt relief, literacy, health, and infrastructure.',
      'The deficit and revenue assumptions proved weak as the macroeconomic crisis deepened.',
      'Agriculture, power, railways, education, and health received higher plan outlays.',
      'Rural debt relief and targeted social spending gave the plan a strong inclusion emphasis.',
      'Fiscal overruns and short government tenure sharply reduced implementation quality.',
    ],
  },
  'budget-1991-92-interim-crisis': {
    scores: [5.5, 3.8, 5.0, 5.8, 4.5],
    rationales: [
      'It correctly identified a fiscal crisis but intentionally deferred the comprehensive response.',
      'The interim estimates still carried a very high deficit and fragile receipts.',
      'Plan and state support were preserved, but the vote-on-account could not launch major reform.',
      'Rural debt relief and subsidy targeting sought to protect poorer households during adjustment.',
      'Its temporary design and rapid replacement limit any claim of durable execution.',
    ],
  },
  'budget-1991-92-reform': {
    scores: [9.5, 8.0, 9.0, 5.5, 8.0],
    rationales: [
      'It directly confronted the balance-of-payments and fiscal crisis with structural reform.',
      'Fiscal correction, expenditure restraint, tax reform, and disinvestment formed a credible stabilisation package.',
      'Trade, industrial, exchange-rate, tax, and public-sector changes materially improved productive capacity.',
      'The plan protected state assistance but adjustment costs and safety-net design were limited.',
      'Core reforms endured, although implementation and distributional effects remained uneven.',
    ],
  },
  'budget-1997-98-dream': {
    scores: [8.5, 7.0, 8.0, 7.0, 6.5],
    rationales: [
      'It combined tax simplification, investment incentives, fiscal correction, and social spending.',
      'The 4.5% fiscal-deficit target was credible but vulnerable to later shocks and pay-commission costs.',
      'Lower tax rates, capital-market reforms, plan support, and infrastructure incentives were growth-oriented.',
      'Rural employment, social services, food subsidy, and targeted welfare received meaningful increases.',
      'Many reforms endured, but political turnover and the Asian crisis weakened delivery.',
    ],
  },
  'budget-1998-99-interim': {
    scores: [5.5, 4.5, 5.5, 6.0, 5.0],
    rationales: [
      'It preserved essential expenditure and promised broader reform after elections.',
      'A roughly 6% fiscal deficit and heavy interest and pension costs constrained credibility.',
      'Plan support continued but the document deferred major investment choices.',
      'Additional transfers to states were a clear federal and distributional strength.',
      'As an interim plan, it offered limited evidence of implementation or durability.',
    ],
  },
  'budget-2001-02-second-generation': {
    scores: [8.0, 6.0, 8.0, 7.0, 6.5],
    rationales: [
      'It addressed infrastructure, second-generation reform, fiscal stress, education, and health.',
      'The 4.7% fiscal deficit improved on the combined public-sector imbalance but remained high.',
      'Power, roads, telecom, tax simplification, and education finance supported capacity.',
      'Health, universal elementary education, rural credit, insurance, and scholarships broadened reach.',
      'Several reforms endured, while disinvestment shortfalls and state-level delivery reduced results.',
    ],
  },
  'budget-2004-05-common-minimum': {
    scores: [8.0, 7.0, 7.5, 8.5, 7.0],
    rationales: [
      'It clearly linked growth with employment, agriculture, education, health, and fiscal devolution.',
      'The 4.4% deficit and 2.5% revenue deficit preserved a consolidation path with added social spending.',
      'Plan capital, irrigation, rural amenities, infrastructure, and defence modernisation were supported.',
      'The education cess, school meals, health, minority welfare, and employment goals were strongly inclusive.',
      'The programme prepared later UPA legislation, though several promises depended on subsequent budgets.',
    ],
  },
  'budget-2017-18-gst-rail': {
    scores: [7.5, 7.0, 8.0, 7.0, 6.5],
    rationales: [
      'It targeted formalisation, rural stress, infrastructure, digital administration, and GST transition.',
      'A 3.2% fiscal-deficit target showed discipline, though post-demonetisation assumptions were uncertain.',
      'Capital expenditure, rail integration, roads, housing, and digital systems supported capacity.',
      'Rural, agriculture, employment, and affordable-housing allocations broadened the growth strategy.',
      'The rail-budget merger endured, while GST transition and job effects were uneven.',
    ],
  },
  'budget-2024-25-jobs-capex': {
    scores: [7.5, 8.0, 8.0, 7.0, 6.5],
    rationales: [
      'It focused on jobs, skills, manufacturing, coalition priorities, and public investment.',
      'The 4.9% deficit target continued consolidation with conservative revenue spending.',
      'Capital expenditure reached Rs 11.11 lakh crore with large state investment support.',
      'Employment and skilling were prominent, but health, education, and core welfare growth was less decisive.',
      'Implementation of new employment schemes and project execution remained the key uncertainty.',
    ],
  },
  'budget-2026-27-capex-consolidation': {
    scores: [7.3, 8.0, 8.0, 6.8, 5.8],
    rationales: [
      'It targets productive investment, manufacturing, jobs, agriculture technology, health, and cities.',
      'The 4.3% deficit and declining debt path are credible strengths, but interest absorbs 26% of spending.',
      'Capital expenditure rises to Rs 12.22 lakh crore with strong transport, defence, and technology emphasis.',
      'Health and education rise, but allocation balance and regional delivery remain contested.',
      'The proposal is current; prior underspending in water, housing, and new schemes lowers readiness confidence.',
    ],
  },
}

function budgetRating(id: string) {
  const assessment = budgetAssessments[id]
  const weighted = assessment.scores.reduce(
    (total, score, index) =>
      total + score * budgetEvaluationDimensions[index].weight,
    0,
  )
  return Math.round(weighted * 10) / 10
}

export const budgets: BudgetSeed[] = [
  {
    id: 'budget-1947-48-first',
    jurisdictionId: 'india',
    leaderTermId: 'nehru-1947',
    title: 'First Budget of independent India',
    shortTitle: 'First Budget',
    fiscalYear: '1947-48',
    presentedDate: '1947-11-26',
    financeMinister: 'R. K. Shanmukham Chetty',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'partial',
    ratingBasis: 'retrospective',
    summary:
      'A seven-and-a-half-month emergency budget shaped by Partition, refugee uncertainty, defence, food, and foreign-exchange scarcity.',
    plainLanguage:
      'The new government had very little money and enormous emergency costs. Nearly half the estimated expenditure went to defence, leaving limited room for development.',
    totalExpenditureCrore: 197.39,
    revenueExpenditureCrore: 197.39,
    fiscalDeficitCrore: 26.24,
    ratingScore: budgetRating('budget-1947-48-first'),
    ratingConfidence: 'low',
    ratingSummary:
      'Historically necessary and administratively stabilising, but dominated by emergency spending and severe uncertainty.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1947-48'],
  },
  {
    id: 'budget-1956-57-second-plan',
    jurisdictionId: 'india',
    leaderTermId: 'nehru-1947',
    title: 'Second Plan industrialisation budget',
    shortTitle: 'Second Plan',
    fiscalYear: '1956-57',
    financeMinister: 'C. D. Deshmukh',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A heavy-industry and public-investment budget funding steel, railways, research, education, health, and community development.',
    plainLanguage:
      'The government chose to spend heavily on the factories, railways, science, and institutions it believed a poor country needed to become industrial.',
    totalExpenditureCrore: 862.13,
    revenueExpenditureCrore: 545.43,
    capitalExpenditureCrore: 316.7,
    fiscalDeficitCrore: 51.83,
    ratingScore: budgetRating('budget-1956-57-second-plan'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A major capacity-building budget with durable assets, offset by financing, efficiency, and balance-of-payments risks.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1956-57'],
  },
  {
    id: 'budget-1965-66-stability',
    jurisdictionId: 'india',
    leaderTermId: 'shastri-1964',
    title: 'Growth-with-stability budget before war and drought',
    shortTitle: 'Stability Budget',
    fiscalYear: '1965-66',
    financeMinister: 'T. T. Krishnamachari',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'partial',
    ratingBasis: 'retrospective',
    summary:
      'A restrained plan seeking development without adding to inflationary and external pressure.',
    plainLanguage:
      'The budget tried to keep development moving while limiting deficits and price pressure, but war and drought soon changed the fiscal reality.',
    ratingScore: budgetRating('budget-1965-66-stability'),
    ratingConfidence: 'low',
    ratingSummary:
      'A prudent but overtaken plan whose original assumptions did not survive the year\'s shocks.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1965-66'],
  },
  {
    id: 'budget-1969-70-fourth-plan',
    jurisdictionId: 'india',
    leaderTermId: 'indira-1966',
    title: 'Resource-constrained Fourth Plan budget',
    shortTitle: 'Fourth Plan',
    fiscalYear: '1969-70',
    financeMinister: 'Morarji Desai',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'partial',
    ratingBasis: 'retrospective',
    summary:
      'A cautious plan budget balancing industrial projects, state assistance, food needs, aid dependence, and price stability.',
    plainLanguage:
      'The government wanted to restart planned development, but weak revenues and limited borrowing room forced a modest programme.',
    fiscalDeficitCrore: 260,
    ratingScore: budgetRating('budget-1969-70-fourth-plan'),
    ratingConfidence: 'low',
    ratingSummary:
      'Reasonably targeted under severe constraints, but politically disrupted and only partly representative of the year.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1969-70'],
  },
  {
    id: 'budget-1978-79-rural-infra',
    jurisdictionId: 'india',
    leaderTermId: 'desai-1977',
    title: 'Rural employment and infrastructure budget',
    shortTitle: 'Rural and Power',
    fiscalYear: '1978-79',
    financeMinister: 'H. M. Patel',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A large rural, irrigation, power, science, and decentralised-industry programme after the Emergency.',
    plainLanguage:
      'The budget shifted attention toward villages, jobs, irrigation, electricity, and smaller industry, but planned a large funding gap.',
    totalExpenditureCrore: 18417,
    fiscalDeficitCrore: 1396,
    ratingScore: budgetRating('budget-1978-79-rural-infra'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong rural and infrastructure priorities with a weak fiscal gap and limited political durability.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1978-79'],
  },
  {
    id: 'budget-1982-83-sixth-plan',
    jurisdictionId: 'india',
    leaderTermId: 'indira-1980',
    title: 'Sixth Plan energy and anti-poverty budget',
    shortTitle: 'Energy and Welfare',
    fiscalYear: '1982-83',
    financeMinister: 'Pranab Mukherjee',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A broad expansion of energy, infrastructure, rural employment, health, women\'s programmes, and targeted development.',
    plainLanguage:
      'The government increased spending across power, oil, irrigation, rural jobs, health, and welfare, making execution and financing the central risks.',
    totalExpenditureCrore: 29219,
    fiscalDeficitCrore: 2085,
    ratingScore: budgetRating('budget-1982-83-sixth-plan'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Broadly developmental and inclusive, but programme sprawl and fiscal pressure reduced delivery quality.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1982-83'],
  },
  {
    id: 'budget-1986-87-modvat',
    jurisdictionId: 'india',
    leaderTermId: 'rajiv-1984',
    title: 'MODVAT and technology-modernisation budget',
    shortTitle: 'MODVAT Budget',
    fiscalYear: '1986-87',
    financeMinister: 'V. P. Singh',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A tax-modernisation and public-investment budget implementing the Long Term Fiscal Policy and expanding technology and rural programmes.',
    plainLanguage:
      'The budget tried to reduce cascading taxes, modernise industry, invest in power and technology, and expand anti-poverty programmes.',
    totalExpenditureCrore: 52862,
    fiscalDeficitCrore: 4095,
    ratingScore: budgetRating('budget-1986-87-modvat'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A durable tax and modernisation step with persistent deficit, subsidy, and public-sector efficiency weaknesses.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1986-87'],
  },
  {
    id: 'budget-1990-91-rural-debt',
    jurisdictionId: 'india',
    leaderTermId: 'vp-singh-1989',
    title: 'Rural debt-relief budget before the 1991 crisis',
    shortTitle: 'Rural Debt Relief',
    fiscalYear: '1990-91',
    financeMinister: 'Madhu Dandavate',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A rural, employment, literacy, health, and debt-relief budget presented against a rapidly worsening fiscal position.',
    plainLanguage:
      'The plan put more money into villages and social programmes, but the government was spending and borrowing more than the economy could safely sustain.',
    totalExpenditureCrore: 94535,
    fiscalDeficitCrore: 36795,
    ratingScore: budgetRating('budget-1990-91-rural-debt'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Inclusive intentions were overwhelmed by fiscal deterioration, overruns, and short political life.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1990-91', 'budget-speech-1991-92-interim'],
  },
  {
    id: 'budget-1991-92-interim-crisis',
    jurisdictionId: 'india',
    leaderTermId: 'chandra-shekhar-1990',
    title: 'Interim crisis budget and vote-on-account',
    shortTitle: '1991 Interim',
    fiscalYear: '1991-92',
    presentedDate: '1991-03-04',
    financeMinister: 'Yashwant Sinha',
    budgetKind: 'interim',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A temporary vote-on-account preserving essential spending while acknowledging a crisis requiring a later full strategy.',
    plainLanguage:
      'The government knew the finances were in crisis but did not have the mandate or time for a complete repair, so it funded a few months and deferred major decisions.',
    totalExpenditureCrore: 110167,
    fiscalDeficitCrore: 38475,
    ratingScore: budgetRating('budget-1991-92-interim-crisis'),
    ratingConfidence: 'low',
    ratingSummary:
      'An honest temporary bridge, but not a sufficient response to the fiscal and external crisis.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1991-92-interim'],
  },
  {
    id: 'budget-1991-92-reform',
    jurisdictionId: 'india',
    leaderTermId: 'rao-1991',
    title: '1991 stabilisation and liberalisation budget',
    shortTitle: 'Reform Budget',
    fiscalYear: '1991-92',
    presentedDate: '1991-07-24',
    financeMinister: 'Manmohan Singh',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A crisis budget combining fiscal correction, trade and industrial liberalisation, tax reform, devaluation context, and disinvestment.',
    plainLanguage:
      'India was close to running out of foreign exchange. The budget cut and redirected spending, opened the economy, and changed the rules for trade, industry, and public enterprises.',
    totalExpenditureCrore: 113422,
    fiscalDeficitCrore: 39732,
    ratingScore: budgetRating('budget-1991-92-reform'),
    ratingConfidence: 'high',
    ratingSummary:
      'A historically consequential and durable reform budget, reduced by adjustment costs and limited protection for those who lost in transition.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1991-92'],
  },
  {
    id: 'budget-1997-98-dream',
    jurisdictionId: 'india',
    leaderTermId: 'deve-gowda-1996',
    title: 'Dream Budget of tax and market reform',
    shortTitle: 'Dream Budget',
    fiscalYear: '1997-98',
    presentedDate: '1997-02-28',
    financeMinister: 'P. Chidambaram',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A broad tax-rationalisation, capital-market, rural, social-services, subsidy, and fiscal-consolidation programme.',
    plainLanguage:
      'The budget lowered and simplified taxes to improve compliance and investment while also raising rural and social spending.',
    totalExpenditureCrore: 232481,
    fiscalDeficitCrore: 65454,
    fiscalDeficitPctGdp: 4.5,
    ratingScore: budgetRating('budget-1997-98-dream'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strong reform and inclusion package whose delivery was weakened by political turnover and external shocks.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1997-98'],
  },
  {
    id: 'budget-1998-99-interim',
    jurisdictionId: 'india',
    leaderTermId: 'vajpayee-1998',
    title: 'Interim budget of the first Vajpayee government',
    shortTitle: '1998 Interim',
    fiscalYear: '1998-99',
    presentedDate: '1998-03-25',
    financeMinister: 'Yashwant Sinha',
    budgetKind: 'interim',
    status: 'completed',
    coverageStatus: 'partial',
    ratingBasis: 'retrospective',
    summary:
      'An interim plan preserving expenditure and increasing state transfers while deferring a full reform and deficit strategy.',
    plainLanguage:
      'The new government funded essential activity and gave states more money, but left the difficult tax, spending, and deficit choices for the regular budget.',
    totalExpenditureCrore: 264988,
    fiscalDeficitCrore: 96815,
    fiscalDeficitPctGdp: 6.0,
    ratingScore: budgetRating('budget-1998-99-interim'),
    ratingConfidence: 'low',
    ratingSummary:
      'Useful as a transition, but fiscally weak and too temporary to judge as a complete programme.',
    assessmentAsOf,
    sourceIds: ['budget-speech-1998-99-interim'],
  },
  {
    id: 'budget-2001-02-second-generation',
    jurisdictionId: 'india',
    leaderTermId: 'vajpayee-1998',
    title: 'Second-generation reform and human-development budget',
    shortTitle: 'Second Generation',
    fiscalYear: '2001-02',
    presentedDate: '2001-02-28',
    financeMinister: 'Yashwant Sinha',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A reform, infrastructure, education, health, rural credit, tax-simplification, and fiscal-responsibility budget.',
    plainLanguage:
      'The budget tried to modernise infrastructure and taxes while expanding schools, health, rural credit, and student finance.',
    totalExpenditureCrore: 375223,
    fiscalDeficitCrore: 116314,
    fiscalDeficitPctGdp: 4.7,
    ratingScore: budgetRating('budget-2001-02-second-generation'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A broad capacity-building programme with durable reforms, offset by fiscal stress and uneven execution.',
    assessmentAsOf,
    sourceIds: ['budget-speech-2001-02'],
  },
  {
    id: 'budget-2004-05-common-minimum',
    jurisdictionId: 'india',
    leaderTermId: 'manmohan-2004',
    title: 'Employment, education, health, and rural investment budget',
    shortTitle: 'UPA First Budget',
    fiscalYear: '2004-05',
    presentedDate: '2004-07-08',
    financeMinister: 'P. Chidambaram',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'The first UPA budget linked growth to employment, education, health, agriculture, irrigation, and stronger fiscal devolution.',
    plainLanguage:
      'The government tried to make growth more useful to ordinary households by spending more on schools, food, health, rural work, water, and farming.',
    totalExpenditureCrore: 477829,
    fiscalDeficitCrore: 137407,
    fiscalDeficitPctGdp: 4.4,
    ratingScore: budgetRating('budget-2004-05-common-minimum'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strong inclusive-growth blueprint that prepared later welfare reforms while retaining a credible fiscal path.',
    assessmentAsOf,
    sourceIds: ['budget-speech-2004-05'],
  },
  {
    id: 'budget-2017-18-gst-rail',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Post-demonetisation, GST-transition, and merged railway budget',
    shortTitle: 'GST and Rail Merge',
    fiscalYear: '2017-18',
    presentedDate: '2017-02-01',
    financeMinister: 'Arun Jaitley',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A formalisation, rural, infrastructure, housing, digital-administration, and fiscal-consolidation budget presented before GST.',
    plainLanguage:
      'The budget merged railway finances into the Union Budget, invested in infrastructure and villages, and prepared for GST after the cash shock of demonetisation.',
    totalExpenditureCrore: 2147000,
    revenueExpenditureCrore: 1837000,
    capitalExpenditureCrore: 310000,
    fiscalDeficitCrore: 547000,
    fiscalDeficitPctGdp: 3.2,
    ratingScore: budgetRating('budget-2017-18-gst-rail'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong on public investment and administrative reform, with mixed transition costs and job evidence.',
    assessmentAsOf,
    sourceIds: ['budget-documents-2017-18'],
  },
  {
    id: 'budget-2024-25-jobs-capex',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Jobs, skills, manufacturing, and capital-expenditure budget',
    shortTitle: 'Jobs and Capex',
    fiscalYear: '2024-25',
    presentedDate: '2024-07-23',
    financeMinister: 'Nirmala Sitharaman',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A coalition-era budget emphasising employment incentives, skilling, manufacturing, state capital investment, and fiscal consolidation.',
    plainLanguage:
      'The government kept its large infrastructure programme, reduced the deficit, and announced new ways to encourage firms to hire and train young workers.',
    totalExpenditureCrore: 4820512,
    revenueExpenditureCrore: 3709401,
    capitalExpenditureCrore: 1111111,
    fiscalDeficitCrore: 1613000,
    fiscalDeficitPctGdp: 4.9,
    ratingScore: budgetRating('budget-2024-25-jobs-capex'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A fiscally credible investment budget with a better jobs focus, but uncertain scheme execution and modest social-service ambition.',
    assessmentAsOf,
    sourceIds: ['budget-at-glance-2024-25', 'prs-budget-analysis-2024-25'],
  },
  {
    id: 'budget-2026-27-capex-consolidation',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Current capex, manufacturing, and debt-consolidation budget',
    shortTitle: 'Budget 2026-27',
    fiscalYear: '2026-27',
    presentedDate: '2026-02-01',
    financeMinister: 'Nirmala Sitharaman',
    budgetKind: 'full',
    status: 'current',
    coverageStatus: 'reviewed',
    ratingBasis: 'proposal',
    summary:
      'The current budget raises capital expenditure, targets a 4.3% fiscal deficit, and backs defence, transport, manufacturing, agriculture technology, health, education, and cities.',
    plainLanguage:
      'The plan keeps borrowing on a declining path while spending more on assets and selected public services. Its biggest question is whether ministries can actually use the money well.',
    totalExpenditureCrore: 5347315,
    revenueExpenditureCrore: 4125494,
    capitalExpenditureCrore: 1221821,
    fiscalDeficitCrore: 1696000,
    fiscalDeficitPctGdp: 4.3,
    ratingScore: budgetRating('budget-2026-27-capex-consolidation'),
    ratingConfidence: 'low',
    ratingSummary:
      'A disciplined, investment-heavy proposal with meaningful service increases, reduced by interest burden and recent underspending evidence.',
    assessmentAsOf: refreshReviewedAt,
    sourceIds: [
      'budget-at-glance-2026-27',
      'budget-speech-2026-27',
      'prs-budget-analysis-2026-27',
    ],
  },
]

export const budgetScores: BudgetScoreSeed[] = Object.entries(
  budgetAssessments,
).flatMap(([budgetId, assessment]) =>
  assessment.scores.map((score, index) => ({
    budgetId,
    dimensionId: budgetEvaluationDimensions[index].id,
    score,
    rationale: assessment.rationales[index],
  })),
)

function allocationRows(
  budgetId: string,
  sourceId: string,
  rows: Array<
    [
      category: string,
      label: string,
      amountCrore: number,
      note: string,
      changePercent?: number,
    ]
  >,
): BudgetAllocationSeed[] {
  return rows.map(([category, label, amountCrore, note, changePercent], index) => ({
    id: `${budgetId}-allocation-${index + 1}`,
    budgetId,
    category,
    label,
    amountCrore,
    changePercent,
    note,
    sourceId,
    sortOrder: index + 1,
  }))
}

export const budgetAllocations: BudgetAllocationSeed[] = [
  ...allocationRows('budget-1947-48-first', 'budget-speech-1947-48', [
    ['security', 'Defence services', 92.74, 'About 47% of the seven-and-a-half-month expenditure estimate.'],
    ['development', 'Nation-building activities', 12, 'Development spending identified in the speech.'],
    ['federal', 'Development grants to provinces', 20.39, 'Support for provincial development.'],
    ['federal', 'Loans to provinces', 15, 'Additional provincial financing.'],
  ]),
  ...allocationRows('budget-1956-57-second-plan', 'budget-speech-1956-57', [
    ['capital', 'Capital expenditure', 316.7, 'Historical capital-budget estimate.'],
    ['security', 'Defence services', 203.97, 'Revenue-side defence provision.'],
    ['development', 'Nation-building and development services', 92, 'Education, health, agriculture, research, and welfare.'],
    ['education', 'Education', 21.6, 'Includes state grants, UGC, and scholarships.'],
    ['industry', 'Three public steel plants', 44, 'Rourkela, Bhilai, and Durgapur.'],
  ]),
  ...allocationRows('budget-1965-66-stability', 'budget-speech-1965-66', [
    ['development', 'Centre and states Plan outlay', 2225, 'Budgeted development outlay under historical Plan accounting.'],
  ]),
  ...allocationRows('budget-1969-70-fourth-plan', 'budget-speech-1969-70', [
    ['development', 'Total Plan provision', 1738, 'Revenue and capital Plan provision.'],
    ['development', 'Central Plan', 1223, 'Central Plan proper after state and union-territory assistance.'],
    ['federal', 'State Plan assistance', 615, 'Block Central Plan assistance for states.'],
  ]),
  ...allocationRows('budget-1978-79-rural-infra', 'budget-speech-1978-79', [
    ['infrastructure', 'Power sector', 2217, 'Generation, transmission, and distribution.'],
    ['agriculture', 'Major and medium irrigation', 1166, 'Targeted expansion of irrigation potential.'],
    ['security', 'Defence', 2945, 'Defence expenditure estimate.'],
    ['infrastructure', 'Rural electrification', 297, 'Raised from Rs 195 crore.'],
    ['jobs', 'Rural and small-scale industries', 219, 'Raised from Rs 145 crore.'],
  ]),
  ...allocationRows('budget-1982-83-sixth-plan', 'budget-speech-1982-83', [
    ['development', 'Central Plan', 11000, 'A 27.6% increase over the prior budget estimate.'],
    ['security', 'Defence', 5100, 'Raised from the current revised estimate of Rs 4,600 crore.'],
    ['agriculture', 'Irrigation and command-area development', 2133, 'Centre and state Plan provision.'],
    ['agriculture', 'Agriculture', 1202, 'Includes pulses, oilseeds, and dry-land farming.'],
    ['jobs', 'National Rural Employment Programme', 190, 'Matched by states.'],
  ]),
  ...allocationRows('budget-1986-87-modvat', 'budget-speech-1986-87', [
    ['development', 'Annual Plan', 22300, 'A 20.5% increase over the 1985-86 budget estimate.'],
    ['security', 'Defence', 8728, 'Non-Plan defence provision.'],
    ['inclusion', '20-Point Programme', 5998, 'Anti-poverty and social programme outlay.'],
    ['infrastructure', 'Power', 2575, 'Raised from Rs 2,090 crore.'],
    ['rural', 'Rural Development Department', 1851, 'Nearly 50% above the prior approved outlay.'],
  ]),
  ...allocationRows('budget-1990-91-rural-debt', 'budget-speech-1990-91', [
    ['development', 'Central Plan', 39329, 'A 14.2% increase over the prior year.'],
    ['security', 'Defence', 15750, 'Budget estimate driven by border pressures.'],
    ['rural', 'Rural Development', 3115, 'Included intent to begin an employment guarantee.'],
    ['health', 'Health and Family Welfare', 950, 'Plan outlay.'],
    ['education', 'Education', 865, 'Included literacy and technical education.'],
    ['agriculture', 'Agriculture and Cooperation', 905, 'A 17.5% increase.'],
  ]),
  ...allocationRows('budget-1991-92-interim-crisis', 'budget-speech-1991-92-interim', [
    ['development', 'Central Plan', 42148, 'Interim full-year estimate subject to later revision.'],
    ['federal', 'State and Union Territory Plans', 29300, 'Plan outlay for states and union territories.'],
    ['security', 'Defence', 16850, 'Interim provision.'],
    ['subsidy', 'Major subsidies', 8616, 'Food, fertiliser, and export subsidies after proposed rationalisation.'],
    ['rural', 'Rural debt relief', 1500, 'Provision for the existing relief scheme.'],
  ]),
  ...allocationRows('budget-1991-92-reform', 'budget-speech-1991-92', [
    ['development', 'Plan expenditure', 33725, 'Protected plan spending during stabilisation.'],
    ['operations', 'Non-Plan expenditure', 79697, 'Interest, defence, subsidies, and administration.'],
    ['federal', 'Central Plan assistance to states', 14710, 'Maintained at the interim-budget level.'],
    ['reform', 'Targeted disinvestment receipts', 2500, 'Up to 20% equity in selected public enterprises.'],
  ]),
  ...allocationRows('budget-1997-98-dream', 'budget-speech-1997-98', [
    ['development', 'Plan support', 62852, 'Central, state, and union-territory Plan support.'],
    ['security', 'Defence', 35620, 'Includes Fifth Pay Commission costs.'],
    ['social', 'Social services', 15707, 'Education, health, water, and urban development.'],
    ['rural', 'Rural Areas and Employment', 9096, 'A Rs 1,271 crore increase over revised estimates.'],
    ['subsidy', 'Foodgrain and sugar subsidies', 7500, 'Supports the targeted public distribution transition.'],
  ]),
  ...allocationRows('budget-1998-99-interim', 'budget-speech-1998-99-interim', [
    ['development', 'Plan support', 64461, 'Central, state, and union-territory Plans.'],
    ['federal', 'Additional transfers to states', 8594, 'VDIS devolution and externally aided project support.'],
  ]),
  ...allocationRows('budget-2001-02-second-generation', 'budget-speech-2001-02', [
    ['development', 'Plan expenditure', 100100, 'A 16% increase over revised estimates.'],
    ['rural', 'Agricultural credit target', 64000, 'Institutional credit flow target for agriculture.'],
    ['health', 'Health and Family Welfare', 5780, 'Raised from Rs 4,920 crore.'],
  ]),
  ...allocationRows('budget-2004-05-common-minimum', 'budget-speech-2004-05', [
    ['development', 'Plan expenditure', 145590, 'Higher plan revenue and capital expenditure.'],
    ['security', 'Defence', 77000, 'Includes Rs 33,483 crore of capital expenditure.'],
    ['capital', 'Plan capital expenditure', 53747, 'Raised from Rs 43,612 crore in 2003-04.'],
    ['education', 'Expected annual education-cess proceeds', 4500, 'Midpoint of the stated Rs 4,000-5,000 crore range.'],
    ['health', 'HIV/AIDS prevention and control', 259, 'Specific programme allocation.'],
  ]),
  ...allocationRows('budget-2017-18-gst-rail', 'budget-documents-2017-18', [
    ['capital', 'Capital expenditure', 310000, 'Budget estimate in the official fiscal table.'],
    ['rural', 'Rural, agriculture, and allied sectors', 187223, 'Combined headline priority allocation.'],
    ['jobs', 'MGNREGA', 48000, 'Highest allocation at the time.'],
    ['infrastructure', 'Infrastructure allocation', 396135, 'Transport and wider infrastructure programme.'],
  ]),
  ...allocationRows('budget-2024-25-jobs-capex', 'budget-at-glance-2024-25', [
    ['capital', 'Capital expenditure', 1111111, '23% of total expenditure and 3.4% of GDP.'],
    ['federal', 'State capital-expenditure assistance', 150000, 'Long-term interest-free loans to states.'],
    ['agriculture', 'PM-KISAN', 60000, 'Income-support scheme allocation.'],
    ['agriculture', 'Agriculture central-sector schemes', 100856.69, 'Department-level central-sector scheme total.'],
  ]),
  ...allocationRows('budget-2026-27-capex-consolidation', 'prs-budget-analysis-2026-27', [
    ['capital', 'Capital expenditure', 1221821, '11.5% above the 2025-26 revised estimate.', 11.5],
    ['security', 'Defence', 785000, 'About 14.7% of total Union expenditure.', 15.19],
    ['food', 'Food and public distribution', 235047, 'Largely food subsidy and distribution.'],
    ['rural', 'Rural Development Ministry', 197023, '4% above the 2025-26 revised estimate.', 4],
    ['agriculture', 'Agriculture and Farmers Welfare', 140529, '5.4% above the 2025-26 revised estimate.', 5.4],
    ['education', 'Education Ministry', 139289, '14% above the 2025-26 revised estimate.', 14],
    ['health', 'Health and Family Welfare', 106530, '10% above the 2025-26 revised estimate.', 10],
  ]),
]

function pointRows(
  budgetId: string,
  sourceId: string,
  rows: Array<
    [
      pointType: BudgetPointSeed['pointType'],
      title: string,
      body: string,
    ]
  >,
): BudgetPointSeed[] {
  return rows.map(([pointType, title, body], index) => ({
    id: `${budgetId}-point-${index + 1}`,
    budgetId,
    pointType,
    title,
    body,
    sourceId,
    sortOrder: index + 1,
  }))
}

export const budgetPoints: BudgetPointSeed[] = [
  ...pointRows('budget-1947-48-first', 'budget-speech-1947-48', [
    ['priority', 'Keep the new state functioning', 'Fund defence, administration, refugee response, food management, and provincial support after Partition.'],
    ['strength', 'Transparent uncertainty', 'The speech openly stated that refugee and provincial costs could exceed the estimates.'],
    ['risk', 'Emergency spending crowded out development', 'Defence alone accounted for nearly half of estimated expenditure.'],
  ]),
  ...pointRows('budget-1956-57-second-plan', 'budget-speech-1956-57', [
    ['priority', 'Build an industrial base', 'Finance steel plants, railways, power, science, and public institutions under the Second Plan.'],
    ['strength', 'Durable national capacity', 'Many investments created long-lived industrial, scientific, and educational institutions.'],
    ['risk', 'Overstretch and foreign-exchange pressure', 'Heavy capital imports and public investment placed large demands on scarce resources.'],
  ]),
  ...pointRows('budget-1965-66-stability', 'budget-speech-1965-66', [
    ['priority', 'Protect development without worsening inflation', 'Continue Plan investment while restraining avoidable expenditure and maintaining stability.'],
    ['strength', 'Fiscal restraint was explicit', 'The budget treated inflation and external balance as real constraints rather than funding every demand.'],
    ['risk', 'The plan was overtaken by shocks', 'War, drought, and food stress made the original assumptions obsolete.'],
  ]),
  ...pointRows('budget-1969-70-fourth-plan', 'budget-speech-1969-70', [
    ['priority', 'Restart planned development', 'Support industrial projects and state plans within tight domestic and external resources.'],
    ['strength', 'Deficit caution', 'The budget explicitly constrained deficit financing to protect price stability.'],
    ['risk', 'Political and policy discontinuity', 'The later split in government and major policy changes reduced continuity.'],
  ]),
  ...pointRows('budget-1978-79-rural-infra', 'budget-speech-1978-79', [
    ['priority', 'Rural jobs and basic infrastructure', 'Increase small industry, irrigation, power, electrification, science, and targeted welfare.'],
    ['strength', 'Balanced productive and social spending', 'The plan combined large infrastructure outlays with rural and scheduled-group programmes.'],
    ['risk', 'Large financing gap', 'The Rs 1,396 crore initial gap depended on taxes, borrowing, and optimistic delivery.'],
  ]),
  ...pointRows('budget-1982-83-sixth-plan', 'budget-speech-1982-83', [
    ['priority', 'Energy, infrastructure, and the 20-Point Programme', 'Expand power, oil, coal, irrigation, rural jobs, health, women, and child development.'],
    ['strength', 'Broad inclusion', 'Multiple programmes directly targeted rural families, scheduled groups, women, children, and adult learners.'],
    ['risk', 'Programme overload', 'The very wide agenda increased coordination, monitoring, and fiscal risks.'],
  ]),
  ...pointRows('budget-1986-87-modvat', 'budget-speech-1986-87', [
    ['priority', 'Modernise taxes and production', 'Introduce MODVAT, expand power and technology, and implement a longer-term fiscal framework.'],
    ['strength', 'A durable tax reform', 'Input-tax credit reduced cascading excise and prepared later value-added taxation.'],
    ['risk', 'Fiscal reform lagged tax reform', 'Interest, defence, and subsidies kept the budget gap material.'],
  ]),
  ...pointRows('budget-1990-91-rural-debt', 'budget-speech-1990-91', [
    ['priority', 'Rural development and debt relief', 'Raise rural, agriculture, health, education, employment, and state-plan support.'],
    ['strength', 'Clear distributional focus', 'The plan directed resources toward farmers, workers, scheduled groups, and rural services.'],
    ['risk', 'Fiscal arithmetic failed', 'Expenditure overruns and weak receipts pushed the country closer to the 1991 crisis.'],
  ]),
  ...pointRows('budget-1991-92-interim-crisis', 'budget-speech-1991-92-interim', [
    ['priority', 'Fund essential government until a full budget', 'Use a vote-on-account while preserving Plan and state support.'],
    ['strength', 'The crisis diagnosis was candid', 'The speech acknowledged that a comprehensive fiscal correction could not be postponed for long.'],
    ['risk', 'No complete solution', 'The interim budget retained a very high deficit and deferred structural measures.'],
  ]),
  ...pointRows('budget-1991-92-reform', 'budget-speech-1991-92', [
    ['priority', 'Stabilise and open the economy', 'Reduce the fiscal imbalance while reforming trade, industry, taxation, and public enterprises.'],
    ['strength', 'Durable change in economic rules', 'The budget helped replace licensing and import controls with a more competitive framework.'],
    ['risk', 'Adjustment was uneven', 'Short-run costs and limited social protection meant benefits did not arrive equally.'],
  ]),
  ...pointRows('budget-1997-98-dream', 'budget-speech-1997-98', [
    ['priority', 'Simpler taxes and broader growth', 'Lower rates, widen the base, deepen markets, and fund rural and social programmes.'],
    ['strength', 'Tax reform and social spending moved together', 'The budget did not treat liberalisation and poverty programmes as mutually exclusive.'],
    ['risk', 'External and political shocks', 'Coalition turnover and the Asian crisis weakened the assumptions behind the plan.'],
  ]),
  ...pointRows('budget-1998-99-interim', 'budget-speech-1998-99-interim', [
    ['priority', 'Continuity and state support', 'Maintain essential expenditure and transfer additional resources to states.'],
    ['strength', 'Federal transfers', 'The budget increased devolution and cleared externally aided project claims.'],
    ['risk', 'Deficit and interest burden', 'The interim estimate showed a roughly 6% fiscal deficit before a full strategy existed.'],
  ]),
  ...pointRows('budget-2001-02-second-generation', 'budget-speech-2001-02', [
    ['priority', 'Infrastructure and second-generation reform', 'Improve power, roads, tax administration, labour rules, education, health, and rural credit.'],
    ['strength', 'Human development gained weight', 'Health, universal elementary education, student loans, and social insurance were integrated into reform.'],
    ['risk', 'Fiscal and disinvestment limits', 'High deficits and missed asset-sale receipts constrained execution.'],
  ]),
  ...pointRows('budget-2004-05-common-minimum', 'budget-speech-2004-05', [
    ['priority', 'Inclusive growth', 'Connect growth with jobs, education, health, agriculture, irrigation, water, and state devolution.'],
    ['strength', 'Education and health were concrete', 'The education cess, school meals, health schemes, and HIV funding had named financing.'],
    ['risk', 'Many results depended on later legislation', 'The budget was a blueprint for programmes that required subsequent laws and annual funding.'],
  ]),
  ...pointRows('budget-2017-18-gst-rail', 'budget-documents-2017-18', [
    ['priority', 'Formalisation and infrastructure', 'Prepare for GST, digitise administration, merge the Railway Budget, and invest in housing and rural assets.'],
    ['strength', 'Better spending composition', 'Capital expenditure and infrastructure remained prominent alongside a lower deficit target.'],
    ['risk', 'Transition costs were underweighted', 'The budget followed demonetisation and preceded GST, when demand and small-firm conditions were unusually uncertain.'],
  ]),
  ...pointRows('budget-2024-25-jobs-capex', 'prs-budget-analysis-2024-25', [
    ['priority', 'Jobs, skills, and manufacturing', 'Add hiring and skilling incentives while maintaining public capital expenditure.'],
    ['strength', 'Capex with consolidation', 'The budget kept capital expenditure high while reducing the deficit target to 4.9% of GDP.'],
    ['risk', 'New schemes had weak implementation evidence', 'The employment package was large in intent but its take-up and job quality were not yet known.'],
  ]),
  ...pointRows('budget-2026-27-capex-consolidation', 'prs-budget-analysis-2026-27', [
    ['priority', 'Investment-led growth with lower debt', 'Raise capex and selected service allocations while reducing the fiscal deficit to 4.3% of GDP.'],
    ['strength', 'Capital and social allocations both rise', 'Capex, defence, education, health, agriculture, and rural development all receive increases.'],
    ['risk', 'Interest and underspending narrow room', 'Interest consumes 26% of expenditure, while prior water, housing, Bharatnet, and RDI allocations were substantially underspent.'],
    ['context', 'This is a provisional rating', 'The fiscal year is in progress, so the score judges design and readiness rather than completed outcomes.'],
  ]),
]
