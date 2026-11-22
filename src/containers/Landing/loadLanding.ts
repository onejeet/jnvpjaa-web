import {
  GetAlbumsDocument,
  GetBlogListDocument,
  GetEventListDocument,
  UpcomingBirthdaysDocument,
  type AlbumBasic,
  type BlogBasic,
  type EventBasic,
  type UserBirthday,
} from '@/apollo/hooks';
import type { ContentPage } from '@/apollo/contentPageOperations';
import { NEW_MEMBERS_COUNT, RECENT_MEMBERS, type RecentMember } from '@/apollo/memberOperations';
import { NEWS_POSTS, type NewsPost } from '@/apollo/newsroomOperations';
import type { MessageFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';
import { isEnabled } from '@/config/features';
import { initializeApollo } from '@/utils/apollo';
import { safeList } from './safeList';

export type LandingData = {
  news: NewsPost[];
  blogs: BlogBasic[];
  events: EventBasic[];
  birthdays: UserBirthday[];
  albums: AlbumBasic[];
};

/** Shown by every layout, so loaded on every request. */
export type LandingExtras = {
  /** The admin-edited "Our story" (Admin → Pages); null when hidden, missing or the API failed. */
  story: ContentPage<MessageFields> | null;
  /** Newest verified members, and how many joined in the last 7 days. */
  members: RecentMember[];
  joinedThisWeek: number;
};

export type LandingNeeds = readonly (keyof LandingData)[];

/** Everything a layout receives. */
export type LandingProps = LandingData & LandingExtras;

const none = async () => [];

/** What a layout shows, read from the API on every request; anything it does not need, a disabled module or a failed query is []. */
export async function loadLanding(need: LandingNeeds): Promise<LandingData & LandingExtras> {
  const wants = (key: keyof LandingData, module?: Parameters<typeof isEnabled>[0]) =>
    need.includes(key) && (!module || isEnabled(module));
  const client = initializeApollo();
  const run = (query: unknown, variables?: object) => () =>
    client.query({
      query: query as any,
      variables,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      // Next caches server POST fetches even on dynamic routes.
      context: { fetchOptions: { cache: 'no-store' } },
    });

  const [news, blogs, events, birthdays, albums, members, story, joinedThisWeek] = await Promise.all([
    wants('news', 'newsroom') ? safeList<NewsPost>(run(NEWS_POSTS, { limit: 4 }), (d) => d.newsPosts?.data) : none(),
    wants('blogs', 'blog')
      ? safeList<BlogBasic>(run(GetBlogListDocument, { options: { limit: 6 } }), (d) => d.getBlogList?.data)
      : none(),
    wants('events', 'events')
      ? safeList<EventBasic>(run(GetEventListDocument, { options: { limit: 6 } }), (d) => d.getEventList?.data)
      : none(),
    wants('birthdays') ? safeList<UserBirthday>(run(UpcomingBirthdaysDocument), (d) => d.upcomingBirthdays) : none(),
    wants('albums', 'gallery')
      ? safeList<AlbumBasic>(run(GetAlbumsDocument, { options: { limit: 8 } }), (d) => d.getAlbums?.data)
      : none(),
    safeList<RecentMember>(run(RECENT_MEMBERS, { limit: 12 }), (d) => d.recentMembers),
    getContentPage<MessageFields>('home-story').catch(() => null),
    run(NEW_MEMBERS_COUNT, { days: 7 })()
      .then((r: any) => Number(r.data?.newMembersCount) || 0)
      .catch(() => 0),
  ]);
  return { news, blogs, events, birthdays, albums, members, story, joinedThisWeek };
}
