import SecurityCenter from '@/containers/SecurityCenter/SecurityCenter';
import LayoutModule from '@/layouts/Layout';
import { Box } from '@mui/material';

export default function SecurityPage() {
  return (
    <LayoutModule disableCover title="Security Center" containerProps={{}}>
      <Box display="flex" justifyContent="center" width="100%">
        <SecurityCenter />
      </Box>
    </LayoutModule>
  );
}
