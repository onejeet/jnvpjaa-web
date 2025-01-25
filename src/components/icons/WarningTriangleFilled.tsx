import { SvgIcon, SvgIconProps } from '@mui/material';
import * as React from 'react';
import { SVGProps, Ref, forwardRef, memo } from 'react';

const WarningTriangleFilledIcon = (props: SvgIconProps) => {
  const { sx, ...other } = props;

  return (
    <SvgIcon
      width={18}
      height={19}
      fill="none"
      viewBox="0 0 18 19"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      sx={{ ...sx }}
      {...other}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.573 2.279c.76.303 1.364.937 1.982 1.825.616.885 1.301 2.109 2.187 3.69l.031.057c.851 1.52 1.51 2.696 1.929 3.65.42.958.638 1.78.513 2.57a4.237 4.237 0 0 1-1.563 2.666c-.628.495-1.452.706-2.493.808-1.036.101-2.385.101-4.127.101h-.064c-1.742 0-3.09 0-4.127-.101-1.041-.102-1.865-.313-2.493-.808A4.237 4.237 0 0 1 .785 14.07c-.125-.79.094-1.61.513-2.569.419-.954 1.078-2.13 1.929-3.65l.031-.057c.886-1.581 1.571-2.805 2.187-3.69.618-.888 1.222-1.522 1.982-1.825a4.237 4.237 0 0 1 3.146 0Zm-1.02 5.235a.553.553 0 0 0-1.106 0v2.948a.553.553 0 0 0 1.106 0V7.514Zm.184 5.158a.737.737 0 1 0-1.474 0 .737.737 0 0 0 1.474 0Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
};
const ForwardRef = forwardRef(WarningTriangleFilledIcon);
const WarningTriangleFilled = memo(ForwardRef);
export default WarningTriangleFilled;
