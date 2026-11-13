'use client';

import React from 'react';

const animationUrl = '/animations/doggie-art-v1.json';
let animation: object | null = null;
let pending: Promise<object> | null = null;

function loadAnimation(): Promise<object> {
  if (animation) return Promise.resolve(animation);
  if (!pending) {
    pending = fetch(animationUrl, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load the empty view animation');
        return response.json();
      })
      .then((data: object) => (animation = data))
      .finally(() => {
        pending = null;
      });
  }
  return pending;
}

export function useEmptyViewAnimation() {
  const [data, setData] = React.useState<object | null>(animation);
  React.useEffect(() => {
    let mounted = true;
    loadAnimation()
      .then((loaded) => {
        if (mounted) setData(loaded);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);
  return data;
}
