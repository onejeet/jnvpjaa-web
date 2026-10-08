import { constructMetadata } from '@/config/seo.config';
import Donations from '@/containers/Funds/Donations';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  title: 'Donations • Alumni Network of JNV Paota, Jaipur',
  description:
    'Your contributions help us enhance educational initiatives, provide scholarships, and organize events for Jawahar Navodaya Vidyalaya, Paota students. Join us in making a meaningful impact on our community and fostering connections among alumni. Every donation counts!',
});

export default function DonationsPage() {
  return (
    <LayoutModule disableCover title="Donations • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Donations />
    </LayoutModule>
  );
}
