import PrincipalMessage from '@/containers/About/PrincipalMessage';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const PrincipalMessagePage: NextPage = () => (
  <>
    <NextSeo
      title="Principal's Message • Alumni Network of JNV Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule disableCover title="Principal's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <PrincipalMessage />
    </LayoutModule>
  </>
);

export default PrincipalMessagePage;
