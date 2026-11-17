'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import dayjs, { type Dayjs } from 'dayjs';
import { Controller, type Control, useForm, useWatch } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Chip,
  FormControlLabel,
  Grid2 as Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { IconCurrencyRupee } from '@tabler/icons-react';
import {
  JOB,
  SAVE_JOB,
  type Job,
  type JobExperience,
  type JobInput,
  type JobPosterRelation,
  type JobType,
  type SalaryPeriod,
  type WorkMode,
} from '@/apollo/jobsOperations';
import EmptyView from '@/components/common/EmptyView';
import Button from '@/components/core/Button';
import CoreTextField from '@/components/core/TextField';
import FormDateTimeField from '@/components/form/FormDateTimeField';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import { paths } from '@/config/paths';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import {
  EXPERIENCE_LABEL,
  JOB_TYPE_LABEL,
  WORK_MODE_LABEL,
  amountDigits,
  deadlineInputValue,
  groupAmount,
  isHttpsUrl,
} from '@/modules/Jobs/jobs.utils';
import { JobFormSkeleton } from '@/containers/Jobs/JobSkeletons';
import TipTapTextEditor from '@/modules/TipTapTextEditor';

interface JobFormValues {
  title: string;
  company: string;
  companyWebsite: string;
  type: JobType | '';
  workMode: WorkMode | '';
  location: string;
  experience: JobExperience | '';
  salaryMin: string;
  salaryMax: string;
  salaryPeriod: SalaryPeriod;
  description: string;
  skills: string[];
  posterRelation: JobPosterRelation;
  applyUrl: string;
  deadlineDate: Dayjs | null;
}

const options = (labels: Record<string, string>) => Object.entries(labels).map(([value, label]) => ({ value, label }));

const label = (text: string, hint?: string) => (
  <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 600 }}>
    {text}
    {hint && (
      <Typography component="span" variant="body2" color="text.secondary">
        {' '}
        {hint}
      </Typography>
    )}
  </Typography>
);

const section = (text: string) => (
  <Grid size={12}>
    <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>
      {text}
    </Typography>
  </Grid>
);

const httpsRule = { validate: (v: string) => !v.trim() || isHttpsUrl(v) || 'Start the link with https://' };

const toFormValues = (job?: Job | null): JobFormValues => ({
  title: job?.title ?? '',
  company: job?.company ?? '',
  companyWebsite: job?.companyWebsite ?? '',
  type: job?.type ?? '',
  workMode: job?.workMode ?? '',
  location: job?.location ?? '',
  experience: job?.experience ?? '',
  salaryMin: job?.salaryMin?.toString() ?? '',
  salaryMax: job?.salaryMax?.toString() ?? '',
  salaryPeriod: job?.salaryPeriod ?? 'YEAR',
  description: job?.description ?? '',
  skills: job?.skills ?? [],
  posterRelation: job?.posterRelation ?? 'HIRING_AT_COMPANY',
  applyUrl: job?.applyUrl ?? '',
  deadlineDate: job?.deadline ? dayjs(deadlineInputValue(job.deadline)) : null,
});

const rupees = (value: string) => (value ? Number(value) : null);

// The form keeps plain digits; the box shows them grouped (6,00,000) as the poster types.
const AmountField: React.FC<{
  control: Control<JobFormValues>;
  name: 'salaryMin' | 'salaryMax';
  disabled?: boolean;
  placeholder?: string;
  validate?: (value: string) => true | string;
}> = ({ control, name, disabled, placeholder, validate }) => (
  <Controller
    control={control}
    name={name}
    rules={validate ? { validate } : undefined}
    render={({ field, fieldState }) => (
      <CoreTextField
        fullWidth
        size="small"
        name={field.name}
        inputRef={field.ref}
        value={groupAmount(field.value)}
        onChange={(e) => field.onChange(amountDigits(e.target.value))}
        onBlur={field.onBlur}
        disabled={disabled}
        placeholder={placeholder}
        startAdornment={<IconCurrencyRupee size={16} />}
        inputProps={{ inputMode: 'numeric', 'aria-label': name === 'salaryMin' ? 'Salary from' : 'Salary up to' }}
        error={Boolean(fieldState.error)}
        helperText={fieldState.error?.message}
      />
    )}
  />
);

const JobEditor: React.FC<{ slug?: string }> = ({ slug }) => {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useQuery<{ job: Job | null }>(JOB, {
    skip: !slug || !user?.id,
    variables: { slug },
    fetchPolicy: 'network-only',
  });
  const job = data?.job;

  if (slug && (loading || !user?.id)) return <JobFormSkeleton />;
  if (slug && error) {
    return (
      <EmptyView
        message="Could not load this job. Check your connection and try again."
        buttonProps={{ title: 'Try again', variant: 'outlined', onClick: () => refetch() }}
      />
    );
  }
  if (slug && !job) return <EmptyView message="This job could not be found." />;
  if (job && !job.viewerCanManage) return <EmptyView message="Only the person who posted this job can edit it." />;
  // Mounted once the job is loaded, so every field starts with its value.
  return <JobForm job={job} />;
};

const JobForm: React.FC<{ job?: Job | null }> = ({ job }) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [saveJob, { loading: saving }] = useMutation<{ saveJob: Job }>(SAVE_JOB);
  const { control, handleSubmit, setValue } = useForm<JobFormValues>({ defaultValues: toFormValues(job) });
  const [type, workMode, description, salaryMin] = useWatch({
    control,
    name: ['type', 'workMode', 'description', 'salaryMin'],
  });
  const isInternship = type === 'INTERNSHIP';

  // Internships usually pay a monthly stipend; full-time roles an annual package.
  React.useEffect(() => {
    if (!job && type) setValue('salaryPeriod', type === 'INTERNSHIP' ? 'MONTH' : 'YEAR');
  }, [type, job, setValue]);

  const onSubmit = async (values: JobFormValues) => {
    if (!values.description.replace(/<[^>]*>/g, '').trim()) {
      showAlert({ visible: true, type: 'error', message: 'Add a description of the role.' });
      return;
    }
    const salaryMinValue = rupees(values.salaryMin);
    const salaryMaxValue = rupees(values.salaryMax);
    const input: JobInput = {
      id: job?.id ?? null,
      title: values.title.trim(),
      company: values.company.trim(),
      companyWebsite: values.companyWebsite.trim() || null,
      type: values.type as JobType,
      workMode: values.workMode as WorkMode,
      location: values.workMode === 'REMOTE' ? values.location.trim() || null : values.location.trim(),
      experience: values.experience as JobExperience,
      salaryMin: salaryMinValue,
      salaryMax: salaryMaxValue,
      salaryPeriod: salaryMinValue !== null || salaryMaxValue !== null ? values.salaryPeriod : null,
      description: values.description,
      skills: values.skills,
      posterRelation: values.posterRelation,
      applyUrl: values.applyUrl.trim() || null,
      deadlineDate: values.deadlineDate ? dayjs(values.deadlineDate).format('YYYY-MM-DD') : null,
    };
    try {
      const { data } = await saveJob({ variables: { input } });
      showAlert({ visible: true, type: 'success', message: job ? 'Job updated.' : 'Job posted.' });
      if (data?.saveJob) router.push(paths.jobs.getJobUrl(data.saveJob.slug));
      router.refresh();
    } catch (err: any) {
      showAlert({ visible: true, type: 'error', message: err?.message || 'Could not save the job.' });
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%', maxWidth: 860, mx: 'auto', p: { xs: 2, sm: 3, md: 4 } }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>
            Jobs & Internships
          </Typography>
          <Typography component="h1" variant="h2" sx={{ mt: 0.25 }}>
            {job ? 'Edit job' : 'Post a job'}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        {section('The role')}
        <Grid size={12}>
          {label('Job title')}
          <FormTextField
            fullWidth
            name="title"
            control={control}
            disabled={saving}
            size="small"
            placeholder="e.g. Frontend Developer Intern"
            rules={{
              required: 'Required',
              validate: (v: string) => (v.trim().length >= 5 && v.trim().length <= 120) || 'Use 5 to 120 characters',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {label('Company')}
          <FormTextField
            fullWidth
            name="company"
            control={control}
            disabled={saving}
            size="small"
            placeholder="Company name"
            rules={{
              required: 'Required',
              validate: (v: string) => (v.trim().length >= 2 && v.trim().length <= 120) || 'Use 2 to 120 characters',
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {label('Company website', '(optional)')}
          <FormTextField
            fullWidth
            name="companyWebsite"
            control={control}
            disabled={saving}
            size="small"
            placeholder="https://"
            rules={httpsRule}
          />
        </Grid>

        {section('Details')}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          {label('Type')}
          <FormSelectField
            control={control}
            name="type"
            label="Type"
            selectProps={{ size: 'small', disabled: saving }}
            options={options(JOB_TYPE_LABEL)}
            rules={{ required: 'Required' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          {label('Work mode')}
          <FormSelectField
            control={control}
            name="workMode"
            label="Work mode"
            selectProps={{ size: 'small', disabled: saving }}
            options={options(WORK_MODE_LABEL)}
            rules={{ required: 'Required' }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {label('Experience')}
          <FormSelectField
            control={control}
            name="experience"
            label="Experience"
            selectProps={{ size: 'small', disabled: saving }}
            options={options(EXPERIENCE_LABEL)}
            rules={{ required: 'Required' }}
          />
        </Grid>
        <Grid size={12}>
          {label('Location', workMode === 'REMOTE' ? '(optional for remote roles)' : undefined)}
          <FormTextField
            fullWidth
            name="location"
            control={control}
            disabled={saving}
            size="small"
            placeholder="City, e.g. Jaipur or Bengaluru"
            rules={{
              validate: (v: string) =>
                workMode === 'REMOTE' || Boolean(v.trim()) || 'Add a location for on-site or hybrid roles',
            }}
          />
        </Grid>
        <Grid size={12}>
          {label('Skills', '(up to 15 — press Enter after each)')}
          <Controller
            control={control}
            name="skills"
            rules={{ validate: (v: string[]) => v.length <= 15 || 'Add at most 15 skills' }}
            render={({ field, fieldState }) => (
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={field.value}
                disabled={saving}
                onChange={(_, value) =>
                  field.onChange(
                    Array.from(new Set((value as string[]).map((s) => s.trim().slice(0, 40)).filter(Boolean)))
                  )
                }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return <Chip key={key} size="small" label={option} {...tagProps} />;
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="e.g. React, Excel, Communication"
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        {section(isInternship ? 'Stipend (optional)' : 'Salary (optional)')}
        <Grid size={{ xs: 6, md: 4 }}>
          {label('From')}
          <AmountField
            control={control}
            name="salaryMin"
            disabled={saving}
            placeholder={isInternship ? '15,000' : '6,00,000'}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          {label('Up to')}
          <AmountField
            control={control}
            name="salaryMax"
            disabled={saving}
            placeholder={isInternship ? '25,000' : '9,00,000'}
            validate={(v) =>
              !v || !salaryMin || Number(v) >= Number(salaryMin) || 'Must be at least the starting amount'
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {label('Per')}
          <FormSelectField
            control={control}
            name="salaryPeriod"
            label="Per"
            selectProps={{ size: 'small', disabled: saving }}
            options={[
              { value: 'MONTH', label: 'Month' },
              { value: 'YEAR', label: 'Year' },
            ]}
          />
        </Grid>

        {section('About the role')}
        <Grid size={12}>
          {/* Not disabled while saving: toggling TipTap's editable state as the page unmounts throws removeChild. */}
          <TipTapTextEditor
            value={description}
            onChange={(html) => setValue('description', html, { shouldDirty: true })}
            height="clamp(300px, 46vh, 460px)"
            placeholder="What the role involves, who would fit, and anything applicants should know..."
          />
        </Grid>

        {section('How you are connected')}
        <Grid size={12}>
          <Controller
            control={control}
            name="posterRelation"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value="HIRING_AT_COMPANY" control={<Radio />} label="I work at this company" />
                <FormControlLabel value="REFERRAL_LEAD" control={<Radio />} label="A friend shared this opening" />
              </RadioGroup>
            )}
          />
        </Grid>

        {section('Applying')}
        <Grid size={{ xs: 12, md: 5 }}>
          {label('Last day to apply', '(optional)')}
          <FormDateTimeField
            control={control}
            name="deadlineDate"
            isDateOnly
            disablePast
            helperText="Applications close at the end of this day (India time)."
            rules={{ validate: (v: Dayjs | null) => !v || dayjs(v).isValid() || 'Pick a valid date' }}
            // The picker misbehaves on unmount without a label (MUI v7 section DOM), so it always gets one.
            inputProps={{ label: 'Last day', size: 'small', fullWidth: true, disabled: saving }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          {label('External apply link', '(optional)')}
          <FormTextField
            fullWidth
            name="applyUrl"
            control={control}
            disabled={saving}
            size="small"
            placeholder="https:// — the company's own job page, if any"
            rules={httpsRule}
          />
        </Grid>

        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button title="Cancel" variant="outlined" disabled={saving} onClick={() => router.back()} />
          <Button title={job ? 'Save changes' : 'Post job'} type="submit" loading={saving} disabled={saving} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobEditor;
