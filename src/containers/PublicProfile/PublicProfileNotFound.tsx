'use client';

import { IconHome, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';
import Button from '@/components/core/Button';
import StatePage from '@/components/common/StatePage/StatePage';
import { brand } from '@/config/tenant';

/** Unknown, hidden, pending and removed members all land here, with the same words, so nothing leaks. */
export default function PublicProfileNotFound() {
  return (
    <StatePage
      art="missing-card"
      eyebrow="Profile not found"
      title="There's no public profile here"
      description={`Check the spelling of the username. The member may also have changed it, or chosen to keep their profile private.`}
      actions={
        <>
          <Button title="Browse members" component={Link} href="/members" startIcon={<IconUsers size={18} />} />
          <Button
            title={`Go to ${brand.shortName}`}
            variant="outlined"
            color="inherit"
            component={Link}
            href="/"
            startIcon={<IconHome size={18} />}
          />
        </>
      }
      footnote="Public profiles are only shown for members the association has verified."
    />
  );
}
