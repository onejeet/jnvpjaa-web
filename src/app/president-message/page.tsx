import { notFound } from 'next/navigation';
import MessagePage from '@/containers/About/MessagePage';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { MessageFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';

export const dynamic = 'force-dynamic';

export const generateMetadata = () =>
  contentPageMetadata('president-message', {
    title: "President's Message • JNVPJAA",
    description: 'Read the JNVPJAA president’s message to alumni of Jawahar Navodaya Vidyalaya Paota, Jaipur.',
  });

export default async function PresidentMessagePage() {
  const page = await getContentPage<MessageFields>('president-message');
  if (!page) notFound();
  return (
    <LayoutModule disableCover title="President's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <MessagePage fields={page.fields} crumb="Message from president" />
    </LayoutModule>
  );
}
