import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Gallery from '@/containers/Gallery';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  url: '/gallery/',
  title: 'Photos Gallery • JNVPJAA',
  description:
    'Explore photos from JNVPJAA alumni reunions, school events and community activities at JNV Paota, Jaipur.',
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={generateSchema.collectionPage('JNVPJAA Photo Gallery', '/gallery/', metadata.description as string)}
      />
      <Gallery />
    </>
  );
}
