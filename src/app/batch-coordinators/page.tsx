import BatchCoordinators from '@/containers/Organisation/BatchCoordinators';
import { BatchCoordinator, GetAllBatchCoordinatorsDocument, GetAllBatchCoordinatorsQuery } from '@/apollo/hooks';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: 'Batch Coordinators • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/batch-coordinators',
    title: 'Batch Coordinators • Alumni Network of JNV Paota, Jaipur',
    description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
    images: [
      {
        url: 'https://assets.jnvpjaa.org/images/cover-2.webp',
        width: 1280,
        height: 720,
        alt: 'JNVPJAA',
      },
    ],
  },
};

// This is a Server Component that fetches data
async function getBatchCoordinators() {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<GetAllBatchCoordinatorsQuery>({
      query: GetAllBatchCoordinatorsDocument,
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
    <LayoutModule disableCover title="Batch Coordinators • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <BatchCoordinators coordinators={coordinators as BatchCoordinator[]} />
    </LayoutModule>
  );
}
