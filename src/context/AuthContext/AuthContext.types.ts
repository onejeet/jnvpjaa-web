import React from 'react';

export interface AuthProviderProps {
  children: React.ReactNode;
}
export interface TAuthContextData {
  user?: any;
  access?: any;
  roles?: any[];
  positions?: any[];
  permissions?: string[];
  checkAuth?: boolean;
  setUser: (user: any) => void;
  logoutUser: () => void;
  setLoadingData: React.Dispatch<React.SetStateAction<LoadingDataProps>>;
  isAuthPage?: boolean;
  isAdmin?: boolean;
  hasRole: (roleCode: string) => boolean;
  hasPosition: (positionCode: string) => boolean;
  can: (permissionCode: string) => boolean;
  canForBatch: (permissionCode: string, batch?: number | null) => boolean;
  redirectToSignin: (arg?: boolean, targetPath?: string) => void;
  redirectOnSignin: (arg?: boolean) => void;
}

export interface LoadingDataProps {
  loading?: boolean;
  type?: 'logout' | 'signup' | 'switch_account' | 'invite_link_verify' | 'setting_website';
  renderPageInBackground?: boolean;
}
