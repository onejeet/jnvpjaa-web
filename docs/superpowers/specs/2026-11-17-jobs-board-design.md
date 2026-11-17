# Jobs & Internships Board — Design

Date: 2026-11-17 · Repos: `jnvpjaa-backend`, `jnvpjaa-web`

## Intent

Help alumni into work. Senior alumni help juniors and students land a first job or internship, and any member can share
an opening at their own company or one a friend knows of, for any fellow alumnus. Posting and applying must be very easy
and clean. Every job shows how many members have applied.

## Goals

- Members post jobs and internships with the full information a normal job post carries.
- Members apply on the site in one step: profile attached, links pre-filled, optional note.
- Each job shows a live applicant count.
- The poster sees every applicant with full details on a dedicated page.

## Non-goals (for now)

- Resume file upload. Applicants give links (resume link, LinkedIn, GitHub, portfolio). Upload comes later and needs
  private storage.
- Email notifications, application status pipelines (shortlist, reject), messaging, saved jobs, search engine.

## Anti-goals

- A long or multi-page apply flow.
- Applicant details visible to anyone except the poster and moderators.
- Jobs posted by people who are not approved members.

## Decisions (made by the user)

- **Privacy:** once a member applies, the poster sees that applicant's profile details plus what they submitted.
  Emergency contact, extra email and mobile, postal addresses and date of birth stay hidden (see API).
- **Resume:** links only for now. Resume link (Google Drive etc.), LinkedIn, GitHub, and another portfolio/profile link
  (Behance, LeetCode, personal site…).
- **Page layout: Approach A.** Apply in a dialog on the job page; applicants on a separate poster-only page.

## Approaches considered

- **A. Few pages, apply in place (chosen).** List, detail with an apply dialog, post/edit pages, separate applicants
  page. Applying is one click on the job page. The applicants list gets its own page because it can grow long.
- **B. A page for every step.** Same as A, but with a dedicated `/jobs/[slug]/apply` page. It adds a page load and makes
  applying feel heavier, which works against "super easy".
- **Dropped:** storing applicants inside the job record, or applying only by external link or email. Both break the
  counter and the one-application-per-member rule.

## Data model (Prisma)

```prisma
enum JobType { FULL_TIME PART_TIME INTERNSHIP CONTRACT }
enum WorkMode { ONSITE REMOTE HYBRID }
enum JobExperience { FRESHER JUNIOR MID SENIOR }   // 0, 1-3, 3-7, 7+ years
enum JobStatus { OPEN CLOSED }
enum JobPosterRelation { HIRING_AT_COMPANY REFERRAL_LEAD }  // "I work here" vs "a friend shared this"

model Job {
  id, slug @unique, title, company, companyWebsite?,
  type JobType, workMode WorkMode, location String?,        // location required unless REMOTE
  experience JobExperience,
  salaryMin Int?, salaryMax Int?, salaryPeriod ("YEAR" | "MONTH")?, // INR; stipend for internships = MONTH
  description String (sanitised HTML), skills String[],
  posterRelation JobPosterRelation,
  applyUrl String?  // optional external link shown alongside on-site Apply
  deadline DateTime?,
  status JobStatus @default(OPEN),
  postedById, createdAt, updatedAt
  @@index([status, createdAt])
}

model JobApplication {
  id, jobId, applicantId,
  resumeUrl String?, linkedinUrl String?, githubUrl String?, portfolioUrl String?, note String? (≤1000),
  createdAt
  @@unique([jobId, applicantId])
}
```

A job is **accepting applications** when `status = OPEN` and the deadline (end of that day, IST) has not passed. There
is no cron job: the deadline is checked at read and apply time, using one shared helper.

Builder calls (made after the review):

- **Applicant count:** computed with Prisma `_count` over `JobApplication`, not stored on the job, so it can never
  drift.
- **Deleting a job** hard-deletes it, and its applications go with it (`onDelete: Cascade`). The delete is logged in the
  activity feed.
- **Deleting accounts:** a job keeps its poster (`Restrict`, like news posts). If an applicant's account is deleted,
  their applications go with it (`Cascade`). Members are normally soft-removed (`removedAt`).
- **Closed and expired jobs:** still open by direct link, so applicants and the poster can see them. They show a "No
  longer accepting applications" banner, are hidden from search engines (noindex), and are left out of the sitemap and
  the default list.
- **Deadline time zone:** IST (Asia/Kolkata), since the alumni are in India. The deadline is stored as a date and counts
  as passed at the end of that day in IST.

## Permissions

- **Anyone, including logged-out visitors,** can browse and read jobs. Juniors may not have signed up yet. The poster's
  name and a link to their profile are shown. Applicant identities are never public, only the count.
- **Approved, active members** (`requireAuthenticatedUser`, which already rejects disabled or pending accounts) can post
  jobs, apply, and withdraw their own application.
- **The poster** can edit, close, reopen or delete their own job, and can see its applicants.
- **New permission `jobs.moderate`**, granted to PLATFORM_ADMIN and SUPER_ADMIN and to the PRESIDENT and SECRETARY
  positions (same holders as newsroom), can edit, close or delete any job and see any job's applicants.
- A member cannot apply to their own job, or to a job that is closed or past its deadline.
- Withdrawing deletes the application row and decrements the counter.
- Every write is recorded through `recordActivity`: JOB_CREATED, JOB_UPDATED, JOB_CLOSED, JOB_DELETED, JOB_APPLIED,
  JOB_WITHDRAWN.

## API (Nexus, `src/graphql/{types,queries,mutations}/jobs.ts`; logic in `src/services/jobs.ts`)

Queries:

- `jobs(filter: { type, workMode, experience, search, mine, applied }, limit, offset)` returns `{ data, total }`. By
  default it lists only jobs accepting applications, newest first. `mine` lists the caller's own jobs, including closed
  ones. `applied` lists jobs the caller applied to.
- `job(slug)` returns the job plus viewer fields: `viewerHasApplied`, `viewerApplication`, `viewerCanManage`.
- `jobApplicants(jobId)` (poster or moderator only) returns applications with an **explicit allowlist** of applicant
  fields, decided by the user:
  - **Shown:** name, profile image, batch, primary email, mobile, WhatsApp number, city and state, current company and
    role, About text, social links, plus the submitted links and note.
  - **Never returned:** emergency contact, extra email and mobile, postal addresses, date of birth.

Mutations:

- `saveJob(input)`: create, or update if `id` is set.
- `setJobStatus(id, status)`
- `deleteJob(id)`
- `applyToJob(jobId, input)`
- `withdrawApplication(jobId)`

Validation at the boundary:

- Title 5–120 characters, company 2–120.
- Description sanitised with the same allowlist as news minus images, and must have text.
- At most 15 skills.
- Every URL must start with `https://`.
- `salaryMin ≤ salaryMax`.
- The deadline must not be in the past on create.
- Note at most 1000 characters.

Slugs: built from `generateSlug(title-company)`, made unique. `new` and `edit` are reserved.

## Pages (web, Approach A)

- `/jobs` is the list:
  - Filter chips: type, work mode, experience, plus a search box.
  - Signed-in members also get tabs: **All · Posted by me · Applied**.
  - Each card shows title, company, type and work-mode chips, location, salary or stipend, "Posted by {name}, batch
    {n}", "{N} applied", and the deadline. Closed jobs are greyed out.
  - A "Post a job" button.
- `/jobs/[slug]` is the job page:
  - Header with all the facts and an applied counter.
  - Rich description and skills chips.
  - Poster card with a label: "Hiring at this company" or "Shared a lead".
  - The **Apply** button opens a dialog. Logged-out visitors are sent to sign in first.
  - After applying the button reads "Applied ✓", with a Withdraw link.
  - If `applyUrl` is set, an "Also apply on company site" link appears.
  - The poster and moderators see Edit, Close/Reopen, Delete and "View applicants (N)".
- **Apply dialog:**
  - Resume link, LinkedIn, GitHub, Portfolio/other, Note.
  - LinkedIn and GitHub are pre-filled from the profile's social handles.
  - A line explains that the poster will see the applicant's full profile.
- `/jobs/new` and `/jobs/edit/[id]` hold one clean form, using the newsroom editor's rich text for the description and
  the house inputs for everything else.
- `/jobs/[slug]/applicants` is visible only to the poster and moderators:
  - One card per applicant: avatar, name, batch, contact details, current company, links as buttons, note, and the time
    applied.
  - A "copy all emails" action.
- **Header:** add "Jobs & Internships" to the Alumni Center section, with a Tabler icon (`IconBriefcase`), and add "Post
  a Job" to the create menu.
- **Sitemap:** include open jobs.

## Constraints

- Follow the newsroom pattern: service functions take `ctx` and `db` for tests, and the Nexus files stay thin.
- Web operations live in a hand-written file, `src/apollo/jobsOperations.ts`, not in generated hooks.
- Icons come from Tabler only.
- No git commits.
- Backend tests: `tests/jobs.test.ts`, a ts-node script registered in `package.json`. Web tests go in
  `tests/*.test.cjs`.

## Left to the builder

- Exact UI layout and styling within the house components.
- Index tuning.
- Copy text.
- How the "copy emails" action is presented.
