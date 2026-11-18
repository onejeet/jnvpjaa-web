# Tenant Config (White-label) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Everything association-specific in `jnvpjaa-web` and `jnvpjaa-backend` comes from a `tenants/<TENANT>/` folder, so a new association launches by adding config and assets, and JNVPJAA renders exactly as today.

**Architecture:** Each repo gets `tenants/<id>/` (JSON + assets). Web: `next.config.js` checks `TENANT` and aliases `@tenant` → `tenants/$TENANT`; `src/config/tenant.ts` imports the JSON through that alias and validates it with zod at module load, so a bad config fails `next build` and the same typed objects work in server and client components. Backend: `src/config/tenant.ts` reads and validates `tenants/$TENANT/*.json` at boot and exits on error; `org_info` is rebuilt from it with the same shape. A baseline of JNVPJAA's rendered output is captured first and compared at the end.

**Tech Stack:** Next.js 14.2 (App Router, `next.config.js` must stay JS), MUI 5, zod 3.23.8 (already in both repos), Playwright (web tests), `node:test` + ts-node (backend tests), Handlebars emails.

**Spec:** `jnvpjaa-web/docs/superpowers/specs/2026-11-18-tenant-config-design.md`

## Global Constraints

- One env var, `TENANT=<id>`, selects `tenants/<id>/` in each repo. Unset, missing folder or invalid JSON → build/boot fails with a message naming the tenant and the bad field. **Never fall back to JNVPJAA values.**
- With `TENANT=jnvpjaa`, rendered `<head>` metadata, `/manifest.json`, `/robots.txt`, `/sitemap.xml`, nav/footer text, brand colours and email HTML are identical to the Task 1 baseline.
- With `TENANT=demo`, a grep of `.next/` and backend `dist/` for `jnvpjaa|JNV|Navodaya|Paota` (case-insensitive) finds zero hits.
- Secrets and infra names (DB URLs, R2 endpoint/bucket/keys, ZeptoMail token, Google OAuth id/secret) stay in env vars, never in tenant files.
- Public URLs keep their paths (`/manifest.json`, `/robots.txt`, `/sitemap.xml`, `/favicon.png`, `/icons/*`). Existing localStorage keys and headers keep their JNVPJAA values (derive them from `brand.id`).
- The seven content pages are not in `features.json`; their visibility is the admin `visible` toggle only. Their seed text lives in `tenants/<id>/seed/content_pages.json` (backend).
- **No personal data in `tenants/`.** Tenant folders hold only public branding, wording and the seven pages' starting content. Member, coordinator, business, blog and album JSON stays out of the repo (see Task 11); a reusable server seed script is a later, separate job.
- Leave every change uncommitted (user rule: no git commits in JNVPJAA repos). Wherever a step says "Checkpoint", run the tests and record the result; do not commit.
- Node 22 for web: `export PATH=~/.nvm/versions/node/v22.23.4/bin:$PATH`.

## Review Focus

1. **A client component imports `@/config/tenant`.** It must bundle (no `fs`), and the client bundle must contain only public brand data. → Task 2's loader uses JSON imports only; Task 2 test imports it from a `'use client'` component path via the build in Task 11.
2. **A disabled module reached by a deep URL** (`/jobs/new`, `/jobs/<slug>/applicants`, `/scholarships/apply`) or by its GraphQL API. Expect 404 on every route under the module and a `MODULE_DISABLED` error from its resolvers. → Task 6 e2e and Task 10 test.
3. **Optional brand fields absent** (no `twitter`, no `gtmId`, no `github`). Footer, JSON-LD and emails render without empty `href=""` or `undefined`. → Task 2 schema test, Task 9 email test.
4. **Web and backend `brand.json` drift** for the same tenant (e.g. domain changed in one repo). Expect `npm run tenant:check` to fail and name the differing keys. → Task 11.
5. **Production PWA users on the old service worker.** URLs of manifest, icons and CDN patterns stay identical for JNVPJAA, so cached clients keep working. → Task 1 baseline covers manifest and icon links.

---

## File Structure

**Web (`jnvpjaa-web`)**
- `tenants/jnvpjaa/{brand,seo,features,content}.json`, `tenants/jnvpjaa/public/` (favicon, `icons/`, `splashscreens/`, brand images), `tenants/jnvpjaa/fonts/{body,display,serif}.woff2`
- `tenants/_template/` (placeholders, valid against the schema), `tenants/demo/` (copy of `_template` with fake values, used for the leak check), `tenants/README.md`
- `tenants/resolve.js` — CJS, used by `next.config.js` and scripts
- `scripts/tenant-assets.js` — copies tenant `public/` and `fonts/` into place (predev/prebuild)
- `scripts/tenant-leaks.sh`, `scripts/tenant-check.js`
- `src/config/tenant.schema.ts` (zod), `src/config/tenant.ts` (validated exports), `src/config/features.ts`
- `src/app/manifest.json/route.ts`, `src/app/robots.ts` (replace static files)
- `playwright.unit.config.ts` — runs `src/**/*.unit.ts` with no browser and no global setup
- `e2e/tenant-identity.spec.ts`, `e2e/tenant-baseline.json`

**Backend (`jnvpjaa-backend`)**
- `tenants/jnvpjaa/{brand,features}.json` (brand.json identical to web's), `tenants/jnvpjaa/seed/content_pages.json` (moved from `prisma/seed_data/`), `tenants/_template/`, `tenants/demo/`
- `.seed-private/` (gitignored, laptop only): personal seed JSON moved out of `prisma/seed_data/`
- `src/config/tenant.ts`, `src/utils/modules.ts`
- `tests/tenant-config.test.ts`, `tests/email-baseline.test.ts`, `tests/__baseline__/emails/*.html`

---

### Task 1: Capture JNVPJAA baseline (before any change)

**Files:**
- Create: `jnvpjaa-web/e2e/tenant-identity.spec.ts`, `jnvpjaa-web/e2e/tenant-baseline.json` (generated)
- Create: `jnvpjaa-backend/tests/email-baseline.test.ts`, `jnvpjaa-backend/tests/__baseline__/emails/*.html` (generated)

**Interfaces:**
- Produces: `e2e/tenant-identity.spec.ts` (compare mode by default; `E2E_CAPTURE_BASELINE=1` writes the file). `tests/email-baseline.test.ts` (compare by default; `CAPTURE_BASELINE=1` writes). Task 12 reruns both.

- [ ] **Step 1: Write `e2e/tenant-identity.spec.ts`.** For each path in `['/', '/about/', '/vision/', '/president-message/', '/events/', '/contact-us/', '/privacy_policy/', '/terms_condition/', '/members/', '/jobs/', '/scholarships/']`, collect `{ title, metas: sorted [name|property, content] pairs, links: sorted [rel, href, sizes] for canonical/manifest/icon/apple-touch-icon, ldJson: parsed array, headerText, footerText }` (header/footer `innerText` with whitespace collapsed). Also collect `GET /manifest.json` (JSON), `/robots.txt` (text), `/sitemap.xml` (sorted `<loc>` list), and on `/` the computed `color` and `background-color` of the first `.MuiButton-containedPrimary` and of `header a[aria-current], header a` first match. Capture mode writes `e2e/tenant-baseline.json`; compare mode does `expect(actual).toEqual(baseline)` per key.
- [ ] **Step 2: Capture.** With backend on :4000 and web dev on :3890, personas created (see `e2e/README.md`):
  Run: `E2E_CAPTURE_BASELINE=1 npx playwright test e2e/tenant-identity.spec.ts`
  Expected: PASS; `e2e/tenant-baseline.json` exists and contains 11 pages.
- [ ] **Step 3: Write `tests/email-baseline.test.ts`.** For every `src/views/emails/*.handlebars`, render with `handlebars.compile` using the same helpers as `src/services/emails.ts` and context `{ ...org_info, name: 'Test User', email: 'test@example.com', code: '123456', link: 'https://example.com/x', title: 'Sample' }`. Capture mode writes `tests/__baseline__/emails/<template>.html`; compare mode asserts string equality. Also assert the `from` display name and each subject string used in `src/graphql/mutations/{auth,user,access}.ts` against a `subjects.json` in the same folder (export those subjects as named constants first if they are inline; values unchanged).
- [ ] **Step 4: Capture.** Run: `CAPTURE_BASELINE=1 npx ts-node -r tsconfig-paths/register tests/email-baseline.test.ts` then without `CAPTURE_BASELINE`.
  Expected: both PASS; one `.html` per template.
- [ ] **Step 5: Checkpoint** (no commit). Add `"test:email-baseline"` to backend `package.json` scripts.

### Task 2: Web tenant schema, loader and the jnvpjaa tenant

**Files:**
- Create: `tenants/resolve.js`, `src/config/tenant.schema.ts`, `src/config/tenant.ts`, `src/config/tenant.unit.ts`, `playwright.unit.config.ts`, `tenants/jnvpjaa/{brand,seo,features,content}.json`
- Modify: `next.config.js` (webpack alias), `tsconfig.json` (`paths`: `"@tenant/*": ["tenants/jnvpjaa/*"]`), `package.json` (`"test:unit": "playwright test -c playwright.unit.config.ts"`)

**Interfaces:**
- Produces:
  - `resolveTenant(env = process.env): { id: string; dir: string }` (CJS, `tenants/resolve.js`). Throws `TENANT is not set` / `tenants/<id>/ not found` / `tenants/<id>/brand.json is not valid JSON`.
  - `parseTenant(raw: { brand: unknown; seo: unknown; features: unknown; content: unknown }, id: string): Tenant` — throws `Error` whose message starts `Invalid tenant "<id>":` and lists zod issue paths.
  - `export const { brand, seo, features, content } = parseTenant({ brand: brandJson, … }, process.env.TENANT)` from `src/config/tenant.ts`, JSON imported from `@tenant/*.json`.
  - Types `Brand`, `Seo`, `Features`, `Content`, `ModuleKey`.
- Schema (field names fixed here so later tasks agree):
  - `brand`: `id`, `name` (short display, "JNVPJAA"), `shortName`, `legalName` ("JNV Paota Jaipur Alumni Association"), `tagline`, `institution` ({ `name`, `shortName`, `city` }), `logo` ({ `full`, `square`, `icon`, `greyIcon`, `email` } — absolute https URLs), `theme` ({ `primary`: { `50`…`900`, `main` }, `secondary`: same, `background`: hex, `manifestBackground`: hex }), `socials` (optional each: `facebook`, `instagram`, `twitter`, `linkedin`, `youtube`, `github`), `contact` ({ `email`, `phone?`, `address`: string[] }), `domains` ({ `site`, `api`, `assets`, `content` } — hostnames, no scheme), `email` ({ `from`, `domain`, `host`, `bounceHost?` }), `analytics?` ({ `gtmId?` }).
  - `seo`: `siteName`, `title`, `titleTemplate`, `description`, `defaultImage` (path or URL), `defaultImageSize` ({ w, h }), `locale`, `keywords?`, `organization` (JSON-LD fields).
  - `features`: boolean map, keys exactly `blog, events, gallery, businesses, jobs, newsroom, scholarship, donations, studentHub, batchCoordinators, executiveCommittee, discussions`. Unknown keys rejected (`.strict()`).
  - `content`: string map keyed `<area>.<item>` (e.g. `home.heroTitle`); `z.record(z.string().min(1))`.

- [ ] **Step 1: Write `playwright.unit.config.ts`** (`testDir: 'src'`, `testMatch: /\.unit\.ts$/`, no `globalSetup`, no `webServer`, no browser projects) **and the failing test `src/config/tenant.unit.ts`:**
  ```ts
  test('jnvpjaa tenant parses', () => { const t = parseTenant(load('jnvpjaa'), 'jnvpjaa'); expect(t.brand.name).toBe('JNVPJAA'); expect(t.brand.domains.site).toBe('jnvpjaa.org'); });
  test('missing required field names the path', () => { const raw = load('jnvpjaa'); delete raw.brand.domains.api; expect(() => parseTenant(raw, 'x')).toThrow(/Invalid tenant "x".*brand\.domains\.api/s); });
  test('unknown feature key is rejected', () => { const raw = load('jnvpjaa'); raw.features.chat = true; expect(() => parseTenant(raw, 'x')).toThrow(/features/); });
  test('optional socials may be absent', () => { const raw = load('jnvpjaa'); raw.brand.socials = {}; expect(parseTenant(raw, 'x').brand.socials.twitter).toBeUndefined(); });
  test('domains reject a scheme', () => { const raw = load('jnvpjaa'); raw.brand.domains.site = 'https://jnvpjaa.org'; expect(() => parseTenant(raw, 'x')).toThrow(/domains\.site/); });
  test('resolveTenant fails without TENANT and for unknown id', () => { expect(() => resolveTenant({})).toThrow(/TENANT is not set/); expect(() => resolveTenant({ TENANT: 'nope' })).toThrow(/tenants\/nope\/ not found/); });
  ```
  (`load(id)` reads the four JSON files with `fs` and `JSON.parse`, a fresh copy per call.)
- [ ] **Step 2: Run** `npm run test:unit` → Expected: FAIL (module not found).
- [ ] **Step 3: Implement.** Fill `tenants/jnvpjaa/*.json` with today's values (palette scale from `src/utils/theme/palette/index.ts`, SEO from `src/config/seo.config.ts`, manifest colours from `src/app/manifest.json`, socials from the footer/`General.contants.ts`, backend `org_info` for logos/email). `features.json`: all `true`. `content.json`: start empty (`{}`); Tasks 7–8 add keys. In `next.config.js`: `const tenant = resolveTenant();` at top, `config.resolve.alias['@tenant'] = tenant.dir` in `webpack()`. Never default `TENANT`; add `TENANT=jnvpjaa` to the `dev`/`build` scripts' `cross-env`/env prefix **and** document it for Coolify.
- [ ] **Step 4: Run** `npm run test:unit` → Expected: 6 passed. Also `TENANT= npx next build` → Expected: fails with `TENANT is not set`.
- [ ] **Step 5: Checkpoint.**

### Task 3: SEO metadata, manifest, robots, sitemap from config

**Files:**
- Modify: `src/config/seo.config.ts`, `src/app/sitemap.ts`, `src/app/layout.tsx` (JSON-LD org, GTM id, theme colour)
- Create: `src/app/manifest.json/route.ts`, `src/app/robots.ts`
- Delete: `src/app/manifest.json`, `public/manifest.json`, `public/robots.txt`

**Interfaces:**
- Consumes: `brand`, `seo`, `features` from `@/config/tenant`.
- Produces: `SEO_CONFIG`, `canonicalUrl`, `defaultMetadata`, `constructMetadata` keep their current names and signatures. `siteUrl = \`https://${brand.domains.site}\``.

- [ ] **Step 1: Failing check.** Run `npx playwright test e2e/tenant-identity.spec.ts` after deleting the three static files → Expected: FAIL on manifest/robots.
- [ ] **Step 2: Implement.** `manifest.json/route.ts` returns `Response.json({...})` with `content-type: application/manifest+json`, same fields/order as the old file, from `brand`/`seo`. `robots.ts` returns the same rules and `sitemap: https://<site>/sitemap.xml`. Sitemap module filtering happens in Task 6. GTM id read from `brand.analytics?.gtmId`; omit the script when absent.
- [ ] **Step 3: Run** the identity spec → Expected: PASS (metadata, manifest, robots, sitemap identical).
- [ ] **Step 4: Checkpoint.**

### Task 4: Tenant assets and `next.config.js` domains

**Files:**
- Create: `scripts/tenant-assets.js`, `tenants/jnvpjaa/public/**`, `tenants/jnvpjaa/fonts/{body,display,serif}.woff2`
- Modify: `next.config.js` (remotePatterns, service-worker CDN patterns, `env.NEXT_PUBLIC_GRAPHQL_ENDPOINT`), `package.json` (`predev`, `prebuild`; remove the hardcoded `api.jnvpjaa.org` endpoint from `build`), `.gitignore`, `src/utils/theme/fonts/index.ts`, `src/config/index.ts`

**Interfaces:**
- Consumes: `resolveTenant()`.
- Produces: `copyTenantAssets(tenant: { id; dir }, root: string): string[]` (returns copied relative paths) exported from `scripts/tenant-assets.js`; run as CLI it calls it with `resolveTenant()`.

- [ ] **Step 1: Failing test** `src/config/tenantAssets.unit.ts` (requires `../../scripts/tenant-assets`): copying into a temp root creates `public/favicon.png`, `public/icons/icon-192.png`, `src/utils/theme/fonts/files/body.woff2`; a tenant missing `fonts/body.woff2` throws `tenants/<id>/fonts/body.woff2 missing`.
- [ ] **Step 2: Run** `npm run test:unit` → Expected: FAIL.
- [ ] **Step 3: Implement.** Move brand files (favicon, `icons/`, `splashscreens/`, `assets/branding/`, and the brand photos under `assets/images/` that seo/content reference) from `public/` to `tenants/jnvpjaa/public/`. Font files: rename `dm-sans-latin` → `body`, `playfair-display-latin` → `display`, `noto-serif-latin` → `serif`; `fonts/index.ts` points at `./files/{body,display,serif}.woff2` with today's weights (next/font needs literals; a tenant supplies variable fonts covering those ranges — note in README). Gitignore the copied paths. `remotePatterns` and SW `urlPattern`s are built from `brand.domains.{site,assets,content}` plus `images.unsplash.com`, `cdn.pixabay.com` (read `brand.json` with `fs` in `next.config.js`). `NEXT_PUBLIC_GRAPHQL_ENDPOINT` defaults to `https://${domains.api}/client` in production when not set by env. `R2_ENDPOINT`/`R2_BUCKET_NAME` in `src/config/index.ts` → `process.env.NEXT_PUBLIC_R2_*` if used, else delete; `org_info.content_domain` → from `brand.domains.content`.
- [ ] **Step 4: Run** `npm run test:unit` and the identity spec → Expected: PASS both; `npm run build` succeeds.
- [ ] **Step 5: Checkpoint.**

### Task 5: Theme from brand config

**Files:**
- Modify: `src/utils/theme/palette/index.ts`, `src/app/layout.tsx`, `src/styles/globals.css`, `src/components/common/{ClapButton,Welcome}/*.tsx`, `src/layouts/Layout/{LayoutTopbar,HeaderAddButton}.tsx` (all files `grep -rliE '#C62835|#AF232F|#951D27' src` lists)

- [ ] **Step 1: Failing test** `src/utils/theme/palette/palette.unit.ts`: `DefaultPalette('light').primary` equals `brand.theme.primary` (every key), and with a modified brand (via `parseTenant` + a `buildPalette(brand.theme, mode)` export) `primary.main` follows the input.
- [ ] **Step 2: Run** → FAIL (`buildPalette` missing).
- [ ] **Step 3: Implement** `buildPalette(theme: Brand['theme'], mode: PaletteMode)`; `DefaultPalette(mode)` = `buildPalette(brand.theme, mode)`. Inline brand hex in components → `theme.palette.primary.*`. `globals.css` uses `var(--brand-primary)`; `layout.tsx` sets `--brand-primary` (and any other used shade) on `:root` from `brand.theme`.
- [ ] **Step 4: Run** unit test and identity spec (colours) → PASS. `grep -rliE '#C62835|#AF232F|#951D27' src` → no hits (the palette reads `brand.theme`).
- [ ] **Step 5: Checkpoint.**

### Task 6: Module switches (web)

**Files:**
- Create: `src/config/features.ts`, `src/config/features.unit.ts`, `e2e/tenant-modules.spec.ts`
- Modify: `src/constants/Header.constants.tsx`, `src/layouts/Layout/LayoutFooter.tsx`, `src/app/sitemap.ts`, a `layout.tsx` at the root of each module route (create one where missing), the admin Settings section (hide the scholarship toggles when `features.scholarship` is false), home sections that feature a module (featured blogs, events)

**Interfaces:**
- Produces: `isEnabled(key: ModuleKey): boolean`; `requireModule(key: ModuleKey): void` (calls `notFound()` when off); `filterNav<T extends { module?: ModuleKey; children?: T[] }>(items: T[], f?: Features): T[]` (drops disabled items and empty groups). Nav items get a `module` field.
- Route → module map (fixed): `/blog`→blog, `/events`→events, `/gallery`→gallery, `/businesses`→businesses, `/jobs`→jobs, `/newsroom`→newsroom, `/scholarships`→scholarship, `/donations`→donations, `/student-hub`→studentHub, `/batch-coordinators`→batchCoordinators, `/executive-committee`→executiveCommittee, discussions routes→discussions.

- [ ] **Step 1: Failing unit test** `features.unit.ts`: `filterNav` with `{ jobs: false }` removes the Jobs item, keeps siblings, and removes a group whose children are all disabled; an item with no `module` is always kept.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement**, calling `requireModule` in each module's `layout.tsx` (covers every sub-route).
- [ ] **Step 4: E2E** `e2e/tenant-modules.spec.ts` (skipped unless `E2E_DISABLED_MODULE` is set): with `features.jobs=false` in a scratch tenant (`TENANT=demo`, dev server restarted), `/jobs/`, `/jobs/new/`, `/jobs/x/applicants/` return 404 and no header/footer link has `href^="/jobs"`. Run it once that way, then restore.
- [ ] **Step 5: Run** unit + identity spec with jnvpjaa → PASS (nav text unchanged). **Checkpoint.**

### Task 7: Remove dead personal data; shared-component copy

**Files:**
- Delete (verified unused at runtime: the Batch Coordinators and Executive Committee pages read the database via `getAllBatchCoordinators` / `PUBLIC_EXECUTIVE_COMMITTEE_QUERY`): `src/constants/BatchCoordinators.json` (91 member emails), `EXEC_COMMITTEE` in `src/constants/General.contants.ts`, `dummyBusinesses` in `src/modules/BusinessListModule/BusinessListModule.tsx`. Before deleting `EXEC_COMMITTEE`, write it as JSON to `../jnvpjaa-backend/.seed-private/jnvpjaa/executive_committee.json` (the backfill script reads it, Task 11).
- Move: `JNVPJAA_SOCIAL_MEDIA` → built from `brand.socials`; contact address in `Address.constant.ts` → `brand.contact.address`
- Modify: `src/components/common/{Logo,Welcome,LoadingIndicator,EmptyView,AlertDialog,PhotoGrid,VerifiedBadge,FacultyBadge,SpecialTitle,ClapButton}`, `src/components/home/{Hero,SloganBanner}`, `src/containers/Home/components/*`, `src/layouts/Layout/*`, `src/components/PWA/*`, `src/utils/discussions.ts`, `src/containers/Auth/**`

**Interfaces:**
- Consumes: `brand`, `content`.
- Produces: `assetUrl(path: string): string` in `src/config/tenant.ts` → `https://${brand.domains.assets}${path}`; `t(key: string): string` → `content[key]`, throws `Missing content key "<key>" for tenant "<id>"` (a build-time error, never a silent blank). Storage/header names built as `` `${brand.id}_discussions_v1` ``, `` `x-${brand.id}-router-navigation` `` (identical values for jnvpjaa).

- [ ] **Step 1: Failing unit test** `src/config/content.unit.ts`: `t('home.heroTitle')` returns the jnvpjaa string; `t('nope')` throws `/Missing content key "nope"/`; `assetUrl('/svg/clap_icon.svg')` === `'https://assets.jnvpjaa.org/svg/clap_icon.svg'`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.** Rule for each hit: org name/domain/social/logo/asset URL → `brand.*`/`assetUrl`; a full sentence or Navodaya/JNV-specific phrase → a `content.json` key copied verbatim; addresses/contacts → `brand.contact`. No `tenants/<id>/data/` folder. Add every new key to `_template/content.json` with a neutral placeholder.
- [ ] **Step 4: Run** unit tests + identity spec → PASS. `grep -rlE "JNVPJAA|jnvpjaa|Paota|Navodaya|JNV" src/components src/layouts src/containers/Home src/containers/Auth src/utils src/constants` → empty.
- [ ] **Step 5: Checkpoint.**

### Task 8: Route pages, legal pages and remaining containers

**Files:**
- Modify: every remaining file from `grep -rlE "JNVPJAA|jnvpjaa|Paota|Navodaya|JNV" src` — notably `src/app/**/page.tsx|layout.tsx` metadata, `src/app/{terms_condition,privacy_policy}/page.tsx`, `src/containers/{StudentHub,Scholarships,Funds,ContactUs,Businesses,About,…}`, `src/modules/ContentPages/**`, `src/apollo/**`

- [ ] **Step 1: Failing check.** Run: `grep -rlE "JNVPJAA|jnvpjaa|Paota|Navodaya|JNV" src | wc -l` → Expected: > 0 (records the starting count).
- [ ] **Step 2: Implement** with Task 7's rules. Dev-only pages `typography-lab` and `writing-studio` call `notFound()` when `process.env.NODE_ENV === 'production'` (unless already gated). Legal pages: org names/addresses/emails → `brand.legalName`, `brand.contact.*`; any clause naming the institution → `content['legal.*']`. The `contentPages.registry.ts` "keep in sync" comment now points at the backend's config-derived hosts (Task 9).
- [ ] **Step 3: Run** the grep → Expected: `0`. Run `npm run test:unit`, the identity spec, and the full `npm run test:e2e` → Expected: all PASS.
- [ ] **Step 4: Checkpoint.**

### Task 9: Backend tenant loader, domains and emails

**Files:**
- Create: `jnvpjaa-backend/tenants/jnvpjaa/{brand,features}.json` (brand.json byte-identical to web's), `src/config/tenant.ts`, `tests/tenant-config.test.ts`
- Modify: `src/config/index.ts` (`org_info`, `NODEMAILER_EMAIL` default), `src/index.ts` (load first), `src/middleware/{cors,security}.ts`, `src/utils/{cookies,uploads,image,index}.ts`, `src/graphql/queries/access.ts`, `src/services/contentPages/schema.ts` (`IMAGE_HOSTS`), `src/services/emails.ts`, `src/graphql/mutations/{auth,user,access}.ts` (subjects), `src/views/emails/*.handlebars`, `package.json` (`test:tenant`, `TENANT=jnvpjaa` in `dev`)

**Interfaces:**
- Produces: `loadTenant(env = process.env, root = process.cwd()): { brand: Brand; features: Features }` (throws `Invalid tenant "<id>": <paths>`); module-level `export const { brand, features } = loadTenant()`; `siteOrigins(brand): string[]` → `[https://site, https://www.site, https://api]`; `imageHosts(brand): string[]` → `[site, assets, content, 'images.unsplash.com', 'cdn.pixabay.com']`. `org_info` keeps every existing key and value shape. Handlebars context adds `site_url`, `blog_url`, `socials.*` (only present keys).
- Brand schema: same zod shape as web Task 2 (copy `tenant.schema.ts` brand part; backend validates `brand` + `features`).

- [ ] **Step 1: Failing test** `tests/tenant-config.test.ts`:
  ```ts
  test('jnvpjaa loads and org_info keeps its shape', () => { assert.equal(org_info.short_name, 'JNVPJAA'); assert.equal(org_info.baseUrl, 'https://jnvpjaa.org'); assert.equal(org_info.zeptomail.from, 'noreply@jnvpjaa.org'); });
  test('unset or unknown TENANT throws', () => { assert.throws(() => loadTenant({}), /TENANT is not set/); assert.throws(() => loadTenant({ TENANT: 'nope' }), /tenants\/nope/); });
  test('origins and image hosts derive from domains', () => { assert.deepEqual(siteOrigins(brand), ['https://jnvpjaa.org', 'https://www.jnvpjaa.org', 'https://api.jnvpjaa.org']); assert.ok(imageHosts(brand).includes('content.jnvpjaa.org')); });
  test('demo tenant has no JNVPJAA strings', () => { const t = loadTenant({ TENANT: 'demo' }); assert.doesNotMatch(JSON.stringify(t), /jnvpjaa|JNV|Navodaya|Paota/i); });
  ```
- [ ] **Step 2: Run** `npm run test:tenant` → FAIL.
- [ ] **Step 3: Implement.** Replace every literal from `grep -rnE "JNVPJAA|jnvpjaa|Paota|Navodaya|JNV" src`. Templates: links → `{{site_url}}`/`{{blog_url}}`; `github.com/JNVPJAA` → `{{#if socials.github}}…{{/if}}`; Navodaya sentences → `{{content.*}}` keys held in a backend `tenants/<id>/content.json` (email copy only). `utils/index.ts` FTP path and `utils/image.ts` dir: if unreferenced, delete the dead code; otherwise derive from `brand.id`. Process exits with the error message on load failure (`src/index.ts` imports config first).
- [ ] **Step 4: Run** `npm run test:tenant`, `npm run test:email-baseline` (must still equal the Task 1 baseline), `npm run test:content-pages`, `npm run test:avatars`, `npm run test:security` → Expected: all PASS. `grep -rnE "JNVPJAA|jnvpjaa|Paota|Navodaya|JNV" src` → no hits.
- [ ] **Step 5: Checkpoint.**

### Task 10: Backend module guards

**Files:**
- Create: `src/utils/modules.ts`, `tests/modules.test.ts`
- Modify: resolver entry points for jobs, scholarship, businesses, newsroom, donations, blog, events, gallery, discussions (one guard call per Query/Mutation field of the module)

**Interfaces:**
- Produces: `requireModule(key: ModuleKey, f = features): void` — throws `GraphQLError('This feature is not available.', { extensions: { code: 'MODULE_DISABLED' } })`. Same `ModuleKey` list as web Task 2. A `features` query field is **not** added (web reads its own file).

- [ ] **Step 1: Failing test** `tests/modules.test.ts`: `requireModule('jobs', { ...all, jobs: false })` throws with code `MODULE_DISABLED`; passes when true; and calling the `jobs` list resolver with a disabled features map rejects with that code.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** and wire the guards.
- [ ] **Step 4: Run** `tests/modules.test.ts`, `test:jobs`, `test:newsroom`, `test:scholarship-integrity` → PASS.
- [ ] **Step 5: Checkpoint.**

### Task 11: Seeds, templates, demo tenant, leak check, README

**Files:**
- Move: `jnvpjaa-backend/prisma/seed_data/content_pages.json` → `tenants/jnvpjaa/seed/`; every other file in `prisma/seed_data/` (`members`, `batch_coorddinators`, `businesses`, `blogs`, `album`, `extra_data`) → `.seed-private/jnvpjaa/` and add `.seed-private/` to `.gitignore`. `prisma/seed.ts` and `prisma/scripts/backfill_access_from_display_data.ts` read those from `process.env.SEED_DATA_DIR` (error naming the variable when unset); `seed_content_pages.ts` uses `seedFile()`. Note in the README that the removed files remain in git history.
- Create (both repos): `tenants/_template/` (every file, placeholder values, valid), `tenants/demo/` (copy with fake brand "Demo Alumni", `demo.example` domains, all features on; backend `seed/content_pages.json` with the seven slugs, generic headings, no people)
- Create: `jnvpjaa-web/scripts/tenant-leaks.sh`, `jnvpjaa-web/scripts/tenant-check.js`, `jnvpjaa-web/tenants/README.md`; `package.json` scripts `tenant:leaks`, `tenant:check`

**Interfaces:**
- `seedFile(name: string, env = process.env): string` in `jnvpjaa-backend/prisma/scripts/seedPaths.ts` — absolute path to `tenants/<TENANT>/seed/<name>`; throws like `loadTenant` when `TENANT` is unset.
- `tenant:check` — given `../jnvpjaa-backend`, for every tenant id present in both repos, deep-compares the two `brand.json` files and exits 1 listing differing key paths.
- `tenant:leaks` — `TENANT=demo npm run build`, then `grep -rliE "jnvpjaa|JNV|Navodaya|Paota" .next/static .next/server` and backend `TENANT=demo npm run build && grep … dist`; exits 1 with the hit list.

- [ ] **Step 1: Run** `npm run tenant:leaks` → Expected: FAIL first (lists hits), fix each remaining hit at its source (tenant data, not the demo), rerun → `0 hits`.
- [ ] **Step 2: Run** `npm run tenant:check` → PASS; change one domain in the backend copy → FAIL naming `domains.site`; revert.
- [ ] **Step 3: Seed check.** New `tests/seed-paths.test.ts` (backend): `seedFile('content_pages.json', { TENANT: 'demo' })` ends with `tenants/demo/seed/content_pages.json`, and every page in that file passes `parseContentFields`. Run it → PASS.
- [ ] **Step 4: README** — new-tenant checklist: copy `_template` in both repos, fill brand/seo/features/content, add `public/` assets and three variable fonts, upload the generic SVG set to the assets CDN, set `TENANT` + secrets in Coolify for both apps, run `tenant:check`, deploy, then edit the seven pages in `/admin/pages/`.
- [ ] **Step 5: Checkpoint.**

### Task 12: Final verification

- [ ] **Step 1:** Web with `TENANT=jnvpjaa`: `npm run test:unit`, `npm run test:e2e` (includes `tenant-identity.spec.ts` against the Task 1 baseline) → all PASS.
- [ ] **Step 2:** Backend: every `test:*` script plus `test:tenant`, `test:email-baseline` → all PASS.
- [ ] **Step 3:** `npm run build` (web, jnvpjaa) and `npm run build` (backend) succeed; `TENANT=` builds fail with `TENANT is not set`; a tenant with `brand.domains` removed fails with `Invalid tenant … brand.domains`.
- [ ] **Step 4:** `npm run tenant:leaks` → 0 hits; `npm run tenant:check` → PASS.
- [ ] **Step 5:** Content pages are unchanged in the DB (they are data; nothing in this plan writes them).
