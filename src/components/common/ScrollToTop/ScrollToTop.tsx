'use client';

import { useEffect, useState } from 'react';
import { Fab, Zoom } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconArrowUp } from '@tabler/icons-react';

interface ScrollToTopProps {
  threshold?: number; // pixels from top to trigger visibility
}

const ScrollTopFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: `calc(${theme.spacing(14)} + env(safe-area-inset-bottom, 0px))`,
  right: `max(${theme.spacing(4)}, env(safe-area-inset-right, 0px))`,
  zIndex: 1000,
  [theme.breakpoints.down('sm')]: {
    bottom: `calc(${theme.spacing(11)} + env(safe-area-inset-bottom, 0px))`,
    right: `max(${theme.spacing(2)}, env(safe-area-inset-right, 0px))`,
  },
}));

const ScrollToTop: React.FC<ScrollToTopProps> = ({ threshold = 300 }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const checkScrollTop = () => {
    setVisible(window.scrollY > threshold);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [threshold]);

  return (
    <Zoom in={visible}>
      <ScrollTopFab color="primary" size="medium" onClick={scrollToTop} aria-label="scroll back to top">
        <IconArrowUp />
      </ScrollTopFab>
    </Zoom>
  );
};

export default ScrollToTop;
