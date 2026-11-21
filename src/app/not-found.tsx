'use client';

import Link from 'next/link';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/core/Button';
import StatePage from '@/components/common/StatePage/StatePage';
import LayoutModule from '@/layouts/Layout';

export default function NotFound() {
  const router = useRouter();
  return (
    <LayoutModule disableCover>
      <StatePage
        art="not-found"
        eyebrow="Error 404"
        title="This page doesn't exist"
        description="The link may be old, mistyped, or the page may have moved. Everything else on the portal is right where you left it."
        actions={
          <>
            <Button title="Go to home" component={Link} href="/" startIcon={<IconHome size={18} />} />
            <Button
              title="Go back"
              variant="outlined"
              color="inherit"
              startIcon={<IconArrowLeft size={18} />}
              onClick={() => router.back()}
            />
          </>
        }
      />
    </LayoutModule>
  );
}
