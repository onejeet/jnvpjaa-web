import { ButtonProps } from '@/components/core/Button/Button.types';
import { BoxProps, TooltipProps, TypographyProps } from '@mui/material';

export interface IProps {
  content: string;
  disabled?: boolean;
  buttonType: 'icon' | 'button';
  tooltipProps?: Partial<TooltipProps>;
  copiedMessageProps?: TypographyProps & {
    message?: string;
    placement?: 'top' | 'bottom' | 'right' | 'left';
    hide?: boolean;
  };
  containerProps?: Partial<BoxProps>;
  buttonProps?: Partial<ButtonProps>;
}
