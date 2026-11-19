import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import Signup from '@/containers/Auth/Signup';
import { Metadata } from 'next';
import { brand, t } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/signup/',
  noIndex: true,
  title: `Signup • ${brand.tagline}`,
  description: `${t('seo.portalDescription')}`,
});

export default function SignupPage() {
  return (
    <LayoutModule disableCover disableFooter title={metadata.title as string} containerProps={{}}>
      <Signup />
    </LayoutModule>
  );
}
