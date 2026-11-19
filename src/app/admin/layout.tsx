import { Metadata } from 'next';

import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import AdminShell from '@/modules/AdminShell/AdminShell';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/admin/',
  noIndex: true,
  title: `Admin Panel • ${brand.tagline}`,
  description: `Admin panel for managing ${brand.shortName} alumni network content and members.`,
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutModule disableCover title={`Admin Panel • ${brand.tagline}`} containerProps={{}}>
      <AdminShell>{children}</AdminShell>
    </LayoutModule>
  );
}
