import { constructMetadata } from '@/config/seo.config';
import SkillUpResources from '@/containers/StudentHub/SkillUpResources';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  url: '/student-hub/skillup-resources/',
  title: 'SkillUp Resources • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  description:
    'Find skill development resources and learning opportunities shared for JNV Paota, Jaipur students and alumni.',
});

export default function SkillUpResourcesPage() {
  return (
    <LayoutModule
      disableCover
      title="SkillUp Resources • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <SkillUpResources />
    </LayoutModule>
  );
}
