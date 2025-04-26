import Blog from '@/containers/Blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog • Alumni Network of JNV Paota, Jaipur',
  description:
    'Inspiring stories, memorable experiences, poetries, opinions and valuable insights from our alumni community of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    title: 'Blog • Alumni Network of JNV Paota, Jaipur',
    description:
      'Inspiring stories, memorable experiences, poetries, opinions and valuable insights from our alumni community of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
    url: 'https://jnvpjaa.org',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1638540272551-3f250ebf1b70',
        width: 1280,
        height: 720,
        alt: 'JNVPJAA',
      },
    ],
  },
};

export default function BlogPage() {
  return <Blog />;
}
