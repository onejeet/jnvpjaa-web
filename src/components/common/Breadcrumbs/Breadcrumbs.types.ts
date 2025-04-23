import { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items: BreadcrumbItem[];
  loading?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  //   icon?: React.ReactNode;
}
