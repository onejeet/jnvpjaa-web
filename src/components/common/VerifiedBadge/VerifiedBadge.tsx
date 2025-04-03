import { Box, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { LockSimple } from '@phosphor-icons/react';
import Image from 'next/image';
import React from 'react';

interface Props {
  size?: number;
  isPrivate?: boolean;
  handlePrivateInfo?: () => void;
}

const VerifiedBadge: React.FC<Props> = ({ size, isPrivate, handlePrivateInfo }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const finalSize = React.useMemo(() => {
    if (isMobile) {
      return (2 / 3) * (size || 16);
    }
    return size || 16;
  }, [size, isMobile]);

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <Tooltip title="Verified by admin" arrow placement="top">
        <Image src="/assets/svg/verified.svg" width={finalSize} height={finalSize} alt="verified user" />
      </Tooltip>
      {isPrivate && (
        <Tooltip
          title={`Your data is completely private and inaccessible to anyone else. ${handlePrivateInfo ? 'Click to change the data privacy.' : ''}`}
          arrow
          placement="top"
        >
          <LockSimple
            size={size || 16}
            weight="bold"
            style={{ cursor: handlePrivateInfo ? 'pointer' : 'default' }}
            onClick={() => handlePrivateInfo?.()}
          />
        </Tooltip>
      )}
    </Box>
  );
};

export default VerifiedBadge;
