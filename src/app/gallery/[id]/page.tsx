import { isRouterNavigation } from '@/utils/isRouterNavigation';
import { DocumentTitle } from '@/components/DocumentTitle';
import { DeferOnNavigation } from '@/components/DeferOnNavigation';
import PageSkeleton from '@/components/common/PageSkeleton';
import LayoutModule from '@/layouts/Layout';
import { GetAlbumDocument, GetAlbumQuery } from '@/apollo/hooks';
import { JsonLd } from '@/components/JsonLd';
import SingleAlbum from '@/containers/SingleAlbum';
import { SEO_CONFIG, canonicalUrl, generateSchema } from '@/config/seo.config';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { brand } from '@/config/tenant';

export const dynamic = 'force-dynamic';

const getPublicAlbum = cache(async (id: string) => {
  const { data, errors } = await initializeApollo().query<GetAlbumQuery>({
    query: GetAlbumDocument,
    variables: { id },
    errorPolicy: 'all',
  });
  if (errors?.length) throw new Error('Could not load photo album');
  const album = data?.getAlbum;
  return album?.total_photos ? album : null;
});

const albumPageTitle = (title?: string | null) => `${title || 'Photo album'} | ${brand.shortName} Gallery`;

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // Next holds in-app navigation until metadata resolves; the page sets the real title when the album arrives.
  if (await isRouterNavigation()) return { title: 'Gallery' };
  const params = await props.params;
  const album = await getPublicAlbum(params.id);
  if (!album) return { title: 'Album not found', robots: { index: false, follow: false } };

  const title = albumPageTitle(album.title);
  const description =
    album.description || `Photos from ${album.title}, shared by the ${brand.shortName} alumni community.`;
  const url = canonicalUrl(`/gallery/${album.id}`);
  const image = album.coverImage || SEO_CONFIG.defaultImage;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      title,
      description,
      images: [{ url: image, alt: album.title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

async function SingleAlbumContent(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const album = await getPublicAlbum(params.id);
  if (!album) notFound();
  const albumTitle = album.title || 'Photo album';

  return (
    <>
      <DocumentTitle title={albumPageTitle(album.title)} />
      <JsonLd
        data={generateSchema.collectionPage(
          albumTitle,
          `/gallery/${album.id}/`,
          album.description || `Photos from ${albumTitle}, shared by the ${brand.shortName} alumni community.`
        )}
      />
      <JsonLd
        data={generateSchema.breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery/' },
          { name: albumTitle, url: `/gallery/${album.id}/` },
        ])}
      />
      <SingleAlbum albumId={album.id} />
    </>
  );
}

export default function SingleAlbumPage(props: { params: Promise<{ id: string }> }) {
  return (
    <DeferOnNavigation
      fallback={
        <LayoutModule disableCover>
          <PageSkeleton variant="grid" />
        </LayoutModule>
      }
    >
      <SingleAlbumContent {...props} />
    </DeferOnNavigation>
  );
}
