'use client';

import React from 'react';
import { Business, ListInput, useGetBusinessesQuery } from '@/apollo/hooks';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { Plus, Ticket } from '@phosphor-icons/react';
import { useAuth } from '@/context/AuthContext';
import { paths } from '@/config/paths';
import EmptyView from '@/components/common/EmptyView';
import { useRouter } from 'next/router';
import BusinessCard from '@/components/common/BusinessCardV2';
import { useSearchParams } from 'next/navigation';

interface BusinessListModuleProps {
  filter?: ListInput['filter'];
  skip?: boolean;
  limit?: number;
  loading?: boolean;
  isCreateAllowed?: boolean;
  isReadOnly?: boolean;
}

export const dummyBusinesses: Partial<Business>[] = [
  {
    name: 'Dots Created',
    description:
      'Elevate your digital footprint with Dots Created, a leading digital agency specializing in web design, digital marketing, web apps, SASS products, and MVP development. Results-Focused Top Web Design Agency.',
    category: 'Software & IT',
    website: 'https://dotscreated.com',
    email: 'dotscreatecom@gmail.com',
    phone: '7014750932',
    address: '123 Green Street',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    postalCode: '94103',
    logoUrl: 'https://dotscreated.com/assets/branding/DotsCreated-1500x.png',
    isVerified: true,
    tags: ['clothing', 'eco-friendly', 'women-led'],
    socialMedia: {
      instagram: 'https://instagram.com/verdecollective',
      twitter: 'https://twitter.com/verdecollective',
    },
    user: {
      id: 'dsadsad-fr234324',
      firstName: 'Jeet',
      lastName: 'Sharma',
      profileImage: '',
      batch: 2009,
    },
  },
  {
    name: 'NeuroNest AI',
    description: 'Revolutionizing mental health support with AI-powered personalized therapy and wellness tools.',
    category: 'Healthcare AI',
    website: 'https://neuronnest.ai',
    email: 'care@neuronnest.ai',
    phone: '+44 20 7946 0958',
    address: '88 Quantum Road',
    city: 'London',
    state: '',
    country: 'UK',
    postalCode: 'EC1A 1BB',
    logoUrl: 'https://placehold.co/80x80/6366f1/ffffff?text=NN',
    isVerified: true,
    tags: ['mental-health', 'AI', 'therapy'],
    socialMedia: {
      linkedin: 'https://linkedin.com/company/neuronnest',
      twitter: 'https://twitter.com/neuronnest',
    },
  },
  {
    name: 'ByteBrew Studio',
    description: 'Crafting immersive digital experiences with a mix of AR/VR and cutting-edge web technology.',
    category: 'Web & XR Studio',
    website: 'https://bytebrew.io',
    email: 'team@bytebrew.io',
    phone: '+91 99888 77665',
    address: '404 Pixel Lane',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560001',
    logoUrl: 'https://placehold.co/80x80/f43f5e/ffffff?text=BB',
    isVerified: false,
    tags: ['AR', 'VR', 'web3', 'interactive'],
    socialMedia: {
      facebook: 'https://facebook.com/bytebrewstudio',
      instagram: 'https://instagram.com/bytebrewstudio',
    },
  },
];
const BusinessListModule: React.FC<BusinessListModuleProps> = ({
  filter = {},
  limit = 100,
  skip,
  loading: propLoading,
  isCreateAllowed = true,
  isReadOnly,
}) => {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

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
    return businessesData?.getBusinesses?.data || [];
  }, [loading, businessesData, propLoading]);

  console.log('ZZ: listData', listData);

  return (
    <Grid container spacing={3} mt={2}>
      {listData?.length > 0 ? (
        listData?.map((business: Business, index) => (
          <Grid size={{ xs: 12 }} key={`events-${business.id}-${index}`}>
            <BusinessCard
              business={business}
              loading={!business.id}
              // markImGoing={markImGoing}
              user={user}
              isAdminUser={isAdmin}
              // verifyEvent={verifyEvent}
              // onEdit={onEditEvent}
              // onPublish={onPublishEvent}
              // isReadOnly={isReadOnly}
            />
          </Grid>
        ))
      ) : (
        <EmptyView
          message="No business available"
          buttonProps={
            user?.id && isCreateAllowed
              ? {
                  title: 'Create New Business',
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

export default BusinessListModule;
