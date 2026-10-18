---
id: architecture
title: Architecture and CodefyUI compatibility
sidebar_label: Architecture
---

# Architecture and CodefyUI compatibility

Graph Copilot is an **agent workbench that runs in the CodefyUI editor page**. The plugin owns the chat UI, model/tool loop, candidate-graph isolation, experiment coordination, ranking, and browser-local history. CodefyUI remains authoritative for the canvas, node definitions, validation, LLM proxying, and graph execution.

:::important Current boundary
This repository ships a frontend entry only, not a Graph Copilot server process, route, database, worker, durable queue, or scheduler. Closing/reloading the page interrupts the browser agent and study coordinator. An already-submitted **server-owned host run** may continue and can be followed again; that is not resuming an agent turn or an entire experiment study.
:::

## Runtime map

```text
CodefyUI editor page
┌──────────────────────────────────────────────────────────────────┐
│ Graph Copilot frontend plugin                                    │
│                                                                  │
│ Workbench UI ──> journal-first agent loop ──> local tools          │
│      │                  │                ├─ canvas GraphOps       │
│      │                  │                ├─ approved live run     │
│      │                  │                └─ isolated studies      │
│      └── namespaced storage <── chats / summaries / study bundles │
│                                / active-run pointer              │
│ CodefyUIPluginAPI: ui | graph | http | storage                     │
└───────────────┬──────────────────────┬───────────────────────────┘
                │ authenticated HTTP   │ authenticated WebSocket
                v                      v
CodefyUI backend (existing core service, not supplied by this plugin)
┌──────────────────────────────────────────────────────────────────┐
│ /api/llm/chat       provider proxy + SSE                          │
│ /api/graph/validate authoritative structural validation           │
│ /api/auth/bootstrap session token bootstrap                      │
│ /ws/execution       graph execution + node-status stream          │
│ /api/runs           optional server-owned history/events/cancel   │
└───────────────┬──────────────────────────────────────────────────┘
                v
       installed nodes / compute device / data / external side effects
```

The browser is the **orchestrator**; CodefyUI's existing backend is the **execution engine**. A candidate can execute without being saved or loaded into the editor, but graph isolation is not a general side-effect sandbox.

The Vite library bundle default-exports `activate(api)` in `ui/src/index.tsx`. It creates a floating widget and renders `CopilotApp` in React Strict Mode. The committed `frontend/index.js` installs without an end-user Node.js toolchain. The plugin imports no core internals and has no separate panel Undo or transaction API.

## Agent turn lifecycle

`runTurn` owns a turn-local journal and returns an authoritative `TurnResult`; UI callbacks observe progress rather than controlling execution.

1. **Guarded initialization** — capture identity and Ask/Edit mode (default Edit), build the compact catalog/schema-redacted live snapshot, compose attachments, and select whole assistant/tool groups for history. Prompt snapshots can be truncated; clear/validation safety compares a separate full snapshot.
2. **Model stream** — use `/api/llm/chat` with the mode's tool set. Ask permits graph/schema/validation/research and host run reads, but filters and runtime-refuses canvas mutations and **all execution tools**. Edit retains live-run, study, and optimizer tools with interactive approval. A missing/malformed terminal `done` event is failure, not silent completion.
3. **Journal before dispatch** — record the assistant's tool group and one pending result slot per call. Calls execute serially with cancellation guards before dispatch and after awaits; research can fan out four index-only requests, and an approved study can run at most two executions concurrently. Research candidates do not establish port names.
4. **Track effects before observers** — reject malformed/empty/oversized canvas batches before host dispatch. Require singleton, snapshot-bound clear confirmation. Mark a write unknown before synchronous `applyOperations`, capture its exact indexed receipt immediately afterward, then notify observers. Execution dispatch is recorded separately: candidate isolation or a failed socket cannot establish zero side effects.
5. **Current-turn validation gate** — only applied canvas edits, including promotion, trigger automatic finish-time validation/repair. Unavailable validation never drives repair. At most two nudges repair the authorized affected surface within 16 tool rounds. Snapshot changes, unresolved errors, and exhausted limits are incomplete.
6. **Finalize once** — preserve partial text and captured evidence, settle pending calls as cancelled/not-executed, commit complete groups, and return one terminal result. Observer failures cannot erase a captured receipt or redefine the outcome.

Graph-tool results and the display/history copy of provider-generated arguments are schema/fail-closed redacted. Original arguments remain only in the active provider/tool execution path. Exact known secret echoes in assistant text are scrubbed before persistence or reuse, not retroactively hidden from an already-streamed reply. Free-form user text is sent/stored as written.

Canvas edits form one host undo snapshot **per batch**, not per whole turn. Experiments modify serialized clones and touch the canvas only for a requested, preflighted, conflict-checked parameter-only promotion. Structural winners remain review proposals. See [Graph editing](./graph-editing.md) and [Experiments and research](./experiments-and-research.md).

### Repair surface

`rememberAffectedNodes` and `repairScopeError` in `ui/src/agent/toolGuards.ts` derive authority from **successful indexed receipts**, not all proposed operations. Added nodes, directly changed nodes, and targets of successful wiring edits enter the affected set; being an edge source alone does not authorize changing or deleting that existing source.

Repair rejects `clear_graph`, unrelated existing-node `set_params`/`remove_node`, unrelated target-input `connect`/`remove_edge`, and refs colliding with unrelated live IDs. Needed new nodes and already-declared refs can supply affected inputs. `auto_layout` remains allowed and may reposition the whole canvas. Out-of-scope batches are refused before host dispatch and end incomplete. This is not a transaction or a guarantee that removals/layout have no indirect effects. Validation still checks the whole graph.

## Results and safe recovery

| Evidence | Meaning |
| --- | --- |
| Agent status | `completed`, `cancelled`, `failed`, or `incomplete` |
| Structural validation | `valid`, `invalid`, `unavailable`, `not_run`, or `stale`, with bounded errors |
| Canvas evidence | `none`, `applied`, or `unknown`, plus attempted flag and applied/failed operation counts |
| Execution evidence | `sideEffectAttempted` conservatively records approved runner dispatch; optional `hostRunId` identifies the live run. Host receipts separately carry status, metrics/outputs, and uncertain outcomes. There is no execution-status enum in `RunSummary`. |

An attempted canvas write or approved runner dispatch is unsafe to replay even if nothing is reported successful. `sideEffectAttempted` is set after approval and graph/signal preflight, but before the runner's internal token, connection, or candidate-validation phases; it is not proof that a host execute frame was sent or accepted. It also covers ensuing study persistence/promotion. A completed read-only turn can have `not_run`; **valid structure is not proof of execution**. Live-run outcomes and study run records establish their own status and exact observed metrics, not a creative/model-quality success claim.

Agent-turn IDs, tool outcomes, and summary metadata are local, not provider message content; host run IDs can appear in execution/read-tool results. Full safety snapshots are ephemeral executor state. The journal captures exact canvas receipts before projection; persisted/provider-visible graph evidence follows schema redaction rather than adding another secret-bearing request or attachment copy.

### Stop versus detach

Abort guards cover streaming, validation, research, approvals, and each new tool/write dispatch. **Stop prevents new work and does not roll back earlier effects**. It cannot interrupt a synchronous host write already underway. During an owned live run, cancellation sends the host cancel action and then cleans up the socket; external node effects are not undone. For cancellation, optional `RunGraphOutcome.cancelConfirmed` is true when nothing was submitted or a terminal acknowledgment was observed, and false when the cancellation grace period expires or the socket closes without acknowledgment. Unconfirmed cancellation leaves the local turn `cancelled` but the tool outcome `unknown`, preserves the `active_run` pointer, and suppresses a run-finished notification.

A **reattached existing host run** has a different lifecycle. Detaching/dismissing or aborting its follower stops observation only; explicit **Stop run** calls the host cancellation endpoint. Losing a connection does not establish that a server-owned run stopped. A retained active-run pointer permits inspection/following without resubmitting it.

Retry requires **neither canvas mutation nor approved execution-runner dispatch**. It reuses the original request, attachments, and pre-attempt history, keeping the user request once in visible/wire history and retaining earlier attempt results. After attempted/unknown effects, **Continue from current graph** adds a new instruction to read current graph/host-run evidence, not replay old tools or resubmit execution. Declined clear ends the turn without a removal workaround.

## Conversation integrity and panel lifecycle

The provider context has a **soft 20-turn budget**, chosen as whole assistant/tool-call/result groups; the latest group can exceed it rather than be split. Legacy incomplete groups retain prose where possible, orphan results are excluded without inventing receipts, and historical call IDs cannot become fresh dispatches.

`useAgentRun` binds callbacks and persistence to the captured turn/conversation. Chat stays mounted while Settings, History, or Experiment Lab is shown and when an opened panel is closed. Leaving chat synchronously stops the **browser agent turn** and pending approvals while preserving that conversation's draft/attachments. An already-submitted server-owned live run detaches without cancellation once its ID is captured; legacy socket-owned execution is cancelled. Separate observation and explicit-cancel signals let Stop cancel even while passive detach is waiting for an ID. Switching/new conversations waits for settlement; late callbacks can save their original conversation but cannot overwrite another active chat. Drafts do not survive reload. The reattach banner mounts only while chat is active and the original turn has settled, so late IDs are not missed and two owners do not follow the same run. Its unmount stops observation, not host execution.

Enter/Send share readiness, busy, and attachment guards; a synchronous latch prevents duplicate starts and IME composition does not submit. Starter and run-summary prompts fill the composer for review. Errors remain visible, pinned scrolling offers **Jump to latest**, the panel is non-modal/viewport-bound, focus returns on close, and reduced motion is respected. Styling consumes host tokens with fallbacks, not a new theme API contract.

## Implemented experiment data flow

```text
snapshot active graph
        ├── clone once per variant and apply GraphOps in memory
        ├── POST /api/graph/validate for each candidate
        ├── explicit approval of plan, limits, and side effects
        ├── execute valid candidates via /ws/execution
        │       └── collect numeric output/progress evidence + runtime
        ├── require complete repetitions and one canonical objective identity
        ├── optionally promote a parameter-only winner after conflict checks
        └── redact + SHA-256 check canonicalized portable-study content
```

Limits remain 8 variants, 1–5 repetitions, 16 total executions, at most 2 concurrent executions, and a 10-minute timeout per candidate run. Complete small grids and versioned seeded-random plans reuse that approval/budget. Candidate graph isolation does not sandbox file/network writes. Exact ties are reported, not broken by runtime.

A portable study contains a redacted baseline, captured redacted GraphOps, scalar run evidence, producer/provenance facts, and derived statistics. Import cross-checks raw/derived evidence and canonical semantic SHA-256 before preview; an explicit import never executes or promotes data. Internal consistency is not authorship. Downloaded candidate graph JSON reapplies captured redacted ops, blanks unresolved secrets, and is not exact prepared-execution replay. True labeled candidate tabs are not exposed by the current plugin contract.

## Live graph runs (`run_graph`)

An Edit-mode request to run/train/evaluate can execute the **live canvas graph** with real side effects:

1. server-side structural validation passes;
2. a graph-change-guarded approval dialog reviews counts, node types, time cap, and side effects; the approved graph snapshot and identity are checked again after session bootstrap and immediately before the execute frame is sent;
3. `/ws/execution` streams node status, training progress/loss, and newer-host metrics into the panel;
4. the tool records host outcome, per-node scalar/string outputs, final progress, metric tails, log tail, node errors, and supported media references/previews.

One live run is submitted at a time, with a default 6-hour cap adjustable to 12 hours. Experiments use unsaved clones with `record_outputs: false`/`weights_persistent: false`; live runs use `record_outputs: false`/`weights_persistent: true`. Live runs specify the agent's device or the host default from `GET /api/system/devices` when available; omission falls back to host behavior, which may be CPU. Media references, not full artifact bytes, are forwarded in tool results.

### Run awareness and reattachment

Switching workbench views, closing the panel, or unmounting stops the browser agent and rejects pending approvals. After submission on a server-owned-run host, this passive exit detaches observation without sending `cancel`. The runner allows up to five seconds to capture a late host run ID and persist an `active_run` pointer. Reopening Chat follows that pointer after the original owner settles; it does not submit the graph again. If the ID never arrives, the plugin retains a separate unidentified-submission reservation and asks the user to inspect the host. Releasing that reservation requires explicit confirmation that no host run is active, not merely dismissing the warning. Detached execution is recorded as still running or unknown, never as successfully completed or confirmed cancelled.

The composer **Stop** control and timeout still request cancellation and wait for native cleanup evidence. The time cap belongs to the connected browser runner, not a durable host deadline: detaching clears its local timer, so a detached run must be stopped through the host or reattach card. Older CodefyUI 1.3.0 runs are socket-owned, so passive teardown retains legacy cancellation. A server-owned host run may survive socket closure or page reload, but the browser agent and study coordinator do not. Reload recovery requires that a run ID was persisted before reload.

On hosts exposing `/api/runs`, `list_runs`/`get_run` include editor-started runs. A reattach card follows `GET /api/runs/{id}/events` by cursor/long polling using the same `wireOutputs` normalizer, shows status/loss and human-only **Stop run** (`POST /api/runs/{id}/cancel`), or reports `final_metrics` if it finished while away. Dismiss only hides the card and stops following; it does not clear a live run's reservation. A summary suggestion fills the composer and never auto-sends.

An active or unverified tracked run blocks another live submission. Unknown connection errors, authorization failures, and unreadable history retain the pointer rather than treating the run as stopped; only authoritative terminal or missing-run evidence permits cleanup. These surfaces are feature-detected; a host without `/api/runs` reports unavailable. The background-run notification setting under **Settings → Behavior** (default on) optionally announces a tracked run finishing in a hidden tab, subject to browser permission; detach does not announce completion. Reattachment is host-run recovery, not durable study coordination.

## CodefyUI contract boundary

The manifest declares **`requires_codefyui = ">=1.3.0"`**. That is the baseline installation contract, not a promise that every new run/catalog/model feature works on 1.3.0. The historical comparison below records the upstream host snapshot checked on **2026-07-14** (`4260585`); it is not a fresh verification of today's host `main`.

| Surface | CodefyUI 1.3.0 / API v1 | Additive newer-host surface | Plugin dependency |
| --- | --- | --- | --- |
| Activation | Default-exported function receives API | Linked-plugin cleanup/hot reload | Baseline entry contract |
| `api.ui` | Floating widget, toast | Same base helpers | Required |
| `api.graph` | Graph/catalog reads, synchronous apply, change subscription | Same base helpers | Required |
| `api.http` | Session-aware fetch | Additional backend routes | Required; capabilities feature-detected |
| `api.storage` | Namespaced get/set/remove | Same | Required |
| `api.nodes` | Absent | API v2 custom renderer registration | Optional, not required |
| Run history/events/cancel | `/api/runs` absent; socket-owned runs | Server-owned run REST surface | Required only for run awareness/reattach |
| Rich model/effort metadata | May be absent | Catalog and forwarded `reasoning_effort` | Required for corresponding controls/models |

Existing core endpoints used outside the JavaScript object include `POST /api/graph/validate`, `GET /api/auth/bootstrap`, `/ws/execution`, and feature-detected device/run/model surfaces. Graph Copilot registers no backend routes.

`wireOutputs` normalizes legacy `output_summary`/`progress` and newer typed `outputs` (`progress`, `tensor_summary`, `text`, media). This shape adapter does not establish that every output kind is supported by every host. Rich model catalogs and protocol-dependent models require a host documenting those capabilities; respect advertised host requirements rather than assigning an invented unreleased version. Upstream provider/model defaults and reasoning negotiation remain authoritative; see [Provider setup](./provider-setup.md).

### Evidence anchors

- [CodefyUI 1.3.0 plugin API](https://github.com/CodefyUI/CodefyUI/blob/1.3.0/frontend/src/plugins/api.ts)
- [CodefyUI 1.3.0 GraphOps](https://github.com/CodefyUI/CodefyUI/blob/1.3.0/frontend/src/plugins/ops.ts)
- [CodefyUI 1.3.0 execution WebSocket](https://github.com/CodefyUI/CodefyUI/blob/1.3.0/backend/app/api/ws_execution.py)
- [Current plugin contract](https://github.com/CodefyUI/CodefyUI/blob/main/frontend/src/plugins/contract.ts)
- [Current frontend-extension guide](https://github.com/CodefyUI/CodefyUI/blob/main/docs/docs/advanced/plugin-frontend-extensions.md)

## Repository modules

| Path | Responsibility |
| --- | --- |
| `ui/src/components/` | Workbench, mounted chat lifecycle, settings/history/Lab, stages and results |
| `ui/src/components/useAgentRun.ts` | Captured turn/conversation controller, approvals and safe recovery |
| `ui/src/components/RunResult.tsx` | Independent agent/canvas/validation/execution evidence |
| `ui/src/components/RunReattachBanner.tsx` | Existing host-run following, Stop/detach, finished-while-away metrics |
| `ui/src/agent/loop.ts`, `types.ts`, `toolGuards.ts`, `history.ts` | Tool catalog, journal, result contract, scope/receipt/cancel guards, whole-group history |
| `ui/src/agent/prompt.ts`, `historyRedaction.ts` | Graph/experiment policy and schema/fail-closed provider/display redaction |
| `ui/src/agent/experiments.ts` | Clone/validate/execute/measure/rank, promotion, local summaries |
| `ui/src/agent/runtimeTools.ts` | Approved live/study/optimizer dispatch, host-run reads, effect journaling, and cancellation/pointer handling |
| `ui/src/agent/runGraph.ts` | Live execution, progress/media, cancellation/time cap, compact outcomes |
| `ui/src/agent/runHistory.ts`, `runPointer.ts` | REST run adapter/cursor follower and reload-surviving pointer |
| `ui/src/agent/wireOutputs.ts` | Legacy/newer node-status normalization |
| `ui/src/agent/optimizer.ts` | Strict complete-grid/versioned seeded-random plan compiler |
| `ui/src/agent/experimentAnalysis.ts` | Descriptive intervals/effect sizes, formula-safe CSV and evidence Markdown |
| `ui/src/agent/studyBundle.ts`, `studyCapture.ts` | Portable schema/canonical SHA-256, redacted provenance capture |
| `ui/src/agent/studyStorage.ts` | Blob-first/index-last storage and zero-write import preview |
| `ui/src/agent/studyImportProjection.ts`, `studyMaterialize.ts` | Read-only evidence projection and derived host-shaped graph JSON |
| `ui/src/llm/` | Streaming/abort cleanup, provider wrappers, model-catalog/effort negotiation |
| `ui/src/state/` | Settings, capped conversations, attachments, optional run metadata |
| `ui/src/types/codefyui.d.ts` | Self-contained baseline mirror with optional additive host fields |
| `ui/preview/`, `ui/e2e/` | Development-only fake-host/browser harness, outside production entry |
| `frontend/index.js` | Committed ESM bundle with injected CSS |

React 19, TypeScript, Vite library mode + CSS-injected-by-JS, Vitest/jsdom, and development-only Playwright; no state library. Mock-browser evidence is not real-host integration or live-LLM quality. See [Development](./development.md).

## Persistence and failure model

- Conversations (capped at 50) and provider settings are namespaced browser-local data; drafts remain in memory.
- Graph context/tool arguments redact declared secrets, credential-shaped fields, unknown-schema parameters, and known exact secret echoes. This is not a generic detector for user-written credentials.
- At most 20 compact study summaries and 10 content-addressed portable bundles are retained. Exclusive Web Locks protect cross-tab mutations; without locks, existing evidence stays readable but writes fail closed.
- Immutable portable blobs commit before index updates. Import verifies before preview and writes only on explicit confirmation. Candidate derivation uses no graph/network API.
- Active-run pointers can outlive the page, while browser sockets, candidate coordination, queued study work, full tensors/artifacts, and checkpoints are not durable plugin jobs. Experiments deliberately disable full output recording.
- Capture/storage failure is a warning, never an excuse to repeat completed execution. A digest authenticates neither author nor missing dataset/environment/node-pack/seed/checkpoint provenance.
- Requested promotion is limited to preflighted `set_params` and refused after revision/fingerprint change.

For durable agent jobs and fuller provenance, see [Backend agent contract](./backend-agent-contract.md) and [Agent roadmap](./roadmap.md).
