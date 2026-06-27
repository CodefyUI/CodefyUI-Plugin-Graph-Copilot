---
id: architecture
title: Architecture
sidebar_label: Architecture
---

# Architecture

Graph Copilot is a **Vite library-mode React app** in `ui/`, built to a single committed ESM file, `frontend/index.js`. End users install via a GitHub tarball with no Node toolchain, so the built bundle is deliberately tracked in git.

## Plugin entry

The bundle default-exports `activate(api)`. Everything reaches CodefyUI through the `CodefyUIPluginAPI` object — graph operations, authenticated fetch, and namespaced storage — with no imports from core:

```tsx
export default function activate(api) {
  const el = api.ui.addFloatingWidget({ id: 'copilot' });
  createRoot(el).render(<CopilotApp api={api} />);
}
```

## The agent loop

Each user message runs a fresh turn:

1. **Build the system prompt** — a compact node catalog plus a snapshot of the live graph (truncated past a character limit).
2. **Stream the model reply** over the `/api/llm/chat` SSE proxy, with the two tools available.
3. **Execute tool calls locally** — `apply_graph_operations` (validated, one undo step) and `get_current_graph` — feeding per-operation results back to the model.
4. **Loop** up to a fixed number of tool rounds, committing assistant and tool turns so the conversation is never lost, then finish.

A windowed slice of prior turns is included for context. See [How it edits the graph](./graph-editing.md) for the tool contract.

## Modules

- `ui/src/llm/` — the SSE chat-stream client and endpoint wrappers (models list, Codex sign-in).
- `ui/src/agent/` — the system-prompt builder and the tool loop.
- `ui/src/state/` — settings, capped conversation persistence, and attachment handling.
- `ui/src/components/` — the FAB, chat window, chat view, message bubbles, history, and settings views.

## Tech stack

React 19, TypeScript, Vite 6 (library mode + CSS-injected-by-JS), and vitest + jsdom for tests. No state library — component state plus plain storage helpers.
