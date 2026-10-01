# Teams Onboarding for Ordinary Employees: Research Report

Status: **partially verified**. Date: 2026-10-01. Context: 45-minute Teams Basics / Deep Dive plus 15 minutes Q&A, University of Basel.

This report separates what was read at source from what is still a hypothesis. An earlier draft in chat cited sources that had not been retrieved. That draft is not reproduced here. Anything under "Unverified" must be checked before it goes into a deck or is attributed to Microsoft.

## 1. Verified findings

### 1.1 Microsoft's user-training principles

Source: [Streamline user training, Microsoft Adoption](https://adoption.microsoft.com/en-us/streamline-user-training/) (read in full).

Microsoft's stated best practices for user training:

- Put training in the context of day-to-day tasks.
- Let people opt in to longer-form training.
- Everyone learns differently, so plan for different styles.
- Provide digital leave-behinds, such as "Day in the Life" handouts, so people remember what is available.

Related resources named on that page:

- Microsoft 365 learning pathways (community-curated training)
- Microsoft Support product training
- Customer Hub (instructor-led webinars)
- Microsoft 365 Champion Program
- Productivity Library (scenarios with assets and help articles)
- Productivity Training (scenario-based)

The page calls champions "critical to the success of adoption" and describes them as power users close to business outcomes.

**Implication for the session:** build it around everyday tasks, give attendees a one-page leave-behind, and offer deeper material as opt-in rather than cramming it in.

### 1.2 Chat vs. channel

Source: [Navigate Microsoft Teams, Microsoft Learn](https://learn.microsoft.com/en-us/microsoftteams/navigate-teams) (read in full).

**Caveat:** this page is dated 2023-08-31 and is a Kaizala-to-Teams migration guide, not a general beginner guide. Use it only for the comparison table below. Do not cite it as Microsoft's "first-time learning sequence".

| Aspect | Chat | Channel |
|---|---|---|
| Purpose | Lightweight conversations, direct messaging | Interactions where multiple topics are discussed in an open space |
| Visibility | Only those in the chat | Everyone in the team |
| Structure | One continuous, unthreaded conversation | Structured, multiple threaded conversations |
| Size limit (as documented) | Up to 250 people | Up to 25,000 people |
| History for newcomers | Choose whether to share history with new participants | All new team members share the history |
| Extensibility | Some | Full |

The page also says:

- A team is "a collection of people, content, and tools surrounding different projects and outcomes."
- Channels are "topic-specific conversations", each dedicated to a topic, department, or project.
- Teams search returns people, files, messages, and posts.

**Implication for the session:** this table supports the rule "temporary coordination goes in chat, ongoing work goes in a channel". It also supports the point that new members inherit channel history. Re-check the numeric limits against current documentation before quoting them.

## 2. Unverified (from the earlier chat draft, not checked at source)

Treat each item as a hypothesis until a primary source is read.

| Claim | What to check |
|---|---|
| Microsoft recommends a Start / Experiment / Scale adoption sequence | [Get started driving adoption of Teams](https://learn.microsoft.com/en-us/microsoftteams/teams-adoption-get-started) |
| Education guidance: prioritize scenarios, pilot with champions, measure adoption | [Teams for Education quick start](https://learn.microsoft.com/en-us/microsoftteams/teams-quick-start-guide-edu) |
| Customer Success Kit, sample adoption plan, scenario workbook, enablement templates | [Microsoft Teams adoption hub](https://adoption.microsoft.com/en-us/microsoft-teams/) |
| Teams-connected files are stored in SharePoint/OneDrive and support in-place coauthoring | [SharePoint and OneDrive introduction](https://learn.microsoft.com/en-us/sharepoint/introduction) and the Teams file-storage docs |
| Day in the Life guides and playbooks for Teams | [Adoption guides](https://adoption.microsoft.com/en-us/guides/) |
| Higher-ed examples and community patterns | [Microsoft Education article](https://pulse.microsoft.com/en/work-productivity-en/education-en/fa3-3-key-ways-microsoft-teams-enriches-higher-education-teaching-and-learning/) and Tech Community threads |
| Common mistakes (overusing chat, too many teams/channels, unclear file location) | Plausible and common in practice, but no source was read. Seek MVP/partner posts. |
| MVP and partner decks, facilitator guides, scenario libraries | Not researched. Search for them directly. |

## 3. Working hypotheses (design opinions, not findings)

These are drawn from the brief, not from evidence.

- **Mental-model shift.** Move from "the file travels between people" to "people gather around one shared object". This is consistent with the verified definition of a team as people, content, and tools, but it is a framing choice.
- **Possible restructure.** Teach orientation (where am I: team, channel, chat) before the full scenario demo. It is untested and rests on the intuition that people need a map first.
- **Proposed 45-minute flow (draft):**
  1. 0–7 Why Teams feels different (email + attachments vs. shared context)
  2. 7–14 Map: Team, Channel, Chat, Posts, Files
  3. 14–24 One realistic university scenario
  4. 24–31 Before/after demos: attachment vs. shared file; email chain vs. channel thread; search
  5. 31–37 Personal orientation: Activity, Search, Notifications
  6. 37–41 Role variants: administration, research, project, committee
  7. 41–45 Four recommendations plus one transfer action
  8. +15 Q&A
- **Leave out of a beginner session:** team creation, governance, guests/external access, shared-channel nuances, apps and automation, advanced meeting controls, sensitivity labels. This is a judgment call, and it fits the "opt-in longer form" principle in 1.1.
- **Candidate "four recommendations":** use channels for durable work; edit shared files in place; search before asking; tune notifications early.

## 4. Gaps still to research

1. Microsoft's actual recommended first-time learning sequence (current Teams client, not Kaizala-era pages).
2. Concrete higher-ed case studies, with named institutions, not generic statements.
3. MVP and partner training decks, facilitator guides, and scenario libraries, with licences.
4. Current terminology and UI. Check the "new Teams" client, the Activity feed, and the current Chat/Teams/Files layout. Older material is likely outdated, and this has not been confirmed.
5. Before/after demo scripts from published sources.

## 5. Tenant checks (University of Basel)

- Who may create teams and channels, and what the naming/governance rules are.
- Default file-open behaviour (desktop vs. web) and notification defaults.
- Whether external or guest collaboration is enabled.
- Whether current UI matches any slides or videos being reused.
- Retention and compliance rules that change what staff should post in chat vs. channels.

## 6. Sources actually read

- [Streamline user training, Microsoft Adoption](https://adoption.microsoft.com/en-us/streamline-user-training/)
- [Navigate Microsoft Teams, Microsoft Learn](https://learn.microsoft.com/en-us/microsoftteams/navigate-teams) (2023, Kaizala migration context)
