import { Box } from '@mui/material';
import SigninForm from './SignupForm';

const Signup = () => {
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
      <SigninForm />
    </Box>
  );
};

export default Signup;
