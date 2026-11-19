import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import ContactUs from '@/containers/ContactUs';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/contact-us/',
  title: `Contact Us • ${brand.tagline}`,
  description: `Contact the ${brand.shortName} alumni association for questions about membership, events and community initiatives at ${brand.institution.shortName}, ${brand.institution.city}.`,
});

export default function ContactUsPage() {
  return (
    <>
      <JsonLd
        data={generateSchema.webPage(
          `Contact ${brand.shortName}`,
          '/contact-us/',
          metadata.description as string,
          'ContactPage'
        )}
      />
      <LayoutModule disableCover title={`Contact Us • ${brand.tagline}`} containerProps={{}}>
        <ContactUs />
      </LayoutModule>
    </>
  );
}
