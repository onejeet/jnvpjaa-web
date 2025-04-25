import PresidentMessage from '@/containers/About/PresidentMessage';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: "President's Message • Alumni Network of JNV Paota, Jaipur",
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/president-message',
    title: "President's Message • Alumni Network of JNV Paota, Jaipur",
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

export default function PresidentMessagePage() {
  return (
    <LayoutModule disableCover title="President's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <PresidentMessage />
    </LayoutModule>
  );
}
