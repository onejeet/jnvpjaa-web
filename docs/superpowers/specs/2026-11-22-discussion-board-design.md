# Discussion Board — Design

Date: 2026-11-22 · Status: draft for approval

## Intent

Approved members need one place to talk about anything: open discussions, asking for help, saying what they need,
long suggestions. Today that has no home on the portal (the existing `/discussions` code is a localStorage mock that
nobody else can see). It should feel like Twitter/X: a fast, lively feed, not an old-style forum.

## Goals

- A single members-only feed of posts, newest first, that scrolls without page loads.
- Posts carry text (short or long), up to 4 images, one poll, or one social video/post embed.
- Replies are posts too, with the same powers, shown as a conversation under the original.
- Reactions, reply counts and a "new posts" nudge make it feel alive.
- Works one-handed on a 375px phone (PRODUCT.md).

## Non-goals (v1)

Separate boards/categories, @mentions and notifications, full-text search, private/committee-only posts,
reporting/moderation queues, bookmarks, reposts/quotes, real-time sockets, link-preview cards for arbitrary URLs.

## Anti-goals

- Anything visible to logged-out visitors, search engines or AI crawlers, including image URLs.
- An old-forum look: category tables, BBCode, nested indents 6 levels deep.
- Member-facing copy with technical words (PRODUCT.md voice rules).

## Who can see and post

Only signed-in users. Unapproved users cannot sign in at all, so `requireUser(ctx)` on every resolver and the
web route marked protected in `routeAccess` is the whole access rule. Every member can read everything and post.
Authors edit/delete their own posts; admins (`requireOwnerOrAdmin`) can delete any post and pin one to the top.
The module stays behind the existing `discussions` tenant feature flag.

## Approaches

1. **Post model, replies are posts (chosen).** One `Post` table; a reply has `parentId` + `rootId`. One card
   component renders feed items, the thread root and replies. Replies get images, polls and embeds for free.
2. **Reuse `Comment` for replies.** Least new backend, but replies become text-only blog comments, which breaks
   the Twitter feel and couples discussions to blog comment rules (`assertCommentableTarget`).
3. **Hosted forum (Discourse/Circle) via SSO.** Data leaves the portal, costs money, never matches the site look.

Chosen: 1, because the Twitter feel depends on replies being first-class posts.

## Data (Prisma, backend)

- `Post`: id, authorId, body (plain text, 1–5000 chars, required unless images/poll/embed present), tag
  (`DISCUSSION | HELP | NEED | IDEA`, default DISCUSSION; replies have none), images (Json: `[{key,width,height}]`,
  max 4), embedUrl?, parentId?, rootId?, replyCount (int, cached), pinnedAt?, createdAt, editedAt?, deletedAt?.
  Indexes: (rootId, createdAt), (parentId), (createdAt) for the feed.
- `PostReaction`: postId, userId, emoji; unique (postId, userId, emoji). Same emoji set as comments.
- `Poll`: postId (unique), options (Json string[] 2–4, each ≤ 80 chars), closesAt. One choice per member.
- `PollVote`: pollId, userId, optionIndex; unique (pollId, userId). Votes can't be changed (keeps it simple, honest).
  Results are visible after you vote or after the poll closes. Voters are never listed.
- Deleting a post with replies soft-deletes it ("This post was deleted") so the conversation stays readable.

## API (GraphQL, Nexus — same layout as `comment.ts`/`jobs.ts`)

- `discussionFeed(cursor, tag)` → 20 root posts, pinned first on the first page; cursor = createdAt+id.
- `discussionPost(id)` → root post + its replies (flat, oldest first, paginated after 50).
- `createDiscussionPost(input)`, `editDiscussionPost(id, body)`, `deleteDiscussionPost(id)`,
  `toggleDiscussionReaction(postId, emoji)`, `voteDiscussionPoll(postId, optionIndex)`, `pinDiscussionPost(id, pinned)`.
- `createDiscussionImageUpload(mimeType, sizeBytes)` → presigned PUT to the **private** bucket under
  `discussions/`, then the server reads it back, runs `imagePipeline` with a new `post` preset (1600px, q80),
  stores the WebP and returns the key. Images are served as short-lived signed read URLs (pattern of
  `generatePrivateScholarshipReadUrl`), so a copied link stops working.
- Every post field the client sees includes `viewerReactions`, `viewerVote` and the author's name/avatar/batch.
- Server validation: body length, image count/type/size (15 MB in, `MAX_INPUT_BYTES`), poll option rules,
  embed URL must parse against the allowlist below, light rate limit (e.g. 10 posts per 10 min per member).

## Social embeds

Paste a link from YouTube, Vimeo, Instagram, Facebook, X/Twitter, TikTok or LinkedIn. A small pure function turns
the URL into that platform's official iframe embed URL; anything not on the list stays a normal clickable link.
No third-party embed scripts and no new dependency. The first allowlisted link in the body becomes the embed if
the author didn't attach one; the author can remove it. The function gets a unit test with one URL per platform.

## Screens (web, Next.js app router)

Replaces `utils/discussions.ts`, `containers/Discussions`, `containers/SingleDiscussion`, `modules/NewDiscussion`,
`modules/DiscussionListModule`, `components/common/DiscussionCard` (all localStorage-based, removed).

```
/discussions                               /discussions/[id]
┌──────────────────────────────┐           ┌──────────────────────────────┐
│ Discussions   [All Help Need Idea]       │ ← Conversation               │
│ ┌──────────────────────────┐ │           │ (big root post card)         │
│ │ (avatar) What's on your  │ │           │ ──────────────────────────── │
│ │ mind?   [img][poll][link]│ │           │ (reply composer)             │
│ └──────────────────────────┘ │           │ reply card                   │
│   ↑ 3 new posts (pill)        │           │  ↳ replying to @Priya        │
│ ┌ card ────────────────────┐ │           │ reply card                   │
│ │ Name · 2011 batch · 3h  ⋯│ │           └──────────────────────────────┘
│ │ HELP  body text…  more   │ │
│ │ [image grid / poll / video]│
│ │ ♡ 12  💬 4  😂 2          │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

- Feed: infinite scroll, tag filter chips, sticky composer at top (bottom sheet on phones). Long posts clamp to
  ~6 lines with "Show more". Whole card opens the conversation.
- Conversation: replies flat in time order; a reply to a reply shows "replying to @name" (2 levels, like comments).
- Composer: plain textarea with auto-linking, image picker (client-compressed, up to 4, reorder/remove), poll
  builder (2–4 options, 1/3/7 days), live embed preview from pasted link, tag chips. Draft kept in localStorage.
- Liveness: reactions and votes are optimistic; the feed checks for newer posts every 60 s and shows a
  "N new posts" pill rather than jumping the list.
- Visual direction is set with the impeccable design skill during implementation, inside the existing MUI theme
  and tenant brand; it must hold in light and dark and at 375px.

## Tests

Backend tests in `tests/discussions.test.ts` (same runner as `test:comments`): auth required, owner/admin rules,
validation, poll one-vote rule, reply counts, soft delete. Unit test for the embed URL parser. One Playwright e2e:
sign in, post with a poll, vote, reply.

## Left to the builder

Exact rate-limit numbers, card spacing/typography details, empty and loading states, the emoji set reuse path,
and whether pinned posts get a badge or a separate strip.
