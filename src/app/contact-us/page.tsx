import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import ContactUs from '@/containers/ContactUs';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/contact-us/',
  title: 'Contact Us • Alumni Network of JNV Paota, Jaipur',
  description:
    'Contact the JNVPJAA alumni association for questions about membership, events and community initiatives at JNV Paota, Jaipur.',
});

export default function ContactUsPage() {
  return (
    <>
      <JsonLd
        data={generateSchema.webPage('Contact JNVPJAA', '/contact-us/', metadata.description as string, 'ContactPage')}
      />
      <LayoutModule disableCover title="Contact Us • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
        <ContactUs />
      </LayoutModule>
    </>
  );
}
