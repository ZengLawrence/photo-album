import _ from "lodash";
import { KeyedPhotoCollection } from "./KeyedPhotoCollection";
import { ListItemData } from "./ListItemData";

export function listData(data: KeyedPhotoCollection[], itemsPerRow: number): ListItemData[] {
  return _.flatten(_.map(data, pc => listItemData(pc, itemsPerRow)));
}

// normalize PhotoCollection into a list item data
function listItemData(pc: KeyedPhotoCollection, itemsPerRow: number) {
  const titleItem: ListItemData = { title: pc.title, key: pc.key };
  const photoItems: ListItemData[] = _.map(_.chunk(pc.photos, itemsPerRow), photos => ({ photos, key: pc.key }));
  return _.concat(titleItem, photoItems);
}
