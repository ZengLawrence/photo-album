import _ from "lodash";
import { CSSProperties } from 'react';
import { VariableSizeList as List } from 'react-window';
import { Photo, PhotoCollection } from '../models/Photo';
import { PhotoThumbnail } from "./PhotoThumbnail";

interface ListItemData {
  title?: string,
  photos?: Photo[],
  key: string,
}

function listData(data: KeyedPhotoCollection[]): ListItemData[] {
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
  data: ListItemData[], 
  index: number, 
  style: CSSProperties,
  onSelect?: (key: string) => void,
}

const Row = (props: RowProps) => {
  const { data, index, style, onSelect: onSelected } = props;
  const rowData = data[index];
  const handleOnClick = () => onSelected && onSelected(rowData.key);

  if (rowData.title) {
    return (
      <h1 style={style} onClick={handleOnClick} >{rowData.title}</h1>
    );
  } else {
    return (
      <div style={style} className="d-flex" onClick={handleOnClick}>
        {rowData.photos &&
          rowData.photos.map(p => (
            // Without the `key`, React will fire a key warning
            <PhotoThumbnail key={keyValue(p)} albumName={p.albumName || ""} photoName={p.name} maxSize={100} />
          ))}
      </div>
    );
  }
}

export type KeyedPhotoCollection = (PhotoCollection & {key: string});

interface Props {
  data: KeyedPhotoCollection[],
  height: number,
  width: number,
  onSelect?: (key: string) => void,
}

export const VirtualizedPhotoCollectionList = (props: Props) => {
  const itemData = listData(props.data);
  const {height, width, onSelect} = props;

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
        <Row data={data} index={index} style={style} onSelect={onSelect} />
      )}
    </List>
  );
}