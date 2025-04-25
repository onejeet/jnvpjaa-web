import LayoutModule from '@/layouts/Layout';
import Signup from '@/containers/Auth/Signup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
  openGraph: {
    url: 'https://jnvpjaa.org/signup',
    title: 'Signup • Alumni Network of JNV Paota, Jaipur',
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

export default function SignupPage() {
  return (
    <LayoutModule disableCover disableFooter title={metadata.title as string} containerProps={{}}>
      <Signup />
    </LayoutModule>
  );
}
