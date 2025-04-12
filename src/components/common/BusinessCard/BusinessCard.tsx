import { Box, Chip, Divider, Grid2 as Grid, IconButton, Skeleton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ProfilePicture from '../ProfilePicture';
import {
  ArrowRight,
  CheckCircle,
  Dot,
  DotsThree,
  DotsThreeVertical,
  Pencil,
  Trash,
  XCircle,
} from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { paths } from '@/config/paths';
import { BusinessCardProps } from './BusinessCard.types';
import { BlogStatus } from '@/apollo/hooks';
import React from 'react';
import Menu, { MenuItemProps } from '@/components/core/Menu';
import VerifiedBadge from '../VerifiedBadge';

const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  loading,
  onEdit,
  onVerify,
  onDelete,
  onPublish,
  isAdminUser,
  user,
  isReadOnly,
}) => {
  const { id, name, description, isVerified, createdAt, updatedAt, user: businessUser } = business;
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
    if (isReadOnly || (!isAdminUser && user?.id !== businessUser?.id)) {
      return null;
    }
    const items: MenuItemProps[] = [];

    switch (status) {
      case BlogStatus.Draft:
        items.push(
          {
            label: 'Edit',
            value: 'edit',
            onClick: () => onEdit?.(id || ''),
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
            onClick: () => onEdit?.(id || ''),
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
            onClick: () => onEdit?.(id || ''),
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
  }, [isAdminUser, id, id, businessUser, user, status, isReadOnly]);

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
          // '&: hover': {
          //   px: {
          //     xs: 3,
          //     md: 7,
          //   },

          //   h1: {
          //     color: 'primary.main',
          //   },
          // },
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
          {/* <Box gap={0.5} textTransform="uppercase" textAlign="center" alignItems="center" display="flex">
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
          </Box> */}
          {/* {loading ? (
            <Skeleton width={50} height={20} />
          ) : (
            <Typography fontSize="1rem" alignItems="center" display="flex" variant="body2" ml={{ xs: 1, md: 0 }}>
              {dayjs().format('YYYY').toString()}
            </Typography>
          )} */}
        </Box>
        <Box width="100%" display={{ xs: 'flex', md: 'none' }} mb={1.5} alignItems="center" gap={0.5}>
          <Typography variant="body2">{dayjs(updatedAt).format('MMM DD, YYYY')}</Typography>
          {/* {categoryId && (
                  <>
                    <DotOutline size={32} weight="bold" />
                    <Typography>{categoryId}</Typography>
                  </>
                )} */}
          {/* {statusMessage && (
            <>
              <Dot size={32} weight="bold" />
              <Chip size="small" label={startCase(status as string)} color="error" />
            </>
          )} */}
          <Dot size={32} weight="bold" />
          <ProfilePicture
            id={businessUser?.id}
            size={28}
            title={`${businessUser?.firstName || ''} ${businessUser?.lastName || ''}`}
            alt={`${businessUser?.firstName || ''} ${businessUser?.lastName || ''}`}
            src={businessUser?.profileImage}
            onClick={() => (businessUser?.id ? router.push(paths.profile.getProfileUrl(businessUser?.id)) : null)}
            summary={`Batch of ${businessUser?.batch || ''}`}
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
                    <DotsThreeVertical size={24} weight="bold" />
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
          onClick={() => (id ? router.push(paths.business.getBusinessDetailUrl(id)) : null)}
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
            <Typography variant="h1" sx={{ display: 'flex', alignItems: 'center' }}>
              {name}{' '}
              {isVerified ? (
                <VerifiedBadge title="Verified" />
              ) : (
                <Chip size="small" label="Pending Approval" color="error" />
              )}{' '}
              {/* <ArrowRight size={28} weight="bold" /> */}
            </Typography>
          )}

          {description && (
            <Typography variant="body1" mt={0.5}>
              {description}
            </Typography>
          )}
        </Box>
        <Box component={Grid} size={{ xs: 12, md: 1.5 }} ml="auto" display={{ xs: 'none', md: 'flex' }}>
          <ProfilePicture
            title={`${businessUser?.firstName || ''} ${businessUser?.lastName || ''}`}
            loading={loading}
            id={businessUser?.id}
            onClick={() => (businessUser?.id ? router.push(paths.profile.getProfileUrl(businessUser?.id)) : null)}
            src={businessUser?.profileImage}
            summary={businessUser?.isFaculty ? 'Faculty' : businessUser?.batch ? `Batch of ${businessUser?.batch}` : ''}
            containerProps={{
              maxWidth: '150px',
            }}
            titleComponentProps={{
              titleProps: {
                maxWidth: '100%',
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
                <DotsThree size={32} weight="bold" />
              </IconButton>
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default BusinessCard;
