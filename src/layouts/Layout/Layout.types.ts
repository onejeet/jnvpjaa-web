import { AppBarProps } from '@mui/material/AppBar';
import { BoxProps } from '@mui/material/Box';
import { ContainerProps } from '@mui/material/Container';
import React from 'react';

export interface Props {
  children?: React.ReactNode;
  /**
   * @deprecated App Router pages should set titles via route metadata or generateMetadata.
   * Kept temporarily so existing LayoutModule call sites can be migrated gradually.
   */
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
