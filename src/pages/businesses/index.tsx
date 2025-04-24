import Businesses from '@/containers/Businesses';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const MembersPage: NextPage = () => (
  <>
    <NextSeo
      title="Businesses by Alumni • JNVPJAA"
      description="Businesses started or owned by our alumni members of JNV Paota Jaipur."
      openGraph={{
        url: `https://jnvpjaa.org/businesses`,
        title: 'Businesses by Alumni • JNVPJAA',
        description: `Businesses started or owned by our alumni members of JNV Paota Jaipur.`,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa',
            width: 1280,
            height: 720,
            alt: 'Businesses by Alumni of JNV Paota Jaipur',
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
    <Businesses />
  </>
);

export default MembersPage;
