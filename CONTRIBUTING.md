# Contributing to India Mechanics

India Mechanics accepts software and research contributions under the same
standard: the result must be reproducible, reviewable, and honest about evidence
limits.

Start with:

- [README.md](./README.md)
- [architecture.md](./architecture.md)
- [AGENTS.md](./AGENTS.md)

## Local setup

```bash
npm install
npm run db:seed
npm run dev
```

The website runs at http://127.0.0.1:4173 and the API at
http://127.0.0.1:8788.

## Research contributions

1. Check `/api/meta` and the relevant source cutoff.
2. Use `research/source-roster.json` and `research/query-templates.json`.
3. Prefer the controlling primary record.
4. Add independent corroboration for contested impact or responsibility.
5. Preserve qualifiers such as reported, alleged, estimated, disputed,
   provisional, and modelled.
6. Add a bounded research batch under `research/`.
7. Validate it:

   ```bash
   npm run research:validate -- research/<batch>.json
   ```

8. Update source records, observations, claims, events, accountability,
   policies, ratings, ingestion metadata, and the applicable cutoff together.
9. Do not change a score without changing its component evidence and rationale.

News can establish current chronology and signals. It must not be converted into
an aggregate rate or causal political conclusion without a suitable statistical
record.

## Code contributions

- Preserve the jurisdiction-native API and URL model.
- Keep India and state observations boundary-valid.
- Reuse existing schema, component, and styling patterns.
- Keep mobile navigation and all view URLs shareable.
- Do not expose credentials, private files, or account tokens.
- Do not make production behavior depend on undocumented local state.

## Required checks

```bash
npm run db:seed
npm test
npm run lint
npm run build:sites
npm audit
npm run sources:check
```

For frontend changes, also run Browser E2E at desktop and mobile widths. Verify
jurisdiction switching, URLs, search, charts, leader ratings, Crime & Safety,
policies, budgets, timelines, source links, methodology, and console errors.

## Canonical website

The canonical production website is:

https://india-mechanics.artfiesco.chatgpt.site

As of July 24, 2026, only `yaananth` has the GitHub/Sites authorization needed
to publish that canonical deployment. Contributors can run the project locally
or deploy a fork. Canonical deployment access can be transferred later without
changing the architecture or research model.

