'use client';

import { FormHelperText, IconButton, Stack, Tooltip } from '@mui/material';
import { IconArrowDown, IconArrowUp, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { EditorField } from '@/components/editor/EditorShell';
import Button from '@/components/core/Button';
import FormTextField from '@/components/form/FormTextField';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import PageImageField from './PageImageField';

export interface EditorFormValues {
  fields: any;
  visible: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const useEditorForm = () => useFormContext<EditorFormValues>();

/** A labelled single-line (or multiline) text input bound to the form. */
export const TextInput = ({
  name,
  label,
  optional,
  hint,
  placeholder,
  multiline,
  type,
}: {
  name: string;
  label: string;
  optional?: boolean;
  hint?: string;
  placeholder?: string;
  multiline?: boolean;
  type?: string;
}) => {
  const { control } = useEditorForm();
  return (
    <EditorField label={label} optional={optional} hint={hint} htmlFor={name}>
      <FormTextField
        id={name}
        fullWidth
        size="small"
        name={name as any}
        control={control}
        placeholder={placeholder}
        multiline={multiline}
        minRows={multiline ? 2 : undefined}
        type={type}
      />
    </EditorField>
  );
};

/** TipTap bound to the form, with the field's validation message under it. */
export const RichTextInput = ({
  name,
  label,
  optional,
  hint,
  placeholder,
  height = 'clamp(240px, 40vh, 420px)',
}: {
  name: string;
  label: string;
  optional?: boolean;
  hint?: string;
  placeholder?: string;
  height?: string;
}) => {
  const { control, resetField } = useEditorForm();
  // TipTap rewrites stored HTML on load (e.g. wraps list items in <p>); until someone focuses, types in, pastes or drops into
  // this editor, take its output as the new baseline so an untouched page is not "unsaved".
  const touched = React.useRef(false);
  const markTouched = () => (touched.current = true);
  return (
    <EditorField label={label} optional={optional} hint={hint}>
      <Controller
        name={name as any}
        control={control}
        render={({ field, fieldState }) => (
          <div
            onPointerDownCapture={markTouched}
            onKeyDownCapture={markTouched}
            onFocusCapture={markTouched}
            onInputCapture={markTouched}
            onPasteCapture={markTouched}
            onDropCapture={markTouched}
          >
            <TipTapTextEditor
              value={field.value || ''}
              onChange={(html: string) =>
                touched.current ? field.onChange(html) : resetField(name as any, { defaultValue: html })
              }
              height={height}
              placeholder={placeholder}
              aiField={name}
            />
            {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
          </div>
        )}
      />
    </EditorField>
  );
};

/** Image upload bound to the form. Alt-text errors show under the image. */
export const ImageInput = ({
  name,
  label,
  hint,
  defaultAlt,
  compact,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultAlt?: string;
  compact?: boolean;
}) => {
  const { control } = useEditorForm();
  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field, fieldState }) => {
        const error =
          (fieldState.error as any)?.alt?.message ||
          (fieldState.error as any)?.url?.message ||
          fieldState.error?.message;
        const image = (
          <PageImageField
            value={field.value}
            onChange={field.onChange}
            defaultAlt={defaultAlt}
            compact={compact}
            error={error}
          />
        );
        return compact ? (
          image
        ) : (
          <EditorField label={label} optional hint={hint}>
            {image}
          </EditorField>
        );
      }}
    />
  );
};

/** Move up / move down / remove for one row of a list. Remove asks once inline before it acts. */
export const RowActions = ({
  label,
  onUp,
  onDown,
  onRemove,
}: {
  label: string;
  onUp?: () => void;
  onDown?: () => void;
  onRemove?: () => void;
}) => {
  const [confirming, setConfirming] = React.useState(false);
  if (confirming) {
    return (
      <Stack direction="row" gap={1} alignItems="center">
        <Button title="Remove" size="small" color="error" onClick={onRemove} />
        <Button title="Keep" size="small" variant="text" color="inherit" onClick={() => setConfirming(false)} />
      </Stack>
    );
  }
  return (
    <Stack direction="row" gap={0.5}>
      <Tooltip title="Move up">
        <span>
          <IconButton size="small" onClick={onUp} disabled={!onUp} aria-label={`Move ${label} up`}>
            <IconArrowUp size={18} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Move down">
        <span>
          <IconButton size="small" onClick={onDown} disabled={!onDown} aria-label={`Move ${label} down`}>
            <IconArrowDown size={18} />
          </IconButton>
        </span>
      </Tooltip>
      {onRemove && (
        <Tooltip title="Remove">
          <IconButton size="small" onClick={() => setConfirming(true)} aria-label={`Remove ${label}`}>
            <IconTrash size={18} />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};
