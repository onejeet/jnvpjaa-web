import { OwnerStateThemeType } from '.';

const OutlinedInput = () => {
  return {
    MuiOutlinedInput: {
      defaultProps: {
        disableInjectingGlobalStyles: true,
      },
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          width: '100%',
          padding: '0px 10px',
          '& .MuiOutlinedInput-input': {
            paddingLeft: 0,
            paddingRight: 0,
          },
          '&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[700],
          },
          '&:focus .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
          },
          '&:active .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
          },
        }),
        notchedOutline: ({ theme }: OwnerStateThemeType) => ({
          padding: '0px 0px !important',
          borderColor: theme.palette.grey[400],
          borderRadius: '6px',
        }),
      },
    },
  };
};

export default OutlinedInput;
