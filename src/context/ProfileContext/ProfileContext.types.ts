import { UpdateUserMutation, User } from '@/apollo/hooks';
import { AlertDialogProps } from '@/components/common/AlertDialog';
import { FetchResult } from '@apollo/client';
import type React from 'react';

export interface ProfileContextProps {
  isCurrentUserProfile?: boolean;
  isProfileEditable?: boolean;
  user: User;
  loading?: boolean;
  editingProfile: boolean;
  setEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
  saveProfile: (data: Partial<User>) => Promise<FetchResult<UpdateUserMutation>> | undefined;
}

export interface ProfileProviderProps {
  children: React.ReactNode;
}
