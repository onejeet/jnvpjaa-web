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
  const address = `${brand.domains.site}${publicProfilePath(profile.username).replace(/\/$/, '')}`;
  const subtitle = [
    profile.isFaculty ? `Faculty, ${brand.institution.shortName}` : profile.batch ? `Batch of ${profile.batch}` : null,
    profile.headline,
  ]
    .filter(Boolean)
    .join('  ·  ');
  const photo = 340;

  return new ImageResponse(
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
          {profile.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img only
            <img
              src={profile.profileImage}
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
          src={`${origin}${verifiedStampPath(profile.isFaculty)}`}
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
      // Short CDN life: a member who hides their page should drop out of previews quickly.
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
    }
  );
}
