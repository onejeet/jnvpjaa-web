import SkillUpResources from '@/containers/StudentHub/SkillUpResources';
import LayoutModule from '@/layouts/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SkillUp Resources • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  description: 'The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
  openGraph: {
    url: 'https://jnvpjaa.org/student-hub/skillup-resources',
    title: 'SkillUp Resources • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur',
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
