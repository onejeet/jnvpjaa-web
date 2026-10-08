import { constructMetadata } from '@/config/seo.config';
import BhamashahPillars from '@/containers/Organisation/BhamashahPillars';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  title: 'JNVPJAA Bhamashah Pillars • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
});

export default function BhamashahPillarsPage() {
  return (
    <LayoutModule disableCover title="JNVPJAA Bhamashah Pillars • Alumni Network of JNV Paota, Jaipur">
      <BhamashahPillars />
    </LayoutModule>
  );
}
