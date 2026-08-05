import type {
  ClaimSeed,
  Confidence,
  CuratedAnswerSeed,
  EventAssessmentSeed,
  EventSeed,
  PolicyScoreSeed,
  PolicySeed,
  SourceSeed,
} from '../types.ts'

const reviewedAt = '2026-07-29'
const weights = [0.2, 0.3, 0.2, 0.15, 0.15] as const

export const semiconductorSources: SourceSeed[] = [
  {
    id: 'fairchild-india-history-1990',
    title: "India's High-Tech Microelectronics Revolution",
    publisher: 'Telematics and Informatics',
    author: 'Arvind Singhal and Everett M. Rogers',
    url: 'https://utminers.utep.edu/asinghal/Articles%20and%20Chapters/SinghalRogers_Hightech.pdf',
    sourceType: 'academic-industry-history',
    reliability: 4,
    ratingReason:
      'Peer-reviewed historical account of India semiconductor development, early private and public production, and the regulatory environment faced by Fairchild.',
    bestFor:
      'The mid-1960s Fairchild consideration of India, early CDIL and BEL capability, and the broader policy environment.',
    limitations:
      'Retrospective and imprecise on the exact Fairchild visit, decision date, executives involved, and later destination chronology.',
    publishedDate: '1990-06-01',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'computer-history-fairchild-hong-kong',
    title: 'Fairchild Semiconductor: The 60th Anniversary of a Silicon Valley Legend',
    publisher: 'Computer History Museum',
    url: 'https://computerhistory.org/blog/fairchild-semiconductor-the-60th-anniversary-of-a-silicon-valley-legend/',
    sourceType: 'institutional-technology-history',
    reliability: 4,
    ratingReason:
      'Named institutional history tied to the Computer History Museum collection and Fairchild records.',
    bestFor:
      'Fairchild technology chronology and the construction and rapid expansion of its Hong Kong facility in 1964.',
    limitations:
      'It does not say Robert Noyce personally offered India a complete fab blueprint or visited fifty government offices.',
    publishedDate: '2017-09-19',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'scl-capacity-case-study-2019',
    title: 'Building Capacity in Electronics Sector and Science Diplomacy: A Case Study of Semiconductor Complex Ltd',
    publisher: 'Forum for Indian Science Diplomacy and RIS',
    author: 'Ashok Parthasarathi',
    url: 'https://fisd.in/sites/default/files/Publication/FISD%20Case%20Study_Ashok%20Parthasarthy-min.pdf',
    sourceType: 'expert-first-person-history',
    reliability: 4,
    ratingReason:
      'Detailed account by a former science and technology adviser and electronics policymaker, peer reviewed with assistance from a former SCL chairman.',
    bestFor:
      'SCL design, technology transfer, production capability, institutional purpose, the 1989 fire, and later policy marginalisation.',
    limitations:
      'Retrospective insider account that should be separated from independent evaluation and exact fire-cause findings.',
    publishedDate: '2019-08-01',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'india-today-scl-fire-2025',
    title: 'How the 1989 SCL fire in Mohali derailed India chip production',
    publisher: 'India Today',
    url: 'https://www.indiatoday.in/business/story/india-semiconductor-complex-fire-1989-impact-and-indigenous-chip-production-plan-2773326-2025-08-19',
    sourceType: 'independent-retrospective-reporting',
    reliability: 3,
    ratingReason:
      'Named retrospective reporting that reconstructs the fire, production interruption, and technology gap using former officials and public records.',
    bestFor:
      'Independent chronology of the February 1989 fire and the prolonged production loss.',
    limitations:
      'Secondary reporting; the fire cause and counterfactual claim that India would have become a global leader remain unresolved.',
    publishedDate: '2025-08-19',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'meity-scl-modernisation-rfp-2025',
    title: 'Request for Proposal for Augmentation and Enhancement of Existing 8-inch Fab of SCL',
    publisher: 'Ministry of Electronics and Information Technology',
    url: 'https://www.meity.gov.in/static/uploads/2025/02/d60485e4181a949761bd4d4b6ab2799e.pdf',
    sourceType: 'official-procurement-record',
    reliability: 5,
    ratingReason:
      'Controlling current procurement record for modernising the government-owned SCL fabrication facility.',
    bestFor:
      'The present scale and continuing strategic role of SCL and the difference between a government research fab and a commercial high-volume fab.',
    limitations:
      'A tender records intended modernisation, not completed capacity, yields, customers, or commercial competitiveness.',
    publishedDate: '2025-02-19',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'register-intel-700m-2005',
    title: 'Intel cans $700m Indian plant - report',
    publisher: 'The Register',
    url: 'https://www.theregister.com/off-prem/2005/09/13/intel-cans-700m-indian-plant-report/1464404',
    sourceType: 'contemporaneous-technology-reporting',
    reliability: 3,
    ratingReason:
      'Contemporaneous reporting that identifies the proposed amount, wafer-testing purpose, requested concessions, and decision to pause.',
    bestFor:
      'Separating the 2005 proposed $700 million testing facility from the later multibillion-dollar wafer-fab discussion.',
    limitations:
      'Relies on another contemporaneous newspaper report and does not provide Intel or government negotiation documents.',
    publishedDate: '2005-09-13',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'livemint-intel-policy-delay-2007',
    title: 'India slow policy puts off Intel; China, Vietnam emerge gainers',
    publisher: 'Mint',
    url: 'https://www.livemint.com/Industry/Qj3qmsZ0URbESb8xU4zjqO/India8217s-slow-policy-puts-off-Intel-China-Vietnam-eme.html',
    sourceType: 'independent-business-reporting',
    reliability: 4,
    ratingReason:
      'Contemporaneous named reporting quoting Intel chairman Craig Barrett and documenting the eventual policy support.',
    bestFor:
      'The separate 2007 claim that delayed semiconductor policy cost India a multibillion-dollar manufacturing window.',
    limitations:
      'Intel selected facilities for its global commercial reasons as well as policy timing; one missed investment cannot establish a complete national counterfactual.',
    publishedDate: '2007-09-04',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'pib-semiconductor-fabs-2014',
    title: 'Approval to establish two Semiconductor Wafer Fabrication Manufacturing Facilities in India',
    publisher: 'Press Information Bureau, Government of India',
    url: 'https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=103682',
    sourceType: 'official-cabinet-decision',
    reliability: 5,
    ratingReason:
      'Primary Cabinet record for two approved commercial fab proposals, project costs, partners, planned capacity, and public support.',
    bestFor:
      'The February 2014 UPA fab approvals and the policy support offered before the change of government.',
    limitations:
      'Approval and projected jobs did not become completed fabs or commercial production.',
    publishedDate: '2014-02-14',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'carnegie-pre-ism-attempts-2025',
    title: 'China Decoupling Beyond the United States: Comparing Germany, Japan, and India',
    publisher: 'Carnegie Endowment for International Peace',
    url: 'https://carnegieendowment.org/research/2025/01/china-decoupling-beyond-the-united-states-comparing-germany-japan-and-india',
    sourceType: 'independent-policy-analysis',
    reliability: 4,
    ratingReason:
      'Named comparative analysis of Indian semiconductor incentive attempts, business-environment constraints, and strategic dependence.',
    bestFor:
      'Independent assessment that the 2007 and 2013-14 incentive attempts were largely unsuccessful.',
    limitations:
      'High-level comparative synthesis rather than a project-level financial or engineering audit.',
    publishedDate: '2025-01-08',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'pib-semicon-india-2021',
    title: 'Cabinet approves Programme for Development of Semiconductors and Display Manufacturing Ecosystem in India',
    publisher: 'Press Information Bureau, Government of India',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1781723',
    sourceType: 'official-cabinet-decision',
    reliability: 5,
    ratingReason:
      'Primary Cabinet record establishing the Rs 76,000 crore Semicon India Programme, the India Semiconductor Mission, and the original incentive architecture.',
    bestFor:
      'Programme design, eligible value-chain stages, fiscal-support ceilings, SCL modernisation, and intended institutional capacity.',
    limitations:
      'Government objectives, projected jobs, and digital-sovereignty claims are not outcome evidence.',
    publishedDate: '2021-12-15',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'pib-semiconductor-status-2026',
    title: 'Semicon India Programme 2.0: twelve approved projects and three producing plants',
    publisher: 'Press Information Bureau, Ministry of Electronics and IT',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2284806',
    sourceType: 'official-programme-status',
    reliability: 5,
    ratingReason:
      'Primary July 2026 government status record distinguishing approved projects, operating plants, and the next programme phase.',
    bestFor:
      'The official count of twelve projects across six states and three plants rolling out chips.',
    limitations:
      'Promotional status language does not disclose plant-level yields, utilisation, domestic value added, subsidy paid, wages, or audited job totals.',
    publishedDate: '2026-07-15',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'pib-semiconductor-units-2026',
    title: 'Semicon India Programme advances from design to manufacturing',
    publisher: 'Press Information Bureau, Ministry of Electronics and IT',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2247814&lang=1&reg=3',
    sourceType: 'official-programme-status',
    reliability: 5,
    ratingReason:
      'Primary programme inventory for approved manufacturing and design projects and their reported production status.',
    bestFor:
      'Plant-by-plant programme chronology and the distinction between commercial production and projects still under implementation.',
    limitations:
      'Administrative status does not independently verify sustained output, customer qualification, exports, or competitiveness.',
    publishedDate: '2026-04-01',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'micron-sanand-commercial-2026',
    title: 'Micron opens India semiconductor assembly and test facility',
    publisher: 'Micron Technology',
    url: 'https://investors.micron.com/news-releases/news-release-details/micron-celebrates-opening-indias-first-semiconductor-assembly',
    sourceType: 'corporate-primary-record',
    reliability: 4,
    ratingReason:
      'Direct corporate record of commercial production, certification, first shipment, customers, and expected ramp.',
    bestFor:
      'The February 28, 2026 start of commercial memory-chip assembly and testing at Sanand.',
    limitations:
      'Corporate achievement framing; the facility packages and tests fabricated wafers and is not a front-end wafer fab.',
    publishedDate: '2026-02-28',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'pib-cg-semi-commercial-2026',
    title: 'CG Semi OSAT facility begins commercial production in Sanand',
    publisher: 'Press Information Bureau, Ministry of Electronics and IT',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2281174&lang=1&reg=3',
    sourceType: 'official-production-record',
    reliability: 5,
    ratingReason:
      'Primary government record that the CG Semi assembly, packaging, and test facility began commercial production.',
    bestFor:
      'The July 4, 2026 operating milestone and its place within the national semiconductor programme.',
    limitations:
      'Announced peak capacity and projected jobs are not verified current output, utilisation, or employment.',
    publishedDate: '2026-07-04',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'tata-assam-construction-2026',
    title: 'Tata Electronics semiconductor assembly and test facilities',
    publisher: 'Tata Electronics',
    url: 'https://www.tataelectronics.com/semiconductor-assembly-and-test',
    sourceType: 'corporate-project-status',
    reliability: 4,
    ratingReason:
      'Direct company description of operating and upcoming facilities and the construction status of Jagiroad.',
    bestFor:
      'Confirming that the high-volume Assam plant remains an upcoming facility rather than current production.',
    limitations:
      'Corporate status page does not independently verify construction progress or future capacity and jobs.',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'tata-asml-dholera-2026',
    title: 'Tata Electronics and ASML announce strategic partnership',
    publisher: 'Tata Group',
    url: 'https://www.tata.com/newsroom/business/tata-electronics-asml-semiconductor-ecosystem',
    sourceType: 'corporate-primary-record',
    reliability: 4,
    ratingReason:
      'Direct record of the ASML agreement, planned lithography support, talent development, technology nodes, and Dholera construction status.',
    bestFor:
      'The May 2026 ASML relationship and the fact that the first commercial 300 mm fab is still upcoming.',
    limitations:
      'An MoU and planned capacity do not establish completed tool installation, qualified yields, customers, or commercial wafers.',
    publishedDate: '2026-05-17',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'carnegie-ism-review-2025',
    title: 'India Semiconductor Mission: The Story So Far',
    publisher: 'Carnegie Endowment for International Peace',
    url: 'https://carnegieendowment.org/research/2025/10/indias-semiconductor-mission-the-story-so-far',
    sourceType: 'independent-policy-analysis',
    reliability: 4,
    ratingReason:
      'Named independent review of programme design, approved projects, subsidy uncertainty, state clusters, and prior false starts.',
    bestFor:
      'Assessing early programme credibility without treating approvals as completed production.',
    limitations:
      'Published before the February-July 2026 commercial-production milestones and therefore requires current primary records.',
    publishedDate: '2025-08-25',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'pib-semicon-2-2026',
    title: 'Cabinet approves Semicon 2.0',
    publisher: 'Press Information Bureau, Government of India',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2284784&lang=1&reg=48',
    sourceType: 'official-cabinet-decision',
    reliability: 5,
    ratingReason:
      'Primary July 15, 2026 Cabinet approval of Semicon 2.0 and its Rs 1,27,500 crore budget envelope.',
    bestFor:
      'The second programme phase, total outlay, policy continuity, and expanded value-chain focus.',
    limitations:
      'A newly approved six-year programme has no attributable manufacturing, employment, or fiscal-efficiency outcomes yet.',
    publishedDate: '2026-07-15',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'indian-express-semicon-2-2026',
    title: 'Cabinet approves Semiconductor Mission 2.0',
    publisher: 'Indian Express',
    url: 'https://indianexpress.com/article/business/cabinet-semiconductor-mission-2-0-10787705/',
    sourceType: 'independent-policy-reporting',
    reliability: 4,
    ratingReason:
      'Independent reporting on the approved outlay, six-year duration, supply-chain emphasis, and fiscal design.',
    bestFor:
      'Corroborating the Cabinet approval and explaining the shift toward gases, chemicals, materials, equipment, research, and talent.',
    limitations:
      'Contemporaneous design reporting; no implementation or outcome window exists.',
    publishedDate: '2026-07-15',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'et-taloja-proposal-2024',
    title: 'Tower Semiconductor-Adani proposal for a Taloja fab',
    publisher: 'Economic Times Manufacturing',
    url: 'https://manufacturing.economictimes.indiatimes.com/news/hi-tech/tower-semiconductor-adani-jv-to-launch-semiconductor-chip-manufacturing-unit-in-maharashtra/113119819',
    sourceType: 'independent-business-reporting',
    reliability: 3,
    ratingReason:
      'Named reporting of state approval, proposed investment, planned capacity, and the then-pending Union incentive decision.',
    bestFor:
      'Showing that 40,000 to 80,000 wafers per month was proposed future capacity, not production.',
    limitations:
      'A state-approved proposal is not a completed or centrally approved fab.',
    publishedDate: '2024-09-06',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
  {
    id: 'reuters-adani-tower-paused-2025',
    title: 'Adani pauses talks with Tower Semiconductor on India chip project',
    publisher: 'Reuters via Yahoo Tech',
    url: 'https://tech.yahoo.com/business/articles/exclusive-adani-pauses-talks-israels-101406802.html',
    sourceType: 'independent-business-reporting',
    reliability: 4,
    ratingReason:
      'Reuters reporting with named project context and direct reporting on the paused commercial discussions.',
    bestFor:
      'The later status of the proposed Taloja project and why planned capacity must not be shown as current output.',
    limitations:
      'Project negotiations can restart; this record does not establish permanent cancellation.',
    publishedDate: '2025-04-30',
    accessedDate: reviewedAt,
    linkStatus: 'checked-2026-07-29',
  },
]

const policyComponentValues: Record<string, Array<number | null>> = {
  'scl-semiconductor-programme-1976': [7.5, 5.8, 5.2, 5.8, 6.3],
  'semiconductor-incentive-policy-2007': [7.2, 3.8, 4.5, 5.2, 5.8],
  'semicon-india-programme-2021': [8.5, 7.0, 7.8, 6.5, 7.5],
  'semicon-india-2-2026': [8.3, null, 7.0, 6.2, 6.8],
}

const policyRationales: Record<string, string[]> = {
  'scl-semiconductor-programme-1976': [
    'Targeted a genuine strategic dependence and the absence of domestic large-scale integrated-circuit capability.',
    'SCL created real design and fabrication capacity and later served space and research missions, but did not become a competitive high-volume commercial foundry.',
    'Technology transfer and skilled teams were substantial achievements; the 1989 fire, slow rebuild, and later policy marginalisation exposed weak continuity and resilience.',
    'Public strategic capability and technical training had broad national value, while the state-owned model offered limited market access and supplier spillovers.',
    'The institution survived and remains strategically useful, but repeated modernisation needs and mature process nodes limit commercial durability.',
  ],
  'semiconductor-incentive-policy-2007': [
    'Recognised that commercial fabs needed a coherent incentive, infrastructure, and investment framework rather than ordinary industrial policy.',
    'No approved commercial wafer fab reached production, so the central outcome was not achieved.',
    'The policy arrived after Intel said its investment window had closed, and later approvals could not secure commercially viable consortia.',
    'The intended skilled jobs and strategic supply benefits were broad, but realised inclusion was minimal because the fabs did not materialise.',
    'The policy established useful incentive concepts and 2014 approvals, but was superseded without producing a durable commercial facility.',
  ],
  'semicon-india-programme-2021': [
    'Directly targets strategic import dependence, fragmented support, missing manufacturing depth, and the need to cover design, fabrication, packaging, materials, and talent.',
    'By July 2026, three plants had entered commercial production and twelve projects were approved, while the first large front-end fab and major Assam plant remained unfinished.',
    'A dedicated mission, competitive project review, large fiscal support, global technology partners, and operating assembly-test plants show materially stronger execution than prior attempts.',
    'Projects span six states and can create skilled jobs and regional capability, but audited employment, wages, local value added, water burdens, and supplier access remain thin.',
    'The mission has survived into a second phase and created plant, supplier, and talent commitments; durability still depends on yields, customers, utilities, continued upgrading, and fiscal discipline.',
  ],
  'semicon-india-2-2026': [
    'Broadens the mission toward the missing equipment, materials, gases, chemicals, research, advanced packaging, and skills needed for an end-to-end ecosystem.',
    'No effectiveness score is assigned because the six-year programme was approved only on July 15, 2026.',
    'Policy continuity and a clearer supply-chain focus are strengths, while allocation rules, project selection, monitoring, and coordination remain to be demonstrated.',
    'The programme can widen high-skill opportunity and regional supply chains, but subsidy incidence, water and power demands, land, and access for smaller firms need disclosure.',
    'Long-term support can reduce stop-start policy risk, while rapid technology change, global overcapacity, subsidy dependence, and weak domestic supplier depth create large side-effect risks.',
  ],
}

const policyRating = (policyId: string) => {
  const values = policyComponentValues[policyId]
  const availableWeight = values.reduce<number>(
    (sum, value, index) => (value === null ? sum : sum + weights[index]),
    0,
  )
  const weighted = values.reduce<number>(
    (sum, value, index) =>
      value === null ? sum : sum + value * weights[index],
    0,
  )
  return Math.round((weighted / availableWeight) * 10) / 10
}

export const semiconductorPolicies: PolicySeed[] = [
  {
    id: 'scl-semiconductor-programme-1976',
    jurisdictionId: 'india',
    leaderTermId: 'indira-1966',
    title: 'Semiconductor Complex Limited industrial-capability programme, 1976',
    shortTitle: 'SCL semiconductor programme',
    policyType: 'strategic-technology',
    introducedDate: '1976-01-01',
    effectiveDate: '1976-01-01',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'Created a state-backed semiconductor institution that acquired CMOS technology, began production in the 1980s, and retained strategic fabrication and research capability after a devastating 1989 fire.',
    intendedGoal:
      'Build indigenous microelectronics design, fabrication, technology-transfer, and skilled engineering capacity.',
    ratingScore: policyRating('scl-semiconductor-programme-1976'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A genuine strategic-capacity achievement that created durable technical capability, but weak commercial scale, the fire, slow recovery, and repeated modernisation needs prevented a globally competitive foundry.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'scl-capacity-case-study-2019',
      'india-today-scl-fire-2025',
      'meity-scl-modernisation-rfp-2025',
    ],
  },
  {
    id: 'semiconductor-incentive-policy-2007',
    jurisdictionId: 'india',
    leaderTermId: 'manmohan-2004',
    title: 'Semiconductor incentive policy and commercial-fab approvals, 2007-14',
    shortTitle: 'UPA semiconductor incentive attempts',
    policyType: 'strategic-technology',
    introducedDate: '2007-02-22',
    effectiveDate: '2007-02-22',
    status: 'infructuous',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'Introduced capital support for semiconductor manufacturing and later approved two commercial wafer-fab proposals, but neither facility reached construction and production.',
    intendedGoal:
      'Attract global and domestic consortia, create commercial wafer fabrication, reduce import dependence, and build skilled electronics manufacturing.',
    ratingScore: policyRating('semiconductor-incentive-policy-2007'),
    ratingConfidence: 'medium',
    ratingSummary:
      'The strategic diagnosis and eventual incentives were credible, but policy delay, weak commercial structuring, and failed project execution left India without an operational commercial fab.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'register-intel-700m-2005',
      'livemint-intel-policy-delay-2007',
      'pib-semiconductor-fabs-2014',
      'carnegie-pre-ism-attempts-2025',
    ],
  },
  {
    id: 'semicon-india-programme-2021',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Semicon India Programme and India Semiconductor Mission, 2021',
    shortTitle: 'India Semiconductor Mission 1.0',
    policyType: 'strategic-technology',
    introducedDate: '2021-12-15',
    effectiveDate: '2021-12-21',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    ratingBasis: 'retrospective',
    summary:
      'Created a dedicated national mission and large incentive architecture spanning chip design, silicon and compound fabs, assembly and test, displays, SCL modernisation, infrastructure, and technology partnerships.',
    intendedGoal:
      'Move India from semiconductor design and consumption toward a resilient domestic manufacturing and supplier ecosystem.',
    ratingScore: policyRating('semicon-india-programme-2021'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A strong and increasingly credible industrial strategy: commercial assembly and test production is real and the first large fab is under construction, while front-end output, yields, local value, jobs, and subsidy efficiency remain incomplete.',
    assessmentAsOf: reviewedAt,
    sourceIds: [
      'pib-semicon-india-2021',
      'pib-semiconductor-status-2026',
      'pib-semiconductor-units-2026',
      'micron-sanand-commercial-2026',
      'pib-cg-semi-commercial-2026',
      'tata-assam-construction-2026',
      'tata-asml-dholera-2026',
      'carnegie-ism-review-2025',
    ],
  },
  {
    id: 'semicon-india-2-2026',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Semicon India Programme 2.0, 2026',
    shortTitle: 'Semicon 2.0',
    policyType: 'strategic-technology',
    introducedDate: '2026-07-15',
    enactedDate: '2026-07-15',
    effectiveDate: '2026-07-15',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    ratingBasis: 'design',
    summary:
      'Approved a six-year Rs 1,27,500 crore second phase focused on fabs, advanced packaging, equipment, materials, chemicals, gases, research, talent, and deeper domestic supply chains.',
    intendedGoal:
      'Convert early plant approvals into a complete, competitive, and technologically resilient semiconductor ecosystem.',
    ratingScore: policyRating('semicon-india-2-2026'),
    ratingConfidence: 'low',
    ratingSummary:
      'Promising design and long-term policy continuity, with no effectiveness score until selection, spending, construction, supplier depth, commercial output, and fiscal results can be observed.',
    assessmentAsOf: reviewedAt,
    sourceIds: ['pib-semicon-2-2026', 'indian-express-semicon-2-2026'],
  },
]

export const semiconductorPolicyScores: PolicyScoreSeed[] = Object.entries(
  policyComponentValues,
).flatMap(([policyId, scores]) =>
  scores.map((score, index) => ({
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

export const semiconductorEvents: EventSeed[] = [
  {
    id: 'scl-fire-rebuild-1989',
    jurisdictionId: 'india',
    date: '1989-02-07',
    endDate: '1997-12-31',
    title: 'SCL fire destroys production and recovery takes most of a decade',
    summary:
      'A major fire destroyed Semiconductor Complex Limited production in Mohali in February 1989. Production resumed in 1997, after global technology had advanced rapidly.',
    significance:
      'The disaster and slow recovery erased scarce domestic capability and exposed the absence of redundancy, rapid reconstruction, technology-refresh planning, and a durable commercial semiconductor ecosystem.',
    category: 'technology',
    confidence: 'medium',
    sourceIds: [
      'scl-capacity-case-study-2019',
      'india-today-scl-fire-2025',
      'meity-scl-modernisation-rfp-2025',
    ],
    leaderTermIds: [
      'rajiv-1984',
      'vp-singh-1989',
      'chandra-shekhar-1990',
      'rao-1991',
      'deve-gowda-1996',
      'gujral-1997',
    ],
  },
  {
    id: 'intel-semiconductor-window-2007',
    jurisdictionId: 'india',
    date: '2007-09-04',
    title: 'Intel says delayed semiconductor policy cost India a manufacturing window',
    summary:
      'Intel chairman Craig Barrett said India had lacked a timely, documented semiconductor policy while the company was making Asian manufacturing decisions. A separate 2005 $700 million testing proposal had also been paused after requested concessions were not granted.',
    significance:
      'The episode is a concrete industrial-policy execution failure, but the testing proposal and the later multibillion-dollar wafer-fab discussion must not be merged into one plant claim.',
    category: 'technology',
    confidence: 'high',
    sourceIds: [
      'register-intel-700m-2005',
      'livemint-intel-policy-delay-2007',
      'carnegie-pre-ism-attempts-2025',
    ],
    leaderTermIds: ['manmohan-2004'],
  },
  {
    id: 'commercial-semiconductor-production-2026',
    jurisdictionId: 'india',
    date: '2026-02-28',
    endDate: '2026-07-04',
    title: 'Commercial semiconductor assembly and test production begins at scale',
    summary:
      'Micron opened commercial memory assembly and test production in Sanand in February, and CG Semi began commercial outsourced assembly and test production in July. Official programme records reported three plants producing chips by mid-July.',
    significance:
      'India moved from repeated proposals to operating commercial semiconductor plants, while the output remained primarily packaging and testing rather than front-end wafer fabrication.',
    category: 'technology',
    confidence: 'high',
    sourceIds: [
      'micron-sanand-commercial-2026',
      'pib-cg-semi-commercial-2026',
      'pib-semiconductor-status-2026',
      'pib-semiconductor-units-2026',
    ],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'semicon-2-approved-2026',
    jurisdictionId: 'india',
    date: '2026-07-15',
    title: 'Cabinet approves Semicon 2.0',
    summary:
      'The Union Cabinet approved a six-year Rs 1,27,500 crore second semiconductor programme phase covering fabs, advanced packaging, materials, equipment, chemicals, gases, research, and talent.',
    significance:
      'The approval creates unusually long policy continuity and addresses supplier-depth gaps, but all claimed investment, jobs, value addition, and technological outcomes remain prospective.',
    category: 'technology',
    confidence: 'high',
    sourceIds: ['pib-semicon-2-2026', 'indian-express-semicon-2-2026'],
    leaderTermIds: ['modi-2014'],
  },
]

const responsibility = (
  actorName: string,
  actorType: EventAssessmentSeed['responsibilities'][number]['actorType'],
  responsibilityKind: EventAssessmentSeed['responsibilities'][number]['responsibilityKind'],
  level: 1 | 2 | 3 | 4 | 5,
  assessment: string,
  confidence: Confidence = 'medium',
) => ({
  actorName,
  actorType,
  responsibilityKind,
  level,
  assessment,
  confidence,
})

export const semiconductorEventAssessments: EventAssessmentSeed[] = [
  {
    eventId: 'scl-fire-rebuild-1989',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The fire was a disaster with no established sabotage finding. Political and administrative judgment concerns resilience, investigation, reconstruction speed, technology refresh, and whether successive governments preserved a strategic industrial capability.',
    unionRole:
      'The Union owned SCL and held primary responsibility for investigation, financing, reconstruction, technology refresh, and national semiconductor strategy across successive governments.',
    stateLocalRole:
      'Punjab authorities supported land, emergency response, utilities, and local administration, while strategic technology and reconstruction decisions remained primarily Union responsibilities.',
    positiveOutcomes:
      'SCL engineers restored production and preserved fabrication capacity later used by space, defence, academic, and indigenous processor programmes.',
    lessons:
      'Strategic industries need redundancy, rapid incident recovery, retained engineering teams, continuous node upgrades, transparent investigation, and commercial demand beyond a single public facility.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      responsibility(
        'Immediate fire cause',
        'structural',
        'shared-context',
        1,
        'The available reviewed record does not establish sabotage, criminal responsibility, or a definitive technical cause.',
      ),
      responsibility(
        'SCL management and Union electronics authorities',
        'institution',
        'failure-to-respond',
        4,
        'Owned facility resilience, reconstruction, technology refresh, and preservation of scarce engineering capability.',
      ),
      responsibility(
        'Successive Union governments, 1989-97',
        'union-government',
        'shared-context',
        3,
        'Recovery and industrial-strategy responsibility crossed Congress, minority, and coalition governments rather than one party alone.',
      ),
      responsibility(
        'SCL engineers and technical teams',
        'institution',
        'positive-leadership',
        4,
        'Rebuilt production and retained strategic fabrication capability despite a long interruption.',
        'high',
      ),
    ],
  },
  {
    eventId: 'intel-semiconductor-window-2007',
    choiceAssessment: 'mostly-wrong',
    choiceScore: 3.5,
    choiceReason:
      'Government had legitimate reasons to evaluate long tax concessions and commercial viability, but the lack of a timely, documented policy during Intel investment decisions was a preventable execution failure.',
    unionRole:
      'The UPA government controlled national semiconductor incentives, tax treatment, customs policy, and negotiation speed.',
    stateLocalRole:
      'Potential host states could offer land, utilities, and local support, but the decisive incentive framework and policy timing were Union responsibilities.',
    positiveOutcomes:
      'The government eventually adopted capital support and approved two commercial fab proposals in 2014, creating experience later programmes could learn from.',
    lessons:
      'Capital-intensive strategic investment requires a published framework, empowered negotiation, decision deadlines, infrastructure readiness, commercial due diligence, and project accountability before the investment window closes.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      responsibility(
        'UPA government and Union electronics-policy authorities',
        'union-government',
        'failure-to-respond',
        4,
        'Failed to provide a timely policy and decision process while a major investor was selecting Asian manufacturing sites.',
        'high',
      ),
      responsibility(
        'Intel and proposed private consortia',
        'corporate',
        'shared-context',
        3,
        'Made global commercial choices based on demand, incentives, timing, technology, and investment economics.',
      ),
      responsibility(
        'Later Union fab-policy teams',
        'institution',
        'positive-leadership',
        2,
        'Created an incentive framework and 2014 approvals, though neither fab reached production.',
      ),
    ],
  },
  {
    eventId: 'commercial-semiconductor-production-2026',
    choiceAssessment: 'mostly-right',
    choiceScore: 8,
    choiceReason:
      'A dedicated mission, large incentives, state coordination, and global partnerships converted policy into commercial assembly and test plants. Credit is bounded because front-end fabrication, sustained utilisation, yields, domestic value, and audited jobs remain incomplete.',
    unionRole:
      'The Modi government created the national programme, selected projects, provided major fiscal support, coordinated technology partnerships, and retained programme accountability.',
    stateLocalRole:
      'Gujarat and other host states provided land, utilities, infrastructure, local incentives, approvals, and workforce support essential to plant delivery.',
    positiveOutcomes:
      'Commercial production, first shipments, trained workers, supplier demand, and a credible construction pipeline replaced decades of proposal-only outcomes.',
    lessons:
      'Track actual chips shipped, qualified customers, yields, plant utilisation, domestic inputs, wages, public subsidy paid, water and power use, exports, and long-run competitiveness rather than announced capacity alone.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      responsibility(
        'Modi government and India Semiconductor Mission',
        'union-government',
        'positive-leadership',
        5,
        'Created and financed the programme architecture that enabled the first operating commercial plants.',
        'high',
      ),
      responsibility(
        'Gujarat and other host-state governments',
        'state-government',
        'implementation',
        4,
        'Delivered land, utilities, local incentives, clearances, and workforce coordination.',
        'high',
      ),
      responsibility(
        'Micron, CG Semi, Kaynes, Tata, and technology partners',
        'corporate',
        'implementation',
        5,
        'Invested, built, transferred technology, trained workers, and assumed commercial delivery risk.',
        'high',
      ),
    ],
  },
  {
    eventId: 'semicon-2-approved-2026',
    choiceAssessment: 'mostly-right',
    choiceScore: 7.5,
    choiceReason:
      'Long-term policy continuity and attention to materials, equipment, chemicals, research, and skills address real gaps. The very large fiscal envelope requires transparent selection, milestones, public-value tests, and cancellation rules.',
    unionRole:
      'The Union Cabinet owns the programme design, budget envelope, selection rules, monitoring, fiscal exposure, and national research and supply-chain strategy.',
    stateLocalRole:
      'States will compete for projects and remain responsible for land, power, water, environmental approval, worker systems, and local infrastructure.',
    positiveOutcomes:
      'The design reduces stop-start policy risk and recognises that fabs cannot succeed without suppliers, equipment service, research, talent, and advanced packaging.',
    lessons:
      'Publish project-level subsidy, milestones, private capital at risk, technology transfer, environmental needs, domestic value, jobs, customer qualification, and clawback results.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      responsibility(
        'Modi government and Union Cabinet',
        'union-government',
        'policy-decision',
        5,
        'Approved the long-term programme and owns fiscal design and performance accountability.',
        'high',
      ),
      responsibility(
        'India Semiconductor Mission and MeitY',
        'institution',
        'implementation',
        5,
        'Must select commercially credible projects, monitor milestones, disclose subsidies, and stop weak projects.',
        'high',
      ),
      responsibility(
        'Host states and participating companies',
        'state-government',
        'implementation',
        4,
        'Share responsibility for infrastructure, utilities, environmental safeguards, talent, capital, and commercial execution.',
      ),
    ],
  },
]

export const semiconductorClaims: ClaimSeed[] = [
  {
    id: 'fairchild-india-viral-claim',
    jurisdictionId: 'india',
    title: 'Fairchild considered India, but the viral Noyce story is embellished',
    body:
      'A peer-reviewed history says Fairchild seriously considered India in the mid-1960s and was deterred by bureaucracy. Separate Fairchild history records rapid Hong Kong expansion. The reviewed record does not establish that Robert Noyce arrived in 1964 with a complete national fab blueprint, was sent to fifty offices, or that one decision alone transferred Hong Kong future prosperity from India.',
    stance: 'mixed',
    category: 'strategic-technology',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: [
      'fairchild-india-history-1990',
      'computer-history-fairchild-hong-kong',
    ],
  },
  {
    id: 'indira-scl-semiconductor-capability',
    jurisdictionId: 'india',
    leaderTermId: 'indira-1966',
    policyId: 'scl-semiconductor-programme-1976',
    title: 'India built real public semiconductor capability before the Modi era',
    body:
      'The Indira Gandhi-era electronics programme created SCL, negotiated technology transfer, trained engineers, and established domestic fabrication that later supported strategic and research missions.',
    stance: 'achievement',
    category: 'strategic-technology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['scl-capacity-case-study-2019', 'meity-scl-modernisation-rfp-2025'],
  },
  {
    id: 'scl-fire-recovery-cost',
    jurisdictionId: 'india',
    eventId: 'scl-fire-rebuild-1989',
    policyId: 'scl-semiconductor-programme-1976',
    title: 'The SCL fire and slow rebuild imposed a major capability loss',
    body:
      'The 1989 fire destroyed scarce production capacity and the plant did not resume until 1997. Responsibility for recovery crossed several Union governments, while the fire cause and sabotage claims remain unresolved.',
    stance: 'concern',
    category: 'strategic-technology',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: ['scl-capacity-case-study-2019', 'india-today-scl-fire-2025'],
  },
  {
    id: 'manmohan-intel-policy-delay',
    jurisdictionId: 'india',
    leaderTermId: 'manmohan-2004',
    eventId: 'intel-semiconductor-window-2007',
    policyId: 'semiconductor-incentive-policy-2007',
    title: 'UPA policy delay contributed to missed Intel manufacturing opportunities',
    body:
      'A 2005 $700 million wafer-testing proposal and Intel 2007 comments about a later multibillion-dollar manufacturing window were separate episodes. The government was entitled to test subsidy demands, but delayed policy and decision-making were material failures.',
    stance: 'concern',
    category: 'strategic-technology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['register-intel-700m-2005', 'livemint-intel-policy-delay-2007'],
  },
  {
    id: 'manmohan-fab-policy-attempt',
    jurisdictionId: 'india',
    leaderTermId: 'manmohan-2004',
    policyId: 'semiconductor-incentive-policy-2007',
    title: 'The UPA did create incentives and approve commercial fab proposals',
    body:
      'The 2007 policy eventually offered capital support and the Cabinet approved two commercial fab proposals in February 2014. Neither project became operational, so this is policy-attempt credit rather than outcome credit.',
    stance: 'context',
    category: 'strategic-technology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['pib-semiconductor-fabs-2014', 'carnegie-pre-ism-attempts-2025'],
  },
  {
    id: 'modi-semiconductor-mission-strategy',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'semicon-india-programme-2021',
    title: 'The Modi government created a sustained full-value-chain semiconductor strategy',
    body:
      'The India Semiconductor Mission combined a dedicated institution, large fiscal support, design incentives, commercial fabrication, compound semiconductors, assembly and test, SCL modernisation, infrastructure, and global technology partnerships.',
    stance: 'achievement',
    category: 'strategic-technology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['pib-semicon-india-2021', 'carnegie-ism-review-2025'],
  },
  {
    id: 'modi-semiconductor-commercial-production',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'commercial-semiconductor-production-2026',
    policyId: 'semicon-india-programme-2021',
    title: 'Commercial semiconductor production is now an observed outcome',
    body:
      'Micron and CG Semi entered commercial assembly, packaging, and test production, and official records reported three programme plants producing chips by July 2026. This is meaningful delivery beyond approvals, even though it is not yet large-scale front-end wafer fabrication.',
    stance: 'achievement',
    category: 'strategic-technology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'micron-sanand-commercial-2026',
      'pib-cg-semi-commercial-2026',
      'pib-semiconductor-status-2026',
    ],
  },
  {
    id: 'semiconductor-front-end-fab-pending',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'semicon-india-programme-2021',
    title: 'The most consequential front-end fab outcome remains ahead',
    body:
      'Tata Dholera is under construction with PSMC process support and an ASML equipment partnership, while the high-volume Tata Assam packaging plant remains upcoming. Qualified wafers, sustained yields, customers, exports, and domestic value cannot yet be credited as completed outcomes.',
    stance: 'context',
    category: 'strategic-technology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['tata-asml-dholera-2026', 'tata-assam-construction-2026'],
  },
  {
    id: 'semiconductor-viral-capacity-corrections',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'semicon-india-programme-2021',
    title: 'Taloja and Assam capacity figures are not current production',
    body:
      'The 80,000-wafers-per-month Taloja number was proposed future capacity for an Adani-Tower project later reported paused. The Assam 48-million-chips-per-day figure is planned full capacity for a plant Tata still describes as upcoming.',
    stance: 'context',
    category: 'evidence-gap',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'et-taloja-proposal-2024',
      'reuters-adani-tower-paused-2025',
      'tata-assam-construction-2026',
    ],
  },
  {
    id: 'semiconductor-investment-number-context',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'semicon-india-programme-2021',
    title: 'Public outlay and project investment must not be added as one clean commitment',
    body:
      'ISM 1.0 had a Rs 76,000 crore incentive envelope, twelve approved projects represented about Rs 1.64 lakh crore of project investment, and Semicon 2.0 adds a separate Rs 1,27,500 crore programme envelope. Public support finances part of project cost, so adding all three numbers would double count.',
    stance: 'context',
    category: 'public-finance',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'pib-semicon-india-2021',
      'pib-semiconductor-status-2026',
      'pib-semicon-2-2026',
    ],
  },
  {
    id: 'semiconductor-subsidy-execution-risk',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    policyId: 'semicon-india-programme-2021',
    title: 'Large subsidies still need commercial and public-value proof',
    body:
      'Fabs and packaging plants need customers, competitive yields, uninterrupted power and ultrapure water, imported equipment service, specialty materials, skilled operators, continuous upgrading, and disciplined project cancellation. Approved investment is not proof of durable competitiveness.',
    stance: 'concern',
    category: 'strategic-technology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'pib-semicon-india-2021',
      'carnegie-ism-review-2025',
      'tata-asml-dholera-2026',
    ],
  },
  {
    id: 'semicon-2-design-only',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'semicon-2-approved-2026',
    policyId: 'semicon-india-2-2026',
    title: 'Semicon 2.0 earns design credit, not outcome credit',
    body:
      'The second phase addresses real supply-chain gaps and reduces stop-start policy risk, but no manufacturing, jobs, domestic value, research, or fiscal-efficiency result can yet be attributed to a programme approved on July 15, 2026.',
    stance: 'context',
    category: 'strategic-technology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['pib-semicon-2-2026', 'indian-express-semicon-2-2026'],
  },
  {
    id: 'modi-semiconductor-rating-treatment',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'commercial-semiconductor-production-2026',
    policyId: 'semicon-india-programme-2021',
    title: 'Semiconductor evidence raises category credit inside the unified scorecard',
    body:
      'Five evidence-aware rating replications supported raising reform and state capacity from 7.4 to 7.6 and integrity and execution from 5.9 to 6.0. Development and economy remains 7.7 because current production is mostly assembly and test and the front-end fab is unfinished. The current unified overall is the equal six-category mean, 6.5/10; semiconductor evidence is visible inside the relevant categories and is not added again.',
    stance: 'context',
    category: 'methodology',
    claimLayer: 'editorial',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'pib-semiconductor-status-2026',
      'micron-sanand-commercial-2026',
      'pib-cg-semi-commercial-2026',
      'tata-asml-dholera-2026',
      'carnegie-ism-review-2025',
    ],
  },
]

export const semiconductorCuratedAnswers: CuratedAnswerSeed[] = [
  {
    id: 'india-semiconductor-credit',
    jurisdictionId: 'india',
    question: 'Does Modi deserve more credit for India semiconductor push?',
    aliases: [
      'modi semiconductor rating',
      'did modi build semiconductor industry',
      'congress killed semiconductor india',
      'robert noyce india 1964',
      'scl mohali fire',
      'intel india chip plant 2005',
      'taloja 80000 wafers',
      'assam 48 million chips',
      'india semiconductor superpower',
    ],
    shortAnswer:
      'Yes, Modi deserves substantial and previously missing credit for turning semiconductor policy into operating commercial plants and a credible fab pipeline. But the viral story overstates the Fairchild details and treats planned Taloja, Assam, and Dholera capacity as current output.',
    verdict:
      'Sector verdict: the Modi government has the strongest commercial semiconductor execution record of any Indian government so far. ISM 1.0 scores 7.5/10 retrospectively and Semicon 2.0 scores 7.2/10 on design only. The evidence raises Modi’s reform and state-capacity category to 7.6 and integrity and execution to 6.0. The unified PM score remains a separate equal average across all six categories, currently 6.5/10. A higher sector or overall judgment needs qualified Dholera wafers, sustained Assam output, actual jobs, domestic value, yields, customers, exports, and evidence that the subsidy-supported ecosystem is competitive.',
    confidence: 'high',
    asOfDate: reviewedAt,
    claimSections: [
      {
        claimId: 'modi-semiconductor-mission-strategy',
        section: 'achievement',
        sortOrder: 1,
      },
      {
        claimId: 'modi-semiconductor-commercial-production',
        section: 'achievement',
        sortOrder: 2,
      },
      {
        claimId: 'indira-scl-semiconductor-capability',
        section: 'achievement',
        sortOrder: 3,
      },
      {
        claimId: 'manmohan-intel-policy-delay',
        section: 'concern',
        sortOrder: 1,
      },
      {
        claimId: 'scl-fire-recovery-cost',
        section: 'concern',
        sortOrder: 2,
      },
      {
        claimId: 'semiconductor-subsidy-execution-risk',
        section: 'concern',
        sortOrder: 3,
      },
      {
        claimId: 'fairchild-india-viral-claim',
        section: 'context',
        sortOrder: 1,
      },
      {
        claimId: 'manmohan-fab-policy-attempt',
        section: 'context',
        sortOrder: 2,
      },
      {
        claimId: 'semiconductor-viral-capacity-corrections',
        section: 'context',
        sortOrder: 3,
      },
      {
        claimId: 'semiconductor-investment-number-context',
        section: 'context',
        sortOrder: 4,
      },
      {
        claimId: 'semiconductor-front-end-fab-pending',
        section: 'context',
        sortOrder: 5,
      },
      {
        claimId: 'modi-semiconductor-rating-treatment',
        section: 'context',
        sortOrder: 6,
      },
    ],
  },
]
