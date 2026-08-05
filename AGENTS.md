# India Mechanics Agent Contract

This repository is both software and a public research record. Treat evidence
changes with the same care as code changes.

## When the user says refresh

The standalone command `refresh`, or a clear request to refresh India Mechanics,
means a full current-publication cycle through today's date. It never means only
reloading the browser, clearing a cache, refreshing World Bank data, or updating
the parliamentary register.

1. Read `/api/meta` and every jurisdiction's cutoff before changing data.
2. Use `research/prompts/full-refresh-v1.txt` as the controlling refresh prompt.
3. Run `npm run data:refresh` and `npm run bills:refresh`.
4. Review every published evidence lane for India and every published state:
   current officeholders and parties, elections, laws and judgments, policies
   and rules, budgets, indicators, crime and public safety, trade agreements,
   disasters, protests and social conflict, major achievements and failures,
   source health, and rating-relevant evidence.
5. Use `research/source-roster.json` and `research/query-templates.json`. Save
   bounded research batches and validate each with
   `npm run research:validate -- <batch.json>`.
6. Update sources before claims. Update events, accountability, policies,
   budgets, answers, ratings, and `ingestion_batches` only when evidence
   warrants a change.
7. Advance each global or jurisdiction cutoff only for evidence lanes actually
   reviewed through the refresh date. Preserve and report any stale lane.
8. Run database seeding, research audits, rating audit, tests, lint, build,
   dependency audit, source checks, and bundled Browser E2E at desktop and
   mobile widths.
9. Commit and push the exact validated source, save a Sites version, redeploy
   the canonical public site, and verify the production APIs and visible cutoff.
10. Report the new cutoff, changed records, unchanged-but-reviewed lanes,
    blocked or stale lanes, verification results, commit, and deployment.

## When the user asks for the latest

1. Read `/api/meta` or `server/seed-data/research-metadata.ts`.
2. Compare the requested date with `knowledgeCutoff`,
   `editorialReviewedThrough`, `politicalStatusChecked`, and the per-feed periods.
3. Run `npm run data:refresh` to refresh machine-readable World Bank and V-Dem
   series.
4. Run `npm run bills:refresh` when parliamentary discovery or status may have
   changed.
5. Use `research/source-roster.json` and `research/query-templates.json` for
   repeatable web-search discovery. Save a bounded batch and run
   `npm run research:validate -- <batch.json>`.
6. Research political, legal, social-conflict, disaster, protest, and breaking
   events separately. Machine feeds do not authorize narrative publication.
7. Prefer the controlling primary record: legislation, court judgment,
   commission report, election result, official statistical release, regulator,
   or responsible agency.
8. Corroborate contested impact, casualty, allegation, riot, protest, and
   government-performance claims with at least one independent high-quality
   source. Use two independent reports for breaking claims when no controlling
   record exists.
9. For communal or ethnic violence, require three source classes when available:
   official/court/commission, independent national reporting, and credible
   local or rights-based field evidence.
10. Update source records, events, policies, claims, an `ingestion_batches` record, and
   `research-metadata.ts`. Never update
   a cutoff without completing the corresponding review.
11. Run `npm run db:seed`, `npm test`, `npm run build`, and Browser E2E.
12. Report exactly which evidence lanes were refreshed and which remain stale.

## Source rules

- A 5/5 official source controls the official fact it records; it does not
  automatically prove that the government’s interpretation or claimed impact is true.
- Score the individual source item, not the publisher. A well-reported article
  from The Hindu or Indian Express is typically at most 4/5 and is not sole proof
  for sensitive claims.
- Newspapers are evidence for contemporaneous reporting, interviews, and
  chronology. They are not the sole authority for contested casualty counts,
  criminal responsibility, or causal policy impact.
- Breaking news needs a direct/official record plus Reuters, PTI, or another
  independently reporting reputable outlet and remains `developing` until review.
- Store each casualty, arrest, displacement, or protest-size count separately
  with its source, timestamp, category, and attribution. Display disagreement.
- Allegations require the originating record, a response or documented
  non-response, and independent reporting.
- Preserve qualifiers such as alleged, estimated, reported, disputed, interim,
  and modelled.
- Store direct URLs, publisher, publication date, access date, best use,
  limitation, and reliability rationale.
- Never cite social media as standalone proof. It may lead to a source.
- Do not store or republish copyrighted article bodies; retain metadata, bounded
  claim summaries, locators, hashes where appropriate, and links.
- Do not silently replace a prompt, claim, score, or source with a politically
  more convenient formulation.

## Leader ratings

- Ratings belong to `leader_terms`, not people.
- Acting and ultra-short terms may remain unscored.
- Every rated term uses the six component dimensions and published weights.
- A rating change requires component-score changes, rationale changes, and
  supporting source changes. Bump the methodology version for a formula change.
- Never treat movement during a term as proof that the leader caused it.

## Policy and bill ratings

- Policies belong to jurisdictions and office terms.
- Use the five disclosed components: problem/design, effectiveness,
  implementation, rights/inclusion, and durability/side effects.
- Pending bills receive provisional design ratings with low confidence. Do not
  score outcomes that cannot yet exist.
- Keep rules, enacted amendments, and pending bills as separate records.
- Treat the Sansad register as discovery metadata. Never assign a rating merely
  because a Bill exists, passed, or received assent.
- Every register record needs a `bill_explanations` row. Register-derived
  explanations may identify legal operation, subject, affected groups, and
  conditional upside/downside only; they may not claim exact clauses or quality.
- Use `npm run bills:explain` to refresh the checked-in official-text cache.
  Preserve the extraction basis, specificity, document URL, and content hash.
- Distinguish `bill-specific` assessments from `policy-family` links. An
  omnibus, Appropriation, or Finance Bill must not inherit a whole-bill verdict
  from one reviewed measure inside it.
- Preserve the upstream parliamentary status as `source_status`. A corrected
  status needs a dated note and a controlling or high-quality source.
- Link a register record to a reviewed policy only after source-backed design,
  implementation, rights, and outcome analysis exists.
- A policy claim must show both intended purpose and independent outcome or risk
  evidence. Government rationale alone is not an effectiveness result.
- Rumour connections, including protest-funding allegations, remain evidence-gap
  claims unless controlling or independently corroborated evidence exists.

## Budget ratings

- Budgets belong to jurisdictions and Prime Minister terms; the Finance Minister
  is recorded separately.
- Keep full budgets, interim budgets, revised estimates, and actual spending
  conceptually distinct.
- Use the five disclosed components: strategy/problem fit, fiscal credibility,
  productive capacity, inclusion/public services, and delivery/long-run risks.
- Current budgets receive provisional proposal ratings with low confidence.
  Announced allocation is not actual spending or demonstrated impact.
- Preserve historical Plan/non-Plan and other period-specific accounting labels.
  Do not silently translate them into modern revenue/capital categories.
- Never compare raw nominal rupee amounts across decades as though purchasing
  power or the size of the economy were unchanged.
- Every allocation and assessment point needs a direct source. Use independent
  analysis for execution, underspending, distribution, and outcome claims.

## Indicator tenure comparisons

- Every indicator needs `plain_language` and `example` text understandable
  without statistical training.
- PM comparisons use the closest actual observation years, not invented values
  on oath dates.
- Label the result “observed change during the term,” never causal contribution.
- Show absolute and annualized change; percent indicators use percentage points.
- Lower-is-better indicators must treat a decrease as improvement.
- Indicators with no defensible universal direction must use the contextual role,
  display observed changes without praise or blame, and remain outside the
  Country Progress Index.
- Sparse surveys may have no predecessor comparison. Preserve that gap.
- Link PM rows to the PM assessment so policy/event evidence can inform causal
  interpretation.

## Crime and public safety

- Check both the current NCRB year page and the latest downloadable report.
  A year link or placeholder is not evidence that tables are published.
- Use population rates for comparison when the source provides a defensible
  denominator. Never compare raw state and national counts as equivalent risk.
- Keep serious harm, reporting-sensitive registration, police disposal, court
  outcomes, and current news as separate evidence classes.
- Murder and violent-crime rates are stronger harm signals than total FIR
  counts, but still require classification and reporting caveats.
- Crime against women, children, total registered crime, and cybercrime may rise
  because of victimization, e-FIR access, help desks, awareness, legal change,
  police recording, or several factors together. Do not assign an automatic
  direction or blame.
- Charge-sheeting is not conviction. Conviction is calculated from completed
  trials and must be displayed with pendency and case-mix limitations.
- Police and public order are primarily state responsibilities. Bound PM rating
  effects to Union law, national platforms, central agencies, interstate
  coordination, and demonstrable national capacity.
- CM ratings may give crime evidence more weight, but courts, prosecutors,
  Union systems, local administration, financial institutions, social
  conditions, and reporting behavior remain shared causes.
- Treat the July 1, 2024 BNS/BNSS/BSA transition as a legal and classification
  break. Do not append post-transition figures to IPC trends without a source
  bridge.
- News and web search provide recent signals, not aggregate rates. Require an
  official or direct record plus independent corroboration for rating-relevant
  current claims.
- Keep unvalidated police annual reviews provisional. Do not score a current
  leader from a press conference when comparable NCRB data predate the term.

## Event accountability

- Every published event needs an `event_assessments` row and at least one
  `event_responsibilities` actor.
- Return linked office-term, leader, and party metadata for timeline events.
  Pre-office and transition events must stay explicitly unmapped rather than
  being assigned to the nearest leader.
- Distinguish direct action, policy decision, failure to prevent, failure to
  respond, implementation, shared context, and positive leadership.
- State explicitly what belongs to the PM/Union and what belongs to state or
  local government. Do not transfer policing or public-health responsibility
  between constitutional levels for convenience.
- Do not use collective religious, ethnic, caste, regional, or national blame.
  Name organisations, offices, institutions, armed groups, or specific actor
  classes supported by evidence.
- “Right or wrong” scores assess a decision or response. Use
  `not-a-policy-choice` for crimes, disasters, protests, elections, and other
  events that are not themselves government decisions.
- Positive outcomes must not excuse underlying violence or abuse. Label later
  reforms and lessons as corrective outcomes when appropriate.
- Preserve contested and shared responsibility, confidence, and source limits.
- The UI must say the assessment is editorial political/administrative
  accountability, not a criminal or judicial verdict.

## State and Chief Minister additions

- Create a `jurisdictions` row with `parent_id = 'india'`.
- Create a head-of-government `offices` row for the Chief Minister.
- Attach every event, observation, claim, and office term to the state
  jurisdiction.
- Record boundary and naming validity dates. Do not project current state
  boundaries backward without an explicit mapping.
- Prefer RBI/MoSPI/state DES, Census, NFHS, ECI, CAG, court, commission, and
  state-portal records for state data.

## LLM and crawler delivery

- A public human deep link must return useful initial HTML without requiring
  JavaScript. Do not describe an empty SPA shell as LLM-ready.
- Keep `/llms.txt`, `/robots.txt`, `/sitemap.xml`, and `/api/openapi.json`
  reachable on the canonical origin. Use absolute canonical URLs in discovery
  documents.
- One-term leader retrieval uses `/api/llm/leaders/<term-id>`. Keep it bounded,
  source-backed, and materially smaller than the full leader record.
- The compact leader document must include jurisdiction, office term, party,
  six-category scorecard, nested specialist summaries, claims, sources,
  reliability limitations, omission counts, confidence, assessment date,
  knowledge cutoff, methodology version, and the editorial/causality
  disclaimer.
- The human leader URL
  `/?jurisdiction=<id>&view=leaders&term=<term-id>` must expose the same bounded
  evidence in semantic initial HTML, plus canonical and alternate links.
- Return a real `404` with `noindex` for invalid leader terms. Do not publish
  soft-404 SPA shells.
- Do not use crawler-specific user-agent cloaking. Humans and bots receive the
  same initial HTML; React may replace the fallback after loading.
- Discovery files at stable, non-fingerprinted paths must not use a one-year
  immutable cache policy.
- A release is not crawler-ready until plain non-JavaScript fetches verify the
  leader deep link, compact JSON and Markdown, robots, sitemap, and cutoff.

## Verification

- `npm test`
- `npm run build`
- `npm audit`
- `npm run sources:check` when network access is available
- E2E in the bundled Browser plugin at desktop and mobile widths:
  search, timeline filters, PM selection/comparison, indicator changes, source
  filters, methodology, API links, and cutoff visibility.
