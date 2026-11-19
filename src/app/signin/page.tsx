import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import Signin from '@/containers/Auth/Signin';
import { Metadata } from 'next';
import { brand, t } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/signin/',
  noIndex: true,
  title: `Signin • ${brand.tagline}`,
  description: `${t('seo.portalDescription')}`,
});

export default function SigninPage() {
  return (
    <LayoutModule disableCover disableFooter title={metadata.title as string} containerProps={{}}>
      <Signin />
    </LayoutModule>
  );
}
