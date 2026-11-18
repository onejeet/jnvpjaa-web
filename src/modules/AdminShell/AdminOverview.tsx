'use client';

import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material';
import { IconArrowUpRight } from '@tabler/icons-react';
import NextLink from 'next/link';

import { useAdminNav } from './AdminShell';

/** Landing page for /admin: every section the viewer can open, grouped as in the sidebar. */
const AdminOverview = () => {
  const { nav } = useAdminNav();
  const groups = nav.filter((group) => group.label);

  return (
    <Stack spacing={4}>
      {groups.map((group) => (
        <Box component="section" key={group.label} aria-labelledby={`admin-group-${group.label}`}>
          <Typography id={`admin-group-${group.label}`} variant="h3" mb={1.5}>
            {group.label}
          </Typography>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={2}>
            {group.items.map((item) => (
              <Card key={item.key} variant="outlined" sx={{ borderRadius: 2 }}>
                <CardActionArea component={NextLink} href={item.href} sx={{ p: 2, height: '100%' }}>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Typography fontWeight={600}>{item.label}</Typography>
                    {item.external && <IconArrowUpRight size={16} aria-label="Opens outside the admin area" />}
                  </Stack>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {item.description}
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default AdminOverview;
