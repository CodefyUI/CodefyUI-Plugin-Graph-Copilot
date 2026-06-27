---
id: provider-setup
title: 供應商設定
sidebar_label: 供應商設定
---

# 供應商設定

Graph Copilot 透過你**本機的 CodefyUI 後端**與模型供應商溝通；後端會把每個請求轉發給你選擇的供應商。打開聊天面板、點**齒輪圖示**，從五種供應商中挑一種並設定其模型與金鑰。

## 供應商

| 供應商 | 你需要準備 |
| --- | --- |
| **OpenAI API** | 你的 OpenAI API 金鑰 |
| **OpenAI Codex（ChatGPT）** | 用 ChatGPT 訂閱登入 — 不需 API 金鑰 |
| **OpenRouter** | 你的 OpenRouter API 金鑰 |
| **Claude API** | 你的 Anthropic API 金鑰 |
| **自訂（OpenAI 相容）** | 一個 base URL（Ollama、LM Studio、vLLM…）；金鑰可選 |

對需要金鑰的供應商，貼上 API 金鑰並選擇模型。**「Load list」** 按鈕會抓取你帳號的模型清單。

## OpenAI Codex（ChatGPT）登入

點 **Sign in**，在開啟的分頁中授權，再回到 CodefyUI。這會透過與開源 Codex CLI 相同的流程，使用你的 ChatGPT 方案額度。

:::note
該流程沿用 Codex CLI 的公開 OAuth client id，在 OpenAI 條款下屬灰色地帶 — 與其他第三方工具同款做法。請自行斟酌使用。
:::

## 自訂（OpenAI 相容）

設定一個 base URL，例如 `http://127.0.0.1:11434/v1`（Ollama）。金鑰可選。

## 你的金鑰存在哪

API 金鑰存在**你瀏覽器的 localStorage**（依外掛命名空間隔離），而且**只會送到你本機的 CodefyUI 後端**，再由它逐次請求轉發給你選的供應商。伺服器端不落地、不記 log，也不會送到其他任何地方。
