'use client';

import ProfileSetup from '@/containers/ProfileSetup';
import { Metadata } from 'next';

// Note: This is a Client Component because it uses client-side state and interactions
// Metadata is handled in the layout.tsx file

export default function ProfileSetupPage() {
  return <ProfileSetup />;
}
