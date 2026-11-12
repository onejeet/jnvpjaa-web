import { GetAlbumDocument, GetAlbumQuery } from '@/apollo/hooks';
import { JsonLd } from '@/components/JsonLd';
import SingleAlbum from '@/containers/SingleAlbum';
import { SEO_CONFIG, canonicalUrl, generateSchema } from '@/config/seo.config';
import { initializeApollo } from '@/utils/apollo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

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

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const album = await getPublicAlbum(params.id);
  if (!album) return { title: 'Album not found', robots: { index: false, follow: false } };

  const title = `${album.title} | JNVPJAA Gallery`;
  const description = album.description || `Photos from ${album.title}, shared by the JNVPJAA alumni community.`;
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

export default async function SingleAlbumPage({ params }: { params: { id: string } }) {
  const album = await getPublicAlbum(params.id);
  if (!album) notFound();
  const albumTitle = album.title || 'Photo album';

  return (
    <>
      <JsonLd
        data={generateSchema.collectionPage(
          albumTitle,
          `/gallery/${album.id}/`,
          album.description || `Photos from ${albumTitle}, shared by the JNVPJAA alumni community.`
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
