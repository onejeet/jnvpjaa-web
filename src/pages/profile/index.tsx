import Profile from '@/containers/Profile';
import { NextPage } from 'next';

const ProfilePage: NextPage = () => <Profile />;

ProfilePage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default ProfilePage;
