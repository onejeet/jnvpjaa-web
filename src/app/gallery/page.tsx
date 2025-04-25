import Gallery from '@/containers/Gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photos Gallery • JNVPJAA',
  description:
    "A glimpse into the memories we've made together: reunions, celebrations, and candid moments from our alumni community. A classic photo collection for all our events, meetups and achievements.",
  openGraph: {
    url: 'https://jnvpjaa.org/gallery',
    title: 'Photos Gallery • JNVPJAA',
    description:
      "A glimpse into the memories we've made together: reunions, celebrations, and candid moments from our alumni community. A classic photo collection for all our events, meetups and achievements.",
    images: [
      {
        url: 'https://assets.jnvpjaa.org/gallery/milan-jan-2019-2.jpeg',
        width: 1280,
        height: 720,
        alt: 'Photos Gallery',
      },
    ],
  },
};

export default function GalleryPage() {
  return <Gallery />;
}
