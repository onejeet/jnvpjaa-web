import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Events from '@/containers/Events';
import { Metadata } from 'next';
import { GetEventListDocument, GetEventListQuery } from '@/apollo/hooks';
import { initializeApollo } from '@/utils/apollo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  url: '/events/',
  title: 'Events • JNVPJAA',
  description:
    'Explore JNVPJAA alumni reunions, meetups, sports events and community activities for JNV Paota, Jaipur.',
});

export default async function EventsPage() {
  const { data } = await initializeApollo().query<GetEventListQuery>({
    query: GetEventListDocument,
    variables: { options: { limit: 50 } },
  });

  return (
    <>
      <JsonLd data={generateSchema.collectionPage('JNVPJAA Events', '/events/', metadata.description as string)} />
      <Events initialEvents={data.getEventList} />
    </>
  );
}
