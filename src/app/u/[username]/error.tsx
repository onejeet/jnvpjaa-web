'use client';

import { IconRefresh } from '@tabler/icons-react';
import Link from 'next/link';
import Button from '@/components/core/Button';
import StatePage from '@/components/common/StatePage/StatePage';
import LayoutModule from '@/layouts/Layout';

export default function PublicProfileError({ reset }: { error: Error; reset: () => void }) {
  return (
    <LayoutModule disableCover>
      <StatePage
        art="broken-link"
        eyebrow="Temporarily unavailable"
        title="We couldn't load this profile"
        description="Something went wrong on our side, not with the link. Please try again in a moment."
        actions={
          <>
            <Button title="Try again" startIcon={<IconRefresh size={18} />} onClick={() => reset()} />
            <Button title="Go to home" variant="outlined" color="inherit" component={Link} href="/" />
          </>
        }
      />
    </LayoutModule>
  );
}
