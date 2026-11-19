import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { generateSchema } from '@/config/seo.config';
import TextPage from '@/containers/About/TextPage';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { TextFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

const FALLBACK = {
  title: `Vision & Mission • ${brand.tagline}`,
  description: `Learn about the ${brand.shortName} vision and mission for connecting ${brand.institution.shortName} alumni and supporting students and the school community.`,
};

export const generateMetadata = () => contentPageMetadata('vision', FALLBACK);

export default async function VisionPage() {
  const page = await getContentPage<TextFields>('vision');
  if (!page) notFound();
  return (
    <>
      <JsonLd
        data={generateSchema.webPage(
          `${brand.shortName} Vision and Mission`,
          '/vision/',
          page.seoDescription || FALLBACK.description
        )}
      />
      <LayoutModule disableCover title={`Vision & Mission • ${brand.tagline}`} containerProps={{}}>
        <TextPage fields={page.fields} crumb="Vision & Mission" />
      </LayoutModule>
    </>
  );
}
