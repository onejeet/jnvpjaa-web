import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import LayoutModule from '@/layouts/Layout';
import ChangePassword from '@/containers/Auth/ChangePassword/ChangePassword';

const meta = {
  title: 'Change Password • Alumni Network of JNV Paota, Jaipur',
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India. Connect with fellow alumni, share experiences, and stay updated on events that honor our shared journey and the values of our beloved school.',
  url: 'https://jnvpjaa.org/forgiot-password',
};

const ChangePasswordPage: NextPage = () => (
  <LayoutModule disableCover disableFooter title={meta.title} containerProps={{}}>
    <ChangePassword />
  </LayoutModule>
);

ChangePasswordPage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default ChangePasswordPage;
