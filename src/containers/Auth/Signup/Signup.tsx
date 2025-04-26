'use client';

import { Box, Card, Divider, Typography } from '@mui/material';
import SigninForm from './SignupForm';
import GlobalBgShade from '@/components/common/GlobalBgShade';
import Link from 'next/link';

const Signup = () => {
  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        //  background: 'linear-gradient(45deg, rgba(236,239,241,0.4) 0%, rgba(207,216,220,0.4) 100%)',
      }}
    >
      {' '}
      <Card
        elevation={3}
        sx={{
          maxWidth: 700,
          bgcolor: 'grey.100',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          position: 'relative',
        }}
      >
        {/* <Image src={'https://assets.jnvpjaa.org/assets/svg/profile-website-icon.svg'} width={200} height={100} alt="login" /> */}
        <GlobalBgShade />
        <Typography variant="h2">JNV Paota Alumni Registration</Typography>
        <Typography color="grey.500" variant="body2" textAlign="center" mb={2}>
          The registration will be reviewed and verified by the Alumni Association and batch coordinators,
          <br /> and will be approved accordingly.
        </Typography>
        {/* <Image
          onClick={() => {}}
          src="https://assets.jnvpjaa.org/assets/svg/google-signin.svg"
          width={300}
          height={38}
          alt="Sign in with Google"
          style={{ cursor: 'pointer' }}
        />
        <Divider sx={{ width: '100%', mt: 2, color: 'grey.500' }}>OR</Divider> */}

        <SigninForm />
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

export default Signup;
