export interface IMenuListItem {
  label: string;
  path: string;
}
export interface MenuListProps {
  title?: string;
  items: Array<IMenuListItem>;
  offsetTop?: string | number;
}
