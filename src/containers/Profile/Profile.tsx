'use client';

import React, { Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import AboutSection from './components/AboutSection';
import BlogsSection from './components/BlogsSection';
import LayoutModule from '@/layouts/Layout';
import { useProfile } from '@/context/ProfileContext';
import LoadingData from '@/components/common/LoadingData';
import EventSection from './components/EventSection';
import { Paper, Typography } from '@mui/material';
import ProfileForm from './components/ProfileForm';
import { isBirthdayToday } from '@/utils/helpers';
import giftsLottieIcon from '@/utils/lottie/gifts_art.json';
import Lottie from '@/components/common/DynamicLottie';
import CelebratonConfetti from '@/components/common/CelebratonConfetti';
import BusinessSection from './components/BusinessSection';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about');
  const { user, loading, editingProfile } = useProfile();

  const isBirthday = React.useMemo(() => {
    return isBirthdayToday(user?.dob);
  }, [user?.dob]);

  console.log('ZZ: Proifle', isBirthday, user?.dob);

  return (
    <>
      <LayoutModule
        disableCover
        title={`${user?.firstName || ''} Profile • Alumni Network of JNV Paota, Jaipur`}
        containerProps={{ sx: { py: 0 } }}
      >
        <Box sx={{ my: 4 }}>
          <ProfileHeader />
          {isBirthday && (
            <Box display="flex" maxHeight={50} overflow="hidden" alignItems="center" ml={2}>
              <Lottie animationData={giftsLottieIcon} loop={true} style={{ width: '100px', height: '50px' }} />

              <Typography ml="-10px" color="#B42B43" fontWeight={500}>
                Celebrating a Birthday Today!{' '}
              </Typography>
            </Box>
          )}
          {!editingProfile && <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} user={user} />}

          <Box sx={{ mt: 3 }}>
            {loading ? (
              <LoadingData />
            ) : editingProfile ? (
              <Paper elevation={3} sx={{ p: 3 }}>
                <ProfileForm />
              </Paper>
            ) : (
              <>
                {activeTab === 'about' && <AboutSection />}
                {activeTab === 'blogs' && <BlogsSection user={user} />}
                {activeTab === 'events' && <EventSection user={user} />}
                {activeTab === 'business' && <BusinessSection user={user} />}
              </>
            )}
          </Box>
        </Box>
      </LayoutModule>
      {isBirthday && <CelebratonConfetti />}
    </>
  );
}
