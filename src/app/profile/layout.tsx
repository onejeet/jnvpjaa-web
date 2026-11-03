import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  url: '/profile/',
  noIndex: true,
  title: 'Profile • JNVPJAA',
  description: 'Manage your JNVPJAA profile and account settings',
});

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
