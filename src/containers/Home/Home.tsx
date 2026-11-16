import Box from '@mui/material/Box';
import Hero from '@/components/home/Hero';
import SloganBanner from '@/components/home/SloganBanner';
import FeaturedBlogs from './components/FeaturedBlogs';
import MetricsNumbers from './components/MetricsNumbers';
import LatestNews from './components/LatestNews';
import type { NewsPost } from '@/apollo/newsroomOperations';
// import DynamicImageSlider from './components/DynamicImageSlider';
// import DynamicBirthdaySlider from './components/DynamicBirthdaySlider';
import BirthdaySlider from './components/BirthdaySlider';
import ImageSlider from './components/ImageSlider';

const Home = ({ news }: { news?: NewsPost[] }) => {
  return (
    <Box bgcolor="grey.100">
      <Hero />
      <SloganBanner />
      <MetricsNumbers />
      <LatestNews posts={news} />
      {/* <UpcomingEvents /> */}
      <ImageSlider />
      <FeaturedBlogs />
      <BirthdaySlider />
    </Box>
  );
};

export default Home;
