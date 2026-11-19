import { constructMetadata } from '@/config/seo.config';
import BatchCoordinators from '@/containers/Organisation/BatchCoordinators';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';
import { headers } from 'next/headers';
import { BATCH_COORDINATOR_ROLE_ASSIGNMENTS_QUERY } from '@/apollo/accessOperations';
import { BatchCoordinatorRoleAssignment } from '@/types/access';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/batch-coordinators/',
  title: `Batch Coordinators • ${brand.tagline}`,
  description: `Find ${brand.shortName} batch coordinators who help alumni of ${brand.institution.shortName}, ${brand.institution.city} stay connected across graduating years.`,
});

// This is a Server Component that fetches data
async function getBatchCoordinators() {
  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get('cookie');
  const apolloClient = initializeApollo({ cookie: cookieHeader ?? '' });

  try {
    const { data } = await apolloClient.query<{
      getAllBatchCoordinators?: BatchCoordinatorRoleAssignment[];
    }>({
      query: BATCH_COORDINATOR_ROLE_ASSIGNMENTS_QUERY,
      variables: {
        options: {
          filter: {},
        },
      },
    });

    return data?.getAllBatchCoordinators;
  } catch (error) {
    console.error('GraphQL Error (Batch Coordinators):', error);
    return [];
  }
}

export default async function BatchCoordinatorsPage() {
  const coordinators = await getBatchCoordinators();

  return (
    <LayoutModule disableCover title={`Batch Coordinators • ${brand.tagline}`} containerProps={{}}>
      <BatchCoordinators coordinators={coordinators || []} />
    </LayoutModule>
  );
}
