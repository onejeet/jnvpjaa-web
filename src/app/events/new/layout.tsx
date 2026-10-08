import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Create New Event • JNVPJAA',
  description: 'Create a new event for the JNVPJAA community',
});

export default function NewEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
