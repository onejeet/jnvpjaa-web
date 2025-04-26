import Box from '@mui/material/Box';
import Hero from '@/components/home/Hero';
import SloganBanner from '@/components/home/SloganBanner';
import FeaturedBlogs from './components/FeaturedBlogs';
import MetricsNumbers from './components/MetricsNumbers';
import DynamicImageSlider from './components/DynamicImageSlider';
import DynamicBirthdaySlider from './components/DynamicBirthdaySlider';

const Home = () => {
  return (
    <Box bgcolor="grey.100">
      <Hero />
      <SloganBanner />
      <MetricsNumbers />
      {/* <UpcomingEvents /> */}
      <DynamicImageSlider />
      <FeaturedBlogs />
      <DynamicBirthdaySlider />
    </Box>
  );
};

export default Home;
