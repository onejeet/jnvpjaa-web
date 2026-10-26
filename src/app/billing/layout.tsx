import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Billing • JNVPJAA',
  description: 'View association billing and transaction records with JNVPJAA',
});

export default function BillingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
