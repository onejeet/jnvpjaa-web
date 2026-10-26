import { constructMetadata } from '@/config/seo.config';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Edit Event • JNVPJAA',
  description: 'Edit an existing event for the JNVPJAA community',
});

export default function EditEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
