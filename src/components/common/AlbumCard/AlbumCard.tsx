import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Badge,
  Avatar,
  Box,
  Stack,
  AvatarGroup,
  Chip,
  Skeleton,
  Tooltip,
  Divider,
} from '@mui/material';
import { AlbumCardProps } from './AlbumCard.types';
import Button from '@/components/core/Button';
import { getAvatarDataUrl, startCase, valueToLabelFormatter } from '@/utils/helpers';
import { ArrowRight, CalendarDots, ImagesSquare, Star } from '@phosphor-icons/react';
import { EventStatus, Maybe, User, UserBasic } from '@/apollo/hooks';
import ProfilePicture from '../ProfilePicture';
import { paths } from '@/config/paths';
import { useRouter } from 'next/router';
import CopyContentButton from '@/components/common/CopyContentButton';
import dayjs from 'dayjs';
import Image from 'next/image';

const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  user,
  isAdmin,
  // verifyEvent,
  // onEdit,
  // onPublish,
  // event,
  loading,
  // markImGoing,
  isMinimal,
  // isReadOnly,
}) => {
  const router = useRouter();
  const { id, title, description, coverImage, total_photos, createdAt, contributors: people } = album || {};

  // const isRSVPDone = React.useMemo(() => {
  //   return attendees && attendees?.findIndex((att: UserBasic) => att?.id === user?.id) !== -1;
  // }, [attendees, user]);

  return (
    <Card
      elevation={0}
      sx={{
        // boxShadow: 3,
        border: '1px solid',
        borderRadius: 2,
        position: 'relative',
        borderColor: 'grey.300',
        height: '100%',
        '.event_title svg': {
          ml: '4px',
          transition: 'all 0.2s linear',
          opacity: 0,
        },
        '&:hover': {
          borderBottom: '1px solid',
          borderBottomColor: 'primary.main',
          '.event_title svg': {
            ml: '10px',
            opacity: 1,
          },
        },
      }}
    >
      {loading ? (
        <Skeleton variant="rounded" width="100%" height={250} />
      ) : (
        <Box sx={{ position: 'relative', width: '100%', height: 250 }}>
          <Image
            src={coverImage || `https://picsum.photos/seed/${title}/600/200`}
            alt="Album cover image"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 600px) 100vw, 345px"
            loading="lazy"
            objectPosition="top left"
            referrerPolicy="no-referrer"
            priority={false} // or `loading="lazy"` equivalent
          />
        </Box>
        // <CardMedia
        //   component="img"
        //   height="250"
        //   src={coverImage || `https://picsum.photos/seed/${title}/600/200`}
        //   alt="Album Image"
        //   referrerPolicy="no-referrer"
        //   loading="lazy"
        //   sx={{
        //     borderTopLeftRadius: 2,
        //     borderTopRightRadius: 2,
        //     objectFit: 'coover',
        //     objectPosition: 'right top',
        //     bgcolor: 'primary.50',
        //   }}
        // />
      )}

      <CardContent
        sx={{ mt: 0.5, flexGrow: 1, display: 'flex', flexDirection: 'column', height: 'calc(100% - 180px)' }}
      >
        {loading ? (
          <Skeleton width="50%" height={34} />
        ) : (
          <Box display="flex" alignItems="center">
            <Typography
              className="event_title"
              variant="h2"
              component="div"
              fontWeight="bold"
              onClick={() => {
                if (isMinimal) return;

                router.push(paths.gallery.getAlbumDetailUrl(id as string));
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                // svg: {
                //   ml: '4px',
                //   transition: 'all 0.2s linear',
                //   opacity: 0,
                // },
                '&:hover': {
                  cursor: isMinimal ? 'default' : 'pointer',
                  color: isMinimal ? 'inherit' : 'primary.main',
                  // svg: {
                  //   ml: '10px',
                  //   opacity: 1,
                  // },
                },
              }}
            >
              {title}
              {!isMinimal && <ArrowRight weight="bold" />}
            </Typography>
          </Box>
        )}

        {loading ? (
          <>
            {' '}
            <Skeleton width="100%" height={20} />
            <Skeleton width="40%" height={20} />
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {description}
          </Typography>
        )}

        {loading ? (
          <Skeleton width="30%" height={20} />
        ) : (
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              display="flex"
              alignItems="center"
              mt={1}
              sx={{
                svg: {
                  color: 'text.secondary',
                },
              }}
            >
              <Star size={16} weight="fill" />
              <Typography variant="body2" ml={0.5} color="text.secondary">
                {total_photos} Photos
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              mt={1}
              sx={{
                svg: {
                  color: 'text.secondary',
                },
              }}
            >
              <CalendarDots size={16} />
              <Typography variant="body2" ml={0.5} color="text.secondary">
                {dayjs(createdAt)?.format('MMM DD, YYYY')}
              </Typography>
            </Box>
          </Box>
        )}

        {/* {isReadOnly ? null : loading ? null : status === EventStatus.Draft ? (
          <Box width="100%" display="flex" gap={2} mt="auto">
            <Button
              variant="outlined"
              disabled={loading}
              fullWidth
              title="Edit"
              startIcon={<NotePencil size={16} />}
              sx={{ ml: 'auto', mt: 2 }}
              onClick={() => onEdit?.(id)}
            />
            {(createdBy === user?.id || isAdmin) && (
              <Button
                variant="contained"
                disabled={loading}
                fullWidth
                title="Publish"
                startIcon={<CheckCircle size={16} />}
                sx={{ ml: 'auto', mt: 2 }}
                onClick={() => onPublish?.(id)}
              />
            )}
          </Box>
        ) : (
          <Box width="100%" display="flex" gap={1} mt="auto" pt={2}>
            {(createdBy === user?.id || isAdmin) && (
              <>
                <Button
                  variant="outlined"
                  disabled={loading}
                  fullWidth
                  title="Edit"
                  startIcon={<NotePencil size={16} />}
                  onClick={() => onEdit?.(id)}
                />
                {status === EventStatus.Published ||
                  (status === EventStatus.PendingApproval && (
                    <Button
                      variant="outlined"
                      disabled={loading}
                      fullWidth
                      title="Move to Draft"
                      startIcon={<XCircle size={16} />}
                      onClick={() => onPublish?.(id)}
                      sx={{ whiteSpace: 'nowrap', minWidth: '140px' }}
                    />
                  ))}
              </>
            )}
            {status === EventStatus.PendingApproval && isAdmin ? (
              <Button
                variant="contained"
                disabled={loading}
                fullWidth
                title="Approve"
                startIcon={<CheckCircle size={16} />}
                sx={{ whiteSpace: 'nowrap' }}
                onClick={() => verifyEvent?.(id)}
              />
            ) : (
              markImGoing &&
              status === EventStatus.Published &&
              !isRSVPDone && (
                <Button
                  title="I'm Going"
                  variant="outlined"
                  fullWidth
                  disabled={loading}
                  // endIcon={<ArrowRightAltIcon />}
                  startIcon={<Heart size={20} weight="fill" />}
                  onClick={() => markImGoing(id)}
                  sx={{ whiteSpace: 'nowrap', minWidth: '130px' }}
                />
              )
            )}
          </Box>
        )} */}
      </CardContent>
    </Card>
  );
};

export default AlbumCard;
