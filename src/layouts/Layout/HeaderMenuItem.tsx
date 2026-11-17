'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { alpha, Box, Button, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import { IconChevronRight } from '@tabler/icons-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import HoverPopover from '../../components/common/HoverPopover';
import { PATH_ICONS } from '@/constants/menuIcons';
import type { IHeaderMenuItem, IMenuItemProps } from './LayoutTopbar';

const COLUMN_WIDTH = 296;

/** Consecutive items with the same `section`, in menu order. */
const groupBySection = (items: IHeaderMenuItem[]) =>
  items.reduce<{ title?: string; items: IHeaderMenuItem[] }[]>((groups, item) => {
    const last = groups[groups.length - 1];
    if (last && last.title === item.section) last.items.push(item);
    else groups.push({ title: item.section, items: [item] });
    return groups;
  }, []);

const MenuLink: React.FC<{ item: IHeaderMenuItem; active: boolean; onClick: () => void }> = ({
  item,
  active,
  onClick,
}) => {
  const ItemIcon = PATH_ICONS[item.path] || IconChevronRight;
  return (
    <Box
      component={NextLink}
      href={item.path || '/'}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        p: 1.25,
        borderRadius: 2,
        textDecoration: 'none',
        color: 'text.primary',
        bgcolor: active ? (theme: Theme) => alpha(theme.palette.primary.main, 0.06) : undefined,
        transition: 'background-color 0.15s ease',
        '&:hover, &:focus-visible': {
          bgcolor: 'action.hover',
          '& .menu-link-label': { color: 'primary.main' },
          '& .menu-link-icon': { bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.14) },
        },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: -2 },
      }}
    >
      <Box
        className="menu-link-icon"
        sx={{
          width: 36,
          height: 36,
          flexShrink: 0,
          borderRadius: '10px',
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
          transition: 'background-color 0.15s ease',
        }}
      >
        <ItemIcon size={19} />
      </Box>
      <Box minWidth={0}>
        <Typography
          className="menu-link-label"
          fontSize={14}
          fontWeight={600}
          lineHeight={1.35}
          color={active ? 'primary.main' : 'text.primary'}
        >
          {item.label}
        </Typography>
        {item.description && (
          <Typography fontSize={13} lineHeight={1.4} color="text.secondary" mt={0.25}>
            {item.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const HeaderMenuItem: React.FC<IMenuItemProps> = ({ item }) => {
  const pathname = usePathname() || '';
  const isActive = (path: string) => path !== '/' && (pathname === path || pathname.startsWith(`${path}/`));

  if (!item.menu?.length) {
    return (
      <NextLink href={item.path || '/'} style={{ textDecoration: 'none', width: '100%' }}>
        <Button disableRipple sx={{ px: '2px' }} fullWidth>
          {item.label}
        </Button>
      </NextLink>
    );
  }

  const sections = groupBySection(item.menu);
  const columns = Math.min(sections.length, 2);

  return (
    <HoverPopover
      id={`menu-${item.label}`}
      render={
        <Button aria-haspopup="true" disableRipple endIcon={<KeyboardArrowDownIcon />} sx={{ '& span': { ml: '2px' } }}>
          {item.label}
        </Button>
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            borderRadius: '0 0 16px 16px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 18px 40px -12px rgba(15, 23, 42, 0.18)',
          },
        },
      }}
    >
      {(close) => (
        <Box
          component="nav"
          aria-label={item.label}
          sx={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, ${COLUMN_WIDTH}px)`, p: 1 }}
        >
          {sections.map((section, index) => (
            <Box
              key={section.title || index}
              sx={{
                p: 0.5,
                // Dividers between columns and between rows of sections.
                borderLeft: index % columns ? '1px solid' : 'none',
                borderTop: index >= columns ? '1px solid' : 'none',
                borderColor: 'divider',
                pl: index % columns ? 1 : 0.5,
                pt: index >= columns ? 1 : 0.5,
              }}
            >
              {section.title && (
                <Typography
                  component="h3"
                  sx={{
                    px: 1.25,
                    pt: 0.75,
                    pb: 0.5,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                  }}
                >
                  {section.title}
                </Typography>
              )}
              {section.items.map((link) => (
                <MenuLink key={link.path} item={link} active={isActive(link.path)} onClick={close} />
              ))}
            </Box>
          ))}
        </Box>
      )}
    </HoverPopover>
  );
};

export default HeaderMenuItem;
