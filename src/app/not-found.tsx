import { Box } from '@mui/material';
import EmptyView from '@/components/common/EmptyView';

// In the App Router, the 404 page is named not-found.tsx
// This file should be placed in the app directory root
export default function NotFound() {
  return (
    <Box width="100vw" height="100vh">
      <EmptyView message="404 | Page not found" />
    </Box>
  );
}
