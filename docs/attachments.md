---
id: attachments
title: Attachments
sidebar_label: Attachments
---

# Attachments

You can add **images, PDFs, text files, or code** to a message — via the **📎 button**, **drag-and-drop**, or **paste**.

## How each type is handled

- **Images** are shown as thumbnails and sent to the model as base64 **multimodal** content on image-capable providers (OpenAI / OpenAI-Codex / OpenRouter / Claude / custom). If a backend or model can't accept multimodal content, it degrades gracefully to a normal stream error you can retry.
- **Text and code** files are extracted and **inlined** into the prompt as labeled fenced blocks.
- **PDFs** are extracted to text and inlined. Parsing uses **pdf.js loaded on demand from a CDN** only when you actually attach a PDF — it is never bundled into the plugin, so it adds nothing to the install size.

## Chips and limits

Attached files appear as a chip row above the textarea (image thumbnail or file icon + name + size, with a spinner while a PDF is read). **Send is disabled while any attachment is still loading.** Per-file size guards apply, with friendly errors.
