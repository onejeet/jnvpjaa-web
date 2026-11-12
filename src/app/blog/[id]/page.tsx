import { BlogStatus, GetBlogDocument, GetBlogQuery } from '@/apollo/hooks';
import { JsonLd } from '@/components/JsonLd';
import SingleBlog from '@/containers/SingleBlog';
import { SEO_CONFIG, canonicalUrl, generateSchema } from '@/config/seo.config';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const dynamic = 'force-dynamic';

const getBlog = cache(async (slug: string) => {
  const { data, errors } = await initializeApollo().query<GetBlogQuery>({
    query: GetBlogDocument,
    variables: { slug },
    errorPolicy: 'all',
  });
  if (errors?.some((error) => error.extensions?.code !== 'NOT_FOUND')) {
    throw new Error('Could not load blog post');
  }
  const blog = data?.getBlog;
  return blog?.status === BlogStatus.Published ? blog : null;
});

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const blog = await getBlog(decodeURIComponent(params.id));
  if (!blog) return { title: 'Blog post not found', robots: { index: false, follow: false } };

  const url = canonicalUrl(`/blog/${encodeURIComponent(blog.slug || params.id)}`);
  const description = blog.summary || SEO_CONFIG.description;
  const image = blog.cover?.url || SEO_CONFIG.defaultImage;
  const title = `${blog.title} | JNVPJAA Blog`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      title,
      description,
      images: [{ url: image, alt: blog.title }],
      modifiedTime: blog.updatedAt,
      authors: [`${blog.author?.firstName || ''} ${blog.author?.lastName || ''}`.trim() || SEO_CONFIG.siteName],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(decodeURIComponent(params.id));
  if (!blog) notFound();

  return (
    <>
      <JsonLd data={generateSchema.blogPosting(blog)} />
      <JsonLd
        data={generateSchema.breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog/' },
          { name: blog.title, url: `/blog/${encodeURIComponent(blog.slug || params.id)}/` },
        ])}
      />
      <SingleBlog blog={blog} />
    </>
  );
}
