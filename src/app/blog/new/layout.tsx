import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Blog Post • JNVPJAA',
  description: 'Create a new blog post for the JNVPJAA community',
  openGraph: {
    url: 'https://jnvpjaa.org/events/new',
    title: 'Create Blog Post • JNVPJAA',
    description: 'Create a new blog post for the JNVPJAA community',
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
