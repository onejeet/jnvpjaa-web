import { constructMetadata, generateSchema } from '@/config/seo.config';
import { JsonLd } from '@/components/JsonLd';
import Gallery from '@/containers/Gallery';
import { Metadata } from 'next';
import { brand } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/gallery/',
  title: `Photos Gallery • ${brand.shortName}`,
  description: `Explore photos from ${brand.shortName} alumni reunions, school events and community activities at ${brand.institution.shortName}, ${brand.institution.city}.`,
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={generateSchema.collectionPage(
          `${brand.shortName} Photo Gallery`,
          '/gallery/',
          metadata.description as string
        )}
      />
      <Gallery />
    </>
  );
}
