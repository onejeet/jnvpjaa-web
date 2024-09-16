'use client';

import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Breadcrumbs, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';

const Donations = () => {
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
          Donations
        </MuiLink>
      </Breadcrumbs>
      <Box component={Paper} gap={2} pl={2} py={4} my={2} width="100%" display="flex" alignItems="start">
        <Box
          width={{
            xs: '100%',
          }}
          pr={2}
          //   flexDirection={{
          //     xs: 'row',
          //     sm: 'column-reverse',
          //   }}
        >
          <Typography variant="h1" mb={3}>
            Donations
          </Typography>
          {/* <Box display={{ xs: 'block', sm: 'none' }} sx={{ borderRadius: '10px', width: '100%', overflow: 'hidden' }}>
            <img src="/assets/people/principal.webp" width="100%" alt="jnv principal" />
          </Box> */}

          <Typography color="grey.800" mt={2}>
            If no life membership is taken prior to donating through this link, INR 1000 will go towards life membership
            and rest of the amount as a donation.
          </Typography>
          <Typography color="grey.800" fontWeight={600} mt={2}>
            Preferred mode of payment: NEFT or Cheque
          </Typography>
          <Typography color="grey.800" mt={2}>
            JNV Paota Jaipur Alumni Association
          </Typography>
          <Typography color="grey.800" mt={2}>
            Current A/C No.: 36929235852
          </Typography>
          <Typography color="grey.800" mt={2}>
            IFSC: SBIN0031510
          </Typography>
          <Typography color="grey.800" mt={2}>
            Bank: SBI, Tilak Marg, C-Scheme, Jaipur
          </Typography>
        </Box>
        <Box
          display={{ xs: 'none', sm: 'block' }}
          sx={{ borderRadius: '10px', width: 300, height: 400, overflow: 'hidden' }}
        >
          <Image src="/assets/images/donation.webp" width={300} height={400} alt="donations" />
        </Box>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(Donations), {
  ssr: false,
});
