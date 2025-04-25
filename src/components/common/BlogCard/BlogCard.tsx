'use client';

import { Box, Chip, Divider, Grid2 as Grid, IconButton, Skeleton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ProfilePicture from '../ProfilePicture';
import {
  IconArrowRight as ArrowRight,
  IconCircleCheck as CheckCircle,
  IconPoint as Dot,
  IconDots as DotsThree,
  IconDotsVertical as DotsThreeVertical,
  IconPencil as Pencil,
  IconTrash as Trash,
  IconPlaystationX as XCircle,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { paths } from '@/config/paths';
import { IBlogCardProps } from './BlogCard.types';
import { BlogStatus } from '@/apollo/hooks';
import { getFormattedLabel, startCase } from '@/utils/helpers';
import React from 'react';
import Menu, { MenuItemProps } from '@/components/core/Menu';

const BlogCard: React.FC<IBlogCardProps> = ({
  blog,
  loading,
  onEdit,
  onVerify,
  onDelete,
  onPublish,
  isAdminUser,
  user,
  isReadOnly,
}) => {
  const { id, slug, title, summary, status, createdAt, updatedAt, author } = blog;
  const router = useRouter();

  const statusColor = React.useMemo(() => {
    switch (status) {
      case BlogStatus.Draft:
        return 'error';
      case BlogStatus.PendingApproval:
        return 'error';
      case BlogStatus.RequestChanges:
        return 'error';
    }
  }, [status]);

  const menuItems: MenuItemProps[] | null = React.useMemo(() => {
    if (isReadOnly || (!isAdminUser && user?.id !== author?.id)) {
      return null;
    }
    const items: MenuItemProps[] = [];

    switch (status) {
      case BlogStatus.Draft:
        items.push(
          {
            label: 'Edit',
            value: 'edit',
            onClick: () => onEdit?.(slug || ''),
            icon: <Pencil size={16} />,
          },
          {
            label: 'Publish',
            value: 'publish',
            onClick: () => onPublish?.(id),
            icon: <CheckCircle size={18} />,
            sx: {
              color: 'success.main',
              svg: {
                color: 'success.main',
              },
            },
          },
          {
            label: 'Delete',
            value: 'delete',
            onClick: () => onDelete?.(id),
            icon: <Trash size={18} />,
            sx: {
              color: 'error.main',
              svg: {
                color: 'error.main',
              },
            },
          }
        );
        break;
      case BlogStatus.PendingApproval:
        items.push(
          {
            label: 'Edit',
            value: 'edit',
            onClick: () => onEdit?.(slug || ''),
            icon: <Pencil size={16} />,
          },
          {
            label: 'Delete',
            value: 'delete',
            onClick: () => onDelete?.(id),
            icon: <Trash size={18} />,
            sx: {
              color: 'error.main',
              svg: {
                color: 'error.main',
              },
            },
          }
        );

        if (isAdminUser) {
          items.splice(1, 0, {
            label: 'Approve',
            value: 'approve',
            onClick: () => onVerify?.(id),
            icon: <CheckCircle size={18} />,
            sx: {
              color: 'success.main',
              svg: {
                color: 'success.main',
              },
            },
          });
        } else {
          items.splice(1, 0, {
            label: 'Move to Draft',
            value: 'unpublish',
            onClick: () => onPublish?.(id, true),
            icon: <XCircle size={18} />,
            sx: {
              color: 'error.main',
              svg: {
                color: 'error.main',
              },
            },
          });
        }
        break;
      case BlogStatus.Published:
        items.push(
          {
            label: 'Edit',
            value: 'edit',
            onClick: () => onEdit?.(slug || ''),
            icon: <Pencil size={16} />,
          },
          {
            label: 'Unpublish',
            value: 'unpublish',
            onClick: () => onPublish?.(id, true),
            icon: <XCircle size={18} />,
            sx: {
              color: 'error.main',
              svg: {
                color: 'error.main',
              },
            },
          }
        );
        break;
      default:
        break;
    }
    return items;
  }, [isAdminUser, slug, id, author, user, status, isReadOnly]);

  console.log('SS: BLOG', status, menuItems);

  return (
    <Box width="100%" display="flex" gap={{ xs: 1, md: 2 }}>
      <Box
        component={Grid}
        width="100%"
        container
        bgcolor="grey.100"
        borderRadius={4}
        display="flex"
        p={{
          xs: 3,
          md: 4,
        }}
        //   py={2}
        alignItems="center"
        justifyContent="start"
        //   gap={5}
        sx={{
          position: 'relative',
          transition: 'all 0.4s ease',
          h1: {
            transition: 'all 0.2s linear',
          },
          '&: hover': {
            px: {
              xs: 3,
              md: 7,
            },

            h1: {
              color: 'primary.main',
            },
          },
        }}
      >
        <Box
          component={Grid}
          size={{ xs: 1 }}
          height={{
            xs: 'auto',
            md: '100%',
          }}
          display={{
            xs: 'none',
            md: 'flex',
          }}
          flexDirection={{
            xs: 'row',
            md: 'column',
          }}
          alignItems="start"
          justifyContent={{
            xs: 'start',
            md: 'center',
          }}

          // justifyContent="center"
        >
          <Box gap={0.5} textTransform="uppercase" textAlign="center" alignItems="center" display="flex">
            {loading ? (
              <Skeleton width={50} height={20} />
            ) : (
              <>
                {' '}
                <Typography fontSize="0.7rem" variant="body2">
                  {dayjs(updatedAt).format('MMM').toString()}
                </Typography>
                <Typography fontSize="0.9rem" variant="subtitle1">
                  {dayjs(updatedAt).format('DD').toString()}
                </Typography>
              </>
            )}
          </Box>
          {loading ? (
            <Skeleton width={50} height={20} />
          ) : (
            <Typography fontSize="1rem" alignItems="center" display="flex" variant="body2" ml={{ xs: 1, md: 0 }}>
              {dayjs().format('YYYY').toString()}
            </Typography>
          )}
        </Box>
        <Box width="100%" display={{ xs: 'flex', md: 'none' }} mb={1.5} alignItems="center" gap={0.5}>
          <Typography variant="body2">{dayjs(updatedAt).format('MMM DD, YYYY')}</Typography>
          {/* {categoryId && (
                  <>
                    <DotOutline size={32}  />
                    <Typography>{categoryId}</Typography>
                  </>
                )} */}
          {/* {statusMessage && (
            <>
              <Dot size={32}  />
              <Chip size="small" label={startCase(status as string)} color="error" />
            </>
          )} */}
          <Dot size={32} />
          <ProfilePicture
            id={author?.id}
            size={28}
            title={`${author?.firstName || ''} ${author?.lastName || ''}`}
            alt={`${author?.firstName || ''} ${author?.lastName || ''}`}
            src={author?.profileImage}
            onClick={() => (author?.id ? router.push(paths.profile.getProfileUrl(author?.id)) : null)}
            summary={`Batch of ${author?.batch || ''}`}
            titleComponentProps={{
              titleProps: {
                fontSize: '12px',
              },
              summaryProps: {
                fontSize: '10px',
              },
            }}
          />
          {menuItems && menuItems?.length > 0 && (
            <Box sx={{ ml: 'auto' }}>
              <Menu
                //  onChange={(val) => editor?.commands.toggleHeading({ level: val as Level })}
                // value={editor?.getAttributes('heading')?.level}
                items={menuItems}
                slotProps={{
                  paper: {
                    elevation: 0,

                    sx: {
                      minWidth: 150,
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                render={
                  <IconButton>
                    <DotsThreeVertical size={24} />
                  </IconButton>
                }
              />
            </Box>
          )}
        </Box>
        <Box
          component={Grid}
          size={{ xs: 12, md: 9.5 }}
          display="flex"
          flexDirection="column"
          onClick={() => (slug ? router.push(paths.blog.getBlogPostUrl(slug)) : null)}
          sx={{
            cursor: 'pointer',
            svg: {
              transition: 'all 0.3s linear',
              ml: '10px',
              opacity: 0,
            },
            '&: hover': {
              svg: {
                opacity: 1,
                ml: '16px',
                color: 'primary.main',
              },
            },
          }}
        >
          {loading ? (
            <Skeleton width="80%" height={32} />
          ) : (
            <Typography variant="h1" sx={{ display: 'flex', fontWeight: 500, alignItems: 'center' }}>
              {title}{' '}
              {status !== BlogStatus.Published && (
                <Chip size="small" label={getFormattedLabel(status)} color={statusColor} sx={{ ml: 1 }} />
              )}{' '}
              <ArrowRight size={28} />
            </Typography>
          )}

          {summary && (
            <Typography variant="body1" mt={0.5}>
              {summary}
            </Typography>
          )}
        </Box>
        <Box component={Grid} size={{ xs: 12, md: 1.5 }} ml="auto" display={{ xs: 'none', md: 'flex' }}>
          <ProfilePicture
            title={`${author?.firstName || ''} ${author?.lastName || ''}`}
            loading={loading}
            id={author?.id}
            size={44}
            onClick={() => (author?.id ? router.push(paths.profile.getProfileUrl(author?.id)) : null)}
            src={author?.profileImage}
            summary={author?.isFaculty ? 'Faculty' : author?.batch ? `Batch of ${author?.batch}` : ''}
            containerProps={{
              maxWidth: '150px',
            }}
            titleComponentProps={{
              titleProps: {
                maxWidth: '130px',
                fontSize: '14px',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              summaryProps: {
                fontSize: '10px',
              },
            }}
          />
        </Box>
      </Box>
      {menuItems && menuItems?.length > 0 && (
        <Box
          bgcolor="grey.100"
          borderRadius={4}
          display={{
            xs: 'none',
            md: 'flex',
          }}
          p={{
            xs: 1,
            md: 3,
          }}
          //   py={2}
          alignItems="center"
          justifyContent="center"
          //   gap={5}
          sx={{
            position: 'relative',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
          }}
        >
          <Menu
            //  onChange={(val) => editor?.commands.toggleHeading({ level: val as Level })}
            // value={editor?.getAttributes('heading')?.level}
            items={menuItems}
            slotProps={{
              paper: {
                elevation: 0,

                sx: {
                  minWidth: 150,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            render={
              <IconButton>
                <DotsThree size={32} />
              </IconButton>
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default BlogCard;
