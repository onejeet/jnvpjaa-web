# JNVPJAA Web Agent Context

This file captures the current architecture and review context for future agents working in `jnvpjaa-web`.

## Repository Role

`jnvpjaa-web` is the Next.js frontend for the JNVPJAA alumni network. It lives beside `jnvpjaa-backend`, and several
frontend flows depend on the backend GraphQL/auth contract.

Primary stack:

- Next.js App Router under `src/app`
- React 18 client components for most interactive screens
- MUI v6 with custom theme utilities under `src/utils/theme`
- Apollo Client 3.13 plus generated GraphQL hooks in `src/apollo/hooks.ts`
- `next-pwa` with a custom service worker handler under `public/sw-handler.js`
- React Hook Form for forms
- TipTap for rich text editing

Important scripts in `package.json`:

- `npm run dev`: starts Next on port `3890` and points GraphQL to `http://localhost:4000/client`
- `npm run build`: clears previous PWA build output, sets production GraphQL to `https://api.jnvpjaa.org/client`, then
  runs `next build`
- `npm run lint`: Next lint
- `npm run codegen`: regenerates `src/apollo/hooks.ts` from a locally running backend

## Runtime And Server Model

The frontend server is the Next.js runtime. It does not define custom API routes or Next middleware in the current tree.
Authentication protection is client-side through `AuthContext`, while server components mostly render pages and generate
metadata.

The backend server in `../jnvpjaa-backend` is an Express app:

- `src/index.ts` applies Helmet, CORS, Passport initialization, JSON parsing, cookie parsing, `authMiddleware`, then
  Apollo Server at `/client`.
- GraphQL context is created in `src/graphql/index.ts` and provides `{ prisma, req, user: req.user, res }`.
- The schema is assembled with Nexus in `src/graphql/schema.ts`.
- The backend starts on `PORT` or `4000`.

Frontend deployment is Vercel-oriented through `vercel.json` and `@vercel/next`. Backend deployment appears Fly-oriented
(`fly.toml` in backend).

## App Router And Flow Map

Routes are thin wrappers around containers and layouts. Most pages import a container from `src/containers` and
sometimes a shared `LayoutModule`.

Main route examples:

- `/`: `src/app/page.tsx` -> `src/containers/Home/Home.tsx`
- `/signin`: `src/app/signin/page.tsx` -> `src/containers/Auth/Signin`
- `/signup`: `src/app/signup/page.tsx` -> `src/containers/Auth/Signup`
- `/forgot-password`: `src/app/forgot-password/page.tsx` -> forgot/reset password form
- `/profile` and `/profile/[id]`: `ProfileProvider` + `src/containers/Profile`
- `/profile/setup`: onboarding/profile setup flow
- `/members`: member directory
- `/events`, `/events/[id]`, `/events/new`, `/events/edit`: events list/detail/create/edit
- `/blog`, `/blog/[id]`, `/blog/new`: blog list/detail/create/edit
- `/gallery`, `/gallery/[id]`: albums/photo gallery
- `/businesses`: alumni businesses
- `/transactions`: transaction records
- `/admin`: admin panel
- About/static routes: `/about`, `/vision`, `/president-message`, `/secretary-message`, `/principal-message`,
  `/privacy_policy`, `/terms_condition`, `/contact-us`, `/executive-committee`, `/batch-coordinators`,
  `/past-presidents`, `/bhamashah-pillars`

Dynamic metadata pages sometimes use `initializeApollo` to query GraphQL server-side. `events/[id]` forwards cookies
from `next/headers`; some others query without forwarded cookies.

## Provider Stack

Root provider composition is in `src/app/providers.tsx`:

1. Emotion `CacheProvider`
2. `ApolloWrapper`
3. `AuthProvider`
4. `LayoutProvider`
5. `AlertProvider`
6. Global PWA/update/offline/scroll helpers

`src/app/layout.tsx` imports `@/utils/tiptapPatches` before everything else, global CSS, font setup, PWA
manifest/startup metadata, GTM, and Vercel Analytics.

## GraphQL Setup

Active Apollo client:

- `src/apollo/ApolloWrapper.tsx` uses `ApolloNextAppProvider` from `@apollo/experimental-nextjs-app-support`.
- `src/apollo/client.ts` creates the client.
- `HttpLink` points to `process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT` or `http://localhost:4000/client`.
- `credentials: 'include'` is essential because auth tokens are HttpOnly cookies.
- `errorLink` checks GraphQL errors for `extensions.code === 'NOT_AUTHORISED'`, calls `refreshAccessToken`, and retries.
- `authLink` currently only forwards headers; it does not add an authorization token because auth is cookie-based.

SSR/helper Apollo client:

- `src/utils/apollo/index.ts` exposes `initializeApollo(headers?)`.
- It is used by some App Router server pages/metadata functions to query data and optionally forward cookie headers.

Generated hooks:

- `src/apollo/hooks.ts` is generated and should not be hand-edited unless absolutely necessary.
- `npm run codegen` expects backend GraphQL running at `http://localhost:4000/client`.
- Codegen flow:
  - generate schema AST into `src/apollo/all.graphql`
  - use `gqlg` to generate temporary operations into `src/apollo/gqlg`
  - generate TypeScript types/hooks into `src/apollo/hooks.ts`
  - delete temporary schema/operation files
  - prettier generated Apollo files

Primary operation families exposed in generated hooks:

- Auth: signin, signup, logout, refreshToken, forgotPassword, resetPassword
- Users/profile: getUserDetails, getUserList, updateUser, verifyUser, deleteUser
- Addresses/company info: getUserAddresses, upsertMultipleAddresses, create/update/delete company info
- Events: getEventList, getEventDetails, create/update/publish/verify/delete/attend event
- Blog: getBlogList, getBlog, create/update/delete/approve/requestChanges/updateClaps
- Albums/photos/comments/businesses/transactions/batch coordinators

## Auth Flow

Backend auth:

- `signin` validates user, checks `isVerified` and `disabled`, bcrypt-compares password, then sets cookies.
- `signup` creates an unverified member/faculty user, sets `metadata.isFirstLogin = true`, emails admins for approval,
  and does not log the user in.
- `refreshToken` uses `refresh_token` cookie to issue new access and refresh cookies.
- `logout` clears cookies.
- `resetPassword` accepts either authenticated `ctx.user.id` or a reset token.

Token and cookie behavior:

- Access JWT expires in 1 hour.
- Refresh JWT expires in 7 days by default; forgot-password reset tokens use 15 minutes.
- Cookies are `httpOnly`, `secure`, `sameSite: 'None'`, and hard-coded with `Domain: '.jnvpjaa.org'`.

Frontend auth:

- `src/context/AuthContext/AuthContext.tsx` is the main auth gate.
- Browser localStorage key `logged_in` is only a hint. The real session is the backend cookie pair.
- On mount:
  - if `logged_in === 'true'`, fetch `getUserDetails`
  - else, still fetch `getUserDetails` on auth pages and protected pages
- Protected-page convention:
  - any path starting `/profile`
  - any path starting `/admin`
  - any path containing `/new`
  - any path containing `/edit`
- Auth pages are `/signin/`, `/signup/`, `/forgot-password/`.
- On successful sign-in, frontend sets `localStorage.logged_in = 'true'`, resets Apollo cache, sets `user`, and lets
  `AuthContext` redirect.
- If `metadata.isFirstLogin !== false`, AuthContext redirects to `/profile/setup?welcome=1`.
- `isAdmin` is purely `user?.role?.name === 'admin'`; UI can hide/show admin controls, but backend resolvers must
  enforce real permissions.
- Logout clears localStorage, resets Apollo, calls `logout`, then reloads or redirects home.

Auth caveats to remember:

- Because cookie domain is hard-coded to `.jnvpjaa.org` and cookies are always secure, local development auth may not
  persist from `localhost` unless backend cookie settings are adjusted for dev.
- There is no Next middleware protection. Protected pages may initially render on the client before AuthContext finishes
  if a page opts into background rendering.
- Redirect query `r` is base64-decoded and pushed directly. Treat this as an open-redirect risk if untrusted values can
  be supplied.

## Modularization

Directory intent:

- `src/app`: route entry points, metadata, layouts for route groups
- `src/containers`: page-level feature containers and smart components
- `src/modules`: reusable feature modules that can be embedded in multiple flows
- `src/components/common`: reusable app-specific UI components
- `src/components/core`: lower-level wrappers around MUI primitives
- `src/components/form`: React Hook Form field wrappers
- `src/context`: global React contexts for auth, layout, alert, profile, onboarding
- `src/hooks`: cross-feature hooks
- `src/utils`: formatting/helpers/media/network/theme/apollo utilities
- `src/constants`: static menu, address, event, blog, people/coordinator data
- `public`: static assets, PWA manifest, service worker handler
- `OLD_PAGES`: legacy pages kept for reference; do not assume they are active routes

General pattern:

- Pages are thin and mostly pass through to containers.
- Containers own user-facing workflows, data fetching, and page composition.
- Modules own reusable feature widgets like new blog/event forms, list modules, comments, profile setup chunks, and
  TipTap editor.
- Generated GraphQL hooks are imported directly into containers/modules/hooks rather than wrapped in a repository layer.

## PWA, Images, And Theme

- `next.config.js` wraps config with `next-pwa`.
- PWA is disabled when `NEXT_PUBLIC_NODE_ENV === 'development'`.
- Runtime caching covers Next optimized images, `assets.jnvpjaa.org`, `content.jnvpjaa.org`, Unsplash/Pixabay images,
  and Google fonts.
- Remote Next images are allowed from `jnvpjaa.org`, `assets.jnvpjaa.org`, `content.jnvpjaa.org`, `images.unsplash.com`,
  and `cdn.pixabay.com`.
- Several browser-only packages are externalized on the server to avoid SSR build errors.
- Theme overrides live in `src/utils/theme/overrides`; palette, fonts, and typography each have separate folders.

## Review Notes And Risks

Security/high priority:

- Backend secrets and credentials are committed in `../jnvpjaa-backend/src/config/index.ts`. Move defaults/secrets to
  environment variables and rotate exposed values.
- Auth cookies are hard-coded as secure + `.jnvpjaa.org`; this is production-specific and likely breaks localhost cookie
  persistence.
- Cookies use `sameSite: 'None'`, which is necessary for cross-site cookies but increases CSRF exposure unless GraphQL
  mutations have CSRF protection elsewhere.
- Client-side route protection is not a security boundary. Backend resolvers must enforce authorization for every
  privileged query/mutation.
- `redirectOnSignin` decodes and pushes the `r` query directly. Validate same-origin relative paths before redirecting.

Correctness/maintainability:

- Frontend `publicOperations` in `src/apollo/client.ts` uses lowercase names (`signin`, `signup`, etc.), while generated
  operation names are capitalized (`Signin`, `Signup`, etc.) and backend `PUBLIC_OPERATIONS` is also capitalized except
  `refreshToken`. The split probably never treats those frontend operations as public.
- `refreshAccessToken` is typed as `Promise<string | null>` but returns the `refreshToken` mutation object/payload, not
  a string.
- `authMiddleware` calls `verifyJWT(token)` outside a try/catch when an access token exists. An expired/invalid access
  token can throw before refresh fallback.
- Several components contain `console.log('ZZ: ...')` traces and unused imports/dependencies.
- Some dependency arrays are incomplete or duplicated, for example auth/forgot password form callbacks.
- GraphQL operation sources are generated and discarded, so reviews must inspect generated `hooks.ts` or rerun codegen
  to see actual documents.

## Working Guidelines For Future Agents

- Start with `src/app/providers.tsx`, `src/apollo/client.ts`, and `src/context/AuthContext/AuthContext.tsx` for
  cross-cutting behavior.
- For a page bug, start at `src/app/<route>/page.tsx`, then jump to the imported container.
- Do not hand-edit `src/apollo/hooks.ts` unless the user explicitly asks for an emergency generated-file patch. Prefer
  changing backend schema/resolvers and rerunning `npm run codegen`.
- When changing auth, check both frontend AuthContext/Apollo and backend `authMiddleware`, `mutations/auth.ts`,
  `services/token.ts`, and `utils/cookies.ts`.
- When changing protected UI, do not rely only on frontend `isAdmin`; verify backend resolver authorization too.
- If running codegen, start the backend first at port `4000`.
- If running frontend locally, use `npm run dev` and open `http://localhost:3890`.
- Preserve the existing container/module/component split unless the task explicitly calls for architectural cleanup.
