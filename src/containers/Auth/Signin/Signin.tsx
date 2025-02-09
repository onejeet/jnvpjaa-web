import { alpha, Box, Card, Divider, Theme, Typography } from '@mui/material';
import SigninForm from './SigninForm';
import Image from 'next/image';
import { useRouter } from 'next/router';
import GlobalBgShade from '@/components/common/GlobalBgShade';
import Link from 'next/link';

const Signin = () => {
  const router = useRouter();
  const handleGoogleLogin = () => {
    // Redirect to the backend Google auth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'}/auth/google`;
  };

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
          src={'/assets/svg/profile-website-icon.svg'}
          width={200}
          height={100}
          alt="login"
          style={{ zIndex: 1 }}
        />
        {/* </Box> */}
        <Typography variant="h3" mb={2}>
          Alumni Center Access
        </Typography>
        {/* <Image
          onClick={() => {
            // router.push('/google');
            handleGoogleLogin();
          }}
          src="/assets/svg/google-signin.svg"
          width={300}
          height={38}
          alt="Sign in with Google"
          style={{ cursor: 'pointer' }}
        />
        <Divider sx={{ width: '100%', mt: 2, color: 'grey.500' }}>OR</Divider> */}

        <SigninForm />
        <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
          <Link href="/forgot-password" as="/forgot-password" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" component="span" color="primary.main" sx={{ textDecoration: 'underline' }}>
              Forgot Password?
            </Typography>
          </Link>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" mr={1}>
              Not registered yet?{' '}
            </Typography>
            <Link href="/signup" as="/signup" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" component="span" color="primary.main" sx={{ textDecoration: 'underline' }}>
                Register Now
              </Typography>
            </Link>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Signin;
