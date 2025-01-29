import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { AuthProviderProps, LoadingDataProps, TAuthContextData } from './AuthContext.types';
import { useGetUserDetailsQuery } from 'src/apollo/hooks';
import { Box } from '@mui/material';

const AuthContext = createContext<TAuthContextData>({} as TAuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children, checkAuth, isAuthPage }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(undefined);
  const [loadingData, setLoadingData] = useState<LoadingDataProps>({
    loading: checkAuth || isAuthPage,
  });

  const { data: userData, refetch } = useGetUserDetailsQuery({
    onCompleted: (data) => {
      setUser(data?.getUserDetails);
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    window.addEventListener('storage', onLoginStateChange, false);

    return () => {
      window.removeEventListener('storage', onLoginStateChange, false);
    };
  }, []);

  const onLoginStateChange = (event: Record<string, any>) => {
    const isLoggedIn = localStorage.getItem('logged_in');
    if (event.key === 'logged_in' && (event.newValue === '0' || !event.newValue)) {
      window.location.reload();
    }
  };

  const logoutUser = async () => {
    setLoadingData({
      loading: true,
      type: 'logout',
    });
    // await Auth.signOut();
    // setUser(undefined);
    // localStorage.clear();
    // if (checkAuth) {
    //   await router.replace('/sign-in');
    // }
    // localStorage.setItem('logged_in', '0');
    // client.clearStore();
    // client.cache.reset();
    // setLoadingData({
    //   loading: false,
    // });
  };

  const loadUserData = async () => {
    if (checkAuth || isAuthPage) {
      //   const userData = await getCognitoUser();
      //   if (userData?.username) {
      //     // redirection will be taken care be use effect
      //     setUser(userData);
      //   } else if (checkAuth) {
      //     // If user is NOT already logged in and tries to access any page that required authentication, we need to redirect him to signin page
      //     redirectToSigninPage();
      //   } else if (!loadingData?.type) {
      //     setLoadingData({
      //       loading: false,
      //     });
      // }
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  React.useEffect(() => {
    if (user?.id && !userData?.getUserDetails) {
      refetch();
    }
  }, [user, userData, refetch]);

  // React.useEffect(() => {
  //   const userSelf = userData?.getUserDetails;

  //   // this is fallback to create company and user is
  //   // failed during CRM onboarding completion

  //   if (user && userSelf) {
  //     if (isAuthPage || router.pathname.includes('/onboarding')) {
  //       const redirectPath = router?.query?.redirect
  //         ? decodeBase64(router.query.redirect as string)
  //         : router?.query?.redirect;
  //       if (redirectPath) {
  //         await router.replace(redirectPath as string);
  //       } else {
  //         await router.replace('/');
  //       }
  //     }
  //     setLoadingData({
  //       loading: false,
  //     });
  //   }
  // }, [userData, user]);

  const isLoading = React.useMemo(() => {
    return loadingData?.loading;
  }, [loadingData?.loading]);

  return (
    <AuthContext.Provider
      value={{
        user: userData?.getUserDetails || user,
        checkAuth,
        setUser,
        logoutUser,
        isAuthPage,
        setLoadingData,
      }}
    >
      {isLoading ? (
        <Box width="100%" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
          <LoadingIndicator />
        </Box>
      ) : null}
      {/* The Children's will not load while loading is in progress
       * until specifically mentioned by using renderPageInBackground
       */}
      {Boolean(!isLoading || loadingData?.renderPageInBackground) && (
        <Box sx={{ visibility: isLoading ? 'hidden' : 'visible' }}>{children}</Box>
      )}
    </AuthContext.Provider>
  );
};

const useAuth = (): TAuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthContext, AuthProvider, useAuth };
