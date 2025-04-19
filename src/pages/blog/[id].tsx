import { Blog, GetBlogDocument, GetBlogListDocument, GetBlogQuery } from '@/apollo/hooks';
import SingleBlog from '@/containers/SingleBlog';
import { initializeApollo } from '@/utils/apollo';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface Params {
  params: {
    id: string;
  };
}

const SingleBlogPage: NextPage<{ blog: Blog }> = ({ blog }) => {
  return (
    <>
      {blog && (
        <NextSeo
          title={`${blog?.title} • JNVPJAA Blog`}
          description={`${blog?.summary}`}
          openGraph={{
            url: `https://jnvpjaa.org/blog/${blog.slug}`,
            title: `${blog?.title} • JNVPJAA Blog`,
            description: `${blog?.summary}`,
            images: [
              {
                url: blog?.cover?.url || '/assets/images/cover-2.webp',
                width: 1280,
                height: 720,
                alt: blog?.title || 'JNVPJAA',
                type: 'image/jpg',
              },
            ],
          }}
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/favicon.png',
            },
          ]}
        />
      )}

      <SingleBlog blog={blog} />
    </>
  );
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query({
      query: GetBlogListDocument,
    });

    const paths = data?.getBlogList?.data?.map((blog: { slug: string }) => ({
      params: { id: blog.slug },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('GraphQL Error 1 :', error);
  }
}

export async function getStaticProps({ params }: Params) {
  const apolloClient = initializeApollo();
  console.log('Requested Slug:', params.id);
  try {
    let res;
    if (params?.id) {
      res = await apolloClient.query<GetBlogQuery>({
        query: GetBlogDocument,
        variables: { slug: params.id },
      });
    }
    return {
      props: {
        blog: res?.data?.getBlog || undefined,
      },
    };
  } catch (error) {
    console.error('GraphQL Error:', error);
  }
}

export default SingleBlogPage;
