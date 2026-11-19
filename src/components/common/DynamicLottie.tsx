'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';

// Dynamically import the Lottie component with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false, // This prevents server-side rendering
  loading: () => (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
      <CircularProgress size={24} />
    </Box>
  ),
});

// Export the dynamic component
export default Lottie;

type LazyLottieProps = Omit<React.ComponentProps<typeof Lottie>, 'animationData'> & {
  /** A module-level `() => import('@/utils/lottie/x.json')`, so the JSON is fetched only when this renders. */
  animation: () => Promise<{ default: unknown }>;
};

/** Lottie whose animation JSON stays out of the bundle of every page that merely imports a dialog using it. */
export function LazyLottie({ animation, style, className, ...props }: LazyLottieProps) {
  const [data, setData] = React.useState<unknown>(null);
  React.useEffect(() => {
    let live = true;
    animation()
      .then((m) => live && setData(m.default))
      .catch(() => undefined); // An animation that fails to load just stays blank.
    return () => {
      live = false;
    };
  }, [animation]);
  // The box keeps its size while the JSON and the player load, so the dialog around it does not jump.
  return (
    <div style={style} className={className}>
      {data ? <Lottie animationData={data} {...props} style={{ width: '100%', height: '100%' }} /> : null}
    </div>
  );
}
