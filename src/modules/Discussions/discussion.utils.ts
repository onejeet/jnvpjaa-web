import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { PostTag } from '@/apollo/discussionOperations';

dayjs.extend(relativeTime);

/** Twitter-style short time: "now", "5m", "3h", "2d", then "12 Nov" / "12 Nov 2024". */
export const shortTime = (iso: string, now = dayjs()) => {
  const d = dayjs(iso);
  const mins = now.diff(d, 'minute');
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  if (mins < 24 * 60) return `${Math.floor(mins / 60)}h`;
  if (mins < 7 * 24 * 60) return `${Math.floor(mins / (24 * 60))}d`;
  return d.format(d.year() === now.year() ? 'D MMM' : 'D MMM YYYY');
};

export const fullTime = (iso: string) => dayjs(iso).format('h:mm A · D MMM YYYY');

/** "2 days left", "5 hours left", "Final results". */
export const pollTimeLeft = (closesAt: string, isClosed: boolean, now = dayjs()) => {
  if (isClosed) return 'Final results';
  const end = dayjs(closesAt);
  const hours = end.diff(now, 'hour');
  if (hours >= 24) {
    const days = Math.round(hours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} left`;
  }
  if (hours >= 1) return `${hours} ${hours === 1 ? 'hour' : 'hours'} left`;
  const mins = Math.max(1, end.diff(now, 'minute'));
  return `${mins} ${mins === 1 ? 'minute' : 'minutes'} left`;
};

/** Each tag gets one theme colour; Discussion stays neutral so the others read as signals. */
export const TAG_COLOR: Record<PostTag, string> = {
  DISCUSSION: 'text.secondary',
  HELP: 'secondary.navy',
  NEED: 'warning.dark',
  IDEA: 'secondary.angelic',
};

export const memberName = (author?: { firstName?: string | null; lastName?: string | null } | null) =>
  [author?.firstName, author?.lastName].filter(Boolean).join(' ') || 'Member';

export const memberTag = (author?: { batch?: number | null; isFaculty?: boolean | null } | null) =>
  author?.isFaculty ? 'Faculty' : author?.batch ? `Batch ${author.batch}` : null;
