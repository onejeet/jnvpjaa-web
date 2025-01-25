import { SvgIcon, SvgIconProps } from '@mui/material';
import * as React from 'react';
import { SVGProps, Ref, forwardRef, memo } from 'react';

const AlertBellFilledIcon = (props: SvgIconProps) => {
  const { sx, ...other } = props;

  return (
    <SvgIcon
      width={32}
      height={33}
      fill="none"
      viewBox="0 0 32 33"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      sx={{ ...sx }}
      {...other}
    >
      <rect width={32} height={32} y={0.982} fill="currentColor" fillOpacity={0.4} rx={7} />
      <path
        fill="currentColor"
        d="M13.514 21.307a22.69 22.69 0 0 0 5.345-.003c1.48-.176 2.939-.5 4.353-.967a9.136 9.136 0 0 1-1.838-5.509v-.718a5.198 5.198 0 0 0-10.396 0v.717a9.136 9.136 0 0 1-1.84 5.51 22.313 22.313 0 0 0 4.376.97Zm-5.489-.197a.548.548 0 0 1-.217-.882 8.04 8.04 0 0 0 2.073-5.4v-.718a6.295 6.295 0 0 1 12.59 0v.719a8.04 8.04 0 0 0 2.072 5.4.548.548 0 0 1-.217.881 23.383 23.383 0 0 1-4.753 1.207 3.42 3.42 0 0 1-3.397 3.831 3.422 3.422 0 0 1-3.397-3.832 23.374 23.374 0 0 1-4.754-1.206Zm5.843 1.338a2.325 2.325 0 1 0 4.616 0c-1.535.15-3.081.15-4.616 0Z"
      />
    </SvgIcon>
  );
};
const ForwardRef = forwardRef(AlertBellFilledIcon);
const AlertBellFilled = memo(ForwardRef);
export default AlertBellFilled;
