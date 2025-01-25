// ** Type Import
import { OwnerStateThemeType } from '.';

const InputBase = () => {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme, ownerState }: OwnerStateThemeType) => ({
          // height: '40px',
          // paddingTop: '8px',
          height: '40px', // Set your preferred height
          '& .MuiOutlinedInput-input': {
            padding: '6px 4px', // Control inner input padding
          },
          '&.Mui-disabled': {
            backgroundColor: `${theme.palette.grey[100]} !important`,
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important',
          },
        }),
        input: {
          alignItems: 'center',
          alignSelf: 'stretch',
          display: 'inline-flex !important', // Fix flicker
        },
      },
    },
  };
};

export default InputBase;
