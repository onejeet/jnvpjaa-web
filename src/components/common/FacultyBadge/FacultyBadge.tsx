import { Tooltip } from '@mui/material';
import { StarFour } from '@phosphor-icons/react';
import Image from 'next/image';

interface Props {
  size?: number;
}

const FacultyBadge: React.FC<Props> = ({ size }) => {
  return (
    <Tooltip title="Faculty of JNV Paota" arrow placement="top">
      <StarFour size={size || 16} weight="fill" fill="#F2C6A0" style={{ marginLeft: '4px' }} />
    </Tooltip>
  );
};

export default FacultyBadge;
