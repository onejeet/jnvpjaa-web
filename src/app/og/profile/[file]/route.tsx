import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { PUBLIC_PROFILE, type PublicProfile } from '@/apollo/publicProfileOperations';
import { brand } from '@/config/tenant';
import { initializeApollo } from '@/utils/apollo';
import { publicProfilePath } from '@/utils/publicProfilePath';
import { verifiedStampPath } from '@/utils/verifiedStamp';

export const dynamic = 'force-dynamic';

const WIDTH = 1200;
const HEIGHT = 630;
const primary = brand.theme.primary;
// next/og only bundles a regular weight, so ship the static weights we draw with.
const fonts = Promise.all(
  (['Medium', 'Bold'] as const).map(async (weight) => ({
    name: 'DM Sans',
    data: await readFile(join(process.cwd(), 'src/app/og/fonts', `DMSans-${weight}.ttf`)),
    weight: weight === 'Bold' ? (700 as const) : (500 as const),
    style: 'normal' as const,
  }))
);

// Small in-process caches: a warm instance skips the photo download and the render entirely.
const remember = <T,>(cache: Map<string, T>, key: string, value: T, max = 200) => {
  if (cache.size >= max) cache.delete(cache.keys().next().value as string);
  cache.set(key, value);
  return value;
};
const cards = new Map<string, ArrayBuffer>();
const photos = new Map<string, Promise<string>>();
const stamps = new Map<string, Promise<string>>();

const dataUri = async (response: Response) =>
  `data:${response.headers.get('content-type')};base64,${Buffer.from(await response.arrayBuffer()).toString('base64')}`;

/** The photo at card size via Next's image optimizer (resized and cached there), not the multi-MB original. */
const photoSrc = (origin: string, url: string) =>
  photos.get(url) ||
  remember(
    photos,
    url,
    fetch(`${origin}/_next/image/?url=${encodeURIComponent(url)}&w=384&q=80`, {
      // satori reads JPEG and PNG, not WebP/AVIF.
      headers: { Accept: 'image/jpeg,image/png' },
      signal: AbortSignal.timeout(4000),
    })
      .then((response) =>
        response.ok && /image\/(jpeg|png)/.test(response.headers.get('content-type') || '') ? dataUri(response) : url
      )
      .catch(() => {
        photos.delete(url);
        return url;
      })
  );

const stampSrc = (origin: string, faculty: boolean) => {
  const path = verifiedStampPath(faculty);
  return (
    stamps.get(path) ||
    remember(
      stamps,
      path,
      readFile(join(process.cwd(), 'public', path.split('?')[0]))
        .then((file) => `data:image/png;base64,${file.toString('base64')}`)
        .catch(() => `${origin}${path}`)
    )
  );
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

// The share card for /@username: photo, verification stamp and the profile address.
export async function GET(request: Request, props: { params: Promise<{ file: string }> }) {
  const username = decodeURIComponent((await props.params).file)
    .replace(/\.png$/i, '')
    .toLowerCase();
  const { data } = await initializeApollo().query<{ publicProfile: { profile: PublicProfile | null } }>({
    query: PUBLIC_PROFILE,
    variables: { username },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    context: { fetchOptions: { cache: 'no-store' } },
  });
  const profile = data?.publicProfile?.profile;
  // Hidden, missing or switched-off profiles have no card either, so it never outlives the page.
  if (!profile) return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });

  const origin = new URL(request.url).origin;
  const key = createHash('sha256')
    .update(
      JSON.stringify([
        profile.username,
        profile.name,
        profile.profileImage,
        profile.batch,
        profile.isFaculty,
        profile.headline,
        verifiedStampPath(profile.isFaculty),
      ])
    )
    .digest('hex');
  const headers = {
    'Content-Type': 'image/png',
    // Short CDN life: a member who hides their page should drop out of previews quickly.
    'Cache-Control': 'public, max-age=300, s-maxage=300',
  };
  const cached = cards.get(key);
  if (cached) return new Response(cached, { headers });
  const [photoUrl, stampUrl] = await Promise.all([
    profile.profileImage ? photoSrc(origin, profile.profileImage) : null,
    stampSrc(origin, profile.isFaculty),
  ]);
  const address = `${brand.domains.site}${publicProfilePath(profile.username).replace(/\/$/, '')}`;
  const subtitle = [
    profile.isFaculty ? `Faculty, ${brand.institution.shortName}` : profile.batch ? `Batch of ${profile.batch}` : null,
    profile.headline,
  ]
    .filter(Boolean)
    .join('  ·  ');
  const photo = 340;

  const image = new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 84px',
        background: `linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 55%, ${primary[50]} 100%)`,
        borderTop: `14px solid ${primary[500]}`,
        fontFamily: 'DM Sans',
        fontWeight: 500,
      }}
    >
      <div style={{ position: 'relative', display: 'flex', width: photo + 40, height: photo + 40, flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: photo,
            height: photo,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '10px solid #FFFFFF',
            boxShadow: '0 24px 48px -20px rgba(0,0,0,0.45)',
            background: primary[300],
            color: '#FFFFFF',
            fontSize: 120,
          }}
        >
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img only
            <img
              src={photoUrl}
              alt=""
              width={photo}
              height={photo}
              style={{ width: photo, height: photo, objectFit: 'cover' }}
            />
          ) : (
            initials(profile.name)
          )}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img only */}
        <img
          src={stampUrl}
          alt=""
          width={196}
          height={196}
          style={{ position: 'absolute', right: -34, bottom: -22, width: 196, height: 196 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 72, flex: 1, minWidth: 0 }}>
        <div
          style={{ fontSize: 22, fontWeight: 700, letterSpacing: 3, color: primary[600], textTransform: 'uppercase' }}
        >
          {brand.legalName}
        </div>
        <div
          style={{
            fontSize: profile.name.length > 22 ? 58 : 72,
            color: '#15171A',
            fontWeight: 700,
            marginTop: 18,
            lineHeight: 1.08,
            letterSpacing: -1,
          }}
        >
          {profile.name}
        </div>
        {subtitle && (
          <div style={{ fontSize: 30, color: '#5B6168', marginTop: 16, lineHeight: 1.3 }}>
            {subtitle.length > 80 ? `${subtitle.slice(0, 79)}…` : subtitle}
          </div>
        )}
        <div style={{ display: 'flex', marginTop: 44 }}>
          <div
            style={{
              display: 'flex',
              padding: '14px 28px',
              borderRadius: 999,
              background: primary[500],
              color: '#FFFFFF',
              fontSize: 30,
            }}
          >
            {address}
          </div>
        </div>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: await fonts,
    }
  );
  const png = remember(cards, key, await image.arrayBuffer(), 100);
  return new Response(png, { headers });
}
