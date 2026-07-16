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

For the key-based providers, paste an API key and pick a model. Codex becomes ready after sign-in.

## Model catalog and refresh behavior

At plugin startup and while Settings is open, Graph Copilot automatically synchronizes the active built-in provider as soon as its credentials are ready: OpenAI, OpenRouter, and Claude require a key, while Codex requires a signed-in account. Startup negotiation also restores a saved reasoning-effort preference without requiring Settings to be opened first. A successful result is cached in memory for **five minutes** per provider and credential or endpoint identity, so opening Settings or returning to a provider can reuse a fresh catalog.

Codex dynamic discovery is compatibility-bounded best effort. The CodefyUI host uses the protocol version it implements and auto-lists only models compatible with that contract. This avoids presenting a model the host cannot call, but it does not promise zero future updates: a model that requires a newer host or protocol still requires a CodefyUI update.

The OpenAI API and OpenAI Codex catalogs always include these built-in GPT-5.6 fallbacks:

| Model | Model id |
| --- | --- |
| **GPT-5.6 Sol** | `gpt-5.6-sol` (OpenAI may also expose the `gpt-5.6` alias) |
| **GPT-5.6 Terra** | `gpt-5.6-terra` |
| **GPT-5.6 Luna** | `gpt-5.6-luna` |

OpenAI's `/v1/models` response contains model IDs, not reasoning-effort metadata. Graph Copilot therefore supplies the GPT-5.6 effort options and defaults from these curated fallbacks while still merging the discovered IDs.

Graph Copilot keeps the currently selected model in the list even if discovery omits it. A failed sync also retains the fallback, cached, and current entries instead of silently replacing the selection. Click **Refresh** to bypass the five-minute cache and query again immediately.

Custom OpenAI-compatible endpoints are never queried automatically because an arbitrary local endpoint may be unavailable or expensive to wake. Enter a model id manually, or click **Refresh** when you explicitly want Graph Copilot to query that endpoint.

## Reasoning effort

When the host catalog advertises reasoning metadata, Settings shows a reasoning-effort selector and sends the chosen value as `reasoning_effort`. First-party OpenAI requests can use `none`, `low`, `medium`, `high`, `xhigh`, or `max` when the selected model supports them. The Codex fallback offers `low`, `medium`, `high`, `xhigh`, and `max`; Sol defaults to `low`, while Terra and Luna default to `medium`.

Codex **does not expose `ultra`**. Ultra is a product-level multi-agent/delegation mode, not a portable public value for a single request's `reasoning_effort`. Graph Copilot sends one request through CodefyUI and does not implement that orchestration contract, so showing or forwarding `ultra` would misrepresent what happens and may be rejected upstream.

:::info Host capability required
Automatic rich catalogs and reasoning effort require an updated CodefyUI host that returns rich model metadata and accepts and forwards `reasoning_effort`. Use a host build that explicitly documents both capabilities. This documentation intentionally does not invent a version number for a host release that has not been published.
:::

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
