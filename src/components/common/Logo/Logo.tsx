import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
  icon?: boolean;
  type?: 'regular' | 'icon';
  priority?: boolean;
}

const Logo: React.FC<Props> = ({ width, height, icon, type = 'regular', priority = false }) => {
  const LogoComp = React.useMemo(() => {
    switch (type) {
      case 'regular':
        return (
          <Image
            src="https://assets.jnvpjaa.org/branding/logo-full.webp"
            width={width || 390}
            height={height || 60}
            alt="JNVPJAA logo"
            priority={priority}
          />
        );
      case 'icon':
        return (
          <Image
            src="https://assets.jnvpjaa.org/branding/logo-square-white_transparent.webp"
            width={40}
            height={40}
            alt="JNVPJAA logo"
            priority={priority}
          />
        );
    }
  }, [type, width, height, priority]);

  return (
    <Box display="flex" maxWidth="100%" overflow="hidden">
      {LogoComp}
    </Box>
  );
};

export default React.memo(Logo);
