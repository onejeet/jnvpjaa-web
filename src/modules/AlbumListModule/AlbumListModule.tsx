'use client';

import React from 'react';
import { AlbumBasic, ListInput, useGetAlbumQuery, useGetAlbumsQuery, useGetEventListQuery } from '@/apollo/hooks';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import EventCard from '@/components/common/EventCard/EventCard';
import { Plus, Ticket } from '@phosphor-icons/react';
import useEvents from '@/hooks/useEvents';
import { useAuth } from '@/context/AuthContext';
import { paths } from '@/config/paths';
import EmptyView from '@/components/common/EmptyView';
import { useRouter } from 'next/router';
import AlbumCard from '@/components/common/AlbumCard';

interface AlbumListModuleProps {
  filter?: ListInput['filter'];
  skip?: boolean;
  limit?: number;
  loading?: boolean;
  isCreateAllowed?: boolean;
  isReadOnly?: boolean;
}

const AlbumListModule: React.FC<AlbumListModuleProps> = ({
  filter = {},
  limit = 100,
  skip,
  loading: propLoading,
  isCreateAllowed = true,
  isReadOnly,
}) => {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const { data: albumData, loading } = useGetAlbumsQuery({
    skip,
    variables: {
      options: {
        filter,
        limit,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const listData = React.useMemo(() => {
    if (loading || propLoading) {
      return new Array(6).fill({ id: '', title: '', description: '' });
    }
    return albumData?.getAlbums?.data || [];
  }, [loading, albumData, propLoading]);

  console.log('ZZ: listData', listData);

  return (
    <Grid container spacing={3} mt={2}>
      {listData?.length > 0 ? (
        listData?.map((album: AlbumBasic, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={`events-${album.title}-${index}`}>
            <AlbumCard
              album={album}
              loading={!album.id}
              // markImGoing={markImGoing}
              user={user}
              isAdmin={isAdmin}
              // verifyEvent={verifyEvent}
              // onEdit={onEditEvent}
              // onPublish={onPublishEvent}
              // isReadOnly={isReadOnly}
            />
          </Grid>
        ))
      ) : (
        <EmptyView
          message="No albums available"
          buttonProps={
            user?.id && isCreateAllowed
              ? {
                  title: 'Create New Album',
                  startIcon: <Plus size={16} />,
                  onClick: () => router.push(paths.gallery.new),
                }
              : undefined
          }
        />
      )}
    </Grid>
  );
};

export default AlbumListModule;
