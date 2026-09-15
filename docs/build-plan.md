# m365-toolbox — build plan

## Goal

Develop the current toolbox into a coherent set of **small interventions that reduce friction in everyday Microsoft 365 work**.

The implementation should preserve the strengths of the current repository:

- static HTML,
- no build step unless there is a compelling reason,
- no login for the core experience,
- minimal dependencies,
- offline-friendly where possible,
- one intervention per route,
- content and logic easy to adapt for another institution.

Do not redesign the repository into a generic app before the interventions themselves are proven.

---

# Phase 0 — repo foundation

## 0.1 Add shared intervention metadata

Introduce a lightweight shared structure for the homepage and future routing.

Each intervention should have:

```text
id
mode: us | me | reset
status: live | prototype | planned
time
who
friction
question
outcome
path
```

This can initially be a small JavaScript object or JSON file. Do not over-engineer it.

## 0.2 Update homepage information architecture

Replace the simple numbered tool list with three sections:

- **US — Make working together easier**
- **ME — Make M365 work like I work**
- **RESET — Things accumulate. Clean them.**

Keep existing tools available during the transition.

Add a small concept teaser for **One Friction Less**, but do not build the router yet.

## 0.3 Keep common visual tokens

Extend `assets/tokens.css` only when a repeated need appears.

Useful shared primitives likely include:

- intervention kicker / mode,
- duration,
- prompt card,
- choice row,
- rule card,
- output sheet,
- action checklist,
- copy/export action,
- review-date field.

Avoid creating a full design system prematurely.

---

# Phase 1 — first real team workshop

## Build 1: Where are my files? Where are our files?

**Priority: highest**

Why first:

- directly connected to existing `sharepoint-onedrive/` knowledge,
- moves from quiz/training to team agreement,
- technically simple,
- demonstrates the new product philosophy clearly,
- immediately reusable in M365 training and team sessions.

### Route

`files-conventions/`

Working title on page:

> **Where are my files? Where are our files?**

### UX

Four stages with visible 15-minute pacing:

1. **Show your mess**
2. **Mine → ours**
3. **Make the rules**
4. **Take it with you**

### Stage 1 — Show your mess

Prompt people to use one real file from the last working week.

Questions:

- Where is it now?
- Who owns it?
- Who needs it?
- Should it survive the person who created it?

No data needs to be stored.

### Stage 2 — Mine → ours

Provide draggable or clickable examples around a simple axis:

```text
MY WORK  ------------------------------  OUR WORK
```

Examples:

- rough personal draft,
- working document shared with colleagues,
- team template,
- meeting minutes,
- temporary screenshot,
- project spreadsheet,
- file uploaded in Teams chat,
- file uploaded in a channel.

The facilitator should be able to reveal the product truth when useful:

- Teams chat file → sender's OneDrive;
- Teams channel file → Team/SharePoint storage.

### Stage 3 — Make the rules

Offer editable sentence starters.

Minimum set:

- Personal drafts live in ______.
- Shared working documents live in ______.
- Final templates/material live in ______.
- Chat attachments are for ______.
- We share links instead of copies when ______.

The tool should provide sensible defaults that can be accepted, edited or deleted.

### Stage 4 — Take it with you

Generate a clean output card:

```text
OUR FILE RULES
...
Agreed: [date]
Review: [date]
```

Actions:

- Copy as text
- Print
- optional save-as-image later

### Definition of done

- Works completely without authentication.
- Can be completed by a team in 15 minutes.
- Produces a copyable convention card.
- Does not require prior SharePoint knowledge.
- Mobile works, but workshop screen/laptop is primary.

---

# Phase 2 — communication conventions

## Build 2: How do we communicate here?

### Route

`communication-conventions/`

### Core model

Do not ask “Teams or Outlook?” first.

Use three dimensions:

- audience,
- urgency,
- lifespan.

### UX idea

Give the team 6–8 realistic situations one by one.

Examples:

- I need an answer from one colleague today.
- This update is useful for everybody but not urgent.
- We need a documented team decision.
- I need somebody immediately.
- I am sending something formal to an external partner.
- Three people are coordinating something temporary.

For each situation the team chooses the preferred medium.

Then show where answers conflict.

That conflict is the conversation.

### Output

Generate a compact communication contract containing:

- Chat is for...
- Channel is for...
- Email is for...
- Meetings are for...
- Urgent means...
- @mentions mean...
- Expected response behaviour...

### Include strong default prompts

Candidate defaults:

> A message is not urgent because you sent it in chat.

> @mention means “I need your attention”.

> If the whole team may need it later, do not hide it in a small chat.

### Definition of done

The tool should expose disagreement and convert it into explicit conventions; it should not simply score the team against a universal answer key.

---

# Phase 3 — Digital Hygiene Day

## Build 3: Digital Hygiene Day

### Route

`digital-hygiene/`

### Core experience

A guided cleanup session with four rounds:

1. PEOPLE
2. ROOMS
3. STUFF
4. NEXT CLEAN

### PEOPLE

Checklist prompts:

- at least two owners,
- members still belong,
- guests are known,
- former colleagues removed/reviewed.

### ROOMS

For each real or imagined channel:

- KEEP
- CLEAN
- ARCHIVE
- WHY DOES THIS EXIST?

Allow manual channel names to be entered so the workshop can operate without tenant access.

### STUFF

Prompt the team to inspect:

- unused tabs,
- dead links,
- abandoned Planner boards,
- duplicate folders,
- old project files,
- bad generic channel/folder names,
- material living in the wrong place.

### NEXT CLEAN

Set a review date.

Output should be an action list with owners where desired:

```text
DIGITAL HYGIENE — ACTIONS

[ ] Archive Project-X channel — Alex
[ ] Remove old guest accounts — Sam
[ ] Delete dead Wiki tab — Jo
[ ] Review again — 15 March 2027
```

### Later enhancement

If authentication / Graph is ever added, inspection of real Teams could become a second mode. Do not make that dependency part of V1.

---

# Phase 4 — personal quick wins

Build these only after at least two team workshops feel good. They should be noticeably shorter and sharper.

## Build 4A: Notification Personality

### Route

`notification-personality/`

### Personalities

Start with four:

- **24-hour full power, no shower**
- **Office Hours**
- **Deep Worker**
- **FOMO With Boundaries**

Each personality gets:

- one-sentence description,
- 3–6 recommended Teams notification settings,
- a short explanation of what the trade-off is.

Do not create separate Sound or Phone tools.

### Maintenance note

Current Teams settings change over time. Keep product-setting mappings in one data block that can be updated independently from the personality language.

## Build 4B: Family First

### Route

`family-first/`

Flow:

1. actual work days/hours,
2. when notifications should stop,
3. work location / work plan if relevant,
4. respectful scheduled sending.

Output:

- settings checklist,
- personal boundary statement if useful.

Tone:

> Work whenever suits you. Don't export your schedule to everybody else.

## Build 4C: Make Teams look sane

### Route

`teams-layout/`

Start from annoyance:

- I cannot find anything.
- Chat and channels are one giant mess.
- I hate switching between them.
- I see too much irrelevant stuff.
- I only use a handful of places.

Map each problem to a small set of current settings/actions:

- combined/separate view,
- Favorites,
- custom sections,
- hiding inactive/noisy items.

## Build 4D: Five defaults worth changing

### Route

`five-defaults/`

This should remain intentionally small and curated.

Potential themes:

1. view/layout,
2. Favorites,
3. notifications,
4. work hours,
5. quiet/focus behaviour.

The list may change as Teams changes.

---

# Phase 5 — Paula Planner

## Build 5: Paula Planner

### Route

`paula-planner/`

### V1

Paula is a deterministic guided interview, not an LLM dependency.

Questions should cover:

- work type,
- current failure mode,
- buckets as stages vs workstreams,
- ownership,
- due-date meaning,
- recurring review rhythm.

### Output

Generate:

- recommended bucket structure,
- label use if needed,
- task-title convention,
- ownership convention,
- due-date convention,
- review rhythm.

Example:

```text
YOUR PLANNER

BUCKETS
Inbox
Ready
Doing
Waiting
Done

RULES
Every committed task has one accountable owner.
Task titles start with a verb.
Due dates are commitments.
Review the board Monday morning.
```

### V2

Add optional AI-assisted free-text interpretation.

Paula can accept a description of the team's work and suggest a setup, while preserving the same deterministic output structure.

### V3

Potential authenticated/provisioning mode if technically and institutionally appropriate:

- create plan,
- create buckets,
- optionally create example tasks / labels.

Do not block V1 on Graph/API access.

---

# Phase 6 — Our Digital House

## Build 6: Our Digital House

### Route

`digital-house/`

This can reuse and replace some existing `team-personas/` and `team-channel-chat/` knowledge without deleting those tools until the new pattern proves better.

Flow:

1. define the house purpose in one sentence,
2. identify actual rooms,
3. decide who has keys,
4. define what belongs in each room,
5. delete one unnecessary room if possible,
6. set review date.

Output:

- Team purpose,
- minimal channel map,
- purpose/access per channel,
- review date.

Visual opportunity:

Use a simple architectural/floor-plan metaphor rather than generic cards.

---

# Phase 7 — composite workshop

## Build 7: How do we work here?

Only build after the smaller interventions have been used and refined.

Compose the proven conventions from:

- files,
- communication,
- Planner/tasks,
- boundaries,
- Team/house structure,
- hygiene/review.

Output a one-page **HOW WE WORK** card.

This should be a synthesis tool, not a duplicate implementation of all the previous workshops.

---

# Phase 8 — One Friction Less

## Build 8: One Friction Less

This becomes the front-door diagnosis only when there are enough mature interventions to route into.

Start with:

> **What annoyed your team this week?**

Then classify friction into a small set of causes:

- cannot find something,
- unclear ownership,
- too many places,
- unclear expectation,
- interruptions,
- manual repetition,
- no task visibility,
- stale structure.

Recommend the smallest relevant intervention.

Possible output:

```text
YOUR FRICTION
We keep creating several copies of the same file.

TRY THIS
Where are my files? Where are our files?
15 minutes · team

EXPERIMENT
Agree one shared home and use links for two weeks.
```

---

# Content and evidence maintenance

## Separate evergreen principle from current product detail

For example:

**Evergreen principle**

> Shared team work needs a team-owned home.

**Current product detail**

> Teams chat uploads are stored in the sender's OneDrive; channel files use SharePoint-backed team storage.

The first belongs in the core workshop logic. The second belongs in a maintainable product-facts layer.

## Suggested content structure later

Only introduce this once repetition justifies it:

```text
/content
  product-facts.js
  defaults.js
  prompts.js
```

Do not move everything into a content engine on day one.

---

# Visual direction

The new pages should not feel like a SaaS dashboard or Microsoft Learn.

Reference idea: **instruction cards / workshop recipes / field guide**.

Each page should make four things obvious immediately:

```text
WHO
TIME
FRICTION
OUTCOME
```

Use large declarative headings such as:

```text
15 MINUTES
TO STOP LOSING FILES
```

or

```text
3 MINUTES
TO MAKE TEAMS BEHAVE
```

Keep:

- thin rules,
- strong typography,
- restrained colour,
- clear prompts,
- printable outputs,
- very few decorative elements.

Avoid:

- bubble-card overload,
- generic AI gradients,
- feature icon walls,
- unnecessary dashboards,
- Fluent clone aesthetics.

---

# Recommended next coding sequence

## Slice A

**Homepage restructuring + intervention metadata**

No major redesign. Establish US / ME / RESET and planned/live states.

## Slice B

**Where are my files? Where are our files? — complete V1**

This is the flagship proof of the new concept.

## Slice C

**How do we communicate here? — complete V1**

Reuse output-card mechanics from Slice B.

## Slice D

**Digital Hygiene Day — complete V1**

Reuse checklist/action-output mechanics.

## Slice E

**Notification Personality + Family First**

Introduce the ME format and shared settings-result component.

## Slice F

**Paula Planner V1**

Introduce guided conversational structure without adding an LLM dependency.

Only after these slices should we decide whether the repository still benefits from pure standalone HTML files or whether shared code has become valuable enough to justify a small framework/refactor.

---

# Decision gates

## Do not move to React yet unless

At least three new interventions need the same state, component and export logic badly enough that copy/paste is becoming a maintenance problem.

## Do not add authentication yet unless

A mature intervention genuinely becomes much better by seeing or changing tenant data.

## Do not add AI just because it is available

Use it where free-text interpretation materially reduces friction. Paula is the obvious first candidate.

## Do not build a documentation portal

The repository succeeds when a person or team can make one thing work better immediately.

---

# Success criteria

A good toolbox intervention should be testable with questions like:

- Did people finish it?
- Did they make a decision?
- Did anything actually change?
- Could they explain the resulting convention in one sentence?
- Did it remove recurring friction?
- Would they use it again with another team?

The strongest metric is not page views or training completion.

It is:

> **Did work become a little easier afterwards?**
