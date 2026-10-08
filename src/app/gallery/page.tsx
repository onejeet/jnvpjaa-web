import { constructMetadata } from '@/config/seo.config';
import Gallery from '@/containers/Gallery';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Photos Gallery • JNVPJAA',
  description: 'A glimpse into the memories we',
});

export default function GalleryPage() {
  return <Gallery />;
}
