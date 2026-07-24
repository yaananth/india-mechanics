# India Mechanics

India Mechanics is a source-backed, SQLite-powered research website for
understanding India from 1945 to the present. It combines a searchable historical
timeline, Prime Minister evaluations, raw indicator graphs, a transparent Country
Progress Index, policy and bill evaluations, Union Budget comparisons, and a
source reliability ledger.

The project does not claim to be bias-free. It makes evidence, judgment,
uncertainty, and knowledge cutoffs visible so readers and agents can challenge or
recompute the conclusions.

## Run locally

```bash
npm install
npm run data:refresh
npm run dev
```

Open `http://127.0.0.1:4173`. The API runs on
`http://127.0.0.1:8788` and is proxied by Vite.

## Useful commands

```bash
npm run dev             # React app and SQLite API
npm run db:seed         # rebuild the local SQLite database from checked-in seeds
npm run data:refresh    # refresh machine-readable indicator feeds and reseed
npm run bills:refresh   # refresh the official government-bill register and reseed
npm run refresh:latest  # refresh indicators, test, and production-build
npm run sources:check   # live link check for the source ledger
npm run research:validate # validate a deterministic web-research batch
npm run rating:audit      # compare five blinded leader-rating replications
npm test                # scoring, provenance, PM-term coverage, API, and state-extensibility tests
npm run build           # production bundle
```

## Evidence model

- **Observations** are raw numeric records from a named source and period.
- **Indicator explainers** provide a plain-language meaning, concrete example,
  and observed change during each comparable PM term.
- **Contextual indicators**, such as INR per US dollar, are shown with comparisons
  but are excluded from the progress score when no universal good/bad direction exists.
- **Events** are dated historical records with significance and provenance.
- **Event accountability** separates PM/Union, state/local, non-state, foreign,
  corporate, institutional, and structural responsibility, plus decision
  quality, positives, and lessons.
- **Claims** are sourced interpretations labeled achievement, concern, context, or mixed.
- **Leader scores** are disclosed editorial estimates built from six weighted components.
- **Policy scores** separate design, effectiveness, implementation, rights, and side effects.
- **Bill-register records** preserve official parliamentary discovery and status
  without assigning a rating before an evidence review is complete.
- **Budget scores** separate strategy, fiscal credibility, productive capacity,
  inclusion, and delivery or long-run risk.
- **Budget allocations** preserve the fiscal-year amount and historical accounting
  label; nominal rupees are not treated as inflation-adjusted comparisons.
- **Source ratings** describe fitness for the stated use, not political agreement.
- **Knowledge cutoffs** are stored in SQLite and returned by `/api/meta`.

Read [architecture.md](./architecture.md) before adding data or changing the
scoring model. Coding and research agents must also follow [AGENTS.md](./AGENTS.md).
