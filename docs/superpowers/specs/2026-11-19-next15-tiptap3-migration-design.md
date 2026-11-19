# Next.js 15.5 + React 19 + Tiptap 3 migration: design

Date: 2026-11-19 · Repo: `jnvpjaa-web`

## Intent

GitHub reports open vulnerabilities on the web app. The safe lockfile fix and Swiper 12 are already applied (103 → 77 alerts). The remaining real risks are:

- **Next.js 14.2.35**: critical and high advisories, including RCE in the image optimizer, Server Action DoS, SSRF and middleware bypass. Next 14 gets no more fixes; every Next advisory is fixed in **15.5.28+**.
- **Tiptap 2**: 22 moderate alerts (`mergeAttributes` `__proto__` → executable DOM attributes), fixed only in **v3 (≥ 3.30.4)**.

Upgrade both without anything visible breaking. Then prove, against a baseline captured before the upgrade, that the public pages, SEO, security behaviour and availability are unchanged.

## Goals

- `next` 15.5.x (latest patch, currently 15.5.29), `react`/`react-dom` 19, `@types/react*` 19, `eslint-config-next` 15.5.x.
- All `@tiptap/*` on the same 3.x version (latest, ≥ 3.30.4).
- `npm audit`: no critical, and no `next` or `@tiptap/*` entries.
- Every public route returns the same status, SEO head, structured data, SSR content and security headers as the baseline, apart from documented, intended differences.
- Existing stored rich-text content (blogs, newsroom, content pages, events) renders the same and survives an editor load/save round trip without loss.
- Typecheck, lint, unit tests, the Playwright e2e suite and a production build all pass.

## Non-goals

- Next 16, Turbopack builds, the `middleware` → `proxy` rename (all deferred).
- The rest of the build/dev-tool alerts: graphql-codegen, eslint 9, typescript-eslint, lint-staged, next-pwa/workbox.
- Tiptap 3 features, or any other UI changes.
- Fixing the hydration warning that already exists (unless the migration makes it worse, see Risks).

## Anti-goals (a failure even if it builds)

- A public page whose SSR HTML loses its content, title, meta, canonical or JSON-LD (search engines see empty pages).
- Protected routes reachable while signed out, or auth/no-store headers dropped.
- Stored articles that render differently or get rewritten on the next save, such as lost colours, fonts, alignment, YouTube embeds, links or indentation.
- The PWA service worker not generated, or caching wrong things.

## Constraints

- Work happens on `main`. Claude never commits or pushes; the user commits.
- The local stack is web on :3890 and API on :4000. Tests share one DB; e2e runs serially.
- Hosting is Vercel (`@vercel/next`). Build is webpack (`next-pwa` 5 requires it; Next 15 still builds with webpack by default).
- `@apollo/experimental-nextjs-app-support` 0.11.x supports Next ^15 and React 19, so it stays.
- The tenant system (`TENANT`, `tenants/<id>`) must keep working; `npm run tenant:check` and `tenant:leaks` are part of verification.

## Approaches considered

1. **Next 15.5 in stages on one line of work (chosen).** Baseline → Tiptap 3 on Next 14 → React 19 + Next 15.5 → full comparison. Each stage is isolated, verified, and is a commit checkpoint for the user. It fixes every advisory with the smallest change surface.
2. **Next 16.** Turbopack-default builds break `next-pwa`, the Apollo package is renamed, and middleware becomes proxy. That is more risk and no extra security fix. Rejected for now.
3. **Big bang (everything at once).** If something breaks, you can't tell which upgrade caused it. Rejected.

User decisions: Next 15.5 (not 16); stay on `main`.

## What the code touches today (recon)

**Next 15 async request APIs**
- About 14 pages/layouts read `params`/`searchParams`; 16 use `generateMetadata`.
- `headers()` is used in `src/app/batch-coordinators/page.tsx` and `src/utils/isRouterNavigation.ts`. The latter is called synchronously in `blog`, `blog/[id]`, `events` and `events/[id]`, in both page and `generateMetadata`. It must become async, and every caller must `await` it.
- Route handlers: `robots.txt`, `manifest.json` (`force-static`) and `newsroom/feed.xml` (`force-dynamic`). Caching is explicit everywhere (`force-dynamic`, `no-store`), so Next 15's new no-cache defaults don't change behaviour.

**Middleware** (`src/middleware.ts`)
- Adds a router-navigation header based on `sec-fetch-dest: empty`. The comment says "Next 14 strips Flight headers before middleware runs".
- This trick decides whether blog and event pages SSR their data. Direct loads and crawlers must still get full SSR HTML; client navigation must still skip the server fetch.

**React 19**
- MUI 6.5, MUI X 7.29, Apollo 3.13, react-hook-form, react-select, lottie-react, @vercel/analytics and emoji-picker-react support it.
- `react-popper` 2.3 declares only React ≤18 (a peer warning). It must be checked where it is used.
- React 19 removes `element.ref` access, string refs, `propTypes`/`defaultProps` on function components and legacy context. `@types/react` 19 removes the global `JSX` namespace and changes `useRef` to require an argument.

**Tiptap** (all in `src/modules/TipTapTextEditor`)
- `SelectionToolbar.tsx` uses `BubbleMenu` from `@tiptap/react` with `tippyOptions`. In v3 it moves to `@tiptap/react/menus` and uses Floating UI (`options` instead of `tippyOptions`; placement and offset are translated, `appendTo` → body).
- StarterKit 3 bundles Link, Underline and ListKeymap. The separately added `Link` and `Underline` must be configured through StarterKit or disabled there, to avoid duplicate-extension warnings.
- `TextStyle`, `Color` and `FontFamily` become named exports via `@tiptap/extension-text-style`. `history` is renamed `undoRedo` if it's configured.
- A custom `Indentation` extension (`@tiptap/core` `Extension`) and a custom font-size feature need API checks.
- `EditorProvider` under SSR needs `immediatelyRender: false`.
- Rendered (read) content is sanitized with DOMPurify outside Tiptap. This stays unchanged.

**Tests available**
- Playwright e2e: `public-pages`, `regression`, `access-control`, `content-api`, `page-editor`, `tenant-identity`, `tenant-modules`.
- 10 unit tests (`playwright.unit.config.ts`).
- tsc, eslint, `tenant:check`, `tenant:leaks`.

## Design

### Stage 0: Baseline (before any upgrade; Swiper already applied)

1. **Route snapshot tool** `scripts/route-snapshot.mjs` (new; kept in repo, uncommitted).
   - Given a base URL, it builds the list of URLs from:
     - a fixed list: `/`, every static public page, `/blog`, `/events`, `/newsroom`, `/gallery`, `/members` (if public), `/businesses`, `/jobs`, `/student-hub`, `/scholarships`, `/donations`, `/contact-us`, the legal pages, `/signin`, `/signup`, `/forgot-password`;
     - every URL in `/sitemap.xml`, capped at a sensible number per section;
     - probes: an unknown path (404), a disabled-module path, a protected path while signed out (expects a redirect to `/signin?r=…`), `/robots.txt`, `/sitemap.xml`, `/newsroom/feed.xml`, `/manifest.json` and `/sw.js`.
   - For each URL it records, from a **plain HTTP fetch with no JS** (what crawlers see):
     - final status and redirect chain;
     - headers: security headers from `next.config.js` `headers()`, `cache-control`, `x-robots-tag`, `content-type`;
     - `<title>`, meta description, robots meta, canonical, `og:*` and `twitter:*`, hreflang;
     - JSON-LD `@type`s and a hash of each block;
     - the `h1`, and the length and hash of visible main text;
     - TTFB and total time;
     - for XML/text routes, a body hash.
   - It writes JSON. A `--diff a.json b.json` mode prints differences per URL and per field.
2. **Rich-text corpus.**
   - Export the stored HTML of every editor surface from the local API into a fixture: blogs, newsroom items, content pages, events, job posts, discussions, comments and profile "about me".
   - The local DB holds test data only (confirmed by the user). Add a **live-site sample**: the article bodies of about 30 public blog posts, newsroom items, events and content pages, read with plain GET requests from the public site (`jnvpjaa.org`). These are the already-sanitized stored bodies of real content, as visitors see them. Read-only, public pages only, nothing signed in.
   - Add a hand-built fixture that uses every editor feature: each mark, heading levels, both list types, alignment, indentation, colour, font family, links, image, YouTube, blockquote, plus a stray font-size style.
   - Record, in the real editor under Tiptap 2, each item's load → `getHTML()` output.
   - This is the round-trip reference for Stage 1.
3. **Production-build baseline.**
   - Stop the dev server, `npm run build`, then `next start -p 3890` against the local API.
   - Run the snapshot and capture:
     - the build output (route sizes and first-load JS);
     - the full e2e suite and unit tests;
     - `npm audit` counts;
     - Lighthouse (SEO, Best Practices and Accessibility categories) on `/`, one blog post, `/newsroom` and `/about`.
   - Known failures at baseline are recorded, so they aren't blamed on the migration.

### Stage 1: Tiptap 3 (still Next 14 / React 18)

- Bump every `@tiptap/*` to the same 3.x version. Add `@floating-ui/dom` if `BubbleMenu` needs it as a peer. Remove unused v2-only packages that StarterKit 3 now includes, but only where the import is gone.
- Port `SelectionToolbar`, the StarterKit config, the text-style imports, `Indentation`, font size and `immediatelyRender`.
- Verify:
  - tsc, lint and unit tests;
  - the corpus round trip, both the exported and the hand-built fixture (v3 load → `getHTML()` equals v2 output, or only harmless attribute-order or whitespace differences, each reviewed);
  - the page-editor e2e;
  - a manual browser pass of every toolbar control: marks, headings, lists, alignment, indent, colour, font family and size, links, image, YouTube, blockquote and the selection toolbar's placement;
  - paste of hostile HTML (`<img onerror>`, `__proto__` attributes) leaves nothing executable.
- **Checkpoint:** a green report → the user commits.

### Stage 2: React 19 + Next 15.5

1. Run `npx @next/codemod@latest upgrade` targeting 15.5. It bumps next, react, react-dom, the types and eslint-config-next, and applies the async-request-API and React 19 codemods. Review every change.
2. Fix what codemods miss:
   - make `isRouterNavigation` async and `await` it in all 6 call sites;
   - `headers()` in batch-coordinators;
   - `params`/`searchParams` are Promises in pages, layouts and `generateMetadata`;
   - client components that receive `params` use `React.use()` or stay as they are via `useParams`;
   - fallout from the React 19 types (`useRef()` args, the `JSX` namespace, `ReactElement` props typed `unknown`).
3. Re-check the middleware router-navigation behaviour under Next 15:
   - a direct GET returns full SSR HTML with data and metadata;
   - client navigation from `/blog` to a post does not do a server data fetch, and the page still renders.

   If Next 15 now exposes the `RSC` header to middleware, keep the `sec-fetch-dest` logic. Changing it is out of scope unless it breaks.
4. `next-pwa` 5 still runs under the webpack build. Confirm `public/sw.js` and `workbox-*.js` are generated and the precache list hasn't grown.
5. Apollo: `ApolloWrapper` and the server client under React 19 need the SSR data hydration and the signed-in session to work.
6. Verify (full gate below). **Checkpoint:** the user commits.

### Stage 3: Full verification (production build vs baseline)

All of it must pass, or have a reviewed, written explanation.

- **Build:** tsc, lint, unit tests, `npm run build`, `tenant:check`, `tenant:leaks`. The build has no new warnings; route sizes stay within +10% of baseline, and any increase is explained.
- **Public pages / SEO:**
  - `route-snapshot --diff` shows zero unexplained differences in status, title, description, canonical, robots, OG/Twitter, JSON-LD and h1/main text;
  - sitemap, robots, the feed and the manifest are byte-identical;
  - Lighthouse SEO and Best Practices scores are no lower than baseline.
- **Security:**
  - `npm audit` has no critical, and no `next` or `@tiptap` entries;
  - the security headers match;
  - protected routes redirect while signed out, and auth routes redirect while signed in;
  - `/auth/google` keeps `no-store`, `no-referrer` and `noindex`;
  - the access-control e2e passes;
  - rendered content is still sanitized (hostile corpus item);
  - no new console errors that reveal secrets or stack traces in production HTML.
- **Availability:**
  - every snapshot URL answers with the expected status (no 5xx);
  - 404 and disabled-module pages return real 404s;
  - error boundaries render;
  - TTFB median per page type is within +20% of baseline;
  - the service worker installs, and an offline reload of a visited page behaves as before;
  - the signed-in flows in the regression e2e load cleanly.
- **UI pass:** screenshots at 1366px and 375px of the home page, a blog post, the newsroom, events, gallery, sign-in, profile, the admin overview and the editor, compared with baseline screenshots. Hydration errors don't increase.

Deliverable: a short verification report, `docs/superpowers/specs/2026-11-19-next15-tiptap3-migration-report.md`, with the baseline vs after numbers and the list of explained differences.

### Rollback

Each stage starts from a user commit. While a stage is in progress, `package.json` and `package-lock.json` are backed up to the scratchpad, so a stage can be reverted without git. If Stage 2 can't be made green, Stage 1 (Tiptap 3) can still ship on its own.

## Settled after review

- **Font size stays as it is today.** The `FontSize` extension is commented out and `FontSizeSelect` does nothing, so v2 drops font-size styles on load. v3 must behave the same: no FontSize from `TextStyleKit`. The manual toolbar pass skips font size. Enabling it would be a new feature and is a non-goal.
- **Sanitizing happens on save in the backend** (`sanitizeHTMLInput` / `sanitize-html` for blog, event, newsroom, jobs, content pages, user). `NewsArticle`, `JobDetail` and `PageRichText` render HTML that was already cleaned on save. So the hostile-content check saves through the real API and then views the public page, rather than injecting HTML into the renderer. Nothing changes here.
- **Verification builds never talk to production.** The build runs with `NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/client` (plus the normal prebuild step) instead of `npm run build`'s production endpoint.
- **Data stays stable between runs.** The route snapshot runs before the e2e suite in both the baseline and the after run, and the e2e teardown restores what it changes. A content difference in the diff is first checked against the DB before it's treated as a regression.

## Left to the builder

- Exact URL caps per sitemap section, and the TTFB sampling count (my call: 3 runs, median).
- The way the corpus round trip runs: a Playwright page script in the real editor, or `@tiptap/html` in node. Either works if it uses the same extension list as the editor.
- Whether to keep `route-snapshot.mjs` permanently (my call: yes, it's useful for future upgrades).

## Calls I made (not discussed)

- The real-content round trip uses a public sample from the live site, because the local DB holds only test data.

- Verification runs against a **local production build** (`next build && next start`), not the dev server. The dev server is stopped during it and restarted afterwards.
- Each stage ends with a pause so you can commit a checkpoint, since I don't commit.
- Lighthouse runs from the installed Playwright Chromium via `npx lighthouse`. Nothing is added to `package.json`.
- The hydration warning that already exists stays out of scope, but its count is tracked.
