---
id: architecture
title: Architecture and CodefyUI compatibility
sidebar_label: Architecture
---

# Architecture and CodefyUI compatibility

Graph Copilot is an **agent workbench that runs in the CodefyUI editor page**. The plugin owns the chat UI, model/tool loop, candidate-graph isolation, experiment coordination, ranking, and browser-local history. CodefyUI remains authoritative for the live canvas, node definitions, graph validation, LLM proxying, and graph execution.

:::important Current boundary
This repository ships a frontend entry point only. It does **not** add a Graph Copilot server process, route, database, worker, durable job queue, or background scheduler. Closing the browser interrupts an active agent turn or experiment. The existing CodefyUI backend executes each submitted graph, but it does not persist or resume a Graph Copilot study.
:::

## Runtime map

```text
CodefyUI editor page
┌──────────────────────────────────────────────────────────────────┐
│ Graph Copilot frontend plugin                                    │
│                                                                  │
│  Workbench UI ──> agent turn loop ──> local tools                │
│       │                  │                ├─ GraphOps on canvas   │
│       │                  │                └─ isolated experiment │
│       │                  │                     coordinator       │
│       │                  │                                      │
│       └── namespaced storage <── chats/summaries/study bundles   │
│                                                                  │
│  CodefyUIPluginAPI: ui | graph | http | storage                  │
└───────────────┬──────────────────────┬───────────────────────────┘
                │ authenticated HTTP   │ authenticated WebSocket
                v                      v
CodefyUI backend (existing core service, not supplied by this plugin)
┌──────────────────────────────────────────────────────────────────┐
│ /api/llm/chat       provider proxy + SSE                         │
│ /api/graph/validate authoritative candidate validation          │
│ /api/auth/bootstrap session token bootstrap                     │
│ /ws/execution       graph execution + node-status stream         │
└───────────────┬──────────────────────────────────────────────────┘
                v
       installed CodefyUI nodes / compute device / data
```

The boundary matters: the browser is the **orchestrator**, while CodefyUI's existing backend is the **execution engine**. A candidate graph can execute without being saved or loaded into the editor, but this is not a server-side agent job.

## Agent turn lifecycle

Each user message starts a bounded tool-using turn:

1. The plugin builds a system prompt from a compact installed-node catalog and a schema-redacted snapshot of the active graph.
2. It streams the model response through CodefyUI's `/api/llm/chat` proxy.
3. The model can inspect the latest graph, apply validated `GraphOp` batches to the canvas, research parts of a large node catalog, execute the live canvas graph after user confirmation, list and inspect the host's run history, or run an isolated experiment study.
4. Graph-tool results are schema/fail-closed redacted before they return to the model. The original arguments of a provider-generated tool call stay only in the active provider/tool execution path.
5. When a graph-editing answer tries to finish, a runnability gate allows up to two validation-driven corrective rounds. If the live graph remains invalid, the turn reports blocked/invalid instead of accepting success.
6. Completed chat turns, compact experiment summaries, and integrity-checked portable bundles are stored through the plugin's namespaced browser storage.

Canvas edits use `api.graph.applyOperations`. The call is synchronous, returns one result per operation, and commits a whole batch as one undo snapshot. An experiment follows a different path: it modifies serialized clones first and touches the live canvas only during an explicitly requested, conflict-checked promotion of a parameter-only winner. Structural winners remain proposals for review. See [Experiments and research](./experiments-and-research.md).

## Implemented experiment data flow

```text
snapshot active graph
        │
        ├── clone once per variant
        │       └── apply GraphOps in memory
        │
        ├── POST /api/graph/validate for each candidate
        │
        ├── execute valid candidates via /ws/execution
        │       └── collect numeric output_summary/progress values + runtime
        │
        ├── require complete repetitions and one canonical metric identity
        │
        ├── optionally promote a parameter-only winner after conflict check
        │
        └── redact + SHA-256 check canonicalized portable-study content
```

Graph isolation prevents candidate operations from changing the canvas. It is **not a general sandbox**: a node that writes a file, calls a service, or mutates some other external resource can still have that side effect during execution.

## Live graph runs (`run_graph`)

When the user asks to run, train, or evaluate their graph, the agent can execute the **live canvas graph** — the same run the editor's own Run action performs, with real side effects:

1. server-side validation must pass first;
2. the user confirms an approval card (node/edge counts, node types, time cap, side-effect warning), guarded against concurrent graph edits exactly like experiment approval;
3. the graph executes over `/ws/execution`; node statuses and live training progress (loss, epochs) stream into the panel's status bar, with a live loss sparkline drawn from the streamed progress frames;
4. the tool returns a compact outcome: final status, per-node scalar/string output summaries, last progress values, `metric` series tails, log text tail, and per-node errors.

Long training runs are the expected case: one run at a time and a default 6-hour wall-clock cap (adjustable up to 12 hours). On a current host, switching workbench views or closing Graph Copilot passively detaches the live socket after the host supplies the run id; it does not send `cancel`. The persisted `active_run` pointer then lets the existing reattach card follow the server-owned run when ChatView mounts again. The composer Stop control and timeout remain explicit cancellation requests. On CodefyUI 1.3.0, feature detection reports no server-owned run history, so passive teardown retains the legacy close/cancel behavior because execution belongs to that socket. On current hosts the run also survives a page reload: the plugin persists the pointer the moment the host names the run id, and on load the reattach card follows the run over `GET /api/runs/{id}/events` long polling, resuming from the run row's last event cursor (events parse through the same `wireOutputs` normalizer as the socket stream). The card carries the live status line, a loss sparkline, a human-only Stop (`POST /api/runs/{id}/cancel`), and Dismiss; a run that finished while the page was closed shows its final `final_metrics` instead, with a one-click prompt that asks the agent to summarize it from `get_run`. `run_graph` refuses a new submission while the pointer's run is still active. The agent's `list_runs` and `get_run` tools read the same REST surface — including runs started from the editor's own Run button. All of this feature-detects `/api/runs`; a 1.3.0 host (socket-owned runs) reports the capability unavailable, and an optional browser notification (Settings → Notifications, default on) fires when a tracked run completes in a hidden tab.

## CodefyUI contract boundary

The minimum supported host is CodefyUI **1.3.0**. The table separates that released contract from features found on CodefyUI `main` when this page was checked on **2026-07-14** (`4260585`). Graph Copilot is intentionally implemented against the 1.3.0 subset.

| Surface | CodefyUI 1.3.0, stable `apiVersion: 1` | CodefyUI current `main`, `apiVersion: 2` | Graph Copilot dependency |
| --- | --- | --- | --- |
| Activation | Default-exported function receives the plugin API | Same contract; linked-plugin frontend hot reload adds host cleanup/re-activation behavior | v1 |
| `api.ui` | `addFloatingWidget({id})`, `toast(...)` | Same | v1 |
| `api.graph` | `getGraph`, `getNodeDefinitions`, synchronous `applyOperations`, `onGraphChanged` | Same | v1 |
| `api.http` | Session-aware `fetch` | Same | v1 |
| `api.storage` | Namespaced `get`, `set`, `remove` | Same | v1 |
| `api.nodes` | Not present | Additive `registerRenderer` custom node-body API | Not required |

The experiment runner and the live-run tool also use released 1.3.0 CodefyUI endpoints that are outside the JavaScript object itself:

- `POST /api/graph/validate` for authoritative graph validation;
- `GET /api/auth/bootstrap` to obtain the WebSocket session token;
- `/ws/execution` with `action: "execute"` — experiments send an unsaved candidate clone with `record_outputs: false` and `weights_persistent: false`; live runs send the canvas graph with `record_outputs: false`, `weights_persistent: true`, and an explicit run-level `device` (the agent's choice, or the host default from `GET /api/system/devices` — without it, current hosts default an execute submission to CPU, which `device='auto'` nodes then follow);
- streamed `node_status`, `execution_complete`, and execution-error messages, plus batched `metric` events on newer hosts.

`node_status` payloads changed shape between host generations: 1.3.0 put per-port summaries on `output_summary` and training frames on `progress`, while current hosts ship a typed `outputs` entry list (`progress`, `tensor_summary`, `text`, media kinds). The plugin normalizes both shapes through one parser (`ui/src/agent/wireOutputs.ts`), so experiment metrics and run outcomes work against either generation.

These are existing CodefyUI core services. Graph Copilot does not register new endpoints.

### Evidence anchors

- [CodefyUI 1.3.0 plugin API implementation](https://github.com/CodefyUI/CodefyUI/blob/1.3.0/frontend/src/plugins/api.ts)
- [CodefyUI 1.3.0 graph operations](https://github.com/CodefyUI/CodefyUI/blob/1.3.0/frontend/src/plugins/ops.ts)
- [CodefyUI 1.3.0 execution WebSocket](https://github.com/CodefyUI/CodefyUI/blob/1.3.0/backend/app/api/ws_execution.py)
- [CodefyUI current plugin contract](https://github.com/CodefyUI/CodefyUI/blob/main/frontend/src/plugins/contract.ts)
- [CodefyUI current frontend-extension guide](https://github.com/CodefyUI/CodefyUI/blob/main/docs/docs/advanced/plugin-frontend-extensions.md)

## Repository modules

| Path | Responsibility |
| --- | --- |
| `ui/src/components/` | Workbench shell, chat, settings, history, experiment presentation, messages, and tool stages |
| `ui/src/components/RunReattachBanner.tsx` | Reattach card: live follow with Stop, finished-while-away results, notification hand-off |
| `ui/src/agent/loop.ts` | Tool schemas, multi-round agent loop, tool dispatch, and turn persistence callbacks |
| `ui/src/agent/prompt.ts` | Graph/experiment policy and evidence-aware research instructions |
| `ui/src/agent/experiments.ts` | Clone, mutate, validate, execute, measure, rank, optional promotion, and browser-local experiment summaries |
| `ui/src/agent/runGraph.ts` | Live canvas-graph execution over `/ws/execution`: streaming progress, cancel/timeout handling, compact run outcomes |
| `ui/src/agent/runHistory.ts` | REST adapter over `/api/runs`: probe, list/get/artifacts, cancel, and the cursor-replay + long-poll run follower |
| `ui/src/agent/runPointer.ts` | Persisted active-run pointer that survives reloads and powers reattach |
| `ui/src/agent/wireOutputs.ts` | Normalizes `node_status` payloads across host generations (1.3.0 `output_summary`/`progress` vs current typed `outputs` entries) |
| `ui/src/agent/optimizer.ts` | Strict complete-grid and versioned seeded-random parameter-plan compiler |
| `ui/src/agent/experimentAnalysis.ts` | Descriptive intervals/effect sizes plus formula-safe CSV and evidence-labeled Markdown exports |
| `ui/src/agent/studyBundle.ts` | Strict portable schema, canonical JSON, and SHA-256 creation/verification |
| `ui/src/agent/studyCapture.ts` | Runtime-to-portable adapter with schema-guided secret references and provenance conversion |
| `ui/src/agent/studyStorage.ts` | Content-addressed blob-first/index-last storage and zero-write import preview |
| `ui/src/agent/studyImportProjection.ts` | Pure projection of internally consistent imported evidence into a read-only Experiment Lab session |
| `ui/src/agent/studyMaterialize.ts` | Pure application of captured redacted GraphOps to a redacted baseline, plus host-shaped graph JSON encoding |
| `ui/src/llm/` | Provider-neutral streaming client and provider endpoint wrappers |
| `ui/src/state/` | Settings, conversation persistence, and attachment processing |
| `ui/src/types/codefyui.d.ts` | Self-contained v1 contract mirror with optional additive v2 fields |
| `frontend/index.js` | Committed ESM bundle installed by CodefyUI |

The UI is a React 19 + TypeScript application built with Vite in library mode. CSS is injected by the bundle, so installing the plugin does not require a separate stylesheet or Node.js toolchain.

## Persistence and failure model

Current persistence is deliberately modest:

- conversations and provider settings live in namespaced browser storage;
- active graph snapshots and graph-tool results are scrubbed before provider use: node schemas redact declared secrets, credential-shaped keys are scrubbed recursively, unknown schemas/parameters fail closed, and known exact echoes of those redacted values are removed;
- assistant tool calls are cloned and schema-redacted before display/persistence; their original arguments remain only in the active provider/tool execution path, and known exact echoes are removed from assistant text before local persistence or reuse in a later provider round. This does not retroactively conceal an already-streamed live reply. Free-form user text is still sent and stored as written;
- at most 20 compact experiment summaries are retained in browser storage; list mutations use an exclusive Web Lock so concurrent tabs cannot overwrite one another;
- at most 10 portable bundles are retained content-addressed by a SHA-256 digest of their parsed, canonicalized semantic content; writes commit the immutable blob before its index under an exclusive Web Lock, imports verify before preview and write only after explicit confirmation, and candidate derivation never invokes graph/network APIs;
- when Web Locks are unavailable, existing studies remain readable but summary and portable-bundle mutations fail closed instead of using a tab-local lock that could lose evidence;
- active sockets, candidate graphs, queued runs, full tensors/artifacts, and checkpoints are not durable; experiment execution deliberately disables full output recording;
- a portable bundle contains the secret-redacted baseline, captured redacted variant GraphOps, scalar run evidence/source identities, producer/provenance facts, and a derived summary. Import recomputes and cross-checks the derived statistics against the raw run records. The digest checks canonicalized semantic consistency rather than raw file formatting or authorship, so imported evidence remains unauthenticated. The bundle still cannot discover missing dataset hashes, environment/node-pack revisions, graph-node seeds, checkpoints, or output artifacts;
- optional winner promotion is limited to preflighted `set_params` variants and is rejected after any active-graph revision event or baseline fingerprint mismatch.

For the server-owned job and provenance architecture needed to survive browser closure or machine restarts, see the [Durable backend agent contract](./backend-agent-contract.md) and [Agent roadmap](./roadmap.md).
