'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Controller, useForm, useWatch } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { Box, CircularProgress, FormControlLabel, Switch, Typography } from '@mui/material';
import { IconEye } from '@tabler/icons-react';
import {
  MANAGED_NEWS_POST,
  SAVE_NEWS_POST,
  type NewsCategory,
  type NewsCover,
  type NewsPost,
  type NewsPostInput,
  type NewsStatus,
} from '@/apollo/newsroomOperations';
import type { Photo } from '@/apollo/hooks';
import Button from '@/components/core/Button';
import {
  CoverField,
  EditorField,
  EditorPanel,
  EditorSection,
  EditorShell,
  EditorTitleField,
  PublishPanel,
} from '@/components/editor/EditorShell';
import FormTextField from '@/components/form/FormTextField';
import FormSelectField from '@/components/form/FormSelectField';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import { AiAssistantCard, AiAssistantProvider, type AiFormConfig } from '@/modules/AiAssist';
import { UnsplashImageSelector } from '@/modules/UnsplashImageSelector/UnsplashImamgeSelector';
import { NEWS_CATEGORY_LABELS } from '@/modules/Newsroom/newsroom.utils';

interface NewsFormValues {
  title: string;
  summary: string;
  category: NewsCategory | '';
  cover: NewsCover | null;
  content: string;
  sourceUrl: string;
  publishedAt: Dayjs | null;
  isPinned: boolean;
  updateNote: string;
}

const CATEGORY_OPTIONS = Object.entries(NEWS_CATEGORY_LABELS).map(([value, label]) => ({ value, label }));

const toFormValues = (post?: NewsPost | null): NewsFormValues => ({
  title: post?.title ?? '',
  summary: post?.summary ?? '',
  category: post?.category ?? '',
  cover: post?.cover ?? null,
  content: post?.content ?? '',
  sourceUrl: post?.sourceUrl ?? '',
  publishedAt: post?.publishedAt ? dayjs(post.publishedAt) : null,
  isPinned: post?.isPinned ?? false,
  updateNote: post?.updateNote ?? '',
});

const NewsEditor: React.FC<{ id?: string }> = ({ id }) => {
  const { data, loading } = useQuery<{ managedNewsPost: NewsPost | null }>(MANAGED_NEWS_POST, {
    skip: !id,
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const post = data?.managedNewsPost;

  if (id && loading) {
    return (
      <Box my={6} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }
  if (id && !post) {
    return (
      <Typography sx={{ p: 4 }} color="text.secondary">
        This news could not be found.
      </Typography>
    );
  }
  // Mounted only once the news is loaded, so every field starts with its value and MUI labels sit correctly.
  return <NewsForm id={id} post={post} />;
};

const NewsForm: React.FC<{ id?: string; post?: NewsPost | null }> = ({ id, post }) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [pickCover, setPickCover] = React.useState(false);
  const pendingStatus = React.useRef<NewsStatus>('DRAFT');
  const isPublished = post?.status === 'PUBLISHED';

  const [saveNews, { loading: saving }] = useMutation<{ saveNewsPost: NewsPost }>(SAVE_NEWS_POST, {
    refetchQueries: ['ManagedNewsPosts'],
  });

  const { control, handleSubmit, setValue, getValues } = useForm<NewsFormValues>({ defaultValues: toFormValues(post) });
  const [content, cover, category, publishedAt, summary] = useWatch({
    control,
    name: ['content', 'cover', 'category', 'publishedAt', 'summary'],
  });
  const isFuture = Boolean(publishedAt && dayjs(publishedAt).isAfter(dayjs()));

  const onSubmit = async (values: NewsFormValues) => {
    const status = pendingStatus.current;
    if (status === 'PUBLISHED' && !values.content?.replace(/<[^>]*>/g, '').trim()) {
      showAlert({ visible: true, type: 'error', message: 'Write the news before publishing it.' });
      return;
    }
    const input: NewsPostInput = {
      id: id ?? null,
      title: values.title.trim(),
      summary: values.summary.trim(),
      category: values.category as NewsCategory,
      cover: values.cover,
      content: values.content,
      status,
      publishedAt: values.publishedAt ? dayjs(values.publishedAt).toISOString() : null,
      isPinned: values.isPinned,
      sourceUrl: values.category === 'IN_THE_MEDIA' ? values.sourceUrl.trim() || null : null,
      updateNote: isPublished ? values.updateNote.trim() || null : null,
    };
    try {
      const { data } = await saveNews({ variables: { input } });
      showAlert({
        visible: true,
        type: 'success',
        message:
          status === 'DRAFT'
            ? isPublished
              ? 'News unpublished.'
              : 'Saved as draft.'
            : isPublished
              ? 'News updated.'
              : isFuture
                ? 'News scheduled.'
                : 'News published.',
      });
      const saved = data?.saveNewsPost;
      const live = saved?.status === 'PUBLISHED' && !dayjs(saved.publishedAt).isAfter(dayjs());
      // Live news opens on their page; drafts and scheduled ones wait in the editors' queue on /newsroom.
      router.push(live && saved ? paths.newsroom.getPostUrl(saved.slug) : paths.newsroom.root);
      router.refresh();
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not save the news.' });
    }
  };

  const submitAs = (status: NewsStatus) => () => {
    pendingStatus.current = status;
    handleSubmit(onSubmit)();
  };

  const scheduledFor = isPublished && post?.publishedAt && dayjs(post.publishedAt).isAfter(dayjs());
  const state = !post
    ? {
        label: 'New story',
        tone: 'neutral' as const,
        note: 'Not saved yet. Drafts are visible only to newsroom editors.',
      }
    : scheduledFor
      ? {
          label: 'Scheduled',
          tone: 'scheduled' as const,
          note: `Goes live on ${dayjs(post.publishedAt).format('D MMM YYYY, h:mm A')}.`,
        }
      : isPublished
        ? { label: 'Published', tone: 'live' as const, note: 'Live in the newsroom for everyone.' }
        : { label: 'Draft', tone: 'neutral' as const, note: 'Visible only to newsroom editors.' };

  const dirty = { shouldDirty: true };
  const ai: AiFormConfig = {
    surface: 'news',
    question: 'What is this news about?',
    placeholder:
      'e.g. On 12 Oct the association gave 5 scholarships of ₹25,000 each to Class 12 toppers at JNV Paota. The Principal presented them.',
    busy: saving,
    facts: (): Record<string, string> => {
      const at = getValues('publishedAt');
      return at ? { publishedAt: dayjs(at).format('D MMMM YYYY') } : {};
    },
    fields: [
      {
        key: 'title',
        label: 'Headline',
        kind: 'line',
        name: 'title',
        get: () => getValues('title'),
        set: (v) => setValue('title', v as string, dirty),
      },
      {
        key: 'summary',
        label: 'Summary',
        kind: 'text',
        name: 'summary',
        get: () => getValues('summary'),
        set: (v) => setValue('summary', v as string, dirty),
      },
      {
        key: 'category',
        label: 'Category',
        kind: 'enum',
        name: 'category',
        options: CATEGORY_OPTIONS,
        get: () => getValues('category'),
        set: (v) => setValue('category', v as any, dirty),
      },
      {
        key: 'body',
        label: 'Full story',
        kind: 'html',
        name: 'content',
        get: () => getValues('content'),
        set: (v) => setValue('content', v as string, dirty),
      },
    ],
  };

  return (
    <AiAssistantProvider config={ai}>
      <EditorShell
        onSubmit={(e) => e.preventDefault()}
        assistant={<AiAssistantCard />}
        heading={id ? 'Edit news' : 'Add news'}
        description="Official updates from the association. Lead with the facts: who, what, when and where."
        publish={
          <PublishPanel status={state.label} tone={state.tone} note={state.note}>
            <Button
              title={isPublished ? 'Update' : isFuture ? 'Schedule' : 'Publish'}
              disabled={saving}
              loading={saving && pendingStatus.current === 'PUBLISHED'}
              onClick={submitAs('PUBLISHED')}
            />
            <Button
              title={isPublished ? 'Unpublish' : 'Save draft'}
              variant="outlined"
              color={isPublished ? 'error' : 'primary'}
              disabled={saving}
              loading={saving && pendingStatus.current === 'DRAFT'}
              onClick={submitAs('DRAFT')}
            />
            {isPublished && post?.slug && (
              <Button
                title="View live"
                variant="text"
                startIcon={<IconEye size={18} />}
                onClick={() => window.open(paths.newsroom.getPostUrl(post.slug))}
              />
            )}
          </PublishPanel>
        }
        aside={
          <>
            <EditorPanel title="News settings">
              <EditorField label="Category">
                <FormSelectField
                  control={control}
                  name="category"
                  label="Choose a category"
                  selectProps={{ size: 'small', disabled: saving }}
                  options={CATEGORY_OPTIONS}
                  rules={{ required: 'Pick a category' }}
                />
              </EditorField>
              {category === 'IN_THE_MEDIA' && (
                <EditorField label="Original coverage link" optional>
                  <FormTextField
                    fullWidth
                    name="sourceUrl"
                    control={control}
                    disabled={saving}
                    size="small"
                    placeholder="https://"
                    rules={{ pattern: { value: /^https:\/\/\S+$/i, message: 'Use a full https:// link' } }}
                  />
                </EditorField>
              )}
              <EditorField label="Cover image" optional>
                <CoverField
                  src={String(cover?.url || cover?.thumbUrl || '') || null}
                  alt={cover?.alt || undefined}
                  onPick={() => setPickCover(true)}
                  onRemove={() => setValue('cover', null, { shouldDirty: true })}
                  disabled={saving}
                />
              </EditorField>
            </EditorPanel>
            <EditorPanel title="Publishing">
              <EditorField label="Publish date" optional="Empty means now">
                <FormDateTimeField
                  control={control}
                  name="publishedAt"
                  helperText="Pick a future date to schedule it."
                  // The picker misbehaves on unmount without a label (MUI v7 section DOM), so it always gets one.
                  inputProps={{ label: 'Date and time', size: 'small', fullWidth: true }}
                />
              </EditorField>
              <Controller
                control={control}
                name="isPinned"
                render={({ field }) => (
                  <FormControlLabel
                    sx={{ m: 0, alignItems: 'flex-start', gap: 1.5 }}
                    control={
                      <Switch
                        checked={Boolean(field.value)}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{ mt: -0.5, ml: -1 }}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Pin to the top
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Keeps it first in the newsroom.
                        </Typography>
                      </Box>
                    }
                  />
                )}
              />
              {isPublished && (
                <EditorField label="Update note" optional hint="Shown to readers when you correct a published story.">
                  <FormTextField
                    fullWidth
                    multiline
                    minRows={2}
                    name="updateNote"
                    control={control}
                    disabled={saving}
                    size="small"
                    placeholder="e.g. Corrected the closing date."
                    rules={{ maxLength: { value: 200, message: 'At most 200 characters' } }}
                  />
                </EditorField>
              )}
            </EditorPanel>
          </>
        }
      >
        <EditorTitleField
          control={control}
          name="title"
          placeholder="A clear, factual headline"
          ariaLabel="Headline"
          disabled={saving}
          rules={{
            required: 'Add a headline',
            minLength: { value: 5, message: 'At least 5 characters' },
            maxLength: { value: 160, message: 'At most 160 characters' },
          }}
        />
        <EditorField label="Summary" hint="One or two sentences shown on cards and in search results." sx={{ mt: 3 }}>
          <FormTextField
            fullWidth
            multiline
            minRows={2}
            name="summary"
            control={control}
            disabled={saving}
            placeholder="What happened, in a sentence or two"
            helperText={`${summary?.length || 0} / 300`}
            rules={{
              required: 'Add a summary',
              minLength: { value: 20, message: 'At least 20 characters' },
              maxLength: { value: 300, message: 'At most 300 characters' },
            }}
          />
        </EditorField>
        <EditorSection title="The full story">
          {/* Not disabled while saving: toggling TipTap's editable state as the page unmounts throws removeChild. */}
          <TipTapTextEditor
            value={content}
            onChange={(html) => setValue('content', html, { shouldDirty: true })}
            height="clamp(380px, 56vh, 560px)"
            placeholder="Write the news…"
            aiField="content"
          />
        </EditorSection>

        {pickCover && (
          <UnsplashImageSelector
            open={pickCover}
            onClose={() => setPickCover(false)}
            defaultKeyword={getValues('title')}
            onSelect={(image: Photo & Pick<NewsCover, 'credits'>) =>
              setValue(
                'cover',
                {
                  url: image.url,
                  thumbUrl: image.thumbUrl,
                  alt: image.altDescription || getValues('title'),
                  credits: image.credits ?? null,
                },
                { shouldDirty: true }
              )
            }
          />
        )}
      </EditorShell>
    </AiAssistantProvider>
  );
};

export default NewsEditor;
