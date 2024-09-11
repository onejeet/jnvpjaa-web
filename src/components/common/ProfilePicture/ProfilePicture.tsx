/* REACT */
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React from 'react';

/* MUI */

/* TYPES */
import Title from '../Title';
import { ProfilePictureProps } from './ProfilePicture.types';

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  containerProps,
  avatarContainerProps,
  title,
  contentContainerProps,
  titleComponentProps,
  summary,
  loading,
  ...restProps
}) => {
  const { titleProps, summaryContainerProps, ...restTitleComponentProps } = titleComponentProps || {};

  return (
    <Box display="flex" alignItems="center" width="100%" {...containerProps}>
      <Box display="flex" {...avatarContainerProps}>
        <Avatar alt={title} {...restProps} />
      </Box>
      {title && (
        <Box display="flex" ml="10px" width="100%" flexDirection="column" {...contentContainerProps}>
          <Title
            title={title}
            summary={summary}
            titleProps={{
              fontSize: '24px',
              ...titleProps,
            }}
            summaryProps={{
              fontSize: '14px',
              color: 'grey.700',
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
