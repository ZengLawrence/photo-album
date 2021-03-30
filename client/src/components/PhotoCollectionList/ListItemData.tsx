import { Photo } from '../../models/Photo';

export interface ListItemData {
  title?: string;
  photos?: Photo[];
  key: string;
}
