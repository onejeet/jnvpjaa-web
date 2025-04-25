import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transactions • JNVPJAA',
  description: 'View your transaction history with JNVPJAA',
  openGraph: {
    url: 'https://jnvpjaa.org/transactions',
    title: 'Transactions • JNVPJAA',
    description: 'View your transaction history with JNVPJAA',
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

export default function TransactionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
