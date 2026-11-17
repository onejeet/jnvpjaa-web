'use client';

import React from 'react';
import NextLink from 'next/link';
import { Card, CardActionArea, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import { IconBuilding, IconCalendarDue, IconCash, IconMapPin, IconUsers } from '@tabler/icons-react';
import type { Job } from '@/apollo/jobsOperations';
import { paths } from '@/config/paths';
import { JOB_TYPE_LABEL, WORK_MODE_LABEL, deadlineLabel, formatSalary } from '@/modules/Jobs/jobs.utils';

export const Fact: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <Stack direction="row" alignItems="center" gap={0.75} color="text.secondary" fontSize={14}>
    {icon}
    <Typography component="span" fontSize="inherit" color="inherit">
      {children}
    </Typography>
  </Stack>
);

export const posterName = (job: Pick<Job, 'postedBy'>) =>
  `${job.postedBy.firstName} ${job.postedBy.lastName}`.trim() +
  (job.postedBy.batch ? ` · batch ${job.postedBy.batch}` : '');

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const salary = formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod);
  const deadline = deadlineLabel(job.deadline);
  // The job page renders on the server; show the click landed while it loads.
  const [opening, setOpening] = React.useState(false);
  return (
    <Card
      variant="outlined"
      aria-busy={opening || undefined}
      sx={{
        position: 'relative',
        height: '100%',
        borderRadius: 3,
        opacity: job.isAccepting ? 1 : 0.65,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <CardActionArea
        component={NextLink}
        href={paths.jobs.getJobUrl(job.slug)}
        onClick={(e: React.MouseEvent) => {
          if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) setOpening(true);
        }}
        sx={{
          height: '100%',
          p: 2.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          gap: 1.25,
          // The global stylesheet colours and underlines every <a>; a whole card is not inline link text.
          '&, &:hover': { textDecoration: 'none', color: 'text.primary' },
        }}
      >
        {opening && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3 }} />}
        <Stack direction="row" gap={0.75} flexWrap="wrap">
          <Chip size="small" color="primary" variant="outlined" label={JOB_TYPE_LABEL[job.type]} />
          <Chip size="small" variant="outlined" label={WORK_MODE_LABEL[job.workMode]} />
          {!job.isAccepting && <Chip size="small" label="Closed" />}
        </Stack>
        <Typography component="h3" sx={{ fontWeight: 700, fontSize: 19, lineHeight: 1.3 }}>
          {job.title}
        </Typography>
        <Stack gap={0.5}>
          <Fact icon={<IconBuilding size={16} />}>{job.company}</Fact>
          {job.location && <Fact icon={<IconMapPin size={16} />}>{job.location}</Fact>}
          {salary && <Fact icon={<IconCash size={16} />}>{salary}</Fact>}
          {deadline && <Fact icon={<IconCalendarDue size={16} />}>{deadline}</Fact>}
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt="auto" pt={1} gap={1}>
          <Typography variant="body2" color="text.secondary" noWrap>
            Posted by {posterName(job)}
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.5} flexShrink={0} fontWeight={600} fontSize={14}>
            <IconUsers size={16} />
            {job.applicationCount} applied
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default JobCard;
