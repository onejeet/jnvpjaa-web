import { constructMetadata } from '@/config/seo.config';
import LegalDocument, { LegalSection } from '@/components/common/LegalDocument';
import { Metadata } from 'next';
import Link from 'next/link';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/terms_condition/',
  title: 'Terms of Use • Alumni Network of JNV Paota, Jaipur',
  description:
    'The rules for using the JNVPJAA website and member portal: eligibility, accounts, Google sign-in, member conduct, content and liability.',
});

const CONTACT_EMAIL = 'alumni@jnvpjaa.org';
const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: 'agreement',
    title: 'About these terms',
    content: (
      <>
        <p>
          These Terms of Use (&quot;Terms&quot;) are an agreement between you and the{' '}
          <strong>JNV Paota Jaipur Alumni Association</strong> (&quot;JNVPJAA&quot;, &quot;we&quot;, &quot;us&quot;) for
          your use of <a href="https://www.jnvpjaa.org">www.jnvpjaa.org</a>, the member portal and related services (the
          &quot;Portal&quot;).
        </p>
        <p>
          By creating an account, signing in (with email or Google), or using the Portal, you accept these Terms and
          confirm you have read our <Link href="/privacy_policy">Privacy Policy</Link>. If you do not agree, do not use
          the Portal. These Terms are published under the Information Technology (Intermediary Guidelines and Digital
          Media Ethics Code) Rules, 2021.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: 'Who can join',
    content: (
      <>
        <p>Member accounts are for:</p>
        <ul>
          <li>former students of Jawahar Navodaya Vidyalaya, Paota, Jaipur; and</li>
          <li>current and former faculty and staff of the school.</li>
        </ul>
        <p>
          Membership is free and voluntary. It is a way to stay connected with fellow alumni, not a product or a paid
          service. You must be at least 18 years old. Public pages may be read by anyone, but only approved members can
          use the directory and member features.
        </p>
        <p>
          Every new account, including one created through Google, is reviewed by the association or a batch
          coordinator. We may ask you to confirm your batch or identity, and may refuse or revoke membership if we
          cannot verify it.
        </p>
      </>
    ),
  },
  {
    id: 'account',
    title: 'Your account and sign-in',
    content: (
      <>
        <ul>
          <li>Give accurate information and keep it up to date. One person, one account.</li>
          <li>Do not share your account or let anyone else sign in as you.</li>
          <li>
            Keep your password secret. If you use Google sign-in, the security of your Google account is your
            responsibility, and Google&apos;s own terms also apply to it.
          </li>
          <li>
            If you sign in with Google using an email already registered with us, the two are linked to the same
            account.
          </li>
          <li>
            Tell us at {mail} straight away if you think someone has accessed your account. You can end active sessions
            yourself on the <Link href="/security">Security</Link> page.
          </li>
        </ul>
        <p>You are responsible for activity on your account unless it results from our failure to secure the Portal.</p>
      </>
    ),
  },
  {
    id: 'conduct',
    title: 'Acceptable use',
    content: (
      <>
        <p>You must not host, display, upload, publish or share any content, or use the Portal in any way, that:</p>
        <ul>
          <li>belongs to someone else and you have no right to share;</li>
          <li>
            is defamatory, obscene, pornographic, paedophilic, invasive of another person&apos;s privacy (including
            bodily privacy), insulting or harassing on the basis of gender, racially or ethnically objectionable, or
            promotes enmity between groups;
          </li>
          <li>is harmful to children;</li>
          <li>infringes any patent, trademark, copyright or other proprietary right;</li>
          <li>
            deceives or misleads about where a message came from, or knowingly spreads false or misleading information;
          </li>
          <li>impersonates another person or misrepresents your batch, role or affiliation with the school;</li>
          <li>
            threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with other
            countries, or public order, or incites any offence;
          </li>
          <li>contains viruses or any code meant to disrupt or damage any computer resource;</li>
          <li>is an online game that is not permitted under Indian law, or advertises one;</li>
          <li>otherwise breaks any law in force in India.</li>
        </ul>
        <p>You also must not:</p>
        <ul>
          <li>
            scrape, copy in bulk, export or sell member information, or use it for marketing, recruitment agencies,
            fundraising unrelated to JNVPJAA, or any commercial purpose;
          </li>
          <li>send spam, chain messages or unsolicited promotions to members;</li>
          <li>try to access accounts, data or admin areas you are not authorised to use, or test our security;</li>
          <li>overload the Portal, or use bots or automated tools without our written permission;</li>
          <li>collect money from members in the name of JNVPJAA without the association&apos;s written approval.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Content you post',
    content: (
      <>
        <p>
          You keep ownership of the blogs, comments, photos and other content you post. You give JNVPJAA a free,
          worldwide, non-exclusive licence to host, display, reproduce, resize and share that content on the Portal and
          on the association&apos;s official channels (for example, newsletters or social media pages about alumni
          events), for as long as it is on the Portal.
        </p>
        <p>
          You confirm you have the right to post it, and that people clearly identifiable in photos you upload are
          comfortable with them being shared with the alumni community.
        </p>
        <p>
          Content on public pages can be seen by anyone, including search engines. Think before posting personal
          details.
        </p>
      </>
    ),
  },
  {
    id: 'moderation',
    title: 'Moderation and reporting',
    content: (
      <>
        <p>
          We may review, edit for formatting, hide or remove content, and limit or suspend accounts that break these
          Terms or the law. We will usually tell you why, unless the law or safety reasons prevent it.
        </p>
        <p>
          To report content or a member, email {mail} with a link to the content and the reason. We acknowledge
          complaints within 24 hours and act on them within 15 days. Complaints about content showing a person in a
          sexual act, nudity or impersonation of that person are acted on within 24 hours, as required by law.
        </p>
      </>
    ),
  },
  {
    id: 'community-features',
    title: 'Jobs, businesses, events and donations',
    content: (
      <ul>
        <li>
          <strong>Jobs:</strong> jobs are posted by members, not by JNVPJAA. We do not check them, guarantee them, or
          act as a recruiter. Never pay anyone to get a job. Your application details go to the member who posted it.
        </li>
        <li>
          <strong>Business directory:</strong> listings are provided by members. Dealing with a listed business is
          between you and that business.
        </li>
        <li>
          <strong>Events:</strong> event details may change. Attending in person is at your own risk and subject to the
          organiser&apos;s and venue&apos;s rules.
        </li>
        <li>
          <strong>Donations:</strong> donations are voluntary contributions to the association and its work. They are
          not a membership fee and do not buy any service or benefit. If you paid an amount by mistake, tell us at{' '}
          {mail} and we will look into it. Ask us before donating if you need a tax receipt.
        </li>
      </ul>
    ),
  },
  {
    id: 'ip',
    title: 'Our name and materials',
    content: (
      <p>
        The JNVPJAA name, logo, design and content created by the association belong to the association. You may share
        links and short extracts with credit, but may not use our name or logo to suggest endorsement without written
        permission. &quot;Jawahar Navodaya Vidyalaya&quot; and related marks belong to their respective owners; JNVPJAA
        is an independent alumni association and is not run by Navodaya Vidyalaya Samiti.
      </p>
    ),
  },
  {
    id: 'termination',
    title: 'Suspending or closing accounts',
    content: (
      <>
        <p>
          You can ask us to close your account at any time by emailing {mail}. What happens to your data is explained in
          our <Link href="/privacy_policy#retention">Privacy Policy</Link>.
        </p>
        <p>
          We may suspend or remove an account that breaks these Terms, gives false eligibility information, or puts
          members at risk. Sections on content licence (for content still on the Portal), disclaimers, liability and
          governing law continue after your account ends.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Disclaimers',
    content: (
      <p>
        JNVPJAA is a volunteer-run, not-for-profit alumni association. The Portal is provided &quot;as is&quot; and
        &quot;as available&quot;. We do not promise it will always be available or error-free, and we do not verify
        everything members post. Information shared by members (including jobs, business listings and advice) is their
        own and not endorsed by us.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    content: (
      <p>
        To the extent the law allows, JNVPJAA, its office-bearers and volunteers are not liable for indirect or
        consequential loss, loss of data or opportunity, or for the acts of members or third parties, arising from your
        use of the Portal. Because membership is free, our total liability to you for any claim is limited to ₹1,000.
        This does not limit liability for fraud, or for anything that cannot be limited by law.
      </p>
    ),
  },
  {
    id: 'indemnity',
    title: 'Your responsibility to us',
    content: (
      <p>
        If someone makes a claim against JNVPJAA because of content you posted or your breach of these Terms or the law,
        you agree to cover the reasonable costs and losses that result.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law and disputes',
    content: (
      <p>
        These Terms are governed by the laws of India. Please contact us first so we can try to resolve any dispute
        informally. If it is not resolved within 30 days, the courts at Jaipur, Rajasthan have exclusive jurisdiction.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    content: (
      <p>
        We may update these Terms and will change the &quot;Last updated&quot; date when we do. For significant changes
        we will tell members in advance by email or a notice on the Portal. Continuing to use the Portal after that
        means you accept the new Terms. We will also remind members of these Terms at least once a year, as the IT Rules
        require.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Grievance Officer and contact',
    content: (
      <>
        <p>For complaints about content, accounts or these Terms, contact our Grievance Officer:</p>
        <ul>
          <li>Grievance Officer: {mail}</li>
          <li>Post: 35, Karani Colony, Shanti Nagar, Opposite NBC, Khatipura Road, Jaipur, Rajasthan 302006, India</li>
          <li>
            Web: <Link href="/contact-us">jnvpjaa.org/contact-us</Link>
          </li>
        </ul>
      </>
    ),
  },
];

export default function TermsConditionPage() {
  return (
    <LayoutModule disableCover title="Terms of Use • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <LegalDocument
        title="Terms of Use"
        lastUpdated="November 17, 2026"
        intro={
          <p>
            Please read these terms before using the JNVPJAA website and member portal. They explain who can join, what
            you can and cannot do, and how we handle disputes.
          </p>
        }
        sections={sections}
      />
    </LayoutModule>
  );
}
