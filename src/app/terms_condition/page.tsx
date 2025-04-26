import About from '@/containers/About';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: 'Terms • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/terms_condition',
    title: 'Terms • Alumni Network of JNV Paota, Jaipur',
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

export default function TermsConditionPage() {
  return (
    <LayoutModule disableCover title="Terms • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <About />
    </LayoutModule>
  );
}
