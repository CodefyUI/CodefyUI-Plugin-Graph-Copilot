---
id: graph-editing
title: How it edits the graph
sidebar_label: How it edits the graph
---

# How it edits the graph

On every message, the assistant receives a compact **catalog** of your installed node types plus a **snapshot** of the current graph. It edits the canvas through two tools.

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

## Undo

Because each batch is committed as a single undo step, **Ctrl+Z reverts an entire AI edit** in one go.
