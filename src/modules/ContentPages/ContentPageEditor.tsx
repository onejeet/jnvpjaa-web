'use client';

import { useMutation, useQuery } from '@apollo/client';
import { Alert, Box, FormControlLabel, Skeleton, Switch } from '@mui/material';
import { IconExternalLink } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  CONTENT_PAGE_FOR_EDITOR,
  CONTENT_PAGES_FOR_EDITOR,
  UPDATE_CONTENT_PAGE,
  type ContentPage,
} from '@/apollo/contentPageOperations';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Button from '@/components/core/Button';
import { EditorField, EditorPanel, EditorShell, PublishPanel } from '@/components/editor/EditorShell';
import FormTextField from '@/components/form/FormTextField';
import { useAlert } from '@/context/AlertContext';
import { CONTENT_PAGES, type ContentPageSlug, type ContentPageType } from './contentPages.registry';
import { contentFieldsSchema, type ContentFields } from './contentPages.schema';
import MessageFields from './fields/MessageFields';
import PeopleListFields from './fields/PeopleListFields';
import TextSections from './fields/TextSections';
import type { EditorFormValues } from './fields/shared';
import { AiAssistantCard, AiAssistantProvider, type AiFormConfig, type AiFormField } from '@/modules/AiAssist';

dayjs.extend(relativeTime);

const DESCRIPTIONS: Record<ContentPageType, string> = {
  message: 'The message, who signed it and their photo.',
  text: 'The page heading and its sections, in the order they appear.',
  'people-list': 'The introduction and the people listed on the page, in order.',
};

const FIELD_EDITORS: Record<ContentPageType, React.ComponentType> = {
  message: MessageFields,
  text: TextSections,
  'people-list': PeopleListFields,
};

const SEO_TITLE_MAX = 70;
const SEO_DESCRIPTION_MAX = 320;

// Starting fields for a page the seed never created.
const emptyFields = (type: ContentPageType, label: string): any =>
  type === 'message'
    ? { heading: '', body: '' }
    : type === 'text'
      ? { heading: '', sections: [{ heading: '', body: '' }] }
      : { heading: label, groups: [{ key: 'people', label, visible: true }], people: [] };

// Batch is a number in storage and text in the input.
const toFormValues = (type: ContentPageType, label: string, page?: ContentPage | null): EditorFormValues => {
  const fields: any = structuredClone(page?.fields || emptyFields(type, label));
  if (Array.isArray(fields.people)) {
    fields.people = fields.people.map((person: any) => ({
      ...person,
      batch: person.batch ? String(person.batch) : '',
    }));
  }
  return {
    fields,
    visible: page ? page.visible : true,
    seoTitle: page?.seoTitle || '',
    seoDescription: page?.seoDescription || '',
  };
};

const toStoredFields = (fields: any) => {
  if (!Array.isArray(fields.people)) return fields;
  return {
    ...fields,
    people: fields.people.map(({ batch, ...person }: any) => {
      const year = String(batch ?? '').trim();
      return year ? { ...person, batch: Number(year) } : person;
    }),
  };
};

const CONFLICT = /changed by someone else/i;

// isDirty can stay stale after a nested resetField (rich-text baselines), so read dirtyFields directly.
const anyDirty = (node: unknown): boolean =>
  node === true || (typeof node === 'object' && node !== null && Object.values(node).some(anyDirty));

/** Edit one fixed page. Changes are live on save; a concurrent save by someone else is refused, not overwritten. */
const ContentPageEditor = ({ slug }: { slug: ContentPageSlug }) => {
  const { type, label, path } = CONTENT_PAGES[slug];
  const { data, loading, error, refetch } = useQuery<{ contentPageForEditor: ContentPage | null }>(
    CONTENT_PAGE_FOR_EDITOR,
    { variables: { slug }, fetchPolicy: 'network-only' }
  );
  const page = data?.contentPageForEditor;

  if (loading && !data) {
    return (
      <Box>
        <Skeleton variant="text" width={240} height={48} />
        <Skeleton variant="rounded" height={480} sx={{ mt: 2 }} />
      </Box>
    );
  }
  if (error) {
    return <Alert severity="error">Could not load this page. Please refresh and try again.</Alert>;
  }
  // Remount on each server version so the rich-text editors pick up reloaded content.
  return (
    <EditorForm
      key={page?.updatedAt || 'new'}
      slug={slug}
      type={type}
      label={label}
      path={path}
      page={page}
      reload={() => refetch()}
    />
  );
};

const EditorForm = ({
  slug,
  type,
  label,
  path,
  page,
  reload,
}: {
  slug: ContentPageSlug;
  type: ContentPageType;
  label: string;
  path: string;
  page?: ContentPage | null;
  reload: () => void;
}) => {
  const { showAlert } = useAlert();
  const form = useForm<EditorFormValues>({ defaultValues: toFormValues(type, label, page) });
  const { control, handleSubmit, setError, clearErrors, formState, reset, watch } = form;
  const [conflict, setConflict] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(page);
  const [save, { loading: saving }] = useMutation<{ updateContentPage: ContentPage }>(UPDATE_CONTENT_PAGE, {
    refetchQueries: [{ query: CONTENT_PAGES_FOR_EDITOR }],
  });
  const dirty = anyDirty(formState.dirtyFields);
  const seoTitle = watch('seoTitle');
  const seoDescription = watch('seoDescription');

  useUnsavedChangesGuard(dirty);

  const onSubmit = handleSubmit(async (values) => {
    clearErrors();
    const fields = toStoredFields(values.fields);
    const parsed = contentFieldsSchema(type).safeParse(fields);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) =>
        setError(`fields.${issue.path.join('.')}` as any, { message: issue.message })
      );
      showAlert({ visible: true, type: 'error', message: 'Some fields need attention. They are marked below.' });
      return;
    }
    try {
      const { data } = await save({
        variables: {
          input: {
            slug,
            fields: parsed.data as ContentFields,
            visible: values.visible,
            seoTitle: values.seoTitle.trim() || null,
            seoDescription: values.seoDescription.trim() || null,
            expectedUpdatedAt: saved?.updatedAt ?? null,
          },
        },
      });
      const next = data?.updateContentPage;
      if (next) {
        setSaved(next);
        reset(toFormValues(type, label, next));
      }
      showAlert({
        visible: true,
        type: 'success',
        message: values.visible ? 'Saved. Live on the site now.' : 'Saved. This page is hidden from the site.',
      });
    } catch (err: any) {
      const message = err?.message || 'Could not save the page.';
      if (CONFLICT.test(message)) setConflict(message);
      else showAlert({ visible: true, type: 'error', message });
    }
  });

  const live = saved ? saved.visible : false;
  const editedBy = saved?.updatedBy ? `${saved.updatedBy.firstName} ${saved.updatedBy.lastName}`.trim() : null;
  const note = dirty
    ? 'You have unsaved changes. Saving puts them on the site right away.'
    : saved
      ? `Edited ${dayjs(saved.updatedAt).fromNow()}${editedBy ? ` by ${editedBy}` : ''}.`
      : 'Not saved yet.';
  const Fields = FIELD_EDITORS[type];
  const ai = pageAssistant(type, label, form, saving);

  return (
    <FormProvider {...form}>
      <AiAssistantProvider config={ai}>
        <Breadcrumbs
          items={[
            { label: 'Admin', path: '/admin' },
            { label: 'Content' },
            { label: 'Pages', path: '/admin/pages' },
            { label },
          ]}
          sx={{ mb: 1 }}
        />
        {conflict && (
          <Alert
            severity="warning"
            sx={{ mb: 2 }}
            action={
              <Button
                title="Reload"
                size="small"
                color="inherit"
                variant="text"
                onClick={() => (setConflict(null), reload())}
              />
            }
          >
            {conflict} Reloading discards your unsaved edits on this page.
          </Alert>
        )}
        <EditorShell
          onSubmit={onSubmit}
          noValidate
          inset
          assistant={<AiAssistantCard below="lg" />}
          heading={label}
          description={DESCRIPTIONS[type]}
          publish={
            <PublishPanel
              status={live ? 'Shown on the site' : 'Hidden from the site'}
              tone={dirty ? 'attention' : live ? 'live' : 'neutral'}
              note={note}
            >
              <Button title="Save" type="submit" disabled={!dirty || saving} loading={saving} />
              <Button
                title="View page"
                variant="text"
                startIcon={<IconExternalLink size={18} />}
                disabled={!live}
                onClick={() => window.open(`${path}/`, '_blank', 'noopener')}
              />
            </PublishPanel>
          }
          aside={
            <>
              <EditorPanel title="Visibility">
                <Controller
                  name="visible"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch checked={field.value} onChange={(_, checked) => field.onChange(checked)} />}
                      label="Visible on site"
                    />
                  )}
                />
              </EditorPanel>
              <EditorPanel title="Search & sharing" hint="Leave empty to use the default.">
                <EditorField label="Title" optional htmlFor="seoTitle">
                  <FormTextField
                    id="seoTitle"
                    fullWidth
                    size="small"
                    name="seoTitle"
                    control={control}
                    helperText={`${seoTitle?.length || 0} / ${SEO_TITLE_MAX}`}
                    rules={{ maxLength: { value: SEO_TITLE_MAX, message: `Use ${SEO_TITLE_MAX} characters or fewer` } }}
                  />
                </EditorField>
                <EditorField label="Description" optional htmlFor="seoDescription">
                  <FormTextField
                    id="seoDescription"
                    fullWidth
                    size="small"
                    multiline
                    minRows={3}
                    name="seoDescription"
                    control={control}
                    helperText={`${seoDescription?.length || 0} / ${SEO_DESCRIPTION_MAX}`}
                    rules={{
                      maxLength: {
                        value: SEO_DESCRIPTION_MAX,
                        message: `Use ${SEO_DESCRIPTION_MAX} characters or fewer`,
                      },
                    }}
                  />
                </EditorField>
              </EditorPanel>
            </>
          }
        >
          <Fields />
        </EditorShell>
      </AiAssistantProvider>
    </FormProvider>
  );
};

const PAGE_PLACEHOLDER: Record<ContentPageType, string> = {
  text: 'e.g. Who we are, when the association started, what we do for students and alumni, and how to join.',
  message:
    'e.g. Thank alumni for the scholarship drive, mention the new hostel library, invite everyone to the reunion in December.',
  'people-list': 'e.g. Past presidents of the association since 2005, with their batch and years in office.',
};

/** What the AI assistant may fill on each kind of page. Photos, people and signer details stay as they are. */
const pageAssistant = (
  type: ContentPageType,
  label: string,
  form: ReturnType<typeof useForm<EditorFormValues>>,
  saving: boolean
): AiFormConfig => {
  const { getValues, setValue } = form;
  const dirty = { shouldDirty: true };
  const field = (key: string, fieldLabel: string, kind: AiFormField['kind'], name: string): AiFormField => ({
    key,
    label: fieldLabel,
    kind,
    name,
    get: () => getValues(name as any),
    set: (v) => setValue(name as any, v as any, dirty),
  });
  const seo = [
    field('seoTitle', 'Search title', 'line', 'seoTitle'),
    field('seoDescription', 'Search description', 'text', 'seoDescription'),
  ];
  const sections: AiFormField = {
    ...field('sections', 'Sections', 'sections', 'fields.sections'),
    // AI writes words only: each section keeps the image it had at that position.
    set: (v) => {
      const prev: any[] = getValues('fields.sections' as any) || [];
      const next = (v as any[]).map((s, i) => (prev[i]?.image && !('image' in s) ? { ...s, image: prev[i].image } : s));
      setValue('fields.sections' as any, next as any, dirty);
    },
  };
  const fields =
    type === 'text'
      ? [field('heading', 'Page heading', 'line', 'fields.heading'), sections, ...seo]
      : type === 'message'
        ? [
            field('heading', 'Heading', 'line', 'fields.heading'),
            field('tagline', 'Tagline', 'line', 'fields.tagline'),
            field('body', 'Message', 'html', 'fields.body'),
            ...seo,
          ]
        : seo;
  return {
    surface: 'page',
    pageType: type,
    question: type === 'people-list' ? 'Who is listed on this page?' : 'What should this page say?',
    placeholder: PAGE_PLACEHOLDER[type],
    keyphrase: type !== 'people-list',
    factsNote: type === 'message' ? 'Writes as the signer you named below.' : undefined,
    busy: saving,
    facts: () => {
      const v = getValues('fields' as any) || {};
      const facts: Record<string, string> = { pageName: label };
      if (type === 'message' && v.signerName) facts.signerName = String(v.signerName);
      if (type === 'message' && v.signerRole) facts.signerRole = String(v.signerRole);
      return facts;
    },
    fields,
  };
};

const LEAVE_PROMPT = 'You have unsaved changes on this page. Leave without saving?';

/** Warns before closing the tab or following an in-app link while there are unsaved edits. */
function useUnsavedChangesGuard(dirty: boolean) {
  React.useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    // App Router has no route-change events, so catch same-tab link clicks before Next handles them.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey) return;
      if (new URL(link.href, location.href).origin !== location.origin) return;
      if (!window.confirm(LEAVE_PROMPT)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      document.removeEventListener('click', onClick, true);
    };
  }, [dirty]);
}

export default ContentPageEditor;
