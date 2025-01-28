import SkillUpResources from '@/containers/StudentHub/SkillUpResources';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/layouts/Layout';

const SkillUpResourcesPage: NextPage = () => (
  <>
    <NextSeo
      title="Important Links • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      openGraph={{
        url: 'https://jnvpjaa.org',
        title: 'SkillUp Resources • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
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
      title="SkillUp Resources • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <SkillUpResources />
    </LayoutModule>
  </>
);

export default SkillUpResourcesPage;
