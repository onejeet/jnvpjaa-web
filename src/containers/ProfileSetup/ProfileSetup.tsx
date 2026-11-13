'use client';

import React from 'react';
import { Alert, Box, Button, LinearProgress, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import PersonalInfo from '@/modules/ProfileSetup/PersonalInfo';
import ProfessionInfo from '@/modules/ProfileSetup/ProfessionInfo';
import ProfilePictureUpload from '@/modules/ProfileSetup/ProfilePictureUpload';
import Addresses from '@/modules/ProfileSetup/Addresses';
import DataPrivacy from '@/modules/ProfileSetup/DataPrivacy';

const COMPLETE_PROFILE_SETUP = gql`
  mutation CompleteProfileSetup {
    completeProfileSetup {
      id
      metadata
    }
  }
`;
const onboardingSteps = [
  { id: 'personal', title: 'About you', description: 'Help classmates recognise you.' },
  { id: 'work', title: 'Your work', description: 'Let alumni know what you do today. This part is optional.' },
  { id: 'privacy', title: 'Privacy', description: 'Choose who can see your contact details.' },
];
const editSections = [
  { id: 'personal', title: 'About you', description: 'Update the details classmates use to recognise you.' },
  { id: 'photo', title: 'Photo', description: 'Choose a profile picture.' },
  { id: 'work', title: 'Your work', description: 'Keep your current organisation and role up to date.' },
  { id: 'addresses', title: 'Addresses', description: 'Update your home and work addresses.' },
  { id: 'privacy', title: 'Privacy', description: 'Choose who can see your contact details.' },
];

export default function ProfileSetup() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const isEditing = user?.metadata?.isFirstLogin === false;
  const steps = isEditing ? editSections : onboardingSteps;
  const [error, setError] = React.useState('');
  const [complete, { loading: finishing }] = useMutation(COMPLETE_PROFILE_SETUP);
  const storageKey = user?.id && !isEditing ? `profile-setup:${user.id}` : null;

  React.useEffect(() => {
    if (!storageKey) {
      setStep(0);
      return;
    }
    const saved = Number(sessionStorage.getItem(storageKey));
    if (Number.isInteger(saved) && saved >= 0 && saved < steps.length) setStep(saved);
  }, [storageKey, steps.length]);

  const moveTo = React.useCallback(
    (next: number) => {
      setError('');
      setStep(next);
      if (storageKey) sessionStorage.setItem(storageKey, String(next));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [storageKey]
  );

  const finish = React.useCallback(async () => {
    if (finishing) return;
    setError('');
    if (isEditing) {
      router.replace('/profile');
      return;
    }
    try {
      const result = await complete();
      if (!result.data?.completeProfileSetup) throw new Error('Could not finish profile setup. Please try again.');
      if (storageKey) sessionStorage.removeItem(storageKey);
      setUser((current: any) =>
        current ? { ...current, metadata: { ...current.metadata, isFirstLogin: false } } : current
      );
      router.replace('/profile');
    } catch (err: any) {
      setError(err.message || 'Could not finish profile setup. Please try again.');
    }
  }, [complete, finishing, isEditing, router, setUser, storageKey]);

  const next = () => (step === steps.length - 1 ? void finish() : moveTo(step + 1));
  const back = () => moveTo(Math.max(0, step - 1));

  return (
    <LayoutModule disableCover title="Profile Setup • Alumni Network of JNV Paota, Jaipur">
      <Box sx={{ maxWidth: 760, mx: 'auto', py: { xs: 2, md: 4 }, px: { xs: 1, md: 0 } }}>
        <Stack spacing={1} mb={3}>
          <Typography variant="overline" color="primary.main">
            {isEditing ? 'Edit profile' : 'Profile setup'}
          </Typography>
          <Typography variant="h2" component="h1">
            {steps[step].title}
          </Typography>
          <Typography color="text.secondary">{steps[step].description}</Typography>
          {isEditing ? (
            <Tabs
              value={step}
              onChange={(_, value) => moveTo(value)}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Edit profile sections"
            >
              {steps.map((section) => (
                <Tab key={section.id} label={section.title} />
              ))}
            </Tabs>
          ) : (
            <>
              <Typography variant="caption" color="text.secondary">
                Step {step + 1} of {steps.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={((step + 1) / steps.length) * 100}
                sx={{ height: 4, borderRadius: 2 }}
              />
            </>
          )}
        </Stack>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 }, borderRadius: 2, minHeight: 380 }}>
          {steps[step].id === 'personal' && <PersonalInfo user={user} onNext={next} onBack={step ? back : undefined} />}
          {steps[step].id === 'photo' && <ProfilePictureUpload user={user} onBack={back} onNext={next} />}
          {steps[step].id === 'work' && <ProfessionInfo user={user} onBack={back} onNext={next} />}
          {steps[step].id === 'addresses' && <Addresses user={user} onBack={back} onNext={next} />}
          {steps[step].id === 'privacy' && <DataPrivacy user={user} onBack={back} onNext={next} isLastStep />}
        </Paper>
        {step === 0 && !isEditing && (
          <Button onClick={next} sx={{ mt: 2 }}>
            Do this later
          </Button>
        )}
        {finishing && (
          <Typography role="status" variant="body2" sx={{ mt: 2 }}>
            Finishing your profile…
          </Typography>
        )}
      </Box>
    </LayoutModule>
  );
}
