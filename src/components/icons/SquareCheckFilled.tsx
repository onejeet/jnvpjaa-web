import * as React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo, forwardRef } from 'react';

const SquareCheckFilledIcon = (props: SvgIconProps) => {
  const { sx, ...other } = props;

  return (
    <SvgIcon
      width={32}
      height={32}
      fill="none"
      viewBox="0 0 34 34"
      xmlns="http://www.w3.org/2000/svg"
      //   preserveAspectRatio="xMidYMid meet"
      sx={{ ...sx }}
      {...other}
    >
      <rect
        y="-0.00616455"
        width="32"
        height="32"
        rx="7"
        //   fill="#CCF7EC"
        fill="currentColor"
        fillOpacity={0.2}
      />
      <path
        d="M24.1017 9.51493C24.3925 9.7815 24.4122 10.2333 24.1456 10.5241L13.6694 21.9527C13.5378 22.0963 13.3532 22.1799 13.1584 22.1842C12.9636 22.1884 12.7756 22.1129 12.6378 21.9751L7.8759 17.2132C7.59695 16.9343 7.59695 16.482 7.8759 16.2031C8.15484 15.9241 8.6071 15.9241 8.88605 16.2031L13.1204 20.4374L23.0925 9.55881C23.3591 9.26801 23.8109 9.24836 24.1017 9.51493Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

const ForwardRef = forwardRef(SquareCheckFilledIcon);
const SquareCheckFilled = memo(ForwardRef);
export default SquareCheckFilled;
