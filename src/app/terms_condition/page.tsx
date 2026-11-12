import { constructMetadata } from '@/config/seo.config';
import About from '@/containers/About';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/terms_condition/',
  noIndex: true,
  title: 'Terms • Alumni Network of JNV Paota, Jaipur',
  description: 'Information about the JNVPJAA alumni association.',
});

export default function TermsConditionPage() {
  return (
    <LayoutModule disableCover title="Terms • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <About />
    </LayoutModule>
  );
}
