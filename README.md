# Graph Copilot — CodefyUI Plugin

An AI chat assistant plugin for CodefyUI. Open the floating assistant button, describe what you want, and the AI generates and edits your node graph through conversation. Supports multiple LLM providers (OpenAI, ChatGPT Codex, OpenRouter, Claude API, and any custom OpenAI-compatible endpoint) with persistent conversation history and per-provider API key storage.

## Requirements

- CodefyUI with plugin frontend extensions and LLM proxy (PRs #55 and #56 — or a tagged release that includes them)

## Install

```sh
cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot
```

## Dev workflow

```sh
cd ui
pnpm install
pnpm build
```

The build emits a single committed ESM file at `frontend/index.js`. End users install via the GitHub tarball and need only uv + Python — no Node required at install time.

## Security

API keys are stored in your browser's localStorage and ride to your local CodefyUI backend per request. They are never sent anywhere except the provider you choose. Keys never leave your machine without your action.
