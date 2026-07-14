---
id: provider-setup
title: Provider setup
sidebar_label: Provider setup
---

# Provider setup

Graph Copilot talks to a model provider through your **local CodefyUI backend**, which forwards each request to the provider you choose. Open the chat panel and click the **gear icon** to pick one of five providers and set its model and key.

## Providers

| Provider | What you need |
| --- | --- |
| **OpenAI API** | Your OpenAI API key |
| **OpenAI Codex (ChatGPT)** | Sign in with your ChatGPT subscription — no API key |
| **OpenRouter** | Your OpenRouter API key |
| **Claude API** | Your Anthropic API key |
| **Custom (OpenAI-compatible)** | A base URL (Ollama, LM Studio, vLLM, …); key optional |

For the key-based providers, paste an API key and pick a model. The **"Load list"** button fetches your account's model list.

## OpenAI Codex (ChatGPT) sign-in

Click **Sign in**, approve in the browser tab that opens, then return to CodefyUI. This uses your ChatGPT plan quota via the same flow as the open-source Codex CLI.

:::note
That flow reuses the Codex CLI's public OAuth client id, which is a gray area under OpenAI's terms — the same approach other third-party tools take. Use at your own discretion.
:::

## Custom (OpenAI-compatible)

Set a base URL such as `http://127.0.0.1:11434/v1` (Ollama). A key is optional.

## Where your keys live

API keys are stored in **your browser's localStorage** (namespaced per plugin) and sent to your local CodefyUI backend, which forwards them per request to the provider you selected. CodefyUI 1.3.0 is designed not to persist or log those keys server-side.

## What is sent to the model

Free-form user messages and attachments are sent as supplied and are also stored locally as conversation content. Do not paste credentials into chat text or ordinary labels.

Graph context has a narrower policy. Before an active-graph snapshot or graph-tool result is sent to the provider, Graph Copilot uses the installed node schemas to replace declared secrets, credential-shaped nested fields, and values under unknown schemas or parameters with `[REDACTED]`. It also scrubs exact echoes of those known redacted values from that generated context. This is fail-closed for graph parameters, but it cannot recognize an arbitrary credential embedded in otherwise ordinary prose.

Tool-call arguments are different: the provider creates them, and the original in-memory arguments are available only to the active provider/tool execution path so the requested tool can run. The copy used for display and conversation history is schema-redacted; known exact echoes in assistant text are scrubbed before local persistence or reuse in a later provider round. This cannot retroactively hide text already streamed by the provider in the current live reply. See [Conversation history](./conversation-history.md) for the stored-record boundary.
