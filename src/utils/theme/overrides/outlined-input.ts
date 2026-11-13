import { OwnerStateThemeType } from '.';
import { CONTROL_HEIGHT } from '../controlSizes';

const OutlinedInput = () => ({
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme, ownerState }: OwnerStateThemeType) => ({
        borderRadius: theme.shape.borderRadius,
        minHeight: ownerState.size === 'small' ? CONTROL_HEIGHT.small : CONTROL_HEIGHT.medium,
        ...(!ownerState.multiline && {
          '& .MuiOutlinedInput-input': {
            paddingTop: ownerState.size === 'small' ? 8 : 10,
            paddingBottom: ownerState.size === 'small' ? 8 : 10,
          },
        }),
      }),
    },
  },
});

export default OutlinedInput;
