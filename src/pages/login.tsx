import Vision from '@/containers/About/Vision';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';
import Signin from '@/containers/Auth/Signin';

const LoginPage: NextPage = () => (
  <>
    <NextSeo
      title="Register & Login • Alumni Network of JNV Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school."
      openGraph={{
        url: 'https://jnvpjaa.org',
        title: 'Register & Login • Alumni Network of JNV Paota, Jaipur',
        description:
          'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
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
    <LayoutModule disableCover title="Register & Login • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Signin />
    </LayoutModule>
  </>
);

export default LoginPage;
