'use client';

import React from 'react';

import { useAlert } from '@/context/AlertContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { Box, CircularProgress, Grid2 as Grid, Typography } from '@mui/material';
import FormTextField from '@/components/form/FormTextField';
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
import { IconEye, IconDeviceFloppy, IconPhoto } from '@tabler/icons-react';
import { useApolloClient } from '@apollo/client';
import dayjs from 'dayjs';
import { BLOG_CATEGORIES } from '@/constants/Blog.constants';
import { useAuth } from '@/context/AuthContext';
import { UnsplashImageSelector } from '../UnsplashImageSelector/UnsplashImamgeSelector';
import Image from 'next/image';

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
          // image: `https://jnvpjaa.org/assets/events/${data?.category}.jpg`,
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
      <Box my={3} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <CircularProgress />
        <Typography>Loading blog data...</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>
            Alumni stories
          </Typography>
          <Typography component="h1" variant="h2" sx={{ mt: 0.25 }}>
            {slug ? 'Edit your story' : 'Write a story'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            Write for the JNV Paota alumni community.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          {blogData?.getBlog?.slug && (
            <Button
              title="Preview"
              variant="outlined"
              startIcon={<IconEye size={18} />}
              onClick={() =>
                typeof window !== 'undefined'
                  ? window.open(paths.blog.getBlogPostUrl(blogData?.getBlog?.slug || ''))
                  : null
              }
            />
          )}

          <Button
            title={blogData?.getBlog?.status === BlogStatus.Published ? 'Unpublish' : 'Save'}
            onClick={() => {
              saveTypeRef.current = 'draft';
              handleSubmit(onSubmit);
            }}
            startIcon={<IconDeviceFloppy size={16} />}
            type="submit"
            color={blogData?.getBlog?.status === BlogStatus.Published ? 'error' : 'primary'}
            variant="outlined"
            disabled={saving}
            loading={saveTypeRef.current === 'draft' && saving}
          />
          <Button
            title={isPublishAllowed ? 'Save & Publish' : 'Update'}
            onClick={() => {
              saveTypeRef.current = 'publish';
              handleSubmit(onSubmit);
            }}
            action="save"
            type="submit"
            color="success"
            disabled={saving}
            loading={saveTypeRef.current === 'publish' && saving}
          />
        </Box>
      </Box>
      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 600 }}>
            Title
          </Typography>
          <FormTextField
            fullWidth
            id="title"
            autoFocus
            multiline
            minRows={1}
            control={control}
            disabled={saving}
            name="title"
            size="small"
            placeholder="Give your story a title"
            variant="standard"
            inputProps={{ 'aria-label': 'Story title' }}
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: { xs: '1.75rem', md: '2.15rem' },
                lineHeight: 1.2,
                fontWeight: 500,
                fontFamily: 'Playfair Display',
                p: 0,
              },
            }}
            sx={{ pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 600 }}>
            Category
          </Typography>
          <FormSelectField
            control={control}
            name="category"
            label="Category"
            selectProps={{ size: 'small', disabled: saving }}
            options={BLOG_CATEGORIES}
            rules={{ required: 'Required' }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 600 }}>
            Cover image
          </Typography>
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
            {cover?.thumbUrl && (
              <Image
                src={cover.thumbUrl}
                width={76}
                height={48}
                alt="Selected story cover"
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
              onClick={() => setSelectCoverImage(true)}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
            Your story
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Use headings, lists, and links to make your story easy to read.
          </Typography>
          <TipTapTextEditor
            value={content}
            onChange={(data) => setValue('content', data, { shouldDirty: true })}
            disabled={saving}
            height="clamp(380px, 56vh, 540px)"
            placeholder="Begin your story..."
          />
        </Grid>
      </Grid>
      {selectCoverImage && (
        <UnsplashImageSelector
          open={selectCoverImage}
          onClose={() => setSelectCoverImage(false)}
          defaultKeyword={getValues('title')}
          onSelect={(image: Photo) => setValue('cover', image, { shouldDirty: true })}
        />
      )}
    </Box>
  );
};

export default NewBlog;
