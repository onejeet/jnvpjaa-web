# Next 15.5 / React 19 / Tiptap 3 migration — verification report

Spec: `2026-11-19-next15-tiptap3-migration-design.md` · Plan: `../plans/2026-11-19-next15-tiptap3-migration.md`
Evidence: `docs/superpowers/migration/{baseline,after}/`

## Baseline (before any upgrade)

Taken on 2026-11-19 from a local **production** build (`next build` + `next start -p 3890`, GraphQL → local API on :4000,
test data only). The read-only live reference is `baseline/live.json` (86 URLs, signed-out GETs of jnvpjaa.org).

### Versions

| Package | Installed |
|---|---|
| next / eslint-config-next | 14.2.35 |
| react / react-dom | 18.3.1 |
| @tiptap/* | 2.27.3 |
| @mui/material | 6.5.0 |
| @apollo/client · experimental-nextjs-app-support | 3.13.8 · 0.11.11 |
| next-pwa | 5.6.0 |
| typescript | 5.5.4 |
| swiper | 12.2.0 |

### Build

- Build succeeds; 58 routes; `public/sw.js` is generated (copy: `baseline/sw.js`; the full `.next`/`public` copy is kept in
  the session scratchpad for the old service worker test in Task 7).
- First Load JS shared by all routes: **87.9 kB**. Middleware: 47.6 kB.

| Route | First Load JS |
|---|---|
| `/` | 392 kB |
| `/about` | 345 kB |
| `/blog` · `/blog/[id]` | 357 kB · 462 kB |
| `/events` · `/events/[id]` | 370 kB · 455 kB |
| `/newsroom` · `/newsroom/[slug]` | 357 kB · 357 kB |
| `/gallery` | 345 kB |
| `/jobs` | 390 kB |
| `/signin` | 377 kB |
| `/profile` | 766 kB |
| `/admin` | 271 kB |

### Route snapshot (`baseline/snapshot.json`)

71 URLs (static pages, sitemap URLs, probes), 0 fetch failures; 69 × 200 and 2 × 404 (the not-found probe, and `/student-hub`,
which has no index page; its sub-pages answer 200).
Probes: `/profile` → `308 /profile/` → `307 /signin/?r=L3Byb2ZpbGUv`; `/this-does-not-exist-xyz` → 308 → 404; `/sw.js`,
`/robots.txt` → 200.

Median TTFB by page type (local, 3 runs each): home 41 ms · blog detail 31 ms · gallery detail 25 ms · newsroom detail
6 ms · static pages 1 ms (first hop is the trailing-slash 308) · assets 2 ms.

### Tests and checks

| Check | Result |
|---|---|
| `npm run test:unit` | 24 passed |
| `node --test tests/*.test.cjs` | 23 / 26 pass. **Known failures:** `admin-nav`, `content-pages`, `newsroom-utils` load TS modules through the `@/` alias, which plain Node can't resolve (already failing before this work) |
| `npm run test:e2e` | **102 passed, 1 failed, 2 skipped** |
| `npx tsc --noEmit` | clean |
| `npm run lint` | 0 errors, 7 `react-hooks/exhaustive-deps` warnings |
| `npm run tenant:check` / `tenant:leaks` | ok / ok (0 hits) |
| `npm audit` | 77 total — 1 critical (`next`), 41 high, 35 moderate |
| Editor round-trip (`e2e/editor-roundtrip.spec.ts`) | 46 corpus items recorded in `e2e/fixtures/editor-corpus/expected.json`; hostile HTML leaves nothing executable |
| Migration guards (`e2e/migration-guards.spec.ts`) | 7 / 7 pass |

Known e2e failure: `tenant-identity › JNVPJAA renders identically to the pre-migration baseline`. Its stored head
snapshot was recorded on the dev server; the production head has a different `apple-touch-icon` and no
`emotion-insertion-point` meta. This isn't a regression and it isn't caused by the migration. The after-run must show
the same single failure, with the same diff.

E2E harness change: the console-noise filter in `e2e/support.ts` now ignores `/_vercel/*`. A local production build
loads Vercel Analytics' `/_vercel/insights/script.js`, which only Vercel serves, and that one console error failed 38
tests on the first run.

Baseline editor behaviour worth knowing (recorded, not fixed): Tiptap 2 already drops `margin-left` indentation and
inline `font-size` when stored HTML is loaded into the editor (`hb:indent`, `hb:font-size`). Tiptap 3 has to match
this, not "fix" it.

### Hydration errors (`baseline/hydration.json`)

Counted per page from console errors, including minified React #418/#419/#421/#422/#423/#425:
blog post **8** at both widths (known, pre-existing); every other captured page **0** — `/`, `/newsroom`, `/events`,
`/gallery`, `/signin`, `/profile` (member), `/admin` (president), `/blog/new` (member), at 1366×900 and 375×812.
Screenshots: `baseline/screens/<page>-<width>.png`.

### Lighthouse

**Not captured.** Running `npx -y lighthouse` was blocked by this session's permission policy because it downloads a
package. SEO-relevant facts (title, description, robots, canonical, OG/Twitter, hreflang, JSON-LD, h1, security
headers, status and redirects) are covered by the route snapshot diff instead. To add Lighthouse scores, install
`lighthouse` as a dev dependency or allow the download, then run both baseline and after.

## Tiptap 3

### Accepted differences (editor round trip)

| Item | Before (Tiptap 2) | After (Tiptap 3) | Why it's accepted |
|---|---|---|---|
| `hb:youtube` | iframe `src="…embed/ID?controls=0&modestbranding=1"` (with a `rel="1"` attribute) | `src="…embed/ID?controls=0&modestbranding=1&rel=1"` | Tiptap 3's YouTube extension appends the stored `rel` attribute to the embed URL. `rel=1` is YouTube's default, so the player behaves the same. Nothing is lost; avoiding it would mean forking the extension. |

All other 45 corpus items (hand-built, local DB, live site) come out byte-identical.

## After (Next 15.5.29 · React 19 · Tiptap 3.34)

Taken on 2026-11-19 from a local production build of `e3fc82d` plus the two Task 7 fixes below (same commands, API and test data as
the baseline). Evidence: `after/`.

| Gate | Baseline | After | Result |
|---|---|---|---|
| Build | 58 routes, shared JS 87.9 kB | 58 routes, shared JS 103 kB | pass (see bundle note) |
| Route snapshot | 71 URLs, 0 fetch failures | 71 URLs, 0 fetch failures | 23 differences, all explained below |
| TTFB median per page type | — | 0 pages slower (>20% and >50 ms) | pass |
| `robots.txt` · `sitemap.xml` · `feed.xml` · `manifest.json` bodies | — | identical | pass |
| `npm run test:e2e` | 102 passed, 1 failed, 2 skipped | **110 passed, 1 failed, 2 skipped** | pass: every baseline pass still passes; same single known failure with the same diff |
| `npm run test:unit` | 24 passed | 24 passed | pass |
| `node --test tests/*.test.cjs` | 23 / 26 | 23 / 26 | pass (same 3 known `@/`-alias failures) |
| `tsc` · `tenant:check` · `tenant:leaks` | clean · ok · ok | clean · ok · ok | pass |
| `npm run lint` | 0 errors, 7 warnings | 0 errors, 25 warnings | pass (see lint note) |
| `npm audit` | 77 — 1 critical (`next`), 41 high, 35 moderate | **45 — 0 critical**, 39 high, 6 moderate | pass (see audit note) |
| Hydration errors | blog post 8, others 0 | blog post **1**, others 0 | pass |
| Screenshots (18 pairs) | — | ≤ 1.42% pixels differ; only image resampling / logo anti-aliasing | no visual change |
| Old service worker | — | update prompt shown over a rendered page; update applies | pass |
| Lighthouse | not captured | not captured | not verified (see Baseline › Lighthouse) |

### Fixed during verification

| Finding | Cause | Fix | Test |
|---|---|---|---|
| `/jobs/` lost title, description, canonical, OG and Twitter tags from `<head>` (they were streamed into `<body>`), for browsers **and Googlebot** | Next 15.2+ streams metadata on routes with a loading boundary (`jobs/loading.tsx`) unless the UA matches `htmlLimitedBots` (default list covers social unfurlers only) | `htmlLimitedBots: /.*/` in `next.config.js` — metadata blocks in `<head>` for every UA, exactly as Next 14 did | `migration-guards` › "metadata is in <head>" (browser + Googlebot UA, 5 routes) RED → GREEN |
| `<meta name="apple-mobile-web-app-capable">` missing (and `mobile-web-app-capable` emitted twice) | Next 15 emits the unprefixed tag from `appleWebApp.capable` and dropped the prefixed one; `defaultMetadata.other` added the unprefixed tag a second time | `defaultMetadata.other` now sets the prefixed tag. iOS needs it for the `apple-touch-startup-image` splash screens | `migration-guards` › "both web-app-capable tags, once each" RED → GREEN |
| Alignment popover stayed open after choosing (Task 5) | React 19: MUI's focus trap no longer pulls focus back from the editor, so Escape never reaches the popover | Popover closes when an alignment is picked | `editor-toolbar` › "marks…" RED → GREEN |
| Toolbar buttons showed stale pressed / enabled state when only the cursor moved (e.g. Bold not highlighted inside bold text) — found by the final review | Tiptap 3 no longer re-renders context consumers on each transaction; the toolbar controls are `React.memo`'d and read `editor.isActive()` | New `useToolbarEditor` hook (`useEditorState` on `transactionNumber`) for every toolbar control; `BubbleMenu` props hoisted to stable constants, because per-transaction re-renders otherwise loop through its `updateOptions` dispatch | `editor-toolbar` › "toolbar reflects the formatting under the cursor" RED → GREEN; full e2e 111 passed |

### Accepted differences

| Difference | Why it's accepted |
|---|---|
| `Cache-Control` on 20 static pages: `s-maxage=31536000, stale-while-revalidate` → `s-maxage=31536000`; `robots.txt` and `manifest.json` now also get `s-maxage=31536000` | Next 15 dropped the bare `stale-while-revalidate` from fully static pages (it was meaningless next to a one-year `s-maxage`) and now treats the metadata routes as static. Bodies are identical; on Vercel each deploy purges the CDN anyway. |
| `/sw.js` body | New build ID and new chunk names; expected for every build. Precache 191 → 195 entries (+2%), no `images/**`. |
| First-load JS: shared 87.9 → 103 kB; public routes +9–10 kB (≈ +2.5%); `/_not-found`, `/change-password` and `/transactions` +16.9% (they carry only the shared JS); `/profile` 766 → 814 kB; `/blog/new` 605 → 651 kB; `/admin/pages/[slug]` 548 → 593 kB | React 19's runtime is larger than React 18's. The three +16.9% routes exceed the 110% gate only because they are tiny (redirect / not-found shells). The editor and profile routes grow with Tiptap 3 and mui-tel-input 8 (libphonenumber metadata); all are signed-in pages. |
| Lint warnings 7 → 25, all `react-hooks/exhaustive-deps` | `eslint-plugin-react-hooks` 5 (required by `eslint-config-next` 15) is stricter. Warnings only; changing hook dependencies during a migration risks behaviour changes, so they are left for a separate clean-up. |
| `npm audit` still lists `next` (moderate) | Only through Next's bundled `postcss`; there is no advisory against Next itself, and npm's only fix is Next 16 (out of scope). The critical `next` advisory from the baseline is gone. |
| `hb:youtube` embed gains `&rel=1` | See Tiptap 3 › Accepted differences. |

### Old service worker (Review Focus 2)

A persistent Chromium profile loaded `/` from the **baseline** build (Next 14, served from a `git archive` of `8130589` with the
baseline `.next`), so the baseline worker took control. The server was then swapped for the **after** build on the same port and
the page reloaded: the page rendered fully (2,865 chars of text), the `App Update Available` prompt appeared, and pressing Update
applied the new worker. No `ChunkLoadError`, no page errors.

## Verdict

**Ready to deploy.** Next 14.2.35 → 15.5.29, React 18.3 → 19.3 and Tiptap 2.27 → 3.34 keep every public page's status, redirects,
title, description, robots, canonical, OG/Twitter, JSON-LD, h1, text and security headers identical to the baseline. Speed is
unchanged, the old service worker upgrades cleanly, stored rich text round-trips byte-for-byte (except the documented
`rel=1`), and the critical `next` advisory is gone.

Code changes beyond the version bumps: async request APIs (`params`, `searchParams`, `headers()`); Tiptap 3 imports, StarterKit
config and `BubbleMenu` options; `tsconfig` `moduleResolution: "bundler"`; `htmlLimitedBots` and the
`apple-mobile-web-app-capable` tag; the alignment popover closing on choice; toolbar controls subscribing to editor transactions (`useToolbarEditor`); `mui-tel-input` 8; `eslint-plugin-react-hooks` 5;
removal of the unused `react-popper` and of a dead editor file.

Signed-in public pages (Review Focus 5): hydration errors signed in equal signed out on `/`, the blog post, `/newsroom`, `/events`, `/gallery` and `/about` (blog post 1, others 0), and the header shows the member controls.

Carried over from the baseline: `tenant-identity` head-snapshot failure (dev-recorded snapshot; same diff), the three
`@/`-alias Node test failures, and 1 hydration error on the blog post (down from 8).

**Not verified here:** a real Vercel deploy (edge caching, `/_vercel/*` analytics); PWA install and splash screens on a real iOS
or Android device; the phone-number input's appearance after `mui-tel-input` 8 (signup / profile); Lighthouse scores; editor
toolbar controls that aren't rendered (font family, font size, indentation, image).

After deploying, run the live smoke and diff it against the pre-deploy reference:

```bash
node scripts/route-snapshot.mjs --base https://jnvpjaa.org --out after-deploy.json --runs 1
node scripts/route-snapshot.mjs --diff docs/superpowers/migration/baseline/live.json after-deploy.json
```
