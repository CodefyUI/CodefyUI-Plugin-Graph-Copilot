---
id: conversation-history
title: Conversation history
sidebar_label: Conversation history
---

# Conversation history

Past chats are listed in the panel's **history** view. Click one to continue where you left off.

- Conversations are stored in **your browser's localStorage**, capped at **50** (the oldest is dropped when you exceed the cap).
- Each entry shows its title, a relative timestamp, and the provider/model it used.
- A conversation's title is taken from your first message.
- Live graph snapshots and graph-tool results are scrubbed before provider use and storage. Parameters declared as `secret`, credential-shaped nested fields, unknown node schemas/parameters, and exact echoes of their known redacted values are replaced with `[REDACTED]`.
- Tool calls are copied before display or storage and receive the same schema-aware, fail-closed redaction. The original arguments exist only in the active provider/tool execution path so the requested tool can run; they are not written into conversation history.
- Known exact echoes of values redacted from the graph or tool call are also scrubbed from assistant text before local persistence or reuse in a later provider round. This does not retroactively conceal text already streamed in the live reply, and it is exact-value protection rather than a generic secret classifier.
- Your own message text is stored as written. Do not paste API keys or other credentials into free-form chat text.

Conversation history itself has no export/import; it is a continuity convenience that lives entirely in your browser. Experiment Lab separately supports portable study export and read-only import with internal semantic-integrity and raw/derived consistency checks, including redacted graph specifications and recorded scalar evidence. Those checks do not authenticate the evidence or its author.
