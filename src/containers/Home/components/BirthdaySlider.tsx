import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import { useUpcomingBirthdaysQuery } from '@/apollo/hooks';
import React from 'react';
import ProfilePicture from '@/components/common/ProfilePicture';
import dayjs from 'dayjs';

export default function BirthdaySlider() {
  const { data, loading } = useUpcomingBirthdaysQuery();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const listData = React.useMemo(() => {
    if (loading) {
      return new Array(10).fill({ id: '', title: '', description: '', startDate: '', medium: 'Online', online: false });
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
        px={{ xs: 2, md: 4 }}
      >
        <Typography variant="h1" lineHeight="normal" fontSize={{ xs: '24px', sm: '32px', md: '40px' }}>
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
        }}
      >
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={0}
          slidesPerView="auto"
          loop={true}
          freeMode={true}
          speed={5000}
          autoplay={{ delay: 5, disableOnInteraction: false }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {listData.map((user, index) => (
            <SwiperSlide key={`birthday-slider-${index}`} style={{ width: 'auto', minWidth: '120px' }}>
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <ProfilePicture
                  src={user.profileImage}
                  id={user?.id}
                  loading={!user?.id}
                  alt={`${user?.firstName || ''} ${user?.lastName || ''}`}
                  size={isMobile ? 60 : 100}
                />

                <Typography variant="body2" mt={1}>{`${user?.firstName || ''} ${user?.lastName || ''}`}</Typography>
                {user.dob && (
                  <Typography variant="body2" fontWeight={700} color="text.secondary">
                    {dayjs(user.dob).format('MMM DD')}
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
