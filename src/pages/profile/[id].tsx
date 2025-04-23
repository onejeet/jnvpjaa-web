import Profile from '@/containers/Profile';
import { ProfileProvider } from '@/context/ProfileContext';
import { NextPage } from 'next';

const ProfilePage: NextPage = () => (
  <ProfileProvider>
    <Profile />
  </ProfileProvider>
);

ProfilePage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default ProfilePage;
