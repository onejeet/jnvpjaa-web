import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/profile/',
  noIndex: true,
  title: `Profile • ${brand.shortName}`,
  description: `Manage your ${brand.shortName} profile and account settings`,
});

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
