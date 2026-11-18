'use client';

import { Box, Stack, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { useFieldArray } from 'react-hook-form';

import Button from '@/components/core/Button';
import { ImageInput, RichTextInput, RowActions, TextInput, useEditorForm } from './shared';

const MAX_SECTIONS = 12;

const TextSections = () => {
  const { control } = useEditorForm();
  const { fields: sections, append, move, remove } = useFieldArray({ control, name: 'fields.sections' as any });

  return (
    <Stack gap={3}>
      <TextInput name="fields.heading" label="Page heading" />
      {sections.map((section, index) => (
        <Box
          key={section.id}
          component="section"
          aria-label={`Section ${index + 1}`}
          sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: { xs: 2, md: 3 } }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} gap={1}>
            <Typography variant="subtitle2" fontWeight={600}>
              Section {index + 1}
            </Typography>
            <RowActions
              label={`section ${index + 1}`}
              onUp={index > 0 ? () => move(index, index - 1) : undefined}
              onDown={index < sections.length - 1 ? () => move(index, index + 1) : undefined}
              onRemove={sections.length > 1 ? () => remove(index) : undefined}
            />
          </Stack>
          <Stack gap={3}>
            <TextInput name={`fields.sections.${index}.heading`} label="Section heading" optional />
            <RichTextInput name={`fields.sections.${index}.body`} label="Text" placeholder="Write this section…" />
            <ImageInput name={`fields.sections.${index}.image`} label="Image" hint="Shown below the text." />
          </Stack>
        </Box>
      ))}
      {sections.length < MAX_SECTIONS && (
        <Box>
          <Button
            title="Add section"
            variant="outlined"
            startIcon={<IconPlus size={18} />}
            onClick={() => append({ heading: '', body: '' })}
          />
        </Box>
      )}
    </Stack>
  );
};

export default TextSections;
