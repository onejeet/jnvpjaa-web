import { useAuth } from '@/context/AuthContext';
import { Box } from '@mui/material';

const HelpBanner = () => {
  const { user } = useAuth();
  return user?.id ? (
    <Box
      sx={{
        width: '100%',
        fontSize: '14px',
        textAlign: 'center',
        py: 1,
        mt: 2,
        bgcolor: 'grey.400',
        fontWeight: 500,
        color: 'text.primary',
      }}
    >
      If you want to share improvements, bugs or feedback, please{' '}
      <a href="https://wa.me/917014750932" target="_blank" rel="noreferrer">
        Chat on WhatsApp (7014750932)
      </a>
    </Box>
  ) : null;
};

export default HelpBanner;
