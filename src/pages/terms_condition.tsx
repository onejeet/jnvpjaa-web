import About from '@/containers/About';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const TnCPage: NextPage = () => (
  <>
    <NextSeo
      title="Terms • Alumni Network of JNV Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule disableCover title="Terms • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <About />
    </LayoutModule>
  </>
);

export default TnCPage;
