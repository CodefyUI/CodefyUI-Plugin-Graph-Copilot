---
id: installation
title: 安裝
sidebar_label: 安裝
---

# 安裝

## 需求

**CodefyUI 1.3.0 或更新版本。** 該版本內建本外掛所依賴的兩項功能：

- **外掛前端擴充** — 本外掛載入的 JS 套件。
- **LLM 供應商代理**（`/api/llm/chat`）。

若 `cdui --version` 顯示較舊版本，請先執行 `cdui update`。

## 安裝

```bash
cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot
```

安裝後重新整理 CodefyUI 分頁。teal 色的助手按鈕會出現在右下角、小地圖上方。

## 下一步

在 [供應商設定](./provider-setup.md) 連接模型供應商。
