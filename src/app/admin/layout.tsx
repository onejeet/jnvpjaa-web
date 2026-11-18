import { Metadata } from 'next';

import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import AdminShell from '@/modules/AdminShell/AdminShell';

export const metadata: Metadata = constructMetadata({
  url: '/admin/',
  noIndex: true,
  title: 'Admin Panel • Alumni Network of JNV Paota, Jaipur',
  description: 'Admin panel for managing JNVPJAA alumni network content and members.',
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutModule disableCover title="Admin Panel • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <AdminShell>{children}</AdminShell>
    </LayoutModule>
  );
}
