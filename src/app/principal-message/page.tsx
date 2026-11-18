import { notFound } from 'next/navigation';
import MessagePage from '@/containers/About/MessagePage';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { MessageFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';

export const dynamic = 'force-dynamic';

export const generateMetadata = () =>
  contentPageMetadata('principal-message', {
    title: "Principal's Message • JNVPJAA",
    description: 'Read the principal’s message for the JNV Paota, Jaipur alumni community.',
  });

export default async function PrincipalMessagePage() {
  const page = await getContentPage<MessageFields>('principal-message');
  if (!page) notFound();
  return (
    <LayoutModule disableCover title="Principal's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <MessagePage fields={page.fields} crumb="Message from principal" />
    </LayoutModule>
  );
}
