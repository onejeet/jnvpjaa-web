import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import { useUpcomingBirthdaysQuery } from '@/apollo/hooks';
import React from 'react';
import ProfilePicture from '@/components/common/ProfilePicture';
import { paths } from '@/config/paths';
import { useRouter } from 'next/router';

export default function BirthdaySlider() {
  const { data, loading } = useUpcomingBirthdaysQuery();
  const theme = useTheme();
  const router = useRouter();

  const [autoplay, setAutoplay] = React.useState(false);
  const swiperRef = React.useRef<any>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAutoplay(entry.isIntersecting); // Enable autoplay when in view
      },
      { threshold: 0.5 } // Trigger when 50% of Swiper is visible
    );

    if (swiperRef.current) {
      observer.observe(swiperRef.current);
    }

    return () => {
      if (swiperRef.current) observer.unobserve(swiperRef.current);
    };
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const listData = React.useMemo(() => {
    if (loading) {
      return new Array(15).fill({ id: '', title: '', description: '', startDate: '', medium: 'Online', online: false });
    }
    return data?.upcomingBirthdays || [];
  }, [loading, data]);

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="row"
      justifyContent="start"
      alignItems="stretch"
      //   my={{
      //     xs: 4,
      //     md: 5,
      //   }}
      height={{
        xs: 150,
        md: 200,
      }}
      sx={{ maxWidth: '100%', margin: 'auto', textAlign: 'center' }}
    >
      <Box
        display="flex"
        alignItems="center"
        bgcolor="grey.800"
        color="common.white"
        height="100%"
        minWidth="30%"
        px={{ xs: 1, sm: 2, md: 4 }}
      >
        <Typography variant="h1" lineHeight="normal" fontSize={{ xs: '18px', sm: '28px', md: '40px' }}>
          Upcoming Birthdays
        </Typography>
      </Box>
      {/* <SpecialTitle title="Upcoming Birthdays 🎉 " /> */}
      <div
        style={{
          // marginTop: '30px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'grey.800',
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}
        ref={swiperRef}
      >
        <Swiper
          key={autoplay ? 'swiper-1' : 'swiper-2'}
          modules={[Autoplay, FreeMode]}
          spaceBetween={0}
          slidesPerView={10}
          slidesPerGroup={3}
          loop={!loading}
          autoplay={autoplay ? { delay: 4000, disableOnInteraction: true } : false}
          freeMode={true}
          speed={2500}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {listData.map((user, index) => (
            <SwiperSlide key={`birthday-slider-${index}`} style={{ width: 'auto', minWidth: '120px' }}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => router.push(paths.profile.getProfileUrl(user?.id))}
              >
                <ProfilePicture
                  src={user.profileImage}
                  id={user?.id}
                  loading={!user?.id}
                  alt={`${user?.firstName || ''} ${user?.lastName || ''}`}
                  size={isMobile ? 70 : 100}
                />

                <Typography variant="body2" mt={1}>{`${user?.firstName || ''} ${user?.lastName || ''}`}</Typography>
                {user.birthday && (
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color={user.birthday === 'Today' ? 'primary.main' : 'text.secondary'}
                  >
                    {user.birthday}
                  </Typography>
                )}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Box>
  );
}
