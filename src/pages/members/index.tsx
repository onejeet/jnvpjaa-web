import Members from '@/containers/Members';
import { NextPage } from 'next';

const MembersPage: NextPage = () => <Members />;

MembersPage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default MembersPage;
