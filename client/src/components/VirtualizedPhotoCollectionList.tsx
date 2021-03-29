import _ from "lodash";
import { CSSProperties } from 'react';
import { VariableSizeList as List } from 'react-window';
import { Photo, PhotoCollection } from '../models/Photo';
import { PhotoThumbnail } from "./PhotoThumbnail";

interface ListItemData {
  title?: string,
  photos?: Photo[],
}

function listData(data: PhotoCollection[]): ListItemData[] {
  return _.flatten(_.map(data, listItemData));
}

// normalize PhotoCollection into a list item data
function listItemData(pc: PhotoCollection) {
  const titleItem: ListItemData = { title: pc.title };
  const photoItems: ListItemData[] = _.map(_.chunk(pc.photos, 5), photos => ({ photos }));
  return _.concat(titleItem, photoItems);
}

function keyValue(photo: Photo) {
  return photo.albumName + "/" + photo.name;
}

const Row = (props: { itemData: ListItemData, style: CSSProperties }) => {
  const { itemData, style } = props;
  if (itemData.title) {
    return (
      <h1 style={style} >{itemData.title}</h1>
    );
  } else {
    return (
      <div style={style} className="d-flex">
        {itemData.photos &&
          itemData.photos.map(p => (
            // Without the `key`, React will fire a key warning
            <PhotoThumbnail key={keyValue(p)} albumName={p.albumName || ""} photoName={p.name} maxSize={100} />
          ))}
      </div>
    );
  }
}

export const VirtualizedPhotoCollectionList = (props: { data: PhotoCollection[] }) => {
  const _listData = listData(props.data);

  const getItemSize = (index: number) => (_listData[index].title ? 50 : 100);

  return (
    <List
      height={400}
      itemCount={_.size(_listData)}
      itemSize={getItemSize}
      width={510}
    >
      {({ index, style }) => (
        <Row itemData={_listData[index]} style={style} />
      )}
    </List>
  );
}