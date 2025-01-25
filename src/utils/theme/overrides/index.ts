// ** MUI Imports
import { ComponentsPropsList, PaletteMode } from '@mui/material';
import { Theme } from '@mui/material/styles';

// ** Overrides Imports
import MuiButton from './button';
import MuiButtonBase from './button-base';
import MuiButtonDarkMode from './buttonDarkMode';
import MuiChip from './chip';
import MuiCssBaseline from './css-baseline';
import MuiDataGrid from './datagrid';
import MuiDialog from './dialog';
import MuiIconButton from './icon-button';
import MuiInputBase from './input-base';
import MuiFormLabel from './form-label';
import MuiMenu from './menu';
import MuiMenuItem from './menu-item';
import MuiOutlinedInput from './outlined-input';
import MuiPaper from './paper';
import MuiPopover from './popover';
import MuiSelect from './select';
import MuiSlider from './slider';
import MuiSwitch from './switch';
import MuiTablePagination from './tablePagination';
import MuiTooltip from './tooltip';

export type OwnerStateThemeType = {
  theme: Theme;
  ownerState: ComponentsPropsList[keyof ComponentsPropsList] & Record<string, unknown>;
};

const Overrides = (mode: PaletteMode) => {
  const button = MuiButton();
  const buttonBase = MuiButtonBase();
  const chip = MuiChip();
  const cssBaseline = MuiCssBaseline(mode);
  const iconButton = MuiIconButton();
  const inputBase = MuiInputBase();
  const formLabel = MuiFormLabel();
  const menuItem = MuiMenuItem();
  const menu = MuiMenu(mode);
  const outlinedInput = MuiOutlinedInput();
  const paper = MuiPaper();
  const select = MuiSelect();
  const slider = MuiSlider();
  const tooltip = MuiTooltip();
  const tablePagination = MuiTablePagination();

  const datagrid = MuiDataGrid();
  const dialog = MuiDialog();
  const popover = MuiPopover();
  const muiSwitch = MuiSwitch();
  const buttonDarkMode = MuiButtonDarkMode();

  // only for dark mode
  const darkModeOnlyItems = mode === 'dark' ? Object.assign(datagrid, dialog, popover, muiSwitch, buttonDarkMode) : {};

  return Object.assign(
    buttonBase,
    button,
    chip,
    cssBaseline,
    iconButton,
    inputBase,
    formLabel,
    menuItem,
    menu,
    outlinedInput,
    paper,
    select,
    slider,
    tooltip,
    tablePagination,
    darkModeOnlyItems
  );
};

export default Overrides;
