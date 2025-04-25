import BhamashahPillars from '@/containers/Organisation/BhamashahPillars';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: 'JNVPJAA Bhamashah Pillars • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/bhamashah-pillars',
    title: 'JNVPJAA Bhamashah Pillars • Alumni Network of JNV Paota, Jaipur',
    description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
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

export default function BhamashahPillarsPage() {
  return (
    <LayoutModule disableCover title="JNVPJAA Bhamashah Pillars • Alumni Network of JNV Paota, Jaipur">
      <BhamashahPillars />
    </LayoutModule>
  );
}
