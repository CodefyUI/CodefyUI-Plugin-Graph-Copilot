---
id: installation
title: Installation
sidebar_label: Installation
---

# Installation

## Requirements

**CodefyUI 1.3.0 or later.** That release ships the two features this plugin is built on:

- **Plugin frontend extensions** — the JS bundle this plugin loads.
- **The LLM provider proxy** (`/api/llm/chat`).

If `cdui --version` reports an older version, run `cdui update` first.

## Install

```bash
cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot
```

Reload the CodefyUI browser tab afterwards. The teal assistant button appears at the bottom-right, above the minimap.

## Next

Connect a model provider in [Provider setup](./provider-setup.md).
