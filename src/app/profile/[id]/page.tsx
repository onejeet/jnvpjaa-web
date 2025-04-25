'use client';

import Profile from '@/containers/Profile';
import { ProfileProvider } from '@/context/ProfileContext';
import { Metadata } from 'next';

// Note: This is a Client Component because it uses the ProfileProvider context
// Metadata is handled in the generateMetadata function in the layout.tsx file

export default function UserProfilePage({ params }: { params: { id: string } }) {
  // The id param is available from the route parameters
  return (
    <ProfileProvider userId={params.id}>
      <Profile />
    </ProfileProvider>
  );
}
