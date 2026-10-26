import { GetBlogDocument, GetBlogQuery } from '@/apollo/hooks';
import SingleBlog from '@/containers/SingleBlog';
import { SEO_CONFIG, generateSchema } from '@/config/seo.config';
import { initializeApollo } from '@/utils/apollo';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

// Generate metadata for the page dynamically
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const apolloClient = initializeApollo();
  const { id } = params;
  const slug = decodeURIComponent(id);

  try {
    const { data } = await apolloClient.query<GetBlogQuery>({
      query: GetBlogDocument,
      variables: { slug },
    });

    const blog = data?.getBlog;
    if (!blog) return { title: 'Blog Post Not Found' };

    const title = `${blog.title} • JNVPJAA Blog`;
    const description = blog.summary || SEO_CONFIG.description;
    const url = `${SEO_CONFIG.url}/blog/${blog.slug}`;
    const image = blog.cover?.url || SEO_CONFIG.defaultImage;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: 'article',
        url,
        title,
        description,
        images: [{ url: image, width: 1280, height: 720, alt: blog.title }],
        authors: [`${blog.author?.firstName || ''} ${blog.author?.lastName || ''}`.trim() || SEO_CONFIG.siteName],
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
      },
      twitter: {
        card: 'summary_large_image',
        site: SEO_CONFIG.twitterHandle,
        creator: SEO_CONFIG.twitterHandle,
        title,
        description,
        images: [image],
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
    });
    return data?.getBlog;
  } catch (error) {
    console.error('GraphQL Error (event):', error);
    return undefined;
  }
}

// This is the main page component
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const slug = decodeURIComponent(id);
  const blog = await getBlogDetails(slug);

  return (
    <>
      {blog && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema.blogPosting(blog)) }}
        />
      )}
      <SingleBlog blog={blog} />
    </>
  );
}
