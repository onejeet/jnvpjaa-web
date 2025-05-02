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

export const metadata: Metadata = {
  title: 'Businesses by Alumni • JNVPJAA',
  description: 'Businesses started or owned by our alumni members of JNV Paota Jaipur.',
  openGraph: {
    url: 'https://jnvpjaa.org/businesses',
    title: 'Businesses by Alumni • JNVPJAA',
    description: 'Businesses started or owned by our alumni members of JNV Paota Jaipur.',
    images: [
      {
        url: 'https://assets.jnvpjaa.org/business/business-cover.jpeg',
        width: 1280,
        height: 720,
        alt: 'Businesses by Alumni of JNV Paota Jaipur',
      },
    ],
  },
};

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

export default async function BusinessesPage() {
  const data = await getBusiness();
  return <Businesses data={data as BusinessListResponse} />;
}
