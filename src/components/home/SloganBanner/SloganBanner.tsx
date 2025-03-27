import { Box, Typography } from '@mui/material';
import React from 'react';

const SloganBanner = () => {
  return (
    <Typography
      my={3}
      fontSize={24}
      fontWeight={500}
      textAlign="center"
      sx={{
        lineHeight: 'normal',
        // border: '1px solid',
        // borderColor: 'grey.400',
        // borderRadius: '4px',
        p: '16px 10px',
        //   width: 'fit-content',
      }}
      color="primary.main"
    >
      नभ: स्पृशं दीप्तम् <br />
      (touching the skies with glory)
      <br />
      <Box
        color="grey.800"
        component="span"
        fontSize="16px"
        fontWeight={400}
        sx={{ display: 'block', mt: 2, fontStyle: 'italic' }}
      >
        The ultimate aim of association is to lead the society with glory.
      </Box>
    </Typography>
  );
};

export default React.memo(SloganBanner);
