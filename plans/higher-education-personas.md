# Plan: Higher-education working worlds

PR: blackmath88/m365-toolbox#3 (branch `feat/higher-education-team-personas`, stays draft, no merge)
Goal: turn `team-personas/higher-education/` into a browsable fictional university working world that serves as the scenario backbone for the six Deep Dives.

**Status: DRAFT — waiting for UI / visual-direction input. Do not execute tasks 3–6 before it arrives.**

## Inputs

- `team-personas/higher-education/BRIEF.md`, `personas.json`, `README.md`
- `m365-deep-dives/README.md` (six working questions, Level 3 dramaturgy)
- `docs/concept.md` (tone, "instruction cards, not dashboards")
- Perplexity research brief (pasted in chat, 2026-10-16): summary below

## Research takeaways to apply

- File-location mechanism is documented [MS]: chat attachments → sender's OneDrive, channel files → team SharePoint. Use it as the hard hook for the Heat & Health "draft in one OneDrive" friction.
- Label everything by source: **[MS]** Microsoft-documented · **[P]** practitioner · **[S]** our synthesis. Committee, teaching and PhD patterns have no sources → present as observed patterns, not evidence.
- Call them "working worlds" / scenarios, not "team personas" (they aren't M365 teams).
- Decisions are first-class: question → options → recommendation → trade-offs → what we would *not* do.
- Nora needs triggers (coauthor joins, she goes on leave, workshop becomes a series), otherwise "stay in OneDrive" is a dead end.
- Commission: keep thin; add member turnover, secretariat as real owner, possibly external members; test "one channel + library" vs. "no team at all".
- Research group: add the lab/equipment pattern and an explicit research-data boundary (what does *not* belong in M365).
- Admin team: make Leadership Forum cut across Campus & People Development and HR Services so "stable team vs temporary project" is forced.
- Candidate fifth world: teaching team (semester cycle, handover, staff + students). Open decision.
- Surname collisions: Frei ×3, Keller ×3, Rossi ×2, Meier ×2. Open decision.

## Proposed information architecture (to confirm after visual input)

1. **Home** — the worlds, each shown by its one-sentence tension ("one draft, three copies"), lifecycle marker, size. No tool lists.
2. **World** — people (who stays personal / who shares), rhythm, recurring artefacts mapped personal → shared → institutional, collaboration map.
3. **Scenario** — trigger → current state (friction, where artefacts actually live) → decision points → recommended state → boundary / anti-pattern → consulting questions.
4. **Module lens** — switch Teams · Communication · Documents · Loop · Planner & To Do · Digital Balance; highlights the relevant decision points and the training hook. Lenses reference decisions, so content is written once.
5. **Trainer mode** — one decision at a time, recommendation hidden until revealed ("ask the room first"); print/copy as a one-pager.

Mobile: single column, tension and decision first, maps secondary.

## Tasks

- [ ] 1. [tier:standard] Restructure content into a world → people → artefacts → scenarios → decision_points schema with evidence tags and lens references; keep every v1 field's content; add the missing Communication hook. Single editable source file that works offline (see open decision A). (parallel)
- [ ] 2. [tier:standard] Content gap fill per research takeaways: Nora triggers, commission turnover/secretariat, research-data boundary + lab pattern, cross-team Leadership Forum, a "what we'd not do" per decision. Mark source tags honestly. (parallel)
- [ ] 3. [tier:deep] Build the page shell + home + world view in the agreed visual direction, using `assets/tokens.css`.
- [ ] 4. [tier:standard] Scenario view, module lens switcher, before/after, reveal-recommendation trainer mode, print/copy.
- [ ] 5. [tier:light] Link the new surface from `index.html` and the higher-education README; update root README tool table. Do not touch `team-personas/index.html`.
- [ ] 6. [tier:standard] Test desktop and mobile (browser pane, 375px and desktop), keyboard navigation, print; fix issues; push to the branch, leave PR draft.

## Open decisions (user)

- A. Data file: `worlds.js` (JSON-shaped, one global, works offline) replacing `personas.json`, or keep `personas.json` and embed a copy?
- B. Rename colliding surnames?
- C. Add a fifth world (teaching team) now or later?
- D. Show recommended state as "the" answer, or always with alternatives?
- E. Visual direction (pending).

## Done when

- All four (or five) worlds browsable; people, scenario, artefacts, friction and decisions clear at a glance.
- Personal vs shared visible where relevant; each world exposes consulting questions and a boundary.
- Every recommendation carries a source tag.
- Each world has a hook for all six modules.
- Works offline, desktop and mobile; content editable without touching app code.
- No real people or internal data; `team-personas/index.html` unchanged.
