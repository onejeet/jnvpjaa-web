import Vision from '@/containers/About/Vision';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: 'Vision & Mission • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
  openGraph: {
    url: 'https://jnvpjaa.org/vision',
    title: 'Vision & Mission • Alumni Network of JNV Paota, Jaipur',
    description:
      'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
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

export default function VisionPage() {
  return (
    <LayoutModule disableCover title="Vision & Mission • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Vision />
    </LayoutModule>
  );
}
