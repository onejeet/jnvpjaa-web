import { constructMetadata, SEO_CONFIG } from '@/config/seo.config';
import Home from '@/containers/Home/Home';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  url: '/',
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
});

export default function HomePage() {
  return (
    <LayoutModule disableCover={false} title="JNVPJAA • Alumni Network of JNV Paota, Jaipur">
      <Home />
    </LayoutModule>
  );
}
