import PastPresidents from '@/containers/PastPresidents/PastPresidents';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: 'JNVPJAA Past Presidents • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/past-presidents',
    title: 'JNVPJAA Past Presidents • Alumni Network of JNV Paota, Jaipur',
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

export default function PastPresidentsPage() {
  return (
    <LayoutModule
      disableCover
      title="JNVPJAA Past Presidents • Alumni Network of JNV Paota, Jaipur"
      containerProps={{}}
    >
      <PastPresidents />
    </LayoutModule>
  );
}
