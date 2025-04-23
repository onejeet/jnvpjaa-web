import { SvgIcon, SvgIconProps } from '@mui/material';
import * as React from 'react';
import { SVGProps, Ref, forwardRef, memo } from 'react';

const CrossOutlinedIcon = (props: SvgIconProps) => {
  const { sx, ...other } = props;

  return (
    <SvgIcon
      width={18}
      height={18}
      fill="none"
      viewBox="0 0 18 17"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      sx={{ ...sx }}
      {...other}
    >
      <path
        fill="currentColor"
        d="M3.933 3.927a.625.625 0 0 1 .884 0l4.558 4.558 4.558-4.558a.625.625 0 1 1 .884.884l-4.558 4.558 4.558 4.558a.625.625 0 0 1-.884.884l-4.558-4.558-4.558 4.558a.625.625 0 1 1-.884-.884l4.558-4.558L3.933 4.81a.625.625 0 0 1 0-.884Z"
      />
    </SvgIcon>
  );
};
const ForwardRef = forwardRef(CrossOutlinedIcon);
const CrossOutlined = memo(ForwardRef);
export default CrossOutlined;
