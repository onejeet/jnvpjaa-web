import { requireModule } from '@/config/features';

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  requireModule('gallery');
  return children;
}
