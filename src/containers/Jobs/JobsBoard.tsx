'use client';

import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import {
  Box,
  Chip,
  Grid2 as Grid,
  InputAdornment,
  Pagination,
  PaginationItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { IconBriefcase, IconPlus, IconSearch } from '@tabler/icons-react';
import { JOBS, type Job, type JobExperience, type JobType, type WorkMode } from '@/apollo/jobsOperations';
import EmptyView from '@/components/common/EmptyView';
import Button from '@/components/core/Button';
import { paths } from '@/config/paths';
import { useAuth } from '@/context/AuthContext';
import LayoutModule from '@/layouts/Layout';
import {
  EXPERIENCE_LABEL,
  JOB_TYPE_LABEL,
  JOBS_PER_PAGE,
  WORK_MODE_LABEL,
  type JobFilters,
} from '@/modules/Jobs/jobs.utils';
import JobCard from './JobCard';
import { JobGridSkeleton } from './JobSkeletons';

interface JobsBoardProps {
  jobs: Job[];
  total: number;
  filters: JobFilters;
  /** The API could not be reached; show a retry instead of "no openings". */
  failed?: boolean;
}

const hrefWith = (filters: JobFilters, change: Partial<JobFilters>) => {
  const next = { ...filters, page: 1, ...change };
  const params = new URLSearchParams();
  (['type', 'mode', 'exp', 'q'] as const).forEach((key) => next[key] && params.set(key, String(next[key])));
  if (next.page > 1) params.set('page', String(next.page));
  const query = params.toString();
  return query ? `${paths.jobs.root}?${query}` : paths.jobs.root;
};

const FilterRow: React.FC<{
  label: string;
  options: Record<string, string>;
  value?: string;
  hrefFor: (value?: string) => string;
  onPick: (value?: string) => void;
}> = ({ label, options, value, hrefFor, onPick }) => (
  <Stack
    direction="row"
    gap={1}
    alignItems="center"
    component="nav"
    aria-label={label}
    sx={{ overflowX: 'auto', pb: 0.5, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 }, scrollbarWidth: 'none' }}
  >
    {Object.entries(options).map(([key, text]) => {
      const active = value === key;
      return (
        <Chip
          key={key}
          component={NextLink}
          // A real link for crawlers and new tabs; a plain click switches the chip at once and loads in the background.
          href={hrefFor(active ? undefined : key)}
          onClick={(e: React.MouseEvent) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            onPick(active ? undefined : key);
          }}
          clickable
          label={text}
          color={active ? 'primary' : 'default'}
          variant={active ? 'filled' : 'outlined'}
          aria-current={active ? 'true' : undefined}
          // No colour fade: the label turns white before the fill arrives and the chip looks blank for a moment.
          sx={{ flexShrink: 0, fontWeight: 600, transition: 'none' }}
        />
      );
    })}
  </Stack>
);

const JobGrid: React.FC<{ jobs: Job[]; empty: string }> = ({ jobs, empty }) =>
  jobs.length ? (
    <Grid container spacing={2.5}>
      {jobs.map((job) => (
        <Grid key={job.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Stack alignItems="center" spacing={1.5} sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
      <IconBriefcase size={40} stroke={1.5} style={{ opacity: 0.5 }} />
      <Typography color="text.secondary" maxWidth={420}>
        {empty}
      </Typography>
    </Stack>
  );

// "Posted by me" and "Applied" need the viewer's session, so they load in the browser.
const MyJobs: React.FC<{ mode: 'mine' | 'applied' }> = ({ mode }) => {
  const { data, loading, error, refetch } = useQuery<{ jobs: { data: Job[] } }>(JOBS, {
    variables: { [mode]: true, limit: 50 },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });
  if (loading && !data) return <JobGridSkeleton count={3} />;
  if (error && !data) {
    return (
      <EmptyView
        message="Could not load your jobs. Check your connection and try again."
        buttonProps={{ title: 'Try again', variant: 'outlined', onClick: () => refetch() }}
      />
    );
  }
  return (
    <JobGrid
      jobs={data?.jobs.data || []}
      empty={mode === 'mine' ? "You haven't posted any jobs yet." : "You haven't applied to any jobs yet."}
    />
  );
};

const JobsBoard: React.FC<JobsBoardProps> = ({ jobs, total, filters: loaded, failed }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [chosenTab, setTab] = React.useState<'all' | 'mine' | 'applied'>('all');
  // Signing out while on a personal tab falls back to all openings.
  const tab = user?.id ? chosenTab : 'all';
  // What the viewer picked; it shows at once while the server renders the matching jobs.
  const [filters, setFilters] = React.useState(loaded);
  const [isPending, startTransition] = React.useTransition();
  const loadedKey = JSON.stringify(loaded);
  React.useEffect(() => setFilters(JSON.parse(loadedKey)), [loadedKey]);
  const pages = Math.ceil(total / JOBS_PER_PAGE);
  const filtered = Boolean(filters.type || filters.mode || filters.exp || filters.q);

  const go = (change: Partial<JobFilters>) => {
    const next = { ...filters, page: 1, ...change };
    setFilters(next);
    startTransition(() => router.push(hrefWith(next, { page: next.page }), { scroll: false }));
  };
  const retry = () => startTransition(() => router.refresh());

  return (
    <LayoutModule disableCover title="Jobs & Internships • JNVPJAA">
      <Stack spacing={{ xs: 3, md: 4 }} pb={{ xs: 4, md: 6 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} flexWrap="wrap">
          <Box>
            <Typography variant="h1" mb={1}>
              Jobs & Internships
            </Typography>
            <Typography color="grey.800" maxWidth={720}>
              Openings shared by fellow alumni — at their own companies or passed on by friends. Apply in one step with
              your profile.
            </Typography>
          </Box>
          <Button
            title="Post a job"
            startIcon={<IconPlus size={16} />}
            LinkComponent={NextLink}
            href={paths.jobs.new}
            sx={{ flexShrink: 0 }}
          />
        </Box>

        {user?.id && (
          <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab value="all" label="All openings" />
            <Tab value="mine" label="Posted by me" />
            <Tab value="applied" label="Applied" />
          </Tabs>
        )}

        {tab === 'all' ? (
          <>
            <Stack spacing={1.5}>
              <Box
                component="form"
                action={paths.jobs.root}
                method="get"
                role="search"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const q = String(new FormData(e.currentTarget).get('q') || '').trim();
                  go({ q: q || undefined });
                }}
              >
                {filters.type && <input type="hidden" name="type" value={filters.type} />}
                {filters.mode && <input type="hidden" name="mode" value={filters.mode} />}
                {filters.exp && <input type="hidden" name="exp" value={filters.exp} />}
                <TextField
                  name="q"
                  size="small"
                  defaultValue={filters.q || ''}
                  placeholder="Search title, company, city or skill"
                  inputProps={{ 'aria-label': 'Search jobs', maxLength: 80 }}
                  sx={{ width: { xs: '100%', sm: 420 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch size={18} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <FilterRow
                label="Job type"
                options={JOB_TYPE_LABEL}
                value={filters.type}
                hrefFor={(type) => hrefWith(filters, { type: type as JobType })}
                onPick={(type) => go({ type: type as JobType })}
              />
              <FilterRow
                label="Work mode"
                options={WORK_MODE_LABEL}
                value={filters.mode}
                hrefFor={(mode) => hrefWith(filters, { mode: mode as WorkMode })}
                onPick={(mode) => go({ mode: mode as WorkMode })}
              />
              <FilterRow
                label="Experience"
                options={EXPERIENCE_LABEL}
                value={filters.exp}
                hrefFor={(exp) => hrefWith(filters, { exp: exp as JobExperience })}
                onPick={(exp) => go({ exp: exp as JobExperience })}
              />
            </Stack>

            {isPending ? (
              <JobGridSkeleton />
            ) : failed ? (
              <EmptyView
                message="Could not load openings right now. Check your connection and try again."
                buttonProps={{ title: 'Try again', variant: 'outlined', onClick: retry }}
              />
            ) : (
              <JobGrid
                jobs={jobs}
                empty={
                  filtered
                    ? 'No openings match these filters.'
                    : filters.page > 1
                      ? 'No more openings on this page.'
                      : 'No openings yet — be the first to post one.'
                }
              />
            )}

            {pages > 1 && !failed && (
              <Pagination
                page={filters.page}
                count={pages}
                sx={{ alignSelf: 'center' }}
                renderItem={(item) => (
                  <PaginationItem
                    component={NextLink}
                    href={hrefWith(filters, { page: item.page || 1 })}
                    {...item}
                    onClick={(e: React.MouseEvent) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                      e.preventDefault();
                      go({ page: item.page || 1 });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}
              />
            )}
          </>
        ) : (
          <MyJobs key={tab} mode={tab} />
        )}
      </Stack>
    </LayoutModule>
  );
};

export default JobsBoard;
