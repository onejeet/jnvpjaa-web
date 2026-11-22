/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import {
  IconArrowRight,
  IconBriefcase,
  IconCalendarEvent,
  IconHeartHandshake,
  IconPhoto,
  IconUsers,
} from '@tabler/icons-react';
import { paths } from '@/config/paths';
import { isEnabled, isPathEnabled } from '@/config/features';
import { landing } from '@/config/tenant';
import type { LandingNeeds, LandingProps } from './loadLanding';
import { Celebrating, EmptyPrompt, Faq, NewMembers, OurStory } from './extras';
import l from './spotlight.module.css';
import { coverUrl, EventDate, fullName, heroImages, newsLabel, s, SectionHead, shortDate } from './parts';

/** What this layout shows, so the home page only asks the API for that. */
export const needs: LandingNeeds = ['news', 'blogs', 'events', 'albums'];

/**
 * The Princeton and Harvard pattern: a short welcome, one alumni story as the hero, a row of quick links,
 * the latest stories beside what is coming up, and Connect / Volunteer / Give before the footer.
 */
export default function Spotlight({ news, blogs, events, albums, story, members, joinedThisWeek }: LandingProps) {
  const images = heroImages();
  const pic = (i: number) => images[i % images.length];
  const [lead, ...rest] = blogs;
  const quick = [
    { label: 'Find a classmate', href: '/members', Icon: IconUsers },
    { label: 'Events', href: paths.events.root, Icon: IconCalendarEvent },
    { label: 'Gallery', href: paths.gallery.root, Icon: IconPhoto },
    { label: 'Jobs', href: paths.jobs.root, Icon: IconBriefcase },
    { label: 'Donate', href: '/donations', Icon: IconHeartHandshake },
  ].filter((q) => isPathEnabled(q.href));
  const albumsWithCover = albums.filter((a) => a.coverImage).slice(0, 6);
  const tri = [
    {
      title: 'Connect',
      body: 'Find batchmates, read their stories and share your own.',
      href: paths.auth.signup,
      cta: 'Join the network',
    },
    {
      title: 'Volunteer',
      body: 'Batch coordinators keep every batch in touch with the association.',
      href: '/batch-coordinators',
      cta: 'Meet the coordinators',
    },
    { title: 'Give', body: landing.giving.body, href: '/donations', cta: 'Make a gift' },
  ].filter((t) => isPathEnabled(t.href));

  return (
    <>
      <div className={s.wrap}>
        <header className={l.spIntro}>
          <h1 id="landing-title">{landing.hero.title}</h1>
          <p className={s.muted}>{landing.hero.subtitle}</p>
        </header>

        <section className={l.spHero} aria-label="Alumni spotlight">
          <img src={(lead && coverUrl(lead.cover)) || pic(0)} alt="" {...{ fetchpriority: 'high' }} />
          <div className={l.spPanel}>
            {lead ? (
              <>
                <h2>
                  <Link href={paths.blog.getBlogPostUrl(lead.slug)}>{lead.title}</Link>
                </h2>
                {lead.summary && <p className={`${s.muted} ${s.clamp}`}>{lead.summary}</p>}
                <span className={s.meta}>
                  {[fullName(lead.author), lead.author?.batch ? `Batch ${lead.author.batch}` : '']
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </>
            ) : (
              <>
                <h2>{landing.join.title}</h2>
                <p className={s.muted}>{landing.join.body}</p>
                <Link className={`${s.btn} ${s.primary}`} href={paths.auth.signup}>
                  Join the network
                </Link>
              </>
            )}
          </div>
        </section>

        {quick.length > 0 && (
          <nav className={l.quick} aria-label="Quick links">
            {quick.map(({ label, href, Icon }) => (
              <Link key={href} href={href}>
                <Icon size={22} stroke={1.6} aria-hidden /> {label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <section className={s.sec}>
        <div className={`${s.wrap} ${l.spCols}`}>
          <div>
            <SectionHead title="Stories" href={paths.blog.root} more="All stories" />
            {rest.length > 0 ? (
              <ul className={l.spList}>
                {rest.slice(0, 4).map((b, i) => (
                  <li key={b.id}>
                    <Link href={paths.blog.getBlogPostUrl(b.slug)}>
                      <img src={coverUrl(b.cover) || pic(i + 1)} alt="" loading="lazy" />
                      <span>
                        <h3 className={s.clamp}>{b.title}</h3>
                        <span className={s.meta}>
                          {[fullName(b.author), shortDate(b.createdAt)].filter(Boolean).join(' · ')}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyPrompt href={paths.blog.new} cta="Write your story">
                Every alumnus has a story. Be the first to share yours.
              </EmptyPrompt>
            )}
          </div>

          <aside className={l.spSide}>
            {isEnabled('events') && (
              <div>
                <h2 className={l.spSideH}>Coming up</h2>
                {events.length > 0 ? (
                  <ul className={l.spEvents}>
                    {events.slice(0, 3).map((e) => (
                      <li key={e.id}>
                        <Link href={paths.events.getEventDetailUrl(e.id as unknown as number)}>
                          <EventDate date={e.startDate} />
                          <span>
                            <strong>{e.title}</strong>
                            {e.location && <span className={s.meta}>{e.location}</span>}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={s.muted}>
                    Nothing scheduled right now. <Link href={paths.events.new}>Suggest a meetup</Link> or{' '}
                    <Link href={paths.events.root}>see past events</Link>.
                  </p>
                )}
              </div>
            )}
            {news.length > 0 && (
              <div>
                <h2 className={l.spSideH}>From the newsroom</h2>
                <ul className={l.spNews}>
                  {news.slice(0, 3).map((n) => (
                    <li key={n.id}>
                      <Link href={paths.newsroom.getPostUrl(n.slug)}>
                        <span className={s.meta}>{n.publishedAt ? shortDate(n.publishedAt) : newsLabel(n)}</span>
                        <strong>{n.title}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <OurStory story={story} surface />

      {isEnabled('gallery') && (
        <section className={s.sec}>
          <div className={s.wrap}>
            <SectionHead title="From the albums" href={paths.gallery.root} more="Gallery" />
            {albumsWithCover.length > 0 ? (
              <div className={l.strip}>
                {albumsWithCover.map((a) => (
                  <Link key={a.id} href={paths.gallery.getAlbumDetailUrl(a.id as string)}>
                    <img src={a.coverImage as string} alt="" loading="lazy" />
                    <span>{a.title}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyPrompt href={paths.gallery.root} cta="Open the gallery">
                No albums yet. Reunion, fest or farewell: share the photos sitting on your phone.
              </EmptyPrompt>
            )}
          </div>
        </section>
      )}

      <Celebrating surface />
      <NewMembers members={members} joinedThisWeek={joinedThisWeek} />

      {tri.length > 0 && (
        <section className={`${s.sec} ${s.surface}`}>
          <div className={`${s.wrap} ${l.tri}`}>
            {tri.map((t) => (
              <div key={t.title}>
                <h2>{t.title}</h2>
                <p className={s.muted}>{t.body}</p>
                <Link className={s.more} href={t.href}>
                  {t.cta} <IconArrowRight size={18} aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <Faq />
    </>
  );
}
