import Image from 'next/image';
import Link from 'next/link';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { paths } from '@/config/paths';
import { isEnabled, isPathEnabled } from '@/config/features';
import { brand, landing } from '@/config/tenant';
import type { LandingNeeds, LandingProps } from './loadLanding';
import { Celebrating, EmptyPrompt, Faq, NewMembers, OurStory } from './extras';
import l from './welcome.module.css';
import { Birthdays, Carousel, EventRow, FeatureStory, heroImages, s, SectionHead } from './parts';

/** What this layout shows, so the home page only asks the API for that. */
export const needs: LandingNeeds = ['blogs', 'events', 'birthdays'];

/**
 * The "welcome home" pattern of Stanford, WashU and Harvard alumni sites: a campus photo with a classmate finder,
 * three pathways (Brown, RISD), a "lifetime of connections" band (Princeton), then one alumni story told at length.
 */
export default function Welcome({ blogs, events, birthdays, story, members, joinedThisWeek }: LandingProps) {
  const images = heroImages();
  const pic = (i: number) => images[i % images.length];
  const pathways = [
    {
      title: 'Find your batch',
      body: 'Search the member directory for the people you grew up with.',
      href: '/members',
      cta: 'Search members',
    },
    isEnabled('events')
      ? {
          title: 'Come back',
          body: 'Reunions, meet-ups and days back on campus.',
          href: paths.events.root,
          cta: 'See events',
        }
      : {
          title: 'Look back',
          body: 'Photos from reunions, fests and drives.',
          href: paths.gallery.root,
          cta: 'Open the gallery',
        },
    {
      title: 'Give back',
      body: landing.giving.areas.map((a) => a.title).join(', ') || landing.giving.body,
      href: '/donations',
      cta: 'Donate',
    },
  ].filter((p) => isPathEnabled(p.href));

  return (
    <>
      <section className={l.wlHero} aria-labelledby="landing-title">
        <Carousel images={images} />
        <div className={`${s.wrap} ${l.wlCopy}`}>
          <h1 id="landing-title">{landing.hero.title}</h1>
          <p>{landing.hero.subtitle}</p>
          <form className={l.finder} action="/members" method="get" role="search">
            <IconSearch size={22} aria-hidden />
            <input
              name="q"
              type="search"
              placeholder="Find a batchmate by name"
              aria-label="Find a batchmate by name"
              autoComplete="off"
            />
            <button className={`${s.btn} ${s.primary}`} type="submit">
              Search
            </button>
          </form>
          <p className={l.wlNote}>
            New here? <Link href={paths.auth.signup}>Join the network</Link> to see the directory.
          </p>
        </div>
      </section>

      {pathways.length > 0 && (
        <section className={s.sec}>
          <div className={s.wrap}>
            <div className={l.paths}>
              {pathways.map((p, i) => (
                <Link key={p.href} href={p.href} className={l.pathTile}>
                  <Image src={pic(i + 1)} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" quality={70} />
                  <div>
                    <h2>{p.title}</h2>
                    <p>{p.body}</p>
                    <span>
                      {p.cta} <IconArrowRight size={18} aria-hidden />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={l.lifetime}>
        <div className={s.wrap}>
          <div>
            <h2>A lifetime of connections</h2>
            <p>{landing.vision}</p>
            <Link className={`${s.btn} ${s.light}`} href={paths.auth.signup}>
              Join {brand.shortName}
            </Link>
          </div>
          {landing.stats.length > 0 && (
            <dl>
              {landing.stats.map((st) => (
                <div key={st.label}>
                  <dt>{st.label}</dt>
                  <dd>{st.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <OurStory story={story} />

      {isEnabled('blog') && (
        <section className={`${s.sec} ${s.surface}`}>
          <div className={s.wrap}>
            <SectionHead title="Alumni spotlight" href={paths.blog.root} more="All stories" />
            {blogs[0] ? (
              <FeatureStory blog={blogs[0]} fallback={pic(4)} />
            ) : (
              <EmptyPrompt href={paths.blog.new} cta="Write your story">
                Every alumnus has a story: the hostel, the teachers, the road since. Be the first to share yours.
              </EmptyPrompt>
            )}
          </div>
        </section>
      )}

      {isEnabled('events') && (
        <section className={s.sec}>
          <div className={s.wrap}>
            <SectionHead title="Upcoming events" href={paths.events.root} more="All events" />
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

      <Celebrating surface />

      {birthdays.length > 0 && (
        <section className={s.sec}>
          <div className={s.wrap}>
            <SectionHead title="Birthdays this fortnight" intro="Send a wish to someone from your school." />
            <Birthdays people={birthdays} />
          </div>
        </section>
      )}

      <NewMembers members={members} joinedThisWeek={joinedThisWeek} surface />
      <Faq />
    </>
  );
}
