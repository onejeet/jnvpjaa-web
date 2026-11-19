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
import RecentMembersSlider from './components/RecentMembersSlider';
import ImageSlider from './components/ImageSlider';
import { isEnabled } from '@/config/features';

const Home = ({ news }: { news?: NewsPost[] }) => {
  return (
    <Box bgcolor="grey.100">
      <Hero />
      <SloganBanner />
      <MetricsNumbers />
      {isEnabled('newsroom') && <LatestNews posts={news} />}
      {/* <UpcomingEvents /> */}
      <ImageSlider />
      {isEnabled('blog') && <FeaturedBlogs />}
      <BirthdaySlider />
      <RecentMembersSlider />
    </Box>
  );
};

export default Home;
