'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box } from '@mui/material';
import Image from 'next/image';
import SpecialTitle from '@/components/common/SpecialTitle';
import { assetUrl, content } from '@/config/tenant';

// Asset paths, one per line, from tenants/<id>/content.json; a tenant without them shows no slider.
const localSlides = (content['home.sliderImages'] || '')
  .split('\n')
  .filter(Boolean)
  .map((path) => ({ url: assetUrl(path) }));

const swiperBreakpoints = {
  // when window width is >= 0px (mobile)
  0: {
    slidesPerView: 1,
    spaceBetween: 10,
    slidesPerGroup: 1,
    speed: 1500,
  },
  // when window width is >= 768px (tablet and up)
  768: {
    slidesPerView: 2,
    spaceBetween: 15,
    slidesPerGroup: 2,
    speed: 2000,
  },
  // when window width is >= 1024px (desktop)
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    speed: 3000,
  },
};

const ImageSlider: React.FC = () => {
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

  if (!localSlides.length) return null;

  return (
    <Box
      width="100%"
      textAlign="center"
      px={2}
      py={{ xs: 4, md: 6 }}
      ref={swiperRef}
      bgcolor="primary.50"
      overflow="hidden"
    >
      <Box width="100%" display="flex" justifyContent="center">
        <SpecialTitle title="Timeless Moments" containerProps={{ mb: { xs: 5, md: 8 } }} />
      </Box>
      <Swiper
        key={autoplay ? 'image-swiper-1' : 'image-swiper-2'}
        modules={[Navigation, Autoplay]}
        // spaceBetween={30}
        // slidesPerView={2}
        navigation
        breakpoints={swiperBreakpoints}
        // pagination={{ clickable: true }}
        // speed={3000}
        autoplay={autoplay ? { delay: 4000, disableOnInteraction: true } : false}
        loop
      >
        {localSlides?.map((slide, idx) => (
          <SwiperSlide key={`${slide.url}-${idx}`}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                borderRadius: 10,
                height: 300,
              }}
            >
              <Image
                src={slide.url}
                alt={`slide-${idx}`}
                fill
                referrerPolicy="no-referrer"
                loading={idx > 7 ? undefined : 'lazy'}
                sizes="100vw"
                style={{ borderRadius: 10, objectFit: 'cover' }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default React.memo(ImageSlider);
