import { User } from '@/apollo/hooks';
import { Tabs, Tab, Box } from '@mui/material';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user?: User;
}

export default function ProfileTabs({ activeTab, onTabChange, user }: ProfileTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={activeTab} onChange={(_, newValue) => onTabChange(newValue)} aria-label="Profile tabs">
        <Tab label="About" value="about" />
        <Tab label="Events" value="events" />
        <Tab label="Blogs" value="blogs" />
        {user?.hasBusiness && <Tab label="Business" value="business" />}
      </Tabs>
    </Box>
  );
}
