import { Metadata } from 'next';
import { NEWS_POSTS, type NewsCategory, type NewsListResult, type NewsPost } from '@/apollo/newsroomOperations';
import { JsonLd } from '@/components/JsonLd';
import { constructMetadata, generateSchema } from '@/config/seo.config';
import Newsroom from '@/containers/Newsroom';
import { NO_STORE, isNewsCategory } from '@/modules/Newsroom/newsroom.utils';
import { initializeApollo } from '@/utils/apollo';

// New stories must appear as soon as they are published.
export const dynamic = 'force-dynamic';

const description = 'Official news, announcements and press releases from the JNV Paota Jaipur Alumni Association.';

const base = constructMetadata({ url: '/newsroom/', title: 'Newsroom • JNVPJAA', description });

export const metadata: Metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    types: { 'application/rss+xml': [{ url: '/newsroom/feed.xml', title: 'JNVPJAA Newsroom' }] },
  },
};

async function getNews(category?: NewsCategory): Promise<NewsPost[]> {
  try {
    const { data } = await initializeApollo().query<NewsListResult>({
      query: NEWS_POSTS,
      variables: { category, limit: 24 },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      context: NO_STORE,
    });
    return data?.newsPosts?.data || [];
  } catch {
    return [];
  }
}

export default async function NewsroomPage({ searchParams }: { searchParams: { type?: string } }) {
  const category = isNewsCategory(searchParams?.type) ? searchParams.type : undefined;
  const posts = await getNews(category);
  return (
    <>
      <JsonLd data={generateSchema.collectionPage('JNVPJAA Newsroom', '/newsroom/', description)} />
      <Newsroom posts={posts} category={category} />
    </>
  );
}
