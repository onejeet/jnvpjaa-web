import { constructMetadata } from '@/config/seo.config';
import PastPresidents from '@/containers/PastPresidents/PastPresidents';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  title: 'JNVPJAA Past Presidents • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
});

export default function PastPresidentsPage() {
  return (
    <LayoutModule
      disableCover
      title="JNVPJAA Past Presidents • Alumni Network of JNV Paota, Jaipur"
      containerProps={{}}
    >
      <PastPresidents />
    </LayoutModule>
  );
}
