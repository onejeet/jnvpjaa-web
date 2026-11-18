'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import dayjs, { type Dayjs } from 'dayjs';
import { Controller, type Control, useForm, useWatch } from 'react-hook-form';
import {
  Autocomplete,
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
import {
  EditorField,
  EditorPanel,
  EditorSection,
  EditorShell,
  EditorTitleField,
  PublishPanel,
} from '@/components/editor/EditorShell';
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
    <EditorShell
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      heading={job ? 'Edit job' : 'Post a job'}
      description="Share an opening with fellow alumni. Clear details get better applicants."
      publish={
        <PublishPanel
          status={job ? 'Posted' : 'New job'}
          tone={job ? 'live' : 'neutral'}
          note={
            job ? 'Visible to members on the jobs board.' : 'Members see it on the jobs board as soon as you post it.'
          }
        >
          <Button title={job ? 'Save changes' : 'Post job'} type="submit" loading={saving} disabled={saving} />
          <Button title="Cancel" variant="text" color="inherit" disabled={saving} onClick={() => router.back()} />
        </PublishPanel>
      }
      aside={
        <>
          <EditorPanel title="How to apply">
            <EditorField label="Last day to apply" optional>
              <FormDateTimeField
                control={control}
                name="deadlineDate"
                isDateOnly
                disablePast
                helperText="Closes at the end of this day, India time."
                rules={{ validate: (v: Dayjs | null) => !v || dayjs(v).isValid() || 'Pick a valid date' }}
                // The picker misbehaves on unmount without a label (MUI v7 section DOM), so it always gets one.
                inputProps={{ label: 'Last day', size: 'small', fullWidth: true, disabled: saving }}
              />
            </EditorField>
            <EditorField label="External apply link" optional hint="The company's own job page, if there is one.">
              <FormTextField
                fullWidth
                name="applyUrl"
                control={control}
                disabled={saving}
                size="small"
                placeholder="https://"
                rules={httpsRule}
              />
            </EditorField>
          </EditorPanel>
          <EditorPanel title="Your connection" hint="Helps applicants know who to ask.">
            <Controller
              control={control}
              name="posterRelation"
              render={({ field }) => (
                <RadioGroup {...field} sx={{ gap: 0.5, '& .MuiFormControlLabel-label': { typography: 'body2' } }}>
                  <FormControlLabel
                    value="HIRING_AT_COMPANY"
                    control={<Radio size="small" />}
                    label="I work at this company"
                  />
                  <FormControlLabel
                    value="REFERRAL_LEAD"
                    control={<Radio size="small" />}
                    label="A friend shared this opening"
                  />
                </RadioGroup>
              )}
            />
          </EditorPanel>
        </>
      }
    >
      <EditorTitleField
        control={control}
        name="title"
        placeholder="Job title, e.g. Frontend Developer Intern"
        ariaLabel="Job title"
        disabled={saving}
        rules={{
          required: 'Add a job title',
          validate: (v: string) => (v.trim().length >= 5 && v.trim().length <= 120) || 'Use 5 to 120 characters',
        }}
      />
      <Grid container spacing={2.5} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <EditorField label="Company">
            <FormTextField
              fullWidth
              name="company"
              control={control}
              disabled={saving}
              size="small"
              placeholder="Company name"
              rules={{
                required: 'Add the company',
                validate: (v: string) => (v.trim().length >= 2 && v.trim().length <= 120) || 'Use 2 to 120 characters',
              }}
            />
          </EditorField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <EditorField label="Company website" optional>
            <FormTextField
              fullWidth
              name="companyWebsite"
              control={control}
              disabled={saving}
              size="small"
              placeholder="https://"
              rules={httpsRule}
            />
          </EditorField>
        </Grid>
      </Grid>

      <EditorSection title="Role details">
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <EditorField label="Type">
              <FormSelectField
                control={control}
                name="type"
                label="Type"
                selectProps={{ size: 'small', disabled: saving }}
                options={options(JOB_TYPE_LABEL)}
                rules={{ required: 'Pick a type' }}
              />
            </EditorField>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <EditorField label="Work mode">
              <FormSelectField
                control={control}
                name="workMode"
                label="Work mode"
                selectProps={{ size: 'small', disabled: saving }}
                options={options(WORK_MODE_LABEL)}
                rules={{ required: 'Pick a work mode' }}
              />
            </EditorField>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <EditorField label="Experience">
              <FormSelectField
                control={control}
                name="experience"
                label="Experience"
                selectProps={{ size: 'small', disabled: saving }}
                options={options(EXPERIENCE_LABEL)}
                rules={{ required: 'Pick the experience level' }}
              />
            </EditorField>
          </Grid>
          <Grid size={12}>
            <EditorField label="Location" optional={workMode === 'REMOTE' ? 'Optional for remote roles' : undefined}>
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
            </EditorField>
          </Grid>
          <Grid size={12}>
            <EditorField label="Skills" optional="Up to 15. Press Enter after each.">
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
            </EditorField>
          </Grid>
        </Grid>
      </EditorSection>

      <EditorSection
        title={isInternship ? 'Stipend' : 'Salary'}
        hint="Optional, but posts with pay listed get more applicants."
      >
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 6, sm: 4 }}>
            <EditorField label="From">
              <AmountField
                control={control}
                name="salaryMin"
                disabled={saving}
                placeholder={isInternship ? '15,000' : '6,00,000'}
              />
            </EditorField>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <EditorField label="Up to">
              <AmountField
                control={control}
                name="salaryMax"
                disabled={saving}
                placeholder={isInternship ? '25,000' : '9,00,000'}
                validate={(v) =>
                  !v || !salaryMin || Number(v) >= Number(salaryMin) || 'Must be at least the starting amount'
                }
              />
            </EditorField>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <EditorField label="Per">
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
            </EditorField>
          </Grid>
        </Grid>
      </EditorSection>

      <EditorSection
        title="About the role"
        hint="What the work involves, who would fit, and anything applicants should know."
      >
        {/* Not disabled while saving: toggling TipTap's editable state as the page unmounts throws removeChild. */}
        <TipTapTextEditor
          value={description}
          onChange={(html) => setValue('description', html, { shouldDirty: true })}
          height="clamp(300px, 46vh, 460px)"
          placeholder="Describe the role…"
        />
      </EditorSection>
    </EditorShell>
  );
};

export default JobEditor;
