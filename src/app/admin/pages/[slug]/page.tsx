import { notFound } from 'next/navigation';

import ContentPageEditor from '@/modules/ContentPages/ContentPageEditor';
import { isContentPageSlug } from '@/modules/ContentPages/contentPages.registry';

export default async function AdminPageEditorPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  if (!isContentPageSlug(params.slug)) notFound();
  return <ContentPageEditor slug={params.slug} />;
}
