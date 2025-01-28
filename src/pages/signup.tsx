import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/layouts/Layout';
import Signup from '@/containers/Auth/Signup';

const meta = {
  title: 'Signup • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
  url: 'https://jnvpjaa.org/signup',
};

const SignupPage: NextPage = () => (
  <>
    <NextSeo
      title={meta.title}
      description={meta.description}
      openGraph={{
        url: meta.url,
        title: meta.title,
        description: meta.description,
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
    <LayoutModule disableCover disableFooter title={meta.title} containerProps={{}}>
      <Signup />
    </LayoutModule>
  </>
);

export default SignupPage;
