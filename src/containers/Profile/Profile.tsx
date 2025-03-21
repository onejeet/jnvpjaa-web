'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import AboutSection from './components/AboutSection';
import BlogsSection from './components/BlogsSection';
import LayoutModule from '@/layouts/Layout';
import { ProfileProvider, useProfile } from '@/context/ProfileContext';
import LoadingData from '@/components/common/LoadingData';
import EventSection from './components/EventSection';
import { Paper } from '@mui/material';
import ProfileForm from './components/ProfileForm';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about');
  const { user, loading, editingProfile } = useProfile();
  return (
    <LayoutModule
      disableCover
      title={`${user?.firstName || ''} Profile • Alumni Network of JNV Paota, Jaipur`}
      containerProps={{ sx: { py: 0 } }}
    >
      <Box sx={{ my: 4 }}>
        <ProfileHeader />
        {!editingProfile && <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />}

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
            </>
          )}
        </Box>
      </Box>
    </LayoutModule>
  );
}
