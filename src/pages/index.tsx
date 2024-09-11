import Home from '@/containers/Home/Home';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const HomePage: NextPage = () => (
  <>
    <NextSeo
      title="JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />

    <LayoutModule title="JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur">
      <Home />
    </LayoutModule>
  </>
);

export default HomePage;
