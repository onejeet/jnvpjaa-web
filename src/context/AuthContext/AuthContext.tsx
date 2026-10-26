'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { AuthProviderProps, LoadingDataProps, TAuthContextData } from './AuthContext.types';
import { Box } from '@mui/material';
import { paths } from '@/config/paths';
import { decodeBase64, encodeBase64 } from '@/utils/index';
import { useGetUserDetailsLazyQuery, useLogoutMutation, User } from '@/apollo/hooks';
import { useApolloClient } from '@apollo/client';
import { useAlert } from '../AlertContext';
import { track } from '@vercel/analytics';
import { useLazyQuery } from '@apollo/client';
import { VIEWER_ACCESS_CONTEXT } from '@/apollo/accessOperations';
import { PERMISSION_CODES, ROLE_CODES } from '@/constants/access';

const AuthContext = createContext<TAuthContextData>({} as TAuthContextData);

const AUTH_ROUTES = ['/signin', '/signup', '/forgot-password'];

const isAuthRoute = (pathname: string) =>
  AUTH_ROUTES.some((route) => pathname === route || pathname === `${route}/` || pathname.startsWith(`${route}/`));

const isSafeRedirectPath = (path?: string | null) => {
  if (!path) return false;

  return path.startsWith('/') && !path.startsWith('//') && !/^https?:\/\//i.test(path);
};

const getSafeRedirectPath = (encodedPath?: string | null) => {
  if (!encodedPath) return null;

  try {
    const decodedPath = decodeBase64(encodedPath);
    return isSafeRedirectPath(decodedPath) ? decodedPath : null;
  } catch (error) {
    return null;
  }
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const client = useApolloClient();
  const { showAlert } = useAlert();
  const isLoggedInRef = React.useRef(false);
  const isAuthPage = React.useMemo(() => isAuthRoute(pathname), [pathname]);

  const checkAuth = React.useMemo(() => {
    return (
      pathname.startsWith('/profile') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/transactions') ||
      pathname.startsWith('/change-password') ||
      pathname.includes('/new') ||
      pathname.includes('/edit')
    );
  }, [pathname]);

  console.log('ZZ: pathnme', isAuthPage, checkAuth);

  const [user, setUser] = useState<User | null>(null);
  const [access, setAccess] = useState<any>(null);
  const [loadingData, setLoadingData] = useState<LoadingDataProps>({
    loading: checkAuth || isAuthPage,
  });

  const [handleLogout] = useLogoutMutation();
  const [fetchViewerAccess] = useLazyQuery(VIEWER_ACCESS_CONTEXT, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setAccess(data?.viewerAccessContext || null);
    },
    onError: () => {
      setAccess(null);
    },
  });

  const [fetchUserData, { data: userData, refetch }] = useGetUserDetailsLazyQuery({
    onCompleted: (data: any) => {
      setUser(data?.getUserDetails as User);
      fetchViewerAccess();
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
        const redirectParam =
          typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('r');
        const redirectPath = getSafeRedirectPath(redirectParam);
        if (redirectPath) {
          await router.push(redirectPath);
        } else {
          await router.push(paths.profile.root);
        }
      }
      setLoadingData({ loading: false });
    },
    [router, isAuthPage]
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
      } else if (checkAuth) {
        fetchUserData();
      } else if (isAuthPage) {
        setLoadingData({ loading: false });
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
    setAccess(null);
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

  const permissions = React.useMemo(() => access?.permissions || [], [access?.permissions]);
  const roles = React.useMemo(() => access?.roles || [], [access?.roles]);
  const positions = React.useMemo(() => access?.positions || [], [access?.positions]);

  const can = React.useCallback(
    (permissionCode: string) => {
      return Boolean(access?.hasFullAccess || permissions.includes(permissionCode));
    },
    [access?.hasFullAccess, permissions]
  );

  const hasRole = React.useCallback((roleCode: string) => roles.some((role: any) => role.code === roleCode), [roles]);

  const hasPosition = React.useCallback(
    (positionCode: string) => positions.some((position: any) => position.code === positionCode),
    [positions]
  );

  const canForBatch = React.useCallback(
    (permissionCode: string, batch?: number | null) => {
      if (can(permissionCode) && access?.hasFullAccess) return true;
      if (!can(permissionCode)) return false;
      if (batch === null || batch === undefined) return true;

      return roles.some((role: any) => role.scopeType === 'GLOBAL' || role.scopeBatch === batch);
    },
    [access?.hasFullAccess, can, roles]
  );

  const isAdmin = React.useMemo(() => {
    return (
      user?.role?.name === 'admin' ||
      hasRole(ROLE_CODES.SUPER_ADMIN) ||
      hasRole(ROLE_CODES.PLATFORM_ADMIN) ||
      can(PERMISSION_CODES.SYSTEM_FULL_ACCESS)
    );
  }, [can, hasRole, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        access,
        roles,
        positions,
        permissions,
        isAdmin,
        hasRole,
        hasPosition,
        can,
        canForBatch,
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
