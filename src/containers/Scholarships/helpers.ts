export const formatCurrency = (value?: number | string | null) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const humanizeScholarshipStatus = (status?: string | null) =>
  (status || '')
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const getFullName = (user?: any) => `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
