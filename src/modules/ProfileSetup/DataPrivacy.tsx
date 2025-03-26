import { User, useUpdateUserMutation } from '@/apollo/hooks';
import Button from '@/components/core/Button';
import { useAlert } from '@/context/AlertContext';
import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import { Box, Checkbox, FormControlLabel, Switch, SwitchProps, Theme, Typography } from '@mui/material';
import { CaretLeft, CaretRight, CheckCircle, Lock, X } from '@phosphor-icons/react';
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
    const vars: any = {
      id: user?.id,
      isConfidential,
    };
    if (user?.metadata?.isFirstLogin && isLastStep) {
      vars.metadata = {
        isFirstLogin: false,
      };
    }
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
        <Lock size={32} />
        <Typography sx={{ ml: 1 }} fontWeight={600}>
          Data Privacy
        </Typography>
      </Box>
      <Typography>
        You can control the privacy of your contact information and decide who can see it. Use the options below to make
        your details protected or private as per your preference.
      </Typography>
      <Typography width="100%" my={1.5}>
        <b>Private: </b>Your email, mobile number, and address will be hidden from both alumni members and the public,
        even when they log in. <br />
        <b>Protected:</b> Your email, mobile number, and address will be visible only to verified alumni members but
        will remain hidden from the public.
      </Typography>

      <Box mb={2}>
        <FormControlLabel
          onChange={(e: any, checked: boolean) => setIsConfidential(checked)}
          control={<IOSSwitch disabled={loading} checked={isConfidential} sx={{ m: 1 }} />}
          value={isConfidential}
          label="Keep my Data Private"
        />
      </Box>

      <Box display="flex" width="100%" alignItems="center" gap={2}>
        {onBack && (
          <Button
            title="Back"
            variant="outlined"
            startIcon={<CaretLeft size={16} />}
            disabled={loading}
            onClick={onBack}
          />
        )}

        <Box display="flex" gap={2} ml="auto">
          {!onNext && (
            <Button
              title="Cancel"
              variant="outlined"
              startIcon={<X size={16} />}
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
              endIcon={<CaretRight size={16} />}
              disabled={loading}
              onClick={() => {
                onNext?.();
              }}
            />
          )}
          <Button
            title={onNext ? 'Update & Next' : 'Update'}
            onClick={() => onSubmit()}
            startIcon={<CheckCircle size={16} />}
            loading={loading}
            // disabled={addressesLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DataPrivacy;
