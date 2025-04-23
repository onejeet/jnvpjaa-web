// ** Type Import
import { OwnerStateThemeType } from '.';

const FormLabel = () => {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme, ownerState }: OwnerStateThemeType) => ({}),
      },
    },
  };
};

export default FormLabel;
