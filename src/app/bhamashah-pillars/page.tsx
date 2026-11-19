import { notFound } from 'next/navigation';
import BhamashahPillars from '@/containers/Organisation/BhamashahPillars';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { PeopleListFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';
import { brand, t } from '@/config/tenant';

export const dynamic = 'force-dynamic';

export const generateMetadata = () =>
  contentPageMetadata('bhamashah-pillars', {
    title: `${brand.shortName} ${t('pages.honourRoll')} • ${brand.tagline}`,
    description: `Recognize the supporters and contributors behind ${brand.shortName} educational and alumni community initiatives.`,
  });

export default async function BhamashahPillarsPage() {
  const page = await getContentPage<PeopleListFields>('bhamashah-pillars');
  if (!page) notFound();
  return (
    <LayoutModule disableCover title={`${brand.shortName} ${t('pages.honourRoll')} • ${brand.tagline}`}>
      <BhamashahPillars fields={page.fields} />
    </LayoutModule>
  );
}
