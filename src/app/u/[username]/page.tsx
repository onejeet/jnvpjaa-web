import { createHash } from 'node:crypto';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';
import { PUBLIC_PROFILE, publicProfilePath, type PublicProfile } from '@/apollo/publicProfileOperations';
import { SEO_CONFIG, canonicalUrl } from '@/config/seo.config';
import { brand } from '@/config/tenant';
import PublicProfileView from '@/containers/PublicProfile/PublicProfile';
import LayoutModule from '@/layouts/Layout';
import { initializeApollo } from '@/utils/apollo';
import { verifiedStampPath } from '@/utils/verifiedStamp';

export const dynamic = 'force-dynamic';

type Lookup = { profile: PublicProfile | null; movedTo: string | null };

// One request per render: metadata and the page share it.
const getProfile = cache(async (username: string): Promise<Lookup> => {
  const { data, errors } = await initializeApollo().query<{ publicProfile: Lookup }>({
    query: PUBLIC_PROFILE,
    variables: { username },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    context: { fetchOptions: { cache: 'no-store' } },
  });
  // A failure must reach error.tsx, never look like "no such member".
  if (errors?.length || !data?.publicProfile) throw new Error('Could not load the profile');
  return data.publicProfile;
});

const handleFrom = async (params: Promise<{ username: string }>) =>
  decodeURIComponent((await params).username)
    .replace(/^@/, '')
    .toLowerCase();

/** The share card's URL. The version changes with what the card draws, so link previews refresh after an edit. */
const shareImageUrl = (profile: PublicProfile) => {
  const drawn = [profile.name, profile.profileImage, profile.batch, profile.isFaculty, profile.headline];
  const version = createHash('sha256')
    .update(JSON.stringify([...drawn, verifiedStampPath(profile.isFaculty)]))
    .digest('hex')
    .slice(0, 10);
  // Not canonicalUrl(): that appends a slash and drops the query.
  return new URL(`/og/profile/${encodeURIComponent(profile.username)}.png?v=${version}`, SEO_CONFIG.url).href;
};

const describe = (profile: PublicProfile) =>
  [
    profile.isFaculty ? `Faculty, ${brand.institution.name}` : profile.batch ? `Batch of ${profile.batch}` : null,
    profile.headline,
    `Verified member of ${brand.legalName}.`,
  ]
    .filter(Boolean)
    .join(' · ');

export async function generateMetadata(props: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const username = await handleFrom(props.params);
  const lookup = await getProfile(username).catch(() => null);
  const robots = { index: false, follow: false };
  if (!lookup?.profile) return { title: { absolute: `Profile not found • ${brand.shortName}` }, robots };

  const { profile } = lookup;
  const url = canonicalUrl(publicProfilePath(profile.username));
  const title = `${profile.name} (@${profile.username}) • ${brand.shortName}`;
  const description = describe(profile);
  // Only fields the member made public reach the preview: never email, phone, birthday or address.
  const image = {
    url: shareImageUrl(profile),
    width: 1200,
    height: 630,
    alt: `${profile.name}, verified ${profile.isFaculty ? 'faculty' : 'alumni'} of ${brand.legalName}`,
    type: 'image/png',
  };
  const [firstName, ...rest] = profile.name.split(/\s+/);
  return {
    title: { absolute: title },
    description,
    // Shareable by link, but kept out of search engines: members never asked to be indexed.
    robots,
    alternates: { canonical: url },
    openGraph: {
      type: 'profile',
      url,
      siteName: SEO_CONFIG.siteName,
      title,
      description,
      username: profile.username,
      firstName,
      lastName: rest.join(' ') || undefined,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function PublicProfilePage(props: { params: Promise<{ username: string }> }) {
  const username = await handleFrom(props.params);
  const { profile, movedTo } = await getProfile(username);
  if (movedTo) redirect(publicProfilePath(movedTo));
  if (!profile) notFound();
  return (
    <LayoutModule disableCover>
      <PublicProfileView profile={profile} />
    </LayoutModule>
  );
}
