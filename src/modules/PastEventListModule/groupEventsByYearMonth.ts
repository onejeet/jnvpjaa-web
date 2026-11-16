import dayjs from 'dayjs';

export interface EventMonthGroup<T> {
  key: string;
  label: string;
  items: T[];
}

export interface EventYearGroup<T> {
  year: number;
  months: EventMonthGroup<T>[];
}

// Expects events already sorted newest-first (getEventList with `past: true` returns them that way).
export function groupEventsByYearMonth<T extends { startDate: string }>(events: T[]): EventYearGroup<T>[] {
  const years: EventYearGroup<T>[] = [];
  for (const event of events) {
    const date = dayjs(event.startDate);
    let year = years[years.length - 1];
    if (year?.year !== date.year()) years.push((year = { year: date.year(), months: [] }));
    const key = date.format('YYYY-MM');
    let month = year.months[year.months.length - 1];
    if (month?.key !== key) year.months.push((month = { key, label: date.format('MMMM'), items: [] }));
    month.items.push(event);
  }
  return years;
}
