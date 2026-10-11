---
id: llm-training-research
title: LLM 訓練與研究
sidebar_label: LLM 訓練與研究
---

# LLM 訓練與研究

搭配 CodefyUI 的 LLM 節點組（CodefyUI main，2026-08），Graph Copilot 可以建立、執行並研究真實的語言模型預訓練 — 以型別化節點構成的圖，而不是一支腳本。

## 一句 prompt 訓練一個語言模型

向 agent 描述訓練管線，它會用真實節點組裝：`LMTokenizer`（tiktoken）、`TextCorpusDataset`（HF Hub 或本機文字）、`LMTokenizedDataset`（EOS 串接、打包成 next-token 塊、磁碟快取）、`CausalLMModel`（可訓練的 GPT-style decoder；預設約 2.04 億參數，並輸出精確的 `param_count`）、`LMCrossEntropyLoss`、既有的 `TrainingLoop`（bf16、梯度累積、裁剪、`max_steps`）、`CheckpointSaver`、`PerplexityEvaluate` 與 `TextGenerate` — 驗證通過後，經你確認以 `run_graph` 執行。訓練期間 loss 以即時 sparkline 串流到面板。

驗收參考（RTX 4080，16 GB）：203.7M 參數、1,500 步、約 1 億 TinyStories tokens、61 分鐘 — val_loss 2.954、perplexity 19.17（200 萬 held-out tokens）、2.44 GB 可續訓檢查點、生成文字連貫。CodefyUI 的範例庫另附較小的 `TrainCausalLM-TinyStories` 範例圖。

誠實執行的兩個關鍵開關：

- **裝置。**`run_graph` 會明確提交 run-level device（你的指定，否則取 `/api/system/devices` 的主機預設）；`device: auto` 的節點跟隨它。核准卡會標明實際執行裝置。
- **預算。**`LMTokenizedDataset.max_tokens` 與 `TrainingLoop.max_steps` 界定一次執行；打包 token 有磁碟快取，重跑與研究不再重新編碼。

## 研究訓練過程

自定義面是為訓練動力學研究設計的，實驗機制把它變成受控研究：

- **今天就能變動的：**`CausalLMModel` 的所有形狀旋鈕（寬度、深度、頭數、位置編碼 learned/sinusoidal/RoPE、LayerNorm/RMSNorm、激活、共享嵌入、初始化標準差、seed）、優化器家族與超參數、排程、序列長度、token 預算、label smoothing。
- **怎麼變動：**`optimize_graph_parameters` 以完整 grid 或種子化隨機計畫掃描既有 int/float/bool/select 參數；`run_graph_experiments` 比較結構性變體。兩者都在畫布隔離的複本上執行、一次確認、以數值指標排名，並輸出描述性區間與可驗證完整性的可攜研究包。
- **研究尺度的執行：**把管線縮到問題的尺度 — `d_model 256 / 4 層` 的模型在幾百萬 packed tokens 上，消費級 GPU 每次執行只要數秒。`timeout_minutes`（每次執行上限，最高 60 分）涵蓋單次超過 10 分鐘預設的研究；核准卡會顯示 per-run cap。
- **記錄指標：**在固定的 held-out token 集上接 `PerplexityEvaluate`，以其 `val_loss` 排名（minimize）。訓練動態存在記錄的 metric 序列裡（`train_loss_batch`、`lr`）。

實作範例 — 早期預訓練的學習率敏感度（一句 prompt、四次隔離執行、每次約 12 秒）：AdamW `3e-4` 以 val_loss 4.049（ppl 57.3）勝出、`1e-3` 4.159、`3e-3` 4.336（退化但未發散）、`1e-4` 4.819（欠訓練）— 預期中的 U 型曲線，用量測取代假設。

## 接下來

在 CodefyUI 端追蹤（epic #292）：逐 optimizer step 的排程與 warmup 家族（#297）、訓練遙測 — 梯度範數、update 比率、訓練中途驗證曲線、步數里程碑檢查點（#298）、GQA/qk-norm/bias 架構旋鈕（#299）、加權語料混合（#300）。每一項都會擴大「用聊天驅動的研究」能量測的範圍。
