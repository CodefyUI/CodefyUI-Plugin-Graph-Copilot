---
id: intro
title: 介紹
slug: /
sidebar_label: 介紹
---

# Graph Copilot agent 工作台

**Graph Copilot** 是 [CodefyUI](https://github.com/CodefyUI/CodefyUI) 的 agent 工作台。它可以建構與修改圖、在隔離候選圖上執行有上限的實驗、依數值指標排名、選擇性套用最佳的 parameter-only 設計，並把觀察整理成可驗證的研究問題。

外掛會在編輯器加入懸浮按鈕。工作台包含目前模型與 graph context、聊天與工具進度、實驗 Lab、對話歷史與設定。直接修改圖時，每批 GraphOps 都是一個 undo step。

:::important 目前「agent」的範圍
規劃與實驗協調運行在瀏覽器。現有 CodefyUI 後端負責驗證與執行圖，但本外掛沒有安裝持久化 agent server 或背景 job queue。實驗執行期間請保持頁面開啟。詳見[架構與 CodefyUI 相容性](./architecture.md)。
:::

## 功能

- **對話建圖**：讀取節點目錄與 live graph，以批次 GraphOps 修改並依錯誤自我修正。
- **隔離實驗**：從 memory clone 產生 variant，經 CodefyUI 驗證與 WebSocket 執行後量測、排名，不會把暫存圖塞進畫布。
- **有上限的 parameter search**：完整 small grid 與 versioned seeded-random plan 會把 explicit safe parameter domain 轉成 deterministic、可審查的候選，沿用同一核准與 run budget。
- **安全 promotion**：只有明確要求、winner 僅含 `set_params`，且 live graph 仍與 baseline 一致時才自動套用；structural winner 只會作為待審查 proposal。
- **研究 evidence**：保留逐次 scalar、descriptive interval、baseline effect size 與 failure，提供 CSV／evidence-labeled Markdown，但不把 pilot 說成證明。
- **Portable studies**：完成研究會產生 secret-redacted bundle；import 會檢查 canonicalized semantic content 與 raw／derived evidence，採 preview-first、read-only。Candidate graph JSON 可把 captured redacted GraphOps 重新套到 baseline 後產生，不執行、不改畫布，但不是 exact execution replay。
- **附件、歷史與多 provider**：支援圖片、PDF、文字、程式碼、最多 50 筆瀏覽器端對話，以及 OpenAI、Codex、OpenRouter、Claude 與 OpenAI-compatible endpoint。
- **階段式進度**：串流顯示多輪 agent 訊息與可展開的 tool stage，支援取消與 retry。

## 下一步

- [安裝](./installation.md)
- [供應商設定](./provider-setup.md)
- [圖編輯](./graph-editing.md)
- [實驗與研究](./experiments-and-research.md)
- [Agent roadmap](./roadmap.md)
