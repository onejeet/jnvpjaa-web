import { Box, Typography } from '@mui/material';
import React from 'react';

const SloganBanner = () => {
  return (
    <Box my={3} display="flex" flexDirection="column" alignItems="center" p="16px 10px">
      <Typography
        fontSize={24}
        fontWeight={500}
        textAlign="center"
        sx={{
          lineHeight: 'normal',
        }}
        color="primary.main"
      >
        नभ: स्पृशं दीप्तम् <br />
        (touching the skies with glory)
      </Typography>

      <Typography
        color="grey.800"
        //  component="span"
        fontSize="18px"
        fontFamily="Playwrite CU"
        fontWeight={400}
        textAlign="center"
        sx={{ display: 'block', mt: 2, fontStyle: 'italic' }}
      >
        The ultimate aim of association is to lead the society with glory.
      </Typography>
      <Typography
        mt={{ xs: 1, md: 2 }}
        variant="body1"
        color="grey.800"
        textAlign="center"
        maxWidth={{ xs: '98%', md: '70%' }}
      >
        {`JNVPJAA is an alumni association of ex-students who once studied at the cherished Jawahar Navodaya Vidyalaya,
        Paota, Jaipur. The school, tucked away in the Paota village of Rajasthan's Jaipur district, is among several
        hundred JNVs conceptualized, funded and managed by Navodaya Vidyalaya Samiti, a semi-autonomous body under the
        aegis of federal government's Ministry of Human Resource Development. The JNVs, one mandated for each district,
        are wonderful examples of state sponsorship of fully-residential quality education at an unprecedented scale.`}
      </Typography>
    </Box>
  );
};

export default React.memo(SloganBanner);
