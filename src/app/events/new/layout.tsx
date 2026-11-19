import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/events/new/',
  noIndex: true,
  title: `Create New Event • ${brand.shortName}`,
  description: `Create a new event for the ${brand.shortName} community`,
});

export default function NewEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
