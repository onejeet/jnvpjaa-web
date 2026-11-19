import { constructMetadata } from '@/config/seo.config';
import SkillUpResources from '@/containers/StudentHub/SkillUpResources';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';
import { brand, t } from '@/config/tenant';

export const metadata: Metadata = constructMetadata({
  url: '/student-hub/skillup-resources/',
  title: `SkillUp Resources • Alumni Network of ${t('school.titleName')}`,
  description: `Find skill development resources and learning opportunities shared for ${brand.institution.shortName}, ${brand.institution.city} students and alumni.`,
});

export default function SkillUpResourcesPage() {
  return (
    <LayoutModule
      disableCover
      title={`SkillUp Resources • Alumni Network of ${t('school.titleName')}`}
      containerProps={{}}
    >
      <SkillUpResources />
    </LayoutModule>
  );
}
