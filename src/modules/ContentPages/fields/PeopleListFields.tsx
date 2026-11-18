'use client';

import { Box, FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { Controller, useFieldArray } from 'react-hook-form';

import Button from '@/components/core/Button';
import { EditorSection } from '@/components/editor/EditorShell';
import type { PeopleGroup, Person } from '../contentPages.schema';
import { ImageInput, RichTextInput, RowActions, TextInput, useEditorForm } from './shared';

const MAX_PEOPLE = 200;

const PeopleListFields = () => {
  const { control } = useEditorForm();
  const { fields: groups } = useFieldArray({ control, name: 'fields.groups' as any, keyName: '_id' });
  const people = useFieldArray({ control, name: 'fields.people' as any });
  const rows = people.fields as unknown as (Person & { id: string })[];
  const single = groups.length === 1;

  return (
    <Stack gap={3}>
      <TextInput name="fields.heading" label="Page heading" />
      <RichTextInput name="fields.intro" label="Introduction" optional placeholder="A few lines above the list…" />

      {(groups as unknown as (PeopleGroup & { _id: string })[]).map((group, groupIndex) => {
        // Indices into the whole people array, so edits and moves stay in one list.
        const members = rows
          .map((person, index) => ({ person, index }))
          .filter(({ person }) => person.group === group.key);
        return (
          <EditorSection key={group._id} title={single ? 'People' : group.label}>
            <Stack gap={2}>
              {!single && (
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr auto' }} gap={2} alignItems="end">
                  <TextInput name={`fields.groups.${groupIndex}.label`} label="Group title" />
                  <Controller
                    name={`fields.groups.${groupIndex}.visible` as any}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch checked={Boolean(field.value)} onChange={(_, checked) => field.onChange(checked)} />
                        }
                        label="Shown"
                      />
                    )}
                  />
                </Box>
              )}
              {!single && (
                <TextInput
                  name={`fields.groups.${groupIndex}.emptyText`}
                  label="When nobody is listed"
                  optional
                  hint="Shown in place of the list while this group is empty."
                />
              )}

              {members.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Nobody in this group yet.
                </Typography>
              )}
              {members.map(({ person, index }, position) => {
                const prev = members[position - 1]?.index;
                const next = members[position + 1]?.index;
                return (
                  <Box
                    key={person.id}
                    sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}
                    aria-label={`Person ${position + 1} in ${group.label}`}
                    role="group"
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} mb={1.5}>
                      <ImageInput name={`fields.people.${index}.photo`} label="Photo" compact />
                      <RowActions
                        label={`person ${position + 1}`}
                        onUp={prev !== undefined ? () => people.move(index, prev) : undefined}
                        onDown={next !== undefined ? () => people.move(index, next) : undefined}
                        onRemove={() => people.remove(index)}
                      />
                    </Stack>
                    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '2fr 1fr 1fr' }} gap={2}>
                      <TextInput name={`fields.people.${index}.name`} label="Name" />
                      <TextInput
                        name={`fields.people.${index}.batch`}
                        label="Batch"
                        optional
                        type="number"
                        placeholder="1994"
                      />
                      <TextInput
                        name={`fields.people.${index}.tenure`}
                        label="Tenure"
                        optional
                        placeholder="2019–2021"
                      />
                    </Box>
                  </Box>
                );
              })}
              {rows.length < MAX_PEOPLE && (
                <Box>
                  <Button
                    title="Add person"
                    aria-label={single ? undefined : `Add a person to ${group.label}`}
                    variant="outlined"
                    startIcon={<IconPlus size={18} />}
                    onClick={() => {
                      // Insert after this group's last person so the public order follows the editor.
                      const at = members.length ? members[members.length - 1].index + 1 : rows.length;
                      people.insert(at, { name: '', group: group.key, batch: '', tenure: '' });
                    }}
                  />
                </Box>
              )}
            </Stack>
          </EditorSection>
        );
      })}
    </Stack>
  );
};

export default PeopleListFields;
