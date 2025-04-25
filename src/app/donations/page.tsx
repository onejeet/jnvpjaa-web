import Donations from '@/containers/Funds/Donations';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: 'Donations • Alumni Network of JNV Paota, Jaipur',
  description:
    'Your contributions help us enhance educational initiatives, provide scholarships, and organize events for Jawahar Navodaya Vidyalaya, Paota students. Join us in making a meaningful impact on our community and fostering connections among alumni. Every donation counts!',
  openGraph: {
    url: 'https://jnvpjaa.org/donations',
    title: 'Donations • Alumni Network of JNV Paota, Jaipur',
    description:
      'Your contributions help us enhance educational initiatives, provide scholarships, and organize events for Jawahar Navodaya Vidyalaya, Paota students. Join us in making a meaningful impact on our community and fostering connections among alumni. Every donation counts!',
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

export default function DonationsPage() {
  return (
    <LayoutModule disableCover title="Donations • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Donations />
    </LayoutModule>
  );
}
