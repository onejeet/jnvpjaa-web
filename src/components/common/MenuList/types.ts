export interface IMenuListItem {
  label: string;
  href: string;
}
export interface MenuListProps {
  title?: string;
  items: Array<IMenuListItem>;
  offsetTop?: string | number;
}
