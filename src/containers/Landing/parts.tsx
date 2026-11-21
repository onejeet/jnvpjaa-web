/* eslint-disable @next/next/no-img-element -- covers come from any host members pick, so plain <img> with lazy loading */
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { IconArrowRight, IconMapPin, IconVideo } from '@tabler/icons-react';
import type { BlogBasic, EventBasic, UserBasic, UserBirthday } from '@/apollo/hooks';
import type { NewsPost } from '@/apollo/newsroomOperations';
import { NEWS_CATEGORY_LABELS } from '@/modules/Newsroom/newsroom.utils';
import { paths } from '@/config/paths';
import { assetUrl, brand, landing, seo } from '@/config/tenant';
import { dmSans, notoSerif, playfairDisplay } from '@/utils/theme/fonts';
import s from './Landing.module.css';
import SizedImg from './SizedImg';
import MemberLink from '@/components/common/MemberLink';

export { s };

/** Brand colours and fonts as custom properties for Landing.module.css. */
export function rootStyle(): CSSProperties {
  const p = brand.theme.primary;
  return {
    ...Object.fromEntries(Object.entries(p).map(([k, v]) => [`--p${k}`, v])),
    '--ink': brand.theme.secondary.light,
    '--font-body': dmSans.style.fontFamily,
    '--font-display': playfairDisplay.style.fontFamily,
    '--font-serif': notoSerif.style.fontFamily,
  } as CSSProperties;
}

export const heroImages = () => landing.hero.images.map(assetUrl);

/** A cover field may be a URL or `{ url }` (blog, event and news covers are JSON). */
export const coverUrl = (cover: unknown): string | undefined =>
  typeof cover === 'string' ? cover : ((cover as { url?: string } | null)?.url ?? undefined);

export const fullName = (u?: Pick<UserBasic, 'firstName' | 'lastName'> | null) =>
  [u?.firstName, u?.lastName].filter(Boolean).join(' ');

const fmt = (date: string | Date, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(seo.language, o).format(new Date(date));
export const shortDate = (d: string | Date) => fmt(d, { day: 'numeric', month: 'short', year: 'numeric' });
export const daysUntil = (d: string | Date) =>
  Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000));

/** Crossfading campus photos; the first is preloaded for LCP and shows at once, and reduced motion keeps it still. */
export function Carousel({ images }: { images: string[] }) {
  const slides = images.slice(0, 4);
  return (
    <div className={s.carousel} aria-hidden>
      {slides.map((src, i) => (
        <div
          key={src}
          className={s.slide}
          style={{
            animationDuration: `${slides.length * 7}s`,
            animationDelay: `${i * 7 - 1.5}s`,
            animationName: slides.length > 1 ? undefined : 'none',
          }}
        >
          <Image src={src} alt="" fill sizes="100vw" priority={i === 0} quality={70} />
        </div>
      ))}
    </div>
  );
}

export function SectionHead({
  title,
  intro,
  href,
  more,
}: {
  title: string;
  intro?: string;
  href?: string;
  more?: string;
}) {
  return (
    <div className={s.secHead}>
      <div>
        <h2 className={s.h2}>{title}</h2>
        {intro && <p className={s.muted}>{intro}</p>}
      </div>
      {href && more && (
        <Link className={s.more} href={href}>
          {more} <IconArrowRight size={18} aria-hidden />
        </Link>
      )}
    </div>
  );
}

export function EventDate({ date }: { date: string }) {
  return (
    <div className={s.date} aria-hidden>
      <small>{fmt(date, { month: 'short' }).toUpperCase()}</small>
      <b>{fmt(date, { day: '2-digit' })}</b>
    </div>
  );
}

export const eventPlace = (e: EventBasic) =>
  e.location || (e.medium === 'Online' || e.medium === 'ONLINE' ? 'Online' : '');

export function EventRow({ event }: { event: EventBasic }) {
  const place = eventPlace(event);
  return (
    <Link
      href={paths.events.getEventDetailUrl(event.id as unknown as number)}
      className={`${s.card} ${s.event} ${s.lift}`}
    >
      <EventDate date={event.startDate} />
      <div>
        <h3>{event.title}</h3>
        <p className={s.meta}>
          {place === 'Online' ? (
            <IconVideo size={16} aria-hidden />
          ) : place ? (
            <IconMapPin size={16} aria-hidden />
          ) : null}
          {[place, shortDate(event.startDate)].filter(Boolean).join(' · ')}
          {event.total_attendies ? ` · ${event.total_attendies} going` : ''}
        </p>
      </div>
    </Link>
  );
}

export function StoryCard({ blog, fallback }: { blog: BlogBasic; fallback: string }) {
  return (
    <Link href={paths.blog.getBlogPostUrl(blog.slug)} className={`${s.card} ${s.lift}`}>
      <img className={s.thumb} src={coverUrl(blog.cover) || fallback} alt="" loading="lazy" />
      <div className={s.cardBody}>
        <span className={s.meta}>
          {[fullName(blog.author), blog.author?.batch ? `Batch ${blog.author.batch}` : ''].filter(Boolean).join(' · ')}
        </span>
        <h3 className={s.clamp}>{blog.title}</h3>
        {blog.summary && <p className={`${s.muted} ${s.clamp}`}>{blog.summary}</p>}
      </div>
    </Link>
  );
}

export const newsLabel = (n: NewsPost) => NEWS_CATEGORY_LABELS[n.category] ?? 'News';

export function NewsCard({ post, fallback }: { post: NewsPost; fallback: string }) {
  return (
    <Link href={paths.newsroom.getPostUrl(post.slug)} className={`${s.card} ${s.lift}`}>
      <img className={s.thumb} src={coverUrl(post.cover) || fallback} alt={post.cover?.alt || ''} loading="lazy" />
      <div className={s.cardBody}>
        <span className={s.tag}>{newsLabel(post)}</span>
        <h3 className={s.clamp}>{post.title}</h3>
        {post.summary && <p className={`${s.muted} ${s.clamp}`}>{post.summary}</p>}
      </div>
    </Link>
  );
}

export function Avatar({
  user,
  className = s.avatar,
}: {
  user: Pick<UserBasic, 'firstName' | 'lastName' | 'profileImage'>;
  className?: string;
}) {
  return user.profileImage ? (
    <SizedImg className={className} src={user.profileImage} size={className === s.avatarSm ? 44 : 64} />
  ) : (
    <span className={className} aria-hidden>
      {(user.firstName || '?').charAt(0)}
    </span>
  );
}

export function Birthdays({ people }: { people: UserBirthday[] }) {
  if (!people.length) return null;
  return (
    <ul className={s.bdays}>
      {people.map((p) => (
        <li key={p.id}>
          <MemberLink member={p}>
            <Avatar user={p} />
            <strong>{p.firstName}</strong>
            <br />
            <span className={s.muted}>
              {p.birthday ? fmt(p.birthday, { day: 'numeric', month: 'short' }) : ''}
              {p.batch ? ` · ${p.batch}` : ''}
            </span>
          </MemberLink>
        </li>
      ))}
    </ul>
  );
}

/** One story told at length: photo, title, summary and who wrote it. */
export function FeatureStory({
  blog,
  fallback,
  cta = 'Read the story',
}: {
  blog: BlogBasic;
  fallback: string;
  cta?: string;
}) {
  return (
    <Link href={paths.blog.getBlogPostUrl(blog.slug)} className={s.feat}>
      <img src={coverUrl(blog.cover) || fallback} alt="" loading="lazy" />
      <div>
        <h3>{blog.title}</h3>
        {blog.summary && <p className={s.muted}>{blog.summary}</p>}
        {blog.author && (
          <span className={s.byline}>
            <Avatar user={blog.author} className={s.avatarSm} />
            <span>
              <strong>{fullName(blog.author)}</strong>
              {blog.author.batch ? ` · Batch ${blog.author.batch}` : ''}
            </span>
          </span>
        )}
        <span className={s.more}>
          {cta} <IconArrowRight size={18} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
