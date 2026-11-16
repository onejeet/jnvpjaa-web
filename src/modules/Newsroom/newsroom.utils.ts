// Dependency-free on purpose: tests load this file on its own.
import type { NewsCategory } from '@/apollo/newsroomOperations';

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  ANNOUNCEMENT: 'Announcement',
  PRESS_RELEASE: 'Press release',
  ACHIEVEMENT: 'Achievement',
  IN_THE_MEDIA: 'In the media',
};

export const NEWS_BYLINE = 'JNVPJAA Communications';
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
