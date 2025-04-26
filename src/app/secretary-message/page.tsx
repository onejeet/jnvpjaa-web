import SecretaryMessage from '@/containers/About/SecretaryMessage';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: "Secretary's Message • Alumni Network of JNV Paota, Jaipur",
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/secretary-message',
    title: "Secretary's Message • Alumni Network of JNV Paota, Jaipur",
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

export default function SecretaryMessagePage() {
  return (
    <LayoutModule disableCover title="Secretary's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <SecretaryMessage />
    </LayoutModule>
  );
}
