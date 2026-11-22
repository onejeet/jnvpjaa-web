---
version: 1
slug: "src-app-discussions"
primary_target: "src/app/discussions"
related_targets: ["src/containers/Discussions","src/modules/Discussions"]
---

# Discussions (members-only feed)

Scope: `/discussions` feed and `/discussions/[id]` conversation. Mode: Operate (a social feed members scroll, post into and reply on, mostly on phones).
Audience/job: approved alumni asking for help, saying what they need, sharing ideas, running polls. Success: posting feels as easy as a chat app and the feed feels alive.
Constraints: inherits the portal world (DM Sans body, Playfair display, brand crimson primary, deep green-black ink, MUI 6 theme, light + dark). 375px one-handed. Plain Indian English copy.

## Direction contract

THESIS: A town square for one school's alumni, shaped like Twitter's middle column: one stream of full-width posts separated by hairlines, not floating cards in a forum table. Refuses the category-table forum and the card-grid "community" template.
OWN-WORLD: Paper surface with hairline dividers; crimson used only for live things (your reaction, your vote, the new-posts pill, Post button). Tag shown as a small tinted word, not a pill zoo. Batch year is the identity marker beside every name. Polls are thick rounded bars that fill; photos sit in a 2px-gap rounded grid.
STORY: A member lands, sees what classmates are asking right now, reacts or replies in one tap, and posts their own question with a photo or poll without leaving the page.
FIRST VIEWPORT: Desktop: 600px feed column (title row "Discussions", composer, then posts) beside a 300px sticky rail (New post button, Browse tags with counts, Active this week faces). Phone: title + tag chips row, posts; floating round Post button bottom-right opens the composer sheet.
FORM: Twitter-style feed + side rail, chosen by the user; seed: none (pinned) — "make it cool like twitter", layout "Feed + side rail".
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
