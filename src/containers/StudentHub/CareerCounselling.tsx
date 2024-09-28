import { Breadcrumbs, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';

const CareerCounselling = () => {
  return (
    <>
      <Breadcrumbs
        sx={{
          //   fontSize: '7px',
          alignItems: 'center',
          color: 'grey.500',
        }}
        // separator=">"
        aria-label="breadcrumb"
      >
        <NextLink
          href={{
            pathname: '/',
          }}
          as={{
            pathname: '/',
          }}
          passHref
        >
          <MuiLink variant="body2" underline="none" color="primary">
            Home
          </MuiLink>
        </NextLink>
        <MuiLink variant="body2" underline="none" sx={{ color: 'grey.800', pointerEvents: 'none' }}>
          Student Hub
        </MuiLink>
        <MuiLink variant="body2" underline="none" sx={{ color: 'grey.800', pointerEvents: 'none' }}>
          Career Counselling
        </MuiLink>
      </Breadcrumbs>
      <Box component={Paper} gap={3} px={2} py={3} my={2} display="flex" alignItems="center">
        <Box>
          <Typography variant="h1" mb={3}>
            Career Counselling
          </Typography>
          <Box
            display={{ xs: 'block', md: 'none' }}
            sx={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '400px', overflow: 'hidden' }}
          >
            <img
              src="/assets/images/career-councelling.webp"
              width="100%"
              alt="mission"
              style={{ objectFit: 'contain', position: 'relative' }}
            />
          </Box>
          <Typography color="grey.800" mt={3}>
            {`“What’s next?” This uncertainty is something nearly everyone experiences.`}
          </Typography>
          <Typography color="grey.800" mt={2}>
            {`Selecting a career involves careful consideration of many factors. It’s wise to seek insights from those who have successfully navigated their own journeys. While there are plenty of commercial career guidance services out there, they often focus more on profits than on truly helping you make informed decisions. Instead, turn to trusted mentors and fellow alumni who can offer personalized advice and support as you explore your options. Your path is unique, and the right guidance can make all the difference.`}
          </Typography>
          <Typography color="grey.800" mt={2}>
            We encourage all students to take advantage of the Career Counseling Cell, facilitated by your fellow JNV
            Paota Jaipur alumni. For personalized guidance and support, please email us at
            <Box component="a" href="mailto: alumni@jnvpjaa.org" color="primary.main" ml="4px">
              alumni@jnvpjaa.org
            </Box>
            .<br />{' '}
            {`Don’t forget to include your phone number so we can reach out to you directly! Your future is
            bright, and we're here to help you navigate it.`}
          </Typography>
        </Box>
        <Box display={{ xs: 'none', md: 'block' }} sx={{ borderRadius: '10px', maxWidth: '100%', overflow: 'hidden' }}>
          <img
            src="/assets/images/career-councelling.webp"
            width="100%"
            alt="mission"
            style={{ objectFit: 'contain', position: 'relative' }}
          />
        </Box>
      </Box>
    </>
  );
};

export default CareerCounselling;
