import { notFound } from 'next/navigation';
import MessagePage from '@/containers/About/MessagePage';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { MessageFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

export const generateMetadata = () =>
  contentPageMetadata('secretary-message', {
    title: `Secretary's Message • ${brand.shortName}`,
    description: `Read the ${brand.shortName} secretary’s message about alumni connections and association activities.`,
  });

export default async function SecretaryMessagePage() {
  const page = await getContentPage<MessageFields>('secretary-message');
  if (!page) notFound();
  return (
    <LayoutModule disableCover title={`Secretary's Message • ${brand.tagline}`} containerProps={{}}>
      <MessagePage fields={page.fields} crumb="Message from secretary" />
    </LayoutModule>
  );
}
