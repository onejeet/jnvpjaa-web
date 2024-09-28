import ImportantLinks from '@/containers/Resources/ImportantLinks';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const ImportantLinksPage: NextPage = () => (
  <>
    <NextSeo
      title="Important Links • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      openGraph={{
        url: 'https://jnvpjaa.org',
        title: 'About JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
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
    <LayoutModule
      disableCover
      title="Important Links • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <ImportantLinks />
    </LayoutModule>
  </>
);

export default ImportantLinksPage;
