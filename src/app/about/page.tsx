import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { generateSchema } from '@/config/seo.config';
import About from '@/containers/About';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { TextFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';

export const dynamic = 'force-dynamic';

const FALLBACK = {
  title: 'About JNVPJAA • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
};

export const generateMetadata = () => contentPageMetadata('about', FALLBACK);

export default async function AboutPage() {
  const page = await getContentPage<TextFields>('about');
  if (!page) notFound();
  return (
    <>
      <JsonLd
        data={generateSchema.webPage(
          'About JNVPJAA',
          '/about/',
          page.seoDescription || FALLBACK.description,
          'AboutPage'
        )}
      />
      <LayoutModule disableCover title="About JNVPJAA • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
        <About fields={page.fields} />
      </LayoutModule>
    </>
  );
}
