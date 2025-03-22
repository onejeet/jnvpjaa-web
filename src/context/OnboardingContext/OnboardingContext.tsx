import React, { createContext, useContext } from 'react';
import { OnboardingContextProps, OnboardingProviderProps } from './OnboardingContext.types';
import { useGetUserDetailsQuery, User, useUpdateUserMutation } from '@/apollo/hooks';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthContext';

const defaultProvider: OnboardingContextProps = {};

const OnboardingContext = createContext(defaultProvider);

const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const [editingProfile, setEditingProfile] = React.useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { data: userData, loading: userDataLoading } = useGetUserDetailsQuery({
    skip: !id,
    variables: {
      id: id as string,
    },
  });
  const { user, isAdmin } = useAuth();

  const userInfo = React.useMemo(() => {
    return id ? userData?.getUserDetails : user;
  }, [id, user, userData]);

  const [updateUser] = useUpdateUserMutation();

  const saveProfile = React.useCallback(
    (data: Partial<User>) => {
      return updateUser({
        variables: {
          ...data,
        },
      });
    },
    [updateUser]
  );

  return (
    <OnboardingContext.Provider
      value={{
        loading: userDataLoading,
        user: userInfo,
        saveProfile,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

const useProfile = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('Onboarding context can only be used inside OnboardingProvider');

  return context;
};

export { OnboardingContext, OnboardingProvider, useProfile };
