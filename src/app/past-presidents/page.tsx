import { notFound } from 'next/navigation';
import PastPresidents from '@/containers/PastPresidents/PastPresidents';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { PeopleListFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

export const generateMetadata = () =>
  contentPageMetadata('past-presidents', {
    title: `${brand.shortName} Past Presidents • ${brand.tagline}`,
    description: `Explore the past presidents who have served the ${brand.shortName} alumni association and helped strengthen its community.`,
  });

export default async function PastPresidentsPage() {
  const page = await getContentPage<PeopleListFields>('past-presidents');
  if (!page) notFound();
  return (
    <LayoutModule disableCover title={`${brand.shortName} Past Presidents • ${brand.tagline}`} containerProps={{}}>
      <PastPresidents fields={page.fields} />
    </LayoutModule>
  );
}
