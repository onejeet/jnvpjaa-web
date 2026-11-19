'use client';

import Link from 'next/link';
import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { SOCIAL_BRANDS } from '@/components/common/SocialLinks/SocialLinks';
import { isPathEnabled } from '@/config/features';
import { paths } from '@/config/paths';
import { brand, content, t } from '@/config/tenant';
import useHiddenPagePaths from '@/modules/ContentPages/useHiddenPagePaths';
import s from './Landing.module.css';
import SizedImg from './SizedImg';

const COLUMNS: { title: string; links: { label: string; path: string }[] }[] = [
  {
    title: 'Association',
    links: [
      { label: 'About us', path: '/about' },
      { label: 'Vision & mission', path: '/vision' },
      { label: "President's message", path: '/president-message' },
      { label: 'Executive committee', path: '/executive-committee' },
      { label: 'Batch coordinators', path: '/batch-coordinators' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Members', path: '/members' },
      { label: 'Events', path: '/events' },
      { label: 'Stories', path: '/blog' },
      { label: 'Newsroom', path: '/newsroom' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Jobs', path: '/jobs' },
    ],
  },
  {
    title: 'Give',
    links: [
      { label: 'Donate', path: '/donations' },
      { label: 'Scholarships', path: '/scholarships' },
      { label: 'Student hub', path: '/student-hub' },
      { label: '', path: '/bhamashah-pillars' },
      { label: 'Accounts', path: '/transactions' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact us', path: '/contact-us' },
      { label: 'Privacy policy', path: '/privacy_policy' },
      { label: 'Terms & conditions', path: '/terms_condition' },
    ],
  },
];

const SOCIAL_KEYS = {
  facebook: 'facebook',
  instagram: 'instagram',
  twitter: 'x',
  linkedin: 'linkedin',
  youtube: 'youtube',
  github: 'github',
} as const;

export default function LandingFooter() {
  const hidden = useHiddenPagePaths();
  const show = (path: string) => !hidden.includes(path) && isPathEnabled(path);
  const socials = Object.entries(brand.socials).filter(([, url]) => url) as [keyof typeof SOCIAL_KEYS, string][];
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footTop}>
          <h2>Stay close to your school and your batch.</h2>
          <div className={s.ctas}>
            <Link className={`${s.btn} ${s.light}`} href={paths.auth.signup}>
              Join the network
            </Link>
            {show('/donations') && (
              <Link className={`${s.btn} ${s.ghost}`} href="/donations">
                Donate
              </Link>
            )}
          </div>
        </div>

        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <SizedImg src={brand.logo.square} size={56} />
            <strong>{brand.legalName}</strong>
            <span>{brand.tagline}</span>
            <address>
              <span className={s.contactLine}>
                <IconMapPin size={18} aria-hidden /> {brand.contact.address.join(', ')}
              </span>
              <br />
              <a className={s.contactLine} href={`mailto:${brand.contact.email}`}>
                <IconMail size={18} aria-hidden /> {brand.contact.email}
              </a>
              {brand.contact.phone && (
                <>
                  <br />
                  <a className={s.contactLine} href={`tel:${brand.contact.phone.replace(/\s/g, '')}`}>
                    <IconPhone size={18} aria-hidden /> {brand.contact.phone}
                  </a>
                </>
              )}
            </address>
            {socials.length > 0 && (
              <div className={s.socials}>
                {socials.map(([key, url]) => {
                  const { Icon } = SOCIAL_BRANDS[SOCIAL_KEYS[key]];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${brand.shortName} on ${key}`}
                    >
                      <Icon size={20} stroke={1.6} aria-hidden />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {COLUMNS.map((col) => {
            const links = col.links.filter((l) => show(l.path));
            if (!links.length) return null;
            return (
              <nav key={col.title} className={s.footCol} aria-label={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {links.map((l) => (
                    <li key={l.path}>
                      <Link href={l.path}>{l.label || t('pages.honourRoll')}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <div className={s.footBottom}>
          <span>
            © {year} {brand.legalName}. All rights reserved.
          </span>
          {content['legal.marksNotice'] && <span>{content['legal.marksNotice']}</span>}
        </div>
      </div>
    </footer>
  );
}
