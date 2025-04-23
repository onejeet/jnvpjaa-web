import { useGetBlogListQuery, User, UserBasic } from '@/apollo/hooks';
import { useAuth } from '@/context/AuthContext';
import BusinessListModule from '@/modules/BusinessListModule';
import { Box, Typography, Grid2 as Grid, Card, CardContent, CardMedia } from '@mui/material';
import React from 'react';

interface BusinessSectionProps {
  user: User | UserBasic;
}

export default function BusinessSection({ user }: BusinessSectionProps) {
  const { user: authUser } = useAuth();
  const filter = React.useMemo(() => {
    return {
      userId: user?.id,
    };
  }, [user]);

  return (
    <Box>
      <BusinessListModule filter={filter} skip={!user?.id} isCreateAllowed={authUser?.id === user?.id} />
    </Box>
  );
}
