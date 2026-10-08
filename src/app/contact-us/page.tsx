import { constructMetadata } from '@/config/seo.config';
import ContactUs from '@/containers/ContactUs';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Us • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
});

export default function ContactUsPage() {
  return (
    <LayoutModule disableCover title="Contact Us • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <ContactUs />
    </LayoutModule>
  );
}
