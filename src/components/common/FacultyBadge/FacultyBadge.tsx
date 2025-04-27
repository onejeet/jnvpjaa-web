'use client';

import React from 'react';
import { Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { IconCircleDottedLetterF, IconStar } from '@tabler/icons-react';

interface Props {
  size?: number;
}

const FacultyBadge: React.FC<Props> = ({ size }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const finalSize = React.useMemo(() => {
    if (isMobile) {
      return (2 / 3) * (size || 24);
    }
    return size || 20;
  }, [size, isMobile]);
  return (
    <Tooltip title="Faculty of JNV Paota, Jaipur" arrow placement="top">
      <IconCircleDottedLetterF size={finalSize} fill="#F2C6A0" style={{ marginLeft: '4px' }} />
    </Tooltip>
  );
};

export default FacultyBadge;
