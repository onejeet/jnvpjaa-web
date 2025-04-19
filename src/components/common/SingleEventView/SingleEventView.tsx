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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { SingleEventViewProps } from './SingleEventView.types';
import Button from '@/components/core/Button';
import { getAvatarDataUrl, startCase, valueToLabelFormatter } from '@/utils/helpers';
import {
  ArrowRight,
  ArrowSquareOut,
  ArrowUpRight,
  CalendarDots,
  CalendarHeart,
  Check,
  CheckCircle,
  Globe,
  Heart,
  MapPinLine,
  Minus,
  NotePencil,
  XCircle,
} from '@phosphor-icons/react';
import { EventStatus, Maybe, User, UserBasic } from '@/apollo/hooks';
import { paths } from '@/config/paths';
import { useRouter } from 'next/router';
import CopyContentButton from '@/components/common/CopyContentButton';
import UserListDialog from '../UserListDialog/UserListDialog';
import ProfilePicture from '../ProfilePicture';
import { dmSans } from '@/utils/theme/fonts';

const SingleEventView: React.FC<SingleEventViewProps> = ({
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
  const [openAttendiesDialog, setOpenAttendiesDialog] = React.useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    id,
    title = '',
    summary = '',
    description = '',
    startDate,
    endDate,
    image,
    medium = '',
    attendees,
    category,
    location,
    total_attendies,
    attendees: people,
    status,
    organizers,
    createdBy,
    shortUrl = '',
  } = event || {};
  console.log('event', event, user);
  const isRSVPDone = React.useMemo(() => {
    return attendees && attendees?.findIndex((att: Maybe<UserBasic>) => att?.id === user?.id) !== -1;
  }, [attendees, user]);

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

      {loading ? (
        <Skeleton variant="rounded" width="100%" height={180} />
      ) : (
        <CardMedia
          component="img"
          height={isMobile ? '300' : '400'}
          src={image || `https://picsum.photos/seed/${title}/600/200`}
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
              variant="h1"
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
              {!showDescription && <ArrowRight weight="bold" />}
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
              <Typography
                variant="body1"
                color="text.primary"
                mt={3}
                className="rich_content"
                sx={{ fontFamily: notoSerif.style.fontFamily }}
                dangerouslySetInnerHTML={{ __html: descriptionContent }}
              />
            )}
            <Divider sx={{ my: 3 }} />
            {category && (
              <Box sx={{ display: 'flex', my: 1 }}>
                <Chip label={valueToLabelFormatter(category)} />
                <Chip
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
              <Typography display="flex" alignItems="center" variant="body1" fontWeight={400} color="text.secondary">
                <CalendarDots size={20} style={{ marginRight: '8px' }} />
                {formattedStartDate} <Minus size={18} style={{ marginRight: '4px', marginLeft: '4px' }} />{' '}
                {formattedEndDate || 'Ongoing'}
              </Typography>
            </>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {loading ? (
            <Skeleton width="40%" height={30} sx={{ mt: 2 }} />
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
                  <Globe size={20} style={{ marginRight: '8px' }} />
                ) : (
                  <MapPinLine size={20} style={{ marginRight: '8px' }} />
                )}
                {medium === 'online' && location !== 'protected' ? (
                  <Typography
                    component="a"
                    href={location}
                    target="_blank"
                    display="flex"
                    alignItems="center"
                    variant="body1"
                    fontWeight={400}
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
                    <ArrowUpRight size={14} style={{ marginLeft: '4px', marginTop: '2px' }} weight="bold" />
                  </Typography>
                ) : (
                  <Typography
                    display="flex"
                    alignItems="center"
                    variant="body1"
                    fontWeight={400}
                    color="text.secondary"
                  >
                    {location === 'protected' ? '******' : location}
                  </Typography>
                )}
              </Box>
            )
          )}
        </Box>

        {organizers && organizers?.length > 0 && (
          <Box mt={2}>
            <Typography fontWeight={400} color="grey.600" variant="body1">
              Organiser
            </Typography>
            <Stack direction="row" spacing={1} mt={1} sx={{ cursor: 'pointer' }}>
              <ProfilePicture
                src={organizers?.[0]?.profileImage}
                title={`${organizers?.[0]?.firstName || 'NA'} ${organizers?.[0]?.lastName || ''}`}
                summary={`Batch of ${organizers?.[0]?.batch}`}
                id={organizers?.[0]?.id}
                titleComponentProps={{
                  titleProps: {
                    fontWeight: 400,
                  },
                  summaryProps: {
                    fontSize: '12px',
                    color: 'grey.600',
                  },
                }}
              />
            </Stack>
          </Box>
        )}

        {people && people?.length > 0 && (
          <Box mt={2}>
            <Typography fontWeight={400} color="grey.600" variant="body1">
              {`Going ${total_attendies && total_attendies > 0 ? `(${total_attendies})` : ''}:`}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              mt={1}
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpenAttendiesDialog(true)}
            >
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

        <Box maxWidth={{ xs: '100%', md: '50%' }} mt={2}>
          {isReadOnly ? null : loading ? null : status === EventStatus.Draft ? (
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
          )}
        </Box>
      </CardContent>
      {Boolean(openAttendiesDialog) && (
        <UserListDialog
          title="Attending Event"
          open={openAttendiesDialog}
          onClose={() => setOpenAttendiesDialog(false)}
          users={people}
        />
      )}
    </Card>
  );
};

export default SingleEventView;
