import About from '@/containers/About';
import Organizations from '@/containers/Organisation';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const ExecutiveCommitteePage: NextPage = () => (
  <>
    <NextSeo
      title="Executive Committee • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule
      disableCover
      title="Executive Committee • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <Organizations />
    </LayoutModule>
  </>
);

export default ExecutiveCommitteePage;
