import { buildLlmsFullTxt, markdownResponse } from '@/utils/llms';

// Every public blog post and event as Markdown, so AI crawlers get the text without rendering the app.
export const dynamic = 'force-dynamic';

export async function GET() {
  return markdownResponse(await buildLlmsFullTxt());
}
