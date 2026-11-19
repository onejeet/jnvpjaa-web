import { constructMetadata } from '@/config/seo.config';
import Organizations from '@/containers/Organisation';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/executive-committee/',
  title: `Executive Committee • ${brand.tagline}`,
  description: `Meet the ${brand.shortName} executive committee and the alumni volunteers guiding our association and community initiatives.`,
});

export default function ExecutiveCommitteePage() {
  return (
    <LayoutModule disableCover title={`Executive Committee • ${brand.tagline}`} containerProps={{}}>
      <Organizations />
    </LayoutModule>
  );
}
