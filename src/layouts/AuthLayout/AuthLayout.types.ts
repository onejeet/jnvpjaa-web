import { ContainerProps } from '@mui/material';

export interface Props {
  children?: React.ReactNode;
  /**
   * @deprecated App Router pages should set titles via route metadata or generateMetadata.
   * Kept temporarily so existing AuthLayout call sites can be migrated gradually.
   */
  title?: string;
  containerProps?: ContainerProps;
  disableCover?: boolean;
}
