# Next.js 15.5 + React 19 + Tiptap 3 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `jnvpjaa-web` to Next 15.5.x / React 19 and Tiptap 3, and prove against a pre-upgrade baseline that public pages, SEO, security and availability are unchanged.

**Architecture:**
- Build guards first: a route snapshot tool, an editor round-trip spec, and SSR/sanitize/slug specs. Record a baseline on a local production build of today's code.
- Then upgrade in two isolated stages: Tiptap 3 on Next 14, then React 19 + Next 15.5.
- Finish with a full diff against the baseline and a written report.

**Tech Stack:** Next.js (App Router, webpack build), React, MUI 6, Apollo Client 3.13 + `@apollo/experimental-nextjs-app-support` 0.11, Tiptap, next-pwa 5, Playwright, Node 22 (`$HOME/.nvm/versions/node/v22.23.4/bin`).

**Spec:** `docs/superpowers/specs/2026-11-19-next15-tiptap3-migration-design.md`

## Global Constraints

- **Branch and commits:** work on `main`. Claude never runs `git commit`, `git push` or `git stash`. "Checkpoint" steps stop and ask the user to commit.
- **Target versions:**
  - `next` and `eslint-config-next`: latest 15.5.x (≥ 15.5.28, currently 15.5.29);
  - `react`, `react-dom`, `@types/react`, `@types/react-dom`: 19.x;
  - every `@tiptap/*`: the same 3.x, ≥ 3.30.4.
- **Out of scope:** Next 16, Turbopack, middleware→proxy, eslint 9, graphql-codegen upgrades, next-pwa replacement, new editor features (font size stays off).
- **Never touch production:** verification builds use `NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/client`. Reading public pages of `https://jnvpjaa.org` (plain GET, signed out) is the only production access allowed.
- **Before every `package.json`/lockfile change:** copy both files to `$SCRATCH/pkg-backup-<stage>/`, where `$SCRATCH=/private/tmp/claude-501/-Users-onejeet--claude-personal-spares-spare-V5FzGa/fb6ce4e7-8937-4c4c-8b93-73e9be415d8b/scratchpad`.
- **Migration artifacts** (snapshots, reports, screenshots) go to `docs/superpowers/migration/{baseline,after}/`.

## Review Focus

1. **Non-ASCII (Hindi) slugs on blog and newsroom.** Next 15 changes how `params` are delivered. A Devanagari slug URL must still return 200 with its content. Pinned in Task 2 (`e2e/migration-guards.spec.ts` → `hindi slug`).
2. **Visitors with the old service worker installed.** After deploying the new build they must get the update prompt from `ServiceWorkerUpdater` (`skipWaiting: false`), not a broken app (ChunkLoadError). Pinned in Task 7, step 5.
3. **Pasting from Word / Google Docs into the v3 editor.** Paste rules changed in v3, and the result must keep basic formatting and keep no inline scripts. Pinned in Task 4, step 6.
4. **Blog/event client navigation vs direct load.** A direct GET must contain the article text in raw HTML (crawlers). Client navigation must still render the page. Pinned in Task 2 (`ssr content on direct load`, `client navigation renders`).
5. **The signed-in header on public pages** (Apollo SSR + cookies under React 19). There must be no extra hydration errors and the user menu must show. The existing `regression.spec.ts` "signed-in … loads cleanly" covers it, and Task 7 compares hydration-error counts.

---

### Task 1: Route snapshot tool

**Files:**
- Create: `scripts/route-snapshot.mjs`
- Test: `tests/route-snapshot.test.cjs`

**Interfaces:**
- Produces:
  - `parsePage(html: string, headers: Record<string,string>) -> PageFacts`, where `PageFacts = { title, description, robots, canonical, og: Record<string,string>, twitter: Record<string,string>, hreflang: string[], jsonLdTypes: string[], jsonLdHashes: string[], h1: string|null, textLength: number, textHash: string, security: Record<string,string>, cacheControl, xRobotsTag, contentType }`.
  - `security` keeps exactly the header names set in `next.config.js` `headers()`, plus `strict-transport-security`, `content-security-policy` and `referrer-policy`, if present.
  - `diffSnapshots(a: Snapshot, b: Snapshot) -> Array<{url, field, before, after}>`.
- CLI:
  - `node scripts/route-snapshot.mjs --base http://localhost:3890 --out <file.json> [--sitemap-cap 15] [--runs 3]`
  - `node scripts/route-snapshot.mjs --diff <a.json> <b.json>` (exit 1 when there are differences).
- URL list (in this order, deduped):
  - `/`, `/about`, `/vision`, `/president-message`, `/principal-message`, `/secretary-message`, `/past-presidents`, `/bhamashah-pillars`, `/executive-committee`, `/batch-coordinators`, `/blog`, `/events`, `/newsroom`, `/gallery`, `/businesses`, `/jobs`, `/student-hub`, `/scholarships`, `/donations`, `/contact-us`, `/privacy_policy`, `/terms_condition`, `/signin`, `/signup`, `/forgot-password`;
  - sitemap URLs (rewritten to `--base`), at most `--sitemap-cap` per first path segment;
  - probes: `/this-does-not-exist-xyz` (expects 404), `/profile` signed out (expects a redirect to `/signin?r=…`), `/robots.txt`, `/sitemap.xml`, `/newsroom/feed.xml`, `/manifest.json`, `/sw.js`.
- Per URL it records:
  - the redirect chain (`redirect: 'manual'`, followed by hand);
  - `PageFacts` for HTML, or `bodyHash` for non-HTML;
  - median `ttfbMs` and `totalMs` over `--runs`.

- [ ] **Step 1: Write the failing test.** `tests/route-snapshot.test.cjs` dynamic-imports the module and asserts:
  - `parsePage` on an inline HTML sample (title, description, canonical, two JSON-LD blocks `Organization` and `WebPage`, an `h1`, `og:title`) returns those exact values, `jsonLdTypes` sorted as `['Organization','WebPage']`, and `textLength > 0`;
  - `diffSnapshots` on two snapshots that differ only in one URL's `title` returns exactly one entry `{url, field:'title'}`.
- [ ] **Step 2: Run it.** `node --test tests/route-snapshot.test.cjs`. Expected: FAIL (module not found).
- [ ] **Step 3: Implement** `scripts/route-snapshot.mjs`.
  - Node 22 `fetch` and regex/string parsing only. No new dependencies.
  - Visible text = `<main>` (or `<body>`) with tags, `<script>` and `<style>` stripped, whitespace collapsed.
  - Hash = sha256 hex, first 16 characters.
- [ ] **Step 4: Run it.** `node --test tests/route-snapshot.test.cjs`. Expected: PASS.
- [ ] **Step 5: Smoke it** against the running dev server: `node scripts/route-snapshot.mjs --base http://localhost:3890 --out $SCRATCH/smoke.json --runs 1`. Expected: exits 0, with more than 30 URLs and no `fetch failed` entries.

### Task 2: Migration guard specs and editor corpus

**Files:**
- Create: `scripts/export-editor-corpus.mjs`, `e2e/fixtures/editor-corpus/handbuilt.json`, `e2e/editor-roundtrip.spec.ts`, `e2e/migration-guards.spec.ts`
- Generated: `e2e/fixtures/editor-corpus/local.json`, `e2e/fixtures/editor-corpus/live.json`, `e2e/fixtures/editor-corpus/expected.json`

**Interfaces:**
- Corpus item: `{ id: string, source: 'local'|'live'|'handbuilt', kind: 'blog'|'newsroom'|'contentPage'|'event'|'job'|'discussion'|'comment'|'aboutMe', html: string }`.
- `expected.json`: `Record<id, string>`. This is the `getHTML()` result after loading the item into the editor, recorded on Tiptap 2.
- Editor access in the browser: `document.querySelector('.ProseMirror').editor` (Tiptap sets `view.dom.editor`). Use `editor.commands.setContent(html, false)` then `editor.getHTML()`.

- [ ] **Step 1: Write `handbuilt.json`.** Write about 12 items, one per feature:
  - bold/italic/underline/strike/code; h1–h3; bullet + ordered + nested lists; `text-align` center/right/justify; a paragraph with `style="margin-left: 40px"` (indentation); `<span style="color: #c00">`; `<span style="font-family: Georgia">`; `<span style="font-size: 20px">` (must be dropped, as today); `<a href="https://…">`; `<img src=… alt=…>`; a YouTube iframe (nocookie); a blockquote; an empty doc.
  - Plus one hostile item: `<img src=x onerror="window.__xss=1"><a href="javascript:alert(1)">x</a><p __proto__="y">z</p>`.
- [ ] **Step 2: Write `scripts/export-editor-corpus.mjs`.**
  - `--local` queries the local API (`http://localhost:4000/client`, using the persona token from `e2e/.state/tokens.json` where needed) for the HTML bodies of every editor surface listed in the interface, up to 50 per kind, and writes `local.json`.
  - `--live` reads about 30 public pages from `https://jnvpjaa.org` (newest blog posts, newsroom items, events, and `/about` `/vision` content pages, found via its `sitemap.xml`), extracts the article body container's inner HTML, and writes `live.json`.
  - User-Agent is a generic `jnvpjaa-migration-check`. Signed-out GET only.
  - Run both. Expected: each file is non-empty, and `live.json` has 20 or more items.
- [ ] **Step 3: Write `e2e/editor-roundtrip.spec.ts`.**
  - Signed in as the member persona, open `/blog/new`, wait for `.ProseMirror`.
  - For every corpus item, compute the round-trip HTML.
  - With `RECORD=1`, write `expected.json`. Otherwise run `expect(roundTrip).toBe(expected[id])` per item, so failures list the ids.
  - Never click save.
  - Separately, for the hostile item: after `setContent`, `window.__xss` is undefined and the editor DOM has no `onerror` attribute and no `javascript:` href.
- [ ] **Step 4: Write `e2e/migration-guards.spec.ts`** with these tests:
  - `ssr content on direct load`: a plain `request.get` of one blog post, one event and one newsroom item (found from `/sitemap.xml`) returns 200, and the raw HTML contains the item's `h1` text and a non-empty `<title>` that isn't the generic fallback (`Blog | …` / `Event | …`).
  - `client navigation renders`: `page.goto('/blog')`, click the first post link, the URL changes, the post `h1` is visible, and there are no new console errors except known hydration ones (count them and attach the count).
  - `hindi slug`: take a blog or newsroom sitemap URL whose path has non-ASCII (`/[^\x00-\x7F]/` after `decodeURI`). If none exists locally, create one through the API in the test (title `परीक्षा लेख`) and delete it in teardown. The page returns 200 and shows its title.
  - `sanitized on save`: via the API as the member persona, create a blog/newsroom draft with the hostile HTML from `handbuilt.json`, publish it if the persona can (otherwise use the persona that can), open the public page, assert `window.__xss` is undefined and no `[onerror]` or `a[href^="javascript:"]` is in the article. Delete it afterwards.
  - `protected and auth redirects`: signed out, `/profile` redirects to `/signin?r=<base64('/profile')>`. Signed in, `/signin` redirects to `/profile`. `/auth/google` responds with `cache-control` containing `no-store`, `referrer-policy: no-referrer` and `x-robots-tag` containing `noindex`.
- [ ] **Step 5: Run on the current code** (dev server, Tiptap 2, Next 14): `RECORD=1 npx playwright test e2e/editor-roundtrip.spec.ts`, then `npx playwright test e2e/editor-roundtrip.spec.ts e2e/migration-guards.spec.ts`. Expected: all PASS.
  - If a guard fails on today's code, it's a finding about the baseline, not the guard. Record it in the baseline report as a known failure and mark the test `test.fixme` with a reason. Do not weaken the assertion.

### Task 3: Baseline on a production build

**Files:**
- Create: `docs/superpowers/migration/baseline/` (`snapshot.json`, `build.txt`, `e2e.txt`, `unit.txt`, `audit.json`, `lighthouse/*.json`, `screens/*.png`), `docs/superpowers/specs/2026-11-19-next15-tiptap3-migration-report.md` (Baseline section)

- [ ] **Step 1: Prepare.** Stop the dev server (background shell `b6168ac3v`, or whatever serves :3890). Make sure the API is up on :4000 and the personas exist (`e2e/README.md` step 1).
- [ ] **Step 2: Build.** `rm -rf .next public/sw.js public/workbox-*.js && node scripts/tenant-assets.js && NEXT_PUBLIC_NODE_ENV=production NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/client npx next build 2>&1 | tee docs/superpowers/migration/baseline/build.txt`. Expected: success; `public/sw.js` exists.
  - Then copy `public/sw.js` to `docs/superpowers/migration/baseline/sw.js`.
  - Copy `.next/` and `public/` to `$SCRATCH/baseline-build/` (for Task 7 Step 5).
  - Also take the live pre-deploy reference: `node scripts/route-snapshot.mjs --base https://jnvpjaa.org --out docs/superpowers/migration/baseline/live.json --runs 1`.
- [ ] **Step 3: Serve** with `NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/client npx next start -p 3890`, run in the background.
- [ ] **Step 4: Capture, in this order:**
  1. `node scripts/route-snapshot.mjs --base http://localhost:3890 --out docs/superpowers/migration/baseline/snapshot.json`;
  2. `npm run test:unit` and `node --test tests/` → `unit.txt`;
  3. `npm run test:e2e` → `e2e.txt`;
  4. `npm audit --json` → `audit.json`;
  5. `npx tsc --noEmit -p .`, `npm run lint`, `npm run tenant:check`, `npm run tenant:leaks` (pass or fail recorded);
  6. `npx lighthouse <url> --only-categories=seo,best-practices,accessibility --output=json --chrome-flags="--headless"` for `/`, one blog post, `/newsroom` and `/about`;
  7. Playwright screenshots at 1366×900 and 375×812 of `/`, a blog post, `/newsroom`, `/events`, `/gallery`, `/signin`, `/profile` (member), `/admin` (president) and `/blog/new`, saved to `screens/<name>-<width>.png`, with the hydration-error console count per page.
- [ ] **Step 5: Write the report's Baseline section:**
  - versions; route count; e2e pass/fail list (known failures named); first-load JS per route from `build.txt`; Lighthouse scores; TTFB median per page type; audit counts; hydration-error counts.
  - Then stop `next start` and restart the dev server.

### Task 4: Tiptap 3 (Next 14 / React 18)

**Files:**
- Modify: `package.json`, `package-lock.json`, `src/modules/TipTapTextEditor/TipTapTextEditor.tsx`, `src/modules/TipTapTextEditor/EditorToolbar/SelectionToolbar.tsx`, `src/modules/TipTapTextEditor/components/Indentation.tsx` (only if its API breaks), any toolbar component that `tsc` flags.

**Interfaces:**
- Consumes: `e2e/editor-roundtrip.spec.ts` + `expected.json` (Task 2).

- [ ] **Step 1: Bump the packages.** Back up the package files. Set every `@tiptap/*` dependency to the same `^3.x` (≥ 3.30.4). Remove `@tiptap/extension-underline` and `@tiptap/extension-link` only if StarterKit 3 provides them and nothing else imports them. Add `@floating-ui/dom` if `@tiptap/react/menus` declares it as a peer. Run `npm install`.
- [ ] **Step 2: Port the editor:**
  - `StarterKit.configure({ link: { protocols: ['https'], openOnClick: false }, underline: {} })` replaces the standalone `Link`/`Underline` (or keeps the standalone ones with `StarterKit.configure({ link: false, underline: false })`, whichever keeps the round trip identical);
  - `import { TextStyle, Color, FontFamily } from '@tiptap/extension-text-style'`; do not add `FontSize` or `TextStyleKit`;
  - `immediatelyRender={false}` on `EditorProvider`;
  - `SelectionToolbar` imports `BubbleMenu` from `@tiptap/react/menus` and passes `options={{ placement: 'bottom-start', offset: 6 }}`, with the menu appended to `document.body` (v3 `appendTo` option);
  - `FontSizeSelect` keeps its current no-op behaviour (still compiles).
- [ ] **Step 3: Check types and lint.** `npx tsc --noEmit -p . && npx eslint src/modules/TipTapTextEditor`. Expected: clean.
- [ ] **Step 4: Run the round trip.** `npx playwright test e2e/editor-roundtrip.spec.ts e2e/page-editor.spec.ts` (dev server). Expected: PASS.
  - If an item differs, look at the diff. If it's harmless (only attribute order, or whitespace between tags), update that id in `expected.json` and list it in the report under "accepted differences" with the before and after.
  - If content is lost (a mark, style, attribute or embed), fix the extension config. Never accept a loss.
- [ ] **Step 5: Manual toolbar pass** in the browser pane on `/blog/new`: every vertical toolbar control and the selection toolbar (opens below the selection, stays usable at 375px width). Font size is expected to do nothing, as today.
- [ ] **Step 6: Paste check (Review Focus 3).** Paste a clipboard HTML sample shaped like Word/Google Docs output (bold, a list, a coloured span, `<script>` and `onclick`). Use `ClipboardEvent` with `DataTransfer` dispatched on `.ProseMirror`. Expected: bold, list and colour are kept; no `<script>` and no `onclick` in `getHTML()`. Add this as a test `paste keeps formatting and drops scripts` in `e2e/editor-roundtrip.spec.ts`.
- [ ] **Step 7: Audit.** `npm audit --json`: no `@tiptap/*` entries.
- [ ] **Step 8: Checkpoint.** Report the results to the user and ask them to commit "Tiptap 3". Wait.

### Task 5: React 19 + Next 15.5 code migration

**Files:**
- Modify: `package.json`, `package-lock.json`, `src/utils/isRouterNavigation.ts`, its 6 call sites (`src/app/blog/page.tsx`, `src/app/blog/[id]/page.tsx` ×2, `src/app/events/page.tsx`, `src/app/events/[id]/page.tsx` ×2), `src/app/batch-coordinators/page.tsx`, the 14 route files using `params`/`searchParams` (`gallery/[id]`, `admin/pages/[slug]`, `admin/[section]`, `newsroom/[slug]`, `newsroom`, `newsroom/new`, `blog/[id]`, `profile/[id]`, `jobs`, `jobs/new`, `scholarships/[id]`, `jobs/[slug]`, `events/[id]`, `jobs/[slug]/applicants`), and whatever `tsc` flags.

**Interfaces:**
- Produces: `isRouterNavigation(): Promise<boolean>`.

- [ ] **Step 1: Run the upgrade codemod.** Back up the package files. `npx @next/codemod@latest upgrade` → choose 15.5.x (the latest 15.5 patch, not 16). Accept the React 19, async request API and types codemods. Then pin `next` and `eslint-config-next` to that exact 15.5.x and run `npm install`.
- [ ] **Step 2: Review the codemod diff.** Any `UnsafeUnwrapped` casts or `@next-codemod-error` comments it leaves must be replaced with a proper `await`/`React.use()`. `grep -rn "UnsafeUnwrapped\|@next-codemod" src` → no output.
- [ ] **Step 3: Make `isRouterNavigation` async.** `return (await headers()).get(ROUTER_NAVIGATION_HEADER) === '1'`, and `await` it in all 6 call sites (in `generateMetadata` too). Make `headers()` in batch-coordinators awaited.
- [ ] **Step 4: Fix the React 19 type fallout:**
  - `useRef<T>()` → `useRef<T>(null)` or `useRef<T | undefined>(undefined)`;
  - the global `JSX` → `React.JSX`;
  - `element.props` typed `unknown` → narrow it;
  - no `defaultProps` on function components (`grep -rn "defaultProps\|propTypes" src` → none on function components);
  - `react-popper`: confirm where it's used, and that it compiles and works (peer warning only).
- [ ] **Step 5: Run static checks.** `npx tsc --noEmit -p . && npm run lint && npm run test:unit && node --test tests/ && npm run tenant:check`. Expected: all pass. (`next lint` still exists in 15.5.)
- [ ] **Step 6: Dev smoke.** Restart the dev server, load `/`, a blog post, `/newsroom`, `/events`, `/profile` (signed in) and `/blog/new`. There must be no new console errors compared with the baseline counts.

### Task 6: Next 15 behaviour checks (middleware, PWA, Apollo)

**Files:**
- Modify: only if a check fails: `src/middleware.ts`, `next.config.js`, `src/apollo/*`.

- [ ] **Step 1: Guards.** `npx playwright test e2e/migration-guards.spec.ts e2e/editor-roundtrip.spec.ts` (dev). Expected: PASS.
  - If `ssr content on direct load` or `client navigation renders` fails, inspect which headers middleware sees under Next 15 (`sec-fetch-dest`, `rsc`, `next-router-state-tree`). Make the smallest change that restores both behaviours: keep `sec-fetch-dest` and add `rsc: 1` as a router-navigation signal only if needed.
- [ ] **Step 2: PWA.** Do a production build exactly as in Task 3 Step 2. Expected:
  - `public/sw.js` and `workbox-*.js` exist;
  - the precache manifest in `sw.js` lists no `images/**` and is no more than 10% larger (entry count) than the baseline `sw.js`. Save a copy of the baseline `sw.js` as `docs/superpowers/migration/baseline/sw.js` in Task 3 if it isn't there.
- [ ] **Step 3: Apollo SSR.** On the production build, load a blog post signed out and signed in (member cookie): the SSR HTML contains data, there are no `ApolloError`/hydration errors beyond the baseline count, and the signed-in header shows the user menu.
- [ ] **Step 4: Checkpoint.** Report to the user and ask them to commit "Next 15.5 + React 19". Wait.

### Task 7: Full verification against the baseline

**Files:**
- Create: `docs/superpowers/migration/after/` (same files as the baseline)
- Modify: `docs/superpowers/specs/2026-11-19-next15-tiptap3-migration-report.md` (After + Differences + Verdict sections)

- [ ] **Step 1: Capture.** Repeat Task 3 Steps 1–4 exactly, writing to `after/`.
- [ ] **Step 2: Diff and gate.** `node scripts/route-snapshot.mjs --diff docs/superpowers/migration/baseline/snapshot.json docs/superpowers/migration/after/snapshot.json`. Gates:
  - **SEO and status:** zero unexplained differences in status, redirects, title, description, robots, canonical, og/twitter, JSON-LD types/hashes, h1, `textHash`, security headers, cache-control and x-robots-tag;
  - **XML/text routes:** the bodies of `robots.txt`, `sitemap.xml`, `feed.xml` and `manifest.json` are identical (sitemap `lastmod` drift explained if present);
  - **Speed:** TTFB median per page type ≤ 120% of baseline.

  Each remaining difference is either fixed or written into the report with a reason.
- [ ] **Step 3: Other gates:**
  - **e2e and unit:** e2e pass set ⊇ baseline pass set, and unit tests all pass;
  - **audit:** no critical, no `next`/`@tiptap` entries;
  - **Lighthouse:** SEO and Best Practices ≥ baseline per URL, Accessibility ≥ baseline − 2;
  - **first-load JS:** per route ≤ 110% of baseline (or explained);
  - **hydration errors:** count per page ≤ baseline;
  - **tooling:** `tenant:check` and `tenant:leaks` pass.
- [ ] **Step 4: Screenshots.** Compare the after screenshots with the baseline pairwise (look at each pair). List any visual change in the report.
- [ ] **Step 5: Existing service worker (Review Focus 2).**
  - In one Playwright persistent context, visit `/` on the **baseline** build so its SW installs. To serve it, temporarily restore `$SCRATCH/baseline-build/` into a copy of the repo at `$SCRATCH/baseline-app/`, then run `next start` there. Never overwrite the working tree.
  - Then serve the **after** build on the same port and reload.
  - Expected: no `ChunkLoadError` or blank page, and the `ServiceWorkerUpdater` update prompt appears (or the page loads the new build).
  - Record the result in the report.
- [ ] **Step 6: Verdict.** Write the report's Verdict section with: what changed, every accepted difference, known failures carried over from the baseline, and anything not verified (e.g. real Vercel deploy, real-device PWA). Restart the dev server.
- [ ] **Step 7: Hand over.** Summarize for the user. They commit and deploy, and should do a post-deploy smoke of `https://jnvpjaa.org` using `node scripts/route-snapshot.mjs --base https://jnvpjaa.org --out after-deploy.json --runs 1`, diffed against `docs/superpowers/migration/baseline/live.json`.
