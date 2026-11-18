import { notFound } from 'next/navigation';

import ContentPageEditor from '@/modules/ContentPages/ContentPageEditor';
import { isContentPageSlug } from '@/modules/ContentPages/contentPages.registry';

export default function AdminPageEditorPage({ params }: { params: { slug: string } }) {
  if (!isContentPageSlug(params.slug)) notFound();
  return <ContentPageEditor slug={params.slug} />;
}
