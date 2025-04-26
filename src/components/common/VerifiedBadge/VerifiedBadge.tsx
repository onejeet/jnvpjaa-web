import { Box, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { IconLock as LockSimple } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  size?: number;
  isPrivate?: boolean;
  handlePrivateInfo?: () => void;
  title?: string;
  isPrivateInfoChangeAllowed?: boolean;
}

const VerifiedBadge: React.FC<Props> = ({ size, title, isPrivate, isPrivateInfoChangeAllowed, handlePrivateInfo }) => {
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
      <Tooltip title={title || 'Verified by admin'} arrow placement="top">
        <Image
          src="https://assets.jnvpjaa.org/svg/verified.svg"
          width={finalSize}
          height={finalSize}
          alt="verified user"
        />
      </Tooltip>
      {isPrivate && (
        <Tooltip
          title={`Your data is completely private and inaccessible to anyone else. ${handlePrivateInfo && isPrivateInfoChangeAllowed ? 'Click to change the data privacy.' : ''}`}
          arrow
          placement="top"
        >
          <LockSimple
            size={size || 16}
            style={{ cursor: handlePrivateInfo && isPrivateInfoChangeAllowed ? 'pointer' : 'default' }}
            onClick={isPrivateInfoChangeAllowed ? () => handlePrivateInfo?.() : undefined}
          />
        </Tooltip>
      )}
    </Box>
  );
};

export default VerifiedBadge;
