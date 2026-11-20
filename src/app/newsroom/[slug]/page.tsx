import { isRouterNavigation } from '@/utils/isRouterNavigation';
import { DocumentTitle } from '@/components/DocumentTitle';
import { DeferOnNavigation } from '@/components/DeferOnNavigation';
import PageSkeleton from '@/components/common/PageSkeleton';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { NEWS_POST, type NewsPost } from '@/apollo/newsroomOperations';
import { JsonLd } from '@/components/JsonLd';
import { SEO_CONFIG, canonicalUrl, generateSchema } from '@/config/seo.config';
import { NewsArticle } from '@/containers/Newsroom';
import { NO_STORE } from '@/modules/Newsroom/newsroom.utils';
import { initializeApollo } from '@/utils/apollo';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

const getPost = cache(async (slug: string): Promise<NewsPost | null> => {
  const { data, errors } = await initializeApollo().query<{ newsPost: NewsPost | null }>({
    query: NEWS_POST,
    variables: { slug },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    context: NO_STORE,
  });
  if (errors?.length) throw new Error('Could not load the news');
  return data?.newsPost || null;
});

const newsPageTitle = (title: string) => `${title} | ${brand.shortName} Newsroom`;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Next holds in-app navigation until metadata resolves; the page sets the real title when the post arrives.
  if (await isRouterNavigation()) return { title: 'Newsroom' };
  const params = await props.params;
  const post = await getPost(decodeURIComponent(params.slug));
  if (!post) return { title: 'News not found', robots: { index: false, follow: false } };

  const url = canonicalUrl(`/newsroom/${encodeURIComponent(post.slug)}`);
  const image = post.cover?.url || SEO_CONFIG.defaultImage;
  const title = newsPageTitle(post.title);
  return {
    title: { absolute: title },
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      title,
      description: post.summary,
      images: [{ url: image, alt: post.title }],
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: [SEO_CONFIG.siteName],
    },
    twitter: { card: 'summary_large_image', title, description: post.summary, images: [image] },
  };
}

async function NewsArticleContent(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPost(decodeURIComponent(params.slug));
  if (!post) notFound();

  return (
    <>
      <DocumentTitle title={newsPageTitle(post.title)} />
      <JsonLd data={generateSchema.newsArticle(post)} />
      <JsonLd
        data={generateSchema.breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Newsroom', url: '/newsroom/' },
          { name: post.title, url: `/newsroom/${encodeURIComponent(post.slug)}/` },
        ])}
      />
      <NewsArticle post={post} />
    </>
  );
}

export default function NewsArticlePage(props: { params: Promise<{ slug: string }> }) {
  return (
    <DeferOnNavigation
      fallback={
        <LayoutModule disableCover>
          <PageSkeleton />
        </LayoutModule>
      }
    >
      <NewsArticleContent {...props} />
    </DeferOnNavigation>
  );
}
