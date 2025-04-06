import React from 'react';
import { Stack, Divider, Typography, Box } from '@mui/material';
import Dialog, { DialogProps } from '@/components/core/Dialog';
import ProfilePicture from '../ProfilePicture';
import { EventAttendeeUser } from '@/types/global';

interface UserListDialogProps {
  open: boolean;
  onClose: () => void;
  users: EventAttendeeUser[];
  title?: string;
  dialogProps?: Partial<DialogProps>;
}

const UserListDialog: React.FC<UserListDialogProps> = ({ title, dialogProps = {}, open, onClose, users = [] }) => {
  return (
    <Dialog open={open} title={title || 'UserList'} onClose={onClose} maxWidth="sm" {...dialogProps}>
      <Stack spacing={2} p={2} divider={<Divider flexItem />}>
        {users?.length > 0 ? (
          users?.map((user) => (
            <Box key={user?.id} px={1}>
              <ProfilePicture
                id={user?.id}
                size={40}
                src={user?.profileImage}
                title={`${user?.firstName || ''} ${user?.lastName || ''}`}
                summary={`Batch of ${user?.batch || ''}`}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No users found.
          </Typography>
        )}
      </Stack>
    </Dialog>
  );
};

export default UserListDialog;
