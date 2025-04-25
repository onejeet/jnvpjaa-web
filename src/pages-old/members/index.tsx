import Members from '@/containers/Members';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const MembersPage: NextPage = () => (
  <>
    <NextSeo
      title="Members Directory • JNVPJAA"
      description="Connect with alumni and faculty members of JNVPJAA. Whether you're catching up with old friends
            or expanding your network, this directory keeps our community connected!"
      openGraph={{
        url: `https://jnvpjaa.org/members`,
        title: `Members Directory • JNVPJAA`,
        description: `Connect with alumni and faculty members of JNVPJAA. Whether you're catching up with old friends or expanding your network, this directory keeps our community connected!`,
        images: [
          {
            url: 'https://jnvpjaa.org/assets/branndiing/school.jpg',
            width: 1280,
            height: 720,
            alt: 'Members Directory • JNVPJAA',
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
    <Members />
  </>
);

export default MembersPage;
