import SingleAlbum from '@/containers/SingleAlbum';
import { GetAlbumDocument, GetAlbumQuery } from '@/apollo/hooks';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { initializeApollo } from '@/utils/apollo';

// Generate dynamic metadata for the album page
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = await params.id;
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<GetAlbumQuery>({
      query: GetAlbumDocument,
      variables: { id },
    });

    const album = data.getAlbum;

    if (!album) return notFound();

    return {
      title: `${album.title} • JNVPJAA Gallery`,
      description: album.description || 'View photo album from JNVPJAA events and activities',
      openGraph: {
        url: `https://jnvpjaa.org/gallery/${album.id}`,
        title: `${album.title} • JNVPJAA Gallery`,
        description: album.description || 'View photo album from JNVPJAA events and activities',
        images: [
          {
            url: 'https://assets.jnvpjaa.org/gallery/milan-jan-2019-2.jpeg',
            width: 1280,
            height: 720,
            alt: 'JNVPJAA Gallery',
          },
        ],
      },
    };
  } catch (error) {
    console.error('GraphQL Error:', error);
    return {
      title: 'Album Not Found',
      description: 'The requested album could not be found.',
    };
  }
}

export default async function SingleAlbumPage({ params }: { params: { id: string } }) {
  const id = await params.id;
  return <SingleAlbum albumId={id} />;
}
