import { BoxProps } from '@mui/material/Box';
import { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

export interface AvatarProps extends MuiAvatarProps {
  containerProps?: BoxProps;
  title?: string;
  summary?: string | React.ReactNode;
  size?: number | string;
}
