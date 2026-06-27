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

API keys are stored in **your browser's localStorage** (namespaced per plugin) and sent **only to your local CodefyUI backend**, which forwards them per-request to the provider you selected. They are never persisted or logged server-side, and never sent anywhere else.
