---
id: intro
title: Introduction
slug: /
sidebar_label: Introduction
---

# Graph Copilot agent workbench

**Graph Copilot** is an agent workbench for [CodefyUI](https://github.com/CodefyUI/CodefyUI). It can build and edit a graph, run bounded experiments on isolated candidates, rank numeric results, optionally promote a parameter-only winner, and turn observations into testable research follow-ups.

Installing the plugin adds a floating assistant button at the bottom-right of the editor. The workbench presents the active model and graph context, chat/tool progress, Experiment Lab, history, and settings. **Edit** is the default; **Ask** is executor-enforced read-only and cannot start execution. Each applied GraphOp batch is **one host undo step** (Ctrl+Z), not a whole agent turn. Stop does not undo earlier changes or external node effects.

:::important What “agent” means today
Planning and study coordination run in your browser. CodefyUI's existing backend validates and executes submitted graphs; this plugin installs no durable agent server or background job queue. Keep the page open during a study. A server-owned host run may survive reload and be followed again, but reattachment does not resume the browser agent or an entire study. See [Architecture and CodefyUI compatibility](./architecture.md).
:::

## Features

- **Build graphs by conversation** — use the installed-node catalog, schema-redacted live graph, exact schema lookups, and batched operations (`add_node`, `connect`, `set_params`, `remove_node`, `auto_layout`, and more). Indexed receipts support bounded correction; automatic validation/repair follows actual current-turn edits, not unrelated pre-existing faults.
- **Run the live graph** — structural validation and separate approval precede host execution. Track node/training progress, loss, compact outputs, supported media, and exact recorded metrics. Structure passing alone is not execution proof.
- **Follow host runs** — supported hosts expose editor-started and plugin runs through `list_runs`/`get_run`, reload reattachment, and optional completion notifications. Dismissing/hiding an existing-run follower stops observation only; explicit Stop run requests cancellation.
- **Run isolated experiments** — validate and execute in-memory graph clones through CodefyUI's WebSocket engine, then measure/rank them without temporary canvas graphs. Isolation does not sandbox file/network side effects.
- **Search bounded parameter spaces** — complete grids and versioned seeded-random plans turn explicit safe parameter domains into deterministic, reviewable candidates under the same approval and run budget.
- **Promote safely** — apply a requested parameter-only winner only if graph-revision and baseline-fingerprint checks pass. Structural winners remain review proposals.
- **Inspect research evidence** — per-run scalars, descriptive intervals, baseline effect sizes, failures, CSV, and evidence-labeled Markdown preserve observations without presenting a pilot as proof.
- **Carry portable studies** — import checks canonical semantic content and raw/derived evidence, shows a preview, and requires an explicit click; it never executes or applies data. Derived candidate graph JSON reapplies redacted GraphOps without changing the canvas, but is not exact execution replay.
- **Attach files** — add images, PDFs, text, or code. Text/PDFs are extracted into the prompt; images use multimodal content with vision-capable models. See [Attachments](./attachments.md).
- **Keep conversation context** — browser-local history holds up to 50 conversations and complete tool-call/result groups. Settings/History/Lab navigation or close stops the current turn while preserving its mounted draft/attachments; drafts do not survive reload. See [Conversation history](./conversation-history.md).
- **Choose a provider** — OpenAI API, OpenAI Codex (ChatGPT account), OpenRouter, Claude API, or a custom OpenAI-compatible endpoint, with capability-negotiated catalogs/reasoning controls. See [Provider setup](./provider-setup.md).
- **Follow staged progress and recover safely** — numbered rounds, Markdown, live tool stages/durations, and a status bar distinguish agent, structure, and execution evidence. Stop preserves partial text/receipts and blocks new dispatch without rollback. Retry requires no canvas mutation **and no approved execution-runner dispatch**, keeping the original request once; after attempted or unknown effects use **Continue from current graph**, not replay. See [Graph editing](./graph-editing.md).

## Next steps

- [Installation](./installation.md) — requirements and how to install.
- [Provider setup](./provider-setup.md) — connect a model provider.
- [How the agent edits the graph](./graph-editing.md) — authority, approvals, results, and undo/recovery.
- [Experiments and research](./experiments-and-research.md) — isolated execution, metrics, reproducibility, and responsible claims.
- [Backend agent contract](./backend-agent-contract.md) — current frontend/backend responsibilities.
- [Agent roadmap](./roadmap.md) — the phased path to durable server-side jobs and optimization.
