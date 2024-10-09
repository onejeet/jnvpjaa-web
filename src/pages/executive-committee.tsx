import About from '@/containers/About';
import Organizations from '@/containers/Organisation';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const ExecutiveCommitteePage: NextPage = () => (
  <>
    <NextSeo
      title="Executive Committee • Alumni Network of JNV Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      openGraph={{
        url: 'https://jnvpjaa.org',
        title: 'Executive Committee • Alumni Network of JNV Paota, Jaipur',
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
    <LayoutModule disableCover title="Executive Committee • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Organizations />
    </LayoutModule>
  </>
);

export default ExecutiveCommitteePage;
