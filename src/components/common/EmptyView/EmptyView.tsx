import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const EmptyView = () => {
  return (
    <Box
      mt={2}
      mb={4}
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Image src="/assets/svg/empty_data.svg" alt="empty" width={300} height={100} />
      <Typography variant="body1" color="grey.500" mt={2}>
        No data is available.
      </Typography>
    </Box>
  );
};

export default EmptyView;
