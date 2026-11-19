import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';
import { brand, t } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/change-password/',
  noIndex: true,
  title: `Change Password • ${brand.tagline}`,
  description: `${t('seo.portalDescription')}`,
});

export default function ChangePasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
