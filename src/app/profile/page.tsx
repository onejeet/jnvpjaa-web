'use client';

import Profile from '@/containers/Profile';
import { ProfileProvider } from '@/context/ProfileContext';
import { Metadata } from 'next';

// Note: Metadata must be in a Server Component, but we need this page as a Client Component
// for the ProfileProvider. The metadata is defined in layout.tsx instead.

export default function ProfilePage() {
  return (
    <ProfileProvider>
      <Profile />
    </ProfileProvider>
  );
}
