import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Events from '@/containers/Events';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  url: '/events/',
  title: 'Events • JNVPJAA',
  description:
    'Explore JNVPJAA alumni reunions, meetups, sports events and community activities for JNV Paota, Jaipur.',
});

export default function EventsPage() {
  return (
    <>
      <JsonLd data={generateSchema.collectionPage('JNVPJAA Events', '/events/', metadata.description as string)} />
      <Events />
    </>
  );
}
