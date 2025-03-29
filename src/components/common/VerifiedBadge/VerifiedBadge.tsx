import { Tooltip, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Props {
  size?: number;
}

const VerifiedBadge: React.FC<Props> = ({ size }) => {
  const isMobile = useMediaQuery('(hover: none)');
  const finalSize = React.useMemo(() => {
    if (isMobile) {
      return (2 / 3) * (size || 16);
    }
    return size || 16;
  }, [size, isMobile]);
  return (
    <Tooltip title="Verified by admin" arrow placement="top">
      <Image src="/assets/svg/verified.svg" width={finalSize} height={finalSize} alt="verified user" />
    </Tooltip>
  );
};

export default VerifiedBadge;
