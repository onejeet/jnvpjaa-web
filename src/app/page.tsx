import { constructMetadata } from '@/config/seo.config';
import Home from '@/containers/Home/Home';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'JNVPJAA • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
});

export default function HomePage() {
  return (
    <LayoutModule disableCover={false} title="JNVPJAA • Alumni Network of JNV Paota, Jaipur">
      <Home />
    </LayoutModule>
  );
}
