import type {
  ClaimSeed,
  CuratedAnswerSeed,
  LeaderSpecialistAssessmentSeed,
  LeaderSpecialistDimensionSeed,
  LeaderSpecialistTopicSeed,
  SourceSeed,
} from '../types.ts'

const reviewedAt = '2026-08-04'

export const infrastructureCapacitySources: SourceSeed[] = [
  {
    id: 'economic-survey-infrastructure-2025-26',
    title:
      'Economic Survey 2025-26, Chapter 9: Investment and Infrastructure',
    publisher: 'Ministry of Finance, Government of India',
    url: 'https://www.indiabudget.gov.in/economicsurvey/doc/eschapter/echap09.pdf',
    sourceType: 'official-cross-sector-statistics',
    reliability: 5,
    ratingReason:
      'Primary cross-sector government compilation with named ministry sources and current transport, ports, waterways, rail, aviation, energy, and digital-infrastructure statistics.',
    bestFor:
      'Comparable infrastructure stock and flow context through late 2025 and the government policy chronology.',
    limitations:
      'Government interpretation is promotional in places; stock, annual flow, planned capacity, and completed output remain different measures.',
    publishedDate: '2026-01-29',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pib-dfc-completion-2026',
    title: 'Dedicated Freight Corridor network completed and operational',
    publisher: 'Press Information Bureau, Ministry of Railways',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2280139',
    sourceType: 'official-infrastructure-status',
    reliability: 5,
    ratingReason:
      'Primary July 30, 2026 record confirming completion and operation of the 2,843 km Eastern and Western Dedicated Freight Corridors.',
    bestFor: 'The final commissioned DFC length and completion date.',
    limitations:
      'Completion under one government does not erase pre-2014 sanction, land, contracting, World Bank financing, or JICA financing.',
    publishedDate: '2026-07-30',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pib-transport-capacity-2026',
    title: 'Infrastructure at the Core: Transforming India’s Transport Sector',
    publisher: 'Press Information Bureau, Government of India',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2270740&lang=1&reg=3',
    sourceType: 'official-cross-sector-statistics',
    reliability: 5,
    ratingReason:
      'Primary government comparison of National Highways, high-speed corridors, ports, inland waterways, and logistics capacity.',
    bestFor:
      'Current transport scale and directly stated 2014 baselines across several modes.',
    limitations:
      'Definitions vary by row, and the publication does not independently establish utilization, value for money, safety, or exclusive Union credit.',
    publishedDate: '2026-06-09',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pib-metro-capacity-2026',
    title: 'Metro rail network expands to 1,155 operational kilometres',
    publisher: 'Press Information Bureau, Ministry of Housing and Urban Affairs',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2270745&lang=1&reg=3',
    sourceType: 'official-urban-infrastructure-statistics',
    reliability: 5,
    ratingReason:
      'Primary national metro inventory with the 2014 baseline, operating length, cities served, and construction pipeline.',
    bestFor: 'Like-for-like operational metro-network growth.',
    limitations:
      'Metro systems are delivered by Union-state-city SPVs, and several post-2014 openings came from projects approved or under construction before 2014.',
    publishedDate: '2026-06-09',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pib-rail-electrification-2026',
    title: 'Broad-gauge railway electrification reaches near-universal coverage',
    publisher: 'Press Information Bureau, Ministry of Railways',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2276592&reg=3&lang=1',
    sourceType: 'official-railway-statistics',
    reliability: 5,
    ratingReason:
      'Primary route-kilometre record for the 2014 baseline and latest broad-gauge electrification.',
    bestFor:
      'The share and pace of existing railway routes electrified after 2014.',
    limitations:
      'Electrifying existing lines is valuable capacity modernisation but is not construction of an entirely new rail network.',
    publishedDate: '2026-06-25',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pib-airports-capacity-2026',
    title: 'Bhogapuram becomes India’s 166th operational aviation facility',
    publisher: 'Press Information Bureau, Ministry of Civil Aviation',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2280985&reg=3&lang=1',
    sourceType: 'official-aviation-statistics',
    reliability: 5,
    ratingReason:
      'Primary current record for the number of operational airports and aviation facilities.',
    bestFor: 'Updating the 74-facility 2014 baseline to August 2026.',
    limitations:
      'The inventory includes revived airports, heliports, and water aerodromes; it is not a count of newly constructed greenfield airports.',
    publishedDate: '2026-08-01',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'world-bank-dfc-financing-2014',
    title: 'India and World Bank sign financing for the Eastern DFC',
    publisher: 'World Bank',
    url: 'https://www.worldbank.org/en/news/press-release/2014/12/11/sign-billion-agreeement-eastern-dedicated-freight-corridtor',
    sourceType: 'multilateral-project-record',
    reliability: 5,
    ratingReason:
      'Direct multilateral project-financing record describing pre-existing DFC preparation, objectives, and the second financing stage.',
    bestFor:
      'Separating project conception and early finance from later construction and commissioning.',
    limitations:
      'A lender’s project record does not independently evaluate the final full-network cost, utilization, or economic return.',
    publishedDate: '2014-12-11',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'prs-roads-analysis-2026',
    title: 'Demand for Grants 2026-27: Road Transport and Highways',
    publisher: 'PRS Legislative Research',
    url: 'https://prsindia.org/budgets/parliament/demand-for-grants-2026-27-analysis-road-transport-and-highways',
    sourceType: 'independent-budget-analysis',
    reliability: 4,
    ratingReason:
      'Independent analysis of road spending, NHAI finance, project delivery, maintenance, safety, and sector risks using official records.',
    bestFor:
      'Testing whether large highway additions also delivered fiscal sustainability, maintenance, and safer mobility.',
    limitations:
      'Budget analysis cannot assign every project outcome causally to the Prime Minister.',
    publishedDate: '2026-02-20',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'cea-installed-capacity-june-2026',
    title: 'All India Installed Capacity, June 2026',
    publisher: 'Central Electricity Authority',
    url: 'https://cea.nic.in/wp-content/uploads/installed/2026/06/Website_June.pdf',
    sourceType: 'official-energy-statistics',
    reliability: 5,
    ratingReason:
      'Primary plant-level and ownership-class installed power capacity statistics, including solar, renewable, thermal, nuclear, and hydro.',
    bestFor:
      'Comparable June 2014 and June 2026 power and solar capacity and current ownership shares.',
    limitations:
      'Installed megawatts are not dependable generation, affordability, grid stability, or household service quality.',
    publishedDate: '2026-07-15',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pngrb-city-gas-may-2026',
    title: 'City Gas Distribution MIS Report, May 2026',
    publisher: 'Petroleum and Natural Gas Regulatory Board',
    url: 'https://pngrb.gov.in/data-bank/20260531-CGD-MIS-Report.pdf',
    sourceType: 'official-utility-statistics',
    reliability: 5,
    ratingReason:
      'Primary regulator report for authorised, achieved, and billed domestic PNG connections.',
    bestFor:
      'Distinguishing installed connections from active billed household use.',
    limitations:
      'Connection counts do not establish affordability, continuity, consumption, or household welfare.',
    publishedDate: '2026-05-31',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pib-jjm-july-2026',
    title: 'Jal Jeevan Mission rural household tap-water coverage',
    publisher: 'Press Information Bureau, Ministry of Jal Shakti',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2290048',
    sourceType: 'official-programme-statistics',
    reliability: 5,
    ratingReason:
      'Primary administrative record for the August 2019 baseline and July 2026 rural household connection coverage.',
    bestFor:
      'The true JJM baseline date, connected households, and Centre-state delivery structure.',
    limitations:
      'Administrative coverage is not proof of regular supply, safe water, pressure, repair, or long-run village-system functionality.',
    publishedDate: '2026-07-27',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'india-water-portal-jjm-functionality-2026',
    title: 'From coverage to functionality: reviewing rural tap-water services',
    publisher: 'India Water Portal',
    url: 'https://www.indiawaterportal.org/drinking-water/from-coverage-to-functionality-reviewing-indias-national-assessment-of-rural-tap-water-services',
    sourceType: 'independent-water-analysis',
    reliability: 4,
    ratingReason:
      'Named independent review of the national functionality assessment and the gap between connection coverage and fully functional service.',
    bestFor:
      'Water regularity, quality, quantity, sampled functionality, and sustainability caveats.',
    limitations:
      'Review of a sampled assessment rather than a new nationwide household census.',
    publishedDate: '2026-04-20',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pngrb-gas-pipelines-april-2026',
    title: 'Natural Gas Pipeline MIS Report, April 2026',
    publisher: 'Petroleum and Natural Gas Regulatory Board',
    url: 'https://pngrb.gov.in/data-bank/20260430-NGPL-MIS-Report.pdf',
    sourceType: 'official-utility-statistics',
    reliability: 5,
    ratingReason:
      'Primary regulator record for operational pipeline length, authorisation dates, project status, capacity, and utilization.',
    bestFor:
      'Current pipeline length, inherited authorisations, and whether completed capacity is actually used.',
    limitations:
      'Pipeline kilometres alone do not establish gas demand, affordability, energy security, or environmental benefit.',
    publishedDate: '2026-04-30',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'cea-transmission-june-2026',
    title: 'Growth of Transmission Lines, June 2026',
    publisher: 'Central Electricity Authority',
    url: 'https://cea.nic.in/wp-content/uploads/transmission/2026/06/Growth_Summary_Transmission_Line.pdf',
    sourceType: 'official-grid-statistics',
    reliability: 5,
    ratingReason:
      'Primary voltage-level and ownership-sector record for national transmission-line growth.',
    bestFor:
      'The March 2014 baseline, June 2026 stock, and Union, state, and private ownership shares.',
    limitations:
      'Circuit kilometres do not establish congestion, outages, renewable curtailment, distribution quality, or consumer reliability.',
    publishedDate: '2026-06-30',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'iea-electricity-midyear-2026',
    title: 'Electricity Mid-Year Update 2026',
    publisher: 'International Energy Agency',
    url: 'https://www.iea.org/reports/electricity-mid-year-update-2026',
    sourceType: 'independent-energy-analysis',
    reliability: 4,
    ratingReason:
      'International energy analysis that separates installed capacity from actual generation, demand, reliability, and system integration.',
    bestFor:
      'Testing whether large solar and renewable capacity translated into electricity output and grid performance.',
    limitations:
      'Cross-country synthesis and forecasts are not a project-level audit of Indian power policy.',
    publishedDate: '2026-07-22',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pib-startups-june-2026',
    title: 'DPIIT-recognised startups exceed 2.3 lakh by June 2026',
    publisher: 'Press Information Bureau, Department for Promotion of Industry and Internal Trade',
    url: 'https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=158887&id=158887',
    sourceType: 'official-programme-statistics',
    reliability: 5,
    ratingReason:
      'Primary programme count and policy chronology for Startup India recognition.',
    bestFor:
      'The current recognition total and the fact that the official recognition category began in 2016.',
    limitations:
      'Recognition does not prove that a firm is active, funded, innovative, productive, profitable, or surviving.',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'tracxn-india-funding-2025',
    title: 'India Tech Annual Funding Report 2025',
    publisher: 'Tracxn',
    url: 'https://tracxn.com/d/insights/market-reports/india-tech-annual-funding-report-2025/__pvsyFahv-Ilo6lB2JbwcePNNWOdgWGMsVyntzEVDIn0',
    sourceType: 'independent-market-data',
    reliability: 3,
    ratingReason:
      'Named private market dataset tracking technology-company funding and ecosystem conditions.',
    bestFor:
      'Showing why recognised-startup counts are not a complete measure of capital, survival, exits, or ecosystem health.',
    limitations:
      'Proprietary market coverage may omit transactions and does not measure all startups or employment.',
    publishedDate: '2026-01-08',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pib-aiims-status-2026',
    title: 'PMSSY and AIIMS status through January 2026',
    publisher: 'Press Information Bureau, Ministry of Health and Family Welfare',
    url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/jan/doc202611749801.pdf',
    sourceType: 'official-health-infrastructure-status',
    reliability: 5,
    ratingReason:
      'Primary record for AIIMS approvals, functional status, medical colleges, and medical-education capacity.',
    bestFor:
      'Separating AIIMS approved, built, functional, and pre-2014 programme foundations.',
    limitations:
      'Institution counts do not establish staffing, service quality, patient outcomes, affordability, or regional equity.',
    publishedDate: '2026-01-17',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'sansad-aiims-vacancies-2026',
    title: 'Faculty vacancies in AIIMS institutions',
    publisher: 'Parliament of India',
    url: 'https://sansad.in/getFile/annex/270/AU1239_qrCogd.pdf?source=pqars',
    sourceType: 'official-parliamentary-reply',
    reliability: 5,
    ratingReason:
      'Direct parliamentary table for sanctioned and vacant faculty positions by AIIMS.',
    bestFor:
      'Testing whether institutional expansion is matched by specialist staffing.',
    limitations:
      'Vacancy counts do not alone measure clinical quality, teaching load, patient outcomes, or recruitment trends.',
    publishedDate: '2026-07-28',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'nmc-seat-matrix-2026',
    title: 'Final MBBS Seat Matrix for Academic Year 2026-27',
    publisher: 'National Medical Commission',
    url: 'https://www.nmc.org.in/MCIRest/open/getDocument?path=%2FDocuments%2FPublic%2FPortal%2FLatestNews%2FPublicNotice_Merged_seatmatrix_Secretary_covering.pdf',
    sourceType: 'official-regulatory-capacity-record',
    reliability: 5,
    ratingReason:
      'Primary regulator inventory for recognised colleges and sanctioned undergraduate medical intake.',
    bestFor:
      'Current MBBS seats and the distinction between colleges, institutes of national importance, and annual intake.',
    limitations:
      'Sanctioned seats are not graduates, practising doctors, public-sector staffing, teaching quality, or affordable access.',
    publishedDate: '2026-07-15',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'steel-capacity-april-2026',
    title: 'Overview of the Steel Sector, April 2026',
    publisher: 'Ministry of Steel, Government of India',
    url: 'https://steel.gov.in/sites/default/files/2026-05/An%20Overview%20of%20Steel%20Sector%20for%20the%20month%20of%20April%2C%202026.pdf',
    sourceType: 'official-industrial-statistics',
    reliability: 5,
    ratingReason:
      'Primary current record for crude-steel capacity, production, consumption, imports, exports, and capacity utilisation.',
    bestFor:
      'Separating installed steel capacity from actual annual production and utilisation.',
    limitations:
      'Steel is deregulated and most physical investment is private; capacity growth also carries coal, air-pollution, water, and carbon costs.',
    publishedDate: '2026-05-25',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'worldsteel-figures-2025',
    title: 'World Steel in Figures 2025',
    publisher: 'World Steel Association',
    url: 'https://worldsteel.org/data/world-steel-in-figures/world-steel-in-figures-2025/',
    sourceType: 'independent-industry-statistics',
    reliability: 4,
    ratingReason:
      'Established international industry compilation with cross-country production and capacity context.',
    bestFor:
      'Corroborating India’s global steel scale and separating national policy from private industrial production.',
    limitations:
      'Industry association data do not independently assess local pollution, labour, profitability, or public subsidy.',
    publishedDate: '2025-06-01',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'pib-coal-production-2026',
    title: 'India coal production in FY 2025-26',
    publisher: 'Press Information Bureau, Ministry of Coal',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2293366&lang=1&reg=48',
    sourceType: 'official-industrial-output-statistics',
    reliability: 5,
    ratingReason:
      'Primary final annual coal-production and supply totals with historical comparison.',
    bestFor:
      'Current coal output and the distinction between annual flow and installed productive capacity.',
    limitations:
      'More coal improves domestic supply but imposes climate, air-quality, land, water, labour-safety, and health costs.',
    publishedDate: '2026-07-31',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
  {
    id: 'sipri-arms-transfers-2025',
    title: 'Trends in International Arms Transfers, 2025',
    publisher: 'Stockholm International Peace Research Institute',
    url: 'https://www.sipri.org/sites/default/files/2026-03/fs_2603_at_2025.pdf',
    sourceType: 'independent-security-statistics',
    reliability: 4,
    ratingReason:
      'Established independent methodology for major conventional-arms transfers and import dependence.',
    bestFor:
      'Cautioning that Indian rupee defence-export totals and SIPRI major-arms volume measure different baskets.',
    limitations:
      'SIPRI trend-indicator values exclude many components, services, and smaller defence items included in Indian financial export totals.',
    publishedDate: '2026-03-09',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-08-04',
  },
]

export const infrastructureCapacityTopics: LeaderSpecialistTopicSeed[] = [
  {
    id: 'infrastructure-capacity',
    name: 'Infrastructure and productive capacity',
    description:
      'A modern, cross-PM assessment of physical buildout, household and economic systems, human-capacity infrastructure, industrial capability, and delivery quality.',
    operationalLabel: 'Buildout scale',
    adjustedLabel: 'Quality-adjusted capacity',
    methodology:
      'Buildout scale uses transport and logistics (30%), energy and utilities (25%), health and human-capacity infrastructure (15%), industrial and strategic capacity (20%), and delivery quality, utilisation, and sustainability (10%). Quality-adjusted capacity uses 20%, 20%, 20%, 15%, and 25% respectively. The comparison is currently limited to the three long modern infrastructure cycles beginning in 1998, where all five dimensions have reviewable evidence.',
  },
]

export const infrastructureCapacityDimensions: LeaderSpecialistDimensionSeed[] =
  [
    {
      id: 'infrastructure-transport',
      topicId: 'infrastructure-capacity',
      name: 'Transport and logistics',
      operationalWeight: 0.3,
      adjustedWeight: 0.2,
      description:
        'Highways, rural roads, rail capacity and electrification, freight corridors, metros, aviation, ports, waterways, and multimodal logistics.',
    },
    {
      id: 'infrastructure-energy-utilities',
      topicId: 'infrastructure-capacity',
      name: 'Energy and household utilities',
      operationalWeight: 0.25,
      adjustedWeight: 0.2,
      description:
        'Power generation and transmission, renewables, electricity access, water, sanitation, gas networks, and utility reach.',
    },
    {
      id: 'infrastructure-human-capacity',
      topicId: 'infrastructure-capacity',
      name: 'Health and human-capacity infrastructure',
      operationalWeight: 0.15,
      adjustedWeight: 0.2,
      description:
        'Medical institutions and seats, hospitals, education and skills infrastructure, staffing, affordability, and geographic access.',
    },
    {
      id: 'infrastructure-industrial',
      topicId: 'infrastructure-capacity',
      name: 'Industrial and strategic capacity',
      operationalWeight: 0.2,
      adjustedWeight: 0.15,
      description:
        'Manufacturing, steel, energy security, digital systems, startups, defence industry, electronics, semiconductors, and supplier ecosystems.',
    },
    {
      id: 'infrastructure-quality',
      topicId: 'infrastructure-capacity',
      name: 'Delivery quality, utilisation and sustainability',
      operationalWeight: 0.1,
      adjustedWeight: 0.25,
      description:
        'Project preparation, cost and schedule control, maintenance, safety, staffing, usage, service reliability, fiscal exposure, inclusion, and environmental durability.',
    },
  ]

const dimensionIds = [
  'infrastructure-transport',
  'infrastructure-energy-utilities',
  'infrastructure-human-capacity',
  'infrastructure-industrial',
  'infrastructure-quality',
] as const

function assessment({
  id,
  termId,
  summary,
  sources,
  scores,
  rationales,
}: {
  id: string
  termId: string
  summary: string
  sources: string[]
  scores: [number, number, number, number, number]
  rationales: [string, string, string, string, string]
}): LeaderSpecialistAssessmentSeed {
  return {
    id,
    termId,
    topicId: 'infrastructure-capacity',
    confidence: 'medium',
    status: 'reviewed',
    summary,
    assessmentAsOf: reviewedAt,
    sourceIds: sources,
    scores: dimensionIds.map((dimensionId, index) => ({
      dimensionId,
      score: scores[index],
      rationale: rationales[index],
    })),
  }
}

export const infrastructureCapacityAssessments: LeaderSpecialistAssessmentSeed[] =
  [
    assessment({
      id: 'vajpayee-infrastructure-1998',
      termId: 'vajpayee-1998',
      summary:
        'Vajpayee created several durable infrastructure platforms: NHDP and the Golden Quadrilateral, PMGSY, telecom competition, electricity reform, and PMSSY. The score gives founder and early-delivery credit while reserving later completion for successor governments.',
      sources: [
        'pmgsy-official',
        'world-bank-pmgsy-impact-2021',
        'cag-pmgsy-audit-2016',
        'trai-history',
        'world-bank-telecom-reform-2008',
        'pib-aiims-status-2026',
      ],
      scores: [7.9, 7.1, 6.5, 7.4, 6.9],
      rationales: [
        'NHDP, the Golden Quadrilateral and PMGSY established enduring national and rural-road architectures. Much physical completion occurred after 2004, so origin and early execution receive more credit than final stock.',
        'The Electricity Act 2003 and power-distribution reform were durable enabling changes, while access, distribution quality and implementation remained limited by the end of the term.',
        'SSA and PMSSY created important platforms, but medical, hospital and higher-education physical capacity remained thinner than in later terms.',
        'Telecom competition, disinvestment, strategic policy and early digital and industrial reform expanded productive capacity, with uneven manufacturing scale.',
        'Core programmes survived and generated later returns, while incomplete corridors, weak utility access, rural-road maintenance and limited service quality cap the score.',
      ],
    }),
    assessment({
      id: 'manmohan-infrastructure-2004',
      termId: 'manmohan-2004',
      summary:
        'The UPA completed and expanded inherited highway and rural-road programmes, modernised airports, expanded metros and power, launched the DFC and industrial-corridor pipeline, and built especially strong health and education capacity. Delays and second-term project governance reduce the quality-adjusted result.',
      sources: [
        'world-bank-dfc-financing-2014',
        'world-bank-pmgsy-impact-2021',
        'cag-pmgsy-audit-2016',
        'economic-survey-infrastructure-2025-26',
        'pib-aiims-status-2026',
        'cea-installed-capacity-june-2026',
      ],
      scores: [7.7, 7.5, 8.1, 7.2, 6.3],
      rationales: [
        'The term completed much of the inherited Golden Quadrilateral, scaled PMGSY, modernised major airports through PPPs, expanded metros, and created and financed the DFC and industrial-corridor pipeline.',
        'Installed power capacity more than doubled, rural electrification and the national grid expanded, and the National Solar Mission created a durable clean-energy platform; distribution weakness and the 2012 blackout are major deductions.',
        'NRHM and ASHA, SSA and RTE expansion, PMSSY and new AIIMS, and central higher-education expansion make human-capacity infrastructure the clearest comparative strength.',
        'Telecom, power, steel and wider industrial capacity expanded, while manufacturing transformation and semiconductor projects remained incomplete.',
        'DFC and road delays, second-term PPP stress, stalled clearances, DISCOM weakness, coal-allocation failures and uneven service and learning quality reduce delivery value.',
      ],
    }),
    assessment({
      id: 'modi-infrastructure-2014',
      termId: 'modi-2014',
      summary:
        'Among the three long modern terms with comparable evidence, Modi has the strongest physical buildout: transport networks, rail electrification, freight corridors, energy and household utilities, medical-training capacity, and strategic industry all expanded markedly. Quality, safety, utilization, shared credit and environmental costs narrow the lead.',
      sources: [
        'economic-survey-infrastructure-2025-26',
        'pib-dfc-completion-2026',
        'pib-transport-capacity-2026',
        'pib-metro-capacity-2026',
        'pib-rail-electrification-2026',
        'pib-airports-capacity-2026',
        'prs-roads-analysis-2026',
        'cea-installed-capacity-june-2026',
        'pib-jjm-july-2026',
        'india-water-portal-jjm-functionality-2026',
        'cea-transmission-june-2026',
        'pib-aiims-status-2026',
        'nmc-seat-matrix-2026',
        'steel-capacity-april-2026',
        'pib-coal-production-2026',
        'pib-defence-exports-2026',
        'pib-semiconductor-status-2026',
      ],
      scores: [8.7, 8.5, 7.6, 7.9, 6.8],
      rationales: [
        'Highway widening and high-speed corridors, completed DFCs, near-universal broad-gauge electrification, metro expansion, airports, ports and waterways create the strongest transport buildout of the three terms. DFC, metros and some airport projects retain predecessor, state and private credit.',
        'Solar, total power, transmission, household electricity, rural tap connections, PNG and gas-pipeline networks expanded substantially. Capacity and connections are not generation, reliability, affordability, safe water or active use.',
        'Medical colleges, MBBS seats and AIIMS capacity expanded materially, alongside sanitation and digital-health systems. Staffing, teaching quality, private fees, rural distribution and measured health outcomes prevent a higher score.',
        'Steel, digital public infrastructure, Startup India, defence production and exports, electronics, PLI programmes and operating semiconductor assembly and test plants broadened productive capacity. Much investment is private or state-delivered, and several headline capacities remain planned.',
        'Bharatmala appraisal and cost problems, NHAI debt, road and rail safety, maintenance, water functionality, hospital vacancies, DISCOM weakness, coal dependence, pollution and unfinished fab outcomes materially reduce the quality-adjusted result.',
      ],
    }),
  ]

export const infrastructureCapacityClaims: ClaimSeed[] = [
  {
    id: 'modi-infrastructure-infographic-verdict',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'The infrastructure infographic is directionally strong but methodologically mixed',
    body:
      'Many post-2014 additions are real, but the graphic mixes physical stock, annual output, programme registrations, household connections, operational designations and approvals. Its “share built after 2014” is usually current value minus baseline divided by current value; that is not an official performance metric or a causal PM estimate.',
    stance: 'mixed',
    category: 'fact-check',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'economic-survey-infrastructure-2025-26',
      'pib-transport-capacity-2026',
      'cea-installed-capacity-june-2026',
      'pib-startups-june-2026',
      'pib-defence-exports-2026',
    ],
  },
  {
    id: 'modi-transport-buildout-scale',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Transport buildout is a clear Modi-era strength',
    body:
      'By August 2026 the DFC network was fully operational, broad-gauge rail electrification exceeded 99%, operational metro length reached about 1,155 km, 4-lane-and-above National Highways reached about 48,568 km, and operational aviation facilities rose from 74 in 2014 to 166.',
    stance: 'achievement',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'pib-dfc-completion-2026',
      'pib-rail-electrification-2026',
      'pib-metro-capacity-2026',
      'pib-transport-capacity-2026',
      'pib-airports-capacity-2026',
    ],
  },
  {
    id: 'modi-energy-utilities-buildout',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Energy and household utility capacity expanded at exceptional scale',
    body:
      'Solar capacity rose from 2.647 GW in June 2014 to 162.152 GW in June 2026, total power capacity from 249.488 GW to 548.858 GW, and 220 kV-and-above transmission lines from 291,336 to 509,603 circuit-km. Rural tap connections rose from 3.24 crore in August 2019 to 15.89 crore by July 2026.',
    stance: 'achievement',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'cea-installed-capacity-june-2026',
      'cea-transmission-june-2026',
      'pib-jjm-july-2026',
    ],
  },
  {
    id: 'modi-human-capacity-buildout',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Medical-training and tertiary-care capacity expanded substantially',
    body:
      'Medical colleges rose from 387 in 2014 to more than 840 by May 2026, and sanctioned MBBS intake rose from 51,348 to about 1.39 lakh. Fifteen of the current twenty-three AIIMS institutions were approved after 2014, while functional status and staffing remain uneven.',
    stance: 'achievement',
    category: 'health-infrastructure',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'pib-aiims-status-2026',
      'nmc-seat-matrix-2026',
      'sansad-aiims-vacancies-2026',
    ],
  },
  {
    id: 'modi-industrial-capacity-buildout',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Industrial and strategic productive capacity broadened',
    body:
      'Crude-steel capacity roughly doubled to about 220 MTPA, coal output exceeded one billion tonnes, defence exports rose from Rs 686 crore in FY 2013-14 to Rs 38,424 crore in FY 2025-26, and commercial semiconductor assembly and test production began. These measures mix private capacity and annual flows and therefore require separate interpretation.',
    stance: 'achievement',
    category: 'industrial-capacity',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'steel-capacity-april-2026',
      'pib-coal-production-2026',
      'pib-defence-exports-2026',
      'pib-semiconductor-status-2026',
    ],
  },
  {
    id: 'infrastructure-infographic-specific-corrections',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Several infographic bars need correction before use',
    body:
      'Like-for-like port capacity implies about 49%, not 71%, of current capacity was added after 2014. The renewable bar mixes definitions; tap water uses an August 2019 baseline; recognised startups use a category created in 2016; defence exports, coal production and waterways cargo are annual flows; and airport totals include revived facilities, heliports and water aerodromes.',
    stance: 'context',
    category: 'fact-check',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'economic-survey-infrastructure-2025-26',
      'pib-airports-capacity-2026',
      'pib-jjm-july-2026',
      'pib-startups-june-2026',
      'pib-defence-exports-2026',
      'pib-coal-production-2026',
    ],
  },
  {
    id: 'infrastructure-shared-inherited-credit',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Commissioning credit is not the same as exclusive origin credit',
    body:
      'Modi deserves substantial acceleration, financing, execution and commissioning credit. DFCs, several metros, PMGSY, power reforms, gas pipelines and other projects also contain Vajpayee or UPA design, finance, land, contracting and construction, while states, public enterprises and private firms delivered much of the stock.',
    stance: 'context',
    category: 'attribution',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'world-bank-dfc-financing-2014',
      'world-bank-pmgsy-impact-2021',
      'pib-metro-capacity-2026',
      'pngrb-gas-pipelines-april-2026',
      'cea-transmission-june-2026',
    ],
  },
  {
    id: 'infrastructure-quality-gap',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Capacity must be tested against use, safety, staffing, cost and sustainability',
    body:
      'Connections and installed capacity do not prove regular safe water, active gas use, dependable electricity, hospital staffing, road safety, port utilization, maintenance, affordable access, fiscal value or environmental durability. These gaps reduce Modi’s quality-adjusted infrastructure score from 8.1 to 7.8.',
    stance: 'concern',
    category: 'infrastructure',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'prs-roads-analysis-2026',
      'india-water-portal-jjm-functionality-2026',
      'pngrb-city-gas-may-2026',
      'iea-electricity-midyear-2026',
      'sansad-aiims-vacancies-2026',
      'sipri-arms-transfers-2025',
    ],
  },
  {
    id: 'broad-development-versus-infrastructure',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Broad development and physical buildout answer different questions',
    body:
      'The site’s broad-development profile also includes poverty, inclusion, jobs, crisis performance and some institutional and execution evidence. The infrastructure specialist isolates physical and productive capacity, where Modi scores 8.1 for buildout and ranks above Manmohan Singh at 7.5 and Vajpayee at 7.3.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'economic-survey-infrastructure-2025-26',
      'world-bank-dfc-financing-2014',
      'world-bank-pmgsy-impact-2021',
      'cea-installed-capacity-june-2026',
    ],
  },
  {
    id: 'infrastructure-rating-no-double-count',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'The new specialist score makes credit visible without double-counting it',
    body:
      'Roads, electricity, sanitation, digital systems and productive capacity were already inputs to Modi’s 7.7 outcomes and 7.6 reforms components. Publishing an 8.1 infrastructure-buildout score clarifies the strength; adding it mechanically to the 6.7 balanced rating would count the same evidence twice.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'economic-survey-infrastructure-2025-26',
      'pib-transport-capacity-2026',
      'cea-installed-capacity-june-2026',
      'pib-aiims-status-2026',
      'steel-capacity-april-2026',
    ],
  },
]

export const infrastructureCapacityAnswers: CuratedAnswerSeed[] = [
  {
    id: 'modi-infrastructure-development',
    jurisdictionId: 'india',
    question: 'Is Modi better at development and infrastructure?',
    aliases: [
      'modi better in developing',
      'modi infrastructure rating',
      'how much infrastructure built after 2014',
      'india infrastructure after 2014',
      'modi development score',
      'modi roads rail airports power',
      'indian matrix infrastructure chart',
      'is modi the best infrastructure prime minister',
    ],
    shortAnswer:
      'On the narrow question of modern physical infrastructure and productive-capacity buildout, yes: Modi ranks first among the three long recent terms with comparable evidence. The site now scores him 8.1/10 for buildout, versus Manmohan Singh at 7.5 and Vajpayee at 7.3.',
    verdict:
      'Strong infrastructure verdict, not a blanket development verdict. Modi’s transport score is 8.7, energy and utilities 8.5, health and human-capacity infrastructure 7.6, industrial and strategic capacity 7.9, and delivery quality 6.8. That produces 8.1 for buildout and 7.8 after heavier weight on utilization, maintenance, safety, staffing, cost and sustainability. The viral graphic is directionally persuasive but mixes stock, flow, registrations, connections and approvals; it also overstates ports and uses a 2019 tap-water baseline. Broad development remains a different question because jobs, incomes, poverty distribution, learning and health outcomes, crises, institutions and liberties also matter.',
    confidence: 'high',
    asOfDate: reviewedAt,
    claimSections: [
      {
        claimId: 'modi-transport-buildout-scale',
        section: 'achievement',
        sortOrder: 1,
      },
      {
        claimId: 'modi-energy-utilities-buildout',
        section: 'achievement',
        sortOrder: 2,
      },
      {
        claimId: 'modi-human-capacity-buildout',
        section: 'achievement',
        sortOrder: 3,
      },
      {
        claimId: 'modi-industrial-capacity-buildout',
        section: 'achievement',
        sortOrder: 4,
      },
      {
        claimId: 'infrastructure-quality-gap',
        section: 'concern',
        sortOrder: 1,
      },
      {
        claimId: 'modi-infrastructure-infographic-verdict',
        section: 'context',
        sortOrder: 1,
      },
      {
        claimId: 'infrastructure-infographic-specific-corrections',
        section: 'context',
        sortOrder: 2,
      },
      {
        claimId: 'infrastructure-shared-inherited-credit',
        section: 'context',
        sortOrder: 3,
      },
      {
        claimId: 'broad-development-versus-infrastructure',
        section: 'context',
        sortOrder: 4,
      },
      {
        claimId: 'infrastructure-rating-no-double-count',
        section: 'context',
        sortOrder: 5,
      },
    ],
  },
]
