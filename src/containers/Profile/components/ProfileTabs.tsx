import { User } from '@/apollo/hooks';
import { Tabs, Tab, Box } from '@mui/material';
import { profileTabs } from '@/config/features';

const LABELS: Record<string, string> = { about: 'About', events: 'Events', blogs: 'Blogs', business: 'Business' };

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user?: User;
}

export default function ProfileTabs({ activeTab, onTabChange, user }: ProfileTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={activeTab} onChange={(_, newValue) => onTabChange(newValue)} aria-label="Profile tabs">
        {profileTabs(Boolean(user?.hasBusiness)).map((tab) => (
          <Tab key={tab} label={LABELS[tab]} value={tab} />
        ))}
      </Tabs>
    </Box>
  );
}
