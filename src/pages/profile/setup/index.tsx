import ProfileSetup from '@/containers/ProfileSetup';
import { NextPage } from 'next';

const ProfileSetupPage: NextPage = () => <ProfileSetup />;

ProfileSetupPage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default ProfileSetupPage;
