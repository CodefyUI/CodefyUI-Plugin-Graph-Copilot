---
id: experiments-and-research
title: Experiments and research
sidebar_label: Experiments & research
---

# Experiments and research

Graph Copilot can turn a graph-design question into a bounded comparison: create candidate variants from the active graph, execute them without placing them on the canvas, rank a numeric metric, and suggest follow-up analyses. This is useful for rapid ablations and hypothesis generation, but the current result is a **pilot study**, not automatically paper-grade evidence.

## What is implemented

The agent exposes `run_graph_experiments` for explicit variants and `optimize_graph_parameters` for deterministic searches over existing safe parameters. A study contains:

- a falsifiable hypothesis;
- one numeric objective and `maximize` or `minimize` direction;
- one or more named variants, each expressed as CodefyUI `GraphOp` operations;
- optional repetitions and bounded concurrency;
- an optional request to apply the best variant.

The optimizer accepts one to four existing-node `int`, `float`, `bool`, or `select` bindings. `grid` evaluates the complete Cartesian product and refuses to truncate an oversized plan. `seeded_random` uses a versioned `mulberry32-v1` planner with a required uint32 seed and unique assignments. That seed reproduces candidate selection only; it does not set graph-node RNG state. Secret, string, file, tensor, preset, and unknown parameters are rejected. The generated `set_params` candidates use the same approval, isolation, shared turn budget, ranking, and promotion guards as explicit studies.

The current safety and resource limits are:

| Limit | Current value |
| --- | --- |
| Variants per study | 8 maximum |
| Repetitions per variant | 1 to 5 |
| Total executions | 16 maximum |
| Concurrent executions | 1 by default, 2 maximum |
| Timeout per execution | 10 minutes |
| Browser-local stored studies | 20 summaries |
| Portable study retention | 10 content-addressed bundles |
| Portable bundle import size | 5 MiB maximum |

Ask naturally; the model constructs the tool request. For example:

> Compare the current model with widths 64, 128, and 256. Maximize validation accuracy, run three repetitions each, keep the current graph as the baseline, and do not apply a winner.

Or, when you really want the canvas changed:

> Try learning rates 0.001, 0.003, and 0.01, minimize validation loss, and apply the best design if the graph has not changed while the runs execute.

Before any candidate runs, Graph Copilot shows every node type that will participate and the candidate settings/parameter values after schema-aware redaction. The same confirmation lists candidate, repetition, and total execution counts, concurrency, promotion intent, and a warning that nodes may write files, call networks, use GPU time, or incur API costs. The agent cannot approve this dialog for you.

## The isolated experiment loop

For every study, Graph Copilot performs the following sequence:

1. **Capture a baseline.** Read and deep-clone the active serialized graph and record a fingerprint for promotion conflict detection.
2. **Construct variants.** Apply each variant's GraphOps to its own in-memory clone. Same-batch refs and structural operations are supported.
3. **Validate.** Mirror CodefyUI's frontend parameter name/type/select/range checks, then submit each candidate to `POST /api/graph/validate`. Invalid candidates are preserved in the result with their errors and are not executed.
4. **Approve and execute.** After explicit user confirmation, send every valid candidate to the existing CodefyUI `/ws/execution` endpoint. The graph is unsaved, note nodes are filtered out, full output recording is deliberately disabled (`record_outputs: false`), and a unique non-persistent execution identity is used. Repetition jobs are round-robin interleaved to reduce simple order drift.
5. **Measure.** Collect scalar numeric values exposed by node `output_summary` and numeric `progress`, plus client-observed runtime. Full tensors and output artifacts are not retained.
6. **Aggregate.** Keep an immutable scalar run record for each attempted repetition, including status, duration, resolved objective identity/value/source, other numeric observations, and errors. A candidate receives a mean, sample standard deviation, and descriptive 95% Student-t interval only when every scheduled repetition succeeds, exposes the objective, and resolves it to the same canonical metric identity. With one explicit baseline, non-baseline candidates also receive a direction-adjusted mean change and small-sample Hedges g when variance permits.
7. **Rank.** Rank only fully observed candidates when all rankable candidates share that identity. Exact top-mean ties are reported as ties and are not broken by noisy browser runtime. Incomplete, missing-metric, inconsistent-key, or incomparable candidates remain visible but cannot win.
8. **Optionally promote.** If `apply_best` was requested, re-read the live graph. Automatic promotion is restricted to variants containing only preflighted `set_params`, and proceeds through `api.graph.applyOperations` only if no graph-change event occurred and the fingerprint still matches the baseline. Structural winners remain review-only summaries; partial parameter failures are reported instead of claiming success.
9. **Capture portable evidence, then retain a summary.** Build a versioned bundle containing the redacted baseline, captured redacted variant GraphOps, repetitions/concurrency/promotion intent, scalar run records and sources, derived results, producer facts, provenance, and an explicit redaction report; compute SHA-256 over its canonicalized semantic content and save it blob-first under that digest. Then save the compact Experiment Lab summary and value-free operation descriptions. A capture or storage failure becomes a persisted warning and never turns a completed or promoted study into a retryable execution error.

Candidate graph changes stay off-canvas until step 8. This avoids cluttering the editor with temporary tabs and makes comparison runs cheap to coordinate. It does not isolate external node side effects such as file writes or network calls.

## Portable studies and candidate graphs

Portable study format v1 is an immutable evidence envelope, not executable code. Before accepting a file, Graph Copilot enforces strict keys, types, dates, count/depth/string limits, baseline graph references, variant `GraphOp` shapes, unique run slots, and secret-reference locations. It parses the file and verifies SHA-256 over canonicalized semantic content; the imported bytes themselves do not need canonical whitespace or key order. Validation deliberately does not require every captured variant operation to reference an existing baseline node, because an invalid operation can be part of the recorded failure evidence. Selecting a file performs a **zero-write preview**. Only the separate **Import read-only** action stores its content-addressed blob and projects evidence into Experiment Lab. Import never calls validation, execution, `applyOperations`, or a network endpoint.

The bundle records the exact observed scalar keys, their canonical identities and collection sources, plus the original derived summary. During import, Graph Copilot recomputes the derived statistics from the raw run records and rejects disagreement before projecting the evidence into Experiment Lab. It can therefore rebuild tables and exports without asking a model to reinterpret prose. This is still unauthenticated evidence: the digest proves neither who created the study nor that the observations came from the claimed execution. The bundle also records that the browser runner does not assign graph-node RNG seeds. The optimizer's versioned plan and planner seed are provenance facts; that planner seed still is not an execution seed.

Secrets are not hashed or partially revealed. Schema-declared secret params, unknown-schema/unknown params, credential-shaped fields, and presets without a trustworthy schema become explicit `SecretRef` placeholders with exact JSON Pointer locations. Known exact secret echoes are removed from human-readable evidence. No generic system can recognize every credential hidden inside an ordinary string, so that limitation is recorded in provenance and users should still avoid putting secrets in labels, hypotheses, or chat text.

Experiment Lab can derive host-shaped candidate JSON by reapplying the captured, redacted GraphOps to the verified redacted baseline. Missing secret bindings become empty strings and produce a visible warning. Portable v1 does not persist the exact prepared graph that was sent to execution, so node-schema defaults or other preparation may differ and a captured invalid operation may make derivation fail visibly. This is a data-only convenience, not an execution replay: it does not open a tab or modify the live graph. The current CodefyUI plugin contract has no create-tab API, and portable v1 intentionally has no automatic replay button or unsafe “fork and re-sign” shortcut.

## Choosing a metric

Prefer an explicit metric key when possible. The resolver accepts:

- an exact key such as `metric-node.accuracy`;
- a case-insensitive exact key;
- a node-type alias such as `Accuracy.accuracy` when only one node of that type exists;
- a unique suffix such as `accuracy`;
- `auto`, which chooses from common maximize metrics (`accuracy`, `f1`, `reward`, `score`, `auc`, and similar) or minimize metrics (`val_loss`, `loss`, `error`, `mae`, `mse`, `rmse`, `runtime_ms`, and similar).

If a suffix maps to more than one canonical metric source, it is ambiguous even when the current numeric values happen to be equal. Use the full key to resolve the ambiguity. A candidate is rankable only if every scheduled repetition finishes and emits the same resolved objective identity, and all compared candidates must share it; a successful execution without that numeric metric is retained but cannot contribute a winner.

:::tip Design metrics into the graph
End a comparison graph with a node that emits the primary evaluation value as a numeric output summary. Use a validation or held-out metric rather than training loss when the research question is about generalization.
:::

## Reproducibility checklist

The runner aggregates what CodefyUI emits; it does not currently create a complete reproducibility envelope. Before treating a result as research evidence:

1. **Keep an explicit baseline.** Include an empty-operations variant so every candidate starts from the exact same captured graph.
2. **Control randomness.** The current runner reuses the same candidate graph for every repetition; it does not assign seeds. Put an explicit seed schedule into the graph or create seed-specific studies, and never describe ordinary repetitions as independent seeds unless the graph actually changes or randomizes them.
3. **Pin the data split.** Record dataset identity, preprocessing, split, and any sampling order. Do not tune against the final test set.
4. **Pin the environment.** Record CodefyUI/plugin revisions, node-pack versions, Python/package versions, device, driver/runtime, and hardware.
5. **Control concurrency.** Use concurrency 1 for runtime comparisons and when GPU contention could affect either speed or numerical behavior.
6. **Check metric identity.** Select an exact metric key and verify that every ranked candidate produced the same semantic quantity.
7. **Retain the study inputs.** Export the portable study bundle as the primary evidence envelope; use the run CSV and research brief as human-analysis views. The bundle retains the redacted baseline, captured redacted GraphOps, recorded run scalars/sources, and a cross-checked derived result, while browser conversation history is only continuity context. This supports evidence inspection, not execution replay or authentication. The bundle still does not contain the exact prepared execution graph, full tensors, checkpoints, artifacts, dataset hashes, or a complete environment fingerprint unless an upstream source supplied those provenance facts.
8. **Repeat adequately.** Three runs can reveal obvious instability; five is still a small pilot. Choose sample size from expected variance and the effect size that matters for the claim.
9. **Use appropriate statistics.** The plugin reports mean, sample spread, a small-sample 95% Student-t interval, and Hedges g versus one explicit baseline. These are descriptive screening statistics: it does not perform a hypothesis test, multiple-comparison correction, power analysis, or practical-equivalence bound.
10. **Replicate.** Confirm the conclusion on a held-out dataset or a second benchmark and, when possible, on another environment.

The client-observed `system.runtime_ms` value is convenient for screening, not a calibrated benchmark. Browser scheduling, warm-up, cache state, concurrent work, and device utilization can all affect it.

## From observations to paper questions

The agent produces an ablation-style lead only when it can verify one empty baseline plus one-factor `set_params` variants. Other winners are labeled replication leads, and high run-to-run variation can produce a stability/sensitivity lead. Treat all of these as **next hypotheses**, not novelty or significance claims.

A useful research path usually moves through four levels:

| Level | Question | Minimum evidence to collect next |
| --- | --- | --- |
| Observation | Did one controlled variant rank higher in this pilot? | Exact metric, baseline, all candidate values, and failures |
| Mechanism | Which component caused the difference? | Focused one-factor ablations and checks for confounders |
| Robustness | Does the effect persist? | More independent seeds, datasets, architectures, and environments |
| Contribution | Is the result new and meaningful? | Literature review, strong baselines, statistical analysis, and reproducible artifacts |

Good candidate questions include:

- Which graph component accounts for most of the quality/runtime trade-off?
- Is a gain robust across seeds, data regimes, and model sizes?
- Does an interaction between two nodes outperform either change alone?
- Can a smaller candidate match a larger graph within a practical equivalence margin?
- Which data slice or failure mode explains a high-variance result?

Avoid statements such as “the method is proven better,” “the result is statistically significant,” or “this is novel” based only on the generated summary. The plugin does not search the literature or perform confirmatory inferential tests today.

## Current limitations

- Coordination lives in the browser; active work does not survive closing or reloading the page.
- There is no durable server queue, resumable job, worker lease, resource scheduler, or distributed executor owned by the plugin.
- Compact summaries omit raw graph specifications, but the separately retained portable bundle contains a redacted baseline and captured redacted variant GraphOps. It still lacks the exact prepared execution graph, automatic dataset/environment discovery, checkpoints, complete artifacts, and graph-node seed control.
- Portable bundles are browser-local, capped at 10, and limited to 5 MiB each. Their mutations and the compact Lab-session list require exclusive Web Locks; without that browser capability, existing evidence stays readable but new browser-local mutations fail closed. SHA-256 is checked over parsed, canonicalized semantic content, so raw JSON formatting may change without invalidating the file. The digest and raw/derived cross-checks provide internal consistency, not authorship, provenance authentication, or proof that the claimed runs occurred.
- Import and candidate materialization are deliberately read-only/data-only. There is no automatic replay, re-sign/fork operation, environment dependency resolver, or CodefyUI candidate-tab API.
- Built-in search is limited to bounded complete grids and versioned seeded-random plans over existing safe parameters. There is no Bayesian, evolutionary, early-stopping, successive-halving, or multi-objective optimizer.
- Automatic promotion applies only a parameter-only winner and is protected by both graph-change events and a live fingerprint. Structural winners remain summaries, and parameter promotion is not a transactional server-side compare-and-swap.
- Preset nodes do not appear in `getNodeDefinitions()`, so this conservative runner refuses preset parameter sweeps instead of guessing their synthesized schema.
- CodefyUI's execution WebSocket does not currently consume embedded preset definitions. A portable preset that is absent from the server registry can therefore validate but still fail at execution; that host inconsistency is retained as run evidence.
- The host API exposes neither an active-tab identity nor a read-only-tab flag. Revision tracking catches normal tab switches, but a future core contract is still needed for a true tab-bound compare-and-swap.
- Node execution can have side effects outside the graph state.
- Automatic insights are heuristic prompts for follow-up work.

See [Architecture and CodefyUI compatibility](./architecture.md) for the host boundary and [Agent roadmap](./roadmap.md) for the durable server-side design required to remove these limitations.
