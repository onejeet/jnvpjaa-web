import Members from '@/containers/Members/Members';
import Profile from '@/containers/Profile';
import { NextPage } from 'next';

const MembersPage: NextPage = () => <Members />;

MembersPage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default MembersPage;
