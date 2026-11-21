import { buildLlmsTxt, markdownResponse } from '@/utils/llms';

// llms.txt (llmstxt.org): a Markdown map of the site for AI assistants and answer engines.
export const dynamic = 'force-dynamic';

export async function GET() {
  return markdownResponse(await buildLlmsTxt());
}
