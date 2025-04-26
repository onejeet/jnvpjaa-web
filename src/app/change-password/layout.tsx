import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change Password • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
  openGraph: {
    url: 'https://jnvpjaa.org/change-password',
    title: 'Change Password • Alumni Network of JNV Paota, Jaipur',
    description:
      'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India.',
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

export default function ChangePasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
