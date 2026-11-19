import { constructMetadata } from '@/config/seo.config';
import LegalDocument, { LegalSection } from '@/components/common/LegalDocument';
import { Metadata, NextPage } from 'next';
import Link from 'next/link';
import { brand, t } from '@/config/tenant';

import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/privacy_policy/',
  title: `Privacy Policy • ${brand.tagline}`,
  description: `How ${brand.shortName} collects, uses, shares and protects personal data, including Google sign-in, member directory and your rights under Indian law.`,
});

const CONTACT_EMAIL = brand.contact.email;
const POSTAL_ADDRESS = brand.contact.address.join(' ').replace(/\.$/, '');
const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    content: (
      <>
        <p>
          The Portal is run by the <strong>{brand.legalName}</strong> (&quot;{brand.shortName}&quot;, &quot;we&quot;,
          &quot;us&quot;), 35, Karani Colony, Shanti Nagar, Opposite NBC, Khatipura Road, Jaipur, Rajasthan 302006,
          India. For personal data you give us, we are the <strong>Data Fiduciary</strong> under the Digital Personal
          Data Protection Act, 2023 (&quot;DPDP Act&quot;) and the body corporate responsible under the Information
          Technology Act, 2000 and its rules.
        </p>
        <p>
          &quot;Portal&quot; means the alumni website at{' '}
          <a href={`https://www.${brand.domains.site}`}>https://www.{brand.domains.site}</a>, including the members-only
          area and the systems that run it. Membership is free, voluntary and open only to alumni and faculty of the
          school. We do not sell anything on the Portal, and your data is never the price of membership.
        </p>
      </>
    ),
  },
  {
    id: 'data-we-collect',
    title: 'Personal data we collect',
    content: (
      <>
        <h3>Data you give us when you register</h3>
        <ul>
          <li>First and last name, email address, mobile number (with country code), gender.</li>
          <li>Your {brand.institution.shortName} batch (passing-out year), or that you are faculty.</li>
          <li>A password, if you sign up with email. We store only a one-way hash, never the password itself.</li>
        </ul>

        <h3>Data you may add to your profile</h3>
        <ul>
          <li>Display name, nickname, profile photo and cover image, &quot;about me&quot;.</li>
          <li>Date of birth, address, city, state, country.</li>
          <li>Additional email, additional or WhatsApp number, emergency contact number.</li>
          <li>Work details (company, role, address) and social media links.</li>
          <li>Your contact-visibility choice (&quot;Keep my contact details private&quot;).</li>
        </ul>

        <h3>Content and activity on the Portal</h3>
        <ul>
          <li>Blogs, discussions, comments, reactions, photos and albums you upload.</li>
          <li>Events you organise or attend, businesses you list, jobs you post.</li>
          <li>
            Job applications: resume link, LinkedIn, GitHub or portfolio links and any note you send to the person who
            posted the job.
          </li>
          <li>Donation and transaction records that our treasurers record against your account.</li>
        </ul>

        <h3>Security and technical data</h3>
        <ul>
          <li>
            For each signed-in device: IP address, browser/user-agent, sign-in method (password or Google), sign-in and
            last-seen time. You can see and end these sessions on the <Link href="/security">Security</Link> page.
          </li>
          <li>Audit records of administrative actions (for example, approving a member or changing a role).</li>
          <li>Short-lived anti-abuse data such as rate-limit counters and spam-trap (honeypot) checks on sign-up.</li>
          <li>
            Website usage statistics, such as pages visited, device and browser type and approximate location, collected
            through Vercel Web Analytics and Google Tag Manager / Google Analytics. We use these only in aggregate to
            improve the website.
          </li>
        </ul>

        <p>
          We do not collect Aadhaar, PAN, bank account, card, biometric, health or religious data through the Portal.
          Please do not put such data in your profile or posts.
        </p>
      </>
    ),
  },
  {
    id: 'google-sign-in',
    title: 'Google sign-in',
    content: (
      <>
        <p>
          You can sign in or register with your Google account instead of a password. When you choose this, Google asks
          you to share only the basic scopes <code>openid</code>, <code>email</code> and <code>profile</code>. From
          Google we receive and use only:
        </p>
        <ul>
          <li>
            your Google account identifier (a number that links your Google account to your {brand.shortName} account);
          </li>
          <li>your email address and whether Google has verified it;</li>
          <li>your first and last name.</li>
        </ul>
        <p>
          We use this data only to sign you in, to link Google to an existing {brand.shortName} account with the same
          email, and to pre-fill your registration form. New accounts created through Google still need approval by the
          association before they become active.
        </p>
        <p>We do not:</p>
        <ul>
          <li>receive or store your Google password;</li>
          <li>keep Google access or refresh tokens after sign-in finishes;</li>
          <li>access your Gmail, contacts, Drive, Calendar or any other Google data;</li>
          <li>post anything to your Google account.</li>
        </ul>
        <p>
          The temporary record of a Google sign-in attempt (a hashed one-time code and the details above) expires after
          15 minutes and is then deleted.
        </p>
        <p>
          <strong>Google API Services User Data Policy.</strong> {brand.shortName}&apos;s use and transfer of
          information received from Google APIs adheres to the{' '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. We do not sell Google user data, use it for advertising, or use it
          to train AI or machine-learning models.
        </p>
        <p>
          You can remove {brand.shortName}&apos;s access at any time from{' '}
          <a href="https://myaccount.google.com/connections" target="_blank" rel="noreferrer">
            your Google account&apos;s third-party connections
          </a>
          . After that, sign in with email and password, or use &quot;Forgot password&quot; to set one.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use your data',
    content: (
      <>
        <p>We use personal data only for these purposes:</p>
        <ul>
          <li>
            <strong>Running your account:</strong> registration, verifying that you are a {brand.institution.shortName}{' '}
            alumnus or faculty member, sign-in, password reset and keeping your sessions secure.
          </li>
          <li>
            <strong>The alumni directory and community:</strong> showing your profile to other members, enabling events,
            blogs, discussions, galleries, jobs and the business directory.
          </li>
          <li>
            <strong>Association communications:</strong> account emails (approval, password reset, security notices),
            event and association updates, and birthday greetings.
          </li>
          <li>
            <strong>Records:</strong> keeping donation and membership records the association needs for its accounts.
          </li>
          <li>
            <strong>Safety and abuse prevention:</strong> blocking spam and fake sign-ups, investigating misuse,
            enforcing our <Link href="/terms_condition">Terms of Use</Link>.
          </li>
          <li>
            <strong>Legal duties:</strong> meeting obligations under Indian law and responding to lawful requests.
          </li>
        </ul>
        <p>
          We do not sell personal data, rent it, share it with advertisers, or use it to build advertising profiles.
        </p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: 'Why we are allowed to use it',
    content: (
      <>
        <p>
          We process personal data on the basis of your <strong>consent</strong>, which you give when you register and
          when you choose to add optional profile details, and for the <strong>legitimate uses</strong> allowed by
          Section 7 of the DPDP Act, such as data you voluntarily provide for a specific purpose, compliance with law,
          and responding to emergencies.
        </p>
        <p>
          You can withdraw consent at any time (see <a href="#your-rights">Your rights</a>). Withdrawing consent does
          not affect processing already done, and if you withdraw consent needed to run your account, we will close it.
        </p>
        <p>
          If you are in the European Economic Area or the United Kingdom, we rely on your consent, on performing our
          agreement with you (running your account), and on our legitimate interest in running a secure alumni network.
        </p>
      </>
    ),
  },
  {
    id: 'who-can-see',
    title: 'Who can see your information',
    content: (
      <>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Information</th>
                <th>Who can see it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name, photo, batch, and content you publish (blogs, comments, photos, public events)</td>
                <td>Anyone, including visitors who are not signed in</td>
              </tr>
              <tr>
                <td>Your profile in the member directory, birthday, city and work details</td>
                <td>Signed-in members</td>
              </tr>
              <tr>
                <td>Email and phone number</td>
                <td>
                  Verified members, unless you turn on &quot;Keep my contact details private&quot;, in which case they
                  are masked
                </td>
              </tr>
              <tr>
                <td>Emergency contact, password hash, sessions and IP addresses</td>
                <td>Only you and authorised association administrators</td>
              </tr>
              <tr>
                <td>Job application details</td>
                <td>You and the member who posted that job</td>
              </tr>
              <tr>
                <td>Pending registration details</td>
                <td>Administrators and batch coordinators who review your request</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Members may only use directory information for alumni purposes. Scraping, bulk export or commercial use is
          forbidden by our <Link href="/terms_condition">Terms of Use</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'service-providers',
    title: 'Service providers we share data with',
    content: (
      <>
        <p>
          We use a small number of providers (&quot;Data Processors&quot;) who process data only on our instructions and
          only to run the Portal:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Purpose</th>
                <th>Data involved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google LLC</td>
                <td>
                  Google sign-in (only if you choose it); website usage statistics through Google Tag Manager and Google
                  Analytics
                </td>
                <td>
                  The sign-in exchange described in Section 3; page-visit and device data, with your IP address
                  shortened or masked where Google allows
                </td>
              </tr>
              <tr>
                <td>Vercel Inc.</td>
                <td>Delivering the website; page-view statistics</td>
                <td>IP address and request data needed to serve pages</td>
              </tr>
              <tr>
                <td>Cloudflare, Inc. (R2)</td>
                <td>Storing photos and uploaded files</td>
                <td>Images and files you upload</td>
              </tr>
              <tr>
                <td>Zoho Corporation (ZeptoMail)</td>
                <td>Sending account and association emails</td>
                <td>Your name, email address and the email content</td>
              </tr>
              <tr>
                <td>Our server and database hosting provider (India)</td>
                <td>Running the Portal and storing member data in India</td>
                <td>All account data described in this policy</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>We may also disclose personal data when:</p>
        <ul>
          <li>required by law, a court order, or a lawful request from a government authority;</li>
          <li>necessary to protect someone&apos;s life or safety, or to investigate fraud or abuse of the Portal;</li>
          <li>you ask us to, or give us your consent.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'transfers',
    title: 'Where your data is stored',
    content: (
      <p>
        Your profile and account data are stored on servers in India. Some providers we rely on (Google for sign-in,
        Vercel for delivering web pages, Cloudflare for photos and files, and Zoho for email) may process limited data
        outside India to provide their service. We allow this only where Indian law permits it (Section 16 of the DPDP
        Act) and only with providers who are bound to protect it.
      </p>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and local storage',
    content: (
      <>
        <p>
          We use cookies that are needed to keep you signed in and secure (listed below). We may also use analytics
          cookies set by Google Analytics (through Google Tag Manager), such as <code>_ga</code>, to understand how the
          website is used. We do not use advertising cookies and do not sell or share browsing data for advertising.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Purpose</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>access_token</code>
                </td>
                <td>Proves you are signed in</td>
                <td>1 hour</td>
              </tr>
              <tr>
                <td>
                  <code>refresh_token</code>
                </td>
                <td>Keeps you signed in on this device</td>
                <td>7 days</td>
              </tr>
              <tr>
                <td>
                  <code>google_auth_flow</code>
                </td>
                <td>Protects a Google sign-in in progress from forgery</td>
                <td>15 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The website also stores small values in your browser&apos;s local storage, such as whether you are signed in
          and unsent discussion drafts. These stay on your device and are cleared when you clear your browser data.
        </p>
        <p>
          You can block or delete cookies in your browser settings. Blocking analytics cookies does not affect the
          website; blocking sign-in cookies means you will not be able to sign in to the members area.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep data',
    content: (
      <>
        <p>
          We keep personal data only as long as it is needed for the alumni community, for the purposes in this policy,
          or as required by law. In practice:
        </p>
        <ul>
          <li>
            <strong>Account and profile data</strong> is kept while you are a member. If you ask us to close your
            account, we remove it from the Portal and then delete or anonymise your personal data within a reasonable
            time, unless we must keep some of it by law.
          </li>
          <li>
            <strong>Registrations that are not approved</strong> are deleted when they are no longer needed.
          </li>
          <li>
            <strong>Security and sign-in records</strong> (such as IP addresses and admin activity logs) are kept as
            long as needed to protect the Portal, and for at least the period Indian law requires.
          </li>
          <li>
            <strong>Donation records</strong> are kept for as long as Indian accounting and tax law requires.
          </li>
          <li>
            <strong>Content you posted</strong> is removed or anonymised with your account, except where we must keep it
            by law or it forms part of a conversation with other members.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'security',
    title: 'How we protect your data',
    content: (
      <>
        <p>We follow reasonable security practices, including:</p>
        <ul>
          <li>encryption in transit (HTTPS) for all traffic;</li>
          <li>salted password hashing; hashed reset codes and sign-in secrets;</li>
          <li>HTTP-only, secure session cookies, session revocation, and rate limiting on sign-in;</li>
          <li>role-based access, so administrators see only what their role needs, with audit logs.</li>
        </ul>
        <p>
          No system is completely secure. If a personal data breach affects you, we will inform you and the Data
          Protection Board of India as required by the DPDP Act, telling you what happened, the likely impact, and what
          you can do.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    content: (
      <>
        <p>Under the DPDP Act and other laws that apply to you, you have the right to:</p>
        <ul>
          <li>
            <strong>Access</strong> a summary of the personal data we hold about you and how we use it.
          </li>
          <li>
            <strong>Correct and update</strong> your data. Most fields you can edit yourself on your{' '}
            <Link href="/profile">profile</Link>.
          </li>
          <li>
            <strong>Erase</strong> your data and close your account.
          </li>
          <li>
            <strong>Withdraw consent</strong> to optional processing, such as association update emails.
          </li>
          <li>
            <strong>Nominate</strong> a person to exercise these rights for you in case of your death or incapacity.
          </li>
          <li>
            <strong>Grievance redressal</strong> by our Grievance Officer, and to complain to the Data Protection Board
            of India if you are not satisfied.
          </li>
        </ul>
        <p>
          To use any of these rights, email {mail} from the address registered on your account, with the subject
          &quot;Data request&quot;. We may ask you to confirm your identity. We aim to reply within 30 days and will
          resolve grievances within the time set by law.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    content: (
      <p>
        The Portal is for alumni and faculty aged 18 or over. We do not knowingly collect personal data from anyone
        under 18. If you believe a child has registered, contact {mail} and we will delete the account.
      </p>
    ),
  },
  {
    id: 'third-party-links',
    title: 'Links to other websites',
    content: (
      <p>
        Members may share links to other websites, such as job application pages, business websites or social profiles.
        We are not responsible for how those sites handle your data. Please read their privacy policies.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    content: (
      <p>
        We will update this page when our practices change and change the &quot;Last updated&quot; date. If a change
        materially affects how we use your data, we will tell signed-in members by email or a notice on the Portal
        before it takes effect and, where the law requires, ask for your consent again.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Grievance Officer and contact',
    content: (
      <>
        <p>
          For privacy questions, requests or complaints, contact our Grievance Officer (designated under the DPDP Act
          and the Information Technology Rules):
        </p>
        <ul>
          <li>Grievance Officer: {mail}</li>
          <li>Post: {POSTAL_ADDRESS}</li>
          <li>
            Web: <Link href="/contact-us">{brand.domains.site}/contact-us</Link>
          </li>
        </ul>
      </>
    ),
  },
];

const PrivacyPage: NextPage = () => (
  <LayoutModule disableCover title={`${brand.shortName} Privacy Policy • ${brand.tagline}`} containerProps={{}}>
    <LegalDocument
      title="Privacy Policy"
      lastUpdated="November 17, 2026"
      intro={
        <p>
          This policy explains what personal data the {brand.legalName} collects when you use our website and member
          portal, why we collect it, who can see it, and the choices and rights you have. It applies whether you sign in
          with email and password or with Google.
        </p>
      }
      sections={sections}
    />
  </LayoutModule>
);

export default PrivacyPage;
