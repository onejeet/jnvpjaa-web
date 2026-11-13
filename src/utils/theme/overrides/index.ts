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
import MuiInputLabel from './input-label';
import MuiMenu from './menu';
import MuiMenuItem from './menu-item';
import MuiOutlinedInput from './outlined-input';
import MuiPaper from './paper';
import MuiPopover from './popover';
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
  const inputLabel = MuiInputLabel();
  const menuItem = MuiMenuItem();
  const menu = MuiMenu(mode);
  const outlinedInput = MuiOutlinedInput();
  const paper = MuiPaper();
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
    inputLabel,
    menuItem,
    menu,
    outlinedInput,
    paper,
    slider,
    tooltip,
    tablePagination,
    darkModeOnlyItems
  );
};

export default Overrides;
