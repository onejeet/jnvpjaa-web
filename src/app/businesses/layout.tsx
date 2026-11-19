import { requireModule } from '@/config/features';

export default function BusinessesLayout({ children }: { children: React.ReactNode }) {
  requireModule('businesses');
  return children;
}
