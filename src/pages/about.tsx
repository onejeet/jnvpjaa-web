import About from '@/containers/About';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const AboutPage: NextPage = () => (
  <>
    <NextSeo
      title="About JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule
      disableCover
      title="About JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <About />
    </LayoutModule>
  </>
);

export default AboutPage;
