import _ from "lodash";
import { PhotoCollection } from '../../models/Photo';
import { ListItemData } from "./ListItemData";

export function listData(data: KeyedPhotoCollection[]): ListItemData[] {
  return _.flatten(_.map(data, listItemData));
}
// normalize PhotoCollection into a list item data
function listItemData(pc: KeyedPhotoCollection) {
  const titleItem: ListItemData = { title: pc.title, key: pc.key };
  const photoItems: ListItemData[] = _.map(_.chunk(pc.photos, 5), photos => ({ photos, key: pc.key }));
  return _.concat(titleItem, photoItems);
}

export type KeyedPhotoCollection = (PhotoCollection & { key: string; });


