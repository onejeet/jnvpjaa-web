import Vision from '@/containers/About/Vision';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const AboutPage: NextPage = () => (
  <>
    <NextSeo
      title="Vision & Mission • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule
      disableCover
      title="Vision & Mission • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <Vision />
    </LayoutModule>
  </>
);

export default AboutPage;
