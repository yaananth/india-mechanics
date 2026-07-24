import type {
  ClaimSeed,
  EventAssessmentSeed,
  EventSeed,
  IndicatorDefinitionSeed,
  IndicatorObservationSeed,
  PolicyScoreSeed,
  PolicySeed,
  SourceSeed,
} from '../types.ts'

const reviewedDate = '2026-07-24'
const weights = [0.2, 0.3, 0.2, 0.15, 0.15] as const

export const developmentSources: SourceSeed[] = [
  {
    id: 'morth-year-end-2025',
    title: 'Year End Review 2025: Ministry of Road Transport and Highways',
    publisher: 'Press Information Bureau, Ministry of Road Transport and Highways',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209837',
    sourceType: 'official-infrastructure-statistics',
    reliability: 5,
    ratingReason:
      'Primary ministry record with comparable highway, expressway, construction, and Bharatmala statistics.',
    bestFor:
      'National Highway length, four-lane capacity, expressways, annual construction, and November 2025 Bharatmala status.',
    limitations:
      'Government achievement framing; highway declarations and project length are not identical to net-new construction or quality.',
    publishedDate: '2025-12-30',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'morth-infrastructure-2026',
    title: 'Infrastructure at the Core: National Highway expansion',
    publisher: 'Press Information Bureau, Ministry of Road Transport and Highways',
    url: 'https://www.pib.gov.in/PressReleaseDetail.aspx?PRID=2270740',
    sourceType: 'official-infrastructure-statistics',
    reliability: 5,
    ratingReason:
      'Primary government record for the March 2026 National Highway network milestone.',
    bestFor: 'The latest 146,572 km National Highway network figure.',
    limitations:
      'Promotional publication; network growth includes newly declared National Highways.',
    publishedDate: '2026-06-09',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'cag-bharatmala-2023',
    title: 'Performance Audit of Bharatmala Pariyojana',
    publisher: 'Comptroller and Auditor General of India',
    url: 'https://cag.gov.in/uploads/download_audit_report/2023/Report-No.-19-of-203--Bharatmala-English-064d5db7bc63c20.06754442.pdf',
    sourceType: 'official-audit',
    reliability: 5,
    ratingReason:
      'Primary constitutional audit of programme cost, appraisal, procurement, land, design, and delivery.',
    bestFor: 'Bharatmala cost escalation and implementation weaknesses through March 2023.',
    limitations:
      'Audit period predates the latest completion totals and later corrective action.',
    publishedDate: '2023-08-10',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'nhai-annual-2024',
    title: 'NHAI Annual Report 2023-24',
    publisher: 'National Highways Authority of India',
    url: 'https://nhai.gov.in/nhai/sites/default/files/2025-09/NHAI-Annual_Report_2023-24_English.pdf',
    sourceType: 'official-financial-report',
    reliability: 5,
    ratingReason:
      'Institutional annual report with audited borrowing, expenditure, land, and asset-monetisation records.',
    bestFor: 'NHAI debt and financing context.',
    limitations:
      'Institutional self-report; does not independently judge value for money.',
    publishedDate: '2024-09-30',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'pmgsy-status-2026',
    title: 'PMGSY completed-road and habitation status, July 2026',
    publisher: 'Press Information Bureau, Ministry of Rural Development',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2287313',
    sourceType: 'official-programme-statistics',
    reliability: 5,
    ratingReason:
      'Primary current administrative record for cumulative PMGSY outputs.',
    bestFor: 'Completed road length and connected habitations through July 16, 2026.',
    limitations:
      'Cumulative totals span Vajpayee, UPA, and Modi governments and do not establish road quality or causal outcomes.',
    publishedDate: '2026-07-21',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'ncaer-pmgsy-2026',
    title: 'PMGSY Socio-Economic Impact Evaluation',
    publisher: 'National Council of Applied Economic Research',
    url: 'https://ncaer.org/wp-content/uploads/2026/07/NCAER-PMGSY-Report-July-2026.pdf',
    sourceType: 'independent-impact-evaluation',
    reliability: 4,
    ratingReason:
      'Named household evaluation across six states with disclosed sample and outcome measures.',
    bestFor:
      'Transport cost, school, health, women mobility, deprivation, and maintenance findings.',
    limitations:
      'Selected-state sample and commissioned with programme-agency guidance; not a nationwide causal estimate.',
    publishedDate: '2026-07-15',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'morth-road-accidents-2023',
    title: 'Road Accidents in India 2023',
    publisher: 'Ministry of Road Transport and Highways',
    url: 'https://morth.gov.in/backend/documents/uploaded/Road-Accident-in-India-2023-Publications.pdf',
    sourceType: 'official-safety-statistics',
    reliability: 5,
    ratingReason:
      'Primary national police-reported road-crash and fatality compilation.',
    bestFor: 'Road deaths and the National Highway share of fatalities.',
    limitations:
      'Police-reported data can undercount crashes and lag current infrastructure conditions.',
    publishedDate: '2024-09-30',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'world-bank-poverty-trend-2026',
    title: "India's Long-Term Poverty Trend, 2011-12 to 2023-24",
    publisher: 'World Bank',
    url: 'https://documents.worldbank.org/curated/en/099042126035038379/pdf/P512371-d096273a-9b40-4085-a83c-5520c14aa17a.pdf',
    sourceType: 'multilateral-statistical-analysis',
    reliability: 5,
    ratingReason:
      'Named World Bank methodology note using official consumption surveys and published harmonisation rules.',
    bestFor:
      '2023-24 extreme and lower-middle-income poverty estimates, long-run change, and survey caveats.',
    limitations:
      'The unusually large final-year decline may partly reflect improved enumeration and consumption reporting.',
    publishedDate: '2026-04-01',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'world-bank-poverty-repro-2026',
    title: "Reproducibility package for India's long-term poverty trend",
    publisher: 'World Bank',
    url: 'https://reproducibility.worldbank.org/catalog/541',
    sourceType: 'statistical-reproducibility-package',
    reliability: 5,
    ratingReason:
      'Published replication materials and methodological provenance for the 2023-24 estimates.',
    bestFor: 'Reproducing the World Bank poverty calculations.',
    limitations:
      'Reproducibility does not eliminate legitimate disagreement over welfare aggregates and comparability.',
    publishedDate: '2026-04-30',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'mospi-hces-2023-24',
    title: 'Household Consumption Expenditure Survey 2023-24',
    publisher: 'Ministry of Statistics and Programme Implementation',
    url: 'https://www.mospi.gov.in/sites/default/files/publication_reports/Final_Report_HCES_2023-24L.pdf',
    sourceType: 'official-statistical-survey',
    reliability: 5,
    ratingReason:
      'Controlling national household-consumption survey record.',
    bestFor: 'Survey design, consumption aggregates, rural-urban estimates, and sampling.',
    limitations:
      'MoSPI does not publish a new official Indian poverty rate from the survey.',
    publishedDate: '2025-08-01',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'undp-global-mpi-2022',
    title: 'Global Multidimensional Poverty Index 2022',
    publisher: 'UNDP and Oxford Poverty and Human Development Initiative',
    url: 'https://hdr.undp.org/system/files/documents/hdp-document/2022mpireporten.pdf',
    sourceType: 'multilateral-statistical-analysis',
    reliability: 5,
    ratingReason:
      'Established independent multidimensional-poverty methodology using NFHS survey data.',
    bestFor: 'Global MPI levels and comparison with the national MPI.',
    limitations:
      'Uses different indicators from NITI national MPI and most NFHS-5 collection predates COVID-19.',
    publishedDate: '2022-10-17',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'imf-pandemic-poverty-2023',
    title: 'Pandemic, Poverty, and Food Subsidies in India',
    publisher: 'International Monetary Fund',
    url: 'https://www.imf.org/-/media/files/publications/wp/2023/english/wpiea2023147-print-pdf.pdf',
    sourceType: 'multilateral-modelled-analysis',
    reliability: 4,
    ratingReason:
      'Named research paper with disclosed assumptions on food support and pandemic poverty.',
    bestFor: 'Pandemic and food-subsidy scenario context.',
    limitations:
      'Simulation results depend on reweighting, eligibility, and leakage assumptions.',
    publishedDate: '2023-07-07',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'commerce-fta-achievements-2026',
    title: "India's Free Trade Agreements 2025-26: Key Highlights",
    publisher: 'Department of Commerce, Government of India',
    url: 'https://www.commerce.gov.in/files/2026-03/FTAs%20achievement%20v6%205%20pm.pdf',
    sourceType: 'official-trade-agreement-summary',
    reliability: 5,
    ratingReason:
      'Primary government summary of agreement status, market access, exclusions, services, and investment objectives.',
    bestFor: 'Current terms across the EU, New Zealand, Oman, UK, and US framework.',
    limitations:
      'Promotional and partly forecast-based; the treaty text controls legal obligations.',
    publishedDate: '2026-03-06',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'commerce-annual-2025-26',
    title: 'Department of Commerce Annual Report 2025-26',
    publisher: 'Department of Commerce, Government of India',
    url: 'https://www.commerce.gov.in/files/2026-04/Annual_0.pdf',
    sourceType: 'official-trade-statistics',
    reliability: 5,
    ratingReason:
      'Primary official status, tariff, bilateral trade, and export-policy record.',
    bestFor: 'Agreement chronology and official trade statistics.',
    limitations:
      'Government analysis does not isolate agreement causality or adjustment costs.',
    publishedDate: '2026-04-13',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'dfat-india-ecta',
    title: 'Australia-India Economic Cooperation and Trade Agreement',
    publisher: 'Australian Department of Foreign Affairs and Trade',
    url: 'https://www.dfat.gov.au/trade/agreements/in-force/australia-india-ecta',
    sourceType: 'partner-government-treaty-record',
    reliability: 5,
    ratingReason: 'Official partner-government treaty status, text, and tariff commitments.',
    bestFor: 'Australia ECTA legal status and market-access commitments.',
    limitations:
      'Partner-government framing and statistics do not establish net welfare for India.',
    publishedDate: '2022-12-29',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'efta-india-tepa-2025',
    title: 'EFTA-India TEPA enters into force',
    publisher: 'European Free Trade Association',
    url: 'https://www.efta.int/media-resources/news/efta-india-trade-and-economic-partnership-agreement-enters-force-joint',
    sourceType: 'treaty-entry-into-force-record',
    reliability: 5,
    ratingReason: 'Official joint record of entry into force and investment objectives.',
    bestFor: 'October 1, 2025 status and the conditional investment and jobs objective.',
    limitations:
      'The US$100 billion and one-million-job figures are objectives, not delivered outcomes.',
    publishedDate: '2025-10-01',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'uk-india-ceta-2026',
    title: 'UK-India Comprehensive Economic and Trade Agreement',
    publisher: 'Government of the United Kingdom',
    url: 'https://www.gov.uk/government/collections/uk-india-trade-deal',
    sourceType: 'treaty-collection',
    reliability: 5,
    ratingReason:
      'Official treaty collection, impact assessment, signature, and July 15, 2026 commencement record.',
    bestFor: 'Legal text, tariff staging, services, mobility, and entry into force.',
    limitations:
      'Modelled trade and GDP benefits are forecasts rather than observed results.',
    publishedDate: '2026-07-15',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'pib-india-oman-cepa-2026',
    title: 'India-Oman CEPA comes into force',
    publisher: 'Press Information Bureau, Department of Commerce',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2267513',
    sourceType: 'official-treaty-status',
    reliability: 5,
    ratingReason:
      'Primary Indian record of signature, domestic procedures, entry into force, and first preferential consignments.',
    bestFor: 'June 1, 2026 status and immediate market-access terms.',
    limitations:
      'Too new for outcome claims and presented in promotional language.',
    publishedDate: '2026-06-01',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'nz-india-fta-2026',
    title: 'New Zealand-India Free Trade Agreement',
    publisher: 'New Zealand Ministry of Foreign Affairs and Trade',
    url: 'https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-concluded-but-not-in-force/new-zealand-india-free-trade-agreement',
    sourceType: 'partner-government-treaty-record',
    reliability: 5,
    ratingReason:
      'Official signed treaty record explicitly classified as concluded but not in force.',
    bestFor: 'April 27, 2026 signature, terms, and current legal status.',
    limitations: 'No outcome can be observed before entry into force.',
    publishedDate: '2026-04-27',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'eu-india-fta-2026',
    title: 'EU-India Free Trade Agreement negotiations concluded',
    publisher: 'European Commission',
    url: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/india/eu-india-agreements_en',
    sourceType: 'official-negotiation-status',
    reliability: 5,
    ratingReason:
      'Official EU record that FTA negotiations concluded while investment-protection and GI talks remain separate.',
    bestFor: 'January 27, 2026 conclusion, trade scope, and current pre-signature status.',
    limitations:
      'The text remains subject to legal revision and approval; projected benefits are not outcomes.',
    publishedDate: '2026-01-27',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
  {
    id: 'oec-india-uae-trade',
    title: 'India-United Arab Emirates bilateral trade profile',
    publisher: 'Observatory of Economic Complexity',
    url: 'https://oec.world/en/profile/bilateral-country/ind/partner/are',
    sourceType: 'independent-trade-data',
    reliability: 4,
    ratingReason:
      'Reproducible product-level bilateral trade exploration using reported trade data.',
    bestFor: 'Trade composition and concentration context.',
    limitations:
      'Reporting periods and classifications must be aligned with official Indian fiscal-year statistics.',
    accessedDate: reviewedDate,
    linkStatus: 'checked-2026-07-24',
  },
]

const policyValues: Record<string, Array<number | null>> = {
  'national-highway-expansion-2014': [7.5, 8, 6.5, 5.5, 5.5],
  'bharatmala-phase-1-2017': [7.5, 7, 5, 5.5, 5.5],
  'pmgsy-iii-2019': [8, 7.5, 7, 8, 6.5],
  'india-uae-cepa-2022': [8, 7.5, 8, 6.5, 7.5],
  'india-australia-ecta-2022': [7.5, 6.5, 7.5, 6.5, 7],
  'india-efta-tepa-2024': [8, 5, 7, 7, 7],
  'india-uk-ceta-2025': [8, null, 7, 6.5, 7],
  'india-oman-cepa-2025': [7.5, null, 6.5, 6.5, 6.5],
  'india-new-zealand-fta-2026': [7.5, null, null, 6.5, 6.5],
  'india-eu-fta-2026': [8, null, null, 7, 7],
}

const policyRationales: Record<string, string[]> = {
  'national-highway-expansion-2014': [
    'Targeted freight, travel-time, capacity, and logistics constraints through sustained capital spending and corridor expansion.',
    'Highway capacity, expressways, and annual construction rose substantially, although declarations are not all new construction.',
    'Delivery accelerated, but land, appraisal, cost, debt, and maintenance performance remained uneven.',
    'Connectivity benefits were broad, while toll, displacement, access, and road-safety burdens were unevenly distributed.',
    'The network is durable productive capacity, offset by debt, maintenance liabilities, and persistently high fatalities.',
  ],
  'bharatmala-phase-1-2017': [
    'Used corridor planning and logistics priorities to address fragmented highway development.',
    'More than 21,000 km was completed by November 2025, but the original deadline and full length were missed.',
    'CAG found major cost, land, appraisal, procurement, and oversight weaknesses.',
    'Border, port, feeder, and economic corridors widened access, while land and toll burdens require safeguards.',
    'Completed corridors are durable, but cost escalation and unfinished scope reduce long-run value.',
  ],
  'pmgsy-iii-2019': [
    'Shifted rural-road policy toward links with markets, schools, hospitals, and consolidation of the core network.',
    'Independent evaluations associate PMGSY connectivity with mobility, non-farm work, schooling, and health access.',
    'National standards and scale are strong, while maintenance and inspection remain uneven across states.',
    'Remote and poorer communities, women, students, and patients gain directly from reliable all-weather access.',
    'Benefits endure only when states fund maintenance, climate resilience, and road safety.',
  ],
  'india-uae-cepa-2022': [
    'Targeted tariff, services, logistics, and rules-of-origin barriers with a commercially important Gulf partner.',
    'Bilateral trade and Indian exports rose after implementation, while commodity prices and recovery prevent clean causality.',
    'Rapid negotiation and customs implementation created usable preferences and a broader services framework.',
    'Labour-intensive exports gained access, but gains and import competition vary sharply by sector.',
    'The agreement is operating and strategically durable, with continuing origin and gold-trade enforcement risks.',
  ],
  'india-australia-ecta-2022': [
    'Created an interim liberalisation package while protecting highly sensitive Indian agricultural sectors.',
    'Non-coal and agricultural trade indicators improved, but minerals and energy dominate the bilateral relationship.',
    'Implementation was timely and tariff schedules are operating while deeper CECA negotiations continue.',
    'Education, services, and labour-intensive exports benefit, with adjustment concerns in selected farm and manufacturing lines.',
    'The interim agreement is durable but incomplete until broader CECA issues are resolved.',
  ],
  'india-efta-tepa-2024': [
    'Combined market access with an unusual conditional investment and employment objective.',
    'The agreement is too new for mature trade or investment outcomes.',
    'It entered into force on schedule with sensitive agriculture, dairy, and gold protections.',
    'Investment and skilled-work opportunities may broaden gains, while delivery and additionality require transparent measurement.',
    'Treaty institutions are durable, but the headline investment and jobs numbers are objectives rather than guarantees.',
  ],
  'india-uk-ceta-2025': [
    'Provides broad goods, services, mobility, and social-security access while retaining sensitive-sector exclusions.',
    'Not observed: the agreement entered into force only on July 15, 2026.',
    'Ratification, customs, origin, and social-security arrangements commenced together.',
    'Labour-intensive exports and professionals may benefit, while automobiles, alcohol, and adjustment burdens are uneven.',
    'The legal framework is broad and durable, but projected trade and GDP gains remain modelled.',
  ],
  'india-oman-cepa-2025': [
    'Targets a Gulf export and services gateway with extensive day-one access and calibrated exclusions.',
    'Not observed: the agreement entered into force on June 1, 2026.',
    'Both sides completed procedures and operationalised initial preferential consignments.',
    'MSMEs, workers, services, and selected farm exports may gain, while import and adjustment effects remain uncertain.',
    'The framework is durable but highly exposed to oil-linked trade composition and early implementation risk.',
  ],
  'india-new-zealand-fta-2026': [
    'Offers broad export access, services mobility, and investment facilitation while protecting Indian dairy.',
    'Not observed because the signed agreement is not in force.',
    'Not observed because ratification and customs implementation remain incomplete.',
    'Dairy protection and controlled horticulture access reduce concentrated adjustment risks.',
    'The signed text can be durable, but commencement and delivered investment remain uncertain.',
  ],
  'india-eu-fta-2026': [
    'Concluded a broad goods and services negotiation with India’s largest goods trading partner.',
    'Not observed because the agreement is not signed or in force.',
    'Not observed while legal revision and approval continue.',
    'Labour-intensive exports may gain, while standards, carbon-border costs, automobiles, and beverages create adjustment risks.',
    'The negotiated framework is potentially durable, but legal completion and separate investment and GI talks remain open.',
  ],
}

function policyRating(policyId: string) {
  const values = policyValues[policyId]
  const availableWeight = values.reduce<number>(
    (sum, value, index) => sum + (value === null ? 0 : weights[index]),
    0,
  )
  const weighted = values.reduce<number>(
    (sum, value, index) =>
      sum + (value === null ? 0 : value * weights[index]),
    0,
  )
  return Math.round((weighted / availableWeight) * 10) / 10
}

export const developmentPolicies: PolicySeed[] = [
  {
    id: 'national-highway-expansion-2014',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'National Highway and expressway expansion, 2014-26',
    shortTitle: 'Highway expansion',
    policyType: 'transport-infrastructure',
    introducedDate: '2014-05-26',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Expanded National Highway capacity, four-lane roads, access-controlled expressways, construction finance, tolling, and asset monetisation.',
    intendedGoal:
      'Reduce logistics and travel constraints, connect markets and regions, and build durable transport capacity.',
    ratingScore: policyRating('national-highway-expansion-2014'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A major expansion in road capacity and construction pace, reduced by classification caveats, cost and debt exposure, maintenance gaps, land burdens, and severe safety outcomes.',
    assessmentAsOf: reviewedDate,
    sourceIds: [
      'morth-year-end-2025',
      'morth-infrastructure-2026',
      'nhai-annual-2024',
      'morth-road-accidents-2023',
    ],
  },
  {
    id: 'bharatmala-phase-1-2017',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Bharatmala Pariyojana Phase I',
    shortTitle: 'Bharatmala Phase I',
    policyType: 'transport-infrastructure',
    introducedDate: '2017-10-24',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Created a corridor-based national highway programme covering economic, feeder, border, coastal, port, and expressway links plus inherited NHDP works.',
    intendedGoal:
      'Improve freight efficiency, corridor connectivity, border and port access, and network coherence.',
    ratingScore: policyRating('bharatmala-phase-1-2017'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A useful corridor strategy with substantial completed road length, weakened by missed deadlines, very large cost escalation, land and appraisal failures, and unfinished scope.',
    assessmentAsOf: reviewedDate,
    sourceIds: ['morth-year-end-2025', 'cag-bharatmala-2023', 'nhai-annual-2024'],
  },
  {
    id: 'pmgsy-iii-2019',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Pradhan Mantri Gram Sadak Yojana Phase III',
    shortTitle: 'PMGSY-III',
    policyType: 'rural-infrastructure',
    introducedDate: '2019-07-10',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Upgraded and consolidated rural through-routes linking habitations with markets, schools, hospitals, and agricultural centres.',
    intendedGoal:
      'Turn basic rural connectivity into more reliable access to opportunity and essential services.',
    ratingScore: policyRating('pmgsy-iii-2019'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strong rural-access phase with credible employment, schooling, health, and mobility benefits, constrained by state maintenance, inspection, quality, and climate-resilience gaps.',
    assessmentAsOf: reviewedDate,
    sourceIds: [
      'pmgsy-status-2026',
      'world-bank-pmgsy-impact-2021',
      'ncaer-pmgsy-2026',
      'cag-pmgsy-audit-2016',
    ],
  },
  {
    id: 'india-uae-cepa-2022',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'India-United Arab Emirates Comprehensive Economic Partnership Agreement',
    shortTitle: 'UAE CEPA',
    policyType: 'trade-agreement',
    introducedDate: '2022-02-18',
    enactedDate: '2022-02-18',
    effectiveDate: '2022-05-01',
    status: 'enacted',
    coverageStatus: 'reviewed',
    summary:
      'Reduced tariffs and expanded goods, services, customs, origin, and investment cooperation with the UAE.',
    intendedGoal: 'Expand exports, services, investment, logistics, and Gulf market integration.',
    ratingScore: policyRating('india-uae-cepa-2022'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A commercially important and competently implemented agreement with real trade expansion, offset by faster import growth, commodity concentration, and limited causal evidence on jobs and small exporters.',
    assessmentAsOf: reviewedDate,
    sourceIds: ['commerce-annual-2025-26', 'commerce-fta-achievements-2026', 'oec-india-uae-trade'],
  },
  {
    id: 'india-australia-ecta-2022',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'India-Australia Economic Cooperation and Trade Agreement',
    shortTitle: 'Australia ECTA',
    policyType: 'trade-agreement',
    introducedDate: '2022-04-02',
    enactedDate: '2022-04-02',
    effectiveDate: '2022-12-29',
    status: 'enacted',
    coverageStatus: 'reviewed',
    summary:
      'Created an interim goods, services, education, and mobility agreement while deeper CECA negotiations continued.',
    intendedGoal: 'Increase bilateral market access and create a platform for broader economic integration.',
    ratingScore: policyRating('india-australia-ecta-2022'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A useful and operating interim agreement with broader access and positive non-coal trade signals, limited by commodity dependence, deficits, standards, and unfinished deeper negotiations.',
    assessmentAsOf: reviewedDate,
    sourceIds: ['dfat-india-ecta', 'commerce-annual-2025-26', 'commerce-fta-achievements-2026'],
  },
  {
    id: 'india-efta-tepa-2024',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'India-EFTA Trade and Economic Partnership Agreement',
    shortTitle: 'EFTA TEPA',
    policyType: 'trade-agreement',
    introducedDate: '2024-03-10',
    enactedDate: '2024-03-10',
    effectiveDate: '2025-10-01',
    status: 'enacted',
    coverageStatus: 'reviewed',
    summary:
      'Combined tariff and services commitments with a conditional US$100 billion investment and one-million-job objective over fifteen years.',
    intendedGoal: 'Expand trade, investment, services, technology, and employment links with EFTA states.',
    ratingScore: policyRating('india-efta-tepa-2024'),
    ratingConfidence: 'low',
    ratingSummary:
      'An innovative and balanced design now in force, but the headline investment and jobs objective remains conditional and outcome evidence is immature.',
    assessmentAsOf: reviewedDate,
    sourceIds: ['efta-india-tepa-2025', 'commerce-annual-2025-26'],
  },
  {
    id: 'india-uk-ceta-2025',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'India-United Kingdom Comprehensive Economic and Trade Agreement',
    shortTitle: 'UK CETA',
    policyType: 'trade-agreement',
    introducedDate: '2025-07-24',
    enactedDate: '2025-07-24',
    effectiveDate: '2026-07-15',
    status: 'enacted',
    coverageStatus: 'reviewed',
    ratingBasis: 'design',
    summary:
      'Created broad goods, services, professional-mobility, origin, and reciprocal social-security commitments.',
    intendedGoal: 'Deepen market access, services trade, investment, and professional mobility with the UK.',
    ratingScore: policyRating('india-uk-ceta-2025'),
    ratingConfidence: 'low',
    ratingSummary:
      'A broad and credible agreement that entered into force nine days before review; market-access design can be judged, but projected trade and GDP benefits are not outcomes.',
    assessmentAsOf: reviewedDate,
    sourceIds: ['uk-india-ceta-2026', 'commerce-fta-achievements-2026'],
  },
  {
    id: 'india-oman-cepa-2025',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'India-Oman Comprehensive Economic Partnership Agreement',
    shortTitle: 'Oman CEPA',
    policyType: 'trade-agreement',
    introducedDate: '2025-12-18',
    enactedDate: '2025-12-18',
    effectiveDate: '2026-06-01',
    status: 'enacted',
    coverageStatus: 'reviewed',
    ratingBasis: 'design',
    summary:
      'Provided wide day-one tariff access, services commitments, worker mobility, and protected sensitive Indian sectors.',
    intendedGoal: 'Expand Gulf exports, services, investment, and worker opportunities through Oman.',
    ratingScore: policyRating('india-oman-cepa-2025'),
    ratingConfidence: 'low',
    ratingSummary:
      'A well-targeted Gulf market-access design now operating, but only weeks of evidence cannot establish export, deficit, jobs, or adjustment outcomes.',
    assessmentAsOf: reviewedDate,
    sourceIds: ['pib-india-oman-cepa-2026', 'commerce-fta-achievements-2026'],
  },
  {
    id: 'india-new-zealand-fta-2026',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'India-New Zealand Free Trade Agreement',
    shortTitle: 'New Zealand FTA',
    policyType: 'trade-agreement',
    introducedDate: '2026-04-27',
    status: 'pending',
    coverageStatus: 'reviewed',
    ratingBasis: 'design',
    summary:
      'Signed a goods, services, mobility, investment, and regulatory agreement that remains subject to domestic procedures.',
    intendedGoal: 'Expand export access, professional mobility, investment, and regulatory cooperation.',
    ratingScore: policyRating('india-new-zealand-fta-2026'),
    ratingConfidence: 'low',
    ratingSummary:
      'A promising signed design with dairy protections and broad export access, but it is not in force and has no implementation or outcome record.',
    assessmentAsOf: reviewedDate,
    sourceIds: ['nz-india-fta-2026', 'commerce-fta-achievements-2026'],
  },
  {
    id: 'india-eu-fta-2026',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'India-European Union Free Trade Agreement negotiated text',
    shortTitle: 'EU FTA',
    policyType: 'trade-agreement',
    introducedDate: '2026-01-27',
    status: 'pending',
    coverageStatus: 'reviewed',
    ratingBasis: 'design',
    summary:
      'Concluded FTA negotiations while legal revision and approval continue; investment-protection and geographical-indication talks remain separate.',
    intendedGoal: 'Deepen goods and services trade with India’s largest goods trading partner.',
    ratingScore: policyRating('india-eu-fta-2026'),
    ratingConfidence: 'low',
    ratingSummary:
      'A substantial negotiation achievement with broad potential access, but it is not signed or in force and standards, carbon-border, and adjustment costs remain material.',
    assessmentAsOf: reviewedDate,
    sourceIds: ['eu-india-fta-2026', 'commerce-fta-achievements-2026'],
  },
]

export const developmentPolicyScores: PolicyScoreSeed[] = Object.entries(
  policyValues,
).flatMap(([policyId, values]) =>
  values.map((score, index) => ({
    policyId,
    dimensionId: [
      'problem-design',
      'effectiveness',
      'implementation',
      'rights-inclusion',
      'durability-side-effects',
    ][index],
    score,
    rationale: policyRationales[policyId][index],
  })),
)

export const developmentIndicatorDefinitions: IndicatorDefinitionSeed[] = [
  {
    id: 'national-highway-length',
    name: 'National Highway network length',
    shortName: 'National Highways',
    description:
      'Total road length officially classified as National Highways, including newly declared routes.',
    plainLanguage:
      'This counts the kilometres officially in the National Highway network. Growth can come from new construction, upgrades, or reclassifying existing roads.',
    example:
      'An increase from 91,287 km to 146,572 km is 60.6% network growth, but it does not mean every added kilometre was newly built.',
    unit: 'km',
    format: 'number',
    dimensionId: 'basic-systems',
    dimensionWeight: 0,
    direction: 'higher',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 200000,
    sourceId: 'morth-infrastructure-2026',
    frequency: 'annual',
    stateReady: false,
  },
  {
    id: 'extreme-poverty-3-2021-ppp',
    name: 'Extreme poverty at US$3/day, 2021 PPP',
    shortName: 'Extreme poverty',
    description:
      'World Bank estimate of the share below US$3 per person per day in 2021 purchasing-power-parity terms.',
    plainLanguage:
      'This compares household consumption with an international poverty threshold adjusted for what money buys in India, not the market dollar exchange rate.',
    example:
      'A value of 2.6% means about 3 of every 100 people are estimated below the US$3 international line.',
    unit: '% population',
    format: 'percent',
    dimensionId: 'inclusion',
    dimensionWeight: 0,
    direction: 'lower',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 60,
    sourceId: 'world-bank-poverty-trend-2026',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'lmic-poverty-4-20-2021-ppp',
    name: 'Lower-middle-income poverty at US$4.20/day, 2021 PPP',
    shortName: 'LMIC poverty',
    description:
      'World Bank estimate using the international poverty line applied to lower-middle-income countries.',
    plainLanguage:
      'This is a higher and more demanding poverty threshold than the extreme-poverty line and therefore counts many more people.',
    example:
      'A value of 16.1% means about 16 of every 100 people are estimated below the US$4.20 line.',
    unit: '% population',
    format: 'percent',
    dimensionId: 'inclusion',
    dimensionWeight: 0,
    direction: 'lower',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 80,
    sourceId: 'world-bank-poverty-trend-2026',
    frequency: 'survey',
    stateReady: true,
  },
]

export const developmentIndicatorObservations: IndicatorObservationSeed[] = [
  {
    indicatorId: 'national-highway-length',
    jurisdictionId: 'india',
    period: 2014,
    value: 91287,
    status: 'observed',
    sourceId: 'morth-year-end-2025',
    note: 'Official network length; declarations can include reclassified existing roads.',
  },
  {
    indicatorId: 'national-highway-length',
    jurisdictionId: 'india',
    period: 2025,
    value: 146560,
    status: 'observed',
    sourceId: 'morth-year-end-2025',
    note: 'December 2025 official network length.',
  },
  {
    indicatorId: 'national-highway-length',
    jurisdictionId: 'india',
    period: 2026,
    value: 146572,
    status: 'observed',
    sourceId: 'morth-infrastructure-2026',
    note: 'March 2026 official network length.',
  },
  {
    indicatorId: 'extreme-poverty-3-2021-ppp',
    jurisdictionId: 'india',
    period: 2011,
    value: 27.1,
    status: 'estimated',
    sourceId: 'world-bank-poverty-trend-2026',
    note: 'World Bank harmonized estimate from the 2011-12 consumption survey.',
  },
  {
    indicatorId: 'extreme-poverty-3-2021-ppp',
    jurisdictionId: 'india',
    period: 2022,
    value: 5.3,
    status: 'estimated',
    sourceId: 'world-bank-poverty-trend-2026',
    note: 'World Bank harmonized estimate from HCES 2022-23.',
  },
  {
    indicatorId: 'extreme-poverty-3-2021-ppp',
    jurisdictionId: 'india',
    period: 2023,
    value: 2.6,
    status: 'estimated',
    sourceId: 'world-bank-poverty-trend-2026',
    note: 'World Bank harmonized estimate from HCES 2023-24; reporting improvements may affect the one-year change.',
  },
  {
    indicatorId: 'lmic-poverty-4-20-2021-ppp',
    jurisdictionId: 'india',
    period: 2011,
    value: 57.7,
    status: 'estimated',
    sourceId: 'world-bank-poverty-trend-2026',
    note: 'World Bank harmonized estimate from the 2011-12 consumption survey.',
  },
  {
    indicatorId: 'lmic-poverty-4-20-2021-ppp',
    jurisdictionId: 'india',
    period: 2022,
    value: 23.9,
    status: 'estimated',
    sourceId: 'world-bank-poverty-trend-2026',
    note: 'World Bank harmonized estimate from HCES 2022-23.',
  },
  {
    indicatorId: 'lmic-poverty-4-20-2021-ppp',
    jurisdictionId: 'india',
    period: 2023,
    value: 16.1,
    status: 'estimated',
    sourceId: 'world-bank-poverty-trend-2026',
    note: 'World Bank harmonized estimate from HCES 2023-24; reporting improvements may affect the one-year change.',
  },
]

export const developmentEvents: EventSeed[] = [
  {
    id: 'bharatmala-approved-2017',
    jurisdictionId: 'india',
    date: '2017-10-24',
    title: 'Bharatmala Phase I approved',
    summary:
      'The Union approved a corridor-based highway programme covering economic, feeder, border, coastal, port, expressway, and inherited NHDP works.',
    significance:
      'Made highways and logistics a central Modi-era capital programme, later producing substantial capacity alongside major cost and delivery problems.',
    category: 'infrastructure',
    confidence: 'high',
    sourceIds: ['morth-year-end-2025', 'cag-bharatmala-2023'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'pmgsy-iii-launched-2019',
    jurisdictionId: 'india',
    date: '2019-07-10',
    title: 'PMGSY-III shifts rural roads toward services and markets',
    summary:
      'The third PMGSY phase prioritised consolidation of rural routes connecting habitations with markets, schools, hospitals, and agricultural centres.',
    significance:
      'Moved the inherited rural-road programme from first connection toward the quality and usefulness of the core network.',
    category: 'infrastructure',
    confidence: 'high',
    sourceIds: ['pmgsy-status-2026', 'world-bank-pmgsy-impact-2021', 'ncaer-pmgsy-2026'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'national-highway-milestone-2026',
    jurisdictionId: 'india',
    date: '2026-03-01',
    endDate: '2026-03-31',
    title: 'National Highway network reaches 146,572 km',
    summary:
      'Official records put the network 60.6% above its 2014 length, with four-lane capacity and operational expressways also rising sharply.',
    significance:
      'A major infrastructure outcome, while declarations, inherited projects, maintenance, safety, and cost determine how much network growth translates into welfare.',
    category: 'infrastructure',
    confidence: 'high',
    sourceIds: ['morth-year-end-2025', 'morth-infrastructure-2026', 'morth-road-accidents-2023'],
    leaderTermIds: ['modi-2014'],
    indicatorIds: ['national-highway-length'],
  },
  {
    id: 'national-mpi-decline-2023',
    jurisdictionId: 'india',
    date: '2023-07-30',
    title: 'National MPI reports a large fall in multidimensional poverty',
    summary:
      'NITI reported the observed national MPI headcount falling from 24.85% in 2015-16 to 14.96% in 2019-21, with a later 2022-23 value explicitly estimated.',
    significance:
      'Shows broad gains in health, education, and living standards while preserving the distinction between observed survey rounds and modelled extensions.',
    category: 'human-development',
    confidence: 'high',
    sourceIds: ['niti-mpi-2023', 'undp-global-mpi-2022', 'world-bank-poverty-trend-2026'],
    leaderTermIds: ['modi-2014'],
    indicatorIds: ['multidimensional-poverty'],
  },
  {
    id: 'world-bank-poverty-update-2026',
    jurisdictionId: 'india',
    date: '2026-04-01',
    endDate: '2026-04-30',
    title: 'World Bank publishes India poverty estimates through 2023-24',
    summary:
      'Harmonized estimates put extreme poverty at 2.6% and lower-middle-income poverty at 16.1%, down from 27.1% and 57.7% in 2011-12.',
    significance:
      'Confirms a large long-run decline while warning that survey redesign and improved reporting complicate the final-year comparison and PM attribution.',
    category: 'human-development',
    confidence: 'medium',
    sourceIds: ['world-bank-poverty-trend-2026', 'world-bank-poverty-repro-2026', 'mospi-hces-2023-24'],
    leaderTermIds: ['modi-2014'],
    indicatorIds: [
      'extreme-poverty-3-2021-ppp',
      'lmic-poverty-4-20-2021-ppp',
    ],
  },
  {
    id: 'india-uae-cepa-effective-2022',
    jurisdictionId: 'india',
    date: '2022-05-01',
    title: 'India-UAE CEPA enters into force',
    summary:
      'Tariff, services, customs, origin, investment, and trade-facilitation commitments began operating with a major Gulf partner.',
    significance:
      'Became the first major agreement in a faster Modi-era trade-negotiation strategy and has enough operating history for partial outcome review.',
    category: 'trade',
    confidence: 'high',
    sourceIds: ['commerce-annual-2025-26', 'commerce-fta-achievements-2026', 'oec-india-uae-trade'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'india-australia-ecta-effective-2022',
    jurisdictionId: 'india',
    date: '2022-12-29',
    title: 'India-Australia ECTA enters into force',
    summary:
      'The interim agreement began tariff, services, education, and mobility liberalisation while deeper CECA negotiations continued.',
    significance:
      'Expanded access to a developed Indo-Pacific partner without pretending the interim agreement resolved every agricultural, standards, or commodity issue.',
    category: 'trade',
    confidence: 'high',
    sourceIds: ['dfat-india-ecta', 'commerce-annual-2025-26'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'india-efta-tepa-effective-2025',
    jurisdictionId: 'india',
    date: '2025-10-01',
    title: 'India-EFTA TEPA enters into force',
    summary:
      'The trade agreement began operating with a conditional US$100 billion investment and one-million-job objective over fifteen years.',
    significance:
      'Introduced a distinctive investment-linked treaty design whose headline objectives still require measured delivery.',
    category: 'trade',
    confidence: 'high',
    sourceIds: ['efta-india-tepa-2025', 'commerce-annual-2025-26'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'india-eu-fta-concluded-2026',
    jurisdictionId: 'india',
    date: '2026-01-27',
    title: 'India and the EU conclude FTA negotiations',
    summary:
      'The parties concluded the free-trade negotiation while legal revision and approval continued and separate investment-protection and GI talks remained open.',
    significance:
      'A major negotiation achievement with India’s largest goods trading partner, but not yet a signed or operative agreement.',
    category: 'trade',
    confidence: 'high',
    sourceIds: ['eu-india-fta-2026', 'commerce-fta-achievements-2026'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'india-new-zealand-fta-signed-2026',
    jurisdictionId: 'india',
    date: '2026-04-27',
    title: 'India-New Zealand FTA signed',
    summary:
      'The parties signed a goods, services, mobility, investment, and regulatory agreement that remains outside force pending domestic procedures.',
    significance:
      'Adds a new developed-market agreement while making clear that projected export and investment benefits are not yet outcomes.',
    category: 'trade',
    confidence: 'high',
    sourceIds: ['nz-india-fta-2026', 'commerce-fta-achievements-2026'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'india-oman-cepa-effective-2026',
    jurisdictionId: 'india',
    date: '2026-06-01',
    title: 'India-Oman CEPA enters into force',
    summary:
      'Wide tariff, services, worker-mobility, and regulatory commitments began operating after both countries completed domestic procedures.',
    significance:
      'Opened another Gulf gateway while remaining too new for credible export, employment, deficit, or adjustment conclusions.',
    category: 'trade',
    confidence: 'high',
    sourceIds: ['pib-india-oman-cepa-2026', 'commerce-fta-achievements-2026'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'india-uk-ceta-effective-2026',
    jurisdictionId: 'india',
    date: '2026-07-15',
    title: 'India-UK CETA enters into force',
    summary:
      'Broad goods, services, professional-mobility, origin, and reciprocal social-security commitments became legally operative.',
    significance:
      'A major market-access agreement whose modelled benefits must remain separate from the first days of observed implementation.',
    category: 'trade',
    confidence: 'high',
    sourceIds: ['uk-india-ceta-2026', 'commerce-fta-achievements-2026'],
    leaderTermIds: ['modi-2014'],
  },
]

type Responsibility = EventAssessmentSeed['responsibilities'][number]

const responsibility = (
  actorName: string,
  actorType: Responsibility['actorType'],
  responsibilityKind: Responsibility['responsibilityKind'],
  level: Responsibility['level'],
  assessment: string,
  confidence: Responsibility['confidence'] = 'medium',
): Responsibility => ({
  actorName,
  actorType,
  responsibilityKind,
  level,
  assessment,
  confidence,
})

export const developmentEventAssessments: EventAssessmentSeed[] =
  developmentEvents.map((event) => {
    const policyEvent = event.id.includes('effective') || event.id.includes('approved') || event.id.includes('launched') || event.id.includes('signed') || event.id.includes('concluded')
    const isMeasuredOutcome =
      event.id === 'national-highway-milestone-2026' ||
      event.id === 'national-mpi-decline-2023' ||
      event.id === 'world-bank-poverty-update-2026'
    const policyScoreByEvent: Record<string, number> = {
      'bharatmala-approved-2017': 6.3,
      'pmgsy-iii-launched-2019': 7.4,
      'india-uae-cepa-effective-2022': 7.6,
      'india-australia-ecta-effective-2022': 7,
      'india-efta-tepa-effective-2025': 6.6,
      'india-eu-fta-concluded-2026': 7.4,
      'india-new-zealand-fta-signed-2026': 6.9,
      'india-oman-cepa-effective-2026': 6.8,
      'india-uk-ceta-effective-2026': 7.2,
    }
    const isRoad = event.category === 'infrastructure'
    const isTrade = event.category === 'trade'
    return {
      eventId: event.id,
      choiceAssessment: isMeasuredOutcome
        ? 'not-a-policy-choice'
        : policyEvent
          ? 'mostly-right'
          : 'mixed',
      choiceScore: isMeasuredOutcome ? undefined : policyScoreByEvent[event.id],
      choiceReason: isMeasuredOutcome
        ? 'This is a measured national outcome, not a single government decision; attribution must remain shared and method-aware.'
        : isRoad
          ? 'The programme addressed real connectivity constraints and produced material access gains, while cost, land, maintenance, completion, and safety failures reduce the judgment.'
          : 'The agreement expands market access with meaningful safeguards, while trade composition, adjustment costs, and immature outcomes prevent a simple success verdict.',
      unionRole: isRoad
        ? 'The Modi government, MoRTH, NHAI, and Rural Development controlled programme design, national funding, standards, and central execution.'
        : isTrade
          ? 'The Modi government and Commerce Ministry led negotiation, signature, ratification, and national implementation.'
          : 'The Union funded and coordinated major growth, welfare, and basic-service programmes but did not solely cause the measured change.',
      stateLocalRole: isRoad
        ? 'States controlled land, local clearances, feeder integration, policing, and much rural-road maintenance.'
        : isTrade
          ? 'States have limited treaty authority but carry adjustment, skilling, logistics, and exporter-support responsibilities.'
          : 'States and local governments delivered electricity, sanitation, food, health, education, water, and other services used in poverty measures.',
      positiveOutcomes: isRoad
        ? 'Capacity, travel access, market links, service access, and rural mobility expanded.'
        : isTrade
          ? 'Negotiated access, rules, services, mobility, and investment frameworks broadened India’s commercial options.'
          : 'Large declines were recorded across monetary poverty, multidimensional deprivation, and several basic-service deficits.',
      lessons: isRoad
        ? 'Count capacity and access, but also publish declarations, cost per kilometre, maintenance, safety, debt, displacement, and inherited work.'
        : isTrade
          ? 'Separate signature, entry into force, preference use, trade composition, delivered investment, adjustment costs, and observed outcomes.'
          : 'Publish each poverty definition and survey status separately and label change during a term without claiming sole PM causation.',
      confidence: event.confidence,
      assessmentAsOf: reviewedDate,
      responsibilities: [
        responsibility(
          isTrade
            ? 'Modi government and Commerce Ministry'
            : isRoad
              ? 'Modi government and Union infrastructure agencies'
              : 'Union government',
          'union-government',
          isMeasuredOutcome ? 'shared-context' : 'policy-decision',
          isMeasuredOutcome ? 4 : 5,
          isMeasuredOutcome
            ? 'Contributed policy, finance, and coordination to the measured outcome.'
            : 'Made the central programme or agreement decision.',
          'high',
        ),
        responsibility(
          isTrade ? 'Partner governments and treaty institutions' : 'State governments and local administrations',
          isTrade ? 'foreign-state' : 'state-government',
          'implementation',
          4,
          isTrade
            ? 'Share implementation, customs, regulation, and market-access responsibilities.'
            : isRoad
              ? 'Delivered land, local systems, construction support, policing, and maintenance.'
              : 'Delivered electricity, sanitation, food, health, education, water, and other services reflected in poverty measures.',
        ),
        responsibility(
          isTrade ? 'Businesses, workers, and consumers' : isRoad ? 'NHAI, contractors, and programme agencies' : 'Long-run growth, prior programmes, and households',
          isTrade ? 'corporate' : isRoad ? 'institution' : 'structural',
          isMeasuredOutcome ? 'shared-context' : 'implementation',
          3,
          isTrade
            ? 'Determine preference use, investment, adjustment, and realised trade outcomes.'
            : isRoad
              ? 'Determine project quality, cost control, safety, and operating performance.'
              : 'Also shape poverty and service outcomes outside direct Union control.',
        ),
      ],
    }
  })

export const developmentClaims: ClaimSeed[] = [
  {
    id: 'modi-road-expansion',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'national-highway-milestone-2026',
    policyId: 'national-highway-expansion-2014',
    title: 'Highway capacity and construction expanded sharply',
    body:
      'The National Highway network grew from 91,287 km in 2014 to 146,572 km by March 2026; four-lane capacity and expressways grew faster, and annual construction more than doubled from the 2014-15 pace.',
    stance: 'achievement',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['morth-year-end-2025', 'morth-infrastructure-2026'],
  },
  {
    id: 'highway-network-classification-caveat',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'national-highway-milestone-2026',
    policyId: 'national-highway-expansion-2014',
    title: 'Network growth is not all net-new construction',
    body:
      'National Highway totals include newly declared and reclassified roads, while construction statistics count completed project length; neither measure alone proves quality or net-new route creation.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['morth-year-end-2025', 'morth-infrastructure-2026'],
  },
  {
    id: 'highway-safety-debt-maintenance',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'national-highway-expansion-2014',
    title: 'Safety, debt, land, and maintenance reduce the road verdict',
    body:
      'NHAI debt remained large, and official audits document maintenance and project-control gaps. Road deaths rose to 172,890 in 2023, with National Highways accounting for 63,112.',
    stance: 'concern',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['nhai-annual-2024', 'morth-road-accidents-2023', 'cag-bharatmala-2023'],
  },
  {
    id: 'bharatmala-corridor-delivery',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'bharatmala-approved-2017',
    policyId: 'bharatmala-phase-1-2017',
    title: 'Bharatmala delivered substantial corridor length',
    body:
      'By November 2025, 21,597 km of the 26,425 km awarded Bharatmala and subsumed NHDP length had been completed.',
    stance: 'achievement',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['morth-year-end-2025'],
  },
  {
    id: 'bharatmala-cost-and-delay',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'bharatmala-approved-2017',
    policyId: 'bharatmala-phase-1-2017',
    title: 'Cost and implementation control were weak',
    body:
      'CAG found very large sanctioned cost increases, projects awarded without sufficient land, weak DPRs, consultant delays, and incomplete safety oversight.',
    stance: 'concern',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['cag-bharatmala-2023'],
  },
  {
    id: 'bharatmala-inherited-work',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'bharatmala-phase-1-2017',
    title: 'The programme includes inherited NHDP work',
    body:
      'Bharatmala subsumed unfinished National Highways Development Project work, so completed length cannot be assigned wholly to one government.',
    stance: 'context',
    category: 'attribution',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['morth-year-end-2025', 'cag-bharatmala-2023'],
  },
  {
    id: 'pmgsy-iii-access-benefits',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'pmgsy-iii-launched-2019',
    policyId: 'pmgsy-iii-2019',
    title: 'Rural roads improved access to work and services',
    body:
      'Independent evaluations associate completed PMGSY roads with lower travel costs, non-farm work, schooling, healthcare access, women’s mobility, and lower deprivation in connected habitations.',
    stance: 'achievement',
    category: 'rural-infrastructure',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['world-bank-pmgsy-impact-2021', 'ncaer-pmgsy-2026'],
  },
  {
    id: 'pmgsy-iii-maintenance-gap',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'pmgsy-iii-2019',
    title: 'Maintenance and inspection remain weak links',
    body:
      'Benefits decline when states do not inspect, repair, and climate-proof roads; NCAER found many local stakeholders reported no regular engineering inspections.',
    stance: 'concern',
    category: 'rural-infrastructure',
    confidence: 'medium',
    asOfDate: reviewedDate,
    sourceIds: ['ncaer-pmgsy-2026', 'cag-pmgsy-audit-2016'],
  },
  {
    id: 'pmgsy-shared-credit',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'pmgsy-iii-2019',
    title: 'PMGSY is an inherited, shared programme',
    body:
      'PMGSY began under Vajpayee, Phase II under Manmohan Singh, and later phases under Modi; state governments and local agencies carry much delivery and maintenance responsibility.',
    stance: 'context',
    category: 'attribution',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['pmgsy-official', 'pmgsy-status-2026'],
  },
  {
    id: 'modi-monetary-poverty-decline',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'world-bank-poverty-update-2026',
    title: 'Monetary poverty fell substantially over the long run',
    body:
      'World Bank harmonized estimates put extreme poverty at 2.6% and lower-middle-income poverty at 16.1% in 2023-24, down from 27.1% and 57.7% in 2011-12.',
    stance: 'achievement',
    category: 'human-development',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['world-bank-poverty-trend-2026', 'mospi-hces-2023-24'],
  },
  {
    id: 'poverty-methodology-caveat',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'world-bank-poverty-update-2026',
    title: 'Survey and poverty definitions changed',
    body:
      'The US$3 and US$4.20 lines use 2021 PPP, not the market exchange rate. New HCES design and reporting improve measurement but complicate comparison with 2011-12 and may partly explain the final-year drop.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['world-bank-poverty-trend-2026', 'world-bank-poverty-repro-2026', 'mospi-hces-2023-24'],
  },
  {
    id: 'poverty-pandemic-regional-gaps',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'national-mpi-decline-2023',
    title: 'The path was uneven across the pandemic, states, and households',
    body:
      'Food support mitigated pandemic poverty, but lockdown harm, nutrition, job quality, rural-urban gaps, and poorer-state deprivation prevent a simple victory claim.',
    stance: 'concern',
    category: 'inclusion',
    confidence: 'medium',
    asOfDate: reviewedDate,
    sourceIds: ['imf-pandemic-poverty-2023', 'world-bank-poverty-trend-2026', 'niti-mpi-2023'],
  },
  {
    id: 'modi-trade-agreement-strategy',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'A faster trade-agreement strategy broadened market access',
    body:
      'UAE, Australia, EFTA, UK, Oman, New Zealand, and EU negotiations created a materially larger network of tariff, services, mobility, and investment commitments.',
    stance: 'achievement',
    category: 'trade',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['commerce-fta-achievements-2026', 'commerce-annual-2025-26'],
  },
  {
    id: 'uae-cepa-trade-expansion',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'india-uae-cepa-effective-2022',
    policyId: 'india-uae-cepa-2022',
    title: 'Trade and Indian exports expanded after CEPA',
    body:
      'Official data show bilateral merchandise trade and Indian exports rising after implementation, alongside broader tariff and services access.',
    stance: 'achievement',
    category: 'trade-agreement',
    confidence: 'medium',
    asOfDate: reviewedDate,
    sourceIds: ['commerce-annual-2025-26', 'oec-india-uae-trade'],
  },
  {
    id: 'uae-cepa-import-composition',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'india-uae-cepa-2022',
    title: 'Imports and the bilateral deficit also grew',
    body:
      'Imports rose faster than exports, while oil, gold, commodity prices, re-exports, and post-pandemic recovery prevent treating the trade increase as a clean CEPA effect.',
    stance: 'concern',
    category: 'trade-agreement',
    confidence: 'medium',
    asOfDate: reviewedDate,
    sourceIds: ['commerce-annual-2025-26', 'oec-india-uae-trade'],
  },
  {
    id: 'australia-ecta-market-access',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'india-australia-ecta-effective-2022',
    policyId: 'india-australia-ecta-2022',
    title: 'ECTA widened goods, services, education, and mobility access',
    body:
      'Tariff preferences are operating and selected non-coal, agricultural, and Indian export categories grew after implementation.',
    stance: 'achievement',
    category: 'trade-agreement',
    confidence: 'medium',
    asOfDate: reviewedDate,
    sourceIds: ['dfat-india-ecta', 'commerce-annual-2025-26'],
  },
  {
    id: 'australia-ecta-commodity-risk',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'india-australia-ecta-2022',
    title: 'Commodity dependence and deeper negotiations remain',
    body:
      'Coal, minerals, energy prices, standards, and the continuing bilateral deficit shape outcomes, while the broader CECA is still under negotiation.',
    stance: 'concern',
    category: 'trade-agreement',
    confidence: 'medium',
    asOfDate: reviewedDate,
    sourceIds: ['dfat-india-ecta', 'commerce-annual-2025-26'],
  },
  {
    id: 'efta-tepa-investment-design',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'india-efta-tepa-effective-2025',
    policyId: 'india-efta-tepa-2024',
    title: 'TEPA links access with investment and employment objectives',
    body:
      'The treaty’s conditional US$100 billion investment and one-million-job objective is an important design innovation.',
    stance: 'achievement',
    category: 'trade-agreement',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['efta-india-tepa-2025'],
  },
  {
    id: 'efta-tepa-target-not-outcome',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'india-efta-tepa-2024',
    title: 'The headline investment and jobs figures are not delivered results',
    body:
      'The objectives are conditional, measured over fifteen years, and too new for effectiveness claims.',
    stance: 'context',
    category: 'evidence-gap',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['efta-india-tepa-2025'],
  },
  {
    id: 'uk-ceta-market-access',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'india-uk-ceta-effective-2026',
    policyId: 'india-uk-ceta-2025',
    title: 'UK CETA creates broad goods and services access',
    body:
      'The agreement covers extensive tariff reductions, 137 services subsectors, professional mobility, origin rules, and reciprocal social-security treatment.',
    stance: 'achievement',
    category: 'trade-agreement',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['uk-india-ceta-2026', 'commerce-fta-achievements-2026'],
  },
  {
    id: 'uk-ceta-outcomes-too-new',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'india-uk-ceta-2025',
    title: 'Nine days of operation cannot prove projected benefits',
    body:
      'Forecast trade and GDP gains are modelled; preference use, investment, jobs, prices, and adjustment costs remain unobserved.',
    stance: 'context',
    category: 'evidence-gap',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['uk-india-ceta-2026'],
  },
  {
    id: 'oman-cepa-market-access',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'india-oman-cepa-effective-2026',
    policyId: 'india-oman-cepa-2025',
    title: 'Oman CEPA opens wide day-one export and services access',
    body:
      'Oman provides zero-duty access covering 98.08% of tariff lines and 99.38% of prior Indian export value, alongside services and worker-mobility commitments.',
    stance: 'achievement',
    category: 'trade-agreement',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['pib-india-oman-cepa-2026', 'commerce-fta-achievements-2026'],
  },
  {
    id: 'oman-cepa-outcomes-too-new',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'india-oman-cepa-2025',
    title: 'Oil-linked trade and a few weeks of data prevent an outcome verdict',
    body:
      'The pre-agreement deficit and import mix are heavily shaped by energy; export, worker, investment, and adjustment effects are not mature.',
    stance: 'context',
    category: 'evidence-gap',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['pib-india-oman-cepa-2026', 'commerce-annual-2025-26'],
  },
  {
    id: 'nz-fta-design-access',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'india-new-zealand-fta-signed-2026',
    policyId: 'india-new-zealand-fta-2026',
    title: 'The signed design protects dairy while widening export and mobility access',
    body:
      'New Zealand promises zero duty on Indian exports at commencement, while India protects dairy and uses controlled access for sensitive horticulture.',
    stance: 'achievement',
    category: 'trade-agreement',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['nz-india-fta-2026', 'commerce-fta-achievements-2026'],
  },
  {
    id: 'nz-fta-not-in-force',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'india-new-zealand-fta-2026',
    title: 'The agreement is signed but not in force',
    body:
      'Ratification and customs implementation remain incomplete, so all trade, investment, and mobility benefits are forecasts.',
    stance: 'context',
    category: 'evidence-gap',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['nz-india-fta-2026'],
  },
  {
    id: 'eu-fta-negotiation-conclusion',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'india-eu-fta-concluded-2026',
    policyId: 'india-eu-fta-2026',
    title: 'Concluding the EU negotiation is a major market-access achievement',
    body:
      'The negotiated FTA covers broad goods and services access with India’s largest goods trading partner.',
    stance: 'achievement',
    category: 'trade-agreement',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['eu-india-fta-2026', 'commerce-fta-achievements-2026'],
  },
  {
    id: 'eu-fta-not-signed',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'india-eu-fta-2026',
    title: 'The FTA is not signed or in force',
    body:
      'Legal revision and approval continue, while standards, SPS compliance, carbon-border costs, and import adjustment remain material risks.',
    stance: 'context',
    category: 'evidence-gap',
    confidence: 'high',
    asOfDate: reviewedDate,
    sourceIds: ['eu-india-fta-2026'],
  },
]
