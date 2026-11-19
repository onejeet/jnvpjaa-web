import { requireModule } from '@/config/features';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  requireModule('blog');
  return children;
}
