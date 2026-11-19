'use client';

import Profile from '@/containers/Profile';
import { ProfileProvider } from '@/context/ProfileContext';
import { use } from 'react';

// Note: This is a Client Component because it uses the ProfileProvider context
// Metadata is handled in the generateMetadata function in the layout.tsx file

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ProfileProvider userId={id}>
      <Profile />
    </ProfileProvider>
  );
}
