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
import { useRouter } from 'next/router';
import { CheckCircle } from '@phosphor-icons/react';
import { useUpdateUserMutation } from '@/apollo/hooks';

const steps = ['personal_info', 'profile_picture', 'addresses', 'privacy'];

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return completed ? (
    <CheckCircle size={32} weight="fill" /> // Change the color here
  ) : (
    <div className={className} />
  );
};

const ProfileSetup = () => {
  const [activeStepIndex, setActiveStepIndex] = React.useState<number>(0);
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = React.useCallback(async () => {
    if (steps[activeStepIndex] === 'privacy') {
      router.push('/profile');
      return;
    }
    setActiveStepIndex((prevStep) => prevStep + 1);
  }, [activeStepIndex, router]);

  const handleBack = React.useCallback(() => {
    setActiveStepIndex((prevStep) => prevStep - 1);
  }, []);

  const mainComponent = React.useMemo(() => {
    const step = steps[activeStepIndex];
    switch (step) {
      case 'personal_info':
        return <PersonalInfo onBack={handleBack} onNext={handleNext} user={user} />;
      case 'profile_picture':
        return <ProfilePictureUpload onBack={handleBack} onNext={handleNext} user={user} />;
      case 'addresses':
        return <Addresses onBack={handleBack} onNext={handleNext} user={user} />;
      case 'privacy':
        return <DataPrivacy isLastStep onBack={handleBack} onNext={handleNext} user={user} />;
    }
  }, [activeStepIndex, user, handleNext, handleBack]);

  return (
    <LayoutModule disableCover title={`${'Profile Setup'} • Alumni Network of JNV Paota, Jaipur`}>
      <Box sx={{ width: '100%', p: 2 }}>
        <Stepper activeStep={activeStepIndex} orientation={'horizontal'}>
          {isMobile ? (
            <Step>
              <StepLabel slots={{ stepIcon: CustomStepIcon }}>{getFormattedLabel(steps?.[activeStepIndex])}</StepLabel>
            </Step>
          ) : (
            steps.map((label, index) => (
              <Step key={index} onClick={() => setActiveStepIndex(index)}>
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
