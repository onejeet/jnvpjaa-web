import CareerCounselling from '@/containers/StudentHub/CareerCounselling';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Counselling • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/student-hub/career-counselling',
    title: 'Career Counselling • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
    description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
    images: [
      {
        url: 'https://assets.jnvpjaa.org/images/cover-2.webp',
        width: 1280,
        height: 720,
        alt: 'JNVPJAA',
      },
    ],
  },
};

export default function CareerCounsellingPage() {
  return (
    <LayoutModule
      disableCover
      title="Career Counselling • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <CareerCounselling />
    </LayoutModule>
  );
}
