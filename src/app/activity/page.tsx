import ActivityCenter from '@/containers/ActivityCenter/ActivityCenter';
import LayoutModule from '@/layouts/Layout';
import { Box } from '@mui/material';

export const metadata = { title: 'Activity Center • Alumni Network of JNV Paota, Jaipur' };

export default function ActivityPage() {
  return (
    <LayoutModule disableCover title="Activity Center" containerProps={{}}>
      <Box display="flex" justifyContent="center" width="100%">
        <ActivityCenter />
      </Box>
    </LayoutModule>
  );
}
