'use client';

import React from 'react';
import { Box, Step, StepIconProps, StepLabel, Stepper, useMediaQuery, useTheme } from '@mui/material';
import PersonalInfo from '@/modules/ProfileSetup/PersonalInfo';
import LayoutModule from '@/layouts/Layout';
import { getFormattedLabel } from '@/utils/helpers';
import ProfilePictureUpload from '@/modules/ProfileSetup/ProfilePictureUpload';
import { useAuth } from '@/context/AuthContext';
import Addresses from '@/modules/ProfileSetup/Addresses';
import DataPrivacy from '@/modules/ProfileSetup/DataPrivacy';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconCircleCheck as CheckCircle, IconCircleCheckFilled } from '@tabler/icons-react';
import Welcome from '@/components/common/Welcome/Welcome';
import ChangePassword from '../Auth/ChangePassword/ChangePassword';
import ChangePasswordFirst from './ChangePasswordFirst';
import ProfessionInfo from '@/modules/ProfileSetup/ProfessionInfo';
import dayjs from 'dayjs';

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return completed ? <IconCircleCheckFilled size={32} /> : <div className={className} />;
};

const ProfileSetup = () => {
  const [activeStepIndex, setActiveStepIndex] = React.useState<number>(0);
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isWelcomeSetup = React.useMemo(() => {
    return searchParams.get('welcome') === '1';
  }, [searchParams]);

  const isSignedUp = React.useMemo(() => {
    // TODO :Check if user is created new and not imported.
    return dayjs(user?.createdAt).isAfter('28/04/2025');
  }, [user]);

  const steps = React.useMemo(
    () =>
      isWelcomeSetup
        ? isSignedUp
          ? ['welcome', 'personal_info', 'profile_picture', 'profession', 'addresses', 'privacy']
          : ['welcome', 'change_password', 'personal_info', 'profile_picture', 'profession', 'addresses', 'privacy']
        : ['personal_info', 'profile_picture', 'profession', 'addresses', 'privacy'],
    [isWelcomeSetup, isSignedUp]
  );

  const handleNext = React.useCallback(async () => {
    if (steps[activeStepIndex] === 'privacy') {
      router.push('/profile');
    } else {
      setActiveStepIndex((prevStep) => prevStep + 1);
    }
  }, [activeStepIndex, router, steps]);

  const handleBack = React.useCallback(() => {
    setActiveStepIndex((prevStep) => prevStep - 1);
  }, []);

  const mainComponent = React.useMemo(() => {
    const step = steps[activeStepIndex];
    switch (step) {
      case 'welcome':
        return <Welcome onNext={handleNext} />;
      case 'change_password':
        return <ChangePasswordFirst onNext={handleNext} />;
      case 'personal_info':
        return <PersonalInfo onBack={handleBack} onNext={handleNext} user={user} />;
      case 'profile_picture':
        return <ProfilePictureUpload onBack={handleBack} onNext={handleNext} user={user} />;
      case 'addresses':
        return <Addresses onBack={handleBack} onNext={handleNext} user={user} />;
      case 'profession':
        return <ProfessionInfo onBack={handleBack} onNext={handleNext} user={user} />;
      case 'privacy':
        return <DataPrivacy isLastStep onBack={handleBack} onNext={handleNext} user={user} />;
    }
  }, [activeStepIndex, user, handleNext, handleBack, steps]);

  return (
    <LayoutModule disableCover title={`${'Profile Setup'} • Alumni Network of JNV Paota, Jaipur`}>
      <Box sx={{ width: '100%', p: 2 }}>
        <Stepper activeStep={activeStepIndex} orientation={'horizontal'}>
          {isMobile ? (
            <Step>
              <StepLabel>{getFormattedLabel(steps?.[activeStepIndex])}</StepLabel>
            </Step>
          ) : (
            steps.map((label, index) => (
              <Step
                key={index}
                onClick={() => (isWelcomeSetup && index > activeStepIndex ? null : setActiveStepIndex(index))}
                // onClick={() => setActiveStepIndex(index)}
              >
                <StepLabel>{getFormattedLabel(label)}</StepLabel>
              </Step>
            ))
          )}
        </Stepper>

        <Box p={{ xs: 0, md: 2 }} sx={{ my: 4, border: '1px solid #ccc', borderRadius: 2 }}>
          {/* Render step-specific content here, replace with your common component */}
          <Box>{mainComponent}</Box>
        </Box>
      </Box>
    </LayoutModule>
  );
};

export default ProfileSetup;
