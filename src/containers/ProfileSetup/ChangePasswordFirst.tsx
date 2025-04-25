import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { IconLock, IconUser } from '@tabler/icons-react';
import ChangePasswordForm from '../Auth/ChangePassword/ChangePasswordForm';
import React from 'react';

interface ChangePasswordFirstProps {
  onNext?: () => void;
}

const ChangePasswordFirst: React.FC<ChangePasswordFirstProps> = ({ onNext }) => {
  return (
    <Box
      p={{ xs: 2, md: 3 }}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
      }}
    >
      <Box display="flex" alignItems="center" mb={3}>
        <IconLock size={32} />
        <Typography sx={{ ml: 1 }} fontWeight={600}>
          Change Password
        </Typography>
      </Box>
      <Grid container spacing={3} maxWidth="100%" size={{ xs: 12 }}>
        <ChangePasswordForm
          onNext={onNext}
          containerProps={{
            sx: {
              width: 400,
              p: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        />
      </Grid>
    </Box>
  );
};

export default ChangePasswordFirst;
