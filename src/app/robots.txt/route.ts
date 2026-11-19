import { brand } from '@/config/tenant';

// Plain route (not app/robots.ts) so the body stays byte-for-byte what crawlers already see (CRLF included).
export const dynamic = 'force-static';

export function GET() {
  return new Response(
    `User-agent: *\r\nDisallow: \r\nDisallow: /cgi-bin/\r\nSitemap: https://${brand.domains.site}/sitemap.xml\n`,
    {
      headers: { 'content-type': 'text/plain; charset=UTF-8' },
    }
  );
}
