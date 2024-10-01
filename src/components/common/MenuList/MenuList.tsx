import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
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
      <Typography variant="h6" fontWeight={700} color="grey.900">
        {title}
      </Typography>
    )}
    <List>
      {items?.length &&
        items.map((item, index) => (
          <ListItem key={`menu-list-${item.label}-${index}`} disablePadding sx={{ mb: '8px' }}>
            <NextLink href={item?.path || '/'} style={{ textDecoration: 'none' }}>
              <ListItemButton
                sx={{
                  p: 0,
                  bgcolor: 'transparent !important',
                  textDecoration: 'none',
                }}
                disableGutters
              >
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      display="flex"
                      alignItems="center"
                      color="grey.800"
                      variant="body2"
                      sx={{
                        transition: 'all 0.2s linear',
                        svg: {
                          width: 0,
                        },
                        '&:hover': {
                          color: 'primary.main',
                          svg: {
                            width: 'auto',
                            ml: '4px',
                            color: 'primary.main',
                          },
                        },
                      }}
                    >
                      {item.label}
                      <ChevronRightIcon
                        sx={{ ml: '0px', color: 'grey.800', fontSize: '12px', transition: 'all 0.2s linear' }}
                      />
                    </Typography>
                  }
                  primaryTypographyProps={{
                    sx: {
                      px: '4px',
                      color: 'grey.800',
                      textDecoration: 'none',
                      transition: 'all 0.2s linear',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                        bgcolor: 'transparent',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
    </List>
  </Box>
);

export default MenuList;
