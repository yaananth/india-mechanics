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
  LeaderSpecialistAssessmentSeed,
  LeaderTermSeed,
  OfficeSeed,
  PartySeed,
  PersonSeed,
  PolicyScoreSeed,
  PolicySeed,
  SourceSeed,
} from '../types.ts'

const reviewedAt = '2026-07-24'

export const tamilNaduSources: SourceSeed[] = [
  {
    id: 'tn-name-act-1968',
    title: 'Madras State (Alteration of Name) Act, 1968',
    publisher: 'India Code, Government of India',
    url: 'https://www.indiacode.nic.in/bitstream/123456789/1710/1/1968-53.pdf',
    sourceType: 'primary-law',
    reliability: 5,
    ratingReason:
      'Authoritative central law and commencement record for the change from Madras State to Tamil Nadu.',
    bestFor:
      'The January 14, 1969 validity boundary used for the modern Tamil Nadu jurisdiction.',
    limitations:
      'The law changes the state name; it does not evaluate later political or social outcomes.',
    publishedDate: '1968-12-18',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-assembly-cm-list',
    title: 'Chief Ministers of Tamil Nadu',
    publisher: 'Tamil Nadu Legislative Assembly',
    url: 'https://www.assembly.tn.gov.in/history/cmlist.php',
    sourceType: 'official-office-chronology',
    reliability: 5,
    ratingReason:
      'The state legislature chronology is the controlling state record for Chief Minister service intervals.',
    bestFor:
      'Historical officeholder order, oath periods, acting transitions, and interruptions by President rule.',
    limitations:
      'The chronology does not assess mandates, policy quality, or causal performance.',
    accessedDate: reviewedAt,
  },
  {
    id: 'eci-tn-2021',
    title: 'Tamil Nadu Legislative Assembly election statistical report, 2021',
    publisher: 'Election Commission of India',
    url: 'https://www.eci.gov.in/statistical-reports',
    sourceType: 'official-election-result',
    reliability: 5,
    ratingReason:
      'Authoritative election record for the 2021 Assembly mandate and transfer of government.',
    bestFor: 'The DMK mandate that produced the Stalin government.',
    limitations:
      'Election results establish votes and seats, not policy quality or reasons for voter choice.',
    publishedDate: '2021-05-02',
    accessedDate: reviewedAt,
  },
  {
    id: 'eci-tn-2026',
    title: 'Tamil Nadu Assembly election results, May 2026',
    publisher: 'Election Commission of India',
    url: 'https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S22.htm',
    sourceType: 'official-election-result',
    reliability: 5,
    ratingReason:
      'Authoritative current result page reporting party seat totals for all 234 constituencies.',
    bestFor:
      'The 2026 transfer of power and TVK result of 108 Assembly seats.',
    limitations:
      'The result does not prove coalition durability or future government performance.',
    publishedDate: '2026-05-04',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-lok-bhavan-vijay-2026',
    title: 'Lok Bhavan press release no. 37 dated May 10, 2026',
    publisher: 'Lok Bhavan, Tamil Nadu',
    url: 'https://lokbhavan.tn.gov.in/lok-bhavan-press-release-no-37-dated-10-05-2026/',
    sourceType: 'official-appointment-record',
    reliability: 5,
    ratingReason:
      'Controlling gubernatorial record for C. Joseph Vijay taking the oath as Chief Minister.',
    bestFor: 'The exact May 10, 2026 start of the current Chief Minister term.',
    limitations:
      'An oath record does not establish later policy, execution, or outcome performance.',
    publishedDate: '2026-05-10',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-economic-survey-2025-26',
    title: 'Tamil Nadu Economic Survey 2025-26',
    publisher: 'Government of Tamil Nadu',
    url: 'https://tamildigitallibrary.in/assets/docs/uploads/catalogue_article_file/BOK/upload/2026/02/TVA_TVA_BOK_062955/upload_primary_20260216113955411_20260216113539.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Primary state synthesis of growth, employment, health, poverty, infrastructure, programmes, and delivery through the outgoing government.',
    bestFor:
      'Current state indicators, road outputs, programme reach, and explicit methodological limitations.',
    limitations:
      'Government programme descriptions and evaluations need independent corroboration; projections are not observed outcomes.',
    publishedDate: '2026-02-17',
    accessedDate: reviewedAt,
  },
  {
    id: 'niti-tn-macro-fiscal-2025',
    title: 'Macro and Fiscal Landscape of the State of Tamil Nadu',
    publisher: 'NITI Aayog',
    url: 'https://www.niti.gov.in/sites/default/files/2025-03/Macro-and-Fiscal-Landscape-of-the-State-of-Tamil-Nadu.pdf',
    sourceType: 'official-analysis',
    reliability: 4,
    ratingReason:
      'Named comparative synthesis using MoSPI, RBI, PLFS, SRS, NFHS, Census, CAG, and state-finance records.',
    bestFor:
      'Long-run economic structure, labour, health, human development, debt, and fiscal context.',
    limitations:
      'A synthesis rather than the controlling record for each underlying series; debt definitions differ from budget documents.',
    publishedDate: '2025-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'mospi-state-sdp-2024',
    title: 'State-wise domestic product series as on March 15, 2024',
    publisher: 'Ministry of Statistics and Programme Implementation',
    url: 'https://mospi.gov.in/sites/default/files/press_releases_statements/State_wise_SDP_as_on_15032024.xls',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Primary comparable state domestic-product workbook with constant-price per-capita NSDP series.',
    bestFor:
      'Inflation-adjusted state output per resident from 2011-12 through 2023-24.',
    limitations:
      'State estimates are revised and economic output per person is not household income or proof of CM causation.',
    publishedDate: '2024-03-15',
    accessedDate: reviewedAt,
  },
  {
    id: 'nfhs4-tn',
    title: 'NFHS-4 State Fact Sheet: Tamil Nadu',
    publisher: 'Ministry of Health and Family Welfare and IIPS',
    url: 'https://dhsprogram.com/pubs/pdf/OF31/OF31.TN.pdf',
    sourceType: 'official-survey',
    reliability: 5,
    ratingReason:
      'Official household survey benchmark with documented sampling and indicator definitions.',
    bestFor:
      'The 2015 electricity, sanitation, schooling, nutrition, and mortality baseline.',
    limitations:
      'Survey estimates have sampling uncertainty and overlap the end of one CM term and start of another.',
    publishedDate: '2017-01-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'nfhs5-tn',
    title: 'NFHS-5 State Fact Sheet: Tamil Nadu',
    publisher: 'Ministry of Health and Family Welfare and IIPS',
    url: 'https://dhsprogram.com/pubs/pdf/OF43/OF43.TN.pdf',
    sourceType: 'official-survey',
    reliability: 5,
    ratingReason:
      'Official state household survey with comparable NFHS-4 values and disclosed 2020 fieldwork dates.',
    bestFor:
      'Household services, schooling, health, nutrition, and mortality changes through 2019-21.',
    limitations:
      'Sparse survey rounds span more than one government and do not permit exclusive attribution.',
    publishedDate: '2021-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'prs-tn-budget-2019-20',
    title: 'Tamil Nadu Budget Analysis 2019-20',
    publisher: 'PRS Legislative Research',
    url: 'https://prsindia.org/files/budget/budget_state/tamil-nadu/2019/State%20Budget%20Analysis%20-%20Tamil%20Nadu%202019-20.pdf',
    sourceType: 'independent-budget-analysis',
    reliability: 4,
    ratingReason:
      'Transparent analysis reproducing official budget, deficit, capital, sector, and allocation figures.',
    bestFor:
      'A comparable EPS-government budget record and the distinction between estimates and execution.',
    limitations:
      'Secondary analysis of proposals; final spending and outcomes require accounts and audit evidence.',
    publishedDate: '2019-02-10',
    accessedDate: reviewedAt,
  },
  {
    id: 'prs-tn-budget-2021-22',
    title: 'Tamil Nadu Budget Analysis 2021-22',
    publisher: 'PRS Legislative Research',
    url: 'https://prsindia.org/files/budget/budget_state/tamil-nadu/2021/Tamil%20Nadu%20Budget%20Analysis%202021-22.pdf',
    sourceType: 'independent-budget-analysis',
    reliability: 4,
    ratingReason:
      'Transparent analysis reproducing official first-budget figures and pandemic-era fiscal context.',
    bestFor: 'The first Stalin-government budget and its welfare, health, road, and deficit choices.',
    limitations:
      'The proposal was made during COVID disruption and does not by itself prove final execution.',
    publishedDate: '2021-08-16',
    accessedDate: reviewedAt,
  },
  {
    id: 'prs-tn-budget-2025-26',
    title: 'Tamil Nadu Budget Analysis 2025-26',
    publisher: 'PRS Legislative Research',
    url: 'https://prsindia.org/files/budget/budget_state/tamil-nadu/2025/TN_Budget_Analysis_2025-26.pdf',
    sourceType: 'independent-budget-analysis',
    reliability: 4,
    ratingReason:
      'Transparent analysis of the official full budget, capital outlay, deficits, debt, committed expenditure, and sector allocations.',
    bestFor: 'The final full budget of the 2021-26 Stalin term.',
    limitations:
      'Budget estimates are proposals; the fiscal year was not complete when the government changed.',
    publishedDate: '2025-03-27',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-noon-meal-study',
    title: 'School meals and human capital: evidence from Tamil Nadu',
    publisher: 'National Bureau of Economic Research',
    url: 'https://www.nber.org/system/files/working_papers/w26937/w26937.pdf',
    sourceType: 'academic-study',
    reliability: 4,
    ratingReason:
      'Named empirical research examining long-run educational effects of Tamil Nadu meal-programme exposure.',
    bestFor:
      'Independent outcome evidence beyond government beneficiary totals.',
    limitations:
      'Historical causal estimates depend on identification assumptions and do not measure current food quality or delivery.',
    publishedDate: '2020-04-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-reservation-act-1994',
    title: 'Tamil Nadu Backward Classes, Scheduled Castes and Scheduled Tribes Act, 1993',
    publisher: 'Government of Tamil Nadu via PRS legislative archive',
    url: 'https://prsindia.org/files/bills_acts/acts_states/tamil-nadu/1994/1994TN45.pdf',
    sourceType: 'primary-law',
    reliability: 5,
    ratingReason:
      'Authoritative statutory text protecting the state reservation framework later placed in the Ninth Schedule.',
    bestFor: 'The design, coverage, and legal durability of the 69% reservation framework.',
    limitations:
      'The Act does not establish distributional outcomes, current caste shares, or constitutional proportionality.',
    publishedDate: '1994-07-19',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-samathuvapuram',
    title: 'Periyar Memorial Samathuvapuram scheme',
    publisher: 'Rural Development and Panchayat Raj Department, Tamil Nadu',
    url: 'https://tnrd.tn.gov.in/schemes/st_samathuvapuram.html',
    sourceType: 'official-programme-record',
    reliability: 5,
    ratingReason:
      'Official scheme record describing mixed-caste housing, shared facilities, and settlement design.',
    bestFor: 'Programme purpose, design, and implementation structure.',
    limitations:
      'The state description does not prove that physical integration eliminated discrimination or conflict.',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-cmchis',
    title: 'Chief Minister Comprehensive Health Insurance Scheme',
    publisher: 'Government of Tamil Nadu',
    url: 'https://www.cmchistn.com/',
    sourceType: 'official-programme-record',
    reliability: 5,
    ratingReason:
      'Official programme portal defining eligibility, hospital network, and covered tertiary-care services.',
    bestFor: 'Insurance design and current administrative coverage.',
    limitations:
      'Programme reach does not by itself establish health outcomes, provider quality, or complete financial protection.',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-electronics-policy-2020',
    title: 'Tamil Nadu Electronics Hardware Manufacturing Policy 2020',
    publisher: 'Government of Tamil Nadu',
    url: 'https://sipcotweb.tn.gov.in/uploads/policy/12/Policy.pdf',
    sourceType: 'official-policy',
    reliability: 5,
    ratingReason:
      'Primary policy text defining the state electronics investment, infrastructure, employment, and skills strategy.',
    bestFor: 'The policy design and implementation instruments adopted by the EPS government.',
    limitations:
      'Later exports also reflect Union incentives, global supply chains, inherited clusters, and private investment.',
    publishedDate: '2020-09-07',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-medical-admission-act-2020',
    title: 'Tamil Nadu medical admission preference for government-school students, Act 34 of 2020',
    publisher: 'India Code',
    url: 'https://www.indiacode.nic.in/bitstream/123456789/15431/1/tn_act_34_of_2020.pdf',
    sourceType: 'primary-law',
    reliability: 5,
    ratingReason:
      'Authoritative law creating the 7.5% horizontal preference in medical and dental admission.',
    bestFor: 'The exact eligibility, scope, and legal design of the access reform.',
    limitations:
      'The law does not prove school-quality improvement or long-run medical workforce outcomes.',
    publishedDate: '2020-10-29',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-spc-pudhumai-penn',
    title: 'Evaluation of the Pudhumai Penn higher-education assurance scheme',
    publisher: 'State Planning Commission, Government of Tamil Nadu',
    url: 'https://spc.tn.gov.in/evaluation-of-pudhumai-penn-scheme/',
    sourceType: 'official-programme-evaluation',
    reliability: 4,
    ratingReason:
      'Named evaluation with beneficiary-use, continuation, and higher-education transition findings.',
    bestFor: 'Early implementation and distributional evidence for Pudhumai Penn.',
    limitations:
      'Government-commissioned early evidence is not a long-run independent causal evaluation.',
    publishedDate: '2024-01-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-spc-kmut',
    title: 'Early impacts of Kalaignar Magalir Urimai Thogai',
    publisher: 'State Planning Commission, Government of Tamil Nadu',
    url: 'https://spc.tn.gov.in/wp-content/uploads/KMUT_Final.pdf',
    sourceType: 'official-programme-evaluation',
    reliability: 4,
    ratingReason:
      'Named early evaluation reporting coverage, household use, autonomy, and inclusion findings.',
    bestFor: 'Early outcome and exclusion evidence for the monthly women-headed-household transfer.',
    limitations:
      'The evaluation is early, government-commissioned, and cannot establish long-run labour or poverty effects.',
    publishedDate: '2025-01-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-spc-vidiyal',
    title: 'Vidiyal Payanam free-bus-travel scheme brief',
    publisher: 'State Planning Commission, Government of Tamil Nadu',
    url: 'https://spc.tn.gov.in/vidiyal-payanam-scheme/',
    sourceType: 'official-programme-evaluation',
    reliability: 4,
    ratingReason:
      'Named scheme review describing travel savings, work access, and mobility effects.',
    bestFor: 'Early evidence on women and transgender passenger mobility.',
    limitations:
      'The state review does not fully measure crowding, service quality, transport-corporation finance, or causal job effects.',
    publishedDate: '2022-01-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'morth-road-accidents-2024-tn',
    title: 'Road Accidents in India 2024',
    publisher: 'Ministry of Road Transport and Highways',
    url: 'https://morth.gov.in/backend/documents/uploaded/1781177676_V1gUW8tJWT.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'National statistical report publishing comparable state crash and fatality totals.',
    bestFor: 'Tamil Nadu road-safety outcomes and the counterweight to road-output credit.',
    limitations:
      'Police-reported crashes may be under-recorded and do not isolate infrastructure, enforcement, vehicle use, or emergency care.',
    publishedDate: '2026-06-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-cag-chennai-floods',
    title: 'Performance Audit of Flood Management and Response in Chennai and its Suburban Area',
    publisher: 'Comptroller and Auditor General of India',
    url: 'https://cag.gov.in/ag1/tamil-nadu/en/audit-report/details/45722',
    sourceType: 'constitutional-audit',
    reliability: 5,
    ratingReason:
      'Independent constitutional audit of planning, drainage, water-body protection, reservoir operation, and emergency response.',
    bestFor: 'Administrative accountability for the December 2015 Chennai floods.',
    limitations:
      'The audit assesses government systems; extreme rainfall and wider urban development also shaped harm.',
    publishedDate: '2017-07-10',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-thoothukudi-commission',
    title: 'Justice Aruna Jagadeesan Commission of Inquiry report, volume 4',
    publisher: 'Government of Tamil Nadu',
    url: 'https://cms.tn.gov.in/cms_migrated/document/docfiles/eng_vol_4.pdf',
    sourceType: 'official-commission-report',
    reliability: 5,
    ratingReason:
      'Controlling public inquiry record into the May 22, 2018 police firing and administrative conduct.',
    bestFor: 'Political and administrative accountability for the firing and response.',
    limitations:
      'A commission finding is not itself a criminal conviction; later disciplinary and court outcomes remain separate.',
    publishedDate: '2022-05-18',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-kallakurichi-nhrc',
    title: 'NHRC suo motu action on the Kallakurichi spurious-liquor deaths',
    publisher: 'National Human Rights Commission',
    url: 'https://nhrc.nic.in/media/press-release-archive',
    sourceType: 'official-rights-record',
    reliability: 5,
    ratingReason:
      'Official rights-body record of the reported deaths, notice, and state duty to prevent illicit-liquor harm.',
    bestFor: 'Initial official chronology and accountability questions.',
    limitations:
      'The initial notice used a developing death count and does not resolve final criminal or administrative responsibility.',
    publishedDate: '2024-06-21',
    accessedDate: reviewedAt,
  },
  {
    id: 'world-bank-tn-tsunami',
    title: 'India Emergency Tsunami Reconstruction Project',
    publisher: 'World Bank',
    url: 'https://projects.worldbank.org/en/projects-operations/project-detail/P094513',
    sourceType: 'multilateral-programme-record',
    reliability: 4,
    ratingReason:
      'Independent multilateral record of Tamil Nadu coastal damage, reconstruction finance, housing, livelihoods, and resilience work.',
    bestFor: 'The December 2004 tsunami recovery scope and programme outputs.',
    limitations:
      'Project records do not fully measure every loss, distributional outcome, or exclusive state-government credit.',
    publishedDate: '2005-05-03',
    accessedDate: reviewedAt,
  },
  {
    id: 'tn-jallikattu-law-2017',
    title: 'Prevention of Cruelty to Animals (Tamil Nadu Amendment) Act, 2017',
    publisher: 'Government of Tamil Nadu',
    url: 'https://www.indiacode.nic.in/bitstream/123456789/20480/1/tn_act_1_of_2017.pdf',
    sourceType: 'primary-law',
    reliability: 5,
    ratingReason:
      'Authoritative state amendment enacted after the January 2017 demonstrations.',
    bestFor: 'The exact legal response, exemptions, and state responsibility for the policy choice.',
    limitations:
      'The law does not resolve every animal-welfare, cultural-rights, or implementation dispute.',
    publishedDate: '2017-01-31',
    accessedDate: reviewedAt,
  },
  {
    id: 'imd-michaung-2023',
    title: 'Northeast Monsoon 2023 report, including Cyclone Michaung',
    publisher: 'India Meteorological Department',
    url: 'https://mausam.imd.gov.in/chennai/mcdata/ne_monsoon_2023.pdf',
    sourceType: 'official-hazard-report',
    reliability: 5,
    ratingReason:
      'Controlling meteorological chronology for the cyclone, rainfall, track, forecasts, and warnings.',
    bestFor: 'Hazard timing and intensity during the December 2023 Chennai flood emergency.',
    limitations:
      'Weather evidence does not assess drainage, land use, relief, restoration, or administrative accountability.',
    publishedDate: '2024-03-01',
    accessedDate: reviewedAt,
  },
]

export const tamilNaduJurisdictions: JurisdictionSeed[] = [
  {
    id: 'tamil-nadu',
    name: 'State of Tamil Nadu',
    shortName: 'Tamil Nadu',
    level: 'state',
    parentId: 'india',
    isoCode: 'IN-TN',
    validFrom: '1969-01-14',
    status: 'published',
  },
]

export const tamilNaduOffices: OfficeSeed[] = [
  {
    id: 'tamil-nadu-chief-minister',
    jurisdictionId: 'tamil-nadu',
    name: 'Chief Minister of Tamil Nadu',
    shortName: 'Chief Minister',
    role: 'head-of-government',
  },
]

export const tamilNaduPeople: PersonSeed[] = [
  { id: 'cn-annadurai', name: 'C. N. Annadurai', sortName: 'Annadurai, C. N.', deathDate: '1969-02-03' },
  { id: 'vr-nedunchezhiyan', name: 'V. R. Nedunchezhiyan', sortName: 'Nedunchezhiyan, V. R.', deathDate: '2000-01-12' },
  { id: 'm-karunanidhi', name: 'M. Karunanidhi', sortName: 'Karunanidhi, M.', birthDate: '1924-06-03', deathDate: '2018-08-07' },
  { id: 'mg-ramachandran', name: 'M. G. Ramachandran', sortName: 'Ramachandran, M. G.', birthDate: '1917-01-17', deathDate: '1987-12-24' },
  { id: 'vn-janaki', name: 'V. N. Janaki', sortName: 'Janaki, V. N.', deathDate: '1996-05-19' },
  { id: 'j-jayalalithaa', name: 'J. Jayalalithaa', sortName: 'Jayalalithaa, J.', birthDate: '1948-02-24', deathDate: '2016-12-05' },
  { id: 'o-panneerselvam', name: 'O. Panneerselvam', sortName: 'Panneerselvam, O.', birthDate: '1951-01-14' },
  { id: 'edappadi-palaniswami', name: 'Edappadi K. Palaniswami', sortName: 'Palaniswami, Edappadi K.', birthDate: '1954-05-12' },
  { id: 'mk-stalin', name: 'M. K. Stalin', sortName: 'Stalin, M. K.', birthDate: '1953-03-01' },
  { id: 'c-joseph-vijay', name: 'C. Joseph Vijay', sortName: 'Vijay, C. Joseph', birthDate: '1974-06-22' },
]

export const tamilNaduParties: PartySeed[] = [
  { id: 'dmk', name: 'Dravida Munnetra Kazhagam', shortName: 'DMK', color: '#d71920' },
  { id: 'aiadmk', name: 'All India Anna Dravida Munnetra Kazhagam', shortName: 'AIADMK', color: '#16834a' },
  { id: 'tvk', name: 'Tamilaga Vettri Kazhagam', shortName: 'TVK', color: '#8d2638' },
]

function unratedTerm(
  row: Omit<LeaderTermSeed, 'ratingSummary' | 'assessmentAsOf' | 'sourceIds'> & {
    reason: string
    sourceIds?: string[]
  },
): LeaderTermSeed {
  const { reason, sourceIds, ...term } = row
  return {
    ...term,
    ratingSummary: `Not rated: ${reason}`,
    assessmentAsOf: reviewedAt,
    sourceIds: sourceIds ?? ['tn-assembly-cm-list'],
  }
}

export const tamilNaduLeaderTerms: LeaderTermSeed[] = [
  unratedTerm({
    id: 'tn-annadurai-1969',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'cn-annadurai',
    partyId: 'dmk',
    startDate: '1969-01-14',
    endDate: '1969-02-03',
    mandateLabel: 'Final in-scope weeks of the 1967 DMK government',
    reason: 'the modern-state window contains only 21 days of this term.',
  }),
  unratedTerm({
    id: 'tn-nedunchezhiyan-1969',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'vr-nedunchezhiyan',
    partyId: 'dmk',
    startDate: '1969-02-03',
    endDate: '1969-02-10',
    isActing: true,
    reason: 'this was a seven-day acting succession.',
  }),
  unratedTerm({
    id: 'tn-karunanidhi-1969',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'm-karunanidhi',
    partyId: 'dmk',
    startDate: '1969-02-10',
    endDate: '1971-03-14',
    mandateLabel: 'Completion of the 1967 DMK mandate',
    reason: 'term-specific outcome and fiscal evidence remains too sparse for a comparable six-part score.',
  }),
  unratedTerm({
    id: 'tn-karunanidhi-1971',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'm-karunanidhi',
    partyId: 'dmk',
    startDate: '1971-03-15',
    endDate: '1976-01-31',
    mandateLabel: 'DMK government elected in 1971',
    reason: 'historical outcome, fiscal, integrity, and institutional evidence is not yet complete enough for a defensible term score.',
  }),
  unratedTerm({
    id: 'tn-mgr-1977',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'mg-ramachandran',
    partyId: 'aiadmk',
    startDate: '1977-06-30',
    endDate: '1980-02-17',
    mandateLabel: 'First AIADMK government',
    reason: 'the partial first MGR term lacks a complete term-specific evidence set.',
  }),
  {
    id: 'tn-mgr-1980',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'mg-ramachandran',
    partyId: 'aiadmk',
    startDate: '1980-06-09',
    endDate: '1985-02-09',
    mandateLabel: 'Second MGR government',
    ratingConfidence: 'low',
    ratingSummary:
      'Transformative school-meal and reservation reforms with exceptional inclusion and durability; reduced by sparse term-specific outcome data, institutional centralisation, and uneven execution evidence.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-assembly-cm-list', 'tn-noon-meal-study', 'tn-reservation-act-1994'],
  },
  unratedTerm({
    id: 'tn-mgr-1985',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'mg-ramachandran',
    partyId: 'aiadmk',
    startDate: '1985-02-10',
    endDate: '1987-12-24',
    mandateLabel: 'Third MGR government',
    reason: 'the health-constrained final term lacks sufficiently separated outcome and decision evidence.',
  }),
  unratedTerm({
    id: 'tn-nedunchezhiyan-1987',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'vr-nedunchezhiyan',
    partyId: 'aiadmk',
    startDate: '1987-12-24',
    endDate: '1988-01-07',
    isActing: true,
    reason: 'this was a short acting succession after MGR died.',
  }),
  unratedTerm({
    id: 'tn-janaki-1988',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'vn-janaki',
    partyId: 'aiadmk',
    startDate: '1988-01-07',
    endDate: '1988-01-30',
    reason: 'the disputed 23-day ministry is too short for an outcome rating.',
  }),
  unratedTerm({
    id: 'tn-karunanidhi-1989',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'm-karunanidhi',
    partyId: 'dmk',
    startDate: '1989-01-27',
    endDate: '1991-01-30',
    mandateLabel: 'DMK government elected in 1989',
    reason: 'the abbreviated term and incomplete comparable outcome record do not support a stable score.',
  }),
  {
    id: 'tn-jayalalithaa-1991',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'j-jayalalithaa',
    partyId: 'aiadmk',
    startDate: '1991-06-24',
    endDate: '1996-05-12',
    mandateLabel: 'First Jayalalithaa government',
    ratingConfidence: 'low',
    ratingSummary:
      'Important social-inclusion and reservation durability measures; materially reduced by integrity findings, executive centralisation, and institutional costs.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-assembly-cm-list', 'tn-reservation-act-1994'],
  },
  {
    id: 'tn-karunanidhi-1996',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'm-karunanidhi',
    partyId: 'dmk',
    startDate: '1996-05-13',
    endDate: '2001-05-13',
    mandateLabel: 'DMK government elected in 1996',
    ratingConfidence: 'low',
    ratingSummary:
      'Industrial and information-technology infrastructure plus social-inclusion reforms were meaningful; reduced by mixed crisis, law-and-order, durability, and execution evidence.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-assembly-cm-list', 'tn-samathuvapuram', 'tn-economic-survey-2025-26'],
  },
  unratedTerm({
    id: 'tn-jayalalithaa-2001',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'j-jayalalithaa',
    partyId: 'aiadmk',
    startDate: '2001-05-14',
    endDate: '2001-09-21',
    reason: 'the short appointment was invalidated and does not provide an outcome window.',
  }),
  unratedTerm({
    id: 'tn-panneerselvam-2001',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'o-panneerselvam',
    partyId: 'aiadmk',
    startDate: '2001-09-21',
    endDate: '2002-03-02',
    reason: 'this was a short transitional ministry under the existing mandate.',
  }),
  {
    id: 'tn-jayalalithaa-2002',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'j-jayalalithaa',
    partyId: 'aiadmk',
    startDate: '2002-03-02',
    endDate: '2006-05-12',
    mandateLabel: 'Restored AIADMK government under the 2001 mandate',
    ratingConfidence: 'medium',
    ratingSummary:
      'Rainwater harvesting, administrative delivery, and tsunami response lift the record; labour, rights, institutional, and integrity disputes keep it in the middle range.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-assembly-cm-list', 'niti-tn-macro-fiscal-2025'],
  },
  {
    id: 'tn-karunanidhi-2006',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'm-karunanidhi',
    partyId: 'dmk',
    startDate: '2006-05-13',
    endDate: '2011-05-15',
    mandateLabel: 'DMK minority government supported by alliance partners',
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong welfare, health-insurance, rural-service, and industrial continuity; reduced by recurring-cost pressure, institutional concentration, and integrity concerns.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-assembly-cm-list', 'tn-cmchis', 'niti-tn-macro-fiscal-2025'],
  },
  {
    id: 'tn-jayalalithaa-2011',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'j-jayalalithaa',
    partyId: 'aiadmk',
    startDate: '2011-05-16',
    endDate: '2014-09-27',
    mandateLabel: 'AIADMK government elected in 2011',
    ratingConfidence: 'medium',
    ratingSummary:
      'Canteens, health coverage, welfare, and industrial continuity were substantial; centralisation and integrity risks reduce the otherwise positive development record.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-assembly-cm-list', 'tn-cmchis', 'niti-tn-macro-fiscal-2025'],
  },
  unratedTerm({
    id: 'tn-panneerselvam-2014',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'o-panneerselvam',
    partyId: 'aiadmk',
    startDate: '2014-09-29',
    endDate: '2015-05-23',
    reason: 'the caretaker-like transition was shorter than one year and policy ownership is not separable.',
  }),
  {
    id: 'tn-jayalalithaa-2015',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'j-jayalalithaa',
    partyId: 'aiadmk',
    startDate: '2015-05-23',
    endDate: '2016-05-22',
    mandateLabel: 'Restored AIADMK government under the 2011 mandate',
    ratingConfidence: 'low',
    ratingSummary:
      'Welfare and service continuity remained strong, but the short term is dominated by the severe 2015 flood-management and urban-governance failure.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-assembly-cm-list', 'tn-cag-chennai-floods', 'nfhs5-tn'],
  },
  unratedTerm({
    id: 'tn-jayalalithaa-2016',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'j-jayalalithaa',
    partyId: 'aiadmk',
    startDate: '2016-05-23',
    endDate: '2016-12-05',
    mandateLabel: 'AIADMK government elected in 2016',
    reason: 'the final term lasted about six months and was interrupted by illness and death.',
  }),
  unratedTerm({
    id: 'tn-panneerselvam-2016',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'o-panneerselvam',
    partyId: 'aiadmk',
    startDate: '2016-12-06',
    endDate: '2017-02-15',
    reason: 'this was a short succession ministry.',
  }),
  {
    id: 'tn-palaniswami-2017',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'edappadi-palaniswami',
    partyId: 'aiadmk',
    startDate: '2017-02-16',
    endDate: '2021-05-06',
    mandateLabel: 'AIADMK government under the 2016 mandate',
    ratingConfidence: 'medium',
    ratingSummary:
      'Medical-admission access, electronics policy, roads, health-system investment, and administrative continuity were consequential; Thoothukudi, policing, crisis, and institutional failures cap the score.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'tn-assembly-cm-list',
      'tn-medical-admission-act-2020',
      'tn-electronics-policy-2020',
      'prs-tn-budget-2019-20',
      'tn-thoothukudi-commission',
    ],
  },
  {
    id: 'tn-stalin-2021',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'mk-stalin',
    partyId: 'dmk',
    startDate: '2021-05-07',
    endDate: '2026-05-09',
    mandateLabel: 'DMK-led Secular Progressive Alliance government',
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong real growth, poverty reduction, women-focused mobility and income support, education, health, and road delivery; reduced by debt and power-sector pressure, road deaths, justice gaps, recurrent flooding, and the Kallakurichi enforcement failure.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'eci-tn-2021',
      'tn-economic-survey-2025-26',
      'niti-tn-macro-fiscal-2025',
      'prs-tn-budget-2021-22',
      'prs-tn-budget-2025-26',
      'tn-spc-pudhumai-penn',
      'tn-spc-kmut',
      'tn-spc-vidiyal',
      'morth-road-accidents-2024-tn',
      'ncrb-crime-2023-part-i',
      'ncrb-crime-2023-part-ii',
      'tn-kallakurichi-nhrc',
    ],
  },
  unratedTerm({
    id: 'tn-vijay-2026',
    officeId: 'tamil-nadu-chief-minister',
    personId: 'c-joseph-vijay',
    partyId: 'tvk',
    startDate: '2026-05-10',
    governmentName: 'TVK-led coalition government',
    mandateLabel: 'TVK 108 seats with coalition support',
    reason: 'the government is only about 75 days old and has no completed budget or observable outcome window.',
    sourceIds: ['eci-tn-2026', 'tn-lok-bhavan-vijay-2026'],
  }),
]

const evaluationDimensionIds = [
  'outcomes',
  'reforms',
  'inclusion',
  'crisis',
  'institutions',
  'integrity',
] as const

const tamilNaduLeaderComponents: Record<string, number[]> = {
  'tn-mgr-1980': [7, 8, 8, 6.5, 5.5, 6.5],
  'tn-jayalalithaa-1991': [6.5, 6.8, 7, 6, 4.5, 3.8],
  'tn-karunanidhi-1996': [7.2, 7.4, 7.2, 6, 6.2, 6],
  'tn-jayalalithaa-2002': [7, 7.5, 6.7, 6, 4.8, 5],
  'tn-karunanidhi-2006': [7.1, 7, 7.5, 5.8, 5.3, 4.8],
  'tn-jayalalithaa-2011': [7.2, 7, 7.3, 6, 5.2, 4],
  'tn-jayalalithaa-2015': [6.4, 6.5, 6.8, 3.8, 5, 4.2],
  'tn-palaniswami-2017': [6.7, 6.8, 6.5, 5.8, 4.8, 5.5],
  'tn-stalin-2021': [7.4, 7.5, 8, 6, 5.8, 6.2],
}

const tamilNaduLeaderRationales: Record<string, string[]> = {
  'tn-mgr-1980': [
    'The meal programme and industrial-social base improved human-capital conditions, but annual term-specific outcome data are sparse.',
    'The 1982 nutritious-meal expansion and reservation changes became durable state institutions.',
    'Universal school meals and broader reservation access were exceptionally inclusive.',
    'The government retained public order and service delivery, while evidence on disaster and security performance is incomplete.',
    'Executive leadership was highly personalised and checks within the governing system were limited.',
    'Large-scale delivery was real, but historical audit and implementation-quality evidence is uneven.',
  ],
  'tn-jayalalithaa-1991': [
    'Industrial and social programmes expanded, while outcome attribution remains limited by sparse historical series.',
    'The reservation-protection framework and girl-child initiatives were consequential and durable.',
    'Reservation and targeted welfare widened access, though distributional evidence remains incomplete.',
    'The state faced major law-and-order and social-conflict challenges with a mixed record.',
    'Executive centralisation and pressure on institutional restraint materially reduce the score.',
    'Serious integrity findings and administrative concentration outweigh some implementation strengths.',
  ],
  'tn-karunanidhi-1996': [
    'Information-technology, industrial, and service-sector capacity expanded during a favourable national transition.',
    'TIDEL, investment infrastructure, and Samathuvapuram were meaningful institutional and social innovations.',
    'Mixed-caste settlements and welfare initiatives strengthened the inclusion record, with uneven social outcomes.',
    'The Coimbatore violence and related policing failures reduce crisis and security performance.',
    'Electoral and civic institutions operated, but political and administrative concentration remained material.',
    'Project delivery was substantial; corruption and implementation evidence is mixed rather than clean.',
  ],
  'tn-jayalalithaa-2002': [
    'The economy and public services recovered while the state strengthened urban water resilience and disaster response.',
    'Mandatory rainwater harvesting was a clear, durable reform with state-wide relevance.',
    'Health, water, and welfare access improved, though some labour and service decisions imposed concentrated burdens.',
    'The tsunami response and reconstruction were material strengths, balanced by other public-order disputes.',
    'Employee dismissals, protest response, and centralised decision-making reduce the institutions score.',
    'Administrative drive was strong, while consultation and integrity concerns keep execution below the top tier.',
  ],
  'tn-karunanidhi-2006': [
    'Industrial continuity, services, household welfare, and public health capacity expanded before the global and domestic slowdown.',
    'Health insurance, rural infrastructure, and local-service programmes created durable access channels.',
    'Transfers, health coverage, education support, and social policy gave the term a strong inclusion orientation.',
    'Crisis performance was mixed and lacks the same strength as the policy and welfare record.',
    'Institutional concentration and party-government overlap reduce the score.',
    'Programme rollout was substantial, but integrity exposure and recurring-cost pressure materially lower confidence.',
  ],
  'tn-jayalalithaa-2011': [
    'Canteens, health coverage, services, and industrial investment supported a broadly positive development record.',
    'Amma canteens and the health-insurance redesign became durable delivery institutions.',
    'Low-cost food, welfare, and public services had strong reach among poorer and informal workers.',
    'The pre-flood part of the term maintained service continuity, though urban resilience remained underprepared.',
    'Personalised executive control and limited internal checks reduce institutional quality.',
    'Delivery capacity was high, but integrity findings and fiscal opacity materially lower the score.',
  ],
  'tn-jayalalithaa-2015': [
    'Welfare and service systems continued, but a one-year window provides limited outcome evidence.',
    'Existing programmes persisted without a comparable new reform record.',
    'Canteens, health coverage, and welfare retained broad reach during crisis.',
    'The CAG identified major planning, drainage, water-body, coordination, and response failures in the 2015 floods.',
    'Centralised administration and weak flood-governance accountability reduce the institutions score.',
    'Emergency relief was substantial, but preventable system failures and integrity concerns weigh heavily.',
  ],
  'tn-palaniswami-2017': [
    'Growth, infrastructure, health-system investment, and government-school medical access improved across a difficult transition and pandemic.',
    'The 7.5% medical preference and electronics policy were durable, consequential reforms.',
    'Medical access, welfare continuity, housing, and public services supported inclusion, though distribution remained uneven.',
    'COVID administration and continuity provide credit; the Thoothukudi firing is a severe crisis and public-order failure.',
    'The commission findings on Thoothukudi and wider political instability materially reduce institutional performance.',
    'The government maintained administration and investment, while policing accountability and execution gaps cap the score.',
  ],
  'tn-stalin-2021': [
    'Real growth, per-capita output, multidimensional-poverty, labour, education, health, and road-output signals were broadly positive, with shared attribution.',
    'Doorstep health, higher-education support, skills, breakfast, mobility, and women-focused cash support created a coherent capability agenda.',
    'Pudhumai Penn, Vidiyal Payanam, KMUT, breakfast, reservation, and public services produced the strongest component score.',
    'Cyclone and flood response was mixed; Kallakurichi exposed a serious prevention and enforcement failure.',
    'Competitive politics continued, while police accountability, protest management, and executive-party concentration keep the score moderate.',
    'Documented programme and road delivery is strong, but debt, power-sector exposure, road fatalities, justice pendency, and execution gaps reduce confidence.',
  ],
}

export const tamilNaduLeaderScores: LeaderScoreSeed[] = Object.entries(
  tamilNaduLeaderComponents,
).flatMap(([termId, scores]) =>
  scores.map((score, index) => ({
    termId,
    dimensionId: evaluationDimensionIds[index],
    score,
    rationale: tamilNaduLeaderRationales[termId][index],
    })),
)

const policyDimensionIds = [
  'problem-design',
  'effectiveness',
  'implementation',
  'rights-inclusion',
  'durability-side-effects',
] as const

const tamilNaduPolicyComponents: Record<string, Array<number | null>> = {
  'tn-noon-meal-1982': [8.5, 8.5, 8, 9.5, 7.5],
  'tn-reservation-protection-1994': [8, 8, 7.5, 8.5, 6],
  'tn-samathuvapuram-1997': [8, 6, 6.5, 8, 4.5],
  'tn-rainwater-harvesting-2003': [8.5, 7.5, 8, 7.5, 7.5],
  'tn-health-insurance-2009': [8, 7.5, 7.5, 8, 6.5],
  'tn-amma-canteens-2013': [8, 7.5, 7, 8.5, 5],
  'tn-medical-admission-preference-2020': [8.5, 8.5, 8, 9, 6.5],
  'tn-electronics-manufacturing-2020': [8, 8, 7.5, 7.5, 6.5],
  'tn-makkalai-thedi-maruthuvam-2021': [8.5, 8, 8.5, 8.5, 7],
  'tn-vidiyal-payanam-2021': [8.5, 7.5, 8, 9, 6.5],
  'tn-breakfast-scheme-2022': [8.5, 7.5, 8.5, 9, 6.5],
  'tn-naan-mudhalvan-2022': [8.5, 7.5, 8, 8, 6.5],
  'tn-pudhumai-penn-2022': [8.5, 8, 8.5, 9, 6.5],
  'tn-kmut-2023': [8, 7.5, 7.5, 8, 5.5],
  'tn-road-renewal-2021': [8, 7.5, 7.5, 7.5, 5.5],
}

function policyRating(policyId: string) {
  const weights = [0.2, 0.3, 0.2, 0.15, 0.15]
  let weighted = 0
  let available = 0
  tamilNaduPolicyComponents[policyId].forEach((score, index) => {
    if (score === null) return
    weighted += score * weights[index]
    available += weights[index]
  })
  return Math.round((weighted / available) * 10) / 10
}

export const tamilNaduPolicies: PolicySeed[] = [
  {
    id: 'tn-noon-meal-1982',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-mgr-1980',
    title: 'Puratchi Thalaivar MGR Nutritious Meal Programme expansion',
    shortTitle: 'Statewide nutritious school meals',
    policyType: 'school-nutrition',
    introducedDate: '1982-07-01',
    effectiveDate: '1982-07-01',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Expanded cooked meals for schoolchildren statewide, reducing the direct household cost of attendance and linking nutrition to public education.',
    intendedGoal:
      'Improve child nutrition, attendance, enrolment, and the ability of poorer households to keep children in school.',
    ratingScore: policyRating('tn-noon-meal-1982'),
    ratingConfidence: 'high',
    ratingSummary:
      'A highly inclusive and durable human-capital reform with independent evidence of education benefits; reduced by recurring food-quality, kitchen, monitoring, and nutrition-composition risks.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-noon-meal-study', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-reservation-protection-1994',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-jayalalithaa-1991',
    title: 'Statutory and constitutional protection of the 69% reservation framework',
    shortTitle: '69% reservation protection',
    policyType: 'affirmative-action',
    introducedDate: '1993-11-09',
    enactedDate: '1994-07-19',
    effectiveDate: '1994-07-19',
    status: 'enacted',
    coverageStatus: 'reviewed',
    summary:
      'Placed the state reservation framework in statute and secured its later inclusion in the Ninth Schedule through the 76th Constitutional Amendment.',
    intendedGoal:
      'Preserve broad educational and public-employment access for Backward Classes, Most Backward Classes, Scheduled Castes, and Scheduled Tribes.',
    ratingScore: policyRating('tn-reservation-protection-1994'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong inclusion and exceptional cross-government durability; reduced by limited recent distribution evidence, constitutional scrutiny, and the need to assess benefits within reserved groups.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-reservation-act-1994', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-samathuvapuram-1997',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-karunanidhi-1996',
    title: 'Periyar Memorial Samathuvapuram mixed-caste settlements',
    shortTitle: 'Samathuvapuram',
    policyType: 'social-inclusion-housing',
    introducedDate: '1997-01-01',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Built planned settlements with caste-mixed housing and shared civic facilities to weaken residential segregation.',
    intendedGoal:
      'Create everyday social integration, equal civic access, and visible anti-caste public institutions.',
    ratingScore: policyRating('tn-samathuvapuram-1997'),
    ratingConfidence: 'low',
    ratingSummary:
      'A serious and symbolically important anti-segregation design that created real mixed settlements; reduced because physical proximity did not reliably eliminate hierarchy, discrimination, or surrounding conflict.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-samathuvapuram'],
  },
  {
    id: 'tn-rainwater-harvesting-2003',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-jayalalithaa-2002',
    title: 'Mandatory building-level rainwater harvesting',
    shortTitle: 'Rainwater harvesting mandate',
    policyType: 'water-security',
    introducedDate: '2003-07-19',
    effectiveDate: '2003-10-11',
    status: 'enacted',
    coverageStatus: 'reviewed',
    summary:
      'Required buildings to install rainwater-harvesting structures during acute urban and groundwater stress.',
    intendedGoal:
      'Increase local recharge, reduce dependence on distant supply, and make households and institutions part of water management.',
    ratingScore: policyRating('tn-rainwater-harvesting-2003'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strong, scalable response to chronic water stress with reported recharge benefits; reduced by maintenance, enforcement, water-quality, and causal-attribution limits.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['niti-tn-macro-fiscal-2025', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-health-insurance-2009',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-karunanidhi-2006',
    title: 'Kalaignar health insurance and the CMCHIS coverage continuum',
    shortTitle: 'Publicly financed health insurance',
    policyType: 'health-financing',
    introducedDate: '2009-07-23',
    effectiveDate: '2009-07-23',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Created cashless tertiary-care coverage for lower-income households, later redesigned and continued as CMCHIS.',
    intendedGoal:
      'Reduce catastrophic hospital costs and expand access to specialist treatment through public and empanelled private hospitals.',
    ratingScore: policyRating('tn-health-insurance-2009'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A durable cross-government access reform with substantial hospital reach; reduced because insurance cannot replace primary care, quality control, provider access, or all out-of-pocket costs.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-cmchis', 'niti-tn-macro-fiscal-2025'],
  },
  {
    id: 'tn-amma-canteens-2013',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-jayalalithaa-2011',
    title: 'Amma Unavagam municipal low-cost canteens',
    shortTitle: 'Amma canteens',
    policyType: 'food-security',
    introducedDate: '2013-02-19',
    effectiveDate: '2013-02-19',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Municipal canteens sold cooked staple meals at heavily subsidised prices, with priority employment for lower-income women.',
    intendedGoal:
      'Protect food access for poorer, migrant, elderly, and informal workers while creating local women-led employment.',
    ratingScore: policyRating('tn-amma-canteens-2013'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Highly accessible and valuable during normal hardship and disasters; reduced by municipal fiscal dependence, uneven maintenance, coverage variation, and limited independent nutrition evidence.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'niti-tn-macro-fiscal-2025'],
  },
  {
    id: 'tn-medical-admission-preference-2020',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-palaniswami-2017',
    title: '7.5% medical and dental admission preference for government-school students',
    shortTitle: 'Government-school medical preference',
    policyType: 'education-access',
    introducedDate: '2020-09-15',
    enactedDate: '2020-10-29',
    effectiveDate: '2020-10-29',
    status: 'enacted',
    coverageStatus: 'reviewed',
    summary:
      'Reserved a horizontal share of state-quota medical and dental seats for students educated in government schools.',
    intendedGoal:
      'Correct the severe access disadvantage government-school students faced after NEET-based selection.',
    ratingScore: policyRating('tn-medical-admission-preference-2020'),
    ratingConfidence: 'high',
    ratingSummary:
      'An unusually observable inclusion gain that moved government-school admissions from negligible levels to hundreds; reduced because it cannot substitute for school quality and exam preparation.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-medical-admission-act-2020', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-electronics-manufacturing-2020',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-palaniswami-2017',
    title: 'Tamil Nadu Electronics Hardware Manufacturing Policy 2020',
    shortTitle: 'Electronics manufacturing policy',
    policyType: 'industrial-policy',
    introducedDate: '2020-09-07',
    effectiveDate: '2020-09-07',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Combined investment incentives, industrial infrastructure, skills, clusters, and export ambition for electronics manufacturing.',
    intendedGoal:
      'Build a higher-value manufacturing base, attract global supply chains, create jobs, and increase electronics exports.',
    ratingScore: policyRating('tn-electronics-manufacturing-2020'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong design followed by major export and investment growth; credit remains shared with Union PLI, global supply-chain shifts, private firms, and inherited industrial capacity.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-electronics-policy-2020', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-makkalai-thedi-maruthuvam-2021',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'Makkalai Thedi Maruthuvam doorstep health programme',
    shortTitle: 'Doorstep chronic-care services',
    policyType: 'public-health',
    introducedDate: '2021-08-05',
    effectiveDate: '2021-08-05',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Moved hypertension, diabetes, physiotherapy, palliative care, medication, and follow-up services closer to homes.',
    intendedGoal:
      'Improve chronic-disease detection and continuity for older, poorer, rural, and mobility-limited residents.',
    ratingScore: policyRating('tn-makkalai-thedi-maruthuvam-2021'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A well-targeted primary-care reform with very large reach and positive access evidence; durable success depends on treatment continuity, disease control, workforce load, and independently verified outcomes.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'niti-tn-macro-fiscal-2025'],
  },
  {
    id: 'tn-vidiyal-payanam-2021',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'Magalir Vidiyal Payanam free ordinary-bus travel',
    shortTitle: 'Free bus travel for women',
    policyType: 'mobility-and-inclusion',
    introducedDate: '2021-05-07',
    effectiveDate: '2021-05-08',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Made ordinary state-bus travel free for women and later included transgender passengers.',
    intendedGoal:
      'Reduce household transport cost and increase independent access to work, education, markets, care, and public life.',
    ratingScore: policyRating('tn-vidiyal-payanam-2021'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strongly inclusive mobility reform with meaningful household savings and access gains; reduced by crowding, service quality, operator finance, and limited long-run employment evidence.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-spc-vidiyal', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-breakfast-scheme-2022',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'Chief Minister Breakfast Scheme',
    shortTitle: 'School breakfast',
    policyType: 'school-nutrition',
    introducedDate: '2022-09-15',
    effectiveDate: '2022-09-15',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Added a morning meal for primary-school pupils to the state school-nutrition system and later expanded coverage.',
    intendedGoal:
      'Reduce morning hunger, improve attendance and classroom readiness, and lower family food and care burdens.',
    ratingScore: policyRating('tn-breakfast-scheme-2022'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A coherent extension of a proven meal architecture with encouraging attendance evidence and 20 lakh reported beneficiaries; nutrition and learning effects need longer independent study.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'prs-tn-budget-2025-26'],
  },
  {
    id: 'tn-naan-mudhalvan-2022',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'Naan Mudhalvan industry-aligned skills programme',
    shortTitle: 'Naan Mudhalvan',
    policyType: 'skills-and-employment',
    introducedDate: '2022-03-01',
    effectiveDate: '2022-03-01',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Brought technical, digital, communication, career, and industry-linked training into colleges and polytechnics at scale.',
    intendedGoal:
      'Reduce the gap between formal education and the skills employers need, especially for first-generation students.',
    ratingScore: policyRating('tn-naan-mudhalvan-2022'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A broad and well-targeted skills reform reaching more than 2.7 million students with positive faculty and employer feedback; job placement, wage, and training-quality evidence remains incomplete.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-pudhumai-penn-2022',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'Pudhumai Penn higher-education assurance scheme',
    shortTitle: 'Pudhumai Penn',
    policyType: 'education-transfer',
    introducedDate: '2022-09-05',
    effectiveDate: '2022-09-05',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Pays monthly support to eligible government-school and Tamil-medium aided-school girls who enter higher education.',
    intendedGoal:
      'Reduce cost, mobility, and early-marriage barriers to college continuation for lower-income girls.',
    ratingScore: policyRating('tn-pudhumai-penn-2022'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strongly inclusive design with positive early transition and continuation evidence and nearly 6.92 lakh reported beneficiaries; longer independent outcome evidence is still needed.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-spc-pudhumai-penn', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-kmut-2023',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'Kalaignar Magalir Urimai Thogai',
    shortTitle: 'Women-headed-household income support',
    policyType: 'cash-transfer',
    introducedDate: '2023-09-15',
    effectiveDate: '2023-09-15',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Provides a monthly transfer to eligible women heads of households, framed partly as recognition of unpaid domestic work.',
    intendedGoal:
      'Strengthen routine spending capacity, autonomy, food and health security, and resilience to small financial shocks.',
    ratingScore: policyRating('tn-kmut-2023'),
    ratingConfidence: 'low',
    ratingSummary:
      'Wide early reach and positive autonomy and household-use signals; reduced by exclusion disputes, recurring fiscal cost, opportunity cost, and a short outcome window.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-spc-kmut', 'prs-tn-budget-2025-26'],
  },
  {
    id: 'tn-road-renewal-2021',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'State rural and urban road renewal programme, 2021-26',
    shortTitle: 'Road renewal and rural connectivity',
    policyType: 'road-infrastructure',
    introducedDate: '2021-08-13',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Combined urban-road restoration, the state village-road improvement programme, PMGSY, bridges, and NABARD-backed rural connectivity.',
    intendedGoal:
      'Improve all-weather access, freight and commuter movement, and links to schools, health services, farms, and markets.',
    ratingScore: policyRating('tn-road-renewal-2021'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Large documented delivery across urban and rural networks; sharply reduced by maintenance uncertainty, shared Union and local credit, and Tamil Nadu reporting 18,449 road deaths in 2024.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'prs-tn-budget-2025-26', 'morth-road-accidents-2024-tn'],
  },
]

const tamilNaduPolicyRationales: Record<string, string[]> = {
  'tn-noon-meal-1982': [
    'Child hunger and the cost of school attendance were large, direct barriers.',
    'Independent research links exposure to stronger schooling and later human-capital outcomes.',
    'The state built a durable school-based cooking and delivery system at very large scale.',
    'Universal meals strongly benefit poorer children and reduce stigma from narrow targeting.',
    'The institution endured across parties, while food quality, kitchens, staffing, and monitoring need continuous investment.',
  ],
  'tn-reservation-protection-1994': [
    'Persistent caste exclusion in education and public employment was a structural problem.',
    'The framework widened representation and access, though current within-group distribution needs better evidence.',
    'Statutory and constitutional protection made the policy administratively durable.',
    'The policy is strongly inclusion-oriented across multiple disadvantaged communities.',
    'Durability is high, while constitutional equality questions and insufficient contemporary data remain material.',
  ],
  'tn-samathuvapuram-1997': [
    'Residential segregation and unequal civic access were legitimate, visible problems.',
    'Mixed settlements created real integration but did not consistently erase caste hierarchy.',
    'Housing and shared facilities were delivered, with uneven social maintenance and revival cycles.',
    'The design directly included historically separated communities.',
    'Physical proximity alone could not prevent discrimination, conflict, or political reversal.',
  ],
  'tn-rainwater-harvesting-2003': [
    'Acute water scarcity and groundwater depletion required household and institutional action.',
    'Reported recharge gains are credible, although rainfall and wider water management complicate attribution.',
    'The mandate achieved rapid state-wide installation, with uneven later maintenance.',
    'Local recharge can benefit households and neighbourhoods, while compliance cost and tenancy conditions vary.',
    'The legal framework endured; neglected structures, enforcement, and water quality reduce the long-run score.',
  ],
  'tn-health-insurance-2009': [
    'Catastrophic hospital costs and specialist-care access were major barriers for lower-income households.',
    'Cashless tertiary treatment expanded materially, but full financial and health outcomes remain mixed.',
    'A broad hospital network and cross-government continuation demonstrate implementation capacity.',
    'Eligibility and public financing strongly support lower-income patients.',
    'The model endured, while provider incentives, primary-care gaps, exclusions, and out-of-pocket costs remain.',
  ],
  'tn-amma-canteens-2013': [
    'Urban food insecurity and the needs of informal and migrant workers were concrete problems.',
    'Canteens provided reliable low-cost meals and strong crisis value, with limited nutrition evaluation.',
    'Municipal delivery reached many locations but quality and maintenance varied.',
    'Pricing and location made the service unusually accessible to low-income residents.',
    'Dependence on municipal subsidy and political ownership creates fiscal and continuity risk.',
  ],
  'tn-medical-admission-preference-2020': [
    'Government-school students faced an extreme and documented NEET-era access disadvantage.',
    'Admissions rose from negligible levels to hundreds, making the direct inclusion effect observable.',
    'The horizontal preference is administratively clear and was implemented quickly.',
    'The reform strongly benefits lower-income and rural government-school students.',
    'It is durable while it remains lawful, but it does not solve weak schooling or exam-preparation quality.',
  ],
  'tn-electronics-manufacturing-2020': [
    'Tamil Nadu needed higher-value manufacturing, exports, skills, and supply-chain investment.',
    'Electronics exports and investment expanded strongly after adoption, with shared causation.',
    'Existing industrial agencies, clusters, and infrastructure supported implementation.',
    'The policy creates jobs and regional capacity, though job quality and distribution require monitoring.',
    'Global firms, Union incentives, and supply-chain concentration create subsidy and external-risk exposure.',
  ],
  'tn-makkalai-thedi-maruthuvam-2021': [
    'Ageing and chronic disease make facility-only care insufficient.',
    'Screening, medication, physiotherapy, and palliative reach expanded, with positive access evidence.',
    'Doorstep teams and primary-care links demonstrate strong delivery capacity.',
    'Older, poorer, rural, and mobility-limited residents benefit disproportionately.',
    'Durability depends on follow-up, workforce, data quality, medication supply, and measured disease control.',
  ],
  'tn-vidiyal-payanam-2021': [
    'Transport cost and dependence constrain women and transgender residents in work and education.',
    'Early evidence shows meaningful savings and mobility gains, while job effects remain less certain.',
    'The ordinary-bus entitlement was implemented at state scale.',
    'The policy directly expands autonomous mobility for a very large population.',
    'Transport-corporation finance, service quality, crowding, and fleet investment are material side effects.',
  ],
  'tn-breakfast-scheme-2022': [
    'Morning hunger and attendance barriers directly affect primary-school learning.',
    'State evaluation found attendance improvements in many schools, with longer nutrition and learning evidence pending.',
    'The programme scaled through the existing school-meal system to about 20 lakh children.',
    'Universal school delivery is inclusive and avoids narrow household screening.',
    'The scheme is institutionally compatible with noon meals, while food quality, kitchens, and recurring cost require monitoring.',
  ],
  'tn-naan-mudhalvan-2022': [
    'The gap between college curricula and modern employer needs is substantial.',
    'Faculty and employer feedback is positive, but placement and wage effects are not yet fully measured.',
    'The programme reached more than 2.7 million students and includes trainer development.',
    'Government-college and first-generation students receive valuable industry exposure.',
    'Course quality, employer dependence, rapid technology change, and measured labour outcomes determine durability.',
  ],
  'tn-pudhumai-penn-2022': [
    'Cost, transport, and early-marriage risks constrain girls moving from government school to college.',
    'Early evaluation reports stronger continuation and useful spending on fees, travel, and study costs.',
    'Monthly direct support reached nearly 6.92 lakh students by December 2025.',
    'The design strongly targets lower-income and rural girls from the public-school system.',
    'Long-run completion, employment, exclusion, and fiscal evidence remains incomplete.',
  ],
  'tn-kmut-2023': [
    'Routine household insecurity and women having limited control over cash are real problems.',
    'Early surveys report food, health, autonomy, and small-borrowing benefits, without long-run causal proof.',
    'The transfer achieved wide coverage quickly, while eligibility disputes show implementation friction.',
    'Women heads and disadvantaged households receive direct spending power.',
    'Recurring fiscal cost, exclusion error, work effects, and political durability remain open.',
  ],
  'tn-road-renewal-2021': [
    'Ageing roads and unequal rural and urban access constrain movement and services.',
    'The state reports 11,177 km of urban works and 12,572 km of village-road improvement, with shared credit.',
    'Delivery was large, but condition, completion timing, procurement, and maintenance evidence is uneven.',
    'Village, farm, student, patient, and lower-income mobility benefits are broadly distributed.',
    'Tamil Nadu road deaths, maintenance, drainage, and safety design materially reduce the durability score.',
  ],
}

export const tamilNaduPolicyScores: PolicyScoreSeed[] = Object.entries(
  tamilNaduPolicyComponents,
).flatMap(([policyId, scores]) =>
  scores.map((score, index) => ({
    policyId,
    dimensionId: policyDimensionIds[index],
    score,
    rationale: tamilNaduPolicyRationales[policyId][index],
    })),
)

export const tamilNaduEvents: EventSeed[] = [
  {
    id: 'tn-renamed-1969',
    jurisdictionId: 'tamil-nadu',
    date: '1969-01-14',
    title: 'Madras State formally becomes Tamil Nadu',
    summary:
      'The central naming law took effect after the state legislature had sought recognition of the Tamil-language state name.',
    significance:
      'This is the explicit validity boundary for the modern Tamil Nadu jurisdiction in India Mechanics.',
    category: 'state-formation',
    confidence: 'high',
    sourceIds: ['tn-name-act-1968', 'tn-assembly-cm-list'],
    leaderTermIds: ['tn-annadurai-1969'],
  },
  {
    id: 'tn-dmk-dismissal-1976',
    jurisdictionId: 'tamil-nadu',
    date: '1976-01-31',
    title: 'DMK government dismissed and President rule imposed',
    summary:
      'The Union dismissed the elected state government during the Emergency and placed Tamil Nadu under central rule.',
    significance:
      'A major federal and institutional rupture whose political fairness and Emergency context remain central to the term assessment.',
    category: 'institutions',
    confidence: 'high',
    sourceIds: ['tn-assembly-cm-list', 'india-constitution'],
    leaderTermIds: ['tn-karunanidhi-1971'],
  },
  {
    id: 'tn-noon-meal-expansion-1982',
    jurisdictionId: 'tamil-nadu',
    date: '1982-07-01',
    title: 'MGR government expands nutritious school meals statewide',
    summary:
      'Tamil Nadu expanded cooked meals for children at scale, linking food security, school participation, and social welfare.',
    significance:
      'The programme became one of the state model’s most durable and influential human-capital institutions.',
    category: 'social-policy',
    confidence: 'high',
    sourceIds: ['tn-noon-meal-study', 'tn-economic-survey-2025-26'],
    leaderTermIds: ['tn-mgr-1980'],
  },
  {
    id: 'tn-reservation-protection-1994',
    jurisdictionId: 'tamil-nadu',
    date: '1994-08-31',
    title: '69% reservation framework receives Ninth Schedule protection',
    summary:
      'Parliament enacted the 76th Constitutional Amendment after Tamil Nadu placed its reservation framework in state law.',
    significance:
      'The cross-government policy became unusually durable while continuing to raise questions about current data, distribution, and constitutional review.',
    category: 'social-policy',
    confidence: 'high',
    sourceIds: ['tn-reservation-act-1994', 'tn-economic-survey-2025-26'],
    leaderTermIds: ['tn-jayalalithaa-1991'],
  },
  {
    id: 'tn-tidel-park-2000',
    jurisdictionId: 'tamil-nadu',
    date: '2000-07-04',
    title: 'TIDEL Park opens in Chennai',
    summary:
      'The state-backed technology park created major office and digital infrastructure for the emerging IT and services cluster.',
    significance:
      'It became a visible milestone in Tamil Nadu moving from a manufacturing base toward a more diversified industrial and services economy.',
    category: 'infrastructure',
    confidence: 'high',
    sourceIds: ['tn-economic-survey-2025-26', 'niti-tn-macro-fiscal-2025'],
    leaderTermIds: ['tn-karunanidhi-1996'],
  },
  {
    id: 'tn-tsunami-2004',
    jurisdictionId: 'tamil-nadu',
    date: '2004-12-26',
    title: 'Indian Ocean tsunami devastates the Tamil Nadu coast',
    summary:
      'The tsunami caused mass death, displacement, housing loss, and livelihood destruction across coastal districts.',
    significance:
      'A defining test of relief, reconstruction, fishing-community inclusion, housing, and long-run coastal resilience.',
    category: 'disaster',
    confidence: 'high',
    sourceIds: ['world-bank-tn-tsunami'],
    leaderTermIds: ['tn-jayalalithaa-2002'],
  },
  {
    id: 'tn-chennai-floods-2015',
    jurisdictionId: 'tamil-nadu',
    date: '2015-12-01',
    endDate: '2015-12-05',
    title: 'Extreme rain and urban-system failures flood Chennai',
    summary:
      'Severe rainfall, reservoir releases, drainage constraints, encroachment, and weak coordination produced catastrophic flooding.',
    significance:
      'The CAG identified major state and local planning and response failures, making this a central negative in the 2015-16 term.',
    category: 'disaster',
    confidence: 'high',
    sourceIds: ['tn-cag-chennai-floods'],
    leaderTermIds: ['tn-jayalalithaa-2015'],
  },
  {
    id: 'tn-jallikattu-protests-2017',
    jurisdictionId: 'tamil-nadu',
    date: '2017-01-17',
    endDate: '2017-01-23',
    title: 'Jallikattu demonstrations produce a rapid state-law response',
    summary:
      'Large public demonstrations demanded a lawful route for the traditional event, and the state enacted an amendment after Union and judicial restrictions.',
    significance:
      'The episode combined mass democratic participation, cultural identity, animal welfare, protest policing, and fast legislative action.',
    category: 'protest',
    confidence: 'high',
    sourceIds: ['tn-jallikattu-law-2017'],
    leaderTermIds: ['tn-panneerselvam-2016'],
  },
  {
    id: 'tn-thoothukudi-firing-2018',
    jurisdictionId: 'tamil-nadu',
    date: '2018-05-22',
    title: 'Police fire on anti-Sterlite protesters in Thoothukudi',
    summary:
      'Police firing during the one-hundredth day of protest killed civilians and produced a major commission inquiry into command, intelligence, and use of force.',
    significance:
      'A grave state public-order and rights failure that materially lowers the EPS government institutions and crisis scores.',
    category: 'protest',
    confidence: 'high',
    sourceIds: ['tn-thoothukudi-commission'],
    leaderTermIds: ['tn-palaniswami-2017'],
  },
  {
    id: 'tn-michaung-floods-2023',
    jurisdictionId: 'tamil-nadu',
    date: '2023-12-03',
    endDate: '2023-12-05',
    title: 'Cyclone Michaung brings severe Chennai flooding',
    summary:
      'Extreme rainfall from Cyclone Michaung inundated Chennai and surrounding districts, disrupting homes, transport, power, and essential services.',
    significance:
      'The repeat flood exposed continuing drainage, land-use, maintenance, and urban-resilience gaps despite major investment.',
    category: 'disaster',
    confidence: 'high',
    sourceIds: ['imd-michaung-2023', 'tn-economic-survey-2025-26'],
    leaderTermIds: ['tn-stalin-2021'],
  },
  {
    id: 'tn-kallakurichi-hooch-2024',
    jurisdictionId: 'tamil-nadu',
    date: '2024-06-18',
    endDate: '2024-06-20',
    title: 'Kallakurichi spurious-liquor disaster exposes enforcement failure',
    summary:
      'Methanol-contaminated illicit liquor caused mass poisoning and deaths, followed by arrests, treatment, investigation, and political accountability demands.',
    significance:
      'Direct criminal responsibility belongs to sellers and suppliers, while prevention, intelligence, prohibition enforcement, and local police failures belong primarily to the state system.',
    category: 'public-safety',
    confidence: 'medium',
    sourceIds: ['tn-kallakurichi-nhrc'],
    leaderTermIds: ['tn-stalin-2021'],
  },
  {
    id: 'tn-road-delivery-and-safety-2025',
    jurisdictionId: 'tamil-nadu',
    date: '2025-03-14',
    title: 'Large road-delivery record coexists with 18,449 road deaths',
    summary:
      'The state reported more than 11,000 km of urban-road works and 12,572 km of village-road improvement, while the Union recorded 18,449 road deaths in 2024.',
    significance:
      'Infrastructure delivery deserves real credit, but road safety, maintenance, drainage, enforcement, and emergency care must reduce any blanket success claim.',
    category: 'infrastructure',
    confidence: 'high',
    sourceIds: ['tn-economic-survey-2025-26', 'morth-road-accidents-2024-tn'],
    leaderTermIds: ['tn-stalin-2021'],
    indicatorIds: ['tn-rural-roads-improved', 'tn-road-accident-deaths'],
  },
  {
    id: 'tn-vijay-government-2026',
    jurisdictionId: 'tamil-nadu',
    date: '2026-05-10',
    title: 'C. Joseph Vijay takes office after TVK-led election victory',
    summary:
      'Vijay was sworn in as Chief Minister after TVK won 108 Assembly seats and secured coalition support.',
    significance:
      'The peaceful transfer ended nearly six decades in which every elected government was led by DMK or AIADMK, while the new administration remains too young to rate.',
    category: 'elections',
    confidence: 'high',
    sourceIds: ['eci-tn-2026', 'tn-lok-bhavan-vijay-2026'],
    leaderTermIds: ['tn-vijay-2026'],
  },
]

export const tamilNaduEventAssessments: EventAssessmentSeed[] = [
  {
    eventId: 'tn-renamed-1969',
    choiceAssessment: 'mostly-right',
    choiceScore: 8.5,
    choiceReason:
      'The name change aligned the constitutional state name with its language, public identity, and democratic demand without altering the boundary.',
    unionRole:
      'Parliament enacted the central law and the Union brought it into force.',
    stateLocalRole:
      'The state legislature and political leadership initiated and sustained the demand.',
    positiveOutcomes:
      'The constitutional name became more legible to residents and the rest of India.',
    lessons:
      'Boundary and naming changes should always carry explicit validity dates in historical datasets.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'Parliament and Union government',
        responsibilityKind: 'policy-decision',
        level: 4,
        assessment: 'Enacted and commenced the naming law.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Tamil Nadu legislature and Annadurai government',
        responsibilityKind: 'positive-leadership',
        level: 4,
        assessment: 'Advanced the democratic naming demand.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'tn-dmk-dismissal-1976',
    choiceAssessment: 'contested',
    choiceScore: 3.5,
    choiceReason:
      'The dismissal occurred under Emergency-era central power and removed an elected state government; allegations against the ministry do not erase the federal and democratic costs of Article 356 intervention.',
    unionRole:
      'The Union executive made the dismissal and President-rule decision.',
    stateLocalRole:
      'The Karunanidhi ministry bore responsibility for its own governance record but did not control the central dismissal.',
    positiveOutcomes:
      'Later constitutional doctrine imposed stronger judicial limits on arbitrary Article 356 use.',
    lessons:
      'Federal dismissal requires a demonstrable constitutional breakdown, transparent evidence, and judicially reviewable reasons.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'Union government during the Emergency',
        responsibilityKind: 'policy-decision',
        level: 5,
        assessment: 'Dismissed the elected ministry and imposed central rule.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Karunanidhi government',
        responsibilityKind: 'shared-context',
        level: 2,
        assessment: 'Its governance and allegation record formed part of the stated context, not the source of Union constitutional power.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'tn-noon-meal-expansion-1982',
    choiceAssessment: 'mostly-right',
    choiceScore: 8.5,
    choiceReason:
      'The programme addressed hunger and school access through a universal, durable delivery institution with independently supported education benefits.',
    unionRole:
      'The Union later expanded national school-meal support, but this state decision preceded and helped shape that wider model.',
    stateLocalRole:
      'The MGR government designed and financed the expansion; schools, kitchens, local bodies, and workers delivered it.',
    positiveOutcomes:
      'Meals reduced household cost, supported attendance, and became a platform for later nutrition policy.',
    lessons:
      'Universal welfare can be both inclusive and politically durable when service quality and frontline capacity are funded.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'MGR government',
        responsibilityKind: 'positive-leadership',
        level: 5,
        assessment: 'Expanded the programme statewide and made it a core public institution.',
        confidence: 'high',
      },
      {
        actorType: 'local-administration',
        actorName: 'Schools, local bodies, and meal workers',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Converted the entitlement into daily meals.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'tn-reservation-protection-1994',
    choiceAssessment: 'mostly-right',
    choiceScore: 7.6,
    choiceReason:
      'The policy protected broad affirmative-action access and reflected a long cross-government settlement, while contemporary distribution data and constitutional proportionality still require scrutiny.',
    unionRole:
      'Parliament enacted the 76th Constitutional Amendment and placed the state law in the Ninth Schedule.',
    stateLocalRole:
      'Successive MGR, Karunanidhi, and Jayalalithaa governments shaped, expanded, and protected the framework.',
    positiveOutcomes:
      'The policy became highly durable and supported wider education and public-employment access.',
    lessons:
      'Durable affirmative action still needs current caste-distribution, exclusion, completion, and mobility evidence.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Successive Tamil Nadu governments',
        responsibilityKind: 'policy-decision',
        level: 5,
        assessment: 'Built and defended the state reservation framework across party changes.',
        confidence: 'high',
      },
      {
        actorType: 'union-government',
        actorName: 'Parliament',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Provided the constitutional protection requested by the state.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'tn-tidel-park-2000',
    choiceAssessment: 'mostly-right',
    choiceScore: 7.8,
    choiceReason:
      'State-backed shared infrastructure was a well-targeted way to reduce entry barriers for an emerging technology cluster.',
    unionRole:
      'National telecom, trade, tax, and software policy enabled the wider sector but did not own the state project.',
    stateLocalRole:
      'The Karunanidhi government and state industrial agencies planned and delivered the park and surrounding ecosystem.',
    positiveOutcomes:
      'The project helped anchor a large IT and services cluster and later regional technology-park strategy.',
    lessons:
      'Cluster infrastructure works best when paired with skills, transport, housing, power, and geographically broader opportunity.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Karunanidhi government, TIDCO, and ELCOT',
        responsibilityKind: 'positive-leadership',
        level: 5,
        assessment: 'Created and delivered the state-backed technology infrastructure.',
        confidence: 'high',
      },
      {
        actorType: 'structural',
        actorName: 'India software and telecom expansion',
        responsibilityKind: 'shared-context',
        level: 3,
        assessment: 'Provided the national market and technology conditions for rapid growth.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'tn-tsunami-2004',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The tsunami was a natural hazard; the relevant judgment concerns warning, relief, housing, livelihoods, inclusion, and resilient reconstruction.',
    unionRole:
      'Union disaster, defence, finance, and reconstruction institutions provided rescue and major support.',
    stateLocalRole:
      'The Jayalalithaa government, districts, local bodies, and coastal communities led frontline relief and reconstruction.',
    positiveOutcomes:
      'Large reconstruction programmes restored housing and infrastructure and strengthened later disaster institutions.',
    lessons:
      'Recovery must protect fishing livelihoods, land tenure, community consent, evacuation access, and coastal ecosystems.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'structural',
        actorName: 'Indian Ocean tsunami',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Created the physical disaster.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Jayalalithaa government and district administrations',
        responsibilityKind: 'positive-leadership',
        level: 4,
        assessment: 'Led relief, resettlement, and reconstruction.',
        confidence: 'medium',
      },
      {
        actorType: 'union-government',
        actorName: 'Union disaster and defence institutions',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Supported rescue, finance, and recovery.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'tn-chennai-floods-2015',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'Extreme rain was not a policy choice, but the scale of harm was shaped by drainage, water-body protection, reservoir operation, planning, warning, and coordination failures.',
    unionRole:
      'Union forecasting, armed forces, and national disaster systems provided warnings and emergency support.',
    stateLocalRole:
      'The state, Chennai agencies, reservoir managers, and local bodies owned urban planning, drainage, releases, relief, and restoration.',
    positiveOutcomes:
      'Large public, civil-society, and government rescue efforts saved lives and later drove resilience investment.',
    lessons:
      'Publish reservoir protocols, protect floodplains, maintain drains, coordinate warnings, and audit completed resilience work before the next storm.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'structural',
        actorName: 'Extreme northeast-monsoon rainfall',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Created the severe natural hazard.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Jayalalithaa government and state water and disaster agencies',
        responsibilityKind: 'failure-to-prevent',
        level: 5,
        assessment: 'Owned major planning, reservoir, coordination, and preparedness failures identified by audit.',
        confidence: 'high',
      },
      {
        actorType: 'local-administration',
        actorName: 'Greater Chennai and suburban planning and drainage bodies',
        responsibilityKind: 'failure-to-prevent',
        level: 4,
        assessment: 'Shared responsibility for drainage, encroachment, land-use, and local response gaps.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'tn-jallikattu-protests-2017',
    choiceAssessment: 'mixed',
    choiceScore: 6.5,
    choiceReason:
      'The rapid democratic response and largely peaceful mobilisation were strengths; animal welfare, legal durability, and the final protest-clearance tactics remain serious counterarguments.',
    unionRole:
      'Union animal-welfare law and central approvals shaped the legal context.',
    stateLocalRole:
      'The state government drafted the amendment and owned protest policing and implementation.',
    positiveOutcomes:
      'Mass participation produced a lawful state response rather than prolonged executive improvisation.',
    lessons:
      'Cultural-policy disputes need consultation, enforceable welfare standards, lawful legislation, and restrained protest policing.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'public-electorate',
        actorName: 'Jallikattu demonstrators and civil society',
        responsibilityKind: 'direct-action',
        level: 4,
        assessment: 'Created the democratic pressure for a legal response.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Panneerselvam government and Tamil Nadu legislature',
        responsibilityKind: 'policy-decision',
        level: 4,
        assessment: 'Enacted the state amendment and owned policing.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'tn-thoothukudi-firing-2018',
    choiceAssessment: 'wrong',
    choiceScore: 1.5,
    choiceReason:
      'The use of lethal police force and the command and administrative failures documented by the inquiry were disproportionate and incompatible with accountable protest management.',
    unionRole:
      'Union environmental and corporate-law institutions shared the wider regulatory context but did not command state police.',
    stateLocalRole:
      'The EPS government, district administration, and police owned public order, intelligence, crowd management, use of force, and accountability.',
    positiveOutcomes:
      'The later commission created a detailed public record and recommendations; this corrective scrutiny does not excuse the deaths.',
    lessons:
      'Police command, graduated force, medical response, independent investigation, environmental grievance handling, and public disclosure must be strengthened.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Tamil Nadu police and district administration',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Carried out and commanded the lethal firing and protest response.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'EPS government',
        responsibilityKind: 'failure-to-prevent',
        level: 5,
        assessment: 'Held political and administrative responsibility for policing, intelligence, and accountability.',
        confidence: 'high',
      },
      {
        actorType: 'corporate',
        actorName: 'Sterlite Copper',
        responsibilityKind: 'shared-context',
        level: 3,
        assessment: 'Its operations and disputed environmental record were central to the protest context, not the police firing decision.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'tn-michaung-floods-2023',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The cyclone and extreme rainfall were natural hazards; accountability concerns drainage, land use, warning communication, relief, restoration, and whether lessons from 2015 were implemented.',
    unionRole:
      'IMD forecast the hazard and Union disaster and defence institutions supported response.',
    stateLocalRole:
      'The Stalin government, Chennai agencies, utilities, and local bodies owned drainage, relief, restoration, and resilience investment.',
    positiveOutcomes:
      'Forecasting and large-scale response reduced some risks, and later projects targeted drainage and water management.',
    lessons:
      'Repeated flooding requires public project maps, maintenance evidence, floodplain protection, reservoir protocols, and independent post-event audit.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'structural',
        actorName: 'Cyclone Michaung and extreme rainfall',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Created the immediate natural hazard.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Stalin government and state disaster and water agencies',
        responsibilityKind: 'failure-to-prevent',
        level: 3,
        assessment: 'Shared responsibility for residual drainage, planning, and resilience gaps after 2015.',
        confidence: 'medium',
      },
      {
        actorType: 'local-administration',
        actorName: 'Greater Chennai Corporation and metropolitan agencies',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Owned frontline drainage, relief, waste removal, and restoration.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'tn-kallakurichi-hooch-2024',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The poisonings were crimes, not a government policy choice; political judgment concerns prevention, illicit-market intelligence, local enforcement, emergency response, and accountability.',
    unionRole:
      'National criminal and chemical-control law provided part of the legal context, while policing and prohibition enforcement were state responsibilities.',
    stateLocalRole:
      'The Stalin government, district police, prohibition enforcement, and local administration owned prevention, intelligence, inspection, and emergency response.',
    positiveOutcomes:
      'Emergency treatment, arrests, investigation, and external scrutiny followed, without erasing preventable failures.',
    lessons:
      'Track illicit supply chains, police corruption risk, methanol diversion, local warnings, treatment readiness, and disciplinary outcomes publicly.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'non-state-group',
        actorName: 'Illicit-liquor suppliers and sellers',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Produced and distributed the poisonous alcohol.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Tamil Nadu police and prohibition-enforcement system',
        responsibilityKind: 'failure-to-prevent',
        level: 4,
        assessment: 'Failed to prevent and disrupt a lethal illicit market in time.',
        confidence: 'medium',
      },
      {
        actorType: 'local-administration',
        actorName: 'Kallakurichi district administration',
        responsibilityKind: 'failure-to-respond',
        level: 3,
        assessment: 'Shared responsibility for warning, inspection, and local emergency readiness.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'tn-road-delivery-and-safety-2025',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'Road kilometres and road deaths are observed outputs, not one decision. The policy is assessed separately on access, delivery, maintenance, safety, and shared attribution.',
    unionRole:
      'The Union co-financed PMGSY and controlled national highways and national vehicle-safety rules.',
    stateLocalRole:
      'The Stalin government, state road agencies, municipalities, districts, police, and emergency systems owned most delivery, maintenance, and state-road safety.',
    positiveOutcomes:
      'Large urban and rural improvement programmes expanded access and renewed ageing road assets.',
    lessons:
      'Publish road condition, travel time, maintenance, crashes, deaths, enforcement, and district distribution alongside completed kilometres.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Stalin government and Tamil Nadu road agencies',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Delivered large state and rural road programmes and owned safety policy on most roads.',
        confidence: 'high',
      },
      {
        actorType: 'union-government',
        actorName: 'Union road and rural-development ministries',
        responsibilityKind: 'implementation',
        level: 3,
        assessment: 'Co-financed and regulated important parts of the network.',
        confidence: 'high',
      },
      {
        actorType: 'structural',
        actorName: 'Vehicle growth, driver behaviour, road design, and emergency-care conditions',
        responsibilityKind: 'shared-context',
        level: 4,
        assessment: 'Jointly shape fatalities and prevent exclusive CM attribution.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'tn-vijay-government-2026',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'An election and constitutional transfer are democratic events rather than a government policy to score as right or wrong.',
    unionRole:
      'The Election Commission administered the poll under national election law.',
    stateLocalRole:
      'Tamil Nadu voters selected the Assembly; Lok Bhavan appointed and swore in the leader able to command support.',
    positiveOutcomes:
      'Power transferred peacefully and widened electoral competition beyond the two parties that had alternated for decades.',
    lessons:
      'A new mandate must be judged on enacted policy, execution, institutions, budgets, and observed outcomes rather than campaign sentiment.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'public-electorate',
        actorName: 'Tamil Nadu electorate',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Produced the democratic change of government.',
        confidence: 'high',
      },
      {
        actorType: 'institution',
        actorName: 'Election Commission and Lok Bhavan',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Administered the result and constitutional transfer.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Vijay government and coalition',
        responsibilityKind: 'shared-context',
        level: 2,
        assessment: 'Now owns future policy and execution, but has no outcome window yet.',
        confidence: 'high',
      },
    ],
  },
]

export const tamilNaduClaims: ClaimSeed[] = [
  {
    id: 'tn-boundary-context',
    jurisdictionId: 'tamil-nadu',
    eventId: 'tn-renamed-1969',
    title: 'Modern Tamil Nadu comparisons begin on January 14, 1969',
    body:
      'India Mechanics retains the earlier Madras State history as related context but does not silently label pre-renaming records as modern Tamil Nadu observations.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tn-name-act-1968', 'tn-assembly-cm-list'],
  },
  {
    id: 'tn-long-run-progress',
    jurisdictionId: 'tamil-nadu',
    title: 'Tamil Nadu combines high human development with a diversified industrial economy',
    body:
      'Real output per person, life expectancy, schooling, sanitation, higher education, manufacturing, and public services are strong relative to many states. The record is cumulative across parties, Union policy, firms, local bodies, and households rather than the product of one Chief Minister.',
    stance: 'achievement',
    category: 'state-progress',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'niti-tn-macro-fiscal-2025', 'mospi-state-sdp-2024', 'nfhs5-tn'],
  },
  {
    id: 'tn-mgr-meals-inclusion',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-mgr-1980',
    eventId: 'tn-noon-meal-expansion-1982',
    policyId: 'tn-noon-meal-1982',
    title: 'MGR made universal school meals a durable state institution',
    body:
      'The 1982 expansion lowered the household cost of schooling and independent research links programme exposure with stronger educational outcomes. Food quality and delivery still require continuous scrutiny.',
    stance: 'achievement',
    category: 'human-development',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tn-noon-meal-study', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-jayalalithaa-reservation-durability',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-jayalalithaa-1991',
    eventId: 'tn-reservation-protection-1994',
    policyId: 'tn-reservation-protection-1994',
    title: 'The 1991-96 government secured exceptional legal durability for reservation',
    body:
      'Jayalalithaa’s government converted a long cross-government reservation settlement into statute and obtained constitutional protection. Credit is shared with earlier MGR and Karunanidhi decisions and Parliament.',
    stance: 'achievement',
    category: 'inclusion',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tn-reservation-act-1994', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-jayalalithaa-integrity-cost',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-jayalalithaa-1991',
    title: 'Integrity and executive-centralisation costs materially reduce the first Jayalalithaa term',
    body:
      'Important inclusion and welfare choices cannot erase the term’s serious integrity record and concentration of executive authority. The rating keeps those as separate components rather than using development gains as an excuse.',
    stance: 'concern',
    category: 'institutions',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['tn-assembly-cm-list', 'tn-reservation-act-1994'],
  },
  {
    id: 'tn-karunanidhi-it-inclusion',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-karunanidhi-1996',
    eventId: 'tn-tidel-park-2000',
    policyId: 'tn-samathuvapuram-1997',
    title: 'The 1996-2001 term paired technology infrastructure with social-inclusion experiments',
    body:
      'TIDEL and the broader industrial ecosystem strengthened services and technology capacity, while Samathuvapuram directly challenged residential caste segregation. Both achievements have shared and uneven long-run outcomes.',
    stance: 'achievement',
    category: 'development',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'niti-tn-macro-fiscal-2025', 'tn-samathuvapuram'],
  },
  {
    id: 'tn-jayalalithaa-rainwater-tsunami',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-jayalalithaa-2002',
    eventId: 'tn-tsunami-2004',
    policyId: 'tn-rainwater-harvesting-2003',
    title: 'Rainwater harvesting and tsunami reconstruction demonstrate strong administrative capacity',
    body:
      'The water mandate addressed a structural scarcity problem and the government led a large coastal recovery effort. Enforcement, maintenance, livelihood protection, and causal attribution keep the assessment below the top tier.',
    stance: 'achievement',
    category: 'crisis-and-reform',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['niti-tn-macro-fiscal-2025', 'world-bank-tn-tsunami'],
  },
  {
    id: 'tn-karunanidhi-health-welfare',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-karunanidhi-2006',
    policyId: 'tn-health-insurance-2009',
    title: 'The 2006-11 term expanded health and welfare access at scale',
    body:
      'Publicly financed tertiary-care insurance, rural programmes, and social transfers broadened household protection while industrial continuity remained strong.',
    stance: 'achievement',
    category: 'human-development',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['tn-cmchis', 'niti-tn-macro-fiscal-2025'],
  },
  {
    id: 'tn-karunanidhi-integrity-pressure',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-karunanidhi-2006',
    title: 'Integrity exposure and recurring fiscal commitments reduce the 2006-11 record',
    body:
      'Large welfare and service gains coexisted with governance and integrity concerns and a model increasingly dependent on recurring commitments. Those costs are scored separately from inclusion.',
    stance: 'concern',
    category: 'institutions',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['niti-tn-macro-fiscal-2025', 'tn-assembly-cm-list'],
  },
  {
    id: 'tn-jayalalithaa-canteens',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-jayalalithaa-2011',
    policyId: 'tn-amma-canteens-2013',
    title: 'Amma canteens created unusually accessible urban food security',
    body:
      'Heavily subsidised municipal meals served low-income, informal, migrant, and elderly residents and remained valuable during disasters and the pandemic.',
    stance: 'achievement',
    category: 'food-security',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'niti-tn-macro-fiscal-2025'],
  },
  {
    id: 'tn-jayalalithaa-flood-failure',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-jayalalithaa-2015',
    eventId: 'tn-chennai-floods-2015',
    title: 'The 2015 Chennai flood was not only extreme weather',
    body:
      'The CAG identified major failures in drainage, water-body protection, planning, reservoir operation, and emergency coordination. This prevents welfare continuity from producing a strong term rating.',
    stance: 'concern',
    category: 'crisis',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tn-cag-chennai-floods'],
  },
  {
    id: 'tn-eps-medical-electronics',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-palaniswami-2017',
    policyId: 'tn-medical-admission-preference-2020',
    title: 'EPS-era reforms produced visible medical-access and industrial gains',
    body:
      'The 7.5% government-school preference moved medical admissions from negligible levels to hundreds, while the electronics policy helped build an export and investment pipeline carried forward by the next government.',
    stance: 'achievement',
    category: 'reforms',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tn-medical-admission-act-2020', 'tn-electronics-policy-2020', 'tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-eps-thoothukudi-failure',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-palaniswami-2017',
    eventId: 'tn-thoothukudi-firing-2018',
    title: 'Thoothukudi is a severe policing and rights failure in the EPS record',
    body:
      'The commission’s findings on lethal force, command, intelligence, and administration materially lower the crisis and institutions components. Later inquiry cannot erase the deaths.',
    stance: 'concern',
    category: 'institutions',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tn-thoothukudi-commission'],
  },
  {
    id: 'tn-stalin-growth-poverty',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'The 2021-26 term combined strong growth with very low multidimensional poverty',
    body:
      'Real GSDP growth accelerated after the pandemic, real output per person rose, unemployment fell, and estimated multidimensional poverty declined from 2.20% in 2019-21 to 1.43% in 2022-23. National recovery and inherited capacity prevent exclusive credit.',
    stance: 'achievement',
    category: 'economic-outcomes',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'mospi-state-sdp-2024', 'niti-tn-macro-fiscal-2025'],
  },
  {
    id: 'tn-stalin-capability-agenda',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    policyId: 'tn-pudhumai-penn-2022',
    title: 'Women, students, mobility, nutrition, skills, and chronic care formed a coherent capability agenda',
    body:
      'Vidiyal Payanam, Pudhumai Penn, school breakfast, Naan Mudhalvan, Makkalai Thedi Maruthuvam, and KMUT addressed linked barriers rather than one isolated entitlement.',
    stance: 'achievement',
    category: 'inclusion',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'tn-spc-pudhumai-penn', 'tn-spc-kmut', 'tn-spc-vidiyal'],
  },
  {
    id: 'tn-stalin-road-delivery',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    eventId: 'tn-road-delivery-and-safety-2025',
    policyId: 'tn-road-renewal-2021',
    title: 'The Stalin government delivered a large road-renewal programme',
    body:
      'The state reported 65,184 urban-road works covering 11,177.23 km during 2021-22 to 2024-25 and 12,572 km improved under its village-road programme, alongside PMGSY and bridge work.',
    stance: 'achievement',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26'],
  },
  {
    id: 'tn-stalin-fiscal-safety-risk',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    eventId: 'tn-road-delivery-and-safety-2025',
    title: 'Debt, power-sector exposure, road deaths, and justice gaps cap the Stalin score',
    body:
      'The 2025-26 budget carried a revenue deficit and heavy committed expenditure, while Tamil Nadu reported 18,449 road deaths in 2024. In 2023, women, child, and cyber conviction and pendency results remained weak even as serious-harm case counts improved.',
    stance: 'concern',
    category: 'execution',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['prs-tn-budget-2025-26', 'morth-road-accidents-2024-tn', 'ncrb-crime-2023-part-i', 'ncrb-crime-2023-part-ii'],
  },
  {
    id: 'tn-stalin-crisis-enforcement',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    eventId: 'tn-kallakurichi-hooch-2024',
    title: 'Repeat flooding and Kallakurichi reveal unresolved state-capacity failures',
    body:
      'Michaung showed that drainage and land-use vulnerability persisted after 2015, while the Kallakurichi deaths exposed preventable illicit-market, intelligence, and local enforcement gaps.',
    stance: 'concern',
    category: 'crisis',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['imd-michaung-2023', 'tn-kallakurichi-nhrc'],
  },
  {
    id: 'tn-crime-safety-mixed',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'Tamil Nadu crime and safety signals are mixed, not one number',
    body:
      'Murder counts were stable and violent-crime cases fell from 2021 to 2023. Women and child registrations remain reporting-sensitive, cybercrime cases nearly quadrupled, and high court pendency prevents a simple good-or-bad verdict.',
    stance: 'mixed',
    category: 'public-safety',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['ncrb-crime-2023-part-i', 'ncrb-crime-2023-part-ii'],
  },
  {
    id: 'tn-vijay-too-early',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-vijay-2026',
    eventId: 'tn-vijay-government-2026',
    title: 'The Vijay government is too new for a rating',
    body:
      'Vijay took office on May 10, 2026. Campaign promises, appointments, and early announcements cannot substitute for an enacted budget, implementation record, institutional conduct, and observed outcomes.',
    stance: 'context',
    category: 'current-government',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['eci-tn-2026', 'tn-lok-bhavan-vijay-2026'],
  },
  {
    id: 'tn-shared-attribution',
    jurisdictionId: 'tamil-nadu',
    title: 'Tamil Nadu progress is cumulative and cross-government',
    body:
      'Reservation, meals, health, manufacturing, technology, roads, local services, and welfare were built and modified across DMK and AIADMK governments, with important Union, firm, court, local-body, and household contributions.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tn-economic-survey-2025-26', 'niti-tn-macro-fiscal-2025', 'tn-assembly-cm-list'],
  },
]

export const tamilNaduCuratedAnswers: CuratedAnswerSeed[] = [
  {
    id: 'tn-modern-progress',
    jurisdictionId: 'tamil-nadu',
    question: 'How is Tamil Nadu doing as a state?',
    aliases: [
      'tamil nadu progress',
      'how is tamilnadu doing',
      'is tamil nadu developing',
      'tamil nadu growth poverty infrastructure',
    ],
    shortAnswer:
      'Tamil Nadu is a high-capacity, diversified state with strong real output, manufacturing and services, education, health, welfare, household services, and very low estimated multidimensional poverty. Its harder problems are debt and power-sector exposure, job quality, child and women anaemia, water and flood resilience, road deaths, justice pendency, and uneven regional and caste outcomes.',
    verdict:
      'Direction: positive and relatively broad-based, but not self-correcting. The state model has accumulated capability across rival governments; the next gains depend less on adding another named scheme and more on quality, safety, fiscal durability, institutional accountability, and measured outcomes.',
    confidence: 'medium',
    asOfDate: reviewedAt,
    claimSections: [
      { claimId: 'tn-long-run-progress', section: 'achievement', sortOrder: 1 },
      { claimId: 'tn-stalin-growth-poverty', section: 'achievement', sortOrder: 2 },
      { claimId: 'tn-stalin-capability-agenda', section: 'achievement', sortOrder: 3 },
      { claimId: 'tn-stalin-road-delivery', section: 'achievement', sortOrder: 4 },
      { claimId: 'tn-stalin-fiscal-safety-risk', section: 'concern', sortOrder: 1 },
      { claimId: 'tn-stalin-crisis-enforcement', section: 'concern', sortOrder: 2 },
      { claimId: 'tn-crime-safety-mixed', section: 'concern', sortOrder: 3 },
      { claimId: 'tn-boundary-context', section: 'context', sortOrder: 1 },
      { claimId: 'tn-shared-attribution', section: 'context', sortOrder: 2 },
      { claimId: 'tn-vijay-too-early', section: 'context', sortOrder: 3 },
    ],
  },
  {
    id: 'tn-cm-comparison',
    jurisdictionId: 'tamil-nadu',
    question: 'How have Tamil Nadu Chief Ministers performed?',
    aliases: [
      'best tamil nadu cm',
      'dmk aiadmk chief minister ratings',
      'stalin jayalalithaa karunanidhi mgr comparison',
      'tamil nadu cm score',
    ],
    shortAnswer:
      'The strongest evidence-backed records are specialised rather than absolute: MGR on school meals and inclusion; Karunanidhi governments on technology, welfare, health and social policy; Jayalalithaa governments on water regulation, food access and delivery but with major integrity and flood-governance costs; EPS on medical access and electronics but with the Thoothukudi failure; Stalin on a broad capability and infrastructure agenda with fiscal, road-safety, justice and enforcement limits.',
    verdict:
      'Published balanced estimates are term-specific: MGR 1980-85 at 7.0, Jayalalithaa 1991-96 at 6.0, Karunanidhi 1996-2001 at 6.9, Jayalalithaa 2002-06 at 6.4, Karunanidhi 2006-11 at 6.5, Jayalalithaa 2011-14 at 6.4, Jayalalithaa 2015-16 at 5.8, EPS 2017-21 at 6.2, and Stalin 2021-26 at 7.0. Vijay is not rated.',
    confidence: 'medium',
    asOfDate: reviewedAt,
    claimSections: [
      { claimId: 'tn-mgr-meals-inclusion', section: 'achievement', sortOrder: 1 },
      { claimId: 'tn-karunanidhi-it-inclusion', section: 'achievement', sortOrder: 2 },
      { claimId: 'tn-jayalalithaa-rainwater-tsunami', section: 'achievement', sortOrder: 3 },
      { claimId: 'tn-karunanidhi-health-welfare', section: 'achievement', sortOrder: 4 },
      { claimId: 'tn-eps-medical-electronics', section: 'achievement', sortOrder: 5 },
      { claimId: 'tn-stalin-capability-agenda', section: 'achievement', sortOrder: 6 },
      { claimId: 'tn-jayalalithaa-integrity-cost', section: 'concern', sortOrder: 1 },
      { claimId: 'tn-jayalalithaa-flood-failure', section: 'concern', sortOrder: 2 },
      { claimId: 'tn-eps-thoothukudi-failure', section: 'concern', sortOrder: 3 },
      { claimId: 'tn-stalin-fiscal-safety-risk', section: 'concern', sortOrder: 4 },
      { claimId: 'tn-shared-attribution', section: 'context', sortOrder: 1 },
      { claimId: 'tn-vijay-too-early', section: 'context', sortOrder: 2 },
    ],
  },
  {
    id: 'tn-crime-safety',
    jurisdictionId: 'tamil-nadu',
    question: 'Is crime and public safety improving in Tamil Nadu?',
    aliases: [
      'crime in tamil nadu',
      'is tamilnadu safe',
      'tamil nadu murder cybercrime women safety',
      'crime rate under stalin',
    ],
    shortAnswer:
      'The latest comparable NCRB record is mixed. Murder cases were broadly stable and violent-crime cases fell from 2021 to 2023. Registered crimes against women fell from 2022 but child cases rose, and those categories also move with reporting. Cybercrime registrations nearly quadrupled. Conviction and pendency remain material weaknesses, while road deaths are a separate severe safety problem.',
    verdict:
      'Recorded serious-harm direction is mildly positive, but overall public safety is not strong enough for a simple success verdict. Better reporting can raise registered cases; low court completion, cyber expansion, road deaths, and post-2023 data gaps keep the assessment bounded.',
    confidence: 'medium',
    asOfDate: reviewedAt,
    claimSections: [
      { claimId: 'tn-crime-safety-mixed', section: 'achievement', sortOrder: 1 },
      { claimId: 'tn-stalin-fiscal-safety-risk', section: 'concern', sortOrder: 1 },
      { claimId: 'tn-stalin-crisis-enforcement', section: 'concern', sortOrder: 2 },
      { claimId: 'tn-shared-attribution', section: 'context', sortOrder: 1 },
      { claimId: 'tn-vijay-too-early', section: 'context', sortOrder: 2 },
    ],
  },
]

const coreIndicatorDefinitions: IndicatorDefinitionSeed[] = [
  {
    id: 'tn-real-nsdp-per-capita',
    name: 'Real net state domestic product per person',
    shortName: 'Real state output/person',
    description:
      'Inflation-adjusted Tamil Nadu NSDP per resident at constant 2011-12 prices.',
    plainLanguage:
      'This estimates average state economic output per resident after depreciation and inflation. It is not the income of a typical household.',
    example:
      'A rise from about Rs 93,112 in 2011-12 to about Rs 198,000 in 2024-25 means real output per resident more than doubled.',
    unit: 'constant 2011-12 Rs',
    format: 'currency',
    dimensionId: 'economic-opportunity',
    dimensionWeight: 0.7,
    direction: 'higher',
    transform: 'log',
    goalpostLow: 50000,
    goalpostHigh: 300000,
    sourceId: 'mospi-state-sdp-2024',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'tn-real-gsdp-growth',
    name: 'Real GSDP annual growth',
    shortName: 'Real GSDP growth',
    description:
      'Annual change in Tamil Nadu gross state domestic product at constant 2011-12 prices.',
    plainLanguage:
      'This shows how fast the inflation-adjusted state economy grew or shrank from the previous financial year.',
    example:
      'A value of 11.19% for 2024-25 means estimated real state output was 11.19% higher than in 2023-24.',
    unit: '% per year',
    format: 'percent',
    dimensionId: 'economic-opportunity',
    dimensionWeight: 0,
    direction: 'neutral',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: -10,
    goalpostHigh: 15,
    sourceId: 'tn-economic-survey-2025-26',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'tn-unemployment-rate',
    name: 'Unemployment rate, age 15 and above',
    shortName: 'Unemployment',
    description:
      'PLFS usual-status unemployment among Tamil Nadu residents age 15 and above.',
    plainLanguage:
      'Out of every 100 people working or actively seeking work, this estimates how many could not find work. A low rate can coexist with low wages, poor job quality, or people leaving the labour force.',
    example:
      'A rate of 3.5% means about 3 to 4 of every 100 people in the labour force were unemployed.',
    unit: '% labour force 15+',
    format: 'percent',
    dimensionId: 'economic-opportunity',
    dimensionWeight: 0,
    direction: 'lower',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 1,
    goalpostHigh: 15,
    sourceId: 'tn-economic-survey-2025-26',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'tn-female-lfpr',
    name: 'Female labour-force participation, age 15 and above',
    shortName: 'Female labour force',
    description:
      'PLFS usual-status share of Tamil Nadu women age 15 and above who were working or seeking work.',
    plainLanguage:
      'This estimates how many adult women are economically active. It does not show job security, wages, hours, or whether work is chosen or distress-driven.',
    example:
      'A value of 40.5% means about 41 of every 100 adult women were working or looking for work.',
    unit: '% women age 15+',
    format: 'percent',
    dimensionId: 'inclusion',
    dimensionWeight: 0.4,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 15,
    goalpostHigh: 70,
    sourceId: 'niti-tn-macro-fiscal-2025',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'tn-outstanding-debt-gsdp',
    name: 'Outstanding state debt as a share of GSDP',
    shortName: 'Debt / GSDP',
    description:
      'Budget-definition outstanding Tamil Nadu debt relative to the size of the state economy.',
    plainLanguage:
      'This compares accumulated state debt with one year of economic output. Debt can finance useful assets, but high debt raises interest and future-budget risk.',
    example:
      'A value of 26.1% means outstanding debt was estimated at about Rs 26 for every Rs 100 of annual GSDP.',
    unit: '% GSDP',
    format: 'percent',
    dimensionId: 'sustainability',
    dimensionWeight: 0.6,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 15,
    goalpostHigh: 50,
    sourceId: 'prs-tn-budget-2025-26',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'tn-life-expectancy',
    name: 'Life expectancy at birth',
    shortName: 'Life expectancy',
    description:
      'Expected years of life at birth under the measured Tamil Nadu mortality pattern.',
    plainLanguage:
      'This estimates how long a newborn would live if current age-specific death rates continued.',
    example:
      'A value of 73.2 years means a newborn is expected to live about 73 years under the measured mortality pattern.',
    unit: 'years',
    format: 'number',
    dimensionId: 'human-capability',
    dimensionWeight: 0.25,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 50,
    goalpostHigh: 85,
    sourceId: 'niti-tn-macro-fiscal-2025',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'tn-infant-mortality',
    name: 'Infant mortality rate',
    shortName: 'Infant mortality',
    description: 'SRS-estimated deaths before age one per 1,000 live births.',
    plainLanguage:
      'This estimates how many babies die before their first birthday for every 1,000 born alive. Lower is better.',
    example:
      'A rate of 12 means about 12 infant deaths per 1,000 live births.',
    unit: 'per 1,000 live births',
    format: 'number',
    dimensionId: 'human-capability',
    dimensionWeight: 0.25,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 5,
    goalpostHigh: 80,
    sourceId: 'tn-economic-survey-2025-26',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'tn-women-ten-years-schooling',
    name: 'Women with ten or more years of schooling',
    shortName: 'Women 10+ years schooling',
    description:
      'Share of Tamil Nadu women age 15-49 who completed at least ten years of schooling.',
    plainLanguage:
      'This estimates how many working-age women reached at least the secondary-school threshold.',
    example:
      'A value of 56.6% means about 57 of every 100 women age 15-49 completed ten or more years of schooling.',
    unit: '% women age 15-49',
    format: 'percent',
    dimensionId: 'human-capability',
    dimensionWeight: 0.2,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 20,
    goalpostHigh: 80,
    sourceId: 'nfhs5-tn',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'tn-child-stunting',
    name: 'Children under five who are stunted',
    shortName: 'Child stunting',
    description:
      'Share of children under five whose height-for-age is below the WHO threshold.',
    plainLanguage:
      'Stunting is a sign of long-term nutrition and health deprivation. Lower is better.',
    example:
      'A value of 25% means one in four surveyed young children was too short for age under the standard definition.',
    unit: '% children under 5',
    format: 'percent',
    dimensionId: 'human-capability',
    dimensionWeight: 0.15,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 10,
    goalpostHigh: 50,
    sourceId: 'nfhs5-tn',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'tn-child-anemia',
    name: 'Children age 6-59 months who are anaemic',
    shortName: 'Child anaemia',
    description:
      'Share of measured young children below the NFHS haemoglobin threshold.',
    plainLanguage:
      'This estimates how many young children have low haemoglobin, often linked to nutrition, infection, and health access. Lower is better.',
    example:
      'A value of 57.4% means more than half of measured young children were anaemic.',
    unit: '% children 6-59 months',
    format: 'percent',
    dimensionId: 'human-capability',
    dimensionWeight: 0.15,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 10,
    goalpostHigh: 80,
    sourceId: 'nfhs5-tn',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'tn-electricity-access',
    name: 'Population living in households with electricity',
    shortName: 'Electricity access',
    description:
      'Share of Tamil Nadu residents living in surveyed households with electricity.',
    plainLanguage:
      'This estimates how many people live in a household with an electricity connection. It does not measure reliability, outages, or affordability.',
    example:
      'A value of 99.3% means about 993 of every 1,000 residents lived in a household with electricity.',
    unit: '% population',
    format: 'percent',
    dimensionId: 'basic-systems',
    dimensionWeight: 0.4,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 60,
    goalpostHigh: 100,
    sourceId: 'nfhs5-tn',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'tn-sanitation',
    name: 'Population using an improved sanitation facility',
    shortName: 'Improved sanitation',
    description:
      'Share of Tamil Nadu residents living in surveyed households using an improved sanitation facility.',
    plainLanguage:
      'This estimates access to a safer household toilet facility. It does not guarantee safe transport or treatment of waste.',
    example:
      'A value of 72.6% means about 73 of every 100 residents lived in a household using an improved facility.',
    unit: '% population',
    format: 'percent',
    dimensionId: 'basic-systems',
    dimensionWeight: 0.6,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 20,
    goalpostHigh: 100,
    sourceId: 'nfhs5-tn',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'tn-mpi-poverty',
    name: 'Multidimensional poverty headcount',
    shortName: 'MPI poverty',
    description:
      'Share of Tamil Nadu residents estimated to be multidimensionally poor under India national MPI.',
    plainLanguage:
      'This estimates how many people face a weighted combination of health, education, and living-standard deprivations.',
    example:
      'A value of 1.43% means roughly 1 to 2 of every 100 residents met the multidimensional-poverty threshold.',
    unit: '% population',
    format: 'percent',
    dimensionId: 'inclusion',
    dimensionWeight: 0.6,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 40,
    sourceId: 'tn-economic-survey-2025-26',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'tn-higher-education-ger',
    name: 'Higher-education gross enrolment ratio',
    shortName: 'Higher-education enrolment',
    description:
      'Higher-education enrolment relative to the official age 18-23 population denominator.',
    plainLanguage:
      'This compares the number enrolled in higher education with the population in the usual college-age group. It can exceed actual age-cohort participation because students outside the age band are included.',
    example:
      'A GER of 46.9% means enrolment was equivalent to about 47 students for every 100 residents age 18-23.',
    unit: '% age-group population',
    format: 'percent',
    dimensionId: 'human-capability',
    dimensionWeight: 0,
    direction: 'higher',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 10,
    goalpostHigh: 70,
    sourceId: 'niti-tn-macro-fiscal-2025',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'tn-rural-roads-improved',
    name: 'Village roads improved under the state road programme',
    shortName: 'Village roads improved',
    description:
      'Cumulative kilometres improved under Mudalvarin Grama Saalaigal Membattu Thittam as reported through 2025-26.',
    plainLanguage:
      'This is a programme output, not the full road network. More completed kilometres can improve access but do not prove road condition, maintenance, safety, or exclusive CM credit.',
    example:
      'A reported 12,572 km means that length was improved across 9,696 projects under the named scheme.',
    unit: 'km cumulative',
    format: 'number',
    dimensionId: 'basic-systems',
    dimensionWeight: 0,
    direction: 'neutral',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 20000,
    sourceId: 'tn-economic-survey-2025-26',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'tn-road-accident-deaths',
    name: 'Reported road-accident deaths',
    shortName: 'Road deaths',
    description:
      'Police-reported deaths in road accidents in Tamil Nadu during the calendar year.',
    plainLanguage:
      'This counts people reported killed in road crashes. Vehicle use, road design, enforcement, emergency care, behaviour, and under-reporting all affect the total.',
    example:
      'The 2024 value of 18,449 means that many people were reported killed in road crashes during the year.',
    unit: 'deaths per calendar year',
    format: 'number',
    dimensionId: 'sustainability',
    dimensionWeight: 0,
    direction: 'lower',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 25000,
    sourceId: 'morth-road-accidents-2024-tn',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'tn-fiscal-deficit',
    name: 'State fiscal deficit as a share of GSDP',
    shortName: 'Fiscal deficit',
    description:
      'The annual gap between state net expenditure and non-borrowed receipts relative to the economy.',
    plainLanguage:
      'This shows how much the state needed to borrow in a year compared with economic output. Borrowing for useful assets can be productive, so the number must be read with spending quality and debt.',
    example:
      'A fiscal deficit of 3% of GSDP means borrowing equal to about Rs 3 for every Rs 100 of annual state output.',
    unit: '% GSDP',
    format: 'percent',
    dimensionId: 'sustainability',
    dimensionWeight: 0,
    direction: 'lower',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 8,
    sourceId: 'prs-tn-budget-2025-26',
    frequency: 'annual',
    stateReady: true,
  },
]

type SafetyMetricSpec = {
  suffix: string
  name: string
  shortName: string
  description: string
  plainLanguage: string
  example: string
  unit: string
  format: 'number' | 'percent'
  direction: 'higher' | 'lower' | 'neutral'
  goalpostLow: number
  goalpostHigh: number
  sourceId: string
}

const tamilNaduSafetySpecs: SafetyMetricSpec[] = [
  {
    suffix: 'ipc-rate',
    name: 'Registered IPC crime rate',
    shortName: 'Registered IPC crime',
    description: 'Police-registered cognizable IPC cases per lakh residents.',
    plainLanguage:
      'This counts recorded IPC cases relative to population. A higher value can mean more crime, better reporting, changed police recording, or several effects at once.',
    example:
      'A rate of 264.9 means about 265 registered IPC cases per one lakh residents in 2023.',
    unit: 'registered cases per lakh',
    format: 'number',
    direction: 'neutral',
    goalpostLow: 0,
    goalpostHigh: 1000,
    sourceId: 'ncrb-crime-2023-part-i',
  },
  {
    suffix: 'violent-rate',
    name: 'Registered violent-crime rate',
    shortName: 'Violent crime',
    description: 'NCRB-defined violent crimes registered per lakh residents.',
    plainLanguage:
      'This combines serious offences such as murder, rape, kidnapping, robbery, rioting, and arson. Reporting and legal definitions still matter.',
    example:
      'A rate of 14.7 means about 15 registered violent-crime cases per one lakh residents.',
    unit: 'registered cases per lakh',
    format: 'number',
    direction: 'lower',
    goalpostLow: 0,
    goalpostHigh: 100,
    sourceId: 'ncrb-crime-2023-part-i',
  },
  {
    suffix: 'murder-rate',
    name: 'Registered murder rate',
    shortName: 'Murder',
    description: 'Registered murder cases per lakh residents.',
    plainLanguage:
      'Murder is a stronger serious-harm signal than total registered crime because it is less sensitive to reporting access, though classification still matters.',
    example:
      'A rate of 2.2 means about 2.2 registered murder cases per one lakh residents.',
    unit: 'registered cases per lakh',
    format: 'number',
    direction: 'lower',
    goalpostLow: 0,
    goalpostHigh: 10,
    sourceId: 'ncrb-crime-2023-part-i',
  },
  {
    suffix: 'women-registered-rate',
    name: 'Registered crime against women rate',
    shortName: 'Crime against women',
    description: 'Registered cases per lakh female residents.',
    plainLanguage:
      'This is reporting-sensitive. A rise can reflect more victimization, greater willingness to report, better registration, legal change, or a combination.',
    example:
      'A rate of 23.2 means 23.2 registered cases for every one lakh women, not 23.2 distinct victims.',
    unit: 'registered cases per lakh women',
    format: 'number',
    direction: 'neutral',
    goalpostLow: 0,
    goalpostHigh: 200,
    sourceId: 'ncrb-crime-2023-part-i',
  },
  {
    suffix: 'children-registered-rate',
    name: 'Registered crime against children rate',
    shortName: 'Crime against children',
    description: 'Registered cases per lakh children under the NCRB denominator.',
    plainLanguage:
      'This is reporting-sensitive and the denominator still uses older child-population data, weakening exact state comparisons.',
    example:
      'A rate of 33.7 means about 34 registered cases for every one lakh children under the report definition.',
    unit: 'registered cases per lakh children',
    format: 'number',
    direction: 'neutral',
    goalpostLow: 0,
    goalpostHigh: 200,
    sourceId: 'ncrb-crime-2023-part-i',
  },
  {
    suffix: 'cyber-registered-rate',
    name: 'Registered cybercrime rate',
    shortName: 'Cybercrime',
    description: 'Registered cybercrime cases per lakh residents.',
    plainLanguage:
      'Digital use, victim awareness, reporting portals, classification, police capacity, and underlying offending all move this number.',
    example:
      'A rate of 5.4 means 5.4 registered cybercrime cases per one lakh residents in 2023.',
    unit: 'registered cases per lakh',
    format: 'number',
    direction: 'neutral',
    goalpostLow: 0,
    goalpostHigh: 60,
    sourceId: 'ncrb-crime-2023-part-ii',
  },
  {
    suffix: 'ipc-chargesheet-rate',
    name: 'IPC charge-sheeting rate',
    shortName: 'IPC charge-sheeting',
    description: 'Share of police-disposed IPC cases that resulted in a charge sheet.',
    plainLanguage:
      'This shows how often disposed police investigations reached a charge sheet. It is not a conviction rate or proof that every investigation was strong.',
    example:
      'A rate of 80.8% means about 81 of every 100 IPC cases disposed by police were charge-sheeted.',
    unit: '% of police-disposed cases',
    format: 'percent',
    direction: 'higher',
    goalpostLow: 0,
    goalpostHigh: 100,
    sourceId: 'ncrb-crime-2023-part-i',
  },
  {
    suffix: 'ipc-conviction-rate',
    name: 'IPC conviction rate',
    shortName: 'IPC conviction',
    description: 'Share of completed IPC trials resulting in conviction.',
    plainLanguage:
      'This divides convictions by trials completed, not by all cases filed, and must be read with pendency and case mix.',
    example:
      'No verified 2023 Tamil Nadu observation is published in this snapshot; the missing value remains visible.',
    unit: '% of completed trials',
    format: 'percent',
    direction: 'higher',
    goalpostLow: 0,
    goalpostHigh: 100,
    sourceId: 'ncrb-crime-2023-part-i',
  },
  {
    suffix: 'women-conviction-rate',
    name: 'Conviction rate for crimes against women',
    shortName: 'Women-case conviction',
    description: 'Share of completed crime-against-women trials ending in conviction.',
    plainLanguage:
      'This covers only trials that finished. It excludes unreported harm and the many cases still pending.',
    example:
      'A value of 18.4% means fewer than one in five completed trials ended in conviction.',
    unit: '% of completed trials',
    format: 'percent',
    direction: 'higher',
    goalpostLow: 0,
    goalpostHigh: 100,
    sourceId: 'ncrb-crime-2023-part-i',
  },
  {
    suffix: 'children-conviction-rate',
    name: 'Conviction rate for crimes against children',
    shortName: 'Child-case conviction',
    description: 'Share of completed child-crime trials ending in conviction.',
    plainLanguage:
      'This covers completed trials and should be read with POCSO process, witness support, investigation quality, and pendency.',
    example:
      'A value of 27.5% means about 28 of every 100 completed trials ended in conviction.',
    unit: '% of completed trials',
    format: 'percent',
    direction: 'higher',
    goalpostLow: 0,
    goalpostHigh: 100,
    sourceId: 'ncrb-crime-2023-part-i',
  },
  {
    suffix: 'cyber-conviction-rate',
    name: 'Cybercrime conviction rate',
    shortName: 'Cyber conviction',
    description: 'Share of completed cybercrime trials ending in conviction.',
    plainLanguage:
      'This measures only completed trials. Attribution, digital evidence, jurisdiction, and the very high pending caseload shape the result.',
    example:
      'A value of 31.8% means about 32 of every 100 completed cybercrime trials ended in conviction.',
    unit: '% of completed trials',
    format: 'percent',
    direction: 'higher',
    goalpostLow: 0,
    goalpostHigh: 100,
    sourceId: 'ncrb-crime-2023-part-ii',
  },
]

const tamilNaduSafetyDefinitions: IndicatorDefinitionSeed[] =
  tamilNaduSafetySpecs.map((spec) => ({
    id: `tn-crime-${spec.suffix}`,
    name: spec.name,
    shortName: spec.shortName,
    description: spec.description,
    plainLanguage: spec.plainLanguage,
    example: spec.example,
    unit: spec.unit,
    format: spec.format,
    dimensionId: 'institutions',
    dimensionWeight: 0,
    direction: spec.direction,
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: spec.goalpostLow,
    goalpostHigh: spec.goalpostHigh,
    sourceId: spec.sourceId,
    frequency: 'annual',
    stateReady: true,
  }))

export const tamilNaduIndicatorDefinitions: IndicatorDefinitionSeed[] = [
  ...coreIndicatorDefinitions,
  ...tamilNaduSafetyDefinitions,
]

const realNsdpPerCapita = [
  [2011, 93112.41],
  [2012, 97256.89],
  [2013, 102190.59],
  [2014, 107116.88],
  [2015, 115875.34],
  [2016, 123205.77],
  [2017, 133028.55],
  [2018, 141843.85],
  [2019, 144844.9],
  [2020, 143481.98],
  [2021, 154557.2],
  [2022, 166726.79],
  [2023, 179876.21],
  [2024, 198000],
] as const

const realGsdpGrowth = [
  [2014, 4.92],
  [2015, 8.24],
  [2016, 7.15],
  [2017, 8.59],
  [2018, 7.01],
  [2019, 3.25],
  [2020, 0.07],
  [2021, 7.89],
  [2022, 6.17],
  [2023, 9.26],
  [2024, 11.19],
] as const

const infantMortality = [
  [2018, 15],
  [2019, 15],
  [2020, 13],
  [2021, 12],
  [2022, 11],
  [2023, 12],
] as const

const outstandingDebt = [
  [2019, 21.5, 'observed'],
  [2020, 25.2, 'estimated'],
  [2021, 25.7, 'estimated'],
  [2022, 26.9, 'estimated'],
  [2023, 26.6, 'estimated'],
  [2024, 26.4, 'estimated'],
  [2025, 26.1, 'estimated'],
] as const

const tamilNaduSafetyValues: Record<
  string,
  { value: number; note: string; sourceId: string }
> = {
  'ipc-rate': {
    value: 264.9,
    sourceId: 'ncrb-crime-2023-part-i',
    note: '203,804 IPC cases in 2023; 322,852 in 2021 and 193,913 in 2022. Registration practice affects the series.',
  },
  'violent-rate': {
    value: 14.7,
    sourceId: 'ncrb-crime-2023-part-i',
    note: '11,302 violent-crime cases in 2023, down from 12,386 in 2021 and 12,325 in 2022.',
  },
  'murder-rate': {
    value: 2.2,
    sourceId: 'ncrb-crime-2023-part-i',
    note: '1,681 murder cases in 2023, compared with 1,686 in 2021 and 1,690 in 2022.',
  },
  'women-registered-rate': {
    value: 23.2,
    sourceId: 'ncrb-crime-2023-part-i',
    note: '8,943 registered cases in 2023, compared with 8,501 in 2021 and 9,207 in 2022; reporting-sensitive.',
  },
  'children-registered-rate': {
    value: 33.7,
    sourceId: 'ncrb-crime-2023-part-i',
    note: '6,968 registered cases in 2023, up from 6,064 in 2021 and 6,580 in 2022; denominator uses 2011 child population.',
  },
  'cyber-registered-rate': {
    value: 5.4,
    sourceId: 'ncrb-crime-2023-part-ii',
    note: '4,121 cybercrime cases in 2023, up from 1,076 in 2021 and 2,082 in 2022.',
  },
  'ipc-chargesheet-rate': {
    value: 80.8,
    sourceId: 'ncrb-crime-2023-part-i',
    note: 'Share of IPC cases disposed by police that were charge-sheeted in 2023.',
  },
  'women-conviction-rate': {
    value: 18.4,
    sourceId: 'ncrb-crime-2023-part-i',
    note: 'Completed-trial conviction rate in 2023; court pendency was 84.8%.',
  },
  'children-conviction-rate': {
    value: 27.5,
    sourceId: 'ncrb-crime-2023-part-i',
    note: 'Completed-trial conviction rate in 2023; court pendency was 83.7%.',
  },
  'cyber-conviction-rate': {
    value: 31.8,
    sourceId: 'ncrb-crime-2023-part-ii',
    note: 'Completed-trial conviction rate in 2023; court pendency was 91.6%.',
  },
}

export const tamilNaduIndicatorObservations: IndicatorObservationSeed[] = [
  ...realNsdpPerCapita.map(([period, value]) => ({
    indicatorId: 'tn-real-nsdp-per-capita',
    jurisdictionId: 'tamil-nadu',
    period,
    value,
    status: period === 2024 ? ('estimated' as const) : ('observed' as const),
    sourceId:
      period === 2024 ? 'tn-economic-survey-2025-26' : 'mospi-state-sdp-2024',
    note:
      period === 2024
        ? '2024-25 state-survey estimate, rounded to about Rs 1.98 lakh.'
        : `${period}-${String(period + 1).slice(-2)} constant 2011-12 price estimate.`,
  })),
  ...realGsdpGrowth.map(([period, value]) => ({
    indicatorId: 'tn-real-gsdp-growth',
    jurisdictionId: 'tamil-nadu',
    period,
    value,
    status: period >= 2023 ? ('estimated' as const) : ('observed' as const),
    sourceId: 'tn-economic-survey-2025-26',
    note:
      period >= 2023
        ? `${period}-${String(period + 1).slice(-2)} provisional or advance estimate.`
        : 'Annual growth at constant 2011-12 prices.',
  })),
  {
    indicatorId: 'tn-unemployment-rate',
    jurisdictionId: 'tamil-nadu',
    period: 2021,
    value: 5.1,
    status: 'observed',
    sourceId: 'tn-economic-survey-2025-26',
    note: 'PLFS 2021-22 usual status, age 15 and above.',
  },
  {
    indicatorId: 'tn-unemployment-rate',
    jurisdictionId: 'tamil-nadu',
    period: 2023,
    value: 3.5,
    status: 'observed',
    sourceId: 'tn-economic-survey-2025-26',
    note: 'PLFS 2023-24 usual status, age 15 and above.',
  },
  {
    indicatorId: 'tn-female-lfpr',
    jurisdictionId: 'tamil-nadu',
    period: 2022,
    value: 40.5,
    status: 'observed',
    sourceId: 'niti-tn-macro-fiscal-2025',
    note: 'PLFS 2022-23 usual-status female labour-force participation, age 15 and above.',
  },
  ...outstandingDebt.map(([period, value, status]) => ({
    indicatorId: 'tn-outstanding-debt-gsdp',
    jurisdictionId: 'tamil-nadu',
    period,
    value,
    status: status as 'observed' | 'estimated',
    sourceId: 'prs-tn-budget-2025-26',
    note:
      period === 2019
        ? '2019-20 actual under the budget-document definition.'
        : period === 2024
          ? '2024-25 Revised Estimate.'
          : period === 2025
            ? '2025-26 Budget Estimate.'
            : 'Budget-document estimate; do not merge with the broader NITI public-debt series.',
  })),
  {
    indicatorId: 'tn-life-expectancy',
    jurisdictionId: 'tamil-nadu',
    period: 2020,
    value: 73.2,
    status: 'estimated',
    sourceId: 'niti-tn-macro-fiscal-2025',
    note: 'SRS life-table estimate reported for 2020.',
  },
  ...infantMortality.map(([period, value]) => ({
    indicatorId: 'tn-infant-mortality',
    jurisdictionId: 'tamil-nadu',
    period,
    value,
    status: 'estimated' as const,
    sourceId: 'tn-economic-survey-2025-26',
    note: 'Sample Registration System annual estimate; kept separate from NFHS mortality estimates.',
  })),
  {
    indicatorId: 'tn-women-ten-years-schooling',
    jurisdictionId: 'tamil-nadu',
    period: 2015,
    value: 50.9,
    status: 'estimated',
    sourceId: 'nfhs4-tn',
    note: 'NFHS-4 fieldwork in 2015, women age 15-49.',
  },
  {
    indicatorId: 'tn-women-ten-years-schooling',
    jurisdictionId: 'tamil-nadu',
    period: 2020,
    value: 56.6,
    status: 'estimated',
    sourceId: 'nfhs5-tn',
    note: 'NFHS-5 fieldwork in early 2020, women age 15-49.',
  },
  {
    indicatorId: 'tn-child-stunting',
    jurisdictionId: 'tamil-nadu',
    period: 2015,
    value: 27.1,
    status: 'estimated',
    sourceId: 'nfhs4-tn',
    note: 'NFHS-4, children under five.',
  },
  {
    indicatorId: 'tn-child-stunting',
    jurisdictionId: 'tamil-nadu',
    period: 2020,
    value: 25,
    status: 'estimated',
    sourceId: 'nfhs5-tn',
    note: 'NFHS-5, children under five.',
  },
  {
    indicatorId: 'tn-child-anemia',
    jurisdictionId: 'tamil-nadu',
    period: 2015,
    value: 50.7,
    status: 'estimated',
    sourceId: 'nfhs4-tn',
    note: 'NFHS-4 biomarker estimate.',
  },
  {
    indicatorId: 'tn-child-anemia',
    jurisdictionId: 'tamil-nadu',
    period: 2020,
    value: 57.4,
    status: 'estimated',
    sourceId: 'nfhs5-tn',
    note: 'NFHS-5 biomarker estimate; higher is worse.',
  },
  {
    indicatorId: 'tn-electricity-access',
    jurisdictionId: 'tamil-nadu',
    period: 2015,
    value: 98.8,
    status: 'estimated',
    sourceId: 'nfhs4-tn',
    note: 'NFHS-4 state total.',
  },
  {
    indicatorId: 'tn-electricity-access',
    jurisdictionId: 'tamil-nadu',
    period: 2020,
    value: 99.3,
    status: 'estimated',
    sourceId: 'nfhs5-tn',
    note: 'NFHS-5 state total.',
  },
  {
    indicatorId: 'tn-sanitation',
    jurisdictionId: 'tamil-nadu',
    period: 2015,
    value: 52.2,
    status: 'estimated',
    sourceId: 'nfhs4-tn',
    note: 'NFHS-4 improved sanitation state total.',
  },
  {
    indicatorId: 'tn-sanitation',
    jurisdictionId: 'tamil-nadu',
    period: 2020,
    value: 72.6,
    status: 'estimated',
    sourceId: 'nfhs5-tn',
    note: 'NFHS-5 improved sanitation state total.',
  },
  {
    indicatorId: 'tn-mpi-poverty',
    jurisdictionId: 'tamil-nadu',
    period: 2013,
    value: 7.16,
    status: 'estimated',
    sourceId: 'tn-economic-survey-2025-26',
    note: '2013-14 NITI national-MPI estimate.',
  },
  {
    indicatorId: 'tn-mpi-poverty',
    jurisdictionId: 'tamil-nadu',
    period: 2019,
    value: 2.2,
    status: 'estimated',
    sourceId: 'tn-economic-survey-2025-26',
    note: '2019-21 NITI national-MPI estimate based on NFHS-5.',
  },
  {
    indicatorId: 'tn-mpi-poverty',
    jurisdictionId: 'tamil-nadu',
    period: 2022,
    value: 1.43,
    status: 'estimated',
    sourceId: 'tn-economic-survey-2025-26',
    note: '2022-23 NITI estimate; later values in the survey are projections and are not published here as observations.',
  },
  {
    indicatorId: 'tn-higher-education-ger',
    jurisdictionId: 'tamil-nadu',
    period: 2012,
    value: 40,
    status: 'estimated',
    sourceId: 'niti-tn-macro-fiscal-2025',
    note: 'AISHE benchmark inferred from the reported 6.9 percentage-point rise to 2021.',
  },
  {
    indicatorId: 'tn-higher-education-ger',
    jurisdictionId: 'tamil-nadu',
    period: 2021,
    value: 46.9,
    status: 'observed',
    sourceId: 'niti-tn-macro-fiscal-2025',
    note: 'AISHE higher-education GER for the age 18-23 denominator.',
  },
  {
    indicatorId: 'tn-rural-roads-improved',
    jurisdictionId: 'tamil-nadu',
    period: 2025,
    value: 12572,
    status: 'observed',
    sourceId: 'tn-economic-survey-2025-26',
    note: 'Cumulative state-programme output across 9,696 projects reported through the 2025-26 survey.',
  },
  {
    indicatorId: 'tn-road-accident-deaths',
    jurisdictionId: 'tamil-nadu',
    period: 2024,
    value: 18449,
    status: 'observed',
    sourceId: 'morth-road-accidents-2024-tn',
    note: 'Full calendar-year police-reported road-accident deaths.',
  },
  {
    indicatorId: 'tn-fiscal-deficit',
    jurisdictionId: 'tamil-nadu',
    period: 2019,
    value: 2.56,
    status: 'estimated',
    sourceId: 'prs-tn-budget-2019-20',
    note: '2019-20 Budget Estimate, not actual outturn.',
  },
  {
    indicatorId: 'tn-fiscal-deficit',
    jurisdictionId: 'tamil-nadu',
    period: 2021,
    value: 4.33,
    status: 'estimated',
    sourceId: 'prs-tn-budget-2021-22',
    note: '2021-22 Budget Estimate during the pandemic.',
  },
  {
    indicatorId: 'tn-fiscal-deficit',
    jurisdictionId: 'tamil-nadu',
    period: 2022,
    value: 3.2,
    status: 'observed',
    sourceId: 'niti-tn-macro-fiscal-2025',
    note: '2022-23 actual-series fiscal deficit.',
  },
  {
    indicatorId: 'tn-fiscal-deficit',
    jurisdictionId: 'tamil-nadu',
    period: 2025,
    value: 3,
    status: 'estimated',
    sourceId: 'prs-tn-budget-2025-26',
    note: '2025-26 Budget Estimate, not actual outturn.',
  },
  ...Object.entries(tamilNaduSafetyValues).map(([suffix, row]) => ({
    indicatorId: `tn-crime-${suffix}`,
    jurisdictionId: 'tamil-nadu',
    period: 2023,
    value: row.value,
    status: 'observed' as const,
    sourceId: row.sourceId,
    note: row.note,
  })),
]

export const tamilNaduSpecialistAssessments: LeaderSpecialistAssessmentSeed[] = [
  {
    id: 'tn-stalin-public-safety-2021',
    termId: 'tn-stalin-2021',
    topicId: 'public-safety',
    confidence: 'medium',
    status: 'reviewed',
    summary:
      'Recorded murder was stable and violent crime fell from 2021 to 2023, while women and child registrations remained reporting-sensitive, cybercrime nearly quadrupled, justice pendency stayed high, and road deaths remained severe.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'ncrb-crime-2023-part-i',
      'ncrb-crime-2023-part-ii',
      'morth-road-accidents-2024-tn',
      'india-constitution',
    ],
    scores: [
      {
        dimensionId: 'safety-lethal-violent',
        score: 6.8,
        rationale:
          'Murder cases were broadly stable at 1,681 in 2023 and violent-crime cases fell from 12,386 in 2021 to 11,302 in 2023; 18,449 road deaths are a major separate harm counterweight.',
      },
      {
        dimensionId: 'safety-women-children',
        score: 5.5,
        rationale:
          'Women-case registrations fell from 2022 to 2023 while child registrations rose; reporting, FIR access, and the old child denominator prevent a simple prevalence conclusion.',
      },
      {
        dimensionId: 'safety-reporting-investigation',
        score: 6.5,
        rationale:
          'The IPC charge-sheeting rate was 80.8% and the murder charge-sheeting rate 97.1%, while registration changes and case quality remain important limitations.',
      },
      {
        dimensionId: 'safety-justice-delivery',
        score: 5.3,
        rationale:
          'Completed-trial conviction was 18.4% for women cases and 27.5% for child cases, with court pendency above 83% in both categories.',
      },
      {
        dimensionId: 'safety-cyber-resilience',
        score: 4.8,
        rationale:
          'Registered cybercrime rose from 1,076 cases in 2021 to 4,121 in 2023; completed-trial conviction was 31.8% but court pendency reached 91.6%.',
      },
    ],
  },
]

const budgetDimensionIds = [
  'strategy',
  'fiscal',
  'capacity',
  'inclusion',
  'delivery',
] as const

const tamilNaduBudgetComponents: Record<string, number[]> = {
  'budget-tn-2019-20': [7.5, 7.2, 7.5, 6.8, 6.5],
  'budget-tn-2021-22': [7.5, 4.8, 7.5, 8.5, 5.5],
  'budget-tn-2025-26': [8, 6.3, 8.2, 8, 6],
}

function budgetRating(budgetId: string) {
  const scores = tamilNaduBudgetComponents[budgetId]
  return Math.round((scores.reduce((sum, score) => sum + score, 0) / 5) * 10) / 10
}

export const tamilNaduBudgets: BudgetSeed[] = [
  {
    id: 'budget-tn-2019-20',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-palaniswami-2017',
    title: 'Tamil Nadu Budget 2019-20',
    shortTitle: 'Infrastructure and fiscal-consolidation plan',
    fiscalYear: '2019-20',
    presentedDate: '2019-02-08',
    financeMinister: 'O. Panneerselvam',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'proposal',
    summary:
      'An EPS-government plan combining a lower proposed deficit with large transport, irrigation, urban housing, health-reform, and cleaner-bus commitments.',
    plainLanguage:
      'The budget tried to keep borrowing under control while raising capital spending and funding roads, water, buses, housing, health, education, food, and electricity support. The proposal still carried large committed costs and several execution-heavy projects.',
    totalExpenditureCrore: 264556,
    revenueExpenditureCrore: 212036,
    capitalExpenditureCrore: 52520,
    fiscalDeficitCrore: 44176,
    fiscalDeficitPctGdp: 2.56,
    ratingScore: budgetRating('budget-tn-2019-20'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Proposal rating 7.1/10: a relatively credible fiscal and infrastructure plan with useful health, transport, and urban capacity; reduced by recurring liabilities, weaker rural and nutrition allocations, and execution risk.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['prs-tn-budget-2019-20'],
  },
  {
    id: 'budget-tn-2021-22',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'First Stalin government budget',
    shortTitle: 'Pandemic recovery and inclusion budget',
    fiscalYear: '2021-22',
    presentedDate: '2021-08-13',
    financeMinister: 'Palanivel Thiaga Rajan',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'proposal',
    summary:
      'A pandemic-era recovery plan centred on health, social protection, education, roads, housing, urban employment, and administrative reform while carrying a very large deficit.',
    plainLanguage:
      'The new government spent heavily to protect households and public services after COVID-19 and proposed substantial capital investment. The tradeoff was a fiscal deficit above 4% of GSDP and a revenue deficit that meant borrowing also financed day-to-day spending.',
    totalExpenditureCrore: 329035,
    revenueExpenditureCrore: 261189,
    capitalExpenditureCrore: 67846,
    fiscalDeficitCrore: 92529,
    fiscalDeficitPctGdp: 4.33,
    ratingScore: budgetRating('budget-tn-2021-22'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Proposal rating 6.8/10: strong recovery, inclusion, health, and road priorities with meaningful capital outlay; sharply reduced by pandemic-era revenue and fiscal deficits, borrowing dependence, and execution uncertainty.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['prs-tn-budget-2021-22', 'niti-tn-macro-fiscal-2025'],
  },
  {
    id: 'budget-tn-2025-26',
    jurisdictionId: 'tamil-nadu',
    leaderTermId: 'tn-stalin-2021',
    title: 'Tamil Nadu Budget 2025-26',
    shortTitle: 'Capital, welfare, and industrial transition',
    fiscalYear: '2025-26',
    presentedDate: '2025-03-14',
    financeMinister: 'Thangam Thennarasu',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'proposal',
    summary:
      'The final full Stalin-term budget combined a 22% increase in capital outlay with roads, power investment, education, social protection, health, rural development, water, and semiconductor policy.',
    plainLanguage:
      'The plan put more money into assets and productive capacity without abandoning welfare. Its hard constraint was that salaries, pensions, and interest already consumed about 62% of revenue receipts, while a revenue deficit, debt, and power-company losses limited flexibility.',
    totalExpenditureCrore: 486332,
    revenueExpenditureCrore: 373204,
    capitalExpenditureCrore: 57231,
    fiscalDeficitCrore: 106968,
    fiscalDeficitPctGdp: 3,
    ratingScore: budgetRating('budget-tn-2025-26'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Proposal rating 7.3/10: a strong capital, infrastructure, education, welfare, and industrial plan with a lower deficit target; reduced by committed spending, revenue deficit, TANGEDCO exposure, and incomplete execution evidence.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['prs-tn-budget-2025-26', 'tn-economic-survey-2025-26'],
  },
]

const tamilNaduBudgetRationales: Record<string, string[]> = {
  'budget-tn-2019-20': [
    'The plan addressed transport, water, urban housing, health, and cleaner public buses while retaining core services.',
    'A 2.56% deficit target and lower proposed revenue deficit were credible, though committed liabilities constrained flexibility.',
    'Capital outlay, roads, buses, irrigation, housing, and health-system reform supported productive and public capacity.',
    'Education, food, health, housing, and insurance had broad reach, while rural development and nutrition allocations fell.',
    'Large bus, housing, health, and infrastructure programmes required difficult procurement and implementation.',
  ],
  'budget-tn-2021-22': [
    'Pandemic recovery, health, social protection, housing, urban employment, roads, and administration matched immediate needs.',
    'The 4.33% fiscal deficit and 2.75% revenue deficit reflected crisis conditions but weakened fiscal credibility.',
    'Rs 67,846 crore of capital expenditure and Rs 14,015 crore of road and bridge capital supported recovery capacity.',
    'Health, social welfare, agriculture, housing, schooling, and employment made inclusion the strongest dimension.',
    'COVID disruption, ambitious receipts, debt, and large recurring commitments created substantial delivery risk.',
  ],
  'budget-tn-2025-26': [
    'The plan coherently combined roads, power, water, education, welfare, rural development, and higher-value industry.',
    'The 3% fiscal-deficit target improved, while a Rs 41,635 crore revenue deficit and high committed expenditure remained.',
    'Capital outlay rose to Rs 57,231 crore, with major roads, energy, irrigation, and urban investment.',
    'Education, social welfare, women support, breakfast, health, agriculture, and rural programmes retained broad reach.',
    'Power-company exposure, debt, procurement, revenue rigidity, and the fiscal year crossing a government change limit confidence.',
  ],
}

export const tamilNaduBudgetScores: BudgetScoreSeed[] = Object.entries(
  tamilNaduBudgetComponents,
).flatMap(([budgetId, scores]) =>
  scores.map((score, index) => ({
    budgetId,
    dimensionId: budgetDimensionIds[index],
    score,
    rationale: tamilNaduBudgetRationales[budgetId][index],
  })),
)

export const tamilNaduBudgetAllocations: BudgetAllocationSeed[] = [
  {
    id: 'tn-2019-education',
    budgetId: 'budget-tn-2019-20',
    category: 'education',
    label: 'Education',
    amountCrore: 35777,
    note: 'School and higher-education sector allocation.',
    sourceId: 'prs-tn-budget-2019-20',
    sortOrder: 1,
  },
  {
    id: 'tn-2019-urban-services',
    budgetId: 'budget-tn-2019-20',
    category: 'urban-development',
    label: 'Water, sanitation, housing, and urban development',
    amountCrore: 15196,
    note: 'Included urban housing, Smart Cities, AMRUT, and Chennai Metro support.',
    sourceId: 'prs-tn-budget-2019-20',
    sortOrder: 2,
  },
  {
    id: 'tn-2019-health',
    budgetId: 'budget-tn-2019-20',
    category: 'health',
    label: 'Health and family welfare',
    amountCrore: 12398,
    note: 'Included CMCHIS and the proposed health-system reform programme.',
    sourceId: 'prs-tn-budget-2019-20',
    sortOrder: 3,
  },
  {
    id: 'tn-2019-transport',
    budgetId: 'budget-tn-2019-20',
    category: 'transport',
    label: 'Transport',
    amountCrore: 12223,
    note: 'Included roads, panchayat-road upgrades, and a large bus-modernisation plan.',
    sourceId: 'prs-tn-budget-2019-20',
    sortOrder: 4,
  },
  {
    id: 'tn-2021-education',
    budgetId: 'budget-tn-2021-22',
    category: 'education',
    label: 'Education, sports, arts, and culture',
    amountCrore: 40208,
    note: 'Government primary and secondary schools formed the largest named portions.',
    sourceId: 'prs-tn-budget-2021-22',
    sortOrder: 1,
  },
  {
    id: 'tn-2021-social-welfare',
    budgetId: 'budget-tn-2021-22',
    category: 'social-welfare',
    label: 'Social welfare and nutrition',
    amountCrore: 24527,
    note: 'Included pensions and school meals.',
    sourceId: 'prs-tn-budget-2021-22',
    sortOrder: 2,
  },
  {
    id: 'tn-2021-agriculture',
    budgetId: 'budget-tn-2021-22',
    category: 'agriculture',
    label: 'Agriculture and allied activities',
    amountCrore: 23398,
    note: 'Included crop insurance and farmer support.',
    sourceId: 'prs-tn-budget-2021-22',
    sortOrder: 3,
  },
  {
    id: 'tn-2021-health',
    budgetId: 'budget-tn-2021-22',
    category: 'health',
    label: 'Health and family welfare',
    amountCrore: 18632,
    note: 'Included COVID response, medical colleges, and National Health Mission activity.',
    sourceId: 'prs-tn-budget-2021-22',
    sortOrder: 4,
  },
  {
    id: 'tn-2021-roads',
    budgetId: 'budget-tn-2021-22',
    category: 'transport',
    label: 'Capital outlay on roads and bridges',
    amountCrore: 14015,
    note: 'The largest named transport-capacity allocation.',
    sourceId: 'prs-tn-budget-2021-22',
    sortOrder: 5,
  },
  {
    id: 'tn-2025-education',
    budgetId: 'budget-tn-2025-26',
    category: 'education',
    label: 'Education, sports, arts, and culture',
    amountCrore: 57783,
    note: 'Included major government primary and secondary school allocations.',
    sourceId: 'prs-tn-budget-2025-26',
    sortOrder: 1,
  },
  {
    id: 'tn-2025-social-welfare',
    budgetId: 'budget-tn-2025-26',
    category: 'social-welfare',
    label: 'Social welfare and nutrition',
    amountCrore: 38096,
    note: 'Included Rs 13,807 crore for Kalaignar Magalir Urimai Thogai.',
    sourceId: 'prs-tn-budget-2025-26',
    sortOrder: 2,
  },
  {
    id: 'tn-2025-transport',
    budgetId: 'budget-tn-2025-26',
    category: 'transport',
    label: 'Transport',
    amountCrore: 27971,
    note: 'Included Rs 18,456 crore of capital outlay on roads and bridges.',
    sourceId: 'prs-tn-budget-2025-26',
    sortOrder: 3,
  },
  {
    id: 'tn-2025-agriculture',
    budgetId: 'budget-tn-2025-26',
    category: 'agriculture',
    label: 'Agriculture and allied activities',
    amountCrore: 23964,
    note: 'Included electricity-board payments for farm pump-set support.',
    sourceId: 'prs-tn-budget-2025-26',
    sortOrder: 4,
  },
  {
    id: 'tn-2025-health',
    budgetId: 'budget-tn-2025-26',
    category: 'health',
    label: 'Health and family welfare',
    amountCrore: 21348,
    note: 'Included major urban allopathic health services.',
    sourceId: 'prs-tn-budget-2025-26',
    sortOrder: 5,
  },
  {
    id: 'tn-2025-energy',
    budgetId: 'budget-tn-2025-26',
    category: 'energy',
    label: 'Energy',
    amountCrore: 20354,
    note: 'Included domestic subsidy, loss funding, and a large equity infusion into the power distributor.',
    sourceId: 'prs-tn-budget-2025-26',
    sortOrder: 6,
  },
]

function budgetPoints(
  budgetId: string,
  sourceId: string,
  rows: Array<[BudgetPointSeed['pointType'], string, string]>,
) {
  return rows.map(([pointType, title, body], index) => ({
    id: `${budgetId}-${pointType}-${index + 1}`,
    budgetId,
    pointType,
    title,
    body,
    sourceId,
    sortOrder: index + 1,
  }))
}

export const tamilNaduBudgetPoints: BudgetPointSeed[] = [
  ...budgetPoints('budget-tn-2019-20', 'prs-tn-budget-2019-20', [
    [
      'priority',
      'Modernise transport, water, housing, and health',
      'The plan combined roads, buses, irrigation, urban housing, water, health reform, education, and food support.',
    ],
    [
      'strength',
      'Lower proposed deficits with higher capital outlay',
      'The budget targeted a 2.56% fiscal deficit while increasing capital outlay about 19% over the revised prior year.',
    ],
    [
      'risk',
      'Large recurring and execution-heavy commitments',
      'Committed liabilities, bus procurement, housing, TANGEDCO support, and infrastructure delivery constrained flexibility.',
    ],
  ]),
  ...budgetPoints('budget-tn-2021-22', 'prs-tn-budget-2021-22', [
    [
      'priority',
      'Protect households and rebuild after COVID-19',
      'Health, social protection, agriculture, schooling, housing, employment, and roads anchored the first budget.',
    ],
    [
      'strength',
      'Inclusion and capital investment moved together',
      'The plan paired Rs 67,846 crore of capital expenditure with a large welfare and public-service response.',
    ],
    [
      'risk',
      'Borrowing financed both recovery and day-to-day spending',
      'The 4.33% fiscal deficit and 2.75% revenue deficit left little room for execution misses.',
    ],
    [
      'context',
      'Pandemic estimates are unusually unstable',
      'Receipts, health needs, growth, and restrictions changed rapidly, so proposal and outturn must remain separate.',
    ],
  ]),
  ...budgetPoints('budget-tn-2025-26', 'prs-tn-budget-2025-26', [
    [
      'priority',
      'Raise productive capacity without abandoning welfare',
      'Roads, power, water, education, rural development, women support, nutrition, and semiconductor policy were combined.',
    ],
    [
      'strength',
      'Capital outlay increased by 22%',
      'The proposal put Rs 57,231 crore into asset creation, including large road and energy investment.',
    ],
    [
      'risk',
      'Committed expenditure and power losses limit flexibility',
      'Salaries, pensions, and interest consumed about 62% of revenue receipts, while TANGEDCO support remained large.',
    ],
    [
      'context',
      'The fiscal year crossed a change of government',
      'The budget was proposed by the Stalin government and ended before the current Vijay government produced a reviewed full budget.',
    ],
  ]),
]
