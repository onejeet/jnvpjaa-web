import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { NEWS_POST, type NewsPost } from '@/apollo/newsroomOperations';
import { JsonLd } from '@/components/JsonLd';
import { SEO_CONFIG, canonicalUrl, generateSchema } from '@/config/seo.config';
import { NewsArticle } from '@/containers/Newsroom';
import { NO_STORE } from '@/modules/Newsroom/newsroom.utils';
import { initializeApollo } from '@/utils/apollo';

export const dynamic = 'force-dynamic';

const getPost = cache(async (slug: string): Promise<NewsPost | null> => {
  const { data, errors } = await initializeApollo().query<{ newsPost: NewsPost | null }>({
    query: NEWS_POST,
    variables: { slug },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    context: NO_STORE,
  });
  if (errors?.length) throw new Error('Could not load news article');
  return data?.newsPost || null;
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(decodeURIComponent(params.slug));
  if (!post) return { title: 'Article not found', robots: { index: false, follow: false } };

  const url = canonicalUrl(`/newsroom/${encodeURIComponent(post.slug)}`);
  const image = post.cover?.url || SEO_CONFIG.defaultImage;
  const title = `${post.title} | JNVPJAA Newsroom`;
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

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPost(decodeURIComponent(params.slug));
  if (!post) notFound();

  return (
    <>
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
