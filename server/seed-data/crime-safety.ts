import type {
  ClaimSeed,
  CuratedAnswerSeed,
  EventAssessmentSeed,
  EventSeed,
  IndicatorDefinitionSeed,
  IndicatorObservationSeed,
  LeaderSpecialistAssessmentSeed,
  LeaderSpecialistDimensionSeed,
  LeaderSpecialistTopicSeed,
  SourceSeed,
} from '../types.ts'

const reviewedAt = '2026-07-26'

export const crimeSafetySources: SourceSeed[] = [
  {
    id: 'ncrb-crime-2015-index',
    title: 'Crime in India 2015: table index',
    publisher: 'National Crime Records Bureau',
    url: 'https://www.ncrb.gov.in/crime-in-india-table-content.html?category=&year=2015',
    sourceType: 'official-statistics-index',
    reliability: 5,
    ratingReason:
      'Official NCRB index linking the state and national tables for registered crime, violent crime, women, children, cybercrime, police disposal, and court disposal in 2015.',
    bestFor:
      'The first full post-bifurcation Andhra Pradesh crime benchmark and an early Modi-term India benchmark.',
    limitations:
      'Registered crime is affected by reporting access, police recording, legal definitions, and local practice; the child-population denominator is an older estimate.',
    publishedDate: '2016-08-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ncrb-crime-2019-index',
    title: 'Crime in India 2019: table index',
    publisher: 'National Crime Records Bureau',
    url: 'https://www.ncrb.gov.in/crime-in-india-table-content.html?category=&year=2019',
    sourceType: 'official-statistics-index',
    reliability: 5,
    ratingReason:
      'Official NCRB index linking comparable 2017-19 state tables and 2019 police and court disposal records.',
    bestFor:
      'The transition benchmark between the 2014-19 Naidu term and the 2019-24 Jagan term.',
    limitations:
      'Some state data were carried forward when submissions were late; registered rates are not direct victimization estimates.',
    publishedDate: '2020-09-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'ncrb-crime-2023-part-i',
    title: 'Crime in India 2023, Part I',
    publisher: 'National Crime Records Bureau',
    url: 'https://www.ncrb.gov.in/uploads/files/1CrimeinIndia2023PartI.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Official NCRB tables for IPC crime, violent crime, murder, crimes against women and children, charge-sheeting, conviction, and pendency.',
    bestFor:
      'The latest downloadable national and Andhra Pradesh harm, reporting, investigation, and sensitive-crime justice indicators.',
    limitations:
      'NCRB itself warns that higher registration can reflect easier FIR access or better recording and that state comparisons from these figures alone are too simplistic.',
    publishedDate: '2025-09-29',
    accessedDate: reviewedAt,
  },
  {
    id: 'ncrb-crime-2023-part-ii',
    title: 'Crime in India 2023, Part II',
    publisher: 'National Crime Records Bureau',
    url: 'https://www.ncrb.gov.in/uploads/files/2CrimeinIndia2023PartII.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Official NCRB cybercrime tables reporting state and national incidence, rates, police disposal, charge-sheeting, court disposal, conviction, and pendency.',
    bestFor:
      'The latest comparable cybercrime and cyber-justice evidence for India and Andhra Pradesh.',
    limitations:
      'Cybercrime reporting, offence classification, digital adoption, and police capacity changed quickly; registered cases substantially understate victimization and cannot be read as prevalence alone.',
    publishedDate: '2025-09-29',
    accessedDate: reviewedAt,
  },
  {
    id: 'ncrb-crime-2024-empty-index',
    title: 'Crime in India 2024 publication page without downloadable records',
    publisher: 'National Crime Records Bureau',
    url: 'https://www.ncrb.gov.in/crime-in-india-year-wise.html?keyword=&year=2024',
    sourceType: 'official-availability-record',
    reliability: 5,
    ratingReason:
      'Official NCRB year page used to verify whether a newer crime report is actually downloadable.',
    bestFor:
      'The July 26, 2026 evidence gap: the year is listed and a cover is displayed, but the result table still says no records found.',
    limitations:
      'This is an availability check, not the underlying report. Government and press announcements of release do not make state and offence tables reproducible.',
    accessedDate: reviewedAt,
  },
  {
    id: 'pib-crime-india-2024-release',
    title: 'Release of Crime in India 2024',
    publisher: 'National Crime Records Bureau via Press Information Bureau',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2294568&reg=3&lang=2',
    sourceType: 'official-publication-announcement',
    reliability: 5,
    ratingReason:
      'Official announcement that NCRB released the Crime in India 2024 report.',
    bestFor: 'Publication chronology and official headline release status.',
    limitations:
      'The announcement is not a substitute for downloadable tables and does not create a comparable state series by itself.',
    publishedDate: '2026-05-06',
    accessedDate: reviewedAt,
  },
  {
    id: 'indian-express-crime-india-2024',
    title:
      'NCRB Crime in India 2024: total cases fall, cybercrime and economic offences rise',
    publisher: 'Indian Express',
    url: 'https://indianexpress.com/article/india/crime-cases-saw-dip-but-cyber-offences-rose-in-2024-ncrb-data-10676671/',
    sourceType: 'independent-data-reporting',
    reliability: 4,
    ratingReason:
      'Detailed national reporting based on the newly released NCRB report with named rates, counts, and year-on-year comparisons.',
    bestFor:
      'Provisional national 2024 headline signals while the official table files remain unavailable through the NCRB year page.',
    limitations:
      'Secondary extraction cannot replace the official tables, state detail, definitions, or a published IPC-to-BNS comparison bridge.',
    publishedDate: '2026-05-07',
    accessedDate: reviewedAt,
  },
  {
    id: 'mha-cctns',
    title: 'Crime and Criminal Tracking Network and Systems',
    publisher: 'Ministry of Home Affairs, Government of India',
    url: 'https://www.mha.gov.in/en/divisionofmha/women-safety-division/cctns',
    sourceType: 'official-programme-record',
    reliability: 5,
    ratingReason:
      'Official MHA description of the 2009 CCTNS programme, its Union-state implementation, investigation tools, analytics, and citizen services.',
    bestFor:
      'National criminal-justice digital infrastructure and the distinction between Union platform responsibility and state policing.',
    limitations:
      'Programme coverage and features do not independently establish investigation quality, victim access, conviction, or crime reduction.',
    publishedDate: '2023-04-12',
    accessedDate: reviewedAt,
  },
  {
    id: 'i4c-official',
    title: 'Cyber and Information Security Division and I4C',
    publisher: 'Ministry of Home Affairs, Government of India',
    url: 'https://www.mha.gov.in/en/divisionofmha/cyber-and-information-security-cis-division',
    sourceType: 'official-programme-record',
    reliability: 5,
    ratingReason:
      'Official description of the Union cybercrime coordination centre and its prevention, reporting, capacity, and forensic mandate.',
    bestFor:
      'The intended design and responsible Union institution for coordinated cybercrime response.',
    limitations:
      'Institutional design and portal availability do not prove prevention, investigation, recovery, or conviction outcomes.',
    accessedDate: reviewedAt,
  },
  {
    id: 'mha-cybercrime-reply-2025',
    title: 'Lok Sabha reply on cyber fraud, investigations, arrests, and convictions',
    publisher: 'Ministry of Home Affairs, Government of India',
    url: 'https://www.mha.gov.in/MHA1/Par2017/pdfs/par2025-pdfs/LS02122025/452.pdf',
    sourceType: 'official-parliamentary-reply',
    reliability: 5,
    ratingReason:
      'Official parliamentary reply identifying police and public order as state responsibilities while documenting I4C, NCRP, 1930, suspect registries, and cybercrime case outcomes.',
    bestFor:
      'Federal responsibility, national coordination measures, and the gap between cyber complaints, investigation, and convictions.',
    limitations:
      'The reply reports administrative actions and selected outputs; it does not independently evaluate victim recovery, deterrence, or under-reporting.',
    publishedDate: '2025-12-02',
    accessedDate: reviewedAt,
  },
  {
    id: 'mha-new-criminal-laws-2024',
    title: 'New criminal laws take effect from July 1, 2024',
    publisher: 'Ministry of Home Affairs, Government of India',
    url: 'https://www.mha.gov.in/en/commoncontent/new-criminal-laws',
    sourceType: 'official-law-implementation',
    reliability: 5,
    ratingReason:
      'Official MHA implementation page for the BNS, BNSS, and BSA transition from the IPC, CrPC, and Indian Evidence Act.',
    bestFor:
      'The July 1, 2024 legal break and the government’s implementation rationale and materials.',
    limitations:
      'The implementing ministry’s rationale does not independently establish better investigation, trial quality, rights protection, or crime outcomes.',
    publishedDate: '2024-07-01',
    accessedDate: reviewedAt,
  },
  {
    id: 'prs-criminal-law-reforms-2023',
    title: 'Overview of Criminal Law Reforms',
    publisher: 'PRS Legislative Research',
    url: 'https://prsindia.org/billtrack/overview-of-criminal-law-reforms',
    sourceType: 'independent-legislative-analysis',
    reliability: 4,
    ratingReason:
      'Named legislative analysis of the three replacement criminal laws, their intended modernization, and unresolved due-process and implementation issues.',
    bestFor:
      'Independent design context and the limits of comparing post-July-2024 crime categories directly with IPC-era series.',
    limitations:
      'Legislative analysis predates full implementation and cannot measure later crime or justice outcomes.',
    publishedDate: '2023-12-20',
    accessedDate: reviewedAt,
  },
  {
    id: 'pib-cybercrime-complaints-2026',
    title: 'Citizen Financial Cyber Fraud complaints and case outcomes, 2021-2025',
    publisher: 'Ministry of Home Affairs via Press Information Bureau',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2287039',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Current parliamentary reply reporting cyber-fraud complaints, reported amount, FIRs, arrests, charge sheets, and convictions through 2025.',
    bestFor:
      'Post-2023 national cybercrime scale and the gap between complaints and criminal-case outcomes.',
    limitations:
      'Complaints are not NCRB registered cases, may include repeat or screened reports, and cannot be appended to the NCRB rate series.',
    publishedDate: '2026-07-21',
    accessedDate: reviewedAt,
  },
  {
    id: 'indian-express-cybercrime-complaints-2026',
    title: 'How states lost Rs 53,000 crore in fraud and cheating cases',
    publisher: 'The Indian Express',
    url: 'https://indianexpress.com/article/india/indians-lost-rs-53000-crore-fraud-cheating-cases-six-years-maharashtra-2025-10452185/',
    sourceType: 'independent-news',
    reliability: 4,
    ratingReason:
      'Independent national reporting that contextualizes the difference between complaints, FIRs, financial loss, and investigation.',
    bestFor:
      'Corroborating current cyber-fraud scale and explaining why complaint counts differ from NCRB crime cases.',
    limitations:
      'A newspaper account is not the controlling statistical record and focuses on the most newsworthy aspects.',
    publishedDate: '2026-01-02',
    accessedDate: reviewedAt,
  },
  {
    id: 'new-indian-express-ap-crime-review-2025',
    title: 'Andhra crime rate drops 6.17%, but economic offences rise',
    publisher: 'The New Indian Express',
    url: 'https://www.newindianexpress.com/states/andhra-pradesh/2025/Dec/30/andhra-crime-rate-drops-617-but-economic-offences-rise-says-dgp-harish',
    sourceType: 'independent-news',
    reliability: 4,
    ratingReason:
      'Named reporting from the Andhra Pradesh DGP annual press conference with category counts and an explicit discrepancy in previously reported 2024 totals.',
    bestFor:
      'The current government’s provisional 2025 police-reported signal and its comparability limitations.',
    limitations:
      'The figures are a police year-end self-report, not yet NCRB-validated; the article identifies inconsistent 2024 totals.',
    publishedDate: '2025-12-30',
    accessedDate: reviewedAt,
  },
  {
    id: 'pti-ap-crime-review-2025',
    title: 'Crime falls 6.17% in 2025, economic offences rise in Andhra',
    publisher: 'Press Trust of India via The Week',
    url: 'https://www.theweek.in/wire-updates/national/2025/12/29/mes30-ap-crime-report-dgp.html',
    sourceType: 'independent-news-wire',
    reliability: 4,
    ratingReason:
      'Independent PTI coverage of the DGP annual review with total, violent, women, SC/ST, drug, cyber, and road-accident figures.',
    bestFor:
      'Corroborating the existence and main figures of the 2025 AP Police review.',
    limitations:
      'The report relays police statements and does not independently audit definitions, FIR quality, population rates, or the 2024 baseline.',
    publishedDate: '2025-12-29',
    accessedDate: reviewedAt,
  },
]

type MetricSpec = {
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

const metricSpecs: MetricSpec[] = [
  {
    suffix: 'ipc-rate',
    name: 'Registered IPC crime rate',
    shortName: 'Registered IPC crime',
    description:
      'Police-registered cognizable IPC cases per lakh residents for the stated year.',
    plainLanguage:
      'This counts recorded FIR cases relative to population. A higher value can mean more crime, better reporting, broader e-FIR access, changed classification, or several of these at once.',
    example:
      'A rate of 270 means 270 registered IPC cases for every one lakh residents; it does not mean 270 distinct victims or prove the area is less safe.',
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
    description:
      'NCRB-defined violent crimes registered per lakh residents.',
    plainLanguage:
      'This combines serious offences such as murder, rape, kidnapping, robbery, rioting, and arson. It is more focused than total crime but still depends on reporting and legal definitions.',
    example:
      'A rate of 12 means about 12 registered violent-crime cases per one lakh residents during the year.',
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
      'Murder is one of the more consistently recorded serious crimes, so its rate is a stronger harm signal than total registered crime, though classification and investigation still matter.',
    example:
      'A rate of 1.7 means about 1.7 registered murder cases for every one lakh residents during the year.',
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
    description:
      'Registered cases categorized by NCRB as crimes against women per lakh female residents.',
    plainLanguage:
      'This is a reporting-sensitive safety indicator. A rise may reflect more victimization, more willingness or ability to report, better police registration, legal changes, or a combination.',
    example:
      'A rate of 84 means 84 registered cases for every one lakh women, not that 84 of every one lakh women necessarily experienced crime that year.',
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
    description:
      'Registered cases categorized as crimes against children per lakh children under the report denominator.',
    plainLanguage:
      'This is also reporting-sensitive. The denominator relies on older child-population estimates, so trend direction is useful but exact level comparisons need caution.',
    example:
      'A rate of 19 means 19 registered child-crime cases for every one lakh children under the report definition.',
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
      'Cybercrime registration grows with digital use, victim awareness, reporting portals, police classification, and underlying offending. It should be read with investigation and conviction outcomes.',
    example:
      'A rate of 6.2 means 6.2 registered cybercrime cases per one lakh residents, while the number of complaints or victims may be much larger.',
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
    description:
      'Share of police-disposed IPC cases that resulted in a charge sheet under the NCRB formula.',
    plainLanguage:
      'This shows how often disposed police investigations reached a charge sheet. A high rate may reflect investigation capacity, case mix, or charging practice; it is not a conviction rate.',
    example:
      'A rate of 92% means about 92 of every 100 IPC cases disposed by police were charge-sheeted.',
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
    description:
      'Share of completed IPC trials resulting in conviction under the NCRB formula.',
    plainLanguage:
      'This divides convictions by trials completed, not by all cases filed. It can move with case mix, evidence quality, prosecution, legal aid, judicial capacity, and the small set of cases reaching judgment.',
    example:
      'A rate of 50% means half of completed IPC trials ended in conviction; it says nothing about the many cases still pending.',
    unit: '% of completed trials',
    format: 'percent',
    direction: 'higher',
    goalpostLow: 0,
    goalpostHigh: 100,
    sourceId: 'ncrb-crime-2019-index',
  },
  {
    suffix: 'women-conviction-rate',
    name: 'Conviction rate for crimes against women',
    shortName: 'Women-case conviction',
    description:
      'Share of completed trials in NCRB crime-against-women cases ending in conviction.',
    plainLanguage:
      'This is a justice-delivery measure for completed trials, not a share of complaints that produced justice and not a measure of unreported crime.',
    example:
      'A value of 5.8% means fewer than 6 of every 100 completed trials in that category ended in conviction.',
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
    description:
      'Share of completed trials in NCRB crime-against-children cases ending in conviction.',
    plainLanguage:
      'This focuses on completed trials. It should be read with pendency, investigation quality, witness support, POCSO processes, and the number of cases that never reached trial completion.',
    example:
      'A value of 28.5% means about 29 of every 100 completed trials ended in conviction.',
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
    description:
      'Share of completed cybercrime trials ending in conviction under the NCRB formula.',
    plainLanguage:
      'This reveals how the justice system performs after a cyber case reaches completed trial. Low values can reflect difficult attribution, digital evidence, jurisdiction, capacity, or weak cases.',
    example:
      'A value of 1.5% means roughly 1 to 2 of every 100 completed cybercrime trials ended in conviction.',
    unit: '% of completed trials',
    format: 'percent',
    direction: 'higher',
    goalpostLow: 0,
    goalpostHigh: 100,
    sourceId: 'ncrb-crime-2023-part-ii',
  },
]

function indicatorDefinition(
  jurisdiction: 'india' | 'andhra-pradesh',
  spec: MetricSpec,
): IndicatorDefinitionSeed {
  const isState = jurisdiction === 'andhra-pradesh'
  return {
    id: `${isState ? 'ap-' : ''}crime-${spec.suffix}`,
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
    stateReady: isState,
  }
}

export const crimeSafetyIndicatorDefinitions: IndicatorDefinitionSeed[] = [
  ...metricSpecs.map((spec) => indicatorDefinition('india', spec)),
  ...metricSpecs.map((spec) => indicatorDefinition('andhra-pradesh', spec)),
]

type SeriesPoint = readonly [period: number, value: number, sourceId: string]

const indiaSeries: Record<string, SeriesPoint[]> = {
  'ipc-rate': [
    [2015, 234.2, 'ncrb-crime-2015-index'],
    [2019, 241.2, 'ncrb-crime-2019-index'],
    [2023, 270.3, 'ncrb-crime-2023-part-i'],
  ],
  'violent-rate': [
    [2015, 26.7, 'ncrb-crime-2015-index'],
    [2019, 31.2, 'ncrb-crime-2019-index'],
    [2023, 31.2, 'ncrb-crime-2023-part-i'],
  ],
  'murder-rate': [
    [2015, 2.6, 'ncrb-crime-2015-index'],
    [2019, 2.2, 'ncrb-crime-2019-index'],
    [2023, 2.0, 'ncrb-crime-2023-part-i'],
  ],
  'women-registered-rate': [
    [2015, 53.9, 'ncrb-crime-2015-index'],
    [2019, 62.4, 'ncrb-crime-2019-index'],
    [2023, 66.2, 'ncrb-crime-2023-part-i'],
  ],
  'children-registered-rate': [
    [2015, 21.1, 'ncrb-crime-2015-index'],
    [2019, 33.2, 'ncrb-crime-2019-index'],
    [2023, 39.9, 'ncrb-crime-2023-part-i'],
  ],
  'cyber-registered-rate': [
    [2015, 0.9, 'ncrb-crime-2015-index'],
    [2019, 3.3, 'ncrb-crime-2019-index'],
    [2023, 6.2, 'ncrb-crime-2023-part-ii'],
  ],
  'ipc-chargesheet-rate': [
    [2015, 77.7, 'ncrb-crime-2015-index'],
    [2019, 67.2, 'ncrb-crime-2019-index'],
    [2023, 72.7, 'ncrb-crime-2023-part-i'],
  ],
  'ipc-conviction-rate': [
    [2015, 46.9, 'ncrb-crime-2015-index'],
    [2019, 50.4, 'ncrb-crime-2019-index'],
  ],
  'women-conviction-rate': [[2023, 21.3, 'ncrb-crime-2023-part-i']],
  'children-conviction-rate': [[2023, 28.5, 'ncrb-crime-2023-part-i']],
  'cyber-conviction-rate': [[2023, 27.6, 'ncrb-crime-2023-part-ii']],
}

const andhraSeries: Record<string, SeriesPoint[]> = {
  'ipc-rate': [
    [2015, 215.6, 'ncrb-crime-2015-index'],
    [2019, 227.9, 'ncrb-crime-2019-index'],
    [2023, 289.1, 'ncrb-crime-2023-part-i'],
  ],
  'violent-rate': [
    [2015, 13.5, 'ncrb-crime-2015-index'],
    [2019, 14.7, 'ncrb-crime-2019-index'],
    [2023, 12.1, 'ncrb-crime-2023-part-i'],
  ],
  'murder-rate': [
    [2015, 2.1, 'ncrb-crime-2015-index'],
    [2019, 1.7, 'ncrb-crime-2019-index'],
    [2023, 1.7, 'ncrb-crime-2023-part-i'],
  ],
  'women-registered-rate': [
    [2015, 62.3, 'ncrb-crime-2015-index'],
    [2019, 67.9, 'ncrb-crime-2019-index'],
    [2023, 84.2, 'ncrb-crime-2023-part-i'],
  ],
  'children-registered-rate': [
    [2015, 12.7, 'ncrb-crime-2015-index'],
    [2019, 16.1, 'ncrb-crime-2019-index'],
    [2023, 18.8, 'ncrb-crime-2023-part-i'],
  ],
  'cyber-registered-rate': [
    [2015, 1.0, 'ncrb-crime-2015-index'],
    [2019, 3.6, 'ncrb-crime-2019-index'],
    [2023, 4.4, 'ncrb-crime-2023-part-ii'],
  ],
  'ipc-chargesheet-rate': [
    [2015, 91.9, 'ncrb-crime-2015-index'],
    [2019, 85.9, 'ncrb-crime-2019-index'],
    [2023, 91.6, 'ncrb-crime-2023-part-i'],
  ],
  'ipc-conviction-rate': [
    [2015, 31.5, 'ncrb-crime-2015-index'],
    [2019, 38.4, 'ncrb-crime-2019-index'],
  ],
  'women-conviction-rate': [[2023, 5.8, 'ncrb-crime-2023-part-i']],
  'children-conviction-rate': [[2023, 5.8, 'ncrb-crime-2023-part-i']],
  'cyber-conviction-rate': [[2023, 1.5, 'ncrb-crime-2023-part-ii']],
}

function observations(
  jurisdictionId: 'india' | 'andhra-pradesh',
  series: Record<string, SeriesPoint[]>,
): IndicatorObservationSeed[] {
  const prefix = jurisdictionId === 'andhra-pradesh' ? 'ap-' : ''
  return Object.entries(series).flatMap(([suffix, points]) =>
    points.map(([period, value, sourceId]) => ({
      indicatorId: `${prefix}crime-${suffix}`,
      jurisdictionId,
      period,
      value,
      status: 'observed' as const,
      sourceId,
      note:
        suffix.includes('women') ||
        suffix.includes('children') ||
        suffix.includes('cyber') ||
        suffix === 'ipc-rate'
          ? 'Registered-case measure; reporting, access, classification, and enforcement affect the observed value.'
          : 'NCRB registered-case or disposal measure for the stated year.',
    })),
  )
}

export const crimeSafetyIndicatorObservations: IndicatorObservationSeed[] = [
  ...observations('india', indiaSeries),
  ...observations('andhra-pradesh', andhraSeries),
]

export const crimeSafetySpecialistTopics: LeaderSpecialistTopicSeed[] = [
  {
    id: 'public-safety',
    name: 'Crime, public safety, and justice delivery',
    description:
      'A separate assessment of serious harm, women and child safety, reporting and investigation, court outcomes, and cybercrime response.',
    operationalLabel: 'Recorded safety outcomes',
    adjustedLabel: 'Reporting-and-justice adjusted',
    methodology:
      'Recorded safety outcomes weight lethal and violent harm 30%, women and child safety 25%, reporting and investigation 10%, justice delivery 20%, and cyber resilience 15%. The reporting-and-justice-adjusted lens uses 20%, 20%, 25%, 25%, and 10%. Registered-crime increases are never treated mechanically as worsening safety. PM attribution is bounded because police and public order are state subjects; CM attribution is larger but still shared with courts, Union systems, local administration, and social conditions.',
  },
]

export const crimeSafetySpecialistDimensions: LeaderSpecialistDimensionSeed[] = [
  {
    id: 'safety-lethal-violent',
    topicId: 'public-safety',
    name: 'Lethal and violent harm',
    operationalWeight: 0.3,
    adjustedWeight: 0.2,
    description:
      'Murder and violent-crime direction, seriousness, prevention, and protection.',
  },
  {
    id: 'safety-women-children',
    topicId: 'public-safety',
    name: 'Women and child safety',
    operationalWeight: 0.25,
    adjustedWeight: 0.2,
    description:
      'Recorded safety, victim access, protection, investigation, and justice for women and children.',
  },
  {
    id: 'safety-reporting-investigation',
    topicId: 'public-safety',
    name: 'Reporting and investigation',
    operationalWeight: 0.1,
    adjustedWeight: 0.25,
    description:
      'FIR access, citizen reporting, police recording, investigation quality, charge-sheeting, and digital case systems.',
  },
  {
    id: 'safety-justice-delivery',
    topicId: 'public-safety',
    name: 'Justice delivery',
    operationalWeight: 0.2,
    adjustedWeight: 0.25,
    description:
      'Conviction, pendency, prosecution, evidence, victim support, and completed-trial outcomes.',
  },
  {
    id: 'safety-cyber-resilience',
    topicId: 'public-safety',
    name: 'Cybercrime resilience',
    operationalWeight: 0.15,
    adjustedWeight: 0.1,
    description:
      'Digital-crime exposure, reporting, coordination, investigation, recovery, and court outcomes.',
  },
]

function publicSafetyAssessment({
  id,
  termId,
  confidence,
  summary,
  sourceIds,
  scores,
  rationales,
}: {
  id: string
  termId: string
  confidence: 'low' | 'medium' | 'high'
  summary: string
  sourceIds: string[]
  scores: [number, number, number, number, number]
  rationales: [string, string, string, string, string]
}): LeaderSpecialistAssessmentSeed {
  const dimensions = [
    'safety-lethal-violent',
    'safety-women-children',
    'safety-reporting-investigation',
    'safety-justice-delivery',
    'safety-cyber-resilience',
  ]
  return {
    id,
    termId,
    topicId: 'public-safety',
    confidence,
    status: 'reviewed',
    summary,
    assessmentAsOf: reviewedAt,
    sourceIds,
    scores: dimensions.map((dimensionId, index) => ({
      dimensionId,
      score: scores[index],
      rationale: rationales[index],
    })),
  }
}

export const crimeSafetySpecialistAssessments: LeaderSpecialistAssessmentSeed[] = [
  publicSafetyAssessment({
    id: 'modi-public-safety-2014',
    termId: 'modi-2014',
    confidence: 'medium',
    summary:
      'The national record is mixed: the registered murder rate fell, violent crime rose and then levelled, reporting-sensitive women and child categories increased, cybercrime expanded rapidly, and justice outcomes remain uneven. Union digital systems and cyber coordination are real capacity gains, but primary policing responsibility remains with states.',
    sourceIds: [
      'ncrb-crime-2015-index',
      'ncrb-crime-2019-index',
      'ncrb-crime-2023-part-i',
      'ncrb-crime-2023-part-ii',
      'mha-cctns',
      'i4c-official',
      'mha-cybercrime-reply-2025',
      'india-constitution',
    ],
    scores: [6.8, 5.4, 6.4, 5.2, 5.5],
    rationales: [
      'The registered murder rate declined from 2.6 per lakh in 2015 to 2.0 in 2023, while violent crime moved from 26.7 to 31.2 and was flat between 2019 and 2023.',
      'Registered rates for crimes against women and children rose. That is a serious concern but cannot be separated cleanly from reporting access, registration, and legal change using police data alone.',
      'CCTNS, ICJS, online reporting, national databases, and a 72.7% IPC charge-sheeting rate show capacity; federal attribution is bounded because states register and investigate most crime.',
      'In 2023, conviction rates were 21.3% for crime-against-women trials, 28.5% for crime-against-children trials, and 27.6% for completed cybercrime trials, with high pendency.',
      'I4C, NCRP, 1930, and national coordination improved reporting and response, while the registered cybercrime rate rose from 0.9 in 2015 to 6.2 in 2023 and outcomes remain difficult.',
    ],
  }),
  publicSafetyAssessment({
    id: 'ap-naidu-public-safety-2014',
    termId: 'ap-naidu-2014',
    confidence: 'medium',
    summary:
      'The first post-split term combines a lower murder rate and improving court conviction with a modest rise in registered violent crime, rising reporting-sensitive categories, and lower police charge-sheeting by 2019.',
    sourceIds: [
      'ncrb-crime-2015-index',
      'ncrb-crime-2019-index',
      'india-constitution',
    ],
    scores: [6.3, 5.3, 6.8, 6.4, 5.0],
    rationales: [
      'The murder rate fell from 2.1 per lakh in 2015 to 1.7 in 2019, while the violent-crime rate rose from 13.5 to 14.7.',
      'Registered women and child crime rates rose, but these police statistics cannot distinguish worsening harm from better reporting and registration.',
      'The IPC charge-sheeting rate remained high but fell from 91.9% in 2015 to 85.9% in 2019.',
      'The overall IPC conviction rate rose from 31.5% in 2015 to 38.4% in 2019, a positive but incomplete justice-delivery signal.',
      'The registered cybercrime rate rose from about 1.0 to 3.6 per lakh as digital exposure and reporting expanded.',
    ],
  }),
  publicSafetyAssessment({
    id: 'ap-jagan-public-safety-2019',
    termId: 'ap-jagan-2019',
    confidence: 'medium',
    summary:
      'Serious-harm and police charge-sheeting indicators improved by 2023, while very low completed-trial conviction rates for women, children, and cybercrime sharply reduce the justice-adjusted record.',
    sourceIds: [
      'ncrb-crime-2019-index',
      'ncrb-crime-2023-part-i',
      'ncrb-crime-2023-part-ii',
      'india-constitution',
    ],
    scores: [7.2, 5.2, 7.4, 3.8, 5.0],
    rationales: [
      'The violent-crime rate fell from 14.7 per lakh in 2019 to 12.1 in 2023 and the murder rate remained at 1.7.',
      'Registered women and child crime rates rose. The increase is concerning, while reporting, FIR access, classification, and victim willingness prevent a simple harm conclusion.',
      'Andhra Pradesh reported a 91.6% IPC charge-sheeting rate in 2023, higher than 85.9% in 2019 and the 72.7% national figure.',
      'The 2023 conviction rates for completed trials were 5.8% for crimes against women, 5.8% for crimes against children, and 1.5% for cybercrime, despite lower pendency than some states.',
      'The registered cybercrime rate increased from 3.6 to 4.4 per lakh, while cyber charge-sheeting was 34.3% and completed-trial conviction 1.5% in 2023.',
    ],
  }),
]

export const crimeSafetyEvents: EventSeed[] = [
  {
    id: 'new-criminal-laws-effective-2024',
    jurisdictionId: 'india',
    date: '2024-07-01',
    title: 'BNS, BNSS, and BSA replace the IPC-era criminal-law framework',
    summary:
      'Three new criminal laws took effect, changing offences, criminal procedure, evidence rules, police workflows, and the statistical boundary for later crime comparisons.',
    significance:
      'Post-July-2024 police data cannot be appended mechanically to IPC-era trends without a documented legal and classification bridge.',
    category: 'justice-reform',
    confidence: 'high',
    sourceIds: ['mha-new-criminal-laws-2024', 'prs-criminal-law-reforms-2023'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'national-cybercrime-complaints-2025',
    jurisdictionId: 'india',
    date: '2026-07-21',
    title: 'Official reply reports 65.9 lakh cyber-fraud complaints across 2021-2025',
    summary:
      'The Union reported 65,88,862 Citizen Financial Cyber Fraud complaints involving about Rs 55,050.6 crore, alongside 1,95,760 FIRs and much smaller arrest, charge-sheet, and conviction totals.',
    significance:
      'The complaint-to-FIR and case-outcome gap shows why current cyber harm must be tracked separately from NCRB registered-case rates.',
    category: 'cybercrime',
    confidence: 'high',
    sourceIds: [
      'pib-cybercrime-complaints-2026',
      'indian-express-cybercrime-complaints-2026',
    ],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'ap-crime-review-2025',
    jurisdictionId: 'andhra-pradesh',
    date: '2025-12-29',
    title: 'AP Police reports lower 2025 crime with higher economic offences',
    summary:
      'The DGP annual review reported total cases down 6.17%, with declines in several violent, women, SC/ST, drug, cyber, and road categories but a 4.78% rise in economic offences.',
    significance:
      'This is a useful current signal for the Naidu term, but it remains provisional because the figures are not NCRB-validated and the reported 2024 baseline differs from an earlier police total.',
    category: 'public-safety',
    confidence: 'medium',
    sourceIds: [
      'new-indian-express-ap-crime-review-2025',
      'pti-ap-crime-review-2025',
    ],
    leaderTermIds: ['ap-naidu-2024'],
  },
]

export const crimeSafetyEventAssessments: EventAssessmentSeed[] = [
  {
    eventId: 'new-criminal-laws-effective-2024',
    choiceAssessment: 'contested',
    choiceScore: 6.0,
    choiceReason:
      'Modernizing offences, digital evidence, and procedure is legitimate, while custody, safeguards, implementation readiness, classification continuity, and judicial interpretation remain materially contested.',
    unionRole:
      'The Modi government and Parliament designed, enacted, notified, and coordinated the national legal transition.',
    stateLocalRole:
      'State police, prosecutors, forensic institutions, prisons, lower courts, legal-aid systems, and local administrations implement most daily criminal procedure.',
    positiveOutcomes:
      'The laws provide a current framework for digital evidence, organized crime, victim communication, forensic use, and time-bound procedures.',
    lessons:
      'Publish bridge tables from IPC to BNS categories, implementation audits, custody and bail outcomes, forensic capacity, victim experience, and court performance before claiming success.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'Modi government and Parliament',
        responsibilityKind: 'policy-decision',
        level: 5,
        assessment:
          'Owned the design, passage, notification, national rules, and implementation support.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'State police, prosecution, prisons, and forensic systems',
        responsibilityKind: 'implementation',
        level: 5,
        assessment:
          'Carry the main operational burden and determine whether the new procedure works in practice.',
        confidence: 'high',
      },
      {
        actorType: 'institution',
        actorName: 'Courts and legal-aid institutions',
        responsibilityKind: 'implementation',
        level: 4,
        assessment:
          'Interpret safeguards, resolve ambiguity, manage trials, and protect due process.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'national-cybercrime-complaints-2025',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The complaint volume is an observed current-risk signal, not itself a government decision. Accountability concerns prevention, reporting, freezing, investigation, interstate coordination, and justice outcomes.',
    unionRole:
      'The Union operates I4C, NCRP, 1930, financial coordination, suspect registries, national analytics, and interstate support.',
    stateLocalRole:
      'State and Union Territory police register FIRs, investigate offences, arrest accused, file charge sheets, and work with prosecutors and courts.',
    positiveOutcomes:
      'National reporting and rapid financial coordination make more incidents visible and can freeze suspected proceeds faster.',
    lessons:
      'Publish complaint-to-FIR, amount-saved, amount-refunded, arrest, charge-sheet, conviction, and time-to-action rates by state without presenting complaints as registered crimes.',
    confidence: 'high',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'MHA, I4C, and national financial coordination institutions',
        responsibilityKind: 'implementation',
        level: 4,
        assessment:
          'Own national reporting, coordination, registries, analytics, and cross-state platform capacity.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'State and Union Territory police',
        responsibilityKind: 'implementation',
        level: 5,
        assessment:
          'Own most FIR registration, investigation, arrest, evidence collection, and charge-sheeting.',
        confidence: 'high',
      },
      {
        actorType: 'corporate',
        actorName: 'Banks, payment systems, telecoms, and online platforms',
        responsibilityKind: 'shared-context',
        level: 4,
        assessment:
          'Control prevention, transaction monitoring, rapid holds, account recovery, and platform abuse safeguards.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'ap-crime-review-2025',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The annual police totals are reported outputs, not one policy decision. The underlying policing, prevention, registration, investigation, and justice choices must be judged separately.',
    unionRole:
      'The current Naidu government and AP Police own state policing priorities, FIR systems, investigation, prevention, prosecution coordination, and the integrity of the annual review.',
    stateLocalRole:
      'The Union supplies national laws and platforms; districts, police stations, prosecutors, courts, local bodies, financial institutions, and communities shape actual outcomes.',
    positiveOutcomes:
      'The reported declines in violent, women, SC/ST, drug, cyber, and road categories are encouraging current signals.',
    lessons:
      'Publish machine-readable district and offence tables, population rates, FIR definitions, corrected baselines, detection, recovery, charge-sheet, conviction, and independent validation.',
    confidence: 'medium',
    assessmentAsOf: reviewedAt,
    responsibilities: [
      {
        actorType: 'state-government',
        actorName: 'Naidu government and Andhra Pradesh Police',
        responsibilityKind: 'positive-leadership',
        level: 4,
        assessment:
          'Own the reported current policing direction and the quality and transparency of state crime administration.',
        confidence: 'medium',
      },
      {
        actorType: 'institution',
        actorName: 'AP prosecution, courts, and forensic institutions',
        responsibilityKind: 'implementation',
        level: 4,
        assessment:
          'Determine whether registration and police work translate into durable justice outcomes.',
        confidence: 'high',
      },
      {
        actorType: 'structural',
        actorName: 'Reporting access, legal transition, economic conditions, and social behavior',
        responsibilityKind: 'shared-context',
        level: 4,
        assessment:
          'Affect registered totals independently of government competence and limit causal interpretation.',
        confidence: 'high',
      },
    ],
  },
]

export const crimeSafetyClaims: ClaimSeed[] = [
  {
    id: 'india-murder-rate-improved',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'The registered murder rate declined',
    body:
      'India’s registered murder rate fell from about 2.6 per lakh in 2015 to 2.2 in 2019 and 2.0 in 2023. This is a stronger harm signal than total FIR counts, while policing, social conditions, and state governments share attribution.',
    stance: 'achievement',
    category: 'public-safety',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'ncrb-crime-2015-index',
      'ncrb-crime-2019-index',
      'ncrb-crime-2023-part-i',
    ],
  },
  {
    id: 'india-reporting-sensitive-crime',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Women, child, and total registered-crime rates rose, but the meaning is mixed',
    body:
      'Registered rates increased in these categories between 2015 and 2023. NCRB warns that rising registration can reflect e-FIRs, help desks, access, awareness, legal change, or more underlying crime, so the site does not convert the increase mechanically into blame.',
    stance: 'mixed',
    category: 'public-safety',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'ncrb-crime-2015-index',
      'ncrb-crime-2019-index',
      'ncrb-crime-2023-part-i',
    ],
  },
  {
    id: 'india-cyber-justice-gap',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Cybercrime capacity expanded, but case outcomes remain weak',
    body:
      'CCTNS, I4C, NCRP, and 1930 expanded reporting and coordination. The registered cybercrime rate rose from 0.9 per lakh in 2015 to 6.2 in 2023; the 2023 charge-sheeting rate was 33.9% and completed-trial conviction rate 27.6%.',
    stance: 'concern',
    category: 'cybercrime',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'ncrb-crime-2015-index',
      'ncrb-crime-2023-part-ii',
      'mha-cctns',
      'i4c-official',
      'mha-cybercrime-reply-2025',
    ],
  },
  {
    id: 'crime-reporting-caveat',
    jurisdictionId: 'india',
    title: 'Registered crime is not the same as underlying victimization',
    body:
      'NCRB explicitly warns against ranking states from police data alone. Murder and violent crime are treated as stronger harm signals; women, children, cybercrime, and total FIR rates remain reporting-sensitive.',
    stance: 'context',
    category: 'methodology',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ncrb-crime-2023-part-i'],
  },
  {
    id: 'crime-2024-data-gap',
    jurisdictionId: 'india',
    title: 'The 2024 release exists, but reproducible tables remain unavailable',
    body:
      'NCRB and the Union announced Crime in India 2024, and independent reporting summarizes national headline figures. As reviewed on July 26, however, the official NCRB year page still returns “no records found,” so the latest reproducible national and state table series in India Mechanics remains 2023.',
    stance: 'context',
    category: 'data-availability',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'ncrb-crime-2024-empty-index',
      'pib-crime-india-2024-release',
      'indian-express-crime-india-2024',
      'ncrb-crime-2023-part-i',
    ],
  },
  {
    id: 'india-crime-2024-headline-signal',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'National 2024 headlines are mixed and provisional',
    body:
      'Independent reporting from the released NCRB report says total cases fell about 6% and the recorded crime rate fell from 448.3 per lakh in 2023 to 418.9 in 2024, while murder cases fell 2.4% to 27,049. Cybercrime rose 17.9% to 1,01,928 cases and economic offences rose 4.6% to 2,14,379. These are current signals, not yet an appended trend series, because official tables and the IPC-to-BNS bridge remain unavailable.',
    stance: 'mixed',
    category: 'public-safety',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: [
      'pib-crime-india-2024-release',
      'indian-express-crime-india-2024',
      'ncrb-crime-2024-empty-index',
    ],
  },
  {
    id: 'india-criminal-law-data-break',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'new-criminal-laws-effective-2024',
    title: 'The July 2024 criminal-law transition breaks simple trend continuity',
    body:
      'BNS, BNSS, and BSA replaced the IPC-era offence, procedure, and evidence framework. Future crime series need a published category bridge before they are compared mechanically with 2015-2023 IPC data.',
    stance: 'context',
    category: 'justice-reform',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['mha-new-criminal-laws-2024', 'prs-criminal-law-reforms-2023'],
  },
  {
    id: 'india-current-cyber-complaint-gap',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'national-cybercrime-complaints-2025',
    title: 'Current cyber complaints far exceed registered-case outcomes',
    body:
      'The Union reported nearly 65.9 lakh financial-cyber-fraud complaints across 2021-2025, compared with about 1.96 lakh FIRs. Complaints are not NCRB cases, but the scale confirms a large prevention, investigation, recovery, and justice challenge.',
    stance: 'concern',
    category: 'cybercrime',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'pib-cybercrime-complaints-2026',
      'indian-express-cybercrime-complaints-2026',
    ],
  },
  {
    id: 'ap-serious-harm-improved',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    title: 'Andhra Pradesh’s recorded serious-harm rates improved by 2023',
    body:
      'The violent-crime rate fell from 14.7 per lakh in 2019 to 12.1 in 2023, while the murder rate remained at 1.7. The direction is positive but is not exclusive CM causation.',
    stance: 'achievement',
    category: 'public-safety',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ncrb-crime-2019-index', 'ncrb-crime-2023-part-i'],
  },
  {
    id: 'ap-justice-conviction-gap',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-jagan-2019',
    title: 'High charge-sheeting did not translate into strong sensitive-crime convictions',
    body:
      'Andhra Pradesh reported a 91.6% IPC charge-sheeting rate in 2023, but completed-trial conviction rates were 5.8% for crimes against women, 5.8% for crimes against children, and 1.5% for cybercrime.',
    stance: 'concern',
    category: 'justice-delivery',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ncrb-crime-2023-part-i', 'ncrb-crime-2023-part-ii'],
  },
  {
    id: 'ap-crime-reporting-context',
    jurisdictionId: 'andhra-pradesh',
    title: 'AP reporting-sensitive crime rates rose across both completed terms',
    body:
      'Registered rates for crimes against women, children, cybercrime, and total IPC crime rose between 2015 and 2023. The movement can reflect underlying harm and reporting or registration changes, so the site displays it without automatic praise or blame.',
    stance: 'context',
    category: 'public-safety',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: [
      'ncrb-crime-2015-index',
      'ncrb-crime-2019-index',
      'ncrb-crime-2023-part-i',
      'ncrb-crime-2023-part-ii',
    ],
  },
  {
    id: 'ap-current-crime-data-gap',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2024',
    title: 'The latest crime data predates the current Naidu term',
    body:
      'The newest usable NCRB observations are for calendar 2023. No public-safety specialist score is assigned to the term beginning June 2024 until post-term crime and justice data are published.',
    stance: 'context',
    category: 'data-availability',
    confidence: 'high',
    asOfDate: reviewedAt,
    sourceIds: ['ncrb-crime-2023-part-i', 'ncrb-crime-2024-empty-index'],
  },
  {
    id: 'ap-current-crime-review-signal',
    jurisdictionId: 'andhra-pradesh',
    leaderTermId: 'ap-naidu-2024',
    eventId: 'ap-crime-review-2025',
    title: 'The 2025 AP Police review is encouraging but not yet rating-grade',
    body:
      'Two independent reports of the DGP review say total registered cases fell 6.17% in 2025 and several harm categories declined, while economic offences rose. A disclosed inconsistency in 2024 totals prevents this self-report from changing the CM score before NCRB validation.',
    stance: 'context',
    category: 'public-safety',
    confidence: 'medium',
    asOfDate: reviewedAt,
    sourceIds: [
      'new-indian-express-ap-crime-review-2025',
      'pti-ap-crime-review-2025',
    ],
  },
]

export const crimeSafetyCuratedAnswers: CuratedAnswerSeed[] = [
  {
    id: 'india-crime-safety',
    jurisdictionId: 'india',
    question: 'Is crime getting better or worse in India?',
    aliases: [
      'crime in india',
      'is india safe',
      'modi crime record',
      'law and order india',
      'violent crime india',
      'women safety india',
      'cybercrime india',
    ],
    shortAnswer:
      'Mixed. The reproducible series through 2023 shows an improved murder rate, violent crime rising and then levelling, and reporting-sensitive women, child, total, and cyber categories increasing. The released 2024 national headlines suggest fewer murders but sharply higher cybercrime and a slightly higher total rate; those figures remain provisional in this site until official tables and a BNS comparison bridge are downloadable.',
    verdict:
      'Public-safety direction is mixed, with a positive lethal-violence signal and material justice and cyber gaps. Crime now affects the shared crisis and integrity components, but the PM effect is bounded because police and public order are primarily state responsibilities.',
    confidence: 'medium',
    asOfDate: reviewedAt,
    claimSections: [
      {
        claimId: 'india-murder-rate-improved',
        section: 'achievement',
        sortOrder: 1,
      },
      {
        claimId: 'india-cyber-justice-gap',
        section: 'concern',
        sortOrder: 1,
      },
      {
        claimId: 'india-reporting-sensitive-crime',
        section: 'concern',
        sortOrder: 2,
      },
      {
        claimId: 'india-current-cyber-complaint-gap',
        section: 'concern',
        sortOrder: 3,
      },
      {
        claimId: 'crime-reporting-caveat',
        section: 'context',
        sortOrder: 1,
      },
      {
        claimId: 'crime-2024-data-gap',
        section: 'context',
        sortOrder: 2,
      },
      {
        claimId: 'india-crime-2024-headline-signal',
        section: 'context',
        sortOrder: 3,
      },
      {
        claimId: 'india-criminal-law-data-break',
        section: 'context',
        sortOrder: 4,
      },
    ],
  },
  {
    id: 'ap-crime-safety',
    jurisdictionId: 'andhra-pradesh',
    question: 'How safe is Andhra Pradesh, and how did its CMs perform on crime?',
    aliases: [
      'crime in andhra pradesh',
      'andhra pradesh safety',
      'naidu crime',
      'jagan crime',
      'ap law and order',
      'women safety andhra',
      'cybercrime andhra',
    ],
    shortAnswer:
      'Recorded murder and violent-crime rates were comparatively low and improved by 2023, and AP’s IPC charge-sheeting rate was high. The strongest negative is justice conversion: completed-trial conviction rates for women, child, and cybercrime cases were very low in 2023. Reporting-sensitive categories also rose, with no clean way to separate more harm from better registration.',
    verdict:
      'Naidu 2014-19 has a mixed-positive, medium-confidence safety record; Jagan 2019-24 has stronger serious-harm and charge-sheeting signals but weak justice outcomes; the current Naidu term is not yet scoreable because the latest data are from 2023.',
    confidence: 'medium',
    asOfDate: reviewedAt,
    claimSections: [
      {
        claimId: 'ap-serious-harm-improved',
        section: 'achievement',
        sortOrder: 1,
      },
      {
        claimId: 'ap-justice-conviction-gap',
        section: 'concern',
        sortOrder: 1,
      },
      {
        claimId: 'ap-crime-reporting-context',
        section: 'context',
        sortOrder: 1,
      },
      {
        claimId: 'ap-current-crime-data-gap',
        section: 'context',
        sortOrder: 2,
      },
      {
        claimId: 'ap-current-crime-review-signal',
        section: 'context',
        sortOrder: 3,
      },
    ],
  },
]
