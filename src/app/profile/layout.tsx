import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile • JNVPJAA',
  description: 'Manage your JNVPJAA profile and account settings',
  openGraph: {
    title: 'Profile • JNVPJAA',
    description: 'Manage your JNVPJAA profile and account settings',
    url: 'https://jnvpjaa.org/profile',
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

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
