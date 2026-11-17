'use client';

import React from 'react';
import NextLink from 'next/link';
import { useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Collapse,
  Link,
  Button as MuiButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  IconArrowLeft,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconCopy,
  IconFileText,
  IconMail,
  IconMapPin,
  IconPhone,
  IconWorld,
} from '@tabler/icons-react';
import { JOB, JOB_APPLICANTS, type Job, type JobApplication } from '@/apollo/jobsOperations';
import EmptyView from '@/components/common/EmptyView';
import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { Fact } from './JobCard';

const formatWhen = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(iso));

const LINKS: { key: keyof JobApplication; label: string; icon: React.ReactNode }[] = [
  { key: 'resumeUrl', label: 'Resume', icon: <IconFileText size={16} /> },
  { key: 'linkedinUrl', label: 'LinkedIn', icon: <IconBrandLinkedin size={16} /> },
  { key: 'githubUrl', label: 'GitHub', icon: <IconBrandGithub size={16} /> },
  { key: 'portfolioUrl', label: 'Portfolio', icon: <IconWorld size={16} /> },
];

const ApplicantCard: React.FC<{ application: JobApplication }> = ({ application }) => {
  const [showAbout, setShowAbout] = React.useState(false);
  const person = application.applicant;
  if (!person) return null;
  const name = `${person.firstName} ${person.lastName}`.trim();
  const place = [person.city, person.state].filter(Boolean).join(', ');
  const links = LINKS.filter(({ key }) => application[key]);
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, p: { xs: 2, md: 2.5 } }}>
      <Stack spacing={1.5}>
        <Stack direction="row" gap={1.5} alignItems="center">
          <Avatar src={person.profileImage || undefined} alt={name} sx={{ width: 48, height: 48 }}>
            {person.firstName?.[0]}
          </Avatar>
          <Box flex={1} minWidth={0}>
            <Link component={NextLink} href={paths.profile.getProfileUrl(person.id)} fontWeight={700} fontSize={17}>
              {name}
            </Link>
            <Typography variant="body2" color="text.secondary">
              {[
                person.batch && `Batch ${person.batch}`,
                person.position && person.companyName
                  ? `${person.position} at ${person.companyName}`
                  : person.companyName,
              ]
                .filter(Boolean)
                .join(' · ')}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" flexShrink={0} textAlign="right">
            Applied
            <br />
            {formatWhen(application.createdAt)}
          </Typography>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 0.5, sm: 2 }} flexWrap="wrap">
          <Fact icon={<IconMail size={16} />}>
            <Link href={`mailto:${person.email}`}>{person.email}</Link>
          </Fact>
          {person.mobile && (
            <Fact icon={<IconPhone size={16} />}>
              <Link href={`tel:${person.mobile}`}>{person.mobile}</Link>
            </Fact>
          )}
          {person.whatsAppMobile && (
            <Fact icon={<IconBrandWhatsapp size={16} />}>
              <Link
                href={`https://wa.me/${person.whatsAppMobile.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {person.whatsAppMobile}
              </Link>
            </Fact>
          )}
          {place && <Fact icon={<IconMapPin size={16} />}>{place}</Fact>}
        </Stack>

        {links.length > 0 && (
          <Stack direction="row" gap={1} flexWrap="wrap">
            {links.map(({ key, label, icon }) => (
              <MuiButton
                key={key}
                component="a"
                size="small"
                variant="outlined"
                startIcon={icon}
                href={String(application[key])}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </MuiButton>
            ))}
          </Stack>
        )}

        {application.note && (
          <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, p: 1.5 }}>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {application.note}
            </Typography>
          </Box>
        )}

        {person.aboutMe && (
          <Box>
            <Link component="button" variant="body2" onClick={() => setShowAbout((v) => !v)}>
              {showAbout ? 'Hide about' : 'Show about'}
            </Link>
            <Collapse in={showAbout}>
              <Typography variant="body2" color="text.secondary" mt={1} sx={{ whiteSpace: 'pre-wrap' }}>
                {person.aboutMe}
              </Typography>
            </Collapse>
          </Box>
        )}
      </Stack>
    </Card>
  );
};

const JobApplicants: React.FC<{ slug: string }> = ({ slug }) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const jobQuery = useQuery<{ job: Job | null }>(JOB, {
    variables: { slug },
    skip: !user?.id,
    fetchPolicy: 'network-only',
  });
  const job = jobQuery.data?.job;
  const applicantsQuery = useQuery<{ jobApplicants: JobApplication[] }>(JOB_APPLICANTS, {
    variables: { jobId: job?.id },
    skip: !job?.viewerCanManage,
    fetchPolicy: 'network-only',
  });

  if (!user?.id || jobQuery.loading || applicantsQuery.loading) {
    return (
      <Box display="flex" justifyContent="center" my={8}>
        <CircularProgress />
      </Box>
    );
  }
  if (!job) return <EmptyView message="This job could not be found." />;
  if (!job.viewerCanManage || applicantsQuery.error) {
    return <EmptyView message="Only the person who posted this job can see its applicants." />;
  }

  const applications = applicantsQuery.data?.jobApplicants || [];
  const copyEmails = async () => {
    const emails = applications
      .map((a) => a.applicant?.email)
      .filter(Boolean)
      .join(', ');
    try {
      await navigator.clipboard.writeText(emails);
      showAlert({ visible: true, type: 'success', message: 'Emails copied.' });
    } catch {
      showAlert({ visible: true, type: 'error', message: 'Could not copy. Please copy them from the cards.' });
    }
  };

  return (
    <Stack spacing={3} pb={{ xs: 4, md: 6 }} sx={{ maxWidth: 900, mx: 'auto', width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" gap={2} flexWrap="wrap">
        <Box>
          <Link
            component={NextLink}
            href={paths.jobs.getJobUrl(job.slug)}
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mb: 1 }}
          >
            <IconArrowLeft size={16} /> Back to the job
          </Link>
          <Typography variant="h1" sx={{ fontSize: { xs: 26, md: 32 } }}>
            {applications.length} {applications.length === 1 ? 'applicant' : 'applicants'}
          </Typography>
          <Typography color="text.secondary">
            {job.title} · {job.company}
          </Typography>
        </Box>
        {applications.length > 0 && (
          <Button title="Copy all emails" variant="outlined" startIcon={<IconCopy size={16} />} onClick={copyEmails} />
        )}
      </Stack>
      {applications.length ? (
        applications.map((application) => <ApplicantCard key={application.id} application={application} />)
      ) : (
        <Typography color="text.secondary" textAlign="center" py={6}>
          No one has applied yet. Share the job link with batchmates to spread the word.
        </Typography>
      )}
    </Stack>
  );
};

export default JobApplicants;
