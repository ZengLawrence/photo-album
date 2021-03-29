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

const Row = (props: { data: PhotoCollection[], index: number, style: CSSProperties }) => {
  const { data, index, style } = props;
  const rowData = data[index];
  if (rowData.title) {
    return (
      <h1 style={style} >{rowData.title}</h1>
    );
  } else {
    return (
      <div style={style} className="d-flex">
        {rowData.photos &&
          rowData.photos.map(p => (
            // Without the `key`, React will fire a key warning
            <PhotoThumbnail key={keyValue(p)} albumName={p.albumName || ""} photoName={p.name} maxSize={100} />
          ))}
      </div>
    );
  }
}

interface Props {
  data: PhotoCollection[],
  height: number,
  width: number,
}

export const VirtualizedPhotoCollectionList = (props: Props) => {
  const itemData = listData(props.data);
  const {height, width} = props;

  const getItemSize = (index: number) => (itemData[index].title ? 50 : 100);

  return (
    <List
      height={height}
      itemCount={_.size(itemData)}
      itemSize={getItemSize}
      itemData={itemData}
      width={width}
    >
      {({ data, index, style }) => (
        <Row data={data} index={index} style={style} />
      )}
    </List>
  );
}