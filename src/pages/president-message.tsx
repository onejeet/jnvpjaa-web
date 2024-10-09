import PresidentMessage from '@/containers/About/PresidentMessage';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const PresidentMessagePage: NextPage = () => (
  <>
    <NextSeo
      title="President's Message • Alumni Network of JNV Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule disableCover title="President's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <PresidentMessage />
    </LayoutModule>
  </>
);

export default PresidentMessagePage;
