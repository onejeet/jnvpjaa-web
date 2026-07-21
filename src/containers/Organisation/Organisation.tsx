'use client';

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import ProfileCard from '@/components/common/ProfileCard';
import { ProfileCardProps } from '@/components/common/ProfileCard/ProfileCard.types';
import ProfilePicture from '@/components/common/ProfilePicture';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  ASSIGN_EXECUTIVE_POSITION_MUTATION,
  PUBLIC_EXECUTIVE_COMMITTEE_QUERY,
  REVOKE_EXECUTIVE_POSITION_MUTATION,
} from '@/apollo/accessOperations';
import { PERMISSION_CODES } from '@/constants/access';
import { useAuth } from '@/context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import { useGetUserListQuery } from '@/apollo/hooks';
import Button from '@/components/core/Button';
import { getAvatarDataUrl } from '@/utils/helpers';

const executiveCommitteePositionOrder = [
  'PRESIDENT',
  'VICE_PRESIDENT_MALE',
  'VICE_PRESIDENT_FEMALE',
  'SECRETARY',
  'JOINT_SECRETARY',
  'TREASURER',
  'EXECUTIVE_COMMITTEE_MEMBER',
];

const getExecutiveCommitteePositionRank = (positionCode?: string | null) => {
  const index = executiveCommitteePositionOrder.indexOf(positionCode || '');
  return index === -1 ? executiveCommitteePositionOrder.length : index;
};

const Organizations = () => {
  const { can } = useAuth();
  const canManagePositions = can(PERMISSION_CODES.IAM_EXECUTIVE_POSITION_MANAGE);
  const { data } = useQuery(PUBLIC_EXECUTIVE_COMMITTEE_QUERY);
  const [revokePosition, { loading: revokingPosition }] = useMutation(REVOKE_EXECUTIVE_POSITION_MUTATION, {
    refetchQueries: ['publicExecutiveCommittee', 'viewerAccessContext'],
  });
  const [assignPosition, { loading: assigningPosition }] = useMutation(ASSIGN_EXECUTIVE_POSITION_MUTATION, {
    refetchQueries: ['publicExecutiveCommittee', 'viewerAccessContext'],
  });
  const [replacementTarget, setReplacementTarget] = React.useState<any>(null);
  const [replacementUserId, setReplacementUserId] = React.useState('');
  const [replacementReason, setReplacementReason] = React.useState('');
  const [replacementValidUntil, setReplacementValidUntil] = React.useState('');
  const { data: userData } = useGetUserListQuery({
    variables: {
      options: {
        filter: { verified: true },
        offset: 0,
        limit: 250,
      },
    },
    skip: !replacementTarget,
  });

  const committee = React.useMemo(
    () =>
      [...(data?.publicExecutiveCommittee || [])]
        .sort((left: any, right: any) => {
          const positionRank =
            getExecutiveCommitteePositionRank(left.positionCode) -
            getExecutiveCommitteePositionRank(right.positionCode);
          if (positionRank !== 0) return positionRank;
          return String(left.name || '').localeCompare(String(right.name || ''));
        })
        .map((assignment: any) => ({
          assignment,
          card: {
            name: assignment.name,
            designation: assignment.designation,
            batch: assignment.batch,
            profilePicture: assignment.profilePicture || getAvatarDataUrl(assignment.userId),
            email: assignment.email,
            mobile: assignment.mobile,
          },
        })),
    [data?.publicExecutiveCommittee]
  );
  const users = userData?.getUserList?.data || [];

  const openReplacementDialog = (assignment: any) => {
    setReplacementTarget(assignment);
    setReplacementValidUntil(assignment?.validUntil ? assignment.validUntil.slice(0, 10) : '');
  };

  const closeReplacementDialog = () => {
    setReplacementTarget(null);
    setReplacementUserId('');
    setReplacementReason('');
    setReplacementValidUntil('');
  };

  const replacePositionHolder = async () => {
    if (!replacementTarget || !replacementUserId || !replacementReason || !replacementValidUntil) return;
    await revokePosition({
      variables: {
        input: {
          assignmentId: replacementTarget.assignmentId,
          reason: replacementReason,
        },
      },
    });
    await assignPosition({
      variables: {
        input: {
          userId: replacementUserId,
          executiveTermId: replacementTarget.termId,
          positionCode: replacementTarget.positionCode,
          validFrom: new Date().toISOString().slice(0, 10),
          validUntil: replacementValidUntil,
          reason: replacementReason,
        },
      },
    });
    closeReplacementDialog();
  };

  return (
    <Box>
      <Typography variant="h1">The JNVPJAA Executive Commmittee</Typography>
      <Typography color="grey.800" mt={2}>
        {`The dedicated individuals who lead and shape our vibrant alumni association. Our committee members bring diverse expertise and a shared passion for fostering
        community and connection among JNVPJAA alumni. Meet the team driving our mission forward and discover the faces
        behind the initiatives that keep our alumni network strong and engaged.`}
      </Typography>
      <Grid container spacing={3} mt={4}>
        {committee.map(({ card, assignment }: { card: ProfileCardProps; assignment: any }, index: number) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
            key={`-committee-${card.designation}-${index}`}
          >
            <Box position="relative">
              {canManagePositions && assignment && (
                <Tooltip title="Replace position holder">
                  <IconButton
                    size="small"
                    onClick={() => openReplacementDialog(assignment)}
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, bgcolor: 'background.paper' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <ProfileCard {...card} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={Boolean(replacementTarget)} onClose={closeReplacementDialog} fullWidth maxWidth="sm">
        <DialogTitle>Replace Executive Member</DialogTitle>
        <DialogContent>
          <Typography color="grey.700" mb={2}>
            {replacementTarget?.positionName}
          </Typography>
          <Select
            fullWidth
            size="small"
            displayEmpty
            value={replacementUserId}
            onChange={(event) => setReplacementUserId(event.target.value)}
          >
            <MenuItem value="">Select active member</MenuItem>
            {users.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                <ProfilePicture
                  id={user.id}
                  src={user.profileImage || undefined}
                  title={`${user.firstName || ''} ${user.lastName || ''}`}
                  summary={user.batch !== null && user.batch !== undefined ? `Batch ${user.batch}` : 'Batch NA'}
                  size={28}
                  containerProps={{ sx: { cursor: 'default' } }}
                />
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Valid until"
            type="date"
            value={replacementValidUntil}
            onChange={(event) => setReplacementValidUntil(event.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Reason"
            value={replacementReason}
            onChange={(event) => setReplacementReason(event.target.value)}
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button title="Cancel" variant="outlined" color="secondary" onClick={closeReplacementDialog} />
          <Button
            title="Replace"
            loading={revokingPosition || assigningPosition}
            disabled={!replacementUserId || !replacementReason || !replacementValidUntil}
            onClick={replacePositionHolder}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Organizations;
