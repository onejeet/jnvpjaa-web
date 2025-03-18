import { Box, Breadcrumbs as MuiBreadcrumbs, Skeleton, useTheme } from '@mui/material';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import React from 'react';

import { BreadcrumbItem, BreadcrumbsProps } from './Breadcrumbs.types';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, loading }) => {
  const theme = useTheme();

  return (
    <MuiBreadcrumbs
      sx={{
        //   fontSize: '7px',
        alignItems: 'center',
        color: 'grey.500',
        pb: 1,
      }}
      // separator=">"
      aria-label="breadcrumb"
    >
      {loading ? (
        <Skeleton width="100px" />
      ) : (
        items?.map((item: BreadcrumbItem) => (
          <Box key={`breadcrumb-item-${item.label}`}>
            {item?.path ? (
              <NextLink
                href={{
                  pathname: item.path,
                }}
                as={{
                  pathname: '/',
                }}
                style={{
                  textDecoration: 'none',
                  fontSize: '13px',
                  color: theme.palette.primary.main,
                }}
              >
                {item.label}
              </NextLink>
            ) : (
              <MuiLink variant="body2" underline="none" sx={{ color: 'grey.800', pointerEvents: 'none' }}>
                {item.label}
              </MuiLink>
            )}
          </Box>
        ))
      )}
    </MuiBreadcrumbs>
  );
};

export default React.memo(Breadcrumbs);
