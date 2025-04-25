import React from 'react';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
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
import { EventCardProps } from './EventCard.types';
import Button from '@/components/core/Button';
import { getAvatarDataUrl, startCase, valueToLabelFormatter } from '@/utils/helpers';
import {
  IconCalendarEvent as CalendarDots,
  IconMapPin as MapPinLine,
  IconExternalLink as ArrowSquareOut,
  IconArrowUpRight as ArrowUpRight,
  IconCalendarHeart,
  IconCheck,
  IconCircleCheck,
  IconGlobe,
  IconHeart,
  IconMinus,
  IconPencilMinus as IconNotePencil,
  IconPlaystationX as IconCircleX,
  IconArrowRight,
  IconCalendarEvent,
  IconMapPin,
  IconArrowUpRight,
  IconHeartFilled,
} from '@tabler/icons-react';
import { EventStatus, Maybe, User, UserBasic } from '@/apollo/hooks';
import { paths } from '@/config/paths';
import { useRouter } from 'next/navigation';
import CopyContentButton from '@/components/common/CopyContentButton';

const EventCard: React.FC<EventCardProps> = ({
  user,
  isAdmin,
  verifyEvent,
  onEdit,
  onPublish,
  event,
  loading,
  markImGoing,
  showDescription,
  isReadOnly,
}) => {
  const router = useRouter();
  const {
    id,
    title = '',
    summary = '',
    description = '',
    startDate,
    endDate,
    image,
    medium = '',
    category,
    location,
    total_attendies,
    attendees: people,
    status,
    cover,
    createdBy,
    shortUrl = '',
    isGoing,
  } = event || {};

  const isRSVPDone = React.useMemo(() => {
    return isGoing || (people && people?.findIndex((att: Maybe<UserBasic>) => att?.id === user?.id) !== -1);
  }, [people, user, isGoing]);

  const formattedStartDate = React.useMemo(() => {
    return dayjs(startDate)?.format('MMM DD, YYYY hh:mm A');
  }, [startDate]);

  const descriptionContent = React.useMemo(() => {
    return description ? DOMPurify.sanitize(description || '') : null;
  }, [description]);

  const formattedEndDate = React.useMemo(() => {
    return endDate ? dayjs(endDate)?.format('MMM DD, YYYY HH:MM A') : null;
  }, [endDate]);

  const isLive = React.useMemo(() => {
    return (
      status === EventStatus.Published &&
      dayjs(startDate).isBefore(dayjs()) &&
      (!endDate || dayjs(endDate).isAfter(dayjs()))
    );
  }, [status, startDate, endDate]);

  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        position: 'relative',
        borderColor: status === EventStatus.PendingApproval ? 'error.main' : 'inherit',
        height: '100%',
        '.event_title svg': {
          ml: '4px',
          transition: 'all 0.2s linear',
          opacity: 0,
        },
        '&:hover': {
          '.event_title svg': {
            ml: '10px',
            opacity: 1,
          },
        },
      }}
    >
      {!loading && status === EventStatus.PendingApproval && (
        <Box bgcolor="error.main" sx={{ py: '4px', position: 'absolute', top: 0, width: '100%' }}>
          <Typography variant="h5" width="100%" textAlign="center" color="common.white">
            Pending Approval
          </Typography>
        </Box>
      )}
      {!loading && status === EventStatus.Draft ? (
        <Chip
          label="Draft"
          color="error"
          size="small"
          sx={{ ml: 'auto', position: ' absolute', top: '10px', right: '10px', px: 2, zIndex: 10 }}
        />
      ) : null}
      {!loading && total_attendies && total_attendies > 0 ? (
        <Chip
          label={`${total_attendies} Going`}
          color="success"
          size="small"
          sx={{ ml: 'auto', position: ' absolute', top: '10px', right: '10px', px: 2, zIndex: 10 }}
        />
      ) : null}
      {loading ? (
        <Skeleton variant="rounded" width="100%" height={180} />
      ) : (
        <CardMedia
          component="img"
          height="180"
          src={cover?.url || image || `https://picsum.photos/seed/${title}/600/200`}
          alt="Event Image"
          referrerPolicy="no-referrer"
          sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
        />
      )}

      <CardContent
        sx={{ mt: 0.5, flexGrow: 1, display: 'flex', flexDirection: 'column', height: 'calc(100% - 180px)' }}
      >
        {loading ? (
          <Skeleton width="80%" height={34} />
        ) : (
          <Box display="flex" alignItems="center">
            <Typography
              className="event_title"
              variant="h2"
              component="div"
              fontWeight="bold"
              onClick={() => {
                if (showDescription) return;

                router.push(paths.events.getEventDetailUrl(id));
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
                  cursor: showDescription ? 'default' : 'pointer',
                  color: showDescription ? 'inherit' : 'primary.main',
                  // svg: {
                  //   ml: '10px',
                  //   opacity: 1,
                  // },
                },
              }}
            >
              {title}
              {!showDescription && <IconArrowRight size={20} />}
            </Typography>

            {isLive && (
              <Box display="flex" alignItems="center" ml="auto">
                <div className="live-dot"></div>
                <Typography color="error" ml={1} variant="body1" fontWeight={500}>
                  Live
                </Typography>
              </Box>
            )}
            {shortUrl && (
              <Box ml={isLive ? '10px' : 'auto'}>
                <CopyContentButton
                  buttonType={showDescription ? 'button' : 'icon'}
                  copiedMessageProps={{ hide: true }}
                  content={shortUrl}
                />
              </Box>
            )}
          </Box>
        )}

        {loading ? (
          <>
            {' '}
            <Skeleton width="100%" height={20} /> <Skeleton width="100%" height={20} />{' '}
            <Skeleton width="60%" height={20} />
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {summary}
            </Typography>
            {showDescription && descriptionContent && (
              <>
                <Typography
                  variant="body1"
                  color="text.primary"
                  mt={3}
                  dangerouslySetInnerHTML={{ __html: descriptionContent }}
                />
                <Divider sx={{ my: 3 }} />
              </>
            )}

            {category && (
              <Box sx={{ display: 'flex', my: 1 }}>
                <Chip size="small" label={valueToLabelFormatter(category)} />
                <Chip
                  size="small"
                  label={startCase(medium)}
                  color={medium === 'online' ? 'success' : 'info'}
                  sx={{ fontWeight: 500, ml: 'auto' }}
                />
              </Box>
            )}
          </>
        )}

        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          {loading ? (
            <Skeleton width="40%" height={25} />
          ) : (
            <>
              {' '}
              <Typography display="flex" alignItems="center" variant="body2" fontWeight={500} color="text.secondary">
                <IconCalendarEvent size={18} style={{ marginRight: '8px' }} />
                {formattedStartDate} <IconMinus size={18} style={{ marginRight: '4px', marginLeft: '4px' }} />{' '}
                {formattedEndDate || 'Ongoing'}
              </Typography>
            </>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {loading ? (
            <Skeleton width="40%" height={25} sx={{ mt: 2 }} />
          ) : (
            location && (
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                sx={{
                  svg: {
                    color: 'text.secondary',
                  },
                }}
              >
                {medium === 'online' ? (
                  <IconGlobe size={18} style={{ marginRight: '8px' }} />
                ) : (
                  <IconMapPin size={18} style={{ marginRight: '8px' }} />
                )}
                {medium === 'online' && location !== 'protected' ? (
                  <Typography
                    component="a"
                    href={location}
                    target="_blank"
                    display="flex"
                    alignItems="center"
                    variant="body2"
                    fontWeight={500}
                    color="text.secondary"
                    sx={{
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                        svg: {
                          color: 'primary.main',
                        },
                      },
                    }}
                  >
                    {location}
                    <IconArrowUpRight size={14} style={{ marginLeft: '4px', marginTop: '2px' }} />
                  </Typography>
                ) : (
                  <Typography
                    display="flex"
                    alignItems="center"
                    variant="body2"
                    fontWeight={500}
                    color="text.secondary"
                  >
                    {location === 'protected' ? '******' : location}
                  </Typography>
                )}
              </Box>
            )
          )}
        </Box>

        {people && people?.length > 0 && (
          <Box mt={2}>
            <Typography color="grey.600" variant="body2">
              Going:
            </Typography>
            <Stack direction="row" spacing={1}>
              <AvatarGroup
                total={people?.length}
                slotProps={{
                  surplus: {
                    sx: {
                      // cursor: 'pointer',
                    },
                    // onClick: () => alert('Hello'),
                  },
                }}
              >
                {people?.slice(0, 4)?.map((person: Maybe<UserBasic>, index: number) => (
                  <Tooltip
                    key={`event-avatar-${title}-${index}`}
                    placement="top"
                    title={`${person?.firstName || 'NA'} ${person?.lastName || ''} ${person?.batch ? `(${person.batch})` : ''}`}
                    arrow
                  >
                    <Avatar
                      alt={person?.firstName || 'NA'}
                      src={person?.profileImage || getAvatarDataUrl(person?.id)}
                      slotProps={{
                        img: {
                          referrerPolicy: 'no-referrer',
                        },
                      }}
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Stack>
          </Box>
        )}

        {isReadOnly ? null : loading ? null : status === EventStatus.Draft ? (
          <Box width="100%" display="flex" gap={2} mt="auto">
            <Button
              variant="outlined"
              disabled={loading}
              fullWidth
              title="Edit"
              startIcon={<IconNotePencil size={16} />}
              sx={{ ml: 'auto', mt: 2 }}
              onClick={() => onEdit?.(id)}
            />
            {(createdBy === user?.id || isAdmin) && (
              <Button
                variant="contained"
                disabled={loading}
                fullWidth
                title="Publish"
                startIcon={<IconCircleCheck size={16} />}
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
                  startIcon={<IconNotePencil size={16} />}
                  onClick={() => onEdit?.(id)}
                />
                {(status === EventStatus.Published || status === EventStatus.PendingApproval) && (
                  <Button
                    variant="outlined"
                    disabled={loading}
                    fullWidth
                    title="Move to Draft"
                    startIcon={<IconCircleX size={16} />}
                    onClick={() => onPublish?.(id, EventStatus.Draft)}
                    sx={{ whiteSpace: 'nowrap', minWidth: '140px' }}
                  />
                )}
              </>
            )}
            {status === EventStatus.PendingApproval && isAdmin ? (
              <Button
                variant="contained"
                disabled={loading}
                fullWidth
                title="Approve"
                startIcon={<IconCircleCheck size={16} />}
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
                  startIcon={<IconHeartFilled size={20} />}
                  onClick={() => markImGoing(id)}
                  sx={{ whiteSpace: 'nowrap', minWidth: '130px' }}
                />
              )
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
