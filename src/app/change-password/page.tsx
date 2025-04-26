'use client';

import ChangePassword from '@/containers/Auth/ChangePassword/ChangePassword';
import { Metadata } from 'next';
import LayoutModule from '@/layouts/Layout';

// Note: This is a Client Component because it requires authentication
// Metadata is defined in the layout.tsx file

export default function ChangePasswordPage() {
  return (
    <LayoutModule
      disableCover
      disableFooter
      title="Change Password • Alumni Network of JNV Paota, Jaipur"
      containerProps={{}}
    >
      <ChangePassword />
    </LayoutModule>
  );
}
