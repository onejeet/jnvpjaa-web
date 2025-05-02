import { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { BoxProps } from '@mui/material/Box';

import { TitleProps } from '../Title';

export interface ProfilePictureProps extends Omit<MuiAvatarProps, 'title'> {
  containerProps?: BoxProps;
  avatarContainerProps?: BoxProps;
  contentContainerProps?: BoxProps;
  title?: string | React.ReactNode;
  summary?: string;
  titleComponentProps?: TitleProps;
  gender?: 'male' | 'female';
  size?: number | string;
  onDelete?: () => void;
  loading?: boolean;
  maxWidth?: number;
  id?: string;
  onClick?: () => void;
}
