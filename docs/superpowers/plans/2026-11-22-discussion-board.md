# Discussion Board Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A members-only, Twitter-style discussion feed with replies-as-posts, images, polls, social embeds and reactions, replacing the localStorage mock.

**Architecture:** One Prisma `Post` table (a reply is a Post with `rootId`/`parentId`) plus `PostReaction`, `Poll`, `PollVote`. Business rules live in `jnvpjaa-backend/src/services/discussions.ts` as `(ctx, …, db = prisma)` functions tested with a fake prisma (the `services/jobs.ts` pattern); pure helpers in `src/utils/discussions.ts`. Nexus GraphQL exposes them behind `guardModule('discussions')`. The web adds `/discussions` and `/discussions/[id]` as client-rendered, protected routes built from one `PostCard`.

**Tech Stack:** Prisma, Nexus, apollo-server, sharp (`imagePipeline`), Cloudflare R2 (S3 SDK); Next.js app router, MUI 6, Apollo Client 3, `@tabler/icons-react`, `emoji-picker-react` (already used by comments).

**Spec:** `jnvpjaa-web/docs/superpowers/specs/2026-11-22-discussion-board-design.md`

## Global Constraints

- **Never `git commit`** in these repos (user rule). Every "commit" step is replaced by leaving changes in the working tree.
- Every resolver calls `requireUser(ctx)` first; nothing is readable signed out.
- Post body: plain text, 1–5000 chars after normalising; may be empty only when the post has images, a poll or an embed.
- Tags: `DISCUSSION | HELP | NEED | IDEA`, default `DISCUSSION`; replies have no tag (null).
- Images: max 4 per post; input max `MAX_INPUT_BYTES` (15 MB); JPEG/PNG/WebP/HEIC accepted as upload mime; stored as `post` preset 1600×1600, quality 80; private bucket, signed read URLs.
- Polls: 2–4 options, each 1–80 chars, unique (case-insensitive); duration 1, 3 or 7 days; one vote per member, not changeable; results visible after voting or after close; voters never listed.
- Rate limit: max 10 posts (roots + replies) per member per rolling 10 minutes.
- Feed page size 20; replies page size 50.
- Member-facing copy is plain Indian English, no "quota", "rate limit", "token" or error codes.
- Pages work at 375px wide, one-handed, in light and dark mode.
- No new npm dependencies.

## Review Focus

1. A member submits an image key that isn't theirs (another member's temp key, or an existing stored key) → rejected; only `discussions/tmp/<viewerId>/…` keys are accepted. (Task 3)
2. Lookalike or hostile embed URLs (`youtube.com.evil.example`, `javascript:`, `http://evil/youtube.com/watch?v=x`) → no embed, stays a plain link. (Task 2)
3. Double-vote by fast double tap, or voting after `closesAt` → one vote stored; the second gets "You have already voted." / "This poll has closed." (Task 3)
4. Two posts with the same `createdAt` across a page boundary → neither duplicated nor skipped (id tiebreak in the cursor). (Task 3)
5. Deleting a post that has replies → placeholder stays, its images are removed from storage, editing it or replying to it is refused. (Task 3)

---

### Task 1: Database models

**Files:**
- Modify: `jnvpjaa-backend/prisma/schema.prisma` (add models + relations on `User`)
- Create: `jnvpjaa-backend/prisma/migrations/20261126000000_discussions/migration.sql`

**Interfaces:**
- Produces: Prisma models `Post`, `PostReaction`, `Poll`, `PollVote`, enum `PostTag`.

- [ ] **Step 1: Add to `schema.prisma`**

```prisma
enum PostTag {
  DISCUSSION
  HELP
  NEED
  IDEA
}

model Post {
  id         String    @id @default(uuid())
  authorId   String    @map("author_id")
  body       String    @default("")
  tag        PostTag?
  images     Json      @default("[]") // [{ key, width, height }]
  embedUrl   String?   @map("embed_url")
  parentId   String?   @map("parent_id")
  rootId     String?   @map("root_id")
  replyCount Int       @default(0) @map("reply_count")
  pinnedAt   DateTime? @map("pinned_at")
  createdAt  DateTime  @default(now()) @map("created_at")
  editedAt   DateTime? @map("edited_at")
  deletedAt  DateTime? @map("deleted_at")

  author    User           @relation(fields: [authorId], references: [id], onDelete: Cascade)
  parent    Post?          @relation("PostReplies", fields: [parentId], references: [id], onDelete: Cascade)
  replies   Post[]         @relation("PostReplies")
  reactions PostReaction[]
  poll      Poll?

  @@index([rootId, createdAt])
  @@index([parentId])
  @@index([createdAt, id])
  @@index([authorId, createdAt])
  @@map("posts")
}

model PostReaction {
  id        String   @id @default(uuid())
  postId    String   @map("post_id")
  userId    String   @map("user_id")
  emoji     String
  createdAt DateTime @default(now()) @map("created_at")
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([postId, userId, emoji])
  @@map("post_reactions")
}

model Poll {
  id       String     @id @default(uuid())
  postId   String     @unique @map("post_id")
  options  Json // string[]
  closesAt DateTime   @map("closes_at")
  post     Post       @relation(fields: [postId], references: [id], onDelete: Cascade)
  votes    PollVote[]

  @@map("polls")
}

model PollVote {
  id          String   @id @default(uuid())
  pollId      String   @map("poll_id")
  userId      String   @map("user_id")
  optionIndex Int      @map("option_index")
  createdAt   DateTime @default(now()) @map("created_at")
  poll        Poll     @relation(fields: [pollId], references: [id], onDelete: Cascade)
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([pollId, userId])
  @@map("poll_votes")
}
```

Add `posts Post[]`, `postReactions PostReaction[]`, `pollVotes PollVote[]` to `model User`.

- [ ] **Step 2: Generate the migration SQL** into the folder above: `npx prisma migrate dev --create-only --name discussions` when a local DB is up (then rename the folder to `20261126000000_discussions`), otherwise `npx prisma migrate diff --from-migrations prisma/migrations --to-schema-datamodel prisma/schema.prisma --script --shadow-database-url "$SHADOW_DATABASE_URL"`.

- [ ] **Step 3: Verify** — Run: `cd jnvpjaa-backend && npx prisma validate && npx prisma generate` — Expected: "The schema … is valid" and client generated.

---

### Task 2: Pure helpers (text, embeds, polls, cursor)

**Files:**
- Modify: `jnvpjaa-backend/src/utils/comments.ts` — extract `normalizeText(content: string, max: number, label: string): string` (the existing body of `normalizeCommentContent`, but returns `''` instead of throwing when empty; `normalizeCommentContent` keeps its empty-throw and calls it with `2000, 'Comment'`).
- Create: `jnvpjaa-backend/src/utils/discussions.ts`
- Create: `jnvpjaa-backend/tests/discussions.test.ts`
- Modify: `jnvpjaa-backend/package.json` — script `"test:discussions": "TENANT=${TENANT:-jnvpjaa} ts-node -r tsconfig-paths/register tests/discussions.test.ts"`

**Interfaces:**
- Produces (all exported from `src/utils/discussions.ts`):
  - `POST_MAX_LENGTH = 5000`, `MAX_POST_IMAGES = 4`, `POLL_DAYS = [1, 3, 7]`, `FEED_PAGE = 20`, `REPLIES_PAGE = 50`, `RATE_LIMIT = { posts: 10, windowMs: 600_000 }`
  - `type Embed = { provider: 'youtube'|'vimeo'|'instagram'|'facebook'|'x'|'tiktok'|'linkedin'; src: string; url: string; aspectRatio: number }`
  - `embedFromUrl(url: string): Embed | null`
  - `firstEmbedUrl(body: string): string | null` — first `https?://…` in the body for which `embedFromUrl` is non-null
  - `normalizePollInput(input: { options: string[]; days: number }, now?: Date): { options: string[]; closesAt: Date }` — throws `ApolloError(…, ERROR_CODES.badRequst)`
  - `encodeCursor(post: { createdAt: Date; id: string }): string` / `cursorWhere(cursor?: string | null, dir: 'desc' | 'asc' = 'desc'): object` (Prisma `where` fragment, `{}` when no cursor; `lt` for desc, `gt` for asc; throws badRequst on garbage)
  - `pollResults(votes: { optionIndex: number }[], optionCount: number): number[]`

`embedFromUrl` parses with `new URL`, requires `http:`/`https:`, matches the **exact** hostname (with or without `www.`/`m.`), and builds:

| Input | `src` | aspect |
|---|---|---|
| `youtube.com/watch?v=ID`, `youtu.be/ID`, `youtube.com/live/ID` | `https://www.youtube-nocookie.com/embed/ID` | 16/9 |
| `youtube.com/shorts/ID` | same | 9/16 |
| `vimeo.com/123` | `https://player.vimeo.com/video/123` | 16/9 |
| `instagram.com/p/CODE`, `/reel/CODE` | `https://www.instagram.com/{p|reel}/CODE/embed` | 4/5 (p), 9/16 (reel) |
| `facebook.com/…/videos/…`, `facebook.com/reel/ID`, `fb.watch/…` | `https://www.facebook.com/plugins/video.php?href=<encoded url>&show_text=false` | 16/9 (reel 9/16) |
| `x.com|twitter.com/<user>/status/ID` | `https://platform.twitter.com/embed/Tweet.html?id=ID` | 1 |
| `tiktok.com/@user/video/ID` | `https://www.tiktok.com/embed/v2/ID` | 9/16 |
| `linkedin.com/posts/…-activity-ID-…`, `linkedin.com/feed/update/urn:li:activity:ID` | `https://www.linkedin.com/embed/feed/update/urn:li:activity:ID` | 4/5 |

IDs must match `/^[\w-]+$/` (Vimeo/X/TikTok/LinkedIn: digits only).

- [ ] **Step 1: Write the failing tests** in `tests/discussions.test.ts` (node:test + assert/strict, like `tests/comments.test.ts`):
  - `embed: one URL per provider maps to its official iframe src` — one assertion per table row above, e.g. `embedFromUrl('https://youtu.be/dQw4w9WgXcQ')?.src === 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'`.
  - `embed: lookalikes and non-http are rejected` — `null` for `https://youtube.com.evil.example/watch?v=x`, `javascript:alert(1)`, `https://evil.example/youtube.com/watch?v=x`, `https://www.youtube.com/watch?v=<script>`, `not a url`.
  - `firstEmbedUrl skips plain links` — `firstEmbedUrl('see https://example.com and https://vimeo.com/42 ok') === 'https://vimeo.com/42'`; `null` for `'no links'`.
  - `poll input` — trims options; throws for 1 option, 5 options, an empty option, an 81-char option, duplicates differing only in case, `days: 2`; `closesAt` equals `now + 3 days` for `days: 3`.
  - `cursor round-trips with id tiebreak` — `cursorWhere(encodeCursor({ createdAt: d, id: 'b' }))` deep-equals `{ OR: [{ createdAt: { lt: d } }, { createdAt: d, id: { lt: 'b' } }] }`; with `'asc'` both use `gt`; `cursorWhere('%%%')` throws.
  - `pollResults counts per option` — `pollResults([{optionIndex:1},{optionIndex:1},{optionIndex:0}], 3)` → `[1, 2, 0]`.
- [ ] **Step 2: Run** `cd jnvpjaa-backend && npm run test:discussions` — Expected: FAIL (module not found).
- [ ] **Step 3: Implement** `src/utils/discussions.ts` and the `normalizeText` extraction.
- [ ] **Step 4: Run** `npm run test:discussions && npm run test:comments` — Expected: all PASS (comments unchanged).
- [ ] **Step 5:** No commit (user rule).

---

### Task 3: Discussion service (rules + storage)

**Files:**
- Modify: `jnvpjaa-backend/src/utils/cloudflare.ts` — add generic private-object helpers on the existing private bucket (`R2_SCHOLARSHIP_BUCKET_NAME`): `generatePrivateUploadUrl(key, contentType, expiresIn = 900)`, `generatePrivateReadUrl(key, expiresIn = 3600)`, `readPrivateObject(key, maxBytes): Promise<Buffer>`, `writePrivateObject(key, body, contentType)`, `deletePrivateObject(key)`. Comment: `// shortcut: discussion images share the scholarship private bucket; give them their own bucket if access rules ever differ.`
- Modify: `jnvpjaa-backend/src/services/imagePipeline.ts` — add preset `post: { maxWidth: 1600, maxHeight: 1600, quality: 80 }`; make sure `bestVersion` returns `width`/`height` on both branches.
- Create: `jnvpjaa-backend/src/services/discussions.ts`
- Test: `jnvpjaa-backend/tests/discussions.test.ts` (append)

**Interfaces:**
- Consumes: Task 2 helpers; `requireUser`, `isAdminUser` (`src/utils/auth.ts`, `src/utils/roles.ts`); `assertCommentReaction` (`src/utils/comments.ts`); `bestVersion` (`imagePipeline`).
- Produces (each `(ctx, …, db: any = prisma, storage = defaultStorage)`, where `storage` is an object of the five cloudflare helpers so tests can fake it):
  - `type PostInput = { body?: string; tag?: PostTag | null; imageKeys?: string[]; embedUrl?: string | null; poll?: { options: string[]; days: number } | null; parentId?: string | null }`
  - `POST_INCLUDE` — Prisma include: `{ author: true, reactions: { select: { emoji, userId } }, poll: { include: { votes: { select: { userId, optionIndex } } } }, parent: { select: { authorId, author: true } } }`
  - `createImageUpload(ctx, mimeType: string, sizeBytes: number) → { uploadUrl: string; uploadKey: string }` — key `discussions/tmp/<userId>/<uuid>`; mime must be `image/jpeg|png|webp|heic|heif`; `sizeBytes` 1…`MAX_INPUT_BYTES`.
  - `createPost(ctx, input: PostInput) → Post (with POST_INCLUDE)`
  - `editPost(ctx, id: string, body: string) → Post`
  - `deletePost(ctx, id: string) → { id: string; deleted: 'soft' | 'hard' }`
  - `toggleReaction(ctx, postId: string, emoji: string) → Post`
  - `votePoll(ctx, postId: string, optionIndex: number) → Post`
  - `setPinned(ctx, id: string, pinned: boolean) → Post`
  - `listFeed(ctx, { cursor?: string | null; tag?: PostTag | null }) → { posts: Post[]; pinned: Post[]; nextCursor: string | null }`
  - `countNewSince(ctx, since: Date, tag?: PostTag | null) → number`
  - `getThread(ctx, id: string) → { root: Post; replies: Post[]; nextCursor: string | null }` — `id` may be a reply; resolves to its root
  - `listReplies(ctx, rootId: string, cursor: string) → { replies: Post[]; nextCursor: string | null }`

Rules each function enforces:
- `createPost`: rate limit (count of viewer's posts with `createdAt > now - windowMs`; at the limit → "You're posting a lot right now. Please wait a few minutes."); body via `normalizeText(body, POST_MAX_LENGTH, 'Post')`; empty body with no images/poll/embed → "Write something or add a photo, poll or link."; `imageKeys` ≤ 4 and each must start with `discussions/tmp/${viewerId}/` (else "That photo could not be found."); `embedUrl` = given URL if `embedFromUrl` accepts it, else `firstEmbedUrl(body)`, else null (an explicitly given non-embeddable URL → badRequst); parent: must exist and not be deleted ("This post is no longer available."); reply sets `parentId`, `rootId = parent.rootId ?? parent.id`, `tag = null`; root keeps `tag ?? 'DISCUSSION'`. For each image: `readPrivateObject` → `bestVersion(buf, 'post')` → `writePrivateObject('discussions/<uuid>.<ext>')` → `deletePrivateObject(tmpKey)`; store `{ key, width, height }`. Create post + poll and `increment` the root's `replyCount` in one `db.$transaction`.
- `editPost`: author only (not admin); refuse deleted; sets `editedAt`.
- `deletePost`: author or admin. Has replies (root: `replyCount > 0`; reply: any `Post` with `parentId = id`) → soft: set `deletedAt`, `body: ''`, `images: []`, `embedUrl: null`, delete its poll. Otherwise hard delete and `decrement` root `replyCount` if it is a reply. Both paths `deletePrivateObject` each stored image key.
- `votePoll`: poll exists, `closesAt > now` else "This poll has closed."; index in range; `PollVote` unique violation (`P2002`) → "You have already voted."
- `setPinned`: admin only; roots only; pinning clears `pinnedAt` on every other post in the same transaction.
- `listFeed`: roots (`parentId: null`), `deletedAt: null`, `pinnedAt: null`, tag filter, `cursorWhere(cursor)`, `orderBy [{createdAt:'desc'},{id:'desc'}]`, `take FEED_PAGE + 1` to compute `nextCursor`. `pinned` only when `cursor` is empty.
- `getThread`/`listReplies`: replies `where { rootId }`, `orderBy [{createdAt:'asc'},{id:'asc'}]`, page `REPLIES_PAGE`, `cursorWhere(cursor, 'asc')`.
- `createPost` also refuses a poll together with images: "A post can have photos or a poll, not both."

- [ ] **Step 1: Write the failing tests** (fake `db` and `storage` objects like `tests/jobs.test.ts`'s `fixture()`):
  - `signed-out callers are refused everywhere` — every exported function rejects with code `ERROR_CODES.unauthorized` for `ctx = {}`.
  - `create: empty post refused; image-only post allowed; poll + images refused`
  - `create: foreign image keys refused` — keys `discussions/tmp/other/x` and `discussions/abc.webp` both throw "That photo could not be found."; no storage call made.
  - `create: images are optimised, moved and temp copies deleted` — storage fake records `write('discussions/…webp')` and `delete('discussions/tmp/actor/…')`.
  - `create: 11th post in 10 minutes is refused`
  - `create: reply to a reply joins the root and bumps root replyCount`
  - `create: reply to a deleted post refused`
  - `create: first embeddable link in body becomes embedUrl`
  - `edit: only the author; deleted posts can't be edited`
  - `delete: post with replies is soft-deleted, images removed; leaf reply hard-deleted and root count decremented`
  - `delete: admin may delete others' posts; members may not`
  - `vote: second vote → "You have already voted."; closed poll → "This poll has closed."; out-of-range index refused`
  - `pin: admin only; pinning one unpins others`
  - `feed: cursor with identical createdAt returns the next id, no duplicates` — fake returns rows; assert the `where` passed to `findMany` contains the id tiebreak and that `nextCursor` is built from the 20th row.
- [ ] **Step 2: Run** `npm run test:discussions` — Expected: new tests FAIL.
- [ ] **Step 3: Implement** the cloudflare helpers, preset and `src/services/discussions.ts`.
- [ ] **Step 4: Run** `npm run test:discussions` — Expected: PASS. Then `npx tsc --noEmit -p .` — Expected: no errors.
- [ ] **Step 5:** No commit.

---

### Task 4: GraphQL API

**Files:**
- Create: `jnvpjaa-backend/src/graphql/types/discussion.ts`, `src/graphql/queries/discussion.ts`, `src/graphql/mutations/discussion.ts`
- Modify: `jnvpjaa-backend/src/graphql/schema.ts` — register types; `...guardModule('discussions', [DiscussionQuery])` and `...guardModule('discussions', Object.values(DiscussionMutations))`
- Regenerate: `src/graphql/generated/schema.graphql`, `nexus.ts`

**Interfaces:**
- Consumes: Task 3 service functions.
- Produces (GraphQL, consumed by Task 5):

```graphql
enum PostTag { DISCUSSION HELP NEED IDEA }
type PostImage { url: String! width: Int! height: Int! }          # url = generatePrivateReadUrl(key)
type PostEmbed { provider: String! src: String! url: String! aspectRatio: Float! }
type PostPoll { options: [String!]! closesAt: DateTime! isClosed: Boolean! viewerVote: Int totalVotes: Int! results: [Int!] }  # results null until viewer voted or closed
type Post {
  id: ID! body: String! tag: PostTag images: [PostImage!]! embed: PostEmbed poll: PostPoll
  author: UserBasic! parentId: String rootId: String replyingTo: UserBasic   # parent's author when parentId != rootId
  replyCount: Int! reactions: [CommentReactionSummary!]! isDeleted: Boolean! isPinned: Boolean!
  canEdit: Boolean! canDelete: Boolean! createdAt: DateTime! editedAt: DateTime
}
type DiscussionFeed { posts: [Post!]! pinned: [Post!]! nextCursor: String }
type DiscussionThread { root: Post! replies: [Post!]! nextCursor: String }
type DiscussionReplies { replies: [Post!]! nextCursor: String }
type DiscussionImageUpload { uploadUrl: String! uploadKey: String! }
input PollInput { options: [String!]! days: Int! }
input PostInput { body: String tag: PostTag imageKeys: [String!] embedUrl: String poll: PollInput parentId: String }

Query:    discussionFeed(cursor: String, tag: PostTag): DiscussionFeed!
          discussionNewCount(since: DateTime!, tag: PostTag): Int!
          discussionThread(id: ID!): DiscussionThread!
          discussionReplies(rootId: ID!, cursor: String!): DiscussionReplies!
          discussionEmbed(url: String!): PostEmbed          # composer preview; requireUser + embedFromUrl
Mutation: createDiscussionImageUpload(mimeType: String!, sizeBytes: Int!): DiscussionImageUpload!
          createDiscussionPost(input: PostInput!): Post!
          editDiscussionPost(id: ID!, body: String!): Post!
          deleteDiscussionPost(id: ID!): ID!
          toggleDiscussionReaction(postId: ID!, emoji: String!): Post!
          voteDiscussionPoll(postId: ID!, optionIndex: Int!): Post!
          pinDiscussionPost(id: ID!, pinned: Boolean!): Post!
```

Field resolvers read from the `POST_INCLUDE` payload (no extra queries per post except the signed image URLs). Deleted posts resolve `body ''`, `images []`, `embed null`, `poll null`.

- [ ] **Step 1: Implement** the three files and register them.
- [ ] **Step 2: Regenerate and type-check** — Run: `cd jnvpjaa-backend && npm run dev` until "schema generated", stop it; `npx tsc --noEmit -p .` — Expected: no errors, `schema.graphql` contains `discussionFeed`.
- [ ] **Step 3: Smoke** — with the dev server up, run the `discussionFeed` query signed out via curl → Expected: `Unauthorised access` error.
- [ ] **Step 4:** No commit.

---

### Task 5: Web data layer, route protection, cleanup

**Files:**
- Create: `jnvpjaa-web/src/apollo/discussionOperations.ts` — `gql` docs for every Task 4 operation sharing one `PostFields` fragment, and TS types `DiscussionPost`, `PostTag`, `PostEmbed`, `PostPoll`, plus `TAG_LABEL: Record<PostTag, string> = { DISCUSSION: 'Discussion', HELP: 'Help', NEED: 'Need', IDEA: 'Idea' }` (style of `commentOperations.ts`).
- Modify: `jnvpjaa-web/src/utils/routeAccess.ts` — add `'/discussions'` to `EXACT_PROTECTED_ROUTES`.
- Modify: `jnvpjaa-web/tests/route-access.test.cjs` — assert `isProtectedRoute('/discussions')` and `isProtectedRoute('/discussions/abc')` are true.
- Modify: `jnvpjaa-web/src/constants/Header.constants.tsx` — `PAGE.discussions = { label: 'Discussions', path: '/discussions', description: 'Ask, share and talk with alumni' }`; add to `COMMUNITY_MENU.menu` (first) and to the matching member menu section.
- Delete: `src/utils/discussions.ts`, `src/components/common/DiscussionCard/`, `src/containers/Discussions/Discussions.tsx`, `src/containers/SingleDiscussion/`, `src/modules/NewDiscussion/`, `src/modules/DiscussionListModule/` (first `grep -rn` each export to confirm nothing else imports it).

- [ ] **Step 1:** Add the route-access assertions. Run `node --test tests/route-access.test.cjs` — Expected: FAIL.
- [ ] **Step 2:** Make the `routeAccess` change. Re-run — Expected: PASS.
- [ ] **Step 3:** Add operations, header entry; delete the old files.
- [ ] **Step 4:** Run `npx tsc --noEmit` and `npm run test:unit` — Expected: no errors (features.unit.ts still passes with the new menu item).
- [ ] **Step 5:** No commit.

---

### Task 6: Visual direction + PostCard

**Files:**
- Create: `jnvpjaa-web/src/modules/Discussions/PostCard.tsx`, `PostMedia.tsx` (image grid 1–4 + `EmbedFrame`), `PollView.tsx`, `ReactionBar.tsx` (reuse the comments reaction bar/`COMMENT_REACTION_CODES` and `emoji-picker-react` the way `CommentItem.tsx` does), `linkify.ts` + `linkify.unit.ts`

**Interfaces:**
- Consumes: `DiscussionPost` and mutations from Task 5.
- Produces: `<PostCard post={DiscussionPost} variant="feed" | "root" | "reply" onReply?={(post) => void} onDeleted?={(id) => void} />`; `linkify(text: string): Array<{ type: 'text' | 'link'; value: string }>`.

- [ ] **Step 1: Set the look.** Invoke `impeccable:impeccable` for the feed card, poll and composer, inside the existing MUI theme/tenant palette, honouring PRODUCT.md (375px, light/dark, plain copy). Record the decisions as a short comment block at the top of `PostCard.tsx`.
- [ ] **Step 2: Failing unit test** `linkify.unit.ts`: `linkify('hi https://a.b/c, ok')` → `[text 'hi ', link 'https://a.b/c', text ', ok']` (trailing punctuation excluded); `linkify('javascript:x')` → one text part.
- [ ] **Step 3:** Run `npx playwright test -c playwright.unit.config.ts src/modules/Discussions` — Expected: FAIL; implement `linkify.ts`; re-run — Expected: PASS.
- [ ] **Step 4: Build the components.** Card: avatar, name, batch, relative time, tag chip (roots), "replying to @name" (replies), body via `linkify` (links `target="_blank" rel="noopener noreferrer nofollow"`), clamp to 6 lines with "Show more" in `feed` variant, media, poll, reaction bar, reply count, ⋯ menu (Edit when `canEdit`, Delete when `canDelete`, Pin/Unpin for admins). Deleted → "This post was deleted." Whole card links to `paths.discussions.getThreadUrl(rootId ?? id)` in `feed` variant. Images: grid with fixed aspect boxes (no layout shift), tap opens full size. `EmbedFrame`: `<iframe src={embed.src} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation" referrerPolicy="strict-origin-when-cross-origin" title={`${provider} post`} />` in an `aspect-ratio` box. Poll: buttons before voting; bars with % and "N votes · closes in 2 days" after. Reactions and votes optimistic via Apollo `optimisticResponse`.
- [ ] **Step 5:** `npx tsc --noEmit` — Expected: clean. No commit.

---

### Task 7: Composer

**Files:**
- Create: `jnvpjaa-web/src/modules/Discussions/Composer.tsx`

**Interfaces:**
- Consumes: `createDiscussionImageUpload`, `createDiscussionPost`, `discussionEmbed` (Task 5); `optimiseImageSize` (`src/utils/media`).
- Produces: `<Composer parentId?: string replyingToName?: string onPosted={(post: DiscussionPost) => void} />`

- [ ] **Step 1: Build it.** Auto-growing textarea with a `5000` counter shown from 4500; tag chips (roots only); photo button (`accept="image/*" multiple`, max 4, compress with `optimiseImageSize`, request upload, `fetch(uploadUrl, { method: 'PUT', body, headers: { 'Content-Type': mime } })`, thumbnails with remove and progress); poll button (2–4 option fields, "Add option", duration select 1/3/7 days, remove poll); a poll and photos can't both be on one post (disable the other button), matching the spec's "one poll or images"; link preview: debounce 500 ms on the first URL in the text, query `discussionEmbed`, show `EmbedFrame` with a remove (×) that sends `embedUrl: null` and suppresses auto-detect. Draft text saved to `localStorage` key `${brand.id}_discussion_draft_${parentId ?? 'root'}` in try/catch, cleared on post. Post button disabled while uploading or empty. On phones the root composer opens as a full-height bottom sheet from a floating "Post" button.
- [ ] **Step 2:** `npx tsc --noEmit` — Expected: clean. No commit.

---

### Task 8: Feed and conversation pages

**Files:**
- Create: `jnvpjaa-web/src/app/discussions/layout.tsx` (`requireModule('discussions')`, metadata `robots: { index: false, follow: false }`), `src/app/discussions/page.tsx`, `src/app/discussions/[id]/page.tsx`
- Create: `jnvpjaa-web/src/containers/Discussions/DiscussionFeed.tsx`, `src/containers/Discussions/Conversation.tsx`; update `src/containers/Discussions/index.ts` exports.

**Interfaces:**
- Consumes: `PostCard`, `Composer`, Task 5 operations.

- [ ] **Step 1: Feed.** Wrapped in `LayoutModule` like `/jobs`. Tag chips `All | Discussion | Help | Need | Idea` synced to `?tag=`; composer at top (desktop) / floating button (phone); pinned posts first; infinite scroll with `IntersectionObserver` calling `fetchMore({ variables: { cursor } })` and a `typePolicies` merge for `discussionFeed` keyed on `tag`; every 60 s while the tab is visible, `discussionNewCount(since: newest createdAt)` → pill "N new posts" that refetches and scrolls to top when tapped. Empty state: "No posts yet. Start the first conversation." Skeleton cards while loading.
- [ ] **Step 2: Conversation.** Back link "← Discussions"; root as `variant="root"`; reply composer under it; replies as `variant="reply"` oldest first; "Show more replies" calls `discussionReplies`. Replying to a reply passes that post's id as `parentId`. Not-found/deleted-with-no-replies → friendly 404 message with a link back.
- [ ] **Step 3: Run it.** Start backend + web dev servers; in the browser pane at 375px and desktop, light and dark: post text, photos, a poll and a YouTube link; vote; react; reply; reply-to-reply; delete; check the console has no errors. Screenshot the feed and a conversation.
- [ ] **Step 4:** No commit.

---

### Task 9: End-to-end test

**Files:**
- Create: `jnvpjaa-web/e2e/discussions.spec.ts` (use the signed-in member persona fixture the way `e2e/access-control.spec.ts` does)

- [ ] **Step 1: Write** `member posts a poll, votes, and replies`: go to `/discussions`; type "Which city for the next meetup?"; add poll options "Jaipur", "Delhi"; Post; expect the card with that text at the top; click "Jaipur"; expect "1 vote"; open the card; reply "Jaipur works for me"; expect the reply under the root and the root's reply count to be 1.
- [ ] **Step 2: Write** `signed-out visitor is sent to sign in` — visiting `/discussions` lands on `/signin`.
- [ ] **Step 3: Run** `npx playwright test e2e/discussions.spec.ts` — Expected: 2 passed.
- [ ] **Step 4:** No commit.
