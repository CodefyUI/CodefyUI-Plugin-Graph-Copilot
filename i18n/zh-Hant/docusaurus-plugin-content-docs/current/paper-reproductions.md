---
id: paper-reproductions
title: 畫布上的論文重現
sidebar_label: 總覽
---

# 畫布上的論文重現

一個研究工具最有力的論證不是功能清單,而是拿一篇已發表的結果、從論文本身重建方法、實際執行,看效應是否重現。本節記錄的正是這個練習的全程 — 由 Graph Copilot 讀論文、建圖、跑實驗。

## 流程協定

本節每一頁都走完同樣的五步,未經剪裁:

1. **附上論文。** 真正的 PDF(或全文)以附件進入對話 — 代理讀的是一手來源,不是摘要。
2. **代理陳述主張。** 動手之前,必須先說出論文的核心可證偽主張,以及它要縮小的證據設計。
3. **代理把方法建成圖。** 只用一級節點 — 方法必須以型別化、可檢視的結構存在,不是一坨腳本。
4. **一次核准、隔離執行。** 研究透過 `run_graph_experiments` / `optimize_graph_parameters` 執行:畫布隔離的候選、每臂只差一個變因、事先指名單一排名指標。
5. **數字照登、結論誠實。** 結果按量測原樣回報,包含不合論文方向的那些 — 一個永遠說「是」的重現頁什麼也證明不了。

## 為什麼小尺度重現有意義

這些是刻意迷你化的:消費級 GPU 的幾分鐘,不是論文的原始預算。迷你重現不能確認論文的精確數字;它能檢驗的是論文的「機制」禁不禁得起移植 — conv stem 在 3M 參數下還能修 ViT 的優化嗎?IsoFLOP 谷形在 TinyStories 尺度還存在嗎?每一頁都精確說明哪個主張被縮小檢驗、哪個沒被觸及。

## 重現清單

| 論文 | 場合 | 畫布實例 | 結論 |
| --- | --- | --- | --- |
| Early Convolutions Help Transformers See Better(Xiao et al.) | NeurIPS 2021 | `VLAModel.vision_stem` conv vs patchify,其餘全同 | **未重現 — 方向相反**(patchify 0.85 vs conv 0.45);控制變因的 A/B 同時暴露了我們自己先前歸因裡的混淆變因 |
| Training Compute-Optimal LLMs — Chinchilla(Hoffmann et al.) | NeurIPS 2022 | IsoFLOP 剖面:固定算力下 3 組(模型大小, token 數),跑了兩輪(第二輪 10 倍預算由代理自主提出) | **頭條主張在兩個預算下都重現** — d384 花 10 倍算力只追平 1 倍算力的 d128;谷底落在掃描範圍外,成因已被診斷(embedding 主導的區間) |
| Flow Matching for Generative Modeling(Lipman et al.) | ICLR 2023 **Spotlight** | `VLAModel.head_type` flow_matching(OT 路徑、Euler 取樣)vs regression | **忠實實作且訓練穩定,但在此微型預算下不具競爭力**(0.00 vs 0.50);少步數取樣主張在零能力下不可測 — 固定權重的 ODE 步數掃描已排入後續 |
