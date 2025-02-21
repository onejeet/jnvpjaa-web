import React from 'react';
import dayjs from 'dayjs';
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
} from '@mui/material';
import { EventCardProps, IPerson } from './EventCard.types';
import Button from '@/components/core/Button';
import { getAvatarDataUrl, startCase, valueToLabelFormatter } from '@/utils/helpers';
import { CalendarDots, CalendarHeart, Check, CheckCircle, Heart, Minus, NotePencil } from '@phosphor-icons/react';

const EventCard: React.FC<EventCardProps> = ({ user, isAdmin, verifyEvent, event, loading, markImGoing }) => {
  const {
    id,
    title = '',
    summary = '',
    startDate,
    endDate,
    image,
    medium = '',
    online,
    category,
    attendees: people,
    status,
    isVerified,
    createdBy,
  } = event;

  const formattedStartDate = React.useMemo(() => {
    return dayjs(startDate)?.format('MMM DD, YYYY HH:MM A');
  }, [startDate]);

  const formattedEndDate = React.useMemo(() => {
    return endDate ? dayjs(endDate)?.format('MMM DD, YYYY HH:MM A') : null;
  }, [endDate]);

  const isLive = React.useMemo(() => {
    return (
      status === 'published' &&
      isVerified &&
      dayjs(startDate).isBefore(dayjs()) &&
      (!endDate || dayjs(endDate).isAfter(dayjs()))
    );
  }, [status, startDate, endDate, isVerified]);

  return (
    <Card
      sx={{ boxShadow: 3, borderRadius: 2, position: 'relative', borderColor: isVerified ? 'inherit' : 'error.main' }}
    >
      {!loading && !isVerified && status === 'published' && (
        <Box bgcolor="error.main" sx={{ py: '4px', position: 'absolute', top: 0, width: '100%' }}>
          <Typography variant="h5" width="100%" textAlign="center" color="common.white">
            Pending approval
          </Typography>
        </Box>
      )}
      {!loading && status === 'draft' ? (
        <Chip
          label="Draft"
          color="error"
          size="small"
          sx={{ ml: 'auto', position: ' absolute', top: '10px', right: '10px', zIndex: 10 }}
        />
      ) : null}
      {loading ? (
        <Skeleton variant="rounded" width="100%" height={180} />
      ) : (
        <CardMedia
          component="img"
          height="180"
          src={image || `https://picsum.photos/seed/${title}/600/200`}
          alt="Event Image"
          sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
        />
      )}

      <CardContent sx={{ mt: 0.5 }}>
        {loading ? (
          <Skeleton width="80%" height={34} />
        ) : (
          <Typography variant="h2" component="div" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
            {title}
            {isLive && (
              <Box display="flex" alignItems="center" ml="auto">
                <div className="live-dot"></div>
                <Typography color="error" ml={1} variant="body1" fontWeight={500}>
                  Live
                </Typography>
              </Box>
            )}
          </Typography>
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
            {category && (
              <Box sx={{ display: 'flex', my: 1 }}>
                <Chip size="small" label={valueToLabelFormatter(category)} />
                <Chip
                  size="small"
                  label={startCase(medium)}
                  color={online ? 'success' : 'info'}
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
                <CalendarDots size={18} style={{ marginRight: '8px' }} />
                {formattedStartDate} <Minus size={18} style={{ marginRight: '4px', marginLeft: '4px' }} />{' '}
                {formattedEndDate || 'Ongoing'}
              </Typography>
            </>
          )}
        </Box>

        {people?.length > 0 && (
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
                {people.slice(0, 4).map((person: IPerson, index) => (
                  <Tooltip
                    key={`event-avatar-${title}-${index}`}
                    placement="top"
                    title={`${person.firstName} ${person?.lastName} ${person?.batch ? `(${person.batch})` : ''}`}
                    arrow
                  >
                    <Avatar alt={person.firstName} src={person.profileImage || getAvatarDataUrl(person.id)} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Stack>
          </Box>
        )}

        {loading ? null : status === 'draft' ? (
          <Button
            size="small"
            variant="outlined"
            disabled={loading}
            fullWidth
            title="Edit"
            startIcon={<NotePencil size={16} />}
            sx={{ ml: 'auto', mt: 2 }}
          />
        ) : (
          <Box width="100%" display="flex" gap={2}>
            {(createdBy === user?.id || isAdmin) && (
              <Button
                variant="outlined"
                disabled={loading}
                fullWidth
                title="Edit"
                startIcon={<NotePencil size={16} />}
                sx={{ ml: 'auto', mt: 2 }}
              />
            )}
            {!isVerified && isAdmin ? (
              <Button
                variant="contained"
                disabled={loading}
                fullWidth
                title="Approve & Publish"
                startIcon={<CheckCircle size={16} />}
                sx={{ ml: 'auto', mt: 2, whiteSpace: 'nowrap' }}
                onClick={() => verifyEvent?.(id)}
              />
            ) : (
              markImGoing && (
                <Button
                  title="I'm Going"
                  variant="outlined"
                  fullWidth
                  disabled={loading}
                  // endIcon={<ArrowRightAltIcon />}
                  startIcon={<Heart size={20} weight="fill" />}
                  sx={{ marginTop: 2 }}
                  onClick={() => markImGoing(id)}
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
