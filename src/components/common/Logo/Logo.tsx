import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';
import { brand } from '@/config/tenant';

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
            src={brand.logo.full}
            width={width || 390}
            height={height || 60}
            alt={`${brand.shortName} logo`}
            priority={priority}
          />
        );
      case 'icon':
        return (
          <Image
            src={brand.logo.square}
            width={width || 40}
            height={height || 40}
            alt={`${brand.shortName} logo`}
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
