import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Members from '@/containers/Members';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/members/',
  title: `Members Directory • ${brand.shortName}`,
  description: `Discover and connect with alumni and faculty members of ${brand.institution.name}.`,
});

export default function MembersPage() {
  return (
    <>
      <JsonLd
        data={generateSchema.collectionPage(`${brand.shortName} Members`, '/members/', metadata.description as string)}
      />
      <Members />
    </>
  );
}
