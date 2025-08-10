'use client';

import LayoutModule from '@/layouts/Layout';
import { Box, Typography, Collapse, Card } from '@mui/material';
import Button from '@/components/core/Button';
import { IconPlus, IconX } from '@tabler/icons-react';
import DiscussionListModule from '@/modules/DiscussionListModule/DiscussionListModule';
import React from 'react';
import NewDiscussion from '@/modules/NewDiscussion';

export default function Discussions() {
  const [showNew, setShowNew] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);

  return (
    <LayoutModule disableCover title={`Discussions • Alumni Network of JNV Paota, Jaipur`}>
      <Box display="flex" alignItems="start" justifyContent="space-between" mb={1}>
        <Box width="100%">
          <Typography variant="h1" mb={1}>
            Discussions
          </Typography>
          <Typography color="grey.800" maxWidth={{ xs: '100%', md: '90%' }} variant="body1">
            Start conversations, ask questions, and share ideas with the alumni community.
          </Typography>
        </Box>
        <Button
          title={showNew ? 'Close' : 'New Thread'}
          startIcon={showNew ? <IconX size={16} /> : <IconPlus size={16} />}
          onClick={() => setShowNew((s) => !s)}
          sx={{ width: '200px', display: { xs: 'none', md: 'flex' } }}
        />
      </Box>

      <Collapse in={showNew} timeout={300} unmountOnExit>
        <Card elevation={3} sx={{ mb: 2, p: { xs: 1, md: 2 } }}>
          <NewDiscussion
            autoNavigate={false}
            onCreated={() => {
              setShowNew(false);
              setRefreshKey((k) => k + 1);
            }}
          />
        </Card>
      </Collapse>

      <DiscussionListModule key={`discussion-list-${refreshKey}`} />
    </LayoutModule>
  );
}
