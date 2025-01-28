import BatchCoordinators from '@/containers/Organisation/BatchCoordinators';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/layouts/Layout';

const BatchCoordinatorsPage: NextPage = () => (
  <>
    <NextSeo
      title="Batch Coordinators • Alumni Network of JNV Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      openGraph={{
        url: 'https://jnvpjaa.org',
        title: 'Batch Coordinators • Alumni Network of JNV Paota, Jaipur',
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
    <LayoutModule disableCover title="Batch Coordinators • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <BatchCoordinators />
    </LayoutModule>
  </>
);

export default BatchCoordinatorsPage;
