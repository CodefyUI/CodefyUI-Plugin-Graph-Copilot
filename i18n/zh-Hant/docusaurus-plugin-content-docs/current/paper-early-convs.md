---
id: paper-early-convs
title: "Early Convolutions Help Transformers See Better（NeurIPS 2021）"
sidebar_label: Early conv stems
---

# Early Convolutions Help Transformers See Better

**論文:** Xiao, Singh, Mintun, Darrell, Dollar, Girshick(FAIR),NeurIPS 2021,[arXiv:2106.14881](https://arxiv.org/abs/2106.14881)。
**畫布實例:** `VLAModel.vision_stem` — `conv`(堆疊 stride-2 3x3 卷積)vs `patchify`(ViT 原始 stem),在 PushWorld VLA 管線上,其餘一切固定。
**結論:此尺度下未重現 — 效應量測到相反方向。** 而這個負結果正是本頁存在的理由。

## 代理做了什麼

PDF 以附件進入對話。Graph Copilot(Codex gpt-5.6-sol、max effort)正確總結了主張 — ViT 的優化困難源自大 kernel、大 stride 的 patchify stem;換成幾層重疊的 3x3 stride-2 卷積能加速收斂、穩定 AdamW/lr/wd 敏感性、在 ImageNet top-1 上加 1-2 個百分點 — 然後陳述可證偽假設、把畫布上的 VLA 管線恢復成 45-epoch 研究配置,跑了兩臂 `run_graph_experiments`:同資料(兩臂各自生成了完全相同的 30,803 筆樣本)、同預算、同 seed,`vision_stem` 是唯一被操作的變因。

## 量測結果(單一 seed、每臂 20 個 rollout 回合)

| vision_stem | success_rate(max) | 最終 train_loss | 最終 val_loss |
| --- | ---: | ---: | ---: |
| conv | 0.45 | 0.288 | 0.526 |
| **patchify** | **0.85** | **0.197** | **0.513** |

patchify 臂在每個量測上都贏 — 論文的方向沒有熬過向「3M 參數、96px 合成畫面、8px patch 的動作策略」的移植。

代理自己的保留(精神原文照登):每臂只有一個 seed,按工具自己的標準屬 pilot;論文的「可優化性」還涵蓋 optimizer/schedule/lr/wd 掃描,本研究未跑;兩種 stem 也沒有像論文那樣用刪減 Transformer block 來 FLOP 匹配(3.34M vs 3.17M 參數)。足以判定迷你版未重現;不足以評斷論文的原始區間。

## 為什麼這合理、而非難堪

論文的效應活在 ImageNet 尺度:224px 影像、16px patch(對豐富自然影像的 196-token 瓶頸)、上千萬參數、大 batch AdamW 的不穩定性。這次移植是 96px 合成渲染、8px patch(本來就是細緻的 12x12 網格)、3M 參數,而且 warmup-cosine 排程本身就修掉了 conv stem 原本要修的大半優化病理。機制有其區間;這一個沒有向下延伸。

## 這個練習對「系統」證明了什麼

在這次研究之前,我們自己的原型筆記把一大段品質差距歸因於 conv stem — 但原型在同一次迭代裡同時改了 stem 和資料量。控制變因的 A/B 暴露了這個混淆:在此預算下 stem 的歸因是錯的,誠實的歷史現已寫進節點的參數描述。一個能在一次核准內抓出作者自己混淆聲稱的工具,才是你想讓它跑消融的工具。
