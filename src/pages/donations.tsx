import Donations from '@/containers/Funds/Donations';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/layouts/Layout';

const DonationsPage: NextPage = () => (
  <>
    <NextSeo
      title="Donations • Alumni Network of JNV Paota, Jaipur"
      description="Your contributions help us enhance educational initiatives, provide scholarships, and organize events for Jawahar Navodaya Vidyalaya, Paota students. Join us in making a meaningful impact on our community and fostering connections among alumni. Every donation counts!"
    />
    <LayoutModule disableCover title="Donations • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
      <Donations />
    </LayoutModule>
  </>
);

export default DonationsPage;
