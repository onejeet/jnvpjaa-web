import React from 'react';
import { verifiedStampPath } from '@/utils/verifiedStamp';

/** A quiet rubber-stamp cue (not a scannable credential); the share image shows the same stamp. Fills its parent's width. */
const VerifiedSeal: React.FC<{ faculty?: boolean }> = ({ faculty }) => (
  // eslint-disable-next-line @next/next/no-img-element -- small static brand asset, already sized
  <img
    src={verifiedStampPath(faculty)}
    alt={faculty ? 'Verified faculty stamp' : 'Verified alumni stamp'}
    width={640}
    height={640}
    style={{ display: 'block', width: '100%', height: 'auto', opacity: 0.92 }}
  />
);

export default VerifiedSeal;
