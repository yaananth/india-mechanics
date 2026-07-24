import type { DatabaseSync } from 'node:sqlite'

export const schemaSql = `
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS jurisdictions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('country', 'state', 'union-territory')),
  parent_id TEXT REFERENCES jurisdictions(id),
  iso_code TEXT,
  valid_from TEXT NOT NULL,
  valid_to TEXT,
  status TEXT NOT NULL CHECK (status IN ('published', 'researching', 'planned'))
);

CREATE TABLE IF NOT EXISTS jurisdiction_metadata (
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (jurisdiction_id, key)
);

CREATE TABLE IF NOT EXISTS offices (
  id TEXT PRIMARY KEY,
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  role TEXT NOT NULL,
  UNIQUE (jurisdiction_id, short_name)
);

CREATE TABLE IF NOT EXISTS people (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sort_name TEXT NOT NULL,
  birth_date TEXT,
  death_date TEXT
);

CREATE TABLE IF NOT EXISTS parties (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  color TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  url TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  archive_url TEXT,
  author TEXT,
  jurisdiction_id TEXT REFERENCES jurisdictions(id),
  language TEXT NOT NULL DEFAULT 'en',
  license_status TEXT NOT NULL DEFAULT 'link-only',
  paywall_status TEXT NOT NULL DEFAULT 'unknown',
  content_hash TEXT,
  source_type TEXT NOT NULL,
  reliability INTEGER NOT NULL CHECK (reliability BETWEEN 1 AND 5),
  rubric_version TEXT NOT NULL,
  link_status TEXT NOT NULL,
  rating_reason TEXT NOT NULL,
  best_for TEXT NOT NULL,
  limitations TEXT NOT NULL,
  published_date TEXT,
  accessed_date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leader_terms (
  id TEXT PRIMARY KEY,
  office_id TEXT NOT NULL REFERENCES offices(id),
  person_id TEXT NOT NULL REFERENCES people(id),
  party_id TEXT REFERENCES parties(id),
  start_date TEXT NOT NULL,
  end_date TEXT,
  is_acting INTEGER NOT NULL DEFAULT 0,
  government_name TEXT,
  mandate_label TEXT,
  rating_score REAL CHECK (rating_score BETWEEN 0 AND 10),
  rating_confidence TEXT CHECK (rating_confidence IN ('low', 'medium', 'high')),
  rating_summary TEXT NOT NULL,
  assessment_as_of TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS term_sources (
  term_id TEXT NOT NULL REFERENCES leader_terms(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL REFERENCES sources(id),
  PRIMARY KEY (term_id, source_id)
);

CREATE TABLE IF NOT EXISTS evaluation_dimensions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  weight REAL NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leader_term_scores (
  term_id TEXT NOT NULL REFERENCES leader_terms(id) ON DELETE CASCADE,
  dimension_id TEXT NOT NULL REFERENCES evaluation_dimensions(id),
  score REAL NOT NULL CHECK (score BETWEEN 0 AND 10),
  rationale TEXT NOT NULL,
  PRIMARY KEY (term_id, dimension_id)
);

CREATE TABLE IF NOT EXISTS leader_rating_audits (
  id TEXT PRIMARY KEY,
  term_id TEXT NOT NULL REFERENCES leader_terms(id) ON DELETE CASCADE,
  run_count INTEGER NOT NULL CHECK (run_count > 0),
  generic_mean REAL NOT NULL CHECK (generic_mean BETWEEN 0 AND 10),
  standardized_mean REAL NOT NULL CHECK (standardized_mean BETWEEN 0 AND 10),
  standard_deviation REAL NOT NULL CHECK (standard_deviation >= 0),
  minimum REAL NOT NULL CHECK (minimum BETWEEN 0 AND 10),
  maximum REAL NOT NULL CHECK (maximum BETWEEN 0 AND 10),
  previous_rating REAL NOT NULL CHECK (previous_rating BETWEEN 0 AND 10),
  revised_rating REAL NOT NULL CHECK (revised_rating BETWEEN 0 AND 10),
  prompt_hash TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('stable', 'review-required')),
  reviewed_at TEXT NOT NULL,
  consensus_sources_json TEXT NOT NULL,
  notes TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leader_specialist_topics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  operational_label TEXT NOT NULL,
  adjusted_label TEXT NOT NULL,
  methodology TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leader_specialist_dimensions (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL REFERENCES leader_specialist_topics(id),
  name TEXT NOT NULL,
  operational_weight REAL NOT NULL CHECK (operational_weight BETWEEN 0 AND 1),
  adjusted_weight REAL NOT NULL CHECK (adjusted_weight BETWEEN 0 AND 1),
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leader_specialist_assessments (
  id TEXT PRIMARY KEY,
  term_id TEXT NOT NULL REFERENCES leader_terms(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL REFERENCES leader_specialist_topics(id),
  confidence TEXT NOT NULL CHECK (confidence IN ('low', 'medium', 'high')),
  status TEXT NOT NULL CHECK (status IN ('reviewed', 'provisional')),
  summary TEXT NOT NULL,
  assessment_as_of TEXT NOT NULL,
  UNIQUE (term_id, topic_id)
);

CREATE TABLE IF NOT EXISTS leader_specialist_scores (
  assessment_id TEXT NOT NULL
    REFERENCES leader_specialist_assessments(id) ON DELETE CASCADE,
  dimension_id TEXT NOT NULL REFERENCES leader_specialist_dimensions(id),
  score REAL NOT NULL CHECK (score BETWEEN 0 AND 10),
  rationale TEXT NOT NULL,
  PRIMARY KEY (assessment_id, dimension_id)
);

CREATE TABLE IF NOT EXISTS leader_specialist_sources (
  assessment_id TEXT NOT NULL
    REFERENCES leader_specialist_assessments(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL REFERENCES sources(id),
  PRIMARY KEY (assessment_id, source_id)
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  event_date TEXT NOT NULL,
  end_date TEXT,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  significance TEXT NOT NULL,
  category TEXT NOT NULL,
  confidence TEXT NOT NULL CHECK (confidence IN ('low', 'medium', 'high'))
);

CREATE TABLE IF NOT EXISTS event_sources (
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL REFERENCES sources(id),
  evidence_role TEXT NOT NULL DEFAULT 'supports'
    CHECK (evidence_role IN ('controls', 'supports', 'disputes', 'context')),
  locator TEXT,
  PRIMARY KEY (event_id, source_id)
);

CREATE TABLE IF NOT EXISTS event_terms (
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  term_id TEXT NOT NULL REFERENCES leader_terms(id),
  PRIMARY KEY (event_id, term_id)
);

CREATE TABLE IF NOT EXISTS event_indicators (
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  indicator_id TEXT NOT NULL REFERENCES indicator_definitions(id),
  PRIMARY KEY (event_id, indicator_id)
);

CREATE TABLE IF NOT EXISTS event_assessments (
  event_id TEXT PRIMARY KEY REFERENCES events(id) ON DELETE CASCADE,
  choice_assessment TEXT NOT NULL
    CHECK (choice_assessment IN (
      'right', 'mostly-right', 'mixed', 'mostly-wrong', 'wrong',
      'contested', 'not-a-policy-choice'
    )),
  choice_score REAL CHECK (choice_score BETWEEN 0 AND 10),
  choice_reason TEXT NOT NULL,
  union_role TEXT NOT NULL,
  state_local_role TEXT NOT NULL,
  positive_outcomes TEXT NOT NULL,
  lessons TEXT NOT NULL,
  confidence TEXT NOT NULL CHECK (confidence IN ('low', 'medium', 'high')),
  assessment_as_of TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS event_responsibilities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  actor_type TEXT NOT NULL,
  actor_name TEXT NOT NULL,
  responsibility_kind TEXT NOT NULL
    CHECK (responsibility_kind IN (
      'direct-action', 'policy-decision', 'failure-to-prevent',
      'failure-to-respond', 'implementation', 'shared-context',
      'positive-leadership'
    )),
  responsibility_level INTEGER NOT NULL CHECK (responsibility_level BETWEEN 1 AND 5),
  assessment TEXT NOT NULL,
  confidence TEXT NOT NULL CHECK (confidence IN ('low', 'medium', 'high'))
);

CREATE TABLE IF NOT EXISTS policy_evaluation_dimensions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  weight REAL NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS policies (
  id TEXT PRIMARY KEY,
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  leader_term_id TEXT NOT NULL REFERENCES leader_terms(id),
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  policy_type TEXT NOT NULL,
  introduced_date TEXT,
  enacted_date TEXT,
  effective_date TEXT,
  status TEXT NOT NULL
    CHECK (status IN (
      'enacted', 'pending', 'repealed', 'executive-action', 'infructuous'
    )),
  coverage_status TEXT NOT NULL
    CHECK (coverage_status IN ('reviewed', 'partial', 'placeholder')),
  rating_basis TEXT NOT NULL DEFAULT 'retrospective'
    CHECK (rating_basis IN ('retrospective', 'design')),
  summary TEXT NOT NULL,
  intended_goal TEXT NOT NULL,
  rating_score REAL NOT NULL CHECK (rating_score BETWEEN 0 AND 10),
  rating_confidence TEXT NOT NULL
    CHECK (rating_confidence IN ('low', 'medium', 'high')),
  rating_summary TEXT NOT NULL,
  assessment_as_of TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS policy_sources (
  policy_id TEXT NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL REFERENCES sources(id),
  evidence_role TEXT NOT NULL DEFAULT 'supports'
    CHECK (evidence_role IN ('controls', 'supports', 'disputes', 'context')),
  locator TEXT,
  PRIMARY KEY (policy_id, source_id)
);

CREATE TABLE IF NOT EXISTS policy_scores (
  policy_id TEXT NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  dimension_id TEXT NOT NULL REFERENCES policy_evaluation_dimensions(id),
  score REAL CHECK (score BETWEEN 0 AND 10),
  rationale TEXT NOT NULL,
  PRIMARY KEY (policy_id, dimension_id)
);

CREATE TABLE IF NOT EXISTS policy_register (
  id TEXT PRIMARY KEY,
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  leader_term_id TEXT REFERENCES leader_terms(id),
  linked_policy_id TEXT REFERENCES policies(id),
  linked_policy_scope TEXT
    CHECK (linked_policy_scope IN ('bill-specific', 'policy-family')),
  bill_number TEXT,
  title TEXT NOT NULL,
  ministry TEXT,
  introduced_by TEXT,
  introduced_date TEXT NOT NULL,
  introduced_house TEXT,
  bill_type TEXT NOT NULL,
  category TEXT,
  status TEXT NOT NULL,
  source_status TEXT NOT NULL,
  status_as_of TEXT,
  status_note TEXT,
  status_source_id TEXT REFERENCES sources(id),
  passed_lok_sabha_date TEXT,
  passed_rajya_sabha_date TEXT,
  referred_committee_date TEXT,
  report_presented_date TEXT,
  assent_date TEXT,
  act_number TEXT,
  act_year INTEGER,
  introduced_file TEXT,
  passed_lok_sabha_file TEXT,
  passed_rajya_sabha_file TEXT,
  passed_both_houses_file TEXT,
  committee_report_file TEXT,
  gazette_file TEXT,
  synopsis_file TEXT,
  source_id TEXT NOT NULL REFERENCES sources(id),
  review_status TEXT NOT NULL
    CHECK (review_status IN ('discovered', 'reviewing', 'reviewed'))
);

CREATE TABLE IF NOT EXISTS bill_explanations (
  bill_id TEXT PRIMARY KEY REFERENCES policy_register(id) ON DELETE CASCADE,
  proposal_summary TEXT NOT NULL,
  official_purpose TEXT,
  government_rationale TEXT,
  affected_groups_json TEXT NOT NULL,
  potential_benefits TEXT NOT NULL,
  potential_risks TEXT NOT NULL,
  evidence_basis TEXT NOT NULL
    CHECK (evidence_basis IN (
      'title-only', 'official-text', 'independent-review'
    )),
  specificity TEXT NOT NULL
    CHECK (specificity IN ('explicit', 'domain-only', 'opaque')),
  assessment_scope TEXT NOT NULL
    CHECK (assessment_scope IN ('none', 'bill-specific', 'policy-family')),
  verdict TEXT NOT NULL
    CHECK (verdict IN ('not-assessed', 'reviewed-policy')),
  verdict_kind TEXT NOT NULL
    CHECK (verdict_kind IN ('none', 'provisional-design', 'retrospective')),
  verdict_rationale TEXT NOT NULL,
  confidence TEXT NOT NULL CHECK (confidence IN ('low', 'medium', 'high')),
  assessment_as_of TEXT NOT NULL,
  methodology_version TEXT NOT NULL,
  document_url TEXT,
  document_hash TEXT
);

CREATE TABLE IF NOT EXISTS budget_evaluation_dimensions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  weight REAL NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS budgets (
  id TEXT PRIMARY KEY,
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  leader_term_id TEXT NOT NULL REFERENCES leader_terms(id),
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  fiscal_year TEXT NOT NULL,
  presented_date TEXT,
  finance_minister TEXT NOT NULL,
  budget_kind TEXT NOT NULL CHECK (budget_kind IN ('full', 'interim')),
  status TEXT NOT NULL CHECK (status IN ('completed', 'current')),
  coverage_status TEXT NOT NULL CHECK (coverage_status IN ('reviewed', 'partial')),
  rating_basis TEXT NOT NULL CHECK (rating_basis IN ('retrospective', 'proposal')),
  summary TEXT NOT NULL,
  plain_language TEXT NOT NULL,
  total_expenditure_crore REAL,
  revenue_expenditure_crore REAL,
  capital_expenditure_crore REAL,
  fiscal_deficit_crore REAL,
  fiscal_deficit_pct_gdp REAL,
  rating_score REAL NOT NULL CHECK (rating_score BETWEEN 0 AND 10),
  rating_confidence TEXT NOT NULL
    CHECK (rating_confidence IN ('low', 'medium', 'high')),
  rating_summary TEXT NOT NULL,
  assessment_as_of TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS budget_sources (
  budget_id TEXT NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL REFERENCES sources(id),
  evidence_role TEXT NOT NULL DEFAULT 'supports'
    CHECK (evidence_role IN ('controls', 'supports', 'disputes', 'context')),
  locator TEXT,
  PRIMARY KEY (budget_id, source_id)
);

CREATE TABLE IF NOT EXISTS budget_scores (
  budget_id TEXT NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  dimension_id TEXT NOT NULL REFERENCES budget_evaluation_dimensions(id),
  score REAL NOT NULL CHECK (score BETWEEN 0 AND 10),
  rationale TEXT NOT NULL,
  PRIMARY KEY (budget_id, dimension_id)
);

CREATE TABLE IF NOT EXISTS budget_allocations (
  id TEXT PRIMARY KEY,
  budget_id TEXT NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  label TEXT NOT NULL,
  amount_crore REAL NOT NULL CHECK (amount_crore >= 0),
  previous_amount_crore REAL CHECK (previous_amount_crore >= 0),
  change_percent REAL,
  note TEXT NOT NULL,
  source_id TEXT NOT NULL REFERENCES sources(id),
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS budget_points (
  id TEXT PRIMARY KEY,
  budget_id TEXT NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  point_type TEXT NOT NULL
    CHECK (point_type IN ('priority', 'strength', 'risk', 'context')),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  source_id TEXT NOT NULL REFERENCES sources(id),
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS claims (
  id TEXT PRIMARY KEY,
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  leader_term_id TEXT REFERENCES leader_terms(id),
  event_id TEXT REFERENCES events(id),
  policy_id TEXT REFERENCES policies(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  stance TEXT NOT NULL CHECK (stance IN ('achievement', 'concern', 'context', 'mixed')),
  category TEXT NOT NULL,
  confidence TEXT NOT NULL CHECK (confidence IN ('low', 'medium', 'high')),
  as_of_date TEXT NOT NULL,
  review_status TEXT NOT NULL DEFAULT 'published'
    CHECK (review_status IN ('candidate', 'reviewing', 'published', 'superseded', 'rejected')),
  sensitivity TEXT NOT NULL DEFAULT 'standard'
    CHECK (sensitivity IN ('standard', 'sensitive', 'high-risk')),
  reviewer TEXT,
  reviewed_at TEXT,
  knowledge_cutoff TEXT NOT NULL,
  supersedes_claim_id TEXT REFERENCES claims(id),
  correction_note TEXT
);

CREATE TABLE IF NOT EXISTS claim_sources (
  claim_id TEXT NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL REFERENCES sources(id),
  evidence_role TEXT NOT NULL DEFAULT 'supports'
    CHECK (evidence_role IN ('controls', 'supports', 'disputes', 'context')),
  locator TEXT,
  extraction_method TEXT,
  reported_value REAL,
  reported_unit TEXT,
  reported_at TEXT,
  PRIMARY KEY (claim_id, source_id)
);

CREATE TABLE IF NOT EXISTS progress_dimensions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  weight REAL NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS indicator_definitions (
  id TEXT PRIMARY KEY,
  source_code TEXT,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  description TEXT NOT NULL,
  plain_language TEXT NOT NULL,
  example TEXT NOT NULL,
  unit TEXT NOT NULL,
  format TEXT NOT NULL,
  dimension_id TEXT NOT NULL REFERENCES progress_dimensions(id),
  dimension_weight REAL NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('higher', 'lower', 'neutral')),
  score_role TEXT NOT NULL DEFAULT 'scored'
    CHECK (score_role IN ('scored', 'context')),
  transform TEXT NOT NULL CHECK (transform IN ('linear', 'log')),
  goalpost_low REAL NOT NULL,
  goalpost_high REAL NOT NULL,
  source_id TEXT NOT NULL REFERENCES sources(id),
  frequency TEXT NOT NULL,
  state_ready INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS indicator_observations (
  indicator_id TEXT NOT NULL REFERENCES indicator_definitions(id) ON DELETE CASCADE,
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  period INTEGER NOT NULL,
  value REAL NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('observed', 'estimated', 'modelled')),
  source_id TEXT NOT NULL REFERENCES sources(id),
  note TEXT,
  PRIMARY KEY (indicator_id, jurisdiction_id, period)
);

CREATE TABLE IF NOT EXISTS curated_answers (
  id TEXT PRIMARY KEY,
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  question TEXT NOT NULL,
  aliases_json TEXT NOT NULL,
  short_answer TEXT NOT NULL,
  verdict TEXT NOT NULL,
  confidence TEXT NOT NULL CHECK (confidence IN ('low', 'medium', 'high')),
  as_of_date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS answer_claims (
  answer_id TEXT NOT NULL REFERENCES curated_answers(id) ON DELETE CASCADE,
  claim_id TEXT NOT NULL REFERENCES claims(id),
  section TEXT NOT NULL CHECK (section IN ('achievement', 'concern', 'context')),
  sort_order INTEGER NOT NULL,
  PRIMARY KEY (answer_id, claim_id)
);

CREATE TABLE IF NOT EXISTS ingestion_batches (
  id TEXT PRIMARY KEY,
  source_roster_version TEXT NOT NULL,
  query_scope TEXT NOT NULL,
  run_at TEXT NOT NULL,
  agent_model TEXT,
  candidates_found INTEGER NOT NULL DEFAULT 0,
  rejected_records INTEGER NOT NULL DEFAULT 0,
  reviewer TEXT,
  review_status TEXT NOT NULL
    CHECK (review_status IN ('candidate', 'reviewing', 'published', 'rejected')),
  published_at TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_terms_office_dates
  ON leader_terms(office_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_events_jurisdiction_date
  ON events(jurisdiction_id, event_date);
CREATE INDEX IF NOT EXISTS idx_event_responsibilities_event
  ON event_responsibilities(event_id, responsibility_level DESC);
CREATE INDEX IF NOT EXISTS idx_claims_jurisdiction
  ON claims(jurisdiction_id, category);
CREATE INDEX IF NOT EXISTS idx_policies_jurisdiction_date
  ON policies(jurisdiction_id, introduced_date, enacted_date);
CREATE INDEX IF NOT EXISTS idx_policy_register_jurisdiction_date
  ON policy_register(jurisdiction_id, introduced_date DESC);
CREATE INDEX IF NOT EXISTS idx_policy_register_status
  ON policy_register(status, review_status);
CREATE INDEX IF NOT EXISTS idx_bill_explanations_basis
  ON bill_explanations(evidence_basis, verdict);
CREATE INDEX IF NOT EXISTS idx_budgets_jurisdiction_year
  ON budgets(jurisdiction_id, fiscal_year);
CREATE INDEX IF NOT EXISTS idx_budget_allocations_budget
  ON budget_allocations(budget_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_observations_series
  ON indicator_observations(jurisdiction_id, indicator_id, period);
`

export function applySchema(db: DatabaseSync) {
  db.exec(schemaSql)
}
