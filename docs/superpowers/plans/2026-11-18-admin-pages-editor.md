# Admin Page Editor + Admin Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Office bearers and admins can edit seven association pages from a new sidebar-navigated admin area, and the
public pages read that content from the database.

**Architecture:** A backend `ContentPage` table (slug → JSON fields), validated by one zod schema per page type, served
through Nexus GraphQL and guarded by a new `content.page.manage` permission. The web public pages fetch on the server
(newsroom pattern) and render the existing containers through props. `/admin` becomes a layout with a
permission-filtered sidebar. The existing `AdminPanel` is driven by a `section` prop instead of internal tabs.

**Tech Stack:**

- Backend: Prisma 5, Nexus, apollo-server-core, sanitize-html, zod 3.23.8 (new to the backend, matching web),
  `node:test` via ts-node.
- Web: Next.js App Router, MUI, Apollo, react-hook-form, TipTap, zod 3.23.8, `node:test` `.cjs` tests.

**Spec:** `jnvpjaa-web/docs/superpowers/specs/2026-11-18-admin-pages-editor-design.md`

## Global Constraints

- **Never `git commit`** in either repo (standing user rule). Every "commit" step below is replaced by "leave
  uncommitted".
- Page slugs (fixed set): `president-message`, `principal-message`, `secretary-message`, `vision`, `about`,
  `past-presidents`, `bhamashah-pillars`.
- Types: `message` (3 message pages), `text` (vision, about), `people-list` (past-presidents, bhamashah-pillars).
- Permission code: `content.page.manage`. Granted to roles `PLATFORM_ADMIN` and `SUPER_ADMIN`, and to positions
  `PRESIDENT`, `VICE_PRESIDENT_MALE`, `VICE_PRESIDENT_FEMALE` and `SECRETARY`.
- Settings and Scholarship admin stay gated by the `SUPER_ADMIN` **role**, exactly as today.
- `/billing`, `/transactions`, `/security` and `/activity` are not moved, redirected or linked from the admin sidebar.
- On day one, with seeded data, public pages render identically to today.
- `phone` and `email` from `PastPresidents.json` are never stored in `content_pages`.
- Admin UI reuses the site's MUI theme and `components/editor/EditorShell` primitives. No new visual language.

## Review Focus

1. **Two editors save the same page:** the later save must not silently overwrite the earlier one. `updateContentPage`
   takes `expectedUpdatedAt`, and a mismatch is rejected with "This page was changed by someone else. Reload to see
   their changes." (Task 3)
2. **Script or `javascript:` in rich text or image URLs:** stripped or rejected server-side. Image URLs must be
   `https:`. (Task 1)
3. **Re-running the seed after edits:** must never overwrite edited content. The seed is create-only. (Task 4)
4. **A hidden page:** the public route returns 404 and its menu link disappears, but editors still open it in admin.
   (Tasks 3, 6)
5. **Oversized payloads:** a 2 MB body or 500 people entries are rejected with field messages, not stored. Limits: body
   ≤ 100,000 chars, people ≤ 200, sections ≤ 12, short text ≤ 200 chars. (Task 1)

---

### Task 1: Backend content-page schemas and validation

**Files:**

- Modify: `jnvpjaa-backend/package.json` (add `"zod": "3.23.8"`, add script
  `"test:content-pages": "ts-node -r tsconfig-paths/register tests/content-pages.test.ts"`)
- Modify: `jnvpjaa-backend/src/services/newsroom.ts`: add `export` to the existing `sanitizeNewsHTML` (no rename)
- Create: `jnvpjaa-backend/src/services/contentPages/schema.ts`
- Test: `jnvpjaa-backend/tests/content-pages.test.ts`

**Interfaces:**

- Produces:
  - `CONTENT_PAGES: Record<ContentPageSlug, { type: ContentPageType; label: string; path: string }>`
  - `type ContentPageSlug`, `type ContentPageType = 'message' | 'text' | 'people-list'`
  - `parseContentFields(slug: string, fields: unknown): ContentFields`. Throws `ApolloError(ERROR_CODES.badRequst)`,
    whose message lists `path: message` per issue. It returns fields with every rich-text value sanitised by
    `sanitizeNewsHTML`.
  - Field shapes (zod, `.strict()`):
    - image: `{ url: https URL ≤ 500, alt: string 1..200 }`
    - message:
      `{ heading 1..200, tagline ≤200 optional, body 1..100000 richtext, photo: image optional, signerName ≤200 optional, signerRole ≤200 optional }`
    - text: `{ heading 1..200, sections: [{ heading ≤200 optional, body 1..100000 richtext, image optional }] 1..12 }`
    - people-list:
      `{ heading 1..200, intro ≤100000 richtext optional, groups: [{ key /^[a-z0-9-]{1,40}$/, label 1..100, visible bool }] 1..10, people: [{ name 1..200, group, photo optional, batch int 1980..2100 optional, tenure ≤100 optional, note ≤500 optional }] ≤200 }`,
      with a refinement that each `person.group` matches a `groups[].key`.

- [ ] **Step 1: Write failing tests** in `tests/content-pages.test.ts` (style: `tests/newsroom.test.ts`):
  - `parseContentFields('nope', {})` throws `/Unknown page/`.
  - Valid message fields pass. `<script>alert(1)</script><p>Hi</p>` in body comes back as `<p>Hi</p>`.
  - Message with `heading: ''` throws a message containing `heading`.
  - Photo `{ url: 'javascript:alert(1)', alt: 'x' }` throws. Photo with `alt: ''` throws.
  - Text with 13 sections throws. A body of 100,001 chars throws.
  - People-list with a person whose `group: 'gold'` has no matching group throws `/group/`. 201 people throws.
  - An extra unknown key (`{ ..., hacker: 1 }`) throws (strict).
- [ ] **Step 2:** `npm run test:content-pages` → FAIL (module not found).
- [ ] **Step 3:** Implement `src/services/contentPages/schema.ts` with the shapes above. Use `.transform` on rich-text
      strings to call `sanitizeNewsHTML`.
- [ ] **Step 4:** `npm i && npm run test:content-pages` → PASS. Run `npm run test:newsroom` → still PASS.
- [ ] **Step 5:** Leave uncommitted.

### Task 2: Data model and permission

**Files:**

- Modify: `jnvpjaa-backend/prisma/schema.prisma`: add model `ContentPage` exactly as in the spec (`slug @id`, `type`,
  `visible`, `fields Json`, `seoTitle`, `seoDescription`, `updatedById` → `User`, `updatedAt`,
  `@@map("content_pages")`), plus the back-relation `contentPagesUpdated ContentPage[]` on `User`.
- Create: migration via `npx prisma migrate dev --name content_pages --create-only`
- Modify: `jnvpjaa-backend/src/constants/access.ts`:
  - Add `CONTENT_PAGE_MANAGE: 'content.page.manage'` to `PERMISSION_CODES`.
  - Add a catalog entry
    `{ name: 'Manage Pages', category: 'Content', description: 'Edit and show or hide the association pages' }`.
  - Add the code to the `PLATFORM_ADMIN` role list (SUPER_ADMIN already gets `Object.values`).
  - Add it to `EXECUTIVE_POSITION_PERMISSION_MAP` for `PRESIDENT`, `SECRETARY`, `VICE_PRESIDENT_MALE` and
    `VICE_PRESIDENT_FEMALE`.
- Mirror: `jnvpjaa-web/src/constants/access.ts`: add the same `CONTENT_PAGE_MANAGE` code.
- Test: append to `tests/content-pages.test.ts`

- [ ] **Step 1: Failing test** `'content.page.manage is granted to exactly the agreed holders'`. It asserts that the
      code is in the role map for `PLATFORM_ADMIN` and `SUPER_ADMIN` and in the position map for the 4 positions, and is
      **absent** for `JOINT_SECRETARY`, `TREASURER`, `EXECUTIVE_COMMITTEE_MEMBER`, `BATCH_COORDINATOR`, `BATCH_MENTOR`,
      `FINANCE_MANAGER` and `MEMBER`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Make the edits above, then run `npx prisma migrate dev --name content_pages` and
      `npx prisma generate`.
- [ ] **Step 4:** Run tests → PASS. Find how the catalog is re-seeded on deploy (`seedAccessCatalog` in
      `services/accessCatalog.ts`, called from `accessBackfill.ts`) and note the command in `DEPLOYMENT.md` under a new
      "Content pages" line.
- [ ] **Step 5:** Leave uncommitted.

### Task 3: Content-page service and GraphQL API

**Files:**

- Create: `jnvpjaa-backend/src/services/contentPages/index.ts`
- Create: `jnvpjaa-backend/src/graphql/types/contentPage.ts`, `queries/contentPage.ts`, `mutations/contentPage.ts`
- Modify: `jnvpjaa-backend/src/graphql/schema.ts`: register the three modules, following the Newsroom imports
- Test: `tests/content-pages.test.ts` (fake-db fixture as in `tests/newsroom.test.ts`)

**Interfaces:**

- Consumes: `parseContentFields`, `CONTENT_PAGES` (Task 1); `authorize(ctx, code, undefined, db)`;
  `recordActivity(db, ctx, input)`.
- Produces (service, each takes `db: any = prisma` last):
  - `getPublicContentPage(slug)` → page or `null` (null when missing **or** `visible === false`).
  - `listHiddenContentPageSlugs()` → `string[]`.
  - `listContentPagesForEditor(ctx)` → all pages, including `updatedBy { id firstName lastName }`.
  - `getContentPageForEditor(ctx, slug)` → page or `null`.
  - `updateContentPage(ctx, input: { slug, fields, visible, seoTitle?, seoDescription?, expectedUpdatedAt })` → page.
    Runs in `db.$transaction`. A stale `expectedUpdatedAt` throws a conflict with the exact copy from Review Focus 1.
    Records activity
    `{ action: 'content_page.update', entityType: 'ContentPage', entityId: slug, before: { visible }, after: { visible } }`.
- GraphQL:
  - `type ContentPage { slug, type, visible, fields: JSON, seoTitle, seoDescription, updatedAt, updatedBy: User }`
  - Queries: `contentPage(slug)` (public), `hiddenContentPages` (public), `contentPagesForEditor`,
    `contentPageForEditor(slug)`
  - Mutation: `updateContentPage(input: ContentPageInput!)`, where `fields` is `JSON` and `expectedUpdatedAt` is
    `DateTime!`
  - Regenerate `src/graphql/generated/*` with the repo's usual command (the dev server writes the Nexus artifacts).

- [ ] **Step 1: Failing tests:**
  - A member without permission calling `updateContentPage` → rejected and nothing written. The same for
    `listContentPagesForEditor`.
  - Permitted save → upsert called with sanitised fields and `updatedById: actor.id`, and one activity row.
  - Stale `expectedUpdatedAt` → throws `/changed by someone else/`, and no upsert.
  - `getPublicContentPage` on a hidden page → `null`. `getContentPageForEditor` on the same page with permission → the
    page.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement the service and GraphQL modules.
- [ ] **Step 4:** Run `npm run test:content-pages`, then `npx tsc --noEmit` → PASS. The schema regenerates without
      errors.
- [ ] **Step 5:** Leave uncommitted.

### Task 4: Seed today's content

**Files:**

- Create: `jnvpjaa-backend/prisma/seed_data/content_pages.json`. Seven entries
  `{ slug, type, visible, fields, seoTitle, seoDescription }`, transcribed verbatim from:
  - `jnvpjaa-web/src/containers/About/{PresidentMessage,PrincipalMessage,SecretaryMessage,Vision,About}.tsx`
  - `jnvpjaa-web/src/containers/PastPresidents/PastPresidents.tsx` + `src/constants/PastPresidents.json` (only `name`,
    `batch`/`year`, `tenure`, `profile_image`→`photo`; plus `gender` only if the placeholder needs it, per spec)
  - `jnvpjaa-web/src/containers/Organisation/BhamashahPillars.tsx` + `BHAASHAH_PILLARS` in
    `src/constants/General.contants.ts` (Platinum/Silver `visible: true`, Gold `visible: false`)
  - SEO title and description from each route's current `constructMetadata` call.
- Create: `jnvpjaa-backend/prisma/scripts/seed_content_pages.ts`, exporting `seedContentPages(db)`: for each entry,
  `parseContentFields`, then `upsert` with `update: {}` (create-only), then `db.$disconnect`. Add script
  `"db:seed:content-pages"`.
- Test: append to `tests/content-pages.test.ts`

- [ ] **Step 1: Failing tests:**
  - Every entry in `content_pages.json` passes `parseContentFields`, and the slugs equal `Object.keys(CONTENT_PAGES)`.
  - The JSON contains no `phone`/`email` keys anywhere.
  - `seedContentPages` with a fake db calls `upsert` with `update: {}` for all 7.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Write the JSON and the script.
- [ ] **Step 4:** Run tests → PASS. Run `npm run db:seed:content-pages` against the local DB twice; the second run
      changes nothing.
- [ ] **Step 5:** Leave uncommitted.

### Task 5: Web operations, registry and schemas

**Files:**

- Create: `jnvpjaa-web/src/apollo/contentPageOperations.ts`: gql documents `CONTENT_PAGE`, `HIDDEN_CONTENT_PAGES`,
  `CONTENT_PAGES_FOR_EDITOR`, `CONTENT_PAGE_FOR_EDITOR` and `UPDATE_CONTENT_PAGE`, plus TS types `ContentPage`,
  `MessageFields`, `TextFields`, `PeopleListFields` (hand-written, following `newsroomOperations.ts`).
- Create: `jnvpjaa-web/src/modules/ContentPages/contentPages.registry.ts`, which copies `CONTENT_PAGES` (slug →
  `{ type, label, path }`). It must stay identical to the backend.
- Create: `jnvpjaa-web/src/modules/ContentPages/contentPages.schema.ts`, which copies the Task 1 zod shapes **without**
  the sanitise transform. Export `contentFieldsSchema(type)`.
- Test: `jnvpjaa-web/tests/content-pages.test.cjs`, using the `load()` helper from `tests/newsroom-utils.test.cjs` with
  `require` passed through so zod resolves.

- [ ] **Step 1: Failing test:** the registry slugs and types equal the backend's (read
      `../jnvpjaa-backend/src/services/contentPages/schema.ts` as text and regex out the slug → type pairs). Empty
      heading fails, `javascript:` photo fails, unknown group fails (same cases as Task 1).
- [ ] **Step 2:** `node --test tests/content-pages.test.cjs` → FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Leave uncommitted.

### Task 6: Public pages read from the database

**Files:**

- Create: `jnvpjaa-web/src/modules/ContentPages/getContentPage.ts`: `getContentPage(slug): Promise<ContentPage | null>`,
  wrapped in `react` `cache`, using the `initializeApollo()` + `fetchPolicy: 'no-cache'` + `NO_STORE` pattern from
  `app/newsroom/[slug]/page.tsx`. Throws on GraphQL errors.
- Modify each route
  `src/app/{president-message,principal-message,secretary-message,vision,about,past-presidents,bhamashah-pillars}/page.tsx`:
  - `export const dynamic = 'force-dynamic'`.
  - `generateMetadata` uses `seoTitle ?? <today's title>` and `seoDescription ?? <today's description>`.
  - `notFound()` when the page is null.
  - Pass the fields to the container.
- Modify the containers to take props instead of hardcoded copy, keeping today's markup and styles:
  - `PresidentMessage`, `PrincipalMessage` and `SecretaryMessage` merge into one `MessagePage({ fields, crumb })` in
    `src/containers/About/MessagePage.tsx`. Delete the three old files and update imports.
  - `Vision` and `About` take `{ fields: TextFields }` and render `sections`. The logo block stays hardcoded in `About`.
  - `PastPresidents` and `BhamashahPillars` take `{ fields: PeopleListFields }`, render visible groups in order, and
    keep today's photo placeholder.
- Modify `src/constants/Header.constants.tsx` consumers (`LayoutTopbar`, `LayoutFooter`):
  `useQuery(HIDDEN_CONTENT_PAGES)` and filter out menu items whose `path` matches a hidden slug's registry path.
- Delete: `src/constants/PastPresidents.json` and the `BHAASHAH_PILLARS` export, once nothing imports them.

- [ ] **Step 1:** With the backend seeded and running, capture today's HTML first:
      `curl -s localhost:3890/<route>/ > /tmp/before-<slug>.html` (scratch dir) for all 7 routes, before editing.
- [ ] **Step 2:** Implement the changes above.
- [ ] **Step 3:** Capture after, and diff the visible text (`sed 's/<[^>]*>//g'`) and the
      `<title>`/`meta description`/`og:*` tags. Expected: no text differences.
- [ ] **Step 4:** Set `visible=false` on `vision` via `updateContentPage` (GraphiQL as a super admin). `/vision/`
      returns 404, and the "Vision and Mission" menu link is gone. Restore it.
- [ ] **Step 5:** `npx tsc --noEmit && npm run lint` → clean. Leave uncommitted.

### Task 7: Admin shell and sidebar navigation

**Files:**

- Create: `jnvpjaa-web/src/modules/AdminShell/adminNav.ts`, which exports `ADMIN_NAV` and
  `getAdminNav(access: { can(code): boolean; hasRole(code): boolean }): AdminNavGroup[]`. Groups and items, with routes
  and guards:
  - (no group) Overview `/admin`: shown if any other item is visible.
  - People & Access:
    - Member access `/admin/access`: `can(IAM_CATALOG_READ) && canAssignAnyRole`, moving the `canAssignAnyRole` helper
      from `AdminPanel.tsx` into this file.
    - Executive committee `/admin/executive`: `can(IAM_EXECUTIVE_POSITION_MANAGE)`.
    - Batch coordinators `/admin/coordinators`: `can(IAM_ROLE_ASSIGNMENT_MANAGE_BATCH_ROLES)`.
    - Current assignments `/admin/assignments`: `can(IAM_USER_ACCESS_READ)`.
  - Content:
    - Pages `/admin/pages`: `can(CONTENT_PAGE_MANAGE)`.
    - Newsroom → existing `/newsroom` (external link icon): `can(NEWSROOM_POST_MANAGE)`.
  - Platform:
    - Settings `/admin/settings`: `hasRole(SUPER_ADMIN)`.
    - Scholarship `/admin/scholarship`: `hasRole(SUPER_ADMIN)`.
  - `getActiveItem(pathname)`.
- Create: `jnvpjaa-web/src/modules/AdminShell/AdminShell.tsx`:
  - At `md` and up: a sticky 240px sidebar using MUI `List` with group subheaders and `ListItemButton selected` for the
    active item.
  - Below `md`: a top bar showing the current item label with a chevron, opening a `Drawer anchor="left"` with the same
    list.
  - The section header shows a breadcrumb `Admin / <Group> / <Item>`, an `h1` title and a one-line description (today's
    per-tab descriptions from `AdminPanel.tsx:1018-1022`; Pages: "Edit the association's pages and choose which ones are
    shown."; Scholarship: "Turn the scholarship module on or off and manage test mode.").
  - When the viewer has no items: the existing "no access" state AdminPanel shows today.
- Modify: `src/app/admin/layout.tsx`: wrap children in `LayoutModule` (moved from `page.tsx`) and `AdminShell`.
- Create: `src/app/admin/page.tsx` (replace): Overview, a grid of the viewer's items as cards (label + description),
  with nothing else.
- Create: `src/app/admin/[section]/page.tsx`: for `access|executive|coordinators|assignments|settings`, render
  `<AdminPanel section={section} />`. For `scholarship`, render `<ScholarshipSettings />`. Otherwise `notFound()`.
- Modify: `src/containers/AdminPanel/AdminPanel.tsx`:
  - Accept a `section` prop, replacing the `adminTab` state.
  - Delete the `Tabs` header block (~lines 995-1030).
  - Remove `ScholarshipSettings` from the settings section.
  - Keep all queries and mutations unchanged.
- Test: `jnvpjaa-web/tests/admin-nav.test.cjs`

- [ ] **Step 1: Failing tests** for `getAdminNav`:
  - A super admin sees all 9 items.
  - A President (perms: the position's list, incl. `content.page.manage`) sees access-related items + Pages + Newsroom,
    and **not** Settings or Scholarship.
  - A Vice President sees Current assignments + Pages only.
  - A Treasurer sees Current assignments only.
  - A plain member sees `[]`.
  - `getActiveItem('/admin/pages/vision')` → the Pages item.
- [ ] **Step 2:** `node --test tests/admin-nav.test.cjs` → FAIL.
- [ ] **Step 3:** Implement. Read
      `/Users/onejeet/.claude-personal/plugins/cache/impeccable/impeccable/4.8.2/skills/impeccable/reference/craft-floor.md`
      before writing the UI.
- [ ] **Step 4:** Tests PASS. In the browser as a super admin, every sidebar item opens and works as its old tab did. At
      375px the drawer opens and closes, the active item is highlighted, and there's no horizontal scroll.
- [ ] **Step 5:** Leave uncommitted.

### Task 8: Page editor UI

**Files:**

- Create: `src/app/admin/pages/page.tsx` → `ContentPagesIndex`
- Create: `src/app/admin/pages/[slug]/page.tsx` → `ContentPageEditor`
- Create: `src/modules/ContentPages/ContentPagesIndex.tsx`:
  - A list from `CONTENT_PAGES_FOR_EDITOR`, in registry order.
  - Each row shows the label, a type caption, a `Chip` "Shown"/"Hidden", "Edited {relative} by {name}", and buttons
    **Edit** and **View page**.
  - The View page button is disabled with the tooltip "Hidden pages can't be viewed" when the page is hidden.
- Create: `src/modules/ContentPages/ContentPageEditor.tsx`:
  - `react-hook-form` inside `EditorShell`. On submit, run `contentFieldsSchema(type).safeParse(values.fields)` and map
    each issue to `setError(\`fields.${issue.path.join('.')}\`, …)`. `@hookform/resolvers` isn't installed, so don't add
    it.
  - Panels: **Content** (type fields), **SEO** (`seoTitle` ≤ 70, `seoDescription` ≤ 160, both optional, with "Leave
    empty to use the default"), and **Visibility** (`Switch` "Visible on site").
  - Sticky actions: **Save** (disabled unless dirty or while saving) and **View page**.
  - A `beforeunload` guard plus a confirm on in-app navigation while dirty.
  - On success, toast "Saved. Live on the site now." On conflict, show the server message with a **Reload** action.
- Create: `src/modules/ContentPages/fields/MessageFields.tsx`, `TextSections.tsx`, `PeopleListFields.tsx`,
  `PageImageField.tsx`:
  - `PageImageField({ value, onChange })`:
    - Reuses `CoverField` for the preview and empty state, plus a required alt text field.
    - Upload: pick a file, run
      `getPresignedUrl({ imageCategory: 'pages', fileName: \`${user.id}-${slug}-${Date.now()}.${ext}\`, contentType
      })`, `PUT`the file, then store the public URL. Derive it the same way as`ProfilePictureUpload.tsx`.
    - Only JPEG, PNG and WebP are accepted, and files up to 5 MB.
  - `TextSections` / `PeopleListFields`: `useFieldArray`. Each row has **Move up** and **Move down** icon buttons
    (keyboard-accessible; no drag library) and **Remove** with a confirm.
  - People are grouped under group headers with the group's visible switch. The "Add person" button is per group.
- Rich text: `TipTapTextEditor` from `@/modules/TipTapTextEditor`, as in `NewsEditor.tsx`.

- [ ] **Step 1:** Implement the index and editor. Read `craft-floor.md` first.
- [ ] **Step 2:** In the browser, as a user holding President:
  - Edit the President's message heading, save, and confirm `/president-message/` shows it.
  - Upload a photo, and confirm the uploader's own avatar is unchanged.
  - Reorder Past Presidents, save, and confirm the public order.
  - Hide Gold in Bhamashah, then show it.
  - An empty heading blocks Save with a field message.
  - Open the same page in two tabs and save both: the second shows the conflict message.
- [ ] **Step 3:** As a Treasurer: `/admin/pages` → 404 or no-access state. Calling `updateContentPage` from GraphiQL is
      forbidden.
- [ ] **Step 4:** At 375px the editor is usable: panels stack, the action bar stays reachable, and there's no horizontal
      scroll.
- [ ] **Step 5:** Leave uncommitted.

### Task 9: Final verification

- [ ] Backend: all `npm run test:*` scripts touched (`content-pages`, `newsroom`, `members`, `activity`) PASS.
      `npx tsc --noEmit` is clean.
- [ ] Web: `node --test tests/*.cjs` PASS. `npx tsc --noEmit`, `npm run lint` and `npm run build` succeed.
- [ ] Run the design detector once on changed UI:
      `/Users/onejeet/.claude-personal/plugins/cache/impeccable/impeccable/4.8.2/skills/impeccable/scripts/impeccable detect --json src/modules/AdminShell src/modules/ContentPages src/app/admin`.
      Fix any real findings.
- [ ] `/billing`, `/security` and `/activity` still load unchanged for a plain member.
- [ ] Report: what changed in each repo, the migration + seed commands to run on deploy, and anything not verified.
