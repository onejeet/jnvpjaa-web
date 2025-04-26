import PrincipalMessage from '@/containers/About/PrincipalMessage';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: "Principal's Message • Alumni Network of JNV Paota, Jaipur",
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/principal-message',
    title: "Principal's Message • Alumni Network of JNV Paota, Jaipur",
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

export default function PrincipalMessagePage() {
  return (
    <LayoutModule disableCover title="Principal's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <PrincipalMessage />
    </LayoutModule>
  );
}
