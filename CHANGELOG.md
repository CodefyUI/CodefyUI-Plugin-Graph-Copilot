# Changelog

All notable changes to Copilot (plugin id `graph-copilot`). Versions follow `cdui.plugin.toml`.

## [Unreleased]

## [0.6.0]

Fixes from testing with real models, and the tools CodefyUI 3.5.0 (plugin API 7) makes possible. Older hosts keep working; the new tools are not offered there. Details: [docs/general-agent.md](docs/general-agent.md#060).

### Changed

- **A definite run failure goes back to the model.** It can explain, fix the graph and ask for a new approval; the same unchanged graph is refused and `run_graph` runs at most 3 times per turn. Uncertain outcomes still end the turn.
- **Validation repair lists only this turn's errors.** Pre-existing errors are left out, an empty graph is not validated, and an approved clear is never followed by nodes added back.
- **The prompt always describes the project** (name, git, up to 50 saved graphs, mods), or says none is open; on API 7 it names the active tab's binding and unsaved state.
- **Turn summaries.** Failed operations corrected later in the turn read as completed with a note; a successful run says what ran; the caution about repeating is kept for unknown outcomes; an expanded tool row shows the whole error.
- **`auto_layout` only after structural batches**, never for parameter-only changes.
- **Parameter grids that contain the current value measure it as the baseline** in the same study, and the approval card says so.
- **Reasoning models**: the run bar shows "Reasoning" and the seconds while the host streams `reasoning_delta`; the reasoning text is never shown or stored. A failed model request shows the host's message.

### Added (CodefyUI 3.5.0, plugin API 7)

- **`save_graph`**, with an approval card (a danger card when it replaces another saved graph). `open_graph` opens a bound tab; `list_tabs` reports `unsaved` and the bound graph.
- **`list_data_files`**: data paths as node parameters take them, with CSV columns and row counts.
- **`project_list_files`, `project_read_file`, `project_write_file`**: project files within the host's path rules. Writes always show the new file or a diff; data-file reads ask before rows go to the provider; `mods/nodes/` writes load only after the host's trust prompt and Reload Nodes; `AGENTS.md` writes use the danger card.

## [0.5.0]

Copilot as a general agent: side panel, Agent Skills, project instructions, workspace and project tools.
