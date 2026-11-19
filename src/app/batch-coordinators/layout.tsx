import { requireModule } from '@/config/features';

export default function BatchCoordinatorsLayout({ children }: { children: React.ReactNode }) {
  requireModule('batchCoordinators');
  return children;
}
