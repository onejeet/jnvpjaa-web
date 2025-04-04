'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useTheme } from '@mui/material';

const CelebratonConfetti: React.FC = () => {
  const theme = useTheme();

  useEffect(() => {
    let count = 0;
    const maxCount = 3;

    const interval = setInterval(() => {
      if (count >= maxCount) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 1000,
        spread: 120,
        shapes: ['star', 'square', 'circle'],
        scalar: 1,
        origin: { y: 0.6 },
        zIndex: theme.zIndex.appBar + 1,
      });

      count++;
    }, 1000); // interval in ms (0.8s between bursts)

    return () => clearInterval(interval); // clean up if component unmounts
  }, []);

  return null; // This component doesn't render anything
};

export default CelebratonConfetti;
