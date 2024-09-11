import BhamashahPillars from '@/containers/Organisation/BhamashahPillars';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const AboutPage: NextPage = () => (
  <>
    <NextSeo
      title="JNVPJAA Bhamashah Pillars • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule
      disableCover
      title="JNVPJAA Bhamashah Pillars • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <BhamashahPillars />
    </LayoutModule>
  </>
);

export default AboutPage;
