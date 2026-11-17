// Dependency-free so it can be unit tested (tests/jobs-utils.test.cjs), and usable from server components.

export const JOBS_PER_PAGE = 12;

/** The list page's URL query: ?type=&mode=&exp=&q=&page= */
export interface JobFilters {
  type?: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT';
  mode?: 'ONSITE' | 'REMOTE' | 'HYBRID';
  exp?: 'FRESHER' | 'JUNIOR' | 'MID' | 'SENIOR';
  q?: string;
  page: number;
}

export const JOB_TYPE_LABEL: Record<string, string> = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  INTERNSHIP: 'Internship',
  CONTRACT: 'Contract',
};

export const WORK_MODE_LABEL: Record<string, string> = { ONSITE: 'On-site', REMOTE: 'Remote', HYBRID: 'Hybrid' };

export const EXPERIENCE_LABEL: Record<string, string> = {
  FRESHER: 'Fresher (0 yrs)',
  JUNIOR: '1–3 yrs',
  MID: '3–7 yrs',
  SENIOR: '7+ yrs',
};

const rupees = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export const formatSalary = (min?: number | null, max?: number | null, period?: string | null): string | null => {
  const hasMin = typeof min === 'number';
  const hasMax = typeof max === 'number';
  if (!hasMin && !hasMax) return null;
  const per = period === 'MONTH' ? ' / month' : ' / year';
  if (hasMin && hasMax) return (min === max ? rupees(min) : `${rupees(min)} – ${rupees(max)}`) + per;
  return hasMin ? `From ${rupees(min as number)}${per}` : `Up to ${rupees(max as number)}${per}`;
};

const istDate = (iso: string) => new Date(new Date(iso).getTime() - 1);

/** The API stores the instant applications close (start of the next day, IST); show the last day to apply. */
export const deadlineLabel = (deadline?: string | null): string | null =>
  deadline
    ? `Apply by ${new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(istDate(deadline))}`
    : null;

/** Same instant as a YYYY-MM-DD value for a date input. */
export const deadlineInputValue = (deadline?: string | null): string =>
  deadline ? new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(istDate(deadline)) : '';

export const socialUrl = (platform: 'linkedin' | 'github', handle?: string | null): string => {
  if (!handle) return '';
  return platform === 'linkedin' ? `https://www.linkedin.com/in/${handle}` : `https://github.com/${handle}`;
};

export const isHttpsUrl = (value: string) => /^https:\/\/\S+$/i.test(value.trim());
