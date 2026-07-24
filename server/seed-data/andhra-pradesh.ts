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

const reviewedAt = '2026-07-24'

export const andhraSources: SourceSeed[] = [
  {
    id: 'ap-reorganisation-act-2014',
    title: 'Andhra Pradesh Reorganisation Act, 2014',
    publisher: 'India Code, Government of India',
    url: 'https://upload.indiacode.nic.in/view-casepdf?id=AC_CEN_5_5_00058_201406_1517807327989&type=act',
    sourceType: 'primary-law',
    reliability: 5,
    ratingReason:
      'Authoritative statutory record defining the successor states, boundaries, institutions, assets, liabilities, and appointed day.',
    bestFor:
      'The June 2, 2014 boundary break and the legal basis for treating post-split Andhra Pradesh as a separate jurisdiction.',
    limitations:
      'The Act establishes legal arrangements; it does not prove that bifurcation commitments were implemented fairly or completely.',
    publishedDate: '2014-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-reorganisation-portal',
    title: 'Andhra Pradesh Reorganisation Portal',
    publisher: 'Government of Andhra Pradesh',
    url: 'https://reorganisation.ap.gov.in/index.jsp',
    sourceType: 'official-record',
    reliability: 5,
    ratingReason:
      'Official state portal confirming the June 2, 2014 appointed day and implementation work created by bifurcation.',
    bestFor: 'State reorganisation chronology and administrative follow-through.',
    limitations:
      'A state-government portal is not an independent assessment of unresolved Union-state disputes.',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-ses-2024-25',
    title: 'Andhra Pradesh Socio Economic Survey 2024-25',
    publisher: 'Finance Department, Government of Andhra Pradesh',
    url: 'https://s3.ap-south-1.amazonaws.com/apfinance.gov.in/uploads/index-docs/AP_Socio_Economic_Survey_2024_25.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Primary state statistical compendium with post-bifurcation GSDP, per-capita income, public finance, labour, health, poverty, infrastructure, and programme data.',
    bestFor:
      'Post-2014 state indicator series, fiscal estimates, programme chronology, and current administrative context.',
    limitations:
      'Advance and revised estimates can change; government programme descriptions require independent outcome evidence.',
    publishedDate: '2025-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-ses-2017-18',
    title: 'Andhra Pradesh Socio Economic Survey 2017-18',
    publisher: 'Finance Department, Government of Andhra Pradesh',
    url: 'https://s3.ap-south-1.amazonaws.com/apfinance.gov.in/uploads/index-docs/SocioEconomicalSurvey2017-18.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Primary state statistical compendium reporting road-network stocks, Rural Roads Plan delivery, maintenance works, and the early post-bifurcation infrastructure baseline.',
    bestFor:
      'Road-network and completed-work evidence during the 2014-19 Naidu term.',
    limitations:
      'Programme outputs are official self-reports; road length does not establish condition, travel-time gains, safety, or exclusive Chief Minister attribution.',
    publishedDate: '2018-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-ses-2019-20',
    title: 'Andhra Pradesh Socio Economic Survey 2019-20',
    publisher: 'Finance Department, Government of Andhra Pradesh',
    url: 'https://s3.ap-south-1.amazonaws.com/apfinance.gov.in/uploads/index-docs/Socio-Economic-Survey-2019-20.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Primary state statistical compendium reporting the road-network stock and completed rural-road work during the fiscal year spanning the 2019 change of government.',
    bestFor:
      'The April 2019 road baseline and transition-year delivery that cannot be assigned wholly to either CM term.',
    limitations:
      'The fiscal year crosses administrations and programme outputs are official self-reports rather than independent condition or impact measures.',
    publishedDate: '2020-06-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'mord-ap-action-plan-2024-25',
    title: 'Action Plan of States and Union Territories 2024-25: Andhra Pradesh',
    publisher: 'Ministry of Rural Development, Government of India',
    url: 'https://www.dord.gov.in/static/uploads/2024/11/f078b63b2c314959796dcd635d7dc71d.pdf',
    sourceType: 'official-programme-review',
    reliability: 5,
    ratingReason:
      'Union ministry review reporting Andhra Pradesh PMGSY targets, completed road length, connected habitations, releases, and the next action plan.',
    bestFor:
      'Checking annual PMGSY delivery against targets rather than relying only on cumulative state totals.',
    limitations:
      'An administrative programme review does not measure road condition, usage, travel time, economic impact, or the full state and local road system.',
    publishedDate: '2024-11-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'pib-ap-pmgsy-2019-24',
    title: 'Construction of roads under PMGSY: state and year tables',
    publisher: 'Ministry of Rural Development via Press Information Bureau',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2043782',
    sourceType: 'official-programme-record',
    reliability: 5,
    ratingReason:
      'Union parliamentary reply publishing state-by-year sanctioned and completed PMGSY road length from 2019-20 through 2024-25.',
    bestFor:
      'Annual Andhra Pradesh PMGSY completion during the 2019-24 Jagan term and the transition into the next term.',
    limitations:
      'PMGSY is jointly financed and state-implemented; completed kilometres do not by themselves measure condition, use, maintenance, or CM causation.',
    publishedDate: '2024-08-09',
    accessedDate: reviewedAt,
  },
  {
    id: 'pib-ap-pmgsy-2026',
    title: 'Phase-wise construction of rural roads under PMGSY',
    publisher: 'Ministry of Rural Development via Press Information Bureau',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2287313',
    sourceType: 'official-programme-record',
    reliability: 5,
    ratingReason:
      'Current Union parliamentary reply publishing Andhra Pradesh PMGSY completion through July 16, 2026, with yearly finance and maintenance responsibilities.',
    bestFor:
      'The cleanest current-term rural-road output evidence and cumulative programme context.',
    limitations:
      'Cumulative totals include pre-bifurcation and pre-2014 work; annual kilometres remain shared Union-state delivery and are not a quality or impact measure.',
    publishedDate: '2026-07-21',
    accessedDate: reviewedAt,
  },
  {
    id: 'morth-road-accidents-2024-ap',
    title: 'Road Accidents in India 2024',
    publisher: 'Ministry of Road Transport and Highways, Government of India',
    url: 'https://morth.gov.in/backend/documents/uploaded/1781177676_V1gUW8tJWT.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'National statistical report publishing comparable state-level crashes, deaths, severity, road class, and multi-year trends.',
    bestFor:
      'The Andhra Pradesh road-safety outcome series from 2020 through 2024.',
    limitations:
      'Police-reported crashes can be under-recorded and do not isolate road design, enforcement, emergency care, vehicle growth, or individual government responsibility.',
    publishedDate: '2026-06-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'cag-ap-appropriation-2022-23',
    title: 'Andhra Pradesh Appropriation Accounts 2022-23',
    publisher: 'Comptroller and Auditor General of India',
    url: 'https://cag.gov.in/uploads/state_accounts_report/account-report-Appropriation-Accounts-2022-23-065c4cd689fba81-67734359.pdf',
    sourceType: 'constitutional-audit',
    reliability: 5,
    ratingReason:
      'Constitutional audit record showing the original provision, surrender, expenditure, and stated or missing reasons by grant and scheme.',
    bestFor:
      'Independent verification that the full Rs 100 crore capital Road Safety Fund provision was surrendered in 2022-23.',
    limitations:
      'A budget surrender is an execution warning; it does not alone prove the condition of every road or assign responsibility for every crash.',
    publishedDate: '2023-11-29',
    accessedDate: reviewedAt,
  },
  {
    id: 'pib-ap-panchayat-awards-2025',
    title: 'Andhra Pradesh Secures 5 National Panchayat Awards 2025',
    publisher: 'Ministry of Panchayati Raj via Press Information Bureau',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2261368',
    sourceType: 'official-award-record',
    reliability: 5,
    ratingReason:
      'Controlling announcement naming the five Andhra Pradesh awardees, categories, ranks, and cited local outcomes.',
    bestFor:
      'Verifying the awards and the specific Panchayat achievements recognized by the Union ministry.',
    limitations:
      'An award is selective external recognition, not an independent statewide impact evaluation or proof of exclusive state-government credit.',
    publishedDate: '2026-05-15',
    accessedDate: reviewedAt,
  },
  {
    id: 'niti-ap-macro-fiscal-2025',
    title: 'Macro and Fiscal Landscape of Andhra Pradesh',
    publisher: 'NITI Aayog',
    url: 'https://www.niti.gov.in/sites/default/files/2025-03/Macro-and-Fiscal-Landscape-of-the-State-of-Andhra-Pradesh-1.pdf',
    sourceType: 'official-analysis',
    reliability: 4,
    ratingReason:
      'Named comparative analysis using MoSPI, RBI, PLFS, NFHS, Census, and state-finance records with explicit post-bifurcation treatment.',
    bestFor:
      'Growth, employment, human development, fiscal risk, debt sustainability, and cross-state context.',
    limitations:
      'A synthesis rather than the controlling record for each underlying series; several charts round values.',
    publishedDate: '2025-03-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'nfhs4-ap',
    title: 'NFHS-4 State Fact Sheet: Andhra Pradesh',
    publisher: 'Ministry of Health and Family Welfare and IIPS',
    url: 'https://dhsprogram.com/pubs/pdf/OF31/OF31.AP.pdf',
    sourceType: 'official-survey',
    reliability: 5,
    ratingReason:
      'Official post-split household survey benchmark with documented sampling, fieldwork, and indicator definitions.',
    bestFor:
      '2015-16 electricity, sanitation, schooling, health, nutrition, and mortality baselines.',
    limitations:
      'Survey estimates have sampling uncertainty and some indicators changed definition in NFHS-5.',
    publishedDate: '2017-01-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'nfhs5-ap',
    title: 'NFHS-5 State Fact Sheet: Andhra Pradesh',
    publisher: 'Ministry of Health and Family Welfare and IIPS',
    url: 'https://dhsprogram.com/pubs/pdf/OF43/OF43.AP.pdf',
    sourceType: 'official-survey',
    reliability: 5,
    ratingReason:
      'Official state household survey with comparable NFHS-4 values and disclosed fieldwork dates.',
    bestFor:
      '2019-20 household services, schooling, health, nutrition, mortality, and internet-use observations.',
    limitations:
      'Survey outcomes overlap both the end of the 2014-19 term and opening months of the 2019-24 term.',
    publishedDate: '2020-12-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'eci-ap-2019',
    title: 'Andhra Pradesh Legislative Assembly Election 2019: Detailed Results',
    publisher: 'Election Commission of India',
    url: 'https://hindi.eci.gov.in/files/file/10252-andhra-pradesh-legislative-assembly-election-2019/?do=download',
    sourceType: 'official-election-result',
    reliability: 5,
    ratingReason:
      'Authoritative constituency-level result record for the 2019 Andhra Pradesh election.',
    bestFor: 'The YSRCP mandate and 2019 change of government.',
    limitations:
      'Election results establish votes and seats, not policy quality or causal explanations for the outcome.',
    publishedDate: '2019-05-23',
    accessedDate: reviewedAt,
  },
  {
    id: 'eci-ap-2024',
    title: 'Andhra Pradesh Legislative Assembly Election 2024: Statistical Reports',
    publisher: 'Election Commission of India',
    url: 'https://www.eci.gov.in/statistical-report/ae/2024/2',
    sourceType: 'official-election-result',
    reliability: 5,
    ratingReason:
      'Authoritative ECI statistical record for the 2024 Andhra Pradesh Assembly election.',
    bestFor: 'The 2024 NDA alliance victory and return of N. Chandrababu Naidu.',
    limitations:
      'Election results do not establish the quality of the incoming government or explain voter motivation by themselves.',
    publishedDate: '2024-06-04',
    accessedDate: reviewedAt,
  },
  {
    id: 'pti-naidu-oath-2014',
    title: 'Chandrababu Naidu takes oath as first Chief Minister of residuary Andhra Pradesh',
    publisher: 'Press Trust of India via Times of India',
    url: 'https://timesofindia.indiatimes.com/india/chandrababu-naidu-takes-oath-as-first-cm-of-new-andhra-pradesh/articleshow/36255624.cms',
    sourceType: 'independent-news',
    reliability: 3,
    ratingReason:
      'Attributed PTI chronology of the June 8, 2014 oath ceremony.',
    bestFor: 'The first post-split Chief Minister term start.',
    limitations:
      'Secondary reporting; the legal boundary date is controlled by the Reorganisation Act.',
    publishedDate: '2014-06-08',
    accessedDate: reviewedAt,
  },
  {
    id: 'ndtv-jagan-oath-2019',
    title: 'Jagan Mohan Reddy sworn in as Andhra Pradesh Chief Minister',
    publisher: 'NDTV',
    url: 'https://www.ndtv.com/andhra-pradesh-news/jagan-mohan-reddy-takes-oath-as-andhra-pradesh-chief-minister-2045269',
    sourceType: 'independent-news',
    reliability: 3,
    ratingReason:
      'Contemporaneous oath and transition reporting after the official election result.',
    bestFor: 'The May 30, 2019 Chief Minister term start.',
    limitations:
      'Ceremony reporting is secondary to ECI and official appointment records.',
    publishedDate: '2019-05-30',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-budget-2014-15',
    title: 'Annual Financial Statement and Explanatory Memorandum 2014-15',
    publisher: 'Finance Department, Government of Andhra Pradesh',
    url: 'https://s3.ap-south-1.amazonaws.com/apfinance.gov.in/uploads/budget-volumes/2014-15/Volume-I-1.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason:
      'Primary first full budget record for residuary Andhra Pradesh.',
    bestFor:
      'Revenue, capital outlay, deficit, irrigation, transport, and new-state fiscal constraints.',
    limitations:
      'Budget estimates are plans, not actual spending or demonstrated outcomes.',
    publishedDate: '2014-08-20',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-budget-2019-20',
    title: 'Annual Financial Statement and Explanatory Memorandum 2019-20',
    publisher: 'Finance Department, Government of Andhra Pradesh',
    url: 'https://s3.ap-south-1.amazonaws.com/apfinance.gov.in/uploads/budget-volumes/2019-20/Volume-I-1%20%281%29.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason:
      'Primary first full budget record of the Jagan Mohan Reddy government.',
    bestFor:
      'Welfare expansion, revenue and capital estimates, irrigation, social services, and borrowing.',
    limitations:
      'Presented estimates preceded COVID-19 and differ materially from later execution.',
    publishedDate: '2019-07-12',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-budget-2026-27',
    title: 'Annual Financial Statement and Explanatory Memorandum 2026-27',
    publisher: 'Finance Department, Government of Andhra Pradesh',
    url: 'https://apfinance.gov.in/...Bud@et26-27/documents/Volume-I-1.pdf',
    sourceType: 'official-budget-record',
    reliability: 5,
    ratingReason:
      'Primary current state budget record with revenue, capital, borrowing, and sector outlay estimates.',
    bestFor:
      'The current Naidu government’s 2026-27 fiscal plan and proposed capital allocation.',
    limitations:
      'Proposal-year results and final actual spending do not yet exist.',
    publishedDate: '2026-02-14',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-village-secretariat-go',
    title: 'Government order establishing the Village and Ward Secretariat system',
    publisher: 'Government of Andhra Pradesh',
    url: 'https://etcsrikalahasti.ap.gov.in/assets/PDF/5_6062116042157588864.pdf',
    sourceType: 'official-policy',
    reliability: 5,
    ratingReason:
      'Primary state order establishing the local service-delivery architecture.',
    bestFor: 'Institutional design, staffing, and implementation chronology.',
    limitations:
      'The order does not independently establish service quality, political neutrality, or cost-effectiveness.',
    publishedDate: '2019-07-19',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-amaravati-judgment-2022',
    title: 'Rajadhani Rythu Parirakshana Samithi v. State of Andhra Pradesh',
    publisher: 'High Court of Andhra Pradesh, mirrored by Bar and Bench',
    url: 'https://images.assettype.com/barandbench/2022-03/78b1f2e8-ab78-4438-ba28-99561a981886/Rajadhani_Rythu_Parirakshnana_Samithi_v__The_State_of_Andhra_Pradesh.pdf',
    sourceType: 'court-judgment',
    reliability: 5,
    ratingReason:
      'Full judgment text addressing Amaravati, farmer commitments, state competence, and capital-development obligations.',
    bestFor: 'The controlling 2022 High Court findings and directions.',
    limitations:
      'Parts of the remedy entered later Supreme Court proceedings; legal status must be read with subsequent orders.',
    publishedDate: '2022-03-03',
    accessedDate: reviewedAt,
  },
  {
    id: 'ap-crda',
    title: 'Andhra Pradesh Capital Region Development Authority',
    publisher: 'APCRDA, Government of Andhra Pradesh',
    url: 'https://crda.ap.gov.in/',
    sourceType: 'official-agency',
    reliability: 5,
    ratingReason:
      'Primary agency record for Amaravati planning, land pooling, projects, and current implementation.',
    bestFor: 'Capital-region programme design and current project status.',
    limitations:
      'Agency benefit and finance claims require audit and independent corroboration.',
    accessedDate: reviewedAt,
  },
  {
    id: 'ndma-hudhud-lessons',
    title: 'Cyclone Hudhud: Strategies and Lessons for Preparing Better and Strengthening Risk Resilience',
    publisher: 'National Disaster Management Authority',
    url: 'https://ndma.gov.in/sites/default/files/PDF/Reports/Hudhud-lessons.pdf',
    sourceType: 'official-disaster-review',
    reliability: 5,
    ratingReason:
      'Named post-disaster review of warning, evacuation, response, damage, and recovery lessons.',
    bestFor: 'Hudhud chronology and administrative-response assessment.',
    limitations:
      'A government review may understate responsibility or distributional gaps.',
    publishedDate: '2015-06-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'world-bank-ap-disaster-recovery',
    title: 'Andhra Pradesh Disaster Recovery Project',
    publisher: 'World Bank',
    url: 'https://www.worldbank.org/en/news/press-release/2015/06/16/approves-250-million-andhra-pradesh-disaster-recovery-project',
    sourceType: 'multilateral-record',
    reliability: 4,
    ratingReason:
      'Independent multilateral record of assessed Hudhud impact and the recovery programme.',
    bestFor: 'Affected population, recovery scope, and resilience investments.',
    limitations:
      'Project financing and outputs do not by themselves establish complete recovery or attribution.',
    publishedDate: '2015-06-16',
    accessedDate: reviewedAt,
  },
]

export const andhraJurisdictions: JurisdictionSeed[] = [
  {
    id: 'andhra-pradesh',
    name: 'State of Andhra Pradesh',
    shortName: 'Andhra Pradesh',
    level: 'state',
    parentId: 'india',
    isoCode: 'IN-AP',
    validFrom: '2014-06-02',
    status: 'published',
  },
]

export const andhraOffices: OfficeSeed[] = [
  {
    id: 'andhra-pradesh-chief-minister',
    jurisdictionId: 'andhra-pradesh',
    name: 'Chief Minister of Andhra Pradesh',
    shortName: 'Chief Minister',
    role: 'head-of-government',
  },
]

export const andhraPeople: PersonSeed[] = [
  {
    id: 'n-chandrababu-naidu',
    name: 'N. Chandrababu Naidu',
    sortName: 'Naidu, N. Chandrababu',
    birthDate: '1950-04-20',
  },
  {
    id: 'ys-jagan-mohan-reddy',
    name: 'Y. S. Jagan Mohan Reddy',
    sortName: 'Reddy, Y. S. Jagan Mohan',
    birthDate: '1972-12-21',
  },
]

export const andhraParties: PartySeed[] = [
  {
    id: 'tdp',
    name: 'Telugu Desam Party',
    shortName: 'TDP',
    color: '#d9a900',
  },
  {
    id: 'ysrcp',
    name: 'Yuvajana Sramika Rythu Congress Party',
    shortName: 'YSRCP',
    color: '#2774ae',
  },
]

export const andhraLeaderTerms: LeaderTermSeed[] = [
  {
    id: 'ap-naidu-2014',
    officeId: 'andhra-pradesh-chief-minister',
    personId: 'n-chandrababu-naidu',
    partyId: 'tdp',
    startDate: '2014-06-08',
    endDate: '2019-05-29',
    mandateLabel: 'First government of post-split Andhra Pradesh, 2014-2019',
    ratingScore: 6.9,
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong new-state institution building, growth, rural-road delivery, broader infrastructure ambition, and Hudhud response; reduced by Amaravati concentration and land-risk questions, fiscal pressure, incomplete capital delivery, and uneven inclusion.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'ap-reorganisation-act-2014',
      'pti-naidu-oath-2014',
      'ap-budget-2014-15',
      'ap-ses-2017-18',
      'ap-ses-2024-25',
      'niti-ap-macro-fiscal-2025',
      'ap-crda',
      'ndma-hudhud-lessons',
    ],
  },
  {
    id: 'ap-jagan-2019',
    officeId: 'andhra-pradesh-chief-minister',
    personId: 'ys-jagan-mohan-reddy',
    partyId: 'ysrcp',
    startDate: '2019-05-30',
    endDate: '2024-06-11',
    mandateLabel: 'YSRCP government, 2019-2024',
    ratingScore: 6.3,
    ratingConfidence: 'medium',
    ratingSummary:
      'Large welfare and local-service-delivery expansion with household-service, poverty, and cumulative rural-connectivity gains; reduced by fiscal and off-budget risk, weak capital expenditure, missed 2023-24 PMGSY delivery targets, capital-city uncertainty, and institutional concentration.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'eci-ap-2019',
      'ndtv-jagan-oath-2019',
      'ap-budget-2019-20',
      'ap-ses-2019-20',
      'ap-ses-2024-25',
      'mord-ap-action-plan-2024-25',
      'pib-ap-pmgsy-2019-24',
      'morth-road-accidents-2024-ap',
      'cag-ap-appropriation-2022-23',
      'niti-ap-macro-fiscal-2025',
      'nfhs5-ap',
      'ap-village-secretariat-go',
      'ap-amaravati-judgment-2022',
    ],
  },
  {
    id: 'ap-naidu-2024',
    officeId: 'andhra-pradesh-chief-minister',
    personId: 'n-chandrababu-naidu',
    partyId: 'tdp',
    startDate: '2024-06-12',
    mandateLabel: 'TDP-Jana Sena-BJP alliance government, 2024-present',
    ratingScore: 6.6,
    ratingConfidence: 'low',
    ratingSummary:
      'A provisional early-term assessment: renewed capital investment, documented road-rehabilitation and PMGSY delivery, a large 2026-27 capital plan, and strong growth intent; debt, road safety, execution capacity, and incomplete outcomes limit confidence. Panchayat awards corroborate local performance but add no separate score.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'eci-ap-2024',
      'ap-budget-2026-27',
      'ap-ses-2024-25',
      'pib-ap-pmgsy-2026',
      'morth-road-accidents-2024-ap',
      'pib-ap-panchayat-awards-2025',
      'niti-ap-macro-fiscal-2025',
      'ap-crda',
    ],
  },
]

const andhraLeaderComponentScores: Record<string, number[]> = {
  'ap-naidu-2014': [7.3, 7.7, 6.3, 7.5, 6, 6],
  'ap-jagan-2019': [6.5, 6.8, 7.5, 6.2, 4.8, 4.8],
  'ap-naidu-2024': [6.9, 7, 6.5, 6.5, 6.2, 6],
}

const andhraLeaderRationales: Record<string, string[]> = {
  'ap-naidu-2014': [
    'Real GSDP and real per-capita NSDP expanded strongly from a difficult bifurcation baseline. The 2017-18 survey also reported 126 of 157 Rural Roads Plan works complete, though inherited programmes and national trends limit attribution.',
    'New-state administration, Amaravati planning, land pooling, irrigation, the Rural Roads Plan, and digital-governance ambition were durable initiatives, with incomplete delivery and later reversal risk.',
    'Household electricity was already high and sanitation, services, income, and rural-road access improved, while regional and livelihood burdens around the capital plan remained material.',
    'The government managed the immediate post-split transition and Hudhud response credibly, with reconstruction and resilience investment following.',
    'Competitive institutions continued, but capital planning was highly centralised and consultation, land, and regional-balance concerns lower the score.',
    'Administrative drive was strong; optimistic financing, unfinished projects, and rising fiscal obligations reduce execution and integrity confidence.',
  ],
  'ap-jagan-2019': [
    'Per-capita output recovered after the pandemic, household deprivation indicators improved, and 3,534 km of PMGSY roads were completed from 2019-20 through 2023-24. The first fiscal year crosses governments, the programme is Union-state, and weak capital formation tempers attribution.',
    'Village and ward secretariats, direct benefit delivery, school and health programmes, and welfare architecture changed service access at scale.',
    'MPI poverty, sanitation, schooling, rural connectivity, and several service indicators improved; child anaemia, job quality, and regional opportunity remained weak.',
    'COVID response and service continuity were material tests; the record is mixed across public health, industrial accidents, and disaster readiness.',
    'The three-capitals strategy, prolonged Amaravati uncertainty, court conflict, and concentration of political-administrative power materially reduce the institutions score.',
    'Large welfare execution was a strength, but debt, contingent liabilities, off-budget borrowing, low capital expenditure, the 2023-24 PMGSY target shortfall, surrender of the full Rs 100 crore Road Safety Fund capital provision in 2022-23, persistent fatalities, and transparency concerns reduce the score.',
  ],
  'ap-naidu-2024': [
    'The 2024-25 estimate shows strong real growth, while PMGSY records show 484 km completed in 2025-26 and 141 km through July 16, 2026. These are real early outputs with shared Union-state credit, but the term remains too young for durable outcome attribution.',
    'Amaravati and Polavaram restart, investment promotion, and road rehabilitation are coherent priorities. By December 2024 the state survey reported 92 road sections and 10 bridges complete and 70% of a 5,000 km pothole-work package complete, but longer-run outcomes remain unproven.',
    'The programme combines welfare continuity with infrastructure. Five nationally recognized Panchayats corroborate specific local results, but awards add no separate score because primary credit belongs to local bodies and appraisal years span governments.',
    'Early disaster and administrative response is mixed-positive, with too little elapsed time for a stable crisis score.',
    'Coalition government and renewed capital clarity support the score; institutional performance and treatment of opposition require longer observation.',
    'The current budget is more investment-oriented, while revenue deficit, debt, and the risk of over-promising keep execution confidence modest.',
  ],
}

const evaluationDimensionIds = [
  'outcomes',
  'reforms',
  'inclusion',
  'crisis',
  'institutions',
  'integrity',
] as const

export const andhraLeaderScores: LeaderScoreSeed[] = Object.entries(
  andhraLeaderComponentScores,
).flatMap(([termId, scores]) =>
  scores.map((score, index) => ({
    termId,
    dimensionId: evaluationDimensionIds[index],
    score,
    rationale: andhraLeaderRationales[termId][index],
  })),
)

const policyDimensionIds = [
  'problem-design',
  'effectiveness',
  'implementation',
  'rights-inclusion',
  'durability-side-effects',
] as const

const andhraPolicyComponents: Record<string, Array<number | null>> = {
  'ap-amaravati-capital-2014': [8, 6, 6.5, 5.5, 5.5],
  'ap-rural-road-connectivity-2016': [8.5, 7.5, 6.8, 8, 5.5],
  'ap-village-ward-secretariats-2019': [8.5, 7.5, 8, 7.5, 8],
  'ap-amma-vodi-2019': [8, 6.5, 7.5, 8, 6],
  'ap-nadu-nedu-2019': [8, 7, 7.5, 8, 7.5],
  'ap-three-capitals-2020': [6, 3, 3, 3.5, 2.5],
  'ap-amaravati-restart-2024': [7.5, null, 6.5, 5.5, 6],
}

function policyRating(policyId: string) {
  const weights = [0.2, 0.3, 0.2, 0.15, 0.15]
  let weighted = 0
  let available = 0
  andhraPolicyComponents[policyId].forEach((score, index) => {
    if (score === null) return
    weighted += score * weights[index]
    available += weights[index]
  })
  return Math.round((weighted / available) * 10) / 10
}

export const andhraPolicies: PolicySeed[] = [
  {
    id: 'ap-amaravati-capital-2014',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2014',
    title: 'Amaravati capital development and land pooling',
    shortTitle: 'Amaravati and land pooling',
    policyType: 'capital-development',
    introducedDate: '2014-09-04',
    enactedDate: '2014-12-30',
    effectiveDate: '2015-01-01',
    status: 'enacted',
    coverageStatus: 'reviewed',
    summary:
      'Created APCRDA and assembled land through a returnable-plot land-pooling model to build a new capital after bifurcation.',
    intendedGoal:
      'Create a functioning administrative capital, mobilise land without conventional acquisition at full scale, and anchor long-run investment.',
    ratingScore: policyRating('ap-amaravati-capital-2014'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A high-ambition new-state response with real institutional and infrastructure value, reduced by livelihood and consultation concerns, optimistic self-financing, incomplete delivery, and vulnerability to political reversal.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'ap-reorganisation-act-2014',
      'ap-crda',
      'ap-amaravati-judgment-2022',
      'ap-budget-2014-15',
    ],
  },
  {
    id: 'ap-rural-road-connectivity-2016',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2014',
    title: 'Rural Roads Plan and all-weather connectivity pipeline',
    shortTitle: 'Rural roads and connectivity',
    policyType: 'road-infrastructure',
    introducedDate: '2016-04-01',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'Converted non-bituminous rural links, improved roads and bridges, and combined state delivery with RIDF and Union PMGSY financing to connect villages and markets.',
    intendedGoal:
      'Provide reliable all-weather access to habitations, schools, health services, markets, and the wider state road network.',
    ratingScore: policyRating('ap-rural-road-connectivity-2016'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strong access and inclusion programme with documented early completion and high cumulative habitation connectivity; reduced by shared attribution, missed later annual targets, large unpaved stocks, maintenance, and road-safety weaknesses.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'ap-ses-2017-18',
      'ap-ses-2024-25',
      'mord-ap-action-plan-2024-25',
    ],
  },
  {
    id: 'ap-village-ward-secretariats-2019',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    title: 'Village and Ward Secretariat system',
    shortTitle: 'Village and Ward Secretariats',
    policyType: 'local-service-delivery',
    introducedDate: '2019-07-19',
    effectiveDate: '2019-10-02',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Created a dense local administrative network intended to deliver certificates, welfare, grievance handling, and departmental services closer to residents.',
    intendedGoal:
      'Reduce distance and delay in accessing state services and create accountable last-mile delivery capacity.',
    ratingScore: policyRating('ap-village-ward-secretariats-2019'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A durable and accessible service-delivery reform with substantial administrative reach, reduced by recurring-cost, role clarity, political-neutrality, and independent outcome-measurement gaps.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'ap-village-secretariat-go',
      'ap-ses-2024-25',
      'niti-ap-macro-fiscal-2025',
    ],
  },
  {
    id: 'ap-amma-vodi-2019',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    title: 'Jagananna Amma Vodi education transfer',
    shortTitle: 'Amma Vodi',
    policyType: 'education-transfer',
    introducedDate: '2019-07-12',
    effectiveDate: '2020-01-09',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Provided a conditional annual cash transfer to eligible mothers or guardians to support school participation.',
    intendedGoal:
      'Reduce the household cost of schooling and improve enrolment, attendance, and continuation among lower-income children.',
    ratingScore: policyRating('ap-amma-vodi-2019'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strongly inclusive education-support design with wide reach, reduced by eligibility changes, fiscal cost, and limited independent evidence separating the transfer from wider schooling trends.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ap-budget-2019-20', 'ap-ses-2024-25', 'nfhs5-ap'],
  },
  {
    id: 'ap-nadu-nedu-2019',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    title: 'Mana Badi Nadu-Nedu school infrastructure programme',
    shortTitle: 'Nadu-Nedu schools',
    policyType: 'education-infrastructure',
    introducedDate: '2019-11-14',
    effectiveDate: '2019-11-14',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Upgraded government-school buildings, water, sanitation, furniture, electricity, classrooms, and learning environments in phases.',
    intendedGoal:
      'Improve public-school dignity, safety, attendance, and learning conditions at statewide scale.',
    ratingScore: policyRating('ap-nadu-nedu-2019'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strong public-capacity and inclusion programme with visible infrastructure outputs, while learning outcomes, maintenance, procurement quality, and attribution need longer independent evidence.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ap-ses-2024-25', 'nfhs5-ap', 'niti-ap-macro-fiscal-2025'],
  },
  {
    id: 'ap-three-capitals-2020',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    title: 'Andhra Pradesh decentralisation and three-capitals laws',
    shortTitle: 'Three-capitals laws',
    policyType: 'capital-governance',
    introducedDate: '2020-01-20',
    enactedDate: '2020-07-31',
    effectiveDate: '2020-07-31',
    status: 'repealed',
    coverageStatus: 'reviewed',
    summary:
      'Sought legislative, executive, and judicial capitals in Amaravati, Visakhapatnam, and Kurnool, then was repealed amid litigation and protest.',
    intendedGoal:
      'Distribute state institutions and development more evenly across regions rather than concentrating the capital.',
    ratingScore: policyRating('ap-three-capitals-2020'),
    ratingConfidence: 'high',
    ratingSummary:
      'Regional-balance intent was legitimate, but legal competence, farmer commitments, consultation, transition cost, prolonged uncertainty, repeal, and court findings make this a weak policy record.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ap-amaravati-judgment-2022', 'ap-crda'],
  },
  {
    id: 'ap-amaravati-restart-2024',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2024',
    title: 'Amaravati capital restart and infrastructure completion plan',
    shortTitle: 'Amaravati restart',
    policyType: 'capital-development',
    introducedDate: '2024-06-12',
    effectiveDate: '2024-06-12',
    status: 'executive-action',
    coverageStatus: 'partial',
    ratingBasis: 'design',
    summary:
      'Restarted capital-region works, financing, trunk infrastructure, and government-complex planning after the 2024 change of government.',
    intendedGoal:
      'Restore policy certainty, honour land-pooling commitments, complete core state institutions, and use the capital as an investment anchor.',
    ratingScore: policyRating('ap-amaravati-restart-2024'),
    ratingConfidence: 'low',
    ratingSummary:
      'Provisional 6.5/10 design rating: clarity and completion intent are strengths, but effectiveness, debt exposure, land value, regional balance, and delivery remain unproven.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ap-crda', 'ap-budget-2026-27', 'ap-amaravati-judgment-2022'],
  },
]

const andhraPolicyRationales: Record<string, string[]> = {
  'ap-amaravati-capital-2014': [
    'A new state genuinely needed a capital, administrative institutions, and an investment anchor after losing Hyderabad.',
    'Land pooling assembled a large contiguous area and temporary institutions became operational, but the permanent city remained incomplete.',
    'The government mobilised land and planning rapidly, while finance, phasing, and later political durability were weak.',
    'Returnable plots and annuities offered alternatives to ordinary acquisition, but consent, tenant, landless-worker, livelihood, and regional-balance concerns remained.',
    'The capital framework endured legally but proved highly vulnerable to electoral reversal, litigation, and unfinished financing.',
  ],
  'ap-rural-road-connectivity-2016': [
    'Post-bifurcation Andhra Pradesh needed reliable links from rural habitations and production areas to markets, schools, health care, and the state network.',
    'The 2017-18 survey reported 126 of 157 Rural Roads Plan works complete. Union records show 3,534 PMGSY kilometres completed from 2019-20 through 2023-24 and another 625 km in 2025-26 and 2026-27 through July 16, 2026.',
    'Early and later completion was material, but the Union review recorded only 369 of 1,140 targeted PMGSY kilometres and 10 of 23 targeted habitations completed in 2023-24; the 2022-23 audit also recorded full surrender of a Rs 100 crore Road Safety Fund provision.',
    'All-weather village access is strongly inclusive for rural, poorer, older, and less-mobile residents, while district-level quality and exclusion evidence remain thin.',
    'Road assets endure only with resurfacing, drainage, safety, and maintenance; 8,346 reported deaths in 2024 and a large gravel and earthen stock materially reduce durability.',
  ],
  'ap-village-ward-secretariats-2019': [
    'Long travel, fragmented departments, and last-mile access were genuine service-delivery problems.',
    'The network delivered many transactions and welfare functions locally, though independent time, quality, and exclusion evaluations remain limited.',
    'Statewide rollout and staffing created unusual local capacity, with recurring-cost and coordination burdens.',
    'Local access benefits rural, poorer, older, and less-mobile residents, while political neutrality and grievance independence require safeguards.',
    'The system persisted beyond its founding government and became part of the state administrative architecture.',
  ],
  'ap-amma-vodi-2019': [
    'Household schooling costs and dropout risk are legitimate barriers for lower-income families.',
    'Transfers reached many households, while causal effects on attendance, learning, and completion are not isolated.',
    'Direct transfers are administratively clear, but eligibility revisions and payment cycles created uncertainty.',
    'Targeting mothers and lower-income students supports inclusion, with exclusion and private-school design questions.',
    'The model is politically durable but fiscally exposed and should be tied to measured schooling outcomes.',
  ],
  'ap-nadu-nedu-2019': [
    'Government-school infrastructure deficits directly affect safety, dignity, attendance, and teaching conditions.',
    'Physical upgrades were visible at scale; learning and retention outcomes require separate evidence.',
    'Phased statewide delivery showed capacity, while procurement, maintenance, and completion quality varied.',
    'Public-school investment disproportionately benefits lower-income and rural children.',
    'Built assets can endure if maintenance budgets and school-level accountability continue.',
  ],
  'ap-three-capitals-2020': [
    'Regional concentration was a real concern, but the plan did not adequately reconcile existing capital commitments and legal authority.',
    'No stable three-capital system became operational, and prolonged uncertainty imposed economic and administrative costs.',
    'Legislation, repeal, litigation, and stalled transition demonstrate weak sequencing and implementation.',
    'Regional inclusion was the stated goal, but pooled-land farmers and affected livelihoods bore concentrated uncertainty.',
    'Repeal and adverse court findings show low durability and large side effects.',
  ],
  'ap-amaravati-restart-2024': [
    'The restart addresses unfinished state institutions, farmer commitments, sunk investment, and prolonged policy uncertainty.',
    'Effectiveness is not yet observable in a term that remains underway.',
    'Budgeted capital and renewed agency activity improve readiness, while finance and project controls remain execution risks.',
    'Honouring prior commitments supports affected farmers, but regional distribution and affordability need explicit safeguards.',
    'A stable capital direction may be durable, but debt, land-market dependence, and future political reversal remain material risks.',
  ],
}

export const andhraPolicyScores: PolicyScoreSeed[] = Object.entries(
  andhraPolicyComponents,
).flatMap(([policyId, scores]) =>
  scores.map((score, index) => ({
    policyId,
    dimensionId: policyDimensionIds[index],
    score,
    rationale: andhraPolicyRationales[policyId][index],
  })),
)

export const andhraEvents: EventSeed[] = [
  {
    id: 'ap-bifurcation-2014',
    jurisdictionId: 'andhra-pradesh',
    date: '2014-06-02',
    title: 'Post-split Andhra Pradesh comes into existence',
    summary:
      'The appointed day under the Andhra Pradesh Reorganisation Act created Telangana and the residuary State of Andhra Pradesh.',
    significance:
      'This is the hard boundary for every Andhra Pradesh series in India Mechanics; pre-split observations are not assigned to the successor state.',
    category: 'state-formation',
    confidence: 'high',
    sourceIds: ['ap-reorganisation-act-2014', 'ap-reorganisation-portal'],
  },
  {
    id: 'ap-hudhud-2014',
    jurisdictionId: 'andhra-pradesh',
    date: '2014-10-12',
    title: 'Cyclone Hudhud strikes north coastal Andhra Pradesh',
    summary:
      'The very severe cyclone caused widespread damage across Visakhapatnam and neighbouring districts and affected millions of people.',
    significance:
      'A defining early test of the new state’s warning, evacuation, emergency response, reconstruction, and climate resilience.',
    category: 'disaster',
    confidence: 'high',
    sourceIds: ['ndma-hudhud-lessons', 'world-bank-ap-disaster-recovery'],
    leaderTermIds: ['ap-naidu-2014'],
  },
  {
    id: 'ap-amaravati-foundation-2015',
    jurisdictionId: 'andhra-pradesh',
    date: '2015-10-22',
    title: 'Amaravati capital foundation stone laid',
    summary:
      'The state advanced its planned capital after land pooling and creation of the capital-region authority.',
    significance:
      'Amaravati became the central symbol of new-state ambition, farmer commitments, financing risk, regional balance, and policy continuity.',
    category: 'infrastructure',
    confidence: 'high',
    sourceIds: ['ap-crda', 'ap-budget-2014-15'],
    leaderTermIds: ['ap-naidu-2014'],
  },
  {
    id: 'ap-jagan-government-2019',
    jurisdictionId: 'andhra-pradesh',
    date: '2019-05-30',
    title: 'Jagan Mohan Reddy government takes office',
    summary:
      'YSRCP formed the government after winning 151 of 175 Assembly seats and Jagan Mohan Reddy took the oath as Chief Minister.',
    significance:
      'The landslide enabled a major shift toward welfare transfers, local secretariats, and a different capital strategy.',
    category: 'elections',
    confidence: 'high',
    sourceIds: ['eci-ap-2019', 'ndtv-jagan-oath-2019'],
    leaderTermIds: ['ap-jagan-2019'],
  },
  {
    id: 'ap-three-capitals-cycle-2020',
    jurisdictionId: 'andhra-pradesh',
    date: '2020-01-20',
    endDate: '2022-03-03',
    title: 'Three-capitals laws, repeal, protests, and Amaravati judgment',
    summary:
      'The government pursued three capitals, farmers protested, the laws were repealed, and the High Court issued major directions concerning Amaravati and pooled-land commitments.',
    significance:
      'The episode imposed prolonged capital-policy uncertainty and became a central test of regional balance, legal competence, property commitments, and institutional continuity.',
    category: 'institutions',
    confidence: 'high',
    sourceIds: ['ap-amaravati-judgment-2022', 'ap-crda'],
    leaderTermIds: ['ap-jagan-2019'],
  },
  {
    id: 'ap-naidu-return-2024',
    jurisdictionId: 'andhra-pradesh',
    date: '2024-06-12',
    title: 'N. Chandrababu Naidu returns as Chief Minister',
    summary:
      'The TDP-Jana Sena-BJP alliance won a large Assembly majority and Naidu began a new post-split term.',
    significance:
      'The transition restored Amaravati and investment-led development to the centre of state policy while inheriting high debt and unfinished projects.',
    category: 'elections',
    confidence: 'high',
    sourceIds: ['eci-ap-2024', 'ap-crda'],
    leaderTermIds: ['ap-naidu-2024'],
  },
  {
    id: 'ap-road-connectivity-2024',
    jurisdictionId: 'andhra-pradesh',
    date: '2024-04-01',
    title: 'Rural-road network reaches 80,635 km with high cumulative habitation connectivity',
    summary:
      'The state survey reported 80,635 km of Panchayat Raj roads as of April 2024 and 99.09% cumulative connectivity of targeted habitations under PMGSY.',
    significance:
      'The milestone shows real rural access at the end of the Jagan term, but the network was built across governments and the Union review separately recorded a substantial 2023-24 annual delivery shortfall.',
    category: 'infrastructure',
    confidence: 'high',
    sourceIds: ['ap-ses-2024-25', 'mord-ap-action-plan-2024-25'],
    leaderTermIds: ['ap-jagan-2019'],
    indicatorIds: [
      'ap-rural-road-network',
      'ap-targeted-habitation-road-connectivity',
    ],
  },
  {
    id: 'ap-panchayat-awards-2025',
    jurisdictionId: 'andhra-pradesh',
    date: '2026-05-15',
    title: 'Five Andhra Pradesh local bodies win National Panchayat Awards',
    summary:
      'Union awards recognized five Andhra Pradesh Gram or Block Panchayats for livelihoods, infrastructure, governance, women-friendly administration, and block-level performance.',
    significance:
      'The awards are useful external validation of specific local outcomes, including all-weather roads and service delivery, but they are selective and primarily credit the local bodies rather than proving statewide CM performance.',
    category: 'local-government',
    confidence: 'high',
    sourceIds: ['pib-ap-panchayat-awards-2025'],
    leaderTermIds: ['ap-naidu-2024'],
  },
  {
    id: 'ap-current-road-delivery-2026',
    jurisdictionId: 'andhra-pradesh',
    date: '2026-07-21',
    title: 'Current PMGSY record reports 625 km completed since 2025-26',
    summary:
      'The Union rural-development reply reported 484 km of PMGSY roads completed in Andhra Pradesh during 2025-26 and 141 km through July 16, 2026.',
    significance:
      'This is the cleanest current Naidu-term rural-road output evidence. It supports provisional delivery credit while remaining a jointly financed Union-state programme without a completed condition or impact evaluation.',
    category: 'infrastructure',
    confidence: 'high',
    sourceIds: ['pib-ap-pmgsy-2026'],
    leaderTermIds: ['ap-naidu-2024'],
    indicatorIds: ['ap-pmgsy-road-completion'],
  },
]

export const andhraEventAssessments: EventAssessmentSeed[] = [
  {
    eventId: 'ap-bifurcation-2014',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'For the successor state this is a constitutional boundary event rather than a decision by its later Chief Ministers; accountability concerns the Union law and implementation of division commitments.',
    unionRole:
      'The successor state administrations had to create institutions, divide staff and systems, and build a new fiscal and capital base.',
    stateLocalRole:
      'The Union government and Parliament designed the division framework, appointed day, institutional sharing, and asset-liability rules; local institutions implemented the transition on the ground.',
    positiveOutcomes:
      'The successor states gained separate democratic governments and policy focus; those benefits coexist with unresolved division and fiscal disputes.',
    lessons:
      'Reorganisation requires explicit boundary-valid data, enforceable transition commitments, transparent asset division, and long-duration fiscal support.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'Union government and Parliament',
        responsibilityKind: 'policy-decision',
        level: 5,
        assessment: 'Created the legal division and transition framework.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Successor Andhra Pradesh administration',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Built the state machinery and implemented the Andhra-side transition.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'ap-hudhud-2014',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The cyclone was a natural hazard, not a government choice; the relevant judgment concerns preparedness, evacuation, emergency response, relief, and resilient reconstruction.',
    unionRole:
      'The Naidu government led state warning, evacuation, response, restoration, relief, and reconstruction coordination.',
    stateLocalRole:
      'Union agencies, armed forces, NDMA, local bodies, utilities, and district administrations provided forecasting, rescue, logistics, and frontline implementation.',
    positiveOutcomes:
      'Large-scale evacuation and rapid restoration efforts limited loss relative to the storm’s scale and led to a major disaster-recovery and resilience programme.',
    lessons:
      'Coastal growth requires resilient power, communications, housing, urban trees, drainage, shelters, and transparent recovery support for informal and fishing communities.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'structural',
        actorName: 'Cyclone Hudhud',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Created the disaster and physical damage.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Naidu government and Andhra Pradesh disaster administration',
        responsibilityKind: 'positive-leadership',
        level: 4,
        assessment: 'Led evacuation, emergency coordination, restoration, and recovery planning.',
        confidence: 'high',
      },
      {
        actorType: 'union-government',
        actorName: 'Union disaster, defence, and recovery institutions',
        responsibilityKind: 'implementation',
        level: 3,
        assessment: 'Supported forecasting, rescue, finance, and reconstruction.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'ap-amaravati-foundation-2015',
    choiceAssessment: 'mixed',
    choiceScore: 6.4,
    choiceReason:
      'A new capital and administrative centre were necessary, and land pooling was innovative, but scale, financing, livelihood protection, consultation, regional balance, and political durability were underpriced.',
    unionRole:
      'The Naidu government selected the location, created APCRDA, designed land pooling, and owned the capital’s scale and financing assumptions.',
    stateLocalRole:
      'Farmers, tenants, landless workers, local bodies, the Union, and contractors shaped consent, land assembly, approvals, and implementation.',
    positiveOutcomes:
      'Land was pooled, interim state institutions began functioning, and a coherent capital-region plan was established.',
    lessons:
      'A multi-decade capital needs bipartisan durability, enforceable livelihood protection, staged finance, regional investment, and completion milestones before grand expansion.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Naidu government and APCRDA',
        responsibilityKind: 'policy-decision',
        level: 5,
        assessment: 'Designed and launched the capital and land-pooling model.',
        confidence: 'high',
      },
      {
        actorType: 'structural',
        actorName: 'Post-bifurcation loss of Hyderabad',
        responsibilityKind: 'shared-context',
        level: 4,
        assessment: 'Created the genuine need for a new administrative capital and economic anchor.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'ap-jagan-government-2019',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'An election result is a democratic choice by voters, not a government policy to grade as right or wrong.',
    unionRole:
      'The incoming Jagan government gained responsibility for translating its welfare, service-delivery, and decentralisation mandate into lawful and fiscally durable policy.',
    stateLocalRole:
      'The Election Commission and state election machinery administered the poll; voters determined the transfer of power.',
    positiveOutcomes:
      'Power changed peacefully after a decisive election and the new government had a clear mandate to implement its programme.',
    lessons:
      'Large mandates still require consultation, fiscal disclosure, institutional restraint, and protection of prior lawful commitments.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'public-electorate',
        actorName: 'Andhra Pradesh electorate',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Produced the democratic change of government.',
        confidence: 'high',
      },
      {
        actorType: 'institution',
        actorName: 'Election Commission and state election machinery',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Administered polling and counting.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'ap-three-capitals-cycle-2020',
    choiceAssessment: 'mostly-wrong',
    choiceScore: 3.6,
    choiceReason:
      'Regional balance was a legitimate objective, but the government created prolonged uncertainty without a workable transition, adequate consultation, secure legal authority, or protection of existing farmer commitments.',
    unionRole:
      'The Jagan government designed, enacted, defended, and later repealed the three-capitals framework.',
    stateLocalRole:
      'The High Court reviewed legality and obligations; Amaravati farmers and local communities bore concentrated livelihood and property uncertainty.',
    positiveOutcomes:
      'The episode forced a serious debate about regional concentration and the need for distributed public investment; that corrective debate does not outweigh the implementation failure.',
    lessons:
      'Regional development should be delivered through institutions, infrastructure, and fiscal transfers without casually repudiating pooled-land and capital commitments.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Jagan government',
        responsibilityKind: 'policy-decision',
        level: 5,
        assessment: 'Created and sustained the three-capitals strategy and resulting uncertainty.',
        confidence: 'high',
      },
      {
        actorType: 'institution',
        actorName: 'High Court of Andhra Pradesh',
        responsibilityKind: 'implementation',
        level: 3,
        assessment: 'Adjudicated farmer rights, state competence, and capital-development obligations.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'ap-naidu-return-2024',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The election result is a democratic transfer, not a policy decision; the new term is judged on later choices and outcomes.',
    unionRole:
      'The incoming Naidu government assumed responsibility for capital completion, fiscal repair, welfare commitments, infrastructure, and coalition delivery.',
    stateLocalRole:
      'The ECI and state election administration ran the poll; voters selected the alliance.',
    positiveOutcomes:
      'The transition was peaceful and restored a clear capital-policy direction after prolonged uncertainty.',
    lessons:
      'A large mandate should be used to build durable cross-party institutions, publish project finance, and separate early announcements from completed outcomes.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'public-electorate',
        actorName: 'Andhra Pradesh electorate',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Produced the democratic change of government.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Naidu government and governing alliance',
        responsibilityKind: 'positive-leadership',
        level: 3,
        assessment: 'Restored policy clarity and assumed responsibility for delivery.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'ap-road-connectivity-2024',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'A network and access milestone is an observed output, not a single policy choice. The underlying road programmes are rated separately on design, delivery, inclusion, maintenance, and safety.',
    unionRole:
      'Successive state governments, Panchayat Raj engineers, Roads and Buildings, districts, and contractors planned, built, and maintained the wider road system.',
    stateLocalRole:
      'The Union financed and monitored PMGSY while national-highway institutions expanded the centrally controlled network; Panchayats and road users shaped local access and maintenance priorities.',
    positiveOutcomes:
      'High cumulative targeted-habitation connectivity and a larger surfaced-road stock improve access to markets and essential services.',
    lessons:
      'Publish annual targets and completion, road condition, travel time, maintenance, safety, and district distribution together; total kilometres alone are not a quality score.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Successive Andhra Pradesh governments and road agencies',
        responsibilityKind: 'implementation',
        level: 4,
        assessment:
          'Delivered and maintained the state and rural road pipeline across CM terms.',
        confidence: 'high',
      },
      {
        actorType: 'union-government',
        actorName: 'Union Ministry of Rural Development and PMGSY',
        responsibilityKind: 'implementation',
        level: 4,
        assessment:
          'Financed, set standards for, and monitored the centrally sponsored rural-road programme.',
        confidence: 'high',
      },
      {
        actorType: 'local-administration',
        actorName: 'Districts, Panchayats, and local road users',
        responsibilityKind: 'shared-context',
        level: 3,
        assessment:
          'Shaped project selection, local access, maintenance feedback, and actual use.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'ap-panchayat-awards-2025',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'An award is recognition of selected outcomes, not itself a government policy or proof that the entire state performed similarly.',
    unionRole:
      'State systems, schemes, finance, and administrative support created part of the enabling environment across more than one CM term, but do not displace local credit.',
    stateLocalRole:
      'The awardee Panchayats and their elected leaders delivered the cited services, while the Union Ministry of Panchayati Raj administered and published the award process.',
    positiveOutcomes:
      'The recognized Panchayats reported concrete gains in all-weather roads, tap water, livelihoods, women-led governance, citizen services, and local accountability.',
    lessons:
      'Use awards to discover and corroborate measurable outcomes, then verify whether the results are representative, durable, and attributable before changing a statewide CM rating.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'local-administration',
        actorName: 'Five awardee Andhra Pradesh Panchayats',
        responsibilityKind: 'positive-leadership',
        level: 5,
        assessment:
          'Delivered the local outcomes recognized by the national awards.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Andhra Pradesh Panchayat Raj and service-delivery systems',
        responsibilityKind: 'implementation',
        level: 3,
        assessment:
          'Provided enabling programmes, platforms, finance, and administrative support across governments.',
        confidence: 'medium',
      },
      {
        actorType: 'union-government',
        actorName: 'Union Ministry of Panchayati Raj',
        responsibilityKind: 'implementation',
        level: 2,
        assessment: 'Administered and documented the award process.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'ap-current-road-delivery-2026',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'Completed road length is an output rather than one discrete policy choice. The programme is assessed through its policy design, annual delivery, maintenance, safety, and shared financing.',
    unionRole:
      'The Andhra Pradesh government and State Rural Roads Development Agency contract, implement, quality-control, and maintain the roads.',
    stateLocalRole:
      'The Union sets PMGSY rules, provides the central share, monitors quality, and publishes the programme record; districts and local institutions contribute priorities and maintenance feedback.',
    positiveOutcomes:
      'The 625 km completed in 2025-26 and 2026-27 through July 16 is tangible current-term infrastructure delivery.',
    lessons:
      'Current-term credit should remain provisional until road condition, maintenance, safety, access, cost, and use are measured after completion.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Current Andhra Pradesh government and rural-road agencies',
        responsibilityKind: 'implementation',
        level: 4,
        assessment:
          'Implemented and quality-controlled the reported current-term PMGSY work.',
        confidence: 'high',
      },
      {
        actorType: 'union-government',
        actorName: 'Union Ministry of Rural Development',
        responsibilityKind: 'implementation',
        level: 4,
        assessment:
          'Co-financed the programme, set standards, monitored delivery, and published the figures.',
        confidence: 'high',
      },
      {
        actorType: 'local-administration',
        actorName: 'District and Panchayat institutions',
        responsibilityKind: 'shared-context',
        level: 3,
        assessment:
          'Contributed local project selection, access priorities, maintenance feedback, and use.',
        confidence: 'medium',
      },
    ],
  },
]

export const andhraClaims: ClaimSeed[] = [
  {
    id: 'ap-boundary-start-context',
    jurisdictionId: 'andhra-pradesh',
    eventId: 'ap-bifurcation-2014',
    title: 'Every state comparison begins after June 2, 2014',
    body:
      'India Mechanics does not assign undivided-Andhra observations to post-split Andhra Pradesh. The first comparable state year is 2014-15, with survey rounds labelled by their actual fieldwork periods.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ap-reorganisation-act-2014', 'ap-reorganisation-portal'],
  },
  {
    id: 'ap-naidu-new-state-growth',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2014',
    title: 'The first post-split government built state capacity under a hard starting condition',
    body:
      'The government created institutions, a capital framework, budgets, and investment priorities after losing Hyderabad, while real GSDP and real per-capita NSDP expanded strongly through 2018-19.',
    stance: 'achievement',
    category: 'state-building',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: [
      'ap-reorganisation-act-2014',
      'ap-budget-2014-15',
      'ap-ses-2024-25',
      'niti-ap-macro-fiscal-2025',
    ],
  },
  {
    id: 'ap-naidu-rural-roads-delivery',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2014',
    policyId: 'ap-rural-road-connectivity-2016',
    title: 'The first Naidu term delivered a material rural-road programme',
    body:
      'The 2017-18 state survey reported 126 of 157 Rural Roads Plan works complete and a 79,078 km Panchayat Raj road network. This is direct infrastructure credit, while older RIDF works and Union-financed programmes prevent exclusive attribution.',
    stance: 'achievement',
    category: 'infrastructure',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['ap-ses-2017-18'],
  },
  {
    id: 'ap-naidu-hudhud-response',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2014',
    eventId: 'ap-hudhud-2014',
    title: 'Hudhud response demonstrated early administrative capacity',
    body:
      'Warning, evacuation, restoration, and reconstruction mobilised state, local, Union, military, and multilateral capacity after a severe cyclone hit the new state.',
    stance: 'achievement',
    category: 'crisis',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ndma-hudhud-lessons', 'world-bank-ap-disaster-recovery'],
  },
  {
    id: 'ap-naidu-capital-risk',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2014',
    policyId: 'ap-amaravati-capital-2014',
    title: 'Capital ambition outran finance and political durability',
    body:
      'Amaravati created a coherent capital plan and pooled land at scale, but permanent delivery, livelihood safeguards, regional balance, and a politically durable financing model were incomplete by 2019.',
    stance: 'concern',
    category: 'capital-development',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ap-crda', 'ap-amaravati-judgment-2022', 'ap-budget-2014-15'],
  },
  {
    id: 'ap-jagan-service-welfare',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    policyId: 'ap-village-ward-secretariats-2019',
    title: 'Welfare and last-mile service delivery expanded materially',
    body:
      'Village and ward secretariats, direct transfers, school infrastructure, health and education programmes expanded the state’s local administrative and welfare reach.',
    stance: 'achievement',
    category: 'service-delivery',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: [
      'ap-village-secretariat-go',
      'ap-budget-2019-20',
      'ap-ses-2024-25',
      'nfhs5-ap',
    ],
  },
  {
    id: 'ap-jagan-rural-connectivity',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    eventId: 'ap-road-connectivity-2024',
    policyId: 'ap-rural-road-connectivity-2016',
    title: 'Cumulative rural-road access was high by the end of the Jagan term',
    body:
      'Union records show 3,534 km of PMGSY roads completed from 2019-20 through 2023-24, while the April 2024 state survey reported 80,635 km of Panchayat Raj roads and 99.09% of targeted habitations connected. The first fiscal year crosses terms and all figures carry shared Union, state, and local attribution.',
    stance: 'achievement',
    category: 'infrastructure',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: [
      'ap-ses-2017-18',
      'ap-ses-2019-20',
      'ap-ses-2024-25',
      'pib-ap-pmgsy-2019-24',
    ],
  },
  {
    id: 'ap-jagan-road-delivery-gap',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    eventId: 'ap-road-connectivity-2024',
    policyId: 'ap-rural-road-connectivity-2016',
    title: 'The cumulative road result coexisted with a large annual delivery miss',
    body:
      'The Union review reported that Andhra Pradesh completed 369 of 1,140 targeted PMGSY kilometres and connected 10 of 23 targeted habitations in 2023-24. This prevents cumulative connectivity from being treated as uniformly strong execution.',
    stance: 'concern',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['mord-ap-action-plan-2024-25'],
  },
  {
    id: 'ap-road-safety-execution-gap',
    jurisdictionId: 'andhra-pradesh',
    policyId: 'ap-rural-road-connectivity-2016',
    title: 'Road expansion has not produced a consistently strong safety record',
    body:
      'MoRTH reported 8,346 road deaths in Andhra Pradesh in 2024, up from 8,137 in 2023. CAG recorded that the entire Rs 100 crore capital Road Safety Fund provision was surrendered in 2022-23. Crashes are multi-causal, but safety execution must reduce infrastructure credit.',
    stance: 'concern',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['morth-road-accidents-2024-ap', 'cag-ap-appropriation-2022-23'],
  },
  {
    id: 'ap-jagan-poverty-services',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    title: 'Poverty and household-service indicators improved across the transition',
    body:
      'MPI poverty fell from 11.77% in 2015-16 to 6.06% in 2019-21, sanitation rose from 54.4% to 77.3%, and schooling and mortality indicators improved. The survey interval spans both Naidu and Jagan governments, so neither receives sole credit.',
    stance: 'achievement',
    category: 'human-development',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['nfhs4-ap', 'nfhs5-ap', 'niti-mpi-2023'],
  },
  {
    id: 'ap-jagan-fiscal-risk',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    title: 'Debt, contingent liabilities, and weak capital expenditure reduce the record',
    body:
      'NITI reported debt near one-third of GSDP, contingent liabilities above 10% of GSDP in 2021-22, and capital expenditure at 1.4% of GSDP in 2022-23, well below the median state.',
    stance: 'concern',
    category: 'public-finance',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['niti-ap-macro-fiscal-2025', 'ap-ses-2024-25'],
  },
  {
    id: 'ap-jagan-capital-uncertainty',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    eventId: 'ap-three-capitals-cycle-2020',
    policyId: 'ap-three-capitals-2020',
    title: 'The three-capitals cycle damaged policy continuity and trust',
    body:
      'Regional-balance intent did not overcome repeal, litigation, prolonged farmer uncertainty, stalled capital work, and the High Court’s findings on state obligations.',
    stance: 'concern',
    category: 'institutions',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ap-amaravati-judgment-2022', 'ap-crda'],
  },
  {
    id: 'ap-naidu-current-capex',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2024',
    policyId: 'ap-amaravati-restart-2024',
    title: 'The current plan restores capital clarity and raises proposed investment',
    body:
      'The 2026-27 budget proposes about Rs 48,698 crore of capital outlay, including major social, irrigation, rural-development, transport, and capital-region investment.',
    stance: 'achievement',
    category: 'current-government',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['ap-budget-2026-27', 'ap-crda'],
  },
  {
    id: 'ap-naidu-current-road-repair',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2024',
    title: 'Early road-rehabilitation delivery is visible but not yet a durable outcome',
    body:
      'The state survey reported 92 road sections covering 402.56 km and 10 bridges complete by December 2024, plus 70% completion of 1,100 pothole-removal works covering 5,000 km. Union records then reported 484 PMGSY km in 2025-26 and 141 km through July 16, 2026. Credit remains provisional and shared.',
    stance: 'achievement',
    category: 'infrastructure',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['ap-ses-2024-25', 'pib-ap-pmgsy-2026'],
  },
  {
    id: 'ap-panchayat-awards-local-credit',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2024',
    eventId: 'ap-panchayat-awards-2025',
    title: 'Five Panchayat awards validate specific local outcomes, not a blanket CM claim',
    body:
      'The 2025 national awards recognized five Andhra Pradesh local bodies for livelihoods, infrastructure, governance, women-friendly administration, and block performance. The current term receives limited enabling-system credit; primary credit belongs to the Panchayats and appraisal evidence spans governments.',
    stance: 'achievement',
    category: 'local-government',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['pib-ap-panchayat-awards-2025'],
  },
  {
    id: 'ap-naidu-current-too-early',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2024',
    title: 'The current term is too young for an outcome verdict',
    body:
      'Growth and budget estimates are early signals, not completed outcomes. Revenue deficit, debt, project execution, welfare delivery, and institutional conduct require several actual years of evidence.',
    stance: 'concern',
    category: 'current-government',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ap-budget-2026-27', 'ap-ses-2024-25', 'niti-ap-macro-fiscal-2025'],
  },
  {
    id: 'ap-shared-attribution',
    jurisdictionId: 'andhra-pradesh',
    title: 'Most post-split outcomes span governments and levels',
    body:
      'Bifurcation terms, Union transfers, national schemes, courts, local bodies, global cycles, the pandemic, household behaviour, and projects inherited across elections all limit exclusive CM attribution.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'ap-reorganisation-act-2014',
      'ap-ses-2024-25',
      'niti-ap-macro-fiscal-2025',
    ],
  },
]

export const andhraCuratedAnswers: CuratedAnswerSeed[] = [
  {
    id: 'ap-post-split-progress',
    jurisdictionId: 'andhra-pradesh',
    question: 'How is Andhra Pradesh doing since the 2014 split?',
    aliases: [
      'andhra pradesh progress',
      'how is ap doing',
      'andhra after bifurcation',
      'post split andhra pradesh',
    ],
    shortAnswer:
      'The post-split state expanded real output per person, household sanitation, electricity, schooling, multidimensional-poverty outcomes, and rural-road access. The difficult side is fiscal and institutional: debt, contingent liabilities, revenue deficits, uneven annual road delivery and safety, capital-city instability, job quality, and child nutrition remain material constraints.',
    verdict:
      'Direction: positive but fiscally and institutionally fragile. The state built and extended real capacity after losing Hyderabad, but it has not yet combined welfare, capital formation, stable institutions, regional balance, and sustainable public finance consistently.',
    confidence: 'medium',
    asOfDate: reviewedAt,
    claimSections: [
      {
        claimId: 'ap-naidu-new-state-growth',
        section: 'achievement',
        sortOrder: 1,
      },
      {
        claimId: 'ap-jagan-poverty-services',
        section: 'achievement',
        sortOrder: 2,
      },
      {
        claimId: 'ap-naidu-rural-roads-delivery',
        section: 'achievement',
        sortOrder: 3,
      },
      {
        claimId: 'ap-jagan-rural-connectivity',
        section: 'achievement',
        sortOrder: 4,
      },
      {
        claimId: 'ap-jagan-fiscal-risk',
        section: 'concern',
        sortOrder: 1,
      },
      {
        claimId: 'ap-jagan-capital-uncertainty',
        section: 'concern',
        sortOrder: 2,
      },
      {
        claimId: 'ap-jagan-road-delivery-gap',
        section: 'concern',
        sortOrder: 3,
      },
      {
        claimId: 'ap-boundary-start-context',
        section: 'context',
        sortOrder: 1,
      },
      {
        claimId: 'ap-shared-attribution',
        section: 'context',
        sortOrder: 2,
      },
    ],
  },
  {
    id: 'ap-cm-comparison',
    jurisdictionId: 'andhra-pradesh',
    question: 'How have Andhra Pradesh Chief Ministers performed since bifurcation?',
    aliases: [
      'chandrababu vs jagan',
      'who was better cm andhra',
      'ap chief minister ratings',
      'naidu jagan comparison',
    ],
    shortAnswer:
      'Naidu’s 2014-19 term scores higher for new-state institution building, growth, documented rural-road delivery, and crisis response. Jagan’s 2019-24 term scores higher on welfare inclusion and last-mile service redesign and receives shared credit for high cumulative rural connectivity, but scores lower on fiscal risk, annual road-target delivery, capital continuity, and institutions. Naidu’s current term gets provisional road-rehabilitation and local-governance credit.',
    verdict:
      'Current editorial estimates: Naidu 2014-19 at 6.9/10, Jagan 2019-24 at 6.3/10, and Naidu 2024-present at a provisional 6.6/10. Roads affect observed outcomes, durable reforms, inclusion, and execution; awards add corroboration but no separate points. These are term ratings using the same six weights for all three.',
    confidence: 'medium',
    asOfDate: reviewedAt,
    claimSections: [
      {
        claimId: 'ap-naidu-new-state-growth',
        section: 'achievement',
        sortOrder: 1,
      },
      {
        claimId: 'ap-jagan-service-welfare',
        section: 'achievement',
        sortOrder: 2,
      },
      {
        claimId: 'ap-naidu-rural-roads-delivery',
        section: 'achievement',
        sortOrder: 3,
      },
      {
        claimId: 'ap-jagan-rural-connectivity',
        section: 'achievement',
        sortOrder: 4,
      },
      {
        claimId: 'ap-naidu-current-road-repair',
        section: 'achievement',
        sortOrder: 5,
      },
      {
        claimId: 'ap-naidu-capital-risk',
        section: 'concern',
        sortOrder: 1,
      },
      {
        claimId: 'ap-jagan-fiscal-risk',
        section: 'concern',
        sortOrder: 2,
      },
      {
        claimId: 'ap-jagan-road-delivery-gap',
        section: 'concern',
        sortOrder: 3,
      },
      {
        claimId: 'ap-road-safety-execution-gap',
        section: 'concern',
        sortOrder: 4,
      },
      {
        claimId: 'ap-naidu-current-too-early',
        section: 'context',
        sortOrder: 1,
      },
      {
        claimId: 'ap-shared-attribution',
        section: 'context',
        sortOrder: 2,
      },
      {
        claimId: 'ap-panchayat-awards-local-credit',
        section: 'context',
        sortOrder: 3,
      },
    ],
  },
]

export const andhraIndicatorDefinitions: IndicatorDefinitionSeed[] = [
  {
    id: 'ap-real-nsdp-per-capita',
    name: 'Real net state domestic product per person',
    shortName: 'Real state output/person',
    description:
      'Inflation-adjusted Andhra Pradesh NSDP per resident at constant 2011-12 prices.',
    plainLanguage:
      'This estimates how much inflation-adjusted state economic output remains per resident after depreciation. It is an average, not household income.',
    example:
      'A rise from Rs 79,174 to Rs 143,176 means real state output per resident increased about 81% between 2014-15 and 2024-25.',
    unit: 'constant 2011-12 Rs',
    format: 'currency',
    dimensionId: 'economic-opportunity',
    dimensionWeight: 0.7,
    direction: 'higher',
    transform: 'log',
    goalpostLow: 50000,
    goalpostHigh: 300000,
    sourceId: 'ap-ses-2024-25',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'ap-real-gsdp-growth',
    name: 'Real GSDP annual growth',
    shortName: 'Real GSDP growth',
    description:
      'Annual change in Andhra Pradesh GSDP at constant 2011-12 prices.',
    plainLanguage:
      'This shows how fast the inflation-adjusted state economy grew or shrank from the prior financial year.',
    example:
      'A value of 9.24% for 2024-25 means estimated real output was 9.24% higher than in 2023-24.',
    unit: '% per year',
    format: 'percent',
    dimensionId: 'economic-opportunity',
    dimensionWeight: 0,
    direction: 'neutral',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: -10,
    goalpostHigh: 15,
    sourceId: 'ap-ses-2024-25',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'ap-unemployment-rate',
    name: 'Unemployment rate, age 15 and above',
    shortName: 'Unemployment',
    description:
      'PLFS usual-status unemployment among people age 15 and above in rural and urban Andhra Pradesh.',
    plainLanguage:
      'Out of every 100 people working or actively seeking work, this estimates how many could not find work. A low rate can coexist with poor job quality or people leaving the labour force.',
    example:
      'A rate of 4.1% means about 4 of every 100 people in the labour force were unemployed.',
    unit: '% labour force 15+',
    format: 'percent',
    dimensionId: 'economic-opportunity',
    dimensionWeight: 0,
    direction: 'lower',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 1,
    goalpostHigh: 15,
    sourceId: 'niti-ap-macro-fiscal-2025',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'ap-debt-gsdp',
    name: 'Outstanding state debt as a share of GSDP',
    shortName: 'Debt / GSDP',
    description:
      'Outstanding Andhra Pradesh debt relative to the size of the state economy.',
    plainLanguage:
      'This compares state debt with one year of state economic output. Higher debt is not automatically bad, but it raises interest and future-budget risk when growth or revenue is weak.',
    example:
      'A value of 35.15% means outstanding debt was about Rs 35 for every Rs 100 of annual GSDP.',
    unit: '% GSDP',
    format: 'percent',
    dimensionId: 'sustainability',
    dimensionWeight: 0.6,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 15,
    goalpostHigh: 50,
    sourceId: 'ap-ses-2024-25',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'ap-life-expectancy',
    name: 'Life expectancy at birth',
    shortName: 'Life expectancy',
    description:
      'Expected years of life at birth under the state mortality pattern.',
    plainLanguage:
      'This estimates how long a newborn would live if current age-specific death rates continued.',
    example:
      'A value of 70.6 years means a newborn is expected to live about 70.6 years under the measured mortality pattern.',
    unit: 'years',
    format: 'number',
    dimensionId: 'human-capability',
    dimensionWeight: 0.35,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 50,
    goalpostHigh: 85,
    sourceId: 'niti-ap-macro-fiscal-2025',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'ap-infant-mortality',
    name: 'Infant mortality rate',
    shortName: 'Infant mortality',
    description: 'Estimated deaths before age one per 1,000 live births.',
    plainLanguage:
      'This estimates how many babies die before their first birthday for every 1,000 born alive. Lower is better.',
    example:
      'A rate of 30.3 means about 30 infant deaths per 1,000 live births.',
    unit: 'per 1,000 live births',
    format: 'number',
    dimensionId: 'human-capability',
    dimensionWeight: 0.3,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 5,
    goalpostHigh: 80,
    sourceId: 'nfhs5-ap',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'ap-women-ten-years-schooling',
    name: 'Women with ten or more years of schooling',
    shortName: 'Women 10+ years schooling',
    description:
      'Share of Andhra Pradesh women age 15-49 who completed at least ten years of schooling.',
    plainLanguage:
      'This estimates how many working-age women reached at least the secondary-school threshold.',
    example:
      'A value of 39.6% means about 40 of every 100 women age 15-49 completed ten or more years of schooling.',
    unit: '% women age 15-49',
    format: 'percent',
    dimensionId: 'human-capability',
    dimensionWeight: 0.2,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 20,
    goalpostHigh: 80,
    sourceId: 'nfhs5-ap',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'ap-child-stunting',
    name: 'Children under five who are stunted',
    shortName: 'Child stunting',
    description:
      'Share of children under five whose height-for-age is below the WHO threshold.',
    plainLanguage:
      'Stunting is a sign of long-term nutrition and health deprivation. Lower is better.',
    example:
      'A value of 31.2% means about 31 of every 100 young children were too short for age under the survey definition.',
    unit: '% children under 5',
    format: 'percent',
    dimensionId: 'human-capability',
    dimensionWeight: 0.15,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 10,
    goalpostHigh: 50,
    sourceId: 'nfhs5-ap',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'ap-child-anemia',
    name: 'Children age 6-59 months who are anaemic',
    shortName: 'Child anaemia',
    description:
      'Share of measured young children below the NFHS haemoglobin threshold.',
    plainLanguage:
      'This estimates how many young children have low haemoglobin, often linked to nutrition, infection, and health access. Lower is better.',
    example:
      'A value of 63.2% means nearly two out of three measured young children were anaemic.',
    unit: '% children 6-59 months',
    format: 'percent',
    dimensionId: 'human-capability',
    dimensionWeight: 0.15,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 10,
    goalpostHigh: 80,
    sourceId: 'nfhs5-ap',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'ap-electricity-access',
    name: 'Population living in households with electricity',
    shortName: 'Electricity access',
    description:
      'Share of Andhra Pradesh residents living in surveyed households with electricity.',
    plainLanguage:
      'This estimates how many people live in a household with an electricity connection. It does not measure reliability or affordability.',
    example:
      'A value of 99.5% means about 995 of every 1,000 people lived in a household with electricity.',
    unit: '% population',
    format: 'percent',
    dimensionId: 'basic-systems',
    dimensionWeight: 0.5,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 60,
    goalpostHigh: 100,
    sourceId: 'nfhs5-ap',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'ap-sanitation',
    name: 'Population using an improved sanitation facility',
    shortName: 'Improved sanitation',
    description:
      'Share of Andhra Pradesh residents living in surveyed households using an improved, non-shared sanitation facility under NFHS definitions.',
    plainLanguage:
      'This estimates access to a safer household toilet facility. It does not guarantee safe treatment of waste.',
    example:
      'A value of 77.3% means about 77 of every 100 people lived in a household using an improved sanitation facility.',
    unit: '% population',
    format: 'percent',
    dimensionId: 'basic-systems',
    dimensionWeight: 0.5,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 20,
    goalpostHigh: 100,
    sourceId: 'nfhs5-ap',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'ap-rural-road-network',
    name: 'Panchayat Raj rural-road network',
    shortName: 'Rural-road network',
    description:
      'Total road length maintained by the Andhra Pradesh Panchayat Raj Engineering Department.',
    plainLanguage:
      'This is the size of the rural local-road network. More kilometres can improve access, but the number does not show whether roads are paved, maintained, safe, or heavily used.',
    example:
      'A rise from 79,078 km in 2017 to 80,635 km in 2024 means the reported network grew by 1,557 km, not that every road became better.',
    unit: 'km',
    format: 'number',
    dimensionId: 'basic-systems',
    dimensionWeight: 0,
    direction: 'neutral',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 50000,
    goalpostHigh: 100000,
    sourceId: 'ap-ses-2024-25',
    frequency: 'survey',
    stateReady: true,
  },
  {
    id: 'ap-national-highway-length',
    name: 'National Highway length in Andhra Pradesh',
    shortName: 'National Highways',
    description:
      'Length of National Highways located in post-split Andhra Pradesh.',
    plainLanguage:
      'This shows how much of the Union-controlled National Highway network runs through the state. Growth can improve connectivity, but construction and credit are shared mainly with the Union and its highway agencies.',
    example:
      'An increase from 6,401 km in January 2018 to 8,744 km in December 2023 is about 2,343 additional reported kilometres, with possible classification changes.',
    unit: 'km',
    format: 'number',
    dimensionId: 'basic-systems',
    dimensionWeight: 0,
    direction: 'neutral',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 3000,
    goalpostHigh: 12000,
    sourceId: 'ap-ses-2024-25',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'ap-targeted-habitation-road-connectivity',
    name: 'Targeted habitations connected by all-weather PMGSY roads',
    shortName: 'All-weather habitation access',
    description:
      'Cumulative share of PMGSY-targeted Andhra Pradesh habitations reported connected by all-weather roads.',
    plainLanguage:
      'Out of villages and habitations selected for the rural-road programme, this shows how many received an all-weather connection. It is not the share of every settlement in the state.',
    example:
      'A value of 99.09% means about 99 of every 100 targeted habitations were reported connected.',
    unit: '% targeted habitations',
    format: 'percent',
    dimensionId: 'basic-systems',
    dimensionWeight: 0,
    direction: 'higher',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 100,
    sourceId: 'ap-ses-2024-25',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'ap-pmgsy-road-completion',
    name: 'PMGSY road length completed during the fiscal year',
    shortName: 'PMGSY completed',
    description:
      'Kilometres of Andhra Pradesh rural roads completed under PMGSY in each fiscal year.',
    plainLanguage:
      'This is an annual flow of completed programme roads, not the total network. It reflects joint Union finance and state implementation, and a high year may include work sanctioned earlier.',
    example:
      'A value of 484 km for 2025-26 means that much PMGSY road length was reported completed during that fiscal year.',
    unit: 'km completed',
    format: 'number',
    dimensionId: 'basic-systems',
    dimensionWeight: 0,
    direction: 'neutral',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 1500,
    sourceId: 'pib-ap-pmgsy-2026',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'ap-road-accident-deaths',
    name: 'Reported road-accident deaths',
    shortName: 'Road deaths',
    description:
      'Reported deaths in road accidents in Andhra Pradesh for the stated reporting period.',
    plainLanguage:
      'This counts people reported killed in road crashes. It should be read with population, vehicle use, road condition, enforcement, emergency care, and possible under-reporting.',
    example:
      'The 2024 value of 8,346 means that many people were reported killed during the full calendar year, up from 8,137 in 2023.',
    unit: 'deaths per calendar year',
    format: 'number',
    dimensionId: 'sustainability',
    dimensionWeight: 0,
    direction: 'lower',
    scoreRole: 'context',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 10000,
    sourceId: 'ap-ses-2024-25',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'ap-female-lfpr',
    name: 'Female labour-force participation, age 15 and above',
    shortName: 'Female labour force',
    description:
      'PLFS usual-status share of women age 15 and above who were working or seeking work.',
    plainLanguage:
      'This estimates how many adult women are economically active. It does not show job quality or earnings.',
    example:
      'A value of 45.8% means about 46 of every 100 women age 15 and above were working or looking for work.',
    unit: '% women age 15+',
    format: 'percent',
    dimensionId: 'inclusion',
    dimensionWeight: 0.4,
    direction: 'higher',
    transform: 'linear',
    goalpostLow: 15,
    goalpostHigh: 70,
    sourceId: 'niti-ap-macro-fiscal-2025',
    frequency: 'annual',
    stateReady: true,
  },
  {
    id: 'ap-mpi-poverty',
    name: 'Multidimensional poverty headcount',
    shortName: 'MPI poverty',
    description:
      'Share of Andhra Pradesh residents classified as multidimensionally poor under India’s national MPI.',
    plainLanguage:
      'This estimates how many people face a weighted combination of health, education, and living-standard deprivations.',
    example:
      'A value of 6.06% means about 6 of every 100 residents met the national multidimensional-poverty threshold.',
    unit: '% population',
    format: 'percent',
    dimensionId: 'inclusion',
    dimensionWeight: 0.4,
    direction: 'lower',
    transform: 'linear',
    goalpostLow: 0,
    goalpostHigh: 40,
    sourceId: 'niti-mpi-2023',
    frequency: 'survey',
    stateReady: true,
  },
]

const realNsdpValues = [
  [2014, 79174],
  [2015, 88609],
  [2016, 94115],
  [2017, 103177],
  [2018, 108853],
  [2019, 110587],
  [2020, 110971],
  [2021, 118349],
  [2022, 123853],
  [2023, 131083],
  [2024, 143176],
] as const

const realGsdpGrowthValues = [
  [2014, 9.2],
  [2015, 12.16],
  [2016, 8.34],
  [2017, 10.09],
  [2018, 5.36],
  [2019, 3.7],
  [2020, 1.52],
  [2021, 7.14],
  [2022, 6.51],
  [2023, 6.18],
  [2024, 9.24],
] as const

const apPmgsyRoadCompletionValues = [
  [2019, 301],
  [2020, 531],
  [2021, 1282],
  [2022, 1051],
  [2023, 369],
  [2024, 387],
  [2025, 484],
  [2026, 141],
] as const

const apRoadDeathValues = [
  [2020, 7039],
  [2021, 8186],
  [2022, 8293],
  [2023, 8137],
  [2024, 8346],
] as const

export const andhraIndicatorObservations: IndicatorObservationSeed[] = [
  ...realNsdpValues.map(([period, value]) => ({
    indicatorId: 'ap-real-nsdp-per-capita',
    jurisdictionId: 'andhra-pradesh',
    period,
    value,
    status: period === 2024 ? ('estimated' as const) : ('observed' as const),
    sourceId: 'ap-ses-2024-25',
    note:
      period === 2024
        ? '2024-25 First Advance Estimate; the fiscal year spans the 2024 change of government.'
        : `${period}-${String(period + 1).slice(-2)} constant 2011-12 price estimate.`,
  })),
  ...realGsdpGrowthValues.map(([period, value]) => ({
    indicatorId: 'ap-real-gsdp-growth',
    jurisdictionId: 'andhra-pradesh',
    period,
    value,
    status: period === 2024 ? ('estimated' as const) : ('observed' as const),
    sourceId: 'ap-ses-2024-25',
    note:
      period === 2024
        ? '2024-25 First Advance Estimate.'
        : 'Annual growth at constant 2011-12 prices.',
  })),
  {
    indicatorId: 'ap-unemployment-rate',
    jurisdictionId: 'andhra-pradesh',
    period: 2022,
    value: 4.1,
    status: 'observed',
    sourceId: 'niti-ap-macro-fiscal-2025',
    note: 'PLFS 2022-23 usual status, age 15 and above.',
  },
  {
    indicatorId: 'ap-unemployment-rate',
    jurisdictionId: 'andhra-pradesh',
    period: 2023,
    value: 4.1,
    status: 'observed',
    sourceId: 'ap-ses-2024-25',
    note: 'PLFS 2023-24 usual status, age 15 and above.',
  },
  {
    indicatorId: 'ap-debt-gsdp',
    jurisdictionId: 'andhra-pradesh',
    period: 2022,
    value: 32.6,
    status: 'observed',
    sourceId: 'ap-ses-2024-25',
    note: '2022-23 actuals.',
  },
  {
    indicatorId: 'ap-debt-gsdp',
    jurisdictionId: 'andhra-pradesh',
    period: 2023,
    value: 34.58,
    status: 'observed',
    sourceId: 'ap-ses-2024-25',
    note: '2023-24 actuals.',
  },
  {
    indicatorId: 'ap-debt-gsdp',
    jurisdictionId: 'andhra-pradesh',
    period: 2024,
    value: 35.15,
    status: 'estimated',
    sourceId: 'ap-ses-2024-25',
    note: '2024-25 Revised Estimate.',
  },
  {
    indicatorId: 'ap-life-expectancy',
    jurisdictionId: 'andhra-pradesh',
    period: 2020,
    value: 70.6,
    status: 'estimated',
    sourceId: 'niti-ap-macro-fiscal-2025',
    note: 'SRS abridged life table estimate for 2016-20.',
  },
  {
    indicatorId: 'ap-infant-mortality',
    jurisdictionId: 'andhra-pradesh',
    period: 2015,
    value: 34.9,
    status: 'estimated',
    sourceId: 'nfhs4-ap',
    note: 'NFHS-4 survey estimate for 2015-16.',
  },
  {
    indicatorId: 'ap-infant-mortality',
    jurisdictionId: 'andhra-pradesh',
    period: 2019,
    value: 30.3,
    status: 'estimated',
    sourceId: 'nfhs5-ap',
    note: 'NFHS-5 survey estimate for 2019-20.',
  },
  {
    indicatorId: 'ap-electricity-access',
    jurisdictionId: 'andhra-pradesh',
    period: 2015,
    value: 99.2,
    status: 'estimated',
    sourceId: 'nfhs5-ap',
    note: 'NFHS-5 fact sheet comparable NFHS-4 household-population value.',
  },
  {
    indicatorId: 'ap-electricity-access',
    jurisdictionId: 'andhra-pradesh',
    period: 2019,
    value: 99.5,
    status: 'estimated',
    sourceId: 'nfhs5-ap',
    note: 'NFHS-5 fieldwork in 2019.',
  },
  {
    indicatorId: 'ap-sanitation',
    jurisdictionId: 'andhra-pradesh',
    period: 2015,
    value: 54.4,
    status: 'estimated',
    sourceId: 'nfhs5-ap',
    note: 'Comparable NFHS-4 improved sanitation value reported in the NFHS-5 fact sheet.',
  },
  {
    indicatorId: 'ap-sanitation',
    jurisdictionId: 'andhra-pradesh',
    period: 2019,
    value: 77.3,
    status: 'estimated',
    sourceId: 'nfhs5-ap',
    note: 'NFHS-5 fieldwork in 2019.',
  },
  {
    indicatorId: 'ap-female-lfpr',
    jurisdictionId: 'andhra-pradesh',
    period: 2022,
    value: 45.8,
    status: 'observed',
    sourceId: 'niti-ap-macro-fiscal-2025',
    note: 'PLFS 2022-23 usual-status female labour-force participation, age 15 and above.',
  },
  {
    indicatorId: 'ap-mpi-poverty',
    jurisdictionId: 'andhra-pradesh',
    period: 2015,
    value: 11.77,
    status: 'estimated',
    sourceId: 'niti-mpi-2023',
    note: 'National MPI based on NFHS-4, 2015-16.',
  },
  {
    indicatorId: 'ap-mpi-poverty',
    jurisdictionId: 'andhra-pradesh',
    period: 2019,
    value: 6.06,
    status: 'estimated',
    sourceId: 'niti-mpi-2023',
    note: 'National MPI based on NFHS-5, 2019-21.',
  },
  {
    indicatorId: 'ap-women-ten-years-schooling',
    jurisdictionId: 'andhra-pradesh',
    period: 2015,
    value: 34.3,
    status: 'estimated',
    sourceId: 'nfhs4-ap',
    note: 'NFHS-4, women age 15-49.',
  },
  {
    indicatorId: 'ap-women-ten-years-schooling',
    jurisdictionId: 'andhra-pradesh',
    period: 2019,
    value: 39.6,
    status: 'estimated',
    sourceId: 'nfhs5-ap',
    note: 'NFHS-5, women age 15-49.',
  },
  {
    indicatorId: 'ap-child-stunting',
    jurisdictionId: 'andhra-pradesh',
    period: 2015,
    value: 31.4,
    status: 'estimated',
    sourceId: 'nfhs4-ap',
    note: 'NFHS-4, children under five.',
  },
  {
    indicatorId: 'ap-child-stunting',
    jurisdictionId: 'andhra-pradesh',
    period: 2019,
    value: 31.2,
    status: 'estimated',
    sourceId: 'nfhs5-ap',
    note: 'NFHS-5, children under five.',
  },
  {
    indicatorId: 'ap-child-anemia',
    jurisdictionId: 'andhra-pradesh',
    period: 2015,
    value: 58.6,
    status: 'estimated',
    sourceId: 'nfhs4-ap',
    note: 'NFHS-4 biomarker estimate.',
  },
  {
    indicatorId: 'ap-child-anemia',
    jurisdictionId: 'andhra-pradesh',
    period: 2019,
    value: 63.2,
    status: 'estimated',
    sourceId: 'nfhs5-ap',
    note: 'NFHS-5 biomarker estimate; higher is worse.',
  },
  {
    indicatorId: 'ap-rural-road-network',
    jurisdictionId: 'andhra-pradesh',
    period: 2017,
    value: 79078,
    status: 'observed',
    sourceId: 'ap-ses-2017-18',
    note: 'Panchayat Raj Engineering Department network as of April 1, 2017.',
  },
  {
    indicatorId: 'ap-rural-road-network',
    jurisdictionId: 'andhra-pradesh',
    period: 2019,
    value: 79344,
    status: 'observed',
    sourceId: 'ap-ses-2019-20',
    note:
      'Panchayat Raj road network as of April 2019; the 2019-20 completion flow crosses the change of government.',
  },
  {
    indicatorId: 'ap-rural-road-network',
    jurisdictionId: 'andhra-pradesh',
    period: 2024,
    value: 80635,
    status: 'observed',
    sourceId: 'ap-ses-2024-25',
    note: 'Panchayat Raj Engineering Department network as of April 2024.',
  },
  {
    indicatorId: 'ap-national-highway-length',
    jurisdictionId: 'andhra-pradesh',
    period: 2018,
    value: 6401.39,
    status: 'observed',
    sourceId: 'ap-ses-2017-18',
    note: 'National Highway length reported as of January 25, 2018.',
  },
  {
    indicatorId: 'ap-national-highway-length',
    jurisdictionId: 'andhra-pradesh',
    period: 2023,
    value: 8744,
    status: 'observed',
    sourceId: 'ap-ses-2024-25',
    note: 'National Highway length reported as of December 2023.',
  },
  {
    indicatorId: 'ap-targeted-habitation-road-connectivity',
    jurisdictionId: 'andhra-pradesh',
    period: 2024,
    value: 99.09,
    status: 'observed',
    sourceId: 'ap-ses-2024-25',
    note:
      'Cumulative share of targeted habitations connected under PMGSY; not all state habitations.',
  },
  ...apPmgsyRoadCompletionValues.map(([period, value]) => ({
    indicatorId: 'ap-pmgsy-road-completion',
    jurisdictionId: 'andhra-pradesh',
    period,
    value,
    status: period === 2026 ? ('estimated' as const) : ('observed' as const),
    sourceId: period <= 2023 ? 'pib-ap-pmgsy-2019-24' : 'pib-ap-pmgsy-2026',
    note:
      period === 2026
        ? '2026-27 completed length through July 16, 2026.'
        : `${period}-${String(period + 1).slice(-2)} completed PMGSY length; joint Union-state programme.`,
  })),
  ...apRoadDeathValues.map(([period, value]) => ({
    indicatorId: 'ap-road-accident-deaths',
    jurisdictionId: 'andhra-pradesh',
    period,
    value,
    status: 'observed' as const,
    sourceId: 'morth-road-accidents-2024-ap',
    note: 'Full calendar-year police-reported road-accident deaths.',
  })),
]

const budgetDimensionIds = [
  'strategy',
  'fiscal',
  'capacity',
  'inclusion',
  'delivery',
] as const

const andhraBudgetComponents: Record<string, number[]> = {
  'budget-ap-2014-15': [8, 5.5, 7.5, 6, 5.8],
  'budget-ap-2019-20': [8, 5.5, 6.5, 8.5, 6],
  'budget-ap-2026-27': [7.5, 5.5, 8, 7.5, 5.5],
}

function budgetRating(budgetId: string) {
  const scores = andhraBudgetComponents[budgetId]
  return Math.round((scores.reduce((sum, score) => sum + score, 0) / 5) * 10) / 10
}

export const andhraBudgets: BudgetSeed[] = [
  {
    id: 'budget-ap-2014-15',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2014',
    title: 'First full budget of post-split Andhra Pradesh',
    shortTitle: 'New-state foundation budget',
    fiscalYear: '2014-15',
    presentedDate: '2014-08-20',
    financeMinister: 'Yanamala Ramakrishnudu',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A state-building budget balancing a severe revenue gap with irrigation, social infrastructure, transport, administration, and the first capital requirements.',
    plainLanguage:
      'The new state had lost Hyderabad’s revenue base and needed to run government, repair finances, and build a capital at the same time. The budget protected investment but started with a large structural disadvantage.',
    totalExpenditureCrore: 106280.82,
    revenueExpenditureCrore: 98141.82,
    capitalExpenditureCrore: 7070,
    ratingScore: budgetRating('budget-ap-2014-15'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A credible new-state strategy with meaningful irrigation and social capital, reduced by a severe revenue deficit, optimistic financing, and the scale of simultaneous capital and reconstruction demands.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ap-budget-2014-15', 'ap-reorganisation-act-2014'],
  },
  {
    id: 'budget-ap-2019-20',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    title: 'First Jagan government budget',
    shortTitle: 'Welfare and service-delivery budget',
    fiscalYear: '2019-20',
    presentedDate: '2019-07-12',
    financeMinister: 'Buggana Rajendranath Reddy',
    budgetKind: 'full',
    status: 'completed',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'A large expansion of welfare commitments and social services alongside irrigation and capital outlay, presented before the pandemic altered execution.',
    plainLanguage:
      'The government tried to move money directly toward households, schools, health, and farmers while retaining major irrigation investment. The plan’s scale created delivery and borrowing pressure, and COVID-19 soon changed the fiscal reality.',
    totalExpenditureCrore: 214558,
    revenueExpenditureCrore: 180475.94,
    capitalExpenditureCrore: 32293.38,
    ratingScore: budgetRating('budget-ap-2019-20'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong inclusion and programme fit, with substantial stated capital outlay; weakened by ambitious receipts, recurring welfare cost, later fiscal stress, and incomplete separation of proposal from pandemic-era execution.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ap-budget-2019-20', 'niti-ap-macro-fiscal-2025'],
  },
  {
    id: 'budget-ap-2026-27',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2024',
    title: 'Andhra Pradesh Budget 2026-27',
    shortTitle: 'Capital restart and fiscal repair',
    fiscalYear: '2026-27',
    presentedDate: '2026-02-14',
    financeMinister: 'Payyavula Keshav',
    budgetKind: 'full',
    status: 'current',
    coverageStatus: 'partial',
    ratingBasis: 'proposal',
    summary:
      'A current proposal combining a large capital outlay with Amaravati, irrigation, rural development, social services, transport, and continued welfare commitments.',
    plainLanguage:
      'The plan tries to restart big infrastructure without dropping core welfare. It proposes nearly Rs 48,700 crore of capital spending, but also carries a large revenue deficit and depends on strong execution and financing.',
    totalExpenditureCrore: 310058.01,
    revenueExpenditureCrore: 256142.64,
    capitalExpenditureCrore: 48697.7,
    ratingScore: budgetRating('budget-ap-2026-27'),
    ratingConfidence: 'low',
    ratingSummary:
      'Provisional 6.8/10: a stronger productive-capacity plan with large social and irrigation capital, reduced by a Rs 22,002.5 crore revenue deficit, debt exposure, and unproven delivery.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['ap-budget-2026-27', 'niti-ap-macro-fiscal-2025'],
  },
]

const andhraBudgetRationales: Record<string, string[]> = {
  'budget-ap-2014-15': [
    'Correctly focused on making a newly divided state function while rebuilding revenue, infrastructure, and a capital base.',
    'A revenue deficit above Rs 6,000 crore and uncertain transition receipts weakened fiscal credibility.',
    'Irrigation, social services, and transport received material capital support.',
    'The budget protected social investment but had limited room relative to the scale of regional and livelihood needs.',
    'Rapid institution-building was necessary, while capital finance and project sequencing created major long-run risk.',
  ],
  'budget-ap-2019-20': [
    'Matched the electoral mandate for welfare, education, health, farmers, and local service delivery.',
    'Large receipt and expenditure assumptions plus later pandemic disruption weakened the fiscal frame.',
    'The proposal retained major irrigation and social capital, though later low capex ratios question realised delivery.',
    'Household transfers and public services gave the budget a strong inclusion orientation.',
    'Administrative reach improved, while recurring commitments, debt, and off-budget exposure reduced durability.',
  ],
  'budget-ap-2026-27': [
    'Targets unfinished capital, irrigation, rural infrastructure, social services, and growth constraints coherently.',
    'The large revenue deficit and debt context limit fiscal credibility despite stronger proposed capital spending.',
    'Nearly Rs 48,700 crore of capital outlay gives infrastructure and public assets substantial weight.',
    'Social-service, rural-development, irrigation, and welfare allocations preserve broad reach.',
    'The proposal is too new for execution evidence and faces procurement, finance, land, and project-control risks.',
  ],
}

export const andhraBudgetScores: BudgetScoreSeed[] = Object.entries(
  andhraBudgetComponents,
).flatMap(([budgetId, scores]) =>
  scores.map((score, index) => ({
    budgetId,
    dimensionId: budgetDimensionIds[index],
    score,
    rationale: andhraBudgetRationales[budgetId][index],
  })),
)

export const andhraBudgetAllocations: BudgetAllocationSeed[] = [
  {
    id: 'ap-2014-irrigation-capital',
    budgetId: 'budget-ap-2014-15',
    category: 'irrigation',
    label: 'Irrigation and flood-control capital outlay',
    amountCrore: 3103.56,
    note: 'Major, medium, minor irrigation and flood-control capital accounts.',
    sourceId: 'ap-budget-2014-15',
    sortOrder: 1,
  },
  {
    id: 'ap-2014-social-capital',
    budgetId: 'budget-ap-2014-15',
    category: 'public-services',
    label: 'Social-services capital outlay',
    amountCrore: 2285.47,
    note: 'Education, health, water, housing, welfare, and related social capital.',
    sourceId: 'ap-budget-2014-15',
    sortOrder: 2,
  },
  {
    id: 'ap-2014-transport-capital',
    budgetId: 'budget-ap-2014-15',
    category: 'transport',
    label: 'Transport capital outlay',
    amountCrore: 1344.21,
    note: 'Roads, bridges, ports, aviation, and transport capital.',
    sourceId: 'ap-budget-2014-15',
    sortOrder: 3,
  },
  {
    id: 'ap-2019-irrigation-capital',
    budgetId: 'budget-ap-2019-20',
    category: 'irrigation',
    label: 'Irrigation and flood-control capital outlay',
    amountCrore: 11411.18,
    note: 'The largest named capital account in the first Jagan budget.',
    sourceId: 'ap-budget-2019-20',
    sortOrder: 1,
  },
  {
    id: 'ap-2019-social-capital',
    budgetId: 'budget-ap-2019-20',
    category: 'public-services',
    label: 'Social-services capital outlay',
    amountCrore: 8070.87,
    note: 'Education, health, water, housing, welfare, and urban services.',
    sourceId: 'ap-budget-2019-20',
    sortOrder: 2,
  },
  {
    id: 'ap-2019-transport-capital',
    budgetId: 'budget-ap-2019-20',
    category: 'transport',
    label: 'Transport capital outlay',
    amountCrore: 2399.56,
    note: 'Road, bridge, port, aviation, and transport investment.',
    sourceId: 'ap-budget-2019-20',
    sortOrder: 3,
  },
  {
    id: 'ap-2026-social-capital',
    budgetId: 'budget-ap-2026-27',
    category: 'public-services',
    label: 'Social-services capital outlay',
    amountCrore: 19224,
    note: 'The largest broad capital category in the current proposal.',
    sourceId: 'ap-budget-2026-27',
    sortOrder: 1,
  },
  {
    id: 'ap-2026-irrigation-capital',
    budgetId: 'budget-ap-2026-27',
    category: 'irrigation',
    label: 'Irrigation and flood-control capital outlay',
    amountCrore: 15969,
    note: 'Major, medium, minor irrigation and flood control.',
    sourceId: 'ap-budget-2026-27',
    sortOrder: 2,
  },
  {
    id: 'ap-2026-rural-capital',
    budgetId: 'budget-ap-2026-27',
    category: 'rural-development',
    label: 'Rural-development capital outlay',
    amountCrore: 5533,
    note: 'Capital account for rural-development programmes.',
    sourceId: 'ap-budget-2026-27',
    sortOrder: 3,
  },
  {
    id: 'ap-2026-transport-capital',
    budgetId: 'budget-ap-2026-27',
    category: 'transport',
    label: 'Transport capital outlay',
    amountCrore: 3015,
    note: 'Road, bridge, port, aviation, and transport investment.',
    sourceId: 'ap-budget-2026-27',
    sortOrder: 4,
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

export const andhraBudgetPoints: BudgetPointSeed[] = [
  ...budgetPoints('budget-ap-2014-15', 'ap-budget-2014-15', [
    [
      'priority',
      'Build a functioning successor state',
      'Fund administration, irrigation, transport, social infrastructure, and the first capital needs after bifurcation.',
    ],
    [
      'strength',
      'Investment survived the revenue shock',
      'The plan retained meaningful irrigation, social-service, and transport capital despite a difficult revenue base.',
    ],
    [
      'risk',
      'The structural gap was larger than one budget',
      'Revenue deficit, capital finance, Union commitments, and simultaneous institution building created persistent fiscal pressure.',
    ],
  ]),
  ...budgetPoints('budget-ap-2019-20', 'ap-budget-2019-20', [
    [
      'priority',
      'Shift toward households and public services',
      'The budget made welfare transfers, education, health, farmers, and local delivery central to the new government’s programme.',
    ],
    [
      'strength',
      'Large stated social and irrigation capital',
      'The proposal combined inclusion with substantial capital accounts rather than presenting welfare as the only priority.',
    ],
    [
      'risk',
      'Execution diverged from the opening plan',
      'COVID-19, recurring commitments, debt, contingent liabilities, and later low capital-expenditure ratios weakened the original arithmetic.',
    ],
  ]),
  ...budgetPoints('budget-ap-2026-27', 'ap-budget-2026-27', [
    [
      'priority',
      'Restart capital and infrastructure investment',
      'The plan places social services, irrigation, rural development, transport, and Amaravati-linked capacity at the centre.',
    ],
    [
      'strength',
      'Capital outlay is materially larger',
      'The proposal provides nearly Rs 48,700 crore for capital expenditure across broad productive and public-service categories.',
    ],
    [
      'risk',
      'Revenue deficit and delivery remain unresolved',
      'A Rs 22,002.5 crore revenue deficit, high debt, procurement, and project execution can still crowd out or delay the plan.',
    ],
    [
      'context',
      'This score is provisional',
      'The 2026-27 fiscal year is underway, so no completed spending or outcome record exists.',
    ],
  ]),
]
