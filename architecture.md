# India Mechanics Architecture

Last updated: 2026-07-24

This document is the operating map for the India Mechanics research system. It
describes where data comes from, how evidence becomes a published record, how
scores are computed, how agents should refresh the project, and how the same
model extends from India and Prime Ministers to states and Chief Ministers.

## 1. Product contract

India Mechanics must let a human or agent answer questions such as:

- Has India progressed since independence?
- As of now, is there an evidence-based case for constitutional electoral
  change or continuity?
- What did each government achieve, mishandle, or damage?
- What did each Union Budget prioritise, allocate, borrow, and leave unfunded?
- Which protests, riots, wars, disasters, reforms, and institutional changes
  altered the country’s direction?
- What is measured fact, what is interpretation, and what is editorial judgment?
- How current is the evidence?

The product is not a neutral oracle. No historical synthesis or scoring system
can be free of judgment. The project instead makes judgment inspectable:

1. observations, events, claims, and ratings are different record types;
2. every claim and event has provenance;
3. source fitness and limitations are explicit;
4. time and knowledge cutoffs are visible;
5. missing data remains missing;
6. scores disclose their components and weights;
7. contested evidence can be represented as contested;
8. agents can retrieve the same evidence as the UI through JSON.

## 2. Runtime architecture

```text
React + Vite multi-jurisdiction frontend
        |
        | /api via Vite proxy
        v
Express read API
        |
        v
SQLite generated database
        ^
        |
checked-in national/state seed catalogs + generated indicator snapshot
        ^
        |
World Bank API / V-Dem mirror / reviewed manual research
```

### Technology choices

- **React 19 + Vite 8**: responsive human interface.
- **Recharts**: time-series and comparison graphs.
- **Express 5**: small read-only HTTP API.
- **Node `node:sqlite`**: no external database service for the first release.
- **TypeScript**: shared compile-time contracts.
- **Vitest + Supertest**: formula, database-integrity, and API tests.

SQLite is appropriate while the corpus is maintained by a small number of
researchers and agents. Move to PostgreSQL when concurrent writes, user accounts,
review queues, or a large state-level corpus require a service database. The
relational model is intentionally portable.

## 3. Repository map

```text
AGENTS.md                              agent research and verification contract
architecture.md                        this document
data/india-mechanics.sqlite            generated runtime DB, gitignored
public/llms.txt                         agent discovery and interpretation rules
scripts/fetch-indicators.ts             machine-data refresh
scripts/fetch-bill-register.ts           official government-bill register refresh
scripts/extract-bill-documents.ts         official-PDF purpose extraction and cache
scripts/check-sources.ts                live source-link validation
server/schema.ts                        SQLite DDL
server/seed.ts                          deterministic DB build
server/progress.ts                      Country Progress calculations
server/scoring.ts                       normalization and aggregation math
server/rating-profiles.ts               balanced and alternative leader lenses
server/specialist-ratings.ts            specialist-topic weighted scoring
server/app.ts                           read API
server/seed-data/catalog.ts             reviewed sources, terms, events, claims
server/seed-data/budgets.ts             reviewed budgets, allocations, and ratings
server/seed-data/security.ts            all-PM national-security assessment lane
server/seed-data/crime-safety.ts        crime, justice, cyber, and current-news lane
server/seed-data/andhra-pradesh.ts      post-split AP state and CM corpus
server/seed-data/research-metadata.ts   knowledge and review cutoffs
server/seed-data/generated-indicators.json checked-in feed snapshot
server/seed-data/generated-bills.json    checked-in Sansad government-bill snapshot
server/seed-data/generated-bill-documents.json checked-in official-text extracts
src/                                   React interface
src/views/SafetyView.tsx               crime, justice, and current-signal UI
tests/                                 scoring, provenance, API, state fixture
.openai/hosting.json                   persistent Sites project identity
hosting/worker.ts                       hosted static/API snapshot worker
```

The SQLite file is disposable. The reproducible source of truth is the schema,
catalog, research metadata, and generated indicator snapshot.

## 4. Truth model

### Observation

A numeric value for one indicator, jurisdiction, period, status, and source.

Examples:

- life expectancy in India in 2024;
- V-Dem electoral democracy estimate in 2025;
- multidimensional poverty estimate for 2022–23.

An observation may be `observed`, `estimated`, or `modelled`. Those labels affect
confidence and must never be removed for presentation.

Indicators can be `scored` or `context`. Contextual series such as a nominal
exchange rate remain searchable and comparable by PM data window, but they do
not receive a higher-is-better or lower-is-better judgment and do not enter the
Country Progress Index.

### Event

A dated historical occurrence with:

- jurisdiction;
- start and optional end date;
- category;
- summary;
- significance;
- confidence;
- source links;
- related office terms;
- decision or response assessment;
- explicit Union/PM and state/local roles;
- responsible actors and responsibility types;
- positive or corrective outcomes;
- lessons and assessment cutoff.

The national timeline starts in 1945. Categories currently include elections,
politics, economy, institutions, security, protest, communal violence,
insurgency, disaster, public health, social policy, federalism, agriculture,
science, technology, and society.

Each event has an editorial accountability brief. It separates direct action,
policy decision, failure to prevent, failure to respond, implementation,
shared context, and positive leadership. Responsibility is assigned to named
offices, institutions, organisations, armed groups, corporate actors, foreign
states, or structural conditions rather than collectively blaming a religion,
ethnicity, caste, region, or nation.

The “right or wrong” field evaluates a decision or response. Crimes, disasters,
protests, elections, and other events that are not government choices use
`not-a-policy-choice`. The assessment is political and administrative
accountability, not a criminal or judicial verdict.

### Claim

A sourced interpretation with one of four stances:

- `achievement`;
- `concern`;
- `context`;
- `mixed`.

Claims can attach to a leader term, event, policy, jurisdiction, or a curated answer.
Claims have their own as-of date and confidence. A claim is not made true by
appearing in a government document.

### Bill-register record

A directly sourced parliamentary discovery record. It stores the Bill title,
number, ministry, introduction date and House, procedural status, passage,
assent, Act number, committee dates, document files, and the Prime Minister term
in office. Discovery records are deliberately unrated.

When an editorial policy assessment is complete, one or more bill-register
records may link to it. This keeps comprehensive parliamentary coverage separate
from the much narrower set of defensible policy-impact ratings.

### Editorial evaluation

An explicit judgment attached to an office term. It is not stored on the person
because one person can have multiple materially different governments.

Acting and ultra-short terms can remain `Not rated`. This is preferable to false
precision.

### Specialist evaluation

A specialist evaluation is a disclosed topic rubric attached to an eligible
office term. National security currently uses five dimensions and publishes:

- an operational-security result; and
- a rights-adjusted result that includes civilian protection, due process, and
  proportionality.

The same national-security rubric is applied to every rated Prime Minister term.
It is not applied to Chief Ministers because interstate war, border defence, and
national strategic autonomy are outside a state government’s constitutional
authority. Chief Ministers still use the same six-part general leader rubric.

Public safety uses five different dimensions: lethal and violent harm, women and
child safety, reporting and investigation, justice delivery, and cybercrime
resilience. It publishes:

- a recorded-safety outcome; and
- a reporting-and-justice-adjusted result.

The public-safety topic is scored only for terms with a complete comparable
evidence window. The current AP term is deliberately unscored because the latest
downloadable NCRB data are for 2023, before that term began.

Public safety informs the general crisis and integrity rationales but is not
added again as a second headline rating. PM attribution is bounded because police
and public order are primarily state subjects. CM attribution is larger but
remains shared with courts, prosecution, Union law and platforms, local
administration, financial institutions, reporting behavior, and social
conditions.

### Budget

An annual or interim fiscal plan linked to the jurisdiction and Prime Minister
term under which it was presented. A budget record stores:

- fiscal year, finance minister, full or interim status, and assessment basis;
- total, revenue, capital, and deficit figures when historical accounting permits;
- selected source-linked allocations rather than pretending they sum to the whole;
- plain-language plan, strengths, risks, and context;
- five weighted component judgments and confidence;
- direct official documents plus independent analysis where available.

Current budgets receive provisional proposal ratings. Historical Plan/non-Plan
figures remain in their original categories. Raw nominal rupee amounts are never
treated as purchasing-power comparisons across decades.

### Source

A source record contains:

- publisher and title;
- direct URL;
- source type;
- 1–5 reliability rating;
- why it received that rating;
- what it is best used for;
- its limitations;
- publication and access dates.

The rating is contextual fitness, not political agreement.

## 5. Relational model

```mermaid
erDiagram
  JURISDICTIONS ||--o{ JURISDICTIONS : parent
  JURISDICTIONS ||--o{ OFFICES : has
  OFFICES ||--o{ LEADER_TERMS : has
  PEOPLE ||--o{ LEADER_TERMS : serves
  PARTIES ||--o{ LEADER_TERMS : supports
  LEADER_TERMS ||--o{ LEADER_TERM_SCORES : receives
  EVALUATION_DIMENSIONS ||--o{ LEADER_TERM_SCORES : defines
  LEADER_TERMS ||--o{ LEADER_SPECIALIST_ASSESSMENTS : receives
  LEADER_SPECIALIST_TOPICS ||--o{ LEADER_SPECIALIST_DIMENSIONS : defines
  LEADER_SPECIALIST_ASSESSMENTS ||--o{ LEADER_SPECIALIST_SCORES : receives
  JURISDICTIONS ||--o{ EVENTS : contains
  EVENTS }o--o{ SOURCES : cites
  LEADER_TERMS }o--o{ EVENTS : overlaps
  EVENTS ||--|| EVENT_ASSESSMENTS : evaluates
  EVENTS ||--o{ EVENT_RESPONSIBILITIES : assigns
  JURISDICTIONS ||--o{ POLICIES : contains
  LEADER_TERMS ||--o{ POLICIES : introduces
  POLICIES ||--o{ POLICY_SCORES : receives
  POLICY_EVALUATION_DIMENSIONS ||--o{ POLICY_SCORES : defines
  POLICIES }o--o{ SOURCES : cites
  JURISDICTIONS ||--o{ POLICY_REGISTER : contains
  LEADER_TERMS ||--o{ POLICY_REGISTER : overlaps
  POLICIES ||--o{ POLICY_REGISTER : reviews
  SOURCES ||--o{ POLICY_REGISTER : controls
  JURISDICTIONS ||--o{ BUDGETS : contains
  LEADER_TERMS ||--o{ BUDGETS : presents
  BUDGETS ||--o{ BUDGET_SCORES : receives
  BUDGET_EVALUATION_DIMENSIONS ||--o{ BUDGET_SCORES : defines
  BUDGETS ||--o{ BUDGET_ALLOCATIONS : allocates
  BUDGETS ||--o{ BUDGET_POINTS : explains
  BUDGETS }o--o{ SOURCES : cites
  JURISDICTIONS ||--o{ CLAIMS : contains
  LEADER_TERMS ||--o{ CLAIMS : assessed_by
  EVENTS ||--o{ CLAIMS : interpreted_by
  CLAIMS }o--o{ SOURCES : cites
  PROGRESS_DIMENSIONS ||--o{ INDICATOR_DEFINITIONS : groups
  INDICATOR_DEFINITIONS ||--o{ INDICATOR_OBSERVATIONS : measures
  JURISDICTIONS ||--o{ INDICATOR_OBSERVATIONS : observes
  CURATED_ANSWERS }o--o{ CLAIMS : composes
```

Important table behavior:

- jurisdiction validity dates allow state creation, renaming, and reorganization;
- every office belongs to a jurisdiction;
- every indicator observation is jurisdiction-scoped;
- source many-to-many tables preserve provenance without duplicating sources;
- events and claims can link to terms without implying causality;
- every event has one accountability assessment and one or more responsible
  actors, with shared and contested responsibility preserved;
- policies link to the office term that introduced them without assigning every
  later outcome exclusively to that term;
- `state_ready` on indicator definitions records whether a credible state-level
  source path is known.

### Governance and ingestion fields

Source records also carry canonical/archive URLs, author, jurisdiction,
language, license/paywall state, content hash, rubric version, and link status.
The claim-source and event-source joins can record whether evidence controls,
supports, disputes, or contextualizes a record, plus page/table locators and
reported values.

Claims carry publication status, sensitivity, reviewer, review time, knowledge
cutoff, correction notes, and supersession links. `ingestion_batches` records the
source-roster version, query scope, run time, agent/model, candidate and rejection
counts, reviewer, and publication transaction. This prevents a displayed cutoff
from implying a review that did not happen.

## 6. State and Chief Minister implementation

The schema and UI are jurisdiction-native. Every API request and share URL can
carry `jurisdiction=<id>`. Switching jurisdiction reloads a complete scoped
bundle: overview, leaders, events, policies, budgets, indicators, answers, and
sources.

The first published state is post-bifurcation Andhra Pradesh:

```text
jurisdiction id: andhra-pradesh
level: state
parent: india
ISO subdivision: IN-AP
valid from: 2014-06-02
office: Chief Minister of Andhra Pradesh
```

The published AP corpus contains:

- three CM terms: Naidu 2014-19, Jagan 2019-24, and Naidu 2024-present;
- the same six-component leader formula used for PM terms;
- ten post-split accountability events;
- seven reviewed state policies, including a cross-term rural-road record;
- three landmark state budgets, including the current 2026-27 proposal;
- twenty-nine AP-coded indicators and eighty-eight observations;
- three reviewed state questions;
- a state-only source ledger.

The national security specialist rubric is absent from CM pages by design. State
public order and crisis performance remain inside the general crisis component;
national border and strategic-autonomy scores are not projected onto a CM.
The public-safety specialist rubric is available for the two completed AP terms.
The current term remains visibly `Not yet rateable`.

Boundary rules:

- do not project today’s state boundaries backward automatically;
- store `valid_from` and `valid_to`;
- use a boundary-version or predecessor-jurisdiction mapping when comparing
  reorganized states;
- label observations whose geographic definitions changed;
- do not compare GSDP or population series across a boundary break without a
  documented harmonization.
- do not infer an AP baseline from an undivided-state value even when a source
  publishes one continuous table;
- use AP-specific indicator IDs when cadence, unit, or methodology differs from
  the national series;
- the progress engine only counts definitions that have observations for the
  selected jurisdiction, preventing state definitions from reducing national
  coverage or vice versa.

Shareable examples:

```text
/?jurisdiction=andhra-pradesh
/?jurisdiction=andhra-pradesh&view=leaders&term=ap-naidu-2024
/?jurisdiction=andhra-pradesh&view=indicators&indicator=ap-real-nsdp-per-capita
```

Recommended state source hierarchy:

1. state Directorate of Economics and Statistics;
2. RBI Database on Indian Economy and state finance reports;
3. MoSPI, Census, NFHS, Sample Registration System, and PLFS;
4. Election Commission of India and state chief electoral offices;
5. CAG audits, court judgments, commissions, and state gazettes;
6. independent academic and newspaper corroboration.

Mandatory state research lanes:

1. boundary validity, successor/predecessor mapping, office terms, and elections;
2. macroeconomy, labour, public finance, debt, and budget execution;
3. health, education, poverty, nutrition, household services, and inclusion;
4. infrastructure stocks and outcomes for roads, power, water, irrigation,
   transport, ports, and digital access;
5. annual infrastructure delivery, maintenance, condition, safety, and
   Union-state-local attribution, not just announced spending or total stock;
6. policies, legislation, court decisions, CAG findings, crises, protests, and
   institutional accountability;
7. crime and public safety split into serious harm, reporting-sensitive rates,
   investigation, court outcomes, cybercrime, and corroborated current signals;
8. awards and external benchmarks as a discovery and corroboration lane only;
   the underlying measured result must exist before an award affects a leader
   score;
9. independent corroboration and an explicit evidence-gap list before
   publication.

Every new state gets its own research batch, jurisdiction-coded indicator IDs,
scoped cutoffs, and API/E2E checks. The AP roads review is the reference pattern:
it stores cumulative access, annual target delivery, maintenance, safety, and
shared attribution separately so the same checklist can be repeated for the
next state.

## 7. Source hierarchy

### Tier A: controlling primary records

Usually 5/5 for the narrow fact they directly establish:

- India Code and gazettes for law;
- ECI for declared election results;
- Supreme Court and High Courts for judgments;
- commissions of inquiry for their evidentiary record and findings;
- MoSPI, RBI, Census, NFHS, SRS, PLFS, NCRB, CAG, and regulators for their own
  published statistics;
- Parliament questions and committee reports for official testimony and records;
- responsible operating agencies such as ISRO for mission facts.

A primary record does not automatically control the assessment of impact,
fairness, responsibility, undercounting, or lived experience.

### Tier B: transparent multilateral and academic datasets

Usually 4/5:

- World Bank World Development Indicators;
- UNDP Human Development Reports;
- V-Dem;
- peer-reviewed research and university archives;
- specialist historical datasets with method and uncertainty documentation.

### Tier C: independent reporting and synthesis

Typically 3–4/5 depending on the claim:

- wire services for rapid factual chronology;
- national and regional newspapers for contemporaneous reporting, interviews,
  local detail, archives, and accountability investigations;
- edited reference works for orientation;
- independent legislative or policy analysis such as PRS.

No newspaper should be given a blanket 5/5. A named reporter’s documented
investigation can be stronger than an unsigned summary, while an editorial is
opinion.

#### The Hindu policy

A well-reported article from The Hindu will normally be considered up to 4/5 for
chronology, policy/court reporting, interviews, explainers, and corroboration.
The score belongs to the article, not the publisher. Paywalls, unnamed sourcing,
editorial content, and reuse restrictions must be recorded. The Hindu cannot be
the sole source for disputed casualty counts, communal violence, criminal
responsibility, allegations, or government-performance claims. An official
judgment embedded or linked by an article is scored separately as the controlling
record.

### Tier D: leads, not proof

Usually 1–2/5:

- party claims;
- advocacy material without transparent methods;
- anonymous aggregation;
- social media;
- unsourced video or image claims.

These can identify a question but cannot stand alone in a published answer.

### Approved discovery and corroboration roster v0.2

The roster guides research discovery. A source is inserted into the database
only when a specific item is actually used.

| Priority | Source | Intended use |
| ---: | --- | --- |
| 1 | India Code | enacted central law |
| 2 | Gazette of India | notifications, rules, appointments, commencement |
| 3 | Parliament Digital Library | debates, questions, bills, committees |
| 4 | Election Commission of India | election results and statistical reports |
| 5 | Supreme Court of India | controlling judgments and orders |
| 6 | eCourts and High Courts | participating court records |
| 7 | MoSPI | official economic and social statistics |
| 8 | Census of India | demographic baselines |
| 9 | RBI Data | monetary, banking, fiscal, inflation, and state series |
| 10 | data.gov.in | official dataset and API discovery |
| 11 | India Budget | budgets, Economic Surveys, receipts, expenditure |
| 12 | CAG | audited financial and performance findings |
| 13 | Ministry of Home Affairs | internal security and official incident records |
| 14 | NCRB | crime statistics with under-reporting caveats |
| 15 | NDMA | disaster records and guidance |
| 16 | NHRC | human-rights proceedings and findings |
| 17 | Reuters India | rapid independent breaking-news baseline |
| 18 | Press Trust of India | rapid Indian institutional reporting |
| 19 | The Hindu | courts, policy, history, and corroboration |
| 20 | Indian Express | investigations, law, policy, and explanatory reporting |
| 21 | BBC India | international context and archives |
| 22 | Frontline | long-form retrospective analysis |
| 23 | India Today | contemporaneous mainstream archive, usually secondary |
| 24 | PRS Legislative Research | legislative indexing and analysis |
| 25 | Economic and Political Weekly | article-level scholarly history and policy analysis |

Regional sources are added state by state. Record language, ownership,
corrections practice, archive stability, and evidence of original reporting.

## 8. Corroboration rules

Use at least two independent sources when there is no controlling primary record
and the claim concerns:

- breaking news;
- communal or ethnic violence;
- protest size;
- casualty, arrest, displacement, or damage counts;
- criminal responsibility or political direction;
- corruption allegations;
- intelligence or military claims;
- disputed historical responsibility;
- claimed policy impact.

For casualty or protest counts:

- store the source and date for each count;
- preserve ranges when reports differ;
- label official, hospital, police, court, commission, or independent counts;
- do not merge incompatible counts into an invented consensus.

For communal or ethnic violence, require three evidence classes before
publication whenever available:

1. official, court, or commission material;
2. independent national reporting;
3. credible local or rights-based field evidence.

For breaking news, require a direct or official record plus Reuters, PTI, or
another independently reporting reputable outlet and mark the record
`developing` until review is complete.

For allegations, preserve the originating allegation, the accused party’s
response or documented non-response, and independent reporting. Allegations must
never be phrased as findings.

For government achievements:

- use the government source to establish the programme, spending, target, or
  administrative claim;
- use an independent dataset or evaluation to assess reach and impact;
- disclose time lags and contributions from prior governments and states.

## 9. Machine-data ingestion

`scripts/fetch-indicators.ts` currently retrieves:

- World Bank indicator series directly from the World Bank API;
- selected V-Dem series through the Our World in Data CSV mirror, while the
  source record points to V-Dem methodology;
- all available observations from 1945 through the configured as-of year.

The script writes:

```text
server/seed-data/generated-indicators.json
```

The file includes:

- generation timestamp;
- requested as-of date;
- latest period actually returned by each feed;
- recommended progress year;
- normalized observation records.

Manual MPI observations remain in `catalog.ts` because survey rounds and official
extrapolations need explicit notes.

### Deterministic web-research discovery

Web search discovers candidates; it never publishes records directly.

Versioned controls live in:

```text
research/source-roster.json
research/query-templates.json
research/*.example.json
scripts/validate-research-batch.ts
```

The pipeline is:

```text
approved roster
→ repeatable jurisdiction/topic/date queries
→ metadata-only candidate batch
→ deterministic item rating
→ deduplication into events or policies
→ atomic claims
→ corroboration and sensitivity gates
→ named review
→ one publication transaction
→ per-lane cutoff update
```

The deterministic source score begins at 1 and adds bounded points for a
controlling record, primary directness, named evidence, transparent method,
independence, and archive stability. It subtracts for anonymity, partisan
material, and broken provenance, clamps to 1–5, and applies the roster’s
publisher ceiling. Source-item quality remains separate from claim confidence
and corroboration.

Validate a batch:

```bash
npm run research:validate -- research/fcra-2026-batch.example.json
```

Run:

```bash
npm run data:refresh
```

To reproduce a historical as-of:

```bash
npx tsx scripts/fetch-indicators.ts --as-of=2026-07-23
npm run db:seed
```

## 10. Latest-data workflow

`npm run refresh:latest` refreshes machine data, tests the system, and builds the
site. It does not auto-publish narrative news.

When a user or agent asks for the latest:

1. read `/api/meta`;
2. identify which evidence lane is stale:
   - machine indicators;
   - political office/election status;
   - laws or judgments;
   - event/news timeline;
   - editorial assessments;
3. refresh machine feeds;
4. research stale narrative lanes using the source hierarchy;
5. add or revise sources first;
6. add events and claims with as-of dates, confidence, and corroboration;
7. revise a PM score only when component evidence changes;
8. create or update an `ingestion_batches` record for the reviewed scope;
9. update `research-metadata.ts` only for lanes actually reviewed;
10. reseed, test, build, check links, and run Browser E2E;
11. report remaining stale lanes.

Do not store or republish copyrighted article bodies. Store metadata, bounded
claim summaries, locators, hashes where appropriate, and source links.

Cutoff fields:

- `knowledgeCutoff`: latest date for which the project has completed its stated
  review;
- `editorialReviewedThrough`: latest date claims and evaluations were reviewed;
- `politicalStatusChecked`: latest direct check of current office/election state;
- `indicatorAsOfDate`: date the feed refresh ran;
- latest World Bank and V-Dem periods: actual newest observations, not the
  request date.

The UI reads these fields from SQLite. Agents should read `/api/meta`, not infer
currency from the current date. Cutoffs should ultimately be tracked per topic
or dataset; refreshing World Bank data must not advance the riot, court, election,
or PM-evaluation cutoff.

## 11. Country and State Progress Index

The index is a diagnostic lens, not an official statistic.

### Dimensions and weights

| Dimension | Weight | Current component examples |
| --- | ---: | --- |
| Economic opportunity | 25% | real GDP per capita, employment ratio |
| Human capability | 25% | life expectancy, infant mortality, adult literacy |
| Basic systems | 20% | electricity, sanitation, internet |
| Inclusion | 15% | women’s labor participation, MPI poverty, consumption Gini |
| Institutions and liberties | 10% | electoral, liberal, participatory democracy |
| Sustainability | 5% | PM2.5 exposure, renewable electricity |

### Normalization

Each indicator has fixed low and high goalposts and a direction.

For a linear, higher-is-better indicator:

```text
normalized = clamp((value - low) / (high - low), 0, 1) * 100
```

For lower-is-better:

```text
normalized = (1 - clamp((value - low) / (high - low), 0, 1)) * 100
```

Real GDP per capita uses a logarithmic transform so a dollar gain at a low
starting level matters more than the same dollar gain at a high level.

Dimension score:

```text
sum(normalized indicator * indicator weight) / available indicator weight
```

Overall score:

```text
sum(dimension score * dimension weight) / available scorable weight
```

A dimension with less than 50% component coverage does not enter the overall
score. Annual observations expire after five years; survey observations after
twelve. Modeled or estimated observations lower confidence.

The displayed range widens as coverage falls. It is an uncertainty signal, not a
statistical confidence interval.

### Important limitations

- fixed goalposts are normative choices;
- consumption Gini is not wealth or income inequality;
- national and state averages hide district, caste, class, gender, and
  urban/rural gaps;
- V-Dem uses expert-coded estimates with uncertainty;
- annual data revisions can change history;
- an index can conceal trade-offs and should always be read with raw series.

### Indicator interpretation and office-term data windows

Every indicator definition stores:

- a technical description;
- a plain-language “what does this mean?” explanation;
- a concrete numerical example;
- unit, direction, transform, and goalposts.

For each non-acting PM or CM term lasting at least 300 days, the API calculates:

1. the observation at or nearest before the term-start year, or the first
   observation inside the term when no earlier value exists;
2. the latest observation at or before the term-end year;
3. absolute, relative, and annualized change;
4. whether that direction improved or worsened under the indicator definition.

The UI highlights the current and previous office terms, then lists every
comparable term. Actual data years are always shown. These windows are
descriptive: movement while an office-holder served does not prove causality.
Other levels of government, prior reforms, courts, global conditions,
demographics, and data lags also affect the result.

## 12. Prime Minister and Chief Minister evaluation

Each rated term receives six 0–10 component judgments:

| Component | Weight |
| --- | ---: |
| Observed outcomes | 30% |
| Durable reforms | 20% |
| Inclusion | 15% |
| Crisis and security | 10% |
| Institutions and liberties | 15% |
| Integrity and execution | 10% |

Published score:

```text
sum(component score * component weight)
```

The database test allows only rounding-level variance between components and the
published estimate.

Evaluation safeguards:

- outcomes during a term do not prove causality;
- starting conditions and inherited reforms belong in context;
- institutional damage can offset material gains;
- achievements and concerns are both required for reviewed current-government
  answers;
- short and acting terms are not forced into a score;
- score changes require rationale and source changes.

Four published lenses recalculate the same six components:

- balanced;
- development first;
- human capability first;
- governance first.

The balanced result is the headline. The displayed lens range is a
priority-sensitivity range, not a confidence interval.

National security is additionally published for all rated PM terms using:

```text
Operational =
  31.25% counterterrorism and intelligence
+ 25% interstate and border defence
+ 25% internal-conflict management
+ 18.75% strategic autonomy and capability

Rights-adjusted =
  25% counterterrorism and intelligence
+ 20% interstate and border defence
+ 20% internal-conflict management
+ 15% strategic autonomy and capability
+ 20% rule-of-law and civilian safeguards
```

## 13. Policy and bill evaluation

Policies and bills are records tied to a jurisdiction and the office term that
introduced them. The Sansad bill register is exposed only for the national
jurisdiction; state legislation appears only after an editorial policy review.

Every national register record has a `bill_explanations` row. The explanation
pipeline is deliberately tiered:

| Evidence basis | What the site may say | Rating treatment |
| --- | --- | --- |
| Register-derived | legal operation, subject, potentially affected groups, conditional upside and downside | no score |
| Official-text reviewed | clause-specific purpose, government rationale, scope, commencement, and safeguards | at most a provisional design judgment |
| Independently assessed | official text plus independent analysis, implementation evidence, audits, courts, or outcomes | provisional design or retrospective five-component rating |

`npm run bills:explain` downloads available official parliamentary PDFs,
extracts the long-title purpose and bounded statement-of-objects rationale, and
writes a reproducible cache. Records without a usable document receive a
conservative title-derived fallback. The UI discloses the evidence basis and
title specificity (`explicit`, `domain-only`, or `opaque`) for every record.

A policy link also records whether the assessment is `bill-specific` or only a
`policy-family` review. A family score must not be presented as though every
clause in an omnibus or annual Finance Bill was individually assessed.

The register preserves the upstream `source_status` separately from an
evidence-backed status correction. This is necessary because the feed can lag
later parliamentary procedure. Corrections require a dated note and source.

| Component | Weight |
| --- | ---: |
| Problem fit and design | 20% |
| Evidence of effectiveness | 30% |
| Implementation quality | 20% |
| Rights and inclusion | 15% |
| Durability and side effects | 15% |

Pending bills receive provisional low-confidence design ratings. Outcome claims
remain unscored until outcome evidence exists. Enacted laws, executive actions,
rules, and later amendment bills are separate records even when they share a
name.

The 2026 Delimitation proposal demonstrates the expanded model: the official
text supports the proposal summary; PRS supplies independent provision and
status analysis; the register preserves Sansad's stale `Pending` value while
publishing the sourced `Infructuous` status; and the 5.4/10 score is explicitly a
low-confidence design judgment with no effectiveness score.

The FCRA family demonstrates the model:

- the 2010 Act established the renewable regulatory framework;
- the 2020 Act tightened transfers, banking, identity, and administration;
- the pending March 25, 2026 Bill addresses asset vesting and penalties;
- the June 22, 2026 Rules are a separate enacted rules record and evidence input.

## 14. Read API

The API is intentionally agent-friendly and read-only.

| Endpoint | Purpose |
| --- | --- |
| `/api/meta` | cutoffs, versions, and row counts |
| `/api/jurisdictions` | published country/state choices and validity dates |
| `/api/overview` | progress snapshot, current term, questions, recent events |
| `/api/leaders` | terms, component scores, claims, sources |
| `/api/policies` | policies, bills, component scores, claims, sources |
| `/api/events` | filterable timeline |
| `/api/indicators` | definitions and latest observations |
| `/api/indicators/:id/series` | raw series, office-term changes, explanation, example, and source |
| `/api/sources` | jurisdiction-scoped source ledger |
| `/api/search?q=` | cross-entity search and reviewed-question matching |
| `/api/questions/:id` | one reviewed answer |
| `/api/methodology` | formulas, weights, source rubric, bias controls |
| `/api/export` | complete jurisdiction research bundle |
| `/api/openapi.json` | machine-readable API overview |

Except for global methodology and metadata, read endpoints accept a
`jurisdiction` query parameter. `public/llms.txt` directs agents to the cutoff
and methodology endpoints.

## 15. UI architecture

Eight responsive views use the same jurisdiction-scoped API:

1. **Overview**: current direction, progress score, uncertainty, reviewed
   questions, leader strip, and recent events.
2. **Timeline**: category and date filters with expandable provenance,
   decision quality, PM/Union and state/local roles, responsible actors,
   positives, and lessons.
3. **Prime Ministers / Chief Ministers**: all terms, same-rubric comparison graph, detailed
   component reasons and claims.
4. **Policies**: office-term-linked policy inventory, status filters,
   five-part ratings, benefits, risks, and evidence gaps.
5. **Budgets**: jurisdiction budgets, allocations, fiscal frame, strengths, and
   delivery risks.
6. **Crime & Safety**: harm, reporting-sensitive rates, investigation, justice,
   cybercrime, public-safety term scorecards, and current news signals.
7. **Indicators**: raw graph, latest value, office-term change, goalposts, and
   source fitness.
8. **Sources**: reliability distribution, filters, limitations, and agent data
   access.

Desktop uses a compact top navigation with a jurisdiction selector. Mobile uses
a stable bottom navigation, compact jurisdiction selector, full-screen search,
and stacked evidence layouts.

## 16. Adding research

### Add a source

1. Add it to `sources` in `catalog.ts`.
2. Explain best use and limitations.
3. Give the narrowest defensible rating.
4. Record publication and access dates.
5. Run `npm run sources:check`.

### Add an event

1. Use an exact start date where known.
2. Separate summary from significance.
3. Assign the event to its jurisdiction.
4. Attach at least one source; use two for contested events.
5. Link overlapping office terms without claiming causation.
6. Preserve uncertainty in counts and responsibility.

### Add or change a claim

1. Label its stance and confidence.
2. Attach direct sources.
3. State the claim narrowly enough for those sources.
4. Update its as-of date.
5. Add counterevidence or context when material.

### Add an indicator

1. Define unit, frequency, direction, transform, and goalposts.
2. Attach a controlling source.
3. Decide whether a state source path exists.
4. Add the feed importer or explicit manual observations.
5. Test normalization and freshness.

### Add crime or public-safety evidence

1. Check the latest downloadable NCRB report, not only the year-navigation link.
2. Store rates and their denominators; keep raw counts as context.
3. Classify the metric as serious harm, reporting-sensitive registration,
   investigation, justice delivery, or cybercrime.
4. Preserve NCRB’s warning that higher registration can reflect better access
   and recording.
5. Separate post-cutoff police/news signals from comparable annual statistics.
6. Require official/direct evidence and independent corroboration for a current
   signal that may affect a rating.
7. Bound PM and CM attribution according to constitutional responsibility.
8. Treat the July 2024 criminal-law transition as a classification break.

## 17. Verification gates

Required local checks:

```bash
npm run db:seed
npm test
npm run build
npm audit
npm run sources:check
```

The current automated suite checks:

- normalization and aggregation behavior;
- source coverage for every event and claim;
- weighted PM score consistency;
- weighted CM score consistency;
- the same national-security formula for every rated PM term;
- the same public-safety formula for every term with a complete evidence window;
- at least one claim and one event, policy, or budget record for every rated PM term;
- explicit knowledge cutoffs;
- 1945 timeline and protest/communal-violence coverage;
- AP boundary isolation, CM chronology, and no pre-split observations;
- reviewed-answer balance;
- search and export APIs.

Browser E2E must cover:

- desktop and mobile load;
- cutoff visibility;
- reviewed-question search;
- arbitrary event and leader search;
- timeline category/date filters and expansion;
- PM selection and comparison;
- jurisdiction switching and URL persistence;
- CM selection and comparison;
- indicator switching and chart rendering;
- Crime & Safety group switching, charts, leader scorecards, current signals,
  and the current-term data-gap state;
- source filters and external links;
- methodology modal;
- agent export and API contract links;
- no clipping, overlap, or blank chart canvas.

## 18. Known gaps

This is a strong foundation, not an exhaustive history.

- no live newsroom or automatic narrative publication;
- no review/approval CMS yet;
- source roster and newspaper archive policy are still being expanded;
- many casualty and protest-size figures are intentionally omitted until a
  disputed-count model exists;
- early economic and social series are sparse;
- the 2021 Census delay limits current demographic analysis;
- state results still hide district and community differences;
- the current PM scores have one editorial pass, not an external review panel;
- only Andhra Pradesh is published at state level;
- AP policy, event, and budget coverage is a reviewed starting corpus, not an
  exhaustive state archive;
- AP road evidence now covers network stock, annual PMGSY delivery through
  July 16, 2026, targeted access, maintenance, fatalities, and one CAG
  execution finding, but lacks a consistent independent annual road-condition
  and travel-time series;
- AP labour, health, and household indicators rely on survey years and should
  not be read as annual measurements;
- comparable crime trends currently stop at 2023; the official 2024 NCRB page
  exposes no downloadable records as of July 24, 2026;
- current crime reporting is selective and is displayed as a provisional
  signal, not converted into an aggregate crime rate;
- no multilingual research or UI yet;
- no user-submitted corrections workflow yet;
- no formal versioned data migrations or signed releases yet.

These gaps must remain visible. A polished interface is not evidence that the
underlying historical record is complete.
