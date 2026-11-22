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
import type { ReactNode } from 'react';
import { isEnabled } from '@/config/features';

/** Sections shared with the landing layouts, rendered by the caller so this file stays free of landing data. */
type Slots = { story?: ReactNode; celebrating?: ReactNode; members?: ReactNode; faq?: ReactNode };

const Home = ({ news, slots = {} }: { news?: NewsPost[]; slots?: Slots }) => {
  return (
    <Box bgcolor="grey.100">
      <Hero />
      <SloganBanner />
      <MetricsNumbers />
      {slots.story}
      {isEnabled('newsroom') && <LatestNews posts={news} />}
      {/* <UpcomingEvents /> */}
      <ImageSlider />
      {isEnabled('blog') && <FeaturedBlogs />}
      {slots.celebrating}
      <BirthdaySlider />
      {slots.members ?? <RecentMembersSlider />}
      {slots.faq}
    </Box>
  );
};

export default Home;
