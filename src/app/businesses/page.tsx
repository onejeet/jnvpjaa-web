import { DeferOnNavigation } from '@/components/DeferOnNavigation';
import PageSkeleton from '@/components/common/PageSkeleton';
import LayoutModule from '@/layouts/Layout';
import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
export const dynamic = 'force-dynamic';

import {
  Business,
  BusinessListResponse,
  GetBusinessDocument,
  GetBusinessesDocument,
  GetBusinessesQuery,
  GetBusinessQuery,
} from '@/apollo/hooks';
import Businesses from '@/containers/Businesses';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/businesses/',
  title: `Businesses by Alumni • ${brand.shortName}`,
  description: `Discover businesses founded or owned by alumni of ${brand.institution.name}.`,
});

// This is a Server Component that fetches data
async function getBusiness() {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<GetBusinessesQuery>({
      query: GetBusinessesDocument,
      variables: {
        options: {
          filter: {},
        },
      },
    });

    return data?.getBusinesses;
  } catch (error) {
    console.error('GraphQL Error (Batch Coordinators):', error);
    return [];
  }
}

async function BusinessesContent() {
  const data = await getBusiness();
  return (
    <>
      <JsonLd
        data={generateSchema.collectionPage('Alumni Businesses', '/businesses/', metadata.description as string)}
      />
      <Businesses data={data as BusinessListResponse} />
    </>
  );
}

export default function BusinessesPage() {
  return (
    <DeferOnNavigation
      fallback={
        <LayoutModule disableCover>
          <PageSkeleton variant="grid" />
        </LayoutModule>
      }
    >
      <BusinessesContent />
    </DeferOnNavigation>
  );
}
