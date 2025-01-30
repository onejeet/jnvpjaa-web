import { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { BoxProps } from '@mui/material/Box';

import { TitleProps } from '../Title';

export interface ProfilePictureProps extends MuiAvatarProps {
  containerProps?: BoxProps;
  avatarContainerProps?: BoxProps;
  contentContainerProps?: BoxProps;
  title?: string;
  summary?: string;
  titleComponentProps?: TitleProps;
  gender?: 'male' | 'female';
  size?: number | string;
  onDelete?: () => void;
  loading?: boolean;
  maxWidth?: number;
  id?: string;
}
