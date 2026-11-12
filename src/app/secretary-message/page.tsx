import { constructMetadata } from '@/config/seo.config';
import SecretaryMessage from '@/containers/About/SecretaryMessage';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/secretary-message/',
  title: "Secretary's Message • JNVPJAA",
  description: 'Read the JNVPJAA secretary’s message about alumni connections and association activities.',
});

export default function SecretaryMessagePage() {
  return (
    <LayoutModule disableCover title="Secretary's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <SecretaryMessage />
    </LayoutModule>
  );
}
