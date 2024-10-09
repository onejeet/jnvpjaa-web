import Blog from '@/containers/Blog';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const BlogPage: NextPage = () => (
  <>
    <NextSeo
      title="JNVPJAA Blog • Alumni Network of JNV Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      openGraph={{
        url: 'https://jnvpjaa.org',
        title: 'JNVPJAA Blog • Alumni Network of JNV Paota, Jaipur',
        description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
        images: [
          {
            url: '/assets/images/cover-2.webp',
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
    <LayoutModule disableCover title="JNVPJAA Blog • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Blog />
    </LayoutModule>
  </>
);

export default BlogPage;
