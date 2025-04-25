import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Event • JNVPJAA',
  description: 'Edit an existing event for the JNVPJAA community',
  openGraph: {
    url: 'https://jnvpjaa.org/events/edit',
    title: 'Edit Event • JNVPJAA',
    description: 'Edit an existing event for the JNVPJAA community',
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

export default function EditEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
