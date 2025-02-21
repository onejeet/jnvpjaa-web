import { titleCase } from '@/utils/helpers';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface IProps {
  type?: string;
  message?: string;
}

const EmptyView = ({ type, message }: IProps) => {
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
        {message || `No ${type || ''} data is available.`}
      </Typography>
    </Box>
  );
};

export default EmptyView;
