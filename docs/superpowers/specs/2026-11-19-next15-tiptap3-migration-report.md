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
