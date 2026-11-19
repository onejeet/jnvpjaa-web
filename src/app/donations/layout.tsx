import { requireModule } from '@/config/features';

export default function DonationsLayout({ children }: { children: React.ReactNode }) {
  requireModule('donations');
  return children;
}
