---
id: intro
title: 介紹
slug: /
sidebar_label: 介紹
---

# Graph Copilot

**Graph Copilot** 是 [CodefyUI](https://github.com/treeleaves30760/CodefyUI-Plugin-Official) 的 AI 聊天助手外掛。跟 AI 對話來**生成、調整、改進**你畫布上的節點圖。

安裝後，編輯器右下角會多一顆懸浮的助手按鈕。點開它就是聊天視窗：描述你要的 pipeline、要求改參數、或請它改進現有的圖 — 助手會直接透過工具呼叫編輯畫布，而且**每一輪 AI 編輯都是一個復原步驟**（Ctrl+Z 一次撤銷）。

## 功能

- **用對話建圖** — 助手知道你安裝的節點目錄（型別、連接埠、參數綱要）與即時的圖，套用批次操作（`add_node`、`connect`、`set_params`、`remove_node`、`auto_layout`…），並從每個操作的驗證錯誤中自我修正。
- **附加檔案** — 把**圖片、PDF、文字或程式碼**加進訊息。文字與 PDF 會被擷取並併入提示；圖片則以多模態內容送給支援視覺的模型。見 [附加檔案](./attachments.md)。
- **對話紀錄** — 過往對話列在面板裡，點一下就能接續（上限 50 筆，存在你的瀏覽器）。見 [對話紀錄](./conversation-history.md)。
- **五種供應商** — OpenAI API、OpenAI Codex（ChatGPT 帳號）、OpenRouter、Claude API，以及任何自訂的 OpenAI 相容端點。見 [供應商設定](./provider-setup.md)。
- **串流回覆**，附帶已套用操作的標籤、停止按鈕、以及錯誤重試。

## 下一步

- [安裝](./installation.md) — 需求與安裝方式。
- [供應商設定](./provider-setup.md) — 連接模型供應商。
- [它如何編輯圖](./graph-editing.md) — 助手背後做了什麼。
