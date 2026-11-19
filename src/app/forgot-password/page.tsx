import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import ForgotPassword from '@/containers/Auth/ForgotPassword';
import { Metadata } from 'next';
import { brand, t } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/forgot-password/',
  noIndex: true,
  title: `Forgot Password • ${brand.tagline}`,
  description: `${t('seo.portalDescription')}`,
});

export default function ForgotPasswordPage() {
  return (
    <LayoutModule disableCover disableFooter title={metadata.title as string} containerProps={{}}>
      <ForgotPassword />
    </LayoutModule>
  );
}
