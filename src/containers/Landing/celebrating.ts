// No imports: unit tests load this file on its own.
const MILESTONES = [
  { years: 10, label: '10 years' },
  { years: 25, label: 'Silver jubilee' },
  { years: 50, label: 'Golden jubilee' },
];
// The first batch the signup form offers; keep in step with getBatchOptions in utils/helpers.
const FIRST_BATCH = 1993;

/** Passing-out batches reaching 10, 25 or 50 years this calendar year. */
export const celebratingBatches = (year = new Date().getFullYear()) =>
  MILESTONES.map((m) => ({ ...m, batch: year - m.years })).filter((m) => m.batch >= FIRST_BATCH);

/** The biggest milestone a passing-out batch has reached by `year`, or null under 10 years. */
export const alumniMilestone = (batch: number | null | undefined, year = new Date().getFullYear()) => {
  if (!batch) return null; // 0 = faculty
  const years = year - batch;
  const m = [...MILESTONES].reverse().find((x) => years >= x.years);
  return m ? { ...m, yearsOut: years, thisYear: years === m.years } : null;
};
