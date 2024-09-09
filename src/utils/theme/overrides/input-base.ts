// ** Type Import
import { OwnerStateThemeType } from '.';

const InputBase = () => {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme, ownerState }: OwnerStateThemeType) => ({
          height: '36px',
          '& .MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': {
            height: '30px',
            paddingTop: 0,
            paddingBottom: 0,
          },
          '&.Mui-disabled': {
            backgroundColor: `${theme.palette.grey[100]} !important`,
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important',
          },
        }),
        sizeSmall: {
          height: '30px',
        },
      },
    },
  };
};

export default InputBase;
