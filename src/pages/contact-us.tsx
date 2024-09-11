import ContactUs from '@/containers/ContactUs';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/components/common/Layout';

const ContactUsPage: NextPage = () => (
  <>
    <NextSeo
      title="Contact Us • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      description="The Official Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
    />
    <LayoutModule
      disableCover
      title="Contact Us • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur"
      containerProps={{}}
    >
      <ContactUs />
    </LayoutModule>
  </>
);

export default ContactUsPage;
