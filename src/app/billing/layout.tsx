import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/billing/',
  noIndex: true,
  title: `Billing • ${brand.shortName}`,
  description: `View association billing and transaction records with ${brand.shortName}`,
});

export default function BillingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
