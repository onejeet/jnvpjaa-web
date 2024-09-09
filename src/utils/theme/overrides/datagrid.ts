// ** Type Import
import { OwnerStateThemeType } from '.';

const DataGrid = () => {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme, ownerState }: OwnerStateThemeType) => ({
          '& .MuiDataGrid-pinnedColumnHeaders': {
            background: theme.palette.background.default,
          },
          '& .MuiDataGrid-pinnedColumns': {
            background: theme.palette.background.default,
          },
          '& .MuiDataGrid-cell': {
            borderBottomColor: theme.palette.grey[300],
          },
          '& .MuiDataGrid-row.Mui-hovered': {
            background: theme.palette.grey[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottomColor: theme.palette.grey[300],
          },
        }),
      },
    },
  };
};

export default DataGrid;
