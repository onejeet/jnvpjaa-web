import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/blog/new/',
  noIndex: true,
  title: `Create Blog Post • ${brand.shortName}`,
  description: `Create a new blog post for the ${brand.shortName} community`,
});

export default function NewEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
