'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import { Box, Checkbox, FormControlLabel, Grid2 as Grid, Typography } from '@mui/material';

import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { IconPlus, IconTicket } from '@tabler/icons-react';
import Button from '@/components/core/Button';
import EventListModule from '@/modules/EventListModule';
import PastEventListModule from '@/modules/PastEventListModule';
import { GetEventListQuery } from '@/apollo/hooks';
import { brand } from '@/config/tenant';
import { isPathEnabled } from '@/config/features';
import NextLink from 'next/link';

export default function Events({ initialEvents }: { initialEvents?: GetEventListQuery['getEventList'] }) {
  const [isPendingApporvalOnly, setIsPendingApporvalOnly] = React.useState<boolean>(false);
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const filter = React.useMemo(() => {
    return {
      verified: isPendingApporvalOnly ? false : undefined,
    };
  }, [isPendingApporvalOnly]);

  return (
    <LayoutModule
      disableCover
      title={`Events • ${brand.tagline}`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Box>
          <Typography variant="h1" mb={1}>
            Events
          </Typography>
          <Typography color="grey.800">
            Reunions, meetups, sports days and community programmes organised by {brand.legalName} ({brand.shortName}),
            the alumni association of {brand.institution.name}. Browse ongoing and upcoming events, register to attend,
            and look back at recent gatherings of {brand.institution.shortName} alumni from every batch.
          </Typography>
        </Box>
        {user?.id && (
          <Button
            title="Create Event"
            startIcon={<IconPlus size={16} />}
            onClick={() => router.push(paths.events.new)}
            sx={{
              width: '150px',
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          />
        )}
      </Box>
      {isAdmin && (
        <Box display="flex" alignItems="center" mb={1}>
          <FormControlLabel
            label="Pending approval events only"
            control={
              <Checkbox
                checked={isPendingApporvalOnly}
                // indeterminate={checked[0] !== checked[1]}
                onChange={(e, checked) => setIsPendingApporvalOnly(checked)}
              />
            }
            sx={{
              color: 'grey.800',
            }}
          />
        </Box>
      )}

      <EventListModule filter={filter} initialEvents={initialEvents} />
      <PastEventListModule filter={filter} />

      <Box component="section" mt={4} color="grey.800">
        <Typography variant="h2" fontSize={20} fontWeight={600} mb={1} color="text.primary">
          About {brand.shortName} alumni events
        </Typography>
        <Typography mb={1.5}>
          {brand.shortName} events bring together former students of {brand.institution.name}, wherever they live today.
          Our calendar includes the annual alumni reunion, batch get-togethers, campus visits, sports events, career
          guidance sessions for current students, scholarship and welfare drives, and online meetups for alumni outside{' '}
          {brand.institution.city}.
        </Typography>
        <Typography mb={1.5}>
          Every event page lists the date, mode (in person or online) and organisers. Registered members can mark
          themselves as going, see who else is attending and comment with questions. Venue details for private
          gatherings are shared with signed-in members only.
        </Typography>
        <Typography>
          Want to organise a batch reunion or a community programme? Sign in and use Create Event, or{' '}
          {isPathEnabled('/contact-us/') ? (
            <NextLink href="/contact-us/">contact the association</NextLink>
          ) : (
            'contact the association'
          )}
          .
          {isPathEnabled('/gallery/') && (
            <>
              {' '}
              Photos from past events are in the <NextLink href="/gallery/">gallery</NextLink>.
            </>
          )}
          {isPathEnabled('/blog/') && (
            <>
              {' '}
              Alumni memories are on the <NextLink href="/blog/">{brand.shortName} blog</NextLink>.
            </>
          )}
        </Typography>
      </Box>
    </LayoutModule>
  );
}
