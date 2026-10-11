---
id: graph-editing
title: How it edits the graph
sidebar_label: How it edits the graph
---

# How it edits the graph

On every message, the assistant receives a compact **catalog** of your installed node types plus a **snapshot** of the current graph. It can look up exact schemas before wiring nodes; catalog names and research suggestions alone are not port evidence.

## Ask or Edit

| Mode | What it can do |
| --- | --- |
| **Ask** | Read the graph, look up schemas, research candidates, and explicitly validate structure. It cannot dispatch graph mutations or automatically repair the graph. |
| **Edit** (default) | Use the same read-only tools and apply graph-operation batches to the current canvas. |

The mode is fixed for each run. Ask is **executor-enforced read-only**: the mutation tool is omitted from the model's tool list, and an attempted mutation is rejected even if the model calls it anyway.

## The five tools

| Tool | Purpose |
| --- | --- |
| `apply_graph_operations` | Apply a non-empty batch of up to 100 graph operations through CodefyUI's plugin API. Available only in Edit. **One batch = one host undo step.** |
| `get_current_graph` | Re-read the canvas, including manual edits made during the conversation. |
| `get_node_schemas` | Look up exact catalog node types via `node_types`, including ports, required/optional inputs, and parameter types, defaults, and ranges. |
| `validate_graph` | Request read-only server-side **structural validation**, not graph execution. |
| `research` | Research up to four independent `questions` in parallel. Index-only sub-agents suggest candidate node types; exact schemas must still be checked before wiring. |

## Operations and receipts

Supported operations are `add_node`, `connect`, `set_params`, `remove_node`, `remove_edge`, `clear_graph`, and `auto_layout`. The assistant is asked to:

- use exact node-type names from the catalog and exact schema port names;
- connect every required input of nodes it adds;
- set params respecting their types and ranges;
- finish a structural batch with one `auto_layout`;
- never clear the graph unless you explicitly ask to start over and confirm.

Malformed, empty, or oversized batches are rejected **in full before host dispatch**. For a well-shaped batch, CodefyUI validates operation semantics: unknown types, port mismatches, and out-of-range parameters are rejected per-operation. Known failing operations are skipped and their errors are fed back to the model; successful operations remain applied. This is not an all-or-nothing transaction.

Results are matched using **`OpResult.index`**, not their position in the returned array. Missing, duplicate, or unreadable receipts mean **unknown effects**, never assumed success. An `add_node` ref is a temporary alias within its own batch; later batches must use real node IDs from the receipt's `refs` map or `get_current_graph`.

## Confirming a clear

`clear_graph` must be the **only operation in its batch**. A mixed clear-plus-add/connect/layout batch is rejected without changes, not silently split into separate batches.

- The panel asks for a one-time confirmation bound to the **run, tool call, and full, untruncated graph snapshot**.
- Approval is checked again immediately before dispatch. If the graph changed while you were deciding, the confirmation is invalid and the run ends incomplete; a fresh confirmation is required.
- **Keep graph** declines the clear and ends the run. The assistant must not work around a refusal by removing nodes individually.
- Stop, opening Settings or History, or closing the panel cancels the pending confirmation.

## Reading progress and results

Each tool call appears as a live **stage row** below its assistant reply. Expand it to inspect the result payload. Only an active tool shows a spinner; terminal outcomes distinguish completed, error, cancelled, not executed, and unknown. Partial text and receipts are kept when a run stops or fails.

The terminal run result and structural-validation result are **separate**:

| Run status | Meaning |
| --- | --- |
| `completed` | The agent finished its bounded workflow without unresolved tool errors. It does not mean the pipeline executed successfully. |
| `cancelled` | The run stopped, including a declined clear. The UI labels this **Stopped**. Earlier changes are retained. |
| `failed` | A request, stream, initialization, or host error ended the run. Check its mutation receipts before recovering. |
| `incomplete` | The run could not establish completion, for example because a tool/repair limit was reached or receipts/validation were unavailable or stale. |

| Structure status | Meaning |
| --- | --- |
| `valid` | The checked graph snapshot passed structural validation. |
| `invalid` | The validator reported structural issues. |
| `unavailable` | Validation could not be obtained, including transport, HTTP, or malformed-response errors. This is not proof of an invalid graph. |
| `not_run` | No current validation result was obtained. A read-only answer can complete without validation. |
| `stale` | The graph changed relative to the guarded snapshot; an older validation result cannot describe the current graph. |

> **Structure validated is not execution proof.** Validation checks issues such as unknown node types, missing required inputs, and parameter ranges. It does not run the pipeline or establish runtime success.

## Bounded validation and repair

Automatic finish-time validation and repair are triggered **only by actual graph edits in the current run**. Ask and read-only answers do not repair pre-existing faults; an explicit `validate_graph` call remains read-only in either mode. Validation still checks the current graph as a whole, not just an edited subgraph.

Repair is limited to the current run's authorized edits. Executor guards reject clearing, parameter changes/removal of unrelated existing nodes, and wiring changes to unrelated target inputs. Needed new nodes and existing outputs can still supply affected inputs; ordinary `auto_layout` may reposition the canvas.

Invalid structure can trigger at most two repair nudges, within a maximum of 16 tool rounds. Unavailable validation does not trigger repair. The final check must describe the last edited snapshot; a graph change during validation makes the result stale and incomplete. Exhausted limits, out-of-scope repairs, or unresolved issues are incomplete, not success.

## Stop, recovery, and undo

- **Stop prevents new tool dispatch**, but cannot interrupt a synchronous host mutation already in progress or undo changes already applied. Pending calls receive explicit cancelled/not-executed results rather than remaining running forever.
- **Retry**, when offered, is restricted to attempts where a host mutation was **never dispatched**. It reuses the original request and attachments without duplicating the user request in the visible or provider history; prior attempt results remain recorded. A declined clear is not retried.
- After **any mutation dispatch**, even when all reported operations failed, use **Continue from current graph** instead of replaying the request. This adds a new continuation instruction and re-reads the live graph, keeping earlier receipts. The same rule applies when mutation effects are unknown.
- Use **CodefyUI's Undo (Ctrl+Z)** to revert an applied batch. One run may contain several batches and therefore several undo steps; the panel does not provide a transaction, automatic rollback, or a separate Undo API.

## Keeping your place

Opening Settings or History, or closing the panel, stops the active run while keeping the chat mounted and preserving its draft and staged attachments for the current conversation. This is an in-memory panel-session convenience, not draft persistence across a browser reload. Wait for the stopped run to settle before switching or starting a conversation. Late results belong to their original conversation and cannot overwrite a different active chat.

Stored tool calls are context, not commands to replay. The provider history window keeps complete assistant/tool-call/result groups together and excludes orphaned tool results from older chats; see [Architecture](./architecture.md).

Starter prompts fill the composer for review rather than sending immediately. Enter sends only when the composer is ready; Shift+Enter adds a newline, and IME composition does not submit. Attachment-read errors stay visible and must be removed before sending. Scrolling up pauses automatic following; **Jump to latest** restores it.
