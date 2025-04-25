import AdminPanel from '@/containers/AdminPanel';
import LayoutModule from '@/layouts/Layout';
import { Box, Card } from '@mui/material';
import { NextPage } from 'next';

const AdminPage: NextPage = () => (
  <LayoutModule disableCover title="Admin Panel • Alumni Network of JNV Paota, Jaipur" containerProps={{}}>
    <Box display="flex" justifyContent="center">
      <AdminPanel />
    </Box>
  </LayoutModule>
);

AdminPage.getInitialProps = () => {
  return {
    checkAuth: true,
  };
};

export default AdminPage;
