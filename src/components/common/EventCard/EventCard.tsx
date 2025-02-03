import React from 'react';
import dayjs from 'dayjs';
import { Card, CardContent, CardMedia, Typography, Badge, Avatar, Box, Stack, AvatarGroup, Chip } from '@mui/material';
import { EventCardProps } from './EventCard.types';
import Button from '@/components/core/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { startCase } from '@/utils/helpers';

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { id, title, description, startDate, endDate, image, medium, online, people } = event;

  const formattedStartDate = React.useMemo(() => {
    return dayjs(startDate)?.format('MMM DD, YYYY');
  }, [startDate]);

  const formattedEndDate = React.useMemo(() => {
    return endDate ? dayjs(endDate)?.format('MMM DD, YYYY') : null;
  }, [endDate]);

  const isLive = React.useMemo(() => {
    return dayjs(startDate).isBefore(dayjs()) && (!endDate || dayjs(endDate).isAfter(dayjs()));
  }, [startDate, endDate]);

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="180"
        src={image || `https://picsum.photos/seed/${title}/600/200`}
        alt="Event Image"
        sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
      />

      <CardContent>
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

        <Typography variant="body2" color="text.secondary" mt={1}>
          {description}
        </Typography>

        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" fontWeight={500} color="text.secondary">
            {formattedStartDate} - {formattedEndDate || 'Ongoing'}
          </Typography>
          <Chip label={startCase(medium)} color={online ? 'success' : 'info'} sx={{ fontWeight: 500 }} />
        </Box>

        {/* <Stack direction="row" spacing={1} mt={2}>
          <AvatarGroup total={people.length}>
            {people.slice(0, 4).map((person, index) => (
              <Avatar key={`event-avatar-${title}-${index}`} alt={person.name} src={person.avatar} />
            ))}
          </AvatarGroup>
        </Stack> */}

        <Button
          title="More Details"
          variant="outlined"
          fullWidth
          endIcon={<ArrowRightAltIcon />}
          sx={{ marginTop: 2 }}
          onClick={() => alert('More Details')}
        />
      </CardContent>
    </Card>
  );
};

export default EventCard;
