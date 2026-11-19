import { NEWS_POSTS, type NewsListResult } from '@/apollo/newsroomOperations';
import { SEO_CONFIG, canonicalUrl } from '@/config/seo.config';
import { NEWS_CATEGORY_LABELS, NO_STORE } from '@/modules/Newsroom/newsroom.utils';
import { initializeApollo } from '@/utils/apollo';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!);

export async function GET() {
  const { data } = await initializeApollo().query<NewsListResult>({
    query: NEWS_POSTS,
    variables: { limit: 20 },
    fetchPolicy: 'no-cache',
    context: NO_STORE,
  });
  const items = (data?.newsPosts?.data || [])
    .map((post) => {
      const link = canonicalUrl(`/newsroom/${encodeURIComponent(post.slug)}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(post.publishedAt || post.updatedAt).toUTCString()}</pubDate>
      <category>${escapeXml(NEWS_CATEGORY_LABELS[post.category])}</category>
      <description>${escapeXml(post.summary)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${brand.shortName} Newsroom</title>
    <link>${canonicalUrl('/newsroom/')}</link>
    <atom:link href="${SEO_CONFIG.url}/newsroom/feed.xml" rel="self" type="application/rss+xml" />
    <description>Official news from the ${brand.legalName}.</description>
    <language>en-IN</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
}
