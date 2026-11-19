import { requireModule } from '@/config/features';

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  requireModule('jobs');
  return children;
}
