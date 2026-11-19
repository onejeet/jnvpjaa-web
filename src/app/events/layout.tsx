import { requireModule } from '@/config/features';

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  requireModule('events');
  return children;
}
