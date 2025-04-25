import Home from '@/containers/Home/Home';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JNVPJAA • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
  openGraph: {
    title: 'JNVPJAA • Alumni Network of JNV Paota, Jaipur',
    description:
      'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
    url: 'https://jnvpjaa.org',
    images: [
      {
        url: 'https://assets.jnvpjaa.org/images/cover-2.webp',
        width: 1280,
        height: 720,
        alt: 'JNVPJAA',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <LayoutModule disableCover={false} title="JNVPJAA • Alumni Network of JNV Paota, Jaipur">
      <Home />
    </LayoutModule>
  );
}
