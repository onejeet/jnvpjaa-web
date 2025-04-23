import { NextPage } from 'next';

import LoadingIndicator from '@/components/common/LoadingIndicator';
import React from 'react';
import { useRouter } from 'next/router';

const GoogleAuthCallback: NextPage = () => {
  const router = useRouter();
  React.useEffect(() => {
    // if (router.query.token && router.query.refreshToken) {
    //   // Store tokens in cookies or localStorage
    //   Cookies.set('accessToken', router.query.token as string);
    //   Cookies.set('refreshToken', router.query.refreshToken as string);

    //   // Redirect user to the dashboard or home
    //   router.push('/dashboard');
    // } else {
    // Handle error or invalid token scenario
    router.push('/');
    // }
  }, [router]);

  return <LoadingIndicator />;
};

export default GoogleAuthCallback;
