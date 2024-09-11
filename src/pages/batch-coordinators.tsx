import BatchCoordinators from '@/containers/Organisation/BatchCoordinators';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const BatchCoordinatorsPage: NextPage = () => (
  <>
    <NextSeo
      title="Batch Coordinators • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule
      disableCover
      title="Batch Coordinators • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <BatchCoordinators />
    </LayoutModule>
  </>
);

export default BatchCoordinatorsPage;
