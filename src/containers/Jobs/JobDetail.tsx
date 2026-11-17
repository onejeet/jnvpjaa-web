'use client';

import React from 'react';
import NextLink from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Link,
  Button as MuiButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import {
  IconBriefcase,
  IconBuilding,
  IconCalendarDue,
  IconCircleCheckFilled,
  IconCash,
  IconExternalLink,
  IconMapPin,
  IconSchool,
  IconUsers,
} from '@tabler/icons-react';
import { JOB, WITHDRAW_APPLICATION, type Job } from '@/apollo/jobsOperations';
import AlertDialog from '@/components/common/AlertDialog';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CopyContentButton from '@/components/common/CopyContentButton';
import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { canonicalUrl } from '@/config/seo.config';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import LayoutModule from '@/layouts/Layout';
import {
  EXPERIENCE_LABEL,
  JOB_TYPE_LABEL,
  WORK_MODE_LABEL,
  deadlineLabel,
  formatSalary,
} from '@/modules/Jobs/jobs.utils';
import ApplyDialog from './ApplyDialog';
import { Fact } from './JobCard';
import JobOwnerActions from './JobOwnerActions';

const formatDay = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(iso));

const JobDetail: React.FC<{ job: Job }> = ({ job: initial }) => {
  const { user, redirectToSignin } = useAuth();
  const { showAlert } = useAlert();
  const [applying, setApplying] = React.useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = React.useState(false);
  // The server render has no session; the viewer's own state (applied, can manage) loads in the browser.
  const { data, refetch } = useQuery<{ job: Job | null }>(JOB, {
    variables: { slug: initial.slug },
    skip: !user?.id,
    fetchPolicy: 'network-only',
  });
  const [withdraw, { loading: withdrawing }] = useMutation(WITHDRAW_APPLICATION);
  const job = data?.job ?? initial;
  const isPoster = Boolean(user?.id && user.id === job.postedBy.id);
  const salary = formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod);
  const deadline = deadlineLabel(job.deadline);
  const poster = `${job.postedBy.firstName} ${job.postedBy.lastName}`.trim();

  const confirmWithdrawal = async () => {
    try {
      await withdraw({ variables: { jobId: job.id } });
      showAlert({ visible: true, type: 'success', message: 'Application withdrawn.' });
      await refetch();
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not withdraw the application.' });
    }
    setConfirmWithdraw(false);
  };

  // Until the signed-in viewer's own state arrives, don't offer "Apply now" to someone who already applied.
  const viewerLoading = Boolean(user?.id) && !data;

  const applyArea = () => {
    if (viewerLoading) return <Skeleton variant="rounded" width={150} height={44} aria-label="Loading" />;
    if (isPoster) return null;
    if (job.viewerHasApplied && job.viewerApplication) {
      return (
        <Stack direction="row" alignItems="center" gap={1.5} flexWrap="wrap">
          <Chip
            color="success"
            icon={<IconCircleCheckFilled size={18} />}
            label={`Applied on ${formatDay(job.viewerApplication.createdAt)}`}
            sx={{ fontWeight: 600, height: 40, px: 1 }}
          />
          <Button title="Withdraw" variant="text" color="error" size="small" onClick={() => setConfirmWithdraw(true)} />
        </Stack>
      );
    }
    if (!job.isAccepting) {
      return <Button title="Applications closed" disabled />;
    }
    return (
      <Button
        title={user?.id ? 'Apply now' : 'Sign in to apply'}
        size="large"
        startIcon={<IconBriefcase size={18} />}
        onClick={() => (user?.id ? setApplying(true) : redirectToSignin(true))}
      />
    );
  };

  return (
    <LayoutModule disableCover title={`${job.title} at ${job.company} • JNVPJAA Jobs`}>
      <Breadcrumbs items={[{ label: 'Jobs & Internships', path: paths.jobs.root }, { label: job.title }]} />
      <Box component="article" sx={{ maxWidth: 820, mx: 'auto', pt: { xs: 1, md: 2 }, pb: { xs: 4, md: 6 } }}>
        <Stack spacing={2}>
          {!job.isAccepting && (
            <Alert severity="warning" variant="outlined" sx={{ borderRadius: 2 }}>
              This job is no longer accepting applications.
            </Alert>
          )}
          <Stack direction="row" gap={0.75} flexWrap="wrap">
            <Chip size="small" color="primary" label={JOB_TYPE_LABEL[job.type]} />
            <Chip size="small" variant="outlined" label={WORK_MODE_LABEL[job.workMode]} />
            <Chip
              size="small"
              variant="outlined"
              icon={<IconSchool size={14} />}
              label={EXPERIENCE_LABEL[job.experience]}
            />
          </Stack>
          <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 38 }, lineHeight: 1.2 }}>
            {job.title}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 0.75, sm: 2.5 }} flexWrap="wrap">
            <Fact icon={<IconBuilding size={18} />}>
              {job.companyWebsite ? (
                <Link href={job.companyWebsite} target="_blank" rel="noopener noreferrer">
                  {job.company}
                </Link>
              ) : (
                job.company
              )}
            </Fact>
            {job.location && <Fact icon={<IconMapPin size={18} />}>{job.location}</Fact>}
            {salary && <Fact icon={<IconCash size={18} />}>{salary}</Fact>}
            {deadline && <Fact icon={<IconCalendarDue size={18} />}>{deadline}</Fact>}
            <Fact icon={<IconUsers size={18} />}>
              <strong>{job.applicationCount}</strong> {job.applicationCount === 1 ? 'member has' : 'members have'}{' '}
              applied
            </Fact>
          </Stack>

          <Stack direction="row" alignItems="center" gap={1.5} flexWrap="wrap" pt={1}>
            {applyArea()}
            {job.applyUrl && (
              <MuiButton
                component="a"
                variant="outlined"
                endIcon={<IconExternalLink size={16} />}
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Also apply on company site
              </MuiButton>
            )}
          </Stack>
          {job.viewerCanManage && <JobOwnerActions job={job} onChanged={() => refetch()} />}
        </Stack>

        <Divider sx={{ my: { xs: 3, md: 4 } }} />

        <Typography variant="h2" sx={{ fontSize: 22, mb: 1.5 }}>
          About the role
        </Typography>
        <Typography
          component="div"
          className="rich_content"
          sx={{ fontSize: 17, lineHeight: 1.7 }}
          // Sanitised by the API before storage.
          dangerouslySetInnerHTML={{ __html: job.description || '' }}
        />

        {job.skills.length > 0 && (
          <>
            <Typography variant="h2" sx={{ fontSize: 22, mt: 4, mb: 1.5 }}>
              Skills
            </Typography>
            <Stack direction="row" gap={1} flexWrap="wrap">
              {job.skills.map((skill) => (
                <Chip key={skill} label={skill} variant="outlined" />
              ))}
            </Stack>
          </>
        )}

        <Card variant="outlined" sx={{ borderRadius: 3, p: 2.5, mt: 4 }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Avatar src={job.postedBy.profileImage || undefined} alt={poster} sx={{ width: 52, height: 52 }}>
              {job.postedBy.firstName?.[0]}
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {job.posterRelation === 'HIRING_AT_COMPANY'
                  ? `Posted by an alumnus who works at ${job.company}`
                  : 'Shared as a lead by an alumnus'}
              </Typography>
              <Link component={NextLink} href={paths.profile.getProfileUrl(job.postedBy.id)} fontWeight={700}>
                {poster}
              </Link>
              {job.postedBy.batch && (
                <Typography component="span" color="text.secondary">
                  {' '}
                  · batch {job.postedBy.batch}
                </Typography>
              )}
            </Box>
          </Stack>
        </Card>

        <Stack direction="row" alignItems="center" spacing={1.5} mt={3}>
          <Typography variant="body2" color="text.secondary">
            Share this opening
          </Typography>
          <CopyContentButton content={canonicalUrl(paths.jobs.getJobUrl(job.slug))} buttonType="button" />
        </Stack>
      </Box>

      <ApplyDialog
        job={job}
        open={applying}
        onClose={() => setApplying(false)}
        onApplied={() => {
          setApplying(false);
          refetch();
        }}
      />
      <AlertDialog
        open={confirmWithdraw}
        action="delete"
        title="Withdraw your application?"
        message="The poster will no longer see your application. You can apply again while the job is open."
        onOkay={confirmWithdrawal}
        onCancel={() => setConfirmWithdraw(false)}
        onClose={() => setConfirmWithdraw(false)}
        okayButtonProps={{ title: 'Withdraw', disabled: withdrawing }}
      />
    </LayoutModule>
  );
};

export default JobDetail;
