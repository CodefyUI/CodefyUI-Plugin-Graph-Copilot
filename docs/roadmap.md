---
id: roadmap
title: Agent roadmap
sidebar_label: Agent roadmap
---

# Agent roadmap

The long-term goal is an agent that can plan graph changes, execute controlled studies, improve designs under a budget, and help researchers turn measurements into defensible questions. The current browser implementation is a useful first vertical slice, but **a durable backend agent does not exist yet**.

The roadmap below keeps that boundary explicit and identifies the work that belongs in this plugin versus the work that requires CodefyUI core changes.

## Phase 0 — browser agent and isolated pilot studies

**Status: implemented in this repository.**

- Professional workbench UI with chat, settings, history, graph context, and live tool stages.
- Multi-round model/tool loop using the CodefyUI LLM proxy.
- Validated GraphOps for canvas construction and editing.
- Isolated candidate construction from an active-graph snapshot.
- CodefyUI validation and WebSocket execution of unsaved candidates.
- Numeric metric collection, repetitions, descriptive aggregation, ranking, and failure retention.
- Optional parameter-only winner promotion with a live-graph conflict check; structural winners remain proposals.
- Browser-local conversation and experiment-summary persistence.
- Portable studies with schema-guided secret references, a SHA-256 check over canonicalized semantic content, raw/derived evidence cross-checks, preview-first read-only import, and data-only candidate graph derivation.
- Evidence-aware warnings and research follow-up suggestions.

This phase is interactive and browser-owned. It is appropriate for bounded pilot comparisons while the page remains open.

## Phase 1 — reproducibility envelope and portable studies

**Primary owner: Graph Copilot, with small stable metadata hooks from CodefyUI.**

**Browser slice implemented now:** portable format v1 captures a redacted immutable baseline, captured redacted variant GraphOps, objective/repetitions/concurrency/promotion intent, scalar run identities/sources/errors, derived statistics, producer/provenance facts, and an explicit redaction report. It checks SHA-256 over parsed, canonicalized semantic content, cross-checks derived statistics against raw run records, supports content-addressed local retention, zero-write previews, and explicit read-only import, and can derive candidate JSON by reapplying the captured operations. The candidate download is not the exact prepared execution graph: unresolved secrets are blank and schema defaults may differ. The format neither authenticates its author nor automatically executes an imported study or claims a complete environment envelope.

Complete the reproducibility envelope and safe replay path:

- retain migrations and compatibility tests for the implemented immutable baseline plus per-variant GraphOps format;
- a CodefyUI core API to materialize a selected candidate as a new, clearly labeled editor tab (the current v1/v2 plugin graph contract cannot create or switch tabs);
- explicit seeds and repetition mapping;
- richer metric schemas and artifact identities beyond the implemented scalar canonical-key/source records;
- dataset/split identifiers and content hashes where available;
- CodefyUI, plugin, node-pack, Python/package, device, and driver fingerprints;
- per-run timestamps/execution identities and output artifact references beyond the implemented scalar values, sources, errors, and durations;
- promotion decision and graph revision before/after;
- safe user-supplied secret binding at replay time, authenticated authorship when needed, and schema migrations beyond portable v1.

The implemented slice already recomputes and cross-checks displayed summaries from internally consistent scalar run records without asking the model to reinterpret them. Those records remain unauthenticated. Full phase acceptance still requires replaying an exported study in a clean environment, resolving dependencies/secrets explicitly, identifying any non-reproducible input, and reproducing the ranking without hidden browser state.

## Phase 2 — durable experiment jobs in CodefyUI core

**Requires a CodefyUI core extension. It cannot be delivered by this frontend-only manifest.**

Add a server-owned job service with durable state and an explicit public API. Illustrative concepts (not current endpoints) include:

- create a study/job from a versioned experiment specification;
- query job, candidate, repetition, and artifact state;
- stream durable events with cursor-based replay;
- pause, resume, cancel, retry, and recover after process restart;
- lease work to bounded execution workers;
- persist checkpoints, metrics, logs, and provenance;
- enforce per-user compute, concurrency, storage, and time budgets;
- use idempotency keys so retries do not duplicate runs;
- promote a winner with an atomic graph-revision precondition.

CodefyUI core would need a plugin capability model or another supported extension point for service routes, migrations, workers, and lifecycle hooks. Arbitrary browser calls and Python node discovery are not substitutes for that lifecycle.

The proposed manifest entry, typed handler/context, job state machine, budgets, persistence model, exact metric selector, event replay, and frontend workspace API are specified in [Durable backend agent contract](./backend-agent-contract.md).

Acceptance evidence should demonstrate that a submitted study finishes after the initiating browser closes, survives a CodefyUI restart, resumes without duplicating completed repetitions, and exposes a complete audit trail.

## Phase 3 — budgeted optimization agent

**Depends on Phase 2.**

**Browser slice implemented now:** complete bounded grids and versioned seeded-random planning for 1–4 existing safe parameters, compiled into exact `set_params` candidates under the current approval and 16-run budget. Durable/adaptive optimization still depends on Phase 2.

Move from a fixed model-proposed candidate list to a controlled optimization service:

- typed search spaces derived from node parameter schemas;
- grid/random search for transparent baselines;
- Bayesian or evolutionary search when justified by cost and dimensionality;
- early stopping and successive-halving style resource allocation;
- single- and multi-objective optimization with Pareto-front reporting;
- constraint handling for memory, latency, model size, and minimum quality;
- duplicate-candidate detection and safe cache reuse;
- explicit total-run, wall-clock, compute, and cost budgets;
- human approval gates before expensive runs or graph promotion.

The optimizer must keep the search algorithm separate from the LLM. The model can propose hypotheses and search spaces; deterministic services should own scheduling, accounting, ranking, and replay.

Acceptance evidence should compare optimization strategies on fixed benchmark search spaces, show budget accounting under cancellation/retry, and reproduce every promoted candidate from provenance records.

## Phase 4 — research analysis workbench

**Depends on reproducible, durable results.**

**Descriptive slice implemented now:** immutable per-run scalar records, 95% Student-t intervals, Hedges g against one explicit baseline, formula-safe CSV export, and an evidence-labeled Markdown research brief. Confirmatory and cross-study analysis remains future work.

Build analysis features that help discover defensible paper questions without overstating the evidence:

- confidence intervals, effect sizes, practical-equivalence tests, and multiple-comparison controls;
- power/sensitivity analysis and recommended follow-up sample sizes;
- data-slice, error, robustness, and interaction analysis;
- leakage, confounding, and metric-mismatch checks;
- comparison against registered baselines and prior internal studies;
- provenance-linked tables, plots, and notebook/data exports;
- optional literature connectors with explicit citations and novelty caveats;
- preregistered hypotheses and holdout protection.

Generated “paper ideas” should always link to the exact observations that motivated them and clearly label missing evidence. Novelty remains a literature-review question, not a model inference.

## Cross-cutting requirements

Every phase should preserve these invariants:

### Safety and authority

- Candidate construction is isolated from the active graph.
- Expensive execution and winner promotion require explicit user policy.
- Promotion checks the exact baseline revision and remains undoable.
- Node side effects, network access, secrets, and output retention are visible and policy-controlled.

### Reproducibility

- Every run has immutable inputs, code/environment identity, seed, metric schema, and artifacts.
- Aggregation is derived from raw values, not only from model-generated prose.
- Caches and retries are represented in provenance.

### Resource governance

- Concurrency and GPU memory are scheduler-controlled.
- Users can set hard budgets and cancel work.
- Partial failures remain inspectable and do not silently disappear from rankings.

### Honest research communication

- Pilot observations, statistical evidence, robustness, and novelty are separate claims.
- Uncertainty, missing runs, ambiguous metrics, and selection bias are surfaced.
- Suggested next experiments are distinguishable from measured results.

## Why CodefyUI core work is necessary

The released plugin API is intentionally a browser API: UI containers, graph access, authenticated fetch, and namespaced browser storage. CodefyUI `main` adds custom node renderers, but not a plugin-owned durable service lifecycle. The existing `/ws/execution` endpoint executes a submitted graph and streams one socket session; it is not an experiment queue.

Therefore the durable-agent milestone must be designed with CodefyUI core rather than hidden inside the plugin bundle. Until that extension exists, documentation and UI must describe Graph Copilot accurately as a browser-coordinated agent using CodefyUI's existing backend execution engine.
