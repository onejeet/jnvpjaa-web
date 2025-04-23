import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';
import GlobalBgShade from '@/components/common/GlobalBgShade';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import ChangePasswordForm from './ChangePasswordForm';

interface ChangePasswordProps {
  onNext?: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onNext }) => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        //  background: 'linear-gradient(45deg, rgba(236,239,241,0.4) 0%, rgba(207,216,220,0.4) 100%)',
      }}
    >
      <Card
        elevation={onNext ? 0 : 3}
        sx={{
          maxWidth: 400,
          bgcolor: onNext ? 'transparent' : 'grey.100',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          position: 'relative',
        }}
      >
        {!onNext && <GlobalBgShade />}
        <Image
          src={'/assets/svg/profile-website-icon.svg'}
          width={200}
          height={100}
          alt="forgot password"
          style={{ zIndex: 1 }}
        />
        <Typography variant="h3">Change Password</Typography>

        <Typography color="grey.500" variant="body2" textAlign="center">
          {`Please submit new password for ${user?.email}`}
        </Typography>

        <ChangePasswordForm onNext={onNext} />
      </Card>
    </Box>
  );
};

export default ChangePassword;
