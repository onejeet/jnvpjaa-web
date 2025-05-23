'use client';

import React, { createContext, useContext } from 'react';
import { ProfileContextProps, ProfileProviderProps } from './ProfileContext.types';
import { useGetUserDetailsQuery, User, useUpdateUserMutation } from '@/apollo/hooks';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../AuthContext';

const defaultProvider: ProfileContextProps = {
  loading: false,
  isCurrentUserProfile: false,
  isProfileEditable: false,
  user: {
    createdAt: '',
    updatedAt: '',
  },
  editingProfile: false,
  setEditingProfile: () => null,
  saveProfile: () => undefined,
};

const ProfileContext = createContext(defaultProvider);

const ProfileProvider = ({ children, userId }: ProfileProviderProps) => {
  const [editingProfile, setEditingProfile] = React.useState<boolean>(false);
  const params = useParams();
  const id = params.id;
  console.log('ZZ: Profile COntext', id, userId);
  const { data: userData, loading: userDataLoading } = useGetUserDetailsQuery({
    skip: !userId,
    variables: {
      id: userId as string,
    },
  });
  const { user, isAdmin } = useAuth();

  const userInfo = React.useMemo(() => {
    return userId ? userData?.getUserDetails : user;
  }, [userId, user, userData]);

  const isCurrentUserProfile = React.useMemo(() => user?.id === userInfo?.id, [userInfo?.id, user?.id]);
  const isProfileEditable = React.useMemo(
    // () => user?.id === userInfo?.id || isAdmin,
    () => user?.id === userInfo?.id,
    [userInfo?.id, user?.id]
  );

  const [updateUser] = useUpdateUserMutation();

  const saveProfile = React.useCallback(
    (data: Partial<User>) => {
      // if (!isProfileEditable) {
      //   return;
      // }
      return updateUser({
        variables: {
          ...data,
        },
      });
    },
    [isProfileEditable, updateUser]
  );

  console.log('ZZ: editingProfile', editingProfile);

  return (
    <ProfileContext.Provider
      value={{
        loading: userDataLoading,
        isCurrentUserProfile,
        isProfileEditable,
        user: userInfo,
        editingProfile,
        setEditingProfile,
        saveProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('Alert context can only be used inside AlertProvider');

  return context;
};

export { ProfileContext, ProfileProvider, useProfile };
