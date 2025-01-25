import * as React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo, forwardRef } from 'react';

const CircleCheckFilledIcon = (props: SvgIconProps) => {
  const { sx, ...other } = props;

  return (
    <SvgIcon
      width={18}
      height={17}
      fill="none"
      viewBox="0 0 18 17"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      sx={{ ...sx }}
      {...other}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9 .238a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm3.477 5.54a.576.576 0 0 1 0 .814L8.64 10.43a.576.576 0 0 1-.814 0L6.29 8.895a.576.576 0 0 1 .814-.814l1.128 1.128 3.43-3.43a.576.576 0 0 1 .814 0Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
};

const ForwardRef = forwardRef(CircleCheckFilledIcon);
const CircleCheckFilled = memo(ForwardRef);
export default CircleCheckFilled;
