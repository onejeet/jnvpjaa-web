import { AppBarProps } from '@mui/material/AppBar';
import { BoxProps } from '@mui/material/Box';
import { ContainerProps } from '@mui/material/Container';
import React from 'react';

export interface Props {
  children?: React.ReactNode;
  title?: string;
  disableTopbar?: boolean;
  disableFooter?: boolean;
  //   breadcrumbs?: Array<IBreadcrumbsItem>;
  containerProps?: ContainerProps;
  disableCover?: boolean;
}

export interface AccountDropDownProps {}

export interface LayoutBreadcrumbsProps extends BoxProps {
  //   breadcrumbs?: Array<IBreadcrumbsItem>;
}

export interface LayoutTopbarProps {
  disableNav?: boolean;
  //   notification?: Partial<NotificationProps>;
  disableSearch?: boolean;
  isLoggedIn?: boolean;
  authenticating?: boolean;
  appBarProps?: AppBarProps;
  disableCover?: boolean;
  disableShadow?: boolean;
  logoSuffix?: React.ReactNode;
}
