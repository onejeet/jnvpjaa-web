import Organizations from '@/containers/Organisation';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: 'Executive Committee • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/executive-committee',
    title: 'Executive Committee • Alumni Network of JNV Paota, Jaipur',
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

export default function ExecutiveCommitteePage() {
  return (
    <LayoutModule disableCover title="Executive Committee • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Organizations />
    </LayoutModule>
  );
}
