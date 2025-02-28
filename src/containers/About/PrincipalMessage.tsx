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
    label: 'Message from pricipal',
  },
];

const PrincipalMessage = () => {
  return (
    <Box>
      <Breadcrumbs items={breadcrumbsList} />
      <Box component={Paper} gap={2} px={2} py={4} my={2} width="100%" display="flex" alignItems="center">
        <Box
          width={{
            xs: '100%',
            sm: 'calc(100% - 300px)',
          }}
          //   flexDirection={{
          //     xs: 'row',
          //     sm: 'column-reverse',
          //   }}
        >
          <Typography variant="h1" mb={3}>
            Message from Principal
          </Typography>
          <Box display={{ xs: 'block', sm: 'none' }} sx={{ borderRadius: '10px', width: '100%', overflow: 'hidden' }}>
            <img src="/assets/people/principal.webp" width="100%" alt="jnv principal" />
          </Box>
          {/* <Typography color="grey.800" fontWeight={600} display="flex">
            Embracing Unity, Striving for Excellence
            <FormatQuoteIcon sx={{ fontSize: '32px', color: 'grey.500', position: 'relative', top: '-10px' }} />
          </Typography> */}
          <Typography color="grey.800" mt={2}>
            It is a great moment for me that JNV Paota Jaipur Alumni Association (JNVPJAA) is launching a website. This
            is really the result of hard work, dedication and creativity of all members of alumni association of JNV
            Paota Jaipur. The aim of this website is to avail easy guidance and assistance to budding Navodayans. I hope
            that there will be an exchange of great ideas and thoughts of intellectuals spreaded in different parts of
            India and abroad. I have strong belief that students of coming generations can make the use of technology
            for learning and their academic as well as professional growth.
          </Typography>
          <Typography color="grey.800" mt={2}>
            At this moment, I extend my best wishes to all alumni and users.
          </Typography>

          <Typography color="grey.800" variant="h3" fontWeight={600} mt={3}>
            Sh. Ashwani Kumar Jain
          </Typography>
          <Typography color="grey.800">Principal, JNV Paota, Jaipur</Typography>
        </Box>
        <Box
          display={{ xs: 'none', sm: 'block' }}
          sx={{ borderRadius: '10px', width: 250, height: 300, overflow: 'hidden' }}
        >
          <Image src="/assets/people/principal.webp" width={250} height={300} alt="jnv principal" />
        </Box>
      </Box>
    </Box>
  );
};

export default PrincipalMessage;
