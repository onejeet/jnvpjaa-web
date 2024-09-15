import Home from '@/containers/Home/Home';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const HomePage: NextPage = () => (
  <>
    <NextSeo
      title="JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      openGraph={{
        url: 'https://jnvpjaa.org',
        title: 'JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
        description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
        images: [
          {
            url: '/assets/images/cover-2.jpg',
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

    <LayoutModule disableCover={false} title="JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur">
      <Home />
    </LayoutModule>
  </>
);

export default HomePage;
