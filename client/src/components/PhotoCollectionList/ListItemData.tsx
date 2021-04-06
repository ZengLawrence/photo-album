import { Photo } from '../../models';

export interface ListItemData {
  title?: string;
  photos?: Photo[];
  key: string;
}

export function getItemSize(item: ListItemData) {
  return item.title ? 50 : 100;
}
