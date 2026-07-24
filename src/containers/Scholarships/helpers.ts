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
