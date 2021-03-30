import _ from "lodash";
import { CSSProperties } from 'react';
import { Photo, PhotoCollection } from '../../models/Photo';
import { PhotoThumbnail } from "../PhotoThumbnail";

interface ListItemData {
  title?: string;
  photos?: Photo[];
  key: string;
}

export function listData(data: KeyedPhotoCollection[]): ListItemData[] {
  return _.flatten(_.map(data, listItemData));
}
// normalize PhotoCollection into a list item data
function listItemData(pc: KeyedPhotoCollection) {
  const titleItem: ListItemData = { title: pc.title, key: pc.key };
  const photoItems: ListItemData[] = _.map(_.chunk(pc.photos, 5), photos => ({ photos, key: pc.key }));
  return _.concat(titleItem, photoItems);
}
function keyValue(photo: Photo) {
  return photo.albumName + "/" + photo.name;
}
interface RowProps {
  data: ListItemData[];
  index: number;
  style: CSSProperties;
  isScrolling?: boolean;
  onSelect?: (key: string) => void;
}

export type KeyedPhotoCollection = (PhotoCollection & { key: string; });

export const Row = (props: RowProps) => {
  const { data, index, style, isScrolling, onSelect } = props;
  const rowData = data[index];
  const handleOnClick = () => onSelect && onSelect(rowData.key);

  if (rowData.title) {
    return (
      <h1 style={style} onClick={handleOnClick}>{rowData.title}</h1>
    );
  } else {
    return (
      <div style={style} className="d-flex" onClick={handleOnClick}>
        {rowData.photos &&
          rowData.photos.map(p => (
            // Without the `key`, React will fire a key warning
            <PhotoThumbnail
              key={keyValue(p)}
              albumName={p.albumName || ""}
              photoName={p.name}
              maxSize={100}
              visible={!isScrolling} />
          ))}
      </div>
    );
  }
};
