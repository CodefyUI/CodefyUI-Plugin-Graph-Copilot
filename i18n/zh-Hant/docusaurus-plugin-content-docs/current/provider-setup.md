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

API 金鑰存在**你瀏覽器的 localStorage**（依外掛命名空間隔離），並送到本機 CodefyUI 後端，再由它逐次請求轉發給你選的供應商。CodefyUI 1.3.0 的設計是不在伺服器端持久化或記錄這些金鑰。

## 會送給模型的內容

自由文字訊息與附件會依你提供的內容送出，也會作為對話內容保存在本機。請勿把 credential 放進聊天文字或一般 label。

Graph context 採更嚴格的規則：active graph snapshot 或 graph tool result 送到 provider 前，Graph Copilot 會依已安裝的 node schema，把宣告為 secret 的值、credential-shaped nested field，以及未知 schema／parameter 下的值替換成 `[REDACTED]`，並移除這些已知去敏值在 generated context 中的 exact echo。Graph parameter 會 fail-closed，但任意藏在普通 prose 中的 credential 並無法被通用辨識。

Tool-call argument 的流程不同：它由 provider 產生，原始 in-memory argument 只供當次 active provider/tool execution path 使用，讓指定工具能執行。顯示與 conversation history 使用的副本會依 schema 去敏；assistant text 中已知值的 exact echo 也會在本機持久化或後續 provider round 重用前移除。這無法回頭隱藏 provider 已在目前 live reply 串流出的文字。儲存邊界詳見[對話紀錄](./conversation-history.md)。
