import { constructMetadata } from '@/config/seo.config';
import Organizations from '@/containers/Organisation';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/executive-committee/',
  title: 'Executive Committee • Alumni Network of JNV Paota, Jaipur',
  description:
    'Meet the JNVPJAA executive committee and the alumni volunteers guiding our association and community initiatives.',
});

export default function ExecutiveCommitteePage() {
  return (
    <LayoutModule disableCover title="Executive Committee • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Organizations />
    </LayoutModule>
  );
}
