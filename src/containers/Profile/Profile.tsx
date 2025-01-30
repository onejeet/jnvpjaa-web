'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import AboutSection from './components/AboutSection';
import BlogsSection from './components/BlogsSection';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about');

  const { user } = useAuth();

  return (
    <LayoutModule
      disableCover
      title={`${user?.firstName} Profile • Alumni Network of JNV Paota, Jaipur`}
      containerProps={{}}
    >
      <Box sx={{ my: 4 }}>
        <ProfileHeader />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <Box sx={{ mt: 3 }}>{activeTab === 'about' ? <AboutSection /> : <BlogsSection />}</Box>
      </Box>
    </LayoutModule>
  );
}
