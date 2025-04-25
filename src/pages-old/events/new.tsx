import Events from '@/containers/Events';
import LayoutModule from '@/layouts/Layout';
import { Box, Card } from '@mui/material';
import { NextPage } from 'next';
import NewEvent from 'src/modules/NewEvent';

const EventsPage: NextPage = () => (
  <LayoutModule disableCover title="JNVPJAA Blog • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
    <Box display="flex" justifyContent="center">
      <Card
        elevation={3}
        sx={{
          maxWidth: '1000px',
          bgcolor: 'grey.100',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 3,
          pt: 2,
          pb: 4,
          position: 'relative',
        }}
      >
        <NewEvent />
      </Card>
    </Box>
  </LayoutModule>
);

EventsPage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default EventsPage;
