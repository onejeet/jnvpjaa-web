import React from 'react';

export interface AuthProviderProps {
  children: React.ReactNode;
}
export interface TAuthContextData {
  user?: any;
  checkAuth?: boolean;
  setUser: (user: any) => void;
  logoutUser: () => void;
  setLoadingData: React.Dispatch<React.SetStateAction<LoadingDataProps>>;
  isAuthPage?: boolean;
  isAdmin?: boolean;
  redirectToSignin: (arg?: boolean, targetPath?: string) => void;
  redirectOnSignin: (arg?: boolean) => void;
}

export interface LoadingDataProps {
  loading?: boolean;
  type?: 'logout' | 'signup' | 'switch_account' | 'invite_link_verify' | 'setting_website';
  renderPageInBackground?: boolean;
}
