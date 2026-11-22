'use client';

import React from 'react';

import { useAlert } from '@/context/AlertContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { Box, CircularProgress, Typography } from '@mui/material';
import {
  CoverField,
  EditorField,
  EditorPanel,
  EditorSection,
  EditorShell,
  EditorTitleField,
  PublishPanel,
} from '@/components/editor/EditorShell';
import FormSelectField from '@/components/form/FormSelectField';
import { INewBlogFormInput } from './NewBlog.types';
import Button from '@/components/core/Button';
import {
  EventStatus,
  BlogStatus,
  useCreateBlogMutation,
  useGetEventDetailsQuery,
  usePublishEventMutation,
  useUpdateEventMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
  Photo,
} from '@/apollo/hooks';
import { paths } from '@/config/paths';
import TipTapTextEditor from '@/modules/TipTapTextEditor';
import { IconEye } from '@tabler/icons-react';
import { useApolloClient } from '@apollo/client';
import dayjs from 'dayjs';
import { BLOG_CATEGORIES } from '@/constants/Blog.constants';
import { useAuth } from '@/context/AuthContext';
import { UnsplashImageSelector } from '../UnsplashImageSelector/UnsplashImamgeSelector';
import { brand } from '@/config/tenant';

const NewBlog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('id');
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const { user } = useAuth();
  const saveTypeRef = React.useRef('draft');

  const [selectCoverImage, setSelectCoverImage] = React.useState<boolean>(false);
  const [createBlog, { loading }] = useCreateBlogMutation();
  const [updateBlog, { loading: updateBlogLoading }] = useUpdateBlogMutation();
  //   const [publishBlog, { loading: publishBlogLoading }] = useUpdateBlogMutation();
  const { data: blogData, loading: blogDataLoading } = useGetBlogQuery({
    skip: !slug,
    variables: {
      slug: slug as string,
    },
  });

  const blogId = React.useMemo(() => {
    return blogData?.getBlog?.id;
  }, [blogData]);

  const isPublishAllowed = React.useMemo(() => {
    return (
      !blogData?.getBlog?.status ||
      blogData?.getBlog?.status === BlogStatus.Draft ||
      blogData?.getBlog?.status === BlogStatus.RequestChanges
    );
  }, [blogData]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<INewBlogFormInput>();
  const content = useWatch({ control, name: 'content' }) || '';
  const cover = useWatch({ control, name: 'cover' });

  React.useEffect(() => {
    if (blogData?.getBlog?.id) {
      reset({
        title: blogData?.getBlog?.title,
        content: blogData?.getBlog?.content,
        category: blogData?.getBlog?.categoryId,
        cover: blogData?.getBlog?.cover,
      });
    }
  }, [blogData, reset]);

  const onSubmit = React.useCallback(
    (data: INewBlogFormInput) => {
      if (blogId) {
        const variables: any = {
          id: blogId,
          cover: data?.cover,
          title: data?.title?.trim(),
          content: data?.content,
          categoryId: data?.category,
        };

        if (isPublishAllowed && saveTypeRef.current === 'publish') {
          variables.status = EventStatus.Published;
        }

        if (!isPublishAllowed && saveTypeRef.current === 'draft') {
          variables.status = EventStatus.Draft;
        }

        updateBlog({
          variables,
          onCompleted: () => {
            if (saveTypeRef.current === 'publish') {
              client.cache.evict({ fieldName: 'getBlogList' });
              client.cache.gc();
              router.push(paths.blog.root);
            }
          },
          onError: (err) => {
            showAlert({
              visible: true,
              type: 'error',
              message: err?.message || 'Something went wrong.',
            });
          },
        });
        return;
      }
      if (saveTypeRef.current === 'publish' && !data?.content) {
        showAlert({
          visible: true,
          type: 'error',
          message: 'Please update the content to publish the blog.',
        });
        return;
      }
      createBlog({
        variables: {
          title: data?.title?.trim(),
          content: data?.content,
          categoryId: data?.category,
          cover: data?.cover,
          // image: `https://${brand.domains.site}/assets/events/${data?.category}.jpg`,
          status: saveTypeRef.current === 'publish' ? BlogStatus.Published : BlogStatus.Draft,
          authorId: user?.id,
        },
        onCompleted: async () => {
          client.cache.evict({ fieldName: 'getBlogList' });
          client.cache.gc();
          router.push(paths.blog.root);
        },
        onError: (err) => {
          showAlert({
            visible: true,
            type: 'error',
            message: err?.message || 'Something went wrong.',
          });
        },
      });
    },
    [isPublishAllowed, createBlog, router, client, blogId, user, updateBlog, showAlert]
  );

  const saving = React.useMemo(() => {
    return updateBlogLoading || loading;
  }, [loading, updateBlogLoading]);

  if (blogDataLoading) {
    return (
      <Box my={8} display="flex" flexDirection="column" alignItems="center" gap={1.5}>
        <CircularProgress size={28} />
        <Typography color="text.secondary">Loading your story…</Typography>
      </Box>
    );
  }

  const status = blogData?.getBlog?.status;
  const isLive = status === BlogStatus.Published || status === BlogStatus.Approved;
  const state = !status
    ? { label: 'New story', tone: 'neutral' as const, note: 'Not saved yet. Drafts are visible only to you.' }
    : isLive
      ? { label: 'Published', tone: 'live' as const, note: 'Live on the blog for everyone to read.' }
      : status === BlogStatus.RequestChanges
        ? { label: 'Changes requested', tone: 'attention' as const, note: 'Make the edits, then publish again.' }
        : status === BlogStatus.PendingApproval
          ? {
              label: 'Waiting for review',
              tone: 'scheduled' as const,
              note: 'An admin reviews it before it goes live.',
            }
          : { label: 'Draft', tone: 'neutral' as const, note: 'Only you can see this story.' };

  return (
    <EditorShell
      onSubmit={handleSubmit(onSubmit)}
      heading={slug ? 'Edit your story' : 'Write a story'}
      description={`Share an experience, a memory or a lesson with the ${brand.institution.shortName} alumni community.`}
      publish={
        <PublishPanel status={state.label} tone={state.tone} note={state.note}>
          <Button
            title={isPublishAllowed ? 'Publish' : 'Update'}
            type="submit"
            onClick={() => (saveTypeRef.current = 'publish')}
            disabled={saving}
            loading={saveTypeRef.current === 'publish' && saving}
          />
          <Button
            title={isLive ? 'Unpublish' : 'Save draft'}
            type="submit"
            variant="outlined"
            color={isLive ? 'error' : 'primary'}
            onClick={() => (saveTypeRef.current = 'draft')}
            disabled={saving}
            loading={saveTypeRef.current === 'draft' && saving}
          />
          {blogData?.getBlog?.slug && (
            <Button
              title="Preview"
              variant="text"
              startIcon={<IconEye size={18} />}
              onClick={() => window.open(paths.blog.getBlogPostUrl(blogData?.getBlog?.slug || ''))}
            />
          )}
        </PublishPanel>
      }
      aside={
        <EditorPanel title="Story settings">
          <EditorField label="Category">
            <FormSelectField
              control={control}
              name="category"
              label="Choose a category"
              selectProps={{ size: 'small', disabled: saving }}
              options={BLOG_CATEGORIES}
              rules={{ required: 'Pick a category' }}
            />
          </EditorField>
          <EditorField label="Cover image" optional>
            <CoverField
              src={cover?.url || cover?.thumbUrl}
              alt={cover?.altDescription || undefined}
              onPick={() => setSelectCoverImage(true)}
              disabled={saving}
            />
          </EditorField>
        </EditorPanel>
      }
    >
      <EditorTitleField
        control={control}
        name="title"
        placeholder="Give your story a title"
        ariaLabel="Story title"
        disabled={saving}
        rules={{ required: 'Add a title' }}
      />
      <EditorSection title="Your story" hint="Use headings, lists and links to keep it easy to read.">
        <TipTapTextEditor
          value={content}
          onChange={(data) => setValue('content', data, { shouldDirty: true })}
          disabled={saving}
          height="clamp(380px, 56vh, 560px)"
          placeholder="Begin your story…"
          ai={{ surface: 'blog', onTitle: (t) => setValue('title', t, { shouldDirty: true }) }}
        />
      </EditorSection>
      {selectCoverImage && (
        <UnsplashImageSelector
          open={selectCoverImage}
          onClose={() => setSelectCoverImage(false)}
          defaultKeyword={getValues('title')}
          onSelect={(image: Photo) => setValue('cover', image, { shouldDirty: true })}
        />
      )}
    </EditorShell>
  );
};

export default NewBlog;
