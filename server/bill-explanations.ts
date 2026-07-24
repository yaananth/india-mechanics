import type {
  BillDocumentExtractSeed,
  BillExplanationSeed,
  PolicyRegisterSeed,
} from './types.ts'

export const billExplanationMethodologyVersion = 'bill-explanation-v0.1'

type PolicyBasis = 'design' | 'retrospective'

type ExplanationContext = {
  document?: BillDocumentExtractSeed
  assessmentAsOf: string
  linkedPolicyBasis?: PolicyBasis
}

type DomainProfile = {
  matches: RegExp
  affectedGroups: string[]
  potentialBenefits: string
  potentialRisks: string
}

const domainProfiles: DomainProfile[] = [
  {
    matches:
      /\b(election|representation of the people|delimitation|constituenc|legislative assembly|parliament)\b/i,
    affectedGroups: [
      'Voters and constituencies',
      'States and Union territories',
      'Election authorities, candidates, and political parties',
    ],
    potentialBenefits:
      'Could improve representational fairness or election administration if the rules, data, and safeguards are transparent and constitutionally sound.',
    potentialRisks:
      'Could redistribute political representation, disadvantage particular regions or groups, or weaken trust if formulas, boundaries, or review safeguards are contested.',
  },
  {
    matches:
      /\b(criminal|penal|police|terror|security|armed forces|armed police|prevention of corruption|evidence|procedure)\b/i,
    affectedGroups: [
      'Victims and accused persons',
      'Police, prosecutors, and courts',
      'People subject to investigation or enforcement',
    ],
    potentialBenefits:
      'Could improve enforcement, legal clarity, or access to justice if powers and procedures address a demonstrated gap.',
    potentialRisks:
      'Could expand coercive power, reduce due process, or create uneven enforcement if offences, penalties, discretion, and remedies are not proportionate.',
  },
  {
    matches:
      /\b(labour|worker|employment|wage|apprentice|industrial relations|factories|trade union)\b/i,
    affectedGroups: [
      'Workers and jobseekers',
      'Employers and contractors',
      'Labour departments and adjudicatory bodies',
    ],
    potentialBenefits:
      'Could improve worker protection, formal employment, or compliance clarity if obligations and remedies are workable.',
    potentialRisks:
      'Could weaken protections, raise hiring or compliance costs, or exclude informal workers if coverage and enforcement are poorly designed.',
  },
  {
    matches:
      /\b(health|medical|medicine|drug|dentist|nursing|hospital|mental health|transgender|disability)\b/i,
    affectedGroups: [
      'Patients and eligible beneficiaries',
      'Health professionals and providers',
      'Regulators and public-health agencies',
    ],
    potentialBenefits:
      'Could improve access, standards, safety, or professional accountability if the framework is evidence-based and enforceable.',
    potentialRisks:
      'Could restrict access, create weak or duplicative regulation, or impose unequal burdens if eligibility, powers, and capacity are unclear.',
  },
  {
    matches:
      /\b(education|university|institute|school|teacher|student|academic)\b/i,
    affectedGroups: [
      'Students and families',
      'Teachers, researchers, and staff',
      'Educational institutions, regulators, and funders',
    ],
    potentialBenefits:
      'Could expand educational capacity, quality, recognition, or governance if funding and accountability are credible.',
    potentialRisks:
      'Could create cost, access, autonomy, or duplication problems if powers, admissions, standards, and financing are weakly specified.',
  },
  {
    matches:
      /\b(bank|financial|company|corporate|securit|insurance|insolvency|tax|duty|cess|gst|income-tax|customs|excise|foreign exchange)\b/i,
    affectedGroups: [
      'Taxpayers, firms, and investors',
      'Consumers, workers, and creditors',
      'Financial, tax, and market regulators',
    ],
    potentialBenefits:
      'Could improve revenue, market functioning, investment, or compliance if the design is clear, proportionate, and administratively workable.',
    potentialRisks:
      'Could create unequal incidence, fiscal cost, compliance complexity, or regulatory arbitrage if rates, exemptions, powers, and transitions are poorly designed.',
  },
  {
    matches:
      /\b(forest|wildlife|environment|pollution|mine|mineral|petroleum|land|water|river|energy|electricity)\b/i,
    affectedGroups: [
      'Local communities and landholders',
      'Operators, investors, and workers',
      'Environmental and sector regulators',
    ],
    potentialBenefits:
      'Could improve stewardship, infrastructure, supply, or regulatory clarity if environmental and community safeguards are effective.',
    potentialRisks:
      'Could cause ecological damage, displacement, concentrated gains, or long-run liabilities if consent, compensation, monitoring, and enforcement are weak.',
  },
  {
    matches:
      /\b(road|railway|shipping|port|aviation|motor vehicle|transport|highway|inland vessel)\b/i,
    affectedGroups: [
      'Passengers, freight users, and operators',
      'Workers and transport businesses',
      'Landholders, local communities, and safety regulators',
    ],
    potentialBenefits:
      'Could improve connectivity, safety, capacity, or logistics if investment and operating standards address a demonstrated need.',
    potentialRisks:
      'Could create safety, land, environmental, fiscal, or monopoly risks if acquisition, financing, maintenance, and oversight are weak.',
  },
  {
    matches:
      /\b(citizenship|reservation|scheduled caste|scheduled tribe|minority|women|child|rights|rehabilitation|welfare|social security)\b/i,
    affectedGroups: [
      'Eligible or excluded individuals and families',
      'Public agencies and service providers',
      'Communities affected by eligibility or protection rules',
    ],
    potentialBenefits:
      'Could widen protection, recognition, representation, or access if eligibility and delivery are inclusive and workable.',
    potentialRisks:
      'Could exclude similarly situated groups, create unequal treatment, or fail in delivery if definitions, procedure, and remedies are weak.',
  },
]

const defaultProfile: DomainProfile = {
  matches: /.*/,
  affectedGroups: [
    'People and institutions governed by the named law',
    'The responsible ministry, regulator, or public authority',
  ],
  potentialBenefits:
    'Could solve the stated legal or administrative problem if the clauses are coherent, proportionate, and implementable.',
  potentialRisks:
    'Could create unintended legal, fiscal, rights, or implementation costs if the problem, powers, safeguards, and transition are not well designed.',
}

function cleanTitle(title: string) {
  return title.replace(/\s+/g, ' ').replace(/\.$/, '').trim()
}

function subjectFromTitle(title: string) {
  return cleanTitle(title)
    .replace(/^THE\s+/i, '')
    .replace(/,\s*\d{4}$/i, '')
    .replace(/\s+BILL(?:,\s*\d{4})?$/i, '')
    .replace(/\s*\(AMENDMENT\)$/i, '')
    .replace(/\s+AMENDMENT$/i, '')
    .trim()
}

function sentence(value: string) {
  const cleaned = value.replace(/\s+/g, ' ').trim()
  if (!cleaned) return cleaned
  return /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`
}

function officialPurposeSummary(purpose: string) {
  const cleaned = purpose
    .split(/\bWHEREAS\b/i)[0]
    .replace(/^[\s:;-]+/, '')
    .replace(/^to\s+/i, '')
    .replace(/^further to\s+/i, 'further ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!cleaned) return ''
  const summary = `Would ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`
  if (summary.length <= 760) return sentence(summary)
  const shortened = summary.slice(0, 760)
  const boundary = Math.max(
    shortened.lastIndexOf('; '),
    shortened.lastIndexOf(', '),
  )
  return `${shortened.slice(0, boundary > 520 ? boundary : 760).trim()}...`
}

function usableExtract(value?: string) {
  if (!value) return undefined
  const cleaned = value
    .split(/\bWHEREAS\b/i)[0]
    .replace(/\s+/g, ' ')
    .trim()
  const letters = (cleaned.match(/[A-Za-z]/g) ?? []).length
  const suspicious = (
    cleaned.match(
      /[a-z][A-Z]|[A-Za-z][,~^`|][A-Za-z]|[A-Za-z]'[A-Za-z]{3,}|[0-9]'[0-9]/g,
    ) ?? []
  ).length
  if (cleaned.length < 24 || letters / cleaned.length < 0.55 || suspicious > 1) {
    return undefined
  }
  return cleaned
}

function titleDerivedSummary(record: PolicyRegisterSeed) {
  const title = cleanTitle(record.title)
  const subject = subjectFromTitle(title)
  if (/\bAPPROPRIATION\b/i.test(title)) {
    return `Seeks parliamentary authorisation for spending under the named ${subject.toLowerCase()} scope. The title does not reveal allocations, execution, or value for money.`
  }
  if (/^THE?\s*FINANCE(?:\s+\(NO\.\s*\d+\))?\s+BILL/i.test(title)) {
    return `Would implement fiscal or revenue changes for the named year. Exact tax rates, exemptions, spending links, and distributional effects require the bill text.`
  }
  if (/\bCONSTITUTION\b.*\bAMENDMENT\b/i.test(title)) {
    return `Would amend the Constitution through ${subject}. The title alone does not identify the affected articles, operative wording, or practical effect.`
  }
  if (/\bREPEALING AND AMENDING\b|\bREPEAL\b/i.test(title)) {
    return `Would repeal or revise provisions identified by ${subject}. The title alone does not establish that the provisions are obsolete or harmless to remove.`
  }
  if (/\bVALIDATION\b/i.test(title)) {
    return `Would validate earlier legal or administrative action concerning ${subject}. The defect being cured, retrospective effect, and affected rights require official-text review.`
  }
  if (/\b(REORGANISATION|RENAMING|DELIMITATION)\b/i.test(title)) {
    return `Would alter the named territorial, representational, or governance framework. Exact boundaries, formulas, dates, and transition rules require the official text.`
  }
  if (/\b(ACQUISITION|NATIONALISATION|TAKEOVER|TRANSFER OF UNDERTAKINGS)\b/i.test(title)) {
    return `Would transfer or regulate control of the named undertaking or assets. Compensation, governance, financing, and operating effects are not stated in the title.`
  }
  if (/\b(UNIVERSITY|INSTITUTE|AUTHORITY|BOARD|COMMISSION|CORPORATION)\b/i.test(title)) {
    return `Would establish or restructure ${subject}. Its powers, appointments, funding, accountability, and overlap with existing bodies require the clauses.`
  }
  if (/\b(CODE|CONSOLIDATION|REPLACEMENT)\b/i.test(title)) {
    return `Would create, consolidate, or replace a legal framework concerning ${subject}. Differences from existing law cannot be inferred from the title alone.`
  }
  if (/\bAMENDMENT\b/i.test(title)) {
    return `Would amend the legal framework named ${subject}. The title does not identify which provisions change or how they affect existing rights, duties, powers, or costs.`
  }
  return `A government bill concerning ${subject}. Register metadata identifies the subject and procedure, but the operative proposal requires the official text.`
}

function specificityFor(record: PolicyRegisterSeed, hasOfficialPurpose: boolean) {
  if (hasOfficialPurpose) return 'explicit' as const
  const title = cleanTitle(record.title)
  if (
    /\b(FINANCE|APPROPRIATION|CONSTITUTION.*AMENDMENT|CORPORATE LAWS|JAN VISHWAS|UNION TERRITORIES LAWS|REPEALING AND AMENDING)\b/i.test(
      title,
    )
  ) {
    return 'opaque' as const
  }
  if (/\b(AMENDMENT|REPEAL|CODE)\b/i.test(title)) {
    return 'domain-only' as const
  }
  return 'domain-only' as const
}

function profileFor(record: PolicyRegisterSeed, officialPurpose?: string) {
  const haystack = `${record.title} ${record.ministry ?? ''} ${officialPurpose ?? ''}`
  return (
    domainProfiles.find((profile) => profile.matches.test(haystack)) ??
    defaultProfile
  )
}

function curatedDelimitationExplanation(
  record: PolicyRegisterSeed,
  context: ExplanationContext,
): BillExplanationSeed | null {
  if (
    record.introducedDate !== '2026-04-16' ||
    cleanTitle(record.title).toUpperCase() !== 'THE DELIMITATION BILL, 2026'
  ) {
    return null
  }
  return {
    billId: record.id,
    proposalSummary:
      'Would create a three-member Delimitation Commission to use the latest published census figures to reallocate Lok Sabha and state-assembly seats, redraw single-member constituencies, reserve and rotate about one-third of seats for women including SC and ST women, and repeal the Delimitation Act, 2002.',
    officialPurpose:
      context.document?.officialPurpose ??
      'To readjust seat allocation in the House of the People and state and Union-territory assemblies, and to redraw their territorial constituencies.',
    governmentRationale:
      context.document?.governmentRationale ??
      'The government said current seat allocation rests on 1971 population figures, constituency division on 2001 figures, and that population change, migration, and the constitutional women-reservation provisions require a new delimitation exercise.',
    affectedGroups: [
      'Voters and constituencies',
      'States and Union territories',
      'Women, Scheduled Castes, and Scheduled Tribes',
      'Election authorities, candidates, and political parties',
    ],
    potentialBenefits:
      'Could align representation more closely with current population patterns and operationalise women reservation. Published proposals, objections, public sittings, and Election Commission and judicial membership provide procedural safeguards.',
    potentialRisks:
      'Would redistribute political power among states and regions. Using the latest census available when the Commission is formed, rotating reserved seats, and barring court challenges to final orders create high-stakes federal, continuity, and review concerns.',
    evidenceBasis: 'independent-review',
    specificity: 'explicit',
    assessmentScope: 'bill-specific',
    verdict: 'reviewed-policy',
    verdictKind: 'provisional-design',
    verdictRationale:
      'The exact bill and an independent legislative analysis were reviewed. The linked rating is a low-confidence design judgment only; the bill became infructuous before implementation, so effectiveness cannot be scored.',
    confidence: 'low',
    assessmentAsOf: context.assessmentAsOf,
    methodologyVersion: billExplanationMethodologyVersion,
    documentUrl:
      context.document?.sourceUrl ??
      record.introducedFile ??
      undefined,
    documentHash: context.document?.contentHash,
  }
}

export function deriveBillExplanation(
  record: PolicyRegisterSeed,
  context: ExplanationContext,
): BillExplanationSeed {
  const curated = curatedDelimitationExplanation(record, context)
  if (curated) return curated

  const document =
    context.document?.extractionStatus === 'official-text'
      ? context.document
      : undefined
  const officialPurpose = usableExtract(document?.officialPurpose)
  const governmentRationale = usableExtract(document?.governmentRationale)
  const profile = profileFor(record, officialPurpose)
  const linked = Boolean(record.linkedPolicyId)
  return {
    billId: record.id,
    proposalSummary:
      (officialPurpose && officialPurposeSummary(officialPurpose)) ||
      titleDerivedSummary(record),
    officialPurpose,
    governmentRationale,
    affectedGroups: profile.affectedGroups,
    potentialBenefits: profile.potentialBenefits,
    potentialRisks: profile.potentialRisks,
    evidenceBasis: linked
      ? 'independent-review'
      : document
        ? 'official-text'
        : 'title-only',
    specificity: specificityFor(record, Boolean(officialPurpose)),
    assessmentScope: linked
      ? record.linkedPolicyScope ?? 'bill-specific'
      : 'none',
    verdict: linked ? 'reviewed-policy' : 'not-assessed',
    verdictKind: linked
      ? context.linkedPolicyBasis === 'retrospective'
        ? 'retrospective'
        : 'provisional-design'
      : 'none',
    verdictRationale: linked
      ? record.linkedPolicyScope === 'policy-family'
        ? 'A broader policy-family assessment is linked. It may cover only part of this bill, so read the scope before applying the score to the whole proposal.'
        : 'This exact bill is linked to a source-backed policy assessment with disclosed component scores.'
      : 'No good-or-bad verdict is published yet. A fair judgment requires clause-level review, affected-group evidence, implementation capacity, and independent scrutiny.',
    confidence: linked ? 'medium' : document ? 'medium' : 'low',
    assessmentAsOf: context.assessmentAsOf,
    methodologyVersion: billExplanationMethodologyVersion,
    documentUrl: document?.sourceUrl,
    documentHash: document?.contentHash,
  }
}
