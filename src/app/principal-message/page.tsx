import { constructMetadata } from '@/config/seo.config';
import PrincipalMessage from '@/containers/About/PrincipalMessage';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  title: 'Principal',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
});

export default function PrincipalMessagePage() {
  return (
    <LayoutModule disableCover title="Principal's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <PrincipalMessage />
    </LayoutModule>
  );
}
