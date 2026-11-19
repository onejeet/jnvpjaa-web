# Tenants

Each alumni association is its own deployment of the same code. The `TENANT` variable picks the folder `tenants/<id>/`
in both repos (`jnvpjaa-web` and `jnvpjaa-backend`). Nothing is shared between tenants at runtime.

| Folder       | What it holds                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| `jnvpjaa/`   | The live JNVPJAA configuration.                                                                       |
| `demo/`      | A fictional tenant used by `npm run tenant:leaks` to prove no JNVPJAA strings ship to another tenant. |
| `_template/` | Starting point for a new association. The leading underscore means it can't be selected as `TENANT`.  |

## Files per tenant

Web (`jnvpjaa-web/tenants/<id>/`):

- `brand.json`: name, legal name, institution, domains, contact details, socials, logos and theme colours. It must be
  **byte-identical** to the backend copy: `npm run tenant:check` (web) and `npm run test:tenant` (backend) enforce this.
- `seo.json`: titles, descriptions, keywords and the structured data for the home page.
- `features.json`: which modules are on (jobs, scholarship, gallery…). Turning a module off hides it on the web and
  blocks its API on the backend.
- `content.json`: every piece of UI copy that names the association, read through `t('key')`. A missing key throws an
  error at build time.
- `landing.json`: the home page design. `layout` is `classic` (the original page) or one of the landing layouts
  `homecoming` (photo-led), `welcome` (classmate finder and pathways), `spotlight` (story-led, with quick links) or
  `impact` (giving-led). The layout is picked at build time: `next.config.js` points `@landing/Home` at
  `src/containers/Landing/home/<layout>.tsx`, so a build carries only that layout's code and CSS, and changing `layout`
  needs a rebuild and redeploy. The file also holds the hero title, subtitle and photos (asset paths), the vision line,
  up to four published figures, and the join and giving copy. News, stories, events, birthdays and albums are read from
  the API on every request, and each layout asks only for what it shows. In development only,
  `/preview/landing/<layout>` (`page.dev.tsx`) shows any layout with the current tenant's content; production builds
  leave that route out.
- `fonts/`: `body.woff2`, `display.woff2` and `serif.woff2` (variable fonts).
- `public/`: favicon, PWA icons, splash screens and local branding images. `npm run dev` and `npm run build` copy these
  into `public/`, and a switch of tenant removes the previous tenant's files.

Backend (`jnvpjaa-backend/tenants/<id>/`):

- `brand.json` and `features.json`: the same files as on the web.
- `content.json`: email-only wording (`schoolNickname`, `alumniDemonym`, `footerLogoUrl`, `birthdaySubject`).
- `seed/content_pages.json`: the starting text for the seven editable pages.

Personal data (members, coordinators, businesses, blogs, albums) never goes in a tenant folder;
`tenants/*/public/assets/profile/` (member photos) is gitignored for that reason. It lives outside the repo in the
folder named by `SEED_DATA_DIR`, which `prisma/seed.ts` and the backfill script read.

## Adding an association

1. Copy `_template/` to `tenants/<new-id>/` in **both** repos. The id must be lowercase letters, digits or `-`.
2. Fill in `brand.json` and copy it to the other repo unchanged. Then fill in `seo.json`, `features.json`,
   `landing.json`, both `content.json` files and `seed/content_pages.json`.
3. Add the `public/` assets (favicon, `icons/icon-192.png`, `icons/icon-512.png`, `icons/logo-square.png`,
   `splashscreens/apple-icon-180.png`, `assets/branding/logo-full.webp`, `assets/images/cover-2.webp`) and the three
   fonts.
4. Upload the shared image set to the tenant's assets CDN (`https://<brand.domains.assets>`), because the web loads
   these through `assetUrl()`:
   - `/branding/logo-square-white.{jpg,webp}`
   - `/events/<category>.jpg` (one per event category)
   - `/gif/celebration.gif`
   - `/images/{career-councelling,contact-us-3,cover-2,cover,donation}.webp`
   - `/people/principal.webp`
   - `/svg/{alumni-impact,clap_icon,triangle-spin,under_construction,underline,verified}.svg`
5. Run `npm run tenant:check` (both repos have the tenant and the same `brand.json` and `features.json`) and
   `TENANT=<new-id> npm run build` (a missing content key or an invalid file fails the build). Run
   `npm run tenant:leaks` if you changed shared code.
6. In Coolify, set `TENANT=<new-id>` on **both** apps: as a **build** variable for the web (it is baked into the bundle)
   and as a **runtime** variable for the backend. On the backend, also set `SEED_DATA_DIR` if you will seed private
   data, and `SMTP_HOST` only if you use direct SMTP. Set the usual secrets and the domain names from `brand.json`.
7. Deploy, run the content-page seed once, then sign in and edit the seven pages under `/admin/pages/`.

## Checks

- `npm run tenant:check`: checks that both repos have the same tenants and the same `brand.json` and `features.json` for
  each one.
- `npm run tenant:leaks`: builds web and backend as `demo` and fails if any JNVPJAA string reaches the output. It
  ignores build-machine paths and base64 data. Afterwards it restores the local tenant's `public/` files and the
  service-worker files.

Files removed from the repo in this migration (member lists, coordinator data and so on) still exist in git history.
