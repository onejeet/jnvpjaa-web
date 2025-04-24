import Gallery from '@/containers/Gallery';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const MembersPage: NextPage = () => (
  <>
    <NextSeo
      title="Photos Gallery • JNVPJAA"
      description="A glimpse into the memories we’ve made together: reunions, celebrations, and candid moments from our alumni
            community. A classic photo collection for all our events, meetups and achievements."
      openGraph={{
        url: `https://jnvpjaa.org/gallery`,
        title: `Photos Gallery • JNVPJAA`,
        description: `A glimpse into the memories we’ve made together: reunions, celebrations, and candid moments from our alumni
            community. A classic photo collection for all our events, meetups and achievements.`,
        images: [
          {
            url: 'https://jnvpjaa.org/assets/gallery/milan-jan-2019-2.jpeg',
            width: 1280,
            height: 720,
            alt: 'Photos Gallery',
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
    <Gallery />
  </>
);

export default MembersPage;
