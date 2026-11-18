# Admin Portal: Page Editor + Navigation — Design

Date: 2026-11-18 · Repos: `jnvpjaa-web`, `jnvpjaa-backend` · Instance: `TENANT=jnvpjaa` Related:
`2026-11-18-tenant-config-design.md` (on hold until approved). This work does not depend on it.

## Intent

Office bearers should be able to keep the association's own pages up to date without a developer: the President's
message, the Vision page and the rest. It is also the first step toward the white-label product, because page content
moves out of code and into data each association owns.

At the same time, the admin portal is reorganised so that access management, settings, content and the scattered admin
tools all sit under one clear navigation, without becoming complicated.

## Goals

1. **Editable pages** (fixed fields, no free layout). Pages in scope:
   - Message pages: President's Message, Principal's Message, Secretary's Message.
   - Text pages: Vision & Mission, About.
   - List pages: Past Presidents, Bhamashah Pillars.
2. **Who can edit:** President, Vice President (male and female positions), Secretary, Super Admin and Platform Admin.
3. **Per-page control:** a "Visible on site" switch. A hidden page returns 404 and is dropped from the public menu.
4. **Admin navigation:** a single admin area with a left sidebar, grouped sections, a URL per section, and items
   filtered by the viewer's permissions.
5. On launch, every public page looks **exactly as it does today**. The current hardcoded content is seeded as the
   starting data.

## Non-goals

- No block or page builder, and no creating new pages from admin. Adding a page type stays a code change.
- No drafts, scheduled publishing, or version history in v1. Save publishes immediately.
- No visual redesign of the public pages themselves.
- No changes to how access, executive, settings and scholarship tools _work_. They only move into the new admin shell.

## Anti-goals

- An editor can break a page's layout or SEO (e.g. empty title or missing image) → server-side validation must reject
  it.
- A member without the permission can read admin data or save a page by calling the API directly → enforced in the
  backend, not only by hiding UI.
- Members lose their own pages (receipts, security, activity) because they were moved into admin → they are not moved.
- The admin sidebar shows items the viewer can't open.

## Constraints and existing system

- Web: Next.js App Router, MUI, Apollo. Public dynamic pages fetch on the server with `initializeApollo()` +
  `force-dynamic` (pattern: `app/newsroom/[slug]/page.tsx`). Rich text uses the existing TipTap editor
  (`src/modules/TipTapTextEditor`), the same one used by newsroom and blog.
- Backend: Nexus GraphQL (`src/graphql/{types,queries,mutations}`), Prisma, permission catalog seeded by
  `services/accessCatalog.ts`, permission checks in `services/accessControl.ts`. Executive positions get permissions
  through `ExecutivePositionPermission`, and roles through `RolePermission`.
- The current admin is one 1,825-line component (`containers/AdminPanel/AdminPanel.tsx`) with five tabs.
- Image uploads already exist (`utils/uploads.ts`, R2). Page photos use the same path.
- Do not git commit (standing user instruction).

## Approaches considered

**Content storage**

|                | Approach                                                                                                               | Trade-off                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **A (chosen)** | One `ContentPage` table keyed by `slug`, with page fields stored as JSON and validated by one zod schema per page type | New pages need no migration. One schema drives both the admin form and server validation. Field integrity lives in app code, not DB columns. |
| B              | A table per page type, with real columns                                                                               | Stricter, but a migration per page type, plus extra tables for list entries. More work, no gain for editors.                                 |

**Admin navigation**

|                      | Approach                                                             | Trade-off                                            |
| -------------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| **Sidebar (chosen)** | `/admin/*` nested routes, left sidebar with groups, drawer on mobile | Deep-linkable, scales to ~15 items, works on phones. |
| Two-level tabs       | Section tabs + sub-tabs                                              | Crowded at ~12 items, poor on mobile.                |

The user chose **A + sidebar**.

## Design

### Data model (backend)

```prisma
model ContentPage {
  slug        String   @id              // 'president-message', 'vision', …
  type        String                    // 'message' | 'text' | 'people-list'
  visible     Boolean  @default(true)
  fields      Json                      // validated against the type's schema
  seoTitle    String?  @map("seo_title")
  seoDescription String? @map("seo_description")
  updatedById String?  @map("updated_by_id")
  updatedBy   User?    @relation(fields: [updatedById], references: [id])
  updatedAt   DateTime @default(now()) @updatedAt @map("updated_at")
  @@map("content_pages")
}
```

The slug set is fixed in code (a registry). The backend rejects an unknown slug or a type mismatch.

### Page types and fields

- **message** (president/principal/secretary): `heading`, `tagline` (the quoted line), `body` (TipTap rich-text HTML,
  sanitised server-side), `photo` (`{ url, alt }`), `signerName`, `signerRole`.
- **text** (vision, about): `heading`, and `sections[]`, each with `heading?`, `body` (rich text) and `image?`
  (`{ url, alt }`). Sections can be reordered. About's two images and second section, and Vision's multi-section layout,
  map onto this. Fixed decorative elements that aren't content (e.g. the logo block) stay in the component.
- **people-list** (past-presidents, bhamashah-pillars):
  - Page fields: `heading`, `intro` (rich text, optional), and `groups[]` with `{ key, label, visible }`. Bhamashah uses
    groups for the Platinum/Gold/Silver tiers; Gold is seeded with `visible: false`, matching today, where it is
    commented out. Past Presidents has one group.
  - `people[]` entries: `name`, `group`, `photo?`, `batch?`, `tenure?`, `note?`, plus an order. Entries can be added,
    removed and reordered.
  - **Photo is optional for people.** Missing photos render the same placeholder the page uses today. `gender` is
    migrated only if that placeholder needs it.
  - `phone` and `email` from `PastPresidents.json` are **not** migrated. They aren't shown publicly, and storing them
    would widen exposure.

One zod schema per type lives in each repo: in the web repo it builds and validates the form, and in the backend it
guards the mutation. Required fields and length limits are identical in both.

### API

- `contentPage(slug)`: public. Returns the page if `visible`, otherwise `null`.
- `hiddenContentPages`: public. Slugs of hidden pages, so the menu can drop their links.
- `contentPageForEditor(slug)`: editors only. Returns any page, hidden or not.
- `contentPages`: editors only. Returns the list for the admin index (slug, type, visible, updatedAt, updatedBy).
- `updateContentPage(slug, fields, visible, seoTitle, seoDescription, expectedUpdatedAt)`: rejects a stale
  `expectedUpdatedAt`, so two editors can't silently overwrite each other. Requires `content.page.manage`. Validates the
  fields, sanitises rich text, stamps `updatedBy`, and writes an access/activity audit entry the same way other admin
  mutations do.

### Permission

- New permission `content.page.manage`, added to the catalog seed.
- Granted to: the `SUPER_ADMIN` and `PLATFORM_ADMIN` roles, and the `PRESIDENT`, `VICE_PRESIDENT_MALE`,
  `VICE_PRESIDENT_FEMALE` and `SECRETARY` executive positions. Existing assignments pick it up through the normal
  catalog re-seed.

### Public pages

Each in-scope route (`/president-message`, `/vision`, …) becomes a server component that fetches `contentPage(slug)`
(`force-dynamic`, no cache, the same as the newsroom). It renders the existing container, now fed by props instead of
hardcoded JSX, and builds `generateMetadata` from the SEO fields, falling back to today's values. It calls `notFound()`
when the page is null. Public nav and footer hide links to pages that aren't visible.

### Seed

A migration-time seed script writes today's hardcoded content into `content_pages` (text, photo URLs and the
`PastPresidents.json` entries), so the public site renders the same on day one. The hardcoded copy is then removed from
the containers.

### Admin shell and navigation

`/admin` becomes a layout with a left sidebar. Each item is a route, and items the viewer lacks permission for are not
rendered.

| Group           | Item                | Route                                 | Source                                                          |
| --------------- | ------------------- | ------------------------------------- | --------------------------------------------------------------- |
| —               | Overview            | `/admin`                              | new: short landing page with shortcuts to the viewer's sections |
| People & Access | Member access       | `/admin/access`                       | AdminPanel "access" tab                                         |
|                 | Executive committee | `/admin/executive`                    | AdminPanel "executive" tab                                      |
|                 | Batch coordinators  | `/admin/coordinators`                 | AdminPanel "coordinators" tab                                   |
|                 | Current assignments | `/admin/assignments`                  | AdminPanel "assignments" tab                                    |
| Content         | Pages               | `/admin/pages`, `/admin/pages/[slug]` | **new**                                                         |
|                 | Newsroom            | `/admin/newsroom`                     | link to existing `/newsroom/new` flow (unchanged route)         |
| Platform        | Settings            | `/admin/settings`                     | AdminPanel "settings" tab (Super Admin only, as today)          |
|                 | Scholarship         | `/admin/scholarship`                  | `ScholarshipSettings` (Super Admin only, as today)              |

- `AdminPanel.tsx` is split along its existing tab boundaries into one component per section. Their logic and queries
  are unchanged.
- `/billing` (with `/transactions`), `/security` and `/activity` **stay where they are**. They are member-facing (your
  receipts, your sessions and password, your activity), not admin tools, so they are not moved, redirected or linked
  from the admin sidebar.
- Sidebar items are guarded by permission **or** role. Settings and Scholarship keep today's `SUPER_ADMIN` role check,
  so no access behaviour changes.
- **Desktop (≥ md):** a sticky sidebar about 240px wide, with group labels, the active item highlighted, and the content
  on the right.
- **Mobile:** a top bar with the current section name. Tapping it opens a drawer containing the same list.
- Each section page has a header: breadcrumb (`Admin / Content / Pages`), title and one-line description. These are the
  existing per-tab descriptions.

### Page editor UX

- **`/admin/pages` index:** a list of the 7 pages showing name, type, a visible/hidden badge, "Edited 3 days ago by …",
  and actions Edit and View on site.
- **`/admin/pages/[slug]`:** a form generated from the page type.
  - Grouped sections: Content, Photo, SEO, Visibility.
  - Photo field: upload or replace, with a preview and required alt text.
  - People list: rows with drag-to-reorder (keyboard-accessible move up/down), plus add and remove (with confirmation).
  - A sticky action bar with **Save** (disabled until something changes), **View page**, and an unsaved-changes guard
    when leaving the page.
  - Field-level validation messages come from the shared schema.
  - On success, a toast confirms: "Saved. Live on the site now."
- Mode: **Operate.** Precision and restraint. It reuses the site's MUI theme and components, with no new visual
  language.

## Calls left to the builder

- Exact component split and file names inside `containers/AdminPanel/`.
- Whether the sidebar config is one array with `permission` keys (suggested) or per-route guards. Either way, the
  backend remains the authority.
- Sanitiser choice for rich text. Reuse whatever newsroom/blog already use.
- Overview page content beyond shortcuts.
- Order of work. Suggested: backend model + permission + API → seed → public pages read from DB → admin shell + split
  AdminPanel → page editor UI.

## Verification

- With seeded data, each public page's rendered HTML and `<head>` match today's output (apart from intended markup
  changes).
- Permission matrix: each of the 6 allowed positions or roles can open and save. A plain member, an executive committee
  member and a batch coordinator can neither see "Pages" nor call `updateContentPage` (API returns forbidden).
- Hidden page → public 404, menu link gone; editor can still open it in admin.
- Invalid save (empty heading, missing alt) → rejected with field messages, nothing written.
- Mobile 375px: drawer navigation works; editor usable; no horizontal scroll.
- `/billing`, `/security`, `/activity` unchanged for members.
