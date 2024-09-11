'use client';

import { Breadcrumbs, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';

const BhamashahPillars = () => {
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
          Bhamashah Pillars
        </MuiLink>
      </Breadcrumbs>
      <Box component={Paper} p={2} my={2} display="flex" alignItems="center">
        <Box>
          <Typography variant="h1" mb={3}>
            Bhamashah Pillars
          </Typography>
          <Box
            display={{ xs: 'block', sm: 'block' }}
            sx={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '400px', overflow: 'hidden' }}
          >
            <img
              src="/assets/images/star-contributors.jpg"
              width="100%"
              alt="mission"
              style={{ objectFit: 'contain', position: 'relative', top: '0px' }}
            />
          </Box>
          <Typography color="grey.800" mt={2}>
            {`JNVPJAA is an alumni association of ex-students who once studied at the cherished Jawahar Navodaya
            Vidyalaya, Paota, Jaipur. The school, tucked away in the Paota village of Rajasthan's Jaipur district, is
            among several hundred JNVs conceptualized, funded and managed by Navodaya Vidyalaya Samiti, a
            semi-autonomous body under the aegis of federal government's Ministry of Human Resource Development. The
            JNVs, one mandated for each district, are wonderful examples of state sponsorship of fully-residential
            quality education at an unprecedented scale.`}
          </Typography>
          <Typography color="grey.800" mt={2}>
            {`Ex-students who hail normally from one district have now gone places, both literally and figuratively. The
            alumni had a burning desire to re-engage with their batch-mates, seniors and juniors but did not have a
            platform. The efforts were largely individualistic & therefore sub-optimal. This institutional void led to
            the genesis of the current alumni association which will anchor all alumni-related activities of JNV Paota,
            Jaipur. Formation of alumni association feels like building a home for our family members. We, the alumni,
            hope to re-kindle the same spirit of camaraderie that we used to bubble within our hostel days of the yore!`}
          </Typography>

          <Typography color="grey.800" variant="h2" mt={3} mb={2}>
            Logo Symbolism
          </Typography>
          <Box display="flex" flexDirection={{ xs: 'column-reverse', md: 'row' }} gap={2}>
            <Typography color="grey.800">
              {`Ring of alumni with different colours holding each other's shoulders: We, the alumni of JNV Paota, Jaipur,
              despite being from different socio-cultural background, different castes and religions were together, are
              together and will be together forever supporting each other. Spikes of wheat (symbol of prosperity): We,
              the alumni of JNV Paota, Jaipur, will work together for prosperity of the society, in general, and of our
              association, in particular. Book with light flame: We, the alumni of JNV Paota, Jaipur, will work for the
              enlightenment of the society with our wisdom and knowledge. Hence, the motto:`}
            </Typography>
            <img src="/favicon.png" width={100} height={100} alt="logo" />
          </Box>
          <Typography
            mt={2}
            fontSize={24}
            fontWeight={500}
            textAlign="center"
            sx={{
              border: '1px solid',
              borderColor: 'grey.400',
              borderRadius: '4px',
              p: '16px 10px',
              //   width: 'fit-content',
            }}
            color="primary.main"
          >
            नभ: स्पृशं दीप्तम् (touching the skies with glory)
            <br />
            <Box
              color="grey.800"
              component="span"
              fontSize="16px"
              fontWeight={400}
              sx={{ display: 'block', mt: 2, fontStyle: 'italic' }}
            >
              The ultimate aim of association is to lead the society with glory.
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(BhamashahPillars), {
  ssr: false,
});
