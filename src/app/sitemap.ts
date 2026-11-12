import type { MetadataRoute } from 'next';
import { canonicalUrl } from '@/config/seo.config';

export const dynamic = 'force-dynamic';

const routes = [
  { path: '/', priority: 1 },
  { path: '/events/', priority: 0.8 },
  { path: '/blog/', priority: 0.8 },
  { path: '/about/', priority: 0.8 },
  { path: '/contact-us/', priority: 0.8 },
  { path: '/student-hub/skillup-resources/', priority: 0.6 },
  { path: '/student-hub/career-counselling/', priority: 0.6 },
  { path: '/privacy_policy/', priority: 0.8 },
  { path: '/vision/', priority: 0.8 },
  { path: '/president-message/', priority: 0.8 },
  { path: '/secretary-message/', priority: 0.8 },
  { path: '/executive-committee/', priority: 0.8 },
  { path: '/principal-message/', priority: 0.8 },
  { path: '/batch-coordinators/', priority: 0.8 },
  { path: '/bhamashah-pillars/', priority: 0.8 },
  { path: '/donations/', priority: 0.8 },
  { path: '/members/', priority: 0.8 },
  { path: '/past-presidents/', priority: 0.8 },
  { path: '/gallery/', priority: 0.8 },
  { path: '/businesses/', priority: 0.8 },
] as const;

type SitemapEntry = { path: string; lastModified: string };

async function getPublicEntries(): Promise<SitemapEntry[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://api.jnvpjaa.org/client', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: '{ publicSitemapEntries { path lastModified } }' }),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Could not load public sitemap entries');
  const result = (await response.json()) as {
    data?: { publicSitemapEntries?: SitemapEntry[] };
    errors?: unknown[];
  };
  if (result.errors?.length || !result.data?.publicSitemapEntries) {
    throw new Error('Public sitemap entries are unavailable');
  }
  return result.data.publicSitemapEntries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicEntries = await getPublicEntries();
  const staticEntries = routes.map(({ path, priority }) => ({
    url: canonicalUrl(path),
    priority,
  }));

  return [
    ...staticEntries,
    ...dynamicEntries
      .filter((entry) => /^\/(blog|events|gallery)\/[^/]+\/$/.test(entry.path))
      .map((entry) => ({
        url: canonicalUrl(entry.path),
        lastModified: entry.lastModified,
        priority: entry.path.startsWith('/blog/') ? 0.7 : 0.6,
      })),
  ];
}
