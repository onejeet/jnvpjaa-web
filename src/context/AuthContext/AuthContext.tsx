'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { AuthProviderProps, LoadingDataProps, TAuthContextData } from './AuthContext.types';
import { Box } from '@mui/material';
import { paths } from '@/config/paths';
import { decodeBase64, encodeBase64 } from '@/utils/index';
import { useGetUserDetailsLazyQuery, useLogoutMutation, User } from '@/apollo/hooks';

const AuthContext = createContext<TAuthContextData>({} as TAuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children, checkAuth, isAuthPage }) => {
  const router = useRouter();
  const isLoggedInRef = React.useRef(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingData, setLoadingData] = useState<LoadingDataProps>({
    loading: checkAuth || isAuthPage,
  });
  const [handleLogout] = useLogoutMutation();

  const [fetchUserData, { data: userData, refetch }] = useGetUserDetailsLazyQuery({
    onCompleted: (data: User) => {
      setUser(data?.getUserDetails as User);
      redirectOnSignin();
    },
    onError: () => {
      if (checkAuth) {
        const rQuery = router?.asPath ? encodeBase64(router.asPath) : '';
        router.push({
          pathname: paths.signin,
          query: {
            r: rQuery,
          },
        });
      }
      setLoadingData({ loading: false });
    },
    notifyOnNetworkStatusChange: true,
  });

  const redirectOnSignin = React.useCallback(async () => {
    if (isAuthPage) {
      const redirectPath = router?.query?.r ? decodeBase64(router.query.r as string) : router?.query?.r;
      if (redirectPath) {
        await router.push(redirectPath as string);
      } else {
        await router.push(paths.home);
      }
    }
    setLoadingData({ loading: false });
  }, [router, isAuthPage]);

  React.useEffect(() => {
    if (user?.id && !userData?.getUserDetails) {
      refetch();
    }
  }, [user, userData, refetch]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage here
      const isLoggedIn = localStorage.getItem('logged_in');
      if (isLoggedIn === 'true') {
        isLoggedInRef.current = Boolean(isLoggedIn);
        fetchUserData();
      } else if (checkAuth || isAuthPage) {
        fetchUserData();
      }
    }

    window.addEventListener('storage', onLoginStateChange, false);
    return () => {
      window.removeEventListener('storage', onLoginStateChange, false);
    };
  }, []);

  const onLoginStateChange = (event: Record<string, any>) => {
    // const isLoggedIn = localStorage.getItem('logged_in');
    if (event.key === 'logged_in' && (event.newValue === '0' || !event.newValue)) {
      window.location.reload();
    }
  };

  const logoutUser = async () => {
    setLoadingData({
      loading: true,
      type: 'logout',
    });
    await handleLogout();
    localStorage.removeItem('logged_in');
    window.location.href = paths.home;
  };

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
        handleLogout: logoutUser,
      }}
    >
      {isLoading ? (
        <Box width="100%" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
          <LoadingIndicator isBackdrop={false} />
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
