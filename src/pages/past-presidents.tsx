import PastPresidents from '@/containers/PastPresidents/PastPresidents';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const PastPresidentsPage: NextPage = () => (
  <>
    <NextSeo
      title="JNVPJAA Past Presidents • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule
      disableCover
      title="JNVPJAA Past Presidents • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <PastPresidents />
    </LayoutModule>
  </>
);

export default PastPresidentsPage;
