'use client';

import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { Stack } from '@mui/material';
import { IconLock, IconLockOpen, IconPencil, IconTrash, IconUsers } from '@tabler/icons-react';
import { DELETE_JOB, SET_JOB_STATUS, type Job } from '@/apollo/jobsOperations';
import AlertDialog from '@/components/common/AlertDialog';
import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';

interface JobOwnerActionsProps {
  job: Pick<Job, 'id' | 'slug' | 'title' | 'status' | 'applicationCount'>;
  onChanged: () => void;
}

/** Shown to the poster and moderators. The API authorises every action on its own. */
const JobOwnerActions: React.FC<JobOwnerActionsProps> = ({ job, onChanged }) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [confirming, setConfirming] = React.useState(false);
  const [setStatus, { loading: switching }] = useMutation(SET_JOB_STATUS);
  const [deleteJob, { loading: deleting }] = useMutation(DELETE_JOB);
  const open = job.status === 'OPEN';

  const toggle = async () => {
    try {
      await setStatus({ variables: { id: job.id, status: open ? 'CLOSED' : 'OPEN' } });
      showAlert({ visible: true, type: 'success', message: open ? 'Job closed.' : 'Job reopened.' });
      onChanged();
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not update the job.' });
    }
  };

  const remove = async () => {
    try {
      await deleteJob({ variables: { id: job.id } });
      showAlert({ visible: true, type: 'success', message: 'Job deleted.' });
      router.push(paths.jobs.root);
      router.refresh();
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not delete the job.' });
      setConfirming(false);
    }
  };

  return (
    <>
      <Stack direction="row" gap={1} flexWrap="wrap">
        <Button
          title={`View applicants (${job.applicationCount})`}
          size="small"
          startIcon={<IconUsers size={16} />}
          LinkComponent={NextLink}
          href={paths.jobs.getApplicantsUrl(job.slug)}
        />
        <Button
          title="Edit"
          variant="outlined"
          size="small"
          startIcon={<IconPencil size={16} />}
          LinkComponent={NextLink}
          href={paths.jobs.getEditUrl(job.slug)}
        />
        <Button
          title={open ? 'Close job' : 'Reopen'}
          variant="outlined"
          size="small"
          startIcon={open ? <IconLock size={16} /> : <IconLockOpen size={16} />}
          loading={switching}
          disabled={switching}
          onClick={toggle}
        />
        <Button
          title="Delete"
          variant="outlined"
          color="error"
          size="small"
          startIcon={<IconTrash size={16} />}
          onClick={() => setConfirming(true)}
        />
      </Stack>
      <AlertDialog
        open={confirming}
        action={deleting ? 'deleting' : 'delete'}
        title="Delete this job?"
        message={`“${job.title}” and its ${job.applicationCount} application(s) will be removed. This cannot be undone. To stop new applications but keep the list, close the job instead.`}
        onOkay={remove}
        onCancel={() => setConfirming(false)}
        onClose={() => setConfirming(false)}
        okayButtonProps={{ title: 'Delete', disabled: deleting }}
      />
    </>
  );
};

export default JobOwnerActions;
