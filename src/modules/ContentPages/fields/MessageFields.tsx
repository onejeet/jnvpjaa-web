'use client';

import { Box, Stack } from '@mui/material';

import { EditorSection } from '@/components/editor/EditorShell';
import { ImageInput, RichTextInput, TextInput } from './shared';
import { brand } from '@/config/tenant';

const MessageFields = () => (
  <Stack gap={3}>
    <TextInput name="fields.heading" label="Heading" placeholder="Message from the President" />
    <TextInput name="fields.tagline" label="Tagline" optional hint="A short line shown under the heading." />
    <RichTextInput
      name="fields.body"
      label="Message"
      placeholder="Write the message…"
      height="clamp(380px, 56vh, 560px)"
    />
    <EditorSection title="Signed by">
      <Stack gap={3}>
        <ImageInput name="fields.photo" label="Photo" hint="Shown beside the message." />
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
          <TextInput name="fields.signerName" label="Name" optional />
          <TextInput name="fields.signerRole" label="Role" optional placeholder={`President, ${brand.shortName}`} />
        </Box>
      </Stack>
    </EditorSection>
  </Stack>
);

export default MessageFields;
