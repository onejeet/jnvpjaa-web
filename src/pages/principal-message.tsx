import PrincipalMessage from '@/containers/About/PrincipalMessage';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const PrincipalMessagePage: NextPage = () => (
  <>
    <NextSeo
      title="Secretary's Message • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule
      disableCover
      title="Secretary's Message • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <PrincipalMessage />
    </LayoutModule>
  </>
);

export default PrincipalMessagePage;
