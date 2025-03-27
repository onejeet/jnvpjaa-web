import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Hero from '@/components/home/Hero';
import SloganBanner from '@/components/home/SloganBanner';
import UpcomingEvents from './components/UpcomingEvents';
import RecentBlogs from './components/RecentBlogs';
import BirthdaySlider from './components/BirthdaySlider';

const Home = () => {
  return (
    <Box bgcolor="grey.100">
      <Hero />
      <SloganBanner />
      {/* <UpcomingEvents /> */}
      <RecentBlogs />
      <BirthdaySlider />
    </Box>
  );
};

export default Home;
