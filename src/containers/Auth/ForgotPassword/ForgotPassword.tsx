'use client';

import { Box, Card, Typography } from '@mui/material';
import ForgotPasswordForm from './ForgotPasswordForm';
import Image from 'next/image';
import GlobalBgShade from '@/components/common/GlobalBgShade';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const e = searchParams.get('e');
  const c = searchParams.get('c');

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
        elevation={3}
        sx={{
          maxWidth: 400,
          bgcolor: 'grey.100',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          position: 'relative',
        }}
      >
        <GlobalBgShade />
        <Image
          src={'https://assets.jnvpjaa.org/assets/svg/profile-website-icon.svg'}
          width={200}
          height={100}
          alt="forgot password"
          style={{ zIndex: 1 }}
        />
        <Typography variant="h3">{c && e ? 'Change Password' : 'Forgot Password?'}</Typography>
        {c && e && (
          <Typography color="grey.500" variant="body2" textAlign="center">
            {`Please submit new password for ${e}`}
          </Typography>
        )}

        <ForgotPasswordForm />
        <Box display="flex" alignItems="center">
          <Typography variant="body2" mr={1}>
            Already have an account?{' '}
          </Typography>
          <Link href="/signin" as="/signin" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" component="span" color="primary.main" sx={{ textDecoration: 'underline' }}>
              Signin
            </Typography>
          </Link>
        </Box>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
