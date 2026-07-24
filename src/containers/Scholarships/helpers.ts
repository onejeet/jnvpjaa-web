const formatCompactNumber = (value: number) => {
  const absValue = Math.abs(value);
  const compactFormat = (divisor: number, suffix: string) => {
    const compactValue = value / divisor;
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: Math.abs(compactValue) < 10 ? 1 : 0,
    }).format(Number(compactValue.toFixed(Math.abs(compactValue) < 10 ? 1 : 0)));

    return `${formatted}${suffix}`;
  };

  if (absValue >= 10000000) return compactFormat(10000000, 'cr');
  if (absValue >= 100000) return compactFormat(100000, absValue < 200000 ? ' lac' : ' lacs');
  if (absValue >= 1000) return compactFormat(1000, 'k');

  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
};

export const formatCurrency = (value?: number | string | null) => `₹${formatCompactNumber(Number(value || 0))}`;

export const humanizeScholarshipStatus = (status?: string | null) =>
  (status || '')
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const getFullName = (user?: any) => `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

export const formatDate = (date?: string | null) => {
  if (!date) return 'Not available';
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));
};

export const formatDateTime = (date?: string | null) => {
  if (!date) return 'Not available';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
