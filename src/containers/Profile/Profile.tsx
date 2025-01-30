'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import AboutSection from './components/AboutSection';
import BlogsSection from './components/BlogsSection';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useGetUserDetailsQuery } from '@/apollo/hooks';

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('about');
  const { data: userData, loading } = useGetUserDetailsQuery({
    skip: !id,
    variables: {
      id: id as string,
    },
  });
  const { user } = useAuth();

  const userInfo = React.useMemo(() => {
    return id ? userData?.getUserDetails : user;
  }, [id, user, userData]);

  return (
    <LayoutModule
      disableCover
      title={`${userInfo?.firstName} Profile • Alumni Network of JNV Paota, Jaipur`}
      containerProps={{ sx: { py: 0 } }}
    >
      <Box sx={{ my: 4 }}>
        <ProfileHeader user={userInfo} loading={loading} />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <Box sx={{ mt: 3 }}>{activeTab === 'about' ? <AboutSection /> : <BlogsSection />}</Box>
      </Box>
    </LayoutModule>
  );
}
