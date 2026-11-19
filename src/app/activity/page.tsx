import ActivityCenter from '@/containers/ActivityCenter/ActivityCenter';
import LayoutModule from '@/layouts/Layout';
import { Box } from '@mui/material';
import { brand } from '@/config/tenant';

export const metadata = { title: `Activity Center • ${brand.tagline}` };

export default function ActivityPage() {
  return (
    <LayoutModule disableCover title="Activity Center" containerProps={{}}>
      <Box display="flex" justifyContent="center" width="100%">
        <ActivityCenter />
      </Box>
    </LayoutModule>
  );
}
