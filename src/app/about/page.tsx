import { DeferOnNavigation } from '@/components/DeferOnNavigation';
import PageSkeleton from '@/components/common/PageSkeleton';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { generateSchema } from '@/config/seo.config';
import About from '@/containers/About';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { TextFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';
import { brand, t } from '@/config/tenant';

export const dynamic = 'force-dynamic';

const FALLBACK = {
  title: `About ${brand.shortName} • ${brand.tagline}`,
  description: `${t('seo.portalDescription')}`,
};

export const generateMetadata = () => contentPageMetadata('about', FALLBACK);

async function AboutContent() {
  const page = await getContentPage<TextFields>('about');
  if (!page) notFound();
  return (
    <>
      <JsonLd
        data={generateSchema.webPage(
          `About ${brand.shortName}`,
          '/about/',
          page.seoDescription || FALLBACK.description,
          'AboutPage'
        )}
      />
      <LayoutModule disableCover title={`About ${brand.shortName} • ${brand.tagline}`} containerProps={{}}>
        <About fields={page.fields} />
      </LayoutModule>
    </>
  );
}

export default function AboutPage() {
  return (
    <DeferOnNavigation
      fallback={
        <LayoutModule disableCover containerProps={{}}>
          <PageSkeleton />
        </LayoutModule>
      }
    >
      <AboutContent />
    </DeferOnNavigation>
  );
}
