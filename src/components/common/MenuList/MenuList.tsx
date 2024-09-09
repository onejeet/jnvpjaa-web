import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import React from 'react';

import { MenuListProps } from './types';

const MenuList: React.FC<MenuListProps> = ({ title, items, offsetTop }) => (
  <Box display="flex" flexDirection="column">
    {title && (
      <Typography variant="h3" fontWeight={700} color="grey.900">
        {title}
      </Typography>
    )}
    <List sx={{ mt: offsetTop || '22px' }}>
      {items.map((item, index) => (
        <ListItem key={`menu-list-${item.label}-${index}`} disablePadding sx={{ mb: '8px' }}>
          <NextLink href={item?.href} passHref key={`footer-nav-link-${item?.href}`} style={{ textDecoration: 'none' }}>
            <Link href={item?.href} sx={{ textDecoration: 'none' }}>
              <ListItemButton
                sx={{
                  p: 0,
                  bgcolor: 'transparent !important',
                  textDecoration: 'none',
                }}
                href={item.href}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      px: '4px',
                      color: 'grey.800',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                        bgcolor: 'transparent',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </NextLink>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default MenuList;
