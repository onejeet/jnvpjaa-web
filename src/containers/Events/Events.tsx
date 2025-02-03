'use client';

import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { Event, useGetEventListQuery, useGetUserDetailsQuery } from '@/apollo/hooks';
import { Grid2 as Grid, Typography } from '@mui/material';
import EventCard from '@/components/common/EventCard/EventCard';
import { IEvent } from '@/components/common/EventCard/EventCard.types';

const eventsData: IEvent[] = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    description: 'A great event for tech enthusiasts to come together and learn from industry leaders.',
    startDate: '2025-01-01',
    endDate: '2025-06-03',
    // image: 'https://placehold.co/600x200',
    hostingMedium: 'Online',
    online: true,
    people: [
      { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { name: 'Sam Wilson', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { name: 'Anna Johnson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    ],
  },
  {
    id: 2,
    title: 'Web Design Workshop',
    description: 'A hands-on workshop for learning the best practices in web design.',
    startDate: '2025-07-10',
    endDate: '2025-07-12',
    image: 'https://placehold.co/600x200/ff8a00/ffffff',
    hostingMedium: 'Offline',
    online: false,
    people: [
      { name: 'Peter Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { name: 'Maria Gonzalez', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { name: 'David Clark', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    ],
  },
  {
    id: 3,
    title: 'AI and Machine Learning Summit',
    description: 'A deep dive into AI technologies and the future of machine learning.',
    startDate: '2025-08-15',
    endDate: '2025-08-18',
    image: 'https://placehold.co/600x200/0057e7/ffffff',
    hostingMedium: 'Online',
    online: true,
    people: [
      { name: 'Elena Roberts', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { name: 'James Horne', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
      { name: 'Samantha Carter', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
      { name: 'Ethan Lee', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
      { name: 'Olivia King', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
    ],
  },
  {
    id: 4,
    title: 'Data Science Bootcamp',
    description: 'An intensive bootcamp for aspiring data scientists.',
    startDate: '2025-09-01',
    endDate: '2025-09-10',
    image: 'https://placehold.co/600x200/8e44ad/ffffff',
    hostingMedium: 'Offline',
    online: false,
    people: [
      { name: 'Michael Thomas', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
      { name: 'Ava Mitchell', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
    ],
  },
  {
    id: 5,
    title: 'Blockchain Technology Expo',
    description: 'A conference focused on blockchain innovations and applications.',
    startDate: '2025-10-20',
    endDate: '2025-10-22',
    image: 'https://placehold.co/600x200/1e90ff/ffffff',
    hostingMedium: 'Online',
    online: true,
    people: [
      { name: 'Isaac Watson', avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
      { name: 'Sophia Harris', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
      { name: 'David Walker', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
    ],
  },
  {
    id: 6,
    title: 'Cybersecurity Conference',
    description: 'Exploring the latest trends in cybersecurity and ethical hacking.',
    startDate: '2025-11-05',
    endDate: '2025-11-07',
    image: 'https://placehold.co/600x200/9b59b6/ffffff',
    hostingMedium: 'Offline',
    online: false,
    people: [
      { name: 'Lucas Green', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
      { name: 'Charlotte King', avatar: 'https://randomuser.me/api/portraits/women/9.jpg' },
    ],
  },
  {
    id: 7,
    title: 'Sustainable Development Forum',
    description: 'An event discussing the future of sustainable development and green technology.',
    startDate: '2025-12-01',
    endDate: '2025-12-03',
    image: 'https://placehold.co/600x200/2ecc71/ffffff',
    hostingMedium: 'Online',
    online: true,
    people: [
      { name: 'Grace Lee', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
      { name: 'Daniel Scott', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    ],
  },
  {
    id: 8,
    title: 'Mobile App Development Summit',
    description: 'A summit for mobile app developers to discuss the latest trends and tools.',
    startDate: '2026-01-10',
    endDate: '2026-01-12',
    image: 'https://placehold.co/600x200/16a085/ffffff',
    hostingMedium: 'Offline',
    online: false,
    people: [
      { name: 'Joshua Adams', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
      { name: 'Emily Nelson', avatar: 'https://randomuser.me/api/portraits/women/11.jpg' },
      { name: 'Zachary Turner', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
    ],
  },
  {
    id: 9,
    title: 'Digital Marketing Expo',
    description: 'A digital marketing expo covering SEO, social media strategies, and more.',
    startDate: '2026-02-05',
    endDate: '2026-02-07',
    image: 'https://placehold.co/600x200/f39c12/ffffff',
    hostingMedium: 'Online',
    online: true,
    people: [
      { name: 'Chloe Harris', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
      { name: 'Lucas Reed', avatar: 'https://randomuser.me/api/portraits/men/14.jpg' },
    ],
  },
];

export default function Events() {
  const router = useRouter();
  const { id } = router.query;
  const { data: eventData, loading } = useGetEventListQuery();
  const { user } = useAuth();

  console.log('EVEEE', eventData);

  return (
    <LayoutModule
      disableCover
      title={`Members • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Typography variant="h1" textAlign="center">
        Events
      </Typography>
      <Typography color="grey.800" mb={3} textAlign="center">
        List of all the upcoming events.
      </Typography>
      <Grid container spacing={3}>
        {(eventData?.getEventList?.data || [])?.map((ev: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`events-${ev.title}`}>
            <EventCard event={ev} />
          </Grid>
        ))}
      </Grid>
    </LayoutModule>
  );
}
