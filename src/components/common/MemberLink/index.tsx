'use client';

import Link from 'next/link';
import React from 'react';
import { useMemberHref } from '@/hooks/useMemberHref';

type Props = Omit<React.ComponentProps<'a'>, 'href'> & {
  member: { id?: string | null; publicUsername?: string | null } | null | undefined;
};

/** A member's name or photo: a link to their profile when the viewer may open one, plain content otherwise. */
const MemberLink: React.FC<Props> = ({ member, children, ...rest }) => {
  const href = useMemberHref()(member);
  if (!href)
    return (
      <span className={rest.className} style={rest.style}>
        {children}
      </span>
    );
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
};

export default MemberLink;
