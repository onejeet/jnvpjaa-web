import { DeferOnNavigation } from '@/components/DeferOnNavigation';
import PageSkeleton from '@/components/common/PageSkeleton';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';
import { NEWS_POSTS, type NewsCategory, type NewsListResult, type NewsPost } from '@/apollo/newsroomOperations';
import { JsonLd } from '@/components/JsonLd';
import { constructMetadata, generateSchema } from '@/config/seo.config';
import Newsroom from '@/containers/Newsroom';
import { NO_STORE, isNewsCategory } from '@/modules/Newsroom/newsroom.utils';
import { initializeApollo } from '@/utils/apollo';
import { brand } from '@/config/tenant';

// New posts must appear as soon as they are published.
export const dynamic = 'force-dynamic';

const description = `Official news, announcements and press releases from the ${brand.legalName}.`;

const base = constructMetadata({ url: '/newsroom/', title: `Newsroom • ${brand.shortName}`, description });

export const metadata: Metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    types: { 'application/rss+xml': [{ url: '/newsroom/feed.xml', title: `${brand.shortName} Newsroom` }] },
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

async function NewsroomContent(props: { searchParams: Promise<{ type?: string }> }) {
  const searchParams = await props.searchParams;
  const category = isNewsCategory(searchParams?.type) ? searchParams.type : undefined;
  const posts = await getNews(category);
  return (
    <>
      <JsonLd data={generateSchema.collectionPage(`${brand.shortName} Newsroom`, '/newsroom/', description)} />
      <Newsroom posts={posts} category={category} />
    </>
  );
}

export default function NewsroomPage(props: { searchParams: Promise<{ type?: string }> }) {
  return (
    <DeferOnNavigation
      fallback={
        <LayoutModule disableCover>
          <PageSkeleton variant="grid" />
        </LayoutModule>
      }
    >
      <NewsroomContent {...props} />
    </DeferOnNavigation>
  );
}
