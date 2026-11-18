# Tenant Config (White-label) — Design

Date: 2026-11-18 · Repos: `jnvpjaa-web`, `jnvpjaa-backend`

## Intent

The JNVPJAA portal will be sold as an alumni-management product to other associations. Each new association must be
launched by **adding config and assets, not by editing code**. Today the brand is hardcoded across ~100 files (≈170 ×
"JNVPJAA", ≈146 × "jnvpjaa.org", ≈100 × "JNV Paota", plus Navodaya-specific copy), so a rebrand is a full code sweep.

## Deployment model (decided)

- **One deployment per association**: its own server, its own Coolify setup, its own database, its own domain. No
  multi-tenancy, and no `tenantId` columns in the database.
- Redeploying to change branding is acceptable. The operator (us) sets up each new tenant.

## Goals

- One env var, `TENANT=<id>`, picks a tenant folder in each repo. Everything brand-specific is read from that folder.
- Brand config covers: org name, short name, full/legal name, tagline, logos (full, square, icon, grey/email variants),
  favicon, PWA icons and splash screens, theme colours and fonts, social URLs, contact details (email, phone, address),
  domains (site, api, assets CDN, content CDN), and email sender (address, domain, provider host).
- SEO config: site name, default title, title template, description, default OG image, locale, keywords, JSON-LD
  organisation data.
- Feature/module config: each association-specific module (Scholarship, Jobs, Businesses, Student Hub, Donations, …)
  can be switched on or off. A module that is off has its nav entry hidden and its route returning 404. The seven
  editable content pages are not in this file (see "Content pages" below).
- Tenant copy: association-specific sentences (e.g. "Navodaya shaped you", the home slogans, the about-page text) move
  into a tenant content file so they can be replaced.
- JNVPJAA keeps rendering exactly as it does today, with `tenants/jnvpjaa/` as the first tenant.
- Adding a tenant needs a documented checklist (`tenants/README.md`): copy `tenants/_template`, fill it in, add assets,
  set `TENANT` plus secrets in Coolify, deploy.

## Non-goals

- No admin UI or database storage for branding. Branding stays in files for now; individual fields may move to the
  database later if an association asks.
- No multi-tenant runtime: no host-based tenant switching, and no shared database.
- No new modules or redesign. Only existing behaviour gets parameterised.
- Product (SaaS) branding for the vendor (e.g. "Powered by …") is out of scope unless it already exists.

## Anti-goals (failure even if it "works")

- JNVPJAA's live site changes visually, in SEO tags, or in email content after the migration.
- A missing or invalid tenant config silently falls back to JNVPJAA values. A misconfigured tenant must **fail the
  build/boot** with a clear error, never ship another association's brand.
- Secrets (API keys, DB URLs, R2 credentials) end up in tenant files. Secrets stay in env vars and are configured in
  Coolify.

## Constraints

- Web: Next.js App Router with MUI theme (`src/utils/theme/*`), `src/config/seo.config.ts`, static `manifest.json`,
  `robots.txt`, `sitemap.ts`, and a PWA service worker with CDN URL patterns in `next.config.js`.
- Backend: an existing `org_info` in `src/config/index.ts` (used by 7 files), Handlebars emails that already take
  `{{short_name}}` / `{{logo.full}}`, hardcoded CORS origins, cookie domain, and upload/R2 bucket names.
- The two repos are separate git repos and are deployed separately. Neither can import from the other.
- `zod` 3.23.8 is installed in the web repo. Use it for validation (and add the same version to the backend if it's
  missing).

## Approaches considered

|                | Approach                                                                               | Trade-off                                                                                                                            |
| -------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **A (chosen)** | Per-tenant folder of JSON plus assets in each repo, selected by `TENANT` at build/boot | Zero runtime cost, version-controlled, and SEO/theme/manifest are static. Branding changes need a redeploy, which is acceptable.     |
| B              | Branding in the DB, editable in the admin panel                                        | Self-serve, but metadata, theme and manifest must load at runtime with caching, and a bad edit breaks the live site. Much more work. |
| C              | A plus DB fields for things that change often                                          | Deferred. Fields move to the DB only when a real tenant needs it.                                                                    |

Env-vars-only was dropped: theme, navigation and modules have too many values for it. The user chose **A**.

## Design

### Tenant folder layout

```
jnvpjaa-web/tenants/
  _template/            # copy for a new association; placeholder values
  jnvpjaa/
    brand.json          # identity, logos, colours, fonts, socials, contact, domains
    seo.json            # metadata defaults
    features.json       # module on/off map
    content.json        # tenant-specific copy, keyed by usage
    data/               # tenant data files now in src/constants (PastPresidents.json, BatchCoordinators.json, …)
    public/             # favicon, icons/, splashscreens/, assets/images/ that are brand-specific, robots.txt
  README.md             # new-tenant checklist
jnvpjaa-backend/tenants/
  jnvpjaa/
    brand.json          # same schema as web's brand.json (copied)
```

### Loading

- **Web**: `src/config/tenant.ts` reads `tenants/${process.env.TENANT}/*.json` at build time, validates them with zod
  schemas, and exports typed `brand`, `seo`, `features` and `content` objects. A missing or invalid `TENANT` throws
  during `next build`. `next.config.js` reads the same `brand.json` for image `remotePatterns` and service-worker CDN
  patterns.
- **Web public assets**: a `prebuild` step copies `tenants/$TENANT/public/` over `public/`. Brand-specific files are
  removed from the tracked `public/`, which keeps only generic assets.
- **Manifest and robots**: generated from config (`app/manifest.ts`, `app/robots.ts`) instead of static files.
- **Backend**: `src/config/tenant.ts` loads and validates `tenants/${TENANT}/brand.json` at boot, and the process exits
  on error. The existing `org_info` export is rebuilt from it (same shape, so the 7 callers keep working). CORS origins,
  the cookie domain and the default email sender derive from `brand.domains` / `brand.email`.

### What gets replaced

1. Every hardcoded name, domain, URL and social link in `src/` of both repos → `brand.*` / `seo.*`.
2. Theme: palette primary/secondary and fonts come from `brand.theme`. The ~20 components with inline hex colours switch
   to palette tokens (`theme.palette.primary.main`, etc.).
3. Nav (`Header.constants.tsx`, footer) and routes respect `features.*`. A route whose module is off calls `notFound()`.
4. Navodaya/JNV-specific sentences → `content.*`. Generic fallbacks are only allowed where the template provides them.
5. Tenant data JSON in `src/constants` → `tenants/<id>/data/`.
6. Emails: the templates already take brand vars. Remaining literal strings move to brand vars.

### Decisions from review (Claude's calls — correct if wrong)

- **Backend enforces features too.** The backend gets its own copy of `features.json` and guards the resolvers of a
  disabled module (jobs, scholarship, businesses, newsroom, donations/billing/transactions …) with a clear "module
  disabled" error. Otherwise a module hidden in the UI keeps an open API.
- **File flag vs DB toggle.** `features.json` decides whether a module _exists_ for the tenant. The existing
  `PlatformSettings.scholarshipEnabled` / `scholarshipTestMode` / `googleLoginEnabled` remain admin runtime switches. A
  module is live only if both say yes. If the file says off, the admin toggle is hidden.
- **Config vs secret.** Public identifiers go in `brand.json`: the GTM container ID (`analytics.gtmId`, optional) and
  the public asset/content CDN hostnames. Secrets and infra names go in env vars: the Google OAuth client ID/secret, R2
  endpoint, bucket names and credentials, the ZeptoMail token, and DB URLs.
- **Backend zero-hit grep** covers compiled `dist/` from `src/` only. `prisma/seed.ts` and `seed_data/` are JNVPJAA
  data. They move to `tenants/jnvpjaa/seed/`, and the seed script reads them from `TENANT`.
- **Dev-only pages** `typography-lab` and `writing-studio` are not modules. They are hidden in production builds, as
  today if already gated, otherwise behind `NODE_ENV !== 'production'`.

### Content pages (added after the page editor shipped)

The seven pages (President/Principal/Secretary messages, Vision, About, Past Presidents, Bhamashah Pillars) now live
in the `ContentPage` table and are edited in `/admin/pages/`. That changes three things:

- **Their copy is data, not config.** It does not go in `content.json`. `prisma/seed_data/content_pages.json` moves to
  `tenants/<id>/seed/content_pages.json`, and `seed_content_pages.ts` reads it from `TENANT`. `_template` ships a
  placeholder version (generic headings, no people) that a new association fills in from the admin.
- **Visibility is the admin's `visible` toggle only.** No file flag for these pages: an association that has no
  Bhamashah Pillars hides it in the admin. One switch, not two.
- **Allowed image hosts come from config.** `IMAGE_HOSTS` in `contentPages/schema.ts`, the avatar host default in
  `utils/uploads.ts`, and web `next.config.js` `remotePatterns` all derive from `brand.domains` (site, assets CDN,
  content CDN) plus the shared stock hosts. This removes today's "keep in sync" comment between the two repos.

### Shared schema between repos

`brand.json` has one schema, defined twice (a zod schema in each repo). The backend only reads the fields it needs. The
two copies of a tenant's `brand.json` must stay identical. A tiny check script in the web repo can diff them when both
repos sit side by side. _(Builder's call whether to add it.)_

### Verification

- Build web and start backend with `TENANT=jnvpjaa`. Then compare rendered `<head>` metadata, `manifest`, `robots`, a
  sitemap sample, and the rendered email HTML against the current production output. They must be identical apart from
  intentional ordering.
- Build with a `_template`-based dummy tenant (`TENANT=demo`). Grep the build output (`.next/`, backend `dist/`) for
  `jnvpjaa|JNV|Navodaya|Paota`. It must find **zero** hits.
- Build with `TENANT` unset or an invalid config → it must fail with a clear message.

## Left to the builder

- Exact zod schema field names and nesting.
- The `content.json` key naming.
- Order of migration (suggested: config loader → SEO/manifest/robots → theme → nav/features → copy sweep → backend →
  template + README).
- Whether CDN hostnames stay per-tenant domains or one shared bucket with tenant prefixes. Default is per-tenant,
  matching the current `assets.jnvpjaa.org` pattern.
- Whether git history docs (`docs/`, audits, `jnvpjaa.sql`, seed data) are cleaned. Default: leave them. They aren't
  shipped.

## Repo notes

- Changes are left uncommitted per the user's standing instruction (no git commits in JNVPJAA repos).
