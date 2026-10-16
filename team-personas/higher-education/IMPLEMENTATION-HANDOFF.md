# Implementation Handoff — Rebuild the Higher-Education Persona UI

## Read first

Repository: `blackmath88/m365-toolbox`

Work on the existing branch:

`feat/higher-education-team-personas`

Do not merge.

Read, in this order:

1. `team-personas/higher-education/UI-GUIDANCE.md`
2. `team-personas/higher-education/CONTENT-DIRECTION.md`
3. `team-personas/higher-education/BRIEF.md`
4. `team-personas/higher-education/worlds.js`
5. `docs/concept.md`
6. `assets/tokens.css`
7. `CLAUDE.md`

## Correction to the previous interpretation

The richer content model in `worlds.js` is useful.

But the main product is **not** a trainer decision engine.

It is a visually polished, accessible showcase / atlas of fictional higher-education working worlds.

The primary user experience is:

```
MEET THE TEAM
→ understand how they work today
→ understand what technologies and artefacts they use
→ see their characteristic challenges
→ switch to a contextual M365 working model
→ understand what changes, what stays, and what remains outside M365
```

## Two-sided model

Every world must expose two clearly related views:

### THEIR WORKING WORLD

Show:
- people;
- roles;
- relationships;
- work rhythm;
- current technologies;
- artefacts;
- personal vs shared;
- characteristic challenges.

### M365 WORKING MODEL

Translate the same working world into:
- communication model;
- document model;
- task model;
- knowledge model;
- meeting / attention model;
- personal vs shared;
- what stays outside M365;
- recommendations;
- boundaries / anti-patterns.

The second side is not "replace all tools with Teams".

## UI direction

The current visual output is not good enough.

Rebuild the presentation hierarchy and styling rather than polishing the existing layout.

Use Fluent 2 / Teams as a visual reference, not as a component dump.

Aim for:
- calm neutral surfaces;
- excellent typography;
- restrained Teams-like indigo accent;
- University of Basel red / mint as secondary identity;
- avatars and small people diagrams;
- editorial profiles rather than dashboards;
- deliberate whitespace;
- clear current-vs-M365 comparison;
- very good responsive behaviour.

Do not create:
- generic shadcn / SaaS cards;
- glassmorphism;
- giant gradients;
- fake analytics;
- dense decision dashboards.

## Libraries / implementation

Do not add a framework just to make the page look modern.

Preferred:
- semantic HTML;
- vanilla JS;
- local CSS;
- CSS custom properties;
- small local Fluent System Icon subset if useful.

Tailwind is allowed only if it materially improves implementation quality and compiles to committed static CSS. No runtime CDN.

React / Fluent React v9 is allowed only if there is a real interaction need worth changing the repository architecture for. It is not required.

The page must remain easy to open and review locally.

## Build target

Create a real UI under:

`team-personas/higher-education/`

At minimum:

- `index.html`
- local styles
- local JS if needed
- existing `worlds.js` as the editable content source

Do not overwrite `team-personas/index.html`.

## Home / atlas

Build a strong overview of all worlds.

The worlds must feel meaningfully different.

The user should be able to compare:
- team type;
- size;
- rhythm / lifecycle;
- collaboration intensity;
- primary tension;
- visible members;
- current scenario.

## World detail

Recommended order:

1. identity / hero;
2. people and relationships;
3. how the work actually happens;
4. technologies used today;
5. artefacts / where things live;
6. characteristic challenges;
7. switch to M365 working model;
8. translated setup by work pattern;
9. what stays outside M365;
10. recommendations / anti-patterns;
11. optional training-module relevance.

## Strong interaction

Make this a primary control:

```
[ THEIR WORKING WORLD ] [ M365 WORKING MODEL ]
```

Optionally add `COMPARE` on desktop if it genuinely helps.

## Accessibility

Keyboard and screen-reader semantics matter.

Test:
- keyboard navigation;
- visible focus;
- 375px mobile;
- desktop;
- reduced motion;
- print;
- 200% zoom;
- contrast.

## Before coding

First respond with:

1. your revised information architecture in 8–12 bullets;
2. your proposed visual system;
3. whether you will use plain CSS, Tailwind, or another approach, and why;
4. which existing files you will keep / replace.

Then implement.

## Acceptance

The result is good if, within 30 seconds, a viewer can understand:

> "This admin team, this research group, Nora, the commission, and the teaching team work differently."

and after switching views:

> "Their M365 setups should therefore also be different."

The contrast between working worlds is the product.
