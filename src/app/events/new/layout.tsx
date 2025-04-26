import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Event • JNVPJAA',
  description: 'Create a new event for the JNVPJAA community',
  openGraph: {
    url: 'https://jnvpjaa.org/events/new',
    title: 'Create New Event • JNVPJAA',
    description: 'Create a new event for the JNVPJAA community',
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

export default function NewEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
