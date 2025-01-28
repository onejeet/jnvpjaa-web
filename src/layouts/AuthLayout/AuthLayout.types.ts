import { ContainerProps } from '@mui/material';

export interface Props {
  children?: React.ReactNode;
  title?: string;
  containerProps?: ContainerProps;
  disableCover?: boolean;
}
