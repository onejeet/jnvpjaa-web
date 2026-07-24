import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing • JNVPJAA',
  description: 'View association billing and transaction records with JNVPJAA',
  openGraph: {
    url: 'https://jnvpjaa.org/billing',
    title: 'Billing • JNVPJAA',
    description: 'View association billing and transaction records with JNVPJAA',
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

export default function BillingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
