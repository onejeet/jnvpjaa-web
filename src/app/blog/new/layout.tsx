import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Create Blog Post • JNVPJAA',
  description: 'Create a new blog post for the JNVPJAA community',
});

export default function NewEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
