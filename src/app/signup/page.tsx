import { constructMetadata } from '@/config/seo.config';
import LayoutModule from '@/layouts/Layout';
import Signup from '@/containers/Auth/Signup';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Signup • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
});

export default function SignupPage() {
  return (
    <LayoutModule disableCover disableFooter title={metadata.title as string} containerProps={{}}>
      <Signup />
    </LayoutModule>
  );
}
