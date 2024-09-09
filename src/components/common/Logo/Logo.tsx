import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
  icon?: boolean;
  type?: 'regular';
}

const Logo: React.FC<Props> = ({ width, height, icon, type }) => {
  const getLogo = () => {
    switch (type) {
      case 'regular':
        return (
          <Image src="/assets/branding/logo-full.png" width={width || 390} height={height || 60} alt="JNVPJAA logo" />
        );
    }
  };

  return (
    <Box display="flex">
      <Image src="/assets/branding/logo-full.png" width={width || 390} height={height || 60} alt="JNVPJAA logo" />
    </Box>
  );
};

export default React.memo(Logo);
