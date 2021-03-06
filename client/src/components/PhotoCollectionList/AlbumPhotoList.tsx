import _ from "lodash";
import { useMemo } from "react";
import { useHistory } from "react-router";
import { VariableSizeList as List } from 'react-window';
import { Album, Photo } from "../../models";
import { KeyedPhotoCollection } from "./KeyedPhotoCollection";
import { listData } from "./listData";
import { getItemSize } from "./ListItemData";
import { PhotoListRow } from "./PhotoListRow";

function photoCollections(albums: Album[]): KeyedPhotoCollection[] {
  const photoCollection = ({ name, photoNames }: Album) => ({
    title: name,
    photos: photos(name, photoNames),
    key: name,
  });
  return _.map(albums, photoCollection);
}

function photos(albumName: string, photoNames: string[]): Photo[] {
  return _.map(photoNames, name => ({ albumName, name }));
}

interface Props {
  height: number;
  width: number;
  albums: Album[];
}

export const AlbumPhotoList = (props: Props) => {
  const { height, width, albums } = props;
  const itemData = useMemo(() => listData(photoCollections(albums), Math.floor(width / 100)),
    [albums, width]);

  const history = useHistory();

  return (
    <List
      height={height}
      width={width}
      itemCount={_.size(itemData)}
      itemSize={index => getItemSize(itemData[index])}
      itemData={itemData}
      useIsScrolling
    >
      {(props) => (
        <PhotoListRow
          {...props}
          onSelect={albumName => history.push("/albums/" + albumName)}
          onSelectPhoto={(albumName, photoName) => history.push("/albums/" + albumName + "?focusOn=" + photoName)}
        />
      )}
    </List>
  );
};