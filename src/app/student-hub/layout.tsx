import { requireModule } from '@/config/features';

export default function StudentHubLayout({ children }: { children: React.ReactNode }) {
  requireModule('studentHub');
  return children;
}
