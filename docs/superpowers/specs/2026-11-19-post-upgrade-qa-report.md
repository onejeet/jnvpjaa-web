# Post-upgrade QA and security review (Next 15.5 + Tiptap 3)

Date: 2026-11-19 · Target: local production build (`next build` + `next start` on :3890) against the local API (:4000) and
local test database · Tool: Playwright (Chromium 1248) plus direct GraphQL probes.

## Verdict

The site works after the upgrade. No upgrade regression was found. All code-level findings are now fixed, each with
a test that failed first. What is left needs infrastructure or production access (see the end).

## Coverage

| Area | How | Result |
| --- | --- | --- |
| Whole-site crawl | `e2e/qa-crawl.spec.ts` (`QA_CRAWL=1`): 6 runs (signed out at 1366/375, member at 1366/375, president, superadmin), 51–64 pages each | 0 crashes, 0 console errors, 0 404 links, 0 mobile overflow, 0 missing titles. 1 transient image-optimizer 500 (below) |
| Existing regression suite | `npx playwright test` | 130 passed, 8 skipped, 1 known failure (tenant-identity head diff −6/+2, unchanged) |
| Functional flows | `e2e/qa-flows.spec.ts` | Sign-up and forgot-password validate without sending; failed sign-in shows an error; member search shows its empty state |
| Security | `e2e/qa-security.spec.ts` + GraphQL probes | See below |
| Node unit tests | `node --test tests/*.test.cjs` | 23 passed, 3 known alias failures |
| Backend tests | `npm run test:security`, `test:events`, `test:jobs` | 5, 2 and 19 passed |

## Fixed (tests written first, watched fail, then pass)

1. **Open redirect after sign-in (high).** `?r=` decoded to `/\t/evil.example` (or `/\n/…`) passed all three guards.
   The browser strips the tab, so after sign-in the user landed on `http://evil.example/`. Confirmed in a real browser.
   Fixed by one shared `safeReturnPath()` in `src/utils/routeAccess.ts`. It checks the *resolved* origin. Sign-in form,
   AuthContext and the Google button all use it now. Test: `qa-security` "sign-in return path …" (5 cases).
2. **Missing or unpublished blog/event URLs answered 500 (medium, SEO).** The API returns `{ message, code }` with no
   `extensions.code`, so the not-found check never matched and the page threw. Crawlers treat 5xx as server failure,
   and authors opening a draft link got an error screen. Fixed with `graphqlErrorCode()` in `src/utils/index.ts` (reads
   either place). It's used by the blog and event routes and by the Apollo token-refresh link, which also never fired
   for the same reason. The Google callback inlines the same fallback because its node test loads it standalone.
   Test: `public-pages` "missing content … answers 404".
3. **`X-Powered-By: Next.js` header (low).** `poweredByHeader: false`. Test: `qa-security` "baseline security headers".

## Verified secure

- Authorization: a member could not read, edit, delete, publish or close another user's blog, job, event, company info
  or address. Members also could not delete users, remove members, assign roles, mass-email, record billing, manage
  news or wipe scholarship data. `createBlog` ignores a spoofed `authorId`; `createCompanyInfo` ignores a spoofed `userId`.
- Stored XSS: rich text (blog, business, about-me) is sanitised on the server. Profile payloads render as text in the
  browser, and no script ran (`qa-security` "stored XSS payloads never execute"). JSON-LD escapes `<`, `>` and `&`.
- CSRF prevention is on (text/plain POST rejected). CORS reflects only the site origin. Auth rate limits count per
  resolver call, so aliases and batching don't get around them. The trust-proxy IP is used, not raw X-Forwarded-For.
- Cookies: HttpOnly, and Secure plus SameSite=None in production.
- Headers: X-Frame-Options DENY, nosniff, Referrer-Policy and Permissions-Policy are set. The API also sends HSTS.
- No exposed source maps, `.env`, `.git` or `.next` files. Protected routes redirect signed-out visitors.
- Sitemap lists only public URLs.

## Fixed in the second round

4. **RBAC admins failed admin checks (medium, backend).** `isAdminUser` read only the legacy `user.role`, so a
   super-admin appointed in the admin panel couldn't moderate businesses or pass any `requireAdmin` /
   owner-or-admin check. The auth middleware now loads the user's active global SUPER_ADMIN / PLATFORM_ADMIN
   assignments (`activeAdminAssignments()` in `src/utils/roles.ts`, same validity rules as admin emails), and
   `isAdminUser` accepts them. Every admin check reads the request user, so one change covers all of them. Test:
   `qa-security` "an RBAC super-admin can moderate businesses".
5. **Content-Security-Policy (medium hardening).** An enforced baseline: `object-src 'none'; base-uri 'self';
   frame-ancestors 'none'; form-action 'self'`. None of these can break GTM, uploads or embeds; the crawl stayed at 0
   console errors. Test: `qa-security` "baseline security headers".
6. **Unvalidated fields (low).** `displayName` / `nickName` refuse `<` and `>`. `updateUser` metadata is admin-only;
   members finish setup through `completeProfileSetup`, and no client sent metadata. Business `website` / `logoUrl`
   must be https (same helper as jobs), and `updateBusiness` now sanitises `description` like `createBusiness` does.
   Tests: `qa-security` "profile writes reject markup…" and "business links must be https…".
7. **Debug logging (low).** All `console.log` debug output is removed (including logs of whole query results and
   member data). Logs in error paths became `console.error`.
8. **`/jobs/<missing>` was a soft 404 (low, SEO).** `jobs/loading.tsx` wrapped the detail page, so the 200 shell
   streamed before `notFound()`. The board's page and skeleton moved to `src/app/jobs/(board)/` (same URL). Missing
   jobs now answer 404; the detail page no longer has a skeleton. Test: `public-pages` "missing content /jobs/…".
9. **Event short links (low).** `createEvent` called is.gd for every event, drafts included. A link is now made only
   once an event is published, on any of the four publish paths. Test: backend `event-ended` "only published events…".
10. **Smaller cleanups.** Deleted the unused `BusinessCard` (it linked to a `/business/<id>` route that doesn't exist)
    and its `paths.business`; deleted the unused `FontSizeSelect`; `JSX.Element` → `React.JSX.Element`; blog/event
    client-navigation titles no longer repeat the brand ("Blog | JNVPJAA | JNVPJAA").

## Needs infrastructure or production access

- **Full CSP allow-list.** Restricting `script-src` / `connect-src` / `img-src` needs a CSP report endpoint and a
  report-only run in production: GTM can inject tags, and uploads go to the production R2 host.
- **HSTS on the frontend.** Set it at the host (Vercel) for the apex and www.
- **Rate limiting is in memory.** Fine for one API instance. Several instances need a shared store (Redis).
- **GraphQL introspection.** Check that production runs with `NODE_ENV=production` so introspection stays off.
- **Gallery source images.** Originals up to 1.8 MB slow the first image-optimizer fetch. Resize them in R2/assets.
- **Lighthouse** was not run; `npx lighthouse` needs your permission to download.

## Notes

- Image optimizer: the first fetch of large gallery originals (1.8 MB) takes about 4.5 s and failed once under crawl
  load, then served from cache. Consider smaller source images.
- One probe event triggered one is.gd request during the first round (before fix 9).
- Two test businesses ("QA xss business", "QA moderation fixture", both unverified) remain in the local database;
  businesses can't be deleted. The tests reuse the fixture.
- `.next-leaks/types` (ignored output of `scripts/tenant-leaks.sh`) was deleted: its stale route types pointed at the
  old `jobs/page.tsx` and broke `next build`. The script regenerates it.
- Lighthouse was not run (the `npx lighthouse` download was denied).
