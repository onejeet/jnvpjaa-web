/* eslint-disable @next/next/no-img-element -- story photos come from any host the editor allows, so plain <img> */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { IconArrowRight, IconChevronDown, IconConfetti, IconUsers } from '@tabler/icons-react';
import type { RecentMember } from '@/apollo/memberOperations';
import { JsonLd } from '@/components/JsonLd';
import MemberLink from '@/components/common/MemberLink';
import { isEnabled, isPathEnabled } from '@/config/features';
import { paths } from '@/config/paths';
import { getAvatarDataUrl } from '@/utils/helpers';
import { brand, landing } from '@/config/tenant';
import { celebratingBatches } from './celebrating';
import type { LandingExtras } from './loadLanding';
import { Avatar, fullName, s, SectionHead } from './parts';

/** The admin-edited "Our story" (Admin → Pages → Home page: Our story); hidden when the editor hides it. */
export function OurStory({ story, surface }: { story: LandingExtras['story']; surface?: boolean }) {
  if (!story) return null;
  const { heading, tagline, body, photo } = story.fields;
  return (
    <section id="our-story" className={`${s.sec} ${surface ? s.surface : ''}`} aria-labelledby="our-story-title">
      <div className={`${s.wrap} ${s.story} ${photo ? '' : s.storyNoPhoto}`}>
        {photo && <img src={photo.url} alt={photo.alt} loading="lazy" />}
        <div>
          {tagline && <span className={s.eyebrow}>{tagline}</span>}
          <h2 id="our-story-title" className={s.h2}>
            {heading}
          </h2>
          {/* Sanitised by the API before it is stored. */}
          <div className={s.prose} dangerouslySetInnerHTML={{ __html: body }} />
          {isPathEnabled('/about') && (
            <Link className={s.more} href="/about">
              More about {brand.shortName} <IconArrowRight size={18} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function Celebrating({ surface }: { surface?: boolean }) {
  const batches = celebratingBatches();
  if (!batches.length) return null;
  const year = new Date().getFullYear();
  return (
    <section className={`${s.sec} ${surface ? s.surface : ''}`}>
      <div className={s.wrap}>
        <SectionHead
          title={`Batches celebrating in ${year}`}
          intro="Big anniversaries are the best excuse for a reunion. Find your batchmates and start planning."
        />
        <ul className={s.jubilee}>
          {batches.map((b) => (
            <li key={b.batch}>
              <Link href={`/members?batch=${b.batch}`} className={`${s.card} ${s.lift}`}>
                <IconConfetti size={28} stroke={1.6} aria-hidden />
                <span className={s.eyebrow}>{b.label}</span>
                <strong>Batch of {b.batch}</strong>
                <span className={s.more}>
                  Find batchmates <IconArrowRight size={18} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {isEnabled('events') && (
          <p className={`${s.muted} ${s.note}`}>
            Planning a reunion? <Link href={paths.events.new}>Create an event</Link> and we will spread the word.
          </p>
        )}
      </div>
    </section>
  );
}

/** Newest members with a "+N joined this week" count; an invitation when nobody has joined yet. */
export function NewMembers({
  members,
  joinedThisWeek,
  surface,
}: Pick<LandingExtras, 'members' | 'joinedThisWeek'> & { surface?: boolean }) {
  const shown = members.slice(0, 10);
  const title =
    joinedThisWeek > 0 ? `${joinedThisWeek} new member${joinedThisWeek === 1 ? '' : 's'} this week` : 'Newest members';
  return (
    <section className={`${s.sec} ${surface ? s.surface : ''}`}>
      <div className={s.wrap}>
        <SectionHead
          title={title}
          intro="Say hello. Someone from your batch may be among them."
          href={isPathEnabled('/members') ? '/members' : undefined}
          more="Member directory"
        />
        {shown.length ? (
          <ul className={s.faces}>
            {shown.map((m: RecentMember) => (
              <li key={m.id}>
                <MemberLink member={m}>
                  <Avatar user={{ ...m, profileImage: m.profileImage || getAvatarDataUrl(m.id) }} />
                  <strong>{fullName(m) || m.firstName}</strong>
                  {m.batch ? <span className={s.muted}>Batch {m.batch}</span> : null}
                </MemberLink>
              </li>
            ))}
            {joinedThisWeek > shown.length && (
              <li aria-label={`and ${joinedThisWeek - shown.length} more this week`}>
                <span className={s.avatar}>+{joinedThisWeek - shown.length}</span>
                <span className={s.muted}>this week</span>
              </li>
            )}
          </ul>
        ) : (
          <EmptyPrompt icon={<IconUsers size={28} stroke={1.6} aria-hidden />} href={paths.auth.signup} cta="Join now">
            Be the first from your batch to join the network.
          </EmptyPrompt>
        )}
      </div>
    </section>
  );
}

/** Questions from landing.json, also published as FAQPage structured data. */
export function Faq({ surface }: { surface?: boolean }) {
  const faq = landing.faq ?? [];
  if (!faq.length) return null;
  return (
    <section className={`${s.sec} ${surface ? s.surface : ''}`} aria-labelledby="faq-title">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
      <div className={`${s.wrap} ${s.faqWrap}`}>
        <div>
          <h2 id="faq-title" className={s.h2}>
            Questions, answered
          </h2>
          <p className={s.muted}>
            Something else? <Link href="/contact-us">Write to us</Link>.
          </p>
        </div>
        <div className={s.faq}>
          {faq.map((f, i) => (
            <details key={f.question} open={i === 0}>
              <summary>
                {f.question}
                <IconChevronDown size={20} aria-hidden />
              </summary>
              <p className={s.muted}>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** What an empty section shows instead of disappearing: a line and one thing to do about it. */
export function EmptyPrompt({
  children,
  href,
  cta,
  icon,
}: {
  children: ReactNode;
  href?: string;
  cta?: string;
  icon?: ReactNode;
}) {
  return (
    <div className={s.empty}>
      {icon}
      <p>{children}</p>
      {href && cta && isPathEnabled(href) && (
        <Link className={`${s.btn} ${s.primary}`} href={href}>
          {cta}
        </Link>
      )}
    </div>
  );
}
