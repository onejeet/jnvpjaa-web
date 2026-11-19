import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Donations from '@/containers/Funds/Donations';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/donations/',
  title: `Donations • ${brand.tagline}`,
  description: `Support ${brand.shortName} educational initiatives, student opportunities and alumni community activities for ${brand.institution.shortName}, ${brand.institution.city}.`,
});

export default function DonationsPage() {
  return (
    <>
      <JsonLd
        data={generateSchema.webPage(`Support ${brand.shortName}`, '/donations/', metadata.description as string)}
      />
      <LayoutModule disableCover title={`Donations • ${brand.tagline}`} containerProps={{}}>
        <Donations />
      </LayoutModule>
    </>
  );
}
