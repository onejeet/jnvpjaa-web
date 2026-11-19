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
import { NEWS_POSTS, type NewsPost } from '@/apollo/newsroomOperations';
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

export type LandingNeeds = readonly (keyof LandingData)[];

const none = async () => [];

/** What a layout shows, read from the API on every request; anything it does not need, a disabled module or a failed query is []. */
export async function loadLanding(need: LandingNeeds): Promise<LandingData> {
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

  const [news, blogs, events, birthdays, albums] = await Promise.all([
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
  ]);
  return { news, blogs, events, birthdays, albums };
}
