import { OwnerStateThemeType } from '.';

const InputBase = () => {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme, ownerState }: OwnerStateThemeType) => ({
          height: '36px', // Set the height of the input field
        }),
        // input: {
        //   padding: '6px 0', // Adjust padding inside the input field
        //   // lineHeight: '1.2',
        // },
        // input: {
        //   alignItems: 'center',
        //   alignSelf: 'stretch',
        //   display: 'inline-flex !important', // Fix flicker
        // },
      },
      sizeMedium: {
        height: '40px', // Set your preferred height
      },
      sizeSmall: {
        height: '30px', // Set your preferred height
      },
    },
  };
};

export default InputBase;
