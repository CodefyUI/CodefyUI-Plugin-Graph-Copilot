---
id: intro
title: Introduction
slug: /
sidebar_label: Introduction
---

# Graph Copilot

**Graph Copilot** is an AI chat assistant plugin for [CodefyUI](https://github.com/treeleaves30760/CodefyUI-Plugin-Official). Chat with an AI to **generate, tune, and improve the node graph** on your canvas.

Installing the plugin adds a floating assistant button at the bottom-right of the editor. Click it to open a chat window where you can describe the pipeline you want, ask for parameter changes, or request improvements — the assistant edits the canvas directly through tool calls, and **every AI edit is a single undo step** (Ctrl+Z reverts it).

## Features

- **Build graphs by conversation** — the assistant knows your installed node catalog (types, ports, parameter schemas) and the live graph, applies batched operations (`add_node`, `connect`, `set_params`, `remove_node`, `auto_layout`, …), and self-corrects from per-operation validation errors.
- **Attach files** — add **images, PDFs, text, or code** to a message. Text and PDFs are extracted and inlined into the prompt; images are sent as multimodal content to vision-capable models. See [Attachments](./attachments.md).
- **Conversation history** — past chats are listed in the panel; click one to continue where you left off (capped at 50, stored in your browser). See [Conversation history](./conversation-history.md).
- **Five providers** — OpenAI API, OpenAI Codex (ChatGPT account), OpenRouter, Claude API, and any custom OpenAI-compatible endpoint. See [Provider setup](./provider-setup.md).
- **Streaming replies** with applied-operations chips, a stop button, and retry on errors.

## Next steps

- [Installation](./installation.md) — requirements and how to install.
- [Provider setup](./provider-setup.md) — connect a model provider.
- [How it edits the graph](./graph-editing.md) — what the assistant does under the hood.
