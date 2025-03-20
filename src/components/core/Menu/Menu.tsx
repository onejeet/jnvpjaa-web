import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { default as MuiMenu } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { CaretRight } from '@phosphor-icons/react';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import HoverPopover from '@/components/common/HoverPopover';
import Button from '@/components/core/Button';
import { MenuProps } from './Menu.types';

const Menu: React.FC<MenuProps> = ({ id, items, value, render, disabled, children, onChange, ...restProps }) => {
  const popupState = usePopupState({ variant: 'popover', popupId: id || 'hoverPopover' });

  return (
    <>
      <Box {...bindTrigger(popupState)}>
        {render || (
          <Button
            disabled
            variant="text"
            title="Button"
            onClick={(e: any) => {
              e?.stopPropagaton();
              popupState.open();
            }}
          />
        )}
      </Box>
      {!disabled && (
        <MuiMenu
          id={id as string}
          {...bindMenu(popupState)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          {...restProps}
        >
          {!items || items?.length === 0 ? (
            <Typography color="text.disabled" variant="body2" py={2} px={1}>
              No options available.
            </Typography>
          ) : (
            items?.map(
              (
                {
                  title,
                  label,
                  value: itemValue,
                  subtitle,
                  icon,
                  onClick,
                  sx,
                  titleProps = {},
                  items: subMenuItems,
                  divider,
                  subTitleProps = {},
                  isHeading,
                  ...item
                }: any,
                index: number
              ) =>
                divider ? (
                  <Divider key={`${id}-menu-divider-${index}`} />
                ) : (
                  <MenuItem
                    key={`${id}-menu-item-${index}`}
                    sx={{
                      fontSize: '14px',
                      py: 0.7,
                      justifyContent: 'start',
                      bgcolor: value && value === itemValue ? 'primary.200' : 'transparent',
                      ...(isHeading && {
                        px: 1,
                        pb: 0,
                        pointerEvents: 'none',
                        '&:hover': {
                          background: 'none',
                          cursor: 'default',
                        },
                      }),
                      ...sx,
                    }}
                    onClick={() => {
                      onClick?.();
                      onChange?.(itemValue);
                      popupState.close();
                    }}
                    {...item}
                  >
                    {subMenuItems?.length > 0 ? (
                      <HoverPopover
                        id={`sub-menu-${id}-${title}`}
                        render={
                          <Box display="flex" alignItems="center">
                            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                            <ListItemText
                              primary={title || label}
                              secondary={subtitle}
                              primaryTypographyProps={{ fontSize: '14px', ...titleProps }}
                              secondaryTypographyProps={{ fontSize: '14px', ...subTitleProps }}
                              sx={{ mr: 2 }}
                            />
                            <CaretRight size={18} />
                          </Box>
                        }
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        {/* @ts-expect-error type-error */}
                        <MenuList
                          id
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          sx={{
                            px: 1,
                          }}
                          {...restProps}
                        >
                          {subMenuItems.map(
                            (
                              {
                                title,
                                label,
                                value: subItemValue,
                                subtitle,
                                icon,
                                onClick,
                                sx,
                                titleProps = {},
                                items: subMenuItems,
                                divider,
                                subTitleProps = {},
                                ...item
                              }: any,
                              index: number
                            ) => (
                              <React.Fragment key={`${id}-menu-item-${index}`}>
                                {label ? (
                                  <MenuItem
                                    key={`${id}-menu-${index}`}
                                    sx={{
                                      fontSize: '14px',
                                      pr: 4,
                                      py: 1,
                                      justifyContent: 'start',
                                      ...sx,
                                    }}
                                    onClick={() => {
                                      onClick?.();
                                      onChange?.(subItemValue);
                                      popupState.close();
                                    }}
                                    {...item}
                                  >
                                    {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                                    <ListItemText
                                      primary={title || label}
                                      secondary={subtitle}
                                      primaryTypographyProps={{ fontSize: '14px', ...titleProps }}
                                      secondaryTypographyProps={{ fontSize: '14px', ...subTitleProps }}
                                    />
                                  </MenuItem>
                                ) : null}

                                {divider ? <Divider /> : null}
                              </React.Fragment>
                            )
                          )}
                        </MenuList>
                      </HoverPopover>
                    ) : (
                      <>
                        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                        {title || label ? (
                          <ListItemText
                            primary={title || label}
                            secondary={subtitle}
                            primaryTypographyProps={{
                              fontSize: '14px',
                              ...titleProps,
                              ...(isHeading && {
                                color: 'var(--mui-palette-text-disabled)',
                                fontSize: '14px',
                                fontWeight: 500,
                              }),
                            }}
                            secondaryTypographyProps={{ fontSize: '14px', ...subTitleProps }}
                          />
                        ) : null}
                      </>
                    )}
                  </MenuItem>
                )
            )
          )}
        </MuiMenu>
      )}
    </>
  );
};

export default React.memo(Menu);
