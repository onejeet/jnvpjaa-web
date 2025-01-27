import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
  icon?: boolean;
  type?: 'regular';
  priority?: boolean;
}

const Logo: React.FC<Props> = ({ width, height, icon, type, priority = false }) => {
  const getLogo = () => {
    switch (type) {
      case 'regular':
        return (
          <Image
            src="/assets/branding/logo-full.webp"
            width={width || 390}
            height={height || 60}
            alt="JNVPJAA logo"
            priority={priority}
          />
        );
    }
  };

  return (
    <Box display="flex" maxWidth="100%">
      <Image
        src="/assets/branding/logo-full.webp"
        width={width || 390}
        height={height || 60}
        alt="JNVPJAA logo"
        priority={priority}
      />
    </Box>
  );
};

export default React.memo(Logo);
