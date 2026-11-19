import { Metadata } from 'next';
import { assetUrl, brand } from '@/config/tenant';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: `Transactions • ${brand.shortName}`,
  description: `View your transaction history with ${brand.shortName}`,
  openGraph: {
    url: `https://${brand.domains.site}/transactions`,
    title: `Transactions • ${brand.shortName}`,
    description: `View your transaction history with ${brand.shortName}`,
    images: [
      {
        url: assetUrl('/images/cover-2.webp'),
        width: 1280,
        height: 720,
        alt: `${brand.shortName}`,
      },
    ],
  },
};

export default function TransactionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
