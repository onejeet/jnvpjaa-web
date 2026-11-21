import {
  BlogStatus,
  EventStatus,
  GetBlogDocument,
  GetBlogListDocument,
  GetBlogListQuery,
  GetBlogQuery,
  GetEventDetailsDocument,
  GetEventDetailsQuery,
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
        `- [${b.title}](${canonicalUrl(`/blog/${encodeURIComponent(b.slug!)}/`)}) ([Markdown](${blogMarkdownUrl(b.slug!)}))${b.summary ? `: ${b.summary.trim()}` : ''}`
      );
    }
    lines.push('');
  }
  if (events.length) {
    lines.push('## Events', '');
    for (const e of events) {
      lines.push(
        `- [${e.title}](${canonicalUrl(`/events/${e.id}/`)}) (${day(e.startDate)}, [Markdown](${eventMarkdownUrl(e.id)}))${e.summary ? `: ${e.summary.trim()}` : ''}`
      );
    }
    lines.push('');
  }
  return lines.join('\n');
}

type BlogMeta = {
  slug?: string | null;
  title: string;
  summary?: string | null;
  createdAt?: string | null;
  author?: { firstName?: string | null; lastName?: string | null } | null;
};
type EventMeta = {
  id: number;
  title: string;
  summary?: string | null;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  medium?: string | null;
  location?: string | null;
};

export const blogMarkdownUrl = (slug: string) => `${SEO_CONFIG.url}/blog/${encodeURIComponent(slug)}.md`;
export const eventMarkdownUrl = (id: number | string) => `${SEO_CONFIG.url}/events/${id}.md`;

async function fetchPublishedBlog(slug: string) {
  const { data } = await initializeApollo()
    .query<GetBlogQuery>({ query: GetBlogDocument, variables: { slug }, errorPolicy: 'all' })
    .catch(() => ({ data: undefined }));
  return data?.getBlog?.status === BlogStatus.Published ? data.getBlog : null;
}

function blogSection(meta: BlogMeta, content: string | null | undefined, level: '#' | '##') {
  const author = `${meta.author?.firstName || ''} ${meta.author?.lastName || ''}`.trim();
  return [
    `${level} ${meta.title}`,
    '',
    `URL: ${canonicalUrl(`/blog/${encodeURIComponent(meta.slug!)}/`)}`,
    `Published: ${day(meta.createdAt)}${author ? ` · Author: ${author}` : ''} · Publisher: ${brand.legalName}`,
    '',
    ...(meta.summary ? [`> ${meta.summary.trim()}`, ''] : []),
    htmlToMarkdown(content) || '',
    '',
  ].join('\n');
}

function eventSection(e: EventMeta, level: '#' | '##') {
  return [
    `${level} ${level === '##' ? 'Event: ' : ''}${e.title}`,
    '',
    `URL: ${canonicalUrl(`/events/${e.id}/`)}`,
    `Date: ${day(e.startDate)}${e.endDate ? ` to ${day(e.endDate)}` : ''} · Mode: ${e.medium || 'offline'}${e.location && e.location !== 'protected' ? ` · Venue: ${e.location}` : ''} · Organizer: ${brand.legalName}`,
    '',
    htmlToMarkdown(e.description) || e.summary || '',
    '',
  ].join('\n');
}

/** Markdown twin of /blog/<slug>/, or null when the post is missing or unpublished. */
export async function buildBlogMarkdown(slug: string): Promise<string | null> {
  if (!isEnabled('blog')) return null;
  const blog = await fetchPublishedBlog(slug);
  return blog ? blogSection(blog as BlogMeta, blog.content, '#') : null;
}

/** Markdown twin of /events/<id>/, or null when the event is missing or unpublished. */
export async function buildEventMarkdown(id: string): Promise<string | null> {
  const numericId = Number(id);
  if (!isEnabled('events') || !Number.isSafeInteger(numericId) || numericId <= 0) return null;
  const { data } = await initializeApollo()
    .query<GetEventDetailsQuery>({ query: GetEventDetailsDocument, variables: { id: numericId }, errorPolicy: 'all' })
    .catch(() => ({ data: undefined }));
  const event = data?.getEventDetails;
  return event?.status === EventStatus.Published ? eventSection(event as EventMeta, '#') : null;
}

export async function buildLlmsFullTxt(): Promise<string> {
  const { blogs, events } = await loadPublicContent();
  const posts = await Promise.all(blogs.map((b) => fetchPublishedBlog(b.slug!)));
  const parts = [header()];
  blogs.forEach((meta, i) => parts.push('---', '', blogSection(meta as BlogMeta, posts[i]?.content, '##')));
  for (const e of events) parts.push('---', '', eventSection(e as EventMeta, '##'));
  return parts.join('\n');
}

export const markdownResponse = (body: string, contentType = 'text/plain') =>
  new Response(body, {
    headers: {
      'content-type': `${contentType}; charset=utf-8`,
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'x-robots-tag': 'noindex',
    },
  });
