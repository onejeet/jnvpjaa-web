import { requireModule } from '@/config/features';

export default function NewsroomLayout({ children }: { children: React.ReactNode }) {
  requireModule('newsroom');
  return children;
}
