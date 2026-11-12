import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Donations from '@/containers/Funds/Donations';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/donations/',
  title: 'Donations • Alumni Network of JNV Paota, Jaipur',
  description:
    'Support JNVPJAA educational initiatives, student opportunities and alumni community activities for JNV Paota, Jaipur.',
});

export default function DonationsPage() {
  return (
    <>
      <JsonLd data={generateSchema.webPage('Support JNVPJAA', '/donations/', metadata.description as string)} />
      <LayoutModule disableCover title="Donations • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
        <Donations />
      </LayoutModule>
    </>
  );
}
