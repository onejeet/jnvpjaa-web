import { constructMetadata } from '@/config/seo.config';
import PresidentMessage from '@/containers/About/PresidentMessage';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  title: 'President',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
});

export default function PresidentMessagePage() {
  return (
    <LayoutModule disableCover title="President's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <PresidentMessage />
    </LayoutModule>
  );
}
