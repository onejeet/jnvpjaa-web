import { constructMetadata } from '@/config/seo.config';
import Events from '@/containers/Events';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Events • JNVPJAA',
  description:
    'Events page of JNVPJAA serves as a central hub for all alumni gatherings, including meetups, plantation drives, and sports festivals—bringing the community together through memorable and impactful events.',
});

export default function EventsPage() {
  return <Events />;
}
