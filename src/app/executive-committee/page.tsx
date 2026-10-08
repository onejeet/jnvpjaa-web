import { constructMetadata } from '@/config/seo.config';
import Organizations from '@/containers/Organisation';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  title: 'Executive Committee • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
});

export default function ExecutiveCommitteePage() {
  return (
    <LayoutModule disableCover title="Executive Committee • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Organizations />
    </LayoutModule>
  );
}
