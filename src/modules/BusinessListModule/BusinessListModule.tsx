import React from 'react';
import { Business, BusinessListResponse, ListInput, useGetBusinessesQuery } from '@/apollo/hooks';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import EmptyView from '@/components/common/EmptyView';
import BusinessCard from '@/components/common/BusinessCardV2';

interface BusinessListModuleProps {
  filter?: ListInput['filter'];
  skip?: boolean;
  limit?: number;
  loading?: boolean;
  isCreateAllowed?: boolean;
  isReadOnly?: boolean;
  data?: BusinessListResponse;
}

const BusinessListModule: React.FC<BusinessListModuleProps> = ({
  filter = {},
  limit = 100,
  skip = false,
  loading: propLoading,
  isCreateAllowed = true,
  isReadOnly,
  data: ssrData,
}) => {
  const { data: businessesData, loading } = useGetBusinessesQuery({
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
      return new Array(3).fill({ id: '', title: '', description: '' });
    }
    return businessesData?.getBusinesses?.data || ssrData?.data || [];
  }, [loading, businessesData, propLoading, ssrData]);

  return (
    <Grid container spacing={3} mt={2}>
      {listData?.length > 0 ? (
        listData?.map((business: Business, index) => (
          <Grid size={{ xs: 12 }} key={`events-${business.id}-${index}`}>
            <BusinessCard
              business={business}
              loading={!business.id}
              // markImGoing={markImGoing}
              // verifyEvent={verifyEvent}
              // onEdit={onEditEvent}
              // onPublish={onPublishEvent}
              // isReadOnly={isReadOnly}
            />
          </Grid>
        ))
      ) : (
        <EmptyView message="No business available" />
      )}
    </Grid>
  );
};

export default BusinessListModule;
