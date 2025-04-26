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
            <img src="https://assets.jnvpjaa.org/assets/people/principal.webp" width="100%" alt="jnv principal" />
          </Box>
          {/* <Typography color="grey.800" fontWeight={600} display="flex">
            Embracing Unity, Striving for Excellence
            <FormatQuoteIcon sx={{ fontSize: '32px', color: 'grey.500', position: 'relative', top: '-10px' }} />
          </Typography> */}
          <Typography color="grey.800" mt={2}>
            It is with great pride that I extend my best wishes to the Jawahar Navodaya Vidyalaya Paota Jaipur Alumni
            Association (JNVPJAA). Our alumni are a reflection of the values, excellence, and dedication that JNV stands
            for. Your achievements inspire our current students, showing them what is possible with perseverance and
            commitment.
          </Typography>
          <Typography color="grey.800" mt={2}>
            JNVPJAA serves as a valuable platform for mentorship, guidance, and opportunities, helping students navigate
            their academic and professional journeys. The support and experiences shared by alumni play a crucial role
            in shaping their aspirations and preparing them for the future.
          </Typography>
          <Typography color="grey.800" mt={2}>
            I encourage all alumni to stay connected and contribute to this growing network, fostering a strong and
            supportive community. Together, we can uphold the spirit of Navodaya and make a meaningful impact on
            society.
          </Typography>

          <Typography color="grey.800" variant="h3" fontWeight={600} mt={3}>
            Sunil Dhakar
          </Typography>
          <Typography color="grey.800">Principal, JNV Paota, Jaipur</Typography>
        </Box>
        <Box
          display={{ xs: 'none', sm: 'block' }}
          sx={{ borderRadius: '10px', width: 250, height: 300, overflow: 'hidden' }}
        >
          <Image
            src="https://assets.jnvpjaa.org/assets/people/principal.webp"
            width={250}
            height={300}
            alt="jnv principal"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PrincipalMessage;
