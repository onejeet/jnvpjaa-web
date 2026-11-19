'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import ProfilePicture from '@/components/common/ProfilePicture';
import { paths } from '@/config/paths';
import { RECENT_MEMBERS, type RecentMember } from '@/apollo/memberOperations';

/** Newest members, in the same strip style as Upcoming Birthdays; hidden when there are none. */
const RecentMembersSlider = () => {
  const { data, loading } = useQuery<{ recentMembers: RecentMember[] }>(RECENT_MEMBERS, { variables: { limit: 10 } });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const members = data?.recentMembers || [];
  const list: Partial<RecentMember>[] = loading ? new Array(8).fill({}) : members;

  if (!loading && !members.length) return null;

  return (
    <Box
      component="section"
      aria-label="Recently joined members"
      display="flex"
      alignItems="stretch"
      height={{ xs: 150, md: 200 }}
      sx={{ maxWidth: '100%', textAlign: 'center' }}
    >
      <Box
        display="flex"
        alignItems="center"
        bgcolor="primary.dark"
        color="common.white"
        minWidth="30%"
        px={{ xs: 1, sm: 2, md: 4 }}
      >
        <Typography variant="h1" component="h2" lineHeight="normal" fontSize={{ xs: '18px', sm: '28px', md: '40px' }}>
          Recently Joined
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" width="100%" minWidth={0}>
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          freeMode
          autoplay={loading ? false : { delay: 3000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          speed={1500}
          style={{ width: '100%' }}
        >
          {list.map((m, i) => {
            const name = [m.firstName, m.lastName].filter(Boolean).join(' ');
            const card = (
              <Box display="flex" flexDirection="column" alignItems="center" px={1}>
                <ProfilePicture
                  src={m.profileImage || undefined}
                  id={m.id}
                  loading={!m.id}
                  alt={name}
                  size={isMobile ? 70 : 100}
                  slotProps={{ img: { loading: 'lazy', referrerPolicy: 'no-referrer' } }}
                />
                <Typography variant="body2" mt={1} noWrap maxWidth={isMobile ? 100 : 130}>
                  {name}
                </Typography>
                {m.batch ? (
                  <Typography variant="body2" fontWeight={700} color="text.secondary">
                    Batch {m.batch}
                  </Typography>
                ) : null}
              </Box>
            );
            return (
              <SwiperSlide key={m.id || `recent-member-${i}`} style={{ width: 'auto', minWidth: 120 }}>
                {m.id ? (
                  <Link href={paths.profile.getProfileUrl(m.id)} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default React.memo(RecentMembersSlider);
