import { notFound } from 'next/navigation';
import BhamashahPillars from '@/containers/Organisation/BhamashahPillars';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { PeopleListFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';

export const dynamic = 'force-dynamic';

export const generateMetadata = () =>
  contentPageMetadata('bhamashah-pillars', {
    title: 'JNVPJAA Bhamashah Pillars • Alumni Network of JNV Paota, Jaipur',
    description:
      'Recognize the supporters and contributors behind JNVPJAA educational and alumni community initiatives.',
  });

export default async function BhamashahPillarsPage() {
  const page = await getContentPage<PeopleListFields>('bhamashah-pillars');
  if (!page) notFound();
  return (
    <LayoutModule disableCover title="JNVPJAA Bhamashah Pillars • Alumni Network of JNV Paota, Jaipur">
      <BhamashahPillars fields={page.fields} />
    </LayoutModule>
  );
}
