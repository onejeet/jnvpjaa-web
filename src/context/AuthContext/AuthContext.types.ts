import React from 'react';

export interface AuthProviderProps {
  checkAuth?: boolean;
  isAuthPage?: boolean;
  children: React.ReactNode;
}
export interface TAuthContextData {
  user?: any;
  checkAuth?: boolean;
  setUser: (user: any) => void;
  logoutUser: () => void;
  handleLogout: () => void;
  // loadUserData: () => void;
  setLoadingData: React.Dispatch<React.SetStateAction<LoadingDataProps>>;
  // isOnboardingFinished?: boolean;
  // failedSubscriptions: {
  //   data?: Record<string, any>[];
  //   loading: boolean;
  //   isAccountPaused: boolean;
  //   isPaymentFailed: boolean;
  //   openPaymentFailureDialog: () => void;
  //   closePaymentFailureDialog: (arg?: boolean) => void;
  //   showPaymentFailedRestoredSuccess?: boolean;
  //   refetch: () => void;
  // };
  isAuthPage?: boolean;
}

export interface LoadingDataProps {
  loading?: boolean;
  type?: 'logout' | 'signup' | 'switch_account' | 'invite_link_verify' | 'setting_website';
  renderPageInBackground?: boolean;
}
