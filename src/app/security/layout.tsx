import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  url: '/security/',
  noIndex: true,
  title: 'Security Center • Alumni Network of JNV Paota, Jaipur',
  description: 'Manage your password, Google sign-in and signed-in devices for the JNVPJAA member portal.',
});

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
