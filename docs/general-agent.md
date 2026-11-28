---
id: general-agent
title: Side panel, skills and tools
sidebar_label: Side panel, skills and tools
---

# Side panel, skills and tools

From 0.5.0 the plugin is **Copilot**, a general agent for CodefyUI. It still builds graphs and runs experiments, and it can now follow Agent Skills and your project's `AGENTS.md`, open graphs and examples in tabs, and read and commit your project's files with your approval. The plugin id stays `graph-copilot`, so settings, conversations and studies carry over.

## Where it appears

| Host | Panel | Skills and project instructions |
| --- | --- | --- |
| CodefyUI with plugin API 6 (side dock, Agent Skills) | A side panel opened from the toolbar toggle; resize it by its edge (300–720 px) | On |
| CodefyUI 3.2.0 (plugin API 5) | The floating window at the bottom-right, as before | Off, with no Skills view, no skill tools and no prompt sections |
| CodefyUI 1.3.0+ (plugin API 1) | The floating window | Off |

The plugin detects these features when it loads. On an older host it doesn't show errors for features that aren't there.

In the side panel, the toolbar toggle shows the agent's state while the panel is closed:

| State | When | Toolbar badge |
| --- | --- | --- |
| Needs you | An approval is waiting, or no provider is set up | attention |
| Done | A turn finished while you were not looking | done |
| Working | The model is writing or a tool is running | working |
| Idle | Anything else | none |

The header shows the same state as a word and a glyph (`!`, `✓`, `⚙`, `○`). Closing the side panel does not stop a turn; closing the floating window does, as it did before.

## Approvals

Clearing the canvas, removing many nodes (counted over the whole turn: 10 or more, or at least 3 that make up half of the graph the turn started with; each batch past that point asks again), running the graph, running a study and committing files each need your approval. The request appears as a card in the conversation, showing what will happen and what it costs. Graph cards name the tab they act on and say when Copilot opened that tab during this turn. Focus starts on **Cancel**, Escape cancels, and the main button names the action ("Run graph", "Commit 3 files").

The agent loop checks approvals in code. A skill, `AGENTS.md`, a tool result or the model's own text cannot approve anything or skip a card.

While a card is open, its tool row reads "Waiting for your approval". A declined card reads "Not executed", and only a call that actually finished is described in the past tense. When a run fails, one block shows the reason, the real error, what did not happen ("No graph changes · Validation not run") and Retry. A Stop you asked for is shown in a neutral colour, not as an error. In **Ask** mode, tools that change things are not offered to the model and are refused if it calls them anyway; skills cannot change that.

## Skills

A skill is a folder with a `SKILL.md` (YAML front matter with `name` and `description`, then instructions) and optional reference files. CodefyUI loads skills from the project's `skills/`, the user skills folder, plugins and its built-ins. Open the **Skills** view to see them by source, turn each one on or off, read its instructions and files, or install one from a folder, archive or git URL.

- The system prompt lists each enabled skill as one line: its name and description. When a task matches a skill, the agent calls `load_skill` to read the full instructions.
- `read_skill_file` reads a file inside a skill that has already been loaded in this conversation. CodefyUI checks the path; the plugin never builds file paths itself.
- Type `/` in the message box to pick a skill (it is sent with your next message) or a command: `/new`, `/clear`, `/skills`, `/settings`.
- `allowed-tools` in a skill's front matter is **shown in the Skills view only; it is not enforced**. A skill cannot give the agent more tools than the mode allows.
- Scripts in a skill are never run.
- Installing and deleting skills is done only by you, in the Skills view; the agent has no install tool. If CodefyUI refuses installs (for example when it is not bound to localhost), the Skills view shows CodefyUI's message as it is and hides the install form.

## Project instructions

If the open project has an `AGENTS.md`, its text is added to the system prompt under **Project instructions**. Like skill text, it is placed inside a marked block and labelled as reference material that cannot change the rules above. Tool results always go to the model in the tool role, never into the system prompt.

## Tools

The ten graph, run and experiment tools are unchanged (see [How the agent edits the graph](./graph-editing.md)). These are new:

| Tool | Mode | Needs | What it does |
| --- | --- | --- | --- |
| `load_skill` | Ask and Edit | Agent Skills | Read a skill's instructions and file list; loading it again returns a short "already loaded" note |
| `read_skill_file` | Ask and Edit | Agent Skills | Read one file of a loaded skill (up to 64 KB) |
| `list_tabs` | Ask and Edit | Workspace API (plugin API 5) | List open graph tabs with their node counts |
| `open_graph` | Edit | Workspace API | Open a saved graph in a new tab, or report that it is already open |
| `search_examples` | Ask and Edit | Workspace API | Search the host's example graphs |
| `open_example` | Edit | Workspace API | Open an example in a new tab (never into the current canvas) |
| `project_status` | Ask and Edit | A git project | Branch and changed files; `.env` files are not listed |
| `project_diff` | Ask and Edit | A git project | One file's diff (up to 32 KB); `.env` files are refused |
| `project_log` | Ask and Edit | A git project | Recent commits |
| `project_commit` | Edit, with approval | A git project | Stage exactly the listed files and commit them on the current branch |

Large results are cut, and the cut is marked: skill text and files at 64 KB, diffs at 32 KB, lists at 200 entries. Diffs and the commit log reach the model inside quoted blocks marked as untrusted data. Saved conversations keep a reference to a loaded skill or skill file instead of its text, and Copilot fetches it again when the conversation continues; if it is gone, the model is told so. When the browser cannot save a conversation in full, the panel says so.

`project_commit` lists every file on the approval card. It stages only those paths (never "add all"), refuses `.env` files and files git ignores, refuses files that are only partly staged (finish or discard the staging in the Source Control tab first), refuses during a merge, rebase or conflict, and checks the files again after you approve. It never pushes, pulls or switches branches; do those in CodefyUI's Source Control tab.

## 0.6.0

Changes after testing with real models (Codex and a local reasoning model through Ollama).

**After a failed run.** When the host reports a definite failure (the run finished with an error, or nothing was submitted), the error goes back to the model and the turn continues: it can explain the cause, fix the graph, validate and ask you to approve a new run. The same unchanged graph is refused, and `run_graph` runs at most 3 times per turn. When the outcome is not known (the connection was lost, the run may still be running, a stop was not confirmed) the turn still ends, as before. Studies follow the same rule.

**Validation repair.** The automatic repair prompt lists only errors this turn's edits introduced. Errors the graph already had before the first edit are left out, an empty graph is not validated, and after you approve clearing the graph the agent is not asked to add nodes back.

**Project in the prompt.** With a project open, the system prompt names it, says whether it is a git repository, lists up to 50 saved graphs (then a count) and the mods state; without one it says no project is open. Names are quoted as data. On plugin API 7 the current graph section says whether the active tab is bound to a saved graph and has unsaved changes.

**Turn summary.** A failed operation that a later batch in the same turn corrected (a successful operation of the same kind, then a valid graph) reads "Completed" with "1 operation failed and was corrected later in this run". A successful run says what ran ("Ran the graph once", the run id); the "check before repeating" caution stays for outcomes that are not known. Expanding a tool row shows the whole error.

**Layout and parameter search.** `auto_layout` is used only for batches that add or remove nodes or connections, never for a parameter change. A grid that contains the current value measures that setting as the baseline in the same study ("5 settings (including the current baseline)").

**Reasoning models.** On a host that streams `reasoning_delta`, the run bar shows "Reasoning" and the seconds elapsed. The reasoning text is never shown or stored. When the model request fails, the panel shows the host's message.

### New tools (CodefyUI 3.5.0, plugin API 7)

| Tool | Mode | Approval | What it does |
| --- | --- | --- | --- |
| `save_graph` | Edit | Always: "Save as `NAME`?", "Save the changes to `NAME`?", or a danger card naming a saved graph it replaces | Saves the active tab through the editor's own save path. Replacing another saved graph needs `overwrite: true` after you agreed. |
| `list_data_files` | Ask and Edit | None | Built-in samples, project data files and uploads, with paths as node parameters take them, sizes, CSV column names and row counts. No rows. |
| `project_list_files` | Ask and Edit | None | One folder of the project. |
| `project_read_file` | Ask and Edit | For data files only (under `data/` or `assets/data/`, or `.csv .tsv .jsonl .parquet`): the card names the file, its size and the provider | Reads up to 64 KB, quoted as data. |
| `project_write_file` | Edit | Always: the whole new file, or a diff | Writes `data/**` and `assets/data/**` (`.csv .tsv .json .jsonl .txt .md .yaml .yml`), `docs/**` and `notes/**` (`.md .txt .json .yaml .yml .csv`), root `.md` files, `mods/nodes/<name>.py` and `mods/presets/<name>.json`. `data/samples/` is not writable. |

- A write uses the file's hash from just before the card, so a file that changed in the meantime is not overwritten. A file whose read was cut at 64 KB is not rewritten.
- `mods/nodes/` files: the card says the code will run on your computer. Saving does not run it. The node exists only after you agree to CodefyUI's trust prompt and press Reload Nodes, and the model is told so.
- `AGENTS.md`: the card is the danger style, because the file goes into every later conversation's prompt.
- A refusal from the host is shown as the host wrote it and is not retried under another path.
- `open_graph` on plugin API 7 opens a tab bound to the saved graph (or switches to it), and `list_tabs` reports `unsaved` and the bound graph.

On CodefyUI 3.4.0 and older (plugin API 6 or lower) none of these tools are offered and the other tools work as before. An endpoint that answers 404 is treated as missing on that host.

## Language

The panel follows CodefyUI's interface language (English or Traditional Chinese) and switches when you change it.
