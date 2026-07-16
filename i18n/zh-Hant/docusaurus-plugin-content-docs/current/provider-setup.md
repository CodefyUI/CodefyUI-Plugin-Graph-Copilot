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

對需要金鑰的供應商，貼上 API 金鑰並選擇模型。Codex 會在登入後進入可同步狀態。

## 模型目錄與重新整理

插件啟動與 Settings 開啟期間，只要憑證已就緒，Graph Copilot 就會自動同步目前的內建 provider：OpenAI、OpenRouter 與 Claude 需要金鑰，Codex 則需要已登入的帳號。啟動時也會重新協商能力，讓已儲存的 reasoning-effort 偏好不必先開啟 Settings 就能安全恢復。成功結果會依 provider 與 credential／endpoint identity 儲存在記憶體中 **5 分鐘**，因此開啟 Settings 或切回同一 provider 時，可以沿用仍有效的目錄。

Codex dynamic discovery 是受相容性範圍限制的 best effort。CodefyUI host 會使用它已實作的 protocol version，只自動列出與該 contract 相容的模型，避免顯示 host 實際無法呼叫的選項。但這不代表未來永遠不必更新：若新模型要求新版 host 或 protocol，仍需更新 CodefyUI。

OpenAI API 與 OpenAI Codex 的目錄一定會合併以下內建 GPT-5.6 fallback：

| 模型 | Model id |
| --- | --- |
| **GPT-5.6 Sol** | `gpt-5.6-sol`（OpenAI 也可能提供 `gpt-5.6` alias） |
| **GPT-5.6 Terra** | `gpt-5.6-terra` |
| **GPT-5.6 Luna** | `gpt-5.6-luna` |

OpenAI 的 `/v1/models` response 只有 model ID，不含 reasoning-effort metadata。因此 Graph Copilot 會用 curated GPT-5.6 fallback 補上 effort 選項與預設值，同時合併 discovery 取得的 ID。

即使 discovery 結果沒有目前選取的模型，Graph Copilot 仍會把它保留在清單中。同步失敗時也會保留 fallback、cache 與目前選取項目，不會在背景偷偷換掉模型。按 **Refresh** 會略過 5 分鐘 cache，立即重新查詢。

自訂 OpenAI-compatible endpoint 永遠不會被自動查詢，因為任意 local endpoint 可能未啟動，喚醒成本也可能很高。你可以手動輸入 model id；只有明確按下 **Refresh** 時，Graph Copilot 才會查詢該 endpoint。

## Reasoning effort

Host catalog 提供 reasoning metadata 時，Settings 會顯示 reasoning-effort selector，並把選項以 `reasoning_effort` 送出。第一方 OpenAI request 可在所選模型支援時使用 `none`、`low`、`medium`、`high`、`xhigh` 或 `max`。Codex fallback 提供 `low`、`medium`、`high`、`xhigh` 與 `max`；Sol 預設為 `low`，Terra 與 Luna 預設為 `medium`。

Codex **不會顯示 `ultra`**。Ultra 是產品層級的 multi-agent／delegation mode，不是可攜、可放進單一 request `reasoning_effort` 的公開值。Graph Copilot 只會經 CodefyUI 送出單一 request，並未實作該 orchestration contract；若顯示或轉送 `ultra`，會誤導實際行為，也可能被上游拒絕。

:::info 需要相容的 Host capability
自動 rich catalog 與 reasoning effort 需要更新版 CodefyUI host：它必須回傳 rich model metadata，並接受及轉送 `reasoning_effort`。請使用明確標示支援這兩項能力的 host build。尚未正式發布前，本文件刻意不捏造版本號。
:::

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
