import Blog from '@/containers/Blog';
import { NextPage } from 'next';

const OnboardingPage: NextPage = () => <Blog />;

OnboardingPage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default OnboardingPage;
