# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Members:** verified alumni of JNV Paota, Jaipur. They sign in to read news, comment, and post blogs, events and jobs. Most are occasional writers, often on a phone.
- **Committee and admins:** the President, Secretary, Vice Presidents, platform admins and super admins. They run the newsroom and the official website pages, and approve members.

## Product Purpose
The alumni portal of JNVPJAA (JNV Paota Jaipur Alumni Association). It keeps alumni connected through a blog, events, jobs, a newsroom, comments and the association's official pages. Success means alumni stay in touch and the association's public face stays current without a full-time staff.

## Positioning
A small, trusted community site run by volunteers for one school's alumni. It is multi-tenant: brand, content and enabled modules come from tenant config, so other alumni groups can run the same portal.

## Operating Context
- Every create/edit screen shares one frame (`EditorShell`): a writing column and a sticky side column with Publish and settings. On phones, Publish sits under the heading and the settings follow the content.
- Rich text uses TipTap. Forms use react-hook-form.
- Modules (blog, events, jobs, newsroom) can be switched off per tenant.

## Capabilities and Constraints
- **AI writing help** runs on Google Gemini's free tier only, with zero budget. Usage is limited per person per day and across the whole portal. Super admins switch it on and set the limits in Admin → Settings, and it is off by default.
- **Free-tier data:** Google may use free-tier content to improve its products, so no personal member data goes into prompts.
- **Content rules:** AI never publishes or overwrites without a person choosing to use the result, and the person can always undo it.

## Brand Commitments
- **Voice:** warm for blogs, formal for the newsroom and official pages, crisp for jobs, friendly and neutral for events and comments. Indian English.
- **Interface copy:** plain and non-technical. No "quota", "rate limit", "token" or error codes in member-facing copy.

## Evidence on Hand
Real brand facts live in `tenants/jnvpjaa/brand.json`. There are no testimonials, metrics or press, and none should be invented.

## Product Principles
1. The writer stays in charge: AI suggests, the person decides, and every change can be undone.
2. Plain words over clever ones, both in the interface and in what AI writes.
3. Never invent facts about real people, dates or events.
4. Free-tier economy: one useful AI call beats several chatty ones.

## Accessibility & Inclusion
Many members are on phones and some are less confident writers, so flows must work one-handed on a 375px screen and be clear without prior AI experience.
