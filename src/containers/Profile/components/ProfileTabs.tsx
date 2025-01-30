import { Tabs, Tab, Box } from '@mui/material';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={activeTab} onChange={(_, newValue) => onTabChange(newValue)} aria-label="Profile tabs">
        <Tab label="About" value="about" />
        <Tab label="Blogs" value="blogs" />
      </Tabs>
    </Box>
  );
}
