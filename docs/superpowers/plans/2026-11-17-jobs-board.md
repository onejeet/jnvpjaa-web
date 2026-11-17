# Jobs & Internships Board Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Members post jobs and internships and apply to them in one step. Each job shows how many members have applied,
and the poster sees applicants on a private page.

**Architecture:**

- **Backend:** two new Prisma tables, `Job` and `JobApplication`, and one permission, `jobs.moderate`. The rules live in
  `src/services/jobs.ts`. Like the newsroom service, every function takes `(ctx, …, db = prisma)` so tests can pass a
  fake database. Nexus files stay thin.
- **Web:** `/jobs` and `/jobs/[slug]` are server components that fetch on every request, the way `/newsroom` does.
  Posting, applying and the applicants page are client components using hand-written Apollo operations.

**Tech Stack:**

- Backend: Prisma, Nexus, Apollo Server, `node:test` via ts-node
- Web: Next 14 app router, MUI, Apollo Client, Tabler icons, `node:test` `.cjs` tests

**Spec:** `jnvpjaa-web/docs/superpowers/specs/2026-11-17-jobs-board-design.md`

## Global Constraints

- **Never `git commit`, `git push` or `git stash`.** Leave every change uncommitted. Each "Checkpoint" step only lists
  the changed files.
- **Node:** `export PATH=$HOME/.nvm/versions/node/v22.23.4/bin:$PATH` before any npm or npx command.
- **Icons:** `@tabler/icons-react` only.
- **Web operations:** go in `src/apollo/jobsOperations.ts`. Never edit `src/apollo/hooks.ts`.
- **Who can do what:**
  - Logged-out visitors can read jobs.
  - Writes need `requireAuthenticatedUser(ctx)` (approved, active member).
  - Poster-or-moderator checks use `hasPermission(user.id, 'jobs.moderate')`.
- **Applicant fields are an explicit allowlist:**
  - Shown: `firstName`, `lastName`, `profileImage`, `batch`, `email`, `mobile`, `whatsAppMobile`, `city`, `state`,
    `aboutMe`, `socialMedia`, and current `companyInfo` (`companyName`, `position`).
  - Never selected: `emergencyMobile`, `extraEmail`, `extraMobile`, addresses, `dob`.
- **Validation limits:**
  - Title 5–120 characters; company 2–120.
  - Location is required unless the work mode is `REMOTE`.
  - At most 15 skills, each up to 40 characters.
  - Every URL must match `^https://\S+$`.
  - `salaryMin ≤ salaryMax`, both ≥ 0.
  - The note is at most 1000 characters.
  - The description, once sanitised, must contain text.
- **Description sanitising:** the newsroom allowlist without `img`, `figure` and `figcaption`.
- **Deadline:** the web sends `deadlineDate: 'YYYY-MM-DD'`. The backend stores `deadline` as the instant applications
  close, which is the start of the next day in IST: `new Date(\`${d}T00:00:00+05:30\`) +
  24h`. A job is **accepting** when `status = OPEN AND (deadline IS NULL OR deadline > now)`. On create, a date before
  today (IST) is rejected.
- **Slugs:** `generateSlug(\`${title} ${company}\`, 'job')`, with `-2`, `-3`, … appended on a clash. `new` is reserved.
- **Edit route:** `/jobs/new?slug=…` instead of `/jobs/edit/[id]`. This follows the house create-and-edit pattern
  (`/newsroom/new?id=`), and the middleware already protects the `/new` segment. It loads through `job(slug)`, so no
  extra by-id query is needed.

## Review Focus

1. **Duplicate apply:** a double-click or two tabs submitting at once. The second request must get the friendly error
   "You have already applied", not a 500. Test: map Prisma `P2002` to that error (Task 2).
2. **Deadline day in IST:** a job with deadline 2026-11-20 still accepts at 23:30 IST on the 20th and refuses at 00:10
   IST on the 21st. Test in Task 2.
3. **Applicant data leak:** `jobApplicants` called by a member who is neither the poster nor a moderator must throw. Its
   Prisma `select` must not contain hidden fields. Test in Task 2.
4. **Closed or expired job by link:** `job(slug)` still returns it with `isAccepting: false`, and `applyToJob` refuses
   it. Test in Task 2.
5. **Poster applying to their own job:** refused. Test in Task 2.

---

### Task 1: Data model, migration, permission

**Files:**

- Modify: `jnvpjaa-backend/prisma/schema.prisma`. Add the enums, `Job`, `JobApplication`, and back-relations on `User`
  (`jobsPosted`, `jobApplications`).
- Create: `jnvpjaa-backend/prisma/migrations/20261119000000_jobs_board/migration.sql`
- Modify: `jnvpjaa-backend/src/constants/access.ts`
  - Add `JOBS_MODERATE: 'jobs.moderate'`.
  - Add a catalogue entry: name "Moderate Jobs", category "Jobs", description "Edit, close or remove any job post and
    see its applicants".
  - Grant it wherever `NEWSROOM_POST_MANAGE` is granted (PLATFORM_ADMIN, PRESIDENT, SECRETARY; SUPER_ADMIN gets it
    automatically).
- Modify: `jnvpjaa-web/src/constants/access.ts`. Add the same code.

**Interfaces:**

- Produces Prisma enums:
  - `JobType` (`FULL_TIME PART_TIME INTERNSHIP CONTRACT`)
  - `WorkMode` (`ONSITE REMOTE HYBRID`)
  - `JobExperience` (`FRESHER JUNIOR MID SENIOR`)
  - `JobStatus` (`OPEN CLOSED`)
  - `JobPosterRelation` (`HIRING_AT_COMPANY REFERRAL_LEAD`)
  - `SalaryPeriod` (`YEAR MONTH`)
- Produces models `prisma.job` and `prisma.jobApplication`, with the fields from the spec. Columns are snake_case
  `@map`. Tables are `jobs` and `job_applications`.
- Relations:
  - `Job.postedBy`: `onDelete: Restrict`
  - `JobApplication.job`: `onDelete: Cascade`
  - `JobApplication.applicant`: `onDelete: Cascade`
- Constraints and indexes: `@@unique([jobId, applicantId])`, `@@index([status, deadline, createdAt])`,
  `@@index([applicantId])`

- [ ] **Step 1:** Edit the schema. Run `npx prisma format && npx prisma validate` in `jnvpjaa-backend`. Expected: "The
      schema … is valid".
- [ ] **Step 2:** Generate the SQL with
      `npx prisma migrate diff --from-migrations prisma/migrations --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/20261119000000_jobs_board/migration.sql`.
      That needs a shadow DB: add `--shadow-database-url "$DATABASE_URL"` if one is local. Otherwise use
      `--from-schema-datamodel` on the previous schema copy. Check the SQL is additive only (CREATE TYPE, CREATE TABLE,
      CREATE INDEX, ADD FOREIGN KEY).
- [ ] **Step 3:** Run `npx prisma generate`, then `npx tsc --noEmit`. Expected: exit 0.
- [ ] **Step 4:** Checkpoint. Files: the schema, the migration, both `access.ts` files.

### Task 2: Jobs service and tests

**Files:**

- Create: `jnvpjaa-backend/src/services/jobs.ts`
- Create: `jnvpjaa-backend/tests/jobs.test.ts`. Use the fake-prisma fixture style from `tests/newsroom.test.ts`, with
  `job` and `jobApplication` delegates.
- Modify: `jnvpjaa-backend/package.json`. Add `"test:jobs": "ts-node -r tsconfig-paths/register tests/jobs.test.ts"`.

**Interfaces:**

- Consumes: Task 1 enums and models; `authorize`, `hasPermission` and `requireAuthenticatedUser` from
  `@/services/accessControl`; `recordActivity`; `generateSlug`.
- Produces (exported from `src/services/jobs.ts`):
  - `deadlineFromDate(date: string): Date`. Throws badRequest when the input isn't `YYYY-MM-DD`.
  - `acceptingWhere(now?: Date)`, returning `{ status: 'OPEN', OR: [{ deadline: null }, { deadline: { gt: now } }] }`
  - `isAccepting(job, now?: Date): boolean`
  - `listJobs(ctx, { type, workMode, experience, search, mine, applied, limit, offset }, db?)`, returning
    `{ data, total }`.
    - The default list uses `acceptingWhere`.
    - `mine` lists all the caller's jobs; `applied` lists jobs the caller has an application on. Both require login.
    - `search` matches `title`, `company`, `location` (case-insensitive contains) or a tag in `skills`.
    - `limit` defaults to 12 and is capped at 50.
    - Order: `createdAt desc`.
    - Each row includes `_count: { select: { applications: true } }` and the `postedBy` public select
      (`id, firstName, lastName, profileImage, batch`).
  - `getJob(ctx, slug, db?)` returns the job or null. It adds `viewerApplication` (the caller's row or null) and
    `viewerCanManage` (poster or `jobs.moderate`).
  - `saveJob(ctx, input: JobInput, db?)` creates, or updates when `input.id` is set. Updating requires poster or
    moderator. `postedById` never changes.
  - `setJobStatus(ctx, id, status, db?)` and `deleteJob(ctx, id, db?)`: poster or moderator only.
  - `applyToJob(ctx, jobId, input: JobApplicationInput, db?)` returns the application.
  - `withdrawApplication(ctx, jobId, db?)` returns `true`. Withdrawing is allowed even after the job closes.
  - `listApplicants(ctx, jobId, db?)`: poster or moderator only. Returns applications ordered by `createdAt desc`, each
    with `applicant` loaded through `APPLICANT_SELECT`.
  - `APPLICANT_SELECT` is an exported constant: exactly the allowlist from Global Constraints, plus
    `companyInfo: { where: { isCurrent: true }, select: { companyName, position }, take: 1 }`.
- Types:
  - `JobInput`:
    `{ id?, title, company, companyWebsite?, type, workMode, location?, experience, salaryMin?, salaryMax?, salaryPeriod?, description, skills, posterRelation, applyUrl?, deadlineDate?, status? }`
  - `JobApplicationInput`: `{ resumeUrl?, linkedinUrl?, githubUrl?, portfolioUrl?, note? }`
- Activity entries use `entityType: 'JOB'`, `batch: null`, and these actions: `JOB_CREATED`, `JOB_UPDATED`,
  `JOB_CLOSED`, `JOB_REOPENED`, `JOB_DELETED`, `JOB_APPLIED`, `JOB_WITHDRAWN`.

- [ ] **Step 1: Write failing tests** in `tests/jobs.test.ts`:
  - `deadline closes at end of day IST`:
    - `deadlineFromDate('2026-11-20').toISOString() === '2026-11-20T18:30:00.000Z'`
    - `isAccepting({status:'OPEN', deadline}, new Date('2026-11-20T18:00:00Z'))` is true; at `'2026-11-20T18:40:00Z'` it
      is false.
  - `saveJob validates`:
    - Rejects title `'Dev'`, a location missing on `ONSITE`, `applyUrl: 'http://x'`, `salaryMin 50 > salaryMax 10`, 16
      skills, and `deadlineDate` yesterday.
    - Accepts `REMOTE` with no location.
    - Strips `<script>` and `<img>` from the description.
  - `saveJob create`: `postedById === actor.id`, the slug is `generateSlug('Intern Acme', 'job')`, status `OPEN`, and
    one `JOB_CREATED` activity row is written.
  - `saveJob update by stranger throws`; `saveJob update by moderator succeeds` (fixture `canModerate: true`).
  - `applyToJob`:
    - Succeeds for an open job.
    - Throws for the poster's own job.
    - Throws for a `CLOSED` job and for a past deadline.
    - Throws `'You have already applied'` when `create` rejects with `{ code: 'P2002' }`.
    - Rejects `resumeUrl: 'drive.google.com/x'` (not https) and a note of 1001 characters.
  - `withdrawApplication` deletes the caller's row only (where
    `{ jobId_applicantId: { jobId, applicantId: actor.id } }`).
  - `listApplicants`:
    - Throws for a stranger.
    - For the poster, the `findMany` call's `include.applicant.select` deep-equals `APPLICANT_SELECT`.
    - `APPLICANT_SELECT` has no `emergencyMobile`, `extraEmail`, `extraMobile`, `dob` or `addresses` key.
  - `listJobs default uses acceptingWhere` (inspect the `where` passed to `findMany`);
    `listJobs mine without login throws`.
- [ ] **Step 2:** `npm run test:jobs`. Expected: FAIL (module not found).
- [ ] **Step 3:** Implement `src/services/jobs.ts` against the interfaces above. Run every write in
      `db.$transaction(async tx => …)` together with `recordActivity`, as `saveNewsPost` does.
- [ ] **Step 4:** `npm run test:jobs` and `npm run test:newsroom`. Expected: all pass.
- [ ] **Step 5:** Checkpoint. Files: `src/services/jobs.ts`, `tests/jobs.test.ts`, `package.json`.

### Task 3: GraphQL schema and sitemap entries

**Files:**

- Create: `jnvpjaa-backend/src/graphql/types/jobs.ts`
- Create: `jnvpjaa-backend/src/graphql/queries/jobs.ts`
- Create: `jnvpjaa-backend/src/graphql/mutations/jobs.ts`
- Modify: `jnvpjaa-backend/src/graphql/schema.ts`. Register them the way the newsroom types are registered.
- Modify: `jnvpjaa-backend/src/graphql/queries/seo.ts`. Add accepting jobs as `/jobs/${slug}/`.

**Interfaces:**

- Consumes: the Task 2 service functions.
- Produces this GraphQL surface. The web depends on these exact names.
  - Enums: `JobType`, `WorkMode`, `JobExperience`, `JobStatus`, `JobPosterRelation`, `SalaryPeriod`.
  - `JobPoster { id, firstName, lastName, profileImage, batch }`
  - `Job`:
    - All model fields. `deadline: DateTime`; `skills: [String!]!`.
    - `postedBy: JobPoster!`
    - `applicationCount: Int!`, resolved from `_count.applications`.
    - `isAccepting: Boolean!`
    - `viewerHasApplied: Boolean!`
    - `viewerCanManage: Boolean!`
    - `viewerApplication: JobApplication`
  - `JobListResponse { data: [Job!]!, total: Int! }`
  - `JobApplicant { id, firstName, lastName, profileImage, batch, email, mobile, whatsAppMobile, city, state, aboutMe, socialMedia: JSON, companyName, position }`
  - `JobApplication { id, jobId, resumeUrl, linkedinUrl, githubUrl, portfolioUrl, note, createdAt, applicant: JobApplicant }`
  - Inputs: `JobInput` and `JobApplicationInput`, matching Task 2's types. `deadlineDate` is a `String`.
  - Queries:
    - `jobs(type, workMode, experience, search, mine, applied, limit, offset): JobListResponse!`
    - `job(slug: String!): Job`
    - `jobApplicants(jobId: String!): [JobApplication!]!`
  - Mutations:
    - `saveJob(input: JobInput!): Job!`
    - `setJobStatus(id: String!, status: JobStatus!): Job!`
    - `deleteJob(id: String!): Boolean!`
    - `applyToJob(jobId: String!, input: JobApplicationInput!): JobApplication!`
    - `withdrawApplication(jobId: String!): Boolean!`

- [ ] **Step 1:** Write the three Nexus files.
- [ ] **Step 2:** Run `npx tsc --noEmit`, then the backend's schema generation command (the `generate`/`nexus` script in
      `package.json`). Expected: exit 0, and `src/graphql/generated/schema.graphql` contains `type Job` and
      `jobApplicants`.
- [ ] **Step 3:** Run every backend `test:*` script. Expected: all pass.
- [ ] **Step 4:** Checkpoint. Files: the three new files, `schema.ts`, `seo.ts`, the generated schema.

### Task 4: Web foundations (operations, utils, paths, menu, sitemap)

**Files:**

- Create: `jnvpjaa-web/src/apollo/jobsOperations.ts`. TS types mirroring Task 3, plus these gql documents:
  - `JOBS`, `JOB`, `JOB_APPLICANTS`
  - `SAVE_JOB`, `SET_JOB_STATUS`, `DELETE_JOB`
  - `APPLY_TO_JOB`, `WITHDRAW_APPLICATION`
  - Share one `JOB_FIELDS` fragment.
- Create: `jnvpjaa-web/src/modules/Jobs/jobs.utils.ts`. Dependency-free, exporting:
  - `JOB_TYPE_LABEL`, `WORK_MODE_LABEL`, `EXPERIENCE_LABEL` (`FRESHER: 'Fresher (0 yrs)'`, `JUNIOR: '1–3 yrs'`,
    `MID: '3–7 yrs'`, `SENIOR: '7+ yrs'`)
  - `formatSalary(min?, max?, period?): string | null`. Indian grouping with ₹, e.g. `'₹6,00,000 – ₹9,00,000 / year'`;
    with only one bound, `'From ₹20,000 / month'` or `'Up to …'`.
  - `deadlineLabel(deadlineIso?): string | null`. The IST date of `deadline − 1ms`, formatted `'Apply by 20 Nov 2026'`.
  - `socialUrl(platform: 'linkedin'|'github', handle?): string`, giving `https://www.linkedin.com/in/<h>` or
    `https://github.com/<h>`. Used to pre-fill the apply form.
- Create: `jnvpjaa-web/tests/jobs-utils.test.cjs`, loaded the same way as `tests/newsroom-utils.test.cjs`.
- Modify: `jnvpjaa-web/src/config/paths.ts`. Add
  `jobs: { root: '/jobs', new: '/jobs/new', getJobUrl, getEditUrl, getApplicantsUrl }`.
- Modify: `jnvpjaa-web/src/constants/Header.constants.tsx`:
  - Add `PAGE.jobs = { label: 'Jobs & Internships', path: '/jobs', description: 'Openings shared by alumni' }`, placed
    after `PAGE.businesses` in both Alumni Center menus.
  - Add `{ label: 'Post a Job', path: '/jobs/new', icon: <IconBriefcase /> }` to `ADD_ENTITIES`.
- Modify: `jnvpjaa-web/src/constants/menuIcons.ts`. Map `/jobs` to `IconBriefcase`.
- Modify: `jnvpjaa-web/src/app/sitemap.ts`. Add `/jobs/` as a static route (priority 0.7), and add `jobs` to the
  dynamic-path regex.

- [ ] **Step 1:** Write failing tests in `tests/jobs-utils.test.cjs`:
  - `formatSalary(600000, 900000, 'YEAR') === '₹6,00,000 – ₹9,00,000 / year'`
  - `formatSalary(20000, null, 'MONTH') === 'From ₹20,000 / month'`
  - `formatSalary(null, null) === null`
  - `deadlineLabel('2026-11-20T18:30:00.000Z') === 'Apply by 20 Nov 2026'`
  - `socialUrl('github', 'octo') === 'https://github.com/octo'`
  - `socialUrl('linkedin', '') === ''`
- [ ] **Step 2:** `node --test tests/jobs-utils.test.cjs`. Expected: FAIL.
- [ ] **Step 3:** Implement the files above.
- [ ] **Step 4:** Run `node --test tests/*.test.cjs` and `npx tsc --noEmit` in `jnvpjaa-web`. Expected: pass, exit 0.
- [ ] **Step 5:** Checkpoint. Files: everything listed above.

### Task 5: Jobs list page

**Files:**

- Create: `jnvpjaa-web/src/app/jobs/page.tsx`. Server component, `force-dynamic`. Fetches `JOBS` with `searchParams`:
  `type`, `mode`, `exp`, `q`, `page`. Metadata uses `constructMetadata({ url: '/jobs/' })`.
- Create: `jnvpjaa-web/src/containers/Jobs/JobCard.tsx`, `JobsBoard.tsx` and `index.ts`.

**Interfaces:** consumes `JOBS`, `paths.jobs`, `jobs.utils`, and `useAuth` (to show the tabs).

What the page shows:

- A hero line, "Jobs & Internships · Openings shared by fellow alumni", with a **Post a job** button. Logged-out
  visitors are sent to `/signin`.
- Filter chips for type, work mode and experience, plus a search field. Changing them updates the URL query, so a
  refresh keeps the filters.
- For logged-in members, tabs **All · Posted by me · Applied**. The two personal tabs are client-fetched with `mine` or
  `applied`.
- Each `JobCard` shows:
  - The title, linked to the job page
  - Company · location
  - Type and work-mode chips
  - The salary from `formatSalary`
  - "Posted by {first} {last} · batch {n}"
  - `IconUsers` with "{applicationCount} applied"
  - `deadlineLabel`
  - A "Closed" chip when `!isAccepting`
- An empty state uses `EmptyView` with "No openings yet — be the first to post one".
- Pagination: 12 per page.

- [ ] **Step 1:** Build the page and components.
- [ ] **Step 2:** `npx tsc --noEmit && npm run lint`. Expected: no errors.
- [ ] **Step 3:** Checkpoint.

### Task 6: Job page and apply dialog

**Files:**

- Create: `jnvpjaa-web/src/app/jobs/[slug]/page.tsx`. Server fetch through `cache()`, like the newsroom page.
  - Metadata: title `"{title} at {company} | JNVPJAA Jobs"`, with `robots: noindex` when `!isAccepting`.
  - `notFound()` when the job is null.
  - JSON-LD `JobPosting`: title, description, datePosted, validThrough = deadline, employmentType, hiringOrganization =
    company, jobLocation or `jobLocationType: 'TELECOMMUTE'`, baseSalary when set.
- Create: `jnvpjaa-web/src/containers/Jobs/JobDetail.tsx`, `ApplyDialog.tsx` and `JobOwnerActions.tsx`.

**Interfaces:** consumes `JOB`, `APPLY_TO_JOB`, `WITHDRAW_APPLICATION`, `SET_JOB_STATUS`, `DELETE_JOB`, `paths.jobs`,
and `useAuth().user.socialMedia` for pre-filling.

What the page shows:

- A facts header and the "{N} applied" count.
- A "No longer accepting applications" banner when `!isAccepting`.
- The description, rendered as sanitised HTML, the way news is rendered.
- Skills chips.
- A poster card with the label "Hiring at this company" or "Shared a lead".
- A client island fetches `JOB` for the viewer fields:
  - **Apply button:**
    - Logged out: links to `/signin?redirect=/jobs/{slug}`.
    - Poster: hidden.
    - Already applied: shows "Applied ✓ on {date} · Withdraw". Withdraw asks for confirmation through `AlertDialog`.
  - `applyUrl`, when set, appears as a secondary link: "Also apply on company site".
  - `viewerCanManage` shows `JobOwnerActions`: Edit, Close/Reopen, Delete (confirmed through `AlertDialog`, then back to
    `/jobs`), and "View applicants ({N})".
- **ApplyDialog fields:**
  - Resume link, labelled "Resume link (Google Drive, Dropbox…)"
  - LinkedIn
  - GitHub
  - "Portfolio or other profile (Behance, LeetCode, personal site…)"
  - Note: multiline, with a 1000-character counter
  - LinkedIn and GitHub are pre-filled through `socialUrl`.
  - A help line: "The poster will see your profile details (name, batch, contact, current company) and these links."
  - Fields are validated with https before submit.
  - On success, refetch `JOB` and show a snackbar, "Application sent".

- [ ] **Step 1:** Build the page and components.
- [ ] **Step 2:** `npx tsc --noEmit && npm run lint`. Expected: no errors.
- [ ] **Step 3:** Checkpoint.

### Task 7: Post/edit job form

**Files:**

- Create: `jnvpjaa-web/src/app/jobs/new/page.tsx`. Same shape as `src/app/newsroom/new/page.tsx`: `?slug=` means edit,
  and metadata is noindex.
- Create: `jnvpjaa-web/src/modules/JobEditor/JobEditor.tsx` and `index.ts`.

**Interfaces:** consumes `JOB` (when editing, loaded by `?slug=`; its `id` goes into `SAVE_JOB`), `SAVE_JOB`, and
`TipTapTextEditor`. `paths.jobs.getEditUrl(slug)` returns `/jobs/new?slug=<slug>`.

What the form holds, in one column with sections:

- **The role:** title, company, company website
- **Details:** type, work mode, location (hidden when `REMOTE`), experience, skills (MUI Autocomplete
  `freeSolo multiple`)
- **Pay** (optional): min, max, per year or month. When the type is `INTERNSHIP`, the period defaults to `MONTH` and the
  label reads "Stipend".
- **Description:** TipTap
- **How you're connected:** a radio, "I work at this company" or "A friend shared this opening"
- **Applying:** a deadline date, plus an optional external apply link
- The Submit button reads "Post job" (create) or "Save changes" (edit), and redirects to the job page.
- Server errors show inline through `Alert`.
- Edit is refused in the UI when `!viewerCanManage`. The API enforces it anyway.

- [ ] **Step 1:** Build the form.
- [ ] **Step 2:** `npx tsc --noEmit && npm run lint`. Expected: no errors.
- [ ] **Step 3:** Checkpoint.

### Task 8: Applicants page

**Files:**

- Create: `jnvpjaa-web/src/app/jobs/[slug]/applicants/page.tsx`. A thin server wrapper with noindex metadata that
  renders a client container.
- Create: `jnvpjaa-web/src/containers/Jobs/JobApplicants.tsx`

**Interfaces:** consumes `JOB` (title and id) and `JOB_APPLICANTS`.

What the page shows:

- Logged-out visitors are sent to sign in. An API refusal shows `EmptyView` with "Only the poster can see applicants."
- A header: "{N} applicants for {title}", a **Copy all emails** button (clipboard, comma-separated), and a back link.
- One card per applicant:
  - Avatar, name, batch, "Currently {position} at {companyName}"
  - Email and mobile as `mailto:`/`tel:` links, plus WhatsApp
  - City and state
  - Link buttons with Tabler icons: Resume (`IconFileText`), LinkedIn (`IconBrandLinkedin`), GitHub (`IconBrandGithub`),
    Portfolio (`IconWorld`)
  - The note, the About text (collapsed), and the time applied

- [ ] **Step 1:** Build the page.
- [ ] **Step 2:** `npx tsc --noEmit && npm run lint`. Expected: no errors.
- [ ] **Step 3:** Checkpoint.

### Task 9: Full verification

- [ ] **Step 1:** Backend: `npx tsc --noEmit` and every `npm run test:*`. Expected: all green.
- [ ] **Step 2:** Web: `npx tsc --noEmit`, `npm run lint`, `node --test tests/*.test.cjs` and `npm run build`. Expected:
      all green, with `/jobs` and `/jobs/[slug]` in the route list.
- [ ] **Step 3:** Browser, if a local backend and database are available: apply the migration, start both dev servers,
      then:
  - Post an internship as member A.
  - Apply as member B, and see the count go 0 → 1.
  - Open the applicants page as A, and check that no hidden field appears.
  - Withdraw as B, and see the count go back to 0.
  - Close the job as A, and see the banner.

  If no database is available, check the pages render with the API down: empty state, no crash.
