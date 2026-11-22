/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import type { AlbumBasic } from '@/apollo/hooks';
import { paths } from '@/config/paths';
import { isEnabled } from '@/config/features';
import { brand, landing } from '@/config/tenant';
import type { LandingNeeds, LandingProps } from './loadLanding';
import { Celebrating, EmptyPrompt, Faq, NewMembers, OurStory } from './extras';
import l from './homecoming.module.css';
import SizedImg from './SizedImg';
import { Birthdays, Carousel, EventRow, heroImages, NewsCard, s, SectionHead, StoryCard } from './parts';

/** What this layout shows, so the home page only asks the API for that. */
export const needs: LandingNeeds = ['news', 'blogs', 'events', 'birthdays', 'albums'];

/** Leads with nostalgia: full-bleed campus photos, then the people and plans that bring alumni back. */
export default function Homecoming({
  news,
  blogs,
  events,
  birthdays,
  albums,
  story,
  members,
  joinedThisWeek,
}: LandingProps) {
  const images = heroImages();
  const fallback = (i: number) => images[(i + 1) % images.length];
  return (
    <>
      <section className={l.hcHero} aria-labelledby="landing-title">
        <Carousel images={images} />
        <div className={`${s.wrap} ${l.hcCopy}`}>
          <span className={l.hcPlace}>
            <SizedImg src={brand.logo.square} size={36} />
            {brand.institution.name}
          </span>
          <h1 id="landing-title">{landing.hero.title}</h1>
          <p>{landing.hero.subtitle}</p>
          <div className={s.ctas}>
            <Link className={`${s.btn} ${s.primary}`} href={paths.auth.signup}>
              Join the network
            </Link>
            {isEnabled('events') && (
              <Link className={`${s.btn} ${s.ghost}`} href={paths.events.root}>
                Upcoming events
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className={s.wrap}>
        <Stats className={l.ledger} />
      </div>

      <section className={`${s.sec} ${l.vision}`}>
        <figure className={s.wrap} style={{ margin: '0 auto' }}>
          <span className={l.quoteMark} aria-hidden>
            “
          </span>
          <blockquote>{landing.vision}</blockquote>
          <figcaption>
            <Link href="/vision">Our vision and mission</Link>
          </figcaption>
        </figure>
      </section>

      <OurStory story={story} />

      {isEnabled('events') && (
        <section className={`${s.sec} ${s.surface}`}>
          <div className={s.wrap}>
            <SectionHead title="Come back for these" href={paths.events.root} more="All events" />
            {events.length > 0 ? (
              <div className={s.grid}>
                {events.slice(0, 3).map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </div>
            ) : (
              <EmptyPrompt href={paths.events.new} cta="Suggest a meetup">
                Nothing on the calendar yet. Suggest a meetup in your city and we will help you gather the batch.
              </EmptyPrompt>
            )}
          </div>
        </section>
      )}

      <Celebrating />

      {news.length > 0 && (
        <section className={s.sec}>
          <div className={s.wrap}>
            <SectionHead title="News from the association" href={paths.newsroom.root} more="Newsroom" />
            <div className={s.grid}>
              {news.slice(0, 3).map((n, i) => (
                <NewsCard key={n.id} post={n} fallback={fallback(i)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {isEnabled('blog') && (
        <section className={`${s.sec} ${s.surface}`}>
          <div className={s.wrap}>
            <SectionHead
              title="Written by alumni"
              intro="Hostel nights, first jobs and the teachers we still quote."
              href={paths.blog.root}
              more="All stories"
            />
            {blogs.length > 0 ? (
              <div className={s.grid}>
                {blogs.slice(0, 3).map((b, i) => (
                  <StoryCard key={b.id} blog={b} fallback={fallback(i + 3)} />
                ))}
              </div>
            ) : (
              <EmptyPrompt href={paths.blog.new} cta="Write your story">
                Every alumnus has a story: the hostel, the teachers, the road since. Be the first to share yours.
              </EmptyPrompt>
            )}
          </div>
        </section>
      )}

      <NewMembers members={members} joinedThisWeek={joinedThisWeek} />

      <section className={s.sec}>
        <div className={s.wrap}>
          {isEnabled('gallery') && (
            <>
              <SectionHead title="Moments" href={paths.gallery.root} more="Open the gallery" />
              <Mosaic albums={albums} />
            </>
          )}
          {birthdays.length > 0 && (
            <div style={{ marginTop: 56 }}>
              <SectionHead title="Birthdays coming up" />
              <Birthdays people={birthdays} />
            </div>
          )}
        </div>
      </section>

      <Faq surface />

      <section className={s.sec}>
        <div className={s.wrap}>
          <JoinBand />
        </div>
      </section>
    </>
  );
}

/** Album covers, or the hero photos when there are no albums yet. */
function Mosaic({ albums }: { albums: AlbumBasic[] }) {
  const tiles = albums.filter((a) => a.coverImage).length
    ? albums
        .filter((a) => a.coverImage)
        .slice(0, 5)
        .map((a) => ({
          src: a.coverImage as string,
          href: paths.gallery.getAlbumDetailUrl(a.id as string),
          label: a.title,
        }))
    : heroImages()
        .slice(1, 6)
        .map((src) => ({ src, href: paths.gallery.root, label: '' }));
  if (!tiles.length) return null;
  return (
    <div className={l.mosaic}>
      {tiles.map((t) => (
        <Link key={t.src} href={t.href}>
          <img src={t.src} alt={t.label || ''} loading="lazy" />
          {t.label && <span>{t.label}</span>}
        </Link>
      ))}
    </div>
  );
}

function JoinBand() {
  return (
    <div className={l.join}>
      <div>
        <h2>{landing.join.title}</h2>
        <p>{landing.join.body}</p>
      </div>
      <div className={s.ctas}>
        <Link className={`${s.btn} ${s.light}`} href={paths.auth.signup}>
          Join the network
        </Link>
        <Link className={`${s.btn} ${s.ghost}`} href={paths.auth.signin}>
          Sign in
        </Link>
      </div>
    </div>
  );
}

function Stats({ className }: { className: string }) {
  if (!landing.stats.length) return null;
  return (
    <div className={className}>
      {landing.stats.map((st) => (
        <div key={st.label}>
          <b>{st.value}</b>
          <span>{st.label}</span>
        </div>
      ))}
    </div>
  );
}
