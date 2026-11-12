import { constructMetadata, SEO_CONFIG, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
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
    <>
      <JsonLd data={generateSchema.webPage(SEO_CONFIG.title, '/', SEO_CONFIG.description)} />
      <LayoutModule disableCover={false} title="JNVPJAA • Alumni Network of JNV Paota, Jaipur">
        <Home />
      </LayoutModule>
    </>
  );
}
