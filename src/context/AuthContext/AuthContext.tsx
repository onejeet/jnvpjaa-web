'use client';

import React, { createContext, Suspense, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { AuthProviderProps, LoadingDataProps, TAuthContextData } from './AuthContext.types';
import { Box } from '@mui/material';
import { paths } from '@/config/paths';
import { decodeBase64, encodeBase64 } from '@/utils/index';
import { useGetUserDetailsLazyQuery, useLogoutMutation, User } from '@/apollo/hooks';
import { useApolloClient } from '@apollo/client';
import { useAlert } from '../AlertContext';
import { track } from '@vercel/analytics';

const AuthContext = createContext<TAuthContextData>({} as TAuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const client = useApolloClient();
  const { showAlert } = useAlert();
  const isLoggedInRef = React.useRef(false);
  const isAuthPage = React.useMemo(() => ['/signin/', '/signup/', '/forgot-password/'].includes(pathname), [pathname]);

  const checkAuth = React.useMemo(() => {
    return (
      pathname.startsWith('/profile') ||
      pathname.startsWith('/admin') ||
      pathname.includes('/new') ||
      pathname.includes('/edit')
    );
  }, [pathname]);

  console.log('ZZ: pathnme', isAuthPage, checkAuth);

  const [user, setUser] = useState<User | null>(null);
  const [loadingData, setLoadingData] = useState<LoadingDataProps>({
    loading: checkAuth || isAuthPage,
  });

  const [handleLogout] = useLogoutMutation();

  const [fetchUserData, { data: userData, refetch }] = useGetUserDetailsLazyQuery({
    onCompleted: (data: any) => {
      setUser(data?.getUserDetails as User);
      track('user_dashboard_view', {
        userName: data?.getUserDetails?.firstName,
        batch: data?.getUserDetails?.batch,
        userId: data?.getUserDetails?.id,
      });
      if (data?.getUserDetails?.metadata?.isFirstLogin !== false) {
        const targetUrl = `${paths.profile.setup}?welcome=1`;
        router.push(targetUrl);
        if (loadingData?.type !== 'logout') {
          setLoadingData({ loading: false });
        }
        return;
      }
      redirectOnSignin();
    },
    onError: () => {
      if (loadingData?.type !== 'logout') {
        redirectToSignin();
      }
    },
    notifyOnNetworkStatusChange: true,
  });

  const redirectOnSignin = React.useCallback(
    async (customPass?: boolean) => {
      if (isAuthPage || customPass) {
        const redirectPath = searchParams.get('r')
          ? decodeBase64(searchParams.get('r') as string)
          : searchParams.get('r');
        if (redirectPath) {
          await router.push(redirectPath as string);
        } else {
          await router.push(paths.profile.root);
        }
      }
      setLoadingData({ loading: false });
    },
    [router, isAuthPage, searchParams]
  );

  const redirectToSignin = React.useCallback(
    async (customPas?: boolean, targetPath?: string) => {
      if (checkAuth || customPas) {
        const rQuery = pathname ? encodeBase64(pathname) : '';
        const queryString = new URLSearchParams({ r: rQuery }).toString();
        const targetUrl = `${targetPath || paths.signin}?${queryString}`;
        await router.push(targetUrl);
      }
      if (loadingData?.type !== 'logout') {
        setLoadingData({ loading: false });
      }
    },
    [router, checkAuth, pathname]
  );

  React.useEffect(() => {
    if (user?.id && !userData?.getUserDetails) {
      refetch();
    }
  }, [user, userData, refetch]);

  React.useEffect(() => {
    if (!user?.id && !loadingData?.loading && checkAuth) {
      redirectToSignin();
    }
  }, [pathname]);

  // useEffect(() => {
  //   // Handler to check authentication on route change
  //   const handleRouteChange = (url: string) => {
  //     if (!loadingData?.loading && !user?.id && checkAuth) {
  //       // If user is not authenticated and the URL is not '/login', redirect to '/login'
  //       redirectToSignin();
  //     }
  //   };

  //   // Listen to route changes
  //   router.events.on('routeChangeStart', handleRouteChange);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, [user, loadingData, router]);

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
      window.addEventListener('storage', onLoginStateChange, false);
      return () => {
        window.removeEventListener('storage', onLoginStateChange, false);
      };
    }
  }, []);

  const onLoginStateChange = (event: Record<string, any>) => {
    // const isLoggedIn = localStorage.getItem('logged_in');
    console.log('ZZ: Strogae', event);
    if (!event.key || (event.key === 'logged_in' && (event.newValue === '0' || !event.newValue))) {
      if (checkAuth) {
        window.location.href = paths.home;
        // setLoadingData({
        //   loading: false,
        // });
      } else {
        window.location.reload();
      }
    }

    if (event.key === 'logged_in' && event.newValue === 'true' && !user) {
      window.location.reload();
    }
  };

  const logoutUser = async () => {
    if (typeof window === 'undefined') return;
    setLoadingData({
      loading: true,
      type: 'logout',
    });
    localStorage.clear();
    client.resetStore();
    client.cache.reset();
    setUser(null);
    await handleLogout();

    // setUser(null);
    // setLoadingData({
    //   loading: false,
    // });

    if (checkAuth) {
      window.location.href = paths.home;
      // setLoadingData({
      //   loading: false,
      // });
    } else {
      window.location.reload();
    }
  };

  const isLoading = React.useMemo(() => {
    return loadingData?.loading;
  }, [loadingData?.loading]);

  const isAdmin = React.useMemo(() => {
    return user?.role?.name === 'admin';
  }, [user]);

  return (
    <Suspense fallback={<LoadingIndicator isBackdrop />}>
      <AuthContext.Provider
        value={{
          user,
          isAdmin,
          checkAuth,
          setUser,
          logoutUser,
          isAuthPage,
          setLoadingData,
          redirectToSignin,
          redirectOnSignin,
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
    </Suspense>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthContext, AuthProvider, useAuth };
