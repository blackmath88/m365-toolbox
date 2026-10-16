# m365-toolbox — working notes for Claude

Small browser tools for the University of Basel M365 training series, plus the Deep Dive workstream in `m365-deep-dives/`.

## Conventions

- Static HTML and vanilla JS. No build step, no external dependencies; every page must open offline by double-click (so no `fetch()` of local files).
- Shared colours and base components live in `assets/tokens.css`. Extend it only for needs that repeat across tools.
- Content sits in a plain data structure at the top of each tool's script so non-developers can edit it.
- Tone: direct, compact, slightly dry. Not Microsoft documentation, not "digital maturity" language. See `docs/concept.md`.
- All personas, names and units are fictional. No real University of Basel people or internal data.
- Do not overwrite `team-personas/index.html`; the higher-education work lives in `team-personas/higher-education/`.

## Executing plans (routing-mod)

- Plans live in `plans/`. When asked to execute one, dispatch each task as a subagent.
- Copy the task's `[tier:light|standard|deep]` tag verbatim into the Agent prompt. The routing mod picks the model from it.
- Bundle tiny tasks into one subagent. Run tasks marked (parallel) in parallel, otherwise sequentially.
- Never switch the main session's model mid-task.
- After each task, tick it off in the plan file.
