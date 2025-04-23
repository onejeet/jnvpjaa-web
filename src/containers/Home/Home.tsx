import Box from '@mui/material/Box';
import Hero from '@/components/home/Hero';
import SloganBanner from '@/components/home/SloganBanner';
import FeaturedBlogs from './components/FeaturedBlogs';
import BirthdaySlider from './components/BirthdaySlider';
import MetricsNumbers from './components/MetricsNumbers';
import ImageSlider from './components/ImageSlider';

const Home = () => {
  return (
    <Box bgcolor="grey.100">
      <Hero />
      <SloganBanner />
      <MetricsNumbers />
      {/* <UpcomingEvents /> */}
      <ImageSlider />
      <FeaturedBlogs />
      <BirthdaySlider />
    </Box>
  );
};

export default Home;
