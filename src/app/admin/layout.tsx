import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel • Alumni Network of JNV Paota, Jaipur',
  description: 'Admin panel for managing JNVPJAA alumni network content and members.',
  openGraph: {
    url: 'https://jnvpjaa.org/admin',
    title: 'Admin Panel • Alumni Network of JNV Paota, Jaipur',
    description: 'Admin panel for managing JNVPJAA alumni network content and members.',
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
