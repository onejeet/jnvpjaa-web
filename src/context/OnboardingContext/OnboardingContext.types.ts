import { UpdateUserMutation, User } from '@/apollo/hooks';
import { AlertDialogProps } from '@/components/common/AlertDialog';
import { FetchResult } from '@apollo/client';
import type React from 'react';

export interface OnboardingContextProps {}

export interface OnboardingProviderProps {
  children: React.ReactNode;
}
