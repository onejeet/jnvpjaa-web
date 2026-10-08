import { constructMetadata } from '@/config/seo.config';
import CareerCounselling from '@/containers/StudentHub/CareerCounselling';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Career Counselling • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
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
