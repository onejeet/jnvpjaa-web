import { DeferOnNavigation } from '@/components/DeferOnNavigation';
import PageSkeleton from '@/components/common/PageSkeleton';
import { notFound } from 'next/navigation';
import MessagePage from '@/containers/About/MessagePage';
import LayoutModule from '@/layouts/Layout';
import { contentPageMetadata } from '@/modules/ContentPages/contentPageMetadata';
import type { MessageFields } from '@/modules/ContentPages/contentPages.schema';
import { getContentPage } from '@/modules/ContentPages/getContentPage';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

export const generateMetadata = () =>
  contentPageMetadata('president-message', {
    title: `President's Message • ${brand.shortName}`,
    description: `Read the ${brand.shortName} president’s message to alumni of ${brand.institution.name}.`,
  });

async function PresidentMessageContent() {
  const page = await getContentPage<MessageFields>('president-message');
  if (!page) notFound();
  return (
    <LayoutModule disableCover title={`President's Message • ${brand.tagline}`} containerProps={{}}>
      <MessagePage fields={page.fields} crumb="Message from president" />
    </LayoutModule>
  );
}

export default function PresidentMessagePage() {
  return (
    <DeferOnNavigation
      fallback={
        <LayoutModule disableCover containerProps={{}}>
          <PageSkeleton media />
        </LayoutModule>
      }
    >
      <PresidentMessageContent />
    </DeferOnNavigation>
  );
}
