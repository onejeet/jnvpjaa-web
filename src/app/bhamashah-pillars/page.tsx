import { constructMetadata } from '@/config/seo.config';
import BhamashahPillars from '@/containers/Organisation/BhamashahPillars';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  url: '/bhamashah-pillars/',
  title: 'JNVPJAA Bhamashah Pillars • Alumni Network of JNV Paota, Jaipur',
  description: 'Recognize the supporters and contributors behind JNVPJAA educational and alumni community initiatives.',
});

export default function BhamashahPillarsPage() {
  return (
    <LayoutModule disableCover title="JNVPJAA Bhamashah Pillars • Alumni Network of JNV Paota, Jaipur">
      <BhamashahPillars />
    </LayoutModule>
  );
}
