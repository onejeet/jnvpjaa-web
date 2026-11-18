import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import type { ReactNode } from 'react';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageRichText from '@/modules/ContentPages/PageRichText';
import type { TextFields } from '@/modules/ContentPages/contentPages.schema';

interface TextPageProps {
  fields: TextFields;
  crumb: string;
  children?: ReactNode;
}

const TextPage = ({ fields, crumb, children }: TextPageProps) => (
  <Box>
    <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: crumb }]} />
    <Box component={Paper} px={2} py={4} my={2}>
      <Typography variant="h1" mb={3}>
        {fields.heading}
      </Typography>
      {fields.sections.map((section, index) => (
        <Box component="section" key={index} mt={index ? 3 : 0}>
          {section.heading && (
            <Typography variant="h2" color="grey.800" mb={2}>
              {section.heading}
            </Typography>
          )}
          <PageRichText html={section.body} />
          {section.image && (
            <Box mt={3} sx={{ borderRadius: '10px', overflow: 'hidden', maxHeight: 400 }}>
              <Image
                src={section.image.url}
                alt={section.image.alt}
                width={1300}
                height={585}
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </Box>
          )}
        </Box>
      ))}
      {children}
    </Box>
  </Box>
);

export default TextPage;
