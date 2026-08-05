# India Mechanics

India Mechanics is a public, source-backed research website for understanding
India's political, economic, institutional, and social direction from 1945 to
the present.

**Canonical website:** https://india-mechanics.artfiesco.chatgpt.site

The project combines:

- a searchable timeline with PM/CM and party attribution, filters, and
  political and administrative accountability;
- transparent Prime Minister and Chief Minister term ratings;
- policy, bill, and budget evaluations;
- raw indicator charts and a disclosed Country/State Progress Index;
- a Crime & Safety view that separates harm, reporting, investigation, justice,
  and current news signals;
- source-level reliability, limitations, review dates, and knowledge cutoffs;
- a jurisdiction-native model that currently publishes India,
  post-bifurcation Andhra Pradesh, and modern Tamil Nadu from January 14,
  1969.

This is both software and a public research record. Editorial judgments are
visible, versioned, and reproducible; they are not presented as measured facts.

## Research principles

1. **Primary records first.** Prefer legislation, judgments, official
   statistics, audits, election results, and responsible agencies.
2. **Independent corroboration.** Government claims about effectiveness,
   contested events, and current news require independent evidence.
3. **Observation is not causation.** A metric moving during a leader's term is
   not proof that the leader caused it.
4. **Uncertainty stays visible.** Sparse surveys, disputed counts, provisional
   budgets, and developing stories remain qualified.
5. **Same rubric, same office.** Rated PM and CM terms use the same six general
   categories and equal-weight arithmetic mean. Specialist assessments use a
   published topic rubric but do not add another category to the overall.
6. **Registered crime is not victimization.** Murder and violent-crime rates,
   reporting-sensitive FIR rates, investigation, conviction, and news signals
   are shown separately.
7. **State boundaries matter.** Andhra Pradesh observations begin after
   June 2, 2014; undivided-state data are not silently assigned to the successor
   state. Tamil Nadu is explicitly anchored to the January 14, 1969 effective
   renaming of Madras State.

Read [architecture.md](./architecture.md) for the complete model and
[AGENTS.md](./AGENTS.md) for the research and verification contract.

## Unified PM/CM scorecard

Every government is presented as one scorecard section for one office term.
Ratings belong to the term, not permanently to the person. Prime Ministers and
Chief Ministers use the same architecture and the same six 0-10 core
categories:

1. Development and economy
2. Reform and state capacity
3. Human development and inclusion
4. Security and crisis response
5. Institutions and rights
6. Integrity and execution

Each category contributes exactly one-sixth. The headline overall is the
arithmetic mean of all six category scores, rounded to one decimal:

```text
overall = (category 1 + category 2 + category 3
         + category 4 + category 5 + category 6) / 6
```

A term with any missing core category is `Not rated`; missing evidence is not
converted to zero, imputed, or silently redistributed across the other
categories.

Infrastructure, national security, and public safety are specialist deep dives.
They appear inside the core category they explain, such as infrastructure under
Development and economy or public safety under Security and crisis response.
Their operational and adjusted results remain visible, but they are excluded
from the overall arithmetic mean. This prevents the same evidence from being
counted twice and prevents leaders with more researched specialist lanes from
receiving a different denominator.

The older balanced, development-first, human-capability-first, and
governance-first weighted profiles, along with their replication audits, are
retained as **legacy sensitivity and research-history outputs**. They no longer
determine the headline leader score.

## Technology

- React, TypeScript, Vite, and Recharts
- Express read API
- SQLite via Node's built-in `node:sqlite`
- Vitest and Supertest
- Cloudflare-compatible Sites production bundle

SQLite is generated locally from checked-in seed records. No hosted database or
private editor state is required to reproduce the published corpus.

## Run locally

### Prerequisites

- Node.js 22 or newer
- npm

### Setup

```bash
git clone https://github.com/yaananth/india-mechanics.git
cd india-mechanics
npm install
npm run db:seed
npm run dev
```

Open:

- Website: http://127.0.0.1:4173
- API: http://127.0.0.1:8788

Vite proxies `/api/*` requests to the local API.

The checked-in machine-data snapshots make the project runnable without
refreshing external feeds. Run refresh commands only when intentionally updating
the evidence cutoff.

### Agent command: `refresh`

When the user says `refresh`, the agent follows
[`research/prompts/full-refresh-v1.txt`](research/prompts/full-refresh-v1.txt):
refreshes machine feeds and bills, reviews every published national and state
evidence lane through the current date, advances only completed cutoffs, runs
the full verification suite, commits and pushes the source, and redeploys the
canonical public site. It is broader than `npm run refresh:latest`, which cannot
perform narrative web research or publication judgment by itself.

## Common commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the website and SQLite API |
| `npm run db:seed` | Rebuild SQLite deterministically from checked-in data |
| `npm run data:refresh` | Refresh World Bank and V-Dem series, audit, and reseed |
| `npm run bills:explain` | Extract official purposes from available parliamentary PDFs |
| `npm run bills:refresh` | Refresh the Sansad register, bill explanations, audits, and database |
| `npm run refresh:feeds` | Refresh machine indicators and the parliamentary register |
| `npm run research:validate -- <batch.json>` | Validate a deterministic research batch |
| `npm run policy:audit` | Check the reviewed-policy funnel |
| `npm run claims:audit` | Check heard-claim coverage |
| `npm run rating:audit` | Compare standardized leader-rating runs |
| `npm run sources:check` | Check every source URL |
| `npm test` | Run formula, provenance, API, and jurisdiction tests |
| `npm run lint` | Run the TypeScript/React linter |
| `npm run build` | Build the local production client |
| `npm run build:sites` | Build the client, API snapshot, and Sites worker |

## Repository layout

```text
server/schema.ts                      relational schema
server/seed.ts                        deterministic database build
server/app.ts                         read-only API
server/progress.ts                    progress-index calculations
server/leader-scorecards.ts           current equal-category PM/CM scorecard
server/rating-profiles.ts             legacy weighted sensitivity lenses
server/specialist-ratings.ts          specialist-score arithmetic
server/seed-data/catalog.ts           national core corpus
server/seed-data/security.ts          national-security lane
server/seed-data/crime-safety.ts      crime, justice, and current-signal lane
server/seed-data/semiconductors.ts     semiconductor history and industrial-policy lane
server/seed-data/infrastructure-capacity.ts infrastructure and productive-capacity scorecard
server/seed-data/andhra-pradesh.ts    post-split AP corpus
server/seed-data/tamil-nadu.ts        modern Tamil Nadu and CM corpus
server/seed-data/budgets.ts           budget records and ratings
server/seed-data/generated-bills.json official Sansad register snapshot
server/seed-data/generated-bill-documents.json official-PDF purpose cache
research/                             validated source-discovery batches
scripts/extract-bill-documents.ts     reproducible official-text extraction
scripts/                              other refresh, validation, and audit commands
src/views/                            jurisdiction-aware website views
hosting/worker.ts                     hosted API/static worker
tests/                                database, scoring, API, and URL contracts
```

The generated `data/india-mechanics.sqlite` file is disposable and gitignored.
The source of truth is the schema, seed data, reviewed research batches, and
checked-in feed snapshots.

The semiconductor lane is deliberately cross-term. It credits the SCL
foundation, records the 1989 capability loss and UPA-era investment failures,
separates planned capacity from operating production, and publishes distinct
ratings for India Semiconductor Mission 1.0 and Semicon 2.0. Its reviewed answer
also discloses how semiconductor evidence changes PM component scores even when
the rounded headline does not change.

The infrastructure lane distinguishes broad development from physical
buildout. It applies one disclosed rubric to the long Vajpayee, Manmohan Singh,
and Modi infrastructure cycles, publishes both raw buildout and a
quality-adjusted result, and prevents stock, annual flows, project approvals,
connections, inherited projects, and shared state/private delivery from being
collapsed into one political number.

Every government Bill has a plain-language explanation. The UI distinguishes
register-derived summaries, official-text reviews, and independent assessments.
Only the last tier can carry a policy rating, and a policy-family link is
labelled separately from a review of the exact Bill.

## Reproducible research workflow

For a new or refreshed evidence lane:

1. Read the current cutoffs from `/api/meta`.
2. Use `research/source-roster.json` and
   `research/query-templates.json` for repeatable discovery.
3. Prefer the controlling primary source.
4. Add independent corroboration where impact or responsibility is contested.
5. Save a bounded batch under `research/`.
6. Run `npm run research:validate -- research/<batch>.json`.
7. Add sources, observations, events, claims, policies, and rating rationale.
8. Update the corresponding ingestion batch and review cutoff.
9. Run all verification gates.
10. Inspect the desktop and mobile website before publication.

The process is designed for either a human researcher or an agent. It does not
depend on a private prompt history, local notes, or undocumented knowledge held
by the current maintainer.

### Adding a new office term

Treat a new PM or CM term as a localized addition, not a reason to rewrite every
historical scorecard:

1. Add the office-term chronology, mandate, party, jurisdiction, start date, and
   direct official sources.
2. Create one term scorecard section using the same six universal categories.
3. Publish an overall only after all six categories have reviewable evidence
   and rationales; otherwise keep the term visibly `Not rated`.
4. Add only the specialist deep dives supported by a complete, comparable
   evidence window and nest them under their parent category.
5. Update the new term's sources, claims, accountability records, review cutoff,
   and ingestion batch.
6. Revisit older terms only when new controlling evidence or a declared
   methodology migration warrants a source-backed change.
7. Run the standard seed, tests, lint, build, source, and Browser verification
   gates before publication.

## Crime and current-news updates

Comparable crime trends use NCRB tables. Current web/news research is a separate
lane:

- official police, court, ministry, and parliamentary records establish facts;
- Reuters, PTI, The Hindu, Indian Express, and other reviewed outlets can
  corroborate current chronology and statements;
- headline counts are not converted into population rates without a defensible
  denominator;
- current police reviews remain provisional until incorporated into a comparable
  official series;
- the July 2024 BNS/BNSS/BSA transition is treated as a classification break
  from IPC-era data.

## Adding another state

State additions require:

- a jurisdiction row and boundary-valid start date;
- a Chief Minister office and term chronology;
- state-coded indicators and observations;
- state budgets, policies, events, claims, and accountability;
- state-specific cutoffs and a validated research batch;
- explicit Union/state/local attribution;
- API, URL, desktop, and mobile tests.

Use the Andhra Pradesh and Tamil Nadu implementations as reference patterns.
Andhra Pradesh demonstrates a successor-state boundary break; Tamil Nadu
demonstrates a naming-validity boundary with a much longer CM chronology. Do
not project a present-day state identity backward without a documented mapping.

## Canonical deployment and governance

The canonical website is deployed through OpenAI Sites:

https://india-mechanics.artfiesco.chatgpt.site

As of **July 24, 2026**, only the GitHub/Sites owner **`yaananth`** can publish
updates to that canonical production website. This is an access-control fact,
not an architectural dependency:

- anyone can clone, inspect, test, refresh, and run the project locally;
- another maintainer can deploy a fork to their own compatible hosting;
- source data, formulas, review batches, and build steps are checked in;
- production credentials and account authorization are intentionally external
  to the repository;
- changing canonical maintainers requires an explicit GitHub/Sites access
  transfer, not a code rewrite.

## Verification before publication

```bash
npm run db:seed
npm test
npm run lint
npm run build:sites
npm audit
npm run sources:check
```

Production changes also require Browser E2E at desktop and mobile widths,
including jurisdiction switching, shareable URLs, search, timelines, leader
ratings, Crime & Safety, indicators, budgets, policies, sources, methodology,
API links, and console errors.

## Important limitations

- Ratings are editorial term estimates, not objective facts.
- India has no complete annual dataset for every important outcome since 1947.
- Current news is selective and cannot establish an aggregate crime rate.
- NCRB reporting varies with access, registration, law, and police practice.
- District, caste, gender, income, and community differences remain
  underrepresented.
- The project does not yet include a public correction workflow or review CMS.
- A polished interface does not make an incomplete evidence record exhaustive.
