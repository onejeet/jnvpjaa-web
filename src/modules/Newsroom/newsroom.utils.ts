// Dependency-free on purpose: tests load this file on its own.
import type { NewsCategory } from '@/apollo/newsroomOperations';
import { brand } from '@/config/tenant';

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  ANNOUNCEMENT: 'Announcement',
  PRESS_RELEASE: 'Press release',
  ACHIEVEMENT: 'Achievement',
  IN_THE_MEDIA: 'In the media',
};

export const NEWS_BYLINE = `${brand.shortName} Communications`;
export const NEWS_DATELINE_PLACE = 'JAIPUR';

// Fixed to India time so the server's own timezone can never shift the printed day.
const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const formatNewsDate = (value: string) => DATE_FORMAT.format(new Date(value));

export function formatDateline(publishedAt: string, place: string = NEWS_DATELINE_PLACE): string {
  return `${place}, ${formatNewsDate(publishedAt)}`;
}

export function isNewsCategory(value: unknown): value is NewsCategory {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(NEWS_CATEGORY_LABELS, value);
}

// Next caches server-side POST fetches (GraphQL) even on force-dynamic pages; news must never be served stale.
export const NO_STORE = { fetchOptions: { cache: 'no-store' as const } };

/** Published news with a future date is scheduled: the public queries hide it until then. */
export function newsStatusLabel(
  status: 'DRAFT' | 'PUBLISHED',
  publishedAt?: string | null,
  now: Date = new Date()
): 'Draft' | 'Scheduled' | 'Published' {
  if (status === 'DRAFT') return 'Draft';
  return publishedAt && new Date(publishedAt) > now ? 'Scheduled' : 'Published';
}
