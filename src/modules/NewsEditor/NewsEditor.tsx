'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Controller, useForm, useWatch } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { Box, CircularProgress, FormControlLabel, Grid2 as Grid, Switch, Typography } from '@mui/material';
import { IconEye, IconPhoto } from '@tabler/icons-react';
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
import FormTextField from '@/components/form/FormTextField';
import FormSelectField from '@/components/form/FormSelectField';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
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

const label = (text: string) => (
  <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 600 }}>
    {text}
  </Typography>
);

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
        This article could not be found.
      </Typography>
    );
  }
  // Mounted only once the article is loaded, so every field starts with its value and MUI labels sit correctly.
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
      showAlert({ visible: true, type: 'error', message: 'Write the article before publishing it.' });
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
              ? 'Article unpublished.'
              : 'Saved as draft.'
            : isPublished
              ? 'Article updated.'
              : isFuture
                ? 'Article scheduled.'
                : 'Article published.',
      });
      const saved = data?.saveNewsPost;
      const live = saved?.status === 'PUBLISHED' && !dayjs(saved.publishedAt).isAfter(dayjs());
      // Live articles open on their page; drafts and scheduled ones wait in the editors' queue on /newsroom.
      router.push(live && saved ? paths.newsroom.getPostUrl(saved.slug) : paths.newsroom.root);
      router.refresh();
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not save the article.' });
    }
  };

  const submitAs = (status: NewsStatus) => () => {
    pendingStatus.current = status;
    handleSubmit(onSubmit)();
  };

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>
            Newsroom
          </Typography>
          <Typography component="h1" variant="h2" sx={{ mt: 0.25 }}>
            {id ? 'Edit article' : 'New article'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          {isPublished && post?.slug && (
            <Button
              title="View"
              variant="outlined"
              startIcon={<IconEye size={18} />}
              onClick={() => window.open(paths.newsroom.getPostUrl(post.slug))}
            />
          )}
          <Button
            title={isPublished ? 'Unpublish' : 'Save draft'}
            variant="outlined"
            color={isPublished ? 'error' : 'primary'}
            disabled={saving}
            loading={saving && pendingStatus.current === 'DRAFT'}
            onClick={submitAs('DRAFT')}
          />
          <Button
            title={isPublished ? 'Update' : isFuture ? 'Schedule' : 'Publish'}
            color="success"
            disabled={saving}
            loading={saving && pendingStatus.current === 'PUBLISHED'}
            onClick={submitAs('PUBLISHED')}
          />
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        <Grid size={12}>
          {label('Headline')}
          <FormTextField
            fullWidth
            name="title"
            control={control}
            disabled={saving}
            size="small"
            placeholder="A clear, factual headline"
            rules={{
              required: 'Required',
              minLength: { value: 5, message: 'At least 5 characters' },
              maxLength: { value: 160, message: 'At most 160 characters' },
            }}
          />
        </Grid>
        <Grid size={12}>
          {label('Summary')}
          <FormTextField
            fullWidth
            multiline
            minRows={2}
            name="summary"
            control={control}
            disabled={saving}
            size="small"
            placeholder="One or two sentences shown on cards and in search results"
            helperText={`${summary?.length || 0}/300`}
            rules={{
              required: 'Required',
              minLength: { value: 20, message: 'At least 20 characters' },
              maxLength: { value: 300, message: 'At most 300 characters' },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          {label('Category')}
          <FormSelectField
            control={control}
            name="category"
            label="Category"
            selectProps={{ size: 'small', disabled: saving }}
            options={CATEGORY_OPTIONS}
            rules={{ required: 'Required' }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          {label('Cover image')}
          <Box
            sx={{
              minHeight: 64,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1.5,
              px: 1.5,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            {(cover?.thumbUrl || cover?.url) && (
              <Image
                src={String(cover.thumbUrl || cover.url)}
                width={76}
                height={48}
                alt="Selected cover"
                style={{ borderRadius: 6, objectFit: 'cover' }}
              />
            )}
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              {cover ? 'Cover selected' : 'Optional'}
            </Typography>
            <Button
              title={cover ? 'Change image' : 'Choose image'}
              startIcon={<IconPhoto size={18} />}
              variant="outlined"
              size="small"
              onClick={() => setPickCover(true)}
            />
          </Box>
        </Grid>
        {category === 'IN_THE_MEDIA' && (
          <Grid size={12}>
            {label('Original coverage link')}
            <FormTextField
              fullWidth
              name="sourceUrl"
              control={control}
              disabled={saving}
              size="small"
              placeholder="https://"
              rules={{ pattern: { value: /^https:\/\/\S+$/i, message: 'Use a full https:// link' } }}
            />
          </Grid>
        )}
        <Grid size={{ xs: 12, md: 6 }}>
          {label('Schedule')}
          <FormDateTimeField
            control={control}
            name="publishedAt"
            helperText="Leave empty to publish now. A future date schedules the article."
            // The picker misbehaves on unmount without a label (MUI v7 section DOM), so it always gets one.
            inputProps={{ label: 'Publish date', size: 'small', fullWidth: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
          <Controller
            control={control}
            name="isPinned"
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                label="Pin as the lead article"
              />
            )}
          />
        </Grid>
        {isPublished && (
          <Grid size={12}>
            {label('Update note')}
            <FormTextField
              fullWidth
              name="updateNote"
              control={control}
              disabled={saving}
              size="small"
              placeholder="What changed after publication, e.g. 'Corrected the closing date.'"
              rules={{ maxLength: { value: 200, message: 'At most 200 characters' } }}
            />
          </Grid>
        )}
        <Grid size={12}>
          {label('Article')}
          {/* Not disabled while saving: toggling TipTap's editable state as the page unmounts throws removeChild. */}
          <TipTapTextEditor
            value={content}
            onChange={(html) => setValue('content', html, { shouldDirty: true })}
            height="clamp(380px, 56vh, 540px)"
            placeholder="Write the article..."
          />
        </Grid>
      </Grid>

      {pickCover && (
        <UnsplashImageSelector
          open={pickCover}
          onClose={() => setPickCover(false)}
          defaultKeyword={getValues('title')}
          onSelect={(image: Photo) =>
            setValue(
              'cover',
              { url: image.url, thumbUrl: image.thumbUrl, alt: image.altDescription || getValues('title') },
              { shouldDirty: true }
            )
          }
        />
      )}
    </Box>
  );
};

export default NewsEditor;
