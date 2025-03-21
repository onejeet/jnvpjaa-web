import { User, UserBasic } from '@/apollo/hooks';
import EventListModule from '@/modules/EventListModule';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface IEventSectinProps {
  user: User | UserBasic;
}

export default function EventSection({ user }: IEventSectinProps) {
  const filter = React.useMemo(() => {
    return {
      userId: user?.id,
    };
  }, [user]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Associated events
      </Typography>
      <EventListModule filter={filter} skip={!user?.id} />
    </Box>
  );
}
