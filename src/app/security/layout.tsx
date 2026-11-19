import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/security/',
  noIndex: true,
  title: `Security Center • ${brand.tagline}`,
  description: `Manage your password, Google sign-in and signed-in devices for the ${brand.shortName} member portal.`,
});

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
