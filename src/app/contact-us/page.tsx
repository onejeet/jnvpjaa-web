import ContactUs from '@/containers/ContactUs';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

export const metadata: Metadata = {
  title: 'Contact Us • Alumni Network of JNV Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/contact-us',
    title: 'Contact Us • Alumni Network of JNV Paota, Jaipur',
    description:
      "We'd love to hear from you! Whether you have questions, need assistance, or want to collaborate, feel free to reach out.",
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

export default function ContactUsPage() {
  return (
    <LayoutModule disableCover title="Contact Us • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <ContactUs />
    </LayoutModule>
  );
}
