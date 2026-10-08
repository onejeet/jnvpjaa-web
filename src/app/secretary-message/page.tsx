import { constructMetadata } from '@/config/seo.config';
import SecretaryMessage from '@/containers/About/SecretaryMessage';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  title: 'Secretary',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
});

export default function SecretaryMessagePage() {
  return (
    <LayoutModule disableCover title="Secretary's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <SecretaryMessage />
    </LayoutModule>
  );
}
