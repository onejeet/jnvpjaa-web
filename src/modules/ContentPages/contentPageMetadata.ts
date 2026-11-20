import type { Metadata } from 'next';
import { constructMetadata } from '@/config/seo.config';
import { CONTENT_PAGES, type ContentPageSlug } from './contentPages.registry';
import { getContentPage } from './getContentPage';
import { isRouterNavigation } from '@/utils/isRouterNavigation';

/** Page metadata from the stored SEO fields, falling back to the route's defaults. */
export async function contentPageMetadata(
  slug: ContentPageSlug,
  fallback: { title: string; description: string }
): Promise<Metadata> {
  const base = { url: `${CONTENT_PAGES[slug].path}/`, ...fallback };
  // Next holds in-app navigation until metadata resolves, so skip the lookup there.
  if (await isRouterNavigation()) return constructMetadata(base);
  const page = await getContentPage(slug);
  if (!page) return { title: 'Page not found', robots: { index: false, follow: false } };
  return constructMetadata({
    ...base,
    title: page.seoTitle || fallback.title,
    description: page.seoDescription || fallback.description,
  });
}
