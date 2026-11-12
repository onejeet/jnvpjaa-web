import { constructMetadata } from '@/config/seo.config';
import PrincipalMessage from '@/containers/About/PrincipalMessage';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/principal-message/',
  title: "Principal's Message • JNVPJAA",
  description: 'Read the principal’s message for the JNV Paota, Jaipur alumni community.',
});

export default function PrincipalMessagePage() {
  return (
    <LayoutModule disableCover title="Principal's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <PrincipalMessage />
    </LayoutModule>
  );
}
