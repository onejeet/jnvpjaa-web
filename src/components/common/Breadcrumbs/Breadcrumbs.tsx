'use client';

import { Box, Breadcrumbs as MuiBreadcrumbs, Skeleton, useTheme } from '@mui/material';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import React from 'react';

import { BreadcrumbItem, BreadcrumbsProps } from './Breadcrumbs.types';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, loading, sx = {}, ...rest }) => {
  return (
    <MuiBreadcrumbs
      sx={{
        //   fontSize: '7px',
        alignItems: 'center',
        color: 'grey.500',
        ...sx,
      }}
      // separator=">"
      aria-label="breadcrumb"
      {...rest}
    >
      {loading ? (
        <Skeleton width="100px" />
      ) : (
        items?.map((item: BreadcrumbItem) => (
          <Box
            key={`breadcrumb-item-${item.label}`}
            sx={{
              '& .breadcrumb_link': {
                color: 'primary.main',
                fontWeight: 500,
              },
            }}
          >
            {item?.path ? (
              <NextLink
                href={{
                  pathname: item.path,
                }}
                className="breadcrumb_link"
                as={{
                  pathname: item.path,
                }}
                style={{
                  textDecoration: 'none',
                  fontSize: '13px',
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
