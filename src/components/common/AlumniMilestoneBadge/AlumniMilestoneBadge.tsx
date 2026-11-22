'use client';

import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { alpha, type Theme } from '@mui/material/styles';
import { IconAward, IconConfetti } from '@tabler/icons-react';
import { alumniMilestone } from '@/containers/Landing/celebrating';

// Golden and silver jubilees get metal tones; the 10-year mark uses the brand colour.
const tone = (t: Theme, years: number) => {
  const dark = t.palette.mode === 'dark';
  if (years >= 50) return dark ? '#E9C46A' : '#8A6100';
  if (years >= 25) return dark ? '#C9D1DA' : '#4F5B67';
  return dark ? t.palette.primary.light : t.palette.primary.main;
};

const AlumniMilestoneBadge: React.FC<{ batch?: number | null }> = ({ batch }) => {
  const m = alumniMilestone(batch);
  if (!m) return null;
  const label = m.years === 10 ? '10 years alumni' : m.label;
  const Icon = m.thisYear ? IconConfetti : IconAward;
  const tip = m.thisYear
    ? `Batch of ${batch} celebrates ${m.years} years this year`
    : `Batch of ${batch}: ${m.yearsOut} years since passing out`;
  return (
    <Tooltip title={tip} arrow placement="top">
      <Chip
        size="small"
        icon={<Icon size={15} stroke={1.8} aria-hidden />}
        label={label}
        aria-label={`${label}. ${tip}`}
        sx={(t) => ({
          height: 24,
          fontWeight: 600,
          fontSize: 12,
          color: tone(t, m.years),
          bgcolor: alpha(tone(t, m.years), m.thisYear ? 0.16 : 0.1),
          border: 1,
          borderColor: alpha(tone(t, m.years), 0.35),
          '& .MuiChip-icon': { color: 'inherit', ml: 0.75 },
        })}
      />
    </Tooltip>
  );
};

export default AlumniMilestoneBadge;
