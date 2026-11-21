import { buildBlogMarkdown, buildEventMarkdown, markdownResponse } from '@/utils/llms';

// Served at /blog/<slug>.md and /events/<id>.md through the middleware rewrite; the [id] page routes own those folders.
export const dynamic = 'force-dynamic';

export async function GET(_: Request, props: { params: Promise<{ kind: string; id: string }> }) {
  const { kind, id } = await props.params;
  const key = decodeURIComponent(id);
  const body =
    kind === 'blog' ? await buildBlogMarkdown(key) : kind === 'events' ? await buildEventMarkdown(key) : null;
  if (!body) return new Response('Not found\n', { status: 404, headers: { 'content-type': 'text/plain' } });
  return markdownResponse(body, 'text/markdown');
}
