import { constructMetadata } from '@/config/seo.config';
import PastPresidents from '@/containers/PastPresidents/PastPresidents';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/past-presidents/',
  title: 'JNVPJAA Past Presidents • Alumni Network of JNV Paota, Jaipur',
  description:
    'Explore the past presidents who have served the JNVPJAA alumni association and helped strengthen its community.',
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
