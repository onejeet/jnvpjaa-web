import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Members from '@/containers/Members';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  url: '/members/',
  title: 'Members Directory • JNVPJAA',
  description: 'Discover and connect with alumni and faculty members of Jawahar Navodaya Vidyalaya Paota, Jaipur.',
});

export default function MembersPage() {
  return (
    <>
      <JsonLd data={generateSchema.collectionPage('JNVPJAA Members', '/members/', metadata.description as string)} />
      <Members />
    </>
  );
}
