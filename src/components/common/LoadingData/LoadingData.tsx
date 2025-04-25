import { Box, Typography } from '@mui/material';
import { IconLoader2 } from '@tabler/icons-react';

const LoadingData = () => {
  return (
    <Box width="100%" my={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
      <IconLoader2 size={80} />
      <Typography color="grey.500">Loading...</Typography>
    </Box>
  );
};
export default LoadingData;
