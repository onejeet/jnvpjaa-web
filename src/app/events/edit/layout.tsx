import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/events/edit/',
  noIndex: true,
  title: `Edit Event • ${brand.shortName}`,
  description: `Edit an existing event for the ${brand.shortName} community`,
});

export default function EditEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
