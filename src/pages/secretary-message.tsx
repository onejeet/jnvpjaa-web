import SecretaryMessage from '@/containers/About/SecretaryMessage';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/layouts/Layout';

const SecretaryMessagePage: NextPage = () => (
  <>
    <NextSeo
      title="Secretary's Message • Alumni Network of JNV Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule disableCover title="Secretary's Message • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <SecretaryMessage />
    </LayoutModule>
  </>
);

export default SecretaryMessagePage;
