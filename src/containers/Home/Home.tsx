import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Hero from '@/components/home/Hero';
import SloganBanner from '@/components/home/SloganBanner';
import UpcomingEvents from './components/UpcomingEvents';
import RecentBlogs from './components/RecentBlogs';
import BirthdaySlider from './components/BirthdaySlider';
import MetricsNumbers from './components/MetricsNumbers';

const Home = () => {
  return (
    <Box bgcolor="grey.100">
      <Hero />
      <SloganBanner />
      <MetricsNumbers />
      {/* <UpcomingEvents /> */}
      <RecentBlogs />
      <BirthdaySlider />
    </Box>
  );
};

export default Home;
