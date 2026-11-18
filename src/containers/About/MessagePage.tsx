import { IconQuoteFilled } from '@tabler/icons-react';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import type { MessageFields } from '@/modules/ContentPages/contentPages.schema';
import PageRichText from '@/modules/ContentPages/PageRichText';

/** President's, principal's and secretary's message pages: one layout, content from admin. */
const MessagePage = ({ fields, crumb }: { fields: MessageFields; crumb: string }) => (
  <Box>
    <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: crumb }]} />
    <Box component={Paper} gap={2} px={2} py={4} my={2} display="flex" alignItems="start">
      <Box width={{ xs: '100%', sm: fields.photo ? 'calc(100% - 300px)' : '100%' }}>
        <Typography variant="h1" mb={3}>
          {fields.heading}
        </Typography>
        {fields.photo && (
          <Box display={{ xs: 'block', sm: 'none' }} sx={{ borderRadius: '10px', overflow: 'hidden' }} mb={2}>
            <Image
              src={fields.photo.url}
              alt={fields.photo.alt}
              width={500}
              height={600}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        )}
        {fields.tagline && (
          <Typography color="grey.800" fontWeight={600} display="flex">
            {fields.tagline}
            <Box
              component="span"
              sx={{ display: 'inline-flex', color: 'grey.500', position: 'relative', top: '-10px', ml: 0.5 }}
            >
              <IconQuoteFilled size={28} />
            </Box>
          </Typography>
        )}
        <PageRichText html={fields.body} />
        {fields.signerName && (
          <Typography color="grey.800" variant="h3" fontWeight={600} mt={3}>
            {fields.signerName}
          </Typography>
        )}
        {fields.signerRole && <Typography color="grey.800">{fields.signerRole}</Typography>}
      </Box>
      {fields.photo && (
        <Box display={{ xs: 'none', sm: 'block' }} sx={{ borderRadius: '10px', width: 250, overflow: 'hidden' }}>
          <Image
            src={fields.photo.url}
            alt={fields.photo.alt}
            width={250}
            height={350}
            style={{ width: 250, height: 'auto', display: 'block' }}
          />
        </Box>
      )}
    </Box>
  </Box>
);

export default MessagePage;
