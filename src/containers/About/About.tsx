import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';

import type { TextFields } from '@/modules/ContentPages/contentPages.schema';
import TextPage from './TextPage';
import { assetUrl, brand } from '@/config/tenant';

// The logo and motto are brand marks, not editable copy.
const About = ({ fields }: { fields: TextFields }) => (
  <TextPage fields={fields} crumb={`About ${brand.shortName}`}>
    <Box mt={3} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" gap={3}>
      <Image
        src={assetUrl('/branding/logo-square-white.jpg')}
        width={150}
        height={150}
        alt={`${brand.shortName} logo`}
      />
      <Typography
        flex={1}
        fontSize={24}
        fontWeight={500}
        textAlign="center"
        color="primary.main"
        sx={{ border: '1px solid', borderColor: 'grey.400', borderRadius: '4px', p: '16px 10px' }}
      >
        नभ: स्पृशं दीप्तम् (touching the skies with glory)
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
    </Box>
  </TextPage>
);

export default About;
