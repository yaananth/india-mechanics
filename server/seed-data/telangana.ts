import type {
  BudgetAllocationSeed,
  BudgetPointSeed,
  BudgetScoreSeed,
  BudgetSeed,
  ClaimSeed,
  CuratedAnswerSeed,
  EventAssessmentSeed,
  EventSeed,
  IndicatorDefinitionSeed,
  IndicatorObservationSeed,
  JurisdictionSeed,
  LeaderScoreSeed,
  LeaderTermSeed,
  OfficeSeed,
  PartySeed,
  PersonSeed,
  PolicyScoreSeed,
  PolicySeed,
  SourceSeed,
} from '../types.ts'

const reviewedAt = '2026-08-04'

export const telanganaSources: SourceSeed[] = [
  {
    id: 'ts-reorganisation-act-2014',
    title: 'Andhra Pradesh Reorganisation Act, 2014',
    publisher: 'India Code, Government of India',
    url: 'https://upload.indiacode.nic.in/view-casepdf?id=AC_CEN_5_5_00058_201406_1517807327989&type=act',
    sourceType: 'primary-law',
    reliability: 5,
    ratingReason:
      'Authoritative statute creating Telangana and defining the appointed day, territory, institutions, assets, and liabilities.',
    bestFor:
      'The June 2, 2014 state boundary and the legal break from undivided Andhra Pradesh.',
    limitations:
      'The Act does not establish that later bifurcation commitments or state policies were implemented successfully.',
    publishedDate: '2014-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-state-profile',
    title: 'Telangana State Profile',
    publisher: 'Government of Telangana',
    url: 'https://www.telangana.gov.in/about/state-profile/',
    sourceType: 'official-state-profile',
    reliability: 5,
    ratingReason:
      'Current official state profile recording formation, geography, population baseline, and administrative identity.',
    bestFor: 'Current state identity and the June 2, 2014 formation date.',
    limitations:
      'A current profile is not a historical boundary concordance and is not independent performance evidence.',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-assembly-history',
    title: 'Telangana Legislative Assembly',
    publisher: 'Telangana Legislature',
    url: 'https://legislature.telangana.gov.in/assembly',
    sourceType: 'official-legislature-record',
    reliability: 5,
    ratingReason:
      'Official legislature record for the state Assembly and its institutional chronology.',
    bestFor: 'Assembly formation and institutional continuity.',
    limitations:
      'It is not a substitute for constituency-level Election Commission results.',
    accessedDate: reviewedAt,
  },
  {
    id: 'eci-telangana-statistical-reports',
    title: 'Election Commission Statistical Reports',
    publisher: 'Election Commission of India',
    url: 'https://www.eci.gov.in/statistical-reports',
    sourceType: 'official-election-results',
    reliability: 5,
    ratingReason:
      'Controlling source for Assembly results, turnout, party votes, and successful candidates.',
    bestFor: 'The 2014, 2018, and 2023 Telangana Assembly elections.',
    limitations:
      'Results establish votes and seats, not a comprehensive policy mandate or performance verdict.',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-seo-2023',
    title: 'Telangana Socio Economic Outlook 2023',
    publisher: 'Directorate of Economics and Statistics, Telangana',
    url: 'https://des.telangana.gov.in/publications/Telangana-Socio-Economic-Outlook-2023.pdf',
    sourceType: 'official-statistical-compendium',
    reliability: 4,
    ratingReason:
      'Detailed state statistical synthesis with source-labelled economic, agriculture, irrigation, power, labour, and programme series.',
    bestFor:
      'Comparable state observations through the report period and programme chronology.',
    limitations:
      'Advance estimates can be revised and government achievement framing requires independent outcome checks.',
    publishedDate: '2023-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-seo-2024',
    title: 'Telangana Socio Economic Outlook 2024',
    publisher: 'Directorate of Economics and Statistics, Telangana',
    url: 'https://www.des.telangana.gov.in/publications/Socio%20Economic%20Outlook-2024.pdf',
    sourceType: 'official-statistical-compendium',
    reliability: 4,
    ratingReason:
      'Later official state compendium with updated economy, services, welfare, and infrastructure context.',
    bestFor: 'Updated state series and transition-period context.',
    limitations:
      'Estimate vintages and department-reported outputs need table-level verification and independent interpretation.',
    publishedDate: '2024-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'nfhs5-telangana',
    title: 'NFHS-5 State Fact Sheet: Telangana',
    publisher:
      'Ministry of Health and Family Welfare and International Institute for Population Sciences',
    url: 'https://dhsprogram.com/pubs/pdf/OF43/OF43.TG.pdf',
    sourceType: 'official-household-survey',
    reliability: 5,
    ratingReason:
      'Primary state survey factsheet with directly comparable NFHS-4 and NFHS-5 household, health, nutrition, and mortality estimates.',
    bestFor:
      'Observed 2015-16 and 2019-20 Telangana household and human-development comparisons.',
    limitations:
      'Survey estimates are not annual, fieldwork predates later policies, and sampling or definition differences must be preserved.',
    accessedDate: reviewedAt,
  },
  {
    id: 'niti-ts-macro-fiscal-2025',
    title: 'Macro and Fiscal Landscape of the State of Telangana',
    publisher: 'NITI Aayog',
    url: 'https://www.niti.gov.in/sites/default/files/2025-03/Macro-and-Fiscal-Landscape-of-the-State-of-Telangana.pdf',
    sourceType: 'official-analysis',
    reliability: 4,
    ratingReason:
      'Named synthesis using MoSPI, RBI, PLFS, SRS, NFHS, Census, CAG, and state-finance sources.',
    bestFor:
      'Cross-checking growth, labour, health, poverty, education, and fiscal context.',
    limitations:
      'A synthesis rather than the controlling record for every underlying indicator; definition and estimate vintages differ.',
    publishedDate: '2025-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-finance-budget-portal',
    title: 'Telangana Budget Volumes',
    publisher: 'Finance Department, Government of Telangana',
    url: 'https://finance.telangana.gov.in/budget-volumes.jsp',
    sourceType: 'official-budget-register',
    reliability: 5,
    ratingReason:
      'Primary portal for annual budget speeches, financial statements, demands, and fiscal-policy documents.',
    bestFor: 'Discovery and verification of Telangana budget books.',
    limitations:
      'Budget estimates are proposals; the portal alone does not establish actual expenditure or outcomes.',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-budget-2014-15',
    title: 'Telangana Budget Speech 2014-15',
    publisher: 'Finance Department, Government of Telangana',
    url: 'https://finance.telangana.gov.in/PreviewPage.do?fileName=2014-15-English-Speech.pdf&filePath=donwloads-FM-Budget-Speech-2014-15',
    sourceType: 'official-budget-speech',
    reliability: 5,
    ratingReason:
      'Primary founding-state budget speech with the ten-month total, Plan, Non-Plan, and fiscal-balance estimates.',
    bestFor:
      'The 2014-15 proposal and its period-specific accounting labels.',
    limitations:
      'Plan and Non-Plan categories must not be silently translated into modern revenue and capital classifications.',
    publishedDate: '2014-11-05',
    accessedDate: reviewedAt,
  },
  {
    id: 'prs-ts-budget-2018-19',
    title: 'Telangana Budget Analysis 2018-19',
    publisher: 'PRS Legislative Research',
    url: 'https://prsindia.org/budgets/states/telangana-budget-analysis-2018-19',
    sourceType: 'independent-budget-analysis',
    reliability: 4,
    ratingReason:
      'Named analysis extracting the official total, revenue, capital, receipts, borrowing, and debt-service estimates.',
    bestFor:
      'Comparable 2018-19 budget totals and fiscal context.',
    limitations:
      'The analysis describes budget estimates and cannot establish actual expenditure or policy impact.',
    publishedDate: '2018-03-16',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-budget-2024-25',
    title: 'Telangana Budget Speech 2024-25',
    publisher: 'Finance Department, Government of Telangana',
    url: 'https://finance.telangana.gov.in/PreviewPage.do?fileName=english.pdf&filePath=budget-2024-25-books',
    sourceType: 'official-budget-speech',
    reliability: 5,
    ratingReason:
      'Primary statement of the first full Congress budget proposal and its headline expenditure plan.',
    bestFor: '2024-25 proposed expenditure, priorities, and government rationale.',
    limitations:
      'Proposal amounts are not actual spending and the speech uses government framing.',
    publishedDate: '2024-07-25',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-budget-2025-26',
    title: 'Telangana Budget Speech 2025-26',
    publisher: 'Finance Department, Government of Telangana',
    url: 'https://finance.telangana.gov.in/PreviewPage.do?fileName=english.pdf&filePath=budget-2025-26-books',
    sourceType: 'official-budget-speech',
    reliability: 5,
    ratingReason:
      'Primary current-budget proposal and government fiscal rationale.',
    bestFor: '2025-26 proposal status and priorities.',
    limitations:
      'Execution and outcome evidence remains incomplete.',
    publishedDate: '2025-03-19',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-budget-2026-27',
    title: 'Telangana Budget Speech 2026-27',
    publisher: 'Finance Department, Government of Telangana',
    url: 'https://pixelvidebudget.s3.ap-south-1.amazonaws.com/uploads/budget_books_public/1773980893_Budget_Speech_English_2026-27_1773980893_.pdf',
    sourceType: 'official-budget-speech',
    reliability: 5,
    ratingReason:
      'Primary current budget speech listed by the Telangana Finance Department.',
    bestFor:
      'The 2026-27 proposal, stated priorities, and official fiscal framing.',
    limitations:
      'Exact volume-level figures were not fully extracted in this review; the record supports a provisional proposal assessment only.',
    publishedDate: '2026-03-20',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-budget-in-brief-2026-27',
    title: 'Telangana Budget in Brief 2026-27',
    publisher: 'Government of Telangana',
    url: 'https://www.telangana.gov.in/wp-content/uploads/2026/05/Budget-in-Brief.pdf',
    sourceType: 'official-budget-book',
    reliability: 5,
    ratingReason:
      'Primary budget summary reporting the total, revenue, capital, debt-repayment, and loan estimates.',
    bestFor: 'The exact headline 2026-27 budget proposal figures.',
    limitations:
      'Budget estimates are not actual spending and do not establish programme effectiveness.',
    publishedDate: '2026-05-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-cag-kaleshwaram-2024',
    title: 'Performance Audit on Kaleshwaram Project, Report No. 1 of 2024',
    publisher: 'Comptroller and Auditor General of India',
    url: 'https://cag.gov.in/en/audit-report/details/119638',
    sourceType: 'constitutional-audit',
    reliability: 5,
    ratingReason:
      'Controlling audit record on appraisal, cost, contracting, delivery, and benefit assumptions.',
    bestFor:
      'Fiscal, design, procurement, implementation, and benefit-risk assessment of Kaleshwaram.',
    limitations:
      'An audit is not a criminal verdict and later rehabilitation or outcome evidence requires separate review.',
    publishedDate: '2024-02-15',
    accessedDate: reviewedAt,
  },
  {
    id: 'ndsa-kaleshwaram-reports',
    title: 'National Dam Safety Authority Reports',
    publisher: 'National Dam Safety Authority',
    url: 'https://ndsa.gov.in/documents/reports',
    sourceType: 'official-engineering-review',
    reliability: 5,
    ratingReason:
      'Primary national dam-safety record for Medigadda, Annaram, and Sundilla engineering findings.',
    bestFor: 'Barrage condition, safety findings, and required remedial review.',
    limitations:
      'The record does not by itself assign criminal or complete political responsibility.',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-mission-bhagiratha',
    title: 'Mission Bhagiratha',
    publisher: 'Government of Telangana',
    url: 'https://missionbhagiratha.telangana.gov.in/',
    sourceType: 'official-programme-record',
    reliability: 5,
    ratingReason:
      'Primary programme record for design, network assets, and administrative delivery.',
    bestFor: 'Mission purpose, system design, and reported infrastructure.',
    limitations:
      'Assets and official coverage do not independently prove continuity, potability, household use, or equal service quality.',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-praja-palana',
    title: 'Praja Palana Programme',
    publisher: 'Government of Telangana',
    url: 'https://suryapet.telangana.gov.in/notice/praja-palana/',
    sourceType: 'official-programme-notice',
    reliability: 5,
    ratingReason:
      'Direct government notice for the application process associated with the Six Guarantees.',
    bestFor: 'Application chronology and official programme scope.',
    limitations:
      'Applications and announcements do not prove eligibility, take-up, fiscal sustainability, or outcomes.',
    publishedDate: '2023-12-28',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-seeepc-volume-1',
    title: 'SEEEPC Independent Expert Working Group Report, Volume 1',
    publisher: 'Directorate of Economics and Statistics, Telangana',
    url: 'https://www.des.telangana.gov.in/publications/SEEEPC/SEEEPC-IEWG%20Volume-1.pdf',
    sourceType: 'official-survey-methodology',
    reliability: 4,
    ratingReason:
      'Published methodology and expert analysis for the statewide socio-economic, education, employment, political and caste survey.',
    bestFor: 'Survey design, concepts, and stated limitations.',
    limitations:
      'Survey classifications and policy interpretation remain contestable and require transparent microdata and legal review.',
    publishedDate: '2025-01-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-caste-survey-independent',
    title: 'What Telangana’s Census-Scale Survey Reveals About Caste',
    publisher: 'The India Forum',
    url: 'https://www.theindiaforum.in/caste/what-telanganas-census-scale-survey-reveals-about-caste-modern-india',
    sourceType: 'independent-analysis',
    reliability: 4,
    ratingReason:
      'Independent interpretation of survey design, caste distribution, and policy implications.',
    bestFor: 'Corroborating and challenging official interpretation.',
    limitations:
      'It is analytical commentary, not the controlling population table or a judicial ruling.',
    publishedDate: '2025-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'mha-ncrb-cybercrime-2026',
    title: 'State-wise Cyber Crime Cases Registered, 2020-2024',
    publisher: 'Ministry of Home Affairs, Government of India',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2287039',
    sourceType: 'official-crime-statistics',
    reliability: 5,
    ratingReason:
      'Direct parliamentary release of NCRB state cybercrime registrations through 2024.',
    bestFor: 'Comparable Telangana cybercrime registration counts.',
    limitations:
      'Registered cases reflect victimisation, reporting, awareness, police recording, and legal classification; they are not a direct prevalence rate.',
    publishedDate: '2026-07-21',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-police-review-2024-independent',
    title: 'Telangana Police Annual Report 2024: Crime and Cybercrime Review',
    publisher: 'South First',
    url: 'https://thesouthfirst.com/telangana/telangana-police-annual-report-2024-rapes-and-cybercrimes-up-silence-on-lagcherla-violence/',
    sourceType: 'independent-reporting',
    reliability: 3,
    ratingReason:
      'Independent reporting on the state police annual review and its disclosed gaps.',
    bestFor: 'Recent police-reported signals and questions requiring primary-report verification.',
    limitations:
      'Not the primary annual report; police systems and NCRB categories may not be directly comparable.',
    publishedDate: '2024-12-30',
    accessedDate: reviewedAt,
  },
  {
    id: 'ts-hyderabad-floods-analysis',
    title: 'Hyderabad Floods Highlight Need for Climate Resilience',
    publisher: 'Mongabay India',
    url: 'https://india.mongabay.com/2020/11/hyderabad-floods-highlight-the-need-for-a-disaster-mitigation-and-climate-resilience-plan/',
    sourceType: 'independent-environment-reporting',
    reliability: 4,
    ratingReason:
      'Independent reporting connecting the 2020 floods to rainfall, drainage, land use, and resilience planning.',
    bestFor: 'Flood chronology, urban-planning context, and prevention lessons.',
    limitations:
      'Casualty, loss, and displacement figures require separate attributed official records.',
    publishedDate: '2020-11-10',
    accessedDate: reviewedAt,
  },
]

export const telanganaJurisdictions: JurisdictionSeed[] = [
  {
    id: 'telangana',
    name: 'Telangana',
    shortName: 'Telangana',
    level: 'state',
    parentId: 'india',
    isoCode: 'IN-TG',
    validFrom: '2014-06-02',
    status: 'published',
  },
]

export const telanganaOffices: OfficeSeed[] = [
  {
    id: 'telangana-chief-minister',
    jurisdictionId: 'telangana',
    name: 'Chief Minister of Telangana',
    shortName: 'CM',
    role: 'head-of-government',
  },
]

export const telanganaPeople: PersonSeed[] = [
  {
    id: 'k-chandrashekar-rao',
    name: 'K. Chandrashekar Rao',
    sortName: 'Rao, K. Chandrashekar',
    birthDate: '1954-02-17',
  },
  {
    id: 'a-revanth-reddy',
    name: 'A. Revanth Reddy',
    sortName: 'Reddy, A. Revanth',
    birthDate: '1969-11-08',
  },
]

export const telanganaParties: PartySeed[] = [
  {
    id: 'brs',
    name: 'Telangana Rashtra Samithi / Bharat Rashtra Samithi',
    shortName: 'TRS/BRS',
    color: '#e93c8d',
  },
  {
    id: 'inc-telangana',
    name: 'Indian National Congress',
    shortName: 'INC',
    color: '#1f78c8',
  },
]

export const telanganaLeaderTerms: LeaderTermSeed[] = [
  {
    id: 'ts-kcr-2014',
    officeId: 'telangana-chief-minister',
    personId: 'k-chandrashekar-rao',
    partyId: 'brs',
    startDate: '2014-06-02',
    endDate: '2018-12-12',
    mandateLabel: 'TRS founding-state government, 2014-2018',
    ratingConfidence: 'medium',
    ratingSummary:
      'A 6.1/10 founding-term estimate: strong state formation, power and irrigation expansion, Mission Bhagiratha, and administrative drive; reduced by debt-intensive megaproject risk, incomplete independent outcome evidence, inclusion gaps, and institutional concentration.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'ts-reorganisation-act-2014',
      'ts-assembly-history',
      'eci-telangana-statistical-reports',
      'ts-seo-2023',
      'ts-mission-bhagiratha',
    ],
  },
  {
    id: 'ts-kcr-2018',
    officeId: 'telangana-chief-minister',
    personId: 'k-chandrashekar-rao',
    partyId: 'brs',
    startDate: '2018-12-13',
    endDate: '2023-12-06',
    mandateLabel: 'TRS/BRS second government, 2018-2023',
    ratingConfidence: 'medium',
    ratingSummary:
      'A 6.1/10 second-term estimate: continued income, farm-support, power, and welfare delivery; offset by Kaleshwaram cost and safety failures, Hyderabad flood-prevention weaknesses, cybercrime growth, fiscal exposure, and reduced institutional accountability.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'eci-telangana-statistical-reports',
      'ts-seo-2023',
      'ts-cag-kaleshwaram-2024',
      'ndsa-kaleshwaram-reports',
      'ts-hyderabad-floods-analysis',
    ],
  },
  {
    id: 'ts-revanth-2023',
    officeId: 'telangana-chief-minister',
    personId: 'a-revanth-reddy',
    partyId: 'inc-telangana',
    startDate: '2023-12-07',
    mandateLabel: 'Congress government, 2023-present',
    ratingConfidence: 'low',
    ratingSummary:
      'A provisional 6.3/10 early-term estimate: competitive transition, welfare rollout, survey-based inclusion work, and willingness to audit inherited liabilities; reduced by programme affordability, incomplete outcomes, rising registered cybercrime, and a short observation window.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'eci-telangana-statistical-reports',
      'ts-budget-2024-25',
      'ts-budget-2025-26',
      'ts-praja-palana',
      'ts-seeepc-volume-1',
      'mha-ncrb-cybercrime-2026',
    ],
  },
]

const leaderDimensions = [
  'outcomes',
  'reforms',
  'inclusion',
  'crisis',
  'institutions',
  'integrity',
] as const

const leaderComponents: Record<string, number[]> = {
  'ts-kcr-2014': [6.7, 7, 6.4, 6.2, 5, 5.3],
  'ts-kcr-2018': [6.6, 6.5, 6.3, 5.8, 5.3, 6.1],
  'ts-revanth-2023': [6.4, 6.5, 6.6, 6.1, 6.4, 5.8],
}

const leaderRationales: Record<string, string[]> = {
  'ts-kcr-2014': [
    'Per-capita output, power availability, irrigation, and administrative capacity expanded from the new-state baseline, while nominal measures and Hyderabad’s inherited advantages constrain attribution.',
    'Mission Bhagiratha, Mission Kakatiya, industrial approvals, farm-support design, and power-system expansion created durable state capacity.',
    'Water, farmer support, and rural infrastructure broadened reach, but tenant farmers, landless households, service quality, and regional distribution remained concerns.',
    'The government managed state formation and initial service continuity; later disaster and dam-safety evidence limits a stronger resilience score.',
    'Democratic institutions continued, but decision-making and megaproject governance were highly centralised.',
    'Execution pace was substantial, while weak project appraisal, debt exposure, and limited independent evaluation reduce confidence.',
  ],
  'ts-kcr-2018': [
    'Income and service indicators remained comparatively strong, but COVID disruption, job quality, and large-project liabilities moderated the record.',
    'Farm support and infrastructure systems continued, while Kaleshwaram audit and barrage failures materially reduce reform durability.',
    'Transfers and services supported inclusion, but land-linked benefits and uneven labour opportunity remained structural gaps.',
    'Pandemic response and Hyderabad flooding were major tests; cybercrime registrations rose sharply and Medigadda exposed prevention failures.',
    'Electoral competition persisted, while concentration, transparency, protest handling, and alleged surveillance concerns lower the score.',
    'Welfare and service execution continued, but CAG and NDSA findings reveal serious project-control and accountability weaknesses.',
  ],
  'ts-revanth-2023': [
    'The term is too young for durable macro or social outcomes; early service and welfare delivery receives limited provisional credit.',
    'Praja Palana, guarantee implementation, inherited-project review, and SEEEPC data work show reform intent with incomplete delivery evidence.',
    'Women’s mobility support and socio-economic enumeration broaden the inclusion agenda, while eligibility, coverage, and fiscal effects remain unsettled.',
    'Administrative transition was orderly, but registered cybercrime remains a severe and growing public-safety challenge.',
    'The competitive transfer of power and greater audit emphasis support the score; institutional practice needs longer observation.',
    'Early implementation is mixed-positive, while affordability, targeting, procurement, and actual expenditure remain proof gaps.',
  ],
}

export const telanganaLeaderScores: LeaderScoreSeed[] = Object.entries(
  leaderComponents,
).flatMap(([termId, scores]) =>
  scores.map((score, index) => ({
    termId,
    dimensionId: leaderDimensions[index],
    score,
    rationale: leaderRationales[termId][index],
  })),
)

const policyDimensions = [
  'problem-design',
  'effectiveness',
  'implementation',
  'rights-inclusion',
  'durability-side-effects',
] as const

const policyComponents: Record<string, Array<number | null>> = {
  'ts-mission-bhagiratha-policy': [8.5, 7, 7.5, 8, 4],
  'ts-mission-kakatiya-policy': [8, 6.5, 7, 7, 6],
  'ts-rythu-bandhu-policy': [8, 6.2, 7.8, 4.5, 5.5],
  'ts-kaleshwaram-policy': [6.5, 3, 2.5, 5, 1.5],
  'ts-six-guarantees-policy': [7.5, null, 6, 7.5, 5],
  'ts-seeepc-policy': [8, null, 7, 7.5, 6],
}

function weightedRating(values: Array<number | null>) {
  const weights = [0.2, 0.3, 0.2, 0.15, 0.15]
  let total = 0
  let available = 0
  values.forEach((value, index) => {
    if (value === null) return
    total += value * weights[index]
    available += weights[index]
  })
  return Math.round((total / available) * 10) / 10
}

export const telanganaPolicies: PolicySeed[] = [
  {
    id: 'ts-mission-bhagiratha-policy',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    title: 'Mission Bhagiratha drinking-water network',
    shortTitle: 'Mission Bhagiratha',
    policyType: 'drinking-water',
    introducedDate: '2015-01-01',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Built a statewide bulk and distribution network intended to deliver treated piped drinking water to households and settlements.',
    intendedGoal:
      'Provide reliable, safe household drinking water and reduce dependence on unsafe or distant sources.',
    ratingScore: weightedRating(policyComponents['ts-mission-bhagiratha-policy']),
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong universal-service design and major infrastructure delivery, reduced by limited independent evidence on continuity, potability, household use, maintenance, and equal service quality.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ts-mission-bhagiratha', 'ts-seo-2023'],
  },
  {
    id: 'ts-mission-kakatiya-policy',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    title: 'Mission Kakatiya tank restoration programme',
    shortTitle: 'Mission Kakatiya',
    policyType: 'water-and-irrigation',
    introducedDate: '2015-03-12',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Restored and desilted minor-irrigation tanks in phases to improve local storage, groundwater recharge, irrigation access, and rural livelihoods.',
    intendedGoal:
      'Rehabilitate Telangana’s traditional tank system and strengthen decentralised water security.',
    ratingScore: weightedRating(policyComponents['ts-mission-kakatiya-policy']),
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong fit for a tank-dependent state and visible restoration delivery, reduced by incomplete independent evidence on storage gained, maintenance, ecological effects, distribution, and durable farm outcomes.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ts-seo-2023'],
  },
  {
    id: 'ts-rythu-bandhu-policy',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    title: 'Rythu Bandhu farmer investment support',
    shortTitle: 'Rythu Bandhu',
    policyType: 'farm-income-support',
    introducedDate: '2018-05-10',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Provided recurring per-acre investment support to recorded agricultural landholders before crop seasons.',
    intendedGoal:
      'Reduce dependence on informal credit and help farmers finance seed, fertiliser, labour, and cultivation.',
    ratingScore: weightedRating(policyComponents['ts-rythu-bandhu-policy']),
    ratingConfidence: 'medium',
    ratingSummary:
      'Simple and rapidly delivered farm support with meaningful liquidity value, reduced by landownership bias, tenant and landless exclusion, fiscal opportunity cost, and limited causal income evidence.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ts-seo-2023', 'ts-finance-budget-portal'],
  },
  {
    id: 'ts-kaleshwaram-policy',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    title: 'Kaleshwaram Lift Irrigation Project',
    shortTitle: 'Kaleshwaram',
    policyType: 'irrigation-megaproject',
    introducedDate: '2016-05-01',
    effectiveDate: '2019-06-21',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Reconfigured and expanded a large lift-irrigation system intended to move Godavari water to irrigation, drinking-water, and industrial users.',
    intendedGoal:
      'Expand irrigation and water security across drought-prone and upland districts.',
    ratingScore: weightedRating(policyComponents['ts-kaleshwaram-policy']),
    ratingConfidence: 'high',
    ratingSummary:
      'A major engineering and irrigation ambition with some operating infrastructure, but CAG appraisal and cost findings plus NDSA safety failures prevent a positive whole-project verdict.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ts-cag-kaleshwaram-2024', 'ndsa-kaleshwaram-reports', 'ts-seo-2023'],
  },
  {
    id: 'ts-six-guarantees-policy',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-revanth-2023',
    title: 'Praja Palana and Six Guarantees implementation',
    shortTitle: 'Six Guarantees',
    policyType: 'welfare-package',
    introducedDate: '2023-12-28',
    status: 'executive-action',
    coverageStatus: 'partial',
    ratingBasis: 'design',
    summary:
      'Created an application and delivery framework for a multi-programme package covering mobility, energy, housing, farm support, pensions, and household relief.',
    intendedGoal:
      'Reduce household costs and expand access to welfare and public services.',
    ratingScore: weightedRating(policyComponents['ts-six-guarantees-policy']),
    ratingConfidence: 'low',
    ratingSummary:
      'Provisional design credit for broad household reach and early delivery, with effectiveness unscored because eligibility, take-up, fiscal cost, service quality, and durable outcomes remain incomplete.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ts-praja-palana', 'ts-budget-2024-25', 'ts-budget-2025-26'],
  },
  {
    id: 'ts-seeepc-policy',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-revanth-2023',
    title: 'SEEEPC socio-economic and caste survey',
    shortTitle: 'SEEEPC survey',
    policyType: 'social-data',
    introducedDate: '2024-11-01',
    status: 'executive-action',
    coverageStatus: 'partial',
    ratingBasis: 'design',
    summary:
      'Conducted a census-scale household survey covering socio-economic, education, employment, political, and caste characteristics.',
    intendedGoal:
      'Create a more detailed evidence base for welfare targeting, representation, and inclusion policy.',
    ratingScore: weightedRating(policyComponents['ts-seeepc-policy']),
    ratingConfidence: 'low',
    ratingSummary:
      'Strong information and inclusion rationale with substantial implementation, while non-response, classification, microdata transparency, legal use, and policy outcomes remain unresolved.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ts-seeepc-volume-1', 'ts-caste-survey-independent'],
  },
]

const policyRationales: Record<string, string[]> = {
  'ts-mission-bhagiratha-policy': [
    'Addresses a universal and serious drinking-water access and quality problem with a statewide network design.',
    'Official records show substantial infrastructure and reported coverage, while independent continuity and potability evidence is incomplete.',
    'Centralised engineering and statewide rollout produced visible assets, with maintenance and last-mile quality proof gaps.',
    'Universal household ambition is highly inclusive, though actual service can differ by location and household.',
    'Durability depends on operations, source sustainability, energy, water quality, local maintenance, and finances.',
  ],
  'ts-mission-kakatiya-policy': [
    'Tank degradation, siltation, groundwater stress, and local irrigation access were appropriate targets.',
    'Official reporting supports substantial restoration activity, while net storage, groundwater, and income effects need stronger independent measurement.',
    'Phased delivery used an established local water network, with maintenance and work-quality variation remaining concerns.',
    'Decentralised tanks can benefit smaller and rain-dependent farmers, though command-area and landholding distribution matter.',
    'Durability depends on watershed management, desiltation quality, local maintenance, rainfall, and ecological safeguards.',
  ],
  'ts-rythu-bandhu-policy': [
    'Direct pre-season liquidity targets a real cultivation-finance constraint.',
    'Transfers are observable, but causal effects on debt, income, and productivity are not fully isolated.',
    'Land records enabled rapid recurring payments.',
    'Per-acre design favours owners and larger holdings and can exclude tenants and landless workers.',
    'The programme is durable but creates recurring fiscal cost and weak environmental targeting.',
  ],
  'ts-kaleshwaram-policy': [
    'Water scarcity and uneven irrigation are genuine constraints, but appraisal and alternative analysis were weak.',
    'Some infrastructure operated and irrigation expanded statewide, but project-specific net benefits are not established.',
    'CAG and NDSA identify serious planning, cost, contracting, design, and safety weaknesses.',
    'Potential regional water benefits are offset by debt, displacement, tariff, and distribution concerns.',
    'Energy intensity, rehabilitation, dam safety, debt, and uncertain benefits create severe long-run risk.',
  ],
  'ts-six-guarantees-policy': [
    'The package targets real household cost, mobility, housing, energy, farm, and pension needs.',
    'Too little comparable post-policy evidence exists for a stable effectiveness score.',
    'Praja Palana created an application channel and several benefits began, with coverage and exclusion still under review.',
    'Women’s mobility and household relief are inclusion strengths; eligibility and access need disaggregated evidence.',
    'Recurring fiscal cost and interaction with capital investment are major durability questions.',
  ],
  'ts-seeepc-policy': [
    'Detailed household evidence can improve welfare and representation decisions.',
    'No stable policy-outcome score can exist before data use, legal review, and later effects are observed.',
    'A large survey and expert reports were completed, while microdata access and reproducibility remain incomplete.',
    'The exercise centres historically under-measured caste and deprivation, but classification and non-response require care.',
    'Durability depends on transparent methods, periodic updates, privacy, legal validity, and responsible policy use.',
  ],
}

export const telanganaPolicyScores: PolicyScoreSeed[] = Object.entries(
  policyComponents,
).flatMap(([policyId, scores]) =>
  scores.map((score, index) => ({
    policyId,
    dimensionId: policyDimensions[index],
    score,
    rationale: policyRationales[policyId][index],
  })),
)

export const telanganaEvents: EventSeed[] = [
  {
    id: 'ts-state-formation-2014',
    jurisdictionId: 'telangana',
    date: '2014-06-02',
    title: 'Telangana becomes India’s 29th state',
    summary:
      'The Andhra Pradesh Reorganisation Act took effect and Telangana began operating as a separate state.',
    significance:
      'This is the hard territorial and institutional boundary for every Telangana series.',
    category: 'constitutional',
    confidence: 'high',
    sourceIds: ['ts-reorganisation-act-2014', 'ts-state-profile'],
    leaderTermIds: ['ts-kcr-2014'],
  },
  {
    id: 'ts-first-assembly-2014',
    jurisdictionId: 'telangana',
    date: '2014-06-02',
    title: 'First elected Telangana government takes office',
    summary:
      'K. Chandrashekar Rao led the first state government following the 2014 Assembly election.',
    significance:
      'Established the first democratic mandate and founding administration.',
    category: 'election',
    confidence: 'high',
    sourceIds: ['eci-telangana-statistical-reports', 'ts-assembly-history'],
    leaderTermIds: ['ts-kcr-2014'],
  },
  {
    id: 'ts-rythu-bandhu-launch-2018',
    jurisdictionId: 'telangana',
    date: '2018-05-10',
    title: 'Rythu Bandhu farm investment support begins',
    summary:
      'The state began recurring per-acre cultivation support for recorded agricultural landholders.',
    significance:
      'Created one of India’s prominent state-level direct farm-support models.',
    category: 'policy',
    confidence: 'high',
    sourceIds: ['ts-seo-2023', 'ts-finance-budget-portal'],
    leaderTermIds: ['ts-kcr-2014'],
  },
  {
    id: 'ts-election-2018',
    jurisdictionId: 'telangana',
    date: '2018-12-11',
    title: 'TRS wins a second Assembly mandate',
    summary:
      'The incumbent party returned with a larger Assembly majority and KCR began a second term.',
    significance:
      'Renewed the government’s mandate for welfare and infrastructure policies.',
    category: 'election',
    confidence: 'high',
    sourceIds: ['eci-telangana-statistical-reports'],
    leaderTermIds: ['ts-kcr-2018'],
  },
  {
    id: 'ts-hyderabad-floods-2020',
    jurisdictionId: 'telangana',
    date: '2020-10-13',
    endDate: '2020-10-20',
    title: 'Extreme rainfall floods Hyderabad',
    summary:
      'Severe rainfall inundated neighbourhoods, damaged homes and infrastructure, and exposed drainage and land-use vulnerabilities.',
    significance:
      'A major urban resilience and disaster-prevention test for state and municipal institutions.',
    category: 'disaster',
    confidence: 'high',
    sourceIds: ['ts-hyderabad-floods-analysis'],
    leaderTermIds: ['ts-kcr-2018'],
  },
  {
    id: 'ts-medigadda-distress-2023',
    jurisdictionId: 'telangana',
    date: '2023-10-21',
    title: 'Medigadda barrage piers show structural distress',
    summary:
      'Settlement and damage at the Kaleshwaram system’s Medigadda barrage triggered national dam-safety review.',
    significance:
      'Converted longstanding cost and appraisal concerns into an acute engineering and safety failure.',
    category: 'infrastructure-failure',
    confidence: 'high',
    sourceIds: ['ndsa-kaleshwaram-reports', 'ts-cag-kaleshwaram-2024'],
    leaderTermIds: ['ts-kcr-2018'],
  },
  {
    id: 'ts-election-transition-2023',
    jurisdictionId: 'telangana',
    date: '2023-12-07',
    title: 'Congress forms government under Revanth Reddy',
    summary:
      'A competitive election ended nearly a decade of BRS rule and produced an orderly transfer of power.',
    significance:
      'The state’s first change of governing party demonstrated electoral alternation.',
    category: 'election',
    confidence: 'high',
    sourceIds: ['eci-telangana-statistical-reports'],
    leaderTermIds: ['ts-revanth-2023'],
  },
  {
    id: 'ts-cag-kaleshwaram-2024',
    jurisdictionId: 'telangana',
    date: '2024-02-15',
    title: 'CAG tables Kaleshwaram performance audit',
    summary:
      'The constitutional auditor documented major appraisal, cost, contracting, implementation, and benefit-estimation weaknesses.',
    significance:
      'Provides the strongest controlling accountability record for the project’s fiscal and administrative performance.',
    category: 'audit',
    confidence: 'high',
    sourceIds: ['ts-cag-kaleshwaram-2024'],
    leaderTermIds: ['ts-revanth-2023'],
  },
  {
    id: 'ts-seeepc-survey-2024',
    jurisdictionId: 'telangana',
    date: '2024-11-06',
    endDate: '2024-12-31',
    title: 'State conducts SEEEPC household and caste survey',
    summary:
      'A census-scale exercise collected socio-economic, education, employment, political, and caste information.',
    significance:
      'Created a new evidence base for inclusion policy while raising methodology, privacy, classification, and legal-use questions.',
    category: 'social-policy',
    confidence: 'high',
    sourceIds: ['ts-seeepc-volume-1', 'ts-caste-survey-independent'],
    leaderTermIds: ['ts-revanth-2023'],
  },
]

export const telanganaEventAssessments: EventAssessmentSeed[] =
  telanganaEvents.map((event) => ({
    eventId: event.id,
    choiceAssessment:
      event.category === 'policy' || event.category === 'social-policy'
        ? 'mostly-right'
        : 'not-a-policy-choice',
    choiceReason:
      event.category === 'policy' || event.category === 'social-policy'
        ? 'The decision addressed a documented public problem, while implementation, inclusion, cost, and outcome evidence remain separately assessed.'
        : 'The event is an election, constitutional transition, disaster, audit, or infrastructure failure rather than a single government policy choice.',
    unionRole:
      event.id === 'ts-state-formation-2014'
        ? 'Parliament and the Union government enacted and implemented the statutory state reorganisation framework.'
        : 'Union institutions contributed through election administration, constitutional audit, dam safety, national programmes, or shared fiscal and regulatory systems where applicable.',
    stateLocalRole:
      'The Telangana government, state agencies, districts, municipalities, contractors, and local institutions held the primary implementation or response responsibilities supported by the event record.',
    positiveOutcomes:
      event.category === 'disaster' || event.category === 'infrastructure-failure'
        ? 'Later scrutiny and resilience or safety lessons created opportunities for corrective action without excusing the underlying harm.'
        : 'The event contributed to democratic continuity, public-service delivery, accountability, or a stronger evidence base where supported.',
    lessons:
      'Publish controlling records, attributable outcomes, costs, implementation gaps, shared responsibility, and unresolved evidence separately.',
    confidence: event.confidence,
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Government of Telangana and responsible state agencies',
        responsibilityKind:
          event.category === 'election'
            ? 'shared-context'
            : event.category === 'infrastructure-failure'
              ? 'failure-to-prevent'
              : 'implementation',
        level: event.category === 'election' ? 2 : 4,
        assessment:
          'Held the state-level administrative, implementation, oversight, or response role appropriate to the event.',
        confidence: event.confidence,
      },
      {
        actorType: 'institution',
        actorName: 'Independent constitutional, electoral, audit, or safety institutions',
        responsibilityKind: 'shared-context',
        level: 3,
        assessment:
          'Provided controlling law, election administration, audit, engineering review, or independent accountability where applicable.',
        confidence: 'medium',
      },
    ],
  }))

export const telanganaClaims: ClaimSeed[] = [
  {
    id: 'ts-formation-boundary',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    eventId: 'ts-state-formation-2014',
    title: 'Telangana evidence begins at the June 2014 boundary',
    body:
      'Undivided-Andhra observations are not assigned to Telangana without an explicit territorial mapping. June 2, 2014 is the controlling statehood boundary.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ts-reorganisation-act-2014'],
  },
  {
    id: 'ts-kcr-power-irrigation-growth',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    title: 'Power availability and irrigation expanded after statehood',
    body:
      'Official series show large increases in contracted power capacity, per-capita availability, electricity use, and gross irrigated area from the early statehood baseline.',
    stance: 'achievement',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ts-seo-2023'],
  },
  {
    id: 'ts-bhagiratha-network-credit',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    policyId: 'ts-mission-bhagiratha-policy',
    title: 'Mission Bhagiratha created major statewide water infrastructure',
    body:
      'The programme deserves credit for a statewide treated-water network and reported household reach, while service continuity, potability, maintenance, and equal access remain evidence gaps.',
    stance: 'achievement',
    category: 'public-services',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['ts-mission-bhagiratha', 'ts-seo-2023'],
  },
  {
    id: 'ts-rythu-bandhu-liquidity',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    policyId: 'ts-rythu-bandhu-policy',
    title: 'Rythu Bandhu delivered simple recurring cultivation support',
    body:
      'The land-record-linked system delivered pre-season liquidity at scale, but ownership-based design limited reach to tenants and landless agricultural workers.',
    stance: 'mixed',
    category: 'agriculture',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['ts-seo-2023', 'ts-finance-budget-portal'],
  },
  {
    id: 'ts-kaleshwaram-accountability',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2018',
    eventId: 'ts-medigadda-distress-2023',
    policyId: 'ts-kaleshwaram-policy',
    title: 'Kaleshwaram audit and safety failures outweigh whole-project claims',
    body:
      'CAG and NDSA findings document serious appraisal, cost, implementation, and barrage-safety problems. Statewide irrigation growth cannot be assigned wholly to this project.',
    stance: 'concern',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ts-cag-kaleshwaram-2024', 'ndsa-kaleshwaram-reports', 'ts-seo-2023'],
  },
  {
    id: 'ts-nfhs-household-health-gains',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2018',
    title: 'Household sanitation, clean cooking, child growth, and infant survival improved',
    body:
      'NFHS-4 to NFHS-5 comparisons show improved sanitation rising from 52.3% to 76.2%, clean cooking from 67.3% to 91.8%, child stunting falling from 38.2% to 33.1%, and infant mortality falling from 28.0 to 26.4 per 1,000 live births.',
    stance: 'achievement',
    category: 'human-development',
    claimLayer: 'factual',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['nfhs5-telangana', 'niti-ts-macro-fiscal-2025'],
  },
  {
    id: 'ts-nfhs-anaemia-concern',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2018',
    title: 'Women’s anaemia did not improve between NFHS rounds',
    body:
      'The share of women age 15-49 measured with anaemia rose from 56.6% in NFHS-4 to 57.6% in NFHS-5, showing that infrastructure and income gains did not resolve every health and nutrition constraint.',
    stance: 'concern',
    category: 'human-development',
    claimLayer: 'factual',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['nfhs5-telangana', 'niti-ts-macro-fiscal-2025'],
  },
  {
    id: 'ts-hyderabad-flood-resilience-gap',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2018',
    eventId: 'ts-hyderabad-floods-2020',
    title: 'The 2020 floods exposed urban resilience and planning gaps',
    body:
      'Extreme rainfall was the acute hazard, while drainage, floodplain occupation, land use, and fragmented urban governance amplified damage.',
    stance: 'concern',
    category: 'disaster',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['ts-hyderabad-floods-analysis'],
  },
  {
    id: 'ts-cybercrime-rise',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-revanth-2023',
    title: 'Registered cybercrime rose sharply through 2024',
    body:
      'NCRB registrations increased from 5,024 in 2020 to 27,230 in 2024. This is a serious harm and capacity signal, but reporting and recording changes prevent a simple prevalence or CM-blame conclusion.',
    stance: 'concern',
    category: 'public-safety',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['mha-ncrb-cybercrime-2026'],
  },
  {
    id: 'ts-electoral-alternation',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-revanth-2023',
    eventId: 'ts-election-transition-2023',
    title: 'The 2023 election produced an orderly change of government',
    body:
      'The first alternation of governing party since statehood demonstrated meaningful electoral competition and constitutional continuity.',
    stance: 'achievement',
    category: 'institutions',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['eci-telangana-statistical-reports'],
  },
  {
    id: 'ts-six-guarantees-outcomes-pending',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-revanth-2023',
    policyId: 'ts-six-guarantees-policy',
    title: 'Six Guarantees outcomes remain provisional',
    body:
      'Applications and early benefits establish implementation, not complete effectiveness. Eligibility, exclusion, service quality, recurring cost, and household outcomes remain under review.',
    stance: 'context',
    category: 'evidence-gap',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ts-praja-palana', 'ts-budget-2024-25', 'ts-budget-2025-26'],
  },
  {
    id: 'ts-seeepc-inclusion-data',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-revanth-2023',
    eventId: 'ts-seeepc-survey-2024',
    policyId: 'ts-seeepc-policy',
    title: 'SEEEPC expands the inclusion evidence base without settling policy',
    body:
      'The survey creates unusually detailed household evidence, while non-response, classification, privacy, microdata access, legal use, and policy outcomes remain unresolved.',
    stance: 'mixed',
    category: 'inclusion',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['ts-seeepc-volume-1', 'ts-caste-survey-independent'],
  },
]

export const telanganaCuratedAnswers: CuratedAnswerSeed[] = [
  {
    id: 'ts-progress-since-statehood',
    jurisdictionId: 'telangana',
    question: 'Did Telangana become richer and better supplied after statehood?',
    aliases: ['how is telangana doing', 'telangana development since 2014'],
    shortAnswer:
      'Official series show strong gains in income, power, irrigation, and infrastructure, but nominal growth, Hyderabad’s inherited advantages, distribution, service quality, and Kaleshwaram liabilities prevent exclusive CM attribution.',
    verdict: 'Substantial observed progress with major attribution and quality caveats.',
    confidence: 'medium',
    asOfDate: reviewedAt,
    claimSections: [
      { claimId: 'ts-kcr-power-irrigation-growth', section: 'achievement', sortOrder: 1 },
      { claimId: 'ts-bhagiratha-network-credit', section: 'achievement', sortOrder: 2 },
      { claimId: 'ts-nfhs-household-health-gains', section: 'achievement', sortOrder: 3 },
      { claimId: 'ts-kaleshwaram-accountability', section: 'concern', sortOrder: 1 },
      { claimId: 'ts-nfhs-anaemia-concern', section: 'concern', sortOrder: 2 },
      { claimId: 'ts-formation-boundary', section: 'context', sortOrder: 1 },
    ],
  },
  {
    id: 'ts-kaleshwaram-success',
    jurisdictionId: 'telangana',
    question: 'Was Kaleshwaram a successful irrigation project?',
    aliases: ['did kaleshwaram work', 'kaleshwaram rating'],
    shortAnswer:
      'It created major infrastructure, but controlling audit and dam-safety findings identify severe appraisal, cost, implementation, and engineering failures. A positive whole-project verdict is not supported.',
    verdict: 'Major ambition, weak verified net performance and serious safety risk.',
    confidence: 'high',
    asOfDate: reviewedAt,
    claimSections: [
      { claimId: 'ts-kaleshwaram-accountability', section: 'concern', sortOrder: 1 },
      { claimId: 'ts-kcr-power-irrigation-growth', section: 'context', sortOrder: 1 },
    ],
  },
  {
    id: 'ts-crime-direction',
    jurisdictionId: 'telangana',
    question: 'Is crime getting worse in Telangana?',
    aliases: ['telangana crime rate', 'cybercrime telangana'],
    shortAnswer:
      'Cybercrime registrations rose sharply through 2024, while aggregate police totals require category and denominator reconciliation. More reporting can coexist with more harm.',
    verdict: 'Cybercrime is clearly worsening as a registered harm signal; statewide crime direction is mixed and reporting-sensitive.',
    confidence: 'medium',
    asOfDate: reviewedAt,
    claimSections: [
      { claimId: 'ts-cybercrime-rise', section: 'concern', sortOrder: 1 },
      { claimId: 'ts-electoral-alternation', section: 'context', sortOrder: 1 },
    ],
  },
]

const indicatorSource = 'ts-seo-2023'

export const telanganaIndicatorDefinitions: IndicatorDefinitionSeed[] = [
  ['ts-pci-nominal', 'Nominal per-capita income', 'Per-capita income', 'Rs/person', 'currency', 'economic-opportunity', 0.25, 'higher', 'log', 50000, 500000],
  ['ts-gsdp-nominal', 'Nominal gross state domestic product', 'State output', 'Rs crore', 'currency', 'economic-opportunity', 0, 'neutral', 'log', 100000, 3000000],
  ['ts-agriculture-production', 'Agriculture production', 'Farm production', 'lakh tonnes', 'number', 'economic-opportunity', 0.1, 'higher', 'linear', 100, 500],
  ['ts-gross-irrigated-area', 'Gross irrigated area', 'Irrigated area', 'lakh acres', 'number', 'basic-systems', 0.15, 'higher', 'linear', 30, 180],
  ['ts-livestock-gva', 'Livestock gross value added', 'Livestock value', 'Rs crore', 'currency', 'economic-opportunity', 0, 'neutral', 'log', 10000, 200000],
  ['ts-power-availability-per-capita', 'Per-capita power availability', 'Power/person', 'kWh/person', 'number', 'basic-systems', 0.2, 'higher', 'linear', 500, 3000],
  ['ts-contracted-power-capacity', 'Contracted power capacity', 'Power capacity', 'MW', 'number', 'basic-systems', 0, 'neutral', 'linear', 5000, 25000],
  ['ts-electricity-consumption', 'Electricity consumption', 'Power use', 'MU', 'number', 'basic-systems', 0, 'neutral', 'linear', 20000, 100000],
  ['ts-unemployment-rate', 'Unemployment rate, age 15+', 'Unemployment', '% labour force', 'percent', 'economic-opportunity', 0.15, 'lower', 'linear', 0, 15],
  ['ts-nfhs-infant-mortality', 'Infant mortality rate', 'Infant mortality', 'deaths per 1,000 live births', 'number', 'human-capability', 0.25, 'lower', 'linear', 10, 60],
  ['ts-nfhs-child-stunting', 'Children under five who are stunted', 'Child stunting', '% children under five', 'percent', 'human-capability', 0.2, 'lower', 'linear', 10, 60],
  ['ts-nfhs-improved-sanitation', 'Households using improved sanitation', 'Improved sanitation', '% households', 'percent', 'basic-systems', 0.2, 'higher', 'linear', 30, 100],
  ['ts-nfhs-clean-cooking', 'Households using clean cooking fuel', 'Clean cooking', '% households', 'percent', 'basic-systems', 0.2, 'higher', 'linear', 30, 100],
  ['ts-nfhs-women-anaemia', 'Women age 15-49 with anaemia', 'Women with anaemia', '% women age 15-49', 'percent', 'inclusion', 0.15, 'lower', 'linear', 20, 80],
  ['ts-employment-agriculture-share', 'Agriculture share of employment', 'Farm employment', '% employment', 'percent', 'economic-opportunity', 0, 'neutral', 'linear', 0, 70],
  ['ts-employment-industry-share', 'Industry share of employment', 'Industry employment', '% employment', 'percent', 'economic-opportunity', 0, 'neutral', 'linear', 0, 50],
  ['ts-employment-services-share', 'Services share of employment', 'Services employment', '% employment', 'percent', 'economic-opportunity', 0, 'neutral', 'linear', 0, 70],
  ['ts-crime-cyber-registered-count', 'Registered cybercrime cases', 'Cybercrime registrations', 'cases', 'number', 'institutions', 0, 'neutral', 'log', 1000, 50000],
].map(
  ([
    id,
    name,
    shortName,
    unit,
    format,
    dimensionId,
    dimensionWeight,
    direction,
    transform,
    goalpostLow,
    goalpostHigh,
  ]) => ({
    id: id as string,
    name: name as string,
    shortName: shortName as string,
    description: `${name} for Telangana using the stated official observation period.`,
    plainLanguage:
      direction === 'neutral'
        ? 'This is contextual evidence and has no universally defensible good or bad direction.'
        : `This shows the recorded ${String(shortName).toLowerCase()}; ${direction === 'higher' ? 'higher' : 'lower'} is treated as improvement with source caveats.`,
    example: `A value is reported for the observation year, not interpolated to a Chief Minister oath date.`,
    unit: unit as string,
    format: format as IndicatorDefinitionSeed['format'],
    dimensionId: dimensionId as string,
    dimensionWeight: dimensionWeight as number,
    direction: direction as IndicatorDefinitionSeed['direction'],
    scoreRole: dimensionWeight === 0 ? 'context' : 'scored',
    transform: transform as IndicatorDefinitionSeed['transform'],
    goalpostLow: goalpostLow as number,
    goalpostHigh: goalpostHigh as number,
    sourceId:
      id === 'ts-crime-cyber-registered-count'
        ? 'mha-ncrb-cybercrime-2026'
        : String(id).startsWith('ts-nfhs-')
          ? 'nfhs5-telangana'
        : indicatorSource,
    frequency: String(id).startsWith('ts-nfhs-')
      ? ('survey' as const)
      : ('annual' as const),
    stateReady: true,
  }),
)

function observations(
  indicatorId: string,
  values: Array<[number, number, IndicatorObservationSeed['status']?]>,
  sourceId = indicatorSource,
  note?: string,
): IndicatorObservationSeed[] {
  return values.map(([period, value, status = 'observed']) => ({
    indicatorId,
    jurisdictionId: 'telangana',
    period,
    value,
    status,
    sourceId,
    note,
  }))
}

export const telanganaIndicatorObservations: IndicatorObservationSeed[] = [
  ...observations('ts-pci-nominal', [[2014, 124104], [2022, 317115, 'estimated']], indicatorSource, 'Financial years 2014-15 and 2022-23; nominal values are not inflation-adjusted household income.'),
  ...observations('ts-gsdp-nominal', [[2022, 1327000, 'estimated']], indicatorSource, '2022-23 advance estimate; subject to revision.'),
  ...observations('ts-agriculture-production', [[2014, 232], [2021, 326]], indicatorSource, 'Financial-year production; weather and classification affect comparison.'),
  ...observations('ts-gross-irrigated-area', [[2014, 62.48], [2021, 135.6]], indicatorSource, 'Statewide gross area cannot be attributed wholly to Kaleshwaram or one administration.'),
  ...observations('ts-livestock-gva', [[2014, 29282], [2022, 103895, 'estimated']], indicatorSource, 'Nominal GVA and estimate vintage limit real-growth interpretation.'),
  ...observations('ts-power-availability-per-capita', [[2014, 1152], [2021, 2005]]),
  ...observations('ts-contracted-power-capacity', [[2014, 7872], [2021, 17667]], indicatorSource, 'Contracted capacity is not identical to generation, reliability, or state-owned capacity.'),
  ...observations('ts-electricity-consumption', [[2014, 39519], [2021, 61267]], indicatorSource, 'Consumption is contextual and can rise with both productive use and inefficiency.'),
  ...observations('ts-unemployment-rate', [[2019, 7.5], [2020, 5.1]], indicatorSource, 'PLFS usual-status estimates; lower unemployment can coexist with low participation or poor job quality.'),
  ...observations(
    'ts-nfhs-infant-mortality',
    [[2015, 28], [2019, 26.4]],
    'nfhs5-telangana',
    'NFHS-4 (2015-16) and NFHS-5 (2019-20) survey estimates; not annual observations.',
  ),
  ...observations(
    'ts-nfhs-child-stunting',
    [[2015, 38.2], [2019, 33.1]],
    'nfhs5-telangana',
    'NFHS survey estimates for children under five; survey rounds and sampling uncertainty apply.',
  ),
  ...observations(
    'ts-nfhs-improved-sanitation',
    [[2015, 52.3], [2019, 76.2]],
    'nfhs5-telangana',
    'Household survey use of improved sanitation; not identical to administrative construction or coverage.',
  ),
  ...observations(
    'ts-nfhs-clean-cooking',
    [[2015, 67.3], [2019, 91.8]],
    'nfhs5-telangana',
    'Household survey estimate; access does not prove exclusive or continuous use.',
  ),
  ...observations(
    'ts-nfhs-women-anaemia',
    [[2015, 56.6], [2019, 57.6]],
    'nfhs5-telangana',
    'Anaemia measurement among women age 15-49; lower is generally better.',
  ),
  ...observations('ts-employment-agriculture-share', [[2020, 45.79]], indicatorSource, '2020-21 employment composition.'),
  ...observations('ts-employment-industry-share', [[2020, 21]], indicatorSource, '2020-21 employment composition.'),
  ...observations('ts-employment-services-share', [[2020, 33.21]], indicatorSource, '2020-21 employment composition.'),
  ...observations(
    'ts-crime-cyber-registered-count',
    [[2020, 5024], [2021, 10303], [2022, 15297], [2023, 18236], [2024, 27230]],
    'mha-ncrb-cybercrime-2026',
    'Registered cases reflect harm, reporting, awareness, police recording, and legal classification; they are not a population rate.',
  ),
]

const budgetDimensions = [
  'strategy',
  'fiscal',
  'capacity',
  'inclusion',
  'delivery',
] as const

const budgetComponents: Record<string, number[]> = {
  'budget-ts-2014-15': [7.5, 5.5, 7, 6.5, 5.5],
  'budget-ts-2018-19': [7.5, 6, 6.5, 7.5, 5.5],
  'budget-ts-2024-25': [7.5, 5.5, 6, 8, 5],
  'budget-ts-2026-27': [7, 4.5, 6, 7, 5],
}

const budgetRating = (id: string) =>
  Math.round(
    (budgetComponents[id].reduce((sum, score) => sum + score, 0) /
      budgetComponents[id].length) *
      10,
  ) / 10

export const telanganaBudgets: BudgetSeed[] = [
  {
    id: 'budget-ts-2014-15',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    title: 'First Telangana state budget, 2014-15',
    shortTitle: 'State-formation budget',
    fiscalYear: '2014-15',
    financeMinister: 'Etela Rajender',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'partial',
    ratingBasis: 'retrospective',
    summary:
      'A founding budget required to establish state administration while supporting power, irrigation, welfare, agriculture, and public services.',
    plainLanguage:
      'The new state had to make government function and begin major service and infrastructure programmes at the same time. Exact execution requires archived accounts.',
    totalExpenditureCrore: 100637.96,
    ratingScore: budgetRating('budget-ts-2014-15'),
    ratingConfidence: 'low',
    ratingSummary:
      'Credible founding priorities with substantial infrastructure ambition, reduced by incomplete validated budget-book extraction, transition uncertainty, and later debt-intensive delivery.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ts-budget-2014-15', 'ts-reorganisation-act-2014'],
  },
  {
    id: 'budget-ts-2018-19',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-kcr-2014',
    title: 'Telangana Budget 2018-19',
    shortTitle: 'Rythu Bandhu launch budget',
    fiscalYear: '2018-19',
    financeMinister: 'Etela Rajender',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'partial',
    ratingBasis: 'retrospective',
    summary:
      'A welfare and rural-investment budget associated with the launch of Rythu Bandhu and continued irrigation, power, and service expansion.',
    plainLanguage:
      'The budget put more direct support into farming while continuing large infrastructure commitments. Tenant exclusion and recurring fiscal cost reduce the inclusion and durability case.',
    totalExpenditureCrore: 174454,
    revenueExpenditureCrore: 125455,
    capitalExpenditureCrore: 48999,
    ratingScore: budgetRating('budget-ts-2018-19'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong problem fit and farmer-service orientation, moderated by landownership bias, megaproject exposure, and incomplete independent outcome attribution.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['prs-ts-budget-2018-19', 'ts-finance-budget-portal'],
  },
  {
    id: 'budget-ts-2024-25',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-revanth-2023',
    title: 'Telangana Budget 2024-25',
    shortTitle: 'First full Congress budget',
    fiscalYear: '2024-25',
    presentedDate: '2024-07-25',
    financeMinister: 'Mallu Bhatti Vikramarka',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'The first full Congress budget combined Six Guarantees, agriculture, housing, public services, infrastructure, and inherited-liability management.',
    plainLanguage:
      'The plan tried to fund broad household relief while maintaining state investment. The headline amounts are proposals, and later accounts control execution.',
    totalExpenditureCrore: 291159,
    revenueExpenditureCrore: 220945,
    ratingScore: budgetRating('budget-ts-2024-25'),
    ratingConfidence: 'low',
    ratingSummary:
      'High inclusion and mandate fit, reduced by recurring-cost pressure, incomplete capital and deficit reconciliation, and limited actual-spending evidence.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ts-budget-2024-25', 'ts-finance-budget-portal'],
  },
  {
    id: 'budget-ts-2026-27',
    jurisdictionId: 'telangana',
    leaderTermId: 'ts-revanth-2023',
    title: 'Telangana Budget 2026-27',
    shortTitle: 'Current provisional budget',
    fiscalYear: '2026-27',
    presentedDate: '2026-03-20',
    financeMinister: 'Mallu Bhatti Vikramarka',
    budgetKind: 'full',
    status: 'current',
    coverageStatus: 'partial',
    ratingBasis: 'proposal',
    summary:
      'A current proposal continuing welfare, agriculture, public services, urban investment, and infrastructure priorities.',
    plainLanguage:
      'The proposal totals about Rs 3.24 lakh crore, with large revenue and capital commitments. It receives design credit only until execution and audited accounts exist.',
    totalExpenditureCrore: 324234,
    revenueExpenditureCrore: 234405.82,
    capitalExpenditureCrore: 47267.28,
    fiscalDeficitCrore: 58458,
    ratingScore: budgetRating('budget-ts-2026-27'),
    ratingConfidence: 'low',
    ratingSummary:
      'Provisional strategy and inclusion credit with no outcome score; high borrowing, deficit pressure, revenue realism, and execution remain major risks.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'ts-budget-2026-27',
      'ts-budget-in-brief-2026-27',
      'ts-finance-budget-portal',
    ],
  },
]

const budgetRationales: Record<string, string[]> = {
  'budget-ts-2014-15': [
    'Correctly prioritised new-state administration, power, irrigation, welfare, and public services.',
    'Transition finances and incomplete validated accounts lower confidence.',
    'Early infrastructure and capacity building were central.',
    'The plan included broad public-service and rural priorities.',
    'Simultaneous institution building and megaproject ambition created substantial delivery risk.',
  ],
  'budget-ts-2018-19': [
    'Matched farm-liquidity and rural-investment needs.',
    'Recurring transfers and large infrastructure commitments increased fiscal exposure.',
    'Irrigation, power, and agricultural capacity remained prominent.',
    'Farmer support was broad among owners but weak for tenants and landless households.',
    'Long-run value depended on targeting, debt, project quality, and environmental sustainability.',
  ],
  'budget-ts-2024-25': [
    'Closely matched the new government’s household-relief and public-service mandate.',
    'Large recurring promises and incomplete execution evidence reduce fiscal credibility.',
    'Infrastructure remained present but competed with major current expenditure.',
    'Mobility, housing, agriculture, energy relief, and welfare created strong inclusion intent.',
    'Targeting, procurement, revenue, debt, and actual delivery remained material risks.',
  ],
  'budget-ts-2026-27': [
    'The stated strategy continues welfare and productive-capacity priorities.',
    'The large deficit and borrowing requirement weaken fiscal credibility despite active debt management.',
    'The proposal retains infrastructure and urban-development intent.',
    'Public services and household support remain central.',
    'The budget is too new for execution evidence and audited outcomes.',
  ],
}

export const telanganaBudgetScores: BudgetScoreSeed[] = Object.entries(
  budgetComponents,
).flatMap(([budgetId, scores]) =>
  scores.map((score, index) => ({
    budgetId,
    dimensionId: budgetDimensions[index],
    score,
    rationale: budgetRationales[budgetId][index],
  })),
)

export const telanganaBudgetAllocations: BudgetAllocationSeed[] = [
  {
    id: 'ts-2014-total-expenditure',
    budgetId: 'budget-ts-2014-15',
    category: 'total',
    label: 'Proposed total expenditure',
    amountCrore: 100637.96,
    note: 'Ten-month Budget Estimate for the new state.',
    sourceId: 'ts-budget-2014-15',
    sortOrder: 1,
  },
  {
    id: 'ts-2014-plan-expenditure',
    budgetId: 'budget-ts-2014-15',
    category: 'plan',
    label: 'Plan expenditure',
    amountCrore: 48648.47,
    note:
      'Historical Plan classification; not equivalent to modern capital expenditure.',
    sourceId: 'ts-budget-2014-15',
    sortOrder: 2,
  },
  {
    id: 'ts-2014-non-plan-expenditure',
    budgetId: 'budget-ts-2014-15',
    category: 'non-plan',
    label: 'Non-Plan expenditure',
    amountCrore: 51989.49,
    note:
      'Historical Non-Plan classification; not equivalent to modern revenue expenditure.',
    sourceId: 'ts-budget-2014-15',
    sortOrder: 3,
  },
  {
    id: 'ts-2018-total-expenditure',
    budgetId: 'budget-ts-2018-19',
    category: 'total',
    label: 'Proposed total expenditure',
    amountCrore: 174454,
    note: 'Budget Estimate; not actual spending.',
    sourceId: 'prs-ts-budget-2018-19',
    sortOrder: 1,
  },
  {
    id: 'ts-2018-revenue-expenditure',
    budgetId: 'budget-ts-2018-19',
    category: 'revenue',
    label: 'Proposed revenue expenditure',
    amountCrore: 125455,
    note: 'Budget Estimate; later accounts control execution.',
    sourceId: 'prs-ts-budget-2018-19',
    sortOrder: 2,
  },
  {
    id: 'ts-2018-capital-expenditure',
    budgetId: 'budget-ts-2018-19',
    category: 'capital',
    label: 'Proposed capital expenditure',
    amountCrore: 48999,
    note: 'Budget Estimate; includes capital outlay and related capital items.',
    sourceId: 'prs-ts-budget-2018-19',
    sortOrder: 3,
  },
  {
    id: 'ts-2024-total-expenditure',
    budgetId: 'budget-ts-2024-25',
    category: 'total',
    label: 'Proposed total expenditure',
    amountCrore: 291159,
    note: 'Budget estimate; not actual spending.',
    sourceId: 'ts-budget-2024-25',
    sortOrder: 1,
  },
  {
    id: 'ts-2024-revenue-expenditure',
    budgetId: 'budget-ts-2024-25',
    category: 'revenue',
    label: 'Proposed revenue expenditure',
    amountCrore: 220945,
    note: 'Budget estimate; later accounts and revised estimates control execution.',
    sourceId: 'ts-budget-2024-25',
    sortOrder: 2,
  },
  {
    id: 'ts-2026-total-expenditure',
    budgetId: 'budget-ts-2026-27',
    category: 'total',
    label: 'Proposed total expenditure',
    amountCrore: 324234,
    note:
      'Budget Estimate including revenue, capital, public-debt repayment, and loans and advances.',
    sourceId: 'ts-budget-in-brief-2026-27',
    sortOrder: 1,
  },
  {
    id: 'ts-2026-revenue-expenditure',
    budgetId: 'budget-ts-2026-27',
    category: 'revenue',
    label: 'Proposed revenue expenditure',
    amountCrore: 234405.82,
    note: 'Budget Estimate; not actual spending.',
    sourceId: 'ts-budget-in-brief-2026-27',
    sortOrder: 2,
  },
  {
    id: 'ts-2026-capital-expenditure',
    budgetId: 'budget-ts-2026-27',
    category: 'capital',
    label: 'Proposed capital expenditure',
    amountCrore: 47267.28,
    note: 'Budget Estimate; not demonstrated project completion.',
    sourceId: 'ts-budget-in-brief-2026-27',
    sortOrder: 3,
  },
]

export const telanganaBudgetPoints: BudgetPointSeed[] = telanganaBudgets.flatMap(
  (budget) => [
    {
      id: `${budget.id}-strength`,
      budgetId: budget.id,
      pointType: 'strength' as const,
      title: 'Strategy tied to the state’s current development and service needs',
      body: budget.summary,
      sourceId: budget.sourceIds[0],
      sortOrder: 1,
    },
    {
      id: `${budget.id}-risk`,
      budgetId: budget.id,
      pointType: 'risk' as const,
      title: 'Proposal and execution must remain separate',
      body:
        budget.ratingBasis === 'proposal'
          ? 'The current budget has no demonstrated outcome record; revenue, borrowing, targeting, procurement, and actual spending require later accounts.'
          : 'Budget estimates require reconciliation with revised estimates, accounts, liabilities, and independently observed outcomes.',
      sourceId: budget.sourceIds[0],
      sortOrder: 2,
    },
  ],
)
