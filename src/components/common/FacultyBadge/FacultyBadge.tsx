import { Tooltip } from '@mui/material';
import { IconStar } from '@tabler/icons-react';
import Image from 'next/image';

interface Props {
  size?: number;
}

const FacultyBadge: React.FC<Props> = ({ size }) => {
  return (
    <Tooltip title="Faculty of JNV Paota, Jaipur" arrow placement="top">
      <IconStar size={size || 16} fill="#F2C6A0" style={{ marginLeft: '4px' }} />
    </Tooltip>
  );
};

export default FacultyBadge;
