import { Tooltip } from '@mui/material';
import Image from 'next/image';

interface Props {
  size?: number;
}

const VerifiedBadge: React.FC<Props> = ({ size }) => {
  return (
    <Tooltip title="User is verified by the admin." arrow placement="top">
      <Image src="/assets/svg/verified.svg" width={size || 16} height={size || 16} alt="verified user" />
    </Tooltip>
  );
};

export default VerifiedBadge;
