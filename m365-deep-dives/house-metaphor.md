# House Metaphor for the Teams Basics Session (University of Basel)

Status: design notes. The metaphor comes from the University of Basel M365 Trainingsportal ("Umzug ins digitale Dorf"). The mapping, the chat refinement, and the session structure are design proposals, not tested or externally validated. See `report.md` for what has and has not been verified.

## 1. Core mapping

| Teams concept | Metaphor | What it teaches |
|---|---|---|
| Tenant | Village (Dorf) | Many houses exist, and you can live in several |
| Team / M365 group | House (Haus) | One shared context for one group of people |
| Membership | Key (Schlüssel) | Access is granted at the door, not per document |
| Channel | Room (Zimmer) | Each topic or task has its own place |
| Private channel | Room with its own key | An exception, not the default |
| File | Object in a room | People go to the object; the object does not travel |
| Email attachment | Photocopy handed to each housemate | Copies diverge and the original stays behind |
| Post in a channel | Conversation in the room | Everyone in the house can see it and join in |
| **Chat** | **Outside the house** | Talking to a neighbour or going out with friends; personal, quick, not stored in the house |
| Activity | Doorbell / mailbox | What happened that concerns me |
| Notifications | Doorbell settings | How loudly I want to be told |
| Search | Looking through the house or asking the village directory | Find what I remember without knowing the room |
| OneDrive | My own flat | Personal files live in my flat; shared files live in the house |

## 2. Chat is outside the house

- Chat is what you do outside: ask a neighbour how they are doing, or meet friends. It is useful and human, but it is not where the household's work lives.
- Anyone who later moves into the house cannot read what was said outside. Verified source detail: in a channel all new team members share the history; in a chat you choose whether to share history with new participants (Microsoft Learn, "Navigate Microsoft Teams", a 2023 Kaizala-migration page; re-check against current docs).
- Rule of thumb for learners: **If the house will need it later, say it in the room. If it is just between people, go outside.**
- Chat can include people from different houses, which fits the picture: neighbours and friends do not belong to one house.
- Limits of the metaphor to test with colleagues: a chat is not really "not Teams", and people may conclude chats are unimportant. Make clear that outside conversations are fine for quick coordination and wrong for decisions, files, and anything others must find.

## 3. Rooms and objects

- A document lives in a room. Housemates walk in and work on it together, so nobody mails copies.
- Sharing a file with one individual is like handing out a key to one room. The portal advises managing access at group level and avoiding individual sharing, because it makes permissions harder to follow.
- Anyone with access to the house has access by default to its content, with private channels as the exception (portal text).

## 4. Moving in, not building

The portal's first station is "Häuser bauen" (owners, group types, ordering a team). For a beginner session, the audience is mostly members of existing houses, so teach **Einzug** (moving in):

1. How to find your house.
2. How the rooms are laid out.
3. How to open a room and an object in it.
4. How to be notified and how to find things again.

Leave to a separate owner session:

- Group types ORG / ARG / PRJ and the ordering request (RO-087)
- Owner duties, on/offboarding
- Private and shared channel mechanics, guests

For members, keep one line: "If your house is missing or the keys are wrong, ask your owner or support."

## 5. Proposed 45-minute structure

| Min | Segment | Metaphor use |
|---|---|---|
| 0–5 | Why Teams feels different | Old way: photocopies sent around. New way: people go to the original |
| 5–10 | Map of the village and house | Village, house, rooms, objects, keys |
| 10–20 | University scenario | Moving into an existing research or admin house and finding your way |
| 20–28 | Room conversation plus shared file | Post and file in the same room; chat is the conversation outside |
| 28–34 | Personal orientation | Doorbell (Activity), directory (Search), doorbell settings (Notifications), my flat (OneDrive) |
| 34–39 | Variants | Different houses: administration, research, project, committee |
| 39–43 | Four recommendations | e.g. work in the room, do not mail copies, search before asking, set your doorbell |
| 43–45 | Transfer action | "Find your house today and open one room" |
| +15 | Q&A | |

## 6. Before/after demo ideas

- **Photocopy vs. object:** send a document as an attachment to two colleagues, show three diverging versions, then open one file in a room and edit it together.
- **Outside vs. inside:** ask a question in a chat, then ask a new "housemate" to find the answer. Repeat in a channel post and show that the new member sees the history.
- **Finding things:** search for a phrase that appears in both a post and a file.

## 7. Things to validate

- Exact guest and shared-channel rules in the tenant. The portal says guests in ARG/PRJ houses can use standard and private channels but not shared channels, and also describes shared channels as letting people outside the team take part. The wording needs confirming with admins.
- That the portal's screenshots and names match the current Teams client; the pasted pages show publication dates between April and July 2026.
- Whether "key", "photocopy", and "outside" land with a pilot group, or cause confusion (for example, people thinking chat is unimportant).
- Current chat and channel behaviour in your tenant: history sharing, retention, and notification defaults.
