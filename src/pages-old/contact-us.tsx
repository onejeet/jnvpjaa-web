import ContactUs from '@/containers/ContactUs';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/layouts/Layout';

const ContactUsPage: NextPage = () => (
  <>
    <NextSeo
      title="Contact Us • Alumni Network of JNV Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      openGraph={{
        url: 'https://jnvpjaa.org',
        title: 'Contact Us • Alumni Network of JNV Paota, Jaipur',
        description:
          'We’d love to hear from you! Whether you have questions, need assistance, or want to collaborate, feel free to reach out.',
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
    <LayoutModule disableCover title="Contact Us • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <ContactUs />
    </LayoutModule>
  </>
);

export default ContactUsPage;
