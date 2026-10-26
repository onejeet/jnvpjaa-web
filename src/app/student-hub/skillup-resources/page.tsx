import { constructMetadata } from '@/config/seo.config';
import SkillUpResources from '@/containers/StudentHub/SkillUpResources';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'SkillUp Resources • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
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
