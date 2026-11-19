import { requireModule } from '@/config/features';

export default function ExecutiveCommitteeLayout({ children }: { children: React.ReactNode }) {
  requireModule('executiveCommittee');
  return children;
}
