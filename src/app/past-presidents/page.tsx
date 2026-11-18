import { notFound } from 'next/navigation';
import PastPresidents from '@/containers/PastPresidents/PastPresidents';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { PeopleListFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';

export const dynamic = 'force-dynamic';

export const generateMetadata = () =>
  contentPageMetadata('past-presidents', {
    title: 'JNVPJAA Past Presidents • Alumni Network of JNV Paota, Jaipur',
    description:
      'Explore the past presidents who have served the JNVPJAA alumni association and helped strengthen its community.',
  });

export default async function PastPresidentsPage() {
  const page = await getContentPage<PeopleListFields>('past-presidents');
  if (!page) notFound();
  return (
    <LayoutModule
      disableCover
      title="JNVPJAA Past Presidents • Alumni Network of JNV Paota, Jaipur"
      containerProps={{}}
    >
      <PastPresidents fields={page.fields} />
    </LayoutModule>
  );
}
