import { Metadata } from 'next';

import { constructMetadata } from '@/config/seo.config';

export const metadata: Metadata = constructMetadata({
  title: 'Admin Panel • Alumni Network of JNV Paota, Jaipur',
  description: 'Admin panel for managing JNVPJAA alumni network content and members.',
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
