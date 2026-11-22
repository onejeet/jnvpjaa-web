import Image from 'next/image';
import Link from 'next/link';
import { IconArrowRight, IconHeartHandshake, IconReceipt } from '@tabler/icons-react';
import { paths } from '@/config/paths';
import { isEnabled, isPathEnabled } from '@/config/features';
import { brand, landing } from '@/config/tenant';
import type { LandingNeeds, LandingProps } from './loadLanding';
import { Celebrating, EmptyPrompt, Faq, NewMembers, OurStory } from './extras';
import l from './impact.module.css';
import { FeatureStory, heroImages, s, SectionHead } from './parts';

/** What this layout shows, so the home page only asks the API for that. */
export const needs: LandingNeeds = ['blogs'];

/**
 * The giving pattern of Vassar, Creighton and Lehigh: purpose first, then what alumni have already done,
 * where support goes, one story that shows it, and a short list of ways to give.
 */
export default function Impact({ blogs, story, members, joinedThisWeek }: LandingProps) {
  const images = heroImages();
  const pic = (i: number) => images[i % images.length];
  const { giving } = landing;
  const accounts = isPathEnabled('/transactions');
  const ways = [
    { title: 'Make a gift', body: 'A one-time gift to the association fund.', href: '/donations' },
    { title: 'Fund a scholarship', body: 'Back a student from the school through college.', href: '/scholarships' },
    { title: 'Support students', body: 'See in the student hub where alumni can help.', href: '/student-hub' },
  ].filter((w) => isPathEnabled(w.href));

  return (
    <>
      <section className={l.imHero} aria-labelledby="landing-title">
        <div className={s.wrap}>
          <div className={l.imCopy}>
            <h1 id="landing-title">{giving.title}</h1>
            <p>{giving.body}</p>
            <div className={s.ctas}>
              {isPathEnabled('/donations') && (
                <Link className={`${s.btn} ${s.primary}`} href="/donations">
                  <IconHeartHandshake size={20} aria-hidden /> Donate
                </Link>
              )}
              {accounts && (
                <Link className={`${s.btn} ${s.ghost}`} href="/transactions">
                  <IconReceipt size={20} aria-hidden /> See the accounts
                </Link>
              )}
            </div>
          </div>
          <div className={l.imPhotos} aria-hidden>
            <Image src={pic(2)} alt="" width={600} height={800} sizes="(min-width: 960px) 28vw, 60vw" priority />
            <Image src={pic(4)} alt="" width={400} height={400} sizes="(min-width: 960px) 17vw, 36vw" />
          </div>
        </div>
      </section>

      {landing.stats.length > 0 && (
        <section className={s.sec}>
          <div className={`${s.wrap} ${l.imRecord}`}>
            <div>
              <h2 className={s.h2}>What {brand.shortName} alumni have done so far</h2>
              <p className={s.muted}>{landing.vision}</p>
            </div>
            <dl>
              {landing.stats.map((st) => (
                <div key={st.label}>
                  <dd>{st.value}</dd>
                  <dt>{st.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <OurStory story={story} surface />

      {giving.areas.length > 0 && (
        <section className={`${s.sec} ${s.surface}`}>
          <div className={s.wrap}>
            <SectionHead title="Where your support goes" />
            <ol className={l.imAreas}>
              {giving.areas.map((a, i) => (
                <li key={a.title}>
                  <Image
                    src={pic(i + 5)}
                    alt=""
                    width={640}
                    height={400}
                    sizes="(min-width: 640px) 33vw, 88px"
                    quality={70}
                  />
                  <div>
                    <h3>{a.title}</h3>
                    <p className={s.muted}>{a.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {isEnabled('blog') && (
        <section className={s.sec}>
          <div className={s.wrap}>
            <SectionHead title="A story from the network" href={paths.blog.root} more="All stories" />
            {blogs[0] ? (
              <FeatureStory blog={blogs[0]} fallback={pic(1)} />
            ) : (
              <EmptyPrompt href={paths.blog.new} cta="Write your story">
                Every alumnus has a story: the hostel, the teachers, the road since. Be the first to share yours.
              </EmptyPrompt>
            )}
          </div>
        </section>
      )}

      <Celebrating surface />
      <NewMembers members={members} joinedThisWeek={joinedThisWeek} />

      {ways.length > 0 && (
        <section className={l.imWays}>
          <div className={s.wrap}>
            <h2 className={s.h2}>Ways to give</h2>
            <ul>
              {ways.map((w) => (
                <li key={w.href}>
                  <Link href={w.href}>
                    <span>
                      <strong>{w.title}</strong>
                      <span>{w.body}</span>
                    </span>
                    <IconArrowRight size={24} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <p className={l.imTrust}>
              {brand.legalName}
              {accounts && (
                <>
                  {' · '}
                  <Link href="/transactions">Public accounts</Link>
                </>
              )}
              {' · '}
              <Link href="/contact-us">Questions? Contact us</Link>
            </p>
          </div>
        </section>
      )}

      <Faq surface />
    </>
  );
}
