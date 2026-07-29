import type {
  ClaimSeed,
  EventAssessmentSeed,
  EventSeed,
  LeaderSpecialistAssessmentSeed,
  LeaderSpecialistDimensionSeed,
  LeaderSpecialistTopicSeed,
  PolicyScoreSeed,
  PolicySeed,
  SourceSeed,
} from '../types.ts'

const assessedAt = '2026-07-24'
const semiconductorAssessedAt = '2026-07-29'

export const securitySources: SourceSeed[] = [
  {
    id: 'mha-annual-report-2008-09',
    title: 'Annual Report 2008-09',
    publisher: 'Ministry of Home Affairs, Government of India',
    url: 'https://www.mha.gov.in/sites/default/files/AnnualReport_08_09.pdf',
    sourceType: 'official-record',
    reliability: 5,
    ratingReason:
      'Primary official record of the 26/11 response, NIA creation, NSG hubs, UAPA changes, and coastal-security review.',
    bestFor:
      'Post-26/11 institutional response and the government-reported security baseline.',
    limitations:
      'Government reporting does not independently establish whether reforms were sufficient or proportionate.',
    publishedDate: '2009-06-01',
    accessedDate: assessedAt,
  },
  {
    id: 'mha-annual-report-2013-14',
    title: 'Annual Report 2013-14',
    publisher: 'Ministry of Home Affairs, Government of India',
    url: 'https://www.mha.gov.in/sites/default/files/AnnualReport_13_14.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Primary official tables for Jammu and Kashmir terrorism, Northeast insurgency, and Left-wing-extremist violence through the end of the UPA period.',
    bestFor:
      'Comparable 2005-2013 J&K trends, 2007-2013 Northeast trends, and the 2011-2013 LWE decline.',
    limitations:
      'Definitions are official and may differ from independent conflict datasets; causal credit remains shared across Union and state governments.',
    publishedDate: '2014-06-01',
    accessedDate: assessedAt,
  },
  {
    id: 'mha-annual-report-2024-25',
    title: 'Annual Report 2024-25',
    publisher: 'Ministry of Home Affairs, Government of India',
    url: 'https://www.mha.gov.in/sites/default/files/AREnglish_24032026.pdf',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Primary official tables for 2024 LWE, Northeast insurgency, Jammu and Kashmir terrorism, and security-programme implementation.',
    bestFor:
      'The reported 2013-2024 LWE comparison, 2014-2024 Northeast comparison, and 2018-2024 J&K series.',
    limitations:
      'Government attribution language is not independent evaluation; Manipur materially worsened the 2023-2024 Northeast figures.',
    publishedDate: '2026-03-24',
    accessedDate: assessedAt,
  },
  {
    id: 'nia-act-2008',
    title: 'National Investigation Agency Act, 2008',
    publisher: 'India Code, Government of India',
    url: 'https://www.indiacode.nic.in/bitstream/123456789/2057/1/a2008-34.pdf',
    sourceType: 'primary-law',
    reliability: 5,
    ratingReason:
      'Authoritative enacted text establishing the national terrorism-investigation agency.',
    bestFor: 'The NIA mandate, jurisdiction, powers, and statutory chronology.',
    limitations:
      'The statute does not by itself prove investigative effectiveness or rights compliance.',
    publishedDate: '2008-12-31',
    accessedDate: assessedAt,
  },
  {
    id: 'pib-surgical-strikes-2016',
    title: 'Surgical strikes across the Line of Control',
    publisher: 'Press Information Bureau, Government of India',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1863109&reg=3&lang=2',
    sourceType: 'official-record',
    reliability: 5,
    ratingReason:
      'Official chronology and government account of the September 2016 cross-LoC operation.',
    bestFor: 'India’s stated objective, operation date, and official response framing.',
    limitations:
      'A party to the conflict cannot independently establish contested operational effects or deterrence.',
    publishedDate: '2022-09-29',
    accessedDate: assessedAt,
  },
  {
    id: 'ap-kashmir-standoff-2019',
    title: 'Pulwama attack anniversary and confirmed CRPF death toll',
    publisher: 'Indian Express',
    url: 'https://indianexpress.com/article/india/pulwama-attack-crpf-jawans-killed-tributes-narendra-modi-amit-shah-rahul-gandhi-8443460/',
    sourceType: 'independent-news',
    reliability: 4,
    ratingReason:
      'Independent national reporting of the attack, confirmed deaths, and official commemoration.',
    bestFor: 'Cross-checking the Pulwama chronology and casualty count.',
    limitations:
      'A retrospective news report; Balakot operational claims require separate official and independent evidence.',
    publishedDate: '2019-02-27',
    accessedDate: assessedAt,
  },
  {
    id: 'mea-balakot-2019',
    title: 'Statement on the strike on the JeM training camp at Balakot',
    publisher: 'Ministry of External Affairs, Government of India',
    url: 'https://www.mea.gov.in/Speeches-Statements.htm?dtl/31090/Statement_by_Foreign_Secretary_on_26_February_2019_on_the_Strike_on_JeM_training_camp_at_Balakot',
    sourceType: 'official-record',
    reliability: 5,
    ratingReason:
      'Primary Indian government statement of the Balakot objective and legal-security rationale.',
    bestFor: 'India’s stated purpose and official description of the February 2019 strike.',
    limitations:
      'The statement does not independently prove casualty, damage, or lasting deterrence claims.',
    publishedDate: '2019-02-26',
    accessedDate: assessedAt,
  },
  {
    id: 'ap-galwan-2020',
    title: 'India-China standoff turns deadly in the Galwan Valley',
    publisher: 'Indian Express',
    url: 'https://indianexpress.com/article/india/india-china-galwan-army-casualties-6461459/',
    sourceType: 'independent-news',
    reliability: 4,
    ratingReason:
      'Independent contemporaneous reporting on the June 2020 clash, confirmed Indian deaths, and disputed border context.',
    bestFor: 'The human cost and escalation chronology of the Galwan clash.',
    limitations:
      'Access to the clash site and complete Chinese casualty information was restricted.',
    publishedDate: '2020-06-16',
    accessedDate: assessedAt,
  },
  {
    id: 'mea-ladakh-agreement-2024',
    title: 'Agreement on patrolling arrangements along the Line of Actual Control',
    publisher: 'Ministry of External Affairs, Government of India',
    url: 'https://www.mea.gov.in/media-briefings.htm?dtl/38476/Transcript_of_Weekly_Media_Briefing_by_the_Official_Spokesperson_October_21_2024',
    sourceType: 'official-record',
    reliability: 5,
    ratingReason:
      'Primary Indian statement confirming the October 2024 patrol arrangement and disengagement process.',
    bestFor: 'Official status of the later Ladakh disengagement arrangement.',
    limitations:
      'It does not independently resolve competing territorial claims or the full strategic cost of the 2020 crisis.',
    publishedDate: '2024-10-21',
    accessedDate: assessedAt,
  },
  {
    id: 'ap-ladakh-disengagement-2024',
    title: 'India and China complete troop disengagement at two final sites',
    publisher: 'Indian Express',
    url: 'https://indianexpress.com/article/india/india-china-complete-border-disengagement-depsang-demchok-ladakh-9646221/',
    sourceType: 'independent-news',
    reliability: 4,
    ratingReason:
      'Independent reporting on implementation of the October 2024 patrol and disengagement arrangement.',
    bestFor: 'Corroborating the agreement and what remained unresolved.',
    limitations:
      'The broader border dispute, force posture, and pre-2020 status remained contested.',
    publishedDate: '2024-10-30',
    accessedDate: assessedAt,
  },
  {
    id: 'mod-dap-2020',
    title: 'Defence Acquisition Procedure 2020 announced',
    publisher: 'Press Information Bureau, Government of India',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1659345',
    sourceType: 'official-policy',
    reliability: 5,
    ratingReason:
      'Primary acquisition framework for domestic sourcing, procurement categories, offsets, and capability acquisition.',
    bestFor: 'The formal design of the defence-indigenisation and procurement framework.',
    limitations:
      'Policy rules and announced preferences do not prove readiness, value for money, or battlefield effectiveness.',
    publishedDate: '2020-09-28',
    accessedDate: assessedAt,
  },
  {
    id: 'pib-defence-exports-2026',
    title: 'Defence exports reach a record Rs 38,424 crore in FY 2025-26',
    publisher: 'Press Information Bureau, Government of India',
    url: 'https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2313942&reg=3&lang=2',
    sourceType: 'official-statistics',
    reliability: 5,
    ratingReason:
      'Primary Ministry of Defence release of the finalized FY 2025-26 export figure and stated comparison with earlier years.',
    bestFor: 'Official export totals and the scale of defence-industrial expansion.',
    limitations:
      'Export value does not by itself establish domestic readiness, import independence, quality, or strategic effect.',
    publishedDate: '2026-07-01',
    accessedDate: assessedAt,
  },
]

export const securitySpecialistTopics: LeaderSpecialistTopicSeed[] = [
  {
    id: 'national-security',
    name: 'National security and strategic autonomy',
    description:
      'A separate assessment of operational protection, border defence, internal conflict, national capability, and security safeguards.',
    operationalLabel: 'Operational security',
    adjustedLabel: 'Rights-adjusted security',
    methodology:
      'Operational security uses counterterrorism and intelligence (31.25%), border defence (25%), internal-conflict management (25%), and strategic autonomy (18.75%). Rights-adjusted security uses 25%, 20%, 20%, 15%, and 20% respectively, adding rule-of-law and civilian safeguards. Both are rounded to one decimal.',
  },
]

export const securitySpecialistDimensions: LeaderSpecialistDimensionSeed[] = [
  {
    id: 'security-counterterrorism',
    topicId: 'national-security',
    name: 'Counterterrorism and intelligence',
    operationalWeight: 0.3125,
    adjustedWeight: 0.25,
    description:
      'Prevention, intelligence fusion, investigation, terror-finance disruption, protection, and calibrated response.',
  },
  {
    id: 'security-border-defence',
    topicId: 'national-security',
    name: 'Interstate and border defence',
    operationalWeight: 0.25,
    adjustedWeight: 0.2,
    description:
      'Military preparedness, border infrastructure, deterrence, escalation control, and territorial outcomes.',
  },
  {
    id: 'security-internal-conflict',
    topicId: 'national-security',
    name: 'Internal-conflict management',
    operationalWeight: 0.25,
    adjustedWeight: 0.2,
    description:
      'Jammu and Kashmir, Left-wing extremism, Northeast insurgency, communal or ethnic conflict, and Union-state coordination.',
  },
  {
    id: 'security-strategic-autonomy',
    topicId: 'national-security',
    name: 'Strategic autonomy and capability',
    operationalWeight: 0.1875,
    adjustedWeight: 0.15,
    description:
      'Defence-industrial capacity, partnerships, procurement resilience, diplomatic leverage, and freedom of action.',
  },
  {
    id: 'security-safeguards',
    topicId: 'national-security',
    name: 'Rule-of-law and civilian safeguards',
    operationalWeight: 0,
    adjustedWeight: 0.2,
    description:
      'Due process, proportionality, civilian protection, federal responsibility, transparency, and remedies for security abuse.',
  },
]

const securityDimensionIds = [
  'security-counterterrorism',
  'security-border-defence',
  'security-internal-conflict',
  'security-strategic-autonomy',
  'security-safeguards',
] as const

function historicalSecurityAssessment({
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
  return {
    id,
    termId,
    topicId: 'national-security',
    confidence,
    status: 'reviewed',
    summary,
    assessmentAsOf: assessedAt,
    sourceIds,
    scores: securityDimensionIds.map((dimensionId, index) => ({
      dimensionId,
      score: scores[index],
      rationale: rationales[index],
    })),
  }
}

const historicalSecurityAssessments: LeaderSpecialistAssessmentSeed[] = [
  historicalSecurityAssessment({
    id: 'nehru-security-1947',
    termId: 'nehru-1947',
    confidence: 'medium',
    summary:
      'Nehru built democratic, diplomatic, scientific, and defence foundations and managed integration and early wars, but the 1962 defeat exposed grave intelligence, readiness, and border-strategy failures.',
    sourceIds: ['britannica-modern-india', 'india-constitution'],
    scores: [5.5, 4, 6.5, 7.5, 7.5],
    rationales: [
      'Early intelligence and counter-subversion institutions developed, but strategic warning and assessment failures were severe by 1962.',
      'The 1947-48 conflict was contained but unresolved, and the 1962 China war was a major military and preparedness failure.',
      'Integration and early conflict management were substantial achievements, while Kashmir remained unresolved and coercive laws expanded.',
      'Non-alignment, atomic and scientific capacity, industrial foundations, and diplomatic leadership expanded long-run freedom of action.',
      'Competitive democracy and civilian control were strong, but preventive detention, AFSPA, and security exceptionalism prevent a higher safeguards score.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'shastri-security-1964',
    termId: 'shastri-1964',
    confidence: 'low',
    summary:
      'A short term dominated by the 1965 war showed calm leadership, military resilience, and food-security focus, with limited time to judge durable counterterrorism or institutional effects.',
    sourceIds: ['britannica-modern-india', 'pm-india-former'],
    scores: [6.5, 8, 7, 7.5, 7],
    rationales: [
      'The short tenure provides limited comparable counterterrorism evidence, but crisis coordination was credible.',
      'India absorbed and responded to the 1965 war with greater resilience than in 1962, though the settlement did not resolve the conflict.',
      'Internal stability and mobilisation were managed competently during war and food stress.',
      'Strategic resolve, agricultural security, and continued non-alignment supported autonomy.',
      'Civilian democratic government and proportional wartime restraint were strengths, with sparse evidence limiting precision.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'indira-security-1966',
    termId: 'indira-1966',
    confidence: 'medium',
    summary:
      'The 1971 victory and Bangladesh’s creation were exceptional strategic successes, while the Emergency and coercive internal-security practices sharply reduce the rights-adjusted result.',
    sourceIds: ['britannica-modern-india', 'dae-pokhran', 'india-constitution'],
    scores: [7, 9, 6.5, 8.5, 2.5],
    rationales: [
      'Security centralisation and intelligence capacity increased, with limited transparent evidence on proportionality or accountability.',
      'The 1971 war was a decisive military and diplomatic success that resolved the refugee crisis and changed the regional balance.',
      'The state contained serious insurgency and disorder but relied heavily on coercion and centralisation.',
      'The 1971 outcome, nuclear programme, and independent foreign policy substantially increased strategic autonomy.',
      'The Emergency suspended liberties, weakened courts and opposition, and used security power against political dissent.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'desai-security-1977',
    termId: 'desai-1977',
    confidence: 'low',
    summary:
      'Desai’s main security contribution was democratic and constitutional repair after the Emergency; operational security and strategic policy were steadier than transformative.',
    sourceIds: ['constitution-44th-bill-1978', 'britannica-modern-india'],
    scores: [5.5, 6, 6, 5.8, 8.5],
    rationales: [
      'The government faced no comparable national terror shock and offers limited evidence of major capability change.',
      'Borders remained relatively stable without a major military success or failure.',
      'Internal stability improved through democratic normalisation, though coalition conflict limited capacity.',
      'Foreign and defence policy remained cautious and less strategically ambitious.',
      'Restoring elections, liberties, and constitutional emergency safeguards was a major security-governance strength.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'charan-security-1979',
    termId: 'charan-singh-1979',
    confidence: 'low',
    summary:
      'An ultra-fragile minority government had too little time and authority for a strong national-security record; scores remain close to neutral with low confidence.',
    sourceIds: ['pm-india-former', 'britannica-modern-india'],
    scores: [5, 5.5, 5, 5, 6],
    rationales: [
      'The term was too short for meaningful counterterrorism institution-building or outcome attribution.',
      'No major interstate success or failure occurred during the brief tenure.',
      'Political fragility limited internal-security leadership and durable conflict resolution.',
      'The government did not materially alter India’s strategic capabilities or partnerships.',
      'Democratic continuity was preserved, but weak mandate and sparse evidence limit confidence.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'indira-security-1980',
    termId: 'indira-1980',
    confidence: 'medium',
    summary:
      'Strategic capability remained substantial, but escalating Punjab conflict, Operation Blue Star, and the coercive political-security cycle produced severe internal and safeguards costs.',
    sourceIds: ['britannica-modern-india', 'nanavati-commission'],
    scores: [5, 6.5, 3.5, 7.5, 4],
    rationales: [
      'Security capacity was strong, but political handling and intelligence did not prevent the escalation of militancy and violence.',
      'India maintained credible conventional and strategic capacity without a major interstate war.',
      'Punjab deteriorated into a grave conflict, and Operation Blue Star removed armed militants at extraordinary religious, civilian, and political cost.',
      'Nuclear, military, and non-aligned capability remained meaningful sources of autonomy.',
      'Centralisation, coercive operations, and weak accountability for security abuses sharply reduce safeguards.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'rajiv-security-1984',
    termId: 'rajiv-1984',
    confidence: 'medium',
    summary:
      'Peace accords and modernisation efforts coexist with the costly Sri Lanka intervention, unresolved Punjab and Kashmir pressures, and weak accountability after the 1984 violence.',
    sourceIds: ['britannica-modern-india', 'mha-annual-reports'],
    scores: [5.5, 5, 5.5, 6.5, 5.5],
    rationales: [
      'Counterterror and policing capacity improved unevenly while major insurgency threats persisted.',
      'The IPKF intervention in Sri Lanka imposed substantial military and diplomatic costs without a durable settlement.',
      'Punjab, Assam, and Mizoram initiatives produced mixed conflict-resolution results; Kashmir pressures increased late in the term.',
      'Technology, defence modernisation, and diplomatic initiatives expanded capability but execution was inconsistent.',
      'Competitive institutions continued, but the anti-Sikh violence aftermath, coercive laws, and weak accountability reduce safeguards.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'vp-singh-security-1989',
    termId: 'vp-singh-1989',
    confidence: 'low',
    summary:
      'The rapid escalation of the Kashmir insurgency and political instability overwhelmed a short government, with limited evidence of effective prevention, conflict resolution, or strategic change.',
    sourceIds: ['britannica-modern-india', 'mha-annual-report-2013-14'],
    scores: [4.5, 5.5, 4.5, 5.5, 6],
    rationales: [
      'The government struggled to prevent or contain the accelerating Kashmir militancy and associated attacks.',
      'No major interstate war occurred, but border-linked insurgency pressure grew sharply.',
      'Kashmir deteriorated and domestic political conflict consumed governing capacity.',
      'Strategic policy remained broadly continuous without a major capability gain.',
      'Democratic checks remained intact, though emergency-style security measures and conflict practices created rights concerns.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'chandra-security-1990',
    termId: 'chandra-shekhar-1990',
    confidence: 'low',
    summary:
      'A tiny minority government operated amid insurgency, political instability, and an external-payments emergency, leaving little durable operational or strategic-security record.',
    sourceIds: ['britannica-modern-india', 'rbi-history-gold-1991'],
    scores: [4.5, 5, 4.5, 4.5, 5.5],
    rationales: [
      'Counterterrorism and intelligence institutions made no clear durable advance during the short term.',
      'Borders remained pressured without a major conventional conflict or resolution.',
      'Kashmir and domestic instability remained acute and largely unresolved.',
      'The economic emergency constrained strategic freedom of action and defence capacity.',
      'Formal democratic institutions continued, but weak authority and conflict measures limit the safeguards assessment.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'rao-security-1991',
    termId: 'rao-1991',
    confidence: 'medium',
    summary:
      'Rao improved strategic and economic room for manoeuvre and saw Punjab militancy recede, but Kashmir, the Babri failure, communal violence, and the 1993 bombings expose major internal-security costs.',
    sourceIds: ['britannica-modern-india', 'mha-annual-reports'],
    scores: [5.5, 6, 5.5, 7.5, 5],
    rationales: [
      'The 1993 Mumbai bombings and continuing militancy reveal major prevention gaps despite improving investigative capacity.',
      'India avoided a major war and sustained deterrence during severe economic constraint.',
      'Punjab improved, but Kashmir remained violent and the Babri demolition and communal cycle were severe failures of protection.',
      'Economic reform, Look East policy, nuclear continuity, and diplomatic adaptation increased long-run strategic autonomy.',
      'Democratic continuity survived crisis, while communal protection, security-force accountability, and federal failures reduce safeguards.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'deve-security-1996',
    termId: 'deve-gowda-1996',
    confidence: 'low',
    summary:
      'A short coalition term maintained continuity in a difficult insurgency environment but produced little evidence of decisive operational, border, or strategic change.',
    sourceIds: ['britannica-modern-india', 'mha-annual-reports'],
    scores: [5.5, 5.5, 5.5, 5.5, 6.5],
    rationales: [
      'Counterterrorism performance was broadly continuous, with sparse term-specific evidence.',
      'No major interstate conflict or breakthrough occurred.',
      'Insurgencies persisted without a clear national resolution attributable to the short term.',
      'Strategic policy remained stable but not transformative.',
      'Coalition restraint and democratic continuity support safeguards, with conflict-area accountability still limited.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'gujral-security-1997',
    termId: 'gujral-1997',
    confidence: 'low',
    summary:
      'Gujral’s principal strength was regional diplomacy and strategic restraint; the short term offered limited operational-security evidence and no durable settlement of core conflicts.',
    sourceIds: ['idsa-gujral-doctrine', 'britannica-modern-india'],
    scores: [5.5, 6, 5.5, 7, 6.5],
    rationales: [
      'Counterterrorism institutions and outcomes were largely inherited during the brief term.',
      'Regional restraint reduced some diplomatic friction but did not resolve Pakistan or China security disputes.',
      'Internal insurgencies continued with limited term-specific improvement.',
      'The Gujral Doctrine expanded diplomatic trust-building and regional freedom of action.',
      'Coalition democracy and restraint support safeguards, while conflict-area rights and accountability remained incomplete.',
    ],
  }),
  historicalSecurityAssessment({
    id: 'vajpayee-security-1998',
    termId: 'vajpayee-1998',
    confidence: 'medium',
    summary:
      'Nuclear tests, Kargil management, military modernisation, and later diplomacy are major strengths, offset by IC-814, the Parliament attack, continued terrorism, POTA concerns, and the 2002 protection failure.',
    sourceIds: ['dae-pokhran', 'britannica-modern-india', 'nhrc-gujarat-2002'],
    scores: [6, 8, 5.5, 8, 5.5],
    rationales: [
      'The term faced IC-814 and the Parliament attack and improved capacity unevenly; prevention and hostage-management failures remain substantial.',
      'Kargil was managed with military resilience and diplomatic support, while nuclearisation increased deterrence and regional risk.',
      'Kashmir pressure persisted and the 2002 Gujarat violence was a grave civilian-protection and Union-leadership failure.',
      'Nuclear capability, US rapprochement, military investment, and strategic diplomacy materially increased autonomy.',
      'Coalition democracy endured, but POTA, communal protection failures, and security accountability prevent a high safeguards score.',
    ],
  }),
]

export const securitySpecialistAssessments: LeaderSpecialistAssessmentSeed[] = [
  ...historicalSecurityAssessments,
  {
    id: 'manmohan-security-2004',
    termId: 'manmohan-2004',
    topicId: 'national-security',
    confidence: 'medium',
    status: 'reviewed',
    summary:
      'The record combines a severe urban-terror and 26/11 preparedness failure with large inherited-term declines in J&K violence, the beginning of the later LWE decline, and durable post-26/11 institutions. Strategic autonomy improved through the civil-nuclear opening, while operational response remained restrained and uneven.',
    assessmentAsOf: assessedAt,
    sourceIds: [
      'mha-annual-report-2008-09',
      'mha-annual-report-2013-14',
      'nia-act-2008',
      'britannica-modern-india',
    ],
    scores: [
      {
        dimensionId: 'security-counterterrorism',
        score: 5.2,
        rationale:
          'Repeated urban attacks and 26/11 expose major prevention and response failures. NIA, UAPA changes, NSG hubs, coastal-security review, and later investigation capacity are substantial corrective reforms rather than proof that the earlier failures were avoided.',
      },
      {
        dimensionId: 'security-border-defence',
        score: 6,
        rationale:
          'India avoided a major interstate war and managed escalation after 26/11, but restraint did not produce a durable reduction in Pakistan-based attack capability and border preparedness remained mixed.',
      },
      {
        dimensionId: 'security-internal-conflict',
        score: 6.5,
        rationale:
          'Official data show J&K terrorist incidents falling from 1,990 in 2005 to 170 in 2013, Northeast incidents declining from the late-2000s peak, and the LWE decline beginning in 2011. These gains were shared with states, security forces, prior policy, and local political processes.',
      },
      {
        dimensionId: 'security-strategic-autonomy',
        score: 7.2,
        rationale:
          'The civil-nuclear opening, wider partnerships, economic integration, and diplomatic restraint expanded India’s options, though defence procurement dependence and slow execution remained important constraints.',
      },
      {
        dimensionId: 'security-safeguards',
        score: 6.5,
        rationale:
          'The wider institutional environment preserved stronger checks than the later period, but UAPA expansion, AFSPA-era abuses, insurgency practices, and weak accountability prevent a high safeguards score.',
      },
    ],
  },
  {
    id: 'modi-security-2014',
    termId: 'modi-2014',
    topicId: 'national-security',
    confidence: 'medium',
    status: 'reviewed',
    summary:
      'Operational security is a comparative strength: LWE and most Northeast insurgency indicators fell substantially, India demonstrated greater willingness to retaliate across the border, and defence-industrial and semiconductor capability expanded. Major prevention failures, the China border shock, Manipur, and weaker safeguards keep the rights-adjusted result materially lower.',
    assessmentAsOf: semiconductorAssessedAt,
    sourceIds: [
      'mha-annual-report-2013-14',
      'mha-annual-report-2024-25',
      'pib-surgical-strikes-2016',
      'ap-kashmir-standoff-2019',
      'mea-balakot-2019',
      'ap-galwan-2020',
      'mea-ladakh-agreement-2024',
      'ap-ladakh-disengagement-2024',
      'mod-dap-2020',
      'pib-defence-exports-2026',
      'pib-semicon-india-2021',
      'pib-semiconductor-status-2026',
      'tata-asml-dholera-2026',
      'ap-pahalgam-2025',
      'supreme-court-manipur-2023',
    ],
    scores: [
      {
        dimensionId: 'security-counterterrorism',
        score: 7.2,
        rationale:
          'Stronger investigation, terror-finance pressure, intelligence capacity, and overt retaliation raise the score. Uri, Pulwama, and Pahalgam remain major prevention failures, and public evidence does not prove that every announced strike produced lasting deterrence.',
      },
      {
        dimensionId: 'security-border-defence',
        score: 6.4,
        rationale:
          'Border infrastructure, Doklam management, cross-border response capacity, and the 2024 Ladakh disengagement are strengths. Galwan deaths, the scale and duration of the China standoff, and unresolved territorial and force-posture costs prevent a high score.',
      },
      {
        dimensionId: 'security-internal-conflict',
        score: 6.8,
        rationale:
          'MHA reports a 52% fall in LWE incidents and a fall in resulting deaths from 397 in 2013 to 150 in 2024; Northeast incidents fell 64% from 2014, with civilian and security-force deaths down about 86% and 85%. The decline began before 2014, and prolonged Manipur violence is a severe counterweight.',
      },
      {
        dimensionId: 'security-strategic-autonomy',
        score: 7.8,
        rationale:
          'Defence acquisition reform, domestic production, diversified partnerships, record official defence exports, and verified semiconductor assembly and test production expanded capability and freedom of action. The front-end fab remains unfinished, and import dependence, procurement delays, and uncertain battlefield conversion limit the score.',
      },
      {
        dimensionId: 'security-safeguards',
        score: 4.6,
        rationale:
          'Security restrictions, prolonged internet shutdowns, broad detention and association powers, weak transparency, and slow Union intervention in Manipur reduce the score. Courts, elections, and later restoration steps provided partial checks rather than eliminating the concern.',
      },
    ],
  },
]

const policyDimensions = [
  'problem-design',
  'effectiveness',
  'implementation',
  'rights-inclusion',
  'durability-side-effects',
] as const

const securityPolicyComponents: Record<string, Array<number>> = {
  'nia-security-reforms-2008': [8.5, 7.5, 7.5, 6, 8],
  'lwe-national-action-plan-2015': [8.5, 8.5, 8, 6, 8],
  'defence-indigenisation-2020': [8, 7, 7.5, 6.5, 7.5],
}

function policyRating(id: string) {
  const weights = [0.2, 0.3, 0.2, 0.15, 0.15]
  return (
    Math.round(
      securityPolicyComponents[id].reduce(
        (sum, score, index) => sum + score * weights[index],
        0,
      ) * 10,
    ) / 10
  )
}

export const securityPolicies: PolicySeed[] = [
  {
    id: 'nia-security-reforms-2008',
    jurisdictionId: 'india',
    leaderTermId: 'manmohan-2004',
    title: 'National Investigation Agency and post-26/11 security reforms',
    shortTitle: 'NIA and coastal-security reforms',
    policyType: 'counterterrorism',
    introducedDate: '2008-12-16',
    enactedDate: '2008-12-31',
    effectiveDate: '2008-12-31',
    status: 'enacted',
    coverageStatus: 'reviewed',
    summary:
      'Created the NIA and paired it with UAPA changes, NSG hubs, coastal-security review, intelligence coordination, and first-responder reforms after the Mumbai attacks.',
    intendedGoal:
      'Create durable national investigation and response capacity for terrorism while closing intelligence, maritime, and rapid-response gaps exposed by 26/11.',
    ratingScore: policyRating('nia-security-reforms-2008'),
    ratingConfidence: 'medium',
    ratingSummary:
      'A durable and necessary institutional correction after a catastrophic failure, reduced by federal and due-process concerns and incomplete evidence that implementation closed every prevention gap.',
    assessmentAsOf: assessedAt,
    sourceIds: [
      'nia-act-2008',
      'mha-annual-report-2008-09',
      'britannica-modern-india',
    ],
  },
  {
    id: 'lwe-national-action-plan-2015',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'National Policy and Action Plan to Address Left Wing Extremism',
    shortTitle: 'LWE national action plan',
    policyType: 'internal-security',
    introducedDate: '2015-05-01',
    effectiveDate: '2015-05-01',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Combined security operations, intelligence, state capacity, roads, telecom, local services, rights and entitlements, surrender, and rehabilitation measures.',
    intendedGoal:
      'Reduce Maoist violence and geographic control while expanding state presence, infrastructure, rights, and economic opportunity in affected districts.',
    ratingScore: policyRating('lwe-national-action-plan-2015'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Strong reported reductions in violence, deaths, and geographic spread support a high rating, with shared state attribution and continuing tribal-rights, civilian-protection, and transparency risks.',
    assessmentAsOf: assessedAt,
    sourceIds: ['mha-annual-report-2013-14', 'mha-annual-report-2024-25'],
  },
  {
    id: 'defence-indigenisation-2020',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Defence Acquisition Procedure 2020 and indigenisation drive',
    shortTitle: 'Defence indigenisation',
    policyType: 'defence-industrial-policy',
    introducedDate: '2020-09-28',
    effectiveDate: '2020-10-01',
    status: 'executive-action',
    coverageStatus: 'reviewed',
    summary:
      'Reworked acquisition categories and domestic-content preferences alongside indigenisation lists, production incentives, export promotion, and private-sector participation.',
    intendedGoal:
      'Build domestic defence capacity, reduce vulnerable import dependence, speed acquisition, support exports, and preserve strategic freedom of action.',
    ratingScore: policyRating('defence-indigenisation-2020'),
    ratingConfidence: 'medium',
    ratingSummary:
      'Domestic production and exports expanded substantially, but procurement delay, import dependence, cost, quality, and readiness conversion remain material evidence gaps.',
    assessmentAsOf: assessedAt,
    sourceIds: ['mod-dap-2020', 'pib-defence-exports-2026'],
  },
]

const securityPolicyRationales: Record<string, string[]> = {
  'nia-security-reforms-2008': [
    'Directly addressed national investigation, intelligence, coastal-security, and rapid-response gaps exposed by 26/11.',
    'NIA, NSG hubs, and coastal-security capacity endured and improved the institutional response, though prevention outcomes cannot be attributed to one law.',
    'The response was enacted quickly and built durable organisations, while coordination and local-police capacity remained uneven.',
    'Terrorism investigation is legitimate, but broad central powers and UAPA procedure create federal and due-process concerns.',
    'The NIA became a durable national institution and the coastal-security architecture expanded beyond the immediate crisis.',
  ],
  'lwe-national-action-plan-2015': [
    'Correctly treated LWE as a combined security, governance, infrastructure, rights, and development problem.',
    'Officially reported incidents fell about 52% and resulting civilian/security-force deaths fell from 397 in 2013 to 150 in 2024, with geographic spread also shrinking.',
    'Union-state coordination, security camps, intelligence, roads, telecom, surrender, and district support scaled substantially.',
    'The policy formally includes rights and entitlements, but coercion, displacement, tribal land, civilian harm, and opaque operations remain serious risks.',
    'The framework persisted and its security-development architecture is durable, although continued gains depend on state governance and legitimate local institutions.',
  ],
  'defence-indigenisation-2020': [
    'Import dependence and slow acquisition are genuine readiness and strategic-autonomy problems.',
    'Official production and export values rose substantially, but export totals do not prove import independence or battlefield readiness.',
    'Domestic-content categories, lists, procurement changes, and industry participation created scale, while delay and complex acquisition remain persistent.',
    'Industrial expansion can broaden capability and employment, but secrecy, competition, value-for-money, and land or labour impacts require scrutiny.',
    'The strategy has persisted across budgets and procurement cycles, though its long-run readiness and cost effects remain incomplete.',
  ],
}

export const securityPolicyScores: PolicyScoreSeed[] = Object.entries(
  securityPolicyComponents,
).flatMap(([policyId, scores]) =>
  scores.map((score, index) => ({
    policyId,
    dimensionId: policyDimensions[index],
    score,
    rationale: securityPolicyRationales[policyId][index],
  })),
)

export const securityEvents: EventSeed[] = [
  {
    id: 'nia-reforms-2008',
    jurisdictionId: 'india',
    date: '2008-12-31',
    title: 'NIA created and post-26/11 security reforms accelerated',
    summary:
      'Parliament enacted the NIA Act and the government expanded NSG hubs, coastal-security review, intelligence coordination, and terrorism law after the Mumbai attacks.',
    significance:
      'A major corrective institutional response to an earlier prevention and emergency-response failure.',
    category: 'security',
    confidence: 'high',
    sourceIds: ['nia-act-2008', 'mha-annual-report-2008-09'],
    leaderTermIds: ['manmohan-2004'],
  },
  {
    id: 'uri-attack-2016',
    jurisdictionId: 'india',
    date: '2016-09-18',
    title: 'Uri army-base attack',
    summary:
      'Militants attacked an Indian Army brigade headquarters near Uri, killing 19 Indian soldiers.',
    significance:
      'A major protection and intelligence failure that directly preceded India’s announced cross-LoC surgical strikes.',
    category: 'security',
    confidence: 'high',
    sourceIds: ['pib-surgical-strikes-2016', 'mha-annual-report-2024-25'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'surgical-strikes-2016',
    jurisdictionId: 'india',
    date: '2016-09-29',
    title: 'India announces cross-LoC surgical strikes',
    summary:
      'India announced that Army units struck launch pads across the Line of Control after the Uri attack.',
    significance:
      'Marked a more public retaliatory posture, while the scale of damage and lasting deterrent effect remained contested.',
    category: 'security',
    confidence: 'medium',
    sourceIds: ['pib-surgical-strikes-2016'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'pulwama-attack-2019',
    jurisdictionId: 'india',
    date: '2019-02-14',
    title: 'Pulwama suicide bombing',
    summary:
      'A suicide bombing against a CRPF convoy in Jammu and Kashmir killed 40 personnel.',
    significance:
      'A major route-security and intelligence failure that triggered the Balakot strike and a dangerous India-Pakistan aerial crisis.',
    category: 'security',
    confidence: 'high',
    sourceIds: ['ap-kashmir-standoff-2019', 'mha-annual-report-2024-25'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'balakot-strike-2019',
    jurisdictionId: 'india',
    date: '2019-02-26',
    endDate: '2019-02-28',
    title: 'Balakot strike and India-Pakistan aerial crisis',
    summary:
      'Indian aircraft struck near Balakot after Pulwama; Pakistan responded, aerial combat followed, and an Indian pilot was captured and returned.',
    significance:
      'Demonstrated willingness to retaliate beyond the Line of Control but also created escalation, verification, and crisis-control risks.',
    category: 'security',
    confidence: 'medium',
    sourceIds: ['mea-balakot-2019', 'ap-kashmir-standoff-2019'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'galwan-ladakh-crisis-2020',
    jurisdictionId: 'india',
    date: '2020-06-15',
    endDate: '2024-10-30',
    title: 'Galwan clash and prolonged Ladakh border standoff',
    summary:
      'Twenty Indian soldiers died in the Galwan Valley clash during a large China-India border confrontation; a later 2024 arrangement restored patrolling and disengagement at two final sites.',
    significance:
      'Exposed severe intelligence, preparedness, territorial, force-posture, and escalation costs despite later infrastructure, deployment, and diplomatic recovery.',
    category: 'security',
    confidence: 'high',
    sourceIds: [
      'ap-galwan-2020',
      'mea-ladakh-agreement-2024',
      'ap-ladakh-disengagement-2024',
    ],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'internal-security-trends-2024',
    jurisdictionId: 'india',
    date: '2024-12-31',
    title: 'LWE and most Northeast insurgency indicators reach much lower levels',
    summary:
      'MHA reported LWE incidents 52% below 2013 and resulting deaths down from 397 to 150; Northeast incidents were 64% below 2014, with civilian and security-force deaths down about 86% and 85%.',
    significance:
      'A major operational-security gain with shared Union-state and pre-2014 attribution, partly offset by the severe 2023-2024 Manipur conflict.',
    category: 'security',
    confidence: 'high',
    sourceIds: ['mha-annual-report-2013-14', 'mha-annual-report-2024-25'],
    leaderTermIds: ['modi-2014'],
  },
  {
    id: 'defence-exports-record-2026',
    jurisdictionId: 'india',
    date: '2026-03-31',
    title: 'Defence exports reach a record official level',
    summary:
      'The Ministry of Defence reported FY 2025-26 defence exports of Rs 38,424 crore, up sharply from the 2013-14 baseline.',
    significance:
      'Evidence of expanded defence-industrial scale, while export value alone does not prove readiness or import independence.',
    category: 'security',
    confidence: 'high',
    sourceIds: ['pib-defence-exports-2026', 'mod-dap-2020'],
    leaderTermIds: ['modi-2014'],
  },
]

export const securityEventAssessments: EventAssessmentSeed[] = [
  {
    eventId: 'nia-reforms-2008',
    choiceAssessment: 'mostly-right',
    choiceScore: 7.6,
    choiceReason:
      'Creating durable national investigation and coastal-response capacity was a necessary correction after 26/11, though centralisation and due-process safeguards required continuing scrutiny.',
    unionRole:
      'The Manmohan Singh government and Parliament designed and enacted the NIA and related national reforms.',
    stateLocalRole:
      'States retained frontline policing, intelligence, prosecution, and coastal implementation responsibilities.',
    positiveOutcomes:
      'NIA, NSG hubs, maritime review, and stronger coordination became durable parts of the security architecture.',
    lessons:
      'Corrective institutions should be evaluated separately from the failure that made them necessary and should include federal, judicial, and rights safeguards.',
    confidence: 'high',
    assessmentAsOf: assessedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'Manmohan Singh government and Parliament',
        responsibilityKind: 'positive-leadership',
        level: 4,
        assessment: 'Created durable corrective institutions after the Mumbai attacks.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'State police and coastal administrations',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Controlled much of the frontline implementation and local readiness.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'uri-attack-2016',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The attack was terrorism, not a government choice; accountability concerns prevention, base protection, intelligence, and the response.',
    unionRole:
      'The Union government, Army, and intelligence institutions bore national-security and force-protection responsibility.',
    stateLocalRole:
      'The Jammu and Kashmir administration and local security apparatus supported area intelligence, logistics, and emergency response.',
    positiveOutcomes:
      'The attack prompted a security review and a clearer public response doctrine; those are corrective outcomes, not benefits of the attack.',
    lessons:
      'High-value military sites require layered protection, intelligence conversion, and candid after-action review.',
    confidence: 'high',
    assessmentAsOf: assessedAt,
    responsibilities: [
      {
        actorType: 'non-state-group',
        actorName: 'Uri attackers and organisers',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Planned and executed the attack.',
        confidence: 'high',
      },
      {
        actorType: 'institution',
        actorName: 'Union military and intelligence institutions',
        responsibilityKind: 'failure-to-prevent',
        level: 3,
        assessment: 'Failed to prevent a mass-casualty attack on a major Army base.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'surgical-strikes-2016',
    choiceAssessment: 'mostly-right',
    choiceScore: 7,
    choiceReason:
      'A limited response to an attack on a military base had a defensible deterrence rationale, but operational effects and durable deterrence were not independently established.',
    unionRole:
      'The Modi government and military leadership authorised, executed, and publicly framed the operation.',
    stateLocalRole:
      'State governments had no control over the cross-border military decision.',
    positiveOutcomes:
      'India demonstrated response capacity and imposed some operational cost while avoiding a prolonged conventional conflict.',
    lessons:
      'Retaliation should pair verifiable objectives with escalation control, force protection, and honest post-operation evidence.',
    confidence: 'medium',
    assessmentAsOf: assessedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'Modi government and Indian Army leadership',
        responsibilityKind: 'policy-decision',
        level: 5,
        assessment: 'Authorised and executed the cross-LoC operation.',
        confidence: 'high',
      },
      {
        actorType: 'non-state-group',
        actorName: 'Cross-border militant launch networks',
        responsibilityKind: 'shared-context',
        level: 5,
        assessment: 'Created the immediate security context through the Uri attack and continuing infiltration threat.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'pulwama-attack-2019',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The bombing was terrorism, not a policy choice; government accountability concerns intelligence, convoy procedure, route security, and prevention.',
    unionRole:
      'The Union government, CRPF, and intelligence institutions bore primary convoy and counterterrorism responsibility.',
    stateLocalRole:
      'Jammu and Kashmir police and local administration had supporting intelligence, route, and emergency-response roles.',
    positiveOutcomes:
      'The attack produced investigation, procedural review, and national scrutiny; these are corrective responses, not benefits of the deaths.',
    lessons:
      'Large convoy movement in a high-threat environment requires adaptive routing, local intelligence, blast protection, and accountable review.',
    confidence: 'high',
    assessmentAsOf: assessedAt,
    responsibilities: [
      {
        actorType: 'non-state-group',
        actorName: 'Pulwama attacker and organisers',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Planned and executed the suicide bombing.',
        confidence: 'high',
      },
      {
        actorType: 'institution',
        actorName: 'Union security and intelligence institutions',
        responsibilityKind: 'failure-to-prevent',
        level: 3,
        assessment: 'Failed to prevent a mass-casualty attack on a known convoy route.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'balakot-strike-2019',
    choiceAssessment: 'mixed',
    choiceScore: 6.5,
    choiceReason:
      'The response had a defensible counterterrorism rationale and demonstrated reach, but contested damage, aerial escalation, and the captured pilot show substantial execution and escalation risk.',
    unionRole:
      'The Modi government and military leadership chose the target, authorised the strike, managed escalation, and made public claims.',
    stateLocalRole:
      'State governments had no material role in the cross-border decision.',
    positiveOutcomes:
      'India demonstrated willingness and capability to strike beyond the Line of Control and the crisis ended without a sustained war.',
    lessons:
      'Cross-border coercion needs independently testable objectives, escalation planning, force-protection readiness, and precise public communication.',
    confidence: 'medium',
    assessmentAsOf: assessedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'Modi government and Indian military leadership',
        responsibilityKind: 'policy-decision',
        level: 5,
        assessment: 'Authorised the Balakot operation and owned the escalation strategy.',
        confidence: 'high',
      },
      {
        actorType: 'foreign-state',
        actorName: 'Pakistan military and air-defence institutions',
        responsibilityKind: 'direct-action',
        level: 4,
        assessment: 'Conducted the retaliatory aerial operation and captured an Indian pilot.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'galwan-ladakh-crisis-2020',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'The border confrontation and clash were not a single Indian policy choice; accountability spans Chinese actions, Indian assumptions and preparedness, force protection, negotiation, and later recovery.',
    unionRole:
      'The Modi government, military, intelligence, and diplomatic leadership bore responsibility for preparedness, deployment, negotiation, and communicating territorial outcomes.',
    stateLocalRole:
      'Ladakh’s local administration supported civilian logistics but did not control national border strategy.',
    positiveOutcomes:
      'India expanded deployment and infrastructure and later secured disengagement and patrolling arrangements at the final two sites; these did not erase the deaths or strategic costs.',
    lessons:
      'Border confidence mechanisms require verified compliance, intelligence challenge, logistics depth, force-protection rules, and transparent strategic accounting.',
    confidence: 'high',
    assessmentAsOf: assessedAt,
    responsibilities: [
      {
        actorType: 'foreign-state',
        actorName: 'Government of China and People’s Liberation Army',
        responsibilityKind: 'direct-action',
        level: 5,
        assessment: 'Took actions that produced the confrontation and deadly clash in disputed border areas.',
        confidence: 'medium',
      },
      {
        actorType: 'institution',
        actorName: 'Indian national-security leadership',
        responsibilityKind: 'failure-to-prevent',
        level: 3,
        assessment: 'Failed to prevent a deadly clash and prolonged high-cost standoff despite border mechanisms and intelligence responsibilities.',
        confidence: 'medium',
      },
      {
        actorType: 'union-government',
        actorName: 'Indian diplomatic and military leadership',
        responsibilityKind: 'positive-leadership',
        level: 3,
        assessment: 'Sustained deployment and negotiations that produced later disengagement arrangements.',
        confidence: 'medium',
      },
    ],
  },
  {
    eventId: 'internal-security-trends-2024',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'A multi-year security trend is not one policy decision; the improvement reflects Union and state operations, development, surrender, local politics, inherited trends, and changing armed-group capacity.',
    unionRole:
      'The Modi government funded, coordinated, and adapted national LWE and Northeast security-development policy.',
    stateLocalRole:
      'Affected state governments and police controlled much frontline security, governance, rehabilitation, land, and service delivery.',
    positiveOutcomes:
      'Officially reported violence, deaths, and geographic spread fell substantially in LWE areas and most of the Northeast.',
    lessons:
      'Security gains are more durable when operational pressure is paired with rights, local legitimacy, roads, telecom, public services, surrender, and political settlement.',
    confidence: 'high',
    assessmentAsOf: assessedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'Modi government and Union Home Ministry',
        responsibilityKind: 'positive-leadership',
        level: 4,
        assessment: 'Expanded and coordinated the national security-development strategy.',
        confidence: 'high',
      },
      {
        actorType: 'state-government',
        actorName: 'Affected state governments and police',
        responsibilityKind: 'positive-leadership',
        level: 4,
        assessment: 'Delivered much frontline security, administration, negotiation, and local development.',
        confidence: 'high',
      },
      {
        actorType: 'structural',
        actorName: 'Pre-2014 decline and long-running peace processes',
        responsibilityKind: 'shared-context',
        level: 3,
        assessment: 'The LWE decline began in 2011 and several Northeast settlements and trends span governments.',
        confidence: 'high',
      },
    ],
  },
  {
    eventId: 'defence-exports-record-2026',
    choiceAssessment: 'not-a-policy-choice',
    choiceReason:
      'An annual export outcome is not itself a policy choice; it is evidence relevant to the longer defence-industrial strategy.',
    unionRole:
      'The Modi government controlled acquisition policy, export promotion, licensing, public-sector direction, and much defence-industrial investment.',
    stateLocalRole:
      'States supported industrial corridors, land, skills, and local manufacturing but did not control national procurement or export policy.',
    positiveOutcomes:
      'The official export total demonstrates larger defence-industrial scale and a more diverse production base.',
    lessons:
      'Export value should be read with readiness, domestic content, import dependence, delivery, quality, competition, and value-for-money evidence.',
    confidence: 'high',
    assessmentAsOf: assessedAt,
    responsibilities: [
      {
        actorType: 'union-government',
        actorName: 'Modi government and Ministry of Defence',
        responsibilityKind: 'positive-leadership',
        level: 4,
        assessment: 'Set the procurement and export framework associated with the expansion.',
        confidence: 'high',
      },
      {
        actorType: 'corporate',
        actorName: 'Public and private defence manufacturers',
        responsibilityKind: 'implementation',
        level: 4,
        assessment: 'Converted policy, orders, and investment into production and exports.',
        confidence: 'high',
      },
    ],
  },
]

export const securityClaims: ClaimSeed[] = [
  {
    id: 'manmohan-security-decline-trends',
    jurisdictionId: 'india',
    leaderTermId: 'manmohan-2004',
    title: 'Major internal-security indicators improved before 2014',
    body:
      'MHA data show J&K terrorist incidents falling from 1,990 in 2005 to 170 in 2013, Northeast violence below its late-2000s peak, and the LWE decline beginning in 2011. This prevents a defensible claim that the UPA produced no security gains.',
    stance: 'achievement',
    category: 'security',
    confidence: 'high',
    asOfDate: assessedAt,
    sourceIds: ['mha-annual-report-2013-14'],
  },
  {
    id: 'manmohan-post2611-reforms',
    jurisdictionId: 'india',
    leaderTermId: 'manmohan-2004',
    eventId: 'nia-reforms-2008',
    policyId: 'nia-security-reforms-2008',
    title: 'Post-26/11 institutions were durable corrections',
    body:
      'The NIA, NSG hubs, coastal-security review, UAPA changes, and stronger coordination created lasting national capacity, although they followed a catastrophic failure rather than preventing it.',
    stance: 'achievement',
    category: 'security',
    confidence: 'high',
    asOfDate: assessedAt,
    sourceIds: ['nia-act-2008', 'mha-annual-report-2008-09'],
  },
  {
    id: 'manmohan-urban-terror-failures',
    jurisdictionId: 'india',
    leaderTermId: 'manmohan-2004',
    eventId: 'mumbai-attacks-2008',
    title: 'The urban terror wave and 26/11 were grave failures',
    body:
      'Repeated mass-casualty attacks culminated in 26/11, exposing intelligence conversion, coastal protection, equipment, command, and emergency-response weaknesses.',
    stance: 'concern',
    category: 'security',
    confidence: 'high',
    asOfDate: assessedAt,
    sourceIds: ['mha-annual-report-2008-09', 'britannica-modern-india'],
  },
  {
    id: 'modi-lwe-northeast-security',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'internal-security-trends-2024',
    policyId: 'lwe-national-action-plan-2015',
    title: 'LWE and most Northeast security indicators improved sharply',
    body:
      'Official data report LWE incidents 52% below 2013, deaths down from 397 to 150, and Northeast incidents 64% below 2014 with much lower civilian and security-force deaths. Shared state and inherited-trend attribution still applies.',
    stance: 'achievement',
    category: 'security',
    confidence: 'high',
    asOfDate: assessedAt,
    sourceIds: ['mha-annual-report-2013-14', 'mha-annual-report-2024-25'],
  },
  {
    id: 'modi-retaliation-capacity',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'A more assertive and visible retaliation posture',
    body:
      'The 2016 surgical strikes, 2019 Balakot strike, and 2025 Operation Sindoor demonstrated willingness and capability to respond across the border, while lasting deterrence and some damage claims remain contested.',
    stance: 'achievement',
    category: 'security',
    confidence: 'medium',
    asOfDate: assessedAt,
    sourceIds: [
      'pib-surgical-strikes-2016',
      'mea-balakot-2019',
      'ap-kashmir-standoff-2019',
      'mea-operation-sindoor-2025',
      'ap-india-pakistan-ceasefire-2025',
    ],
  },
  {
    id: 'modi-defence-capability',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    eventId: 'defence-exports-record-2026',
    policyId: 'defence-indigenisation-2020',
    title: 'Defence-industrial scale and exports expanded',
    body:
      'Acquisition reform, domestic-content policy, public and private production, and export promotion were followed by a record official FY 2025-26 export total. Readiness and import dependence require separate evidence.',
    stance: 'achievement',
    category: 'security',
    confidence: 'high',
    asOfDate: assessedAt,
    sourceIds: ['mod-dap-2020', 'pib-defence-exports-2026'],
  },
  {
    id: 'modi-security-prevention-border-costs',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Major attacks and the China border shock limit the security score',
    body:
      'Uri, Pulwama, and Pahalgam were major prevention failures; Galwan killed 20 Indian soldiers and led to a prolonged, costly Ladakh standoff; Manipur exposed severe internal-conflict and Union-response weakness.',
    stance: 'concern',
    category: 'security',
    confidence: 'high',
    asOfDate: assessedAt,
    sourceIds: [
      'ap-kashmir-standoff-2019',
      'ap-galwan-2020',
      'ap-pahalgam-2025',
      'supreme-court-manipur-2023',
    ],
  },
  {
    id: 'modi-security-inherited-trends',
    jurisdictionId: 'india',
    leaderTermId: 'modi-2014',
    title: 'Some security improvement began before 2014',
    body:
      'The LWE decline began in 2011, J&K violence had already fallen dramatically from its 2005 level, and Northeast peace processes span governments. Modi receives consolidation and policy credit, not sole causal ownership.',
    stance: 'context',
    category: 'security',
    confidence: 'high',
    asOfDate: assessedAt,
    sourceIds: ['mha-annual-report-2013-14', 'mha-annual-report-2024-25'],
  },
]
