---
id: architecture
title: Architecture
sidebar_label: Architecture
---

# Architecture

Graph Copilot is a **Vite library-mode React app** in `ui/`, built to a single committed ESM file, `frontend/index.js`. End users install via a GitHub tarball with no Node toolchain, so the built bundle is deliberately tracked in git. Compatibility remains **CodefyUI 1.3.0+ with plugin API v1**; the reliability changes do not require newer host APIs or change provider/model defaults.

## Plugin entry and boundaries

The bundle default-exports `activate(api)` (`ui/src/index.tsx:7`). Everything reaches CodefyUI through the `CodefyUIPluginAPI` object — graph operations, authenticated fetch, and namespaced storage — with no imports from core. The entry creates a floating widget and renders `CopilotApp` inside React Strict Mode.

The v1 mirror in `ui/src/types/codefyui.d.ts:99` exposes synchronous `graph.applyOperations`, graph/catalog reads, graph-change subscriptions, HTTP fetch, storage, and UI helpers. It has **no panel Undo, transaction, rollback, or graph-execution API**. An operation batch is one host undo step, not an atomic transaction or a whole-run undo step.

## The agent loop

`runTurn` owns a run-local journal and returns an authoritative `TurnResult`; UI callbacks observe progress rather than controlling execution.

1. **Initialize inside the guarded run** — capture run identity and Ask/Edit mode (default Edit), build the compact catalog/live-graph prompt, compose attachments, and select a history window of whole tool groups. The prompt graph may be truncated; safety comparisons use a separate full snapshot.
2. **Stream over `/api/llm/chat`** — Edit advertises five tools: `apply_graph_operations`, `get_current_graph`, `get_node_schemas`, `validate_graph`, and `research`. Ask omits the mutation tool and also rejects it at execution time. A missing or malformed terminal `done` event is a failure, not silent completion.
3. **Journal before dispatch** — append the assistant's tool-call group with one pending result slot per call. Execute tools serially, checking cancellation before dispatch and after awaits. Research alone fans out up to four index-only sub-agent requests; schemas remain the evidence for actual ports and parameters.
4. **Guard writes and record receipts** — reject malformed/empty/oversized operation batches before the host. `clear_graph` is singleton-only and requires one-time approval bound to the run, call, and full snapshot. Mark mutation effects unknown before the synchronous write, capture the exact receipt immediately afterward, then interpret `OpResult.index` and notify observers. Missing/duplicate/unreadable receipts never imply success.
5. **Finish against current-run edits** — only actual edits in this run trigger the automatic validation/repair gate. Read-only `validate_graph` remains explicit in either mode. Validation HTTP/transport/format errors are unavailable, not invalid structure; they do not cause repair. At most two nudges ask for repairs within the run's authorized edits, with a maximum of 16 tool rounds. The executor enforces the repair surface described below. Snapshot changes invalidate validation or pending clear approval; stale results and exhausted limits are incomplete.
6. **Finalize once** — preserve partial text and captured receipts, close unexecuted slots with cancelled/not-executed outcomes, commit complete groups, and return one terminal result. Observer exceptions cannot erase receipts or change that result.

For the user-facing tool and recovery contracts, see [How it edits the graph](./graph-editing.md).

### Repair surface

`rememberAffectedNodes` and `repairScopeError` in `ui/src/agent/toolGuards.ts:142` derive repair authority from **successful indexed receipts**, not every proposed operation. Added node IDs, directly changed nodes, and targets of successful wiring edits enter the affected set; merely serving as an edge's source does not grant authority to edit or delete that existing source.

Once invalid validation enters repair mode, the executor rejects `clear_graph`, `set_params`/`remove_node` for unrelated existing nodes, and `connect`/`remove_edge` whose target is outside the affected set. New nodes can provide missing inputs, and their already-declared batch refs are allowed; refs colliding with unrelated live IDs are rejected. `auto_layout` is still allowed and can reposition the whole canvas. An out-of-scope repair batch is refused before host dispatch and ends incomplete; this is not a full graph transaction or a guarantee that node removal/layout has no indirect effects.

## Results are evidence, not execution claims

`RunSummary` (`ui/src/agent/types.ts:14`) keeps independent dimensions:

| Dimension | Values / meaning |
| --- | --- |
| Run status | `completed`, `cancelled`, `failed`, `incomplete` |
| Structural validation | `valid`, `invalid`, `unavailable`, `not_run`, `stale`, plus bounded error details |
| Mutation evidence | `none`, `applied`, `unknown`, with a separate `mutationAttempted` flag and applied/failed operation counts |

An attempted host write is unsafe to replay even if no operation is reported successful. A thrown host call may have side effects. A completed read-only run may have `not_run` validation; `valid` means a specific snapshot passed structural checks, **not that the pipeline ran successfully**.

Local run IDs, tool outcomes, and summary metadata are not sent as provider message content. The full comparison snapshot is ephemeral executor state, not persisted summary data or another attachment/request copy. Exact tool receipts remain in the conversation's tool turns.

## Cancellation and safe recovery

The same AbortSignal reaches model streaming, validation, research, and clear confirmation. Abort guards run before requests, between tool calls, after awaits, and immediately before synchronous mutations. Stop prevents **new dispatch**; it neither interrupts a host write already underway nor rolls back earlier batches.

- **Retry** is only eligible before any host mutation dispatch. It reuses the original request/attachments and original pre-attempt history, keeping the user request once in both visible and wire histories. It adds a new attempt without deleting previous results.
- **Continue from current graph** is the recovery path after attempted or unknown mutations. It adds one explicit continuation instruction, re-reads the graph, and keeps existing receipts rather than replaying old calls.
- Declining a clear ends the run; it does not feed the model another chance to bypass the decision. Snapshot changes, Stop, navigation, and close invalidate or cancel pending approval.

This is guarded execution, not exactly-once host mutation delivery or transactional rollback.

## Conversation integrity and panel lifecycle

The provider window has a **soft 20-turn budget**, selected as complete assistant/tool-call/result groups. A newest group can exceed that budget rather than being cut in half. Legacy incomplete groups retain assistant prose where available; orphan tool results are excluded from provider context without inventing receipts or rewriting persisted history. Historical tool-call IDs are not accepted as fresh execution requests.

`useAgentRun` owns the run and captured conversation identity; `ChatWindow` hides rather than unmounts chat for Settings/History, and `CopilotApp` keeps an opened panel mounted when closed. Leaving chat or closing stops the run and cancels confirmation, but preserves draft/staged attachments for that conversation during the mounted session. Switching/new conversations waits for settlement. Late results can save their original conversation but cannot publish over another active chat. Drafts are not durable across browser reloads.

Enter and the Send button share readiness/busy/attachment guards; a synchronous latch prevents duplicate starts, and IME composition does not submit. Starter prompts populate the composer, attachment errors stay visible, and pinned scrolling offers **Jump to latest** without forcing the reader downward. The panel is non-modal, restores focus on close, adapts to the viewport, and respects reduced motion. Host token fallbacks do not introduce a new light/dark API contract.

## Modules

| Area | Responsibility |
| --- | --- |
| `ui/src/llm/` | SSE parsing, abort/reader cleanup, model-list and Codex-sign-in endpoint wrappers |
| `ui/src/agent/` | Prompt construction, journal-first loop, result types, history grouping, operation/receipt guards |
| `ui/src/state/` | Provider settings, capped conversation persistence (50 chats), optional backward-compatible run metadata, attachments |
| `ui/src/components/` | FAB/window lifecycle, `useAgentRun`, composer, stages, `RunResult`, history, settings |
| `ui/preview/`, `ui/e2e/` | Development-only mock-host browser harness and Playwright checks; excluded from the production library entry |

## Tech stack and verification boundary

React 19, TypeScript, Vite 6 (library mode + CSS-injected-by-JS), Vitest + jsdom, and development-only Playwright. No state library — component state plus plain storage helpers.

Mock-browser checks exercise the real plugin entry against fake host APIs and deterministic SSE. They are **not real CodefyUI-host verification or real-LLM quality tests**. See [Development](./development.md) for repeatable commands and the evidence each layer can provide.
