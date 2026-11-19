import { constructMetadata } from '@/config/seo.config';
import CareerCounselling from '@/containers/StudentHub/CareerCounselling';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';
import { brand, t } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/student-hub/career-counselling/',
  title: `Career Counselling • Alumni Network of ${t('school.titleName')}`,
  description: `Explore career counselling and guidance for students of ${brand.institution.name} from the alumni community.`,
});

export default function CareerCounsellingPage() {
  return (
    <LayoutModule
      disableCover
      title={`Career Counselling • Alumni Network of ${t('school.titleName')}`}
      containerProps={{}}
    >
      <CareerCounselling />
    </LayoutModule>
  );
}
