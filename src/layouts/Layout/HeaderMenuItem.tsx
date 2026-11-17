'use client';

import { alpha, Box, Button, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import { IconChevronRight, IconChevronDown } from '@tabler/icons-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import HoverPopover from '../../components/common/HoverPopover';
import { PATH_ICONS } from '@/constants/menuIcons';
import type { IHeaderMenuItem, IMenuItemProps } from './LayoutTopbar';

const COLUMN_WIDTH = 296;
// Drops the panel from the button's bottom to the header's bottom edge.
const PANEL_GAP = 8;
// Room for two lines of hint text, reserved so the panel never changes size.
const HINT_HEIGHT = 56;

/** Consecutive items with the same `section`, in menu order. */
const groupBySection = (items: IHeaderMenuItem[]) =>
  items.reduce<{ title?: string; items: IHeaderMenuItem[] }[]>((groups, item) => {
    const last = groups[groups.length - 1];
    if (last && last.title === item.section) last.items.push(item);
    else groups.push({ title: item.section, items: [item] });
    return groups;
  }, []);

const MenuLink: React.FC<{
  item: IHeaderMenuItem;
  active: boolean;
  onClick: () => void;
  onHint: (hint: string | null) => void;
}> = ({ item, active, onClick, onHint }) => {
  const ItemIcon = PATH_ICONS[item.path] || IconChevronRight;
  return (
    <Box
      component={NextLink}
      href={item.path || '/'}
      onClick={onClick}
      onMouseEnter={() => onHint(item.description || null)}
      onFocus={() => onHint(item.description || null)}
      aria-current={active ? 'page' : undefined}
      aria-description={item.description}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        px: 1,
        py: 0.75,
        borderRadius: 2,
        textDecoration: 'none',
        color: 'text.primary',
        bgcolor: active ? (theme: Theme) => alpha(theme.palette.primary.main, 0.06) : undefined,
        transition: 'background-color 0.15s ease',
        '&:hover, &:focus-visible': {
          bgcolor: 'action.hover',
          textDecoration: 'none',
          '& .menu-link-label': { color: 'primary.main' },
          '& .menu-link-icon': { bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.14) },
        },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: -2 },
      }}
    >
      <Box
        className="menu-link-icon"
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          borderRadius: '9px',
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
          transition: 'background-color 0.15s ease',
        }}
      >
        <ItemIcon size={18} />
      </Box>
      <Typography
        className="menu-link-label"
        fontSize={14}
        fontWeight={600}
        lineHeight={1.35}
        color={active ? 'primary.main' : 'text.primary'}
      >
        {item.label}
      </Typography>
    </Box>
  );
};

/** The open dropdown: links only, with the hovered link's description in a fixed line at the bottom. */
const MenuPanel: React.FC<{ item: IHeaderMenuItem; close: () => void; isActive: (path: string) => boolean }> = ({
  item,
  close,
  isActive,
}) => {
  const [hint, setHint] = React.useState<string | null>(null);
  const sections = groupBySection(item.menu || []);
  const columns = Math.min(sections.length, 2);
  return (
    <Box component="nav" aria-label={item.label} onMouseLeave={() => setHint(null)}>
      <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, ${COLUMN_WIDTH}px)`, p: 1 }}>
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
                  px: 1,
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
              <MenuLink key={link.path} item={link} active={isActive(link.path)} onClick={close} onHint={setHint} />
            ))}
          </Box>
        ))}
      </Box>
      <Box
        aria-hidden
        sx={{
          height: HINT_HEIGHT,
          px: 2.25,
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme: Theme) => alpha(theme.palette.text.primary, 0.02),
          borderRadius: '0 0 16px 16px',
        }}
      >
        <Typography
          fontSize={13}
          lineHeight={1.45}
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            opacity: hint ? 1 : 0.6,
            transition: 'opacity 0.15s ease',
          }}
        >
          {hint || 'Point at a page to see what it covers.'}
        </Typography>
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

  return (
    <HoverPopover
      id={`menu-${item.label}`}
      render={
        <Button
          aria-haspopup="true"
          disableRipple
          endIcon={<IconChevronDown size={18} />}
          sx={{ '& span': { ml: '2px' } }}
        >
          {item.label}
        </Button>
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          sx: {
            mt: `${PANEL_GAP}px`,
            overflow: 'visible',
            // Invisible strip over the gap under the button, so moving the mouse down keeps the menu open.
            '&::before': { content: '""', position: 'absolute', left: 0, right: 0, top: -PANEL_GAP, height: PANEL_GAP },
            borderRadius: '0 0 16px 16px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 18px 40px -12px rgba(15, 23, 42, 0.18)',
          },
        },
      }}
    >
      {(close) => <MenuPanel item={item} close={close} isActive={isActive} />}
    </HoverPopover>
  );
};

export default HeaderMenuItem;
