import { isRouterNavigation } from '@/utils/isRouterNavigation';
import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Events from '@/containers/Events';
import { Metadata } from 'next';
import { GetEventListDocument, GetEventListQuery } from '@/apollo/hooks';
import { initializeApollo } from '@/utils/apollo';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = constructMetadata({
  url: '/events/',
  title: `Events • ${brand.shortName}`,
  description: `Explore ${brand.shortName} alumni reunions, meetups, sports events and community activities for ${brand.institution.shortName}, ${brand.institution.city}.`,
});

export default async function EventsPage() {
  if (await isRouterNavigation()) return <Events />;
  const { data } = await initializeApollo().query<GetEventListQuery>({
    query: GetEventListDocument,
    variables: { options: { limit: 50 } },
  });

  return (
    <>
      <JsonLd
        data={generateSchema.collectionPage(`${brand.shortName} Events`, '/events/', metadata.description as string)}
      />
      <Events initialEvents={data.getEventList} />
    </>
  );
}
