import React, { useEffect, useRef, useCallback } from 'react';
import Confetti from 'react-canvas-confetti';

const CelebratonConfetti: React.FC = () => {
  const refAnimationInstance = useRef<((options?: any) => void) | null>(null);
  const duration = 5000; // 5 seconds

  const getInstance = useCallback((instance: ((options?: any) => void) | null) => {
    refAnimationInstance.current = instance;
  }, []);

  const fire = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current({
        particleCount: 50,
        spread: 60,
        startVelocity: 30,
        decay: 0.9,
        scalar: 1.2,
        origin: { y: 0.6 },
      });
    }
  }, []);

  useEffect(() => {
    const endTime = Date.now() + duration;
    const interval = setInterval(() => {
      if (Date.now() > endTime) {
        clearInterval(interval);
      } else {
        fire();
      }
    }, 250);

    return () => clearInterval(interval);
  }, [fire]);

  return <Confetti refConfetti={getInstance} />;
};

export default CelebratonConfetti;
