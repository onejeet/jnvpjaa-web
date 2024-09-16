'use client';

import FmdGoodIcon from '@mui/icons-material/FmdGood';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SendIcon from '@mui/icons-material/Send';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Breadcrumbs, List, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';

const ContactUs = () => {
  return (
    <Box>
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
          Contact Us
        </MuiLink>
      </Breadcrumbs>
      <Box component={Paper} gap={2} px={2} py={4} my={2} width="100%" display="flex" alignItems="start">
        <Box
          width={{
            xs: '100%',
            // sm: 'calc(100% - 300px)',
          }}
        >
          <Typography variant="h1" mb={3}>
            ContactUs
          </Typography>
          <Box
            display={{ xs: 'block', sm: 'block' }}
            sx={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '400px', overflow: 'hidden' }}
          >
            <img
              src="/assets/images/contact-us-3.webp"
              width="100%"
              alt="mission"
              style={{ objectFit: 'scale-down', position: 'relative' }}
            />
          </Box>
          <Typography color="grey.800" mt={2} fontSize="20px" display="flex" alignItems="center">
            <FmdGoodIcon sx={{ mr: '10px' }} /> Registered Address
          </Typography>
          <Typography color="grey.800" mt={2}>
            JNV Paota Jaipur Alumni Association, <br />
            35, Karani Colony, Shanti Nagar, <br />
            Opposite NBC, Khatipura Road, Jaipur, Rajasthan 302006, India.
          </Typography>
          <Typography color="grey.800" mt={2}>
            Email: alumni@jnvpjaa.org <br /> <br />
            For any urgent help, please contact through Batch Coordinators.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(ContactUs), {
  ssr: false,
});
