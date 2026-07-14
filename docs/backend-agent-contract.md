---
id: backend-agent-contract
title: Durable backend agent contract
sidebar_label: Backend agent contract
---

# Durable backend agent contract

Graph Copilot's current coordinator runs in the editor page. A credible agent that continues after the browser closes needs a small, explicit CodefyUI core extension; a plugin-created thread or an arbitrary FastAPI router would not provide durable state, consistent authorization, or enforceable budgets.

Everything on this page is a **proposed additive contract**, not an endpoint shipped by CodefyUI 1.3.0 or current `main`.

## Current blockers

The present host has four hard boundaries:

- plugin discovery loads a frontend entry and node packages, but no backend lifecycle or job handler;
- the frontend graph API targets only the active tab and exposes no tab identity, revision, tab creation, or atomic compare-and-swap edit;
- `/ws/execution` owns an in-memory task for one socket and cancels it when that socket disconnects;
- existing persisted runs belong to published applications, while full execution outputs use a small in-memory cache.

Consequently, this repository keeps a bounded browser engine as its compatibility path. It must not advertise that engine as a durable backend queue.

## Smallest supported extension

### Optional manifest entry

```toml
[backend]
entry = "backend/plugin.py"
api_version = 1
capabilities = ["agent.jobs.v1", "graph.execute.v1", "artifact.write.v1"]
```

The entry must be a relative Python path under `backend/`; absolute paths and `..` are rejected. Installation must disclose that trusted backend code will run. Hosts that do not support this table continue to use the frontend fallback and report the backend capability as unavailable.

### Typed registration, not arbitrary route mounting

```python
from collections.abc import Mapping
from dataclasses import dataclass
from pathlib import Path
from typing import Any, ClassVar, Protocol

@dataclass(frozen=True)
class BackendRegistrationContext:
    plugin_id: str
    plugin_version: str
    data_dir: Path

@dataclass(frozen=True)
class BackendPlugin:
    api_version: int
    job_handlers: tuple["AgentJobHandler", ...] = ()

class AgentJobHandler(Protocol):
    kind: ClassVar[str]
    spec_version: ClassVar[int]

    def validate_spec(self, raw: Mapping[str, Any]) -> Mapping[str, Any]: ...

    async def run(
        self,
        ctx: "AgentJobContext",
        spec: Mapping[str, Any],
        checkpoint: Mapping[str, Any] | None,
    ) -> None: ...
```

The handler receives a narrow core-owned context. It never receives the database, scheduler, or unrestricted executor.

```python
class AgentJobContext(Protocol):
    job_id: str
    plugin_id: str
    budget: "BudgetView"

    def raise_if_cancelled(self) -> None: ...
    async def save_checkpoint(self, value: Mapping[str, Any]) -> None: ...
    async def save_variant(self, *, variant_id: str, label: str,
                           graph: Mapping[str, Any],
                           parent_variant_id: str | None = None,
                           provenance: Mapping[str, Any] | None = None) -> None: ...
    async def execute_graph(self, *, variant_id: str, repetition: int,
                            graph: Mapping[str, Any],
                            metrics: tuple["MetricSelector", ...],
                            seed: int | None = None,
                            timeout_s: float | None = None) -> "GraphRunResult": ...
    async def emit(self, event_type: str, payload: Mapping[str, Any]) -> None: ...
    async def write_artifact(self, *, name: str, media_type: str, content: bytes,
                             run_id: str | None = None) -> "ArtifactRef": ...
```

`execute_graph` is the only graph-execution path and reserves budget transactionally before starting. A Graph Copilot entry then only registers its versioned handler:

```python
def register(ctx: BackendRegistrationContext) -> BackendPlugin:
    return BackendPlugin(api_version=1, job_handlers=(GraphExperimentHandler(),))
```

## Core-owned job API

Fixed plugin-scoped routes keep authentication and policy in CodefyUI core:

```text
POST /api/plugins/{plugin_id}/jobs
GET  /api/plugins/{plugin_id}/jobs
GET  /api/plugins/{plugin_id}/jobs/{job_id}
POST /api/plugins/{plugin_id}/jobs/{job_id}/cancel
POST /api/plugins/{plugin_id}/jobs/{job_id}/resume
GET  /api/plugins/{plugin_id}/jobs/{job_id}/events?after={sequence}
GET  /api/plugins/{plugin_id}/jobs/{job_id}/variants/{variant_id}/graph
GET  /api/plugins/{plugin_id}/jobs/{job_id}/metrics
GET  /api/plugins/{plugin_id}/jobs/{job_id}/artifacts/{artifact_id}
```

Creation returns `202`, requires an idempotency key and the approved specification digest, and records requested versus server-capped budgets. Events are durable and monotonically sequenced; SSE clients reconnect with `Last-Event-ID` or `after`.

```text
queued -> running
running -> succeeded | failed | cancel_requested | interrupted
cancel_requested -> cancelled
cancelled | interrupted | retryable failed -> queued (explicit resume)
```

Every transition increments a revision. Cancel and resume take `expected_revision` and return `409` for races.

### Honest recovery semantics

- Resume starts at a repetition or explicit checkpoint boundary, never midway through a node.
- Completed repetitions are retained and skipped; an interrupted repetition receives a new attempt record.
- Execution is at-least-once. A crash after an external side effect but before completion persistence can repeat that side effect.
- Crash-interrupted graphs are not auto-resumed unless policy explicitly allows it.
- `cancel_requested` remains visible while an in-process node drains. Hard termination requires a later per-run worker-process isolation tier.

## Budgets and exact metrics

```ts
interface ResourceBudget {
  maxRuns: number;
  maxParallelRuns: number;
  maxParallelNodes: number;
  maxRunSeconds: number;
  maxActiveSeconds: number;
  deadlineAt?: string;
  maxRetries: number;
  maxArtifactBytes: number;
  maxMetricRows: number;
  device: 'auto' | 'cpu' | 'cuda' | 'mps';
}
```

Core can strictly enforce run/attempt counts, concurrency, selected artifact bytes, and metric rows. Timeout is cooperative with the current in-process engine. Exact GPU/CPU memory, arbitrary filesystem/network side effects, and third-party spend are not enforceable until execution is isolated or those resources go through metered services.

Durable jobs store an exact metric selector; fuzzy names such as `auto` or `accuracy` must be resolved during the interactive planning step:

```ts
interface MetricSelector {
  id: string;
  source: 'output' | 'progress';
  node: { id?: string; variantRef?: string };
  port: string;
  path?: Array<string | number>;
  aggregation: 'last' | 'min' | 'max' | 'mean';
  direction: 'maximize' | 'minimize';
  unit?: string;
}
```

## Persistence and secret handling

Use dedicated tables for jobs, variants, attempts, scalar metrics, artifacts, and ordered events; do not overload application-run tables. Checkpoint and event insertion must be atomic. Artifact bytes live in a traversal-safe quota directory, are written temp-file-then-rename, and are referenced by SHA-256 metadata.

All stored graphs, GraphOps, schemas, errors, and provenance pass through the same schema-aware secret scrubber used for portable studies. Raw secrets never enter job JSON or SQLite. An unattended LLM planner additionally requires opaque server credential references and token/cost budgets; today's request-scoped LLM keys are intentionally insufficient.

## Frontend workspace API v3

The backend persists candidate snapshots; a connected browser decides which candidates to open. A proposed additive workspace contract supplies stable tab identities and revisions:

```ts
interface WorkspaceGraphSnapshot {
  tabId: string;
  revision: number;
  readOnly: boolean;
  graph: SerializedGraph;
}

interface WorkspaceAPI {
  snapshot(tabId?: string): WorkspaceGraphSnapshot;
  openGraphs(
    graphs: Array<{title: string; graph: SerializedGraph; readOnly?: boolean;
      source?: {kind: 'agent-variant'; pluginId: string; jobId: string; variantId: string}}>,
    options?: {activate?: 'none' | 'first' | 'last'},
  ): Array<{tabId?: string; revision?: number; error?: string}>;
  applyOperations(input: {tabId: string; expectedRevision: number;
    operations: GraphOp[]; atomic: boolean}): ApplyResult & {
      revision: number; conflict?: 'revision_mismatch' | 'read_only'};
  onChanged(callback: (event: {type: 'graph' | 'tabs' | 'active-tab';
    tabId: string; revision: number}) => void): () => void;
}
```

`atomic: true` performs a pure preflight and commits nothing when any operation fails. This enables conflict-safe winner promotion and lets shortlisted candidates become real editable tabs without private-store or DOM hacks.

## Implementation order and acceptance

1. Add the dedicated SQLite migration, artifact store, state machine, transactional budget accounting, and recovery tests.
2. Add the fixed job service/routes and durable event replay.
3. Add the backend handler registry, manifest validation, trust prompt, reload behavior, and status reporting.
4. Add workspace tab revisions, `openGraphs`, and atomic tab-bound GraphOps.
5. Register Graph Copilot's checkpointed `(variant, repetition)` handler and exact metrics.
6. Add browser reattachment; add credential references only when unattended model planning is enabled.

Acceptance requires a job to finish after its initiating browser closes, survive a CodefyUI restart, skip already completed repetitions on resume, enforce effective budgets, retain an ordered audit trail, and materialize selected variants without overwriting the user's active graph.
