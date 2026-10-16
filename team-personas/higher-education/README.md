# Higher Education Team Personas

A fictional higher-education demo universe for the University of Basel M365 Deep Dives.

This folder is intentionally separate from the existing `team-personas/` tool. The existing tool describes generic team types and standard setups; this subfolder should become a richer, scenario-based surface with named fictional people, realistic university work, recurring artefacts, friction points, and consulting questions.

## Why this exists

The Deep Dive training series should go beyond feature explanation.

The aim is to provide realistic contexts that can be reused across:

1. Teams Basics
2. Communication in Teams
3. Collaborative document work
4. Loop / shared evolving knowledge
5. Planner & To Do
6. Digital Balance

The same fictional people and working worlds should recur across modules so the training feels coherent rather than like six unrelated product demos.

## Files

- `BRIEF.md` — product / content brief for implementation
- `worlds.js` — single editable source (`window.HE_WORLDS` plus the UI layer `window.HE_ATLAS` at the bottom of the file, loaded via `<script src>`, works offline) for the fictional higher-education universe
- `index.html`, `atlas.css`, `atlas.js` — the showcase UI (open `index.html` by double-click, works offline). Atlas of five worlds; each world has `Arbeitswelt heute`, `M365-Arbeitsmodell` and (desktop) `Vergleich`. Routes: `#/`, `#/w/<world-id>[/m365|vergleich]`
- `check-worlds.mjs` — dependency-free validator; run `node check-worlds.mjs` after editing `worlds.js`

## Implementation

No UI framework is prescribed.

HTML, a small React app, or another lightweight approach are all acceptable. The implementation should make the personas easy to browse, understand, and reuse in training preparation.

The visual direction will be provided separately. Do not lock the project into a specific visual system before that input arrives.
