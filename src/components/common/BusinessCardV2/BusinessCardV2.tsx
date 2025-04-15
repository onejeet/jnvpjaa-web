import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Stack,
  Box,
  IconButton,
  alpha,
  Skeleton,
  Rating,
} from '@mui/material';
import { blueGrey, cyan, deepPurple } from '@mui/material/colors';
import VerifiedBadge from '../VerifiedBadge';
import { Business, User } from '@/apollo/hooks';
import { formatPhoneNumber, getSocialMediaIcon } from '@/utils/helpers';
import { EnvelopeSimple, Globe, MapPinLine, Phone } from '@phosphor-icons/react';
import Image from 'next/image';
import ProfilePicture from '../ProfilePicture';
import { paths } from '@/config/paths';
import { useRouter } from 'next/router';

type Props = {
  business: Business;
  loading?: boolean;
  user?: User;
  isAdminUser?: boolean;
};

const BusinessCard: React.FC<Props> = ({ business, loading, user, isAdminUser }) => {
  const router = useRouter();
  return (
    <Card
      elevation={2}
      sx={{
        p: { xs: 2, sm: 5 },
        width: '100%',
        borderRadius: 4,
        bgcolor: '#404258',
        color: 'grey.400',
        position: 'relative',
        // boxShadow: `0 0 20px ${deepPurple[700]}`,
        transition: 'transform 0.5s',
        '&:hover': {
          transform: 'scale(1.01)',
          // boxShadow: `0 0 25px ${cyan[500]}`,
        },
        a: { color: 'grey.400' },
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={2}
      >
        {/* Avatar */}
        <Box
          width={{ xs: 200 }}
          display="flex"
          alignItems="center"
          height="fit-content"
          minHeight={100}
          position="relative"
        >
          {loading ? (
            <Skeleton variant="rectangular" width="100%" sx={{ borderRadius: '8px' }} />
          ) : (
            <Image
              src={business?.logoUrl || ''}
              alt={business.name}
              fill
              loading="lazy"
              objectFit="contain"
              referrerPolicy="no-referrer"
              priority={false}
            />
          )}
        </Box>

        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            {loading ? (
              <Skeleton width="80%" height={36} />
            ) : (
              <>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  color="white"
                  sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
                >
                  {business.name}
                </Typography>
                {business.isVerified ? (
                  <VerifiedBadge size={28} title="Verified" />
                ) : (
                  <Chip size="small" label="Pending Approval" color="error" />
                )}
              </>
            )}
          </Box>
          {loading ? (
            <Skeleton width="80%" height={25} />
          ) : (
            <Typography
              variant="body1"
              color={blueGrey[200]}
              sx={{
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              {business.category}
            </Typography>
          )}
        </Box>
        {business?.googleReviews && (
          <Box ml={{ xs: 'inherit', sm: 'auto' }}>
            <Typography variant="body2">Google Reviews ({business?.googleReviews})</Typography>
            <Rating value={business?.googleReviews} precision={0.5} readOnly />
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        {' '}
        {loading ? (
          <Skeleton width="80%" height={28} sx={{ my: 2 }} />
        ) : (
          <Typography variant="body1" color="white" my={2}>
            {business.description}
          </Typography>
        )}
        <Stack direction="row" gap={1} flexWrap="wrap" mb={2}>
          {business?.tags?.map((tag) => (
            <Chip key={tag} label={tag} size="small" sx={{ bgcolor: deepPurple[500], color: '#fff' }} />
          ))}
        </Stack>
        <Stack spacing={1}>
          {(business.city || loading) && (
            <Typography variant="body1" gap={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <MapPinLine size={18} />
              {loading ? (
                <Skeleton width="80%" height={28} />
              ) : (
                <>
                  {' '}
                  {business?.address ? `${business?.address}, ` : ''}
                  {business?.city ? `${business?.city}, ` : ''}
                  {business.state ? `${business.state}, ` : ''}
                  {business?.country || ''}
                </>
              )}
            </Typography>
          )}
          {(business.website || loading) && (
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
              <Globe size={18} />
              {loading ? (
                <Skeleton width="80%" height={28} />
              ) : (
                <a href={business.website} target="_blank" rel="noopener noreferrer">
                  {business.website}
                </a>
              )}
            </Typography>
          )}
          {(business.email || loading) && (
            <Typography variant="body1" gap={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <EnvelopeSimple size={18} />
              {loading ? (
                <Skeleton width="80%" height={28} />
              ) : (
                <a href={`mailto:${business.email}`} rel="noopener noreferrer">
                  {business.email}
                </a>
              )}
            </Typography>
          )}
          {(business.phone || loading) && (
            <Typography variant="body1" gap={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone size={18} />
              {loading ? <Skeleton width="80%" height={28} /> : formatPhoneNumber(business?.phone || '')?.international}
            </Typography>
          )}
        </Stack>
        {(business.socialMedia || loading) && (
          <Box mt={2}>
            <Box gap={1} display="flex" alignItems="center">
              {(business?.user?.id || loading) && (
                <ProfilePicture
                  src={business?.user?.profileImage}
                  id={business?.user?.id}
                  loading={loading}
                  size={44}
                  // @ts-expect-error type-error
                  onClick={() => router.push(paths.profile.getProfileUrl(business.user.id as string))}
                  title={`${business?.user?.firstName || ''} ${business?.user?.lastName || ''}`}
                  summary={
                    business?.user?.batch
                      ? `Batch of ${business?.user?.batch}`
                      : business?.user?.isFaculty
                        ? 'Faculty'
                        : ''
                  }
                  titleComponentProps={{
                    titleProps: {
                      color: 'common.white',
                      fontSize: '16px',
                    },
                    summaryProps: {
                      color: 'grey.500',
                      fontSize: '12px',
                    },
                  }}
                />
              )}

              <Box display="flex" alignItems="center" ml="auto">
                {Object.entries(business?.socialMedia || {}).map(([platform, url]) => (
                  <IconButton
                    key={platform}
                    // href={url}
                    // target="_blank"
                    // rel="noopener noreferrer"

                    sx={{ color: 'grey.400' }}
                  >
                    {getSocialMediaIcon(platform)}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
