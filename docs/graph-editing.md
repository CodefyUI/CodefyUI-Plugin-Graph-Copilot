---
id: graph-editing
title: How the agent edits the graph
sidebar_label: Graph editing
---

# How the agent edits the graph

On every message, the assistant receives a compact **catalog** of your installed node types plus a schema-redacted **snapshot** of the current graph. Declared secrets, credential-shaped fields, and values under unknown schemas or parameters are not included verbatim. It edits the canvas through two tools.

Experiment variants do not use these tools to mutate the canvas. They apply the same GraphOp vocabulary to in-memory clones and submit the resulting serialized graphs for validation and execution. See [Experiments and research](./experiments-and-research.md).

## The two tools

- **`apply_graph_operations`** — a batch of graph edits applied through CodefyUI's plugin API with full validation. Unknown types, port mismatches, and out-of-range parameters are rejected per-operation and reported back to the model so it can fix itself. **One batch = one undo step.**
- **`get_current_graph`** — re-reads the canvas, so manual edits you make mid-conversation are respected.

## Operations

A batch is a list of operations such as `add_node`, `connect`, `set_params`, `remove_node`, and `auto_layout`. The assistant is asked to:

- use exact node-type names from the catalog;
- connect every required input of nodes it adds;
- set params respecting their types and ranges;
- finish a structural batch with one `auto_layout`;
- never clear the graph unless you explicitly ask to start over.

## Self-correction

Failing operations are skipped and reported; the assistant reads the per-operation errors and retries within the same turn (up to a fixed number of tool rounds). Every tool call renders live as a **stage row** under the assistant's reply — a spinner while it runs, then ✓ or ⚠ with a humanized summary (e.g. `add_node ×2 — 2 nodes · 1 edge`); click a row to expand the full result payload.

When the assistant attempts to finish a graph-editing turn, a runnability gate validates the live graph. An invalid result triggers up to **two corrective model rounds** with the validation errors. If the graph is still invalid after those rounds, Graph Copilot replaces the would-be completion with an explicit blocked/invalid report; it never accepts the invalid graph as a successful completion.

## Undo

Because each batch is committed as a single undo step, **Ctrl+Z reverts an entire AI edit** in one go.

When a parameter-only experiment winner is promoted, its `set_params` operations are preflighted and committed through the same API after both active-graph revision and baseline-fingerprint checks. If you edited or switched the graph while the study ran, promotion is refused rather than applying operations to stale state. Structural winners are shown as value-free review summaries and are not automatically applied.

A verified portable study can also derive downloadable graph JSON by reapplying a candidate's captured, redacted GraphOps to its redacted baseline. This is deliberately separate from promotion: unresolved secrets are blank, and downloading never calls `applyOperations` or changes the canvas. Because portable v1 does not persist the exact prepared graph sent to execution, schema defaults and other execution-time preparation may differ from the original run; the download is not a replay artifact.
