import Businesses from '@/containers/Businesses';
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

export default function BusinessesPage() {
  return <Businesses />;
}
