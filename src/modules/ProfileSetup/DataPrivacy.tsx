import { User, useUpdateUserMutation } from '@/apollo/hooks';
import Button from '@/components/core/Button';
import { useAlert } from '@/context/AlertContext';
import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import { Box, Checkbox, FormControlLabel, Switch, SwitchProps, Theme, Typography } from '@mui/material';
import { IconLock, IconCaretLeft, IconX, IconCircleCheck, IconInfoCircle } from '@tabler/icons-react';
import React from 'react';

interface DataPrivacyProps {
  onBack?: () => void;
  onNext?: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  user?: User;
  isLastStep?: boolean;
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        // @ts-expect-error type-error
        ...(theme.palette.mode === 'dark' && {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      // @ts-expect-error type-error
      color: theme.palette.grey[100],
      // @ts-expect-error type-error
      ...(theme.palette.mode === 'dark' && {
        // @ts-expect-error type-error
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      // @ts-expect-error type-error
      ...(theme.palette.mode === 'dark' && {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    // @ts-expect-error type-error
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    // @ts-expect-error type-error
    ...(theme.palette.mode === 'dark' && {
      backgroundColor: '#39393D',
    }),
  },
}));

const DataPrivacy: React.FC<DataPrivacyProps> = ({ user, isLastStep, onNext, onBack, onSuccess, onCancel }) => {
  const [isConfidential, setIsConfidential] = React.useState<boolean>(user?.isConfidential ?? false);
  const client = useApolloClient();
  const { showAlert } = useAlert();
  const [updateUser, { loading }] = useUpdateUserMutation();

  const onSubmit = React.useCallback(() => {
    const vars = {
      id: user?.id,
      isConfidential,
    };
    updateUser({
      variables: {
        ...vars,
      },
      onCompleted: (res) => {
        console.log('COmpleted', res);
        client?.refetchQueries({
          include: ['getUserDetails'],
        });

        onSuccess?.();
        onNext?.();
      },
      onError: (err: Error) => {
        showAlert({
          visible: true,
          type: 'error',
          message: err?.message || 'Image upload failed. Please try again.',
        });
        console.log('Error: ', err?.message);
      },
    });
  }, [updateUser, showAlert, isConfidential, onSuccess, onNext, user, client]);

  return (
    <Box
      p={{ xs: 2, md: 3 }}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box display="flex" alignItems="center" mb={1.5}>
        <IconLock size={32} />
        <Typography sx={{ ml: 1 }} fontWeight={600}>
          Data Privacy
        </Typography>
      </Box>
      <Typography color="text.secondary" mb={2}>
        Choose whether approved alumni can see your email and phone number. Your emergency contact stays private.
      </Typography>

      <Box mb={2}>
        <FormControlLabel
          onChange={(e: any, checked: boolean) => setIsConfidential(checked)}
          control={<IOSSwitch disabled={loading} checked={isConfidential} sx={{ m: 1 }} />}
          value={isConfidential}
          label="Keep my contact details private"
        />
        <Typography variant="body2" mt={1} color="text.secondary">
          {isConfidential
            ? 'Other alumni will see masked contact details. You can still see your own information.'
            : 'Verified alumni can see your email and phone number. Public visitors cannot.'}
        </Typography>
      </Box>

      <Box display="flex" width="100%" alignItems="center" gap={2}>
        {onBack && (
          <Button
            title="Back"
            variant="outlined"
            startIcon={<IconCaretLeft size={16} />}
            disabled={loading}
            onClick={onBack}
          />
        )}

        <Box display="flex" gap={2} ml="auto">
          {!onNext && (
            <Button
              title="Cancel"
              variant="outlined"
              startIcon={<IconX size={16} />}
              // disabled={loading || addressesLoading}
              onClick={() => {
                onCancel?.();
              }}
            />
          )}
          {onNext && (
            <Button
              title="Skip"
              variant="outlined"
              disabled={loading}
              onClick={() => {
                onNext?.();
              }}
            />
          )}
          <Button
            title={onNext ? 'Update & Finish' : 'Update'}
            onClick={() => onSubmit()}
            startIcon={<IconCircleCheck size={16} />}
            loading={loading}
            // disabled={addressesLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DataPrivacy;
