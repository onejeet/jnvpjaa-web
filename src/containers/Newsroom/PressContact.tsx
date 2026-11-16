'use client';

import React from 'react';
import NextLink from 'next/link';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { IconMail, IconRss } from '@tabler/icons-react';
import { paths } from '@/config/paths';

const PressContact: React.FC = () => (
  <Paper
    variant="outlined"
    sx={{ borderRadius: 3, p: { xs: 2.5, md: 3 }, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}
  >
    <Stack flex={1} spacing={0.5}>
      <Typography fontWeight={700} fontSize={18}>
        Media enquiries
      </Typography>
      <Typography color="text.secondary">
        Journalists and partners can reach the association&apos;s communications team for statements, interviews and
        verified information.
      </Typography>
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} alignItems={{ sm: 'center' }}>
      <Button
        component={NextLink}
        href="/contact-us"
        variant="contained"
        disableElevation
        startIcon={<IconMail size={18} />}
      >
        Contact us
      </Button>
      <Button component="a" href={paths.newsroom.feed} variant="outlined" startIcon={<IconRss size={18} />}>
        RSS feed
      </Button>
    </Stack>
  </Paper>
);

export default PressContact;
