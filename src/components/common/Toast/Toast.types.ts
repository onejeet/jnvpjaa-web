import { AvatarProps } from '@/components/core/ProfilePicture/ProfilePicture.types';
import { ButtonProps } from '@mui/material';

export interface ToastProps {
  visible?: boolean;
  type?: 'error' | 'success' | 'info' | 'message';
  variant?: 'minimal' | 'expanded';
  message?: string;
  ctaProps?: ButtonProps;
  avatarProps?: Omit<AvatarProps, 'summary'>;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}
