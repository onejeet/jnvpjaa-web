import Blog from '@/containers/Blog';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/layouts/Layout';

const BlogPage: NextPage = () => (
  <>
    <NextSeo
      title="Blog • Alumni Network of JNV Paota, Jaipur"
      description="Inspiring stories, memorable experiences, poetries, opinions and valuable insights from our
            alumni community of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      openGraph={{
        url: 'https://jnvpjaa.org',
        title: 'Blog • Alumni Network of JNV Paota, Jaipur',
        description:
          'Inspiring stories, memorable experiences, poetries, opinions and valuable insights from our alumni community of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1638540272551-3f250ebf1b70',
            width: 1280,
            height: 720,
            alt: 'JNVPJAA',
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
    <Blog />
  </>
);

export default BlogPage;
