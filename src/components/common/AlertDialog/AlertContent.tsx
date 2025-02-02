import React, { act } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import ErrorIcon from '@mui/icons-material/Error';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import type { AlertContentProps } from './AlertDialog.types';

const AlertContent: React.FC<AlertContentProps> = ({ title, message, action = 'delete', items = [] }) => {
  const MessageComp = React.useMemo(() => {
    switch (action) {
      case 'approve':
        return (
          <Typography variant="body2">
            Do you really want to approve?
            <br /> once approved, the user will be able to login and access portal.
          </Typography>
        );
      case 'reject':
        return (
          <Typography variant="body2">
            Do you really want to reject?
            <br /> The registration will be discarded and removed.
          </Typography>
        );
      case 'delete':
        if (items.length === 0) {
          return <Typography variant="body2">Do you really want to delete this item?</Typography>;
        } else if (items.length === 1) {
          return (
            <Typography variant="body2">
              Do you really want to delete{' '}
              <Typography variant="body2" component="span" fontWeight={600}>
                {items[0]}
              </Typography>
              ?
            </Typography>
          );
        }
        return (
          <Box display="flex" flexDirection="column">
            <Typography variant="body2">Do you really want to delete below items?</Typography>
            <List sx={{ mt: 1 }} dense>
              {items.map((item, index) => (
                <ListItem key={`delete-item-${index}`} disableGutters sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  {item}
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 'deleting':
        return <Typography variant="h6">{message || 'Deleting, Please wait...'}</Typography>;
      case 'success':
        return message ? <Typography variant="body2">{message}</Typography> : null;
      case 'error':
        return message ? <Typography variant="body2">{message || 'Completed Successfully'}</Typography> : null;
      case 'unsaved':
        return (
          <Typography variant="body2">
            {message || `You have made changes that haven't been saved yet. Are you sure to discard changes?`}
          </Typography>
        );
      default:
        return '';
    }
  }, [message, action, items]);

  const titleComp = React.useMemo(() => {
    let upTitle = null;
    if (action === 'delete' || action === 'approve' || action === 'reject') {
      upTitle = title || 'Are you sure?';
    } else if (action === 'deleting') {
      return null;
    } else if (action === 'unsaved') {
      upTitle = title || 'Discard changes?';
    } else if (action === 'success') {
      upTitle = title || 'Completed Successfully';
    } else if (action === 'error') {
      upTitle = title || 'An error occurred';
    }

    return (
      <Typography fontSize="1.3rem" variant="h6">
        {upTitle}
      </Typography>
    );
  }, [action, title]);

  const iconComp = React.useMemo(() => {
    if (action === 'delete' || action === 'approve' || action === 'reject') {
      return <HelpIcon sx={{ color: 'grey.700', fontSize: '100px' }} />;
    } else if (action === 'success') {
      return <TaskAltIcon sx={{ color: 'success.main', fontSize: '100px' }} />;
    } else if (action === 'error') {
      return <ErrorIcon sx={{ color: 'error.main', fontSize: '100px' }} />;
    } else if (action === 'deleting') {
      return <DeleteIcon sx={{ color: 'error.main', fontSize: '100px' }} />;
    } else if (action === 'unsaved') {
      return <HelpIcon sx={{ color: 'grey.700', fontSize: '100px' }} />;
    }
  }, [action]);

  return (
    <Box
      color="var(--mui-palette-text-secondary)"
      px={2}
      py={3}
      gap={1.5}
      textAlign="center"
      display="flex"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      {iconComp}
      {titleComp}
      {MessageComp}
    </Box>
  );
};

export default AlertContent;
