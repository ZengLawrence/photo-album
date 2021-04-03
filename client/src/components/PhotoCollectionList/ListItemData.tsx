import { Photo } from '../../models';

export interface ListItemData {
  title?: string;
  photos?: Photo[];
  key: string;
}
