'use client';

import React from 'react';
import { useMutation } from '@apollo/client';
import { Alert, Stack, TextField, Typography } from '@mui/material';
import { IconBrandGithub, IconBrandLinkedin, IconFileText, IconWorld } from '@tabler/icons-react';
import { APPLY_TO_JOB, type Job, type JobApplicationInput } from '@/apollo/jobsOperations';
import Dialog from '@/components/core/Dialog';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { isHttpsUrl, socialUrl } from '@/modules/Jobs/jobs.utils';

type LinkKey = 'resumeUrl' | 'linkedinUrl' | 'githubUrl' | 'portfolioUrl';

const LINK_FIELDS: { key: LinkKey; label: string; placeholder: string; icon: React.ReactNode }[] = [
  {
    key: 'resumeUrl',
    label: 'Resume link',
    placeholder: 'https://drive.google.com/… (Google Drive, Dropbox, OneDrive)',
    icon: <IconFileText size={18} />,
  },
  {
    key: 'linkedinUrl',
    label: 'LinkedIn',
    placeholder: 'https://www.linkedin.com/in/…',
    icon: <IconBrandLinkedin size={18} />,
  },
  { key: 'githubUrl', label: 'GitHub', placeholder: 'https://github.com/…', icon: <IconBrandGithub size={18} /> },
  {
    key: 'portfolioUrl',
    label: 'Portfolio or other profile',
    placeholder: 'Behance, Dribbble, LeetCode, personal site…',
    icon: <IconWorld size={18} />,
  },
];

const NOTE_MAX = 1000;

interface ApplyDialogProps {
  job: Pick<Job, 'id' | 'title' | 'company'>;
  open: boolean;
  onClose: () => void;
  onApplied: () => void;
}

const ApplyDialog: React.FC<ApplyDialogProps> = ({ job, open, onClose, onApplied }) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [values, setValues] = React.useState<JobApplicationInput>({});
  const [error, setError] = React.useState('');
  const [apply, { loading }] = useMutation(APPLY_TO_JOB);

  // Pre-fill from the profile's social handles each time the dialog opens.
  React.useEffect(() => {
    if (!open) return;
    setError('');
    setValues({
      linkedinUrl: socialUrl('linkedin', user?.socialMedia?.linkedin),
      githubUrl: socialUrl('github', user?.socialMedia?.github),
    });
  }, [open, user?.socialMedia]);

  const badLinks = LINK_FIELDS.filter(({ key }) => values[key]?.trim() && !isHttpsUrl(values[key] as string));
  const noteLength = values.note?.length || 0;

  const submit = async () => {
    if (badLinks.length || noteLength > NOTE_MAX) return;
    setError('');
    try {
      const input = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v?.trim() || null]));
      await apply({ variables: { jobId: job.id, input } });
      showAlert({ visible: true, type: 'success', message: 'Application sent. Good luck!' });
      onApplied();
    } catch (err: any) {
      // Applied from another tab: nothing to retry, so refresh the page into its "Applied" state.
      if (/already applied/i.test(err?.message || '')) {
        showAlert({ visible: true, type: 'success', message: 'You have already applied to this job.' });
        onApplied();
        return;
      }
      setError(err?.message || 'Could not send your application. Please try again.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Apply: ${job.title}`}
      subTitle={job.company}
      maxWidth="sm"
      footerProps={{
        onCancel: onClose,
        onOkay: submit,
        okayButtonProps: {
          title: 'Send application',
          loading,
          disabled: loading || badLinks.length > 0 || noteLength > NOTE_MAX,
        },
      }}
    >
      <Stack spacing={2} pt={1}>
        <Alert severity="info" variant="outlined" sx={{ borderRadius: 2 }}>
          The poster will see your profile (name, batch, contact details, city and current company) along with the links
          and note below. All fields are optional.
        </Alert>
        {LINK_FIELDS.map(({ key, label, placeholder, icon }) => {
          const invalid = badLinks.some((field) => field.key === key);
          return (
            <TextField
              key={key}
              label={label}
              size="small"
              fullWidth
              value={values[key] || ''}
              placeholder={placeholder}
              onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
              error={invalid}
              helperText={invalid ? 'Paste the full link, starting with https://' : undefined}
              disabled={loading}
              InputProps={{ startAdornment: <Stack mr={1}>{icon}</Stack> }}
            />
          );
        })}
        <TextField
          label="Note to the poster"
          multiline
          minRows={3}
          fullWidth
          value={values.note || ''}
          placeholder="A line or two on why you're a good fit"
          onChange={(e) => setValues((prev) => ({ ...prev, note: e.target.value }))}
          error={noteLength > NOTE_MAX}
          helperText={`${noteLength}/${NOTE_MAX}`}
          disabled={loading}
        />
        {error && (
          <Typography color="error" role="alert">
            {error}
          </Typography>
        )}
      </Stack>
    </Dialog>
  );
};

export default ApplyDialog;
