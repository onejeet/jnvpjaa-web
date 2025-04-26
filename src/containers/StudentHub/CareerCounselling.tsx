import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import Image from 'next/image';

const breadcrumbsList = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: ' Student Hub',
  },
  {
    label: 'Career Counselling',
  },
];

const CareerCounselling = () => {
  return (
    <>
      <Breadcrumbs items={breadcrumbsList} />
      <Box
        component={Paper}
        width="100%"
        gap={3}
        px={2}
        py={3}
        my={2}
        display="flex"
        flexDirection={{
          xs: 'column-reverse',
          md: 'row',
        }}
        alignItems="center"
      >
        <Box
          maxWidth={{
            xs: '100%',
            md: '50%',
          }}
        >
          <Typography variant="h1" mb={3}>
            Career Counselling
          </Typography>
          <Typography color="grey.800" my={2}>
            {`“What’s next?” This uncertainty is something nearly everyone experiences.`}
          </Typography>
          <Box
            display={{ xs: 'block', md: 'none' }}
            sx={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '400px', overflow: 'hidden' }}
          >
            <Image
              src="/assets/images/career-councelling.webp"
              // width="100%"
              fill
              alt="mission"
              style={{ objectFit: 'contain', position: 'relative' }}
            />
          </Box>

          <Typography color="grey.800" mt={3}>
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
          <Image
            src="/assets/images/career-councelling.webp"
            fill
            // width="100%"
            alt="mission"
            style={{ objectFit: 'contain', position: 'relative' }}
          />
        </Box>
      </Box>
    </>
  );
};

export default CareerCounselling;
