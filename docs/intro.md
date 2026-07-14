---
id: intro
title: Introduction
slug: /
sidebar_label: Introduction
---

# Graph Copilot agent workbench

**Graph Copilot** is an agent workbench for [CodefyUI](https://github.com/CodefyUI/CodefyUI). It can build and edit a graph, run bounded experiments on isolated candidate graphs, rank numeric results, optionally promote the best parameter-only design, and turn observations into testable research follow-ups.

Installing the plugin adds a floating assistant button to the editor. The workbench presents the active model and graph context, chat and tool progress, an experiment lab, conversation history, and settings. Direct graph edits use tool calls, and **every GraphOp batch is one undo step** (Ctrl+Z reverts it).

:::important What “agent” means today
Planning and experiment coordination run in your browser. CodefyUI's existing backend validates and executes submitted graphs, but this plugin does not install a durable agent server or background job queue. Keep the page open during an active study. See [Architecture and CodefyUI compatibility](./architecture.md).
:::

## Features

- **Build graphs by conversation** — the agent knows your installed node catalog and live graph, applies batched operations (`add_node`, `connect`, `set_params`, `remove_node`, `auto_layout`, and more), and self-corrects from per-operation errors.
- **Run isolated experiments** — variants are created from in-memory graph clones, validated by CodefyUI, executed through its WebSocket engine, measured, and ranked without opening temporary graphs on the canvas.
- **Search bounded parameter spaces** — complete grids and versioned seeded-random plans turn explicit safe parameter domains into deterministic, reviewable candidates under the same approval and run budget.
- **Promote safely** — a parameter-only winner is applied only when requested and only if the live graph still matches the study baseline. Structural winners remain proposals for review.
- **Inspect research evidence** — per-run scalar records, descriptive intervals, baseline effect sizes, CSV, and evidence-labeled Markdown exports preserve observations and failures without presenting a pilot as proof.
- **Export and import portable studies** — completed studies are captured as secret-redacted bundles whose canonicalized semantic content and raw/derived evidence are checked on import. Import is preview-first and read-only; candidate graph JSON can be derived by reapplying captured redacted GraphOps without executing or changing the canvas, but it is not an exact execution replay.
- **Attach files** — add images, PDFs, text, or code to a message. Text and PDFs are extracted into the prompt; images are sent as multimodal content to vision-capable models. See [Attachments](./attachments.md).
- **Keep conversation history** — resume a prior chat from browser-local history (capped at 50 conversations). See [Conversation history](./conversation-history.md).
- **Choose a provider** — OpenAI API, OpenAI Codex (ChatGPT account), OpenRouter, Claude API, or a custom OpenAI-compatible endpoint. See [Provider setup](./provider-setup.md).
- **Follow staged progress** — multi-round agent work renders as streamed messages and expandable tool stages, with cancellation and retry.

## Next steps

- [Installation](./installation.md) — requirements and how to install.
- [Provider setup](./provider-setup.md) — connect a model provider.
- [How the agent edits the graph](./graph-editing.md) — validated canvas operations and undo behavior.
- [Experiments and research](./experiments-and-research.md) — isolated execution, metrics, reproducibility, and responsible claims.
- [Agent roadmap](./roadmap.md) — the phased path to durable server-side jobs and optimization.
