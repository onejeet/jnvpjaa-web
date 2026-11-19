import { isRouterNavigation } from '@/utils/isRouterNavigation';
import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import { BlogListResponse, GetBlogListDocument, GetBlogListQuery } from '@/apollo/hooks';
import Blog from '@/containers/Blog';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

// Published posts must be visible without waiting for a new deployment or cache purge.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  url: '/blog/',
  title: `Blog • ${brand.tagline}`,
  description: `Read stories, memories and insights from the ${brand.institution.shortName}, ${brand.institution.city} alumni community on the ${brand.shortName} blog.`,
});

// This is a Server Component that fetches data
async function getBlog() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<GetBlogListQuery>({
    query: GetBlogListDocument,
    variables: { options: { limit: 50 } },
  });

  return data.getBlogList;
}

export default async function BlogPage() {
  const blogData = isRouterNavigation() ? undefined : await getBlog();
  return (
    <>
      <JsonLd
        data={generateSchema.collectionPage(`${brand.shortName} Blog`, '/blog/', metadata.description as string)}
      />
      <Blog data={blogData as BlogListResponse} />
    </>
  );
}
