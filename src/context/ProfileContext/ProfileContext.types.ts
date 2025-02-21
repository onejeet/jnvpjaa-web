import { User } from '@/apollo/hooks';
import { AlertDialogProps } from '@/components/common/AlertDialog';
import type React from 'react';

export interface ProfileContextProps {
  isCurrentUserProfile?: boolean;
  isProfileEditable?: boolean;
  user: User;
  loading?: boolean;
  editingProfile: boolean;
  setEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
  saveProfile: (data: Partial<User>) => void;
}

export interface ProfileProviderProps {
  children: React.ReactNode;
}
