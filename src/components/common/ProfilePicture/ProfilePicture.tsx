'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React from 'react';
import Title from '../Title';
import { ProfilePictureProps } from './ProfilePicture.types';
import { getAvatarDataUrl } from '@/utils/helpers';

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  containerProps,
  avatarContainerProps,
  title,
  contentContainerProps,
  titleComponentProps,
  summary,
  loading,
  maxWidth,
  id,
  alt,
  ...restProps
}) => {
  const { titleProps, summaryContainerProps, ...restTitleComponentProps } = titleComponentProps || {};

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      maxWidth={maxWidth || 200}
      sx={{ cursor: 'pointer' }}
      {...containerProps}
    >
      <Box display="flex" {...avatarContainerProps}>
        <Avatar
          alt={alt || (typeof title === 'string' ? title : 'avatar')}
          {...restProps}
          src={restProps?.src || getAvatarDataUrl(id)}
        >
          {restProps?.src ? null : title}
        </Avatar>
      </Box>
      {title && (
        <Box display="flex" ml="10px" width="100%" flexDirection="column" {...contentContainerProps}>
          <Title
            title={title}
            summary={summary}
            titleProps={{
              fontSize: '14px',
              color: 'text.primary',
              ...titleProps,
            }}
            summaryProps={{
              fontSize: '12px',
              color: 'grey.600',
              fontWeight: 400,
            }}
            summaryContainerProps={{
              mt: loading ? '7px' : '0px',
              ...summaryContainerProps,
            }}
            {...restTitleComponentProps}
          />
        </Box>
      )}
    </Box>
  );
};

export default React.memo(ProfilePicture);
