import {
  BlogStatus,
  EventStatus,
  GetBlogDocument,
  GetBlogListDocument,
  GetBlogListQuery,
  GetBlogQuery,
  GetEventListDocument,
  GetEventListQuery,
} from '@/apollo/hooks';
import { SEO_CONFIG, canonicalUrl } from '@/config/seo.config';
import { isEnabled } from '@/config/features';
import { brand } from '@/config/tenant';
import { initializeApollo } from '@/utils/apollo';

// shortcut: regex HTML→Markdown covers the editor's output (headings, lists, links, emphasis); swap for a real
// parser if posts start using tables or nested lists.
export function htmlToMarkdown(html?: string | null): string {
  if (!html) return '';
  return html
    .replace(/\r/g, '')
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(
      /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi,
      (_, l, t) => `\n\n${'#'.repeat(Math.min(Number(l) + 1, 6))} ${t}\n\n`
    )
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, '_$2_')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<blockquote[^>]*>/gi, '\n\n> ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|ul|ol|blockquote)>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const day = (iso?: string | null) => (iso ? new Date(iso).toISOString().slice(0, 10) : '');

async function loadPublicContent() {
  const client = initializeApollo();
  const [blogs, events] = await Promise.all([
    isEnabled('blog')
      ? client
          .query<GetBlogListQuery>({ query: GetBlogListDocument, variables: { options: { limit: 100 } } })
          .then((r) => (r.data.getBlogList?.data || []).filter((b) => b?.slug && b.status === BlogStatus.Published))
      : [],
    isEnabled('events')
      ? client
          .query<GetEventListQuery>({ query: GetEventListDocument, variables: { options: { limit: 100 } } })
          .then((r) => (r.data.getEventList?.data || []).filter((e) => e?.id && e.status === EventStatus.Published))
      : [],
  ]);
  return {
    blogs: blogs as NonNullable<(typeof blogs)[number]>[],
    events: events as NonNullable<(typeof events)[number]>[],
  };
}

const header = () =>
  [
    `# ${brand.legalName} (${SEO_CONFIG.siteName})`,
    '',
    `> ${SEO_CONFIG.description}`,
    '',
    `${SEO_CONFIG.siteName} is the official alumni association of ${brand.institution.name} (${brand.institution.shortName}), ${brand.institution.city}. Website: ${SEO_CONFIG.url}`,
    '',
  ].join('\n');

export async function buildLlmsTxt(): Promise<string> {
  const { blogs, events } = await loadPublicContent();
  const lines = [
    header(),
    '## Key pages',
    '',
    `- [About](${canonicalUrl('/about/')}): who we are`,
    `- [Blog](${canonicalUrl('/blog/')}): alumni stories, memories and insights`,
    `- [Events](${canonicalUrl('/events/')}): reunions, meetups and community events`,
    `- [Contact](${canonicalUrl('/contact-us/')}): ${brand.contact.email}`,
    `- [Full content for LLMs](${SEO_CONFIG.url}/llms-full.txt): every blog post and event as Markdown`,
    '',
  ];
  if (blogs.length) {
    lines.push('## Blog posts', '');
    for (const b of blogs) {
      lines.push(
        `- [${b.title}](${canonicalUrl(`/blog/${encodeURIComponent(b.slug!)}/`)})${b.summary ? `: ${b.summary.trim()}` : ''}`
      );
    }
    lines.push('');
  }
  if (events.length) {
    lines.push('## Events', '');
    for (const e of events) {
      lines.push(
        `- [${e.title}](${canonicalUrl(`/events/${e.id}/`)}) (${day(e.startDate)})${e.summary ? `: ${e.summary.trim()}` : ''}`
      );
    }
    lines.push('');
  }
  return lines.join('\n');
}

export async function buildLlmsFullTxt(): Promise<string> {
  const { blogs, events } = await loadPublicContent();
  const client = initializeApollo();
  const posts = await Promise.all(
    blogs.map((b) =>
      client
        .query<GetBlogQuery>({ query: GetBlogDocument, variables: { slug: b.slug }, errorPolicy: 'all' })
        .then((r) => r.data?.getBlog)
        .catch(() => null)
    )
  );

  const parts = [header()];
  posts.forEach((post, i) => {
    const b = post?.status === BlogStatus.Published ? post : null;
    const meta = blogs[i];
    const author =
      `${b?.author?.firstName || meta.author?.firstName || ''} ${b?.author?.lastName || meta.author?.lastName || ''}`.trim();
    parts.push(
      '---',
      '',
      `## ${meta.title}`,
      '',
      `URL: ${canonicalUrl(`/blog/${encodeURIComponent(meta.slug!)}/`)}`,
      `Published: ${day(meta.createdAt)}${author ? ` · Author: ${author}` : ''}`,
      '',
      htmlToMarkdown(b?.content) || meta.summary || '',
      ''
    );
  });
  for (const e of events) {
    parts.push(
      '---',
      '',
      `## Event: ${e.title}`,
      '',
      `URL: ${canonicalUrl(`/events/${e.id}/`)}`,
      `Date: ${day(e.startDate)}${e.endDate ? ` to ${day(e.endDate)}` : ''} · Mode: ${e.medium || 'offline'}${e.location && e.location !== 'protected' ? ` · Venue: ${e.location}` : ''}`,
      '',
      htmlToMarkdown(e.description) || e.summary || '',
      ''
    );
  }
  return parts.join('\n');
}

export const markdownResponse = (body: string) =>
  new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'x-robots-tag': 'noindex',
    },
  });
