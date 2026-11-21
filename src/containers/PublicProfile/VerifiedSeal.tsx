'use client';

import { useTheme } from '@mui/material/styles';
import React from 'react';
import { brand } from '@/config/tenant';

/** A quiet rubber-stamp style seal: a visual cue only, not a scannable credential. */
const VerifiedSeal: React.FC<{ faculty?: boolean; size?: number }> = ({ faculty, size = 84 }) => {
  const color = useTheme().palette.primary.main;
  const ring = `seal-ring-${React.useId().replace(/:/g, '')}`;
  const label = `${faculty ? 'VERIFIED FACULTY' : 'VERIFIED ALUMNI'} • ${brand.shortName.toUpperCase()} •`;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={faculty ? 'Verified faculty seal' : 'Verified alumni seal'}
      style={{ transform: 'rotate(-12deg)', opacity: 0.88, flexShrink: 0 }}
    >
      <defs>
        <path id={ring} d="M50 50 m-35 0 a35 35 0 1 1 70 0 a35 35 0 1 1 -70 0" />
      </defs>
      <circle cx="50" cy="50" r="47" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="50" r="43.5" fill="none" stroke={color} strokeWidth="0.8" />
      <circle cx="50" cy="50" r="25" fill="none" stroke={color} strokeWidth="1.2" />
      <text fill={color} fontSize="8.6" fontWeight="700" letterSpacing="1.1" fontFamily="inherit">
        <textPath href={`#${ring}`} textLength="216" lengthAdjust="spacingAndGlyphs">
          {label}
        </textPath>
      </text>
      <path
        d="M39 50.5 l7.5 7.5 l15 -15.5"
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VerifiedSeal;
