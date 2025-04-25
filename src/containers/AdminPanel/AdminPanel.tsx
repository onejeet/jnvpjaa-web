'use client';
import { useSendMassEmailMutation } from '@/apollo/hooks';
import Button from '@/components/core/Button';
import { useAuth } from '@/context/AuthContext';
import { Box } from '@mui/material';
import { IconSend as PaperPlaneTilt } from '@tabler/icons-react';

const AdminPanel = () => {
  const { isAdmin } = useAuth();

  const [sendEmail] = useSendMassEmailMutation();
  if (!isAdmin) {
    return null;
  }

  const onClick = () => {
    sendEmail({
      variables: {
        subject: '🙌 New JNVPJAA Portal Awaits – Let’s Go! 🎉 ',
        template: 'newPortalWelcome',
        context: {
          url: 'https://jnvpjaa.org',
        },
      },
    });
  };

  return (
    <Box p={4}>
      <Button title="Send Welcome Email" onClick={() => onClick()} startIcon={<PaperPlaneTilt size={18} />} />
    </Box>
  );
};

export default AdminPanel;
