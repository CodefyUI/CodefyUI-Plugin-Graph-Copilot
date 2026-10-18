---
id: graph-editing
title: How the agent edits the graph
sidebar_label: Graph editing
---

# How the agent edits the graph

On every message, the assistant receives a compact **catalog** of installed node types plus a schema-redacted **snapshot** of the current graph. Declared secrets, credential-shaped fields, and values under unknown schemas or parameters are not included verbatim. Before wiring nodes, the assistant must look up exact schemas; catalog names and research suggestions alone are not port evidence.

Experiment variants apply the same GraphOp vocabulary to **in-memory clones**, not directly to the canvas. Execution can still have real file, network, or other node side effects. See [Experiments and research](./experiments-and-research.md).

## Ask or Edit

| Mode | What it can do |
| --- | --- |
| **Ask** | Read the graph and schemas, research candidates, explicitly validate structure, and inspect host runs where supported. It cannot change the canvas, start live/experimental execution, or automatically repair the graph. |
| **Edit** (default) | Use the read-only tools, apply canvas-operation batches, and request live runs or bounded studies with separate human approval. |

The mode is fixed for each agent turn. Ask is **executor-enforced read-only**: canvas-edit and execution tools are omitted from the model's tool list and rejected at dispatch even if the model calls them anyway. An isolated candidate graph does not make its execution read-only.

## Tool capabilities

| Tool | Purpose | Mode |
| --- | --- | --- |
| `get_current_graph` | Re-read the canvas, including manual edits made during the conversation. | Ask / Edit |
| `get_node_schemas` | Look up exact catalog node types via `node_types`, including ports, required/optional inputs, and parameter types, defaults, and ranges. | Ask / Edit |
| `validate_graph` | Request server-side **structural validation**, not execution. | Ask / Edit |
| `research` | Research up to four independent `questions` in parallel. Index-only sub-agents suggest candidate node types; exact schemas remain necessary before wiring. | Ask / Edit |
| `list_runs` | Read recent host runs, including runs started from the editor, when the host exposes run history. | Ask / Edit |
| `get_run` | Read one host run's status, recorded metrics, and available artifact metadata; it does not restart the run. | Ask / Edit |
| `apply_graph_operations` | Apply a non-empty batch of up to 100 canvas operations. **One batch = one host undo step.** | Edit only |
| `run_graph` | Validate and, after approval, execute the live graph with streamed progress and compact outputs. | Edit only |
| `run_graph_experiments` | Approve, execute, measure, and rank isolated candidate graphs; promotion remains separately constrained. | Edit only |
| `optimize_graph_parameters` | Compile a bounded deterministic parameter search and run it through the same study approval/budget. | Edit only |

`list_runs` and `get_run` feature-detect the host's `/api/runs` surface. On hosts without it, including CodefyUI 1.3.0, unavailable is not evidence that no run exists. Live runs, studies, model catalogs, and reasoning controls have distinct host capability requirements; see [Architecture and CodefyUI compatibility](./architecture.md).

## Operations and receipts

Supported canvas operations are `add_node`, `connect`, `set_params`, `remove_node`, `remove_edge`, `clear_graph`, and `auto_layout`. The assistant is asked to:

- use exact node-type names and schema port names;
- connect every required input of nodes it adds;
- respect parameter types and ranges;
- finish a structural batch with one `auto_layout`;
- never clear the graph unless you explicitly ask to start over and confirm.

Malformed, empty, or oversized batches are rejected **in full before host dispatch**. For a well-shaped batch, CodefyUI validates operation semantics: unknown types, port mismatches, and out-of-range parameters are rejected per-operation. Known failing operations are skipped and reported to the model; successful operations remain applied. This is not an all-or-nothing transaction.

Results are matched using **`OpResult.index`**, not array position. Missing, duplicate, or unreadable receipts mean **unknown effects**, never assumed success. An `add_node` ref is a temporary alias within its own batch; later batches use real node IDs from the receipt's `refs` map or `get_current_graph`. Displayed/persisted graph context and tool arguments are schema-redacted; original provider-generated arguments remain only in the active tool-execution path.

## Confirming a clear

`clear_graph` must be the **only operation in its batch**. A mixed clear-plus-add/connect/layout batch is rejected without changes, not silently split.

Clear, live-run, and study decisions use native **document-modal dialogs** (`ConfirmDialog`); the workbench itself remains non-modal. Initial focus goes to the safe decline action: **Keep graph** or **Cancel**. Escape declines only the topmost decision and keeps the workbench open. Dismissing a dialog is not approval; execution still requires explicit approval.

- The panel asks for one-time confirmation bound to the **agent turn, tool call, and full, untruncated graph snapshot**.
- Approval is checked again immediately before dispatch. If the graph changed while you were deciding, confirmation is invalid and the turn ends incomplete; a fresh confirmation is required.
- **Keep graph** declines the clear and ends the turn. The assistant must not bypass refusal by removing nodes individually.
- Stop, leaving chat for Settings/History/Experiment Lab, or closing the panel cancels pending approval.

Live execution and study approval are separate from clear confirmation. Their dialogs review the submitted graph/candidates, limits, and side-effect warning; approving one does not authorize another. For live execution, the approved graph snapshot and identity are checked again after session bootstrap and immediately before submission; changed approval cannot authorize a different graph.

## Reading progress and results

Each model round appears as a numbered message with expandable **tool stages**, durations, and a composer status line. Only active tools show a spinner. Terminal tool outcomes distinguish completed, error, cancelled, not executed, and unknown. Partial text and receipts are kept when a turn stops or fails. Live runs can additionally show node progress, a loss sparkline, video references, and small image previews.

The **agent-turn result**, **structural validation**, and **host execution outcome** are different evidence:

| Agent status | Meaning |
| --- | --- |
| `completed` | The agent finished its bounded workflow without unresolved tool errors. This alone does not prove pipeline execution success. |
| `cancelled` | The browser turn stopped, including a declined clear. The UI labels this **Stopped**, or **Detached** when observation of a submitted host run ended; neither label rolls back earlier effects. |
| `failed` | A request, stream, initialization, or host error ended the turn. Check both canvas and execution evidence before recovering. |
| `incomplete` | Completion could not be established, for example because limits were exhausted or receipts/validation were unavailable or stale. |

| Structure status | Meaning |
| --- | --- |
| `valid` | The checked graph snapshot passed structural validation. |
| `invalid` | The validator reported structural issues. |
| `unavailable` | Validation could not be obtained, including transport, HTTP, or malformed-response errors. This is not proof of an invalid graph. |
| `not_run` | No current validation result was obtained. A read-only answer can complete without validation. |
| `stale` | The graph changed relative to the guarded snapshot; an older result cannot describe the current graph. |

> **Structure validated is not execution proof.** Validation checks unknown types, missing required inputs, and parameter ranges; it does not run the graph. Actual `run_graph` or study receipts report host execution status, metrics, outputs, and node errors separately. A tool finishing is not the same as its submitted graph succeeding.

## Bounded validation and repair

Automatic finish-time validation/repair is triggered **only by actual canvas edits in the current agent turn**, including an applied promotion. Ask and read-only answers do not repair pre-existing faults; explicit `validate_graph` remains read-only. Validation still checks the whole current graph, not only edited nodes.

Repair authority comes from successful indexed receipts. Executor guards reject clearing, parameter changes/removal of unrelated existing nodes, and wiring changes to unrelated target inputs. Needed new nodes and existing outputs can supply affected inputs; ordinary `auto_layout` may reposition the canvas. This is not a guarantee of zero indirect effects.

Invalid structure can trigger at most two repair nudges, with a maximum of 16 tool rounds. Unavailable validation does not trigger repair. The final check must describe the last edited snapshot; concurrent graph changes make the result stale and incomplete. Exhausted limits, out-of-scope repairs, and unresolved issues are incomplete, not success.

## Stop, recovery, and undo

- **Stop prevents new dispatch**, but cannot interrupt a synchronous canvas mutation already underway or undo earlier changes. Pending calls receive cancelled/not-executed results instead of remaining running forever.
- For an active live execution, Stop also requests host cancellation and cleans up the stream. If the grace period expires or the socket closes without terminal acknowledgment, the local turn is still `cancelled` but its tool outcome is `unknown`; the host-run pointer is retained and no run-finished notification is emitted. Cancellation is not rollback of node side effects such as file/network writes. A lost connection or a local Stopped label is not proof that a server-owned run stopped.
- **Retry**, when offered, requires that **neither canvas mutation nor an approved execution runner was dispatched**. Runner dispatch is conservative evidence: it can precede a host execute frame, so token/connection failures still do not permit replay. Retry reuses the original request/attachments without duplicating the user request in visible or provider history; prior attempts remain recorded. A declined clear is not retried.
- After any attempted or unknown canvas change **or execution**, use **Continue from current graph** rather than replaying the request. Re-read the live graph and inspect any known host run before deciding what remains; do not automatically resubmit already-dispatched execution.
- Use **CodefyUI's Undo (Ctrl+Z)** for an applied canvas batch. One turn can contain several batches/undo steps. The panel has no transaction, automatic rollback, or separate Undo API; canvas Undo cannot undo execution's external side effects.

## Experiments and portable candidates

A requested parameter-only winner is preflighted and promoted through `applyOperations` only after both active-graph revision and baseline-fingerprint checks. If the graph was edited or switched during the study, promotion is refused. Structural winners remain value-free review proposals and are not automatically applied.

A verified portable study can derive downloadable graph JSON by reapplying captured, redacted GraphOps to its redacted baseline. Unresolved secrets are blank, and downloading never changes the canvas or executes a graph. Portable v1 does not persist the exact prepared graph sent to execution, so schema defaults or execution-time preparation may differ; the download is **not an exact replay artifact**. See [Experiments and research](./experiments-and-research.md).

## Keeping your place and reattaching

Opening Settings, History, or Experiment Lab, or closing the panel, stops the **browser agent turn** and rejects pending approvals while keeping chat mounted and preserving that conversation's draft and staged attachments. If a server-owned live run was already submitted, passive exit waits for its ID and detaches observation without cancelling the host run. Legacy socket-owned execution is cancelled; explicit Stop still requests cancellation on either host. This is an in-memory panel-session convenience, not draft persistence across reload. Wait for settlement before switching or starting a conversation. Late callbacks can save their original conversation but cannot overwrite another active chat.

On a server-owned-run host, a previously submitted live run may survive reload or a connection loss. Its reattach card can follow the existing run without submitting it again, once the original owner has settled and saved the run ID. **Detach/dismiss or hiding the follower stops observation, not the host run; only explicit Stop run requests cancellation.** Dismiss and unreadable run history do not release the reservation that prevents duplicate live submissions. A finished-while-away card shows recorded metrics and can fill a prompt asking `get_run` for a summary. Reattachment is not resuming the browser agent or an entire study.

Stored tool calls are context, not commands to replay. The provider history window keeps complete assistant/tool-call/result groups together and excludes orphaned legacy results; see [Architecture](./architecture.md).

Starter prompts and reattach-summary suggestions fill the composer for review rather than sending immediately. Enter shares the Send button's readiness/busy/attachment guards; Shift+Enter adds a newline and IME composition does not submit. Attachment errors stay visible until removed. Scrolling up pauses automatic following; **Jump to latest** restores it.
