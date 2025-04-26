import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';

import Breadcrumbs from '@/components/common/Breadcrumbs';

const breadcrumbsList = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: ' Donations',
  },
];

const Donations = () => {
  return (
    <Box>
      <Breadcrumbs items={breadcrumbsList} />
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
          <Typography variant="h1" mb={1}>
            Donations
          </Typography>
          <Typography color="grey.800" mb={3}>
            Hey there! If you’d like to give back and help our alumni network grow, this is the place to do it. Your
            support helps us organize events, fund community initiatives, and keep the spirit alive. Every little bit
            counts, and we truly appreciate it! Thanks for being a part of this journey! 🙌
          </Typography>
          {/* <Box display={{ xs: 'block', sm: 'none' }} sx={{ borderRadius: '10px', width: '100%', overflow: 'hidden' }}>
            <img src="https://assets.jnvpjaa.org/assets/people/principal.webp" width="100%" alt="jnv principal" />
          </Box> */}

          <Typography color="grey.800" mt={2}>
            If no life membership is taken prior to donating through this link, ₹1,000 will go towards life membership
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
          <Image
            src="https://assets.jnvpjaa.org/assets/images/donation.webp"
            width={300}
            height={400}
            alt="donations"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Donations;
