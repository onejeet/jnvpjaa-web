import type { Metadata } from 'next';
import { requireModule } from '@/config/features';

// Members-only: keep it out of search engines even if a link leaks.
export const metadata: Metadata = {
  title: 'Discussions', // root metadata adds the brand suffix
  robots: { index: false, follow: false },
};

export default function DiscussionsLayout({ children }: { children: React.ReactNode }) {
  requireModule('discussions');
  return children;
}
