import Events from '@/containers/Events';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events • JNVPJAA',
  description:
    'Events page of JNVPJAA serves as a central hub for all alumni gatherings, including meetups, plantation drives, and sports festivals—bringing the community together through memorable and impactful events.',
  openGraph: {
    url: 'https://jnvpjaa.org/events',
    title: 'Events • JNVPJAA',
    description:
      'Events page of JNVPJAA serves as a central hub for all alumni gatherings, including meetups, plantation drives, and sports festivals—bringing the community together through memorable and impactful events.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1659415221439-b75fb3d97bff',
        width: 1280,
        height: 720,
        alt: 'Photos Gallery',
      },
    ],
  },
};

export default function EventsPage() {
  return <Events />;
}
