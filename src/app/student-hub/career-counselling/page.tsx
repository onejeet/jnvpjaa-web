import { constructMetadata } from '@/config/seo.config';
import CareerCounselling from '@/containers/StudentHub/CareerCounselling';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  url: '/student-hub/career-counselling/',
  title: 'Career Counselling • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  description:
    'Explore career counselling and guidance for students of Jawahar Navodaya Vidyalaya Paota, Jaipur from the alumni community.',
});

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
