import React from 'react';

import { useAlert } from '@/context/AlertContext';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { Box, CircularProgress, Divider, Grid2 as Grid, Typography } from '@mui/material';
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
import { Eye, FloppyDiskBack } from '@phosphor-icons/react';
import { useApolloClient } from '@apollo/client';
import dayjs from 'dayjs';
import { BLOG_CATEGORIES } from '@/constants/Blog.constants';
import { useAuth } from '@/context/AuthContext';
import { UnsplashImageSelector } from '../UnsplashImageSelector/UnsplashImamgeSelector';
import Image from 'next/image';

const NewBlog = () => {
  const router = useRouter();
  const { id: slug } = router.query;
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

  console.log('ZZ: getValues', getValues());

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
              client.refetchQueries({
                include: ['getBlogList'],
              });
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
          client.refetchQueries({
            include: ['getBlogList'],
          });
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
    [isPublishAllowed, createBlog, router, client, blogId, user, updateBlog]
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        p: 3,
        // p: 3,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
      }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormSelectField
            control={control}
            name="category"
            selectProps={{
              //label: 'Category',
              size: 'small',
              id: 'medium',
              disabled: saving,
            }}
            options={BLOG_CATEGORIES}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
          {getValues('cover') && (
            <Image
              src={getValues('cover')?.thumbUrl}
              width={100}
              height={50}
              alt="cover"
              style={{ borderRadius: '6px' }}
            />
          )}
          <Button
            title={getValues('cover') ? 'Change Cover Image' : 'Select Cover Image'}
            variant="text"
            onClick={() => setSelectCoverImage(true)}
          />
        </Grid>
        <Box component={Grid} size={{ xs: 12, md: 6 }} display="flex" gap={2} alignItems="center" justifyContent="end">
          {blogData?.getBlog?.slug && (
            <Button
              title="Preview"
              variant="outlined"
              startIcon={<Eye size={18} />}
              onClick={() => window.open(paths.blog.getBlogPostUrl(blogData?.getBlog?.slug || ''))}
            />
          )}

          <Button
            // size="small"
            title={blogData?.getBlog?.status === BlogStatus.Published ? 'Unpublish' : 'Save'}
            onClick={() => {
              saveTypeRef.current = 'draft';
              handleSubmit(onSubmit);
            }}
            startIcon={<FloppyDiskBack size={16} />}
            type="submit"
            color={blogData?.getBlog?.status === BlogStatus.Published ? 'error' : 'primary'}
            variant="outlined"
            disabled={saving}
            loading={saveTypeRef.current === 'draft' && saving}
          />
          <Button
            // size="small"
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
        <Grid size={{ xs: 12 }}>
          <FormTextField
            fullWidth
            id="title"
            // label="Title"
            autoFocus
            multiline
            minRows={1}
            control={control}
            disabled={saving}
            name="title"
            size="small"
            placeholder="Title"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { fontSize: '2rem', fontWeight: 500, fontFamily: 'Playfair Display', padding: 0, px: 2 }, // Custom styling
            }}
            sx={{
              backgroundColor: 'transparent', // Ensure it blends in
            }}
            rules={{
              required: 'Required',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Divider />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box display="flex" flexDirection="column">
            <TipTapTextEditor
              value={getValues('content')}
              onChange={(data) => setValue('content', data)}
              sx={{
                border: 'none',
                '& .tiptap': {
                  px: 2,
                  outline: 'none',
                  minHeight: 300,
                },
              }}
              toolbarProps={{ sx: { borderRadius: '40px' } }}
            />
          </Box>
        </Grid>
      </Grid>
      {selectCoverImage && (
        <UnsplashImageSelector
          open={selectCoverImage}
          onClose={() => setSelectCoverImage(false)}
          defaultKeyword={getValues('title')}
          onSelect={(image: Photo) => setValue('cover', image)}
        />
      )}
    </Box>
  );
};

export default NewBlog;
