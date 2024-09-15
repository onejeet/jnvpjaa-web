// import EmblaCarousel from '@/components/common/EmblaCarousel/EmblaCarousel';
import EastIcon from '@mui/icons-material/East';
import { Box, Divider, Typography } from '@mui/material';

const Hero = () => {
  return (
    <Box width="100%">
      <Box
        width="100%"
        position="relative"
        minHeight={{
          xs: 350,
          sm: 500,
          md: 518,
        }}
        sx={{
          backgroundColor: 'common.black',
          backgroundImage: 'url(/assets/images/cover.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: {
            xs: '100% 100%',
            sm: '100% 100%',
            md: '100% 100%',
          },
        }}
        display="flex"
        justifyContent="center"
        // alignItems="center"
      >
        {/* <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: '0' }}>
          <img src= width="100%" />
        </Box> */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 8 }}
          height="100%"
        >
          <Typography
            variant="h1"
            fontSize={{
              xs: 20,
              sm: 30,
              md: 50,
            }}
            color="grey.300"
            sx={{ fontFamily: 'Playwrite CU', lineHeight: 'normal' }}
          >
            grateful. proud. indebted.
          </Typography>
          {/* <Typography
            mt={14}
            display="flex"
            alignItems="center"
            variant="h1"
            fontSize={40}
            textAlign="center"
            color="grey.300"
            // sx={{ fontFamily: 'Playwrite CU' }}
          >
            JNV Paota Almuni Network
          </Typography> */}
        </Box>
        <Box sx={{ position: 'absolute', bottom: { xs: '-7px', sm: '-10px', md: '16px' } }}>
          <Typography
            display="flex"
            alignItems="center"
            variant="h1"
            fontSize={{
              xs: 25,
              sm: 60,
              md: 100,
            }}
            lineHeight={{
              xs: '30px',
              sm: '60px',
              md: '35px',
            }}
            textAlign="center"
            color="grey.300"
          >
            JNV Paota Almuni Network
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
