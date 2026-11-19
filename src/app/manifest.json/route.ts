import { brand, features } from '@/config/tenant';

// Served at /manifest.json (the URL installed PWAs already know), built from the tenant's brand.
export const dynamic = 'force-static';

// Purpose 'any' only: the tenant logos run to the edge, so a maskable crop would cut off their lettering.
const icon = (size: number) => ({ src: `/icons/icon-${size}.png`, sizes: `${size}x${size}`, type: 'image/png' });

// Long-press shortcuts on the installed icon, limited to modules this tenant has switched on.
const shortcuts = [
  features.events && { name: 'Events', url: '/events/' },
  { name: 'Members', url: '/members/' },
  features.jobs && { name: 'Jobs', url: '/jobs/' },
  features.blog && { name: 'Blog', url: '/blog/' },
]
  .filter(Boolean)
  .map((s) => ({ ...(s as { name: string; url: string }), icons: [icon(192)] }));

export function GET() {
  return Response.json(
    {
      name: brand.name,
      short_name: brand.shortName,
      description: brand.tagline,
      lang: 'en',
      start_url: '/',
      display: 'standalone',
      background_color: brand.theme.manifestBackground,
      theme_color: brand.theme.primary['500'],
      icons: [icon(192), icon(512)],
      shortcuts,
      scope: '/',
      id: '/',
    },
    { headers: { 'content-type': 'application/manifest+json' } }
  );
}
