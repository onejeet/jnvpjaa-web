import { brand } from '@/config/tenant';

// Served at /manifest.json (the URL installed PWAs already know), built from the tenant's brand.
export const dynamic = 'force-static';

const icon = (size: number, purpose: 'any' | 'maskable') => ({
  src: `/icons/icon-${size}.png`,
  sizes: `${size}x${size}`,
  type: 'image/png',
  purpose,
});

export function GET() {
  return Response.json(
    {
      name: brand.name,
      short_name: brand.shortName,
      description: brand.tagline,
      start_url: '/',
      display: 'standalone',
      background_color: brand.theme.manifestBackground,
      theme_color: brand.theme.primary['500'],
      icons: [icon(192, 'any'), icon(192, 'maskable'), icon(512, 'any'), icon(512, 'maskable')],
      scope: '/',
      id: '/',
    },
    { headers: { 'content-type': 'application/manifest+json' } }
  );
}
