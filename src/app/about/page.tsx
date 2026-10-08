import { constructMetadata } from '@/config/seo.config';
import About from '@/containers/About';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'About JNVPJAA • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
});

export default function AboutPage() {
  return (
    <LayoutModule disableCover title="About JNVPJAA • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <About />
    </LayoutModule>
  );
}
