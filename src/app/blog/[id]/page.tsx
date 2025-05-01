import { GetBlogDocument, GetBlogQuery } from '@/apollo/hooks';
import SingleBlog from '@/containers/SingleBlog';
import { PageProps } from '@/types/global';
import { initializeApollo } from '@/utils/apollo';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

// Generate metadata for the page dynamically
export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  // Fetch blog data
  const apolloClient = initializeApollo();
  const { id } = await params;
  const slug = decodeURIComponent(id);

  try {
    const { data } = await apolloClient.query<GetBlogQuery>({
      query: GetBlogDocument,
      variables: { slug },
    });

    const blog = data.getBlog;
    if (!blog) return notFound();

    return {
      title: `${blog.title} • JNVPJAA Blog`,
      description: blog.summary || '',
      openGraph: {
        url: `https://jnvpjaa.org/blog/${blog.slug}`,
        title: `${blog.title} • JNVPJAA Blog`,
        description: blog.summary || '',
        images: [
          {
            url: blog.cover?.url || 'https://assets.jnvpjaa.org/images/cover-2.webp',
            width: 1280,
            height: 720,
            alt: blog.title || 'JNVPJAA',
          },
        ],
        authors: [`${blog.author?.firstName || ''} ${blog.author?.lastName || ''}` || 'JNVPJAA'],
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
      },
    };
  } catch (error) {
    console.error('GraphQL Error:', error);
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

// This is a Server Component that fetches data
async function getBlogDetails(slug: string) {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<GetBlogQuery>({
      query: GetBlogDocument,
      variables: { slug },
      fetchPolicy: 'no-cache',
    });

    const blog = data.getBlog;
    if (!blog) return notFound();

    return blog;
  } catch (error) {
    console.error('GraphQL Error (event):', error);
    return notFound();
  }
}

// This is the main page component
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const slug = decodeURIComponent(id);

  const blog = await getBlogDetails(slug);

  return <SingleBlog blog={blog} />;
}
