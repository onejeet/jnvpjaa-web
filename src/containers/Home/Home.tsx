import Box from '@mui/material/Box';

import LayoutModule from '@/components/common/Layout';
import Hero from '@/components/home/Hero';

const Home = () => {
  return (
    <LayoutModule title="JNVPJAA • Alumni Network of Jawahar Navodaya Vidyalaya, Paota, Jaipur">
      {/* <Box fontSize={50} py={10} color="grey.600" width="100%" textAlign="center">
        Coming Soon
      </Box> */}
      <Hero />
    </LayoutModule>
  );
};

export default Home;
