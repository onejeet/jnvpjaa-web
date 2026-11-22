'use client';

import { gql, useMutation } from '@apollo/client';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { IconCake } from '@tabler/icons-react';
import React from 'react';
import Button from '@/components/core/Button';
import { useAlert } from '@/context/AlertContext';

const SEND_TEST_BIRTHDAY_EMAIL = gql`
  mutation SendTestBirthdayEmail($email: String!, $firstName: String!, $lastName: String) {
    sendTestBirthdayEmail(email: $email, firstName: $firstName, lastName: $lastName)
  }
`;

/** Super Admin: sends one sample birthday email to any address, to preview or demo it. */
const BirthdayEmailAdminSettings: React.FC = () => {
  const { showAlert } = useAlert();
  const [sendTest, { loading }] = useMutation(SEND_TEST_BIRTHDAY_EMAIL);
  const [form, setForm] = React.useState({ firstName: '', lastName: '', email: '' });
  const set = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendTest({ variables: { ...form, lastName: form.lastName || null } });
      showAlert({ visible: true, type: 'success', message: `Test birthday email sent to ${form.email.trim()}.` });
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'The test email could not be sent.' });
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={send}
      variant="outlined"
      sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, maxWidth: 760, mb: 3 }}
      aria-label="Test birthday email"
    >
      <Typography variant="h3" mb={1}>
        Test birthday email
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Send the birthday email to any address to see how it looks. It goes only to the address below; the automatic
        birthday emails to members are not affected.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField
          label="First name"
          value={form.firstName}
          onChange={set('firstName')}
          required
          fullWidth
          size="small"
        />
        <TextField label="Last name" value={form.lastName} onChange={set('lastName')} fullWidth size="small" />
      </Stack>
      <TextField
        label="Email"
        type="email"
        value={form.email}
        onChange={set('email')}
        required
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        title={loading ? 'Sending…' : 'Send test email'}
        loading={loading}
        disabled={loading}
        startIcon={<IconCake size={18} />}
      />
    </Paper>
  );
};

export default BirthdayEmailAdminSettings;
