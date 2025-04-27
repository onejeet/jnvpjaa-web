import { BlogListResponse, GetBlogListDocument, GetBlogListQuery } from '@/apollo/hooks';
import Blog from '@/containers/Blog';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog • Alumni Network of JNV Paota, Jaipur',
  description:
    'Inspiring stories, memorable experiences, poetries, opinions and valuable insights from our alumni community of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    title: 'Blog • Alumni Network of JNV Paota, Jaipur',
    description:
      'Inspiring stories, memorable experiences, poetries, opinions and valuable insights from our alumni community of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
    url: 'https://jnvpjaa.org',
    images: [
      {
        url: 'https://cdn.pixabay.com/photo/2020/05/31/16/48/write-5243230_1280.jpg',
        width: 1280,
        height: 720,
        alt: 'JNVPJAA',
      },
    ],
  },
};

// This is a Server Component that fetches data
async function getBlog() {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<GetBlogListQuery>({
      query: GetBlogListDocument,
      variables: {
        options: {
          filter: {},
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
  return <Blog data={blogData as BlogListResponse} />;
}
