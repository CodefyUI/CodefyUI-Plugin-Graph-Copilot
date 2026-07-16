# Graph Copilot — agent workbench for CodefyUI

Graph Copilot is a frontend plugin that adds a professional AI workbench to the CodefyUI editor. It can construct and revise node graphs, run bounded experiments on isolated graph variants, rank measured metrics, safely promote a parameter-only winner, and help turn observations into testable research questions.

[Documentation](https://treeleaves30760.github.io/CodefyUI-Plugin-Graph-Copilot/) · [Architecture](docs/architecture.md) · [Experiments and research](docs/experiments-and-research.md) · [Backend agent contract](docs/backend-agent-contract.md) · [Roadmap](docs/roadmap.md)

## What it can do

- **Build and tune graphs by conversation.** The agent receives a schema-redacted installed-node catalog and active-graph snapshot, applies typed GraphOps, and self-corrects from per-operation errors. One GraphOp batch is one undo step. Before accepting completion, a runnability gate allows up to two corrective rounds; a graph that is still invalid is reported as blocked, never as a successful edit.
- **Run isolated candidate studies.** Variants are created from in-memory clones, validated by CodefyUI, executed through `/ws/execution`, measured, and ranked without opening temporary graphs on the canvas.
- **Search parameters deterministically.** Complete small grids and versioned seeded-random plans compile safe existing-node parameter domains into reviewable `set_params` candidates and reuse the same approval and 16-run budget.
- **Promote parameter winners safely.** Automatic promotion happens only when requested, only for parameter-only variants, and is refused if the live graph changed after the study began. Structural winners remain proposals for review.
- **Support research exploration.** Results retain per-run scalar evidence, sample spread, descriptive Student-t intervals, Hedges g versus a baseline, failures, CSV/research-brief exports, and evidence-linked follow-up ideas while warning that a pilot is not proof, significance, or novelty.
- **Carry studies safely.** Every completed study attempts to create a portable bundle containing a secret-redacted baseline, captured redacted GraphOps, exact recorded scalar evidence, producer/provenance facts, and derived results. Experiment Lab checks the SHA-256 digest of parsed, canonicalized semantic content and cross-checks derived statistics against the run records before showing a preview; import happens only after an explicit click and never executes or applies imported data. This verifies internal integrity, not authorship.
- **Present agent work clearly.** The workbench exposes graph context, streamed multi-round replies, expandable tool stages, experiment results, chat history, settings, cancellation, and retry.
- **Use multiple providers.** OpenAI API, OpenAI Codex through a ChatGPT account, OpenRouter, Claude API, and custom OpenAI-compatible endpoints such as Ollama, LM Studio, or vLLM.
- **Accept attachments.** Images, PDFs, text, and code can be added by picker, drag-and-drop, or paste. Images are sent as multimodal content when the selected model supports vision.

## Current architecture boundary

Graph Copilot is an agent, but today its **orchestrator runs in the browser**:

```text
Graph Copilot UI + agent loop (browser)
        ├─ CodefyUIPluginAPI: canvas GraphOps and namespaced storage
        ├─ /api/llm/chat: existing CodefyUI provider proxy
        ├─ /api/graph/validate: existing CodefyUI validation
        └─ /ws/execution: existing CodefyUI graph execution
```

This repository declares only `[frontend] entry = "frontend/index.js"`. It does not ship a Graph Copilot backend route, database, durable queue, worker, or scheduler. Closing/reloading the page interrupts active work. CodefyUI executes submitted graphs, but it does not yet persist or resume a whole Graph Copilot experiment job.

CodefyUI **1.3.0** supplies the stable frontend API v1 and backend endpoints used by the plugin. CodefyUI current `main` adds API v2 custom node renderers and linked-plugin frontend hot reload; Graph Copilot keeps those additions optional and remains compatible with the 1.3.0 surface. See the [compatibility table](docs/architecture.md#codefyui-contract-boundary).

## Experiment loop

When the agent calls `run_graph_experiments`, it performs:

1. snapshot the active graph;
2. clone and apply GraphOps to each variant in memory;
3. validate each candidate with CodefyUI and mirror the host's parameter checks;
4. show every candidate node type and schema-redacted parameter value, plus the execution/repetition counts, concurrency, promotion setting, and side-effect warning; then execute only after explicit approval over the CodefyUI WebSocket;
5. collect scalar numeric output/progress metrics and observed runtime while deliberately leaving full output recording disabled;
6. rank only candidates whose scheduled repetitions all succeeded and resolved one common objective identity across the study;
7. report exact ties instead of using runtime as a winner tie-breaker;
8. optionally promote a parameter-only winner after both graph-revision and fingerprint checks;
9. retain a browser-local summary plus a content-addressed portable study bundle; schema-declared secrets, credential-shaped fields, and unknown-schema parameter values become explicit secret references, and any capture/storage failure is a warning that never retries a completed run.

Current limits are 8 variants, 1–5 repetitions, 16 total runs, at most 2 concurrent executions, and a 10-minute timeout per run. Candidate graph isolation does not sandbox node side effects such as file or network writes.

The released CodefyUI plugin contract does not expose tab creation or “open this serialized graph in a new tab,” so this version compares clones in Experiment Lab rather than creating candidate tabs. From a verified bundle, the plugin can derive downloadable host-shaped graph JSON by reapplying the captured, redacted GraphOps to the redacted baseline. Unresolved secrets are blank, and schema-default resolution or other preparation performed during the original run may not be reproduced because the exact prepared execution graph is not persisted. Downloading never changes the canvas. A future core API for true labeled, read-only candidate tabs is called out in the roadmap.

For study design, metric selection, portable evidence, reproducibility, and responsible research claims, read [Experiments and research](docs/experiments-and-research.md). Durable jobs, checkpoint/resume, adaptive optimization, complete environment/artifact provenance, and confirmatory analysis require the phased [CodefyUI core roadmap](docs/roadmap.md).

## Requirements and installation

- CodefyUI 1.3.0 or later for the baseline plugin contract
- For automatic rich model catalogs and reasoning-effort controls, an updated CodefyUI host that exposes rich catalog metadata and accepts and forwards `reasoning_effort`. Use a host build that explicitly documents those capabilities; this repository does not assign them an unreleased version number.
- A supported remote provider, ChatGPT Codex login, or an OpenAI-compatible local endpoint

```bash
cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot
```

Reload the CodefyUI browser tab. The Graph Copilot button appears in the editor.

## Provider setup and data handling

Open the workbench settings and configure a provider/model:

- **OpenAI, OpenRouter, or Claude:** enter an API key and select a model.
- **OpenAI Codex:** sign in with a ChatGPT account through the provided browser flow.
- **Custom:** enter an OpenAI-compatible base URL; a key is optional for local servers that do not require one.

With a compatible updated CodefyUI host, the catalog includes **GPT-5.6 Sol** (`gpt-5.6-sol`; OpenAI may also expose the `gpt-5.6` alias), **GPT-5.6 Terra** (`gpt-5.6-terra`), and **GPT-5.6 Luna** (`gpt-5.6-luna`). Plugin startup and Settings automatically synchronize the active ready built-in provider and cache the result for five minutes. Startup negotiation also restores a saved reasoning effort without requiring Settings to be opened first. The current model remains selected even when discovery omits it or fails; **Refresh** bypasses the cache. Custom endpoints are never queried automatically and are contacted for model discovery only after an explicit Refresh.

Codex discovery is compatibility-bounded best effort: the host uses the protocol version it implements and auto-lists only models compatible with that contract. A future model that requires a newer host or protocol will still require a CodefyUI update. OpenAI's `/v1/models` response supplies model IDs but not reasoning-effort metadata, so curated GPT-5.6 fallbacks provide that metadata.

Reasoning-capable catalogs expose a reasoning-effort selector. First-party OpenAI requests can use `none`, `low`, `medium`, `high`, `xhigh`, or `max` when supported; the Codex fallback offers `low` through `max`. Codex `ultra` is intentionally absent because it is a product-level multi-agent/delegation mode, not a portable single-request `reasoning_effort` value that Graph Copilot can forward.

Provider settings and API keys are stored in the plugin's browser-local, namespaced storage. Requests go through the local CodefyUI `/api/llm/chat` proxy, which forwards credentials per request; CodefyUI 1.3.0 is designed not to persist or log them server-side. Before graph context is sent to a provider, live snapshots and graph-tool results redact schema-declared secrets, credential-shaped fields, unknown schemas/parameters, and exact echoes of those known redacted values. A provider-generated tool call keeps its original arguments only in the active provider/tool execution path; the display and conversation-history copy is schema-redacted, and known exact echoes in assistant text are scrubbed before persistence or reuse in a later provider round. This cannot retroactively hide text already streamed by the provider in the live reply. Free-form user messages are still sent to the provider and stored as written, so this is not a generic credential detector—do not paste credentials into chat text. Treat the browser profile and every installed frontend plugin as trusted code because plugin JavaScript runs in the editor page and can access the session.

## Development

Build and test the plugin UI:

```bash
cd ui
pnpm install
pnpm test
pnpm build
```

The Vite build writes `frontend/index.js`. That ESM bundle is committed because `cdui plugin install` consumes the repository archive without requiring an end-user Node.js toolchain.

Run the Docusaurus documentation site from the repository root:

```bash
pnpm install
pnpm typecheck
pnpm build
pnpm start
```

Preview Traditional Chinese with `pnpm start -- --locale zh-Hant`.

## License

MIT
