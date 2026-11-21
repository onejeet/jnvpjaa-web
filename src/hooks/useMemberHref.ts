'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { memberHref } from '@/utils/publicProfilePath';

/** Where a member's name or photo links for whoever is looking; null means it isn't a link. */
export const useMemberHref = () => {
  const signedIn = Boolean(useAuth().user?.id);
  return React.useCallback((member: Parameters<typeof memberHref>[0]) => memberHref(member, signedIn), [signedIn]);
};
