import React from 'react';
import { AvatarProps } from './ProfilePicture.types';
import { Box, Avatar as MuiAvatar, Typography } from '@mui/material';

const ProfilePicture: React.FC<AvatarProps> = ({ containerProps, title, summary, ...rest }) => {
  return (
    <Box display="flex" alignItems="start" width="100%" {...containerProps}>
      <Box display="flex">
        <MuiAvatar alt={title} {...rest} sx={{ width: 32, height: 32, ...(rest.sx || {}) }} />
      </Box>
      {title && (
        <Box display="flex" ml="10px" width="100%" flexDirection="column">
          <Box display="flex" flexDirection="column" width="100%" {...containerProps}>
            <Box display="flex" flexDirection="column" width="100%">
              {title && (
                <Box display="flex">
                  {React.isValidElement(title) ? (
                    title
                  ) : (
                    <Typography fontWeight={600} fontSize="14px">
                      {title}
                    </Typography>
                  )}
                </Box>
              )}

              {summary && (
                <Box mt="4px" display="flex">
                  {React.isValidElement(summary) ? (
                    summary
                  ) : (
                    <Typography paragraph component="span" variant="body2" mb="0px" fontSize="14px">
                      {summary}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePicture;
