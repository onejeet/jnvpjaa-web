import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import { BlogListResponse, GetBlogListDocument, GetBlogListQuery } from '@/apollo/hooks';
import Blog from '@/containers/Blog';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';

// Published posts must be visible without waiting for a new deployment or cache purge.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  url: '/blog/',
  title: 'Blog • Alumni Network of JNV Paota, Jaipur',
  description: 'Read stories, memories and insights from the JNV Paota, Jaipur alumni community on the JNVPJAA blog.',
});

// This is a Server Component that fetches data
async function getBlog() {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<GetBlogListQuery>({
      query: GetBlogListDocument,
      variables: {
        options: {
          filter: {
            verified: undefined,
          },
          limit: 50,
        },
      },
    });

    return data.getBlogList;
  } catch (error) {
    console.error('GraphQL Error (Batch Coordinators):', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogData = await getBlog();
  return (
    <>
      <JsonLd data={generateSchema.collectionPage('JNVPJAA Blog', '/blog/', metadata.description as string)} />
      <Blog data={blogData as BlogListResponse} />
    </>
  );
}
